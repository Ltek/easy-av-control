"""Activity engine for the Easy AV Control integration.

Starting an activity
    1. Smart switching: devices of the previous activity that the new one does
       not use are switched off. Their power switches are cut in the
       background once every device on them had its ``delay_after_off``.
    2. Power: all power switches the new activity needs are switched on at
       once so the devices boot in parallel.
    3. ``on_start`` actions start running alongside.
    4. Per device, in order: boot time ``delay_after_power`` (only when its
       power switch was off, counted from switching it on), readiness check
       (``ready``; after its power came on, its integration is reloaded
       first with ``reload_integration``, since it last saw the device
       without power), turn on (only when it is off), ``delay_after_on``
       (only when it was switched on).
    5. Steps.
    6. Wait for ``on_start``; the activity is ``active``.

    A readiness check or ``wait_available`` step with ``on_timeout: abort``
    stops the start; the room goes to ``error`` and never to ``active``.
    So does an unexpected failure while starting or stopping.

Stopping an activity
    ``on_stop`` actions run alongside; devices are switched off in reverse
    order. The room is idle once they are off. Power switches are cut
    afterwards: at once when none of their devices needs a cool-down,
    otherwise in the background after the longest ``delay_after_off`` of
    their devices. A new start keeps the switches it needs, and a switch
    stays on while a running activity of another room needs it.

A new command for a room cancels whatever runs there (a stop during a long
start, a different activity while starting).

Remote buttons (``send_command``) are routed to the devices of the running
activity, see control.py. They do not interfere with starting or stopping.

The source lists of the media players are remembered, so the configuration
panel can offer them while a device is off (an Apple TV lists its apps only
while it is connected).
"""
from __future__ import annotations

import asyncio
from collections.abc import Callable, Coroutine
import contextlib
from contextvars import ContextVar
from dataclasses import dataclass, field
from datetime import timedelta
import logging
from typing import Any

import voluptuous as vol

from homeassistant.components.media_player import MediaPlayerEntityFeature
from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.const import (
    ATTR_ENTITY_ID,
    SERVICE_TURN_OFF,
    SERVICE_TURN_ON,
    STATE_OFF,
    STATE_STANDBY,
    STATE_UNAVAILABLE,
    STATE_UNKNOWN,
    EntityCategory,
)
from homeassistant.core import (
    CALLBACK_TYPE,
    Context,
    Event,
    EventStateChangedData,
    HomeAssistant,
    State,
    callback,
)
from homeassistant.exceptions import (
    ConfigEntryError,
    HomeAssistantError,
    ServiceValidationError,
)
from homeassistant.helpers import (
    area_registry as ar,
    device_registry as dr,
    entity_registry as er,
    issue_registry as ir,
)
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.entity_component import DATA_INSTANCES
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.helpers.script import SCRIPT_MODE_PARALLEL, Script
from homeassistant.helpers.storage import Store
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.util import dt as dt_util

from .const import (
    ACTIVITY_STATE_ACTIVE,
    ACTIVITY_STATE_ERROR,
    ACTIVITY_STATE_IDLE,
    ACTIVITY_STATE_STARTING,
    ACTIVITY_STATE_STOPPING,
    CHECK_PICTURE,
    CHECK_TURN_OFF,
    CHECK_TURN_ON,
    CONF_ACTION,
    CONF_ACTIVITIES,
    CONF_AREA_ID,
    CONF_ATTRIBUTE,
    CONF_BEFORE,
    CONF_BRIGHTNESS_PCT,
    CONF_CHECKS,
    CONF_COLOR_TEMP_KELVIN,
    CONF_COMMANDS,
    CONF_DATA,
    CONF_DEFAULT_ACTIVITY,
    CONF_DELAY,
    CONF_DELAY_AFTER_OFF,
    CONF_DELAY_AFTER_ON,
    CONF_DELAY_AFTER_POWER,
    CONF_DEVICE,
    CONF_DEVICES,
    CONF_ENABLED,
    CONF_ENTITY_ID,
    CONF_FLOW,
    CONF_NAME,
    CONF_OFF_OPTION,
    CONF_ON_START,
    CONF_ON_STOP,
    CONF_ON_TIMEOUT,
    CONF_OPTION,
    CONF_POSITION,
    CONF_POWER_SWITCH,
    CONF_READY,
    CONF_RELOAD_INTEGRATION,
    CONF_REMOTE_ENTITY,
    CONF_ROOMS,
    CONF_SOUND_MODE,
    CONF_SOURCE,
    CONF_STARTED_BY,
    CONF_STATE,
    CONF_STEPS,
    CONF_STOP_STATE,
    CONF_TARGET,
    CONF_TILT_POSITION,
    CONF_TIMEOUT,
    CONF_TRANSITION,
    CONF_TURN_OFF_AFTER,
    CONF_TYPE,
    CONF_VOLUME_LEVEL,
    CONF_WAIT_FOR,
    DEFAULT_BEFORE_TIMEOUT,
    DEFAULT_OFF_OPTION,
    DEFAULT_SERVICE_TIMEOUT,
    DEVICE_NAME_PREFIX,
    DOMAIN,
    FAILURE_RETRY,
    FAILURE_STOP,
    ON_TIMEOUT_ABORT,
    PROBLEMS,
    SIGNAL_ROOMS_UPDATED,
    STEP_TYPE_CALL_ACTION,
    STEP_TYPE_DELAY,
    STEP_TYPE_POWER_OFF,
    STEP_TYPE_POWER_ON,
    STEP_TYPE_SET_BRIGHTNESS,
    STEP_TYPE_SET_COLOR_TEMP,
    STEP_TYPE_SET_POSITION,
    STEP_TYPE_SET_SOUND_MODE,
    STEP_TYPE_SET_SOURCE,
    STEP_TYPE_SET_TILT,
    STEP_TYPE_SET_VOLUME,
    STEP_TYPE_WAIT_AVAILABLE,
    STEP_TYPE_WAIT_PICTURE,
    WAIT_FOR_ON,
    WAIT_FOR_PICTURE,
    WAIT_NONE,
    WAIT_STATUS,
    WAIT_TIME,
)
from .control import (
    SETTINGS,
    activity_list,
    builtin_call,
    entity_setting_call,
    remote_call,
    remote_view,
    route,
    setting_entities,
)
from .device_profiles import (
    GROUP_ERROR,
    GROUP_OFF,
    GROUP_ON,
    GROUP_STARTING,
    GROUP_STOPPING,
    Profile,
)
from .device_state import (
    RESULT_OK,
    StateSource,
    async_wait_for,
    check_failure,
    check_source,
    describe_failure,
    effective_source,
    failure_action,
    picture_source,
    wait_mode,
)
from .device_timings import MAX_SAMPLES, add_sample, is_slow, typical
from .history import RunRecorder, history_of
from .model import (
    CONF_DELAY_AFTER,
    activity_devices,
    async_validate_config,
    find_missing_entities,
    problem_unique_id,
    scene_unique_id,
    select_unique_id,
    sensor_unique_id,
    switch_unique_id,
)
from .monitor import Monitor

_LOGGER = logging.getLogger(__name__)

STORAGE_VERSION = 1

# While waiting for a device, an integration still in setup_retry is reloaded
# again after this many seconds instead of waiting for its growing back-off
# (5, 10, 20, 40 s ...), which can miss a device that came up meanwhile
RELOAD_RETRY_INTERVAL = 5.0

# A device whose power entity is unreachable when it is to be switched (its integration lost the connection, or
# is reloading): wait this long for it to come back, checking every REACH_POLL seconds; after REACH_RELOAD_AFTER
# seconds reload its integration once. It must stay reachable for REACH_SETTLE seconds before it is switched.
REACH_TIMEOUT = 30.0
REACH_POLL = 0.5
REACH_RELOAD_AFTER = 10.0
REACH_SETTLE = 2.0

# Lists of the configured media players that are remembered while they are
# off: attribute -> key in the stored state
_REMEMBERED_LISTS = {"source_list": "sources", "sound_mode_list": "sound_modes"}

# States in which a device counts as switched off
_OFF_STATES = {STATE_OFF, STATE_STANDBY, STATE_UNAVAILABLE, STATE_UNKNOWN, "closed"}

# Persisted states and what they mean after a restart
_RESTORED_STATES = {
    ACTIVITY_STATE_ACTIVE: ACTIVITY_STATE_ACTIVE,
    ACTIVITY_STATE_ERROR: ACTIVITY_STATE_ERROR,
    ACTIVITY_STATE_STARTING: ACTIVITY_STATE_ERROR,
    ACTIVITY_STATE_STOPPING: ACTIVITY_STATE_ERROR,
}


# Run state of the room whose command runs in the current task (and the hook
# tasks it spawns), so warnings end up at the right room.
_current_room: ContextVar[RoomRuntime | None] = ContextVar("easy_av_control_room", default=None)
# The device a start or stop is busy with, so the card's live Flow can mark its row
_current_device: ContextVar[str | None] = ContextVar("easy_av_control_device", default=None)


def power_service(entity_id: str, *, on: bool) -> tuple[str, str]:
    """The action that switches a device on or off: covers open and close."""
    if entity_id.startswith("cover."):
        return "cover", "open_cover" if on else "close_cover"
    return "homeassistant", SERVICE_TURN_ON if on else SERVICE_TURN_OFF


# Entities of a device the card offers as settings without configuration
_AUTO_SETTING_DOMAINS = ("number", "select")


def related_setting_entities(hass: HomeAssistant, entity_id: str) -> list[str]:
    """The numbers and selects of the device an entity belongs to, e.g. the
    tone controls of a receiver; for an integration without devices, those
    of the same config entry without a device. Disabled, hidden and
    diagnostic entities are left out."""
    registry = er.async_get(hass)
    entry = registry.async_get(entity_id)
    if entry is None:
        return []
    if entry.device_id is not None:
        candidates = er.async_entries_for_device(registry, entry.device_id)
    elif entry.config_entry_id is not None:
        candidates = [
            e
            for e in er.async_entries_for_config_entry(registry, entry.config_entry_id)
            if e.device_id is None
        ]
    else:
        return []
    return [
        e.entity_id
        for e in candidates
        if e.domain in _AUTO_SETTING_DOMAINS
        and e.disabled_by is None
        and e.hidden_by is None
        and e.entity_category is not EntityCategory.DIAGNOSTIC
    ]


def can_switch(hass: HomeAssistant, entity_id: str, *, on: bool) -> bool:
    """False for a media player that cannot be switched, e.g. a Sonos speaker.

    Without a known state (unavailable) the call is tried anyway.
    """
    if not entity_id.startswith("media_player."):
        return True
    state = hass.states.get(entity_id)
    if state is None or "supported_features" not in state.attributes:
        return True
    feature = MediaPlayerEntityFeature.TURN_ON if on else MediaPlayerEntityFeature.TURN_OFF
    return bool(state.attributes["supported_features"] & feature)


def power_switches(devices: dict[str, Any], device_ids: list[str]) -> list[str]:
    """Power switches of the given devices, in order, without duplicates."""
    switches: list[str] = []
    for device_id in device_ids:
        switch = devices[device_id].get(CONF_POWER_SWITCH)
        if switch and switch not in switches:
            switches.append(switch)
    return switches


