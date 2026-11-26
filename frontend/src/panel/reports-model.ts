/** The Reports page's pure parts: grouping, statistics and time formats. Tested without a browser. */

export interface Phase {
  kind: string;
  start: number;
  seconds: number;
  device?: string;
  name?: string;
  result?: string;
  [key: string]: unknown;
}

export interface Run {
  id?: string;
  at: string;
  room: string;
  room_name: string;
  activity: string;
  activity_name: string;
  mode: "start" | "stop";
  from?: string;
  from_name?: string;
  seconds: number;
  result: "ok" | "warning" | "error" | "cancelled";
  error?: string;
  warnings?: string[];
  phases: Phase[];
}

export interface DeviceEvent {
  at: string;
  /** on / off: the device's own time; picture / signal: how long a check took to pass */
  direction: "on" | "off" | "picture" | "signal";
  seconds: number;
  result: string;
  name?: string;
  room_name?: string;
  activity_name?: string;
  value?: string;
  slow?: boolean;
  /** The entity a picture or signal check watched */
  source?: string;
  /** The device was on already: counted from the start of the check, not from switching it on */
  warm?: boolean;
}

export interface Stats {
  count: number;
  typical: number | null;
  fastest: number | null;
  slowest: number | null;
  last: number | null;
  /** Spread of the good times: slowest minus fastest */
  spread: number | null;
  failed: number;
}

/** Count, median, fastest, slowest and last of the good times; failures counted apart. */
export function stats(values: { seconds: number; ok: boolean }[]): Stats {
  const good = values.filter((v) => v.ok).map((v) => v.seconds);
  const sorted = [...good].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  const typical = sorted.length ? (sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2) : null;
  return {
    count: values.length,
    typical: typical === null ? null : Math.round(typical * 10) / 10,
    fastest: sorted.length ? sorted[0] : null,
    slowest: sorted.length ? sorted[sorted.length - 1] : null,
    last: good.length ? good[good.length - 1] : null,
    spread: sorted.length ? Math.round((sorted[sorted.length - 1] - sorted[0]) * 10) / 10 : null,
    failed: values.length - good.length,
  };
}

/** Runs grouped by room, activity, start or stop (and the activity a start switched from), oldest first. */
export function runGroups(runs: Run[]): { key: string; runs: Run[] }[] {
  const groups = new Map<string, Run[]>();
  for (const run of runs) {
    const key = [run.room, run.activity, run.mode, run.mode === "start" ? run.from ?? "" : ""].join("|");
    groups.set(key, [...(groups.get(key) ?? []), run]);
  }
  return [...groups.entries()].map(([key, list]) => ({ key, runs: list }));
}

/** A run counts as good when it finished (with or without warnings). */
export const runOk = (run: Run) => run.result === "ok" || run.result === "warning";

/** "8.4 s", "1:05", "12:30". */
export function duration(seconds: number | null | undefined): string {
  if (seconds === null || seconds === undefined || !Number.isFinite(seconds)) return "–";
  if (seconds < 60) return `${Math.round(seconds * 10) / 10} s`;
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** How far a time is from the typical one, as a signed percentage ("+42 %"), or "" when close. */
export function deviation(seconds: number, typical: number | null): string {
  if (!typical || typical <= 0) return "";
  const pct = Math.round(((seconds - typical) / typical) * 100);
  return Math.abs(pct) < 10 ? "" : `${pct > 0 ? "+" : ""}${pct} %`;
}
