/**
 * The "Device state" part of a device page: what the Detected box shows, and how its form maps to the device
 * config. Pure functions, so the byte-stability rule can be tested: a setting is written only when it
 * differs from what the device would do anyway (the profile's value, or the built-in default).
 */
import type { Device, Obj } from "./model";

export interface ProfileView {
  id: string;
  name: string;
  integration: string;
  source: "builtin" | "user";
  tested: boolean;
  generic: boolean;
  data: Obj;
  used_by?: string[];
}

export interface Detect {
  profile: ProfileView | null;
  found: {
    indicator: string | null;
    attribute: string | null;
    remote_entity: string | null;
    power_switch: string | null;
    settings: string[];
    picture: string | null;
  } | null;
  state: {
    entity_id: string;
    group: string;
    value: string | null;
    debounce: number;
    timeout_on: number;
    timeout_off: number;
    wait_on: string;
    wait_off: string;
  } | null;
  siblings: { integration: string; entities: string[] }[];
  roles: Record<string, string | null>;
  /** Measured times (device_timings.py), or null before the first measured start */
  timings?: Record<"on" | "off", Timing> | null;
}

export interface Timing {
  samples: number;
  typical: number | null;
  last: number | null;
  slowest: number | null;
  suggested: number | null;
}

export const WAIT_MODES = ["status", "time", "both", "none"] as const;
export const FAILURES = ["warn", "stop", "retry"] as const;

/** The device keys the Device state form writes (everything else on the device is left alone). */
export const STATE_KEYS = [
  "profile",
  "state_source",
  "wait_on",
  "wait_off",
  "timeout_on",
  "timeout_off",
  "debounce",
  "on_failure",
] as const;

/** What the device does when a key isn't set: the profile's value, else the engine's default. */
export function defaults(detect: Detect | undefined): { timeout_on: number; timeout_off: number; debounce: number } {
  const data = (detect?.profile?.data ?? {}) as { timeouts?: { on?: number; off?: number }; debounce?: number };
  return {
    timeout_on: data.timeouts?.on ?? 120,
    timeout_off: data.timeouts?.off ?? 300,
    debounce: data.debounce ?? 2,
  };
}

function failure(device: Device, check: "turn_on" | "turn_off" | "picture"): string {
  const raw = device.on_failure as string | Record<string, string> | undefined;
  if (raw && typeof raw === "object") {
    return raw[check] ?? "warn";
  }
  return raw ?? "warn";
}

/** The form's values for a device. */
export function stateFormData(device: Device, detect: Detect | undefined): Obj {
  const d = defaults(detect);
  const source = device.state_source;
  return {
    profile: (device.profile as string | undefined) ?? "__auto",
    state_source: source === "none" ? "none" : source && typeof source === "object" ? "custom" : "auto",
    wait_on: (device.wait_on as string | undefined) ?? "status",
    wait_off: (device.wait_off as string | undefined) ?? "status",
    timeout_on: (device.timeout_on as number | undefined) ?? d.timeout_on,
    timeout_off: (device.timeout_off as number | undefined) ?? d.timeout_off,
    debounce: (device.debounce as number | undefined) ?? d.debounce,
    on_failure_on: failure(device, "turn_on"),
    on_failure_off: failure(device, "turn_off"),
    on_failure_picture: failure(device, "picture"),
  };
}

/**
 * The device with the form's values: each key only when it differs from the default, so a device the user
 * didn't change stays byte-identical.
 */
export function applyStateForm(device: Device, values: Obj, detect: Detect | undefined): Device {
  const d = defaults(detect);
  const out: Device = { ...device };
  for (const key of STATE_KEYS) {
    delete out[key];
  }
  if (values.profile && values.profile !== "__auto") out.profile = values.profile as string;
  if (values.state_source === "none") out.state_source = "none";
  else if (values.state_source === "custom") out.state_source = device.state_source ?? {};
  if (values.wait_on && values.wait_on !== "status") out.wait_on = values.wait_on as string;
  if (values.wait_off && values.wait_off !== "status") out.wait_off = values.wait_off as string;
  if (values.timeout_on !== undefined && Number(values.timeout_on) !== d.timeout_on) out.timeout_on = Number(values.timeout_on);
  if (values.timeout_off !== undefined && Number(values.timeout_off) !== d.timeout_off) {
    out.timeout_off = Number(values.timeout_off);
  }
  if (values.debounce !== undefined && Number(values.debounce) !== d.debounce) out.debounce = Number(values.debounce);
  const on = (values.on_failure_on as string) || "warn";
  const off = (values.on_failure_off as string) || "warn";
  const picture = (values.on_failure_picture as string) || "warn";
  if (on === off && off === picture) {
    if (on !== "warn") out.on_failure = on;
  } else {
    out.on_failure = {
      ...(on !== "warn" ? { turn_on: on } : {}),
      ...(off !== "warn" ? { turn_off: off } : {}),
      ...(picture !== "warn" ? { picture } : {}),
    };
  }
  return out;
}

