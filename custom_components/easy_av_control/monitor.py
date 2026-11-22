"""Monitor: what goes wrong between startups and shutdowns, as problems the integration acts on.

Every few seconds the monitor looks at each room with the devices' status from their profiles:

- ``on_unexpectedly``: a watched device is on (or starting) while nothing uses it: the room is idle, or its
  activity doesn't include the device. After the device's grace time. With ``watch.mode: turn_off`` the device is
  turned off ``watch.turn_off_after`` seconds later.
- ``device_lost``: while an activity is active, one of its devices is off or unreachable for ``lost_after``.
- ``picture_lost``: while an activity is active, one of its checks (a picture) fails for ``picture_lost_after``.
- ``left_on``: while an activity is active, none of its media players has played for ``idle_after``: the activity
  shuts down ``idle_warning`` seconds later (auto-off).
- ``device_error``: a device reports an error state, at any time.

Each problem kind is a binary sensor per room (binary_sensor.py), on while the problem lasts, so a notification
automation has a natural start and end. Changes while the room starts or stops never count, nor do devices whose
outlet or turn-off is pending.

What to do about a problem comes in through ``easy_av_control.monitor_action`` (a notification button calls it):
the integration does it. ``keep_on`` and ``dismiss`` silence the problem until its cause is gone.
"""
from __future__ import annotations

from collections.abc import Callable
import contextlib
from dataclasses import dataclass, field
from datetime import timedelta
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.core import CALLBACK_TYPE, Context, HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.util import dt as dt_util

from .const import (
    ACTION_DISMISS,
    ACTION_KEEP_ON,
    ACTION_SHUTDOWN,
    ACTION_TURN_OFF,
    ACTION_TURN_ON,
    ACTIVITY_STATE_ACTIVE,
    ACTIVITY_STATE_STARTING,
    ACTIVITY_STATE_STOPPING,
    CONF_ACTIVITIES,
    CONF_CHECKS,
    CONF_DEVICE,
    CONF_DEVICES,
    CONF_ENTITY_ID,
    CONF_GRACE,
    CONF_IDLE_AFTER,
    CONF_IDLE_WARNING,
    CONF_LOST_AFTER,
    CONF_MODE,
    CONF_MONITOR,
    CONF_PICTURE_LOST_AFTER,
    CONF_TURN_OFF_AFTER,
    CONF_WATCH,
    DEFAULT_IDLE_WARNING,
    DEFAULT_LOST_AFTER,
    DEFAULT_PICTURE_LOST_AFTER,
    DEFAULT_WATCH_GRACE,
    DEFAULT_WATCH_TURN_OFF_AFTER,
    EVENT_MONITOR,
    PROBLEM_ACTIONS,
    PROBLEM_DEVICE_ERROR,
    PROBLEM_DEVICE_LOST,
    PROBLEM_LEFT_ON,
    PROBLEM_ON_UNEXPECTEDLY,
    PROBLEM_PICTURE_LOST,
    PROBLEMS,
    WATCH_NOTIFY,
    WATCH_OFF,
    WATCH_TURN_OFF,
)
from .device_profiles import GROUP_ERROR, GROUP_OFF, GROUP_ON, GROUP_STARTING
from .device_state import check_source

if TYPE_CHECKING:
    from .coordinator import EasyAVControlCoordinator

_LOGGER = logging.getLogger(__name__)

TICK = timedelta(seconds=5)
# An error state must hold this long
ERROR_GRACE = 5.0
# The whole room counts, for left_on: a problem key without a device
ROOM = ""
_PLAYING = ("playing", "buffering")


def watch_of(device: dict[str, Any]) -> dict[str, Any]:
    """A device's watch settings, with the defaults (notify after 2 min)."""
    watch = device.get(CONF_WATCH) or {}
    return {
        CONF_MODE: watch.get(CONF_MODE, WATCH_NOTIFY),
        CONF_GRACE: watch.get(CONF_GRACE, DEFAULT_WATCH_GRACE),
        CONF_TURN_OFF_AFTER: watch.get(CONF_TURN_OFF_AFTER, DEFAULT_WATCH_TURN_OFF_AFTER),
    }


