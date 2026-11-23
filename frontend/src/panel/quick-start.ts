/**
 * Quick Start: what is set up, as chips, and the steps left, as House Modes & Alarm Center shows them.
 * Steps come from easy_av_control/quickstart/plan; Apply does the automatic ones. The card step is checked here,
 * in the browser (is the card on a dashboard?).
 */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import type { HomeAssistant } from "../types";
import { ltekChrome, ltekPanelScale, ltekTokens } from "./ltek-styles";
import { t } from "./strings";

type Step = {
  id: string;
  title: string;
  status: "done" | "todo" | "manual" | "optional" | "skip";
  detail: string;
  link: string | null;
  browser?: boolean;
  yaml?: string;
  automations?: { entity_id: string; name: string; edit_id: string | null; entities: string[] }[];
};
type ActivitySteps = { room: string; room_name: string; id: string; name: string; enabled: boolean; steps: Step[] };
type Plan = {
  activities: ActivitySteps[];
  status: { rooms: number; devices: number; activities: number; disabled: number; runs: number; alerts: number; blueprint: boolean };
  steps: Step[];
  todo: number;
};

const ICON: Record<string, string> = {
  done: "mdi:check-circle",
  todo: "mdi:circle-outline",
  manual: "mdi:hand-pointing-right",
  optional: "mdi:circle-half-full",
  skip: "mdi:minus-circle-outline",
};

export class EasyAvControlQuickStart extends LitElement {
  static properties = {
    hass: { attribute: false },
    _plan: { state: true },
    _failed: { state: true },
    _busy: { state: true },
    _cardOn: { state: true },
    _copied: { state: true },
    _tab: { state: true },
  };

  declare hass: HomeAssistant;
  declare _plan?: Plan;
  declare _failed?: string;
  declare _busy: boolean;
  /** Dashboards with the card (undefined: not checked yet) */
  declare _cardOn?: string[];
  declare _copied: boolean;
  /** System-wide requirements, or what each activity needs */
  declare _tab: "system" | "activity";

  constructor() {
    super();
    this._tab = "system";
    this._busy = false;
    this._copied = false;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._load();
    this._findCard();
  }

  private _t(key: string, params?: Record<string, string>): string {
    return t(this.hass?.language, key, params);
  }

  private async _load(): Promise<void> {
    try {
      this._plan = await this.hass.callWS<Plan>({ type: "easy_av_control/quickstart/plan" });
      this._failed = undefined;
    } catch (err) {
      this._failed = (err as { message?: string }).message ?? String(err);
    }
  }

  /** Is the card on a dashboard? Only that it exists matters. */
  private async _findCard(): Promise<void> {
    const found: string[] = [];
    try {
      const boards = await this.hass.callWS<{ url_path: string; title: string }[]>({ type: "lovelace/dashboards/list" });
      for (const b of [{ url_path: null as string | null, title: "Overview" }, ...boards]) {
        try {
          const cfg = await this.hass.callWS<unknown>({ type: "lovelace/config", url_path: b.url_path });
          if (JSON.stringify(cfg).includes("custom:easy-av-control-card")) found.push(b.title || b.url_path || "Overview");
        } catch {
          /* an auto-generated dashboard: no card */
        }
      }
      this._cardOn = found;
    } catch {
      this._cardOn = undefined;
    }
  }

  private _effective(step: Step): Step {
    if (step.id !== "card") return step;
    return this._cardOn?.length
      ? { ...step, status: "done", detail: this._t("qs.card_on", { boards: this._cardOn.join(", ") }), yaml: undefined }
      : { ...step, detail: this._t("qs.card_add") };
  }

  private async _apply(sidebar = false): Promise<void> {
    this._busy = true;
    try {
      this._plan = await this.hass.callWS<Plan>({ type: "easy_av_control/quickstart/apply", sidebar });
    } catch (err) {
      this._failed = (err as { message?: string }).message ?? String(err);
    } finally {
      this._busy = false;
    }
  }

  private _open(link: string): void {
    this.dispatchEvent(new CustomEvent("open-page", { detail: { page: link }, bubbles: true, composed: true }));
  }

  private _count(steps: Step[]): { done: number; total: number } {
    const counted = steps.filter((s) => s.status !== "skip" && s.status !== "optional");
    return { done: counted.filter((s) => s.status === "done").length, total: counted.length };
  }

  private _summary(c: { done: number; total: number }): string {
    return c.done === c.total ? this._t("qs.all_done") : this._t("qs.n_done", { done: String(c.done), total: String(c.total) });
  }

