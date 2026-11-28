/**
 * Reports: how long every run took (start or stop of an activity) and how long each device took to come on
 * and go off, so it shows whether the whole flow varies, and whether a device itself does.
 *
 * Data from easy_av_control/history/get (history.py). Two panels, one open at a time (design guide):
 * Runs, grouped by room · activity (· switching from), and Devices, per device entity.
 */
import { LitElement, css, html, nothing, svg, type TemplateResult } from "lit";

import type { HomeAssistant } from "../types";
import { ltekChrome, ltekPanelScale, ltekTokens } from "./ltek-styles";
import {
  deviation,
  duration,
  laneColor,
  lanePowerOn,
  runGroups,
  runOk,
  stats,
  type DeviceEvent,
  type Lane,
  type Run,
  type Stats,
} from "./reports-model";
import { t } from "./strings";

/** The last item of a non-empty list. */
const last = <T>(list: T[]): T => list[list.length - 1];

type History = { runs: Run[]; devices: Record<string, DeviceEvent[]> };
type EntityRole = { role: string; device?: string; activity?: string; problem?: string };
type EntityRooms = Record<
  string,
  {
    name: string;
    devices: Record<string, string>;
    activities: Record<string, string>;
    created: ({ entity_id: string } & EntityRole)[];
    used: { entity_id: string; roles: EntityRole[] }[];
  }
>;

const RESULT_BADGE: Record<string, string> = { ok: "ok", warning: "warn", error: "err", cancelled: "" };

export class EasyAvControlReports extends LitElement {
  static properties = {
    hass: { attribute: false },
    _history: { state: true },
    _failed: { state: true },
    _open: { state: true },
    _expanded: { state: true },
    _mode: { state: true },
    _copied: { state: true },
    _entities: { state: true },
  };

  declare hass: HomeAssistant;
  declare _history?: History;
  declare _failed?: string;
  /** The open panel: runs or devices */
  declare _open: "runs" | "devices" | "entities" | "";
  declare _entities?: EntityRooms;
  /** Expanded rows (group keys, run timestamps, device entities) */
  declare _expanded: Set<string>;
  declare _mode: "all" | "start" | "stop";
  declare _copied: boolean;

  constructor() {
    super();
    this._open = "runs";
    this._expanded = new Set();
    this._mode = "all";
  }

  connectedCallback(): void {
    super.connectedCallback();
    void this._load();
  }

  private async _load(): Promise<void> {
    try {
      this._history = await this.hass.callWS<History>({ type: "easy_av_control/history/get" });
      this._failed = undefined;
    } catch (err) {
      this._failed = (err as { message?: string }).message ?? String(err);
    }
  }

  /** Download the report (all runs, or one with its trace); where downloads don't work, copy it. */
  private async _export(run?: string): Promise<void> {
    const report = await this.hass.callWS<Record<string, unknown>>({
      type: "easy_av_control/history/export",
      ...(run ? { run } : {}),
    });
    const text = JSON.stringify(report, null, 2);
    const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 13);
    const name = `easy-av-control-report-${run ? `run-${run.split("-")[0]}` : stamp}.json`;
    try {
      const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch {
      /* fall back to the clipboard below */
    }
    try {
      await navigator.clipboard.writeText(text);
      this._copied = true;
      window.setTimeout(() => (this._copied = false), 3000);
    } catch {
      /* a download is enough */
    }
  }

  private async _clear(): Promise<void> {
    if (!window.confirm(this._t("rep.clear_confirm"))) return;
    await this.hass.callWS({ type: "easy_av_control/history/clear" });
    await this._load();
  }

  private _t(key: string, params?: Record<string, string>): string {
    return t(this.hass?.language, key, params);
  }

  private _toggle(key: string): void {
    const next = new Set(this._expanded);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this._expanded = next;
  }

  private _when(iso: string): string {
    const date = new Date(iso);
    return Number.isNaN(date.getTime())
      ? iso
      : date.toLocaleString(this.hass?.language, { dateStyle: "short", timeStyle: "medium" });
  }

