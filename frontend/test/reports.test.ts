/** Reports: statistics, grouping and formats. */
import assert from "node:assert/strict";
import { test } from "node:test";

import { deviation, duration, runGroups, stats, type Run } from "../src/panel/reports-model";

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