  protected render(): TemplateResult {
    const plan = this._plan;
    const system = plan ? plan.steps.map((s) => this._effective(s)) : [];
    const acts = plan?.activities ?? [];
    const sys = this._count(system);
    const perActivity = this._count(acts.flatMap((a) => a.steps));
    return html`
      <div class="head"><h2><ha-icon icon="mdi:rocket-launch-outline"></ha-icon>${this._t("qs.title")}</h2></div>
      <p class="ltek-hint">${this._t("qs.hint")}</p>
      ${this._failed ? html`<p class="ltek-hint ltek-error">${this._failed}</p>` : nothing}
      ${!plan
        ? html`<p class="ltek-hint">${this._t("loading")}</p>`
        : html`${this._renderStatus(plan)}
            <div class="tabs" role="tablist">
              <button role="tab" class="tab ${this._tab === "system" ? "active" : ""}" aria-selected=${this._tab === "system"} @click=${() => (this._tab = "system")}>
                <ha-icon icon="mdi:server-network-outline"></ha-icon>${this._t("qs.tab_system")}
                <span class="count">${this._summary(sys)}</span>
              </button>
              <button role="tab" class="tab ${this._tab === "activity" ? "active" : ""}" aria-selected=${this._tab === "activity"} @click=${() => (this._tab = "activity")}>
                <ha-icon icon="mdi:play-circle-outline"></ha-icon>${this._t("qs.tab_activity")}
                <span class="count">${acts.length ? this._summary(perActivity) : "–"}</span>
              </button>
            </div>
            ${this._tab === "system"
              ? html`<p class="ltek-hint">${this._t("qs.system_hint")}</p>
                  <ol class="steps">${system.map((s) => this._renderStep(s))}</ol>
                  <div class="bar">
                    <button class="ltek-btn primary" ?disabled=${!plan.todo || this._busy} @click=${() => this._apply()}>
                      <ha-icon icon="mdi:auto-fix"></ha-icon>
                      ${plan.todo ? this._t("qs.apply", { n: String(plan.todo) }) : this._t("qs.applied")}
                    </button>
                    <span class="ltek-hint">${this._t("qs.apply_hint")}</span>
                  </div>`
              : html`<p class="ltek-hint">${this._t("qs.activity_hint")}</p>
                  ${acts.length
                    ? acts.map(
                        (a) => html`<section class="act ${a.enabled ? "" : "off"}">
                          <h3>
                            <ha-icon icon="mdi:play-circle-outline"></ha-icon>${a.name}
                            <span class="room-name">${a.room_name}</span>
                            <span class="count">${this._summary(this._count(a.steps))}</span>
                          </h3>
                          <ol class="steps">${a.steps.map((s) => this._renderStep(s, "qs.astep."))}</ol>
                        </section>`,
                      )
                    : html`<p class="ltek-hint">${this._t("qs.no_activity")}
                        <button class="link" @click=${() => this._open("activities")}>${this._t("qs.open")}</button></p>`}`}`}
    `;
  }

  private _renderStatus(plan: Plan): TemplateResult {
    const s = plan.status;
    const chip = (ok: boolean, icon: string, text: string, link: string) =>
      html`<button class="stat ${ok ? "ok" : ""}" @click=${() => this._open(link)}><ha-icon icon=${icon}></ha-icon><span>${text}</span></button>`;
    return html`<div class="stats">
      ${chip(s.rooms > 0, "mdi:home-outline", this._t("qs.s_rooms", { n: String(s.rooms) }), "rooms")}
      ${chip(s.devices > 0, "mdi:television", this._t("qs.s_devices", { n: String(s.devices) }), "rooms")}
      ${chip(s.activities > 0, "mdi:play-circle-outline", this._t(s.disabled ? "qs.s_activities_off" : "qs.s_activities", { n: String(s.activities), off: String(s.disabled) }), "activities")}
      ${chip(s.runs > 0, "mdi:chart-timeline-variant", this._t("qs.s_runs", { n: String(s.runs) }), "reports")}
      ${chip(s.alerts > 0, "mdi:bell-ring-outline", this._t("qs.s_alerts", { n: String(s.alerts) }), "notifications")}
    </div>`;
  }

  private _renderStep(step: Step, prefix = "qs.step."): TemplateResult {
    return html`<li class="step ${step.status}">
      <ha-icon icon=${ICON[step.status]}></ha-icon>
      <div class="step-body">
        <div>
          <strong>${this._t(`${prefix}${step.id}`)}</strong>
          ${step.detail ? html`<span class="ltek-hint inline"> · ${step.detail}</span>` : nothing}
          ${step.link && (step.status === "manual" || step.status === "optional")
            ? html`<button class="link" @click=${() => this._open(step.link!)}>${this._t("qs.open")}</button>`
            : nothing}
          ${step.id === "sidebar" && step.status !== "done"
            ? html`<button class="link" ?disabled=${this._busy} @click=${() => this._apply(true)}>${this._t("qs.show_sidebar")}</button>`
            : nothing}
        </div>
        ${step.automations?.length
          ? html`<ul class="autos">
              ${step.automations.map(
                (a) => html`<li>
                  <ha-icon icon="mdi:alert"></ha-icon>
                  <div>
                    ${a.edit_id
                      ? html`<a href=${`/config/automation/edit/${a.edit_id}`} target="_blank" rel="noopener">${a.name}</a>`
                      : html`<strong>${a.name}</strong>`}
                    <div class="ltek-hint">${a.entities.join(", ")}</div>
                  </div>
                </li>`,
              )}
            </ul>`
          : nothing}
        ${step.yaml
          ? html`<pre class="yaml">${step.yaml}</pre>
              <button
                class="link"
                @click=${() =>
                  navigator.clipboard?.writeText(step.yaml!).then(
                    () => (this._copied = true),
                    () => undefined,
                  )}
              >
                ${this._t(this._copied ? "profile_copied" : "profile_copy")}
              </button>`
          : nothing}
      </div>
    </li>`;
  }

