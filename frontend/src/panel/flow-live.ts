/**
 * The live Flow's logic: which row a running start or stop is at, and what each device's state looks like.
 * Pure, so it is tested without a browser.
 */

export type Row = { kind: string; at: [number, number]; [key: string]: unknown };

/** What the room is busy with, from the card's room view (``current`` as the coordinator's _doing writes it). */
export interface Live {
  state: string;
  current?: { kind: string; device?: string | null; step?: number } | null;
}

export type RowStatus = "done" | "active" | "failed" | "todo";

/** Rows that belong to the device or group header above them. */
export const NESTED = new Set([
  "boot", "reload", "ready", "status", "picture", "check", "turn_on", "wait", "already_on", "step", "turn_off",
  "delay", "wait_for",
]);
/** Rows that start a group: a device, the checks, the steps. */
export const HEADERS = new Set(["device", "checks", "steps"]);

/** The header each row is grouped under (undefined for top-level rows), as the Flow draws them. */
export function groups(rows: Row[]): (Row | undefined)[] {
  let header: Row | undefined;
  return rows.map((row) => {
    if (HEADERS.has(row.kind)) {
      header = row;
      return undefined;
    }
    if (!NESTED.has(row.kind) || row.reason === "unused") header = undefined;
    return header;
  });
}

/** The index of the row ``current`` stands for, or -1. */
export function currentRow(rows: Row[], current: Live["current"]): number {
  if (!current) return -1;
  const under = groups(rows);
  const device = current.device ?? undefined;
  const ofDevice = (i: number) => (rows[i].device ?? under[i]?.device) === device;
  const find = (test: (row: Row, i: number) => boolean) => rows.findIndex((row, i) => !row.background && test(row, i));
  switch (current.kind) {
    case "power_on":
      return find((r) => r.kind === "outlets_on");
    case "power_off":
      return find((r) => r.kind === "outlets_off");
    case "boot":
    case "reload":
    case "ready":
    case "turn_on":
    case "status":
      return find((r, i) => r.kind === current.kind && ofDevice(i));
    case "reach":
      return find((r, i) => r.kind === "turn_on" && ofDevice(i));
    case "delay":
    case "before":
      return find((r, i) => r.kind === (current.kind === "delay" ? "delay" : "wait_for") && ofDevice(i));
    case "warm_up":
      return find((r, i) => r.kind === "wait" && r.reason === "delay_after_on" && ofDevice(i));
    case "turn_off":
      return find((r, i) => r.kind === "turn_off" && ofDevice(i));
    case "checks":
      return find((r) => r.kind === "checks");
    case "step":
      return find((r) => r.kind !== "wait" && r.step === current.step);
    case "wait":
      return find((r) => r.kind === "wait" && r.step === current.step);
    case "hooks":
      return find((r) => r.kind === "hook_wait");
    default:
      return -1;
  }
}

/**
 * Each row's status. ``reached`` is the furthest row seen so far in this run (a start never goes back),
 * so a moment between two steps doesn't clear the marks. A finished run marks everything done.
 */
export function rowStatuses(rows: Row[], live: Live, reached: number): RowStatus[] {
  if (live.state === "error") {
    // The run stopped at the furthest row it reached
    const under = groups(rows);
    return rows.map((row, i) => {
      if (row.background || reached < 0) return "todo";
      if (i < reached) return HEADERS.has(row.kind) && under[reached] === row ? "failed" : "done";
      return i === reached ? "failed" : "todo";
    });
  }
  const finished = live.state === "active" || live.state === "idle";
  const running = live.state === "starting" || live.state === "stopping";
  const at = running ? Math.max(reached, currentRow(rows, live.current)) : -1;
  const under = groups(rows);
  return rows.map((row, i) => {
    if (row.background) return finished && live.state === "idle" ? "done" : "todo";
    if (finished) return "done";
    if (!running || at < 0) return i === 0 ? "active" : "todo";
    if (i < at) {
      // A header stays active while one of its rows is
      if (HEADERS.has(row.kind) && under[at] === row) return "active";
      return "done";
    }
    return i === at ? "active" : "todo";
  });
}

/** The colour role of a device's state: the theme's active, warning, off, error or unavailable colour. */
export function stateRole(group: string | undefined): string {
  switch (group) {
    case "on":
      return "on";
    case "starting":
    case "stopping":
      return "busy";
    case "off":
      return "off";
    case "error":
      return "error";
    case "unavailable":
      return "unavailable";
    default:
      return "unknown";
  }
}

/** What the Flow can count as a detail, and which rows each one hides (entities and notes hide parts of rows). */
export const DETAIL_ROWS: Record<string, string[]> = {
  waits: ["wait", "boot", "ready", "status", "hook_wait"],
  reloads: ["reload"],
  outlets: ["outlets_on", "outlets_off", "outlet_keep"],
  hooks: ["hook", "hook_wait"],
};
export const FLOW_DETAILS = ["entities", "waits", "notes", "reloads", "outlets", "hooks"];

/** Whether a row is left out while details are hidden. */
export function hiddenRow(row: Row, details: string[]): boolean {
  return details.some((d) => DETAIL_ROWS[d]?.includes(row.kind));
}
