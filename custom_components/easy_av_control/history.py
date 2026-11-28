"""Reports: a history of every run (start or stop of an activity) and of every measured device time.

Kept in ``.storage/easy_av_control.history``, shared by all config entries:

- **runs**, newest last, at most ``MAX_RUNS``: room, activity, start or stop, switching from which activity,
  when, how long in total, the result (ok, warning, error, cancelled) and its phases: each device brought up
  or switched off, the checks, the actions after start, the actions on start or stop.
- **lanes** (in each run): per device, what its status said while the run went on (off, standby, warming, on …)
  as segments from second to second, for the colours of the time line, and when the device was switched on
  (``sent``), so the time line can say how long it took to report on.
- **devices**: per device entity, at most ``MAX_DEVICE_SAMPLES`` events: when, on, off, picture or signal (how
  long a check took to pass, counted from switching the device on), how long, the
  result (ok, or what went wrong: timeout, unavailable, …) and which room and activity it was for.

- **traces**, for the last ``MAX_TRACES`` runs: everything that happened, in order, with times: what the run
  was busy with, every service call and its result, every state change of the room's entities (device,
  status, outlets, remotes, checks) with the entity's availability, warnings; and every such entity's state
  and attributes at the start and the end. Exported (history/export) for troubleshooting.

The short list in device_timings.py (the last 10 good times, for typical times and suggested timeouts) stays
as it is; this is the longer record the Reports page shows.
"""
from __future__ import annotations

import contextlib

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.const import __version__ as ha_version
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.helpers.storage import Store
from homeassistant.loader import async_get_integration
from homeassistant.util import dt as dt_util

from .const import DOMAIN

MAX_RUNS = 300
MAX_DEVICE_SAMPLES = 100
MAX_TRACES = 30
MAX_TRACE_EVENTS = 2000
MAX_LANE_SEGMENTS = 60
_DATA = f"{DOMAIN}_history"


