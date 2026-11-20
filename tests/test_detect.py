"""Detect integrations (detect.py): new devices, better integrations, gone and renamed entities, applying the
ticked changes, starter activities, + Profile drafts, and the Lumagen picture check step.

A made-up home: a theater area with a room already set up (StormAudio, one activity), a JVC projector and a
Lumagen not in any room yet; a living room area with a TV covered by PiPup, ADB and Android TV Remote (one IP
address, different MACs) and a two-zone Yamaha receiver; and a Sonos speaker, whose integration has no profile.
"""
from __future__ import annotations

import asyncio
from typing import Any

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from homeassistant.core import HomeAssistant
from homeassistant.helpers import (
    area_registry as ar,
    device_registry as dr,
    entity_registry as er,
)

from .common import Devices, setup
from custom_components.easy_av_control.detect import (
    Seen,
    apply_detect,
    detect_all,
    draft_profile,
    starter_activities,
)
from custom_components.easy_av_control.device_profiles import load_profiles
from custom_components.easy_av_control.model import async_validate_config
from custom_components.easy_av_control.profile_library import async_get_library

TV_HOST = "192.168.50.53"


def _entry(hass, domain, host=None):
    entry = MockConfigEntry(domain=domain, data={"host": host} if host else {})
    entry.add_to_hass(hass)
    return entry


def _device(hass, entry, ident, mac=None, area=None):
    reg = dr.async_get(hass)
    device = reg.async_get_or_create(
        config_entry_id=entry.entry_id,
        identifiers={(entry.domain, ident)},
        connections={(dr.CONNECTION_NETWORK_MAC, mac)} if mac else set(),
    )
    if area:
        reg.async_update_device(device.id, area_id=area)
    return device.id


def _entity(hass, entry, device_id, domain, uid, object_id, name=None, state="off", attrs=None, **kw):
    entity_id = er.async_get(hass).async_get_or_create(
        domain, entry.domain, uid, config_entry=entry, device_id=device_id, suggested_object_id=object_id, **kw
    ).entity_id
    hass.states.async_set(entity_id, state, {"friendly_name": name or object_id, **(attrs or {})})
    return entity_id


@pytest.fixture
def home(hass: HomeAssistant) -> dict[str, str]:
    areas = ar.async_get(hass)
    theater = areas.async_create("Theater").id
    living = areas.async_create("Living Room").id
    ids: dict[str, str] = {"theater": theater, "living": living}

    storm = _entry(hass, "stormaudio", "192.168.50.75")
    dev = _device(hass, storm, "isp", area=theater)
    ids["isp"] = _entity(hass, storm, dev, "media_player", "isp", "isp", "StormAudio ISP", attrs={"detailed_state": "off"})
    ids["isp_power"] = _entity(hass, storm, dev, "switch", "isp_power", "isp_power")

    jvc = _entry(hass, "jvc_projector_ha", "192.168.50.73")
    dev = _device(hass, jvc, "jvc", mac="e0:da:dc:25:49:04", area=theater)
    ids["jvc"] = _entity(hass, jvc, dev, "remote", "jvc", "jvc_projector", "JVC Projector")
    ids["jvc_power"] = _entity(hass, jvc, dev, "sensor", "jvc_power", "jvc_projector_power_state",
                               state="standby", translation_key="jvc_power_state")

    lum = _entry(hass, "lumagen", "192.168.50.69")
    dev = _device(hass, lum, "lumagen", area=theater)
    ids["lum"] = _entity(hass, lum, dev, "switch", "L_power", "lumagen_power", "Lumagen", translation_key="power")
    ids["lum_remote"] = _entity(hass, lum, dev, "remote", "L_remote", "lumagen")
    ids["lum_video"] = _entity(hass, lum, dev, "sensor", "L_video", "lumagen_input_video_status",
                               state="unavailable", translation_key="input_video_status")

    pip = _entry(hass, "pipup", TV_HOST)
    dev = _device(hass, pip, "tv-pipup", area=living)
    ids["tv_pipup"] = _entity(hass, pip, dev, "media_player", "abc_media_player", "living_room_tv", "Living Room TV")
    ids["tv_screen"] = _entity(hass, pip, dev, "binary_sensor", "abc_screen", "living_room_tv_screen", translation_key="screen")
    adb = _entry(hass, "androidtv", TV_HOST)
    dev = _device(hass, adb, "tv-adb", mac="d8:14:df:d9:60:35")
    ids["tv_adb"] = _entity(hass, adb, dev, "media_player", "d8_adb", "living_room_adb", "Living Room (ADB)")
    ids["tv_adb_remote"] = _entity(hass, adb, dev, "remote", "d8_adb", "living_room_adb")
    atvr = _entry(hass, "androidtv_remote", TV_HOST)
    dev = _device(hass, atvr, "tv-atvr", mac="f0:35:75:c6:74:db")
    ids["tv_atvr"] = _entity(hass, atvr, dev, "media_player", "f0_atvr", "androidtv_livingroom")

    yam = _entry(hass, "yamaha_musiccast", "192.168.50.80")
    dev = _device(hass, yam, "yamaha", area=living)
    ids["yam_main"] = _entity(hass, yam, dev, "media_player", "Y_main", "musiccast_ceiling", "Ceiling", translation_key="zone")
    ids["yam_zone2"] = _entity(hass, yam, dev, "media_player", "Y_zone2", "musiccast_deck", "Deck", translation_key="zone")

    sonos = _entry(hass, "sonos")
    ids["sonos"] = _entity(hass, sonos, _device(hass, sonos, "s1", area=living), "media_player", "RINCON", "office_sonos")
    return ids


