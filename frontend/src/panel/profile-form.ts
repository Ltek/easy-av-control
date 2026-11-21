/**
 * The profile form: every part of a profile as fields, picked from a real device of its integration.
 *
 * Entities are picked on an example device (profiles/sample) and stored the way profiles match them: domain plus
 * translation key (else the unique-ID suffix, else the device class), never the entity ID. State values are
 * chips: the values the picked entity can show are offered, and any other value can be typed.
 *
 * Read only for built-in profiles. Emits "profile-changed" with the whole profile on every change.
 */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import type { HomeAssistant } from "../types";
import { ltekChrome, ltekTokens } from "./ltek-styles";
import type { Obj } from "./model";
import { t } from "./strings";

export interface SampleEntity {
  entity_id: string;
  name: string;
  domain: string;
  translation_key: string | null;
  device_class: string | null;
  unique_id_suffix: string | null;
  state: string | null;
  attributes: Record<string, string | number | boolean>;
  values: string[];
  main: boolean;
}

export interface Sample {
  integrations: string[];
  devices: { id: string; name: string }[];
  device_id: string | null;
  entities: SampleEntity[];
}

type Matcher = { domain: string; translation_key?: string; unique_id_suffix?: string; device_class?: string };

const GROUPS = ["starting", "on", "stopping", "off", "error"] as const;
const ROLES = ["power", "navigation", "now_playing", "turn_off"] as const;
const ORDERS = ["early", "middle", "late"] as const;

/** How a profile finds an entity on any Home Assistant: never the entity ID. */
export function matcherFor(entity: SampleEntity): Matcher {
  const m: Matcher = { domain: entity.domain };
  if (entity.translation_key) m.translation_key = entity.translation_key;
  else if (entity.unique_id_suffix) m.unique_id_suffix = entity.unique_id_suffix;
  else if (entity.device_class) m.device_class = entity.device_class;
  return m;
}

/** The example entity a matcher finds (the profile's own matching rule, in the browser). */
export function findEntity(entities: SampleEntity[], matcher: Matcher | undefined): SampleEntity | undefined {
  if (!matcher) return undefined;
  return entities
    .filter((e) => e.domain === matcher.domain)
    .filter((e) => !matcher.translation_key || e.translation_key === matcher.translation_key)
    .filter((e) => !matcher.unique_id_suffix || (e.unique_id_suffix ?? "").endsWith(matcher.unique_id_suffix))
    .filter((e) => !matcher.device_class || e.device_class === matcher.device_class)
    .sort((a, b) => a.entity_id.localeCompare(b.entity_id))[0];
}

/** Values not yet in any other state group: a value means one thing only. */
export function unused(offered: string[], indicator: Obj, group: string): string[] {
  const taken = new Set(GROUPS.filter((g) => g !== group).flatMap((g) => (indicator[g] as string[] | undefined) ?? []));
  return offered.filter((v) => !taken.has(v));
}

/** A profile with ``path`` set to ``value``; undefined, "" and empty lists / objects remove the key. */
export function setIn(profile: Obj, path: string[], value: unknown): Obj {
  const out: Obj = { ...profile };
  const [key, ...rest] = path;
  if (rest.length) {
    const inner = setIn((profile[key] as Obj | undefined) ?? {}, rest, value);
    if (Object.keys(inner).length) out[key] = inner;
    else delete out[key];
    return out;
  }
  const empty =
    value === undefined || value === "" || (Array.isArray(value) && !value.length) ||
    (typeof value === "object" && value !== null && !Array.isArray(value) && !Object.keys(value).length);
  if (empty) delete out[key];
  else out[key] = value;
  return out;
}

export class EasyAvControlProfileForm extends LitElement {
  static properties = {
    hass: { attribute: false },
    profile: { attribute: false },
    readonly: { type: Boolean },
    _sample: { state: true },
    _open: { state: true },
    _deviceId: { state: true },
  };

  declare hass: HomeAssistant;
  declare profile: Obj;
  declare readonly: boolean;
  declare _sample?: Sample;
  /** The one open panel (design guide) */
  declare _open: string;
  declare _deviceId?: string | null;
  private _sampleKey = "";

  constructor() {
    super();
    this.readonly = false;
    this._open = "general";
  }

