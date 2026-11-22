"""Notifications: the blueprint install, and the offers built from the problem sensors."""
from __future__ import annotations

import os

from homeassistant.core import HomeAssistant

from .common import Devices, living_room, setup
from custom_components.easy_av_control import notify


async def test_blueprint_is_installed_and_kept(hass: HomeAssistant) -> None:
    target = hass.config.path("blueprints", "automation", "LTek", "smart-repeating-alerts-ltek.yaml")
    if os.path.exists(target):
        os.remove(target)
    assert await hass.async_add_executor_job(notify.sync_blueprint, hass) == "installed"
    assert await hass.async_add_executor_job(notify.sync_blueprint, hass) is None
    # A file that isn't ours is never replaced
    await hass.async_add_executor_job(_write, target, "blueprint: {name: mine}\n")
    status = await hass.async_add_executor_job(notify.blueprint_status, hass)
    assert status["installed"] and not status["ours"] and not status["update"]
    os.remove(target)


async def test_an_offer_calls_the_integration(hass: HomeAssistant, devices: Devices) -> None:
    await setup(hass, devices, living_room())
    config = notify.build(hass, "wz", "Wohnzimmer", "on_unexpectedly", ["phone1"])
    inputs = config["use_blueprint"]["input"]
    assert config["use_blueprint"]["path"] == notify.BLUEPRINT_PATH
    assert inputs["alert_trigger"][0]["entity_id"] == "binary_sensor.av_wohnzimmer_device_on_unexpectedly"
    assert inputs["clear_trigger"][0]["to"] == "off"
    assert inputs["notification_id"] == "easy_av_control_wz_on_unexpectedly"
    assert inputs["include_action_buttons"] == ["enable_action_button_1", "enable_action_button_2"]
    assert inputs["action_button_1_label"] == "Turn off"
    assert inputs["action_button_1_action"] == [
        {"action": "easy_av_control.problem_action", "data": {"room": "wz", "problem": "on_unexpectedly", "action": "turn_off"}}
    ]
    assert inputs["action_button_2_action"][0]["data"]["action"] == "keep_on"

    payload = notify.offers_payload(hass)
    assert {(o["room"], o["kind"]) for o in payload["offers"]} >= {("wz", "left_on"), ("wz", "device_error")}


def _write(path: str, text: str) -> None:
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(text)
