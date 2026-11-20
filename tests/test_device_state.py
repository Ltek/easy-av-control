"""Device states at run time (device_state.py + the coordinator): wait modes, debounce, failure handling.

A made-up theater: a JVC-like projector found through its integration's profile (power sensor: standby,
warming, on, cooling, error), on a switched outlet, and a StormAudio-like processor whose real state is an
attribute. The fake devices change state on a short real timer after they're switched, like the real ones do
(only much faster).
"""
from __future__ import annotations

import asyncio
from collections.abc import Callable
from typing import Any
from unittest.mock import patch

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr, entity_registry as er

from .common import Devices, setup
from custom_components.easy_av_control.device_profiles import load_profiles
from custom_components.easy_av_control.device_state import (
    RESULT_ERROR,
    RESULT_OK,
    RESULT_TIMEOUT,
    StateSource,
    async_wait_for,
    effective_source,
    failure_action,
    wait_mode,
)

JVC = "remote.jvc_projector"
JVC_POWER = "sensor.jvc_projector_power_state"
PLUG = "switch.theater_outlet"
ISP = "media_player.isp"

FAST = {"debounce": 0.05, "timeout_on": 1, "timeout_off": 1}


def _register_jvc(hass: HomeAssistant) -> None:
    entry = MockConfigEntry(domain="jvc_projector_ha", data={"host": "192.168.50.73"})
    entry.add_to_hass(hass)
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=entry.entry_id, identifiers={("jvc_projector_ha", "jvc")}
    )
    registry = er.async_get(hass)
    registry.async_get_or_create(
        "remote", "jvc_projector_ha", "jvc", config_entry=entry, device_id=device.id,
        suggested_object_id="jvc_projector",
    )
    registry.async_get_or_create(
        "sensor", "jvc_projector_ha", "jvc_power", config_entry=entry, device_id=device.id,
        suggested_object_id="jvc_projector_power_state", translation_key="jvc_power_state",
    )


class Theater(Devices):
    """Fake devices whose states follow a script after they're switched on or off."""

    def __init__(self, hass: HomeAssistant) -> None:
        super().__init__(hass)
        # (service, entity) -> list of (seconds, entity, state, attributes) to play after the call
        self.script: dict[tuple[str, str], list[list[tuple[float, str, str, dict[str, Any]]]]] = {}
        self.tasks: list[asyncio.Task] = []

    def on(self, service: str, entity: str, *steps: tuple[float, str, str] | tuple[float, str, str, dict]) -> None:
        """Queue what happens the next time ``service`` is called for ``entity`` (each call takes one entry)."""
        self.script.setdefault((service, entity), []).append(
            [(s[0], s[1], s[2], s[3] if len(s) > 3 else {}) for s in steps]
        )

    async def engine_call(self, domain, service, data, context, label, target=None) -> None:
        await super().engine_call(domain, service, data, context, label, target)
        entity = data.get("entity_id")
        for entity_id in [entity] if isinstance(entity, str) else entity or []:
            queue = self.script.get((service, entity_id))
            if queue:
                self.tasks.append(asyncio.ensure_future(self._play(queue.pop(0))))

    async def _play(self, steps) -> None:
        for seconds, entity_id, state, attrs in steps:
            await asyncio.sleep(seconds)
            self.hass.states.async_set(entity_id, state, attrs)


@pytest.fixture
async def theater(hass: HomeAssistant) -> Theater:
    _register_jvc(hass)
    hass.states.async_set(JVC, "off")
    hass.states.async_set(JVC_POWER, "standby")
    hass.states.async_set(PLUG, "on")
    hass.states.async_set(ISP, "off", {"detailed_state": "off"})
    return Theater(hass)


def _room(jvc: dict[str, Any] | None = None, **activity: Any) -> dict[str, Any]:
    return {
        "rooms": {
            "kino": {
                "name": "Kino",
                "devices": {"jvc": {"entity_id": JVC, "name": "JVC", "power_switch": PLUG, **FAST, **(jvc or {})}},
                "activities": {"movie": {"name": "Movie", "devices": ["jvc"], **activity}},
            }
        }
    }


async def _until(predicate: Callable[[], bool], seconds: float = 3.0) -> None:
    for _ in range(int(seconds / 0.02)):
        if predicate():
            return
        await asyncio.sleep(0.02)
    raise AssertionError("condition not reached")


def _calls(devices: Devices, service: str, entity: str) -> int:
    return sum(1 for name, entities, _ in devices.calls if name.endswith(service) and entity in entities)


# ------------------------------------------------------------------------------------------- the pure part


