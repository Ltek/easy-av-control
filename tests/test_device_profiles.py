"""Profiles (device_profiles.py): loading, matching, resolving, classifying, grouping physical devices.

The registry below is made up but shaped like a real home: a TV covered by PiPup, ADB and Android TV Remote with
different MAC addresses (Wi-Fi vs Ethernet) but one IP address, a Cast entry that covers several devices, a JVC
projector, a StormAudio processor, a Lumagen and a two-zone Yamaha MusicCast receiver.
"""
from __future__ import annotations

from pathlib import Path

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry
import voluptuous as vol

from homeassistant.const import STATE_UNAVAILABLE
from homeassistant.core import HomeAssistant, State
from homeassistant.helpers import device_registry as dr, entity_registry as er

from custom_components.easy_av_control import device_profiles as dp
from custom_components.easy_av_control.control import _REMOTE_KEY_NAMES

TV_HOST = "192.168.50.53"


def test_every_builtin_profile_is_valid():
    profiles = dp.load_profiles()
    assert set(profiles) == {
        "androidtv",
        "androidtv_remote",
        "cast",
        "jvc_projector_ha",
        "harmony",
        "lumagen",
        "media_player",
        "pipup",
        "stormaudio",
        "yamaha_musiccast",
    }
    # One file per profile, named after its id
    files = {p.stem for p in dp.PROFILES_DIR.glob("*.yaml")}
    assert files == set(profiles)
    assert all(p.data["tested"] for p in profiles.values())


def test_bare_on_off_in_yaml_is_refused(tmp_path: Path):
    """YAML reads a bare on / off as true / false, which would never match a state."""
    with pytest.raises(vol.Invalid, match="quote on / off"):
        dp.validate_profile(
            {"id": "x", "name": "X", "integration": "x", "device_entity": {"domain": "media_player"},
             "indicator": {"on": [True]}}
        )
    (tmp_path / "bad.yaml").write_text(
        "id: bad\nname: Bad\nintegration: bad\ndevice_entity: {domain: media_player}\nindicator:\n  on: [on]\n"
    )
    (tmp_path / "good.yaml").write_text(
        'id: good\nname: Good\nintegration: good\ndevice_entity: {domain: media_player}\nindicator:\n  "on": ["on"]\n'
    )
    assert set(dp.load_profiles(tmp_path)) == {"good"}


def test_androidtv_remote_keys_match_what_control_sends_today():
    """The profile carries the key names control.py hard-codes; they must not drift apart."""
    profiles = dp.load_profiles()
    assert profiles["androidtv_remote"].remote_keys == _REMOTE_KEY_NAMES["androidtv_remote"]


def test_profile_for_falls_back_to_the_generic_one():
    profiles = dp.load_profiles()
    assert dp.profile_for(profiles, "jvc_projector_ha").id == "jvc_projector_ha"
    assert dp.profile_for(profiles, "sonos").id == "media_player"
    assert dp.profile_for(profiles, None).id == "media_player"


def test_a_profile_naming_a_model_beats_the_plain_one():
    plain = dp.validate_profile({"id": "a", "name": "A", "integration": "x", "device_entity": {"domain": "remote"}})
    model = dp.validate_profile(
        {"id": "b", "name": "B", "integration": "x", "match": {"model": "NZ"}, "device_entity": {"domain": "remote"}}
    )
    assert dp.profile_for([plain, model], "x", model="DLA-NZ8").id == "b"
    assert dp.profile_for([plain, model], "x", model="DLA-RS2100").id == "a"


# ------------------------------------------------------------------------------------------- classify


def _state(value: str, **attrs) -> State:
    return State("sensor.x", value, attrs)


def test_classify_jvc_power_states():
    indicator = dp.load_profiles()["jvc_projector_ha"].indicator
    assert dp.classify(indicator, _state("standby")) == dp.GROUP_OFF
    assert dp.classify(indicator, _state("warming")) == dp.GROUP_STARTING
    assert dp.classify(indicator, _state("on")) == dp.GROUP_ON
    assert dp.classify(indicator, _state("cooling")) == dp.GROUP_STOPPING
    assert dp.classify(indicator, _state("error")) == dp.GROUP_ERROR
    assert dp.classify(indicator, _state(STATE_UNAVAILABLE)) == dp.GROUP_UNKNOWN
    assert dp.classify(indicator, None) == dp.GROUP_UNKNOWN


