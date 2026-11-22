"""The monitor: problems raised after their grace, cleared when gone, acted on by the integration."""
from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant

from .common import BEAMER, ONKYO, VU, Devices, living_room, setup
from custom_components.easy_av_control.const import EVENT_MONITOR


class Clock:
    def __init__(self) -> None:
        self.t = 1000.0

    def __call__(self) -> float:
        return self.t


def _data(**activity: Any) -> dict[str, Any]:
    data = living_room()
    room = data["rooms"]["wz"]
    for device in room["devices"].values():
        device["state_source"] = {"on": ["on"], "off": ["off"], "error": ["error"]}
    room["activities"]["tv"].update(activity)
    return data


async def _monitor(hass: HomeAssistant, devices: Devices, data: dict[str, Any]):
    coordinator = await setup(hass, devices, data)
    coordinator.monitor.stop()
    clock = Clock()
    coordinator.monitor.now = clock
    return coordinator, coordinator.monitor, clock


def _sensor(hass: HomeAssistant, kind: str):
    return hass.states.get(f"binary_sensor.av_wohnzimmer_{kind}")


async def test_a_device_on_while_the_room_is_idle(hass: HomeAssistant, devices: Devices) -> None:
    _, monitor, clock = await _monitor(hass, devices, _data())
    events = []
    hass.bus.async_listen(EVENT_MONITOR, lambda e: events.append(e.data))
    hass.states.async_set(BEAMER, "on")
    await monitor.async_tick()
    clock.t += 60
    await monitor.async_tick()
    assert not monitor.room_problems("wz", "on_unexpectedly")
    clock.t += 61
    await monitor.async_tick()
    await hass.async_block_till_done()
    assert list(monitor.room_problems("wz", "on_unexpectedly")) == ["beamer"]
    state = hass.states.get("binary_sensor.av_wohnzimmer_device_on_unexpectedly")
    assert state is not None, sorted(hass.states.async_entity_ids("binary_sensor"))
    assert state.state == "on"
    assert state.attributes["entity_ids"] == [BEAMER]
    assert state.attributes["actions"] == ["turn_off", "keep_on"]
    assert "planned_action" not in state.attributes
    assert events[-1]["what"] == "raised"

    # Notify only: nothing is turned off by itself
    clock.t += 3600
    await monitor.async_tick()
    assert ("homeassistant.turn_off", (BEAMER,)) not in devices.names()

    # The button tells the integration to turn it off
    await hass.services.async_call(
        "easy_av_control", "monitor_action", {"room": "wz", "problem": "on_unexpectedly", "action": "turn_off"}, blocking=True
    )
    assert ("homeassistant.turn_off", (BEAMER,)) in devices.names()
    await monitor.async_tick()
    assert not monitor.room_problems("wz", "on_unexpectedly")


async def test_auto_turn_off_when_chosen(hass: HomeAssistant, devices: Devices) -> None:
    data = _data()
    data["rooms"]["wz"]["devices"]["beamer"]["watch"] = {"mode": "turn_off", "grace": 10, "turn_off_after": 300}
    _, monitor, clock = await _monitor(hass, devices, data)
    hass.states.async_set(BEAMER, "on")
    await monitor.async_tick()
    clock.t += 11
    await monitor.async_tick()
    await hass.async_block_till_done()
    assert hass.states.get("binary_sensor.av_wohnzimmer_device_on_unexpectedly").attributes["planned_action"] == "turn_off"
    clock.t += 301
    await monitor.async_tick()
    assert ("homeassistant.turn_off", (BEAMER,)) in devices.names()


async def test_keep_on_silences_until_it_is_off(hass: HomeAssistant, devices: Devices) -> None:
    _, monitor, clock = await _monitor(hass, devices, _data())
    hass.states.async_set(BEAMER, "on")
    await monitor.async_tick()
    clock.t += 121
    await monitor.async_tick()
    await monitor.async_action("wz", "on_unexpectedly", "keep_on")
    clock.t += 500
    await monitor.async_tick()
    assert not monitor.room_problems("wz", "on_unexpectedly")
    hass.states.async_set(BEAMER, "off")
    await monitor.async_tick()
    hass.states.async_set(BEAMER, "on")
    await monitor.async_tick()
    clock.t += 121
    await monitor.async_tick()
    assert monitor.room_problems("wz", "on_unexpectedly")


