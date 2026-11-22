/**
 * Notifications: one ready-made Smart Repeating Alert per room and monitor problem (notify.py).
 *
 * Each is a native automation from the blueprint; Create saves it through Home Assistant's automation config API,
 * Edit opens it in Home Assistant's editor. Its buttons only call easy_av_control.monitor_action: the integration
 * does what they ask.
 */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import type { HomeAssistant } from "../types";
import { ltekChrome, ltekPanelScale, ltekTokens } from "./ltek-styles";
import { t } from "./strings";

type Offer = {
  room: string;
  room_name: string;
  kind: string;
  scope: "watchdog" | "monitoring";
  title: string;
  text: string;
  sensor: string;
  buttons: string[];
  automation?: { entity_id: string; edit_id?: string; name: string; state: string } | null;
};
type Payload = {
  offers: Offer[];
  phones: { device_id: string; name: string }[];
  blueprint: { installed: boolean; installed_version?: string; shipped_version?: string; ours: boolean; update: boolean };
};

export class EasyAvControlNotifications extends LitElement {
  static properties = {
    hass: { attribute: false },
    _data: { state: true },
    _failed: { state: true },
    _phones: { state: true },
    _busy: { state: true },
  };

  declare hass: HomeAssistant;
  declare _data?: Payload;
  declare _failed?: string;
  /** The phones new alerts go to; all of them until changed */
  declare _phones?: Set<string>;
  declare _busy: string;

  constructor() {
    super();
    this._busy = "";
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._load();
  }

  private _t(key: string, params?: Record<string, string>): string {
    return t(this.hass?.language, key, params);
  }

  private async _load(): Promise<void> {
    try {
      this._data = await this.hass.callWS<Payload>({ type: "easy_av_control/notify/get" });
      if (!this._phones) this._phones = new Set(this._data.phones.map((p) => p.device_id));
      this._failed = undefined;
    } catch (err) {
      this._failed = (err as { message?: string }).message ?? String(err);
    }
  }

  private async _install(): Promise<void> {
    this._busy = "install";
    try {
      await this.hass.callWS({ type: "easy_av_control/notify/install" });
      await this._load();
    } catch (err) {
      this._failed = (err as { message?: string }).message ?? String(err);
    } finally {
      this._busy = "";
    }
  }

  private async _create(offer: Offer): Promise<void> {
    if (!this.hass.callApi) return;
    this._busy = `${offer.room}/${offer.kind}`;
    try {
      const { config } = await this.hass.callWS<{ config: Record<string, unknown> }>({
        type: "easy_av_control/notify/build",
        room: offer.room,
        kind: offer.kind,
        devices: [...(this._phones ?? [])],
      });
      await this.hass.callApi("POST", `config/automation/config/${Date.now()}`, config);
      // The automation is loaded a moment later
      await new Promise((r) => window.setTimeout(r, 900));
      await this._load();
    } catch (err) {
      this._failed = (err as { message?: string }).message ?? String(err);
    } finally {
      this._busy = "";
    }
  }

  private _edit(offer: Offer): void {
    const id = offer.automation?.edit_id;
    if (!id) return;
    window.open(`/config/automation/edit/${id}`, "_blank", "noopener");
  }

  protected render(): TemplateResult {
    const data = this._data;
    return html`
      <div class="head">
        <h2><ha-icon icon="mdi:bell-ring-outline"></ha-icon>${this._t("ntf.title")}</h2>
        <button class="ltek-btn" @click=${() => this._load()}><ha-icon icon="mdi:refresh"></ha-icon> ${this._t("rep.refresh")}</button>
      </div>
      <p class="ltek-hint">${this._t("ntf.hint")}</p>
      ${this._failed ? html`<p class="ltek-hint ltek-error">${this._failed}</p>` : nothing}
      ${!data ? html`<p class="ltek-hint">${this._t("loading")}</p>` : this._renderBody(data)}
    `;
  }

