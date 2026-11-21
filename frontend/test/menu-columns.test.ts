/** The menu's activity order and the card settings' columns by integration. */
import assert from "node:assert/strict";
import { test } from "node:test";

import { byIntegration, integrationTitle, sortedActivities, type Room } from "../src/panel/model";
import type { HomeAssistant } from "../src/types";

test("activities are listed by position, then name", () => {
  const room: Room = {
    activities: { tv: { name: "TV" }, movie: { name: "Movie", order: 1 }, apple: { name: "apple tv" } },
  } as Room;
  assert.deepEqual(sortedActivities(room).map(([id]) => id), ["movie", "apple", "tv"]);
  assert.deepEqual(sortedActivities(undefined), []);
});

test("an integration's domain becomes a heading", () => {
  assert.equal(integrationTitle("androidtv_remote"), "Androidtv Remote");
  assert.equal(integrationTitle("lumagen"), "Lumagen");
});

test("settings are grouped by the integration of their entity, else of their device", () => {
  const hass = {
    states: {},
    language: "en",
    entities: {
      "media_player.shield": { entity_id: "media_player.shield", platform: "androidtv" },
      "select.lumagen_input": { entity_id: "select.lumagen_input", platform: "lumagen" },
      "media_player.storm": { entity_id: "media_player.storm", platform: "stormaudio" },
    },
  } as unknown as HomeAssistant;
  const room = {
    devices: {
      shield: { entity_id: "media_player.shield" },
      lumagen: { entity_id: "media_player.lumagen" },
      storm: { entity_id: "media_player.storm" },
    },
  } as unknown as Room;
  const columns = byIntegration(hass, room, [
    { device: "storm", setting: "sound_mode" },
    { device: "lumagen", entity: "select.lumagen_input" },
    { device: "shield", setting: "source" },
    { device: "storm", setting: "source" },
    { device: "x", entity: "select.unknown" },
  ]);
  assert.deepEqual(
    columns.map(([p, list]) => [p, list.length]),
    [["stormaudio", 2], ["lumagen", 1], ["androidtv", 1], ["", 1]],
  );
});