def _rooms(home) -> dict[str, Any]:
    return {
        "kino": {
            "name": "Kino",
            "area_id": home["theater"],
            "devices": {"isp": {"entity_id": home["isp"]}},
            "activities": {"movie": {"name": "Movie", "devices": ["isp"]}},
        }
    }


def _by_entity(items, entity_id):
    return next(i for i in items if i["entity_id"] == entity_id)


# ------------------------------------------------------------------------------------------- detect


async def test_new_devices_go_to_the_room_of_their_area(hass: HomeAssistant, home):
    result = detect_all(hass, load_profiles(), _rooms(home))
    new = {i["entity_id"]: i for i in result["new"]}
    # StormAudio is in a room already; Sonos has no profile; the TV is one device, not three
    assert set(new) == {home["jvc"], home["lum"], home["tv_pipup"], home["yam_main"], home["yam_zone2"]}

    jvc = new[home["jvc"]]
    assert jvc["room"] == "kino" and jvc["activities"] == ["movie"] and jvc["order"] == "early"
    assert jvc["device"] == {"entity_id": home["jvc"], "name": "JVC Projector", "remote_entity": home["jvc"]}

    lum = new[home["lum"]]
    assert lum["picture"] is True and lum["device"]["remote_entity"] == home["lum_remote"]

    tv = new[home["tv_pipup"]]
    assert tv["integration"] == "pipup"                                  # power: the fastest
    assert tv["device"]["remote_entity"] == home["tv_adb_remote"]        # arrow keys: ADB
    assert tv["integrations"] == ["androidtv", "androidtv_remote", "pipup"]
    assert tv["room"] is None and tv["new_room"] == "living_room" and tv["new_room_name"] == "Living Room"

    assert result["unmatched"] == ["sonos"]
    assert result["gone"] == [] and result["renamed"] == [] and result["better"] == []


async def test_a_better_integration_is_offered_for_a_device_in_a_room(hass: HomeAssistant, home):
    rooms = {"lr": {"name": "LR", "devices": {"tv": {"entity_id": home["tv_adb"]}}, "activities": {}}}
    result = detect_all(hass, load_profiles(), rooms)
    assert result["better"] == [
        {"room": "lr", "device": "tv", "path": "devices.tv.entity_id", "entity_id": home["tv_adb"],
         "integration": "androidtv", "replacement": home["tv_pipup"], "replacement_integration": "pipup"}
    ]
    assert home["tv_pipup"] not in {i["entity_id"] for i in result["new"]}  # it's that same TV


async def test_gone_entities_get_a_replacement_from_the_same_device(hass: HomeAssistant, home):
    rooms = {"lr": {"name": "LR", "devices": {"tv": {"entity_id": home["tv_atvr"], "remote_entity": "remote.atvr_gone"}},
                    "activities": {}}}
    seen = Seen(hass)
    seen.remember(rooms)
    assert seen.data[home["tv_atvr"]]["hosts"] == [TV_HOST]
    # Android TV Remote is removed
    seen.data["remote.atvr_gone"] = {"id": "gone", "platform": "androidtv_remote", "domain": "remote",
                                     "hosts": [TV_HOST], "macs": []}
    er.async_get(hass).async_remove(home["tv_atvr"])
    hass.states.async_remove(home["tv_atvr"])

    gone = detect_all(hass, load_profiles(), rooms, seen)["gone"]
    assert _by_entity(gone, home["tv_atvr"])["replacement"] == home["tv_pipup"]
    remote = _by_entity(gone, "remote.atvr_gone")
    assert remote["replacement"] == home["tv_adb_remote"] and remote["replacement_integration"] == "androidtv"


