"""Quick Start: what is set up, and the steps left, as House Modes & Alarm Center shows them (admin only).

Each step has a status: done / todo (Apply does it) / manual (needs you; ``link`` opens the panel page) / optional
(useful, not needed) / skip (does not apply here). ``easy_av_control/quickstart/plan`` reads only;
``…/apply`` does the automatic steps that aren't done (install the notifications blueprint, show the editor in the
sidebar). Steps the browser checks itself (the card on a dashboard) carry ``browser: true``.

The "Other automations" step lists your own automations that switch a device a room uses: they would fight with
Easy AV Control (an old "system on" automation). Easy AV Control's own alerts are not counted.
"""
from __future__ import annotations

import json
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from . import notify
from .const import (
    CONF_ACTIVITIES,
    CONF_CHECKS,
    CONF_DEVICES,
    CONF_ENABLED,
    CONF_ENTITY_ID,
    CONF_MONITOR,
    CONF_POWER_SWITCH,
    CONF_STARTED_BY,
    DOMAIN,
)
from .detect import async_get_seen, detect_all
from .device_state import effective_source
from .history import async_get_history
from .profile_library import async_get_library
from .sidebar import async_set_sidebar, async_sidebar_visible
from .websocket import _coordinators

# Actions that switch something: an automation calling one of these on a room's device competes with Easy AV Control
_SWITCHING = (
    "turn_on", "turn_off", "toggle", "select_option", "open_cover", "close_cover", "media_play", "media_stop",
)


def _step(sid: str, title: str, status: str, detail: str = "", link: str | None = None, **extra: Any) -> dict[str, Any]:
    return {"id": sid, "title": title, "status": status, "detail": detail, "link": link, **extra}


def _rooms(hass: HomeAssistant) -> dict[str, Any]:
    rooms: dict[str, Any] = {}
    for coordinator in _coordinators(hass):
        rooms.update(coordinator.rooms)
    return rooms


def _competing(hass: HomeAssistant, rooms: dict[str, Any]) -> list[dict[str, Any]]:
    """Your enabled automations that switch a device or outlet a room uses."""
    from homeassistant.components.automation import DATA_COMPONENT

    watched: set[str] = set()
    for room in rooms.values():
        for device in room[CONF_DEVICES].values():
            watched.add(device[CONF_ENTITY_ID])
            if device.get(CONF_POWER_SWITCH):
                watched.add(device[CONF_POWER_SWITCH])
    out = []
    for ent in getattr(hass.data.get(DATA_COMPONENT), "entities", None) or []:
        st = hass.states.get(ent.entity_id)
        if st is None or st.state != "on":
            continue
        raw = getattr(ent, "raw_config", None) or {}
        inputs = ((raw.get("use_blueprint") or {}).get("input") or {})
        if str(inputs.get("notification_id", "")).startswith(notify.ID_PREFIX):
            continue
        actions = json.dumps(raw.get("actions", raw.get("action")) or [])
        if not any(f".{a}" in actions for a in _SWITCHING):
            continue
        hits = sorted(e for e in watched if f'"{e}"' in actions)
        if hits:
            out.append(
                {
                    "entity_id": ent.entity_id,
                    "name": st.attributes.get("friendly_name") or ent.entity_id,
                    "edit_id": st.attributes.get("id"),
                    "entities": hits,
                }
            )
    return sorted(out, key=lambda a: a["name"].lower())