def monitor_of(activity: dict[str, Any]) -> dict[str, Any]:
    """An activity's monitor settings, with the defaults (lost and picture after 60 s, no auto-off)."""
    monitor = activity.get(CONF_MONITOR) or {}
    return {
        CONF_LOST_AFTER: monitor.get(CONF_LOST_AFTER, DEFAULT_LOST_AFTER),
        CONF_PICTURE_LOST_AFTER: monitor.get(CONF_PICTURE_LOST_AFTER, DEFAULT_PICTURE_LOST_AFTER),
        CONF_IDLE_AFTER: monitor.get(CONF_IDLE_AFTER, 0),
        CONF_IDLE_WARNING: monitor.get(CONF_IDLE_WARNING, DEFAULT_IDLE_WARNING),
    }


@dataclass
class Problem:
    """One device's (or the room's) problem of one kind."""

    since: str
    raised: float
    # When the integration acts by itself (turn off, shut down), on the monitor's clock; None: it won't
    planned: float | None = None
    planned_action: str | None = None
    done: bool = False
    detail: dict[str, Any] = field(default_factory=dict)


class Monitor:
    """The problems of one config entry's rooms."""

    def __init__(self, coordinator: EasyAVControlCoordinator) -> None:
        self.coordinator = coordinator
        self.hass: HomeAssistant = coordinator.hass
        self.now: Callable[[], float] = lambda: self.hass.loop.time()
        # room -> kind -> device ("" for the room) -> problem
        self.problems: dict[str, dict[str, dict[str, Problem]]] = {}
        # (room, kind, device) -> since when the condition holds
        self._seen: dict[tuple[str, str, str], float] = {}
        # Silenced by keep_on / dismiss, until the condition is gone
        self._silenced: set[tuple[str, str, str]] = set()
        # room -> since when nothing of its active activity plays
        self._idle_since: dict[str, float] = {}
        self._unsub: CALLBACK_TYPE | None = None

    # ------------------------------------------------------------------ life cycle

    def start(self) -> None:
        if self._unsub is None:
            self._unsub = async_track_time_interval(self.hass, self._tick, TICK, name="easy_av_control monitor")

    def stop(self) -> None:
        if self._unsub is not None:
            self._unsub()
            self._unsub = None

    @callback
    def _tick(self, _now: Any = None) -> None:
        self.hass.async_create_task(self.async_tick(), eager_start=True)

    # ------------------------------------------------------------------ reading

    def room_problems(self, room_id: str, kind: str) -> dict[str, Problem]:
        return self.problems.get(room_id, {}).get(kind, {})

    def attributes(self, room_id: str, kind: str) -> dict[str, Any]:
        """What a problem's binary sensor shows: which devices, since when, what is planned, what can be done."""
        problems = self.room_problems(room_id, kind)
        room = self.coordinator.rooms.get(room_id, {})
        devices = room.get(CONF_DEVICES, {})
        attrs: dict[str, Any] = {"actions": list(PROBLEM_ACTIONS[kind])}
        named = [d for d in problems if d != ROOM and d in devices]
        if named:
            attrs["devices"] = named
            attrs["names"] = [self.coordinator._device_name(devices[d]) for d in named]
            attrs["entity_ids"] = [devices[d][CONF_ENTITY_ID] for d in named]
        if problems:
            attrs["since"] = min(p.since for p in problems.values())
            planned = [p for p in problems.values() if p.planned is not None and not p.done]
            if planned:
                first = min(planned, key=lambda p: p.planned or 0)
                attrs["planned_action"] = first.planned_action
                attrs["planned_at"] = (
                    dt_util.utcnow() + timedelta(seconds=max(0.0, (first.planned or 0) - self.now()))
                ).isoformat()
            for problem in problems.values():
                attrs.update(problem.detail)
        return attrs

    # ------------------------------------------------------------------ the checks

    def _in_use(self) -> set[str]:
        """Entities a starting, running or stopping activity of any room uses, or that wait for a cut."""
        from .coordinator import EasyAVControlCoordinator

        used: set[str] = set()
        for coordinator in [
            c for c in self.hass.data.get("easy_av_control", {}).values() if isinstance(c, EasyAVControlCoordinator)
        ] or [self.coordinator]:
            for room_id, rt in coordinator._runtime.items():
                used.update(rt.pending_cuts)
                room = coordinator.rooms.get(room_id)
                if room is None or rt.activity is None:
                    continue
                activity = room[CONF_ACTIVITIES].get(rt.activity)
                if activity is not None:
                    used.update(room[CONF_DEVICES][d][CONF_ENTITY_ID] for d in activity[CONF_DEVICES])
        return used

    def _conditions(self, room_id: str, room: dict[str, Any], in_use: set[str]) -> dict[tuple[str, str], dict[str, Any]]:
        """What is wrong now in a room: (kind, device) -> its settings (grace, and what to do by itself)."""
        coordinator = self.coordinator
        rt = coordinator.runtime(room_id)
        devices: dict[str, Any] = room[CONF_DEVICES]
        found: dict[tuple[str, str], dict[str, Any]] = {}
        busy = rt.state in (ACTIVITY_STATE_STARTING, ACTIVITY_STATE_STOPPING)

        groups: dict[str, str | None] = {}
        for device_id, device in devices.items():
            source = coordinator.state_source(device)
            groups[device_id] = source.current(self.hass)[0] if source is not None else None
            if groups[device_id] == GROUP_ERROR:
                found[(PROBLEM_DEVICE_ERROR, device_id)] = {"grace": ERROR_GRACE}

        if not busy:
            for device_id, device in devices.items():
                watch = watch_of(device)
                if watch[CONF_MODE] == WATCH_OFF or groups[device_id] not in (GROUP_ON, GROUP_STARTING):
                    continue
                if device[CONF_ENTITY_ID] in in_use:
                    continue
                found[(PROBLEM_ON_UNEXPECTEDLY, device_id)] = {
                    "grace": watch[CONF_GRACE],
                    **(
                        {"after": watch[CONF_TURN_OFF_AFTER], "then": ACTION_TURN_OFF}
                        if watch[CONF_MODE] == WATCH_TURN_OFF
                        else {}
                    ),
                }

        if rt.state != ACTIVITY_STATE_ACTIVE or rt.activity is None:
            self._idle_since.pop(room_id, None)
            return found
        activity = room[CONF_ACTIVITIES].get(rt.activity)
        if activity is None:
            return found
        monitor = monitor_of(activity)

        if monitor[CONF_LOST_AFTER]:
            for device_id in activity[CONF_DEVICES]:
                entity_id = devices[device_id][CONF_ENTITY_ID]
                group = groups[device_id]
                lost = coordinator._entity_unavailable(entity_id) or (
                    group == GROUP_OFF if group is not None else coordinator._is_off(entity_id)
                )
                if lost:
                    found[(PROBLEM_DEVICE_LOST, device_id)] = {"grace": monitor[CONF_LOST_AFTER]}

        if monitor[CONF_PICTURE_LOST_AFTER]:
            for check in activity.get(CONF_CHECKS) or []:
                device = devices[check[CONF_DEVICE]]
                source = check_source(self.hass, coordinator.profiles, device, check)
                if source is not None and source[0].current(self.hass)[0] != GROUP_ON:
                    found[(PROBLEM_PICTURE_LOST, check[CONF_DEVICE])] = {"grace": monitor[CONF_PICTURE_LOST_AFTER]}

        if monitor[CONF_IDLE_AFTER]:
            players = [
                devices[d][CONF_ENTITY_ID]
                for d in activity[CONF_DEVICES]
                if devices[d][CONF_ENTITY_ID].startswith("media_player.")
            ]
            playing = any((s := self.hass.states.get(e)) is not None and s.state in _PLAYING for e in players)
            if not players or playing:
                self._idle_since.pop(room_id, None)
            else:
                since = self._idle_since.setdefault(room_id, self.now())
                if self.now() - since >= monitor[CONF_IDLE_AFTER]:
                    found[(PROBLEM_LEFT_ON, ROOM)] = {
                        "grace": 0,
                        "after": monitor[CONF_IDLE_WARNING],
                        "then": ACTION_SHUTDOWN,
                        "detail": {"idle_minutes": round(monitor[CONF_IDLE_AFTER] / 60)},
                    }
        return found

    async def async_tick(self) -> None:
        """Raise what has held past its grace, clear what is gone, and do what is planned and due."""
        now = self.now()
        in_use = self._in_use()
        changed = False
        for room_id, room in self.coordinator.rooms.items():
            found = self._conditions(room_id, room, in_use)
            current = self.problems.setdefault(room_id, {kind: {} for kind in PROBLEMS})
            # Gone: clear it, forget its silence
            for kind in PROBLEMS:
                for device_id in list(current[kind]):
                    if (kind, device_id) not in found:
                        del current[kind][device_id]
                        self._fire(room_id, kind, device_id, "cleared")
                        changed = True
            for key in [k for k in self._seen if k[0] == room_id and (k[1], k[2]) not in found]:
                del self._seen[key]
                self._silenced.discard(key)
            # New or still there
            for (kind, device_id), settings in found.items():
                key = (room_id, kind, device_id)
                first = self._seen.setdefault(key, now)
                if key in self._silenced or device_id in current[kind] or now - first < settings["grace"]:
                    continue
                current[kind][device_id] = Problem(
                    since=dt_util.utcnow().isoformat(),
                    raised=now,
                    planned=now + settings["after"] if "then" in settings else None,
                    planned_action=settings.get("then"),
                    detail=settings.get("detail", {}),
                )
                _LOGGER.info("Room '%s': %s%s", room_id, kind, f" ({device_id})" if device_id else "")
                self._fire(room_id, kind, device_id, "raised")
                changed = True
            # Due: act
            for kind in PROBLEMS:
                for device_id, problem in list(current[kind].items()):
                    if problem.planned is not None and not problem.done and now >= problem.planned:
                        problem.done = True
                        changed = True
                        await self._async_do(room_id, kind, problem.planned_action or "", [device_id], by="monitor")
        if changed:
            self.coordinator.async_update_listeners()

    # ------------------------------------------------------------------ acting

    async def async_action(self, room_id: str, kind: str, action: str, device_id: str | None = None) -> None:
        """What a notification button (or anyone) asks for. Raises ValueError for an action the problem hasn't."""
        if kind not in PROBLEM_ACTIONS or action not in PROBLEM_ACTIONS[kind]:
            raise ValueError(f"'{action}' is not an action of {kind}: {', '.join(PROBLEM_ACTIONS.get(kind, []))}")
        problems = self.room_problems(room_id, kind)
        targets = [device_id] if device_id else list(problems)
        await self._async_do(room_id, kind, action, targets, by="action")
        self.coordinator.async_update_listeners()

    async def _async_do(self, room_id: str, kind: str, action: str, targets: list[str], *, by: str) -> None:
        coordinator = self.coordinator
        devices = coordinator.rooms.get(room_id, {}).get(CONF_DEVICES, {})
        _LOGGER.info("Room '%s': %s → %s %s (%s)", room_id, kind, action, targets, by)
        self._fire(room_id, kind, ",".join(t for t in targets if t), action, by=by)
        if action in (ACTION_KEEP_ON, ACTION_DISMISS):
            for device_id in targets:
                self._silenced.add((room_id, kind, device_id))
                self.problems.get(room_id, {}).get(kind, {}).pop(device_id, None)
            if kind == PROBLEM_LEFT_ON:
                # Its idle time starts again
                self._idle_since[room_id] = self.now()
                self._silenced.discard((room_id, kind, ROOM))
            return
        if action == ACTION_SHUTDOWN:
            coordinator._triggered[room_id] = {"entity_id": "monitor", "state": kind}
            self.hass.async_create_task(coordinator.async_stop_activity(room_id))
            return
        for device_id in targets:
            device = devices.get(device_id)
            if device is None:
                continue
            with contextlib.suppress(Exception):
                if action == ACTION_TURN_OFF:
                    await coordinator._async_power_off(device[CONF_ENTITY_ID], Context())
                elif action == ACTION_TURN_ON:
                    await coordinator._async_power_on(device[CONF_ENTITY_ID], Context())

    @callback
    def _fire(self, room_id: str, kind: str, device: str, what: str, **extra: Any) -> None:
        self.hass.bus.async_fire(
            EVENT_MONITOR, {"room": room_id, "problem": kind, "device": device or None, "what": what, **extra}
        )