/** Whether "Use these" would change anything: the remote and outlet the profile found. */
export function detectedChanges(device: Device, detect: Detect | undefined): Partial<Device> {
  const found = detect?.found;
  if (!found) return {};
  const changes: Partial<Device> = {};
  if (found.remote_entity && device.remote_entity !== found.remote_entity) changes.remote_entity = found.remote_entity;
  if (found.power_switch && !device.power_switch) changes.power_switch = found.power_switch;
  return changes;
}

type Translate = (key: string, params?: Record<string, string>) => string;

function matcher(m: unknown): string {
  if (!m || typeof m !== "object") return "";
  const o = m as Record<string, string>;
  return [o.domain, o.translation_key ?? o.unique_id_suffix ?? o.device_class].filter(Boolean).join(" · ");
}

/** A profile in a few lines, for the Profiles tab's preview. */
export function profileSummary(profile: ProfileView, t: Translate): string[] {
  const data = profile.data as Record<string, any>;
  const lines: string[] = [];
  const ind = data.indicator as Record<string, any> | undefined;
  if (ind) {
    const what = ind.entity ? matcher(ind.entity) : t("sum_indicator_device");
    const where = ind.attribute ? `${what} (${ind.attribute})` : what;
    lines.push(t("sum_indicator", { what: ind.available_is_on ? t("sum_indicator_available", { what: where }) : where }));
    const groups = ["starting", "on", "stopping", "off", "error"]
      .filter((g) => Array.isArray(ind[g]) && ind[g].length)
      .map((g) => `${g}: ${(ind[g] as string[]).join(" / ")}`);
    if (groups.length) lines.push(t("sum_states", { groups: groups.join(" · ") }));
  }
  if (data.remote) lines.push(`${t("sum_remote")}: ${matcher(data.remote)}`);
  if (data.power_switch) lines.push(`${t("sum_outlet")}: ${matcher(data.power_switch)}`);
  if (Array.isArray(data.settings) && data.settings.length) {
    lines.push(`${t("sum_settings")}: ${data.settings.map(matcher).join(", ")}`);
  }
  if (data.picture) lines.push(`${t("sum_picture")}: ${(data.picture.ok as string[]).join(" / ")}`);
  if (data.order) lines.push(t("sum_order", { order: t(`order.${data.order}`) }));
  const roles = Object.entries((data.roles ?? {}) as Record<string, number>)
    .sort(([, a], [, b]) => a - b)
    .map(([role]) => t(`role.${role}`));
  if (roles.length) lines.push(t("sum_roles", { roles: roles.join(", ") }));
  return lines;
}

const NOT_A_STATE = new Set(["unavailable", "unknown", ""]);

/**
 * Learn: what a device showed while it was turned on, and while it was turned off, as state groups.
 * Turning on: the first value is "off", the last "on", any in between "starting"; turning off the other way round.
 * A device whose entity is unavailable while it's off gets ``available_is_on``.
 */
export function learnGroups(onSeq: string[], offSeq: string[]): Obj {
  const groups: Record<string, string[]> = {};
  const add = (group: string, value: string | undefined) => {
    if (value === undefined || NOT_A_STATE.has(value)) return;
    (groups[group] ??= []).includes(value) || groups[group].push(value);
  };
  const out: Obj = {};
  if (onSeq.length) {
    if (onSeq.length > 1) add("off", onSeq[0]);
    onSeq.slice(1, -1).forEach((v) => add("starting", v));
    add("on", onSeq[onSeq.length - 1]);
    if (onSeq[0] === "unavailable") out.available_is_on = true;
  }
  if (offSeq.length) {
    if (offSeq.length > 1) add("on", offSeq[0]);
    offSeq.slice(1, -1).forEach((v) => add("stopping", v));
    add("off", offSeq[offSeq.length - 1]);
    if (offSeq[offSeq.length - 1] === "unavailable") out.available_is_on = true;
  }
  for (const group of ["starting", "stopping"]) {
    groups[group] = (groups[group] ?? []).filter((v) => !groups.on?.includes(v) && !groups.off?.includes(v));
    if (!groups[group].length) delete groups[group];
  }
  return { ...out, ...groups };
}

/** "42 s" or "3:10". */
export function seconds(value: number): string {
  const s = Math.round(value);
  return s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : `${s} s`;
}

/**
 * The timeouts the measured times suggest, where they differ from what the device uses now; {} when there's
 * nothing to suggest (too few starts, or already the same).
 */
export function suggestedTimeouts(device: Device, detect: Detect | undefined): Partial<Device> {
  const t = detect?.timings;
  if (!t || !detect?.state) return {};
  const out: Partial<Device> = {};
  const current = { on: detect.state.timeout_on, off: detect.state.timeout_off };
  for (const dir of ["on", "off"] as const) {
    const wanted = t[dir]?.suggested;
    if (wanted && wanted !== current[dir]) out[dir === "on" ? "timeout_on" : "timeout_off"] = wanted;
  }
  return out;
}
