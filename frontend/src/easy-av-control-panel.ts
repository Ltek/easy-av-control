/**
 * Easy AV Control configuration panel (admins only).
 *
 * Reads the configuration with easy_av_control/config/get, checks it with
 * config/validate and saves it with config/save; the integration applies it
 * like a save in the options flow.
 */
import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";

import type { ProfileView } from "./panel/device-state";
import "./panel/detect";
import "./panel/guide";
import { REPO, ltekChrome, ltekPanelScale, ltekTokens } from "./panel/ltek-styles";
import "./panel/profiles";
import "./panel/reports";
import "./panel/notifications";
import "./panel/quick-start";
import "./panel/room-editor";
import { clean, slugify, sortedActivities, uniqueKey, type Room, type Rooms, type Sources } from "./panel/model";
import { t } from "./panel/strings";
import type { HomeAssistant } from "./types";

type Page = "room" | "profiles" | "detect" | "guide" | "reports" | "notifications" | "quickstart";
/** Tells the room editor what to show: an activity (at its Flow), or with no activity the room's own page */
type Jump = { activity?: string; flow: boolean; tab?: string; n: number };

interface Missing {
  room: string;
  path: string;
  entity_id: string;
}

interface Check {
  error: { path: string[]; message: string } | null;
  missing: Missing[];
}

type Banner =
  | { kind: "invalid"; path: string; message: string }
  | { kind: "missing"; missing: Missing[] }
  | { kind: "conflict" }
  | { kind: "saved" }
  | { kind: "applied" };

/** ha-form and its selectors are loaded lazily by HA; make sure they exist. */
async function loadHaElements(): Promise<void> {
  if (customElements.get("ha-form") && customElements.get("ha-selector")) {
    return;
  }
  const helpers = await (window as unknown as { loadCardHelpers: () => Promise<any> }).loadCardHelpers();
  const card = await helpers.createCardElement({ type: "entities", entities: [] });
  await card.constructor.getConfigElement();
  await customElements.whenDefined("ha-form");
}