async def test_devices_of_the_running_activity_are_not_unexpected(hass: HomeAssistant, devices: Devices) -> None:
    coordinator, monitor, clock = await _monitor(hass, devices, _data())
    for e in (ONKYO, BEAMER, VU):
        hass.states.async_set(e, "on")
    await coordinator.async_start_activity("wz", "tv")
    await monitor.async_tick()
    clock.t += 500
    await monitor.async_tick()
    assert not monitor.room_problems("wz", "on_unexpectedly")
    # A device lost while it runs
    hass.states.async_set(BEAMER, "off")
    await monitor.async_tick()
    clock.t += 61
    await monitor.async_tick()
    assert list(monitor.room_problems("wz", "device_lost")) == ["beamer"]
    await monitor.async_action("wz", "device_lost", "turn_on")
    assert devices.names()[-1] == ("homeassistant.turn_on", (BEAMER,))


async def test_auto_off_when_nothing_plays(hass: HomeAssistant, devices: Devices) -> None:
    coordinator, monitor, clock = await _monitor(hass, devices, _data(monitor={"idle_after": 1800, "idle_warning": 300}))
    for e in (ONKYO, BEAMER, VU):
        hass.states.async_set(e, "on")
    await coordinator.async_start_activity("wz", "tv")
    hass.states.async_set(VU, "playing")
    await monitor.async_tick()
    clock.t += 3600
    await monitor.async_tick()
    assert not monitor.room_problems("wz", "left_on")
    hass.states.async_set(VU, "paused")
    await monitor.async_tick()
    clock.t += 1801
    await monitor.async_tick()
    assert monitor.room_problems("wz", "left_on")
    # Keep on: the idle time starts again
    await monitor.async_action("wz", "left_on", "keep_on")
    clock.t += 1000
    await monitor.async_tick()
    assert not monitor.room_problems("wz", "left_on")
    clock.t += 900
    await monitor.async_tick()
    assert monitor.room_problems("wz", "left_on")
    clock.t += 301
    await monitor.async_tick()
    await hass.async_block_till_done()
    assert coordinator.activity_states["wz"] == "idle"


async def test_an_error_state_any_time(hass: HomeAssistant, devices: Devices) -> None:
    _, monitor, clock = await _monitor(hass, devices, _data())
    hass.states.async_set(BEAMER, "error")
    await monitor.async_tick()
    clock.t += 6
    await monitor.async_tick()
    assert list(monitor.room_problems("wz", "device_error")) == ["beamer"]


async def test_an_action_the_problem_has_not_is_refused(hass: HomeAssistant, devices: Devices) -> None:
    _, monitor, _ = await _monitor(hass, devices, _data())
    try:
        await monitor.async_action("wz", "picture_lost", "turn_off")
    except ValueError as err:
        assert "not an action" in str(err)
    else:
        raise AssertionError("accepted")


def test_the_flow_shows_what_is_watched(hass: HomeAssistant) -> None:
    import copy

    from custom_components.easy_av_control.flow import plan_monitor
    from custom_components.easy_av_control.model import validate_config

    data = _data(monitor={"idle_after": 1800})
    data["rooms"]["wz"]["devices"]["vu"]["watch"] = {"mode": "off"}
    room = validate_config(copy.deepcopy(data))["rooms"]["wz"]
    rows = plan_monitor(hass, room, "tv")["rows"]
    kinds = [r["kind"] for r in rows]
    assert kinds[:4] == ["state", "monitor_lost", "monitor_idle", "monitor_error"]
    assert [r["device"] for r in rows if r["kind"] == "monitor_watch"] == ["onkyo", "beamer"]