  static styles = [
    ltekTokens,
    ltekPanelScale,
    ltekChrome,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--ltek-sp-3);
        font-size: var(--ltek-fs-body);
      }
      h2 {
        display: flex;
        align-items: center;
        gap: var(--ltek-sp-3);
        margin: 0;
        font-size: var(--ltek-fs-panel-title);
        font-weight: var(--ltek-fw-semibold);
      }
      h2 ha-icon {
        color: var(--ltek-c-accent);
      }
      .tabs {
        display: flex;
        gap: 4px;
        border-bottom: 1px solid var(--divider-color);
      }
      .tab {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border: none;
        border-bottom: 2px solid transparent;
        background: none;
        color: var(--secondary-text-color);
        font: inherit;
        cursor: pointer;
        --mdc-icon-size: 20px;
      }
      .tab.active {
        color: var(--primary-text-color);
        border-bottom-color: var(--ltek-c-accent);
      }
      .count {
        font-size: var(--ltek-fs-small);
        font-weight: normal;
        color: var(--secondary-text-color);
      }
      .act {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 4px 12px 8px;
        margin-bottom: 8px;
      }
      .act.off {
        opacity: 0.6;
      }
      .act h3 {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0 4px;
        font-size: var(--ltek-fs-body);
        font-weight: var(--ltek-fw-semibold);
        --mdc-icon-size: 20px;
      }
      .act h3 ha-icon {
        color: var(--ltek-c-accent);
      }
      .act h3 .count {
        margin-left: auto;
      }
      .room-name {
        font-weight: normal;
        font-size: var(--ltek-fs-small);
        color: var(--secondary-text-color);
      }
      .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .stat {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 12px 4px 8px;
        border-radius: 16px;
        border: 1px solid var(--divider-color);
        background: none;
        color: var(--secondary-text-color);
        font: inherit;
        cursor: pointer;
        --mdc-icon-size: 18px;
      }
      .stat.ok {
        color: var(--primary-text-color);
        border-color: var(--success-color, #43a047);
      }
      .stat.ok ha-icon {
        color: var(--success-color, #43a047);
      }
      .steps {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .step {
        display: flex;
        gap: 8px;
        padding: 7px 0;
        border-top: 1px solid var(--divider-color);
        --mdc-icon-size: 20px;
      }
      .step:first-child {
        border-top: none;
      }
      .step.done > ha-icon {
        color: var(--success-color, #43a047);
      }
      .step.todo > ha-icon {
        color: var(--primary-color);
      }
      .step.manual > ha-icon {
        color: var(--warning-color, #ffa600);
      }
      .step.optional > ha-icon,
      .step.skip > ha-icon {
        color: var(--secondary-text-color);
      }
      .step.skip {
        opacity: 0.6;
      }
      .step-body {
        flex: 1;
        min-width: 0;
      }
      .inline {
        display: inline;
      }
      button.link {
        background: none;
        border: none;
        padding: 0 0 0 6px;
        color: var(--ltek-c-accent);
        cursor: pointer;
        font: inherit;
      }
      .autos {
        list-style: none;
        padding: 0;
        margin: 6px 0 2px;
      }
      .autos li {
        display: flex;
        gap: 6px;
        padding: 3px 0;
        --mdc-icon-size: 16px;
      }
      .autos li > ha-icon {
        color: var(--warning-color, #ffa600);
        margin-top: 2px;
      }
      .autos a {
        color: var(--ltek-c-accent);
      }
      .yaml {
        margin: 6px 0 4px;
        padding: 8px 10px;
        border-radius: 6px;
        background: var(--secondary-background-color, #202020);
        font-family: var(--code-font-family, monospace);
        font-size: var(--ltek-fs-small);
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        padding-top: 10px;
      }
      .ltek-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-1);
        --mdc-icon-size: 16px;
      }
    `,
  ];
}

if (!customElements.get("easy-av-control-quick-start")) {
  customElements.define("easy-av-control-quick-start", EasyAvControlQuickStart);
}