async def test_gone_without_a_trace_has_no_replacement(hass: HomeAssistant, home):
    rooms = {"lr": {"name": "LR", "devices": {"x": {"entity_id": "media_player.never_seen"}}, "activities": {}}}
    gone = detect_all(hass, load_profiles(), rooms, Seen(hass))["gone"]
    assert gone == [{"room": "lr", "path": "devices.x.entity_id", "entity_id": "media_player.never_seen",
                     "integration": None, "replacement": None, "replacement_integration": None}]


async def test_renamed_entities_are_found_by_their_registry_id(hass: HomeAssistant, home):
    rooms = {"kino": {"name": "Kino", "devices": {"isp": {"entity_id": home["isp"], "power_switch": home["isp_power"]}},
                      "activities": {}}}
    seen = Seen(hass)
    seen.remember(rooms)
    er.async_get(hass).async_update_entity(home["isp_power"], new_entity_id="switch.theater_processor_power")
    hass.states.async_remove(home["isp_power"])
    result = detect_all(hass, load_profiles(), rooms, seen)
    assert result["renamed"] == [{"old": home["isp_power"], "new": "switch.theater_processor_power",
                                  "uses": [{"room": "kino", "path": "devices.isp.power_switch"}]}]
    assert result["gone"] == []


# ------------------------------------------------------------------------------------------- apply


async def test_apply_puts_devices_in_the_power_on_order_with_the_picture_check(hass: HomeAssistant, home):
    profiles = load_profiles()
    rooms = _rooms(home)
    result = detect_all(hass, profiles, rooms)
    choices = {"new": [i for i in result["new"] if i["room"] == "kino"]}
    out = apply_detect(hass, profiles, rooms, choices)
    kino = out["kino"]
    assert set(kino["devices"]) == {"isp", "jvc_projector", "lumagen"}
    # projector and Lumagen early, before the processor (middle)
    order = kino["activities"]["movie"]["devices"]
    assert order[-1] == "isp" and set(order[:2]) == {"jvc_projector", "lumagen"}
    assert kino["activities"]["movie"]["steps"] == [{"type": "wait_picture", "device": "lumagen"}]
    assert rooms["kino"]["activities"]["movie"]["devices"] == ["isp"]   # the input is left alone
    # and it validates
    await async_validate_config(hass, {"rooms": out})


async def test_apply_creates_rooms_with_starter_activities(hass: HomeAssistant, home):
    profiles = load_profiles()
    result = detect_all(hass, profiles, {})
    out = apply_detect(hass, profiles, {}, {"new": result["new"], "starter": True})
    assert set(out) == {"theater", "living_room"}
    living = out["living_room"]
    assert living["area_id"] == home["living"] and living["name"] == "Living Room"
    # one activity per source (the TV), with the room's audio first
    assert living["activities"] == {
        "living_room_tv": {"name": "Living Room TV", "order": 1,
                           "devices": ["ceiling", "deck", "living_room_tv"], "steps": []}
    }
    theater = out["theater"]
    # no source in the theater: one activity with everything, Lumagen's picture check last
    assert list(theater["activities"]) == ["on"]
    assert theater["activities"]["on"]["steps"] == [{"type": "wait_picture", "device": "lumagen"}]
    await async_validate_config(hass, {"rooms": out})


async def test_apply_without_starter_leaves_new_rooms_without_activities(hass: HomeAssistant, home):
    profiles = load_profiles()
    out = apply_detect(hass, profiles, {}, {"new": detect_all(hass, profiles, {})["new"]})
    assert all(room["activities"] == {} for room in out.values())


async def test_apply_unticked_activities_are_left_alone(hass: HomeAssistant, home):
    profiles = load_profiles()
    rooms = _rooms(home)
    jvc = _by_entity(detect_all(hass, profiles, rooms)["new"], home["jvc"])
    out = apply_detect(hass, profiles, rooms, {"new": [{**jvc, "activities": []}]})
    assert "jvc_projector" in out["kino"]["devices"]
    assert out["kino"]["activities"]["movie"]["devices"] == ["isp"]


