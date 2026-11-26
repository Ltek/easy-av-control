/**
 * Editor of one room: lists of devices and activities, a detail view for
 * each, and a YAML view. Every detail view is one level deep and split into
 * cards; rarely needed settings sit in a collapsed "Advanced" card. All
 * fields are Home Assistant's own ha-form selectors; changes are sent up as
 * "room-changed" events and saved by the panel.
 */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { live } from "lit/directives/live.js";

import type { HomeAssistant } from "../types";
import {
  GROUPS,
  SETTINGS,
  SETTING_ENTITY_DOMAINS,
  SETTING_LISTS,
  STEP_TYPES,
  autoSettings,
  byIntegration,
  deviceAutoSettings,
  integrationTitle,
  sortedActivities,
  clean,
  cleanRemote,
  deviceList,
  deviceUsage,
  isQuickSelect,
  renameDevice,
  slugify,
  sourceList,
  stepSchema,
  uniqueKey,
  type Activity,
  type Device,
  type Obj,
  type Related,
  type Room,
  type Sources,
  type Step,
} from "./model";
import {
  FAILURES,
  STATE_KEYS,
  WAIT_MODES,
  applyStateForm,
  detectedChanges,
  seconds as asSeconds,
  suggestedTimeouts,
  stateFormData,
  type Detect,
  type ProfileView,
} from "./device-state";
import "./flow-view";
import { exportActivities, flowDevice, importActivities, withBefore, withFlow, withoutDevice, type Before } from "./model";
import "./ltek-form";
import { ltekChrome, ltekPanelScale, ltekTokens } from "./ltek-styles";
import "./remote-preview";
import { t } from "./strings";

type Tab = "devices" | "activities" | "watchdog" | "yaml";

/** What the editor shows: a list (the tab) or one device or activity. */
type View = { kind: "list" } | { kind: "device"; id: string } | { kind: "activity"; id: string } | { kind: "watchdog" };