  private _t(key: string, params?: Record<string, string>): string {
    return t(this.hass?.language, key, params);
  }

  protected willUpdate(): void {
    const integration = String(this.profile?.integration ?? "");
    const key = `${integration}|${this._deviceId ?? ""}`;
    if (this.hass && key !== this._sampleKey) {
      this._sampleKey = key;
      this.hass
        .callWS<Sample>({ type: "easy_av_control/profiles/sample", integration, device_id: this._deviceId ?? null })
        .then((sample) => {
          if (key === this._sampleKey) this._sample = sample;
        })
        .catch(() => undefined);
    }
  }

  private _set(path: string[], value: unknown): void {
    if (this.readonly) return;
    this.dispatchEvent(new CustomEvent("profile-changed", { detail: { profile: setIn(this.profile, path, value) } }));
  }

  private get _entities(): SampleEntity[] {
    return this._sample?.entities ?? [];
  }

  // ------------------------------------------------------------------ building blocks

  private _panel(id: string, icon: string, title: string, hint: string, body: TemplateResult): TemplateResult {
    return html`<details
      class="ltek-sec"
      .open=${this._open === id}
      @toggle=${(e: Event) => {
        const open = (e.target as HTMLDetailsElement).open;
        if (open && this._open !== id) this._open = id;
        else if (!open && this._open === id) this._open = "";
      }}
    >
      <summary><ha-icon icon=${icon}></ha-icon>${title}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${hint ? html`<p class="ltek-hint">${hint}</p>` : nothing}<fieldset ?disabled=${this.readonly}>${body}</fieldset></div>
    </details>`;
  }

  private _text(path: string[], label: string, placeholder = ""): TemplateResult {
    const value = path.reduce<unknown>((o, k) => (o as Obj | undefined)?.[k], this.profile) ?? "";
    return html`<div class="ltek-row"><label class="lbl">${label}</label>
      <input type="text" .value=${String(value)} placeholder=${placeholder}
        @change=${(e: Event) => this._set(path, (e.target as HTMLInputElement).value.trim())} /></div>`;
  }

  private _select(path: string[], label: string, options: [string, string][], fallback = ""): TemplateResult {
    const value = String(path.reduce<unknown>((o, k) => (o as Obj | undefined)?.[k], this.profile) ?? fallback);
    return html`<div class="ltek-row"><label class="lbl">${label}</label>
      <select @change=${(e: Event) => this._set(path, (e.target as HTMLSelectElement).value || undefined)}>
        ${options.map(([v, n]) => html`<option value=${v} ?selected=${v === value}>${n}</option>`)}
      </select></div>`;
  }

  private _slider(path: string[], label: string, min: number, max: number, step: number, fallback: number): TemplateResult {
    const raw = path.reduce<unknown>((o, k) => (o as Obj | undefined)?.[k], this.profile);
    const value = raw === undefined ? fallback : Number(raw);
    return html`<div class="ltek-row nowrap"><label class="lbl">${label}</label>
      <input type="range" min=${min} max=${max} step=${step} .value=${String(value)}
        @input=${(e: Event) => ((e.target as HTMLInputElement).nextElementSibling!.textContent = this._secs(Number((e.target as HTMLInputElement).value)))}
        @change=${(e: Event) => {
          const v = Number((e.target as HTMLInputElement).value);
          this._set(path, v === fallback ? undefined : v);
        }} />
      <span class="ltek-val">${this._secs(value)}</span>
      ${raw !== undefined && !this.readonly
        ? html`<button class="ltek-act" title=${this._t("pf.reset")} @click=${() => this._set(path, undefined)}><ha-icon icon="mdi:restore"></ha-icon></button>`
        : nothing}</div>`;
  }

  private _secs(n: number): string {
    return n >= 60 && n % 60 === 0 ? `${n / 60} min` : `${n} s`;
  }

