/**
 * Configuration model of the panel: the stored YAML structure, edited as
 * plain objects. Validation stays in the integration (config/validate).
 */
import type { HomeAssistant } from "../types";

export type Obj = Record<string, unknown>;

export interface Device extends Obj {
  entity_id: string;
  name?: string;
  power_switch?: string | null;
  remote_entity?: string | null;
  ready?: {
    entity_id?: string;
    state?: string | string[];
    timeout?: number;
    reload_integration?: boolean;
    on_timeout?: string;
  } | null;
  delay_after_power?: number;
  delay_after_on?: number;
  delay_after_off?: number;
  /** At shutdown, off this long after it, in the background (seats) */
  turn_off_after?: number;
  /** A select device (Harmony activities): the option for on, and for off */
  option?: string;
  off_option?: string;
  /** Monitor: what to do when it is on while nothing uses it */
  watch?: { mode?: "off" | "notify" | "turn_off"; grace?: number; turn_off_after?: number };
  commands?: Obj;
}

/** Before a device is turned on: a delay, then other devices of the activity to be on or show a picture. */
export interface Before extends Obj {
  delay?: number;
  wait_for?: { device: string; state?: "on" | "picture" }[];
  timeout?: number;
  on_timeout?: "continue" | "abort";
}

export interface Step extends Obj {
  type: string;
  device?: string;
}

export interface Activity extends Obj {
  name?: string;
  icon?: string;
  order?: number;
  devices?: string[];
  steps?: Step[];
  checks?: Obj[];
  before?: Record<string, Before>;
  /** Entities whose state starts the activity (a Harmony hub's activity), and optionally shuts it down */
  /** Monitor while active, in seconds; 0 turns a check off */
  monitor?: { lost_after?: number; picture_lost_after?: number; idle_after?: number; idle_warning?: number };
  started_by?: { entity_id: string; state: string | string[]; stop_state?: string | string[] }[];
  on_start?: unknown[];
  on_stop?: unknown[];
  remote?: Obj;
  commands?: Obj;
}

export interface Room extends Obj {
  name?: string;
  area_id?: string | null;
  default_activity?: string | null;
  devices?: Record<string, Device>;
  activities?: Record<string, Activity>;
}

export type Rooms = Record<string, Room>;

export const STEP_TYPES = [
  "power_on",
  "power_off",
  "set_source",
  "set_volume",
  "set_sound_mode",
  "set_brightness",
  "set_color_temp",
  "set_position",
  "set_tilt",
  "call_action",
  "delay",
  "wait_available",
] as const;

export const GROUPS = ["volume", "channels", "transport", "navigation"] as const;

const SECONDS = { number: { min: 0, max: 3600, step: 1, mode: "box", unit_of_measurement: "s" } };
const PERCENT = { number: { min: 0, max: 100, step: 1, mode: "slider" } };

/** Remembered source lists per media player (easy_av_control/config/sources). */
export type Sources = Record<string, string[]>;

/** A list of a media player (source_list, sound_mode_list): live while it is
 * on, else the remembered one. */
export function deviceList(
  hass: HomeAssistant,
  remembered: Sources,
  entity: string | undefined,
  attribute = "source_list",
): string[] {
  if (!entity) {
    return [];
  }
  const live = hass.states[entity]?.attributes[attribute];
  if (Array.isArray(live) && live.length) {
    return live.map(String);
  }
  return remembered[entity] ?? [];
}

/** Source list of a media player: live while it is on, else the remembered one. */
export function sourceList(hass: HomeAssistant, sources: Sources, entity: string | undefined): string[] {
  return deviceList(hass, sources, entity, "source_list");
}

/** Device settings the card can offer, and the list each one chooses from. */
export const SETTINGS = ["source", "sound_mode"] as const;
/** Entities a device setting can be: shown as slider, list or on/off key. */
export const SETTING_ENTITY_DOMAINS = ["number", "input_number", "select", "input_select", "switch", "input_boolean"] as const;
export const SETTING_LISTS: Record<string, string> = {
  source: "source_list",
  sound_mode: "sound_mode_list",
};