async def test_effective_source_from_the_profile(hass: HomeAssistant, theater):
    source = effective_source(hass, load_profiles(), {"entity_id": JVC})
    assert source is not None
    assert source.entity_id == JVC_POWER
    assert source.profile_id == "jvc_projector_ha"
    assert (source.timeout_on, source.timeout_off, source.debounce) == (120, 300, 2)
    # The device's own settings beat the profile's
    source = effective_source(hass, load_profiles(), {"entity_id": JVC, "debounce": 0, "timeout_off": 600})
    assert (source.debounce, source.timeout_off) == (0, 600)


async def test_no_source_without_a_profile_or_with_none(hass: HomeAssistant, theater):
    profiles = load_profiles()
    assert effective_source(hass, profiles, {"entity_id": "media_player.not_registered"}) is None
    assert effective_source(hass, profiles, {"entity_id": JVC, "state_source": "none"}) is None


async def test_state_source_by_hand(hass: HomeAssistant, theater):
    source = effective_source(
        hass, load_profiles(),
        {"entity_id": ISP, "state_source": {"attribute": "detailed_state", "on": ["on"], "starting": ["initializing"]}},
    )
    assert source.entity_id == ISP
    hass.states.async_set(ISP, "on", {"detailed_state": "initializing"})
    assert source.current(hass) == ("starting", "initializing")


def test_wait_mode_and_failure_defaults():
    source = StateSource("sensor.x", {"on": ["on"]})
    assert wait_mode({}, source, on=True) == "status"
    assert wait_mode({}, None, on=True) == "time"           # no indicator: fixed time only
    assert wait_mode({"wait_on": "both"}, source, on=True) == "both"
    assert wait_mode({"wait_on": "both"}, None, on=True) == "time"
    assert failure_action({}, "turn_on") == "warn"
    assert failure_action({"on_failure": "stop"}, "turn_off") == "stop"
    assert failure_action({"on_failure": {"turn_on": "retry"}}, "turn_on") == "retry"
    assert failure_action({"on_failure": {"turn_on": "retry"}}, "turn_off") == "warn"


async def test_wait_is_debounced(hass: HomeAssistant):
    """A short 'on' while warming doesn't end the wait; only an 'on' that holds does."""
    hass.states.async_set(JVC_POWER, "standby")
    source = StateSource(JVC_POWER, load_profiles()["jvc_projector_ha"].indicator, debounce=0.2)

    async def flicker():
        hass.states.async_set(JVC_POWER, "on")
        await asyncio.sleep(0.05)
        hass.states.async_set(JVC_POWER, "warming")
        await asyncio.sleep(0.3)
        hass.states.async_set(JVC_POWER, "on")

    start = asyncio.get_running_loop().time()
    task = asyncio.ensure_future(flicker())
    assert await async_wait_for(hass, source, "on", 3) == (RESULT_OK, "on")
    assert asyncio.get_running_loop().time() - start >= 0.5
    await task


async def test_wait_reports_an_error_and_a_timeout(hass: HomeAssistant):
    source = StateSource(JVC_POWER, load_profiles()["jvc_projector_ha"].indicator, debounce=0)
    hass.states.async_set(JVC_POWER, "error")
    assert await async_wait_for(hass, source, "on", 1) == (RESULT_ERROR, "error")
    hass.states.async_set(JVC_POWER, "warming")
    assert await async_wait_for(hass, source, "on", 0.2) == (RESULT_TIMEOUT, "warming")


async def test_a_state_that_held_long_enough_counts_at_once(hass: HomeAssistant):
    source = StateSource(JVC_POWER, {"on": ["on"]}, debounce=5)
    hass.states.async_set(JVC_POWER, "on")
    # last_changed is now: the wait still has to see it hold
    assert await async_wait_for(hass, source, "on", 0.2) == (RESULT_TIMEOUT, "on")


# ------------------------------------------------------------------------------------------- turning on


async def test_start_waits_for_on_instead_of_the_fixed_time(hass: HomeAssistant, theater):
    coordinator = await setup(hass, theater, _room({"delay_after_on": 30}))
    theater.on("turn_on", JVC, (0.05, JVC_POWER, "warming"), (0.3, JVC_POWER, "on"))
    seen: list[Any] = []
    coordinator.async_add_listener(lambda: seen.append(dict(coordinator.runtime("kino").current or {})))

    await coordinator.async_start_activity("kino", "movie")

    rt = coordinator.runtime("kino")
    assert rt.state == "active"
    assert rt.warnings == []
    assert 30 not in theater.sleeps                       # status mode: no fixed warm-up
    assert any(c.get("kind") == "status" and c.get("value") == "warming" for c in seen)