  /** Pick an entity of the example device; stored as a matcher. */
  private _entityPicker(path: string[], label: string, domains: string[] | null, allowNone = true): TemplateResult {
    const matcher = path.reduce<unknown>((o, k) => (o as Obj | undefined)?.[k], this.profile) as Matcher | undefined;
    const current = findEntity(this._entities, matcher);
    const choices = this._entities.filter((e) => !domains || domains.includes(e.domain));
    const describe = (m: Matcher | undefined) =>
      m ? [m.domain, m.translation_key ?? m.unique_id_suffix ?? m.device_class].filter(Boolean).join(" · ") : "";
    return html`<div class="ltek-row"><label class="lbl">${label}</label>
      <select @change=${(e: Event) => {
        const id = (e.target as HTMLSelectElement).value;
        const entity = this._entities.find((x) => x.entity_id === id);
        this._set(path, entity ? matcherFor(entity) : undefined);
      }}>
        ${allowNone ? html`<option value="" ?selected=${!matcher}>${this._t("pf.none")}</option>` : nothing}
        ${matcher && !current ? html`<option value="__keep" selected>${describe(matcher)} (${this._t("pf.not_on_device")})</option>` : nothing}
        ${choices.map((e) => html`<option value=${e.entity_id} ?selected=${current?.entity_id === e.entity_id}>${e.name} · ${e.entity_id}</option>`)}
      </select>
      ${matcher ? html`<span class="ltek-badge">${describe(matcher)}</span>` : nothing}</div>`;
  }

  /** State values as chips; offered values come from the watched entity (or its attribute). */
  private _chips(path: string[], label: string, offered: string[]): TemplateResult {
    const values = (path.reduce<unknown>((o, k) => (o as Obj | undefined)?.[k], this.profile) as string[] | undefined) ?? [];
    const add = (v: string) => v && !values.includes(v) && this._set(path, [...values, v]);
    return html`<div class="ltek-row"><label class="lbl">${label}</label>
      <span class="chips">
        ${values.map((v) => html`<span class="chip on">${v}
          ${this.readonly ? nothing : html`<button title=${this._t("delete")} @click=${() => this._set(path, values.filter((x) => x !== v))}>×</button>`}</span>`)}
        ${this.readonly
          ? nothing
          : html`${offered.filter((v) => !values.includes(v)).map((v) => html`<button class="chip add" @click=${() => add(v)}>+ ${v}</button>`)}
              <input class="chip-input" type="text" placeholder=${this._t("pf.other_value")}
                @change=${(e: Event) => {
                  const el = e.target as HTMLInputElement;
                  add(el.value.trim());
                  el.value = "";
                }} />`}
      </span></div>`;
  }

  // ------------------------------------------------------------------ panels

  private _general(): TemplateResult {
    const integrations = [...new Set([String(this.profile.integration ?? ""), ...(this._sample?.integrations ?? [])])].filter(Boolean);
    const devices = this._sample?.devices ?? [];
    return html`
      ${this._text(["name"], this._t("pf.name"))}
      ${this._text(["id"], this._t("pf.id"), "my_receiver")}
      ${this._select(["integration"], this._t("pf.integration"), integrations.map((i) => [i, i]))}
      ${devices.length > 1
        ? html`<div class="ltek-row"><label class="lbl">${this._t("pf.example")}</label>
            <select @change=${(e: Event) => (this._deviceId = (e.target as HTMLSelectElement).value)}>
              ${devices.map((d) => html`<option value=${d.id} ?selected=${d.id === this._sample?.device_id}>${d.name}</option>`)}
            </select></div>`
        : nothing}
      ${!this._entities.length ? html`<p class="ltek-hint ltek-warn">${this._t("pf.no_example")}</p>` : nothing}
      ${this._entityPicker(["device_entity"], this._t("pf.device_entity"), ["media_player", "remote", "switch"], false)}
      ${this._select(["order"], this._t("pf.order"), ORDERS.map((o) => [o, this._t(`order.${o}`)]), "middle")}
    `;
  }

