/** The Device state form: byte-stable config, the Detected box's "Use these", the profile summary. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  applyStateForm,
  defaults,
  detectedChanges,
  profileSummary,
  stateFormData,
  type Detect,
  type ProfileView,
} from "../src/panel/device-state";
import type { Device } from "../src/panel/model";
import { t } from "../src/panel/strings";

const JVC: ProfileView = {
  id: "jvc_projector_ha",
  name: "JVC projector",
  integration: "jvc_projector_ha",
  source: "builtin",
  tested: true,
  generic: false,
  data: {
    indicator: { entity: { domain: "sensor", translation_key: "jvc_power_state" }, on: ["on"], starting: ["warming"], off: ["standby"] },
    remote: { domain: "remote" },
    timeouts: { on: 120, off: 300 },
    debounce: 2,
    order: "early",
    roles: { navigation: 1, power: 1 },
  },
};

const DETECT: Detect = {
  profile: JVC,
  found: {
    indicator: "sensor.jvc_power",
    attribute: null,
    remote_entity: "remote.jvc",
    power_switch: "switch.plug",
    settings: [],
    picture: null,
  },
  state: { entity_id: "sensor.jvc_power", group: "off", value: "standby", debounce: 2, timeout_on: 120, timeout_off: 300, wait_on: "status", wait_off: "status" },
  siblings: [],
  roles: {},
};

const en = (key: string, params?: Record<string, string>) => t("en", key, params);

test("an untouched device stays byte-identical", () => {
  const device: Device = { entity_id: "remote.jvc", delay_after_on: 0 };
  const data = stateFormData(device, DETECT);
  assert.deepEqual(data, {
    profile: "__auto",
    state_source: "auto",
    wait_on: "status",
    wait_off: "status",
    timeout_on: 120,
    timeout_off: 300,
    debounce: 2,
    on_failure_on: "warn",
    on_failure_off: "warn",
  });
  assert.deepEqual(applyStateForm(device, data, DETECT), device);
});

test("only what differs from the profile is written", () => {
  const device: Device = { entity_id: "remote.jvc" };
  const out = applyStateForm(device, { ...stateFormData(device, DETECT), wait_off: "both", timeout_off: 600, debounce: 2 }, DETECT);
  assert.deepEqual(out, { entity_id: "remote.jvc", wait_off: "both", timeout_off: 600 });
});

test("on_failure: one value when both are the same, per check when they differ, nothing for warn", () => {
  const device: Device = { entity_id: "remote.jvc" };
  const base = stateFormData(device, DETECT);
  assert.equal(applyStateForm(device, { ...base, on_failure_on: "stop", on_failure_off: "stop" }, DETECT).on_failure, "stop");
  assert.deepEqual(applyStateForm(device, { ...base, on_failure_on: "retry" }, DETECT).on_failure, { turn_on: "retry" });
  assert.equal(applyStateForm(device, base, DETECT).on_failure, undefined);
  // and it reads back
  const back = stateFormData({ entity_id: "x", on_failure: { turn_off: "stop" } }, DETECT);
  assert.equal(back.on_failure_on, "warn");
  assert.equal(back.on_failure_off, "stop");
});

test("state source none and a custom one set in YAML are kept", () => {
  assert.equal(applyStateForm({ entity_id: "x" }, { state_source: "none" }, DETECT).state_source, "none");
  const custom: Device = { entity_id: "x", state_source: { attribute: "detailed_state", on: ["on"] } };
  const data = stateFormData(custom, DETECT);
  assert.equal(data.state_source, "custom");
  assert.deepEqual(applyStateForm(custom, data, DETECT).state_source, custom.state_source);
});

test("without a profile the built-in defaults count", () => {
  assert.deepEqual(defaults(undefined), { timeout_on: 120, timeout_off: 300, debounce: 2 });
  assert.deepEqual(defaults({ ...DETECT, profile: { ...JVC, data: { timeouts: { on: 30 }, debounce: 1 } } }), {
    timeout_on: 30,
    timeout_off: 300,
    debounce: 1,
  });
});

test("Use these: the remote it found, and the outlet only when none is set", () => {
  assert.deepEqual(detectedChanges({ entity_id: "remote.jvc" }, DETECT), { remote_entity: "remote.jvc", power_switch: "switch.plug" });
  assert.deepEqual(detectedChanges({ entity_id: "remote.jvc", remote_entity: "remote.jvc", power_switch: "switch.other" }, DETECT), {});
  assert.deepEqual(detectedChanges({ entity_id: "x" }, undefined), {});
});

test("profile summary in words", () => {
  const lines = profileSummary(JVC, en);
  assert.equal(lines[0], "On / off from sensor · jvc_power_state");
  assert.equal(lines[1], "starting: warming · on: on · off: standby");
  assert.ok(lines.includes("Remote: remote"));
  assert.ok(lines.includes("Power-on order: early"));
  assert.ok(lines.some((l) => l.startsWith("Jobs: ")));
});

test("every new text exists in English and German", () => {
  const src = readFileSync(new URL("../src/panel/strings.ts", import.meta.url), "utf8");
  const en = src.slice(src.indexOf("  en: {"), src.indexOf("  de: {"));
  const de = src.slice(src.indexOf("  de: {"));
  const keys = (block: string) => new Set([...block.matchAll(/^\s{4}"?([\w.]+)"?:/gm)].map((m) => m[1]));
  const missing = [...keys(en)].filter((k) => !keys(de).has(k));
  assert.deepEqual(missing.filter((k) => /^(profile|detected|sum_|state_|wait\.|failure|field\.(wait|timeout|debounce|on_failure|profile)|flow\.status)/.test(k)), []);
});
