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