export class EasyAvControlPanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { type: Boolean },
    _rooms: { state: true },
    _selected: { state: true },
    _loadError: { state: true },
    _banner: { state: true },
    _saving: { state: true },
    _ready: { state: true },
    _sources: { state: true },
    _soundModes: { state: true },
    _adding: { state: true },
    _profiles: { state: true },
    _page: { state: true },
    _draftFor: { state: true },
    _focusProfile: { state: true },
    _version: { state: true },
    _jump: { state: true },
    _sidebar: { state: true },
    _openActivity: { state: true },
  };

  declare hass: HomeAssistant;
  declare narrow: boolean;
  declare _rooms?: Rooms;
  declare _selected?: string;
  declare _loadError?: string;
  declare _banner?: Banner;
  declare _saving: boolean;
  declare _ready: boolean;
  declare _sources: Sources;
  declare _soundModes: Sources;
  declare _adding: boolean;
  /** Every profile, for the Profiles page and the device pages' profile picker */
  declare _profiles: ProfileView[];
  /** Rooms (the selected one) or the Profiles page */
  declare _page: Page;
  /** Where Close on the Guide goes back to */
  private _back: Page = "room";
  /** Whether the panel is in Home Assistant's sidebar (ui/sidebar) */
  declare _sidebar?: boolean;
  /** An integration to start a + Profile draft for (from Detect integrations) */
  declare _draftFor?: string;
  /** A profile to show on the Profiles page (from a Detected Devices chip) */
  declare _focusProfile?: string;
  declare _version?: string;
  /** Tells the room editor to open an activity (from the menu) */
  declare _jump?: Jump;
  /** The activity the room editor shows, to mark it in the menu */
  declare _openActivity?: string;

  private _entryId?: string;
  private _revision?: string;
  private _original = "";
  private _loading = false;

  constructor() {
    super();
    this._saving = false;
    this._ready = false;
    this._sources = {};
    this._soundModes = {};
    this._adding = false;
    this._profiles = [];
    this._page = "room";
  }

  private async _loadProfiles(): Promise<void> {
    this._profiles = await this.hass
      .callWS<ProfileView[]>({ type: "easy_av_control/profiles/list" })
      .catch(() => [] as ProfileView[]);
  }

  private _t(key: string, params?: Record<string, string>): string {
    return t(this.hass?.language, key, params);
  }

  private async _load(): Promise<void> {
    this._loading = true;
    try {
      await loadHaElements();
      this._ready = true;
      const result = await this.hass.callWS<{ entry_id: string; rooms: Rooms; revision: string }>({
        type: "easy_av_control/config/get",
      });
      this._entryId = result.entry_id;
      this._version = (result as { version?: string }).version;
      this.hass
        .callWS<{ visible: boolean }>({ type: "easy_av_control/ui/sidebar" })
        .then((r) => (this._sidebar = r.visible))
        .catch(() => undefined);
      this._revision = result.revision;
      this._original = JSON.stringify(result.rooms);
      this._rooms = result.rooms;
      this._banner = undefined;
      if (!this._selected || !(this._selected in result.rooms)) {
        this._selected = Object.keys(result.rooms)[0];
      }
      void this._loadProfiles();
      // Remembered source and sound mode lists for the pickers; the panel works without them
      [this._sources, this._soundModes] = await Promise.all(
        ["source_list", "sound_mode_list"].map((attribute) =>
          this.hass
            .callWS<Sources>({ type: "easy_av_control/config/sources", attribute })
            .catch(() => ({}) as Sources),
        ),
      );
    } catch (err) {
      this._loadError = (err as { message?: string })?.message ?? String(err);
    } finally {
      this._loading = false;
    }
  }

  private get _dirty(): boolean {
    return this._rooms !== undefined && JSON.stringify(this._rooms) !== this._original;
  }

  // ------------------------------------------------------------------
  // Editing
  // ------------------------------------------------------------------

  private _roomChanged(id: string, room: Room): void {
    this._rooms = { ...this._rooms, [id]: room };
    if (this._banner?.kind !== "conflict") {
      this._banner = undefined;
    }
  }

  private _addRoom(name: string): void {
    this._adding = false;
    if (!name.trim()) {
      return;
    }
    const id = uniqueKey(slugify(name), Object.keys(this._rooms ?? {}));
    this._rooms = { ...this._rooms, [id]: { name: name.trim(), devices: {}, activities: {} } };
    this._selected = id;
  }

  private _renderAddRoom(): TemplateResult {
    if (!this._adding) {
      return html`<button class="room add" @click=${() => (this._adding = true)}>+ ${this._t("add_room")}</button>`;
    }
    const submit = (ev: Event) => {
      ev.preventDefault();
      const input = (ev.target as HTMLFormElement).querySelector("input")!;
      this._addRoom(input.value);
    };
    return html`<form class="new-room" @submit=${submit}>
      <input
        aria-label=${this._t("add_room_name")}
        placeholder=${this._t("add_room_name")}
        @keydown=${(ev: KeyboardEvent) => ev.key === "Escape" && (this._adding = false)}
      />
      <div class="new-room-buttons">
        <button type="button" class="flat" @click=${() => (this._adding = false)}>${this._t("cancel")}</button>
        <button type="submit" class="primary">${this._t("create")}</button>
      </div>
    </form>`;
  }

  protected updated(changed: PropertyValues): void {
    if (this.hass && !this._rooms && !this._loading && !this._loadError) {
      void this._load();
    }
    // Focus the name field of a new room once, when it opens; not on every
    // update, which would take the focus away from other fields
    if (changed.has("_adding") && this._adding) {
      this.shadowRoot?.querySelector<HTMLInputElement>("form.new-room input")?.focus();
    }
  }

  private _deleteRoom(id: string): void {
    const room = this._rooms?.[id];
    if (!room || !window.confirm(this._t("delete_room_confirm", { name: room.name ?? id }))) {
      return;
    }
    const rooms = { ...this._rooms };
    delete rooms[id];
    this._rooms = rooms;
    this._selected = Object.keys(rooms)[0];
  }

  private _discard(): void {
    this._rooms = JSON.parse(this._original) as Rooms;
    this._banner = undefined;
    // A room added and discarded is gone again
    if (!this._selected || !(this._selected in this._rooms)) {
      this._selected = Object.keys(this._rooms)[0];
    }
  }

  /** Load the saved configuration again, after asking if that loses changes. */
  private _reload(): void {
    if (this._dirty && !window.confirm(this._t("reload_confirm"))) {
      return;
    }
    this._loadError = undefined;
    void this._load();
  }

  private async _save(force = false): Promise<void> {
    if (!this._rooms || !this._revision) {
      return;
    }
    // Edits replace this._rooms; ones made while saving must survive
    const edited = this._rooms;
    const rooms: Rooms = {};
    for (const [id, room] of Object.entries(edited)) {
      rooms[id] = clean(room);
    }
    this._saving = true;
    try {
      // All rooms: the save covers them all, also those not on screen
      const check = await this.hass.callWS<Check>({ type: "easy_av_control/config/validate", rooms });
      if (check.error) {
        this._banner = {
          kind: "invalid",
          path: check.error.path.join("."),
          message: check.error.message,
        };
        return;
      }
      if (check.missing.length && !force) {
        this._banner = { kind: "missing", missing: check.missing };
        return;
      }
      const result = await this.hass.callWS<{ revision: string }>({
        type: "easy_av_control/config/save",
        rooms,
        revision: this._revision,
        entry_id: this._entryId,
      });
      this._revision = result.revision;
      this._original = JSON.stringify(rooms);
      if (this._rooms === edited) {
        this._rooms = rooms;
      }
      this._banner = { kind: "saved" };
      void this._loadProfiles();
    } catch (err) {
      const error = err as { code?: string; message?: string };
      this._banner =
        error.code === "conflict"
          ? { kind: "conflict" }
          : { kind: "invalid", path: "", message: error.message ?? String(err) };
    } finally {
      this._saving = false;
    }
  }

  // ------------------------------------------------------------------
  // Rendering
  // ------------------------------------------------------------------

  protected render(): TemplateResult {
    return html`
      <div class="toolbar">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="main-title">${this._t("title")}</div>
        ${this._dirty ? html`<span class="dirty">${this._t("unsaved")}</span>` : nothing}
        <button class="flat" ?disabled=${!this._dirty || this._saving} @click=${this._discard}>
          ${this._t("discard")}
        </button>
        <button class="primary" ?disabled=${!this._dirty || this._saving} @click=${() => this._save()}>
          ${this._saving ? this._t("saving") : this._t("save")}
        </button>
      </div>
      <div class="content">${this._renderContent()}</div>
    `;
  }

  private _renderContent(): TemplateResult {
    if (this._loadError) {
      return html`<div class="banner error">
        ${this._t("load_error", { error: this._loadError })}
        <button class="flat" @click=${() => this._reload()}>${this._t("retry")}</button>
      </div>`;
    }
    if (!this._rooms || !this._ready) {
      return html`<div class="empty">${this._t("loading")}</div>`;
    }
    const rooms = Object.entries(this._rooms);
    const selected = this._selected && this._rooms[this._selected] ? this._selected : undefined;
    return html`<div class="layout ${this.narrow ? "narrow" : ""}">
      <nav>
        <div class="nav-head">
          <span class="nav-title">${this._t("rooms")}</span>
          <button
            class="nav-add"
            title=${this._t("add_room")}
            aria-label=${this._t("add_room")}
            @click=${() => (this._adding = true)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
        ${this._adding ? this._renderAddRoom() : nothing}
        ${rooms.map(
          ([id, room]) => html`<button
            class="room ${this._page === "room" && id === selected && !this._openActivity ? "active" : ""}"
            @click=${() => this._goRoom(id)}
          >
            ${room.name ?? id}
          </button>
          ${sortedActivities(room).map(
            ([aid, activity]) => html`<div
              class="nav-activity ${this._page === "room" && id === selected && this._openActivity === aid ? "active" : ""} ${activity.enabled === false ? "disabled" : ""}"
            >
              <button class="nav-act-name" @click=${() => this._goActivity(id, aid, false)}>
                <ha-icon icon=${activity.icon ?? "mdi:play-circle-outline"}></ha-icon>
                <span>${activity.name ?? aid}</span>
              </button>
              <button
                class="ltek-act nav-flow"
                title=${this._t("nav_flow")}
                aria-label=${this._t("nav_flow")}
                @click=${() => this._goActivity(id, aid, true)}
              >
                <ha-icon icon="mdi:sitemap-outline"></ha-icon>
              </button>
            </div>`,
          )}
`,
        )}
        <div class="nav-title library">${this._t("setup")}</div>
        <button class="room ${this._page === "quickstart" ? "active" : ""}" @click=${() => (this._page = "quickstart")}>
          <ha-icon icon="mdi:rocket-launch-outline"></ha-icon> ${this._t("qs.title")}
        </button>
        <button class="room ${this._page === "detect" ? "active" : ""}" @click=${() => (this._page = "detect")}>
          <ha-icon icon="mdi:auto-fix"></ha-icon> ${this._t("detect")}
        </button>
        <button class="room ${this._page === "profiles" ? "active" : ""}" @click=${() => (this._page = "profiles")}>
          <ha-icon icon="mdi:package-variant-closed"></ha-icon> ${this._t("profiles")}
        </button>
        <button class="room ${this._page === "reports" ? "active" : ""}" @click=${() => (this._page = "reports")}>
          <ha-icon icon="mdi:chart-timeline-variant"></ha-icon> ${this._t("reports")}
        </button>
        <button class="room ${this._page === "notifications" ? "active" : ""}" @click=${() => (this._page = "notifications")}>
          <ha-icon icon="mdi:bell-ring-outline"></ha-icon> ${this._t("ntf.title")}
        </button>
        <button class="room ${this._page === "guide" ? "active" : ""}" @click=${() => this._openGuide()}>
          <ha-icon icon="mdi:help-circle-outline"></ha-icon> ${this._t("guide")}
        </button>
        ${this._sidebar === undefined
          ? nothing
          : html`<button
              class="sidebar-chip ${this._sidebar ? "on" : ""}"
              role="switch"
              aria-checked=${this._sidebar ? "true" : "false"}
              title=${this._t("sidebar_hint")}
              @click=${() => this._setSidebar(!this._sidebar)}
            >
              <ha-icon icon=${this._sidebar ? "mdi:check" : "mdi:eye-off-outline"}></ha-icon>
              ${this._t("sidebar_chip")}
            </button>`}
        <div class="nav-foot">
          <a class="ltek-star" href=${REPO} target="_blank" rel="noopener">${this._t("star")}</a>
          <a class="ltek-issue" href="${REPO}/issues" target="_blank" rel="noopener">${this._t("report")}</a>
          ${this._version ? html`<div class="ltek-foot">${this._t("footer_version", { version: this._version })}</div>` : nothing}
        </div>
      </nav>
      <main>
        ${this._renderBanner()}
        ${this._page === "quickstart" || (this._page === "room" && !rooms.length)
          ? html`<easy-av-control-quick-start
              .hass=${this.hass}
              @open-page=${(ev: CustomEvent<{ page: string }>) => this._openLink(ev.detail.page)}
            ></easy-av-control-quick-start>`
          : this._page === "guide"
          ? html`<easy-av-control-guide
              .language=${this.hass.language}
              @close=${() => (this._page = this._back)}
            ></easy-av-control-guide>`
          : this._page === "reports"
          ? html`<easy-av-control-reports .hass=${this.hass}></easy-av-control-reports>`
          : this._page === "notifications"
          ? html`<easy-av-control-notifications .hass=${this.hass}></easy-av-control-notifications>`
          : this._page === "detect"
          ? html`<easy-av-control-detect
              .hass=${this.hass}
              .rooms=${this._rooms}
              @rooms-changed=${(ev: CustomEvent<{ rooms: Rooms }>) => {
                this._rooms = ev.detail.rooms;
                if (!this._selected || !(this._selected in ev.detail.rooms)) {
                  this._selected = Object.keys(ev.detail.rooms)[0];
                }
                this._page = "room";
                this._banner = { kind: "applied" };
              }}
              @open-profile=${(ev: CustomEvent<{ id: string }>) => {
                this._focusProfile = ev.detail.id;
                this._page = "profiles";
              }}
              @create-profile=${(ev: CustomEvent<{ integration: string }>) => {
                this._draftFor = ev.detail.integration;
                this._page = "profiles";
              }}
            ></easy-av-control-detect>`
          : this._page === "profiles"
          ? html`<easy-av-control-profiles
              .hass=${this.hass}
              .profiles=${this._profiles}
              .draftFor=${this._draftFor}
              .focusProfile=${this._focusProfile}
              @focus-shown=${() => (this._focusProfile = undefined)}
              @draft-opened=${() => (this._draftFor = undefined)}
              @profiles-changed=${() => this._loadProfiles()}
            ></easy-av-control-profiles>`
          : selected
          ? html`<easy-av-control-room-editor
                .hass=${this.hass}
                .room=${this._rooms[selected]}
                .roomId=${selected}
                .sources=${this._sources}
                .soundModes=${this._soundModes}
                .saved=${(JSON.parse(this._original || "{}") as Rooms)[selected]}
                .profiles=${this._profiles}
                @room-changed=${(ev: CustomEvent<{ room: Room }>) => this._roomChanged(selected, ev.detail.room)}
                @delete-room=${() => this._deleteRoom(selected)}
                .jump=${this._jump}
                @view-changed=${(ev: CustomEvent<{ view: { kind: string; id?: string } }>) => {
                  const view = ev.detail.view;
                  this._openActivity = view.kind === "activity" ? view.id : undefined;
                }}
                @open-page=${(ev: CustomEvent<{ page: Page }>) => (this._page = ev.detail.page)}
              ></easy-av-control-room-editor>`
          : html`<div class="empty">${this._t("no_rooms")}</div>`}
      </main>
    </div>`;
  }

  /** A Quick Start link: a page of the menu, or a tab of the first (selected) room. */
  private _openLink(link: string): void {
    if (link === "rooms" || link === "activities") {
      const room = this._selected ?? Object.keys(this._rooms ?? {})[0];
      if (!room) {
        this._adding = true;
        this._page = "room";
        return;
      }
      this._selected = room;
      this._page = "room";
      this._openActivity = undefined;
      this._jump = { flow: false, tab: link === "activities" ? "activities" : "devices", n: (this._jump?.n ?? 0) + 1 };
      return;
    }
    this._page = link as Page;
  }

  /** A room from the menu: its own page, never an activity or device left open in it. */
  private _goRoom(id: string): void {
    this._selected = id;
    this._page = "room";
    this._openActivity = undefined;
    this._jump = { flow: false, n: (this._jump?.n ?? 0) + 1 };
  }

  private _openGuide(): void {
    if (this._page !== "guide") this._back = this._page;
    this._page = "guide";
    window.scrollTo({ top: 0 });
  }

  private async _setSidebar(visible: boolean): Promise<void> {
    this._sidebar = visible;
    try {
      const r = await this.hass.callWS<{ visible: boolean }>({ type: "easy_av_control/ui/sidebar", visible });
      this._sidebar = r.visible;
    } catch {
      this._sidebar = !visible;
    }
  }

  /** Open an activity of a room from the menu, at its Flow when ``flow``. */
  private _goActivity(room: string, activity: string, flow: boolean): void {
    this._selected = room;
    this._page = "room";
    this._jump = { activity, flow, n: (this._jump?.n ?? 0) + 1 };
  }

  private _renderBanner(): TemplateResult | typeof nothing {
    const banner = this._banner;
    if (!banner) {
      return nothing;
    }
    switch (banner.kind) {
      case "saved":
        return html`<div class="banner ok">${this._t("saved")}</div>`;
      case "applied":
        return html`<div class="banner warning">${this._t("detect_applied")}</div>`;
      case "invalid":
        return html`<div class="banner error">
          ${this._t("invalid", { path: banner.path || "–", message: banner.message })}
        </div>`;
      case "conflict":
        return html`<div class="banner error">
          ${this._t("conflict")}
          <button class="flat" @click=${() => this._reload()}>${this._t("reload")}</button>
        </div>`;
      case "missing":
        return html`<div class="banner warning">
          ${this._t("missing")}
          <ul>
            ${banner.missing.map(
              (m) => html`<li>
                <code>${m.entity_id}</code> (${this._rooms?.[m.room]?.name ?? m.room}: ${m.path})
              </li>`,
            )}
          </ul>
          <div class="sub">${this._t("missing_hint")}</div>
          <button class="primary" @click=${() => this._save(true)}>${this._t("save_anyway")}</button>
        </div>`;
    }
  }

  static styles = [
    ltekTokens,
    ltekPanelScale,
    ltekChrome,
    css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      height: var(--header-height, 56px);
      padding: 0 12px;
      background: var(--app-header-background-color, var(--primary-color));
      color: var(--app-header-text-color, var(--text-primary-color, #fff));
      border-bottom: var(--app-header-border-bottom, none);
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .main-title {
      flex: 1;
      min-width: 0;
      font-size: 20px;
      margin-left: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .dirty {
      font-size: var(--ltek-fs-small);
      opacity: 0.85;
    }
    button {
      font: inherit;
      cursor: pointer;
    }
    button.primary,
    button.flat {
      border: none;
      border-radius: 18px;
      padding: 8px 16px;
    }
    button.primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .toolbar button.primary {
      background: var(--text-primary-color, #fff);
      color: var(--primary-color);
    }
    button.flat {
      background: none;
      color: inherit;
    }
    button:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .content {
      padding: 16px;
      max-width: 1100px;
      margin: 0 auto;
      box-sizing: border-box;
    }
    .layout {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 24px;
    }
    .layout.narrow {
      grid-template-columns: 1fr;
    }
    nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .layout.narrow nav {
      flex-direction: row;
      flex-wrap: wrap;
    }
    .nav-title {
      font-weight: 500;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
      width: 100%;
    }
    button.room {
      text-align: left;
      border: none;
      border-radius: 18px;
      padding: 8px 14px;
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }
    button.room.active {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    button.room.add {
      background: none;
      color: var(--primary-color);
    }
    form.new-room {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }
    form.new-room input {
      font: inherit;
      padding: 8px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
    .new-room-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
    }
    nav button.flat {
      color: var(--primary-color);
    }
    main {
      min-width: 0;
    }
    .banner {
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 16px;
      overflow-wrap: anywhere;
    }
    .banner.error {
      background: var(--error-color, #db4437);
      color: var(--text-primary-color, #fff);
    }
    .banner.warning {
      background: var(--warning-color, #ffa600);
      color: var(--text-primary-color, #fff);
    }
    .banner.ok {
      background: var(--success-color, #43a047);
      color: var(--text-primary-color, #fff);
    }
    .banner ul {
      margin: 8px 0;
    }
    .banner .sub {
      margin-bottom: 8px;
      opacity: 0.9;
    }
    .banner button.primary {
      background: var(--text-primary-color, #fff);
      color: var(--primary-text-color);
    }
    .banner button.flat {
      text-decoration: underline;
    }
    .empty {
      color: var(--secondary-text-color);
      padding: 24px 0;
    }
    @media (max-width: 600px) {
      /* Room for the buttons: Save is only enabled with unsaved changes anyway */
      .dirty {
        display: none;
      }
      .toolbar button.primary,
      .toolbar button.flat {
        padding: 6px 12px;
      }
    }
    /* Design guide */
    .nav-title {
      color: var(--ltek-c-muted);
      font-size: var(--ltek-fs-small);
      font-weight: var(--ltek-fw-semibold);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .nav-foot {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--ltek-sp-3);
      margin-top: var(--ltek-sp-6);
      padding-top: var(--ltek-sp-5);
      border-top: 1px solid var(--divider-color);
    }
    .layout.narrow .nav-foot {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
    }
    .nav-title.library {
      margin-top: var(--ltek-sp-6);
    }
    button.room {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      border-radius: var(--ltek-r-ctrl);
      background: var(--ltek-c-surface-raised);
      border: 1px solid var(--ltek-c-border-soft);
      font-size: var(--ltek-fs-label);
    }
    button.room.active {
      background: var(--ltek-c-accent-fade);
      border-color: var(--ltek-c-accent);
      color: var(--ltek-c-text);
    }
    .nav-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .nav-head .nav-title {
      margin-bottom: 0;
      width: auto;
    }
    button.nav-add {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      padding: 0;
      border: 1px dashed var(--ltek-c-accent);
      border-radius: var(--ltek-r-ctrl);
      background: transparent;
      color: var(--ltek-c-accent);
      cursor: pointer;
      --mdc-icon-size: 18px;
    }
    button.nav-add:hover {
      background: var(--ltek-c-accent-fade-soft);
    }
    /* In the sidebar: a chip that switches the panel's sidebar entry */
    button.sidebar-chip {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-1);
      margin-top: var(--ltek-sp-1);
      padding: 3px 12px 3px 8px;
      border-radius: 14px;
      border: 1px solid var(--ltek-c-border);
      background: transparent;
      color: var(--ltek-c-muted);
      font: inherit;
      font-size: var(--ltek-fs-small);
      cursor: pointer;
      --mdc-icon-size: 16px;
    }
    button.sidebar-chip.on {
      border-color: var(--ltek-c-accent);
      color: var(--ltek-c-accent);
      background: var(--ltek-c-accent-fade);
    }
    /* A room's activities, under it in the menu; the icon on the right opens the Flow */
    .nav-activity.disabled .nav-act-name {
        opacity: 0.5;
        text-decoration: line-through;
      }
      .nav-activity {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-1);
      margin-left: var(--ltek-sp-4);
      padding-right: var(--ltek-sp-2);
      border-radius: var(--ltek-r-ctrl);
      border: 1px solid transparent;
    }
    .nav-activity:hover {
      background: var(--ltek-c-accent-fade-soft);
    }
    .nav-activity.active {
      border-color: var(--ltek-c-accent);
      background: var(--ltek-c-accent-fade);
    }
    .nav-act-name {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-2);
      border: none;
      background: none;
      padding: 6px 8px;
      font: inherit;
      font-size: var(--ltek-fs-body);
      color: var(--ltek-c-text);
      text-align: left;
      cursor: pointer;
      --mdc-icon-size: 18px;
    }
    .nav-act-name ha-icon {
      color: var(--accent-color, var(--ltek-c-accent));
      flex: none;
    }
    .nav-act-name span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    button.nav-flow {
      --mdc-icon-size: 18px;
      color: var(--ltek-c-accent);
    }
    .layout.narrow .nav-activity {
      margin-left: 0;
    }
    button.room.add {
      border: 1px dashed var(--ltek-c-accent);
      color: var(--ltek-c-accent);
      background: transparent;
    }
    .banner {
      border-radius: var(--ltek-r-md);
    }
  `,
  ];
}

if (!customElements.get("easy-av-control-panel")) {
  customElements.define("easy-av-control-panel", EasyAvControlPanel);
}