  private _renderBody(data: Payload): TemplateResult {
    const bp = data.blueprint;
    const rooms = [...new Set(data.offers.map((o) => o.room))];
    return html`
      <div class="ltek-sec-flat">
        <div class="ltek-row">
          <span class="lbl">${this._t("ntf.blueprint")}</span>
          <span>
            ${bp.installed
              ? this._t(bp.ours ? "ntf.bp_installed" : "ntf.bp_foreign", { version: bp.installed_version ?? "?" })
              : this._t("ntf.bp_missing")}
          </span>
          ${!bp.installed || bp.update
            ? html`<button class="ltek-btn" ?disabled=${this._busy === "install"} @click=${() => this._install()}>
                ${this._t(bp.installed ? "ntf.bp_update" : "ntf.bp_install", { version: bp.shipped_version ?? "" })}
              </button>`
            : nothing}
        </div>
        <div class="ltek-row phones">
          <span class="lbl">${this._t("ntf.phones")}</span>
          ${data.phones.length
            ? data.phones.map(
                (p) => html`<label class="check"
                  ><input
                    type="checkbox"
                    .checked=${this._phones?.has(p.device_id) ?? true}
                    @change=${(ev: Event) => {
                      const next = new Set(this._phones);
                      if ((ev.target as HTMLInputElement).checked) next.add(p.device_id);
                      else next.delete(p.device_id);
                      this._phones = next;
                    }}
                  />${p.name}</label
                >`,
              )
            : html`<span class="ltek-hint">${this._t("ntf.no_phones")}</span>`}
        </div>
      </div>
      ${rooms.map(
        (room) => html`<h3>${data.offers.find((o) => o.room === room)?.room_name}</h3>
          ${(["watchdog", "monitoring"] as const).map((scope) => {
            const offers = data.offers.filter((o) => o.room === room && o.scope === scope);
            return offers.length
              ? html`<h4>${this._t(`ntf.scope_${scope}`)}</h4>
                  <div class="ltek-list">${offers.map((o) => this._row(o))}</div>`
              : nothing;
          })}`,
      )}
    `;
  }

  private _row(offer: Offer): TemplateResult {
    const made = offer.automation;
    const key = `${offer.room}/${offer.kind}`;
    return html`<div class="ltek-item offer">
      <div class="ltek-item-text">
        <span class="ltek-name">${offer.title}</span>
        <span class="ltek-subline">${offer.text}</span>
        <span class="chips">
          ${offer.buttons.map((b) => html`<span class="ltek-badge">${b}</span>`)}
          <span class="mono">${offer.sensor}</span>
        </span>
      </div>
      ${made
        ? html`<span class="ltek-badge ${made.state === "on" ? "ok" : ""}">${this._t(made.state === "on" ? "ntf.on" : "ntf.off")}</span>
            <button class="ltek-btn" ?disabled=${!made.edit_id} @click=${() => this._edit(offer)}>
              <ha-icon icon="mdi:pencil-outline"></ha-icon> ${this._t("ntf.edit")}
            </button>`
        : html`<button
            class="ltek-btn primary"
            ?disabled=${this._busy === key || !this._phones?.size}
            title=${this._phones?.size ? "" : this._t("ntf.pick_phone")}
            @click=${() => this._create(offer)}
          >
            <ha-icon icon="mdi:plus"></ha-icon> ${this._t("ntf.create")}
          </button>`}
    </div>`;
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
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--ltek-sp-3);
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
      h3 {
        margin: var(--ltek-sp-3) 0 0;
        font-size: var(--ltek-fs-group);
        font-weight: var(--ltek-fw-semibold);
      }
      h4 {
        margin: var(--ltek-sp-2) 0 0;
        font-size: var(--ltek-fs-small);
        font-weight: var(--ltek-fw-semibold);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--secondary-text-color);
      }
      .ltek-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-1);
        --mdc-icon-size: 16px;
      }
      .ltek-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--ltek-sp-3);
        padding: var(--ltek-sp-1) 0;
      }
      .lbl {
        color: var(--ltek-c-text-2, var(--secondary-text-color));
        min-width: 110px;
      }
      label.check {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .offer {
        align-items: center;
        gap: var(--ltek-sp-3);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
        margin-top: 4px;
      }
      .mono {
        font-family: var(--code-font-family, monospace);
        font-size: var(--ltek-fs-small);
        color: var(--secondary-text-color);
      }
    `,
  ];
}

if (!customElements.get("easy-av-control-notifications")) {
  customElements.define("easy-av-control-notifications", EasyAvControlNotifications);
}
