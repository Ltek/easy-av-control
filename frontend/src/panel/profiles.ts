/**
 * The Profiles page: built-in and your own integration profiles (library list rules of the design guide).
 *
 * Built in: lock badge, eye (summary), pencil (view, read only), Duplicate.
 * Yours: eye, pencil (edit), Duplicate, trash.
 * Export / Import as text in a native <dialog> (top layer) with a visible textarea, so it works inside Home
 * Assistant's own dialogs where the clipboard API is refused.
 */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";

import type { HomeAssistant } from "../types";
import { learnGroups, profileSummary, type ProfileView } from "./device-state";
import type { Obj } from "./model";
import { REPO, ltekChrome, ltekTokens } from "./ltek-styles";
import { t } from "./strings";

type Learn = { watch: string; device: string; on: string[]; off: string[]; mode: "on" | "off" | null };
type Editing = { data: Obj; previousId: string | null; readonly: boolean; error?: string; learn?: Learn };
type Dialog = { mode: "export" | "import"; text: string; message?: string };

export class EasyAvControlProfiles extends LitElement {
  static properties = {
    hass: { attribute: false },
    profiles: { attribute: false },
    _preview: { state: true },
    _editing: { state: true },
    _dialog: { state: true },
    _notice: { state: true },
    _pick: { state: true },
    draftFor: { attribute: false },
  };

  declare hass: HomeAssistant;
  declare profiles: ProfileView[];
  declare _preview?: string;
  declare _editing?: Editing;
  declare _dialog?: Dialog;
  declare _notice?: string;
  /** + Profile: the integrations without a profile, while choosing one */
  declare _pick?: string[];
  /** Open a + Profile draft for this integration (set by the panel from Detect integrations) */
  declare draftFor?: string;

  constructor() {
    super();
    this.profiles = [];
  }

  private _t(key: string, params?: Record<string, string>): string {
    return t(this.hass?.language, key, params);
  }