def step_service(
    step_type: str, step: dict[str, Any], entity_id: str | None
) -> tuple[str, str, dict[str, Any], dict[str, Any] | None] | None:
    """The action a settings step runs: domain, service, data and target."""
    target = {ATTR_ENTITY_ID: entity_id}
    if step_type == STEP_TYPE_SET_SOURCE:
        return "media_player", "select_source", {"source": step[CONF_SOURCE]}, target
    if step_type == STEP_TYPE_SET_VOLUME:
        return (
            "media_player",
            "volume_set",
            {"volume_level": step[CONF_VOLUME_LEVEL]},
            target,
        )
    if step_type == STEP_TYPE_SET_SOUND_MODE:
        return (
            "media_player",
            "select_sound_mode",
            {"sound_mode": step[CONF_SOUND_MODE]},
            target,
        )
    if step_type in (STEP_TYPE_SET_BRIGHTNESS, STEP_TYPE_SET_COLOR_TEMP):
        data = {
            key: step[key]
            for key in (CONF_BRIGHTNESS_PCT, CONF_COLOR_TEMP_KELVIN, CONF_TRANSITION)
            if key in step
        }
        return "light", SERVICE_TURN_ON, data, target
    if step_type == STEP_TYPE_SET_POSITION:
        return "cover", "set_cover_position", {"position": step[CONF_POSITION]}, target
    if step_type == STEP_TYPE_SET_TILT:
        return (
            "cover",
            "set_cover_tilt_position",
            {"tilt_position": step[CONF_TILT_POSITION]},
            target,
        )
    if step_type == STEP_TYPE_CALL_ACTION:
        domain, service = step[CONF_ACTION].split(".", 1)
        return domain, service, dict(step.get(CONF_DATA) or {}), step.get(CONF_TARGET)
    _LOGGER.warning("Unknown step type: %s", step_type)
    return None


class ActivityAborted(Exception):
    """Raised when a readiness check aborts an activity start."""


@dataclass
class RoomRuntime:
    """Mutable run state of one room."""

    activity: str | None = None
    state: str = ACTIVITY_STATE_IDLE
    progress: tuple[int, int] = (0, 0)
    error: str | None = None
    warnings: list[str] = field(default_factory=list)
    last_activity: str | None = None
    task: asyncio.Task | None = None
    command: tuple[str, str | None] | None = None
    lock: asyncio.Lock = field(default_factory=asyncio.Lock)
    # Counts the commands; one still waiting for the lock is dropped once a
    # newer one arrived
    generation: int = 0
    # power switch -> background task that cuts it after the cool-down
    pending_cuts: dict[str, asyncio.Task] = field(default_factory=dict)
    # power switch -> devices cooling down on it and when it goes off, for the card
    cooling: dict[str, dict[str, Any]] = field(default_factory=dict)
    # What a start or stop is busy with, for the card (see _doing)
    current: dict[str, Any] | None = None
    # The start or stop being timed for the Reports page (history.py)
    run: RunRecorder | None = None
    # Device entity -> when this start switched it on (loop time), to time its picture and signal checks
    switched_on: dict[str, float] = field(default_factory=dict)


class EasyAVControlCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Run activities for all rooms of one config entry."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        """Initialize the coordinator."""
        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=None,
            config_entry=entry,
        )
        self.entry = entry
        self.rooms: dict[str, dict[str, Any]] = {}
        self.service_timeout: float = DEFAULT_SERVICE_TIMEOUT
        self._runtime: dict[str, RoomRuntime] = {}
        # (room, activity, on_start|on_stop) -> hook
        self._scripts: dict[tuple[str, str, str], Script] = {}
        # (room, "device"|"activity", id, command) -> command actions
        self._command_scripts: dict[tuple[str, str, str, str], Script] = {}
        # config entry -> running reload, so repeated checks do not pile up
        self._reloads: dict[str, asyncio.Task] = {}
        self._store: Store[dict[str, Any]] = Store(
            hass, STORAGE_VERSION, f"{DOMAIN}.{entry.entry_id}.state"
        )
        self._restored = False
        # attribute (source_list, sound_mode_list) -> media player -> its last known list
        self._lists: dict[str, dict[str, list[str]]] = {a: {} for a in _REMEMBERED_LISTS}
        self._unsub_sources: CALLBACK_TYPE | None = None
        self._unsub_started_by: CALLBACK_TYPE | None = None
        # Room -> the Started by change that sent its next command, for its run's trace
        self._triggered: dict[str, dict[str, str]] = {}
        self.monitor = Monitor(self)
        # Integration profiles (device_profiles.py), loaded at setup
        self.profiles: dict[str, Profile] = {}
        # Measured times (device_timings.py): device entity -> {"on": [s, ...], "off": [s, ...]}
        self.timings: dict[str, dict[str, list[float]]] = {}
        # When each device was last switched off, for its "off" time
        self._off_started: dict[str, float] = {}

    # ------------------------------------------------------------------
    # Views used by the entity platforms
    # ------------------------------------------------------------------

    def runtime(self, room_id: str) -> RoomRuntime:
        """Return (and create) the run state of a room."""
        return self._runtime.setdefault(room_id, RoomRuntime())

    @property
    def active_activities(self) -> dict[str, str]:
        """Room -> activity that is running, starting, stopping or failed."""
        return {
            room_id: rt.activity
            for room_id, rt in self._runtime.items()
            if rt.activity is not None
        }

    @property
    def activity_states(self) -> dict[str, str]:
        """Room -> idle / starting / active / stopping / error."""
        return {room_id: rt.state for room_id, rt in self._runtime.items()}

    @property
    def activity_progress(self) -> dict[str, tuple[int, int]]:
        """Room -> (current item, total items)."""
        return {room_id: rt.progress for room_id, rt in self._runtime.items()}

    def activity_name(self, room_id: str, activity_id: str) -> str:
        """Return the display name of an activity."""
        activity = self.rooms.get(room_id, {}).get(CONF_ACTIVITIES, {}).get(activity_id, {})
        return activity.get(CONF_NAME) or activity_id

    @staticmethod
    def entity_layout(rooms: dict[str, Any]) -> list[tuple[str, str, list[tuple[str, str]]]]:
        """What the entities are made of: rooms and activities with their names.

        Sorted, since the order of the stored keys is not stable.
        """
        return sorted(
            (
                room_id,
                room.get(CONF_NAME, room_id),
                sorted(
                    (activity_id, activity.get(CONF_NAME, activity_id))
                    for activity_id, activity in (room.get(CONF_ACTIVITIES) or {}).items()
                ),
            )
            for room_id, room in rooms.items()
        )

    def device_info(self, room_id: str) -> DeviceInfo:
        """The device of a room, which holds its entities.

        It goes into the room's area. Without one, it goes into an area named
        like the room if there is one; no area is created for it.
        """
        room = self.rooms.get(room_id, {})
        name = room.get(CONF_NAME, room_id)
        info = DeviceInfo(
            identifiers={(DOMAIN, room_id)},
            name=f"{DEVICE_NAME_PREFIX}: {name}",
            manufacturer="Easy AV Control",
            model="Activity Controller",
        )
        areas = ar.async_get(self.hass)
        area = areas.async_get_area(room.get(CONF_AREA_ID) or "") or areas.async_get_area_by_name(
            name
        )
        if area is not None:
            info["suggested_area"] = area.name
        return info

    @callback
    def async_apply_areas(self) -> None:
        """Move the rooms' devices into the areas the configuration names.

        A suggested area only counts when a device is created; this also
        covers devices that exist already and areas changed later.
        """
        areas = ar.async_get(self.hass)
        devices = dr.async_get(self.hass)
        for device in dr.async_entries_for_config_entry(devices, self.entry.entry_id):
            room_id = next((i for d, i in device.identifiers if d == DOMAIN), None)
            area_id = self.rooms.get(room_id, {}).get(CONF_AREA_ID) if room_id else None
            if area_id and area_id != device.area_id and areas.async_get_area(area_id):
                devices.async_update_device(device.id, area_id=area_id)

    def resolve_activity(self, room_id: str, activity: str) -> str | None:
        """Map an activity id or display name to its id."""
        activities = self.rooms.get(room_id, {}).get(CONF_ACTIVITIES, {})
        if activity in activities:
            return activity
        for activity_id, data in activities.items():
            if data.get(CONF_NAME) == activity:
                return activity_id
        return None

    # ------------------------------------------------------------------
    # Configuration
    # ------------------------------------------------------------------

    async def _async_update_data(self) -> dict[str, Any]:
        """Validate the configuration and prepare the hook scripts."""
        try:
            config = await async_validate_config(self.hass, dict(self.entry.data))
        except vol.Invalid as err:
            path = ".".join(str(p) for p in err.path)
            raise ConfigEntryError(f"Invalid configuration at {path}: {err.msg}") from err

        self.rooms = config[CONF_ROOMS]
        self._build_scripts()
        self._update_issues()

        if not self._restored:
            self._restored = True
            await self._async_restore()
        self._track_sources()
        self._track_started_by()
        self.monitor.start()

        return config

    def _build_scripts(self) -> None:
        self._scripts = {}
        self._command_scripts = {}

        def script(actions: list[dict[str, Any]], name: str) -> Script:
            return Script(
                self.hass,
                actions,
                f"Easy AV Control {name}",
                DOMAIN,
                script_mode=SCRIPT_MODE_PARALLEL,
                logger=_LOGGER,
            )

        for room_id, room in self.rooms.items():
            room_name = room.get(CONF_NAME, room_id)
            for device_id, device in room[CONF_DEVICES].items():
                for command, actions in device[CONF_COMMANDS].items():
                    self._command_scripts[(room_id, "device", device_id, command)] = script(
                        actions, f"{room_name} {device_id} {command}"
                    )
            for activity_id, activity in room[CONF_ACTIVITIES].items():
                activity_name = activity.get(CONF_NAME, activity_id)
                for key in (CONF_ON_START, CONF_ON_STOP):
                    if activity.get(key):
                        self._scripts[(room_id, activity_id, key)] = script(
                            activity[key], f"{room_name} {activity_name} {key}"
                        )
                for command, actions in activity[CONF_COMMANDS].items():
                    self._command_scripts[(room_id, "activity", activity_id, command)] = (
                        script(actions, f"{room_name} {activity_name} {command}")
                    )

    @callback
    def _update_issues(self) -> None:
        """Raise a repair issue for every referenced entity that does not exist."""
        prefix = f"missing_entity_{self.entry.entry_id}_"
        wanted: set[str] = set()
        for ref in find_missing_entities(self.hass, {CONF_ROOMS: self.rooms}):
            issue_id = f"{prefix}{ref.room_id}_{ref.path}"
            wanted.add(issue_id)
            _LOGGER.warning(
                "Room '%s': %s refers to unknown entity %s",
                ref.room_id,
                ref.path,
                ref.entity_id,
            )
            ir.async_create_issue(
                self.hass,
                DOMAIN,
                issue_id,
                is_fixable=False,
                severity=ir.IssueSeverity.WARNING,
                translation_key="missing_entity",
                translation_placeholders={
                    "entity_id": ref.entity_id,
                    "room": self.rooms[ref.room_id].get(CONF_NAME, ref.room_id),
                    "path": ref.path,
                },
            )
        registry = ir.async_get(self.hass)
        for (domain, issue_id) in list(registry.issues):
            if domain == DOMAIN and issue_id.startswith(prefix) and issue_id not in wanted:
                ir.async_delete_issue(self.hass, DOMAIN, issue_id)

    # ------------------------------------------------------------------
    # Persistence of the room state across restarts
    # ------------------------------------------------------------------

    async def _async_restore(self) -> None:
        stored = await self._store.async_load() or {}
        self._lists = {
            attribute: {
                entity_id: [str(s) for s in items]
                for entity_id, items in (stored.get(key) or {}).items()
                if isinstance(items, list)
            }
            for attribute, key in _REMEMBERED_LISTS.items()
        }
        self.timings = {
            entity_id: {d: [float(x) for x in (t.get(d) or [])][-MAX_SAMPLES:] for d in ("on", "off")}
            for entity_id, t in (stored.get("timings") or {}).items()
            if isinstance(t, dict)
        }
        for room_id, data in stored.get(CONF_ROOMS, {}).items():
            if room_id not in self.rooms:
                continue
            rt = self.runtime(room_id)
            rt.last_activity = data.get("last_activity")
            activity = data.get("activity")
            state = _RESTORED_STATES.get(data.get("state"))
            if activity in self.rooms[room_id][CONF_ACTIVITIES] and state:
                rt.activity = activity
                rt.state = state
                if data.get("state") != state:
                    rt.error = "Interrupted by a Home Assistant restart"
                else:
                    rt.error = data.get("error")

    @callback
    def _schedule_save(self) -> None:
        self._store.async_delay_save(self._data_to_store, 1)

    @callback
    def _data_to_store(self) -> dict[str, Any]:
        return {
            CONF_ROOMS: {
                room_id: {
                    "activity": rt.activity,
                    "state": rt.state,
                    "error": rt.error,
                    "last_activity": rt.last_activity,
                }
                for room_id, rt in self._runtime.items()
            },
            **{key: self._lists[attribute] for attribute, key in _REMEMBERED_LISTS.items()},
            "timings": self.timings,
        }

    @callback
    def _changed(self) -> None:
        self._schedule_save()
        self.async_update_listeners()

    @callback
    def async_update_listeners(self) -> None:
        """Update the entities and tell subscribed remote controls."""
        super().async_update_listeners()
        async_dispatcher_send(self.hass, SIGNAL_ROOMS_UPDATED)

    async def async_shutdown(self) -> None:
        """Cancel running work when the entry unloads."""
        if self._unsub_sources is not None:
            self._unsub_sources()
            self._unsub_sources = None
        if self._unsub_started_by is not None:
            self._unsub_started_by()
            self._unsub_started_by = None
        self.monitor.stop()
        for rt in self._runtime.values():
            for task in [rt.task, *rt.pending_cuts.values()]:
                if task and not task.done():
                    task.cancel()
        await self._store.async_save(self._data_to_store())
        await super().async_shutdown()

    # ------------------------------------------------------------------
    # Remembered source and sound mode lists
    # ------------------------------------------------------------------

    def remembered_lists(self, attribute: str = "source_list") -> dict[str, list[str]]:
        """Last known list (source_list, sound_mode_list) per media player of
        the configuration."""
        return dict(self._lists[attribute])

    def setting_list(self, entity_id: str, setting: str) -> list[str]:
        """What a device setting of the card can be set to: the media player's
        list while it has one, else the remembered one."""
        attribute = SETTINGS[setting][1]
        state = self.hass.states.get(entity_id)
        live = state.attributes.get(attribute) if state is not None else None
        if isinstance(live, list) and live:
            return [str(item) for item in live]
        return list(self._lists[attribute].get(entity_id, []))

    def related_entities(self, entity_id: str) -> list[str]:
        """The numbers and selects a device offers as settings without configuration."""
        return related_setting_entities(self.hass, entity_id)

    def _track_sources(self) -> None:
        """Follow the source and sound mode lists of the configured media players."""
        if self._unsub_sources is not None:
            self._unsub_sources()
            self._unsub_sources = None
        players = sorted(
            {
                device[CONF_ENTITY_ID]
                for room in self.rooms.values()
                for device in room[CONF_DEVICES].values()
                if device[CONF_ENTITY_ID].startswith("media_player.")
            }
        )
        changed = False
        for lists in self._lists.values():
            for entity_id in [e for e in lists if e not in players]:
                del lists[entity_id]
                changed = True
        for entity_id in players:
            changed |= self._remember_lists(entity_id, self.hass.states.get(entity_id))
        if changed:
            self._schedule_save()
        if players:
            self._unsub_sources = async_track_state_change_event(
                self.hass, players, self._source_state_changed
            )

    def _started_by(self) -> list[tuple[str, str, dict[str, Any]]]:
        """Every activity's Started by entries: (room, activity, entry)."""
        return [
            (room_id, activity_id, trigger)
            for room_id, room in self.rooms.items()
            for activity_id, activity in room[CONF_ACTIVITIES].items()
            if activity.get(CONF_ENABLED, True)
            for trigger in activity.get(CONF_STARTED_BY) or []
        ]

    def _track_started_by(self) -> None:
        """Follow the entities that start or stop an activity (Started by)."""
        if self._unsub_started_by is not None:
            self._unsub_started_by()
            self._unsub_started_by = None
        entities = sorted({trigger[CONF_ENTITY_ID] for _, _, trigger in self._started_by()})
        if entities:
            self._unsub_started_by = async_track_state_change_event(self.hass, entities, self._started_by_changed)

    @callback
    def _started_by_changed(self, event: Event[EventStateChangedData]) -> None:
        """An entity of Started by changed: start its activity, or stop it.

        Ignored: changes from or to unavailable / unknown (a reconnect), attribute changes, and changes that
        match what the room does already, such as the Harmony hub switching to its activity because this
        activity's startup selected it.
        """
        old, new = event.data["old_state"], event.data["new_state"]
        if old is None or new is None or old.state == new.state:
            return
        if STATE_UNAVAILABLE in (old.state, new.state) or STATE_UNKNOWN in (old.state, new.state):
            return
        entity_id = event.data["entity_id"]
        for room_id, activity_id, trigger in self._started_by():
            if trigger[CONF_ENTITY_ID] != entity_id:
                continue
            rt = self.runtime(room_id)
            running = rt.activity == activity_id and rt.state in (
                ACTIVITY_STATE_STARTING, ACTIVITY_STATE_ACTIVE
            )
            if new.state in trigger[CONF_STATE] and not running:
                _LOGGER.info("Room '%s': %s is %s, starting '%s'", room_id, entity_id, new.state, activity_id)
                self._triggered[room_id] = {"entity_id": entity_id, "state": new.state}
                self.hass.async_create_task(self.async_start_activity(room_id, activity_id))
                return
            if (
                new.state in (trigger.get(CONF_STOP_STATE) or [])
                and rt.activity == activity_id
                and rt.state in (ACTIVITY_STATE_STARTING, ACTIVITY_STATE_ACTIVE, ACTIVITY_STATE_ERROR)
            ):
                _LOGGER.info("Room '%s': %s is %s, shutting down '%s'", room_id, entity_id, new.state, activity_id)
                self._triggered[room_id] = {"entity_id": entity_id, "state": new.state}
                self.hass.async_create_task(self.async_stop_activity(room_id))
                return

    @callback
    def _source_state_changed(self, event: Event[EventStateChangedData]) -> None:
        if self._remember_lists(event.data["entity_id"], event.data["new_state"]):
            self._schedule_save()
            # The device settings of a running activity offer the new list
            self.async_update_listeners()

    def _remember_lists(self, entity_id: str, state: State | None) -> bool:
        """Keep the non-empty lists of a media player; True when one changed."""
        changed = False
        for attribute, lists in self._lists.items():
            items = state.attributes.get(attribute) if state is not None else None
            if not isinstance(items, list) or not items:
                continue
            items = [str(item) for item in items]
            if lists.get(entity_id) != items:
                lists[entity_id] = items
                changed = True
        return changed

    # ------------------------------------------------------------------
    # Commands
    # ------------------------------------------------------------------

    async def async_start_activity(self, room_id: str, activity: str) -> None:
        """Start an activity (id or name) in a room."""
        if room_id not in self.rooms:
            _LOGGER.error("Room '%s' not found", room_id)
            return
        activity_id = self.resolve_activity(room_id, activity)
        if activity_id is None:
            _LOGGER.error("Activity '%s' not found in room '%s'", activity, room_id)
            return
        if not self.activity_enabled(room_id, activity_id):
            _LOGGER.warning("Room '%s': '%s' is disabled, not started", room_id, activity_id)
            return
        await self._async_run_command(
            room_id, ("start", activity_id), lambda: self._async_start(room_id, activity_id)
        )

    async def async_stop_activity(self, room_id: str) -> None:
        """Stop whatever runs in a room."""
        if room_id not in self.rooms:
            _LOGGER.error("Room '%s' not found", room_id)
            return
        await self._async_run_command(
            room_id, ("stop", None), lambda: self._async_stop(room_id)
        )

    async def async_toggle_activity(self, room_id: str, activity: str | None = None) -> None:
        """Stop the room if something runs there, otherwise start an activity.

        Without an activity, the last successfully started one is used, and
        the first configured one if there is none yet.
        """
        if room_id not in self.rooms:
            _LOGGER.error("Room '%s' not found", room_id)
            return
        rt = self.runtime(room_id)
        if rt.activity is not None and rt.state != ACTIVITY_STATE_STOPPING:
            await self.async_stop_activity(room_id)
            return
        target = activity or self.default_activity(room_id)
        if target is None:
            _LOGGER.error("Room '%s' has no activity to start", room_id)
            return
        await self.async_start_activity(room_id, target)

    def activity_enabled(self, room_id: str, activity_id: str) -> bool:
        activity = self.rooms.get(room_id, {}).get(CONF_ACTIVITIES, {}).get(activity_id)
        return activity is not None and activity.get(CONF_ENABLED, True)

    def default_activity(self, room_id: str) -> str | None:
        """Activity a plain "on" starts.

        The room's ``default_activity``, else the last one, else the first
        in order.
        """
        room = self.rooms.get(room_id, {})
        activities = {k: a for k, a in room.get(CONF_ACTIVITIES, {}).items() if a.get(CONF_ENABLED, True)}
        if room.get(CONF_DEFAULT_ACTIVITY) in activities:
            return room[CONF_DEFAULT_ACTIVITY]
        last = self.runtime(room_id).last_activity
        if last in activities:
            return last
        return next(iter(activities), None)

    async def _async_run_command(
        self,
        room_id: str,
        command: tuple[str, str | None],
        factory: Callable[[], Coroutine[Any, Any, None]],
    ) -> None:
        """Cancel the running command of the room and run a new one.

        Repeating the command that is already running just waits for it. The
        last command wins: one that is still waiting for the previous one to
        end is dropped when another command arrives.
        """
        rt = self.runtime(room_id)
        running = rt.task if rt.task and not rt.task.done() else None

        if running is not None and rt.command == command and not running.cancelling():
            await self._await_task(running)
            return
        if running is not None and not running.cancelling():
            _LOGGER.info("Room '%s': cancelling running %s", room_id, rt.command[0])
            running.cancel()
        rt.generation += 1
        generation = rt.generation

        async with rt.lock:
            if rt.generation != generation:
                _LOGGER.debug("Room '%s': %s dropped, a newer command follows", room_id, command[0])
                return
            token = _current_room.set(rt)
            try:
                task = self.hass.async_create_background_task(
                    factory(), f"{DOMAIN} {room_id} {command[0]}"
                )
            finally:
                _current_room.reset(token)
            rt.task = task
            rt.command = command
            await self._await_task(task)

    @staticmethod
    async def _await_task(task: asyncio.Task) -> None:
        """Await a command task; its cancellation by a newer command is no error."""
        try:
            await asyncio.shield(task)
        except asyncio.CancelledError:
            current = asyncio.current_task()
            if current is not None and current.cancelling():
                raise
            # The task was cancelled by another command; wait until it is gone
            with contextlib.suppress(asyncio.CancelledError):
                await task

    # ------------------------------------------------------------------
    # Remote control
    # ------------------------------------------------------------------

    def device_states(self, room_id: str, devices: dict[str, Any] | None = None) -> dict[str, dict[str, Any]]:
        """Each device's state now, for the Flow's colours: group (on, starting, stopping, off, error, unknown,
        unavailable) and its own word for it. ``devices``: these (as edited in the panel) instead of the saved ones."""
        out: dict[str, dict[str, Any]] = {}
        if devices is None:
            devices = self.rooms[room_id][CONF_DEVICES] if room_id in self.rooms else {}
        for device_id, device in devices.items():
            state = self.hass.states.get(device[CONF_ENTITY_ID])
            if state is None or state.state == STATE_UNAVAILABLE:
                out[device_id] = {"group": "unavailable", "value": None}
                continue
            source = self.state_source(device)
            if source is not None:
                group, value = source.current(self.hass)
            elif device[CONF_ENTITY_ID].startswith(("select.", "input_select.")):
                # A select device (Harmony activities): off on its off option
                value = state.state
                off = device.get(CONF_OFF_OPTION) or DEFAULT_OFF_OPTION
                group = GROUP_OFF if value == off else GROUP_ON if value != STATE_UNKNOWN else "unknown"
            else:
                value = state.state
                group = GROUP_OFF if value in (STATE_OFF, STATE_STANDBY) else GROUP_ON if value != STATE_UNKNOWN else "unknown"
            out[device_id] = {"group": group, "value": value}
        return out

    def room_view(self, room_id: str) -> dict[str, Any]:
        """Everything a remote control needs to show a room."""
        room = self.rooms[room_id]
        rt = self.runtime(room_id)
        activities: dict[str, Any] = room[CONF_ACTIVITIES]
        activity = activities.get(rt.activity) if rt.activity else None
        return {
            "entry_id": self.entry.entry_id,
            "room": room_id,
            "name": room.get(CONF_NAME, room_id),
            "area_id": room.get(CONF_AREA_ID),
            "state": rt.state,
            "activity": rt.activity,
            "error": rt.error,
            "warnings": list(rt.warnings),
            "progress": list(rt.progress),
            "current": dict(rt.current) if rt.current else None,
            "cooling": list(rt.cooling.values()),
            "default_activity": self.default_activity(room_id),
            "activities": activity_list(room),
            "remote": (
                remote_view(room, activity, self.setting_list, self.related_entities)
                if activity is not None
                else None
            ),
        }

    async def async_send_command(
        self,
        room_id: str,
        command: str,
        *,
        value: Any = None,
        device_id: str | None = None,
        context: Context | None = None,
    ) -> None:
        """Run a remote command on the devices of the running activity.

        With ``device_id`` the command goes to that device, even while
        nothing runs. Errors are raised, so the caller sees them.
        """
        room = self.rooms[room_id]
        activity_id = self.runtime(room_id).activity
        activity = room[CONF_ACTIVITIES].get(activity_id) if activity_id else None
        devices: dict[str, Any] = activity_devices(room, activity)
        placeholders = {"room": room.get(CONF_NAME, room_id), "command": command}
        variables = {"command": command, "value": value}

        if device_id is not None:
            if device_id not in devices:
                raise ServiceValidationError(
                    translation_domain=DOMAIN,
                    translation_key="unknown_device",
                    translation_placeholders={**placeholders, "device": device_id},
                )
        else:
            if activity is None:
                raise ServiceValidationError(
                    translation_domain=DOMAIN,
                    translation_key="no_activity",
                    translation_placeholders=placeholders,
                )
            if command in activity[CONF_COMMANDS]:
                script = self._command_scripts[(room_id, "activity", activity_id, command)]
                await self._async_run_command_script(script, variables, context)
                return
            device_id = route(room, activity, command)
            if device_id is None:
                raise ServiceValidationError(
                    translation_domain=DOMAIN,
                    translation_key="unknown_command",
                    translation_placeholders=placeholders,
                )

        device = devices[device_id]
        entity_id = device[CONF_ENTITY_ID]
        ready = device.get(CONF_READY)
        if ready and not self._is_ready(entity_id, ready):
            # The connection got lost while the activity runs: bring it back
            # before the command goes nowhere
            try:
                await self._async_wait_ready(entity_id, ready, f"device '{device_id}'")
            except ActivityAborted as err:
                raise HomeAssistantError(
                    translation_domain=DOMAIN,
                    translation_key="device_not_ready",
                    translation_placeholders={"command": command, "reason": str(err)},
                ) from err
        source = self.state_source(device)
        if source is not None and source.current(self.hass)[0] == GROUP_STARTING:
            # Still warming up: let it finish before the command goes nowhere
            await async_wait_for(self.hass, source, GROUP_ON, source.timeout_on)
        if command in device[CONF_COMMANDS]:
            script = self._command_scripts[(room_id, "device", device_id, command)]
            await self._async_run_command_script(
                script, {**variables, "entity_id": entity_id}, context
            )
            return

        remote = device.get(CONF_REMOTE_ENTITY)
        try:
            if command in setting_entities(room, device_id, self.related_entities):
                # A device setting of the card: the entity is the command
                call: tuple[str, str, dict[str, Any]] | None = entity_setting_call(command, value)
            else:
                call = (
                    remote_call(command, remote, self._platform_of(remote)) if remote else None
                ) or builtin_call(command, entity_id, self.hass.states.get(entity_id), value)
        except ValueError as err:
            raise ServiceValidationError(str(err)) from err
        if call is None:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="unknown_command",
                translation_placeholders=placeholders,
            )
        domain, service, data = call
        _LOGGER.debug("Room '%s': %s -> %s.%s %s", room_id, command, domain, service, data)
        try:
            async with asyncio.timeout(self.service_timeout):
                await self.hass.services.async_call(
                    domain, service, data, blocking=True, context=context
                )
        except TimeoutError as err:
            raise HomeAssistantError(
                translation_domain=DOMAIN,
                translation_key="command_timeout",
                translation_placeholders={"command": command, "target": entity_id},
            ) from err

    async def _async_run_command_script(
        self, script: Script, variables: dict[str, Any], context: Context | None
    ) -> None:
        try:
            async with asyncio.timeout(self.service_timeout):
                await script.async_run(run_variables=variables, context=context or Context())
        except TimeoutError as err:
            raise HomeAssistantError(
                translation_domain=DOMAIN,
                translation_key="command_timeout",
                translation_placeholders={"command": variables["command"], "target": script.name},
            ) from err

    # ------------------------------------------------------------------
    # Start
    # ------------------------------------------------------------------

    async def _async_start(self, room_id: str, activity_id: str) -> None:
        rt = self.runtime(room_id)
        room = self.rooms[room_id]
        activity = room[CONF_ACTIVITIES][activity_id]
        devices: dict[str, Any] = activity_devices(room, activity)
        new_devices: list[str] = activity[CONF_DEVICES]
        steps: list[dict[str, Any]] = activity[CONF_STEPS]
        checks: list[dict[str, Any]] = activity.get(CONF_CHECKS) or []
        context = Context()

        previous = rt.activity if rt.activity != activity_id else None
        _LOGGER.info(
            "Room '%s': starting '%s'%s",
            room_id,
            activity_id,
            f" (switching from '{previous}')" if previous else "",
        )

        rt.activity = activity_id
        rt.state = ACTIVITY_STATE_STARTING
        rt.error = None
        rt.warnings = []
        total = len(new_devices) + len(checks) + len(steps)
        rt.progress = (0, total)
        rt.run = run = self._recorder(room_id, activity_id, "start", previous)
        rt.switched_on = {}
        if by := self._triggered.pop(room_id, None):
            run.run["by"] = by
            run.event("started_by", **by)
        ir.async_delete_issue(self.hass, DOMAIN, self._aborted_issue_id(room_id))
        self._changed()

        needed_switches = power_switches(devices, new_devices)
        for switch in needed_switches:
            self._cancel_cut(rt, switch)
        for device_id in new_devices:
            # A device turned off later by the last shutdown (seats) stays on
            self._cancel_cut(rt, devices[device_id][CONF_ENTITY_ID])

        hook: asyncio.Task | None = None
        try:
            if previous is not None:
                run.phase("switch_off_unused", activity=previous)
                await self._async_switch_off_unused(room_id, previous, new_devices, context)

            # Switches that were off: their devices need their boot time
            powered = {s for s in needed_switches if self._is_off(s)}
            if needed_switches:
                run.phase("outlets_on")
                self._doing(rt, "power_on")
                await self._async_call(
                    "homeassistant",
                    SERVICE_TURN_ON,
                    {ATTR_ENTITY_ID: needed_switches},
                    context,
                    f"power on {', '.join(needed_switches)}",
                )
            powered_at = self._now()

            hook = self._start_hook(room_id, activity_id, CONF_ON_START, context)

            done = 0
            for device_id in new_devices:
                _current_device.set(device_id)
                device = devices[device_id]
                run.phase("device", device=device_id, entity_id=device[CONF_ENTITY_ID], name=self._device_name(device))
                if before := (activity.get(CONF_BEFORE) or {}).get(device_id):
                    await self._async_before(rt, devices, device, before)
                if device.get(CONF_POWER_SWITCH) in powered and device[CONF_DELAY_AFTER_POWER]:
                    # Devices on the same switch boot in parallel
                    remaining = device[CONF_DELAY_AFTER_POWER] - (self._now() - powered_at)
                    if remaining > 0:
                        _LOGGER.debug(
                            "Waiting %.1f s for %s to boot", remaining, device[CONF_ENTITY_ID]
                        )
                        self._doing(rt, "boot", name=self._device_name(device), seconds=remaining)
                        await self._async_sleep(remaining)
                ready = device.get(CONF_READY)
                if ready:
                    reload = None
                    if device.get(CONF_POWER_SWITCH) in powered and ready[CONF_RELOAD_INTEGRATION]:
                        # The integration last saw the device without power and
                        # may still report a stale state ("off" instead of
                        # unavailable): reload it once the device has booted
                        task = self._reload_integration_of(
                            ready.get(CONF_ENTITY_ID) or device[CONF_ENTITY_ID]
                        )
                        if task is not None:
                            self._doing(rt, "reload", name=self._device_name(device))
                            try:
                                # A reload that hangs must not hold up the start
                                async with asyncio.timeout(ready[CONF_TIMEOUT]):
                                    await self._await_task(task)
                            except TimeoutError:
                                self._warn(
                                    f"device '{device_id}': reloading its integration did not"
                                    f" finish within {ready[CONF_TIMEOUT]:g} s"
                                )
                        reload = False
                    await self._async_wait_ready(
                        device[CONF_ENTITY_ID],
                        ready,
                        f"device '{device_id}'",
                        reload=reload,
                        name=self._device_name(device),
                    )
                await self._async_bring_up(rt, device, context)
                done += 1
                rt.progress = (done, total)
                self.async_update_listeners()

            _current_device.set(None)
            # Checks: everything is on; is it working (a picture on the Lumagen, on the projector)?
            if checks:
                run.phase("checks", count=len(checks))
                await self._async_run_checks(rt, room, checks)
                done += len(checks)
                rt.progress = (done, total)
                self.async_update_listeners()

            if steps:
                run.phase("steps", count=len(steps))
            for idx, step in enumerate(steps, 1):
                _LOGGER.debug("Room '%s': step %d/%d %s", room_id, idx, len(steps), step)
                position = {"step": idx, "steps": len(steps), "step_type": step[CONF_TYPE]}
                device_id = step.get(CONF_DEVICE)
                name = self._device_name(devices[device_id]) if device_id else None
                self._doing(rt, "step", name=name, **position)
                await self._async_execute_step(room, step, context, name=name)
                if step[CONF_DELAY_AFTER]:
                    self._doing(rt, "wait", seconds=step[CONF_DELAY_AFTER], **position)
                    await self._async_sleep(step[CONF_DELAY_AFTER])
                done += 1
                rt.progress = (done, total)
                self.async_update_listeners()

            if hook is not None:
                if not hook.done():
                    run.phase("hooks", hook=CONF_ON_START)
                    self._doing(rt, "hooks", hook=CONF_ON_START)
                await hook
        except asyncio.CancelledError:
            if hook is not None:
                hook.cancel()
            rt.current = None
            run.finish("cancelled", warnings=rt.warnings)
            rt.run = None
            raise
        except Exception as err:
            if hook is not None:
                hook.cancel()
            rt.current = None
            rt.state = ACTIVITY_STATE_ERROR
            rt.error = str(err) or type(err).__name__
            if isinstance(err, ActivityAborted):
                _LOGGER.error("Room '%s': start of '%s' aborted: %s", room_id, activity_id, err)
            else:
                _LOGGER.exception("Room '%s': start of '%s' failed", room_id, activity_id)
            run.finish("error", error=rt.error, warnings=rt.warnings)
            rt.run = None
            ir.async_create_issue(
                self.hass,
                DOMAIN,
                self._aborted_issue_id(room_id),
                is_fixable=False,
                severity=ir.IssueSeverity.ERROR,
                translation_key="activity_aborted",
                translation_placeholders={
                    "room": room.get(CONF_NAME, room_id),
                    "activity": self.activity_name(room_id, activity_id),
                    "reason": rt.error,
                },
            )
            self._changed()
            return

        rt.state = ACTIVITY_STATE_ACTIVE
        rt.last_activity = activity_id
        rt.progress = (total, total)
        rt.current = None
        run.finish("ok", warnings=rt.warnings)
        rt.run = None
        self._changed()
        _LOGGER.info("Room '%s': '%s' is active", room_id, activity_id)

    async def _async_switch_off_unused(
        self, room_id: str, previous: str, new_devices: list[str], context: Context
    ) -> None:
        """Smart switching: turn off what the next activity does not need."""
        rt = self.runtime(room_id)
        room = self.rooms[room_id]
        devices = activity_devices(room, room[CONF_ACTIVITIES].get(previous))
        old = room[CONF_ACTIVITIES].get(previous, {}).get(CONF_DEVICES, [])
        unused = [d for d in reversed(old) if d not in new_devices]
        if not unused:
            return
        _LOGGER.info("Room '%s': switching off devices no longer needed: %s", room_id, unused)

        cooldown: dict[str, float] = {}
        cooling: dict[str, list[str]] = {}
        waits: dict[str, list[tuple[dict[str, Any], StateSource]]] = {}
        for device_id in unused:
            _current_device.set(device_id)
            device = devices[device_id]
            later = device.get(CONF_TURN_OFF_AFTER) or 0
            if later:
                self._schedule_cut(rt, room_id, device[CONF_ENTITY_ID], later, [self._device_name(device)])
            else:
                self._doing(rt, "turn_off", name=self._device_name(device))
                await self._async_power_off(device[CONF_ENTITY_ID], context)
            switch = device.get(CONF_POWER_SWITCH)
            if switch:
                delay, source = self._off_wait(device, was_off=False)
                delay += later
                cooldown[switch] = max(cooldown.get(switch, 0), delay)
                if source is not None:
                    waits.setdefault(switch, []).append((device, source))
                if delay or source is not None:
                    cooling.setdefault(switch, []).append(self._device_name(device))

        still_needed = set(power_switches(devices, new_devices))
        still_needed |= self._switches_used_elsewhere(rt)
        for switch, delay in cooldown.items():
            if switch not in still_needed:
                self._schedule_cut(
                    rt, room_id, switch, delay, cooling.get(switch, []), waits.get(switch, [])
                )

    def _schedule_cut(
        self,
        rt: RoomRuntime,
        room_id: str,
        switch: str,
        delay: float,
        names: list[str],
        waits: list[tuple[dict[str, Any], StateSource]] | None = None,
    ) -> None:
        """Cut a power switch in the background after the cool-down.

        ``names`` are the devices that cool down meanwhile; the card shows
        them with the time the power goes off. ``waits`` are devices whose
        state is waited for first (until they say off), before ``delay``.
        """
        self._cancel_cut(rt, switch)
        waits = waits or []
        longest = max((source.timeout_off for _, source in waits), default=0.0)
        if delay > 0 or waits:
            until = dt_util.utcnow() + timedelta(seconds=delay + longest)
            rt.cooling[switch] = {
                "outlet": self._entity_name(switch),
                "names": names,
                "until": until.isoformat(),
                **({"status": True} if waits else {}),
            }
        rt.pending_cuts[switch] = task = self.hass.async_create_background_task(
            self._async_cut_later(rt, switch, delay, waits),
            f"{DOMAIN} {room_id} cut {switch}",
        )

        @callback
        def _done(_: asyncio.Task) -> None:
            # Cut, kept for another room, or cancelled by a new start
            if rt.pending_cuts.get(switch) in (task, None) and rt.cooling.pop(switch, None):
                self.async_update_listeners()

        task.add_done_callback(_done)

    async def _async_cut_later(
        self,
        rt: RoomRuntime,
        switch: str,
        delay: float,
        waits: list[tuple[dict[str, Any], StateSource]] | None = None,
    ) -> None:
        if waits:
            results = await asyncio.gather(
                *(self._async_wait_off(device, source) for device, source in waits)
            )
            if not all(results):
                rt.pending_cuts.pop(switch, None)
                return
        if delay:
            _LOGGER.debug("Cutting power of %s in %s s", switch, delay)
            await self._async_sleep(delay)
        rt.pending_cuts.pop(switch, None)
        if switch in self._switches_used_elsewhere(rt):
            _LOGGER.debug("Keeping %s on, another room uses it", switch)
            return
        with contextlib.suppress(ActivityAborted):
            await self._async_call(
                "homeassistant",
                SERVICE_TURN_OFF,
                {ATTR_ENTITY_ID: switch},
                Context(),
                f"power off {switch}",
            )

    def _switches_used_elsewhere(self, rt: RoomRuntime) -> set[str]:
        """Power switches the activities of all other rooms need.

        Rooms that are stopping do not count: they cut their switches
        themselves once they are done.
        """
        coordinators = [
            c for c in self.hass.data.get(DOMAIN, {}).values() if isinstance(c, EasyAVControlCoordinator)
        ]
        if self not in coordinators:
            coordinators.append(self)
        switches: set[str] = set()
        for coordinator in coordinators:
            for room_id, other in coordinator._runtime.items():
                if other is rt or other.activity is None or other.state == ACTIVITY_STATE_STOPPING:
                    continue
                room = coordinator.rooms.get(room_id)
                activity = room[CONF_ACTIVITIES].get(other.activity) if room else None
                if activity is not None:
                    switches.update(
                        power_switches(room[CONF_DEVICES], activity[CONF_DEVICES])
                    )
        return switches

    @staticmethod
    def _cancel_cut(rt: RoomRuntime, switch: str) -> None:
        task = rt.pending_cuts.pop(switch, None)
        rt.cooling.pop(switch, None)
        if task is not None and not task.done():
            task.cancel()

    # ------------------------------------------------------------------
    # Device states (device_state.py)
    # ------------------------------------------------------------------

    def state_source(self, device: dict[str, Any]) -> StateSource | None:
        """What says a device is on (its profile, or set by hand), or None for fixed times only."""
        return effective_source(self.hass, self.profiles, device)

    async def _async_wait_state(
        self, rt: RoomRuntime | None, device: dict[str, Any], source: StateSource, target: str, timeout: float
    ) -> tuple[str, str | None]:
        """Wait for a device's state, showing its own word for it on the card ("warming")."""
        name = self._device_name(device)
        until = dt_util.utcnow() + timedelta(seconds=timeout)

        def shown(value: str | None) -> None:
            if rt is not None:
                rt.current = {
                    "kind": "status",
                    "name": name,
                    "value": value,
                    "target": target,
                    "until": until.isoformat(),
                }
                if (device_id := _current_device.get()) is not None:
                    rt.current["device"] = device_id
                self.async_update_listeners()

        return await async_wait_for(self.hass, source, target, timeout, on_change=shown)

    async def _async_before(
        self, rt: RoomRuntime, devices: dict[str, Any], device: dict[str, Any], before: dict[str, Any]
    ) -> None:
        """Before a device is turned on: its delay, then the devices it waits for, all at once.

        A device waited for "on" by its state source (without one: it is not off); "picture" by its picture
        check. Whatever is not right within the timeout warns, or with on_timeout abort stops the start.
        """
        name = self._device_name(device)
        if before.get(CONF_DELAY):
            self._doing(rt, "delay", name=name, seconds=before[CONF_DELAY])
            await self._async_sleep(before[CONF_DELAY])
        waits = before.get(CONF_WAIT_FOR) or []
        if not waits:
            return
        timeout = before.get(CONF_TIMEOUT, DEFAULT_BEFORE_TIMEOUT)
        self._doing(rt, "before", name=name, names=", ".join(self._device_name(devices[w[CONF_DEVICE]]) for w in waits))

        async def one(wait: dict[str, Any]) -> str | None:
            other = devices[wait[CONF_DEVICE]]
            what = wait.get(CONF_STATE, WAIT_FOR_ON)
            if what == WAIT_FOR_PICTURE:
                found = check_source(self.hass, self.profiles, other, {CONF_DEVICE: wait[CONF_DEVICE]})
                source = found[0] if found else None
            else:
                source = self.state_source(other)
            if source is None:
                if what == WAIT_FOR_ON and not self._is_off(other[CONF_ENTITY_ID]):
                    return None
                return f"{self._device_name(other)} has no {'picture check' if what == WAIT_FOR_PICTURE else 'status'}"
            result, value = await self._async_wait_state(None, other, source, GROUP_ON, timeout)
            if result == RESULT_OK:
                return None
            shown = f", it shows {value}" if value else ""
            return (
                f"{self._device_name(other)} {'has no picture' if what == WAIT_FOR_PICTURE else 'is not on'}"
                f" after {timeout:g} s{shown}"
            )

        problems = [p for p in await asyncio.gather(*(one(w) for w in waits)) if p]
        if not problems:
            return
        message = f"before {name}: {'; '.join(problems)}"
        if before.get(CONF_ON_TIMEOUT) == ON_TIMEOUT_ABORT:
            raise ActivityAborted(message)
        self._warn(message)

    async def _async_record_on_later(self, device: dict[str, Any], source: StateSource, started: float) -> None:
        """A device nobody waits for: measure its time anyway, for Reports. Never warns."""
        result, value = await async_wait_for(self.hass, source, GROUP_ON, source.timeout_on)
        if result == RESULT_OK:
            self._record_time(device, "on", self.hass.loop.time() - started)
        else:
            self._record_event(device, "on", self.hass.loop.time() - started, result, value)

    async def _async_bring_up(self, rt: RoomRuntime, device: dict[str, Any], context: Context) -> None:
        """Turn a device on unless it is on (or coming on), then wait for it as its wait mode says.

        Status: until its state source says on (debounced). Time: delay_after_on, as AV Scenes did. Both: the
        status, then the time. A check that fails is handled as the device's on_failure says: warn (default),
        stop the activity, or retry once.
        """
        entity_id = device[CONF_ENTITY_ID]
        name = self._device_name(device)
        source = self.state_source(device)
        mode = wait_mode(device, source, on=True)

        if source is not None and source.current(self.hass)[0] == GROUP_STOPPING:
            # Cooling down: it can't be turned on until it is off
            await self._async_wait_state(rt, device, source, GROUP_OFF, source.timeout_off)
        group = source.current(self.hass)[0] if source is not None else None
        if group in (GROUP_ON, GROUP_STARTING):
            turn_on = False
        elif group in (GROUP_OFF, GROUP_ERROR):
            turn_on = True
        else:
            turn_on = self._is_off(entity_id)

        if turn_on:
            # Reachable first, so the time measured is the device's, not a reconnect's
            await self._async_wait_reachable(entity_id, (device.get(CONF_READY) or {}).get(CONF_TIMEOUT, REACH_TIMEOUT))
        retried = False
        while True:
            started = self.hass.loop.time()
            if turn_on:
                self._doing(rt, "turn_on", name=name)
                await self._async_power_on(
                    entity_id, context, (device.get(CONF_READY) or {}).get(CONF_TIMEOUT, REACH_TIMEOUT)
                )
                rt.switched_on[entity_id] = started
            if source is not None and mode == WAIT_NONE:
                if turn_on:
                    self.hass.async_create_background_task(
                        self._async_record_on_later(device, source, started), f"{DOMAIN} time {entity_id}"
                    )
                break
            if source is not None and mode != WAIT_TIME:
                result, value = await self._async_wait_state(rt, device, source, GROUP_ON, source.timeout_on)
                if result == RESULT_OK and turn_on and not retried:
                    self._record_time(device, "on", self.hass.loop.time() - started)
                if result != RESULT_OK and turn_on:
                    self._record_event(device, "on", self.hass.loop.time() - started, result, value)
                if result != RESULT_OK:
                    action = failure_action(device, CHECK_TURN_ON)
                    message = describe_failure(name, result, value, "on", source.timeout_on)
                    if action == FAILURE_RETRY and not retried:
                        _LOGGER.info("%s, trying once more", message)
                        retried, turn_on = True, True
                        continue
                    if action == FAILURE_STOP:
                        raise ActivityAborted(message)
                    self._warn(message)
            break

        if turn_on and mode not in (WAIT_STATUS, WAIT_NONE) and device[CONF_DELAY_AFTER_ON]:
            self._doing(rt, "warm_up", name=name, seconds=device[CONF_DELAY_AFTER_ON])
            await self._async_sleep(device[CONF_DELAY_AFTER_ON])

    async def _async_run_checks(self, rt: RoomRuntime, room: dict[str, Any], checks: list[dict[str, Any]]) -> None:
        """Run an activity's checks, all at once. A failed one warns, or with on_failure stop aborts the start."""
        self._doing(rt, "checks", count=len(checks))
        results = await asyncio.gather(
            *(self._async_check(room[CONF_DEVICES][check[CONF_DEVICE]], check) for check in checks),
            return_exceptions=True,
        )
        for result in results:
            if isinstance(result, BaseException):
                raise result

    async def _async_check(self, device: dict[str, Any], check: dict[str, Any]) -> None:
        """Wait until one check is right (debounced), at most its timeout, and time it for Reports."""
        found = check_source(self.hass, self.profiles, device, check)
        name = self._device_name(device)
        if found is None:
            self._warn(f"{name} has no picture check: pick an entity for its check")
            return
        source, timeout = found
        began = self.hass.loop.time()
        result, value = await async_wait_for(self.hass, source, GROUP_ON, timeout)
        self._record_check(device, check, source.entity_id, began, result, value)
        if result == RESULT_OK:
            return
        shown = f", it shows {value}" if value else ""
        what = "no picture" if not check.get(CONF_ENTITY_ID) else f"{source.entity_id} is not right"
        message = f"{name}: {what} after {timeout:g} s{shown}"
        if check_failure(device, check) == FAILURE_STOP:
            raise ActivityAborted(message)
        self._warn(message)

    @callback
    def _record_check(
        self, device: dict[str, Any], check: dict[str, Any], watched: str, began: float, result: str, value: str | None
    ) -> None:
        """How long a device took to show its picture (its profile's check) or signal (a check on an entity of
        its own, such as the audio stream type): from switching the device on in this start, or from the start
        of the check when it was on already (``warm``, left out of the typical time)."""
        rt = _current_room.get()
        now = self.hass.loop.time()
        switched = rt.switched_on.get(device[CONF_ENTITY_ID]) if rt is not None else None
        seconds = now - (switched if switched is not None else began)
        direction = "signal" if check.get(CONF_ENTITY_ID) else "picture"
        if rt is not None and rt.run is not None:
            rt.run.event(
                "check", device=device[CONF_ENTITY_ID], entity=watched, kind=direction, result=result,
                seconds=round(seconds, 1), warm=switched is None, **({"value": value} if value else {}),
            )
        self._record_event(
            device, direction, seconds, result, value,
            extra={"source": watched, **({"warm": True} if switched is None else {})},
        )

    async def _async_wait_picture(self, device: dict[str, Any], step: dict[str, Any]) -> None:
        """Wait until the device shows a picture; a device without a picture check has nothing to wait for."""
        found = picture_source(self.hass, self.profiles, device)
        name = self._device_name(device)
        if found is None:
            _LOGGER.debug("%s has no picture check, nothing to wait for", name)
            return
        source, timeout = found
        timeout = step.get(CONF_TIMEOUT, timeout)
        result, value = await self._async_wait_state(_current_room.get(), device, source, GROUP_ON, timeout)
        if result == RESULT_OK:
            return
        shown = f", it shows {value}" if value else ""
        message = f"{name} has no picture after {timeout:g} s{shown}"
        if failure_action(device, CHECK_PICTURE) == FAILURE_STOP:
            raise ActivityAborted(message)
        self._warn(message)

    def _off_wait(self, device: dict[str, Any], *, was_off: bool) -> tuple[float, StateSource | None]:
        """Before a device's outlet is cut: the fixed time left, and the state source to wait for first.

        Time: delay_after_off (what's left of it, for a device that was off already). Status: no fixed time;
        wait until its state says off. Both: the state, then the fixed time.
        """
        entity_id = device[CONF_ENTITY_ID]
        delay = device[CONF_DELAY_AFTER_OFF]
        source = self.state_source(device)
        mode = wait_mode(device, source, on=False)
        if was_off:
            delay = self._remaining_cooldown(entity_id, delay)
        if mode == WAIT_NONE:
            return 0.0, None
        if source is None or mode == WAIT_TIME:
            return delay, None
        wait = None if source.current(self.hass)[0] == GROUP_OFF and was_off else source
        return (0.0 if mode == WAIT_STATUS else delay), wait

    @callback
    def _record_time(self, device: dict[str, Any], direction: str, seconds: float) -> None:
        """Keep how long a device took to come on or go off; a time far over the usual one is reported."""
        entity_id = device[CONF_ENTITY_ID]
        timings = self.timings.setdefault(entity_id, {"on": [], "off": []})
        samples = timings.get(direction) or []
        if is_slow(samples, seconds):
            message = (
                f"{self._device_name(device)} took {seconds:.0f} s to {'come on' if direction == 'on' else 'go off'}"
                f" (usually {typical(samples):.0f} s)"
            )
            if direction == "on":
                self._warn(message)
            else:
                _LOGGER.warning(message)
        timings[direction] = add_sample(samples, seconds)
        self._schedule_save()
        self._record_event(device, direction, seconds, "ok", None, slow=is_slow(samples, seconds))

    @callback
    def _record_event(
        self,
        device: dict[str, Any],
        direction: str,
        seconds: float,
        result: str,
        value: str | None,
        *,
        slow: bool = False,
        extra: dict[str, Any] | None = None,
    ) -> None:
        """A device's time for the Reports page, good or not, with the run it belongs to."""
        if (history := history_of(self.hass)) is None:
            return
        rt = _current_room.get()
        run = rt.run.run if rt is not None and rt.run is not None else {}
        event: dict[str, Any] = {
            "at": dt_util.utcnow().isoformat(),
            "direction": direction,
            "seconds": round(seconds, 1),
            "result": result,
            "name": self._device_name(device),
            **({"room": run["room"], "room_name": run["room_name"]} if run else {}),
            **({"activity": run["activity"], "activity_name": run["activity_name"]} if run else {}),
        }
        if value is not None and result != "ok":
            event["value"] = value
        if slow:
            event["slow"] = True
        if extra:
            event.update(extra)
        history.add_device_event(device[CONF_ENTITY_ID], event)

    def _room_entities(self, room_id: str) -> list[str]:
        """Every entity a run of the room depends on: devices, their status, remotes, outlets, connection and
        picture checks, and the entities the activities check."""
        room = self.rooms[room_id]
        out: set[str] = set()
        for device in room[CONF_DEVICES].values():
            out.add(device[CONF_ENTITY_ID])
            for key in (CONF_POWER_SWITCH, CONF_REMOTE_ENTITY):
                if device.get(key):
                    out.add(device[key])
            if (device.get(CONF_READY) or {}).get(CONF_ENTITY_ID):
                out.add(device[CONF_READY][CONF_ENTITY_ID])
            with contextlib.suppress(Exception):
                if (source := self.state_source(device)) is not None:
                    out.add(source.entity_id)
                if (picture := picture_source(self.hass, self.profiles, device)) is not None:
                    out.add(picture[0].entity_id)
        for activity in room[CONF_ACTIVITIES].values():
            for check in activity.get(CONF_CHECKS) or []:
                if check.get(CONF_ENTITY_ID):
                    out.add(check[CONF_ENTITY_ID])
            for flow in (activity.get(CONF_FLOW) or {}).values():
                if (flow.get(CONF_READY) or {}).get(CONF_ENTITY_ID):
                    out.add(flow[CONF_READY][CONF_ENTITY_ID])
        return sorted(out)

    def entity_map(self, room_id: str) -> dict[str, list[dict[str, Any]]]:
        """For Reports: the entities Easy AV Control creates for the room, and those it relies on, each with its role.

        ``created``: {entity_id, role} (role: switch, sensor, select, scene, problem); ``used``: {entity_id, roles:
        [{role, device / activity}]} (role: device, outlet, remote, status, ready, picture, check, started_by).
        """
        room = self.rooms[room_id]
        registry = er.async_get(self.hass)
        wanted: dict[str, dict[str, Any]] = {
            switch_unique_id(room_id): {"role": "switch"},
            sensor_unique_id(room_id): {"role": "sensor"},
            select_unique_id(room_id): {"role": "select"},
            **{scene_unique_id(room_id, a): {"role": "scene", "activity": a} for a in room[CONF_ACTIVITIES]},
            **{problem_unique_id(room_id, k): {"role": "problem", "problem": k} for k in PROBLEMS},
        }
        created = []
        for entry in er.async_entries_for_config_entry(registry, self.entry.entry_id):
            if (info := wanted.get(entry.unique_id)) is not None:
                created.append({"entity_id": entry.entity_id, **info})
        created.sort(key=lambda e: (["switch", "sensor", "select", "scene", "problem"].index(e["role"]), e["entity_id"]))

        used: dict[str, list[dict[str, Any]]] = {}

        def add(entity_id: str | None, role: str, **where: Any) -> None:
            if entity_id:
                roles = used.setdefault(entity_id, [])
                if {"role": role, **where} not in roles:
                    roles.append({"role": role, **where})

        for device_id, device in room[CONF_DEVICES].items():
            add(device[CONF_ENTITY_ID], "device", device=device_id)
            add(device.get(CONF_POWER_SWITCH), "outlet", device=device_id)
            add(device.get(CONF_REMOTE_ENTITY), "remote", device=device_id)
            add((device.get(CONF_READY) or {}).get(CONF_ENTITY_ID), "ready", device=device_id)
            with contextlib.suppress(Exception):
                if (source := self.state_source(device)) is not None:
                    add(source.entity_id, "status", device=device_id)
                if (picture := picture_source(self.hass, self.profiles, device)) is not None:
                    add(picture[0].entity_id, "picture", device=device_id)
        for activity_id, activity in room[CONF_ACTIVITIES].items():
            for check in activity.get(CONF_CHECKS) or []:
                add(check.get(CONF_ENTITY_ID), "check", activity=activity_id, device=check[CONF_DEVICE])
            for trigger in activity.get(CONF_STARTED_BY) or []:
                add(trigger[CONF_ENTITY_ID], "started_by", activity=activity_id)
            for device_id, flow in (activity.get(CONF_FLOW) or {}).items():
                add((flow.get(CONF_READY) or {}).get(CONF_ENTITY_ID), "ready", device=device_id, activity=activity_id)
        return {
            "created": created,
            "used": [{"entity_id": e, "roles": r} for e, r in sorted(used.items())],
        }

    def _recorder(self, room_id: str, activity_id: str, mode: str, previous: str | None) -> RunRecorder:
        room = self.rooms[room_id]
        recorder = self._new_recorder(room_id, room, activity_id, mode, previous)
        recorder.watch(self._room_entities(room_id), lambda e: not self._entity_unavailable(e))
        recorder.event("begin", mode=mode, activity=activity_id, **({"from": previous} if previous else {}))
        return recorder

    def _new_recorder(
        self, room_id: str, room: dict[str, Any], activity_id: str, mode: str, previous: str | None
    ) -> RunRecorder:
        return RunRecorder(
            self.hass,
            entry_id=self.entry.entry_id,
            room=room_id,
            room_name=room.get(CONF_NAME, room_id),
            activity=activity_id,
            activity_name=self.activity_name(room_id, activity_id),
            mode=mode,
            **({"from": previous, "from_name": self.activity_name(room_id, previous)} if previous else {}),
        )

    async def _async_wait_off(self, device: dict[str, Any], source: StateSource) -> bool:
        """Wait until a device says it is off, before its outlet is cut. False: leave the outlet on."""
        name = self._device_name(device)
        retried = False
        while True:
            result, value = await async_wait_for(self.hass, source, GROUP_OFF, source.timeout_off)
            if result == RESULT_OK:
                started = self._off_started.pop(device[CONF_ENTITY_ID], None)
                if started is not None and not retried:
                    self._record_time(device, "off", self.hass.loop.time() - started)
                return True
            started = self._off_started.get(device[CONF_ENTITY_ID])
            if started is not None:
                self._record_event(device, "off", self.hass.loop.time() - started, result, value)
            action = failure_action(device, CHECK_TURN_OFF)
            message = describe_failure(name, result, value, "off", source.timeout_off)
            if action == FAILURE_RETRY and not retried:
                retried = True
                await self._async_power_off(device[CONF_ENTITY_ID], Context())
                continue
            if action == FAILURE_STOP:
                self._warn(f"{message}; its outlet is left on")
                return False
            self._warn(f"{message}; cutting its outlet anyway")
            return True

    # ------------------------------------------------------------------
    # Stop
    # ------------------------------------------------------------------

    async def _async_stop(self, room_id: str) -> None:
        rt = self.runtime(room_id)
        if rt.activity is None:
            _LOGGER.debug("Room '%s': nothing to stop", room_id)
            return

        room = self.rooms[room_id]
        activity_id = rt.activity
        activity = room[CONF_ACTIVITIES].get(activity_id)
        context = Context()
        _LOGGER.info("Room '%s': stopping '%s'", room_id, activity_id)

        rt.state = ACTIVITY_STATE_STOPPING
        rt.run = run = self._recorder(room_id, activity_id, "stop", None)
        if by := self._triggered.pop(room_id, None):
            run.run["by"] = by
            run.event("started_by", **by)
        self._changed()

        if activity is not None:
            devices = activity_devices(room, activity)
            device_ids: list[str] = activity[CONF_DEVICES]
            hook = self._start_hook(room_id, activity_id, CONF_ON_STOP, context)
            try:
                # Power switch -> cool-down its devices still need, and who cools
                cooldown: dict[str, float] = {}
                cooling: dict[str, list[str]] = {}
                waits: dict[str, list[tuple[dict[str, Any], StateSource]]] = {}
                for device_id in reversed(device_ids):
                    _current_device.set(device_id)
                    device = devices[device_id]
                    run.phase("device", device=device_id, entity_id=device[CONF_ENTITY_ID], name=self._device_name(device))
                    entity_id = device[CONF_ENTITY_ID]
                    was_off = self._is_off(entity_id)
                    later = device.get(CONF_TURN_OFF_AFTER) or 0
                    if not was_off and later:
                        # Seats: off in the background, a while after the shutdown
                        self._schedule_cut(rt, room_id, entity_id, later, [self._device_name(device)])
                    elif not was_off:
                        self._doing(rt, "turn_off", name=self._device_name(device))
                        await self._async_power_off(entity_id, context)
                    if switch := device.get(CONF_POWER_SWITCH):
                        delay, source = self._off_wait(device, was_off=was_off)
                        delay += 0 if was_off else later
                        cooldown[switch] = max(cooldown.get(switch, 0.0), delay)
                        if source is not None:
                            waits.setdefault(switch, []).append((device, source))
                        if delay > 0 or source is not None:
                            cooling.setdefault(switch, []).append(self._device_name(device))

                _current_device.set(None)
                used_elsewhere = self._switches_used_elsewhere(rt)
                switches = [
                    s
                    for s in reversed(power_switches(devices, device_ids))
                    if s not in used_elsewhere
                ]
                for switch in switches:
                    self._cancel_cut(rt, switch)
                now = [s for s in switches if cooldown.get(s, 0) <= 0 and not waits.get(s)]
                if now:
                    run.phase("outlets_off")
                    self._doing(rt, "power_off")
                    with contextlib.suppress(ActivityAborted):
                        await self._async_call(
                            "homeassistant",
                            SERVICE_TURN_OFF,
                            {ATTR_ENTITY_ID: now},
                            context,
                            f"power off {', '.join(now)}",
                        )
                # The rest after the cool-down, without keeping the room busy
                for switch in switches:
                    if switch not in now:
                        self._schedule_cut(
                            rt,
                            room_id,
                            switch,
                            cooldown.get(switch, 0.0),
                            cooling.get(switch, []),
                            waits.get(switch, []),
                        )
                if hook is not None:
                    if not hook.done():
                        run.phase("hooks", hook=CONF_ON_STOP)
                        self._doing(rt, "hooks", hook=CONF_ON_STOP)
                    await hook
            except asyncio.CancelledError:
                if hook is not None:
                    hook.cancel()
                rt.current = None
                run.finish("cancelled")
                rt.run = None
                raise
            except Exception as err:
                if hook is not None:
                    hook.cancel()
                rt.current = None
                _LOGGER.exception("Room '%s': stop of '%s' failed", room_id, activity_id)
                rt.state = ACTIVITY_STATE_ERROR
                rt.error = str(err) or type(err).__name__
                run.finish("error", error=rt.error)
                rt.run = None
                self._changed()
                return

        run.finish("ok")
        rt.run = None
        rt.activity = None
        rt.state = ACTIVITY_STATE_IDLE
        rt.error = None
        rt.progress = (0, 0)
        rt.current = None
        ir.async_delete_issue(self.hass, DOMAIN, self._aborted_issue_id(room_id))
        self._changed()
        _LOGGER.info("Room '%s': '%s' stopped", room_id, activity_id)

    async def _async_sleep(self, seconds: float) -> None:
        """Wait between actions (a seam for tests)."""
        await asyncio.sleep(seconds)

    def _now(self) -> float:
        """Monotonic clock in seconds (a seam for tests)."""
        return self.hass.loop.time()

    def _remaining_cooldown(self, entity_id: str, delay: float) -> float:
        """Cool-down still left for a device that was already off."""
        state = self.hass.states.get(entity_id)
        if state is None or state.state == STATE_UNAVAILABLE or not delay:
            return 0
        elapsed = (dt_util.utcnow() - state.last_changed).total_seconds()
        return max(0.0, delay - elapsed)

    # ------------------------------------------------------------------
    # Readiness
    # ------------------------------------------------------------------

    @staticmethod
    def _state_ok(state: State | None, wanted: list[str] | None, attribute: str | None = None) -> bool:
        if state is None:
            return False
        if wanted:
            value = state.attributes.get(attribute) if attribute else state.state
            return value is not None and str(value) in wanted
        return state.state != STATE_UNAVAILABLE

    def _is_ready(self, entity_id: str, options: dict[str, Any]) -> bool:
        target = options.get(CONF_ENTITY_ID) or entity_id
        return self._state_ok(
            self.hass.states.get(target), options.get(CONF_STATE), options.get(CONF_ATTRIBUTE)
        )

    async def _async_wait_ready(
        self,
        entity_id: str,
        options: dict[str, Any],
        label: str,
        *,
        reload: bool | None = None,
        name: str | None = None,
    ) -> bool:
        """Wait until an entity is ready.

        Ready means it exists and is not unavailable, or, with ``state``, has
        one of those states. ``entity_id`` in the options checks another
        entity than the given one.

        Returns False on a timeout with ``on_timeout: continue`` and raises
        ActivityAborted on a timeout with ``on_timeout: abort``. ``name`` is
        what the card shows while it waits during a start.
        """
        entity_id = options.get(CONF_ENTITY_ID) or entity_id
        wanted: list[str] | None = options.get(CONF_STATE)
        attribute: str | None = options.get(CONF_ATTRIBUTE)
        if self._state_ok(self.hass.states.get(entity_id), wanted, attribute):
            return True

        timeout: float = options[CONF_TIMEOUT]
        loop = asyncio.get_running_loop()
        ready: asyncio.Future[None] = loop.create_future()

        @callback
        def _state_changed(event: Event[EventStateChangedData]) -> None:
            if self._state_ok(event.data["new_state"], wanted, attribute) and not ready.done():
                ready.set_result(None)

        unsub: CALLBACK_TYPE = async_track_state_change_event(
            self.hass, [entity_id], _state_changed
        )
        retry: asyncio.Task | None = None
        try:
            if options[CONF_RELOAD_INTEGRATION] if reload is None else reload:
                self._reload_integration_of(entity_id)
            if options[CONF_RELOAD_INTEGRATION]:
                retry = self.hass.async_create_background_task(
                    self._async_retry_reload(entity_id), f"{DOMAIN} retry {entity_id}"
                )
            # The entity may have come up between the first check and subscribing
            if self._state_ok(self.hass.states.get(entity_id), wanted, attribute):
                return True
            _LOGGER.info(
                "Waiting up to %s s for %s to become %s",
                timeout,
                entity_id,
                " or ".join(wanted) if wanted else "available",
            )
            if (rt := _current_room.get()) is not None:
                self._doing(
                    rt, "ready", name=name or self._entity_name(entity_id), seconds=timeout
                )
            try:
                async with asyncio.timeout(timeout):
                    await ready
            except TimeoutError:
                message = (
                    f"{label}: {entity_id} not "
                    f"{' or '.join(wanted) if wanted else 'available'} after {timeout:g} s"
                )
                if options[CONF_ON_TIMEOUT] == ON_TIMEOUT_ABORT:
                    raise ActivityAborted(message) from None
                _LOGGER.warning("%s, continuing", message)
                return False
            _LOGGER.info("%s is available", entity_id)
            return True
        finally:
            # A started reload is left to finish on its own
            unsub()
            if retry is not None:
                retry.cancel()

    async def _async_retry_reload(self, entity_id: str) -> None:
        """Reload an entity's integration again while it is in setup_retry.

        Runs until cancelled. A reload that is still running is waited for, so
        one attempt follows the other with a pause in between.
        """
        entity = er.async_get(self.hass).async_get(entity_id)
        if entity is None or entity.config_entry_id is None:
            return
        entry_id = entity.config_entry_id
        while True:
            running = self._reloads.get(entry_id)
            if running is not None and not running.done():
                await asyncio.shield(running)
            await asyncio.sleep(RELOAD_RETRY_INTERVAL)
            entry = self.hass.config_entries.async_get_entry(entry_id)
            if entry is None:
                return
            if entry.state is ConfigEntryState.SETUP_RETRY:
                _LOGGER.debug("%s is still not set up, reloading it again", entry.title)
                self._reload_integration_of(entity_id)

    def _reload_integration_of(self, entity_id: str) -> asyncio.Task | None:
        """Reload the config entry that provides an entity; a running reload is reused.

        Resets the back-off of an entry in setup_retry. The registry keeps the
        entry even while the entity has no state.
        """
        entity = er.async_get(self.hass).async_get(entity_id)
        if entity is None or entity.config_entry_id is None:
            _LOGGER.warning("Cannot reload integration of %s: not in the entity registry", entity_id)
            return None
        entry_id = entity.config_entry_id
        running = self._reloads.get(entry_id)
        if running is not None and not running.done():
            return running
        _LOGGER.info("Reloading config entry %s to bring up %s", entry_id, entity_id)

        async def _reload() -> None:
            try:
                await self.hass.config_entries.async_reload(entry_id)
            except Exception:
                _LOGGER.exception("Reloading config entry %s failed", entry_id)

        task = self.hass.async_create_background_task(_reload(), f"{DOMAIN} reload {entry_id}")
        self._reloads[entry_id] = task
        return task

    # ------------------------------------------------------------------
    # Steps and service calls
    # ------------------------------------------------------------------

    async def _async_execute_step(
        self,
        room: dict[str, Any],
        step: dict[str, Any],
        context: Context,
        *,
        name: str | None = None,
    ) -> None:
        step_type = step[CONF_TYPE]
        entity_id = None
        if CONF_DEVICE in step:
            entity_id = room[CONF_DEVICES][step[CONF_DEVICE]][CONF_ENTITY_ID]

        if step_type == STEP_TYPE_DELAY:
            return
        if step_type == STEP_TYPE_WAIT_AVAILABLE:
            await self._async_wait_ready(
                entity_id or step[CONF_ENTITY_ID],
                step,
                f"step {step.get('id', '')}".strip(),
                name=name,
            )
            return
        if step_type == STEP_TYPE_WAIT_PICTURE:
            await self._async_wait_picture(room[CONF_DEVICES][step[CONF_DEVICE]], step)
            return
        if step_type == STEP_TYPE_POWER_ON:
            await self._async_power_on(entity_id, context)
            return
        if step_type == STEP_TYPE_POWER_OFF:
            await self._async_power_off(entity_id, context)
            return

        call = step_service(step_type, step, entity_id)
        if call is None:
            return
        domain, service, data, target = call
        await self._async_call(domain, service, data, context, step_type, target)

    def _is_off(self, entity_id: str) -> bool:
        state = self.hass.states.get(entity_id)
        if state is not None and (off := self._select_option(entity_id, on=False)) is not None:
            return state.state in (off, STATE_UNAVAILABLE, STATE_UNKNOWN)
        return state is None or state.state in _OFF_STATES

    def _platform_of(self, entity_id: str) -> str | None:
        """The integration that provides an entity, e.g. apple_tv."""
        entry = er.async_get(self.hass).async_get(entity_id)
        return entry.platform if entry is not None else None

    def _entity_unavailable(self, entity_id: str) -> bool:
        """True when the integration reports its entity as not available.

        The state may still show an older value; Home Assistant then drops a
        service call for the entity with only a log warning.
        """
        component = self.hass.data.get(DATA_INSTANCES, {}).get(entity_id.split(".")[0])
        entity = component.get_entity(entity_id) if component is not None else None
        return entity is not None and not entity.available

    def _reachable(self, entity_id: str) -> bool:
        """The entity has a state other than unavailable and its integration reports it available."""
        state = self.hass.states.get(entity_id)
        return state is not None and state.state != STATE_UNAVAILABLE and not self._entity_unavailable(entity_id)

    async def _async_wait_reachable(self, entity_id: str, timeout: float) -> bool:
        """Wait until an unreachable entity is back and stays so for REACH_SETTLE s; reload its integration
        once if it takes long. True when it is reachable."""
        if self._reachable(entity_id):
            return True
        _LOGGER.info("%s is not reachable, waiting up to %g s for it", entity_id, timeout)
        if (rt := _current_room.get()) is not None:
            self._doing(rt, "reach", name=self._entity_name(entity_id), seconds=timeout)
        if rt is not None and rt.run is not None:
            rt.run.event("unreachable", entity_id=entity_id, timeout=timeout)
        waited = 0.0
        since: float | None = None
        reloaded = False
        while waited < timeout:
            await self._async_sleep(REACH_POLL)
            waited += REACH_POLL
            if self._reachable(entity_id):
                since = waited if since is None else since
                if waited - since >= REACH_SETTLE:
                    _LOGGER.info("%s is reachable again after %.1f s", entity_id, waited)
                    if rt is not None and rt.run is not None:
                        rt.run.event("reachable", entity_id=entity_id, after=round(waited, 1))
                    return True
            else:
                since = None
                if not reloaded and waited >= REACH_RELOAD_AFTER:
                    reloaded = True
                    if rt is not None and rt.run is not None:
                        rt.run.event("reload", entity_id=entity_id)
                    self._reload_integration_of(entity_id)
        return False

    async def _async_power_on(self, entity_id: str, context: Context, timeout: float = REACH_TIMEOUT) -> None:
        if not can_switch(self.hass, entity_id, on=True):
            _LOGGER.debug("%s cannot be switched on, skipping", entity_id)
            return
        if not await self._async_wait_reachable(entity_id, timeout):
            self._warn(f"turn on: {entity_id} was not reachable for {timeout:g} s, it was not switched on")
            return
        if (option := self._select_option(entity_id, on=True)) is not None:
            await self._async_call(
                entity_id.split(".")[0], "select_option", {ATTR_ENTITY_ID: entity_id, "option": option}, context, "turn on"
            )
            return
        domain, service = power_service(entity_id, on=True)
        await self._async_call(domain, service, {ATTR_ENTITY_ID: entity_id}, context, "turn on")

    def _select_device(self, entity_id: str) -> dict[str, Any]:
        """The device of a room with this entity, for its select options."""
        for room in self.rooms.values():
            for device in room[CONF_DEVICES].values():
                if device[CONF_ENTITY_ID] == entity_id:
                    return device
        return {}

    def _select_option(self, entity_id: str, *, on: bool) -> str | None:
        """For a select device (Harmony activities): the option that turns it on or off; None for others.

        On: the device's ``option``, else the first option that is not the off one. Off: ``off_option``,
        else power_off.
        """
        if not entity_id.startswith(("select.", "input_select.")):
            return None
        device = self._select_device(entity_id)
        off = device.get(CONF_OFF_OPTION) or DEFAULT_OFF_OPTION
        if not on:
            return off
        if device.get(CONF_OPTION):
            return device[CONF_OPTION]
        state = self.hass.states.get(entity_id)
        options = [o for o in (state.attributes.get("options") or []) if o != off] if state else []
        return options[0] if options else None

    async def _async_power_off(self, entity_id: str, context: Context) -> None:
        self._off_started[entity_id] = self.hass.loop.time()
        if not can_switch(self.hass, entity_id, on=False):
            _LOGGER.debug("%s cannot be switched off, skipping", entity_id)
            return
        if (option := self._select_option(entity_id, on=False)) is not None:
            await self._async_call(
                entity_id.split(".")[0], "select_option", {ATTR_ENTITY_ID: entity_id, "option": option}, context, "turn off"
            )
            return
        domain, service = power_service(entity_id, on=False)
        await self._async_call(domain, service, {ATTR_ENTITY_ID: entity_id}, context, "turn off")

    async def _async_call(
        self,
        domain: str,
        service: str,
        data: dict[str, Any],
        context: Context,
        label: str,
        target: dict[str, Any] | None = None,
    ) -> None:
        """Call a service and wait for it, bounded by the service timeout.

        Failures are logged and recorded as warnings; the activity goes on.
        """
        rt = _current_room.get()
        run = rt.run if rt is not None else None
        started = self.hass.loop.time()
        result = "ok"
        try:
            async with asyncio.timeout(self.service_timeout):
                await self.hass.services.async_call(
                    domain,
                    service,
                    data,
                    blocking=True,
                    context=context,
                    target=target,
                )
        except TimeoutError:
            result = "timeout"
            self._warn(f"{label}: {domain}.{service} did not finish within {self.service_timeout:g} s")
        except Exception as err:  # noqa: BLE001 - any failing device must not stop the rest
            result = f"error: {err}"
            self._warn(f"{label}: {domain}.{service} failed: {err}")
        if run is not None:
            run.event(
                "call",
                service=f"{domain}.{service}",
                data={k: v for k, v in data.items()},
                **({"target": target} if target else {}),
                label=label,
                result=result,
                seconds=round(self.hass.loop.time() - started, 2),
                context=context.id,
            )

    def _doing(
        self,
        rt: RoomRuntime,
        kind: str,
        *,
        name: str | None = None,
        seconds: float | None = None,
        **extra: Any,
    ) -> None:
        """Record what a start or stop is busy with and tell the card.

        ``kind`` is power_on, boot, reload, ready, turn_on, warm_up, step,
        wait, hooks, turn_off or power_off; ``name`` the device or entity;
        ``seconds`` a wait, sent as the time it ends (``until``).
        """
        current: dict[str, Any] = {"kind": kind, "name": name, **extra}
        if (device := _current_device.get()) is not None:
            current["device"] = device
        if rt.run is not None:
            rt.run.event("doing", **{k: v for k, v in current.items() if v is not None}, **({"seconds": seconds} if seconds else {}))
        if seconds is not None:
            current["until"] = (dt_util.utcnow() + timedelta(seconds=seconds)).isoformat()
        rt.current = current
        self.async_update_listeners()

    def _entity_name(self, entity_id: str) -> str:
        state = self.hass.states.get(entity_id)
        return (state.name if state is not None else None) or entity_id

    def device_name(self, device: dict[str, Any]) -> str:
        return self._device_name(device)

    def _device_name(self, device: dict[str, Any]) -> str:
        """The name of a device as the card shows it."""
        return device.get(CONF_NAME) or self._entity_name(device[CONF_ENTITY_ID])

    @staticmethod
    def _warn(message: str) -> None:
        _LOGGER.warning(message)
        if (rt := _current_room.get()) is not None:
            rt.warnings.append(message)
            if rt.run is not None:
                rt.run.event("warning", message=message)

    def _start_hook(
        self, room_id: str, activity_id: str, key: str, context: Context
    ) -> asyncio.Task | None:
        script = self._scripts.get((room_id, activity_id, key))
        if script is None:
            return None

        async def _run() -> None:
            try:
                await script.async_run(context=context)
            except Exception as err:  # noqa: BLE001 - hooks must not break the activity
                self._warn(f"{key} failed: {err}")

        return self.hass.async_create_task(_run(), f"{DOMAIN} {room_id} {key}")

    def _aborted_issue_id(self, room_id: str) -> str:
        return f"activity_aborted_{self.entry.entry_id}_{room_id}"
