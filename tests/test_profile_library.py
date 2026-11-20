"""The profile library and its websocket commands, the Detected box, and status rows in the flow."""
from __future__ import annotations

from typing import Any

from pytest_homeassistant_custom_component.common import MockConfigEntry, flush_store

from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr, entity_registry as er

from custom_components.easy_av_control import websocket
from custom_components.easy_av_control.const import DOMAIN
from custom_components.easy_av_control.flow import plan_start, plan_stop
from custom_components.easy_av_control.profile_library import (
    DATA_LIBRARY,
    EXPORT_KIND,
    ProfileLibrary,
    async_get_library,
    profile_for_device,
)

JVC = "remote.jvc_projector"
JVC_POWER = "sensor.jvc_projector_power_state"
PLUG = "switch.theater_outlet"


def _register_jvc(hass: HomeAssistant) -> None:
    entry = MockConfigEntry(domain="jvc_projector_ha", data={"host": "192.168.50.73"})
    entry.add_to_hass(hass)
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=entry.entry_id, identifiers={("jvc_projector_ha", "jvc")}
    )
    reg = er.async_get(hass)
    reg.async_get_or_create("remote", "jvc_projector_ha", "jvc", config_entry=entry, device_id=device.id,
                            suggested_object_id="jvc_projector")
    reg.async_get_or_create("sensor", "jvc_projector_ha", "jvc_power", config_entry=entry, device_id=device.id,
                            suggested_object_id="jvc_projector_power_state", translation_key="jvc_power_state")
    hass.states.async_set(JVC, "off")
    hass.states.async_set(JVC_POWER, "warming")


def _mine(**over: Any) -> dict[str, Any]:
    return {"id": "jvc_mine", "name": "My JVC", "integration": "jvc_projector_ha",
            "device_entity": {"domain": "remote"},
            "indicator": {"entity": {"domain": "sensor", "translation_key": "jvc_power_state"},
                          "on": ["on"], "starting": ["warming"], "off": ["standby"]},
            "timeouts": {"on": 45}, **over}


# ------------------------------------------------------------------------------------------- library


async def test_library_save_load_delete(hass: HomeAssistant, hass_storage):
    library = await async_get_library(hass)
    assert "jvc_projector_ha" in library.builtin and not library.user
    saved = await library.async_save(_mine())
    assert saved.source == "user" and library.profiles["jvc_mine"] is saved
    await flush_store(library._store)
    again = ProfileLibrary(hass)
    await again.async_load()
    assert again.user["jvc_mine"].data["timeouts"] == {"on": 45}
    await library.async_delete("jvc_mine")
    assert "jvc_mine" not in library.profiles


async def test_library_refuses_built_in_ids_and_clashes(hass: HomeAssistant):
    library = await async_get_library(hass)
    import pytest
    import voluptuous as vol

    with pytest.raises(vol.Invalid, match="built-in"):
        await library.async_save(_mine(id="jvc_projector_ha"))
    await library.async_save(_mine())
    with pytest.raises(vol.Invalid, match="already have"):
        await library.async_save(_mine(name="Other"))
    # renaming an own profile is fine
    await library.async_save(_mine(id="jvc_theater"), previous_id="jvc_mine")
    assert "jvc_theater" in library.user and "jvc_mine" not in library.user
    with pytest.raises(vol.Invalid, match="can't be deleted"):
        await library.async_delete("lumagen")


async def test_the_merged_dict_is_kept_so_coordinators_see_changes(hass: HomeAssistant):
    library = await async_get_library(hass)
    seen = library.profiles
    await library.async_save(_mine())
    assert seen is library.profiles and "jvc_mine" in seen


async def test_duplicate_export_import(hass: HomeAssistant):
    library = await async_get_library(hass)
    copy = library.duplicate("jvc_projector_ha")
    assert copy["id"] == "jvc_projector_ha_mine" and copy["name"].endswith("(mine)")
    assert "tested" not in copy
    await library.async_save(copy)
    assert library.duplicate("jvc_projector_ha")["id"] == "jvc_projector_ha_mine_2"

    export = library.export(["jvc_projector_ha_mine", "lumagen"])
    # Exports are as written: no defaults filled in
    assert "stopping" not in export["profiles"]["lumagen"]["indicator"]
    assert "tested" not in export["profiles"]["lumagen"] and "match" not in export["profiles"]["lumagen"]
    assert export["kind"] == EXPORT_KIND and set(export["profiles"]) == {"jvc_projector_ha_mine", "lumagen"}
    result = await library.async_import(export)
    # Never overwrites: both ids were taken
    assert result["renamed"] == {"jvc_projector_ha_mine": "jvc_projector_ha_mine_2", "lumagen": "lumagen_2"}
    assert sorted(result["added"]) == ["jvc_projector_ha_mine_2", "lumagen_2"]
    assert library.profiles["lumagen_2"].source == "user"

    bad = await library.async_import({"kind": EXPORT_KIND, "v": 1, "profiles": {"x": {"name": "no id"}}})
    assert bad["added"] == [] and "x" in bad["invalid"]