  // ------------------------------------------------------------------

  protected render(): TemplateResult {
    if (this._failed) return html`<p class="ltek-hint ltek-error">${this._failed}</p>`;
    const history = this._history;
    return html`
      <div class="head">
        <h2><ha-icon icon="mdi:chart-timeline-variant"></ha-icon>${this._t("rep.title")}</h2>
        <div class="ltek-buttons">
          ${this._copied ? html`<span class="ltek-hint copied">${this._t("rep.copied")}</span>` : nothing}
          <button class="ltek-btn" title=${this._t("rep.export_hint")} ?disabled=${!history?.runs.length} @click=${() => this._export()}>
            <ha-icon icon="mdi:download"></ha-icon> ${this._t("rep.export")}
          </button>
          <button class="ltek-btn" @click=${() => this._load()}>
            <ha-icon icon="mdi:refresh"></ha-icon> ${this._t("rep.refresh")}
          </button>
          <button class="ltek-btn danger" ?disabled=${!history?.runs.length} @click=${() => this._clear()}>
            <ha-icon icon="mdi:trash-can-outline"></ha-icon> ${this._t("rep.clear")}
          </button>
        </div>
      </div>
      <p class="ltek-hint">${this._t("rep.hint")}</p>
      ${!history
        ? html`<p class="ltek-hint">${this._t("loading")}</p>`
        : html`${this._panel("runs", "mdi:timer-play-outline", this._t("rep.runs"), this._renderRuns(history.runs))}
          ${this._panel("devices", "mdi:television-play", this._t("rep.devices"), this._renderDevices(history.devices))}
          ${this._panel("entities", "mdi:format-list-bulleted-type", this._t("rep.entities"), this._renderEntities())}`}
    `;
  }

  private _panel(key: "runs" | "devices" | "entities", icon: string, title: string, body: TemplateResult): TemplateResult {
    return html`<details
      class="ltek-sec"
      .open=${this._open === key}
      @toggle=${(ev: Event) => {
        const open = (ev.target as HTMLDetailsElement).open;
        if (open && this._open !== key) this._open = key;
        if (open && key === "entities") this._loadEntities();
        else if (!open && this._open === key) this._open = "";
      }}
    >
      <summary><ha-icon icon=${icon}></ha-icon>${title}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="ltek-body">${body}</div>
    </details>`;
  }

  /** Bars, oldest left: height by time, colour by result; a dashed line at the typical time. */
  private _spark(values: { seconds: number; ok: boolean; warn?: boolean }[], typical: number | null): TemplateResult {
    const w = 180;
    const h = 32;
    const shown = values.slice(-40);
    const max = Math.max(1, ...shown.map((v) => v.seconds));
    const bw = Math.max(2, Math.min(10, (w - shown.length) / Math.max(1, shown.length)));
    return html`<svg class="spark" viewBox="0 0 ${w} ${h}" width=${w} height=${h} aria-hidden="true">
      ${shown.map((v, i) => {
        const bh = Math.max(2, (v.seconds / max) * (h - 2));
        return svg`<rect x=${i * (bw + 1)} y=${h - bh} width=${bw} height=${bh} rx="1"
          class=${v.ok ? (v.warn ? "warn" : "ok") : "err"}><title>${duration(v.seconds)}</title></rect>`;
      })}
      ${typical
        ? svg`<line x1="0" x2=${w} y1=${h - (typical / max) * (h - 2)} y2=${h - (typical / max) * (h - 2)} class="typ" />`
        : nothing}
    </svg>`;
  }

  private _stats(s: Stats, unit = "rep.count"): TemplateResult {
    return html`<span class="stats">
      <span><b>${duration(s.typical)}</b> ${this._t("rep.typical")}</span>
      <span>${duration(s.fastest)} – ${duration(s.slowest)}</span>
      ${s.failed ? html`<span class="ltek-badge warn">${this._t("rep.failed", { n: String(s.failed) })}</span>` : nothing}
      <span class="muted">${this._t(unit, { n: String(s.count) })}</span>
    </span>`;
  }

