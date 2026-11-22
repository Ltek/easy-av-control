"""Startup order controls: no wait, a delay or a wait for other devices before a device, a device turned off a
while after the shutdown (seats), and select devices (a Harmony hub's activities)."""
from __future__ import annotations

import copy
from typing import Any

from homeassistant.core import HomeAssistant

from .common import ONKYO, VU, Devices, living_room, setup
from custom_components.easy_av_control.flow import plan_start, plan_stop
from custom_components.easy_av_control.model import validate_config

HARMONY = "select.harmony_hub_activities"
SEATS = "switch.theater_seats"


def _theater() -> dict[str, Any]:
    data = living_room()
    room = data["rooms"]["wz"]
    room["devices"]["harmony"] = {"entity_id": HARMONY}
    room["devices"]["seats"] = {"entity_id": SEATS, "turn_off_after": 300}
    room["activities"]["tv"]["devices"] = ["seats", "harmony", "onkyo", "beamer", "vu"]
    return data


async def _drain(hass: HomeAssistant) -> None:
    await hass.async_block_till_done(wait_background_tasks=True)


async def test_harmony_activity_is_selected_and_powered_off(hass: HomeAssistant, devices: Devices) -> None:
    hass.states.async_set(HARMONY, "power_off", {"options": ["power_off", "On"]})
    hass.states.async_set(SEATS, "off")
    coordinator = await setup(hass, devices, _theater())

    await coordinator.async_start_activity("wz", "tv")
    assert ("select.select_option", (HARMONY,), {"option": "On"}) in devices.calls

    hass.states.async_set(HARMONY, "On", {"options": ["power_off", "On"]})
    devices.calls.clear()
    await coordinator.async_stop_activity("wz")
    assert ("select.select_option", (HARMONY,), {"option": "power_off"}) in devices.calls


async def test_harmony_option_set_by_hand(hass: HomeAssistant, devices: Devices) -> None:
    hass.states.async_set(HARMONY, "power_off", {"options": ["power_off", "Movie", "TV"]})
    hass.states.async_set(SEATS, "off")
    data = _theater()
    data["rooms"]["wz"]["devices"]["harmony"]["option"] = "TV"
    coordinator = await setup(hass, devices, data)

    await coordinator.async_start_activity("wz", "tv")
    assert ("select.select_option", (HARMONY,), {"option": "TV"}) in devices.calls


async def test_seats_are_turned_off_after_the_shutdown(hass: HomeAssistant, devices: Devices) -> None:
    hass.states.async_set(HARMONY, "power_off", {"options": ["power_off", "On"]})
    hass.states.async_set(SEATS, "off")
    coordinator = await setup(hass, devices, _theater())
    await coordinator.async_start_activity("wz", "tv")
    names = devices.names()
    assert names.index(("homeassistant.turn_on", (SEATS,))) < names.index(("homeassistant.turn_on", (ONKYO,)))

    devices.calls.clear()
    devices.sleeps.clear()
    await coordinator.async_stop_activity("wz")
    await _drain(hass)
    names = devices.names()
    assert names.index(("homeassistant.turn_off", (SEATS,))) > names.index(("homeassistant.turn_off", (ONKYO,)))
    assert 300 in devices.sleeps

    flow = plan_stop(hass, "wz", validate_config(copy.deepcopy(_theater()))["rooms"]["wz"], "tv")
    seats = next(r for r in flow["rows"] if r.get("device") == "seats")
    assert seats["background"] and seats["later"] == 300 and seats["at"] == [300, 300]


async def test_delay_and_wait_for_before_a_device(hass: HomeAssistant, devices: Devices) -> None:
    data = living_room()
    activity = data["rooms"]["wz"]["activities"]["tv"]
    activity["before"] = {"vu": {"delay": 3, "wait_for": [{"device": "onkyo"}], "timeout": 5}}
    data["rooms"]["wz"]["devices"]["onkyo"]["state_source"] = {"on": ["on"]}
    coordinator = await setup(hass, devices, data)

    await coordinator.async_start_activity("wz", "tv")
    assert 3 in devices.sleeps
    assert coordinator.runtime("wz").warnings == []
    assert devices.names().index(("homeassistant.turn_on", (VU,))) > devices.names().index(("homeassistant.turn_on", (ONKYO,)))

    rows = plan_start(hass, "wz", validate_config(copy.deepcopy(data))["rooms"]["wz"], "tv")["rows"]
    kinds = [(r["kind"], r.get("device")) for r in rows]
    vu = kinds.index(("device", "vu"))
    assert kinds[vu + 1] == ("delay", "vu") and kinds[vu + 2] == ("wait_for", "vu")
    assert rows[vu + 2]["waits"] == [{"device": "onkyo", "state": "on"}]


async def test_a_wait_for_that_never_comes_warns(hass: HomeAssistant, devices: Devices) -> None:
    data = living_room()
    data["rooms"]["wz"]["activities"]["tv"]["before"] = {"onkyo": {"wait_for": [{"device": "vu"}], "timeout": 1}}
    data["rooms"]["wz"]["devices"]["vu"]["state_source"] = {"on": ["on"]}
    coordinator = await setup(hass, devices, data)

    await coordinator.async_start_activity("wz", "tv")
    assert any("before" in w and "is not on" in w for w in coordinator.runtime("wz").warnings)
    assert coordinator.activity_states["wz"] == "active"


def test_wait_for_must_name_a_device_of_the_activity() -> None:
    data = living_room()
    data["rooms"]["wz"]["activities"]["musik"]["before"] = {"onkyo": {"wait_for": [{"device": "vu"}]}}
    try:
        validate_config(data)
    except Exception as err:  # noqa: BLE001
        assert "not a device of this activity" in str(err)
    else:
        raise AssertionError("accepted")


async def test_no_wait_moves_on_at_once(hass: HomeAssistant, devices: Devices) -> None:
    data = living_room()
    onkyo = data["rooms"]["wz"]["devices"]["onkyo"]
    onkyo.update({"state_source": {"on": ["on"]}, "wait_on": "none", "delay_after_on": 10})
    room = validate_config(copy.deepcopy(data))["rooms"]["wz"]
    rows = plan_start(hass, "wz", room, "musik")["rows"]
    assert [r["kind"] for r in rows if r.get("device") == "onkyo" and r["kind"] in ("status", "wait")] == []

    coordinator = await setup(hass, devices, data)
    await coordinator.async_start_activity("wz", "musik")
    assert 10 not in devices.sleeps
