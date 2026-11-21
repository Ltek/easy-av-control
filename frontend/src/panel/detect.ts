/**
 * Detect integrations: what's installed vs. what the rooms use (config/detect_all), with a checkbox per change.
 * Apply turns the ticked ones into rooms (config/detect_apply) and hands them to the panel as unsaved changes.
 */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import type { HomeAssistant } from "../types";
import { ltekChrome, ltekTokens } from "./ltek-styles";
import type { Obj, Rooms } from "./model";
import { t } from "./strings";

interface NewItem {
  key: string;
  entity_id: string;
  name: string;
  integration: string;
  integrations: string[];
  profile: string;
  profile_name: string;
  order: string;
  picture: boolean;
  area_id: string | null;
  area_name: string | null;
  room: string | null;
  new_room: string | null;
  new_room_name: string | null;
  activities: string[];
  device: Obj;
}

interface Replace {
  room: string;
  path: string;
  entity_id: string;
  integration: string | null;
  replacement: string | null;
  replacement_integration: string | null;
  device?: string;
}

interface Renamed {
  old: string;
  new: string;
  uses: { room: string; path: string }[];
}

export interface DetectResult {
  new: NewItem[];
  better: Replace[];
  gone: Replace[];
  renamed: Renamed[];
  unmatched: string[];
}

/** The choices for one area's detected devices */
interface AreaPick {
  /** an existing room id, or "new:<id>" for a room this creates */
  target: string;
  activities: Set<string>;
  /** the ticked devices (their keys) */
  devices: Set<string>;
}

const NO_AREA = "__none";
const areaOf = (item: NewItem) => item.area_id ?? NO_AREA;

export class EasyAvControlDetect extends LitElement {
  static properties = {
    hass: { attribute: false },
    rooms: { attribute: false },
    _result: { state: true },
    _areas: { state: true },
    _ticked: { state: true },
    _starter: { state: true },
    _error: { state: true },
  };

  declare hass: HomeAssistant;
  declare rooms: Rooms;
  declare _result?: DetectResult;
  declare _areas: Map<string, AreaPick>;
  /** "better:<i>", "gone:<i>", "renamed:<i>" that are ticked */
  declare _ticked: Set<string>;
  declare _starter: boolean;
  declare _error?: string;
  private _asked = false;

  constructor() {
    super();
    this._areas = new Map();
    this._ticked = new Set();
    this._starter = false;
  }

  private _t(key: string, params?: Record<string, string>): string {
    return t(this.hass?.language, key, params);
  }

  protected updated(): void {
    if (this.hass && this.rooms && !this._asked) {
      this._asked = true;
      void this._run();
    }
  }

  private async _run(): Promise<void> {
    this._result = undefined;
    this._error = undefined;
    try {
      const result = await this.hass.callWS<DetectResult>({ type: "easy_av_control/config/detect_all", rooms: this.rooms });
      // Nothing ticked: you choose. Only renamed entities are ticked (the same entity under a new ID).
      const areas = new Map<string, AreaPick>();
      for (const item of result.new) {
        if (!areas.has(areaOf(item))) {
          areas.set(areaOf(item), {
            target: item.room ?? `new:${item.new_room}`,
            activities: new Set(item.activities),
            devices: new Set(),
          });
        }
      }
      const ticked = new Set<string>();
      result.renamed.forEach((_, i) => ticked.add(`renamed:${i}`));
      this._areas = areas;
      this._ticked = ticked;
      this._result = result;
    } catch (err) {
      this._error = (err as { message?: string }).message ?? String(err);
    }
  }

  private _toggle(key: string): void {
    const next = new Set(this._ticked);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this._ticked = next;
  }

  private _setArea(area: string, pick: Partial<AreaPick>): void {
    const next = new Map(this._areas);
    next.set(area, { ...next.get(area)!, ...pick });
    this._areas = next;
  }

  private _toggleDevice(area: string, key: string): void {
    const devices = new Set(this._areas.get(area)!.devices);
    if (devices.has(key)) devices.delete(key);
    else devices.add(key);
    this._setArea(area, { devices });
  }

  private get _anyTicked(): boolean {
    return this._ticked.size > 0 || [...this._areas.values()].some((a) => a.devices.size > 0);
  }