  // ------------------------------------------------------------------ Runs

  private _renderRuns(runs: Run[]): TemplateResult {
    if (!runs.length) return html`<p class="ltek-hint">${this._t("rep.no_runs")}</p>`;
    const filtered = runs.filter((r) => this._mode === "all" || r.mode === this._mode);
    const groups = runGroups(filtered).sort((a, b) => (last(a.runs).at < last(b.runs).at ? 1 : -1));
    return html`<div class="ltek-row">
        <label class="lbl">${this._t("rep.show")}</label>
        <select @change=${(ev: Event) => (this._mode = (ev.target as HTMLSelectElement).value as typeof this._mode)}>
          ${(["all", "start", "stop"] as const).map(
            (m) => html`<option value=${m} ?selected=${this._mode === m}>${this._t(`rep.mode_${m}`)}</option>`,
          )}
        </select>
      </div>
      <div class="ltek-list">
        ${groups.map(({ key, runs: list }) => {
          const first = list[0];
          const s = stats(list.map((r) => ({ seconds: r.seconds, ok: runOk(r) })));
          const open = this._expanded.has(key);
          return html`<div class="ltek-item group ${open ? "open" : ""}">
            <button class="row" @click=${() => this._toggle(key)}>
              <ha-icon class="lead" icon=${first.mode === "start" ? "mdi:play-circle-outline" : "mdi:stop-circle-outline"}></ha-icon>
              <span class="ltek-item-text">
                <span class="ltek-name">${first.room_name} · ${first.activity_name}</span>
                <span class="ltek-subline"
                  >${this._t(`rep.mode_${first.mode}`)}${first.from_name ? ` · ${this._t("rep.from", { activity: first.from_name })}` : ""}</span
                >
                ${this._stats(s)}
              </span>
              ${this._spark(list.map((r) => ({ seconds: r.seconds, ok: runOk(r), warn: r.result === "warning" })), s.typical)}
              <ha-icon class="ltek-act chev" icon=${open ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
            </button>
            ${open ? html`<div class="runs">${[...list].reverse().map((run) => this._renderRun(run, s.typical))}</div>` : nothing}
          </div>`;
        })}
      </div>`;
  }

  private _renderRun(run: Run, typical: number | null): TemplateResult {
    const key = `run:${run.at}`;
    const open = this._expanded.has(key);
    const dev = deviation(run.seconds, typical);
    return html`<div class="run">
      <button class="run-row" @click=${() => this._toggle(key)}>
        <span class="when">${this._when(run.at)}</span>
        <span class="total"><b>${duration(run.seconds)}</b>${dev ? html` <span class="dev ${dev.startsWith("+") ? "slow" : "fast"}">${dev}</span>` : nothing}</span>
        <span class="ltek-badge ${RESULT_BADGE[run.result] ?? ""}">${this._t(`rep.result_${run.result}`)}</span>
        <ha-icon class="ltek-act" icon=${open ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
      </button>
      ${open && run.id
        ? html`<button class="ltek-btn export-run" @click=${() => this._export(run.id)}>
            <ha-icon icon="mdi:download"></ha-icon> ${this._t("rep.export_run")}
          </button>`
        : nothing}
      ${open ? this._renderPhases(run) : nothing}
    </div>`;
  }

  /**
   * The run on one time line: first a lane per device, coloured by what its status said (off red, standby
   * grey, starting yellow, idle blue, on green), then the other phases (outlets, checks, actions after start).
   * A check or an action after start does not hold up any device's power-on, so it is not in a device's lane.
   * Runs from before the lanes were kept show every phase as a bar.
   */
  private _renderPhases(run: Run): TemplateResult {
    const total = Math.max(run.seconds, 0.1);
    const lanes = run.lanes ?? [];
    const laneDevices = new Set(lanes.map((l) => l.device));
    const phases = run.phases.filter((p) => !(p.kind === "device" && laneDevices.has(String(p.device))));
    return html`<div class="phases">
      ${lanes.length
        ? html`<div class="lane-legend">
              ${(["off", "standby", "busy", "idle", "on"] as const).map(
                (c) => html`<span class="key"><i class="swatch c-${c}"></i>${this._t(`rep.lane_${c}`)}</span>`,
              )}
            </div>
            ${lanes.map((lane) => this._renderLane(lane, total))}
            ${this._axis(total)}`
        : nothing}
      ${phases.length && lanes.length ? html`<p class="ltek-hint lane-then">${this._t("rep.then_hint")}</p>` : nothing}
      ${phases.map(
        (p) => html`<div class="phase ${p.result === "error" ? "err" : ""}">
          <span class="phase-name">${this._phaseName(p)}</span>
          <span class="track"
            ><span
              class="bar"
              style="left:${(p.start / total) * 100}%;width:${Math.max(0.6, (p.seconds / total) * 100)}%"
            ></span
          ></span>
          <span class="phase-time">${duration(p.seconds)}</span>
        </div>`,
      )}
      ${run.error ? html`<p class="ltek-error small">${run.error}</p>` : nothing}
      ${(run.warnings ?? []).map((w) => html`<p class="ltek-warn small">${w}</p>`)}
    </div>`;
  }

  private _renderLane(lane: Lane, total: number): TemplateResult {
    const on = lanePowerOn(lane);
    return html`<div class="phase lane">
      <span class="phase-name" title=${lane.entity_id}>${lane.name}</span>
      <span class="track lane-track"
        >${lane.segments.map((seg) => {
          const color = laneColor(seg.value, seg.group);
          const width = ((seg.end - seg.start) / total) * 100;
          return html`<span
            class="seg c-${color}"
            style="left:${(seg.start / total) * 100}%;width:${Math.max(0.4, width)}%"
            title=${`${seg.value}: ${duration(seg.start)} – ${duration(seg.end)} (${duration(seg.end - seg.start)})`}
          ></span>`;
        })}</span
      >
      <span class="phase-time" title=${this._t("rep.on_after")}>${on === null ? "–" : on === 0 ? this._t("rep.lane_on_already") : duration(on)}</span>
    </div>`;
  }

  /** 0, the middle and the end of the time line. */
  private _axis(total: number): TemplateResult {
    return html`<div class="phase axis">
      <span></span>
      <span class="ticks"><span>0</span><span>${duration(total / 2)}</span><span>${duration(total)}</span></span>
      <span></span>
    </div>`;
  }

  private _phaseName(p: Run["phases"][number]): string {
    if (p.kind === "device") return String(p.name ?? p.device ?? "");
    if (p.kind === "switch_off_unused") return this._t("rep.phase_switch_off_unused");
    return this._t(`rep.phase_${p.kind}`);
  }

  // ------------------------------------------------------------------ Devices

  private async _loadEntities(): Promise<void> {
    try {
      this._entities = (await this.hass.callWS<{ rooms: EntityRooms }>({ type: "easy_av_control/history/entities" })).rooms;
    } catch (err) {
      this._failed = (err as { message?: string }).message ?? String(err);
    }
  }

  /** What Easy AV Control creates per room, and what it relies on, each with its purpose. */
  private _renderEntities(): TemplateResult {
    const rooms = this._entities;
    if (!rooms) return html`<p class="ltek-hint">${this._t("loading")}</p>`;
    const name = (id: string) => (this.hass.states[id]?.attributes.friendly_name as string | undefined) ?? id;
    const state = (id: string) => this.hass.states[id]?.state ?? this._t("rep.ent_missing");
    const row = (id: string, purposes: string[]) => html`<div class="ent">
      <span class="ent-name"><b>${name(id)}</b><span class="mono">${id}</span></span>
      <span class="ent-purpose">${purposes.map((p) => html`<span>${p}</span>`)}</span>
      <span class="ltek-badge ${this.hass.states[id] && state(id) !== "unavailable" ? "" : "warn"}">${state(id)}</span>
    </div>`;
    return html`<p class="ltek-hint">${this._t("rep.entities_hint")}</p>
      ${Object.entries(rooms).map(([, room]) => {
        const where = (r: EntityRole) =>
          [r.device ? room.devices[r.device] ?? r.device : "", r.activity ? room.activities[r.activity] ?? r.activity : ""]
            .filter(Boolean)
            .join(" · ");
        return html`<h3>${room.name}</h3>
          <h4>${this._t("rep.ent_created")}</h4>
          ${room.created.map((e) =>
            row(e.entity_id, [
              this._t(`rep.ent.${e.role}`, {
                activity: e.activity ? room.activities[e.activity] ?? e.activity : "",
                problem: e.problem ? this._t(`problem.${e.problem}`) : "",
              }),
            ]),
          )}
          <h4>${this._t("rep.ent_used")}</h4>
          ${room.used.map((e) => row(e.entity_id, e.roles.map((r) => `${this._t(`rep.use.${r.role}`)}${where(r) ? `: ${where(r)}` : ""}`)))}`;
      })}`;
  }

  private _renderDevices(devices: Record<string, DeviceEvent[]>): TemplateResult {
    const entries = Object.entries(devices).filter(([, list]) => list.length);
    if (!entries.length) return html`<p class="ltek-hint">${this._t("rep.no_devices")}</p>`;
    entries.sort(([a, la], [b, lb]) => (last(la).name ?? a).localeCompare(last(lb).name ?? b));
    return html`<p class="ltek-hint">${this._t("rep.devices_hint")}</p>
      <div class="ltek-list">
        ${entries.map(([entity, list]) => {
          const open = this._expanded.has(`dev:${entity}`);
          const name = last(list).name ?? entity;
          return html`<div class="ltek-item group ${open ? "open" : ""}">
            <button class="row" @click=${() => this._toggle(`dev:${entity}`)}>
              <ha-icon class="lead" icon="mdi:television"></ha-icon>
              <span class="ltek-item-text">
                <span class="ltek-name">${name}</span>
                <span class="ltek-subline">${entity}</span>
              </span>
              <ha-icon class="ltek-act chev" icon=${open ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
            </button>
            <div class="directions">
              ${(["on", "off", "picture", "signal"] as const).map((dir) => {
                // A device that was on already says nothing about how long it takes to come up
                const events = list.filter((e) => e.direction === dir && !e.warm);
                if (!events.length) return nothing;
                const s = stats(events.map((e) => ({ seconds: e.seconds, ok: e.result === "ok" })));
                return html`<div class="direction">
                  <span class="dir-label">${this._t(`rep.dir_${dir}`)}</span>
                  ${this._stats(s, "rep.count_times")}
                  ${this._spark(events.map((e) => ({ seconds: e.seconds, ok: e.result === "ok", warn: e.slow })), s.typical)}
                </div>`;
              })}
            </div>
            ${open ? this._renderEvents(list) : nothing}
          </div>`;
        })}
      </div>`;
  }

  private _renderEvents(list: DeviceEvent[]): TemplateResult {
    const typical: Record<string, number | null> = {};
    for (const dir of ["on", "off", "picture", "signal"]) {
      typical[dir] = stats(list.filter((e) => e.direction === dir && !e.warm).map((e) => ({ seconds: e.seconds, ok: e.result === "ok" }))).typical;
    }
    return html`<table class="events">
      <thead>
        <tr>
          <th>${this._t("rep.when")}</th>
          <th>${this._t("rep.dir")}</th>
          <th>${this._t("rep.time")}</th>
          <th>${this._t("rep.result")}</th>
          <th>${this._t("rep.for")}</th>
        </tr>
      </thead>
      <tbody>
        ${[...list].reverse().map((e) => {
          const dev = e.result === "ok" && !e.warm ? deviation(e.seconds, typical[e.direction]) : "";
          return html`<tr>
            <td>${this._when(e.at)}</td>
            <td>
              ${this._t(`rep.dir_${e.direction}`)}${e.source ? html`<div class="muted">${e.source}</div>` : nothing}${e.warm
                ? html`<div class="muted">${this._t("rep.warm")}</div>`
                : nothing}
            </td>
            <td>
              <b>${duration(e.seconds)}</b>${dev ? html` <span class="dev ${dev.startsWith("+") ? "slow" : "fast"}">${dev}</span>` : nothing}
            </td>
            <td>
              <span class="ltek-badge ${e.result === "ok" ? (e.slow ? "warn" : "ok") : "err"}"
                >${e.result === "ok" ? (e.slow ? this._t("rep.slow") : this._t("rep.result_ok")) : e.result}</span
              >${e.value ? html` <span class="muted">${e.value}</span>` : nothing}
            </td>
            <td class="muted">${[e.room_name, e.activity_name].filter(Boolean).join(" · ")}</td>
          </tr>`;
        })}
      </tbody>
    </table>`;
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
        flex-wrap: wrap;
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
      .ent {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.6fr) auto;
        gap: var(--ltek-sp-3);
        align-items: start;
        padding: 6px 0;
        border-top: 1px solid var(--divider-color);
      }
      .ent-name {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .ent-name .mono {
        font-family: var(--code-font-family, monospace);
        font-size: var(--ltek-fs-small);
        color: var(--secondary-text-color);
        overflow-wrap: anywhere;
      }
      .ent-purpose {
        display: flex;
        flex-direction: column;
        color: var(--secondary-text-color);
      }
      h3 {
        margin: var(--ltek-sp-3) 0 0;
        font-size: var(--ltek-fs-group);
      }
      h4 {
        margin: var(--ltek-sp-2) 0 0;
        font-size: var(--ltek-fs-small);
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
      .ltek-row select {
        padding: var(--ltek-ctrl-pad);
        background: var(--secondary-background-color, #2a2a2a);
        border: 1px solid var(--ltek-c-border);
        border-radius: var(--ltek-r-ctrl);
        color: var(--ltek-c-text);
        font: inherit;
      }
      .ltek-item.group {
        flex-direction: column;
        align-items: stretch;
        gap: var(--ltek-sp-2);
      }
      button.row {
        display: flex;
        align-items: center;
        gap: var(--ltek-sp-3);
        border: none;
        background: none;
        padding: 0;
        font: inherit;
        color: inherit;
        text-align: left;
        cursor: pointer;
        width: 100%;
      }
      button.row > ha-icon.lead {
        color: var(--accent-color, var(--ltek-c-accent));
        --mdc-icon-size: var(--ltek-icon-lg);
        flex: none;
      }
      .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 2px var(--ltek-sp-4);
        font-size: var(--ltek-fs-small);
        color: var(--ltek-c-label);
        margin-top: 2px;
      }
      .muted {
        color: var(--ltek-c-muted);
      }
      .spark {
        flex: none;
      }
      .spark rect.ok {
        fill: var(--green-color, #4caf50);
      }
      .spark rect.warn {
        fill: var(--yellow-color, #ffeb3b);
      }
      .spark rect.err {
        fill: var(--red-color, #f44336);
      }
      .spark line.typ {
        stroke: var(--ltek-c-accent);
        stroke-dasharray: 3 2;
        stroke-width: 1;
      }
      .runs {
        display: flex;
        flex-direction: column;
        border-top: 1px solid var(--ltek-c-border-soft);
      }
      button.run-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto auto 20px;
        align-items: center;
        gap: var(--ltek-sp-3);
        width: 100%;
        padding: var(--ltek-sp-2) 0;
        border: none;
        border-bottom: 1px solid var(--ltek-c-border-soft);
        background: none;
        font: inherit;
        color: inherit;
        text-align: left;
        cursor: pointer;
      }
      .when {
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .total {
        font-variant-numeric: tabular-nums;
      }
      .dev {
        font-size: var(--ltek-fs-small);
      }
      .dev.slow {
        color: var(--red-color, #f44336);
      }
      .dev.fast {
        color: var(--green-color, #4caf50);
      }
      .ltek-badge.err {
        color: var(--ltek-c-error);
        border-color: var(--ltek-c-error);
      }
      .copied {
        margin: 0;
        color: var(--ltek-c-success);
      }
      .export-run {
        align-self: flex-start;
        margin: var(--ltek-sp-2) 0 0;
      }
      .phases {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: var(--ltek-sp-2) 0 var(--ltek-sp-3);
      }
      .phase {
        display: grid;
        grid-template-columns: minmax(90px, 30%) minmax(0, 1fr) 56px;
        align-items: center;
        gap: var(--ltek-sp-3);
        font-size: var(--ltek-fs-small);
      }
      .phase-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .track {
        position: relative;
        height: 10px;
        border-radius: 5px;
        background: var(--ltek-c-border-soft);
      }
      .bar {
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 5px;
        background: var(--ltek-c-accent);
      }
      .lane-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 4px var(--ltek-sp-4);
        font-size: var(--ltek-fs-small);
        color: var(--secondary-text-color);
        margin-bottom: 2px;
      }
      .lane-legend .key {
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .swatch {
        width: 10px;
        height: 10px;
        border-radius: 3px;
        display: inline-block;
      }
      .lane-track {
        height: 14px;
        overflow: hidden;
      }
      .seg {
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 0;
      }
      .c-off {
        background: var(--red-color, #f44336);
      }
      .c-standby {
        background: var(--grey-color, #9e9e9e);
      }
      .c-busy {
        background: #f5b800;
      }
      .c-idle {
        background: var(--blue-color, #2196f3);
      }
      .c-on {
        background: var(--green-color, #4caf50);
      }
      .c-error {
        background: repeating-linear-gradient(45deg, var(--red-color, #f44336), var(--red-color, #f44336) 4px, #7f1d1d 4px, #7f1d1d 8px);
      }
      .c-unavailable {
        background: repeating-linear-gradient(45deg, #5f5f5f, #5f5f5f 3px, #3c3c3c 3px, #3c3c3c 6px);
      }
      .axis .ticks {
        display: flex;
        justify-content: space-between;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .lane-then {
        margin: var(--ltek-sp-3) 0 0;
      }
      .phase.err .bar {
        background: var(--red-color, #f44336);
      }
      .phase-time {
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
      .small {
        font-size: var(--ltek-fs-small);
        margin: 2px 0;
      }
      .directions {
        display: flex;
        flex-direction: column;
        gap: var(--ltek-sp-2);
        padding-left: calc(var(--ltek-icon-lg) + var(--ltek-sp-3));
      }
      .direction {
        display: flex;
        align-items: center;
        gap: var(--ltek-sp-4);
        flex-wrap: wrap;
      }
      .dir-label {
        min-width: 70px;
        color: var(--accent-color, var(--ltek-c-accent));
        font-weight: var(--ltek-fw-semibold);
      }
      .direction .stats {
        flex: 1 1 auto;
        margin: 0;
      }
      table.events {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--ltek-fs-small);
      }
      table.events th {
        text-align: left;
        color: var(--ltek-c-muted);
        font-weight: var(--ltek-fw-semibold);
        padding: 4px 6px;
        border-bottom: 1px solid var(--ltek-c-border-soft);
      }
      table.events td {
        padding: 4px 6px;
        border-bottom: 1px solid var(--ltek-c-border-soft);
        font-variant-numeric: tabular-nums;
      }
    `,
  ];
}

if (!customElements.get("easy-av-control-reports")) {
  customElements.define("easy-av-control-reports", EasyAvControlReports);
}
