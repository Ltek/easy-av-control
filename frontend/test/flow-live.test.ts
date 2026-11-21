/** The live Flow: which row a running start is at, and the colour of a device's state. */
import assert from "node:assert/strict";
import { test } from "node:test";

import { currentRow, groups, rowStatuses, stateRole, type Row } from "../src/panel/flow-live";

const at: [number, number] = [0, 0];
const rows: Row[] = [
  { kind: "state", at, state: "starting" },
  { kind: "outlets_on", at, entities: ["switch.rack"] },
  { kind: "device", at, device: "lum", index: 1 },
  { kind: "ready", at, entity_id: "remote.lum" },
  { kind: "turn_on", at, device: "lum" },
  { kind: "status", at, device: "lum" },
  { kind: "device", at, device: "jvc", index: 2 },
  { kind: "turn_on", at, device: "jvc" },
  { kind: "status", at, device: "jvc" },
  { kind: "checks", at, count: 1 },
  { kind: "check", at, check: 1, device: "jvc" },
  { kind: "steps", at, count: 1 },
  { kind: "step", at, step: 1, step_type: "set_source" },
  { kind: "state", at, state: "active" },
];

test("rows are grouped under their device, the checks and the steps", () => {
  const under = groups(rows);
  assert.equal(under[3]?.device, "lum");
  assert.equal(under[8]?.device, "jvc");
  assert.equal(under[10]?.kind, "checks");
  assert.equal(under[13], undefined);
});

test("the current action finds its row, by device", () => {
  assert.equal(currentRow(rows, { kind: "power_on" }), 1);
  assert.equal(currentRow(rows, { kind: "ready", device: "lum" }), 3);
  assert.equal(currentRow(rows, { kind: "status", device: "jvc" }), 8);
  assert.equal(currentRow(rows, { kind: "checks" }), 9);
  assert.equal(currentRow(rows, { kind: "step", step: 1 }), 12);
  assert.equal(currentRow(rows, null), -1);
});

test("rows before the current one are done, its header stays active", () => {
  const s = rowStatuses(rows, { state: "starting", current: { kind: "turn_on", device: "jvc" } }, -1);
  assert.deepEqual(s.slice(0, 9), ["done", "done", "done", "done", "done", "done", "active", "active", "todo"]);
  assert.equal(s[13], "todo");
  // Between two actions (no current) the furthest row reached stays
  assert.equal(rowStatuses(rows, { state: "starting", current: null }, 7)[7], "active");
  assert.ok(rowStatuses(rows, { state: "active" }, -1).every((v) => v === "done"));
});

test("a device's state picks a theme colour", () => {
  assert.equal(stateRole("on"), "on");
  assert.equal(stateRole("starting"), "busy");
  assert.equal(stateRole("unavailable"), "unavailable");
  assert.equal(stateRole(undefined), "unknown");
});