  private _status(): TemplateResult {
    const ind = (this.profile.indicator as Obj | undefined) ?? {};
    const own = !ind.entity;
    const watched = own ? findEntity(this._entities, this.profile.device_entity as Matcher) : findEntity(this._entities, ind.entity as Matcher);
    const attribute = ind.attribute as string | undefined;
    const now = attribute ? watched?.attributes[attribute] : watched?.state;
    const offered = attribute
      ? [now].filter((v): v is string | number | boolean => v !== undefined).map(String)
      : watched?.values ?? [];
    const attributes = Object.keys(watched?.attributes ?? {});
    return html`
      ${this._entityPicker(["indicator", "entity"], this._t("pf.status_entity"), null)}
      <p class="ltek-hint">${this._t(own ? "pf.status_own" : "pf.status_other")}</p>
      ${attributes.length
        ? this._select(["indicator", "attribute"], this._t("pf.attribute"), [["", this._t("pf.attribute_none")], ...attributes.map((a): [string, string] => [a, a])])
        : nothing}
      ${watched ? html`<p class="ltek-hint">${this._t("pf.now", { value: now === undefined ? "–" : String(now) })}</p>` : nothing}
      <label class="check"><input type="checkbox" .checked=${!!ind.available_is_on}
        @change=${(e: Event) => this._set(["indicator", "available_is_on"], (e.target as HTMLInputElement).checked || undefined)} />
        ${this._t("pf.available_is_on")}</label>
      ${ind.available_is_on
        ? nothing
        : GROUPS.map((g) => this._chips(["indicator", g], this._t(`pf.group.${g}`), unused(offered, ind, g)))}
    `;
  }

  private _timing(): TemplateResult {
    return html`
      ${this._slider(["timeouts", "on"], this._t("pf.timeout_on"), 5, 600, 5, 120)}
      ${this._slider(["timeouts", "off"], this._t("pf.timeout_off"), 5, 900, 5, 300)}
      ${this._slider(["debounce"], this._t("pf.debounce"), 0, 30, 0.5, 2)}
    `;
  }

  private _companions(): TemplateResult {
    const settings = (this.profile.settings as Matcher[] | undefined) ?? [];
    const selects = this._entities.filter((e) => ["select", "number", "switch"].includes(e.domain));
    const chosen = new Set(settings.map((m) => findEntity(this._entities, m)?.entity_id).filter(Boolean));
    return html`
      ${this._entityPicker(["remote"], this._t("pf.remote"), ["remote"])}
      ${this._entityPicker(["power_switch"], this._t("pf.power_switch"), ["switch"])}
      <div class="ltek-group">${this._t("pf.settings")}</div>
      <p class="ltek-hint">${this._t("pf.settings_hint")}</p>
      ${selects.map((e) => html`<label class="check"><input type="checkbox" .checked=${chosen.has(e.entity_id)}
        @change=${(ev: Event) => {
          const on = (ev.target as HTMLInputElement).checked;
          const m = matcherFor(e);
          const rest = settings.filter((s) => findEntity(this._entities, s)?.entity_id !== e.entity_id);
          this._set(["settings"], on ? [...rest, m] : rest);
        }} />${e.name}</label>`)}
      ${settings.filter((m) => !findEntity(this._entities, m)).map((m) => html`<span class="ltek-badge">${m.domain} · ${m.translation_key ?? m.unique_id_suffix ?? ""}</span>`)}
    `;
  }

  private _picture(): TemplateResult {
    const pic = this.profile.picture as Obj | undefined;
    const watched = findEntity(this._entities, pic?.entity as Matcher | undefined);
    return html`
      <label class="check"><input type="checkbox" .checked=${!!pic}
        @change=${(e: Event) => {
          const on = (e.target as HTMLInputElement).checked;
          const first = this._entities.find((x) => x.domain === "sensor");
          this._set(["picture"], on ? { entity: first ? matcherFor(first) : { domain: "sensor" }, ok: [] } : undefined);
        }} />${this._t("pf.picture_on")}</label>
      ${pic
        ? html`${this._entityPicker(["picture", "entity"], this._t("pf.picture_entity"), null, false)}
            ${this._chips(["picture", "ok"], this._t("pf.picture_ok"), watched?.values ?? [])}
            ${this._chips(["picture", "fail"], this._t("pf.picture_fail"), watched?.values ?? [])}
            ${this._slider(["picture", "timeout"], this._t("pf.picture_timeout"), 5, 300, 5, 30)}
            ${this._slider(["picture", "debounce"], this._t("pf.debounce"), 0, 30, 0.5, 5)}`
        : nothing}
    `;
  }

