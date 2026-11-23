import { test } from "node:test";
import assert from "node:assert/strict";

import { exportActivities, importActivities, uniqueName, type Room } from "../src/panel/model";

const theater: Room = {
  devices: {
    jvc: { entity_id: "remote.jvc_projector" },
    lumagen: { entity_id: "switch.lumagen_radiancepro_power", wait_on: "status", ready: { timeout: 60 } },
    shield: { entity_id: "media_player.shield_tv_remote" },
    spare: { entity_id: "switch.spare" },
  },
  activities: {
    movie: {
      name: "Movie",
      devices: ["jvc", "lumagen", "shield"],
      before: { shield: { wait_for: [{ device: "lumagen", state: "picture" }] } },
      checks: [{ device: "lumagen" }],
      remote: { navigation: "shield" },
      started_by: [{ entity_id: "select.harmony_hub_activities", state: "On" }],
    },
    music: { name: "Music", devices: ["lumagen"] },
  },
};

const exported = () => JSON.parse(JSON.stringify(exportActivities(theater, ["movie"])));

test("an export holds the activity and only the devices it needs", () => {
  const env = exportActivities(theater, ["movie"]) as { activities: object; devices: object };
  assert.deepEqual(Object.keys(env.activities), ["movie"]);
  assert.deepEqual(Object.keys(env.devices).sort(), ["jvc", "lumagen", "shield"]);
});

test("an import replaces the activity's Flow, and leaves the devices as they are", () => {
  const env = exported();
  env.activities.movie.devices = ["jvc", "lumagen", "shield"];
  env.activities.movie.flow = { lumagen: { wait_on: "none" } };
  env.devices.lumagen = { entity_id: "switch.lumagen_radiancepro_power", name: "Changed" };
  const result = importActivities(theater, env);
  assert.deepEqual(result.replaced, { movie: "Movie" });
  assert.deepEqual(result.added, {});
  assert.deepEqual(result.room.activities!.movie.flow, { lumagen: { wait_on: "none" } });
  assert.deepEqual(result.room.devices!.lumagen, theater.devices!.lumagen);
  assert.ok(result.room.activities!.movie.started_by);
  assert.equal(Object.keys(result.room.activities!).length, 2);
});

test("an old export's device waits go into the activity's Flow", () => {
  const env = exported();
  env.devices.lumagen = { entity_id: "switch.lumagen_radiancepro_power", wait_on: "none", ready: { timeout: 9 } };
  const other: Room = { devices: {} };
  const result = importActivities(other, env);
  assert.deepEqual(result.room.devices!.lumagen, { entity_id: "switch.lumagen_radiancepro_power" });
  assert.deepEqual(result.room.activities!.movie.flow?.lumagen, { wait_on: "none", ready: { timeout: 9 } });
});

test("as a copy it is added with a numeral, without Started by", () => {
  const result = importActivities(theater, exported(), true);
  assert.deepEqual(result.added, { movie_2: "Movie 2" });
  assert.deepEqual(result.startedByDropped, ["Movie"]);
  assert.equal(result.room.activities!.movie_2.started_by, undefined);
});

test("into another room devices are matched by entity and the rest added", () => {
  const other: Room = { devices: { projector: { entity_id: "remote.jvc_projector" }, shield: { entity_id: "media_player.other" } } };
  const result = importActivities(other, exported());
  assert.deepEqual(result.devicesReplaced, ["projector"]);
  assert.deepEqual(result.devicesAdded.sort(), ["lumagen", "shield_2"]);
  const movie = result.room.activities!.movie;
  assert.deepEqual(movie.devices, ["projector", "lumagen", "shield_2"]);
  assert.equal(movie.before?.shield_2.wait_for?.[0].device, "lumagen");
  assert.equal((movie.remote as { navigation: string }).navigation, "shield_2");
});

test("names", () => {
  assert.equal(uniqueName("Watch Show", ["watch show"]), "Watch Show 2");
  assert.equal(uniqueName("Watch Show", ["Watch Show", "Watch Show 2"]), "Watch Show 3");
  assert.equal(uniqueName("TV", ["Movie"]), "TV");
});

test("something else is refused", () => {
  assert.throws(() => importActivities(theater, { format: "profiles" }));
});
