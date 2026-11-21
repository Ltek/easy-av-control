/**
 * ``<ltek-form>``: Home Assistant's ha-form, drawn in the design guide's style.
 *
 * Same properties (hass, data, schema, computeLabel, computeHelper, disabled) and the same
 * ``value-changed`` event with the whole data, so it replaces ha-form one for one. Text, numbers,
 * checkboxes and plain dropdowns are native controls in content-width rows (sliders with a value
 * readout); pickers HA draws itself (entity, area, icon, actions, YAML, multi-select) keep
 * ha-selector, unfilled and bordered like the other controls.
 */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { live } from "lit/directives/live.js";

import type { HomeAssistant } from "../types";
import { ltekChrome, ltekPanelScale, ltekTokens } from "./ltek-styles";

type Obj = Record<string, unknown>;
interface Field {
  name: string;
  required?: boolean;
  selector?: Record<string, Obj | null | undefined>;
}
type Option = string | { value: string; label: string };

export class LtekForm extends LitElement {
  static properties = {
    hass: { attribute: false },
    data: { attribute: false },
    schema: { attribute: false },
    computeLabel: { attribute: false },
    computeHelper: { attribute: false },
    disabled: { type: Boolean },
  };

  declare hass: HomeAssistant;
  declare data: Obj;
  declare schema: Field[];
  declare computeLabel?: (field: Field) => string;
  declare computeHelper?: (field: Field) => string | undefined;
  declare disabled: boolean;

  constructor() {
    super();
    this.data = {};
    this.schema = [];
    this.disabled = false;
  }

  private _set(name: string, value: unknown): void {
    const data = { ...(this.data ?? {}) };
    if (value === undefined || value === "") delete data[name];
    else data[name] = value;
    this.dispatchEvent(new CustomEvent("value-changed", { detail: { value: data } }));
  }

  protected render(): TemplateResult {
    return html`${(this.schema ?? []).map((field) => this._field(field))}`;
  }

  private _field(field: Field): TemplateResult {
    const label = this.computeLabel?.(field) ?? field.name;
    const helper = this.computeHelper?.(field);
    const [kind, options] = Object.entries(field.selector ?? {})[0] ?? ["text", {}];
    const opts = (options ?? {}) as Obj;
    const value = this.data?.[field.name];
    const help = helper ? html`<div class="ltek-hint help">${helper}</div>` : nothing;

    if (kind === "boolean") {
      return html`<label class="check">
          <input
            type="checkbox"
            .checked=${live(Boolean(value))}
            ?disabled=${this.disabled}
            @change=${(ev: Event) => this._set(field.name, (ev.target as HTMLInputElement).checked)}
          />
          ${label}
        </label>
        ${help}`;
    }
    if (kind === "text") {
      return html`<div class="ltek-row">
          <label class="lbl">${label}</label>
          <input
            type="text"
            .value=${live(value == null ? "" : String(value))}
            ?disabled=${this.disabled}
            @change=${(ev: Event) => this._set(field.name, (ev.target as HTMLInputElement).value)}
          />
        </div>
        ${help}`;
    }
    if (kind === "number") {
      const unit = (opts.unit_of_measurement as string | undefined) ?? "";
      const set = (ev: Event) => {
        const raw = (ev.target as HTMLInputElement).value;
        this._set(field.name, raw === "" ? undefined : Number(raw));
      };
      const num = value == null ? "" : String(value);
      if (opts.mode === "slider") {
        return html`<div class="ltek-row slider">
            <label class="lbl">${label}</label>
            <input
              type="range"
              min=${String(opts.min ?? 0)}
              max=${String(opts.max ?? 100)}
              step=${String(opts.step ?? 1)}
              .value=${live(num || String(opts.min ?? 0))}
              ?disabled=${this.disabled}
              @input=${set}
            />
            <span class="readout">${num === "" ? "–" : num}${unit ? html`<span class="unit">${unit}</span>` : nothing}</span>
          </div>
          ${help}`;
      }
      return html`<div class="ltek-row">
          <label class="lbl">${label}</label>
          <input
            class="num"
            type="number"
            min=${String(opts.min ?? "")}
            max=${String(opts.max ?? "")}
            step=${String(opts.step ?? 1)}
            .value=${live(num)}
            ?disabled=${this.disabled}
            @change=${set}
          />
          ${unit ? html`<span class="unit">${unit}</span>` : nothing}
        </div>
        ${help}`;
    }
    if (kind === "select" && !opts.multiple && !opts.custom_value) {
      const list = ((opts.options as Option[] | undefined) ?? []).map((o) =>
        typeof o === "string" ? { value: o, label: o } : o,
      );
      const current = value == null ? "" : String(value);
      return html`<div class="ltek-row">
          <label class="lbl">${label}</label>
          <select
            .value=${live(current)}
            ?disabled=${this.disabled}
            @change=${(ev: Event) => this._set(field.name, (ev.target as HTMLSelectElement).value || undefined)}
          >
            ${field.required && current ? nothing : html`<option value="" ?selected=${!current}>–</option>`}
            ${list.map((o) => html`<option value=${o.value} ?selected=${o.value === current}>${o.label}</option>`)}
            ${current && !list.some((o) => o.value === current) ? html`<option value=${current} selected>${current}</option>` : nothing}
          </select>
        </div>
        ${help}`;
    }
    // Pickers Home Assistant draws itself
    const wide = kind === "object" || kind === "action" || kind === "target";
    return html`<div class="ltek-row ${wide ? "stack" : "picker"}">
        <label class="lbl">${label}</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${field.selector}
          .value=${value}
          .required=${Boolean(field.required)}
          .disabled=${this.disabled}
          @value-changed=${(ev: CustomEvent) => {
            ev.stopPropagation();
            this._set(field.name, ev.detail.value);
          }}
        ></ha-selector>
      </div>
      ${help}`;
  }

