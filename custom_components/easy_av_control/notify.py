"""Notifications for the monitor's problems: ready-made Smart Repeating Alerts, created in one click.

The same pattern as House Modes & Alarm Center: the Smart Repeating Alerts blueprint ships with the integration and
is installed (or updated, when the installed file is ours and older) in ``blueprints/automation/LTek/``. Each offer
is a native automation made from it (``use_blueprint``), so it has Home Assistant's own editor and traces:

- Alert trigger: the room's problem sensor turning on. Clear trigger: it turning off, which clears the notification.
- Buttons only tell the integration what to do: they call ``easy_av_control.monitor_action``.
- Notification ID ``easy_av_control_<room>_<problem>``: how the offers already made are found again.

Nothing is created until the user presses Create; the browser saves the configs this module builds through Home
Assistant's automation config API. The blueprint install code is kept the same as House Modes' ext_alerts.py.
"""
from __future__ import annotations

import logging
import os
import re
import shutil
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr, entity_registry as er
from homeassistant.util import slugify

from .const import (
    ACTION_DISMISS,
    ACTION_KEEP_ON,
    ACTION_SHUTDOWN,
    ACTION_TURN_OFF,
    ACTION_TURN_ON,
    CONF_NAME,
    DOMAIN,
    PROBLEM_ACTIONS,
    PROBLEM_DEVICE_ERROR,
    PROBLEM_DEVICE_LOST,
    PROBLEM_LEFT_ON,
    PROBLEM_ON_UNEXPECTEDLY,
    PROBLEM_PICTURE_LOST,
    PROBLEM_SCOPE,
    PROBLEMS,
)
from .model import problem_unique_id
from .websocket import _coordinators, find_room

_LOGGER = logging.getLogger(__name__)

BLUEPRINT_PATH = "LTek/smart-repeating-alerts-ltek.yaml"
SHIPPED = os.path.join(os.path.dirname(__file__), "blueprints", "smart-repeating-alerts-ltek.yaml")
MARKER = "github.com/Ltek/smart-repeating-alerts"
VERSION_RE = re.compile(r"Version (\d{4}\.\d{2}\.\d{2}\.\d+)")
ID_PREFIX = f"{DOMAIN}_"

# ------------------------------------------------------------------ the blueprint (as House Modes' ext_alerts.py)


def _version(path: str) -> str | None:
    try:
        with open(path, encoding="utf-8") as fh:
            m = VERSION_RE.search(fh.read(4000))
    except OSError:
        return None
    return m.group(1) if m else None


def _vkey(v: str | None) -> tuple:
    return tuple(int(x) for x in v.split(".")) if v else ()


def blueprint_status(hass: HomeAssistant) -> dict[str, Any]:
    """Installed and shipped versions, and whether the installed file is ours (so it may be updated)."""
    target = hass.config.path("blueprints", "automation", *BLUEPRINT_PATH.split("/"))
    installed = os.path.exists(target)
    ours = False
    if installed:
        try:
            with open(target, encoding="utf-8") as fh:
                ours = MARKER in fh.read()
        except OSError:
            ours = False
    have, ship = _version(target) if installed else None, _version(SHIPPED)
    return {
        "path": BLUEPRINT_PATH,
        "installed": installed,
        "installed_version": have,
        "shipped_version": ship,
        "ours": ours,
        "update": bool(installed and ours and ship and _vkey(ship) > _vkey(have)),
    }


def install_blueprint(hass: HomeAssistant, force: bool = False) -> dict[str, Any]:
    """Copy the shipped blueprint into blueprints/automation/LTek/. Never overwrites a file that isn't ours."""
    st = blueprint_status(hass)
    if st["installed"] and not st["ours"] and not force:
        raise ValueError(f"blueprints/automation/{BLUEPRINT_PATH} is not Smart Repeating Alerts; not replaced")
    target = hass.config.path("blueprints", "automation", *BLUEPRINT_PATH.split("/"))
    os.makedirs(os.path.dirname(target), exist_ok=True)
    shutil.copyfile(SHIPPED, target)
    _LOGGER.info("Installed Smart Repeating Alerts blueprint %s", st["shipped_version"])
    return blueprint_status(hass)


def sync_blueprint(hass: HomeAssistant) -> str | None:
    """On startup: install the blueprint when missing, update it when the file is ours and older. Never raises."""
    try:
        st = blueprint_status(hass)
        if not st["installed"]:
            install_blueprint(hass)
            return "installed"
        if st["update"]:
            install_blueprint(hass)
            return "updated"
    except (OSError, ValueError) as err:
        _LOGGER.warning("Smart Repeating Alerts blueprint not installed: %s", err)
    return None


