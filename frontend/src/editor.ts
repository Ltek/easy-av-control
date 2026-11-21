/** Visual editor of the remote control card. */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import { localize } from "./localize";
import "./panel/ltek-form";
import { REPO, ltekChrome, ltekTokens } from "./panel/ltek-styles";
import type { CardConfig, HomeAssistant, RoomInfo } from "./types";

export class EasyAvControlRemoteCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _rooms: { state: true },
  };

  declare hass?: HomeAssistant;
  declare _config?: CardConfig;
  declare _rooms?: RoomInfo[];

  private _loading = false;

  setConfig(config: CardConfig): void {
    this._config = config;
  }

  protected updated(): void {
    if (this.hass && this._rooms === undefined && !this._loading) {
      this._loading = true;
      this.hass
        .callWS<RoomInfo[]>({ type: "easy_av_control/control/rooms" })
        .then((rooms) => (this._rooms = rooms))
        .catch(() => (this._rooms = []))
        .finally(() => (this._loading = false));
    }
  }

  private _schema() {
    // Rooms of different entries may share an id; the entry tells them apart
    const ids = (this._rooms ?? []).map((r) => r.room);
    const options = (this._rooms ?? []).map((r) => ({
      value: ids.filter((id) => id === r.room).length > 1 ? `${r.entry_id}/${r.room}` : r.room,
      label: r.name,
    }));
    return [
      {
        name: "room",
        required: true,
        selector: { select: { mode: "dropdown", options } },
      },
      { name: "name", selector: { text: {} } },
      { name: "show_flow", selector: { boolean: {} } },
      { name: "flow_details", selector: { boolean: {} } },
    ];
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) {
      return nothing;
    }
    const data = {
      show_flow: true,
      ...this._config,
      room: this._config.entry_id ? `${this._config.entry_id}/${this._config.room}` : this._config.room,
    };
    // Keep the configured room selectable while the list loads
    const known = (this._rooms ?? []).some((r) => r.room === this._config!.room);
    if (this._rooms && !known && this._config.room) {
      data.room = this._config.room;
    }
    const t = (key: string) => localize(this.hass?.language, key);
    return html`<details class="ltek-sec" open>
        <summary>
          <ha-icon icon="mdi:remote-tv"></ha-icon>${t("editor.section")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <p class="ltek-hint">${t("editor.hint")}</p>
          <ltek-form
            .hass=${this.hass}
            .data=${data}
            .schema=${this._schema()}
            .computeLabel=${(s: { name: string }) => t(`editor.${s.name}`)}
            @value-changed=${this._valueChanged}
          ></ltek-form>
        </div>
      </details>
      <div class="ltek-links">
        <a class="ltek-star" href=${REPO} target="_blank" rel="noopener">${t("editor.star")}</a>
        <a class="ltek-issue" href="${REPO}/issues" target="_blank" rel="noopener">${t("editor.report")}</a>
      </div>`;
  }

  static styles = [ltekTokens, ltekChrome, css`
    :host {
      display: block;
    }
  `];

  private _valueChanged(ev: CustomEvent<{ value: Record<string, unknown> }>): void {
    ev.stopPropagation();
    const value = { ...ev.detail.value };
    const config: Record<string, unknown> = { ...this._config, ...value };
    const room = String(value.room ?? "");
    if (room.includes("/")) {
      const [entryId, roomId] = room.split("/", 2);
      config.entry_id = entryId;
      config.room = roomId;
    } else {
      delete config.entry_id;
    }
    if (!config.name) {
      delete config.name;
    }
    if (config.show_flow !== false) delete config.show_flow;
    if (!config.flow_details) delete config.flow_details;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }),
    );
  }
}

if (!customElements.get("easy-av-control-card-editor")) {
  customElements.define("easy-av-control-card-editor", EasyAvControlRemoteCardEditor);
}