  private _name(entityId: string | null): string {
    if (!entityId) return "–";
    return (this.hass.states[entityId]?.attributes.friendly_name as string | undefined) ?? entityId;
  }

  private async _apply(): Promise<void> {
    const r = this._result!;
    const choices = {
      new: r.new
        .filter((item) => this._areas.get(areaOf(item))?.devices.has(item.key))
        .map((item) => {
          const pick = this._areas.get(areaOf(item))!;
          const isNew = pick.target.startsWith("new:");
          const proposal = r.new.find((other) => `new:${other.new_room}` === pick.target);
          return {
            ...item,
            room: isNew ? null : pick.target,
            new_room: isNew ? pick.target.slice(4) : null,
            new_room_name: isNew ? (proposal?.new_room_name ?? item.new_room_name) : null,
            area_id: isNew ? (proposal?.area_id ?? item.area_id) : item.area_id,
            activities: isNew ? [] : [...pick.activities],
          };
        }),
      starter: this._starter,
      better: r.better.filter((_, i) => this._ticked.has(`better:${i}`)),
      gone: r.gone.filter((_, i) => this._ticked.has(`gone:${i}`)),
      renamed: r.renamed.filter((_, i) => this._ticked.has(`renamed:${i}`)),
    };
    const result = await this.hass.callWS<{ rooms: Rooms }>({
      type: "easy_av_control/config/detect_apply",
      rooms: this.rooms,
      choices,
    });
    this.dispatchEvent(new CustomEvent("rooms-changed", { detail: { rooms: result.rooms } }));
  }

  protected render(): TemplateResult {
    if (this._error) {
      return html`<p class="ltek-error">${this._error}</p>
        <button class="ltek-btn" @click=${this._run}>${this._t("detect_again")}</button>`;
    }
    const r = this._result;
    if (!r) {
      return html`<p class="ltek-hint">${this._t("detect_running")}</p>`;
    }
    const empty = !r.new.length && !r.better.length && !r.gone.length && !r.renamed.length;
    const groups = [...new Set(r.new.map(areaOf))];
    return html`
      <p class="ltek-hint">${this._t("detect_intro")}</p>
      ${empty ? html`<p class="ltek-hint ok">${this._t("detect_nothing")}</p>` : nothing}
      <div class="ltek-buttons bar">
        <button class="ltek-btn primary" ?disabled=${!this._anyTicked} @click=${this._apply}>${this._t("detect_apply")}</button>
        <button class="ltek-btn" @click=${this._run}><ha-icon icon="mdi:refresh"></ha-icon> ${this._t("detect_again")}</button>
        ${r.new.length
          ? html`<label class="check">
              <input type="checkbox" .checked=${this._starter} @change=${(e: Event) => (this._starter = (e.target as HTMLInputElement).checked)} />
              ${this._t("detect_starter")}
            </label>`
          : nothing}
      </div>
      ${r.new.length
        ? this._section("new", "mdi:plus-circle-outline", this._t("detect_new"), this._t("detect_new_hint"),
            html`${groups.map((area) => this._renderArea(area, r.new.filter((i) => areaOf(i) === area)))}`)
        : nothing}
      ${r.better.length
        ? this._section("better", "mdi:arrow-up-bold-circle-outline", this._t("detect_better"), this._t("detect_better_hint"),
            html`${r.better.map((b, i) => this._row(`better:${i}`, "mdi:swap-horizontal",
              this._t("detect_better_row", { from: this._name(b.entity_id), to: this._name(b.replacement) }),
              `${this.rooms[b.room]?.name ?? b.room} · ${b.integration} → ${b.replacement_integration}`))}`)
        : nothing}
      ${r.gone.length
        ? this._section("gone", "mdi:link-variant-off", this._t("detect_gone"), this._t("detect_gone_hint"),
            html`${r.gone.map((g, i) => this._row(`gone:${i}`, "mdi:help-circle-outline", g.entity_id,
              `${this.rooms[g.room]?.name ?? g.room}: ${g.path} · ${g.replacement
                ? this._t("detect_replace_with", { entity: this._name(g.replacement), integration: g.replacement_integration ?? "" })
                : this._t("detect_no_replacement")}`, !g.replacement))}`)
        : nothing}
      ${r.renamed.length
        ? this._section("renamed", "mdi:rename-outline", this._t("detect_renamed"), this._t("detect_renamed_hint"),
            html`${r.renamed.map((n, i) => this._row(`renamed:${i}`, "mdi:rename-outline", `${n.old} → ${n.new}`,
              n.uses.map((u) => `${this.rooms[u.room]?.name ?? u.room}: ${u.path}`).join(", ")))}`)
        : nothing}
      ${r.unmatched.length
        ? this._section("unmatched", "mdi:package-variant", this._t("detect_unmatched"), this._t("detect_unmatched_hint"),
            html`<div class="ltek-list">${r.unmatched.map((integration) => html`<div class="ltek-item">
              <ha-icon class="lead" icon="mdi:puzzle-outline"></ha-icon>
              <span class="ltek-item-text"><span class="ltek-name">${integration}</span></span>
              <button class="ltek-add" @click=${() =>
                this.dispatchEvent(new CustomEvent("create-profile", { detail: { integration } }))}>${this._t("detect_create_profile")}</button>
            </div>`)}</div>`)
        : nothing}

    `;
  }

