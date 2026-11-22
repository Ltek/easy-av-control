/**
 * The flow of an activity: what a start or stop switches, when and how.
 *
 * In the panel it is computed (easy_av_control/config/flow) from the room as it is being edited, so it
 * follows every change before it is saved. On the card (``live``) it is the saved room's
 * (control/flow) and marks what a running start or stop has done and is doing. Both colour each device by
 * its state now (control/states).
 */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import type { HomeAssistant } from "../types";
import type { Room } from "./model";
import { t } from "./strings";
import { FLOW_DETAILS, HEADERS, NESTED, groups, hiddenRow, rowStatuses, stateRole, type Live, type Row, type RowStatus } from "./flow-live";
import { ltekChrome, ltekPanelScale, ltekTokens } from "./ltek-styles";

type DeviceStates = Record<string, { group: string; value: string | null }>;

type Flow =
  | { error: { path: string[]; message: string } }
  | { error: null; rows: Row[]; done: [number, number]; room?: Room };

type Mode = "start" | "stop" | "monitor";

/** Wait this long after the last change before asking for the flow again. */
const DEBOUNCE = 400;

const ICONS: Record<string, string> = {
  state: "mdi:flag-outline",
  outlets_on: "mdi:power-socket-eu",
  outlets_off: "mdi:power-socket-eu",
  outlet_keep: "mdi:power-socket-eu",
  turn_on: "mdi:power",
  turn_off: "mdi:power-off",
  hook: "mdi:script-text-outline",
  hook_wait: "mdi:script-text-outline",
  boot: "mdi:timer-sand",
  wait: "mdi:timer-sand",
  reload: "mdi:reload",
  ready: "mdi:lan-connect",
  status: "mdi:state-machine",
  picture: "mdi:image-check-outline",
  check: "mdi:image-check-outline",
  already_on: "mdi:check",
  step: "mdi:tune-variant",
  delay: "mdi:timer-outline",
  started_by: "mdi:gesture-tap-button",
  monitor_lost: "mdi:lan-disconnect",
  monitor_picture: "mdi:image-off-outline",
  monitor_idle: "mdi:sleep",
  monitor_error: "mdi:alert-circle-outline",
  monitor_watch: "mdi:eye-outline",
  wait_for: "mdi:clock-check-outline",
};

/** A row's identity, for editing it in place. */
export function rowKey(row: Row, header?: Row): string {
  const device = row.device ?? (header?.kind === "device" ? header.device : undefined) ?? "";
  return [row.kind, device, row.step ?? row.index ?? "", row.check ?? "", row.hook ?? "", row.reason ?? ""].join("|");
}

/** What the trash icon on a row removes (handled by the room editor): undefined for rows it can't. */
function removable(row: Row, header: Row | undefined, mode: string): boolean {
  if (row.background) return false;
  if (header?.kind === "steps") return true;
  switch (row.kind) {
    case "device":
      return mode === "start";
    case "status":
    case "boot":
    case "ready":
    case "delay":
    case "wait_for":
    case "started_by":
    case "monitor_lost":
    case "monitor_picture":
    case "monitor_idle":
    case "monitor_watch":
    case "check":
    case "step":
    case "hook":
      return true;
    case "wait":
      return row.reason === "delay_after_on";
    default:
      return false;
  }
}

/** Where each row's ✎ goes: the device's panel (key of its title text), for rows under a device. */
const DEVICE_PANELS: Record<string, string> = {
  device: "section_device",
  boot: "section_power",
  reload: "section_ready",
  ready: "section_ready",
  status: "section_state",
  turn_on: "section_device",
  turn_off: "section_device",
  wait: "section_delays",
  delay: "flow.before",
  wait_for: "flow.before",
};
/** ... and the activity's panel for the rest. */
const ACTIVITY_PANELS: Record<string, string> = {
  checks: "section_checks",
  check: "section_checks",
  steps: "steps",
  step: "steps",
  picture: "section_checks",
  hook: "section_advanced",
  hook_wait: "section_advanced",
  already_on: "section_activity_devices",
  started_by: "started_by",
  monitor_lost: "monitor",
  monitor_picture: "monitor",
  monitor_idle: "monitor",
  monitor_error: "monitor",
};


