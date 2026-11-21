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
  deviceAutoSettings,
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
import { ltekChrome, ltekTokens } from "./ltek-styles";
import "./remote-preview";
import { t } from "./strings";

type Tab = "devices" | "activities" | "yaml";

/** What the editor shows: a list (the tab) or one device or activity. */
type View = { kind: "list" } | { kind: "device"; id: string } | { kind: "activity"; id: string };

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
  steps: "mdi:playlist-play",
  remote: "mdi:remote",
  quick_select: "mdi:gesture-tap-button",
  section_flow: "mdi:sitemap-outline",
  section_remote_preview: "mdi:cellphone-screenshot",
};
const SHORT = slider(120);

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

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("room") || changed.has("hass")) {
      this._loadRelated();
    }
    // Another room: back to its lists
    if (changed.has("roomId") && changed.get("roomId") !== undefined) {
      this._view = { kind: "list" };
      this._notice = undefined;
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
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${{
          name: this.room.name ?? "",
          area_id: this.room.area_id ?? undefined,
          default_activity: this.room.default_activity ?? "__last",
        }}
        .schema=${[
          { name: "name", required: true, selector: { text: {} } },
          { name: "area_id", selector: { area: {} } },
          { name: "default_activity", selector: { select: { options: activityOptions, mode: "dropdown" } } },
        ]}
        .computeLabel=${(s: { name: string }) => this._t(`room_${s.name === "area_id" ? "area" : s.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${(ev: CustomEvent) => {
          const v = ev.detail.value as Obj;
          this._emit(
            clean({
              ...this.room,
              name: v.name as string,
              area_id: v.area_id as string,
              default_activity: v.default_activity === "__last" ? undefined : (v.default_activity as string),
            }),
          );
        }}
      ></ha-form>

      <div class="tabs" role="tablist">
        ${(["devices", "activities", "yaml"] as Tab[]).map(
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
          : this._renderYaml()}
      <button class="ltek-btn danger delete-room" @click=${() => this.dispatchEvent(new CustomEvent("delete-room"))}>
        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
        ${this._t("delete_room")}
      </button>
    `;
  }

  /** Header of a detail view: back, title, delete. */
  private _detailHeader(back: string, title: string, onDelete: () => void): TemplateResult {
    return html`<div class="detail-head">
        <button class="back" @click=${() => this._show({ kind: "list" })}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
          <span>${back}</span>
        </button>
        <button class="ltek-btn danger" @click=${onDelete}>
          <ha-icon icon="mdi:trash-can-outline"></ha-icon> ${this._t("delete")}
        </button>
      </div>
      <h2>${title}</h2>
      ${this._notice ? html`<div class="notice">${this._notice}</div>` : nothing}`;
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
    return view.kind === "list" ? `list:${this.roomId}` : `${view.kind}:${this.roomId}:${view.id}`;
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
  private _deviceForm(id: string, data: Obj, schema: Obj[]): TemplateResult {
    return html`<ha-form
      .hass=${this.hass}
      .data=${data}
      .schema=${schema}
      .computeLabel=${this._label}
      .computeHelper=${this._helper}
      @value-changed=${(ev: CustomEvent) => this._deviceChanged(id, { ...data, ...(ev.detail.value as Obj) })}
    ></ha-form>`;
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
    const ready = device.ready ?? null;
    const remote = this._remoteOf(device.entity_id);
    const presetApplied =
      ready?.entity_id === remote && ready?.reload_integration === true && device.remote_entity === remote;
    const usage = deviceUsage(this.room, id);

    return html`
      ${this._detailHeader(this._t("tab_devices"), this._deviceTitle(id, device), () => this._deleteDevice(id))}
      ${usage.length ? html`<p class="ltek-hint">${this._t("used_by", { where: usage.join(", ") })}</p>` : nothing}

      ${this._card(
        this._t("section_device"),
        this._t("hint_device"),
        this._deviceForm(id, data, [
          { name: "entity_id", required: true, selector: { entity: {} } },
          { name: "name", selector: { text: {} } },
          { name: "remote_entity", selector: { entity: { filter: { domain: "remote" } } } },
        ]),
        "mdi:television",
      )}
      ${this._card(this._t("section_state"), this._t("hint_state"), this._renderState(id, device), "mdi:state-machine")}
      ${this._card(
        this._t("section_power"),
        this._t("hint_power"),
        this._deviceForm(id, data, [
          { name: "power_switch", selector: { entity: { filter: { domain: ["switch", "input_boolean", "light"] } } } },
          ...(device.power_switch ? [{ name: "delay_after_power", selector: SHORT }] : []),
        ]),
        "mdi:power-socket-eu",
      )}
      ${this._card(
        this._t("section_delays"),
        this._t("hint_delays"),
        this._deviceForm(id, data, [
          { name: "delay_after_on", selector: SECONDS },
          { name: "delay_after_off", selector: SECONDS },
        ]),
        "mdi:timer-sand",
      )}
      ${this._card(
        this._t("section_ready"),
        this._t("hint_ready"),
        html`${remote && !presetApplied
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
          ])}`,
      )}
      ${this._card(this._t("card_settings"), this._t("device_settings_hint"), this._renderDeviceSettings(id, device))}
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
    `;
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
    const options = (prefix: string, values: readonly string[]) =>
      values.map((v) => ({ value: v, label: this._t(`${prefix}.${v}`) }));
    const offFailures = FAILURES.map((v) => ({ value: v, label: this._t(v === "stop" ? "failure_off.stop" : `failure.${v}`) }));
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
      ...(hasStatus
        ? [
            { name: "wait_on", selector: { select: { mode: "dropdown", options: options("wait", WAIT_MODES) } } },
            { name: "timeout_on", selector: slider(600, 5, 5) },
            { name: "on_failure_on", selector: { select: { mode: "dropdown", options: options("failure", FAILURES) } } },
            { name: "wait_off", selector: { select: { mode: "dropdown", options: options("wait", WAIT_MODES) } } },
            { name: "timeout_off", selector: slider(900, 5, 5) },
            { name: "on_failure_off", selector: { select: { mode: "dropdown", options: offFailures } } },
            { name: "debounce", selector: slider(30, 0.5) },
            ...(detect?.found?.picture
              ? [{ name: "on_failure_picture", selector: { select: { mode: "dropdown", options: options("failure", ["warn", "stop"]) } } }]
              : []),
          ]
        : []),
    ];
    return html`${this._renderDetected(id, device, detect)}
      ${detect && !hasStatus ? html`<p class="ltek-hint">${this._t("state_fixed_only")}</p>` : nothing}
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s: { name: string }) => this._t(s.name === "state_source" ? "state_source" : `field.${s.name}`)}
        .computeHelper=${this._helper}
        @value-changed=${(ev: CustomEvent) => {
          const next = applyStateForm(device, { ...data, ...(ev.detail.value as Obj) }, detect);
          this._emit({ ...this.room, devices: { ...this.room.devices, [id]: next } });
        }}
      ></ha-form>`;
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
    const activities = Object.entries(this.room.activities ?? {}).sort(
      ([ka, a], [kb, b]) =>
        (a.order ?? 1000) - (b.order ?? 1000) ||
        (a.name ?? ka).localeCompare(b.name ?? kb, undefined, { sensitivity: "base" }),
    );
    const names = (activity: Activity) =>
      (activity.devices ?? []).map((d) => this.room.devices?.[d]?.name ?? d).join(" → ");
    return html`
      <p class="ltek-hint">${this._t("activities_intro")}</p>
      <div class="ltek-list">
        ${Object.keys(this.room.devices ?? {}).length
          ? html`<button class="ltek-add" @click=${this._addActivity}>+ ${this._t("add_activity")}</button>`
          : html`<p class="ltek-hint">${this._t("needs_devices")}</p>`}
        ${activities.length
          ? activities.map(([id, activity]) =>
              this._row(
                activity.name ?? id,
                names(activity) || this._t("no_devices"),
                () => this._show({ kind: "activity", id }),
                undefined,
                activity.icon ?? "mdi:play-circle-outline",
              ),
            )
          : html`<p class="ltek-hint">${this._t("activities_empty")}</p>`}
      </div>
    `;
  }

  private _setActivity(id: string, activity: Activity): void {
    this._emit({ ...this.room, activities: { ...this.room.activities, [id]: clean(activity) } });
  }

  private _renderActivity(id: string, activity: Activity): TemplateResult {
    const devices = Object.keys(this.room.devices ?? {});
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

    return html`
      ${this._detailHeader(this._t("tab_activities"), activity.name ?? id, () => this._deleteActivity(id, activity))}

      ${this._card(
        this._t("section_general"),
        this._t("hint_general"),
        html`<ha-form
          .hass=${this.hass}
          .data=${{ name: activity.name, icon: activity.icon, order: activity.order }}
          .schema=${[
            { name: "name", required: true, selector: { text: {} } },
            { name: "icon", selector: { icon: {} } },
            { name: "order", selector: { number: { min: 0, max: 999, mode: "box" } } },
          ]}
          .computeLabel=${this._label}
          @value-changed=${(ev: CustomEvent) => {
            const v = ev.detail.value as Obj;
            this._activityGeneralChanged(id, activity, v);
          }}
        ></ha-form>`,
      )}

      ${this._card(
        this._t("section_activity_devices"),
        this._t("hint_activity_devices"),
        html`${chosen.length
            ? html`<ol class="ordered">
                ${chosen.map(
                  (d, i) => html`<li>
                    <span class="li-text">
                      <span>${this.room.devices?.[d]?.name ?? d}</span>
                      <span class="sub">${this.room.devices?.[d]?.entity_id ?? ""}</span>
                    </span>
                    ${this._moveButtons(chosen, i, (list) => this._setActivity(id, { ...activity, devices: list }))}
                  </li>`,
                )}
              </ol>`
            : nothing}
          ${devices.some((d) => !chosen.includes(d))
            ? this._picker(
                this._t("add_device_to_activity"),
                devices
                  .filter((d) => !chosen.includes(d))
                  .map((d) => ({ value: d, label: this.room.devices?.[d]?.name ?? d })),
                (d) => this._setActivity(id, { ...activity, devices: [...chosen, d] }),
              )
            : nothing}`,
      )}

      ${this._card(
        this._t("steps"),
        this._t("hint_steps"),
        html`${(activity.steps ?? []).map((step, i) => this._renderStep(id, activity, step, i))}
          ${this._picker(
            this._t("add_step"),
            STEP_TYPES.map((type) => ({ value: type, label: this._t(`step.${type}`) })),
            (type) => this._setActivity(id, { ...activity, steps: [...(activity.steps ?? []), { type }] }),
          )}`,
      )}

      ${this._card(
        this._t("section_flow"),
        this._t("hint_flow"),
        html`<easy-av-control-flow
          .hass=${this.hass}
          .room=${this.room}
          .roomId=${this.roomId}
          .activityId=${id}
        ></easy-av-control-flow>`,
      )}

      ${this._card(
        this._t("remote"),
        this._t("hint_remote"),
        html`<ha-form
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
        ></ha-form>`,
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

      ${this._advanced(
        this._t("hint_activity_advanced"),
        html`<p class="ltek-hint">${this._t("activity_id_hint", { id })}</p>
          <ha-form
            .hass=${this.hass}
            .data=${{
              buttons: ((remote.buttons as unknown[] | undefined) ?? []).filter((b) => !isQuickSelect(b)),
              activity_commands: activity.commands,
            }}
            .schema=${[
              { name: "buttons", selector: { object: {} } },
              { name: "activity_commands", selector: { object: {} } },
            ]}
            .computeLabel=${this._label}
            @value-changed=${(ev: CustomEvent) => this._extrasChanged(id, activity, ev.detail.value as Obj)}
          ></ha-form>
          <h4>${this._t("hooks")}</h4>
          <ha-form
            .hass=${this.hass}
            .data=${{ on_start: activity.on_start ?? [], on_stop: activity.on_stop ?? [] }}
            .schema=${[
              { name: "on_start", selector: { action: {} } },
              { name: "on_stop", selector: { action: {} } },
            ]}
            .computeLabel=${this._label}
            @value-changed=${(ev: CustomEvent) => {
              const v = ev.detail.value as Obj;
              this._setActivity(id, { ...activity, on_start: v.on_start as unknown[], on_stop: v.on_stop as unknown[] });
            }}
          ></ha-form>`,
      )}
    `;
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
      <ha-form
        .hass=${this.hass}
        .data=${step}
        .schema=${stepSchema(this.hass, this.room, step, (k) => this._t(k), this.sources, this.soundModes)}
        .computeLabel=${this._label}
        @value-changed=${(ev: CustomEvent) => {
          const list = [...steps];
          list[index] = clean({ ...(ev.detail.value as Step), type: step.type });
          setSteps(list);
        }}
      ></ha-form>
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
          <ha-form
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
          ></ha-form>
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
    return html`<ha-form
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
    ></ha-form>`;
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
        <ha-form
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
        ></ha-form>
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
        <p class="ltek-hint">
          ${fromDevices.length
            ? this._t("settings_auto_shows", { list: fromDevices.map((s) => this._describeSetting(s, true)).join(", ") })
            : this._t("settings_auto_none")}
        </p>`;
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
      <ha-form
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
      ></ha-form>`;
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
    return html`<ha-form
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
    ></ha-form>`;
  }

  static styles = [
    ltekTokens,
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
      font-size: 0.9em;
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
      font-size: 0.85em;
    }
    .title {
      font-weight: 500;
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