/** Numbers and selects per device entity that a device offers automatically
 * (easy_av_control/config/related). */
export type Related = Record<string, string[]>;

/** What a device offers without a choice, as the integration does: source
 * and sound mode of a media player with a known list, and its related
 * numbers and selects. */
export function deviceAutoSettings(
  hass: HomeAssistant,
  room: Room,
  deviceId: string,
  lists: Record<string, Sources>,
  related: Related = {},
): Obj[] {
  const entity = room.devices?.[deviceId]?.entity_id;
  if (!entity) {
    return [];
  }
  const found: Obj[] = [];
  if (entity.startsWith("media_player.")) {
    for (const setting of SETTINGS) {
      const attribute = SETTING_LISTS[setting];
      if (deviceList(hass, lists[attribute] ?? {}, entity, attribute).length) {
        found.push({ device: deviceId, setting });
      }
    }
  }
  for (const other of related[entity] ?? []) {
    found.push({ device: deviceId, entity: other });
  }
  return found;
}

/** The settings a device offers in the card: its own choice, else automatic. */
export function deviceSettings(
  hass: HomeAssistant,
  room: Room,
  deviceId: string,
  lists: Record<string, Sources>,
  related: Related = {},
): Obj[] {
  const own = room.devices?.[deviceId]?.settings;
  if (Array.isArray(own)) {
    return own.map((s) => ({ ...(s as Obj), device: deviceId }));
  }
  return deviceAutoSettings(hass, room, deviceId, lists, related);
}

/** The settings the card shows for an activity without its own choice:
 * those of its devices. */
export function autoSettings(
  hass: HomeAssistant,
  room: Room,
  activity: Activity,
  lists: Record<string, Sources>,
  related: Related = {},
): Obj[] {
  return (activity.devices ?? []).flatMap((d) => deviceSettings(hass, room, d, lists, related));
}

/** A quick-select button: selects a source on its device. */
export function isQuickSelect(button: unknown): button is Obj {
  return typeof button === "object" && button !== null && "source" in button;
}

/** ha-form schema of a step, depending on its type. */
export function stepSchema(
  hass: HomeAssistant,
  room: Room,
  step: Step,
  label: (key: string) => string,
  sources: Sources = {},
  soundModes: Sources = {},
): Obj[] {
  const devices = Object.entries(room.devices ?? {}).map(([id, d]) => ({
    value: id,
    label: d.name ? `${d.name} (${id})` : id,
  }));
  const deviceField = { name: "device", required: true, selector: { select: { options: devices, mode: "dropdown" } } };
  const entity = step.device ? room.devices?.[step.device]?.entity_id : undefined;
  const fields: Record<string, Obj[]> = {
    power_on: [deviceField],
    power_off: [deviceField],
    set_source: [
      deviceField,
      { name: "source", required: true, selector: { select: { options: sourceList(hass, sources, entity), custom_value: true, mode: "dropdown" } } },
    ],
    set_volume: [
      deviceField,
      { name: "volume_level", required: true, selector: { number: { min: 0, max: 1, step: 0.01, mode: "slider" } } },
    ],
    set_sound_mode: [
      deviceField,
      { name: "sound_mode", required: true, selector: { select: { options: deviceList(hass, soundModes, entity, "sound_mode_list"), custom_value: true, mode: "dropdown" } } },
    ],
    set_brightness: [
      deviceField,
      { name: "brightness_pct", selector: PERCENT },
      { name: "color_temp_kelvin", selector: { color_temp: { unit: "kelvin", min: 2000, max: 6500 } } },
      { name: "transition", selector: SECONDS },
    ],
    set_color_temp: [
      deviceField,
      { name: "color_temp_kelvin", required: true, selector: { color_temp: { unit: "kelvin", min: 2000, max: 6500 } } },
    ],
    set_position: [deviceField, { name: "position", required: true, selector: PERCENT }],
    set_tilt: [deviceField, { name: "tilt_position", required: true, selector: PERCENT }],
    call_action: [
      { name: "action", required: true, selector: { text: {} } },
      { name: "target", selector: { target: {} } },
      { name: "data", selector: { object: {} } },
    ],
    delay: [],
    wait_picture: [deviceField, { name: "timeout", selector: { number: { min: 5, max: 300, step: 5, mode: "slider", unit_of_measurement: "s" } } }],
    wait_available: [
      { ...deviceField, required: false },
      { name: "entity_id", selector: { entity: {} } },
      { name: "timeout", selector: SECONDS },
      { name: "reload_integration", selector: { boolean: {} } },
      {
        name: "on_timeout",
        selector: {
          select: {
            options: [
              { value: "abort", label: label("on_timeout_abort") },
              { value: "continue", label: label("on_timeout_continue") },
            ],
            mode: "dropdown",
          },
        },
      },
    ],
  };
  return [...(fields[step.type] ?? []), { name: "delay_after", selector: SECONDS }];
}

