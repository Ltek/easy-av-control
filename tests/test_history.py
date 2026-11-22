"""Reports: every run with its phases, and every device time, kept in the history."""
from __future__ import annotations

from homeassistant.core import HomeAssistant

from .common import Devices, living_room, setup
from custom_components.easy_av_control.history import MAX_RUNS, async_get_history


async def test_runs_and_device_times_are_recorded(hass: HomeAssistant, devices: Devices, hass_ws_client) -> None:
    coordinator = await setup(hass, devices, living_room())
    await coordinator.async_start_activity("wz", "tv")
    await coordinator.async_start_activity("wz", "musik")
    await coordinator.async_stop_activity("wz")
    await hass.async_block_till_done()

    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "easy_av_control/history/get"})
    result = (await client.receive_json())["result"]
    runs = result["runs"]
    assert [(r["mode"], r["activity"]) for r in runs] == [("start", "tv"), ("start", "musik"), ("stop", "musik")]
    first = runs[0]
    assert first["room"] == "wz" and first["result"] in ("ok", "warning") and first["seconds"] >= 0
    assert [p["device"] for p in first["phases"] if p["kind"] == "device"] == ["onkyo", "beamer", "vu"]
    assert all("seconds" in p for p in first["phases"])
    assert runs[1]["from"] == "tv"
    assert runs[1]["phases"][0]["kind"] == "switch_off_unused"

    await client.send_json_auto_id({"type": "easy_av_control/history/clear"})
    assert (await client.receive_json())["success"]
    assert (await async_get_history(hass)).runs == []


async def test_history_is_capped(hass: HomeAssistant) -> None:
    history = await async_get_history(hass)
    for i in range(MAX_RUNS + 5):
        history.add_run({"n": i})
    assert len(history.runs) == MAX_RUNS and history.runs[-1]["n"] == MAX_RUNS + 4
    for i in range(150):
        history.add_device_event("media_player.x", {"n": i})
    assert len(history.devices["media_player.x"]) == 100


async def test_device_times_are_recorded_with_their_run(hass: HomeAssistant, devices: Devices) -> None:
    """A device with a status entity: its time to come on is kept with the room and activity."""
    from custom_components.easy_av_control.history import history_of

    coordinator = await setup(hass, devices, living_room())
    coordinator._record_event(  # as _record_time calls it
        coordinator.rooms["wz"]["devices"]["onkyo"], "on", 12.34, "ok", None
    )
    [event] = history_of(hass).devices[coordinator.rooms["wz"]["devices"]["onkyo"]["entity_id"]]
    assert event["seconds"] == 12.3 and event["direction"] == "on" and event["result"] == "ok"


async def test_export_has_the_run_and_its_trace(hass: HomeAssistant, devices: Devices, hass_ws_client) -> None:
    """One run exported: its phases, the trace (what it did, service calls, state changes) and the context."""
    coordinator = await setup(hass, devices, living_room())
    await coordinator.async_start_activity("wz", "tv")
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "easy_av_control/history/get"})
    run = (await client.receive_json())["result"]["runs"][-1]

    await client.send_json_auto_id({"type": "easy_av_control/history/export", "run": run["id"]})
    report = (await client.receive_json())["result"]
    assert [r["id"] for r in report["runs"]] == [run["id"]]
    trace = report["traces"][run["id"]]
    events = [e["event"] for e in trace["events"]]
    assert events[0] == "begin" and events[-1] == "finish"
    assert "doing" in events and "state" in events  # service calls: the test fakes _async_call itself
    assert set(trace["start"]) == set(trace["entities"]) and trace["entities"]
    assert report["rooms"] and report["home_assistant"]

    await client.send_json_auto_id({"type": "easy_av_control/history/export", "run": "nope"})
    assert not (await client.receive_json())["success"]


async def test_an_unreachable_device_is_waited_for(hass: HomeAssistant, devices: Devices) -> None:
    """A power entity that is unavailable for a moment is switched once it is back, not skipped."""
    from custom_components.easy_av_control import coordinator as module

    coordinator = await setup(hass, devices, living_room())
    entity = coordinator.rooms["wz"]["devices"]["onkyo"]["entity_id"]
    hass.states.async_set(entity, "unavailable")
    sleeps = 0
    original = coordinator._async_sleep

    async def sleep(seconds: float) -> None:
        nonlocal sleeps
        sleeps += 1
        if sleeps == 4:  # back after 2 s
            hass.states.async_set(entity, "off")
        await original(seconds)

    coordinator._async_sleep = sleep
    assert await coordinator._async_wait_reachable(entity, module.REACH_TIMEOUT)
    assert sleeps >= 4 + int(module.REACH_SETTLE / module.REACH_POLL) - 1

    hass.states.async_set(entity, "unavailable")
    assert not await coordinator._async_wait_reachable(entity, 3)