async def test_both_waits_for_on_then_the_fixed_time(hass: HomeAssistant, theater):
    coordinator = await setup(hass, theater, _room({"delay_after_on": 30, "wait_on": "both"}))
    theater.on("turn_on", JVC, (0.05, JVC_POWER, "on"))
    await coordinator.async_start_activity("kino", "movie")
    assert hass.states.get(JVC_POWER).state == "on"
    assert theater.sleeps.count(30) == 1
    assert coordinator.runtime("kino").warnings == []


async def test_time_mode_is_what_av_scenes_did(hass: HomeAssistant, theater):
    coordinator = await setup(hass, theater, _room({"delay_after_on": 30, "wait_on": "time"}))
    await coordinator.async_start_activity("kino", "movie")  # the power sensor never changes: no wait
    assert theater.sleeps.count(30) == 1
    assert coordinator.runtime("kino").warnings == []


async def test_state_source_none_is_what_av_scenes_did(hass: HomeAssistant, theater):
    coordinator = await setup(hass, theater, _room({"delay_after_on": 30, "state_source": "none"}))
    await coordinator.async_start_activity("kino", "movie")
    assert theater.sleeps.count(30) == 1
    assert coordinator.runtime("kino").warnings == []


async def test_not_on_in_time_warns_and_continues_by_default(hass: HomeAssistant, theater):
    coordinator = await setup(hass, theater, _room({"timeout_on": 0.3}))
    theater.on("turn_on", JVC, (0.05, JVC_POWER, "warming"))
    await coordinator.async_start_activity("kino", "movie")
    rt = coordinator.runtime("kino")
    assert rt.state == "active"
    assert rt.warnings == ["JVC isn't on after 0.3 s, it shows warming"]


async def test_stop_on_failure_aborts_the_activity(hass: HomeAssistant, theater):
    coordinator = await setup(hass, theater, _room({"timeout_on": 0.3, "on_failure": "stop"}))
    await coordinator.async_start_activity("kino", "movie")
    rt = coordinator.runtime("kino")
    assert rt.state == "error"
    assert "isn't on after 0.3 s" in rt.error


async def test_retry_turns_it_on_once_more(hass: HomeAssistant, theater):
    coordinator = await setup(hass, theater, _room({"timeout_on": 0.3, "on_failure": {"turn_on": "retry"}}))
    theater.on("turn_on", JVC)                                  # the first try does nothing
    theater.on("turn_on", JVC, (0.05, JVC_POWER, "on"))
    await coordinator.async_start_activity("kino", "movie")
    rt = coordinator.runtime("kino")
    assert _calls(theater, "turn_on", JVC) == 2
    assert rt.state == "active"
    assert rt.warnings == []


async def test_the_devices_own_error_is_reported(hass: HomeAssistant, theater):
    coordinator = await setup(hass, theater, _room())
    theater.on("turn_on", JVC, (0.05, JVC_POWER, "warming"), (0.05, JVC_POWER, "error"))
    await coordinator.async_start_activity("kino", "movie")
    assert coordinator.runtime("kino").warnings == ["JVC reports an error (error)"]


async def test_a_device_already_warming_is_not_turned_on_again(hass: HomeAssistant, theater):
    hass.states.async_set(JVC, "on")
    hass.states.async_set(JVC_POWER, "warming")
    coordinator = await setup(hass, theater, _room())

    async def later():
        await asyncio.sleep(0.2)
        hass.states.async_set(JVC_POWER, "on")

    task = asyncio.ensure_future(later())
    await coordinator.async_start_activity("kino", "movie")
    await task
    assert _calls(theater, "turn_on", JVC) == 0
    assert coordinator.runtime("kino").warnings == []


async def test_a_device_that_says_on_is_not_turned_on_even_if_its_entity_says_off(hass: HomeAssistant, theater):
    hass.states.async_set(JVC_POWER, "on")  # the remote entity still reads off
    coordinator = await setup(hass, theater, _room({"debounce": 0}))
    await coordinator.async_start_activity("kino", "movie")
    assert _calls(theater, "turn_on", JVC) == 0


async def test_a_device_cooling_down_is_turned_on_once_it_is_off(hass: HomeAssistant, theater):
    hass.states.async_set(JVC_POWER, "cooling")
    coordinator = await setup(hass, theater, _room())
    theater.on("turn_on", JVC, (0.05, JVC_POWER, "on"))

    async def cooled():
        await asyncio.sleep(0.2)
        hass.states.async_set(JVC_POWER, "standby")

    task = asyncio.ensure_future(cooled())
    await coordinator.async_start_activity("kino", "movie")
    await task
    assert _calls(theater, "turn_on", JVC) == 1
    assert hass.states.get(JVC_POWER).state == "on"