export class EasyAvControlFlow extends LitElement {
  static properties = {
    hass: { attribute: false },
    room: { attribute: false },
    roomId: { attribute: false },
    activityId: { attribute: false },
    _mode: { state: true },
    _from: { state: true },
    _flow: { state: true },
    _failed: { state: true },
    entryId: { attribute: false },
    live: { attribute: false },
    from: { attribute: false },
    details: { type: Boolean },
    editing: { attribute: false },
    _states: { state: true },
    _detailKinds: { state: true },
    _showDetails: { state: true },
  };

  declare hass: HomeAssistant;
  declare room: Room;
  declare roomId: string;
  declare activityId: string;
  declare _mode: Mode;
  /** Start from this activity instead of from idle. */
  declare _from?: string;
  declare _flow?: Flow;
  declare _failed?: string;
  declare entryId?: string;
  /** On the card: the room's run state; the Flow follows it */
  declare live?: Live & { activity?: string | null };
  /** On the card: the activity a start switches from */
  declare from?: string;
  /** Entities, actions and notes; off shows only what happens */
  declare details: boolean;
  declare _states: DeviceStates;
  /** What counts as a detail (ui/get; set in the panel's Flow options) */
  declare _detailKinds: string[];
  /** The panel's own Details chip */
  declare _showDetails: boolean;
  /** In the panel: the key of the row being edited in place (its editor comes in through the "edit" slot) */
  declare editing?: string;
  /** The furthest row this run has reached */
  private _reached = -1;
  private _statesTimer?: number;
  private _watched = "";

  private _timer?: number;
  private _request = 0;

  constructor() {
    super();
    this._mode = "start";
    this.details = true;
    this._states = {};
    this._detailKinds = ["entities", "waits"];
    this._showDetails = true;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.hass
      ?.callWS<{ flow_details: string[] }>({ type: "easy_av_control/ui/get" })
      .then((ui) => (this._detailKinds = ui.flow_details))
      .catch(() => undefined);
  }

  /** Details are shown: on the card its Details chip, in the panel its own. */
  private get _detailsOn(): boolean {
    return this.live ? this.details : this._showDetails;
  }

  /** Whether one kind of detail is hidden now. */
  private _hides(kind: string): boolean {
    return !this._detailsOn && this._detailKinds.includes(kind);
  }