async def test_profile_for_device_order(hass: HomeAssistant):
    _register_jvc(hass)
    library = await async_get_library(hass)
    assert profile_for_device(hass, library.profiles, {"entity_id": JVC}).id == "jvc_projector_ha"
    await library.async_save(_mine())
    assert profile_for_device(hass, library.profiles, {"entity_id": JVC}).id == "jvc_mine"  # yours wins
    chosen = profile_for_device(hass, library.profiles, {"entity_id": JVC, "profile": "jvc_projector_ha"})
    assert chosen.id == "jvc_projector_ha"                                                   # named wins
    assert profile_for_device(hass, library.profiles, {"entity_id": "media_player.x"}) is None


# ------------------------------------------------------------------------------------------- websocket


async def test_ws_profiles(hass: HomeAssistant, hass_ws_client):
    websocket.async_register(hass)
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": f"{DOMAIN}/profiles/list"})
    listed = (await client.receive_json())["result"]
    ids = [p["id"] for p in listed]
    assert ids[0] != "media_player" and ids.index("media_player") == len(ids) - 1  # generic last of built ins
    assert all(p["source"] == "builtin" for p in listed)

    await client.send_json_auto_id({"type": f"{DOMAIN}/profiles/duplicate", "profile_id": "stormaudio"})
    copy = (await client.receive_json())["result"]
    await client.send_json_auto_id({"type": f"{DOMAIN}/profiles/save", "profile": copy})
    saved = (await client.receive_json())["result"]
    assert saved["error"] is None and saved["profile"]["source"] == "user"

    await client.send_json_auto_id({"type": f"{DOMAIN}/profiles/save", "profile": {"id": "Bad Id"}})
    assert (await client.receive_json())["result"]["error"]["message"]

    await client.send_json_auto_id({"type": f"{DOMAIN}/profiles/export", "ids": [copy["id"]]})
    export = (await client.receive_json())["result"]
    await client.send_json_auto_id({"type": f"{DOMAIN}/profiles/import", "export": export})
    imported = (await client.receive_json())["result"]
    assert imported["renamed"] == {copy["id"]: f"{copy['id']}_2"}

    await client.send_json_auto_id({"type": f"{DOMAIN}/profiles/delete", "profile_id": "stormaudio"})
    assert "can't be deleted" in (await client.receive_json())["result"]["error"]["message"]
    await client.send_json_auto_id({"type": f"{DOMAIN}/profiles/delete", "profile_id": copy["id"]})
    assert (await client.receive_json())["result"]["error"] is None


async def test_ws_detect(hass: HomeAssistant, hass_ws_client):
    _register_jvc(hass)
    websocket.async_register(hass)
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": f"{DOMAIN}/config/detect", "entity_id": JVC})
    result = (await client.receive_json())["result"]
    assert result["profile"]["id"] == "jvc_projector_ha"
    assert result["found"]["indicator"] == JVC_POWER
    assert result["found"]["remote_entity"] == JVC
    assert result["state"]["group"] == "starting" and result["state"]["value"] == "warming"
    assert result["state"]["wait_on"] == "status"

    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/config/detect", "entity_id": JVC, "device": {"wait_on": "both"}}
    )
    assert (await client.receive_json())["result"]["state"]["wait_on"] == "both"

    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/config/detect", "entity_id": JVC, "device": {"state_source": "none"}}
    )
    result = (await client.receive_json())["result"]
    assert result["profile"]["id"] == "jvc_projector_ha" and result["state"] is None

    await client.send_json_auto_id({"type": f"{DOMAIN}/config/detect", "entity_id": "media_player.unknown"})
    assert (await client.receive_json())["result"]["profile"] is None


# ------------------------------------------------------------------------------------------- flow


def _room(**jvc: Any) -> dict[str, Any]:
    return {
        "name": "Kino",
        "devices": {"jvc": {"entity_id": JVC, "power_switch": PLUG, "delay_after_on": 30, "delay_after_off": 60,
                            "delay_after_power": 0, "commands": {}, **jvc}},
        "activities": {"movie": {"name": "Movie", "devices": ["jvc"], "steps": [], "on_start": [], "on_stop": [],
                                 "commands": {}}},
    }


async def test_flow_shows_status_waits(hass: HomeAssistant):
    _register_jvc(hass)
    await async_get_library(hass)
    start = plan_start(hass, "kino", _room(), "movie")
    kinds = [r["kind"] for r in start["rows"]]
    assert "status" in kinds and "wait" not in kinds
    status = next(r for r in start["rows"] if r["kind"] == "status")
    assert status["target"] == "on" and status["entity_id"] == JVC_POWER and status["timeout"] == 120
    assert start["done"] == [0, 120]

    both = plan_start(hass, "kino", _room(wait_on="both"), "movie")
    assert [r["kind"] for r in both["rows"]].count("wait") == 1 and both["done"] == [30, 150]

    stop = plan_stop(hass, "kino", _room(), "movie")
    cut = next(r for r in stop["rows"] if r["kind"] == "outlets_off")
    assert cut["after_status"] is True and cut["at"] == [0, 300] and cut["background"] is True


async def test_flow_without_a_profile_is_unchanged(hass: HomeAssistant):
    hass.data.pop(DATA_LIBRARY, None)
    start = plan_start(hass, "kino", _room(), "movie")
    assert "status" not in [r["kind"] for r in start["rows"]]
    assert start["done"] == [30, 30]
    stop = plan_stop(hass, "kino", _room(), "movie")
    cut = next(r for r in stop["rows"] if r["kind"] == "outlets_off")
    assert cut["at"] == [60, 60] and "after_status" not in cut
