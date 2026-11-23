import { test } from "node:test";
import assert from "node:assert/strict";

import { exportActivities, importActivities, type Room } from "../src/panel/model";

const theater: Room = {
  devices: {
    jvc: { entity_id: "remote.jvc_projector" },
    lumagen: { entity_id: "switch.lumagen_radiancepro_power" },
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
  },
};

test("an export holds the activity and only the devices it needs", () => {
  const env = exportActivities(theater, ["movie"]) as { activities: object; devices: object };
  assert.deepEqual(Object.keys(env.activities), ["movie"]);
  assert.deepEqual(Object.keys(env.devices).sort(), ["jvc", "lumagen", "shield"]);
});

test("importing into the same room makes a copy that uses the same devices", () => {
  const result = importActivities(theater, JSON.parse(JSON.stringify(exportActivities(theater, ["movie"]))));
  assert.deepEqual(Object.keys(result.added), ["movie_2"]);
  assert.deepEqual(result.devicesAdded, []);
  assert.deepEqual(result.startedByDropped, ["Movie"]);
  assert.equal(result.room.activities!.movie_2.started_by, undefined);
  assert.equal(Object.keys(result.room.devices!).length, 4);
});

test("importing into another room matches devices by entity and adds the rest", () => {
  const other: Room = { devices: { projector: { entity_id: "remote.jvc_projector" }, shield: { entity_id: "media_player.other" } } };
  const result = importActivities(other, exportActivities(theater, ["movie"]));
  assert.deepEqual(result.matched, { jvc: "projector" });
  assert.deepEqual(result.devicesAdded.sort(), ["lumagen", "shield_2"]);
  const movie = result.room.activities!.movie;
  assert.deepEqual(movie.devices, ["projector", "lumagen", "shield_2"]);
  assert.equal(movie.before?.shield_2.wait_for?.[0].device, "lumagen");
  assert.equal((movie.remote as { navigation: string }).navigation, "shield_2");
  assert.ok(movie.started_by);
});

test("something else is refused", () => {
  assert.throws(() => importActivities(theater, { format: "profiles" }));
});