async def async_plan(hass: HomeAssistant) -> dict[str, Any]:
    rooms = _rooms(hass)
    library = await async_get_library(hass)
    seen = await async_get_seen(hass)
    detected = detect_all(hass, library.profiles, rooms, seen)
    history = await async_get_history(hass)
    blueprint = await hass.async_add_executor_job(notify.blueprint_status, hass)
    sidebar = await async_sidebar_visible(hass)
    offers = notify.offers_payload(hass)["offers"]

    devices = [(r, d, dev) for r, room in rooms.items() for d, dev in room[CONF_DEVICES].items()]
    activities = [(r, a, act) for r, room in rooms.items() for a, act in room[CONF_ACTIVITIES].items()]
    no_status = [dev.get("name") or dev[CONF_ENTITY_ID] for _, _, dev in devices if effective_source(hass, library.profiles, dev) is None]
    ok_runs = [run for run in history.runs if run.get("mode") == "start" and run.get("result") in ("ok", "warning")]
    competing = _competing(hass, rooms)
    harmony = any(dev[CONF_ENTITY_ID].startswith("select.harmony") for _, _, dev in devices)
    started_by = any(act.get(CONF_STARTED_BY) for _, _, act in activities)
    auto_off = any((act.get(CONF_MONITOR) or {}).get("idle_after") for _, _, act in activities)
    checks = any(act.get(CONF_CHECKS) for _, _, act in activities)
    made = [o for o in offers if o.get("automation")]

    steps = [
        _step(
            "rooms", "A room", "done" if rooms else "manual",
            f"{len(rooms)} room(s)" if rooms else "+ beside ROOMS in the menu, or Detect integrations makes one", "rooms",
        ),
        _step(
            "detect", "Your AV devices", "done" if devices and not detected["new"] else ("manual" if not devices else "optional"),
            (f"{len(devices)} device(s)" + (f"; Detect integrations found {len(detected['new'])} more" if detected["new"] else ""))
            if devices else "Detect integrations finds them and adds them with the right integration for each job",
            "detect",
        ),
        _step(
            "status", "Easy AV Control can read each device's status", "done" if devices and not no_status else ("skip" if not devices else "optional"),
            "every device has a profile" if devices and not no_status
            else f"no status for {', '.join(no_status)}: they use fixed times, and can't be watched. Profiles → + Profile" if no_status else "",
            "profiles",
        ),
        _step(
            "activity", "An activity with its devices",
            "done" if any(act[CONF_DEVICES] for _, _, act in activities) else "manual",
            f"{len(activities)} activit{'y' if len(activities) == 1 else 'ies'}" if activities else "Activities tab → + Activity, then its Flow",
            "activities",
        ),
        _step(
            "competing", "No other automation switches the AV devices", "done" if not competing else "manual",
            "" if not competing else "these would switch devices alongside Easy AV Control: turn them off, or keep only their lights",
            None, automations=competing,
        ),
        _step(
            "tested", "A startup that worked", "done" if ok_runs else ("manual" if activities else "skip"),
            f"{len(ok_runs)} run(s) in Reports" if ok_runs else "press and hold Startup on the activity's page; Reports shows how long it took",
            "reports",
        ),
        _step(
            "checks", "Checks: does it work once it's on (a picture)", "done" if checks else ("optional" if activities else "skip"),
            "" if checks else "the activity's Flow → + Check", "activities",
        ),
        _step(
            "started_by", "The Harmony remote starts the activity", "done" if started_by else ("optional" if harmony else "skip"),
            "" if started_by else "the activity's Flow → + Started by → the hub's Activities", "activities",
        ),
        _step(
            "auto_off", "Auto-off when nothing plays", "done" if auto_off else ("optional" if activities else "skip"),
            "" if auto_off else "the activity's Flow → Monitoring → + Auto-off", "activities",
        ),
        _step(
            "blueprint", "Notifications blueprint", "done" if blueprint["installed"] else "todo",
            f"Smart Repeating Alerts {blueprint['installed_version']}" if blueprint["installed"] else "Apply installs Smart Repeating Alerts",
        ),
        _step(
            "notifications", "Notifications for Watchdog and Monitoring", "done" if made else ("optional" if rooms else "skip"),
            f"{len(made)} made" if made else "Notifications → Create, for the problems you want on your phone", "notifications",
        ),
        _step("card", "The remote control card on a dashboard", "manual", "", None, browser=True, yaml="type: custom:easy-av-control-card"),
        _step(
            "sidebar", "Editor in the sidebar", "done" if sidebar else "optional",
            "" if sidebar else "Apply shows Easy AV Control in Home Assistant's sidebar",
        ),
    ]
    status = {
        "rooms": len(rooms),
        "devices": len(devices),
        "activities": len(activities),
        "disabled": sum(1 for _, _, act in activities if act.get(CONF_ENABLED) is False),
        "runs": len(history.runs),
        "alerts": len(made),
        "blueprint": blueprint["installed"],
    }
    return {"status": status, "steps": steps, "todo": sum(1 for s in steps if s["status"] == "todo")}


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/quickstart/plan"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_plan(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    connection.send_result(msg["id"], await async_plan(hass))


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/quickstart/apply", vol.Optional("sidebar", default=False): bool}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_apply(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """The automatic steps: the blueprint; the sidebar only when asked (it is optional)."""
    done: list[str] = []
    status = await hass.async_add_executor_job(notify.blueprint_status, hass)
    if not status["installed"]:
        await hass.async_add_executor_job(notify.install_blueprint, hass)
        if hass.services.has_service("automation", "reload"):
            await hass.services.async_call("automation", "reload", blocking=False)
        done.append("blueprint")
    if msg["sidebar"] and not await async_sidebar_visible(hass):
        await async_set_sidebar(hass, True)
        done.append("sidebar")
    connection.send_result(msg["id"], {"done": done, **(await async_plan(hass))})


def async_setup_ws(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_plan)
    websocket_api.async_register_command(hass, ws_apply)
