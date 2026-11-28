/** Reports: statistics, grouping and formats. */
import assert from "node:assert/strict";
import { test } from "node:test";

import { deviation, duration, laneColor, laneOnAt, laneTook, runGroups, stats, type Lane, type Run } from "../src/panel/reports-model";

test("stats use only the good times; failures are counted", () => {
  const s = stats([
    { seconds: 10, ok: true },
    { seconds: 30, ok: true },
    { seconds: 20, ok: true },
    { seconds: 99, ok: false },
  ]);
  assert.deepEqual(s, { count: 4, typical: 20, fastest: 10, slowest: 30, last: 20, spread: 20, failed: 1 });
  assert.equal(stats([]).typical, null);
});

test("runs are grouped by room, activity, mode and where a start came from", () => {
  const run = (activity: string, mode: "start" | "stop", from?: string) =>
    ({ room: "r", activity, mode, from, at: "", seconds: 1, result: "ok", phases: [] }) as unknown as Run;
  const groups = runGroups([run("tv", "start"), run("tv", "start", "movie"), run("tv", "start"), run("tv", "stop")]);
  assert.deepEqual(groups.map((g) => g.runs.length), [2, 1, 1]);
});

test("durations and deviations read well", () => {
  assert.equal(duration(8.43), "8.4 s");
  assert.equal(duration(65), "1:05");
  assert.equal(duration(null), "–");
  assert.equal(deviation(30, 20), "+50 %");
  assert.equal(deviation(21, 20), "");
  assert.equal(deviation(10, 20), "-50 %");
});

test("a status is coloured: off red, standby grey, warming yellow, idle blue, on green", () => {
  assert.equal(laneColor("off", "off"), "off");
  assert.equal(laneColor("standby", "off"), "standby");
  assert.equal(laneColor("warming", "starting"), "busy");
  assert.equal(laneColor("initializing", "starting"), "busy");
  assert.equal(laneColor("cooling", "stopping"), "busy");
  assert.equal(laneColor("idle", "on"), "idle");
  assert.equal(laneColor("on", "on"), "on");
  assert.equal(laneColor("No Source", "on"), "on", "a Lumagen word that counts as on");
  assert.equal(laneColor("error", "error"), "error");
  assert.equal(laneColor("unavailable", "off"), "unavailable");
  assert.equal(laneColor(null, "unknown"), "unavailable");
});

test("the time a device took is from switching it on until its status said on, not from the run's start", () => {
  const lane: Lane = {
    device: "shield", name: "Shield", entity_id: "media_player.shield", sent: 38.9,
    segments: [
      { start: 0, end: 40.6, value: "off", group: "off" },
      { start: 40.6, end: 54.2, value: "on", group: "on" },
    ],
  };
  assert.equal(laneOnAt(lane), 40.6);
  assert.equal(laneTook(lane), 1.7, "40.6 into the run, switched on at 38.9");
  const jvc: Lane = {
    device: "jvc", name: "JVC", entity_id: "sensor.jvc", sent: 0,
    segments: [
      { start: 0, end: 0.2, value: "standby", group: "off" },
      { start: 0.2, end: 36.8, value: "warming", group: "starting" },
      { start: 36.8, end: 54.2, value: "on", group: "on" },
    ],
  };
  assert.equal(laneTook(jvc), 36.8);
  assert.ok(laneTook(jvc)! > laneTook(lane)!, "the JVC took longer");
  assert.equal(laneTook({ ...jvc, sent: null }), null, "on already: nothing was sent");
  const old: Lane = { ...jvc };
  delete old.sent;
  assert.equal(laneTook(old), null, "a lane recorded without when it was switched on");
  assert.equal(laneTook({ ...jvc, segments: jvc.segments.slice(0, 2) }), null, "never said on");
});