def test_classify_stormaudio_reads_the_attribute_not_the_state():
    indicator = dp.load_profiles()["stormaudio"].indicator
    assert dp.classify(indicator, _state("on", detailed_state="initializing")) == dp.GROUP_STARTING
    assert dp.classify(indicator, _state("on", detailed_state="on")) == dp.GROUP_ON
    assert dp.classify(indicator, _state("on", detailed_state="shutting down")) == dp.GROUP_STOPPING
    assert dp.classify(indicator, _state("off", detailed_state="off")) == dp.GROUP_OFF
    assert dp.classify(indicator, _state("on")) == dp.GROUP_UNKNOWN  # no attribute yet


def test_classify_lumagen_is_on_while_its_sensor_is_available():
    indicator = dp.load_profiles()["lumagen"].indicator
    assert dp.classify(indicator, _state(STATE_UNAVAILABLE)) == dp.GROUP_OFF
    assert dp.classify(indicator, None) == dp.GROUP_OFF
    assert dp.classify(indicator, _state("No Source")) == dp.GROUP_ON
    assert dp.classify(indicator, _state("Active Video")) == dp.GROUP_ON


def test_classify_without_an_indicator_is_unknown():
    assert dp.classify(None, _state("on")) == dp.GROUP_UNKNOWN


# ------------------------------------------------------------------------------------------- a made-up home


def _entry(hass, domain: str, host: str | None = None, title: str | None = None) -> MockConfigEntry:
    entry = MockConfigEntry(domain=domain, title=title or domain, data={"host": host} if host else {})
    entry.add_to_hass(hass)
    return entry


def _device(hass, entry, ident: str, mac: str | None = None, name: str | None = None) -> str:
    connections = {(dr.CONNECTION_NETWORK_MAC, mac)} if mac else set()
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=entry.entry_id, identifiers={(entry.domain, ident)}, connections=connections,
        name=name or ident,
    )
    return device.id


def _entity(hass, entry, device_id, domain: str, uid: str, object_id: str, **kw) -> str:
    return er.async_get(hass).async_get_or_create(
        domain, entry.domain, uid, config_entry=entry, device_id=device_id, suggested_object_id=object_id, **kw
    ).entity_id


@pytest.fixture
def home(hass: HomeAssistant) -> dict[str, str]:
    ids: dict[str, str] = {}

    # Living room TV: three integrations, three HA devices, two MACs, one IP
    pip = _entry(hass, "pipup", TV_HOST)
    dev = _device(hass, pip, "tv-pipup")
    ids["pipup_player"] = _entity(hass, pip, dev, "media_player", "abc_media_player", "living_room_tv")
    ids["pipup_screen"] = _entity(hass, pip, dev, "binary_sensor", "abc_screen", "living_room_tv_screen",
                                  translation_key="screen", original_device_class="power")
    adb = _entry(hass, "androidtv", TV_HOST)
    dev = _device(hass, adb, "tv-adb", mac="d8:14:df:d9:60:35")
    ids["adb_player"] = _entity(hass, adb, dev, "media_player", "d8:14:df:d9:60:35", "living_room_adb")
    ids["adb_remote"] = _entity(hass, adb, dev, "remote", "d8:14:df:d9:60:35", "living_room_adb")
    atvr = _entry(hass, "androidtv_remote", TV_HOST)
    dev = _device(hass, atvr, "tv-atvr", mac="f0:35:75:c6:74:db")
    ids["atvr_player"] = _entity(hass, atvr, dev, "media_player", "f0:35:75:c6:74:db", "androidtv_livingroom")
    ids["atvr_remote"] = _entity(hass, atvr, dev, "remote", "f0:35:75:c6:74:db", "androidtv_livingroom")

    # Cast: one entry for every Cast device, so its host can't group anything
    cast = _entry(hass, "cast")
    ids["cast_tv"] = _entity(hass, cast, _device(hass, cast, "cast-tv"), "media_player", "cast-tv", "googletv_livingroom")
    ids["cast_spk"] = _entity(hass, cast, _device(hass, cast, "cast-spk"), "media_player", "cast-spk", "kitchen_speaker")

    # Theater
    jvc = _entry(hass, "jvc_projector_ha", "192.168.50.73")
    dev = _device(hass, jvc, "jvc", mac="e0:da:dc:25:49:04")
    ids["jvc_remote"] = _entity(hass, jvc, dev, "remote", "e0:da:dc:25:49:04", "jvc_projector")
    ids["jvc_power"] = _entity(hass, jvc, dev, "sensor", "e0:da:dc:25:49:04_power", "jvc_projector_power_state",
                               translation_key="jvc_power_state", original_device_class="enum")
    ids["jvc_input"] = _entity(hass, jvc, dev, "select", "e0:da:dc:25:49:04_input", "jvc_projector_input",
                               translation_key="jvc_input_select")
    storm = _entry(hass, "stormaudio", "192.168.50.75")
    dev = _device(hass, storm, "isp")
    ids["isp"] = _entity(hass, storm, dev, "media_player", "826b7a1e476f", "isp")
    ids["isp_power"] = _entity(hass, storm, dev, "switch", "826b7a1e476f_power", "isp_power")
    ids["isp_mute"] = _entity(hass, storm, dev, "switch", "826b7a1e476f_mute", "isp_mute")
    lum = _entry(hass, "lumagen", "192.168.50.69")
    dev = _device(hass, lum, "lumagen")
    ids["lum_power"] = _entity(hass, lum, dev, "switch", "SN_power", "lumagen_power", translation_key="power")
    ids["lum_remote"] = _entity(hass, lum, dev, "remote", "SN_remote", "lumagen")
    ids["lum_video"] = _entity(hass, lum, dev, "sensor", "SN_input_video_status", "lumagen_input_video_status",
                               translation_key="input_video_status")
    ids["lum_input"] = _entity(hass, lum, dev, "select", "SN_input", "lumagen_input", translation_key="input")

    # Yamaha: one device, two zones
    yam = _entry(hass, "yamaha_musiccast", "192.168.50.80")
    dev = _device(hass, yam, "yamaha")
    ids["yam_main"] = _entity(hass, yam, dev, "media_player", "Y_main", "musiccast_ceiling", translation_key="zone")
    ids["yam_zone2"] = _entity(hass, yam, dev, "media_player", "Y_zone2", "musiccast_deck", translation_key="zone")
    ids["yam_sleep"] = _entity(hass, yam, dev, "select", "Y_main_sleep", "sleep_timer", translation_key="zone_sleep")

    # Something without a profile
    sonos = _entry(hass, "sonos")
    ids["sonos"] = _entity(hass, sonos, _device(hass, sonos, "sonos-1"), "media_player", "RINCON_1", "office")
    return ids


