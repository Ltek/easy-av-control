/** The profile form's pure parts: matchers from an example entity, finding it again, editing a path. */
import assert from "node:assert/strict";
import { test } from "node:test";

import { findEntity, matcherFor, setIn, unused, type SampleEntity } from "../src/panel/profile-form";

const e = (over: Partial<SampleEntity>): SampleEntity => ({
  entity_id: "sensor.x", name: "X", domain: "sensor", translation_key: null, device_class: null,
  unique_id_suffix: null, state: null, attributes: {}, values: [], main: false, ...over,
});

const POWER = e({ entity_id: "sensor.jvc_power", translation_key: "jvc_power_state", unique_id_suffix: "_power" });
const ISP_POWER = e({ entity_id: "switch.isp_power", domain: "switch", unique_id_suffix: "_power" });
const ISP_MUTE = e({ entity_id: "switch.isp_mute", domain: "switch", unique_id_suffix: "_mute" });
const SCREEN = e({ entity_id: "binary_sensor.tv_screen", domain: "binary_sensor", device_class: "power" });

test("matchers: translation key first, then unique-ID suffix, then device class, never the entity ID", () => {
  assert.deepEqual(matcherFor(POWER), { domain: "sensor", translation_key: "jvc_power_state" });
  assert.deepEqual(matcherFor(ISP_POWER), { domain: "switch", unique_id_suffix: "_power" });
  assert.deepEqual(matcherFor(SCREEN), { domain: "binary_sensor", device_class: "power" });
  assert.deepEqual(matcherFor(e({ domain: "remote" })), { domain: "remote" });
});

test("findEntity finds what the matcher stands for", () => {
  const all = [POWER, ISP_MUTE, ISP_POWER, SCREEN];
  for (const entity of all) assert.equal(findEntity(all, matcherFor(entity))?.entity_id, entity.entity_id);
  assert.equal(findEntity(all, { domain: "switch", unique_id_suffix: "_dim" }), undefined);
  assert.equal(findEntity(all, undefined), undefined);
});

test("setIn edits a path and removes what becomes empty", () => {
  const p = { id: "x", indicator: { on: ["on"] } };
  assert.deepEqual(setIn(p, ["indicator", "starting"], ["warming"]), { id: "x", indicator: { on: ["on"], starting: ["warming"] } });
  assert.deepEqual(setIn(p, ["indicator", "on"], []), { id: "x" });
  assert.deepEqual(setIn(p, ["timeouts", "on"], 90), { ...p, timeouts: { on: 90 } });
  assert.deepEqual(setIn({ ...p, timeouts: { on: 90 } }, ["timeouts", "on"], undefined), p);
  assert.deepEqual(setIn(p, ["name"], ""), p);
  assert.deepEqual(p, { id: "x", indicator: { on: ["on"] } }); // the input is left alone
});

test("a value already in another state group isn't offered again", () => {
  const ind = { on: ["on", "idle"], off: ["off"] };
  assert.deepEqual(unused(["on", "off", "warming"], ind, "starting"), ["warming"]);
  assert.deepEqual(unused(["on", "off", "warming"], ind, "off"), ["off", "warming"]); // its own: hidden by the chips
});