# ------------------------------------------------------------------------------------------- turning off


async def _started(hass, theater, jvc=None):
    hass.states.async_set(JVC, "on")
    hass.states.async_set(JVC_POWER, "on")
    coordinator = await setup(hass, theater, _room({"debounce": 0, **(jvc or {})}))
    await coordinator.async_start_activity("kino", "movie")
    return coordinator


async def test_the_outlet_is_cut_once_the_projector_says_standby(hass: HomeAssistant, theater):
    coordinator = await _started(hass, theater, {"delay_after_off": 100})
    theater.on("turn_off", JVC, (0.05, JVC_POWER, "cooling"), (0.3, JVC_POWER, "standby"))
    await coordinator.async_stop_activity("kino")
    assert hass.states.get(PLUG).state == "on"                 # still cooling
    assert coordinator.runtime("kino").cooling[PLUG]["status"] is True
    await _until(lambda: hass.states.get(PLUG).state == "off")
    assert 100 not in theater.sleeps                            # status: no fixed cool-down


async def test_both_waits_for_standby_then_the_fixed_time(hass: HomeAssistant, theater):
    coordinator = await _started(hass, theater, {"delay_after_off": 100, "wait_off": "both"})
    theater.on("turn_off", JVC, (0.05, JVC_POWER, "standby"))
    await coordinator.async_stop_activity("kino")
    await _until(lambda: hass.states.get(PLUG).state == "off")
    assert theater.sleeps.count(100) == 1


async def test_not_off_in_time_warns_and_cuts_anyway(hass: HomeAssistant, theater):
    coordinator = await _started(hass, theater, {"timeout_off": 0.3})
    theater.on("turn_off", JVC, (0.05, JVC_POWER, "cooling"))
    await coordinator.async_stop_activity("kino")
    await _until(lambda: hass.states.get(PLUG).state == "off")
    assert "JVC isn't off after 0.3 s, it shows cooling; cutting its outlet anyway" in (
        coordinator.runtime("kino").warnings
    )


async def test_stop_on_failure_leaves_the_outlet_on(hass: HomeAssistant, theater):
    coordinator = await _started(hass, theater, {"timeout_off": 0.3, "on_failure": {"turn_off": "stop"}})
    theater.on("turn_off", JVC, (0.05, JVC_POWER, "cooling"))
    await coordinator.async_stop_activity("kino")
    await _until(lambda: not coordinator.runtime("kino").pending_cuts)
    assert hass.states.get(PLUG).state == "on"


async def test_time_mode_cools_down_for_the_fixed_time(hass: HomeAssistant, theater):
    coordinator = await _started(hass, theater, {"delay_after_off": 100, "wait_off": "time"})
    await coordinator.async_stop_activity("kino")
    await _until(lambda: hass.states.get(PLUG).state == "off")
    assert theater.sleeps.count(100) == 1


# ------------------------------------------------------------------------------------------- ready attribute


async def test_ready_can_check_an_attribute(hass: HomeAssistant, theater):
    data = {
        "rooms": {
            "kino": {
                "name": "Kino",
                "devices": {
                    "isp": {
                        "entity_id": ISP,
                        "ready": {"state": ["on"], "attribute": "detailed_state", "timeout": 1},
                    }
                },
                "activities": {"movie": {"name": "Movie", "devices": ["isp"]}},
            }
        }
    }
    coordinator = await setup(hass, theater, data)

    async def boot():
        hass.states.async_set(ISP, "on", {"detailed_state": "initializing"})
        await asyncio.sleep(0.1)
        hass.states.async_set(ISP, "on", {"detailed_state": "on"})

    task = asyncio.ensure_future(boot())
    await coordinator.async_start_activity("kino", "movie")
    await task
    assert coordinator.runtime("kino").state == "active"


def test_unquoted_on_off_in_a_state_source():
    from custom_components.easy_av_control.model import DEVICE_SCHEMA

    device = DEVICE_SCHEMA({"entity_id": ISP, "state_source": {True: [True], False: [False], "starting": "boot"}})
    assert device["state_source"] == {"on": ["on"], "off": ["off"], "starting": ["boot"]}


# ------------------------------------------------------------------------------------------- measured times