class History:
    """The stored history; changes are saved a few seconds later."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, 1, f"{DOMAIN}.history")
        self.runs: list[dict[str, Any]] = []
        self.devices: dict[str, list[dict[str, Any]]] = {}
        # run id -> its trace
        self.traces: dict[str, dict[str, Any]] = {}

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.runs = [r for r in data.get("runs") or [] if isinstance(r, dict)][-MAX_RUNS:]
        self.devices = {
            k: [e for e in v if isinstance(e, dict)][-MAX_DEVICE_SAMPLES:]
            for k, v in (data.get("devices") or {}).items()
            if isinstance(v, list)
        }
        self.traces = {k: v for k, v in (data.get("traces") or {}).items() if isinstance(v, dict)}

    @callback
    def _save(self) -> None:
        self._store.async_delay_save(
            lambda: {"runs": self.runs, "devices": self.devices, "traces": self.traces}, 5
        )

    @callback
    def add_run(self, run: dict[str, Any], trace: dict[str, Any] | None = None) -> None:
        self.runs = [*self.runs, run][-MAX_RUNS:]
        if trace is not None and run.get("id"):
            self.traces[run["id"]] = trace
            for old in list(self.traces)[:-MAX_TRACES]:
                del self.traces[old]
        self._save()

    @callback
    def add_device_event(self, entity_id: str, event: dict[str, Any]) -> None:
        self.devices[entity_id] = [*self.devices.get(entity_id, []), event][-MAX_DEVICE_SAMPLES:]
        self._save()

    @callback
    def clear(self) -> None:
        self.runs = []
        self.devices = {}
        self.traces = {}
        self._save()


async def async_get_history(hass: HomeAssistant) -> History:
    if (history := hass.data.get(_DATA)) is None:
        history = History(hass)
        await history.async_load()
        hass.data[_DATA] = history
    return history


def history_of(hass: HomeAssistant) -> History | None:
    """The history if it is loaded (it is once any entry is set up)."""
    return hass.data.get(_DATA)


def sent_at(events: list[dict[str, Any]], device: str) -> float | None:
    """When the run began switching a device on (seconds into the run), from its trace; None when it was on already
    (nothing was sent). It is the moment the flow turned to the device, a moment before the command itself."""
    for event in events:
        if event.get("event") == "doing" and event.get("kind") == "turn_on" and event.get("device") == device:
            return float(event.get("t") or 0)
    return None


class RunRecorder:
    """Times one start or stop and its phases, then adds it to the history."""

    def __init__(self, hass: HomeAssistant, **info: Any) -> None:
        self._hass = hass
        self._t0 = hass.loop.time()
        self._phase: dict[str, Any] | None = None
        at = dt_util.utcnow()
        self.run: dict[str, Any] = {"id": f"{at.strftime('%Y%m%d%H%M%S%f')}-{info.get('room')}", "at": at.isoformat(),
                                    **info, "phases": []}
        self.events: list[dict[str, Any]] = []
        self._entities: list[str] = []
        self._start_states: dict[str, Any] = {}
        self._unsub: Any = None
        # What each device's status said during the run, for the time line: see lane()
        self._lanes: list[dict[str, Any]] = []

    def event(self, event: str, **data: Any) -> None:
        """One line of the trace: ``event`` is what happened (doing, call, state, warning …)."""
        if len(self.events) < MAX_TRACE_EVENTS:
            self.events.append({"t": self._now(), "event": event, **data})

    def watch(self, entity_ids: list[str], available: Any) -> None:
        """Record the entities' states now, and every change until the run ends. ``available(entity_id)`` says
        whether the integration reports the entity available (the state may lag)."""
        self._entities = sorted(set(entity_ids))
        self._available = available
        self._start_states = {e: self._snapshot(e) for e in self._entities}

        @callback
        def _changed(event: Any) -> None:
            self._lane_changed(event.data["entity_id"], event.data.get("new_state"))
            new = event.data.get("new_state")
            old = event.data.get("old_state")
            self.event(
                "state",
                entity_id=event.data["entity_id"],
                old=old.state if old is not None else None,
                new=new.state if new is not None else None,
                available=available(event.data["entity_id"]),
                attributes=_attributes(new),
                context=new.context.id if new is not None else None,
            )

        if self._entities:
            self._unsub = async_track_state_change_event(self._hass, self._entities, _changed)

    def lane(self, device: str, name: str, entity_id: str, read: Any) -> None:
        """Follow what a device's status says during the run, as segments (start, end, its word for it, and
        the group: on / starting / stopping / off / error / unknown). ``read(state)`` gives (word, group). Call
        after watch(): the entity is one of the watched ones."""
        word, group = read(self._hass.states.get(entity_id))
        self._lanes.append(
            {"device": device, "name": name, "entity_id": entity_id, "_read": read,
             "segments": [{"start": 0.0, "value": word, "group": group}]}
        )

    @callback
    def _lane_changed(self, entity_id: str, state: Any) -> None:
        for lane in self._lanes:
            if lane["entity_id"] != entity_id or len(lane["segments"]) >= MAX_LANE_SEGMENTS:
                continue
            word, group = lane["_read"](state)
            last = lane["segments"][-1]
            if (word, group) != (last["value"], last["group"]):
                lane["segments"].append({"start": self._now(), "value": word, "group": group})

    def _snapshot(self, entity_id: str) -> dict[str, Any]:
        state = self._hass.states.get(entity_id)
        return {
            "state": state.state if state is not None else None,
            "available": self._available(entity_id),
            "attributes": _attributes(state),
            "last_changed": state.last_changed.isoformat() if state is not None else None,
        }

    def _now(self) -> float:
        return round(self._hass.loop.time() - self._t0, 1)

    def phase(self, kind: str, **info: Any) -> None:
        """Start a phase; the one running before it ends now."""
        self.end_phase()
        self._phase = {"kind": kind, "start": self._now(), **info}

    def end_phase(self, result: str | None = None) -> None:
        if self._phase is None:
            return
        self._phase["seconds"] = round(self._now() - self._phase["start"], 1)
        if result:
            self._phase["result"] = result
        self.run["phases"].append(self._phase)
        self._phase = None

    def finish(self, result: str, *, error: str | None = None, warnings: list[str] | None = None) -> None:
        if self._unsub is not None:
            self._unsub()
            self._unsub = None
        self.event("finish", result=result, **({"error": error} if error else {}))
        self.end_phase("error" if result in ("error", "cancelled") else None)
        self.run.update(seconds=self._now(), result=result)
        if error:
            self.run["error"] = error
        if warnings:
            self.run["warnings"] = list(warnings)
            if result == "ok":
                self.run["result"] = "warning"
        end = self.run["seconds"]
        lanes = []
        for lane in self._lanes:
            segments = lane["segments"]
            for i, seg in enumerate(segments):
                seg["end"] = segments[i + 1]["start"] if i + 1 < len(segments) else max(end, seg["start"])
            lanes.append({**{k: v for k, v in lane.items() if k != "_read"}, "sent": sent_at(self.events, lane["device"])})
        if lanes:
            self.run["lanes"] = lanes
        trace = {
            "entities": self._entities,
            "start": self._start_states,
            "end": {e: self._snapshot(e) for e in self._entities},
            "events": self.events,
        }
        if (history := history_of(self._hass)) is not None:
            history.add_run(self.run, trace)


def _attributes(state: Any) -> dict[str, Any] | None:
    """An entity's attributes for the trace, without pictures and long lists."""
    if state is None:
        return None
    out: dict[str, Any] = {}
    for key, value in state.attributes.items():
        if key in ("entity_picture", "entity_picture_local"):
            continue
        if isinstance(value, (list, tuple)) and len(value) > 30:
            value = [*value[:30], f"… {len(value) - 30} more"]
        elif isinstance(value, str) and len(value) > 300:
            value = value[:300] + "…"
        out[key] = value if isinstance(value, (str, int, float, bool, type(None), list, tuple, dict)) else str(value)
    return out