async def async_sync_blueprint(hass: HomeAssistant) -> None:
    """Install or update the blueprint, then reload automations so ones using it load (only when it changed)."""
    changed = await hass.async_add_executor_job(sync_blueprint, hass)
    if changed and hass.services.has_service("automation", "reload"):
        _LOGGER.info("Smart Repeating Alerts blueprint %s; reloading automations", changed)
        await hass.services.async_call("automation", "reload", blocking=False)


# ------------------------------------------------------------------ the offers

BUTTON_LABELS = {
    ACTION_TURN_OFF: "Turn off",
    ACTION_TURN_ON: "Turn on",
    ACTION_KEEP_ON: "Keep on",
    ACTION_SHUTDOWN: "Shut down",
    ACTION_DISMISS: "Dismiss",
}

# kind: title, what it is for, the message (about {sensor}), and how often it repeats (minutes, max; 0: once)
OFFERS: dict[str, dict[str, Any]] = {
    PROBLEM_ON_UNEXPECTEDLY: {
        "title": "📺 {room}: device on",
        "text": "A device is on while nothing uses it.",
        "message": "{{ state_attr(S, 'names') | join(', ') }} is on, but no activity uses it."
        "{% if state_attr(S, 'planned_action') %} It will be turned off at "
        "{{ as_timestamp(state_attr(S, 'planned_at')) | timestamp_custom('%-I:%M %p') }}.{% endif %}",
        "every": 0,
    },
    PROBLEM_DEVICE_LOST: {
        "title": "⚠️ {room}: device lost",
        "text": "A device of the running activity went off or can't be reached.",
        "message": "{{ state_attr(S, 'names') | join(', ') }} went off or can't be reached.",
        "every": 0,
    },
    PROBLEM_PICTURE_LOST: {
        "title": "🖼️ {room}: no picture",
        "text": "A check of the running activity (the picture) fails.",
        "message": "{{ state_attr(S, 'names') | join(', ') }} shows no picture.",
        "every": 0,
    },
    PROBLEM_LEFT_ON: {
        "title": "💤 {room}: left on",
        "text": "Auto-off: nothing has played for a while; the activity shuts down after a warning.",
        "message": "Nothing has played for {{ state_attr(S, 'idle_minutes') }} min. Shutting down at "
        "{{ as_timestamp(state_attr(S, 'planned_at')) | timestamp_custom('%-I:%M %p') }}.",
        "every": 0,
    },
    PROBLEM_DEVICE_ERROR: {
        "title": "🛑 {room}: device error",
        "text": "A device reports an error.",
        "message": "{{ state_attr(S, 'names') | join(', ') }} reports an error.",
        "every": 60,
    },
}


def phones(hass: HomeAssistant) -> list[dict[str, str]]:
    """Mobile app phones: device id and name (as House Modes)."""
    reg = dr.async_get(hass)
    out = []
    for entry in hass.config_entries.async_entries("mobile_app"):
        name = entry.data.get("device_name") or entry.title
        for dev in dr.async_entries_for_config_entry(reg, entry.entry_id):
            out.append({"device_id": dev.id, "name": dev.name_by_user or dev.name or name, "service": f"notify.mobile_app_{slugify(name)}"})
    return sorted(out, key=lambda p: p["name"].lower())


def sensor_of(hass: HomeAssistant, room_id: str, kind: str) -> str | None:
    """The entity ID of a room's problem sensor (it may have been renamed)."""
    return er.async_get(hass).async_get_entity_id("binary_sensor", DOMAIN, problem_unique_id(room_id, kind))


def notification_id(room_id: str, kind: str) -> str:
    return f"{ID_PREFIX}{room_id}_{kind}"


def build(hass: HomeAssistant, room_id: str, room_name: str, kind: str, devices: list[str]) -> dict[str, Any]:
    """The automation config for one offer (``use_blueprint``). Raises ValueError without the sensor."""
    sensor = sensor_of(hass, room_id, kind)
    if sensor is None:
        raise ValueError(f"no problem sensor for {room_id} / {kind}")
    offer = OFFERS[kind]
    actions = PROBLEM_ACTIONS[kind][:3]
    message = "{% set S = '" + sensor + "' %}" + offer["message"]
    inputs: dict[str, Any] = {
        "alert_trigger": [{"trigger": "state", "entity_id": sensor, "from": "off", "to": "on"}],
        "clear_trigger": [{"trigger": "state", "entity_id": sensor, "from": "on", "to": "off"}],
        "notify_device": devices,
        "notification_id": notification_id(room_id, kind),
        "notification_title": offer["title"].format(room=room_name),
        "notification_message": message,
        "enable_auto_clear": True,
        "include_action_buttons": [f"enable_action_button_{i}" for i in range(1, len(actions) + 1)],
        # Buttons are offered as long as the problem may last; the clear trigger ends it earlier
        "action_button_timeout": {"hours": 2, "minutes": 0, "seconds": 0},
        "include_cancel_button": False,
        "android_priority": "high",
        "notification_interruption_level": "time-sensitive",
    }
    if offer["every"]:
        inputs.update(
            {"repeat_notification": True, "time_between_repeat_notification": {"minutes": offer["every"]}, "max_repeat_count": 6}
        )
    for i, action in enumerate(actions, 1):
        inputs[f"action_button_{i}_label"] = BUTTON_LABELS[action]
        inputs[f"action_button_{i}_action"] = [
            {
                "action": f"{DOMAIN}.problem_action",
                "data": {"room": room_id, "problem": kind, "action": action},
            }
        ]
    title = offer["title"].split(" ", 1)[1].format(room=room_name)
    return {
        "alias": f"Easy AV Control - {title}",
        "description": f"{offer['text']} Its buttons tell Easy AV Control what to do. Made by Easy AV Control "
        "(Notifications).",
        "use_blueprint": {"path": BLUEPRINT_PATH, "input": inputs},
    }