def test_timing_helpers():
    from custom_components.easy_av_control import device_timings as dt

    assert dt.suggested_timeout([40, 42]) is None                  # not enough yet
    assert dt.suggested_timeout([40, 42, 44]) == 65                 # 42 * 1.5 = 63 -> 65
    assert dt.suggested_timeout([40, 42, 90]) == 100                # the slowest + 10 % wins
    assert dt.suggested_timeout([1, 1, 1]) == 10                    # never below 10 s
    assert dt.is_slow([40, 42, 44], 95) and not dt.is_slow([40, 42, 44], 60)
    assert not dt.is_slow([2, 2, 2], 9)                             # twice as long but under 10 s more
    assert not dt.is_slow([40, 42], 200)                            # not enough to tell
    assert dt.add_sample(list(range(10)), 99) == [*range(1, 10), 99]
    assert dt.view(None) is None
    assert dt.view({"on": [40, 42, 44], "off": []})["on"] == {
        "samples": 3, "typical": 42, "last": 44, "slowest": 44, "suggested": 65}


async def test_start_and_stop_record_how_long_the_projector_took(hass: HomeAssistant, theater):
    coordinator = await setup(hass, theater, _room({"debounce": 0}))
    theater.on("turn_on", JVC, (0.05, JVC_POWER, "warming"), (0.25, JVC_POWER, "on"))
    await coordinator.async_start_activity("kino", "movie")
    on = coordinator.timings[JVC]["on"]
    assert len(on) == 1 and 0.2 <= on[0] <= 1.0

    theater.on("turn_off", JVC, (0.05, JVC_POWER, "cooling"), (0.3, JVC_POWER, "standby"))
    await coordinator.async_stop_activity("kino")
    await _until(lambda: hass.states.get(PLUG).state == "off")
    off = coordinator.timings[JVC]["off"]
    assert len(off) == 1 and 0.25 <= off[0] <= 1.0
    assert coordinator._data_to_store()["timings"][JVC] == {"on": on, "off": off}


async def test_a_device_that_was_already_on_records_nothing(hass: HomeAssistant, theater):
    hass.states.async_set(JVC_POWER, "on")
    coordinator = await setup(hass, theater, _room({"debounce": 0}))
    await coordinator.async_start_activity("kino", "movie")
    assert JVC not in coordinator.timings


async def test_a_slow_start_is_reported(hass: HomeAssistant, theater):
    coordinator = await setup(hass, theater, _room({"debounce": 0}))
    coordinator.timings[JVC] = {"on": [0.01, 0.01, 0.01], "off": []}
    from custom_components.easy_av_control import coordinator as coordinator_module

    with patch.object(coordinator_module, "is_slow", lambda samples, seconds: True):
        theater.on("turn_on", JVC, (0.05, JVC_POWER, "on"))
        await coordinator.async_start_activity("kino", "movie")
    assert coordinator.runtime("kino").warnings == ["JVC took 0 s to come on (usually 0 s)"]


async def test_measured_times_come_back_after_a_restart(hass: HomeAssistant, theater, hass_storage):
    coordinator = await setup(hass, theater, _room({"debounce": 0}))
    coordinator.timings[JVC] = {"on": [41.0, 43.0, 42.0], "off": [180.0]}
    stored = coordinator._data_to_store()
    from custom_components.easy_av_control.coordinator import EasyAVControlCoordinator

    again = EasyAVControlCoordinator(hass, coordinator.entry)
    again.rooms = coordinator.rooms
    with patch.object(again._store, "async_load", return_value=stored):
        await again._async_restore()
    assert again.timings[JVC] == {"on": [41.0, 43.0, 42.0], "off": [180.0]}


async def test_the_flow_uses_the_typical_time_as_the_earliest(hass: HomeAssistant, theater):
    from custom_components.easy_av_control.flow import plan_start, plan_stop

    jvc = {"debounce": 0, "delay_after_on": 0, "timeout_on": 120, "timeout_off": 300}
    coordinator = await setup(hass, theater, _room(jvc))
    coordinator.timings[JVC] = {"on": [40.0, 42.0, 44.0], "off": [170.0, 180.0, 190.0]}
    room = coordinator.rooms["kino"]
    start = plan_start(hass, "kino", room, "movie")
    status = next(r for r in start["rows"] if r["kind"] == "status")
    assert status["typical"] == 42 and start["done"] == [42, 120]
    stop = plan_stop(hass, "kino", room, "movie")
    cut = next(r for r in stop["rows"] if r["kind"] == "outlets_off")
    assert cut["at"] == [180, 300] and cut["after_status"] is True
    # A typical time longer than the timeout counts as the timeout
    coordinator.timings[JVC]["on"] = [500.0, 500.0, 500.0]
    assert plan_start(hass, "kino", room, "movie")["done"] == [120, 120]