@callback
def async_setup_ws(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_history_entities)
    websocket_api.async_register_command(hass, ws_history)
    websocket_api.async_register_command(hass, ws_history_clear)
    websocket_api.async_register_command(hass, ws_history_export)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/history/entities"})
@websocket_api.require_admin
@callback
def ws_history_entities(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Per room: the entities Easy AV Control creates and the ones it relies on, with their roles."""
    from .websocket import _coordinators

    rooms = {}
    for coordinator in _coordinators(hass):
        for room_id, room in coordinator.rooms.items():
            rooms[room_id] = {
                "name": room.get("name") or room_id,
                "devices": {d: coordinator.device_name(dev) for d, dev in room["devices"].items()},
                "activities": {a: coordinator.activity_name(room_id, a) for a in room["activities"]},
                **coordinator.entity_map(room_id),
            }
    connection.send_result(msg["id"], {"rooms": rooms})


def lanes_from_trace(run: dict[str, Any], trace: dict[str, Any], devices: list[tuple[str, str, str, Any]]) -> list[dict[str, Any]]:
    """The lanes of a run kept before the lanes were recorded, rebuilt from its trace: the entities' states at
    the start and every state change after. ``devices``: (device id, name, status entity, read) as lane()."""
    from types import SimpleNamespace

    def state_of(snapshot: dict[str, Any] | None) -> Any:
        if not snapshot or snapshot.get("state") is None:
            return None
        return SimpleNamespace(state=snapshot["state"], attributes=snapshot.get("attributes") or {})

    end = float(run.get("seconds") or 0)
    lanes = []
    for device, name, entity_id, read in devices:
        start = (trace.get("start") or {}).get(entity_id)
        if start is None and not any(e.get("entity_id") == entity_id for e in trace.get("events") or []):
            continue
        word, group = read(state_of(start))
        segments = [{"start": 0.0, "value": word, "group": group}]
        for event in trace.get("events") or []:
            if event.get("event") != "state" or event.get("entity_id") != entity_id or len(segments) >= MAX_LANE_SEGMENTS:
                continue
            state = None if event.get("new") is None else SimpleNamespace(state=event["new"], attributes=event.get("attributes") or {})
            word, group = read(state)
            if (word, group) != (segments[-1]["value"], segments[-1]["group"]):
                segments.append({"start": float(event.get("t") or 0), "value": word, "group": group})
        for i, seg in enumerate(segments):
            seg["end"] = segments[i + 1]["start"] if i + 1 < len(segments) else max(end, seg["start"])
        lanes.append({"device": device, "name": name, "entity_id": entity_id, "segments": segments,
                      "sent": sent_at(trace.get("events") or [], device)})
    return lanes


@callback
def rebuild_lanes(hass: HomeAssistant, history: History) -> int:
    """Give the runs kept before the lanes existed their lanes, from their traces (the last ``MAX_TRACES`` runs
    have one), using the devices as they are configured now. A run without a trace, or whose room or devices are
    gone, keeps its bars. Returns how many runs were changed."""
    from .websocket import _coordinators

    changed = 0
    for run in history.runs:
        trace = history.traces.get(run.get("id", ""))
        # Lanes from build .35 have no "sent" (when the device was switched on): they are made again
        if trace is None or (run.get("lanes") is not None and all("sent" in lane for lane in run["lanes"])):
            continue
        coordinator = next((c for c in _coordinators(hass) if run.get("room") in c.rooms), None)
        room = coordinator.rooms.get(run.get("room")) if coordinator is not None else None
        activity = (room or {}).get("activities", {}).get(run.get("activity")) if room else None
        if coordinator is None or room is None or activity is None:
            continue
        devices = []
        for device_id in activity.get("devices", []):
            device = room["devices"].get(device_id)
            if device is None:
                continue
            with contextlib.suppress(Exception):
                source = coordinator.state_source(device)
                if source is not None:
                    devices.append(
                        (device_id, coordinator.device_name(device), source.entity_id,
                         lambda st, src=source: (src.value(st) or (st.state if st is not None else "unknown"), src.group(st)))
                    )
        lanes = lanes_from_trace(run, trace, devices)
        run["lanes"] = lanes     # an empty list: looked at, nothing to show (not tried again)
        changed += 1
    if changed:
        history._save()
    return changed


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/history/get"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_history(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Every stored run and device event, for the Reports page."""
    history = await async_get_history(hass)
    rebuild_lanes(hass, history)
    connection.send_result(msg["id"], {"runs": history.runs, "devices": history.devices})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/history/clear"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_history_clear(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    (await async_get_history(hass)).clear()
    connection.send_result(msg["id"], {})


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/history/export", vol.Optional("run"): str}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_history_export(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """A report to share for troubleshooting: one run with its trace, or everything. With the versions, the rooms
    as configured, the profiles they use and every entry's state."""
    history = await async_get_history(hass)
    runs = history.runs
    if (run_id := msg.get("run")) is not None:
        runs = [r for r in runs if r.get("id") == run_id]
        if not runs:
            connection.send_error(msg["id"], "not_found", "Unknown run")
            return
    traces = {r["id"]: history.traces[r["id"]] for r in runs if r.get("id") in history.traces}
    entity_ids = {e for t in traces.values() for e in t.get("entities") or []}
    rooms = {}
    for coordinator in hass.data.get(DOMAIN, {}).values():
        if hasattr(coordinator, "rooms"):
            rooms[coordinator.entry.entry_id] = coordinator.rooms
            for room in coordinator.rooms.values():
                for device in room.get("devices", {}).values():
                    entity_ids.add(device.get("entity_id"))
    platforms: dict[str, Any] = {}
    registry = er.async_get(hass)
    for entity_id in sorted(e for e in entity_ids if e):
        if (entry := registry.async_get(entity_id)) is not None and entry.platform not in platforms:
            try:
                platforms[entry.platform] = (await async_get_integration(hass, entry.platform)).version or "core"
            except Exception:  # noqa: BLE001 - a version is a nicety
                platforms[entry.platform] = None
    report = {
        "exported_at": dt_util.utcnow().isoformat(),
        "home_assistant": ha_version,
        "easy_av_control": hass.data.get(f"{DOMAIN}_version"),
        "integrations": platforms,
        "runs": runs,
        "traces": traces,
        "devices": {e: v for e, v in history.devices.items() if run_id is None or e in entity_ids},
        "rooms": rooms,
        "states_now": {
            e: {"state": s.state, "attributes": _attributes(s)}
            for e in sorted(x for x in entity_ids if x)
            if (s := hass.states.get(e)) is not None
        },
    }
    connection.send_result(msg["id"], report)