  private async _setDetailKinds(kinds: string[]): Promise<void> {
    this._detailKinds = kinds;
    try {
      const r = await this.hass.callWS<{ flow_details: string[] }>({ type: "easy_av_control/ui/flow_details", details: kinds });
      this._detailKinds = r.flow_details;
    } catch {
      /* kept for this page */
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._timer);
    window.clearTimeout(this._statesTimer);
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("activityId") && changed.get("activityId") !== undefined) {
      this._from = undefined;
    }
    if (this._from !== undefined && !this.room?.activities?.[this._from]) {
      this._from = undefined;
    }
    if (this.live) {
      const mode: Mode = this.live.state === "stopping" ? "stop" : "start";
      const previous = changed.get("live") as this["live"];
      if (mode !== this._mode) this._mode = mode;
      if (!previous || previous.state !== this.live.state || previous.activity !== this.live.activity) {
        if (this.live.state === "starting" || this.live.state === "stopping") this._reached = -1;
        changed.set("_mode", undefined);
      }
    }
    if (["room", "roomId", "activityId", "_mode", "_from", "from"].some((key) => changed.has(key))) {
      window.clearTimeout(this._timer);
      // Typing in the forms changes the room often; switching the view does not
      const first = this._flow === undefined && this._failed === undefined;
      const delay = !first && changed.has("room") ? DEBOUNCE : 0;
      this._timer = window.setTimeout(() => this._load(), delay);
    }
  }

  private async _load(): Promise<void> {
    const request = ++this._request;
    const from = this.live ? this.from : this._from;
    try {
      const flow = await this.hass.callWS<Flow>({
        ...(this.live
          ? { type: "easy_av_control/control/flow", ...(this.entryId ? { entry_id: this.entryId } : {}) }
          : { type: "easy_av_control/config/flow", config: this.room }),
        room: this.roomId,
        activity: this.activityId,
        mode: this._mode,
        ...(this._mode === "start" && from ? { from } : {}),
      });
      this._loadStates();
      if (request === this._request) {
        this._flow = flow;
        this._failed = undefined;
      }
    } catch (err) {
      if (request === this._request) {
        this._failed = (err as { message?: string }).message ?? String(err);
      }
    }
  }

  /** Each device's state now; asked again when one of the Flow's entities changes. */
  private async _loadStates(): Promise<void> {
    try {
      this._states = await this.hass.callWS<DeviceStates>({
        type: "easy_av_control/control/states",
        room: this.roomId,
        ...(this.entryId ? { entry_id: this.entryId } : {}),
      });
    } catch {
      /* colours are a nicety */
    }
  }

  protected updated(changed: Map<string, unknown>): void {
    if (!changed.has("hass") || !this.hass || !this._flow || this._flow.error) return;
    const ids = new Set<string>();
    for (const row of this._flow.rows) {
      if (typeof row.entity_id === "string") ids.add(row.entity_id);
      for (const e of (row.entities as string[] | undefined) ?? []) ids.add(e);
    }
    for (const device of Object.values(this._room.devices ?? {})) if (device.entity_id) ids.add(device.entity_id);
    const key = [...ids].map((id) => `${id}=${this.hass.states[id]?.state}`).join("|");
    if (key !== this._watched) {
      this._watched = key;
      window.clearTimeout(this._statesTimer);
      this._statesTimer = window.setTimeout(() => this._loadStates(), 300);
    }
  }

  /** The room's names: the edited room in the panel, the names control/flow sends on the card. */
  private get _room(): Room {
    return this.room ?? (this._flow && !this._flow.error ? this._flow.room : undefined) ?? ({} as Room);
  }

  private _t(key: string, params?: Record<string, string>): string {
    return t(this.hass?.language, key, params);
  }

  // ------------------------------------------------------------------
  // Names
  // ------------------------------------------------------------------

  private _entity(entityId: unknown): string {
    const id = String(entityId ?? "");
    return (this.hass.states[id]?.attributes.friendly_name as string | undefined) || id;
  }

  private _device(deviceId: unknown): string {
    const id = String(deviceId ?? "");
    const device = this._room.devices?.[id];
    return device?.name || (device?.entity_id ? this._entity(device.entity_id) : "") || id;
  }

  private _activity(activityId: unknown): string {
    const id = String(activityId ?? "");
    return this._room.activities?.[id]?.name || id;
  }

  private _list(entities: unknown): string {
    return ((entities as string[] | undefined) ?? []).map((e) => this._entity(e)).join(", ");
  }

  private _seconds(value: unknown): string {
    return `${Math.round(Number(value) * 10) / 10} s`;
  }

  /** 300 -> "5 min", 90 -> "90 s". */
  private _duration(seconds: number): string {
    return seconds >= 120 && seconds % 60 === 0 ? `${seconds / 60} min` : this._seconds(seconds);
  }

  private _time([min, max]: [number, number]): string {
    return min === max ? this._seconds(min) : `${this._seconds(min).slice(0, -2)}–${this._seconds(max)}`;
  }

  // ------------------------------------------------------------------
  // Rows
  // ------------------------------------------------------------------

  /** What a row does, in words. */
  private _text(row: Row): string {
    const device = this._device(row.device);
    switch (row.kind) {
      case "state":
        return this._t(`flow.state_${row.state}`);
      case "outlets_on":
        return this._t("flow.outlets_on", { outlets: this._list(row.entities) });
      case "outlets_off":
        return this._t(row.after_status ? "flow.outlets_off_status" : row.background ? "flow.outlets_off_later" : "flow.outlets_off", {
          outlets: this._list(row.entities),
        });
      case "outlet_keep":
        return this._t("flow.outlet_keep", { outlet: this._entity(row.entity_id) });
      case "hook":
        return this._t(`flow.${row.hook}`);
      case "hook_wait":
        return this._t(`flow.${row.hook}_wait`);
      case "already_on":
        return this._t("flow.already_on", { activity: this._activity(row.previous) });
      case "boot":
        return this._t("flow.boot", { seconds: this._seconds(row.seconds) });
      case "reload":
        return this._t("flow.reload", { entity: this._entity(row.entity_id) });
      case "ready": {
        const states = (Array.isArray(row.states) ? row.states : row.states ? [row.states] : []) as string[];
        const params = {
          entity: this._entity(row.entity_id),
          states: states.join(" / "),
          timeout: this._seconds(row.timeout),
        };
        return [
          row.step ? `${row.step}. ` : "",
          this._t(states.length ? "flow.ready_state" : "flow.ready", params),
          " ",
          this._t(`flow.on_timeout_${row.on_timeout}`),
        ].join("");
      }
      case "turn_on":
      case "turn_off": {
        const prefix = row.step ? `${row.step}. ` : "";
        if (row.skip) {
          return prefix + this._t("flow.cannot_switch", { device });
        }
        if (row.later) return prefix + this._t("flow.turn_off_later", { device, seconds: this._duration(Number(row.later)) });
        return prefix + this._t(row.reason === "unused" ? "flow.turn_off_unused" : `flow.${row.kind}`, { device });
      }
      case "status":
        return this._t(row.target === "off" ? "flow.status_off" : "flow.status_on", {
          device,
          entity: this._entity(row.entity_id),
          timeout: this._seconds(row.timeout),
        });
      case "check": {
        const name = this._device(row.device);
        if (row.missing) return this._t("flow.check_missing", { device: name });
        const unless = (row.unless as string[] | undefined) ?? [];
        return this._t(unless.length ? "flow.check_unless" : "flow.check", {
          device: name,
          entity: this._entity(row.entity_id),
          states: (unless.length ? unless : ((row.states as string[] | undefined) ?? [])).join(" / "),
          timeout: this._seconds(row.timeout),
        }) + (row.on_failure === "stop" ? ` ${this._t("flow.on_timeout_abort")}` : ` ${this._t("flow.check_warn")}`);
      }
      case "picture":
        return this._t("flow.picture", {
          step: String(row.step ?? ""),
          entity: this._entity(row.entity_id),
          states: ((row.states as string[] | undefined) ?? []).join(" / "),
          timeout: this._seconds(row.timeout),
        });
      case "delay":
        return this._t("flow.delay", { seconds: this._seconds(row.seconds) });
      case "monitor_lost":
        return this._t("flow.monitor_lost", { seconds: this._seconds(row.seconds) });
      case "monitor_picture":
        return this._t("flow.monitor_picture", { seconds: this._seconds(row.seconds) });
      case "monitor_idle":
        return this._t("flow.monitor_idle", { idle: this._duration(Number(row.seconds)), warning: this._duration(Number(row.warning)) });
      case "monitor_error":
        return this._t("flow.monitor_error");
      case "monitor_watch":
        return this._t(row.mode === "turn_off" ? "flow.monitor_watch_off" : "flow.monitor_watch", {
          device,
          grace: this._duration(Number(row.grace)),
          after: this._duration(Number(row.turn_off_after)),
        });
      case "started_by":
        return this._t(this._mode === "stop" ? "flow.stopped_by" : "flow.started_by", {
          entity: this._entity(row.entity_id),
          states: ((row.states as string[] | undefined) ?? []).join(" / "),
        });
      case "wait_for": {
        const waits = (row.waits as { device: string; state: string }[] | undefined) ?? [];
        const what = waits
          .map((w) => this._t(w.state === "picture" ? "flow.wait_for_picture" : "flow.wait_for_on", { device: this._device(w.device) }))
          .join(this._t("flow.and"));
        return (
          this._t("flow.wait_for", { what, timeout: this._seconds(row.timeout) }) +
          " " +
          this._t(`flow.on_timeout_${row.on_timeout}`)
        );
      }
      case "wait":
        return this._t(row.reason === "delay_after_on" ? "flow.wait_on" : "flow.wait", {
          seconds: this._seconds(row.seconds),
        });
      case "step":
        return `${row.step}. ${this._t(`step.${row.step_type}`)}${this._stepValue(row)}`;
      default:
        return row.kind;
    }
  }

  /** The value a step sets, e.g. ": SAT" or ": 35 %". */
  private _stepValue(row: Row): string {
    const data = (row.data ?? {}) as Record<string, unknown>;
    const parts: string[] = [];
    for (const [key, value] of Object.entries(data)) {
      if (key === "volume_level") parts.push(`${Math.round(Number(value) * 100)} %`);
      else if (key === "brightness_pct" || key === "position" || key === "tilt_position") parts.push(`${value} %`);
      else if (key === "color_temp_kelvin") parts.push(`${value} K`);
      else if (key === "transition") parts.push(this._seconds(value));
      else if (row.step_type !== "call_action") parts.push(String(value));
    }
    return parts.length ? `: ${parts.join(", ")}` : "";
  }

  /** Small notes: conditions, cool-downs, rooms that keep an outlet on. */
  private _notes(row: Row): string[] {
    const notes: string[] = [];
    if (typeof row.condition === "string") notes.push(this._t(`flow.if.${row.condition}`));
    if (row.kind === "ready" && row.reload) notes.push(this._t("flow.reload_if_needed"));
    if (typeof row.option === "string") notes.push(this._t("flow.option", { option: row.option }));
    if (row.kind === "status" && Number(row.typical) > 0) {
      notes.push(this._t("flow.typical", { seconds: this._seconds(row.typical) }));
    }
    if (row.kind === "status" && Number(row.debounce) > 0) {
      notes.push(this._t("flow.debounce", { seconds: this._seconds(row.debounce) }));
    }
    if (row.kind === "turn_off" && Number(row.cooldown) > 0) {
      notes.push(this._t("flow.cooldown", { seconds: this._seconds(row.cooldown) }));
    }
    if (Array.isArray(row.already_on) && row.already_on.length) {
      notes.push(this._t("flow.outlets_already_on", { outlets: this._list(row.already_on) }));
    }
    if (Array.isArray(row.unless_rooms) && row.unless_rooms.length) {
      notes.push(this._t("flow.unless_rooms", { rooms: (row.unless_rooms as string[]).join(", ") }));
    }
    if (row.kind === "hook") {
      const actions = (row.actions as string[] | undefined) ?? [];
      notes.push(this._t("flow.parallel"));
      if (actions.length) notes.push(actions.join(", "));
    }
    return notes;
  }

  /** The action and its targets, as Home Assistant calls it. */
  private _call(row: Row): string | undefined {
    if (typeof row.action !== "string" || row.kind === "hook") {
      return undefined;
    }
    const target = row.entities ? this._list(row.entities) : row.entity_id ? this._entity(row.entity_id) : "";
    return target ? `${row.action} → ${target}` : row.action;
  }

  /** The panel a row is set in: under a device header that device's, else the activity's. */
  private _target(row: Row, header: Row | undefined): { device?: string; panel: string } | undefined {
    const device = (row.device as string | undefined) ?? (header?.kind === "device" ? (header.device as string) : undefined);
    if (header?.kind === "device" && device && DEVICE_PANELS[row.kind]) return { device, panel: DEVICE_PANELS[row.kind] };
    if (header?.kind === "steps" && NESTED.has(row.kind)) return { panel: "steps" };
    if (row.kind === "monitor_watch" && device) return { device, panel: "section_monitor" };
    if (ACTIVITY_PANELS[row.kind]) return { panel: ACTIVITY_PANELS[row.kind] };
    if (row.kind === "device" && device) return { device, panel: "section_device" };
    return undefined;
  }

  private _renderRow(row: Row, nested: boolean, showTime: boolean, group?: Row, status?: RowStatus): TemplateResult {
    const target = this.live ? undefined : this._target(row, group);
    const key = rowKey(row, group);
    const notes = this._hides("notes") ? [] : this._notes(row);
    const call = this._hides("entities") ? undefined : this._call(row);
    const header = HEADERS.has(row.kind);
    const classes = [nested ? "nested" : "", header ? "header" : "", row.kind, status ? `s-${status}` : ""];
    const state = row.kind === "device" && row.device ? this._states[row.device as string] : undefined;
    return html`<li class=${classes.join(" ")}>
      <span class="time"
        >${status === "done"
          ? html`<ha-icon class="mark" icon="mdi:check"></ha-icon>`
          : status === "active"
            ? html`<ha-icon class="mark spin" icon="mdi:loading"></ha-icon>`
            : status === "failed"
              ? html`<ha-icon class="mark" icon="mdi:close"></ha-icon>`
            : showTime
              ? this._time(row.at)
              : ""}</span
      >
      ${header
        ? html`<span class="index">${row.kind === "device" ? row.index : row.kind === "checks" ? "✓" : "≡"}</span>`
        : html`<ha-icon class="icon" .icon=${ICONS[row.kind] ?? "mdi:circle-small"}></ha-icon>`}
      <span class="body">
        <span class="what"
          >${row.kind === "device"
            ? html`${this._device(row.device)}${state?.value
                ? html`<span class="state-chip r-${stateRole(state.group)}" title=${state.value}
                    >${["on", "off", "starting", "stopping", "error"].includes(state.group)
                      ? this._t(`flow.group.${state.group}`)
                      : state.value}</span
                  >`
                : nothing}`
            : row.kind === "steps"
              ? this._t("flow.steps")
              : row.kind === "checks"
              ? this._t("flow.checks")
              : this._text(row)}</span
        >
        ${row.kind === "device" && !this._hides("entities") ? html`<span class="call">${row.entity_id}</span>` : nothing}
        ${call ? html`<span class="call">${call}</span>` : nothing}
        ${notes.length ? html`<span class="notes">${notes.map((n) => html`<span class="note">${n}</span>`)}</span>` : nothing}
      </span>
      ${this.live
        ? nothing
        : html`<span class="acts"
            >${target
              ? html`<button
                  class="ltek-act edit ${this.editing === key ? "on" : ""}"
                  title=${this._t("flow.edit")}
                  aria-label=${this._t("flow.edit")}
                  @click=${() =>
                    this.dispatchEvent(new CustomEvent("flow-edit", { detail: { ...target, key }, bubbles: true, composed: true }))}
                >
                  <ha-icon icon="mdi:pencil-outline"></ha-icon>
                </button>`
              : nothing}${removable(row, group, this._mode)
              ? html`<button
                  class="ltek-del"
                  title=${this._t("flow.delete")}
                  aria-label=${this._t("flow.delete")}
                  @click=${() =>
                    this.dispatchEvent(
                      new CustomEvent("flow-delete", {
                        detail: { row, header: group?.kind, device: (row.device ?? group?.device) as string | undefined, mode: this._mode },
                        bubbles: true,
                        composed: true,
                      }),
                    )}
                >
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>`
              : nothing}</span
          >`}
    </li>
    ${!this.live && this.editing === key ? html`<li class="inline"><slot name="edit"></slot></li>` : nothing}`;
  }

  private _renderRows(rows: Row[]): TemplateResult {
    const under = groups(rows);
    let statuses: RowStatus[] | undefined;
    if (this.live && ["starting", "stopping", "active", "error"].includes(this.live.state)) {
      statuses = rowStatuses(rows, this.live, this._reached);
      const active = statuses.lastIndexOf("active");
      if (active > this._reached && !HEADERS.has(rows[active].kind)) this._reached = active;
    }
    const background = rows.filter((row) => row.background);
    let last = "";
    const items = rows.flatMap((row, i) => {
      if (row.background || (!this._detailsOn && hiddenRow(row, this._detailKinds))) return [];
      const time = this._time(row.at);
      const show = time !== last || row.kind === "state";
      last = time;
      return [this._renderRow(row, under[i] !== undefined, show, under[i], statuses?.[i])];
    });
    return html`<ol class="flow">${items}</ol>
      ${background.length
        ? html`<h4>${this._t("flow.background")}</h4>
            <ol class="flow">${background
              .filter((row) => this._detailsOn || !hiddenRow(row, this._detailKinds))
              .map((row) => this._renderRow(row, false, true, undefined, statuses?.[rows.indexOf(row)]))}</ol>`
        : nothing}`;
  }

  // ------------------------------------------------------------------

  protected render(): TemplateResult {
    if (this.live) {
      return html`${this._renderBody()}`;
    }
    const others = Object.entries(this.room.activities ?? {}).filter(([id]) => id !== this.activityId);
    return html`
      <details class="ltek-sub options">
        <summary><ha-icon icon="mdi:tune-variant"></ha-icon>${this._t("flow.options")}</summary>
        <div class="ltek-sub-body">
          <p class="ltek-hint">${this._t("flow.options_hint")}</p>
          ${FLOW_DETAILS.map(
            (kind) => html`<label class="check"
              ><input
                type="checkbox"
                .checked=${this._detailKinds.includes(kind)}
                @change=${(ev: Event) => {
                  const on = (ev.target as HTMLInputElement).checked;
                  this._setDetailKinds(on ? [...this._detailKinds, kind] : this._detailKinds.filter((k) => k !== kind));
                }}
              />${this._t(`flow.detail_${kind}`)}</label
            >`,
          )}
        </div>
      </details>
      <div class="modes" role="tablist">
        ${(["start", "stop", "monitor"] as Mode[]).map(
          (mode) => html`<button
            role="tab"
            class=${this._mode === mode ? "active" : ""}
            aria-selected=${this._mode === mode ? "true" : "false"}
            @click=${() => (this._mode = mode)}
          >
            ${this._t(`flow.mode_${mode}`)}
          </button>`,
        )}
        <button class="chip ${this._showDetails ? "on" : ""}" @click=${() => (this._showDetails = !this._showDetails)}>
          <ha-icon icon=${this._showDetails ? "mdi:eye-outline" : "mdi:eye-off-outline"}></ha-icon>${this._t("flow.details_chip")}
        </button>
        ${this._mode === "start" && others.length
          ? html`<select
              aria-label=${this._t("flow.from_label")}
              @change=${(ev: Event) => {
                const value = (ev.target as HTMLSelectElement).value;
                this._from = value || undefined;
              }}
            >
              <option value="" ?selected=${!this._from}>${this._t("flow.from_idle")}</option>
              ${others.map(
                ([id, activity]) =>
                  html`<option value=${id} ?selected=${this._from === id}>
                    ${this._t("flow.from", { activity: activity.name || id })}
                  </option>`,
              )}
            </select>`
          : nothing}
      </div>
      ${this._renderBody()}
    `;
  }

  private _renderBody(): TemplateResult {
    if (this._failed) {
      return html`<p class="error">${this._t("flow.failed", { error: this._failed })}</p>`;
    }
    const flow = this._flow;
    if (!flow) {
      return html`<p class="hint">${this._t("loading")}</p>`;
    }
    if (flow.error) {
      const path = flow.error.path.join(".");
      return html`<p class="error">
        ${this._t("flow.invalid", { error: path ? `${path}: ${flow.error.message}` : flow.error.message })}
      </p>`;
    }
    const [min, max] = flow.done;
    const background = flow.rows.filter((row) => row.background).map((row) => row.at[0]);
    const summary =
      this._mode === "monitor"
        ? this._t("flow.summary_monitor")
        : this._mode === "start"
        ? this._t(min === max ? "flow.summary_start_fixed" : "flow.summary_start", {
            min: this._seconds(min),
            max: this._seconds(max),
          })
        : this._t(background.length ? "flow.summary_stop_cut" : "flow.summary_stop", {
            seconds: this._seconds(Math.max(0, ...background)),
          });
    return html`${this._renderRows(flow.rows)}
      ${this.live ? nothing : html`<div class="adder"><slot name=${`add-${this._mode}`}></slot></div>`}
      ${this._detailsOn ? html`<p class="summary">${summary}</p>` : nothing}`;
  }

  static styles = [
    ltekTokens,
    ltekPanelScale,
    ltekChrome,
    css`
    :host {
      display: block;
    }
    .modes {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .modes button {
      font: inherit;
      padding: 6px 14px;
      border-radius: 16px;
      border: 1px solid var(--divider-color);
      background: none;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .modes button.active {
      background: var(--ltek-c-accent);
      border-color: var(--ltek-c-accent);
      color: var(--ltek-c-on-accent);
    }
    .modes select {
      font: inherit;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      max-width: 100%;
    }
    ol.flow {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ol.flow li {
      display: grid;
      grid-template-columns: 64px 24px minmax(0, 1fr) auto;
      gap: 4px 10px;
      align-items: start;
      padding: 6px 0;
      border-top: 1px solid var(--divider-color);
    }
    ol.flow li:first-child {
      border-top: none;
    }
    ol.flow li.nested {
      grid-template-columns: 64px 40px minmax(0, 1fr) auto;
      border-top: none;
      padding-top: 2px;
    }
    ol.flow li.nested .icon {
      justify-self: end;
    }
    .time {
      color: var(--secondary-text-color);
      font-size: var(--ltek-fs-small);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      text-align: right;
      padding-top: 2px;
    }
    .icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
    li.state .icon,
    li.state .what {
      color: var(--primary-color);
    }
    li.state .what,
    li.header .what {
      font-weight: 500;
    }
    .index {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 1px solid var(--accent-color, var(--ltek-c-accent));
      color: var(--accent-color, var(--ltek-c-accent));
      font-size: var(--ltek-fs-small);
      font-weight: 500;
      box-sizing: border-box;
    }
    /* A device's (or the steps') heading: number and name in the theme accent */
    li.header .what {
      color: var(--accent-color, var(--ltek-c-accent));
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    /* A device's state now, as a chip beside its name */
    .state-chip {
      display: inline-block;
      margin-left: var(--ltek-sp-2);
      padding: 0 8px;
      border-radius: 10px;
      border: 1px solid currentColor;
      font-size: var(--ltek-fs-tiny);
      font-weight: var(--ltek-fw-medium);
      vertical-align: 1px;
      color: var(--secondary-text-color);
    }
    .state-chip.r-on {
      color: var(--state-icon-active-color, var(--state-active-color, var(--ltek-c-accent)));
    }
    .state-chip.r-busy {
      color: var(--warning-color, #ffa600);
    }
    .state-chip.r-error {
      color: var(--error-color, #db4437);
    }
    .state-chip.r-unavailable {
      color: var(--state-unavailable-color, var(--disabled-text-color, #6f6f6f));
    }
    /* Step number and icon: yellow while it runs, green done, red failed */
    li.s-active .icon,
    li.s-active .index,
    li.s-active .mark {
      color: var(--yellow-color, #ffeb3b);
      border-color: currentColor;
    }
    li.s-done .icon,
    li.s-done .index,
    li.s-done .mark {
      color: var(--green-color, #4caf50);
      border-color: currentColor;
    }
    li.s-failed .icon,
    li.s-failed .index,
    li.s-failed .mark {
      color: var(--red-color, #f44336);
      border-color: currentColor;
    }
    /* Live: done, doing, still to come */
    li.s-done .what {
      color: var(--secondary-text-color);
    }
    li.s-done.header .what {
      color: var(--accent-color, var(--ltek-c-accent));
    }
    li.s-active {
      background: var(--ltek-c-accent-fade);
      border-radius: var(--ltek-r-ctrl);
    }
    li.s-active .what {
      font-weight: var(--ltek-fw-semibold);
    }
    li.s-todo {
      opacity: 0.6;
    }
    .mark {
      --mdc-icon-size: 16px;
    }
    .mark.spin {
      animation: spin 1s linear infinite;
    }
    details.options {
      margin-bottom: var(--ltek-sp-3);
    }
    details.options label.check {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      margin: 0 var(--ltek-sp-5) var(--ltek-sp-2) 0;
      font-size: var(--ltek-fs-body);
      color: var(--ltek-c-label);
    }
    details.options input {
      accent-color: var(--ltek-c-accent);
    }
    .modes .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px 3px 8px;
      border-radius: 14px;
      border: 1px solid var(--divider-color);
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: var(--ltek-fs-small);
      cursor: pointer;
      --mdc-icon-size: 16px;
    }
    .modes .chip.on {
      border-color: var(--ltek-c-accent);
      color: var(--ltek-c-accent);
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .acts {
      display: flex;
      gap: 2px;
      align-items: flex-start;
    }
    .acts .ltek-del {
      --mdc-icon-size: 16px;
      padding-top: 2px;
      opacity: 0.45;
    }
    li:hover .acts .ltek-del {
      opacity: 1;
    }
    button.edit.on {
      opacity: 1;
      color: var(--ltek-c-accent);
    }
    ol.flow li.inline {
      display: block;
      border-top: none;
      margin: 4px 0 8px 74px;
      padding: 10px 12px;
      border-left: 3px solid var(--ltek-c-accent);
      border-radius: 0 8px 8px 0;
      background: var(--secondary-background-color);
    }
    .adder {
      margin-top: 10px;
    }
    button.edit {
      --mdc-icon-size: 16px;
      padding-top: 2px;
      opacity: 0.55;
    }
    li:hover button.edit {
      opacity: 1;
      color: var(--ltek-c-accent);
    }
    .call {
      font-family: var(--code-font-family, monospace);
      font-size: var(--ltek-fs-small);
      color: var(--secondary-text-color);
    }
    .notes {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .note {
      font-size: var(--ltek-fs-small);
      padding: 1px 8px;
      border-radius: 10px;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
    }
    h4 {
      font-size: var(--ltek-fs-group);
      font-weight: 500;
      margin: 16px 0 4px;
    }
    .summary {
      margin: 12px 0 0;
      font-size: var(--ltek-fs-body);
      color: var(--secondary-text-color);
      line-height: 1.4;
    }
    .error {
      color: var(--error-color, #db4437);
      margin: 0;
    }
    .hint {
      color: var(--secondary-text-color);
      margin: 0;
    }
    @media (max-width: 450px) {
      ol.flow li {
        grid-template-columns: 58px 22px minmax(0, 1fr) auto;
        gap: 4px 6px;
      }
      ol.flow li.nested {
        grid-template-columns: 58px 32px minmax(0, 1fr) auto;
      }
      .time {
        font-size: var(--ltek-fs-small);
      }
    }
  `,
  ];
}

if (!customElements.get("easy-av-control-flow")) {
  customElements.define("easy-av-control-flow", EasyAvControlFlow);
}