/** "on, idle" -> ["on", "idle"]; one state stays a plain string. */
function splitStates(value: string | undefined): string | string[] | undefined {
  const states = (value ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  return states.length > 1 ? states : states[0];
}

/** Times are sliders (design guide), each with a range that suits it. */
const slider = (max: number, step = 1, min = 0) => ({
  number: { min, max, step, mode: "slider", unit_of_measurement: "s" },
});
const SECONDS = slider(600);

/** The icon of each panel, by its title's text key. */
const CARD_ICONS: Record<string, string> = {
  section_device: "mdi:television",
  section_state: "mdi:state-machine",
  section_power: "mdi:power-socket-eu",
  section_delays: "mdi:timer-sand",
  section_ready: "mdi:lan-connect",
  card_settings: "mdi:tune-vertical",
  section_general: "mdi:information-outline",
  section_activity_devices: "mdi:format-list-numbered",
  section_checks: "mdi:check-decagram-outline",
  steps: "mdi:playlist-play",
  remote: "mdi:remote",
  quick_select: "mdi:gesture-tap-button",
  section_flow: "mdi:sitemap-outline",
  section_remote_preview: "mdi:cellphone-screenshot",
};
const SHORT = slider(120);

/** A device's settings, in order: [panel title key, icon]; its hint key is in DEVICE_HINTS. */
const DEVICE_SECTIONS: [string, string][] = [
  ["section_device", "mdi:television"],
  ["section_state", "mdi:state-machine"],
  ["section_power", "mdi:power-socket-eu"],
];
const DEVICE_HINTS: Record<string, string> = {
  section_device: "hint_device",
  section_state: "hint_state",
  section_power: "hint_power",
  section_delays: "hint_delays",
  section_ready: "hint_ready",
  section_monitor: "hint_monitor",
};

export class EasyAvControlRoomEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    room: { attribute: false },
    roomId: { attribute: false },
    sources: { attribute: false },
    soundModes: { attribute: false },
    saved: { attribute: false },
    _tab: { state: true },
    _view: { state: true },
    _notice: { state: true },
    _related: { state: true },
    _detect: { state: true },
    profiles: { attribute: false },
    jump: { attribute: false },
    _powerOn: { state: true },
    _flowEditing: { state: true },
    _draftStartedBy: { state: true },
    _general: { state: true },
    _run: { state: true },
    _io: { state: true },
  };

  declare hass: HomeAssistant;
  declare room: Room;
  declare roomId: string;
  declare sources: Sources;
  /** Remembered sound mode lists, like the source lists */
  declare soundModes: Sources;
  /** The room as last saved; IDs of what is not saved yet follow their names. */
  declare saved?: Room;
  declare _tab: Tab;
  declare _view: View;
  declare _notice?: string;
  /** Numbers and selects each device entity offers automatically */
  declare _related: Related;
  private _relatedKey = "";
  /** Detected box per device: what its profile finds (config/detect), keyed by entity + state settings */
  declare _detect: Record<string, Detect>;
  private _detectAsked = new Set<string>();
  /** All profiles (profiles/list), for the profile picker; given by the panel */
  declare profiles: ProfileView[];
  /** From the menu: open this activity, at its Flow when ``flow``; ``n`` makes each click a change */
  declare jump?: { activity?: string; flow: boolean; tab?: string; n: number };
  /** Devices whose outlet is ticked but not picked yet */
  declare _powerOn: Set<string>;
  /** The Flow row being edited in place: its key (flow-view rowKey) and the panel it stands for */
  declare _flowEditing?: { key: string; device?: string; panel: string };
  /** A Started by entry being added: kept here until it has an entity and a state, so the room stays valid */
  /** The Export / Import dialog of activities */
  declare _io?: { mode: "export" | "import"; text: string; message?: string };
  declare _draftStartedBy?: { entity_id: string; state: string; stop_state?: string };
  /** The General settings unlocked for editing: whose (the page key), and the values typed so far. Nothing
   *  reaches the room until Save. */
  declare _general?: { key: string; draft: Obj };
  /** What this room is doing (control/subscribe), for the colours of the Flow while an activity runs */
  declare _run?: { state: string; current?: { kind: string; device?: string | null; step?: number } | null; activity?: string | null };
  private _runUnsub?: Promise<() => void>;
  private _runRoom?: string;
  /** The outlet a device had when it was unticked, to bring back when it is ticked again */
  private _powerMemo = new Map<string, Obj>();
  private _holdTimer?: number;
  /** One panel open at a time (design guide): per page, the open one ("" = none); absent = the first one */
  private _openPanel = new Map<string, string>();
  /** While a page renders: the first panel that may start open */
  private _firstPanel?: string;

  constructor() {
    super();
    this._tab = "devices";
    this._view = { kind: "list" };
    this.sources = {};
    this.soundModes = {};
    this._related = {};
    this._detect = {};
    this.profiles = [];
    this._powerOn = new Set();
  }

  /** Ask for the related entities whenever the room's device entities change. */
  private _loadRelated(): void {
    const ids = [...new Set(Object.values(this.room?.devices ?? {}).map((d) => d.entity_id).filter(Boolean))].sort();
    const key = ids.join(",");
    if (!this.hass || key === this._relatedKey) {
      return;
    }
    this._relatedKey = key;
    this.hass
      .callWS<Related>({ type: "easy_av_control/config/related", entity_ids: ids })
      .then((related) => {
        if (key === this._relatedKey) {
          this._related = related;
        }
      })
      .catch(() => undefined);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unwatchRun();
  }

  private _unwatchRun(): void {
    const unsub = this._runUnsub;
    this._runUnsub = undefined;
    this._runRoom = undefined;
    this._run = undefined;
    unsub?.then((fn) => fn()).catch(() => undefined);
  }

  /** Follow the room's state while its page is open; a room not saved yet has none. */
  private _watchRun(): void {
    if (!this.hass?.connection || !this.roomId || this._runRoom === this.roomId) return;
    this._unwatchRun();
    const room = this.roomId;
    this._runRoom = room;
    const sub = this.hass.connection.subscribeMessage<{ state: string; current: unknown; activity: string | null } | null>(
      (view) => {
        if (this._runRoom !== room) return;
        this._run = view ? ({ state: view.state, current: view.current, activity: view.activity } as typeof this._run) : undefined;
      },
      { type: "easy_av_control/control/subscribe", room },
    );
    sub.catch(() => undefined);
    this._runUnsub = sub;
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("hass") || changed.has("roomId")) {
      this._watchRun();
    }
    if (changed.has("room") || changed.has("hass")) {
      this._loadRelated();
    }
    // Another room: back to its lists
    if (changed.has("roomId") && changed.get("roomId") !== undefined) {
      this._view = { kind: "list" };
      this._notice = undefined;
    }
    if (changed.has("_view") || changed.has("roomId")) {
      this._general = undefined;
    }
    if (changed.has("_view")) {
      this._flowEditing = undefined;
      this._draftStartedBy = undefined;
    }
    const jump = this.jump;
    if (changed.has("jump") && jump && !jump.activity) {
      this._view = { kind: "list" };
      if (jump.tab) this._tab = jump.tab as Tab;
      this._notice = undefined;
    } else if (changed.has("jump") && jump?.activity && this.room?.activities?.[jump.activity]) {
      this._view = { kind: "activity", id: jump.activity };
      this._notice = undefined;
      if (jump.flow) {
        this._openPanel.set(this._pageKey(), `activity:${this._t("section_flow")}`);
      }
      window.scrollTo({ top: 0 });
    }
    if (changed.has("_view") || changed.has("roomId") || changed.has("jump")) {
      this.dispatchEvent(new CustomEvent("view-changed", { detail: { view: this._view } }));
    }
  }

  private _t(key: string, params?: Record<string, string>): string {
    return t(this.hass?.language, key, params);
  }

  private _label = (schema: { name: string }): string => this._t(`field.${schema.name}`);

  /** Help below a field, where there is one. */
  private _helper = (schema: { name: string }): string | undefined => {
    const key = `helper.${schema.name}`;
    const text = this._t(key);
    return text === key ? undefined : text;
  };

  private _emit(room: Room): void {
    this.dispatchEvent(new CustomEvent("room-changed", { detail: { room } }));
  }

  private _show(view: View): void {
    this._view = view;
    this._notice = undefined;
    window.scrollTo({ top: 0 });
  }

  // ------------------------------------------------------------------

  protected render(): TemplateResult {
    this._firstPanel = undefined;
    const view = this._view;
    if (view.kind === "device" && this.room.devices?.[view.id]) {
      return this._renderDevice(view.id, this.room.devices[view.id]);
    }
    if (view.kind === "activity" && this.room.activities?.[view.id]) {
      return this._renderActivity(view.id, this.room.activities[view.id]);
    }
    const activityOptions = [
      { value: "__last", label: this._t("default_last") },
      ...Object.entries(this.room.activities ?? {}).map(([id, a]) => ({ value: id, label: a.name ?? id })),
    ];
    const area = this.room.area_id ? this.hass?.areas?.[this.room.area_id] : undefined;
    const floor = area?.floor_id ? this.hass?.floors?.[area.floor_id] : undefined;
    const defaultActivity = this.room.default_activity
      ? (this.room.activities?.[this.room.default_activity]?.name ?? this.room.default_activity)
      : this._t("default_last");
    return html`
      ${this._generalHeader({
        title: this.room.name ?? this.roomId,
        icon: area?.icon || "mdi:sofa-outline",
        meta: [
          html`<span><ha-icon icon="mdi:map-marker-outline"></ha-icon>${area ? `${area.name}${floor ? ` · ${floor.name}` : ""}` : this._t("gen_no_area")}</span>`,
          html`<span><ha-icon icon="mdi:play-circle-outline"></ha-icon>${this._t("room_default_activity")}: ${defaultActivity}</span>`,
        ],
        data: {
          name: this.room.name ?? "",
          area_id: this.room.area_id ?? undefined,
          default_activity: this.room.default_activity ?? "__last",
        },
        schema: [
          { name: "name", required: true, selector: { text: {} } },
          { name: "area_id", selector: { area: {} } },
          { name: "default_activity", selector: { select: { options: activityOptions, mode: "dropdown" } } },
        ],
        label: (s: { name: string }) => this._t(`room_${s.name === "area_id" ? "area" : s.name}`),
        save: (v: Obj) =>
          this._emit(
            clean({
              ...this.room,
              name: ((v.name as string | undefined)?.trim() || this.room.name) as string,
              area_id: v.area_id as string,
              default_activity: v.default_activity === "__last" ? undefined : (v.default_activity as string),
            }),
          ),
      })}

      <div class="tabs" role="tablist">
        ${(["devices", "activities", "watchdog", "yaml"] as Tab[]).map(
          (tab) => html`<button
            role="tab"
            class=${this._tab === tab ? "active" : ""}
            aria-selected=${this._tab === tab ? "true" : "false"}
            @click=${() => (this._tab = tab)}
          >
            ${this._t(`tab_${tab}`)}
          </button>`,
        )}
      </div>
      ${this._notice ? html`<div class="notice">${this._notice}</div>` : nothing}
      ${this._tab === "devices"
        ? this._renderDeviceList()
        : this._tab === "activities"
          ? this._renderActivityList()
          : this._tab === "watchdog"
            ? this._renderWatchdog()
            : this._renderYaml()}
      <button class="ltek-btn danger delete-room" @click=${() => this.dispatchEvent(new CustomEvent("delete-room"))}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        ${this._t("delete_room")}
      </button>
    `;
  }

  /** A page's General settings as a header: name, icon and the rest read-only, a lock to edit them. Edits stay
   *  in a draft until Save, which applies them and saves the configuration; Cancel drops them. */
  private _generalHeader(o: {
    title: string;
    icon: string;
    meta: TemplateResult[];
    data: Obj;
    schema: Obj[];
    label: (s: { name: string }) => string;
    save: (v: Obj) => void;
    beside?: TemplateResult;
  }): TemplateResult {
    const key = this._pageKey();
    const editing = this._general?.key === key ? this._general : undefined;
    return html`<div class="gen-head ${editing ? "editing" : ""}">
        <div class="gen-icon"><ha-icon icon=${o.icon}></ha-icon></div>
        <div class="gen-text">
          <h2>${o.title}</h2>
          <div class="gen-meta">${o.meta}</div>
        </div>
        <button
          class="gen-lock ${editing ? "open" : ""}"
          title=${this._t(editing ? "gen_lock" : "gen_unlock")}
          aria-label=${this._t(editing ? "gen_lock" : "gen_unlock")}
          aria-pressed=${editing ? "true" : "false"}
          @click=${() => (this._general = editing ? undefined : { key, draft: { ...o.data } })}
        >
          <ha-icon icon=${editing ? "mdi:lock-open-variant-outline" : "mdi:lock-outline"}></ha-icon>
        </button>
        ${o.beside ?? nothing}
      </div>
      ${editing
        ? html`<div class="gen-edit">
            <ltek-form
              .hass=${this.hass}
              .data=${editing.draft}
              .schema=${o.schema}
              .computeLabel=${o.label}
              .computeHelper=${this._helper}
              @value-changed=${(ev: CustomEvent) => (this._general = { key, draft: ev.detail.value as Obj })}
            ></ltek-form>
            <div class="gen-bar">
              <button
                class="ltek-btn primary"
                ?disabled=${JSON.stringify(editing.draft) === JSON.stringify(o.data)}
                @click=${() => {
                  this._general = undefined;
                  o.save(editing.draft);
                  this.dispatchEvent(new CustomEvent("save-request", { bubbles: true, composed: true }));
                }}
              >
                <ha-icon icon="mdi:content-save-outline"></ha-icon> ${this._t("save")}
              </button>
              <button class="ltek-btn" @click=${() => (this._general = undefined)}>${this._t("cancel")}</button>
            </div>
          </div>`
        : nothing}`;
  }

  /** Header of a detail view: back, title, delete. */
  private _detailHeader(
    back: string | undefined,
    title: string,
    onDelete: () => void,
    beside?: TemplateResult,
    onDuplicate?: () => void,
    onExport?: () => void,
    titleBlock?: TemplateResult,
  ): TemplateResult {
    return html`<div class="detail-head">
        ${back
          ? html`<button class="back" @click=${() => this._show({ kind: "list" })}>
              <ha-icon icon="mdi:arrow-left"></ha-icon>
              <span>${back}</span>
            </button>`
          : nothing}
        <span class="head-acts">
          ${onExport
            ? html`<button class="ltek-btn" @click=${onExport}>
                <ha-icon icon="mdi:export"></ha-icon> ${this._t("act_export")}
              </button>`
            : nothing}
          ${onDuplicate
            ? html`<button class="ltek-btn" @click=${onDuplicate}>
                <ha-icon icon="mdi:content-copy"></ha-icon> ${this._t("duplicate")}
              </button>`
            : nothing}
          <button class="ltek-btn danger" @click=${onDelete}>
            <ha-icon icon="mdi:trash-can-outline"></ha-icon> ${this._t("delete")}
          </button>
        </span>
      </div>
      ${titleBlock ?? html`<div class="title-row"><h2>${title}</h2>${beside ?? nothing}</div>`}
      ${this._notice ? html`<div class="notice">${this._notice}</div>` : nothing}`;
  }

  /** Startup (held 3 s, so a stray tap starts nothing) and Shutdown, beside the activity's name. */
  private _runButtons(id: string): TemplateResult {
    const saved = Boolean(this.saved?.activities?.[id]) && this.saved?.activities?.[id]?.enabled !== false;
    const activity = this.room.activities?.[id] ?? {};
    const enabled = activity.enabled !== false;
    const startHold = (ev: PointerEvent) => {
      const button = ev.currentTarget as HTMLElement;
      button.setPointerCapture?.(ev.pointerId);
      button.classList.add("holding");
      this._holdTimer = window.setTimeout(() => {
        button.classList.remove("holding");
        this._holdTimer = undefined;
        void this.hass.callService("easy_av_control", "start_activity", { room: this.roomId, activity: id });
      }, 3000);
    };
    const cancelHold = (ev: Event) => {
      (ev.currentTarget as HTMLElement).classList.remove("holding");
      window.clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    };
    return html`<span class="run-buttons">
      <label class="enabled-toggle ${enabled ? "" : "off"}" title=${this._t("act_enabled_hint")}>
        <input
          type="checkbox"
          .checked=${live(enabled)}
          @change=${(ev: Event) =>
            this._setActivity(id, { ...activity, enabled: (ev.target as HTMLInputElement).checked ? undefined : false })}
        />
        ${this._t(enabled ? "act_enabled" : "act_disabled")}
      </label>
      <button
        class="run-btn startup"
        title=${`${this._t("act_hold")}. ${this._t("act_saved_only")}`}
        ?disabled=${!saved}
        @pointerdown=${startHold}
        @pointerup=${cancelHold}
        @pointerleave=${cancelHold}
        @pointercancel=${cancelHold}
        @contextmenu=${(ev: Event) => ev.preventDefault()}
      >
        <span class="fill"></span><ha-icon icon="mdi:play"></ha-icon>${this._t("act_startup")}
      </button>
      <button
        class="run-btn shutdown"
        title=${this._t("act_shutdown")}
        @click=${() => this.hass.callService("easy_av_control", "stop_activity", { room: this.roomId })}
      >
        <ha-icon icon="mdi:stop"></ha-icon>${this._t("act_shutdown")}
      </button>
    </span>`;
  }

  /** A top-level panel (design guide): accent border when open; open or closed survives every redraw. */
  private _panel(
    key: string,
    icon: string,
    title: string,
    hint: string,
    body: TemplateResult,
    startOpen = true,
  ): TemplateResult {
    const page = this._pageKey();
    if (startOpen && this._firstPanel === undefined) this._firstPanel = key;
    const current = this._openPanel.get(page) ?? this._firstPanel;
    const open = current === key;
    return html`<details
      class="ltek-sec"
      .open=${live(open)}
      @toggle=${(ev: Event) => {
        const now = (ev.target as HTMLDetailsElement).open;
        const shown = this._openPanel.get(page) ?? this._firstPanel;
        if (now && shown !== key) {
          this._openPanel.set(page, key);
          this.requestUpdate();
        } else if (!now && shown === key) {
          this._openPanel.set(page, "");
          this.requestUpdate();
        }
      }}
    >
      <summary><ha-icon icon=${icon}></ha-icon>${title}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${hint ? html`<p class="ltek-hint">${hint}</p>` : nothing}${body}</div>
    </details>`;
  }

  /** The page a panel belongs to: the room's own settings, or one device or activity. */
  private _pageKey(): string {
    const view = this._view;
    return view.kind === "list" || view.kind === "watchdog" ? `${view.kind}:${this.roomId}` : `${view.kind}:${this.roomId}:${view.id}`;
  }

  /** A titled panel with a short explanation. */
  private _card(title: string, hint: string, body: TemplateResult, icon?: string): TemplateResult {
    const key = Object.entries(CARD_ICONS).find(([k]) => this._t(k) === title);
    return this._panel(`${this._view.kind}:${title}`, icon ?? key?.[1] ?? "mdi:tune-variant", title, hint, body);
  }

  /** The panel for rarely needed settings: starts closed. */
  private _advanced(hint: string, body: TemplateResult): TemplateResult {
    const title = this._t("section_advanced");
    return this._panel(`${this._view.kind}:${title}`, "mdi:cog-outline", title, hint, body, false);
  }

  // ------------------------------------------------------------------
  // Devices
  // ------------------------------------------------------------------

  private _deviceTitle(id: string, device: Device): string {
    const state = device.entity_id ? this.hass.states[device.entity_id] : undefined;
    return device.name || (state?.attributes.friendly_name as string) || (device.entity_id ? id : this._t("new_device"));
  }

  private _renderDeviceList(): TemplateResult {
    const devices = Object.entries(this.room.devices ?? {});
    return html`
      <p class="ltek-hint">${this._t("devices_intro")}</p>
      <div class="ltek-list">
        <button class="ltek-add" @click=${this._addDevice}>+ ${this._t("add_device")}</button>
      ${devices.length
        ? html`
            ${devices.map(([id, device]) => {
              const known = !device.entity_id || this._entityKnown(device.entity_id);
              return this._row(
                this._deviceTitle(id, device),
                device.entity_id || this._t("no_entity"),
                () => this._show({ kind: "device", id }),
                known ? undefined : this._t("entity_missing"),
                this._deviceIcon(device),
              );
            })}`
        : html`<p class="ltek-hint">${this._t("devices_empty")}</p>`}
      </div>
    `;
  }

  private _entityKnown(entityId: string): boolean {
    return entityId in this.hass.states || entityId in (this.hass.entities ?? {});
  }

  private _row(
    title: string,
    sub: string,
    open: () => void,
    warning?: string,
    icon = "mdi:play-circle-outline",
  ): TemplateResult {
    return html`<button class="ltek-item" @click=${open}>
      <ha-icon class="lead" icon=${icon}></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${title}</span>
        <span class="ltek-subline">${sub}</span>
        ${warning ? html`<span class="ltek-warn ltek-subline">${warning}</span>` : nothing}
      </span>
      <ha-icon class="ltek-act" icon="mdi:chevron-right"></ha-icon>
    </button>`;
  }

  /** The device's own icon, else one for its domain. */
  private _deviceIcon(device: Device): string {
    const state = device.entity_id ? this.hass.states[device.entity_id] : undefined;
    const own = state?.attributes.icon as string | undefined;
    if (own) return own;
    const domain = device.entity_id?.split(".")[0];
    return domain === "remote" ? "mdi:remote" : domain === "switch" ? "mdi:power-socket-eu" : "mdi:television";
  }

  private _deviceData(device: Device): Obj {
    const ready = device.ready ?? null;
    return {
      entity_id: device.entity_id,
      name: device.name,
      remote_entity: device.remote_entity ?? undefined,
      power_switch: device.power_switch ?? undefined,
      delay_after_power: device.delay_after_power,
      delay_after_on: device.delay_after_on,
      delay_after_off: device.delay_after_off,
      turn_off_after: device.turn_off_after,
      option: device.option,
      off_option: device.off_option,
      ready_enabled: ready !== null,
      ready_entity: ready?.entity_id,
      ready_state: Array.isArray(ready?.state) ? ready?.state.join(", ") : ready?.state,
      ready_timeout: ready?.timeout,
      ready_reload: ready?.reload_integration,
      ready_on_timeout: ready?.on_timeout,
      commands: device.commands,
    };
  }

  /** One card's ha-form; its values are merged into the whole device. */
  private _deviceForm(id: string, data: Obj, schema: Obj[], disabled = false): TemplateResult {
    return html`<ltek-form
      .hass=${this.hass}
      .disabled=${disabled}
      .data=${data}
      .schema=${schema}
      .computeLabel=${this._label}
      .computeHelper=${this._helper}
      @value-changed=${(ev: CustomEvent) => this._deviceChanged(id, { ...data, ...(ev.detail.value as Obj) })}
    ></ltek-form>`;
  }

  /** The remote entity of the same device, e.g. remote.apple_tv for media_player.apple_tv. */
  private _remoteOf(entityId: string | undefined): string | undefined {
    const entities = this.hass.entities ?? {};
    const deviceId = entityId ? entities[entityId]?.device_id : undefined;
    if (!deviceId) {
      return undefined;
    }
    return Object.values(entities).find((e) => e?.device_id === deviceId && e.entity_id.startsWith("remote."))
      ?.entity_id;
  }

  private _renderDevice(id: string, device: Device): TemplateResult {
    const data = this._deviceData(device);
    const usage = deviceUsage(this.room, id);

    return html`
      ${this._detailHeader(this._t("tab_devices"), this._deviceTitle(id, device), () => this._deleteDevice(id))}
      ${usage.length ? html`<p class="ltek-hint">${this._t("used_by", { where: usage.join(", ") })}</p>` : nothing}

      ${DEVICE_SECTIONS.map(([panel, icon]) => this._card(this._t(panel), this._t(DEVICE_HINTS[panel]), this._deviceSection(id, device, panel), icon))}
      ${this._advanced(
        this._t("hint_device_advanced"),
        html`<label class="id">
            ${this._t("device_id")}
            <input
              .value=${id}
              @change=${(ev: Event) => this._renameDevice(id, (ev.target as HTMLInputElement).value)}
            />
          </label>
          ${this._deviceForm(id, data, [{ name: "commands", selector: { object: {} } }])}`,
      )}
      ${this._cardDivider()}
      ${this._card(this._t("card_settings"), this._t("device_settings_hint"), this._renderDeviceSettings(id, device))}
    `;
  }

  /** One section of a device's settings: on its page, and in place in an activity's Flow. */
  private _deviceSection(id: string, device: Device, panel: string): TemplateResult {
    const data = this._deviceData(device);
    const ready = device.ready ?? null;
    const remote = this._remoteOf(device.entity_id);
    const presetApplied =
      ready?.entity_id === remote && ready?.reload_integration === true && device.remote_entity === remote;
    const isSelect = /^(input_)?select\./.test(device.entity_id ?? "");
    const options = ((device.entity_id ? this.hass.states[device.entity_id]?.attributes.options : undefined) as string[] | undefined) ?? [];
    const pick = (values: string[]) => ({ select: { options: values.map((v) => ({ value: v, label: v })), mode: "dropdown", custom_value: true } });
    switch (panel) {
      case "section_device":
        return this._deviceForm(id, data, [
          { name: "entity_id", required: true, selector: { entity: {} } },
          { name: "name", selector: { text: {} } },
          { name: "remote_entity", selector: { entity: { filter: { domain: "remote" } } } },
          ...(isSelect
            ? [
                { name: "option", selector: pick(options.filter((o) => o !== (device.off_option ?? "power_off"))) },
                { name: "off_option", selector: pick(options) },
              ]
            : []),
        ]);
      case "section_state":
        return this._renderState(id, device);
      case "section_power":
        return this._renderPower(id, device, data);
      case "section_delays":
        return this._deviceForm(id, data, [
          { name: "delay_after_on", selector: SECONDS },
          { name: "delay_after_off", selector: SECONDS },
          { name: "turn_off_after", selector: slider(1800, 10) },
        ]);
      case "section_ready":
        return html`${remote && !presetApplied
            ? html`<button class="ltek-btn preset" @click=${() => this._applyReadyPreset(id, device, remote)}>
                ${this._t("ready_preset", { entity: remote })}
              </button>`
            : nothing}
          ${this._deviceForm(id, data, [
            { name: "ready_enabled", selector: { boolean: {} } },
            ...(ready !== null
              ? [
                  { name: "ready_entity", selector: { entity: {} } },
                  { name: "ready_state", selector: { text: {} } },
                  { name: "ready_timeout", selector: SECONDS },
                  { name: "ready_reload", selector: { boolean: {} } },
                  {
                    name: "ready_on_timeout",
                    selector: {
                      select: {
                        options: [
                          { value: "abort", label: this._t("on_timeout_abort") },
                          { value: "continue", label: this._t("on_timeout_continue") },
                        ],
                        mode: "dropdown",
                      },
                    },
                  },
                ]
              : []),
          ])}`;
      case "section_monitor": {
        const watch = device.watch ?? {};
        const mode = watch.mode ?? "notify";
        return html`<ltek-form
          .hass=${this.hass}
          .data=${{ watch_mode: mode, watch_grace: watch.grace ?? 120, watch_turn_off_after: watch.turn_off_after ?? 600 }}
          .schema=${[
            {
              name: "watch_mode",
              selector: { select: { mode: "dropdown", options: ["off", "notify", "turn_off"].map((v) => ({ value: v, label: this._t(`watch.${v}`) })) } },
            },
            ...(mode === "off"
              ? []
              : [
                  { name: "watch_grace", selector: slider(1800, 10) },
                  ...(mode === "turn_off" ? [{ name: "watch_turn_off_after", selector: slider(3600, 30) }] : []),
                ]),
          ]}
          .computeLabel=${this._label}
          @value-changed=${(ev: CustomEvent) => {
            const v = ev.detail.value as Obj;
            const next = clean({
              mode: v.watch_mode === "notify" ? undefined : v.watch_mode,
              grace: v.watch_grace === 120 ? undefined : v.watch_grace,
              turn_off_after: v.watch_turn_off_after === 600 ? undefined : v.watch_turn_off_after,
            }) as Device["watch"];
            const updated = clean({ ...device, watch: next }) as Device;
            this._emit({ ...this.room, devices: { ...this.room.devices, [id]: updated } });
          }}
        ></ltek-form>`;
      }
      default:
        return html``;
    }
  }

  /** The room's Watchdog: outside any activity. Each device's watch, and what is wrong now. */
  private _renderWatchdog(): TemplateResult {
    const sensors = Object.values(this.hass.states).filter(
      (s) => s?.entity_id.startsWith("binary_sensor.") && s.attributes.room === this.roomId && s.attributes.scope === "watchdog",
    );
    const act = (problem: string, action: string) =>
      this.hass.callService("easy_av_control", "problem_action", { room: this.roomId, problem, action });
    return html`<p class="ltek-hint">${this._t("watchdog_hint")}</p>
      ${sensors.length
        ? html`<div class="ltek-list watchdog-now">
            ${sensors.map((s) => {
              const on = s!.state === "on";
              const problem = String(s!.attributes.problem);
              return html`<div class="ltek-item ordered-row">
                <ha-icon class="lead ${on ? "bad" : "good"}" icon=${on ? "mdi:alert" : "mdi:check-circle-outline"}></ha-icon>
                <span class="ltek-item-text">
                  <span class="ltek-name">${this._t(`problem.${problem}`)}</span>
                  <span class="ltek-subline">${on ? ((s!.attributes.names as string[] | undefined) ?? []).join(", ") : this._t("watchdog_ok")}</span>
                </span>
                ${on
                  ? ((s!.attributes.actions as string[] | undefined) ?? []).map(
                      (a) => html`<button class="ltek-btn" @click=${() => act(problem, a)}>${this._t(`action.${a}`)}</button>`,
                    )
                  : nothing}
              </div>`;
            })}
          </div>`
        : html`<p class="ltek-hint">${this._t("watchdog_save_first")}</p>`}
      ${this._card(
        this._t("watchdog_devices"),
        this._t("watchdog_devices_hint"),
        html`<div class="ltek-list">
          ${Object.entries(this.room.devices ?? {}).map(([id, device]) => {
            const detect = this._detectFor(device);
            return html`<div class="step">
              <div class="step-head"><span class="title">${device.name ?? device.entity_id}</span></div>
              ${detect && !detect.state
                ? html`<p class="ltek-hint">${this._t("watchdog_no_status")}</p>`
                : this._deviceSection(id, device, "section_monitor")}
            </div>`;
          })}
        </div>`,
        "mdi:television-guide",
      )}
      <p class="ltek-hint">
        ${this._t("watchdog_error")}
        <button class="link" @click=${() => this.dispatchEvent(new CustomEvent("open-page", { detail: { page: "notifications" } }))}>
          ${this._t("watchdog_notify")}
        </button>
      </p>`;
  }

  /** The activity's monitor while it is active: lost, picture, auto-off. */
  private _renderMonitor(id: string, activity: Activity): TemplateResult {
    const m = activity.monitor ?? {};
    const data = {
      lost_after: m.lost_after ?? 60,
      picture_lost_after: m.picture_lost_after ?? 60,
      idle_after_min: Math.round((m.idle_after ?? 0) / 60),
      idle_warning_min: Math.round((m.idle_warning ?? 300) / 60),
    };
    const minutes = (max: number, step = 1) => ({ number: { min: 0, max, step, mode: "slider", unit_of_measurement: "min" } });
    return html`<p class="ltek-hint">${this._t("monitor_hint")}</p>
      <ltek-form
        .hass=${this.hass}
        .data=${data}
        .schema=${[
          { name: "lost_after", selector: slider(600, 10) },
          ...((activity.checks ?? []).length ? [{ name: "picture_lost_after", selector: slider(600, 10) }] : []),
          { name: "idle_after_min", selector: minutes(240, 5) },
          ...(data.idle_after_min ? [{ name: "idle_warning_min", selector: minutes(30) }] : []),
        ]}
        .computeLabel=${this._label}
        @value-changed=${(ev: CustomEvent) => {
          const v = { ...data, ...(ev.detail.value as Obj) } as typeof data;
          this._setActivity(id, { ...activity, monitor: monitorConfig(v) });
        }}
      ></ltek-form>`;
  }

  /** Power Outlet: a checkbox, then the outlet and its delay, greyed out while it is off. */
  private _renderPower(id: string, device: Device, data: Obj): TemplateResult {
    const used = Boolean(device.power_switch) || this._powerOn.has(id);
    const toggle = (on: boolean) => {
      const powerOn = new Set(this._powerOn);
      const next: Device = { ...device };
      if (on) {
        Object.assign(next, this._powerMemo.get(id) ?? {});
        if (!next.power_switch) powerOn.add(id);
      } else {
        if (device.power_switch) {
          this._powerMemo.set(id, { power_switch: device.power_switch, delay_after_power: device.delay_after_power });
        }
        delete next.power_switch;
        delete next.delay_after_power;
        powerOn.delete(id);
      }
      this._powerOn = powerOn;
      this._emit({ ...this.room, devices: { ...this.room.devices, [id]: clean(next) } });
    };
    return html`<label class="check">
        <input type="checkbox" .checked=${live(used)} @change=${(ev: Event) => toggle((ev.target as HTMLInputElement).checked)} />
        ${this._t("power_use")}
      </label>
      <div class=${used ? "" : "unused"}>
        ${this._deviceForm(
          id,
          used ? data : { ...data, ...(this._powerMemo.get(id) ?? {}) },
          [
            { name: "power_switch", selector: { entity: { filter: { domain: ["switch", "input_boolean", "light"] } } } },
          ],
          !used,
        )}
      </div>`;
  }

  /** config/detect for a device as it is being edited; cached per entity and state settings. */
  private _detectFor(device: Device): Detect | undefined {
    if (!device.entity_id || !this.hass) return undefined;
    const state = Object.fromEntries(STATE_KEYS.filter((k) => device[k] !== undefined).map((k) => [k, device[k]]));
    const key = JSON.stringify([device.entity_id, state]);
    if (!this._detectAsked.has(key)) {
      this._detectAsked.add(key);
      this.hass
        .callWS<Detect>({ type: "easy_av_control/config/detect", entity_id: device.entity_id, device: state })
        .then((result) => (this._detect = { ...this._detect, [key]: result }))
        .catch(() => this._detectAsked.delete(key));
    }
    return this._detect[key];
  }

  /** The Detected box and the status settings of a device. */
  private _renderState(id: string, device: Device): TemplateResult {
    const detect = this._detectFor(device);
    if (!device.entity_id) {
      return html`<p class="ltek-hint">${this._t("no_entity")}</p>`;
    }
    const data = stateFormData(device, detect);
    const integration = device.entity_id ? this.hass.entities?.[device.entity_id]?.platform : undefined;
    const profileOptions = [
      { value: "__auto", label: this._t("profile.auto") },
      ...this.profiles
        .filter((p) => !p.generic && (p.integration === integration || p.id === device.profile))
        .map((p) => ({ value: p.id, label: `${p.name} (${this._t(p.source === "user" ? "profiles_yours" : "profiles_builtin")})` })),
    ];
    const hasStatus = !!detect?.state;
    const schema: Obj[] = [
      ...(profileOptions.length > 1
        ? [{ name: "profile", selector: { select: { options: profileOptions, mode: "dropdown" } } }]
        : []),
      {
        name: "state_source",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: this._t("state_source.auto") },
              { value: "none", label: this._t("state_source.none") },
              ...(data.state_source === "custom" ? [{ value: "custom", label: "YAML" }] : []),
            ],
          },
        },
      },
    ];
    return html`${this._renderDetected(id, device, detect)}
      ${detect && !hasStatus ? html`<p class="ltek-hint">${this._t("state_fixed_only")}</p>` : nothing}
      <ltek-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s: { name: string }) => this._t(s.name === "state_source" ? "state_source" : `field.${s.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${(ev: CustomEvent) => {
          const next = applyStateForm(device, { ...data, ...(ev.detail.value as Obj) }, detect);
          this._emit({ ...this.room, devices: { ...this.room.devices, [id]: next } });
        }}
      ></ltek-form>`;
  }

  /** What the device's profile found, with one click to use it. */
  private _renderDetected(id: string, device: Device, detect: Detect | undefined): TemplateResult {
    if (!detect) {
      return html`<p class="ltek-hint">${this._t("loading")}</p>`;
    }
    if (!detect.profile) {
      return html`<p class="ltek-hint">${this._t("detected_none")}</p>`;
    }
    const { profile, found, state } = detect;
    const changes = detectedChanges(device, detect);
    const lines: string[] = [];
    if (found?.indicator) {
      lines.push(
        this._t("detected_found_indicator", { entity: this._entityName(found.indicator) }) +
          (found.attribute ? `, ${this._t("detected_found_attribute", { attribute: found.attribute })}` : ""),
      );
    }
    if (found?.remote_entity) lines.push(this._t("detected_found_remote", { entity: this._entityName(found.remote_entity) }));
    if (found?.power_switch) lines.push(this._t("detected_found_outlet", { entity: this._entityName(found.power_switch) }));
    if (found?.settings?.length) {
      lines.push(this._t("detected_found_settings", { entities: found.settings.map((e) => this._entityName(e)).join(", ") }));
    }
    if (detect.siblings.length) {
      lines.push(this._t("detected_siblings", { integrations: detect.siblings.map((s) => s.integration).join(", ") }));
      const roles = Object.entries(detect.roles)
        .filter(([, i]) => i)
        .map(([role, i]) => this._t("detected_role", { role: this._t(`role.${role}`), integration: i as string }));
      if (roles.length) lines.push(roles.join(" · "));
    }
    return html`<div class="ltek-item detected open">
      <ha-icon class="lead" icon="mdi:auto-fix"></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${this._t("detected", { name: profile.name })}</span>
        ${lines.map((l) => html`<span class="ltek-subline">${l}</span>`)}
        ${state ? html`<span class="ltek-subline">${this._t("detected_now", { value: state.value ?? state.group })}</span>` : nothing}
        ${this._timingLines(detect).map((l) => html`<span class="ltek-subline">${l}</span>`)}
      </span>
      <span class="ltek-badge ${profile.source === "user" ? "lib" : "accent"}">
        ${this._t(profile.source === "user" ? "profiles_yours" : "profiles_builtin")}
      </span>
      ${profile.tested ? nothing : html`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
      ${Object.keys(changes).length
        ? html`<button
            class="ltek-btn primary"
            @click=${() => this._emit({ ...this.room, devices: { ...this.room.devices, [id]: { ...device, ...changes } } })}
          >
            ${this._t("detected_use")}
          </button>`
        : html`<span class="ltek-badge ok">${this._t("detected_applied")}</span>`}
      ${Object.keys(suggestedTimeouts(device, detect)).length
        ? html`<button
            class="ltek-btn"
            title=${this._t("timing_use_hint")}
            @click=${() =>
              this._emit({
                ...this.room,
                devices: { ...this.room.devices, [id]: { ...device, ...suggestedTimeouts(device, detect) } },
              })}
          >
            ${this._t("timing_use")}
          </button>`
        : nothing}
    </div>`;
  }

  /** "Comes on in about 42 s (8 starts, slowest 51 s)" and the same for going off. */
  private _timingLines(detect: Detect): string[] {
    const t = detect.timings;
    if (!t) return [];
    const lines: string[] = [];
    for (const dir of ["on", "off"] as const) {
      const m = t[dir];
      if (!m?.samples || m.typical === null) continue;
      lines.push(
        this._t(`timing_${dir}`, {
          typical: asSeconds(m.typical),
          count: String(m.samples),
          slowest: asSeconds(m.slowest ?? m.typical),
        }),
      );
    }
    return lines;
  }

  private _entityName(entityId: string): string {
    return (this.hass.states[entityId]?.attributes.friendly_name as string | undefined) ?? entityId;
  }

  private _applyReadyPreset(id: string, device: Device, remote: string): void {
    // Proven for an Apple TV: connected only while its remote is on; it can take a minute after power-on
    const ready = { entity_id: remote, state: "on", timeout: 60, reload_integration: true, on_timeout: "continue" };
    this._emit({ ...this.room, devices: { ...this.room.devices, [id]: { ...device, ready, remote_entity: remote } } });
  }

  /** A device or activity that was added and not saved yet. */
  private _unsaved(kind: "devices" | "activities", id: string): boolean {
    return !(id in (this.saved?.[kind] ?? {}));
  }

  private _deviceChanged(id: string, v: Obj): void {
    const device = clean({
      entity_id: v.entity_id as string,
      name: v.name as string | undefined,
      remote_entity: v.remote_entity as string | undefined,
      power_switch: v.power_switch as string | undefined,
      ready: v.ready_enabled
        ? clean({
            entity_id: v.ready_entity as string | undefined,
            state: splitStates(v.ready_state as string | undefined),
            timeout: v.ready_timeout as number | undefined,
            reload_integration: v.ready_reload as boolean | undefined,
            on_timeout: v.ready_on_timeout as string | undefined,
          })
        : undefined,
      // Boot time only applies with an outlet
      delay_after_power: v.power_switch ? (v.delay_after_power as number | undefined) : undefined,
      delay_after_on: v.delay_after_on as number | undefined,
      delay_after_off: v.delay_after_off as number | undefined,
      turn_off_after: (v.turn_off_after as number | undefined) || undefined,
      option: v.option as string | undefined,
      off_option: v.off_option as string | undefined,
      commands: v.commands as Obj | undefined,
    }) as Device;
    // Not part of this form: the Device state keys, kept as they are
    const before = this.room.devices?.[id] ?? ({} as Device);
    for (const key of STATE_KEYS) {
      if (before[key] !== undefined) device[key] = before[key];
    }
    // Not part of the form: kept as they are, an empty list included
    const settings = this.room.devices?.[id]?.settings;
    if (settings !== undefined) {
      device.settings = settings;
    }
    // An enabled check without options is still a check
    if (v.ready_enabled && !device.ready) {
      device.ready = {};
    }
    const room: Room = { ...this.room, devices: { ...this.room.devices, [id]: device } };
    // A new device takes its ID from its entity, e.g. media_player.apple_tv -> apple_tv
    const objectId = device.entity_id?.split(".")[1];
    if (objectId && this._unsaved("devices", id) && device.entity_id !== this.room.devices?.[id]?.entity_id) {
      const to = uniqueKey(slugify(objectId), Object.keys(room.devices ?? {}).filter((k) => k !== id));
      if (to !== id) {
        this._emit(renameDevice(room, id, to));
        this._view = { kind: "device", id: to };
        return;
      }
    }
    this._emit(room);
  }

  private _addDevice(): void {
    const id = uniqueKey("device", Object.keys(this.room.devices ?? {}));
    this._emit({ ...this.room, devices: { ...this.room.devices, [id]: { entity_id: "" } } });
    this._show({ kind: "device", id });
  }

  private _renameDevice(from: string, raw: string): void {
    const to = slugify(raw);
    if (!to || to === from) {
      this.requestUpdate();
      return;
    }
    const id = uniqueKey(to, Object.keys(this.room.devices ?? {}).filter((k) => k !== from));
    this._emit(renameDevice(this.room, from, id));
    this._view = { kind: "device", id };
  }

  private _deleteDevice(id: string): void {
    const where = deviceUsage(this.room, id);
    if (where.length) {
      this._notice = this._t("device_in_use", { id, where: where.join(", ") });
      return;
    }
    if (!window.confirm(`${this._t("delete")}: ${this._deviceTitle(id, this.room.devices![id])}?`)) {
      return;
    }
    const devices = { ...this.room.devices };
    delete devices[id];
    this._emit({ ...this.room, devices });
    this._show({ kind: "list" });
  }

  // ------------------------------------------------------------------
  // Activities
  // ------------------------------------------------------------------

  private _renderActivityList(): TemplateResult {
    const activities = sortedActivities(this.room);
    const names = (activity: Activity) =>
      (activity.devices ?? []).map((d) => this.room.devices?.[d]?.name ?? d).join(" → ");
    return html`
      <p class="ltek-hint">${this._t("activities_intro")}</p>
      <div class="ltek-list">
        ${Object.keys(this.room.devices ?? {}).length
          ? html`<button class="ltek-add" @click=${this._addActivity}>+ ${this._t("add_activity")}</button>`
          : html`<p class="ltek-hint">${this._t("needs_devices")}</p>`}
        <div class="ltek-buttons io">
          <button class="ltek-btn" @click=${() => this._openIo("import")}>
            <ha-icon icon="mdi:import"></ha-icon> ${this._t("act_import")}
          </button>
          ${activities.length
            ? html`<button class="ltek-btn" @click=${() => this._openIo("export", activities.map(([id]) => id))}>
                <ha-icon icon="mdi:export"></ha-icon> ${this._t("act_export_all")}
              </button>`
            : nothing}
        </div>
        ${activities.length
          ? activities.map(([id, activity]) =>
              this._row(
                activity.name ?? id,
                names(activity) || this._t("no_devices"),
                () => this._show({ kind: "activity", id }),
                activity.enabled === false ? this._t("act_disabled") : undefined,
                activity.icon ?? "mdi:play-circle-outline",
              ),
            )
          : html`<p class="ltek-hint">${this._t("activities_empty")}</p>`}
      </div>
      ${this._renderIo()}
    `;
  }

  // ------------------------------------------------------------------ export / import of activities

  private async _openIo(mode: "export" | "import", ids: string[] = []): Promise<void> {
    this._io = { mode, text: mode === "export" ? JSON.stringify(exportActivities(this.room, ids), null, 2) : "" };
    await this.updateComplete;
    const dialog = this.shadowRoot?.querySelector("dialog.io");
    if (dialog instanceof HTMLDialogElement && !dialog.open) dialog.showModal();
  }

  private _closeIo(): void {
    (this.shadowRoot?.querySelector("dialog.io") as HTMLDialogElement | null)?.close();
    this._io = undefined;
  }

  private async _ioCopy(ev: Event): Promise<void> {
    const button = ev.currentTarget as HTMLButtonElement;
    const area = this.shadowRoot!.querySelector("dialog.io textarea") as HTMLTextAreaElement;
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    if (!ok) {
      try {
        await navigator.clipboard.writeText(area.value);
        ok = true;
      } catch {
        ok = false;
      }
    }
    button.textContent = this._t(ok ? "profile_copied" : "profile_copy_failed");
  }

  private _ioDownload(): void {
    const url = URL.createObjectURL(new Blob([this._io?.text ?? ""], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `easy-av-control-activities-${this.roomId}.json`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  private async _ioFile(ev: Event): Promise<void> {
    const file = (ev.target as HTMLInputElement).files?.[0];
    if (file && this._io) this._io = { ...this._io, text: await file.text(), message: undefined };
  }

  private _ioImport(copy = false): void {
    if (!this._io) return;
    try {
      const result = importActivities(this.room, JSON.parse(this._io.text), copy);
      const name = (d: string) => result.room.devices?.[d]?.name ?? d;
      this._emit(result.room);
      const parts: string[] = [];
      if (Object.keys(result.replaced).length) parts.push(this._t("act_import_replaced", { names: Object.values(result.replaced).join(", ") }));
      if (Object.keys(result.added).length) parts.push(this._t("act_import_done", { added: Object.values(result.added).join(", ") }));
      if (result.devicesAdded.length) parts.push(this._t("act_import_devices", { devices: result.devicesAdded.map(name).join(", ") }));
      if (result.startedByDropped.length) parts.push(this._t("act_import_started_by", { names: result.startedByDropped.join(", ") }));
      this._closeIo();
      this._notice = parts.join(" · ");
    } catch (err) {
      this._io = { ...this._io, message: (err as Error).message ?? String(err) };
    }
  }

  private _renderIo(): TemplateResult | typeof nothing {
    const d = this._io;
    if (!d) return nothing;
    const exporting = d.mode === "export";
    return html`<dialog class="io" @cancel=${this._closeIo} @click=${(ev: Event) => ev.target === ev.currentTarget && this._closeIo()}>
      <div class="dialog-body">
        <div class="ltek-group first">${this._t(exporting ? "act_export" : "act_import")}</div>
        <p class="ltek-hint">${this._t(exporting ? "act_export_hint" : "act_import_hint")}</p>
        ${exporting ? nothing : html`<input type="file" accept=".json,application/json" @change=${this._ioFile} />`}
        <textarea
          class="ltek-text"
          rows="14"
          .value=${d.text}
          ?readonly=${exporting}
          @input=${(ev: Event) => (this._io = { ...d, text: (ev.target as HTMLTextAreaElement).value, message: undefined })}
        ></textarea>
        ${d.message ? html`<p class="ltek-hint ltek-warn">${d.message}</p>` : nothing}
        <div class="ltek-buttons">
          ${exporting
            ? html`<button class="ltek-btn primary" @click=${this._ioCopy}>${this._t("profile_copy")}</button>
                <button class="ltek-btn" @click=${this._ioDownload}><ha-icon icon="mdi:download"></ha-icon> ${this._t("act_download")}</button>`
            : html`<button class="ltek-btn primary" ?disabled=${!d.text.trim()} @click=${() => this._ioImport(false)}>${this._t("act_import")}</button>
                <button class="ltek-btn" ?disabled=${!d.text.trim()} @click=${() => this._ioImport(true)}>${this._t("act_import_copy")}</button>`}
          <button class="ltek-btn" @click=${this._closeIo}>${this._t("profile_close")}</button>
        </div>
      </div>
    </dialog>`;
  }

  private _setActivity(id: string, activity: Activity): void {
    this._emit({ ...this.room, activities: { ...this.room.activities, [id]: clean(activity) } });
  }

  private _renderActivity(id: string, activity: Activity): TemplateResult {
    const chosen = activity.devices ?? [];
    const routeOptions = [
      { value: "__auto", label: this._t("route_auto") },
      { value: "__none", label: this._t("route_none") },
      ...chosen.map((d) => ({ value: d, label: this.room.devices?.[d]?.name ?? d })),
    ];
    const remote = activity.remote ?? {};
    const routes: Obj = {};
    for (const g of GROUPS) {
      routes[g] = !(g in remote) ? "__auto" : remote[g] === null ? "__none" : remote[g];
    }
    routes.touchpad = remote.touchpad === true ? "on" : remote.touchpad === false ? "off" : "auto";
    const extraButtons = ((remote.buttons as unknown[] | undefined) ?? []).filter((b) => !isQuickSelect(b));

    return html`
      ${this._detailHeader(
        undefined,
        activity.name ?? id,
        () => this._deleteActivity(id, activity),
        undefined,
        () => this._duplicateActivity(id, activity),
        () => this._openIo("export", [id]),
        this._generalHeader({
          title: activity.name ?? id,
          icon: activity.icon || "mdi:play-circle-outline",
          meta: [
            html`<span><ha-icon icon="mdi:sofa-outline"></ha-icon>${this.room.name ?? this.roomId}</span>`,
            html`<span><ha-icon icon="mdi:sort-numeric-ascending"></ha-icon>${this._t("field.order")}: ${activity.order ?? "–"}</span>`,
            ...(this.room.default_activity === id
              ? [html`<span><ha-icon icon="mdi:star-outline"></ha-icon>${this._t("gen_default")}</span>`]
              : []),
          ],
          data: { name: activity.name, icon: activity.icon, order: activity.order },
          schema: [
            { name: "name", required: true, selector: { text: {} } },
            { name: "icon", selector: { icon: {} } },
            { name: "order", selector: { number: { min: 0, max: 999, mode: "box" } } },
          ],
          label: this._label,
          save: (v: Obj) => this._activityGeneralChanged(id, activity, { ...v, name: (v.name as string | undefined)?.trim() || activity.name }),
          beside: this._runButtons(id),
        }),
      )}
      ${this._renderIo()}

      ${this._card(this._t("section_flow"), `${this._t("hint_flow")} ${this._t("flow.edit_hint")}`, this._renderFlowEditor(id, activity))}

      ${this._advanced(
        this._t("hint_activity_advanced"),
        html`<p class="ltek-hint">${this._t("activity_id_hint", { id })}</p>
          <ltek-form
            .hass=${this.hass}
            .data=${{ buttons: extraButtons, activity_commands: activity.commands }}
            .schema=${[{ name: "activity_commands", selector: { object: {} } }]}
            .computeLabel=${this._label}
            @value-changed=${(ev: CustomEvent) => this._extrasChanged(id, activity, ev.detail.value as Obj)}
          ></ltek-form>`,
      )}

      ${this._cardDivider()}
      ${this._card(
        this._t("remote"),
        this._t("hint_remote"),
        html`<ltek-form
          .hass=${this.hass}
          .data=${routes}
          .schema=${[
            ...GROUPS.map((g) => ({ name: g, selector: { select: { options: routeOptions, mode: "dropdown" } } })),
            {
              name: "touchpad",
              selector: {
                select: {
                  options: ["auto", "on", "off"].map((value) => ({ value, label: this._t(`touchpad_${value}`) })),
                  mode: "dropdown",
                },
              },
            },
          ]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${(ev: CustomEvent) => this._routesChanged(id, activity, ev.detail.value as Obj)}
        ></ltek-form>`,
      )}

      ${this._card(this._t("quick_select"), this._t("quick_select_hint"), this._renderQuickSelect(id, activity))}

      ${this._card(this._t("card_settings"), this._t("card_settings_hint"), this._renderCardSettings(id, activity))}

      ${this._card(
        this._t("section_remote_preview"),
        this._t("hint_remote_preview"),
        html`<easy-av-control-remote-preview
          .hass=${this.hass}
          .room=${this.room}
          .roomId=${this.roomId}
          .activityId=${id}
        ></easy-av-control-remote-preview>`,
      )}

      ${this._panel(
        `activity:${this._t("card_extra")}`,
        "mdi:gesture-tap-box",
        this._t("card_extra"),
        this._t("hint_card_extra"),
        html`<ltek-form
          .hass=${this.hass}
          .data=${{ buttons: extraButtons, activity_commands: activity.commands }}
          .schema=${[{ name: "buttons", selector: { object: {} } }]}
          .computeLabel=${this._label}
          @value-changed=${(ev: CustomEvent) => this._extrasChanged(id, activity, ev.detail.value as Obj)}
        ></ltek-form>`,
        false,
      )}
    `;
  }

  /** The Flow, the activity's editor: every row edits in place (✎) or goes (trash); + adds to it. */
  private _renderFlowEditor(id: string, activity: Activity): TemplateResult {
    const editing = this._flowEditing;
    return html`<easy-av-control-flow
      .hass=${this.hass}
      .room=${this.room}
      .roomId=${this.roomId}
      .activityId=${id}
      .run=${this._run}
      .editing=${editing?.key}
      @flow-edit=${(ev: CustomEvent<{ key: string; device?: string; panel: string }>) => {
        this._flowEditing = editing?.key === ev.detail.key ? undefined : ev.detail;
      }}
      @flow-delete=${(ev: CustomEvent<FlowDelete>) => this._flowDelete(id, activity, ev.detail)}
      @flow-move=${(ev: CustomEvent<FlowMove>) => this._flowMove(id, activity, ev.detail)}
    >
      ${editing && !editing.key.startsWith("__")
        ? html`<div slot="edit">${this._inlineEditor(id, activity, editing)}</div>`
        : nothing}
      <div slot="add-start">${this._flowAdder(id, activity, "start")}</div>
      <div slot="add-stop">${this._flowAdder(id, activity, "stop")}</div>
      <div slot="add-monitor">${this._monitorAdder(id, activity)}</div>
    </easy-av-control-flow>`;
  }

  /** What a Flow row's ✎ opens under it. */
  private _inlineEditor(id: string, activity: Activity, target: { key: string; device?: string; panel: string }): TemplateResult {
    const done = html`<div class="inline-bar">
      <button class="ltek-btn" @click=${() => (this._flowEditing = undefined)}>${this._t("flow.close_edit")}</button>
    </div>`;
    const deviceId = target.device;
    const device = deviceId ? this.room.devices?.[deviceId] : undefined;
    if (target.panel === "flow.before" && deviceId) {
      return html`${this._renderBefore(id, activity, deviceId)}${done}`;
    }
    if (device && deviceId && DEVICE_HINTS[target.panel]) {
      const header = target.key.startsWith("device|");
      const order = activity.devices ?? [];
      const index = order.indexOf(deviceId);
      return html`${header
          ? html`<div class="inline-order">
                ${index >= 0
                  ? this._moveButtons(order, index, (list) =>
                      list.length < order.length
                        ? this._setActivity(id, withoutDevice(activity, deviceId))
                        : this._setActivity(id, { ...activity, devices: list }),
                    )
                  : nothing}
              </div>
              <h4>${this._t("flow.before")}</h4>
              ${this._renderBefore(id, activity, deviceId)}`
          : nothing}
        <h4>${this._t("flow.device_actions", { device: device.name ?? deviceId })}</h4>
        ${this._renderDeviceFlow(id, activity, deviceId)}
        <p class="ltek-hint">
          ${this._t("flow.device_identity")}
          <button class="link" @click=${() => this._show({ kind: "device", id: deviceId })}>${this._t("flow.open_device")}</button>
        </p>
        ${done}`;
    }
    switch (target.panel) {
      case "started_by":
        return html`${this._renderStartedBy(id, activity)}${done}`;
      case "monitor":
        return html`${this._renderMonitor(id, activity)}${done}`;
      case "section_checks":
        return html`${this._renderChecks(id, activity)}${done}`;
      case "steps":
        return html`${this._renderSteps(id, activity)}${done}`;
      case "section_advanced":
        return html`${this._renderHooks(id, activity, target.key.includes("on_stop") ? "on_stop" : "on_start")}${done}`;
      case "section_activity_devices":
        return html`${this._renderActivityDevices(id, activity, Object.keys(this.room.devices ?? {}), activity.devices ?? [])}${done}`;
      default:
        return done;
    }
  }

  /** What happens to a device in this activity: connection check, boot time, the waits on and off, failures. */
  private _renderDeviceFlow(id: string, activity: Activity, deviceId: string): TemplateResult {
    const base = this.room.devices?.[deviceId];
    if (!base) return html``;
    const merged = flowDevice(this.room, activity, deviceId);
    const detect = this._detectFor(base);
    const hasStatus = !!detect?.state;
    const data = { ...stateFormData(merged, detect), ...this._deviceData(merged) };
    const options = (prefix: string, values: readonly string[]) => values.map((v) => ({ value: v, label: this._t(`${prefix}.${v}`) }));
    const offFailures = FAILURES.map((v) => ({ value: v, label: this._t(v === "stop" ? "failure_off.stop" : `failure.${v}`) }));
    const readyOn = merged.ready !== undefined && merged.ready !== null;
    const schema: Obj[] = [
      { name: "ready_enabled", selector: { boolean: {} } },
      ...(readyOn
        ? [
            { name: "ready_entity", selector: { entity: {} } },
            { name: "ready_state", selector: { text: {} } },
            { name: "ready_timeout", selector: SECONDS },
            { name: "ready_reload", selector: { boolean: {} } },
            {
              name: "ready_on_timeout",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [
                    { value: "abort", label: this._t("on_timeout_abort") },
                    { value: "continue", label: this._t("on_timeout_continue") },
                  ],
                },
              },
            },
          ]
        : []),
      ...(base.power_switch ? [{ name: "delay_after_power", selector: SHORT }] : []),
      ...(hasStatus
        ? [
            { name: "wait_on", selector: { select: { mode: "dropdown", options: options("wait", WAIT_MODES) } } },
            { name: "timeout_on", selector: slider(600, 5, 5) },
            { name: "debounce", selector: slider(30, 0.5) },
            { name: "on_failure_on", selector: { select: { mode: "dropdown", options: options("failure", FAILURES) } } },
          ]
        : []),
      { name: "delay_after_on", selector: SECONDS },
      ...(hasStatus
        ? [
            { name: "wait_off", selector: { select: { mode: "dropdown", options: options("wait", WAIT_MODES) } } },
            { name: "timeout_off", selector: slider(900, 5, 5) },
            { name: "on_failure_off", selector: { select: { mode: "dropdown", options: offFailures } } },
          ]
        : []),
      { name: "delay_after_off", selector: SECONDS },
      { name: "turn_off_after", selector: slider(1800, 10) },
      ...(detect?.found?.picture
        ? [{ name: "on_failure_picture", selector: { select: { mode: "dropdown", options: options("failure", ["warn", "stop"]) } } }]
        : []),
    ];
    return html`${hasStatus ? nothing : html`<p class="ltek-hint">${this._t("state_fixed_only")}</p>`}
      <ltek-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s: { name: string }) => this._t(`field.${s.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${(ev: CustomEvent) => {
          const v = { ...data, ...(ev.detail.value as Obj) };
          const next = applyStateForm(merged, v, detect);
          for (const key of ["delay_after_power", "delay_after_on", "delay_after_off", "turn_off_after"] as const) {
            const n = Number(v[key]);
            if (n) next[key] = n;
            else delete next[key];
          }
          if (v.ready_enabled) {
            next.ready = clean({
              entity_id: v.ready_entity as string | undefined,
              state: splitStates(v.ready_state as string | undefined),
              timeout: v.ready_timeout as number | undefined,
              reload_integration: v.ready_reload as boolean | undefined,
              on_timeout: v.ready_on_timeout as string | undefined,
            });
          } else {
            delete next.ready;
          }
          this._setActivity(id, withFlow(activity, deviceId, next, base));
        }}
      ></ltek-form>`;
  }

  /** Before a device is turned on: a delay, then the activity's devices it waits for. */
  private _renderBefore(id: string, activity: Activity, deviceId: string): TemplateResult {
    const before: Before = activity.before?.[deviceId] ?? {};
    const set = (next: Before) => this._setActivity(id, withBefore(activity, deviceId, next));
    const waits = before.wait_for ?? [];
    const others = (activity.devices ?? []).filter((d) => d !== deviceId);
    const free = others.filter((d) => !waits.some((w) => w.device === d));
    const name = (d: string) => this.room.devices?.[d]?.name ?? d;
    return html`<p class="ltek-hint">${this._t("flow.before_hint")}</p>
      <ltek-form
        .hass=${this.hass}
        .data=${{ before_delay: before.delay ?? 0 }}
        .schema=${[{ name: "before_delay", selector: SHORT }]}
        .computeLabel=${this._label}
        @value-changed=${(ev: CustomEvent) => set({ ...before, delay: Number((ev.detail.value as Obj).before_delay) || undefined })}
      ></ltek-form>
      <div class="ltek-list">
        ${free.length
          ? html`<select
              class="ltek-add add-select"
              aria-label=${this._t("flow.add_wait_for")}
              @change=${(ev: Event) => {
                const el = ev.target as HTMLSelectElement;
                if (el.value) set({ ...before, wait_for: [...waits, { device: el.value, state: "on" }] });
                el.value = "";
              }}
            >
              <option value="" selected>${this._t("flow.add_wait_for")}</option>
              ${free.map((d) => html`<option value=${d}>${name(d)}</option>`)}
            </select>`
          : nothing}
        ${waits.map(
          (w, i) => html`<div class="ltek-item ordered-row">
            <span class="ltek-name">${name(w.device)}</span>
            <select
              @change=${(ev: Event) => {
                const list = [...waits];
                list[i] = { ...w, state: (ev.target as HTMLSelectElement).value as "on" | "picture" };
                set({ ...before, wait_for: list });
              }}
            >
              ${(["on", "picture"] as const).map(
                (v) => html`<option value=${v} ?selected=${(w.state ?? "on") === v}>${this._t(`wait_for.${v}`)}</option>`,
              )}
            </select>
            <button
              class="ltek-del"
              title=${this._t("delete")}
              aria-label=${this._t("delete")}
              @click=${() => set({ ...before, wait_for: waits.filter((_, j) => j !== i) })}
            >
              <ha-icon icon="mdi:trash-can-outline"></ha-icon>
            </button>
          </div>`,
        )}
      </div>
      ${waits.length
        ? html`<ltek-form
            .hass=${this.hass}
            .data=${{ before_timeout: before.timeout ?? 90, before_on_timeout: before.on_timeout ?? "continue" }}
            .schema=${[
              { name: "before_timeout", selector: slider(600, 5, 5) },
              {
                name: "before_on_timeout",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { value: "continue", label: this._t("on_timeout_continue") },
                      { value: "abort", label: this._t("on_timeout_abort") },
                    ],
                  },
                },
              },
            ]}
            .computeLabel=${this._label}
            @value-changed=${(ev: CustomEvent) => {
              const v = ev.detail.value as Obj;
              set({ ...before, timeout: v.before_timeout as number, on_timeout: v.before_on_timeout as Before["on_timeout"] });
            }}
          ></ltek-form>`
        : nothing}`;
  }

  /** Started by: entities whose state starts the activity, and optionally shuts it down. */
  private _renderStartedBy(id: string, activity: Activity): TemplateResult {
    type Entry = NonNullable<Activity["started_by"]>[number];
    const list = activity.started_by ?? [];
    const set = (next: Entry[]) => this._setActivity(id, { ...activity, started_by: next.length ? next : undefined });
    const draft = this._draftStartedBy;
    const shown: Entry[] = draft ? [...list, draft] : list;
    const options = (entity: string) =>
      ((this.hass.states[entity]?.attributes.options as string[] | undefined) ?? []).map((o) => ({ value: o, label: o }));
    const one = (v: unknown) => (Array.isArray(v) ? String(v[0] ?? "") : String(v ?? ""));
    return html`<p class="ltek-hint">${this._t("started_by_hint")}</p>
      <div class="ltek-list">
        ${draft ? nothing : html`<button class="ltek-add" @click=${() => (this._draftStartedBy = { entity_id: "", state: "" })}>+ ${this._t("flow.add_started_by")}</button>`}
        ${shown.map((entry, i) => {
          const isDraft = i >= list.length;
          const choices = options(entry.entity_id);
          const pick = choices.length
            ? { select: { options: choices, mode: "dropdown", custom_value: true } }
            : { text: {} };
          return html`<div class="step">
            <div class="step-head">
              <span class="title"><span class="num">${i + 1}</span> ${this._t("started_by")}</span>
              ${isDraft
                ? html`<button class="ltek-del" title=${this._t("delete")} aria-label=${this._t("delete")} @click=${() => (this._draftStartedBy = undefined)}>
                    <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                  </button>`
                : this._moveButtons(list, i, set)}
            </div>
            <ltek-form
              .hass=${this.hass}
              .data=${{ started_by_entity: entry.entity_id, started_by_state: one(entry.state), started_by_stop: one(entry.stop_state) }}
              .schema=${[
                { name: "started_by_entity", required: true, selector: { entity: {} } },
                { name: "started_by_state", required: true, selector: pick },
                { name: "started_by_stop", selector: pick },
              ]}
              .computeLabel=${this._label}
              @value-changed=${(ev: CustomEvent) => {
                const v = ev.detail.value as Obj;
                const entity = String(v.started_by_entity ?? "");
                let state = String(v.started_by_state ?? "");
                let stop = String(v.started_by_stop ?? "");
                if (entity !== entry.entity_id) {
                  // A Harmony hub (any select with power_off): its first activity starts, power_off shuts down
                  const opts = ((this.hass.states[entity]?.attributes.options as string[] | undefined) ?? []);
                  if (opts.includes("power_off")) {
                    state = opts.find((o) => o !== "power_off") ?? "";
                    stop = "power_off";
                  }
                }
                const entryNext = clean({ entity_id: entity, state, stop_state: stop || undefined }) as Entry;
                if (isDraft) {
                  if (entity && state) {
                    this._draftStartedBy = undefined;
                    set([...list, entryNext]);
                  } else {
                    this._draftStartedBy = { entity_id: entity, state, stop_state: stop || undefined };
                  }
                  return;
                }
                const next = [...list];
                next[i] = entryNext;
                set(next);
              }}
            ></ltek-form>
          </div>`;
        })}
      </div>`;
  }

  /** Actions after start, in order, with + to add one (a device step starts with the activity's first device). */
  private _renderSteps(id: string, activity: Activity): TemplateResult {
    return html`${(activity.steps ?? []).map((step, i) => this._renderStep(id, activity, step, i))}
      ${this._picker(
        this._t("add_step"),
        STEP_TYPES.map((type) => ({ value: type, label: this._t(`step.${type}`) })),
        (type) => this._setActivity(id, { ...activity, steps: [...(activity.steps ?? []), newStep(type, activity, this.room)] }),
      )}`;
  }

  /** Home Assistant actions that run alongside the start or the stop. */
  private _renderHooks(id: string, activity: Activity, hook: "on_start" | "on_stop"): TemplateResult {
    return html`<ltek-form
      .hass=${this.hass}
      .data=${{ [hook]: activity[hook] ?? [] }}
      .schema=${[{ name: hook, selector: { action: {} } }]}
      .computeLabel=${this._label}
      @value-changed=${(ev: CustomEvent) => this._setActivity(id, { ...activity, [hook]: (ev.detail.value as Obj)[hook] as unknown[] })}
    ></ltek-form>`;
  }

  /** Under the Flow: + to add a device, a check, an action. */
  private _flowAdder(id: string, activity: Activity, mode: "start" | "stop"): TemplateResult {
    const chosen = activity.devices ?? [];
    const free = Object.keys(this.room.devices ?? {}).filter((d) => !chosen.includes(d));
    const hook = mode === "start" ? "on_start" : "on_stop";
    const adding = this._flowEditing?.key === `__${hook}`;
    const hasHook = ((activity[hook] as unknown[] | undefined) ?? []).length > 0;
    const open = (key: string, panel: string) => (this._flowEditing = { key, panel });
    return html`<div class="flow-add">
        ${mode === "start"
          ? html`${free.length
                ? html`<select
                    class="ltek-add add-select"
                    aria-label=${this._t("flow.pick_device")}
                    @change=${(ev: Event) => {
                      const el = ev.target as HTMLSelectElement;
                      if (el.value) this._setActivity(id, { ...activity, devices: [...chosen, el.value] });
                      el.value = "";
                    }}
                  >
                    <option value="" selected>+ ${this._t("flow.add_device")}</option>
                    ${free.map((d) => html`<option value=${d}>${this.room.devices?.[d]?.name ?? d}</option>`)}
                  </select>`
                : nothing}
              ${chosen.length
                ? html`<button
                    class="ltek-add"
                    @click=${() => {
                      const checks = (activity.checks as Obj[] | undefined) ?? [];
                      this._setActivity(id, { ...activity, checks: [...checks, { device: firstPictureDevice(chosen, checks) }] });
                      open("checks|||||", "section_checks");
                    }}
                  >
                    + ${this._t("flow.add_check")}
                  </button>`
                : nothing}
              <select
                class="ltek-add add-select"
                aria-label=${this._t("flow.add_step")}
                @change=${(ev: Event) => {
                  const el = ev.target as HTMLSelectElement;
                  if (el.value) {
                    this._setActivity(id, { ...activity, steps: [...(activity.steps ?? []), newStep(el.value, activity, this.room)] });
                    open("steps|||||", "steps");
                  }
                  el.value = "";
                }}
              >
                <option value="" selected>+ ${this._t("flow.add_step")}</option>
                ${STEP_TYPES.map((type) => html`<option value=${type}>${this._t(`step.${type}`)}</option>`)}
              </select>`
          : nothing}
        ${mode === "start" && !(activity.started_by ?? []).length
          ? html`<button
              class="ltek-add"
              @click=${() => {
                this._draftStartedBy = { entity_id: "", state: "" };
                this._flowEditing = { key: "__started_by", panel: "started_by" };
              }}
            >
              + ${this._t("flow.add_started_by")}
            </button>`
          : nothing}
        ${hasHook
          ? nothing
          : html`<button class="ltek-add" @click=${() => (this._flowEditing = adding ? undefined : { key: `__${hook}`, panel: "section_advanced" })}>
              + ${this._t(mode === "start" ? "flow.add_on_start" : "flow.add_on_stop")}
            </button>`}
      </div>
      ${mode === "start" && !free.length && !chosen.length ? html`<p class="ltek-hint">${this._t("flow.no_more_devices")}</p>` : nothing}
      ${adding && !hasHook ? html`<div class="inline-add">${this._renderHooks(id, activity, hook)}</div>` : nothing}
      ${mode === "start" && this._flowEditing?.key === "__started_by"
        ? html`<div class="inline-add">${this._renderStartedBy(id, activity)}</div>`
        : nothing}`;
  }

  /** Under the While active view: + for a monitor check that is off. */
  private _monitorAdder(id: string, activity: Activity): TemplateResult {
    const m = activity.monitor ?? {};
    const set = (patch: Obj) => {
      this._setActivity(id, { ...activity, monitor: monitorConfig({ ...m, ...patch }) });
      const kind = "idle_after" in patch ? "monitor_idle" : "lost_after" in patch ? "monitor_lost" : "monitor_picture";
      this._flowEditing = { key: `${kind}|||||`, panel: "monitor" };
    };
    const off = (v: number | undefined, d: number) => (v ?? d) === 0;
    if (!off(m.idle_after, 0) && !off(m.lost_after, 60) && !((activity.checks ?? []).length && off(m.picture_lost_after, 60))) {
      return html``;
    }
    return html`<div class="flow-add">
      ${off(m.idle_after, 0) ? html`<button class="ltek-add" @click=${() => set({ idle_after: 1800 })}>+ ${this._t("flow.add_monitor_idle")}</button>` : nothing}
      ${off(m.lost_after, 60) ? html`<button class="ltek-add" @click=${() => set({ lost_after: 60 })}>+ ${this._t("flow.add_monitor_lost")}</button>` : nothing}
      ${(activity.checks ?? []).length && off(m.picture_lost_after, 60)
        ? html`<button class="ltek-add" @click=${() => set({ picture_lost_after: 60 })}>+ ${this._t("flow.add_monitor_picture")}</button>`
        : nothing}
    </div>`;
  }

  /** A Flow row's arrows: a device earlier or later (Shutdown shows them in reverse), an action, a check. */
  private _flowMove(id: string, activity: Activity, detail: FlowMove): void {
    const swap = <T>(list: T[], index: number, dir: number): T[] | undefined => {
      const to = index + dir;
      if (index < 0 || to < 0 || to >= list.length) return undefined;
      const next = [...list];
      [next[index], next[to]] = [next[to], next[index]];
      return next;
    };
    if (detail.what === "device" && detail.device) {
      const list = activity.devices ?? [];
      const next = swap(list, list.indexOf(detail.device), detail.mode === "stop" ? -detail.dir : detail.dir);
      if (next) this._setActivity(id, { ...activity, devices: next });
    } else if (detail.what === "step") {
      const next = swap(activity.steps ?? [], detail.index, detail.dir);
      if (next) this._setActivity(id, { ...activity, steps: next });
    } else if (detail.what === "check") {
      const next = swap((activity.checks as Obj[] | undefined) ?? [], detail.index, detail.dir);
      if (next) this._setActivity(id, { ...activity, checks: next });
    }
  }

  /** A Flow row's trash icon. Device settings change for every activity that uses the device. */
  private _flowDelete(id: string, activity: Activity, detail: FlowDelete): void {
    const { row, header, device: deviceId } = detail;
    if (header === "steps" || (row.kind === "step" && row.step)) {
      const index = Number(row.step) - 1;
      this._setActivity(id, { ...activity, steps: (activity.steps ?? []).filter((_, i) => i !== index) });
      return;
    }
    switch (row.kind) {
      case "device":
        if (deviceId) this._setActivity(id, withoutDevice(activity, deviceId));
        return;
      case "check": {
        const index = Number(row.check) - 1;
        const checks = ((activity.checks as Obj[] | undefined) ?? []).filter((_, i) => i !== index);
        this._setActivity(id, { ...activity, checks: checks.length ? checks : undefined });
        return;
      }
      case "hook":
        this._setActivity(id, { ...activity, [String(row.hook)]: [] });
        return;
      case "monitor_lost":
      case "monitor_picture":
      case "monitor_idle": {
        const key = { monitor_lost: "lost_after", monitor_picture: "picture_lost_after", monitor_idle: "idle_after" }[row.kind];
        this._setActivity(id, { ...activity, monitor: monitorConfig({ ...(activity.monitor ?? {}), [key]: 0 }) });
        return;
      }
      case "monitor_watch": {
        const device = deviceId ? this.room.devices?.[deviceId] : undefined;
        if (device && deviceId) {
          const next = clean({ ...device, watch: { ...(device.watch ?? {}), mode: "off" } }) as Device;
          this._emit({ ...this.room, devices: { ...this.room.devices, [deviceId]: next } });
        }
        return;
      }
      case "started_by": {
        const index = Number(row.index) - 1;
        const entry = activity.started_by?.[index];
        if (!entry) return;
        // From the Shutdown view only its shutdown state goes
        const list = [...(activity.started_by ?? [])];
        if (detail.mode === "stop") list[index] = clean({ ...entry, stop_state: undefined }) as typeof entry;
        else list.splice(index, 1);
        this._setActivity(id, { ...activity, started_by: list.length ? list : undefined });
        return;
      }
      case "delay":
      case "wait_for": {
        if (!deviceId) return;
        const before = { ...(activity.before?.[deviceId] ?? {}) };
        if (row.kind === "delay") delete before.delay;
        else delete before.wait_for;
        this._setActivity(id, withBefore(activity, deviceId, before));
        return;
      }
    }
    const base = deviceId ? this.room.devices?.[deviceId] : undefined;
    if (!base || !deviceId) return;
    const next: Device = { ...flowDevice(this.room, activity, deviceId) };
    if (row.kind === "status") next.wait_on = "none";
    else if (row.kind === "wait") delete next.delay_after_on;
    else if (row.kind === "boot") delete next.delay_after_power;
    else if (row.kind === "ready") delete next.ready;
    else return;
    this._setActivity(id, withFlow(activity, deviceId, next, base));
  }

  /** The line that starts the Remote control card's settings. */
  private _cardDivider(): TemplateResult {
    return html`<div class="card-divider"><ha-icon icon="mdi:remote"></ha-icon>${this._t("card_divider")}</div>`;
  }

  /** An activity's devices as an ordered list (design guide): + Device on top, then numbered rows. */
  private _renderActivityDevices(id: string, activity: Activity, devices: string[], chosen: string[]): TemplateResult {
    const set = (list: string[]) => this._setActivity(id, { ...activity, devices: list });
    const free = devices.filter((d) => !chosen.includes(d));
    return html`<div class="ltek-list">
      ${free.length
        ? html`<select
            class="ltek-add add-select"
            aria-label=${this._t("add_device_to_activity")}
            @change=${(ev: Event) => {
              const el = ev.target as HTMLSelectElement;
              if (el.value) set([...chosen, el.value]);
              el.value = "";
            }}
          >
            <option value="" selected>+ ${this._t("add_device_short")}</option>
            ${free.map((d) => html`<option value=${d}>${this.room.devices?.[d]?.name ?? d}</option>`)}
          </select>`
        : nothing}
      ${chosen.map((d, i) => {
        const device = this.room.devices?.[d];
        const platform = device?.entity_id ? this.hass.entities?.[device.entity_id]?.platform : undefined;
        return html`<div class="ltek-item ordered-row">
          <span class="num">${i + 1}</span>
          <ha-icon class="lead" icon=${device ? this._deviceIcon(device) : "mdi:help-circle-outline"}></ha-icon>
          <button class="ltek-item-text link" @click=${() => this._show({ kind: "device", id: d })}>
            <span class="ltek-name">${device?.name ?? d}</span>
            <span class="ltek-subline">${device?.entity_id ?? ""}</span>
          </button>
          ${platform ? html`<span class="ltek-badge">${integrationTitle(platform)}</span>` : nothing}
          ${this._moveButtons(chosen, i, set)}
        </div>`;
      })}
    </div>`;
  }

  /** Name, icon, position; a new activity takes its ID from its name. */
  private _activityGeneralChanged(id: string, activity: Activity, v: Obj): void {
    const next = clean({ ...activity, name: v.name as string, icon: v.icon as string, order: v.order as number });
    const name = (v.name as string | undefined)?.trim();
    if (!name || name === activity.name || !this._unsaved("activities", id)) {
      this._setActivity(id, next);
      return;
    }
    const to = uniqueKey(slugify(name), Object.keys(this.room.activities ?? {}).filter((k) => k !== id));
    if (to === id) {
      this._setActivity(id, next);
      return;
    }
    // Rename the key, keep the order of the others
    const activities: Record<string, Activity> = {};
    for (const [key, a] of Object.entries(this.room.activities ?? {})) {
      activities[key === id ? to : key] = key === id ? next : a;
    }
    const room: Room = { ...this.room, activities };
    if (room.default_activity === id) {
      room.default_activity = to;
    }
    this._emit(room);
    this._view = { kind: "activity", id: to };
  }

  private _renderStep(id: string, activity: Activity, step: Step, index: number): TemplateResult {
    const steps = activity.steps ?? [];
    const setSteps = (list: Step[]) => this._setActivity(id, { ...activity, steps: list });
    return html`<div class="step">
      <div class="step-head">
        <span class="title">${index + 1}. ${this._t(`step.${step.type}`)}</span>
        ${this._moveButtons(steps, index, setSteps)}
      </div>
      <ltek-form
        .hass=${this.hass}
        .data=${step}
        .schema=${stepSchema(this.hass, this.room, step, (k) => this._t(k), this.sources, this.soundModes)}
        .computeLabel=${this._label}
        @value-changed=${(ev: CustomEvent) => {
          const list = [...steps];
          list[index] = clean({ ...(ev.detail.value as Step), type: step.type });
          setSteps(list);
        }}
      ></ltek-form>
    </div>`;
  }

  /** What a check on a device's profile watches, or that it has nothing to watch. */
  private _checkNote(deviceId: string): TemplateResult | typeof nothing {
    const device = this.room.devices?.[deviceId];
    if (!device?.entity_id) return nothing;
    const detect = this._detectFor(device);
    if (!detect) return nothing;
    const entity = detect.found?.picture;
    const picture = detect.profile?.data?.picture as Obj | undefined;
    const ok = (picture?.ok as string[] | undefined) ?? [];
    const fail = (picture?.fail as string[] | undefined) ?? [];
    const name = entity ? (this.hass.states[entity]?.attributes.friendly_name as string) || entity : "";
    return html`<p class="ltek-hint">
      ${!entity
        ? this._t("step_picture_none", { device: device.name ?? device.entity_id })
        : ok.length
          ? this._t("step_picture_checks", { entity: name, states: ok.join(` ${this._t("or")} `) })
          : this._t("check_unless_text", { entity: name, states: fail.join(` ${this._t("or")} `) })}
    </p>`;
  }

  /** An activity's checks: + Check on top, then one raised box each. */
  private _renderChecks(id: string, activity: Activity): TemplateResult {
    const checks = (activity.checks as Obj[] | undefined) ?? [];
    const set = (list: Obj[]) => this._setActivity(id, { ...activity, checks: list.length ? list : undefined });
    const chosen = activity.devices ?? [];
    const withPicture = chosen.filter((d) => {
      const device = this.room.devices?.[d];
      return device?.entity_id && this._detectFor(device)?.found?.picture;
    });
    const first = withPicture.find((d) => !checks.some((c) => c.device === d && !c.entity_id)) ?? chosen[0];
    return html`<div class="ltek-list">
      ${chosen.length
        ? html`<button class="ltek-add" @click=${() => set([...checks, { device: first }])}>+ ${this._t("add_check")}</button>`
        : html`<p class="ltek-hint">${this._t("needs_devices")}</p>`}
      ${checks.length ? nothing : html`<p class="ltek-hint">${this._t("check_none")}</p>`}
      ${checks.map((check, i) => {
        const update = (patch: Obj) => {
          const list = [...checks];
          list[i] = clean({ ...check, ...patch });
          set(list);
        };
        const own = check.entity_id !== undefined;
        const device = String(check.device ?? "");
        const states = (check.state as string[] | string | undefined) ?? [];
        return html`<div class="step check">
          <div class="step-head">
            <span class="title"><span class="num">${i + 1}</span> ${this.room.devices?.[device]?.name ?? device}</span>
            ${this._moveButtons(checks, i, set)}
          </div>
          <div class="ltek-row">
            <label class="lbl">${this._t("field.device")}</label>
            <select @change=${(ev: Event) => update({ device: (ev.target as HTMLSelectElement).value })}>
              ${chosen.map((d) => html`<option value=${d} ?selected=${d === device}>${this.room.devices?.[d]?.name ?? d}</option>`)}
            </select>
          </div>
          <div class="ltek-row">
            <label class="lbl">${this._t("check_what")}</label>
            <select
              @change=${(ev: Event) =>
                (ev.target as HTMLSelectElement).value === "own"
                  ? update({ entity_id: "", state: ["on"] })
                  : update({ entity_id: undefined, state: undefined, debounce: undefined })}
            >
              <option value="profile" ?selected=${!own}>${this._t("check_profile")}</option>
              <option value="own" ?selected=${own}>${this._t("check_entity")}</option>
            </select>
          </div>
          ${own
            ? html`<ltek-form
                  .hass=${this.hass}
                  .data=${{ entity_id: check.entity_id || undefined }}
                  .schema=${[{ name: "entity_id", selector: { entity: {} } }]}
                  .computeLabel=${() => this._t("check_entity_label")}
                  @value-changed=${(ev: CustomEvent) => update({ entity_id: ((ev.detail.value as Obj).entity_id as string) ?? "" })}
                ></ltek-form>
                <div class="ltek-row">
                  <label class="lbl">${this._t("check_states")}</label>
                  <input
                    type="text"
                    .value=${(Array.isArray(states) ? states : [states]).join(", ")}
                    placeholder=${this._t("check_states_placeholder")}
                    @change=${(ev: Event) => {
                      const list = (ev.target as HTMLInputElement).value.split(",").map((v) => v.trim()).filter(Boolean);
                      update({ state: list.length ? list : undefined });
                    }}
                  />
                </div>`
            : this._checkNote(device)}
          <ltek-form
            .hass=${this.hass}
            .data=${{ timeout: check.timeout, on_failure: check.on_failure ?? "warn" }}
            .schema=${[
              { name: "timeout", selector: { number: { min: 5, max: 300, step: 5, mode: "slider", unit_of_measurement: "s" } } },
              {
                name: "on_failure",
                required: true,
                selector: {
                  select: {
                    options: [
                      { value: "warn", label: this._t("check_warn") },
                      { value: "stop", label: this._t("check_stop") },
                    ],
                    mode: "dropdown",
                  },
                },
              },
            ]}
            .computeLabel=${(s: { name: string }) => this._t(s.name === "timeout" ? "check_timeout" : "check_failure")}
            @value-changed=${(ev: CustomEvent) => {
              const v = ev.detail.value as Obj;
              update({ timeout: v.timeout, on_failure: v.on_failure === "stop" ? "stop" : undefined });
            }}
          ></ltek-form>
          <label class="check">
            <input
              type="checkbox"
              .checked=${check.keep_checking !== false}
              @change=${(ev: Event) => update({ keep_checking: (ev.target as HTMLInputElement).checked ? undefined : false })}
            />
            ${this._t("check_keep")}
          </label>
        </div>`;
      })}
    </div>`;
  }

  private _routesChanged(id: string, activity: Activity, v: Obj): void {
    const remote: Obj = {};
    for (const g of GROUPS) {
      if (v[g] === "__none") remote[g] = null;
      else if (v[g] && v[g] !== "__auto") remote[g] = v[g];
    }
    if (v.touchpad === "on" || v.touchpad === "off") {
      remote.touchpad = v.touchpad === "on";
    }
    if (activity.remote?.buttons) {
      remote.buttons = activity.remote.buttons;
    }
    if (activity.remote?.settings) {
      remote.settings = activity.remote.settings;
    }
    this._setActivity(id, { ...activity, remote: Object.keys(remote).length ? remote : undefined });
  }

  private _extrasChanged(id: string, activity: Activity, v: Obj): void {
    const quick = ((activity.remote?.buttons as unknown[] | undefined) ?? []).filter(isQuickSelect);
    const buttons = [...(Array.isArray(v.buttons) ? v.buttons : []), ...quick];
    const remote: Obj = { ...activity.remote, buttons };
    this._setActivity(id, {
      ...activity,
      remote: cleanRemote(remote),
      commands: v.activity_commands as Obj | undefined,
    });
  }

  /** Quick-select buttons: device, source from its (remembered) list, label, icon. */
  private _renderQuickSelect(id: string, activity: Activity): TemplateResult {
    const all = (activity.remote?.buttons as unknown[] | undefined) ?? [];
    const others = all.filter((b) => !isQuickSelect(b));
    const quick = all.filter(isQuickSelect);
    const setQuick = (list: Obj[]) => {
      const remote: Obj = { ...activity.remote, buttons: [...others, ...list] };
      this._setActivity(id, { ...activity, remote: cleanRemote(remote) });
    };
    const players = (activity.devices ?? []).filter((d) =>
      this.room.devices?.[d]?.entity_id?.startsWith("media_player."),
    );
    const deviceOptions = players.map((d) => ({ value: d, label: this.room.devices?.[d]?.name ?? d }));

    return html`${quick.map((button, i) => {
        const entity = this.room.devices?.[button.device as string]?.entity_id;
        return html`<div class="step">
          <div class="step-head">
            <span class="title">${(button.name as string) || (button.source as string) || ""}</span>
            ${this._moveButtons(quick, i, setQuick)}
          </div>
          <ltek-form
            .hass=${this.hass}
            .data=${{ device: button.device, source: button.source, label: button.name, icon: button.icon }}
            .schema=${[
              { name: "device", required: true, selector: { select: { options: deviceOptions, mode: "dropdown" } } },
              {
                name: "source",
                required: true,
                selector: { select: { options: sourceList(this.hass, this.sources, entity), custom_value: true, mode: "dropdown" } },
              },
              { name: "label", selector: { text: {} } },
              { name: "icon", selector: { icon: {} } },
            ]}
            .computeLabel=${this._label}
            .computeHelper=${this._helper}
            @value-changed=${(ev: CustomEvent) => {
              const v = ev.detail.value as Obj;
              const list = [...quick];
              // An empty source stays as "" so the button remains a quick select
              list[i] = clean({ device: v.device, source: v.source ?? "", name: v.label, icon: v.icon }, ["source"]);
              setQuick(list);
            }}
          ></ltek-form>
        </div>`;
      })}
      ${players.length
        ? html`<button class="ltek-add" @click=${() => setQuick([...quick, { device: players[players.length - 1], source: "" }])}>
            + ${this._t("add_quick_select")}
          </button>`
        : html`<p class="ltek-hint">${this._t("quick_select_no_player")}</p>`}`;
  }

  /** The list a device setting chooses from: live, else remembered. */
  private _settingList(device: unknown, setting: unknown): string[] {
    const attribute = SETTING_LISTS[String(setting)] ?? "source_list";
    const remembered = attribute === "sound_mode_list" ? this.soundModes : this.sources;
    return deviceList(this.hass, remembered, this.room.devices?.[String(device)]?.entity_id, attribute);
  }

  /** How a setting is listed in the editor: its name, else its entity's or the setting's. */
  private _describeSetting(s: Obj, withDevice: boolean): string {
    const what = s.entity
      ? (s.name as string) ||
        (this.hass.states[s.entity as string]?.attributes.friendly_name as string | undefined) ||
        (s.entity as string) ||
        this._t("setting.entity")
      : this._t(`setting.${s.setting}`);
    if (!withDevice) {
      return what;
    }
    const device = this.room.devices?.[String(s.device)];
    return `${what} (${device?.name ?? String(s.device)})`;
  }

  /** "From the devices"/"automatic" or a choice, as a dropdown. */
  private _settingsMode(chosen: boolean, auto: string, set: (chosen: boolean) => void): TemplateResult {
    return html`<ltek-form
      .hass=${this.hass}
      .data=${{ settings_mode: chosen ? "chosen" : "auto" }}
      .schema=${[
        {
          name: "settings_mode",
          required: true,
          selector: {
            select: {
              options: [
                { value: "auto", label: this._t(auto) },
                { value: "chosen", label: this._t("settings_chosen") },
              ],
              mode: "dropdown",
            },
          },
        },
      ]}
      .computeLabel=${this._label}
      @value-changed=${(ev: CustomEvent) => {
        const next = (ev.detail.value as Obj).settings_mode === "chosen";
        if (next !== chosen) {
          set(next);
        }
      }}
    ></ltek-form>`;
  }

  /**
   * A list of settings with their favourites. With ``devices`` each setting
   * names one of them (an activity's choice); without, all belong to
   * ``owner`` (a device's own list) and carry no device.
   */
  private _renderSettingItems(
    items: Obj[],
    setItems: (list: Obj[]) => void,
    devices: string[] | null,
    owner?: string,
  ): TemplateResult {
    const isPlayer = (d: unknown) =>
      Boolean(this.room.devices?.[String(d)]?.entity_id?.startsWith("media_player."));
    const deviceOptions = (devices ?? []).map((d) => ({ value: d, label: this.room.devices?.[d]?.name ?? d }));
    return html`${items.map((item, i) => {
      const device = devices ? item.device : owner;
      const kind = item.entity !== undefined ? "entity" : (item.setting as string);
      // Source and sound mode need a media player; any device can have entities
      const kinds = isPlayer(device) ? [...SETTINGS, "entity"] : ["entity"];
      const entity = item.entity as string | undefined;
      const entityOptions = entity ? this.hass.states[entity]?.attributes.options : undefined;
      const choices =
        kind === "entity"
          ? Array.isArray(entityOptions)
            ? entityOptions.map(String)
            : undefined
          : this._settingList(device, kind);
      return html`<div class="step">
        <div class="step-head">
          <span class="title">${this._describeSetting(item, devices !== null)}</span>
          ${this._moveButtons(items, i, setItems)}
        </div>
        <ltek-form
          .hass=${this.hass}
          .data=${{ device: item.device, setting: kind, entity, name: item.name, options: item.options ?? [] }}
          .schema=${[
            ...(devices
              ? [{ name: "device", required: true, selector: { select: { options: deviceOptions, mode: "dropdown" } } }]
              : []),
            {
              name: "setting",
              required: true,
              selector: {
                select: { options: kinds.map((value) => ({ value, label: this._t(`setting.${value}`) })), mode: "dropdown" },
              },
            },
            ...(kind === "entity"
              ? [
                  { name: "entity", required: true, selector: { entity: { filter: { domain: [...SETTING_ENTITY_DOMAINS] } } } },
                  { name: "name", selector: { text: {} } },
                ]
              : []),
            // Favourites for lists: source, sound mode, a select
            ...(choices !== undefined
              ? [
                  {
                    name: "options",
                    selector: { select: { options: choices, multiple: true, custom_value: true, mode: "dropdown" } },
                  },
                ]
              : []),
          ]}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${(ev: CustomEvent) => {
            const v = ev.detail.value as Obj;
            const next = isPlayer(devices ? v.device : owner) ? (v.setting as string) : "entity";
            const head = devices ? { device: v.device } : {};
            const list = [...items];
            list[i] =
              next === "entity"
                ? // An entity not picked yet stays "" so the entry remains an entity setting
                  clean({ ...head, entity: v.entity ?? "", name: v.name, options: v.options }, ["entity"])
                : clean({ ...head, setting: next, options: v.options });
            setItems(list);
          }}
        ></ltek-form>
      </div>`;
    })}`;
  }

  private get _lists(): Record<string, Sources> {
    return { source_list: this.sources, sound_mode_list: this.soundModes };
  }

  /** An activity's settings in the card: those of its devices, or its own choice. */
  private _renderCardSettings(id: string, activity: Activity): TemplateResult {
    const chosen = activity.remote?.settings as Obj[] | undefined;
    const setSettings = (list: Obj[] | undefined) => {
      const remote: Obj = { ...activity.remote };
      if (list === undefined) {
        delete remote.settings;
      } else {
        remote.settings = list;
      }
      this._setActivity(id, { ...activity, remote: cleanRemote(remote) });
    };
    const fromDevices = autoSettings(this.hass, this.room, activity, this._lists, this._related);
    // Starting a choice from what the devices offer now
    const mode = this._settingsMode(chosen !== undefined, "settings_auto", (next) =>
      setSettings(next ? fromDevices.map((s) => ({ ...s })) : undefined),
    );

    if (chosen === undefined) {
      return html`${mode}
        ${fromDevices.length
          ? this._settingColumns(fromDevices)
          : html`<p class="ltek-hint">${this._t("settings_auto_none")}</p>`}`;
    }

    const devices = activity.devices ?? [];
    const players = devices.filter((d) => this.room.devices?.[d]?.entity_id?.startsWith("media_player."));
    return html`${mode}
      ${this._renderSettingItems(chosen, setSettings, devices)}
      ${chosen.length ? nothing : html`<p class="ltek-hint">${this._t("settings_none")}</p>`}
      ${devices.length
        ? html`<button
            class="add"
            @click=${() =>
              setSettings([
                ...chosen,
                players.length ? { device: players[0], setting: "sound_mode" } : { device: devices[0], entity: "" },
              ])}
          >
            + ${this._t("add_setting")}
          </button>`
        : nothing}`;
  }

  /** What the card shows, in a column per integration. */
  private _settingColumns(settings: Obj[]): TemplateResult {
    return html`<div class="ltek-group first">${this._t("card_shows")}</div>
      <div class="columns">
        ${byIntegration(this.hass, this.room, settings).map(([platform, list]) => {
          const devices = new Set(list.map((s) => String(s.device)));
          return html`<div class="column">
            <div class="column-head">${platform ? integrationTitle(platform) : this._t("other_integration")}</div>
            ${devices.size === 1
              ? html`<div class="ltek-subline">${this.room.devices?.[[...devices][0]]?.name ?? [...devices][0]}</div>`
              : nothing}
            <ul>
              ${list.map((s) => html`<li>${this._describeSetting(s, devices.size > 1)}</li>`)}
            </ul>
          </div>`;
        })}
      </div>`;
  }

  /** A device's settings in the card, for every activity that uses it. */
  private _renderDeviceSettings(id: string, device: Device): TemplateResult {
    const chosen = device.settings as Obj[] | undefined;
    const setSettings = (list: Obj[] | undefined) => {
      const next: Device = { ...device };
      if (list === undefined) {
        delete next.settings;
      } else {
        next.settings = list;
      }
      this._emit({ ...this.room, devices: { ...this.room.devices, [id]: next } });
    };
    const auto = deviceAutoSettings(this.hass, this.room, id, this._lists, this._related);
    const mode = this._settingsMode(chosen !== undefined, "device_settings_auto", (next) =>
      setSettings(next ? auto.map(({ device: _, ...s }) => s) : undefined),
    );

    if (chosen === undefined) {
      return html`${mode}
        <p class="ltek-hint">
          ${auto.length
            ? this._t("settings_auto_shows", { list: auto.map((s) => this._describeSetting(s, false)).join(", ") })
            : this._t("device_settings_auto_none")}
        </p>`;
    }

    const isPlayer = device.entity_id?.startsWith("media_player.");
    return html`${mode}
      ${this._renderSettingItems(chosen, setSettings, null, id)}
      ${chosen.length ? nothing : html`<p class="ltek-hint">${this._t("device_settings_none")}</p>`}
      <button
        class="add"
        @click=${() => setSettings([...chosen, isPlayer ? { setting: "sound_mode" } : { entity: "" }])}
      >
        + ${this._t("add_setting")}
      </button>`;
  }

  private _addActivity(): void {
    const name = this._t("new_activity");
    const id = uniqueKey(slugify(name), Object.keys(this.room.activities ?? {}));
    this._setActivity(id, { name, devices: [] });
    this._show({ kind: "activity", id });
  }

  /** A copy of the activity, unsaved, opened at once. Started by is left out: the copy would start with the original. */
  private _duplicateActivity(id: string, activity: Activity): void {
    const name = `${activity.name ?? id} ${this._t("copy_suffix")}`;
    const to = uniqueKey(slugify(name), Object.keys(this.room.activities ?? {}));
    const copy = clean({
      ...(JSON.parse(JSON.stringify(activity)) as Activity),
      name,
      order: activity.order !== undefined ? activity.order + 1 : undefined,
      started_by: undefined,
    }) as Activity;
    this._emit({ ...this.room, activities: { ...this.room.activities, [to]: copy } });
    this._show({ kind: "activity", id: to });
  }

  private _deleteActivity(id: string, activity: Activity): void {
    if (!window.confirm(`${this._t("delete")}: ${activity.name ?? id}?`)) {
      return;
    }
    const activities = { ...this.room.activities };
    delete activities[id];
    const room: Room = { ...this.room, activities };
    if (room.default_activity === id) {
      delete room.default_activity;
    }
    this._emit(room);
    this._show({ kind: "list" });
  }

  // ------------------------------------------------------------------
  // YAML
  // ------------------------------------------------------------------

  private _renderYaml(): TemplateResult {
    return html`<p class="ltek-hint">${this._t("yaml_intro")}</p>
      <ltek-form
        .hass=${this.hass}
        .data=${{ yaml: this.room }}
        .schema=${[{ name: "yaml", selector: { object: {} } }]}
        .computeLabel=${() => ""}
        @value-changed=${(ev: CustomEvent) => {
          const value = (ev.detail.value as Obj).yaml;
          if (value && typeof value === "object" && !Array.isArray(value)) {
            this._emit(value as Room);
          }
        }}
      ></ltek-form>`;
  }

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------

  private _moveButtons<T>(list: T[], index: number, set: (list: T[]) => void): TemplateResult {
    const move = (to: number) => {
      const next = [...list];
      const [item] = next.splice(index, 1);
      next.splice(to, 0, item);
      set(next);
    };
    return html`<span class="move">
      <button class="ltek-act" title=${this._t("move_up")} aria-label=${this._t("move_up")} ?disabled=${index === 0} @click=${() => move(index - 1)}>
        <ha-icon icon="mdi:arrow-up"></ha-icon>
      </button>
      <button class="ltek-act" title=${this._t("move_down")} aria-label=${this._t("move_down")} ?disabled=${index === list.length - 1} @click=${() => move(index + 1)}>
        <ha-icon icon="mdi:arrow-down"></ha-icon>
      </button>
      <button class="ltek-del" title=${this._t("delete")} aria-label=${this._t("delete")} @click=${() => set(list.filter((_, i) => i !== index))}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
      </button>
    </span>`;
  }

  /** A dropdown that adds the chosen value and resets itself. */
  private _picker(
    label: string,
    options: { value: string; label: string }[],
    pick: (value: string) => void,
  ): TemplateResult {
    return html`<ltek-form
      class="picker"
      .hass=${this.hass}
      .data=${{ pick: undefined }}
      .schema=${[{ name: "pick", selector: { select: { options, mode: "dropdown" } } }]}
      .computeLabel=${() => label}
      @value-changed=${(ev: CustomEvent) => {
        const value = (ev.detail.value as Obj).pick as string | undefined;
        if (value) {
          pick(value);
          (ev.target as LitElement).requestUpdate();
        }
      }}
    ></ltek-form>`;
  }

  static styles = [
    ltekTokens,
    ltekPanelScale,
    ltekChrome,
    css`
    :host {
      display: block;
    }
    .detected {
      margin-bottom: var(--ltek-sp-4);
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .hint,
    .sub {
      color: var(--secondary-text-color);
      font-size: var(--ltek-fs-body);
    }
    p.hint {
      margin: 0 0 12px;
      line-height: 1.4;
    }
    .empty {
      color: var(--secondary-text-color);
    }
    .tabs {
      display: flex;
      gap: 4px;
      border-bottom: 1px solid var(--divider-color);
      margin: 16px 0;
    }
    .tabs button {
      font: inherit;
      background: none;
      border: none;
      padding: 8px 16px;
      cursor: pointer;
      color: var(--secondary-text-color);
      border-bottom: 2px solid transparent;
    }
    .tabs button.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }
    .notice {
      background: var(--warning-color, #ffa600);
      color: var(--text-primary-color, #fff);
      padding: 8px 12px;
      border-radius: 8px;
      margin-bottom: 12px;
    }
    .list {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-background-color);
    }
    button.row-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      font: inherit;
      text-align: left;
      color: var(--primary-text-color);
      background: none;
      border: none;
      border-bottom: 1px solid var(--divider-color);
      padding: 12px 16px;
      cursor: pointer;
    }
    button.row-item:last-child {
      border-bottom: none;
    }
    button.row-item:hover {
      background: var(--secondary-background-color);
    }
    .row-text {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .warn {
      color: var(--error-color, #db4437);
      font-size: var(--ltek-fs-small);
    }
    .title {
      font-weight: 500;
    }
    .detail-head .head-acts {
      margin-left: auto;
    }
    .detail-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    button.back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font: inherit;
      background: none;
      border: none;
      padding: 6px 0;
      cursor: pointer;
      color: var(--primary-color);
    }
    h2 {
      font-size: 1.4em;
      font-weight: 400;
      margin: 8px 0 16px;
      overflow-wrap: anywhere;
    }
    section.card,
    details.card {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
      background: var(--card-background-color);
    }
    .card h3 {
      font-size: 1.05em;
      font-weight: 500;
      margin: 0 0 4px;
    }
    h4 {
      font-size: 1em;
      font-weight: 500;
      margin: 20px 0 8px;
    }
    details.advanced > summary {
      cursor: pointer;
      font-weight: 500;
    }
    details.advanced[open] > summary {
      margin-bottom: 8px;
    }
    label.id {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--secondary-text-color);
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    label.id input {
      font: inherit;
      padding: 6px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
    ol.ordered {
      margin: 0 0 8px;
      padding-left: 24px;
    }
    ol.ordered li {
      padding: 2px 0;
    }
    ol.ordered li > * {
      vertical-align: middle;
    }
    .li-text {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 0 8px;
      margin-right: 8px;
    }
    .step {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 8px 12px;
      margin-bottom: 8px;
    }
    .step-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .move {
      display: inline-flex;
      gap: 2px;
      vertical-align: middle;
    }
    .move button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 4px;
      --mdc-icon-size: 18px;
    }
    .move button:disabled {
      opacity: 0.3;
      cursor: default;
    }
    button.add,
    button.danger {
      font: inherit;
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      cursor: pointer;
    }
    button.add {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      margin-top: 8px;
    }
    button.preset {
      margin: 0 0 12px;
    }
    button.delete-room {
      display: block;
      margin-top: 32px;
      padding-left: 0;
    }
    button.danger {
      background: none;
      color: var(--error-color, #db4437);
    }
    .picker {
      display: block;
      max-width: 320px;
    }
    /* Design guide over the original layout */
    .tabs button {
      font-size: var(--ltek-fs-label);
    }
    .tabs button.active {
      color: var(--ltek-c-accent);
      border-bottom-color: var(--ltek-c-accent);
    }
    .step {
      background: var(--ltek-c-surface-raised);
      border: 1px solid var(--ltek-c-border-soft);
      border-radius: var(--ltek-r-card);
    }
    .move {
      gap: var(--ltek-sp-2);
    }
    .move button.ltek-act,
    .move button.ltek-del {
      padding: 2px;
    }
    h2 {
      color: var(--ltek-c-text);
    }
    button.back {
      color: var(--ltek-c-accent);
    }
    .notice {
      background: none;
      color: var(--ltek-c-warning);
      border: 1px solid var(--ltek-c-warning);
      border-radius: var(--ltek-r-md);
    }
    button.delete-room {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      margin-top: 32px;
    }
    /* Startup / Shutdown beside the activity's name */
    .inline-bar {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
    .inline-order {
      display: flex;
      justify-content: flex-end;
    }
    .inline-add {
      margin-top: 10px;
    }
    [slot="edit"] h4 {
      margin: 10px 0 4px;
      font-size: var(--ltek-fs-group);
      font-weight: 500;
    }
    .flow-add {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .flow-add .ltek-add {
      width: auto;
      margin: 0;
    }
    button.link {
      background: none;
      border: none;
      padding: 0 0 0 4px;
      color: var(--ltek-c-accent);
      cursor: pointer;
      font: inherit;
    }
    .ltek-item .lead.good {
      color: var(--success-color, #43a047);
    }
    .watchdog-now {
      margin-bottom: 8px;
    }
    .ltek-item .lead.bad {
      color: var(--error-color, #db4437);
    }
    .io {
      margin-top: 4px;
    }
    dialog.io {
      border: 1px solid var(--ltek-c-accent);
      border-radius: var(--ltek-r-panel);
      background: var(--card-background-color, #1c1c1c);
      color: var(--ltek-c-text);
      padding: 0;
      width: min(640px, 92vw);
    }
    dialog.io::backdrop {
      background: rgba(0, 0, 0, 0.55);
    }
    dialog.io .dialog-body {
      display: flex;
      flex-direction: column;
      gap: var(--ltek-sp-3);
      padding: 16px;
    }
    dialog.io textarea.ltek-text {
      font-family: var(--code-font-family, monospace);
      font-size: var(--ltek-fs-small);
      resize: vertical;
    }
    .enabled-toggle {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-right: 8px;
      font-size: var(--ltek-fs-small);
      color: var(--secondary-text-color);
      cursor: pointer;
    }
    .enabled-toggle.off {
      color: var(--warning-color, #ffa600);
    }
    .head-acts {
      display: flex;
      gap: 8px;
    }
    .gen-head {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-3);
      flex-wrap: wrap;
      margin: 8px 0 16px;
      padding: 14px 16px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--ltek-c-surface, var(--card-background-color));
    }
    .gen-head.editing {
      border-color: var(--ltek-c-accent);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      margin-bottom: 0;
    }
    .gen-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--ltek-c-accent) 14%, transparent);
      color: var(--ltek-c-accent);
      --mdc-icon-size: 28px;
      flex: none;
    }
    .gen-text {
      flex: 1;
      min-width: 0;
    }
    .gen-head h2 {
      margin: 0;
      font-size: 1.5em;
      font-weight: var(--ltek-fw-semibold, 600);
      line-height: 1.2;
    }
    .gen-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 16px;
      margin-top: 4px;
      font-size: var(--ltek-fs-small);
      color: var(--secondary-text-color);
      --mdc-icon-size: 15px;
    }
    .gen-meta span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    button.gen-lock {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 50%;
      background: none;
      color: var(--secondary-text-color);
      cursor: pointer;
      --mdc-icon-size: 16px;
      flex: none;
      align-self: flex-start;
    }
    button.gen-lock:hover,
    button.gen-lock.open {
      color: var(--ltek-c-accent);
      border-color: var(--ltek-c-accent);
    }
    .gen-edit {
      margin: 0 0 16px;
      padding: 12px 16px;
      border: 1px solid var(--ltek-c-accent);
      border-top: none;
      border-radius: 0 0 12px 12px;
    }
    .gen-bar {
      display: flex;
      gap: var(--ltek-sp-2);
      padding-top: 10px;
    }
    .gen-bar .ltek-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-1);
      --mdc-icon-size: 16px;
    }
    .title-row {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-4);
      flex-wrap: wrap;
    }
    .title-row h2 {
      margin-right: auto;
    }
    .run-buttons {
      display: inline-flex;
      gap: var(--ltek-sp-2);
    }
    button.run-btn {
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-1);
      padding: var(--ltek-ctrl-pad);
      border-radius: var(--ltek-r-ctrl);
      border: 1px solid var(--ltek-c-border);
      background: transparent;
      color: var(--ltek-c-text);
      font: inherit;
      font-size: var(--ltek-fs-body);
      cursor: pointer;
      user-select: none;
      touch-action: none;
      --mdc-icon-size: 18px;
    }
    button.run-btn:disabled {
      opacity: 0.4;
      cursor: default;
    }
    button.run-btn.startup {
      border-color: var(--green-color, #4caf50);
      color: var(--green-color, #4caf50);
    }
    button.run-btn.shutdown {
      border-color: var(--red-color, #f44336);
      color: var(--red-color, #f44336);
    }
    button.run-btn > * {
      position: relative;
    }
    /* Held: fills up over the 3 seconds */
    button.run-btn .fill {
      position: absolute;
      inset: 0;
      width: 0;
      background: color-mix(in srgb, var(--green-color, #4caf50) 30%, transparent);
    }
    button.run-btn.holding .fill {
      width: 100%;
      transition: width 3s linear;
    }
    /* Start of the Remote control card's settings */
    .card-divider {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      margin: var(--ltek-sp-6) 0 var(--ltek-sp-1);
      color: var(--ltek-c-muted);
      font-size: var(--ltek-fs-small);
      font-weight: var(--ltek-fw-semibold);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      --mdc-icon-size: 18px;
    }
    .card-divider::after {
      content: "";
      flex: 1;
      border-top: 1px solid var(--divider-color);
    }
    /* An activity's devices: numbered raised rows */
    .check .title .num {
      color: var(--accent-color, var(--ltek-c-accent));
      font-weight: var(--ltek-fw-semibold);
      margin-right: var(--ltek-sp-1);
    }
    .check .ltek-row {
      margin: var(--ltek-sp-2) 0;
    }
    .ordered-row .num {
      flex: none;
      min-width: 1.5em;
      text-align: center;
      color: var(--accent-color, var(--ltek-c-accent));
      font-weight: var(--ltek-fw-semibold);
      font-variant-numeric: tabular-nums;
    }
    .ordered-row .move {
      gap: var(--ltek-sp-2);
    }
    button.ltek-item-text.link {
      border: none;
      background: none;
      padding: 0;
      font: inherit;
      text-align: left;
      cursor: pointer;
      color: inherit;
    }
    button.ltek-item-text.link:hover .ltek-name {
      color: var(--ltek-c-accent);
    }
    select.add-select {
      appearance: none;
      -webkit-appearance: none;
      align-self: flex-start;
      width: auto;
      padding: var(--ltek-ctrl-pad);
      border: 1px dashed var(--ltek-c-accent);
      border-radius: var(--ltek-r-ctrl);
      background: transparent;
      color: var(--ltek-c-accent);
      font: inherit;
      font-size: var(--ltek-fs-body);
      font-weight: var(--ltek-fw-semibold);
      cursor: pointer;
    }
    select.add-select:hover {
      background: var(--ltek-c-accent-fade-soft);
    }
    select.add-select option {
      color: var(--ltek-c-text);
      background: var(--card-background-color);
      font-weight: var(--ltek-fw-normal);
    }
    /* Settings in the card: a column per integration */
    .columns {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: var(--ltek-sp-3);
      margin-top: var(--ltek-sp-2);
    }
    .column {
      background: var(--ltek-c-surface-raised);
      border-radius: var(--ltek-r-card);
      padding: var(--ltek-sp-2) var(--ltek-sp-3);
    }
    .column-head {
      color: var(--accent-color, var(--ltek-c-accent));
      font-weight: var(--ltek-fw-semibold);
      font-size: var(--ltek-fs-label);
    }
    .column ul {
      margin: var(--ltek-sp-1) 0 0;
      padding-left: 1.1em;
      font-size: var(--ltek-fs-body);
    }
    /* Power Outlet: off is greyed out */
    label.check {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      color: var(--ltek-c-label);
      font-size: var(--ltek-fs-body);
      margin-bottom: var(--ltek-sp-2);
    }
    label.check input {
      accent-color: var(--ltek-c-accent);
    }
    .unused {
      opacity: 0.45;
      pointer-events: none;
    }
    .detail-head .ltek-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-1);
    }
  `,
  ];
}

if (!customElements.get("easy-av-control-room-editor")) {
  customElements.define("easy-av-control-room-editor", EasyAvControlRoomEditor);
}

type FlowDelete = { row: { kind: string; [key: string]: unknown }; header?: string; device?: string; mode: string };

/** A new action after start: a device step names the activity's first device, so it is valid at once. */
function newStep(type: string, activity: Activity, room: Room): Step {
  const deviceSteps = ["power_on", "power_off", "set_source", "set_volume", "set_sound_mode", "set_brightness", "set_color_temp", "set_position", "set_tilt"];
  if (!deviceSteps.includes(type)) return { type };
  const device = (activity.devices ?? [])[0] ?? Object.keys(room.devices ?? {})[0];
  return device ? { type, device } : { type };
}

/** The device a new check is for: the first with a picture check and none yet, else the first. */
function firstPictureDevice(chosen: string[], checks: Obj[]): string {
  return chosen.find((d) => !checks.some((c) => c.device === d && !c.entity_id)) ?? chosen[0];
}

/** An activity's monitor from the form (minutes for auto-off), without the defaults. */
function monitorConfig(v: Obj): Activity["monitor"] {
  const idle = v.idle_after_min !== undefined ? Number(v.idle_after_min) * 60 : Number(v.idle_after ?? 0);
  const warning = v.idle_warning_min !== undefined ? Number(v.idle_warning_min) * 60 : Number(v.idle_warning ?? 300);
  const out = clean({
    lost_after: Number(v.lost_after ?? 60) === 60 ? undefined : Number(v.lost_after),
    picture_lost_after: Number(v.picture_lost_after ?? 60) === 60 ? undefined : Number(v.picture_lost_after),
    idle_after: idle || undefined,
    idle_warning: !idle || warning === 300 ? undefined : warning,
  }, ["lost_after", "picture_lost_after"].filter((k) => Number(v[k]) === 0));
  return Object.keys(out).length ? out : undefined;
}

type FlowMove = { what: "device" | "step" | "check"; device?: string; index: number; dir: number; mode: string };