  private _jobs(): TemplateResult {
    const roles = (this.profile.roles as Record<string, number> | undefined) ?? {};
    return html`${ROLES.map((role) => html`<div class="ltek-row nowrap"><label class="ltek-check-inline">
        <input type="checkbox" .checked=${roles[role] !== undefined}
          @change=${(e: Event) => this._set(["roles", role], (e.target as HTMLInputElement).checked ? 5 : undefined)} />
        ${this._t(`role.${role}`)}</label>
        ${roles[role] !== undefined
          ? html`<input type="range" min="1" max="9" step="1" .value=${String(roles[role])}
              @change=${(e: Event) => this._set(["roles", role], Number((e.target as HTMLInputElement).value))} />
              <span class="ltek-val">${roles[role]}</span>`
          : nothing}</div>`)}`;
  }

  protected render(): TemplateResult {
    return html`
      ${this._panel("general", "mdi:information-outline", this._t("pf.general"), this._t("pf.general_hint"), this._general())}
      ${this._panel("status", "mdi:state-machine", this._t("pf.status"), this._t("pf.status_hint"), this._status())}
      ${this._panel("timing", "mdi:timer-sand", this._t("pf.timing"), this._t("pf.timing_hint"), this._timing())}
      ${this._panel("companions", "mdi:remote", this._t("pf.companions"), this._t("pf.companions_hint"), this._companions())}
      ${this._panel("picture", "mdi:image-check-outline", this._t("pf.picture"), this._t("pf.picture_hint"), this._picture())}
      ${this._panel("jobs", "mdi:account-hard-hat-outline", this._t("pf.jobs"), this._t("pf.jobs_hint"), this._jobs())}
    `;
  }

  static styles = [
    ltekTokens,
    ltekChrome,
    css`
      :host {
        display: block;
      }
      fieldset {
        border: none;
        margin: 0;
        padding: 0;
        min-width: 0;
      }
      .ltek-row input[type="text"],
      .ltek-row select {
        flex: 1 1 auto;
        min-width: 0;
        padding: var(--ltek-ctrl-pad);
        background: var(--secondary-background-color, #2a2a2a);
        border: 1px solid var(--ltek-c-border);
        border-radius: var(--ltek-r-ctrl);
        color: var(--ltek-c-text);
        font: inherit;
        font-size: var(--ltek-fs-body);
      }
      .ltek-row.nowrap {
        flex-wrap: nowrap;
      }
      .ltek-row input[type="range"] {
        flex: 1 1 auto;
        min-width: 100px;
        accent-color: var(--ltek-c-accent);
      }
      .ltek-val {
        flex: 0 0 var(--ltek-slider-val-w);
        text-align: right;
        font-weight: var(--ltek-fw-bold);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        font-size: var(--ltek-fs-body);
      }
      label.check,
      label.ltek-check-inline {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-2);
        color: var(--ltek-c-label);
        font-size: var(--ltek-fs-body);
        padding: var(--ltek-sp-1) var(--ltek-sp-3) var(--ltek-sp-1) 0;
        flex: none;
      }
      label.check input,
      label.ltek-check-inline input {
        accent-color: var(--ltek-c-accent);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: var(--ltek-sp-1);
        flex: 1 1 auto;
        min-width: 0;
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
      }
      .chip.on {
        border-color: var(--ltek-c-accent);
        color: var(--ltek-c-accent);
        background: var(--ltek-c-accent-fade);
      }
      .chip.on button {
        border: none;
        background: none;
        color: inherit;
        cursor: pointer;
        padding: 0 0 0 2px;
        font-size: 14px;
        line-height: 1;
      }
      button.chip.add {
        cursor: pointer;
        border-style: dashed;
      }
      button.chip.add:hover {
        border-color: var(--ltek-c-accent);
        color: var(--ltek-c-accent);
      }
      input.chip-input {
        flex: 0 1 120px;
        padding: 2px 8px;
        border-radius: 10px;
        border: 1px solid var(--ltek-c-border);
        background: transparent;
        color: var(--ltek-c-text);
        font: inherit;
        font-size: var(--ltek-fs-small);
      }
    `,
  ];
}

if (!customElements.get("easy-av-control-profile-form")) {
  customElements.define("easy-av-control-profile-form", EasyAvControlProfileForm);
}
