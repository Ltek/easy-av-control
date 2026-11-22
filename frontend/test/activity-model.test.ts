import { test } from "node:test";
import assert from "node:assert/strict";

import { renameDevice, withBefore, withoutDevice, type Activity, type Room } from "../src/panel/model";

const activity: Activity = {
  devices: ["jvc", "storm", "lumagen", "shield"],
  before: {
    lumagen: { delay: 3 },
    shield: { wait_for: [{ device: "storm", state: "on" }, { device: "lumagen", state: "picture" }] },
  },
};

test("removing a device takes it out of the order and of every wait", () => {
  const next = withoutDevice(activity, "lumagen");
  assert.deepEqual(next.devices, ["jvc", "storm", "shield"]);
  assert.deepEqual(next.before, { shield: { wait_for: [{ device: "storm", state: "on" }] } });
  assert.equal(withoutDevice(withoutDevice(next, "storm"), "jvc").before, undefined);
});

test("an empty Before is removed", () => {
  const next = withBefore(activity, "lumagen", { delay: 0 });
  assert.deepEqual(Object.keys(next.before ?? {}), ["shield"]);
  assert.deepEqual(withBefore(activity, "jvc", { delay: 2 }).before?.jvc, { delay: 2 });
});

test("renaming a device renames it in Before and in checks", () => {
  const room: Room = { devices: { lumagen: { entity_id: "switch.l" } }, activities: { a: { ...activity, checks: [{ device: "lumagen" }] } } };
  const next = renameDevice(room, "lumagen", "lp").activities!.a;
  assert.deepEqual(next.devices, ["jvc", "storm", "lp", "shield"]);
  assert.ok(next.before?.lp);
  assert.equal(next.before?.shield.wait_for?.[1].device, "lp");
  assert.equal((next.checks as { device: string }[])[0].device, "lp");
});