async def test_apply_renamed_skips_actions_and_commands(hass: HomeAssistant):
    rooms = {"r": {"name": "R",
                   "devices": {"a": {"entity_id": "switch.old", "commands": {"x": [{"action": "switch.toggle", "target": {"entity_id": "switch.old"}}]}}},
                   "activities": {"m": {"name": "M", "devices": ["a"],
                                        "steps": [{"type": "wait_available", "entity_id": "switch.old"},
                                                  {"type": "call_action", "action": "switch.toggle", "target": {"entity_id": "switch.old"}}],
                                        "on_start": [{"action": "switch.turn_on", "target": {"entity_id": "switch.old"}}]}}}}
    out = apply_detect(hass, {}, rooms, {"renamed": [{"old": "switch.old", "new": "switch.new"}]})
    r = out["r"]
    assert r["devices"]["a"]["entity_id"] == "switch.new"
    assert r["activities"]["m"]["steps"][0]["entity_id"] == "switch.new"
    assert r["devices"]["a"]["commands"]["x"][0]["target"]["entity_id"] == "switch.old"
    assert r["activities"]["m"]["steps"][1]["target"]["entity_id"] == "switch.old"
    assert r["activities"]["m"]["on_start"][0]["target"]["entity_id"] == "switch.old"


async def test_apply_replacements(hass: HomeAssistant):
    rooms = {"r": {"name": "R", "devices": {"tv": {"entity_id": "media_player.a", "remote_entity": "remote.a"}}, "activities": {}}}
    out = apply_detect(hass, {}, rooms, {"gone": [{"room": "r", "path": "devices.tv.remote_entity", "replacement": "remote.b"},
                                                  {"room": "r", "path": "devices.tv.entity_id", "replacement": None}]})
    assert out["r"]["devices"]["tv"] == {"entity_id": "media_player.a", "remote_entity": "remote.b"}


def test_starter_without_devices_is_empty(hass: HomeAssistant):
    assert starter_activities(hass, {}, {"devices": {}}, set()) == {"on": {"name": "On", "order": 1, "devices": [], "steps": []}}


# ------------------------------------------------------------------------------------------- + Profile


async def test_draft_profile_for_an_integration_without_one(hass: HomeAssistant, home):
    draft = draft_profile(hass, "sonos")
    assert draft["device_entity"] == home["sonos"] and draft["watch"] == home["sonos"]
    profile = draft["profile"]
    assert profile["id"] == "sonos" and profile["integration"] == "sonos"
    assert profile["device_entity"] == {"domain": "media_player"}
    assert profile["indicator"] == {"off": ["off"]}
    assert draft_profile(hass, "nothing_here") is None
    # The draft is a valid profile
    library = await async_get_library(hass)
    await library.async_save(profile)


async def test_draft_finds_a_power_sensor(hass: HomeAssistant, home):
    draft = draft_profile(hass, "jvc_projector_ha")
    assert draft["profile"]["indicator"]["entity"] == {"domain": "sensor", "translation_key": "jvc_power_state"}
    assert draft["watch"] == home["jvc_power"] and draft["profile"]["indicator"]["off"] == ["standby"]


# ------------------------------------------------------------------------------------------- wait_picture


async def test_wait_picture_step(hass: HomeAssistant, home):
    library = await async_get_library(hass)
    lumagen = dict(library.builtin["lumagen"].raw)
    lumagen.update(id="lumagen_fast", picture={**lumagen["picture"], "debounce": 0.05, "timeout": 1})
    await library.async_save(lumagen)
    hass.states.async_set(home["lum_video"], "No Source")
    devices = Devices(hass)
    data = {"rooms": {"kino": {"name": "Kino",
                               "devices": {"lum": {"entity_id": home["lum"], "name": "Lumagen", "state_source": "none"}},
                               "activities": {"movie": {"name": "Movie", "devices": ["lum"],
                                                        "steps": [{"type": "wait_picture", "device": "lum"}]}}}}}
    coordinator = await setup(hass, devices, data)

    async def picture():
        await asyncio.sleep(0.2)
        hass.states.async_set(home["lum_video"], "Active Video")

    task = asyncio.ensure_future(picture())
    await coordinator.async_start_activity("kino", "movie")
    await task
    assert coordinator.runtime("kino").state == "active" and coordinator.runtime("kino").warnings == []

    hass.states.async_set(home["lum_video"], "No Source")
    await coordinator.async_stop_activity("kino")
    await coordinator.async_start_activity("kino", "movie")
    assert coordinator.runtime("kino").warnings == ["Lumagen has no picture after 1 s, it shows No Source"]