def created(hass: HomeAssistant) -> dict[str, dict[str, Any]]:
    """Offers already made: {notification ID: the automation (entity_id, edit_id, name, state)}."""
    from homeassistant.components.automation import DATA_COMPONENT

    out: dict[str, dict[str, Any]] = {}
    for ent in getattr(hass.data.get(DATA_COMPONENT), "entities", None) or []:
        ub = (getattr(ent, "_blueprint_inputs", None) or {}).get("use_blueprint") or {}
        tag = (ub.get("input") or {}).get("notification_id") or ""
        if ub.get("path") != BLUEPRINT_PATH or not tag.startswith(ID_PREFIX):
            continue
        st = hass.states.get(ent.entity_id)
        attrs = st.attributes if st else {}
        out[tag] = {
            "entity_id": ent.entity_id,
            "edit_id": attrs.get("id"),
            "name": attrs.get("friendly_name") or ent.entity_id,
            "state": st.state if st else "unavailable",
        }
    return out


def offers_payload(hass: HomeAssistant) -> dict[str, Any]:
    have = created(hass)
    rows = []
    for coordinator in _coordinators(hass):
        for room_id, room in coordinator.rooms.items():
            for kind in PROBLEMS:
                sensor = sensor_of(hass, room_id, kind)
                if sensor is None:
                    continue
                tag = notification_id(room_id, kind)
                rows.append(
                    {
                        "room": room_id,
                        "room_name": room.get(CONF_NAME) or room_id,
                        "kind": kind,
                        "scope": PROBLEM_SCOPE[kind],
                        "title": OFFERS[kind]["title"].format(room=room.get(CONF_NAME) or room_id),
                        "text": OFFERS[kind]["text"],
                        "sensor": sensor,
                        "buttons": [BUTTON_LABELS[a] for a in PROBLEM_ACTIONS[kind][:3]],
                        "automation": have.get(tag),
                    }
                )
    return {"offers": rows, "phones": phones(hass), "blueprint": blueprint_status(hass)}


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/notify/get"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_get(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    payload = offers_payload(hass)
    payload["blueprint"] = await hass.async_add_executor_job(blueprint_status, hass)
    connection.send_result(msg["id"], payload)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/notify/build",
        vol.Required("room"): str,
        vol.Required("kind"): vol.In(PROBLEMS),
        vol.Optional("devices", default=list): [str],
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_build(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    coordinator = find_room(hass, msg["room"])
    if coordinator is None:
        connection.send_error(msg["id"], "not_found", "Unknown room")
        return
    status = await hass.async_add_executor_job(blueprint_status, hass)
    if not status["installed"]:
        await hass.async_add_executor_job(install_blueprint, hass)
        if hass.services.has_service("automation", "reload"):
            await hass.services.async_call("automation", "reload", blocking=True)
    room = coordinator.rooms[msg["room"]]
    try:
        config = build(hass, msg["room"], room.get(CONF_NAME) or msg["room"], msg["kind"], msg["devices"])
    except ValueError as err:
        connection.send_error(msg["id"], "not_found", str(err))
        return
    connection.send_result(msg["id"], {"config": config})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/notify/install", vol.Optional("force", default=False): bool})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_install(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    try:
        status = await hass.async_add_executor_job(install_blueprint, hass, msg["force"])
    except (OSError, ValueError) as err:
        connection.send_error(msg["id"], "failed", str(err))
        return
    if hass.services.has_service("automation", "reload"):
        await hass.services.async_call("automation", "reload", blocking=False)
    connection.send_result(msg["id"], status)


def async_setup_ws(hass: HomeAssistant) -> None:
    for command in (ws_get, ws_build, ws_install):
        websocket_api.async_register_command(hass, command)