async def test_resolve_jvc(hass: HomeAssistant, home):
    r = dp.resolve(hass, dp.load_profiles()["jvc_projector_ha"], home["jvc_remote"])
    assert r.indicator_entity == home["jvc_power"]
    assert r.indicator_attribute is None
    assert r.remote_entity == home["jvc_remote"]
    assert r.settings == [home["jvc_input"]]  # picture mode isn't on this device: skipped, not an error


async def test_resolve_stormaudio_finds_its_power_switch_by_unique_id(hass: HomeAssistant, home):
    r = dp.resolve(hass, dp.load_profiles()["stormaudio"], home["isp"])
    assert r.indicator_entity == home["isp"]
    assert r.indicator_attribute == "detailed_state"
    assert r.power_switch == home["isp_power"]  # not the mute switch


async def test_resolve_lumagen(hass: HomeAssistant, home):
    r = dp.resolve(hass, dp.load_profiles()["lumagen"], home["lum_power"])
    assert r.indicator_entity == home["lum_video"]
    assert r.remote_entity == home["lum_remote"]
    assert r.picture_entity == home["lum_video"]
    assert r.settings == [home["lum_input"]]


async def test_resolve_a_yamaha_zone_is_its_own_indicator(hass: HomeAssistant, home):
    r = dp.resolve(hass, dp.load_profiles()["yamaha_musiccast"], home["yam_zone2"])
    assert r.indicator_entity == home["yam_zone2"]
    assert r.settings == [home["yam_sleep"]]


async def test_resolve_an_entity_outside_the_registry(hass: HomeAssistant):
    r = dp.resolve(hass, dp.load_profiles()["media_player"], "media_player.yaml_only")
    assert r.indicator_entity == "media_player.yaml_only"
    assert r.remote_entity is None