  private _section(key: string, icon: string, title: string, hint: string, body: TemplateResult): TemplateResult {
    return html`<details class="ltek-sec" open data-section=${key}>
      <summary><ha-icon icon=${icon}></ha-icon>${title}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body"><p class="ltek-hint">${hint}</p><div class="ltek-list">${body}</div></div>
    </details>`;
  }

  private _row(key: string, icon: string, title: string, sub: string, disabled = false): TemplateResult {
    return html`<label class="ltek-item ${this._ticked.has(key) ? "open" : ""}">
      <input type="checkbox" ?disabled=${disabled} .checked=${this._ticked.has(key)} @change=${() => this._toggle(key)} />
      <ha-icon class="lead" icon=${icon}></ha-icon>
      <span class="ltek-item-text"><span class="ltek-name">${title}</span><span class="ltek-subline">${sub}</span></span>
    </label>`;
  }

  private _renderArea(area: string, items: NewItem[]): TemplateResult {
    const pick = this._areas.get(area)!;
    const r = this._result!;
    const first = items[0];
    const proposed = [...new Map(r.new.filter((i) => i.new_room).map((i) => [i.new_room!, i.new_room_name ?? i.new_room!])).entries()];
    const targets = [
      ...Object.entries(this.rooms).map(([id, room]) => ({ value: id, label: room.name ?? id })),
      ...proposed.map(([id, name]) => ({ value: `new:${id}`, label: this._t("detect_new_room", { name }) })),
    ];
    const room = pick.target.startsWith("new:") ? undefined : this.rooms[pick.target];
    const activities = Object.entries(room?.activities ?? {});
    const all = items.every((i) => pick.devices.has(i.key));
    return html`<details class="ltek-sub area" open>
      <summary>
        <ha-icon icon="mdi:texture-box"></ha-icon>${first.area_name ?? this._t("detect_no_area")}
        <span class="count">${pick.devices.size} / ${items.length}</span>
        <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
      </summary>
      <div class="ltek-sub-body">
        <div class="ltek-row">
          <label class="lbl">${this._t("detect_room")}</label>
          <select @change=${(e: Event) => {
            const target = (e.target as HTMLSelectElement).value;
            const acts = target.startsWith("new:") ? [] : Object.keys(this.rooms[target]?.activities ?? {});
            this._setArea(area, { target, activities: new Set(acts) });
          }}>
            ${targets.map((o) => html`<option value=${o.value} ?selected=${o.value === pick.target}>${o.label}</option>`)}
          </select>
          <label class="check">
            <input type="checkbox" .checked=${all} @change=${() =>
              this._setArea(area, { devices: all ? new Set() : new Set(items.map((i) => i.key)) })} />
            ${this._t("detect_select_all")}
          </label>
        </div>
        ${room
          ? html`<div class="ltek-row">
              <label class="lbl">${this._t("detect_activities")}</label>
              ${activities.length
                ? activities.map(([id, a]) => html`<label class="check">
                    <input type="checkbox" .checked=${pick.activities.has(id)} @change=${() => {
                      const next = new Set(pick.activities);
                      if (next.has(id)) next.delete(id);
                      else next.add(id);
                      this._setArea(area, { activities: next });
                    }} />${a.name ?? id}</label>`)
                : html`<span class="ltek-hint">${this._t("detect_no_activities")}</span>`}
            </div>`
          : nothing}
        <div class="ltek-list">${items.map((item) => this._renderDevice(area, item))}</div>
      </div>
    </details>`;
  }