  private _changed(): void {
    this.dispatchEvent(new CustomEvent("profiles-changed"));
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("draftFor") && this.draftFor) {
      const integration = this.draftFor;
      this.dispatchEvent(new CustomEvent("draft-opened"));
      void this._draft(integration);
    }
    // Learn: note each new value the watched entity shows while the device is turned on or off
    const learn = this._editing?.learn;
    if (changed.has("hass") && learn?.mode) {
      const value = this.hass.states[learn.watch]?.state;
      const seq = learn[learn.mode];
      if (value !== undefined && seq[seq.length - 1] !== value) {
        this._editing = { ...this._editing!, learn: { ...learn, [learn.mode]: [...seq, value] } };
      }
    }
  }

  private async _openPicker(): Promise<void> {
    const result = await this.hass.callWS<{ unmatched: string[] }>({ type: "easy_av_control/config/detect_all", rooms: {} });
    this._pick = result.unmatched;
  }

  private async _draft(integration: string): Promise<void> {
    this._pick = undefined;
    try {
      const draft = await this.hass.callWS<{ profile: Obj; device_entity: string; watch: string }>({
        type: "easy_av_control/profiles/draft",
        integration,
      });
      this._notice = undefined;
      this._editing = {
        data: draft.profile,
        previousId: null,
        readonly: false,
        learn: { watch: draft.watch, device: draft.device_entity, on: [], off: [], mode: null },
      };
    } catch (err) {
      this._notice = (err as { message?: string }).message ?? String(err);
    }
  }

  private async _learn(mode: "on" | "off"): Promise<void> {
    const learn = this._editing!.learn!;
    const now = this.hass.states[learn.watch]?.state;
    this._editing = { ...this._editing!, learn: { ...learn, mode, [mode]: now !== undefined ? [now] : [] } };
    await this.hass.callService("homeassistant", mode === "on" ? "turn_on" : "turn_off", { entity_id: learn.device });
  }

  private _useLearned(): void {
    const editing = this._editing!;
    const learned = learnGroups(editing.learn!.on, editing.learn!.off);
    const indicator = { ...((editing.data.indicator as Obj | undefined) ?? {}), ...learned };
    this._editing = { ...editing, data: { ...editing.data, indicator }, learn: { ...editing.learn!, mode: null } };
  }

  private _renderLearn(learn: Learn): TemplateResult {
    const seen = (seq: string[]) => (seq.length ? seq.join(" → ") : "–");
    return html`<details class="ltek-sec" open>
      <summary><ha-icon icon="mdi:school-outline"></ha-icon>${this._t("learn")}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">
        <p class="ltek-hint">${this._t("learn_hint", { entity: learn.watch })}</p>
        <div class="ltek-buttons">
          <button class="ltek-btn ${learn.mode === "on" ? "primary" : ""}" @click=${() => this._learn("on")}>
            <ha-icon icon="mdi:power"></ha-icon> ${this._t("learn_on")}
          </button>
          <button class="ltek-btn ${learn.mode === "off" ? "primary" : ""}" @click=${() => this._learn("off")}>
            <ha-icon icon="mdi:power-off"></ha-icon> ${this._t("learn_off")}
          </button>
          <button class="ltek-btn" ?disabled=${!learn.on.length && !learn.off.length} @click=${this._useLearned}>
            ${this._t("learn_use")}
          </button>
        </div>
        ${learn.on.length || learn.off.length
          ? html`<p class="ltek-hint">${this._t("learn_seen_on", { states: seen(learn.on) })}<br />
              ${this._t("learn_seen_off", { states: seen(learn.off) })}</p>`
          : html`<p class="ltek-hint">${this._t("learn_nothing")}</p>`}
      </div>
    </details>`;
  }

  protected render(): TemplateResult {
    if (this._editing) {
      return this._renderEditor(this._editing);
    }
    const builtin = this.profiles.filter((p) => p.source === "builtin");
    const yours = this.profiles.filter((p) => p.source === "user");
    return html`
      <p class="ltek-hint">${this._t("profiles_intro")}</p>
      ${this._notice ? html`<p class="ltek-hint ok">${this._notice}</p>` : nothing}
      <details class="ltek-sec" open>
        <summary>
          <ha-icon icon="mdi:account-cog-outline"></ha-icon>${this._t("profiles_yours")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <div class="ltek-buttons bar">
            <button class="ltek-add" @click=${this._openPicker}>${this._t("profile_new")}</button>
            <button class="ltek-btn" @click=${this._openImport}><ha-icon icon="mdi:import"></ha-icon> ${this._t("profile_import")}</button>
            ${yours.length
              ? html`<button class="ltek-btn" @click=${() => this._openExport(yours.map((p) => p.id))}>
                  <ha-icon icon="mdi:export"></ha-icon> ${this._t("profile_export_all")}
                </button>`
              : nothing}
          </div>
          ${this._pick
            ? html`<div class="ltek-row pick">
                <label class="lbl">${this._t("profile_new_pick")}</label>
                ${this._pick.length
                  ? html`<select @change=${(e: Event) => {
                      const value = (e.target as HTMLSelectElement).value;
                      if (value) void this._draft(value);
                    }}>
                      <option value="">–</option>
                      ${this._pick.map((i) => html`<option value=${i}>${i}</option>`)}
                    </select>`
                  : nothing}
                <span class="ltek-hint">${this._t(this._pick.length ? "profile_new_hint" : "profile_new_none")}</span>
              </div>`
            : nothing}
          <div class="ltek-list">
            ${yours.length ? yours.map((p) => this._row(p)) : html`<p class="ltek-hint">${this._t("profiles_none_yours")}</p>`}
          </div>
        </div>
      </details>
      <details class="ltek-sec" open>
        <summary>
          <ha-icon icon="mdi:package-variant-closed"></ha-icon>${this._t("profiles_builtin")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body"><div class="ltek-list">${builtin.map((p) => this._row(p))}</div></div>
      </details>
      <details class="ltek-sec">
        <summary>
          <ha-icon icon="mdi:share-variant-outline"></ha-icon>${this._t("profile_share")}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <p class="ltek-hint">${this._t("profile_share_hint")}</p>
          <a class="ltek-issue" href="${REPO}/issues" target="_blank" rel="noopener">${this._t("report")}</a>
        </div>
      </details>
      ${this._renderDialog()}
    `;
  }

  private _row(p: ProfileView): TemplateResult {
    const builtin = p.source === "builtin";
    const open = this._preview === p.id;
    const sub = p.generic
      ? this._t("profile_generic")
      : p.used_by?.length
        ? this._t("profile_used_by", { where: p.used_by.join(", ") })
        : this._t("profile_unused");
    return html`<div class="ltek-item ${open ? "open" : ""}">
        <ha-icon class="lead" icon=${builtin ? "mdi:lock-outline" : "mdi:account-cog-outline"}></ha-icon>
        <span class="ltek-item-text">
          <span class="ltek-name">${p.name}</span>
          <span class="ltek-subline">${p.integration === "*" ? "" : `${p.integration} · `}${sub}</span>
        </span>
        ${p.tested ? nothing : html`<span class="ltek-badge warn" title=${this._t("profile_untested")}>!</span>`}
        <button class="ltek-act ${open ? "on" : ""}" title=${this._t("profile_preview")} @click=${() => (this._preview = open ? undefined : p.id)}>
          <ha-icon icon=${open ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
        </button>
        <button class="ltek-act" title=${this._t(builtin ? "profile_view" : "profile_edit")} @click=${() => this._edit(p)}>
          <ha-icon icon="mdi:pencil"></ha-icon>
        </button>
        <button class="ltek-act" title=${this._t("profile_duplicate")} @click=${() => this._duplicate(p.id)}>
          <ha-icon icon="mdi:content-copy"></ha-icon>
        </button>
        <button class="ltek-act" title=${this._t("profile_export")} @click=${() => this._openExport([p.id])}>
          <ha-icon icon="mdi:export"></ha-icon>
        </button>
        ${builtin
          ? nothing
          : html`<button class="ltek-del" title=${this._t("delete")} @click=${() => this._delete(p)}>
              <ha-icon icon="mdi:trash-can-outline"></ha-icon>
            </button>`}
      </div>
      ${open
        ? html`<div class="preview">${profileSummary(p, (k, x) => this._t(k, x)).map((l) => html`<div>${l}</div>`)}</div>`
        : nothing}`;
  }

  // ------------------------------------------------------------------ editor

  private _edit(p: ProfileView): void {
    this._notice = undefined;
    this._editing = { data: p.data, previousId: p.source === "user" ? p.id : null, readonly: p.source === "builtin" };
  }

  private async _duplicate(id: string): Promise<void> {
    const data = await this.hass.callWS<Obj>({ type: "easy_av_control/profiles/duplicate", profile_id: id });
    this._notice = undefined;
    this._editing = { data, previousId: null, readonly: false };
  }

  private async _delete(p: ProfileView): Promise<void> {
    if (!window.confirm(this._t("profile_delete_confirm", { name: p.name }))) return;
    await this.hass.callWS({ type: "easy_av_control/profiles/delete", profile_id: p.id });
    this._changed();
  }

  private async _save(): Promise<void> {
    const editing = this._editing!;
    const result = await this.hass.callWS<{ error: { message: string } | null }>({
      type: "easy_av_control/profiles/save",
      profile: editing.data,
      previous_id: editing.previousId,
    });
    if (result.error) {
      this._editing = { ...editing, error: result.error.message };
      return;
    }
    this._editing = undefined;
    this._notice = this._t("profile_saved");
    this._changed();
  }

  private _renderEditor(editing: Editing): TemplateResult {
    return html`
      <div class="ltek-buttons bar">
        <button class="ltek-btn" @click=${() => (this._editing = undefined)}>
          <ha-icon icon="mdi:arrow-left"></ha-icon> ${this._t(editing.readonly ? "profile_close" : "profile_cancel")}
        </button>
        ${editing.readonly
          ? nothing
          : html`<button class="ltek-btn primary" @click=${this._save}>${this._t("profile_save")}</button>`}
      </div>
      ${editing.learn ? this._renderLearn(editing.learn) : nothing}
      <details class="ltek-sec" open>
        <summary>
          <ha-icon icon=${editing.readonly ? "mdi:lock-outline" : "mdi:pencil"}></ha-icon>${String(editing.data.name ?? editing.data.id)}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="ltek-body">
          <p class="ltek-hint">${this._t(editing.readonly ? "profile_readonly" : "profile_editor_hint")}</p>
          ${editing.error ? html`<p class="ltek-error">${editing.error}</p>` : nothing}
          <ha-form
            .hass=${this.hass}
            .data=${{ yaml: editing.data }}
            .schema=${[{ name: "yaml", selector: { object: {} } }]}
            .disabled=${editing.readonly}
            .computeLabel=${() => ""}
            @value-changed=${(ev: CustomEvent) => {
              if (editing.readonly) return;
              const yaml = (ev.detail.value as { yaml?: Obj }).yaml;
              if (yaml && typeof yaml === "object") this._editing = { ...editing, data: yaml, error: undefined };
            }}
          ></ha-form>
        </div>
      </details>
    `;
  }

  // ------------------------------------------------------------------ export / import

  private async _openExport(ids: string[]): Promise<void> {
    const envelope = await this.hass.callWS<Obj>({ type: "easy_av_control/profiles/export", ids });
    this._dialog = { mode: "export", text: JSON.stringify(envelope, null, 2) };
    await this.updateComplete;
    this._showDialog();
  }

  private async _openImport(): Promise<void> {
    this._dialog = { mode: "import", text: "" };
    await this.updateComplete;
    this._showDialog();
  }

  private _showDialog(): void {
    const dialog = this.shadowRoot?.querySelector("dialog");
    if (dialog && !dialog.open) dialog.showModal();
  }

  private _closeDialog(): void {
    this.shadowRoot?.querySelector("dialog")?.close();
    this._dialog = undefined;
  }

  private async _copy(ev: Event): Promise<void> {
    const button = ev.currentTarget as HTMLButtonElement;
    const area = this.shadowRoot!.querySelector("textarea")!;
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

  private async _paste(): Promise<void> {
    try {
      const text = await navigator.clipboard.readText();
      this._dialog = { ...this._dialog!, text };
    } catch {
      this._dialog = { ...this._dialog!, message: this._t("profile_paste_failed") };
    }
  }

  private async _import(): Promise<void> {
    let envelope: Obj;
    try {
      envelope = JSON.parse(this._dialog!.text) as Obj;
    } catch (err) {
      this._dialog = { ...this._dialog!, message: String(err) };
      return;
    }
    const result = await this.hass.callWS<{
      error: { message: string } | null;
      added?: string[];
      renamed?: Record<string, string>;
      invalid?: Record<string, string>;
    }>({ type: "easy_av_control/profiles/import", export: envelope });
    if (result.error) {
      this._dialog = { ...this._dialog!, message: result.error.message };
      return;
    }
    const parts = [this._t("profile_import_done", { added: (result.added ?? []).join(", ") || "–" })];
    for (const [from, to] of Object.entries(result.renamed ?? {})) {
      parts.push(this._t("profile_import_renamed", { from, to }));
    }
    if (Object.keys(result.invalid ?? {}).length) {
      parts.push(this._t("profile_import_invalid", { ids: Object.keys(result.invalid!).join(", ") }));
    }
    this._closeDialog();
    this._notice = parts.join(" · ");
    this._changed();
  }

  private _renderDialog(): TemplateResult | typeof nothing {
    const d = this._dialog;
    if (!d) return nothing;
    const exporting = d.mode === "export";
    return html`<dialog @cancel=${this._closeDialog} @click=${(ev: Event) => ev.target === ev.currentTarget && this._closeDialog()}>
      <div class="dialog-body">
        <div class="ltek-group first">${this._t(exporting ? "profile_export" : "profile_import")}</div>
        ${exporting ? nothing : html`<p class="ltek-hint">${this._t("profile_import_hint")}</p>`}
        <textarea
          class="ltek-text"
          rows="16"
          .value=${d.text}
          ?readonly=${exporting}
          @input=${(ev: Event) => (this._dialog = { ...d, text: (ev.target as HTMLTextAreaElement).value })}
        ></textarea>
        ${d.message ? html`<p class="ltek-hint ltek-warn">${d.message}</p>` : nothing}
        <div class="ltek-buttons">
          ${exporting
            ? html`<button class="ltek-btn primary" @click=${this._copy}>${this._t("profile_copy")}</button>`
            : html`<button class="ltek-btn" @click=${this._paste}>${this._t("profile_paste")}</button>
                <button class="ltek-btn primary" ?disabled=${!d.text.trim()} @click=${this._import}>${this._t("profile_import")}</button>`}
          <button class="ltek-btn" @click=${this._closeDialog}>${this._t("profile_close")}</button>
        </div>
      </div>
    </dialog>`;
  }

  static styles = [
    ltekTokens,
    ltekChrome,
    css`
      :host {
        display: block;
      }
      .bar {
        margin-bottom: var(--ltek-sp-4);
      }
      .ltek-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--ltek-sp-1);
      }
      .preview {
        margin: calc(-1 * var(--ltek-sp-1)) 0 var(--ltek-sp-2) 34px;
        color: var(--ltek-c-label);
        font-size: var(--ltek-fs-small);
        line-height: 1.5;
      }
      .ok {
        color: var(--ltek-c-success);
      }
      dialog {
        border: 1px solid var(--ltek-c-accent);
        border-radius: var(--ltek-r-panel);
        background: var(--card-background-color, #1c1c1c);
        color: var(--ltek-c-text);
        padding: 0;
        width: min(640px, 92vw);
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.55);
      }
      .dialog-body {
        display: flex;
        flex-direction: column;
        gap: var(--ltek-sp-3);
        padding: 16px;
      }
      textarea.ltek-text {
        font-family: var(--code-font-family, monospace);
        font-size: var(--ltek-fs-small);
        resize: vertical;
      }
    `,
  ];
}

if (!customElements.get("easy-av-control-profiles")) {
  customElements.define("easy-av-control-profiles", EasyAvControlProfiles);
}