/** Drop empty optional values so the stored YAML stays tidy. */
export function clean<T extends Obj>(value: T, keep: string[] = []): T {
  const out: Obj = {};
  for (const [key, v] of Object.entries(value)) {
    if (keep.includes(key)) {
      out[key] = v;
    } else if (v === undefined || v === null || v === "") {
      continue;
    } else if (Array.isArray(v) && v.length === 0) {
      continue;
    } else if (typeof v === "object" && !Array.isArray(v) && Object.keys(v as Obj).length === 0) {
      continue;
    } else {
      out[key] = v;
    }
  }
  return out as T;
}

/** Like clean, but a group set to null (hidden) stays hidden, and an empty
 * settings list (no settings in the card) stays. */
export function cleanRemote(remote: Obj): Obj {
  const keep: string[] = GROUPS.filter((g) => remote[g] === null);
  if (Array.isArray(remote.settings)) {
    keep.push("settings");
  }
  return clean(remote, keep);
}

/** Home Assistant's slugify: lower case, no accents, underscores. */
export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function uniqueKey(base: string, taken: Iterable<string>): string {
  const used = new Set(taken);
  const root = base || "item";
  if (!used.has(root)) {
    return root;
  }
  let n = 2;
  while (used.has(`${root}_${n}`)) {
    n += 1;
  }
  return `${root}_${n}`;
}

/** Where a device is referenced: activity names. */
export function deviceUsage(room: Room, deviceId: string): string[] {
  const where: string[] = [];
  for (const [id, activity] of Object.entries(room.activities ?? {})) {
    const used =
      (activity.devices ?? []).includes(deviceId) ||
      (activity.steps ?? []).some((s) => s.device === deviceId) ||
      GROUPS.some((g) => activity.remote?.[g] === deviceId) ||
      ((activity.remote?.buttons as Obj[] | undefined) ?? []).some(
        (b) => typeof b === "object" && b?.device === deviceId,
      );
    if (used) {
      where.push(activity.name ?? id);
    }
  }
  return where;
}

/** Rename a device and every reference to it. */
export function renameDevice(room: Room, from: string, to: string): Room {
  const devices: Record<string, Device> = {};
  for (const [id, device] of Object.entries(room.devices ?? {})) {
    devices[id === from ? to : id] = device;
  }
  const swap = (v: unknown) => (v === from ? to : v);
  const activities: Record<string, Activity> = {};
  for (const [id, a] of Object.entries(room.activities ?? {})) {
    const remote = a.remote ? { ...a.remote } : undefined;
    if (remote) {
      for (const g of GROUPS) {
        if (g in remote) remote[g] = swap(remote[g]);
      }
      if (Array.isArray(remote.buttons)) {
        remote.buttons = remote.buttons.map((b) =>
          typeof b === "object" && b ? { ...(b as Obj), device: swap((b as Obj).device) } : b,
        );
      }
    }
    const before = a.before
      ? Object.fromEntries(
          Object.entries(a.before).map(([d, b]) => [
            swap(d) as string,
            b.wait_for ? { ...b, wait_for: b.wait_for.map((w) => ({ ...w, device: swap(w.device) as string })) } : b,
          ]),
        )
      : undefined;
    activities[id] = clean({
      ...a,
      devices: a.devices?.map((d) => swap(d) as string),
      steps: a.steps?.map((s) => (s.device === from ? { ...s, device: to } : s)),
      checks: a.checks?.map((c) => (c.device === from ? { ...c, device: to } : c)),
      before,
      remote,
    });
  }
  return { ...room, devices, activities };
}