  private _renderDevice(area: string, item: NewItem): TemplateResult {
    const on = this._areas.get(area)!.devices.has(item.key);
    return html`<label class="ltek-item ${on ? "open" : ""}">
      <input type="checkbox" .checked=${on} @change=${() => this._toggleDevice(area, item.key)} />
      <ha-icon class="lead" icon="mdi:television"></ha-icon>
      <span class="ltek-item-text">
        <span class="ltek-name">${item.name}</span>
        <span class="ltek-subline">${item.entity_id}</span>
        <span class="chips">
          <button
            class="chip profile"
            title=${this._t("detect_open_profile")}
            @click=${(e: Event) => {
              e.preventDefault();
              this.dispatchEvent(new CustomEvent("open-profile", { detail: { id: item.profile } }));
            }}
          >
            <ha-icon icon="mdi:package-variant-closed"></ha-icon>${item.profile_name}
          </button>
          ${item.integrations.map(
            (i) => html`<span class="chip ${i === item.integration ? "used" : ""}" title=${i === item.integration ? this._t("detect_used_integration") : ""}>${i}</span>`,
          )}
          ${item.picture ? html`<span class="chip picture">${this._t("detect_picture")}</span>` : nothing}
        </span>
      </span>
      <span class="chip order ${item.order}">${this._t(`order.${item.order}`)}</span>
    </label>`;
  }

  static styles = [
    ltekTokens,
    ltekChrome,
    css`
      :host {
        display: block;
      }
      .bar {
        margin-top: var(--ltek-sp-4);
      }
      .ltek-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-1);
      }
      label.ltek-item {
        cursor: pointer;
      }
      .ltek-item {
        align-items: flex-start;
      }
      details.area {
        margin-bottom: var(--ltek-sp-2);
      }
      details.area .count {
        margin-left: var(--ltek-sp-2);
        color: var(--ltek-c-muted);
        font-weight: var(--ltek-fw-normal);
        text-transform: none;
        letter-spacing: 0;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: var(--ltek-sp-1);
        margin-top: var(--ltek-sp-1);
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: 10px;
        border: 1px solid var(--ltek-c-border);
        background: var(--ltek-c-surface-raised);
        color: var(--ltek-c-label);
        font: inherit;
        font-size: var(--ltek-fs-small);
        line-height: 1.4;
        white-space: nowrap;
        --mdc-icon-size: 14px;
      }
      .chip.used {
        border-color: var(--ltek-c-accent);
        color: var(--ltek-c-accent);
        background: var(--ltek-c-accent-fade);
      }
      button.chip.profile {
        cursor: pointer;
        border-color: var(--ltek-c-accent-lib);
        color: var(--ltek-c-accent-lib);
        background: color-mix(in srgb, var(--ltek-c-accent-lib) 12%, transparent);
      }
      button.chip.profile:hover {
        background: color-mix(in srgb, var(--ltek-c-accent-lib) 24%, transparent);
      }
      .chip.picture {
        border-color: var(--ltek-c-info);
        color: var(--ltek-c-info);
      }
      /* Power-on order: a colour each, so they read at a glance */
      .chip.order {
        flex: none;
        font-weight: var(--ltek-fw-semibold);
        color: var(--ltek-c-on-accent);
        border: none;
      }
      .chip.order.early {
        background: var(--ltek-c-warning);
        color: #212121;
      }
      .chip.order.middle {
        background: var(--ltek-c-info);
      }
      .chip.order.late {
        background: var(--ltek-c-success);
      }
      .ltek-item input[type="checkbox"],
      label.check input {
        accent-color: var(--ltek-c-accent);
      }
      label.check {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-1);
        color: var(--ltek-c-label);
        font-size: var(--ltek-fs-body);
        margin-right: var(--ltek-sp-3);
      }
      .ltek-row select {
        flex: 0 1 260px;
      }
      .ok {
        color: var(--ltek-c-success);
      }
    `,
  ];
}

if (!customElements.get("easy-av-control-detect")) {
  customElements.define("easy-av-control-detect", EasyAvControlDetect);
}
