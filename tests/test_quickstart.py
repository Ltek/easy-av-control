"""Quick Start: the steps and their status, and Apply."""
from __future__ import annotations

from homeassistant.core import HomeAssistant

from .common import Devices, living_room, setup


async def test_plan_and_apply(hass: HomeAssistant, devices: Devices, hass_ws_client) -> None:
    await setup(hass, devices, living_room())
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "easy_av_control/quickstart/plan"})
    plan = (await client.receive_json())["result"]
    steps = {s["id"]: s for s in plan["steps"]}
    assert steps["rooms"]["status"] == "done"
    assert steps["activity"]["status"] == "done"
    assert steps["tested"]["status"] == "manual"
    assert steps["competing"]["status"] == "done"
    assert steps["card"]["browser"] is True
    assert plan["status"]["devices"] == 3

    await client.send_json_auto_id({"type": "easy_av_control/quickstart/apply"})
    result = (await client.receive_json())["result"]
    assert {s["id"]: s["status"] for s in result["steps"]}["blueprint"] == "done"


async def test_an_automation_that_switches_a_device_is_named(hass: HomeAssistant, devices: Devices, hass_ws_client) -> None:
    from homeassistant.setup import async_setup_component

    from .common import ONKYO

    await setup(hass, devices, living_room())
    assert await async_setup_component(
        hass,
        "automation",
        {
            "automation": [
                {
                    "id": "old_on",
                    "alias": "Old system on",
                    "triggers": [{"trigger": "event", "event_type": "x"}],
                    "actions": [{"action": "media_player.turn_on", "target": {"entity_id": ONKYO}}],
                },
                {
                    "id": "lights",
                    "alias": "Lights only",
                    "triggers": [{"trigger": "state", "entity_id": ONKYO}],
                    "actions": [{"action": "light.turn_on", "target": {"entity_id": "light.x"}}],
                },
            ]
        },
    )
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "easy_av_control/quickstart/plan"})
    steps = {s["id"]: s for s in (await client.receive_json())["result"]["steps"]}
    assert steps["competing"]["status"] == "manual"
    assert [a["name"] for a in steps["competing"]["automations"]] == ["Old system on"]