async def test_physical_devices_group_the_tv_by_host(hass: HomeAssistant, home):
    groups = dp.physical_devices(hass)
    tv = next(g for g in groups if TV_HOST in g.hosts)
    assert tv.integrations == ["androidtv", "androidtv_remote", "pipup"]
    assert len(tv.device_ids) == 3
    assert tv.entities["pipup"] == [home["pipup_player"]]
    assert sorted(tv.entities["androidtv"]) == sorted([home["adb_player"], home["adb_remote"]])
    # Cast covers several devices from one entry: never grouped by host, each device on its own
    casts = [g for g in groups if g.integrations == ["cast"]]
    assert len(casts) == 2
    # Every theater device stays separate
    assert sum(1 for g in groups if g.integrations == ["jvc_projector_ha"]) == 1
    assert sum(1 for g in groups if g.integrations == ["stormaudio"]) == 1


async def test_physical_devices_group_by_mac(hass: HomeAssistant):
    a = _entry(hass, "androidtv", "10.0.0.5")
    b = _entry(hass, "androidtv_remote", "tv.local")  # another host spelling, same MAC
    pa = _entity(hass, a, _device(hass, a, "a", mac="AA:BB:CC:00:11:22"), "media_player", "a", "tv_a")
    pb = _entity(hass, b, _device(hass, b, "b", mac="aa:bb:cc:00:11:22"), "media_player", "b", "tv_b")
    def members(g: dp.PhysicalDevice) -> set[str]:
        return {e for ids in g.entities.values() for e in ids}

    group = next(g for g in dp.physical_devices(hass) if pa in members(g))
    assert pb in members(group)


async def test_best_integration_per_role(hass: HomeAssistant, home):
    profiles = dp.load_profiles()
    tv = next(g for g in dp.physical_devices(hass) if TV_HOST in g.hosts)
    assert dp.best_for_role(profiles, tv, dp.ROLE_POWER)[0] == "pipup"
    assert dp.best_for_role(profiles, tv, dp.ROLE_NOW_PLAYING)[0] == "pipup"
    # PiPup has no arrow keys and its turn off is a deep sleep: ADB does those
    assert dp.best_for_role(profiles, tv, dp.ROLE_NAVIGATION)[0] == "androidtv"
    assert dp.best_for_role(profiles, tv, dp.ROLE_TURN_OFF)[0] == "androidtv"


async def test_best_for_role_after_removing_integrations(hass: HomeAssistant, home):
    """With PiPup gone, ADB takes power; with ADB gone too, Android TV Remote takes navigation."""
    profiles = dp.load_profiles()
    tv = dp.PhysicalDevice(entities={"androidtv": [home["adb_player"]], "androidtv_remote": [home["atvr_player"]]})
    assert dp.best_for_role(profiles, tv, dp.ROLE_POWER)[0] == "androidtv"
    tv = dp.PhysicalDevice(entities={"androidtv_remote": [home["atvr_player"]], "cast": [home["cast_tv"]]})
    assert dp.best_for_role(profiles, tv, dp.ROLE_NAVIGATION)[0] == "androidtv_remote"
    assert dp.best_for_role(profiles, tv, dp.ROLE_NOW_PLAYING)[0] == "cast"
    only_cast = dp.PhysicalDevice(entities={"cast": [home["cast_tv"]]})
    assert dp.best_for_role(profiles, only_cast, dp.ROLE_POWER) is None  # Cast can't tell if the TV is on


async def test_unmatched_integrations(hass: HomeAssistant, home):
    assert dp.unmatched_integrations(hass, dp.load_profiles()) == ["sonos"]


async def test_disabled_entities_are_ignored(hass: HomeAssistant, home):
    er.async_get(hass).async_update_entity(home["jvc_power"], disabled_by=er.RegistryEntryDisabler.USER)
    r = dp.resolve(hass, dp.load_profiles()["jvc_projector_ha"], home["jvc_remote"])
    assert r.indicator_entity is None
    assert not r.has_indicator


def test_config_entry_host():
    assert dp.config_entry_host({"host": "192.168.1.2"}) == "192.168.1.2"
    assert dp.config_entry_host({"ip_address": "TV.local"}) == "tv.local"
    assert dp.config_entry_host({"url": "http://192.168.1.9:8123/x"}) == "192.168.1.9"
    assert dp.config_entry_host({}) is None


async def test_async_load_profiles(hass: HomeAssistant):
    profiles = await dp.async_load_profiles(hass)
    assert "jvc_projector_ha" in profiles


def test_classify_harmony_is_on_unless_powered_off():
    indicator = dp.load_profiles()["harmony"].indicator
    assert dp.classify(indicator, State("select.harmony_hub_activities", "power_off")) == dp.GROUP_OFF
    assert dp.classify(indicator, State("select.harmony_hub_activities", "On")) == dp.GROUP_ON