  static styles = [
    ltekTokens,
    ltekPanelScale,
    ltekChrome,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--ltek-sp-1);
      }
      .ltek-row {
        flex-wrap: nowrap;
      }
      .ltek-row > label.lbl {
        font-size: var(--ltek-fs-label);
        white-space: nowrap;
      }
      .ltek-row > input[type="text"],
      .ltek-row > select,
      .ltek-row > input.num {
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
      .ltek-row > input.num {
        flex: 0 0 90px;
      }
      .ltek-row > input:focus,
      .ltek-row > select:focus {
        outline: none;
        border-color: var(--ltek-c-accent);
      }
      .ltek-row.slider input[type="range"] {
        flex: 1 1 auto;
        min-width: 80px;
        accent-color: var(--ltek-c-accent);
      }
      .readout {
        flex: none;
        min-width: var(--ltek-slider-val-w);
        text-align: right;
        font-variant-numeric: tabular-nums;
        font-weight: var(--ltek-fw-bold);
        font-size: var(--ltek-fs-body);
        color: var(--ltek-c-text);
      }
      .unit {
        color: var(--ltek-c-muted);
        font-size: var(--ltek-fs-small);
        font-weight: var(--ltek-fw-normal);
        margin-left: 2px;
      }
      .ltek-row.picker > ha-selector {
        flex: 1 1 auto;
        min-width: 0;
      }
      .ltek-row.stack {
        flex-direction: column;
        align-items: stretch;
      }
      /* HA's own pickers: no fill, no underline, a border like the other controls */
      ha-selector {
        display: block;
        --mdc-text-field-fill-color: transparent;
        --input-fill-color: transparent;
        --mdc-text-field-idle-line-color: transparent;
        --mdc-text-field-hover-line-color: transparent;
        --input-idle-line-color: transparent;
        --input-hover-line-color: transparent;
        --mdc-ripple-color: transparent;
        border: 1px solid var(--ltek-c-border);
        border-radius: var(--ltek-r-ctrl);
        overflow: hidden;
      }
      .ltek-row.stack > ha-selector {
        border: none;
        overflow: visible;
      }
      label.check {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-2);
        color: var(--ltek-c-label);
        font-size: var(--ltek-fs-label);
        padding: var(--ltek-sp-1) 0;
      }
      label.check input {
        accent-color: var(--ltek-c-accent);
      }
      .help {
        margin: 0 0 var(--ltek-sp-2);
      }
    `,
  ];
}

if (!customElements.get("ltek-form")) {
  customElements.define("ltek-form", LtekForm);
}