/** A room's activities in their order: position, then name (the Activities tab and the menu). */
export function sortedActivities(room: Room | undefined): [string, Activity][] {
  return Object.entries(room?.activities ?? {}).sort(
    ([ka, a], [kb, b]) =>
      (a.order ?? 1000) - (b.order ?? 1000) ||
      (a.name ?? ka).localeCompare(b.name ?? kb, undefined, { sensitivity: "base" }),
  );
}

/** "androidtv_remote" -> "Androidtv Remote": an integration's domain as a heading. */
export function integrationTitle(domain: string): string {
  return domain
    .split("_")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Card settings in columns by integration: an entity setting by its own
 * entity's integration, a source or sound mode by its device's. Columns keep
 * the order the settings come in; "" collects what has no known integration.
 */
export function byIntegration(hass: HomeAssistant, room: Room, settings: Obj[]): [string, Obj[]][] {
  const columns = new Map<string, Obj[]>();
  for (const setting of settings) {
    const entity = (setting.entity as string | undefined) || room.devices?.[String(setting.device)]?.entity_id;
    const platform = (entity && hass.entities?.[entity]?.platform) || "";
    columns.set(platform, [...(columns.get(platform) ?? []), setting]);
  }
  return [...columns.entries()];
}

/** An activity without one of its devices: out of its order, and nothing waits for it or before it any more. */
export function withoutDevice(activity: Activity, deviceId: string): Activity {
  const before: Record<string, Before> = {};
  for (const [d, b] of Object.entries(activity.before ?? {})) {
    if (d === deviceId) continue;
    const waits = (b.wait_for ?? []).filter((w) => w.device !== deviceId);
    const next = clean({ ...b, wait_for: waits.length ? waits : undefined }) as Before;
    if (Object.keys(next).some((k) => k === "delay" || k === "wait_for")) before[d] = next;
  }
  return clean({
    ...activity,
    devices: (activity.devices ?? []).filter((d) => d !== deviceId),
    before: Object.keys(before).length ? before : undefined,
  }) as Activity;
}

/** An activity with one device's Before set; an empty one is removed. */
export function withBefore(activity: Activity, deviceId: string, before: Before | undefined): Activity {
  const all = { ...(activity.before ?? {}) };
  const next = before ? (clean({ ...before, wait_for: before.wait_for?.length ? before.wait_for : undefined }) as Before) : undefined;
  if (next && (next.delay || next.wait_for?.length)) all[deviceId] = next;
  else delete all[deviceId];
  return clean({ ...activity, before: Object.keys(all).length ? all : undefined }) as Activity;
}

/** What an activity export holds: the activities, and every device they refer to. */
export const ACTIVITY_EXPORT_FORMAT = "easy_av_control.activities";
/** Marks a device id renamed during an import, so two renames never meet */
const MARK = "⟦eac⟧";

/** The devices an activity refers to: its own, its checks', steps', waits' and remote buttons'. */
export function activityDevices(activity: Activity): string[] {
  const ids = new Set<string>(activity.devices ?? []);
  for (const c of (activity.checks as Obj[] | undefined) ?? []) if (typeof c.device === "string") ids.add(c.device);
  for (const s of activity.steps ?? []) if (s.device) ids.add(s.device);
  for (const [d, b] of Object.entries(activity.before ?? {})) {
    ids.add(d);
    for (const w of b.wait_for ?? []) ids.add(w.device);
  }
  const remote = activity.remote ?? {};
  for (const g of GROUPS) if (typeof remote[g] === "string") ids.add(remote[g] as string);
  for (const b of (remote.buttons as Obj[] | undefined) ?? []) if (b && typeof b.device === "string") ids.add(b.device);
  for (const s of (remote.settings as Obj[] | undefined) ?? []) if (s && typeof s.device === "string") ids.add(s.device);
  return [...ids];
}

/** An export of some of a room's activities, with the devices they need. */
export function exportActivities(room: Room, ids: string[]): Obj {
  const activities: Record<string, Activity> = {};
  const devices: Record<string, Device> = {};
  for (const id of ids) {
    const activity = room.activities?.[id];
    if (!activity) continue;
    activities[id] = JSON.parse(JSON.stringify(activity)) as Activity;
    for (const d of activityDevices(activity)) {
      if (room.devices?.[d]) devices[d] = JSON.parse(JSON.stringify(room.devices[d])) as Device;
    }
  }
  return { format: ACTIVITY_EXPORT_FORMAT, version: 1, activities, devices };
}

export interface ActivityImport {
  room: Room;
  /** New activity id -> its name */
  added: Record<string, string>;
  /** Devices of the export that this room has already (same entity): export id -> this room's id */
  matched: Record<string, string>;
  /** Devices added to the room */
  devicesAdded: string[];
  /** Started by left out, because another activity of the room starts on the same entity */
  startedByDropped: string[];
}

/**
 * Add an export's activities to a room, unsaved. A device of the export whose entity the room has already is that
 * device; any other is added. Activities and devices whose ID is taken get a new one, and every reference follows.
 * Throws Error for something that isn't an activity export.
 */
export function importActivities(room: Room, data: unknown): ActivityImport {
  const env = data as Obj;
  if (!env || typeof env !== "object" || env.format !== ACTIVITY_EXPORT_FORMAT || typeof env.activities !== "object") {
    throw new Error("not an Easy AV Control activity export");
  }
  const incomingDevices = (env.devices ?? {}) as Record<string, Device>;
  const devices: Record<string, Device> = { ...(room.devices ?? {}) };
  const map: Record<string, string> = {};
  const matched: Record<string, string> = {};
  const devicesAdded: string[] = [];
  for (const [id, device] of Object.entries(incomingDevices)) {
    const same = Object.entries(devices).find(([, d]) => d.entity_id && d.entity_id === device.entity_id);
    if (same) {
      map[id] = same[0];
      matched[id] = same[0];
      continue;
    }
    const to = uniqueKey(id, Object.keys(devices));
    devices[to] = device;
    map[id] = to;
    devicesAdded.push(to);
  }
  const activities: Record<string, Activity> = { ...(room.activities ?? {}) };
  const added: Record<string, string> = {};
  const startedByDropped: string[] = [];
  const taken = new Set(
    Object.values(room.activities ?? {}).flatMap((a) => (a.started_by ?? []).map((s) => s.entity_id)),
  );
  for (const [id, raw] of Object.entries(env.activities as Record<string, Activity>)) {
    // Rename the export's device ids to this room's, through a scratch room
    let scratch: Room = { devices: { ...incomingDevices }, activities: { [id]: raw } };
    for (const [from, to] of Object.entries(map)) {
      if (from !== to) scratch = renameDevice(scratch, from, `${MARK}${to}`);
    }
    let activity = scratch.activities![id];
    activity = JSON.parse(JSON.stringify(activity).split(MARK).join("")) as Activity;
    if ((activity.started_by ?? []).some((s) => taken.has(s.entity_id))) {
      activity = clean({ ...activity, started_by: undefined }) as Activity;
      startedByDropped.push(activity.name ?? id);
    }
    const key = uniqueKey(id, Object.keys(activities));
    activities[key] = activity;
    added[key] = activity.name ?? key;
  }
  return { room: { ...room, devices, activities }, added, matched, devicesAdded, startedByDropped };
}
