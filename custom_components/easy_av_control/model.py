"""Configuration schema (v2) and validation for Easy AV Control.

Layout of ``entry.data``::

    rooms:
      <room_id>:
        name: Wohnzimmer
        default_activity: tv               # optional: what a plain "on" starts
        devices:
          <device_id>:
            entity_id: media_player.onkyo_receiver
            power_switch: switch.wz_steckdose_multimedia   # optional
            remote_entity: remote.apple_tv   # optional: arrow keys, OK, back, home, menu
            ready: {timeout: 60, reload_integration: true, on_timeout: abort}
            delay_after_power: 0           # boot time after its power switch came on
            delay_after_on: 0
            delay_after_off: 0
            commands:                      # remote buttons -> HA actions
              guide: [...]
            settings:                      # in the card; default: automatic
              - {setting: sound_mode, options: [THX, STEREO]}
              - {entity: number.onkyo_bass, name: Bass}
        activities:
          <activity_id>:
            name: TV
            icon: mdi:television
            order: 1                       # position in lists (HA stores keys sorted)
            devices: [onkyo, beamer]       # power-on order
            steps: [...]                   # settings once the devices are up
            on_start: [...]                # HA actions
            on_stop: [...]                 # HA actions
            remote:                        # which device gets which buttons
              volume: onkyo
              channels: vu
              transport: vu
              navigation: vu
              touchpad: false              # swipe area; default: for a remote entity
              buttons:
                - {command: netflix, name: Netflix, icon: mdi:netflix}
                - {device: aptv, source: YouTube}   # quick select: source or app
              settings:                    # this activity's own choice; default: the devices'
                - {device: onkyo, setting: sound_mode, options: [THX, STEREO]}
            commands: {netflix: [...]}     # activity-only commands
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any

import voluptuous as vol

from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv, entity_registry as er
from homeassistant.helpers.script import async_validate_actions_config

from .const import (
    CHECKS,
    COMMAND_GROUPS,
    CONF_ACTION,
    CONF_ACTIVITIES,
    CONF_AREA_ID,
    CONF_ATTRIBUTE,
    CONF_AVAILABLE_IS_ON,
    CONF_BEFORE,
    CONF_BRIGHTNESS_PCT,
    CONF_BUTTONS,
    CONF_CHECKS,
    CONF_COLOR_TEMP_KELVIN,
    CONF_COMMAND,
    CONF_COMMANDS,
    CONF_DATA,
    CONF_DEBOUNCE,
    CONF_DEFAULT_ACTIVITY,
    CONF_DELAY,
    CONF_DELAY_AFTER_OFF,
    CONF_DELAY_AFTER_ON,
    CONF_DELAY_AFTER_POWER,
    CONF_DEVICE,
    CONF_DEVICES,
    CONF_ENTITY,
    CONF_ENTITY_ID,
    CONF_GRACE,
    CONF_ICON,
    CONF_ID,
    CONF_IDLE_AFTER,
    CONF_IDLE_WARNING,
    CONF_KEEP_CHECKING,
    CONF_LOST_AFTER,
    CONF_MODE,
    CONF_MONITOR,
    CONF_NAME,
    CONF_OFF_OPTION,
    CONF_ON_FAILURE,
    CONF_ON_START,
    CONF_ON_STOP,
    CONF_ON_TIMEOUT,
    CONF_OPTION,
    CONF_OPTIONS,
    CONF_ORDER,
    CONF_PICTURE_LOST_AFTER,
    CONF_POSITION,
    CONF_POWER_SWITCH,
    CONF_PROFILE,
    CONF_READY,
    CONF_RELOAD_INTEGRATION,
    CONF_REMOTE,
    CONF_REMOTE_ENTITY,
    CONF_ROOMS,
    CONF_SETTING,
    CONF_SETTINGS,
    CONF_SOUND_MODE,
    CONF_SOURCE,
    CONF_STARTED_BY,
    CONF_STATE,
    CONF_STATE_SOURCE,
    CONF_STEPS,
    CONF_STOP_STATE,
    CONF_TARGET,
    CONF_TILT_POSITION,
    CONF_TIMEOUT,
    CONF_TIMEOUT_OFF,
    CONF_TIMEOUT_ON,
    CONF_TOUCHPAD,
    CONF_TRANSITION,
    CONF_TURN_OFF_AFTER,
    CONF_TYPE,
    CONF_VOLUME_LEVEL,
    CONF_WAIT_FOR,
    CONF_WAIT_OFF,
    CONF_WAIT_ON,
    CONF_WATCH,
    DEFAULT_BEFORE_TIMEOUT,
    DEFAULT_IDLE_WARNING,
    DEFAULT_LOST_AFTER,
    DEFAULT_PICTURE_LOST_AFTER,
    DEFAULT_READY_TIMEOUT,
    DEFAULT_WATCH_GRACE,
    DEFAULT_WATCH_TURN_OFF_AFTER,
    DOMAIN,
    FAILURE_ACTIONS,
    FAILURE_STOP,
    FAILURE_WARN,
    ON_TIMEOUT_ABORT,
    ON_TIMEOUT_CONTINUE,
    ON_TIMEOUT_OPTIONS,
    PROBLEMS,
    SETTING_ENTITY_DOMAINS,
    SETTING_SOUND_MODE,
    SETTING_SOURCE,
    STATE_SOURCE_NONE,
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
    WAIT_MODES,
    WATCH_MODES,
    WATCH_NOTIFY,
)

CONF_DELAY_AFTER = "delay_after"

_SECONDS = vol.All(vol.Coerce(float), vol.Range(min=0, max=3600))
_PERCENT = vol.All(vol.Coerce(int), vol.Range(min=0, max=100))
_KEY = vol.All(str, vol.Length(min=1))
# Command name -> HA actions; validated in depth by async_validate_config
_COMMANDS = {_KEY: vol.Any(dict, [dict])}

# Wait for these states instead of "not unavailable"
_STATES = vol.All(cv.ensure_list, [cv.string], vol.Length(min=1))

READY_SCHEMA = vol.Schema(
    {
        # Check another entity than the device's own, e.g. the remote of an
        # Apple TV, which is "on" only while the integration is connected
        vol.Optional(CONF_ENTITY_ID): cv.entity_id,
        vol.Optional(CONF_STATE): _STATES,
        # Compare an attribute instead of the state (e.g. StormAudio detailed_state)
        vol.Optional(CONF_ATTRIBUTE): str,
        vol.Optional(CONF_TIMEOUT, default=DEFAULT_READY_TIMEOUT): vol.All(
            vol.Coerce(float), vol.Range(min=1, max=3600)
        ),
        vol.Optional(CONF_RELOAD_INTEGRATION, default=False): cv.boolean,
        vol.Optional(CONF_ON_TIMEOUT, default=ON_TIMEOUT_ABORT): vol.In(
            ON_TIMEOUT_OPTIONS
        ),
    }
)

def _state_value(value: Any) -> str:
    """A state value; YAML reads a bare on / off as a boolean, which would never match a state."""
    if isinstance(value, bool):
        return "on" if value else "off"
    return str(value)


# What says a device is on: an entity (default: the device's own) and what its values mean.
# Absent = automatic, from the integration's profile; "none" = no indicator (fixed times only).
def _bool_keys(value: Any) -> Any:
    """YAML reads unquoted on: / off: keys as true / false: take them as "on" / "off"."""
    if isinstance(value, dict):
        return {("on" if k else "off") if isinstance(k, bool) else k: v for k, v in value.items()}
    return value


_STATE_SOURCE_FIELDS = vol.Schema(
    {
        vol.Optional(CONF_ENTITY_ID): cv.entity_id,
        vol.Optional(CONF_ATTRIBUTE): str,
        vol.Optional(CONF_AVAILABLE_IS_ON): cv.boolean,
        **{
            vol.Optional(group): vol.All(cv.ensure_list, [_state_value])
            for group in ("on", "starting", "stopping", "off", "error")
        },
    }
)
STATE_SOURCE_SCHEMA = vol.All(_bool_keys, _STATE_SOURCE_FIELDS)

_FAILURE = vol.In(FAILURE_ACTIONS)
ON_FAILURE_SCHEMA = vol.Any(_FAILURE, vol.Schema({vol.Optional(check): _FAILURE for check in CHECKS}))

# A setting the card offers: the source or sound mode of a media player, or
# an entity of the device (a number, select or switch), with optional
# favourites to choose from. Under a device it belongs to that device; under
# an activity it names the device.
_SETTING_FIELDS = {
    vol.Optional(CONF_SETTING): vol.In([SETTING_SOURCE, SETTING_SOUND_MODE]),
    vol.Optional(CONF_ENTITY): vol.All(cv.entity_id, cv.entity_domain(SETTING_ENTITY_DOMAINS)),
    vol.Optional(CONF_NAME): str,
    vol.Optional(CONF_OPTIONS, default=list): [vol.Coerce(str)],
}
DEVICE_SETTING_SCHEMA = vol.Schema(_SETTING_FIELDS)
SETTING_SCHEMA = vol.Schema({vol.Required(CONF_DEVICE): _KEY, **_SETTING_FIELDS})


def _one_of_setting_or_entity(setting: dict[str, Any]) -> dict[str, Any]:
    if (CONF_SETTING in setting) == (CONF_ENTITY in setting):
        raise vol.Invalid("a setting has either a setting (source, sound_mode) or an entity")
    return setting


def _setting(value: Any) -> dict[str, Any]:
    return _one_of_setting_or_entity(SETTING_SCHEMA(value))


def _device_setting(value: Any) -> dict[str, Any]:
    return _one_of_setting_or_entity(DEVICE_SETTING_SCHEMA(value))


WATCH_SCHEMA = vol.Schema(
    {
        vol.Optional(CONF_MODE, default=WATCH_NOTIFY): vol.In(WATCH_MODES),
        vol.Optional(CONF_GRACE, default=DEFAULT_WATCH_GRACE): _SECONDS,
        vol.Optional(CONF_TURN_OFF_AFTER, default=DEFAULT_WATCH_TURN_OFF_AFTER): _SECONDS,
    }
)

DEVICE_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_ENTITY_ID): cv.entity_id,
        vol.Optional(CONF_NAME): str,
        vol.Optional(CONF_POWER_SWITCH): vol.Any(None, cv.entity_id),
        vol.Optional(CONF_READY): vol.Any(None, READY_SCHEMA),
        # Navigation keys go to this remote entity (remote.send_command)
        vol.Optional(CONF_REMOTE_ENTITY): vol.Any(None, cv.entity_domain("remote")),
        vol.Optional(CONF_DELAY_AFTER_POWER, default=0): _SECONDS,
        vol.Optional(CONF_DELAY_AFTER_ON, default=0): _SECONDS,
        vol.Optional(CONF_DELAY_AFTER_OFF, default=0): _SECONDS,
        vol.Optional(CONF_TURN_OFF_AFTER): _SECONDS,
        vol.Optional(CONF_WATCH, default=dict): WATCH_SCHEMA,
        # A select (Harmony activities): the option for on; for off, power_off
        vol.Optional(CONF_OPTION): str,
        vol.Optional(CONF_OFF_OPTION): str,
        # Device states (no defaults: nothing is written while the automatic choice is kept)
        vol.Optional(CONF_PROFILE): vol.Match(r"^[a-z0-9_]+$"),
        vol.Optional(CONF_STATE_SOURCE): vol.Any(vol.All(str, vol.In([STATE_SOURCE_NONE])), STATE_SOURCE_SCHEMA),
        vol.Optional(CONF_WAIT_ON): vol.In(WAIT_MODES),
        vol.Optional(CONF_WAIT_OFF): vol.In(WAIT_MODES),
        vol.Optional(CONF_TIMEOUT_ON): vol.All(vol.Coerce(float), vol.Range(min=0.1, max=3600)),
        vol.Optional(CONF_TIMEOUT_OFF): vol.All(vol.Coerce(float), vol.Range(min=0.1, max=3600)),
        vol.Optional(CONF_DEBOUNCE): vol.All(vol.Coerce(float), vol.Range(min=0, max=60)),
        vol.Optional(CONF_ON_FAILURE): ON_FAILURE_SCHEMA,
        vol.Optional(CONF_COMMANDS, default=dict): _COMMANDS,
        # Settings in the card; without them automatic, see control.device_settings
        vol.Optional(CONF_SETTINGS): vol.Any(None, [_device_setting]),
    }
)

_STEP_BASE = {
    vol.Optional(CONF_ID): str,
    vol.Required(CONF_TYPE): str,
    vol.Optional(CONF_DELAY_AFTER, default=0): _SECONDS,
}
_DEVICE_STEP = {**_STEP_BASE, vol.Required(CONF_DEVICE): _KEY}

STEP_SCHEMAS: dict[str, vol.Schema] = {
    STEP_TYPE_POWER_ON: vol.Schema(_DEVICE_STEP),
    STEP_TYPE_POWER_OFF: vol.Schema(_DEVICE_STEP),
    STEP_TYPE_SET_SOURCE: vol.Schema({**_DEVICE_STEP, vol.Required(CONF_SOURCE): str}),
    STEP_TYPE_SET_VOLUME: vol.Schema(
        {
            **_DEVICE_STEP,
            vol.Required(CONF_VOLUME_LEVEL): vol.All(
                vol.Coerce(float), vol.Range(min=0, max=1)
            ),
        }
    ),
    STEP_TYPE_SET_SOUND_MODE: vol.Schema(
        {**_DEVICE_STEP, vol.Required(CONF_SOUND_MODE): str}
    ),
    STEP_TYPE_SET_BRIGHTNESS: vol.Schema(
        {
            **_DEVICE_STEP,
            vol.Optional(CONF_BRIGHTNESS_PCT): _PERCENT,
            vol.Optional(CONF_COLOR_TEMP_KELVIN): vol.All(
                vol.Coerce(int), vol.Range(min=1000, max=12000)
            ),
            vol.Optional(CONF_TRANSITION): _SECONDS,
        }
    ),
    STEP_TYPE_SET_COLOR_TEMP: vol.Schema(
        {
            **_DEVICE_STEP,
            vol.Required(CONF_COLOR_TEMP_KELVIN): vol.All(
                vol.Coerce(int), vol.Range(min=1000, max=12000)
            ),
        }
    ),
    STEP_TYPE_SET_POSITION: vol.Schema({**_DEVICE_STEP, vol.Required(CONF_POSITION): _PERCENT}),
    STEP_TYPE_SET_TILT: vol.Schema(
        {**_DEVICE_STEP, vol.Required(CONF_TILT_POSITION): _PERCENT}
    ),
    STEP_TYPE_CALL_ACTION: vol.Schema(
        {
            **_STEP_BASE,
            vol.Required(CONF_ACTION): cv.service,
            vol.Optional(CONF_DATA): dict,
            vol.Optional(CONF_TARGET): dict,
        }
    ),
    STEP_TYPE_DELAY: vol.Schema(_STEP_BASE),
    # Timeout absent: the profile's (30 s for a Lumagen)
    STEP_TYPE_WAIT_PICTURE: vol.Schema(
        {**_DEVICE_STEP, vol.Optional(CONF_TIMEOUT): vol.All(vol.Coerce(float), vol.Range(min=1, max=3600))}
    ),
    STEP_TYPE_WAIT_AVAILABLE: vol.All(
        vol.Schema(
            {
                **_STEP_BASE,
                vol.Exclusive(CONF_DEVICE, "target"): _KEY,
                vol.Exclusive(CONF_ENTITY_ID, "target"): cv.entity_id,
                vol.Optional(CONF_STATE): _STATES,
                vol.Optional(CONF_TIMEOUT, default=DEFAULT_READY_TIMEOUT): vol.All(
                    vol.Coerce(float), vol.Range(min=1, max=3600)
                ),
                vol.Optional(CONF_RELOAD_INTEGRATION, default=False): cv.boolean,
                vol.Optional(CONF_ON_TIMEOUT, default=ON_TIMEOUT_ABORT): vol.In(
                    ON_TIMEOUT_OPTIONS
                ),
            }
        ),
        cv.has_at_least_one_key(CONF_DEVICE, CONF_ENTITY_ID),
    ),
}


def _step(value: Any) -> dict[str, Any]:
    if not isinstance(value, dict):
        raise vol.Invalid("step must be a mapping")
    step_type = value.get(CONF_TYPE)
    schema = STEP_SCHEMAS.get(step_type)
    if schema is None:
        raise vol.Invalid(
            f"unknown step type '{step_type}', expected one of: {', '.join(STEP_SCHEMAS)}",
            path=[CONF_TYPE],
        )
    return schema(value)


CHECK_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_DEVICE): _KEY,
        # Without an entity: the device's picture check from its profile
        vol.Optional(CONF_ENTITY_ID): cv.entity_id,
        vol.Optional(CONF_STATE): _STATES,
        vol.Optional(CONF_TIMEOUT): vol.All(vol.Coerce(float), vol.Range(min=1, max=3600)),
        vol.Optional(CONF_DEBOUNCE): _SECONDS,
        vol.Optional(CONF_ON_FAILURE): vol.In([FAILURE_WARN, FAILURE_STOP]),
        vol.Optional(CONF_KEEP_CHECKING, default=True): cv.boolean,
    }
)


def move_picture_steps(activity: dict[str, Any]) -> dict[str, Any]:
    """Wait-for-a-picture steps (before 2026.11.21.12) become checks: they check, they don't act."""
    steps = activity.get(CONF_STEPS)
    if not isinstance(steps, list) or not any(
        isinstance(s, dict) and s.get(CONF_TYPE) == STEP_TYPE_WAIT_PICTURE for s in steps
    ):
        return activity
    checks = list(activity.get(CONF_CHECKS) or [])
    kept = []
    for step in steps:
        if isinstance(step, dict) and step.get(CONF_TYPE) == STEP_TYPE_WAIT_PICTURE:
            if step.get(CONF_DEVICE) and not any(c.get(CONF_DEVICE) == step[CONF_DEVICE] and not c.get(CONF_ENTITY_ID) for c in checks):
                checks.append({CONF_DEVICE: step[CONF_DEVICE], **({CONF_TIMEOUT: step[CONF_TIMEOUT]} if CONF_TIMEOUT in step else {})})
        else:
            kept.append(step)
    return {**activity, CONF_STEPS: kept, CONF_CHECKS: checks}


def _button(value: Any) -> dict[str, Any]:
    """A remote button: a command name, optionally with label and icon.

    A quick-select button has ``source`` instead of ``command``: it selects
    that source (on an Apple TV: an app) on its device.
    """
    if isinstance(value, str):
        value = {CONF_COMMAND: value}
    button = BUTTON_SCHEMA(value)
    if CONF_SOURCE in button:
        if CONF_COMMAND in button:
            raise vol.Invalid("a button has either a command or a source")
        if CONF_DEVICE not in button:
            raise vol.Invalid("a quick-select button needs a device", path=[CONF_DEVICE])
    elif CONF_COMMAND not in button:
        raise vol.Invalid("a button needs a command or a source", path=[CONF_COMMAND])
    return button


BUTTON_SCHEMA = vol.Schema(
    {
        vol.Optional(CONF_COMMAND): _KEY,
        vol.Optional(CONF_SOURCE): _KEY,
        vol.Optional(CONF_NAME): str,
        vol.Optional(CONF_ICON): cv.icon,
        vol.Optional(CONF_DEVICE): _KEY,
    }
)

REMOTE_SCHEMA = vol.Schema(
    {
        # A device id, or null to hide the group
        **{vol.Optional(group): vol.Any(None, _KEY) for group in COMMAND_GROUPS},
        # Swipe area instead of arrow keys; without it, for a remote entity
        vol.Optional(CONF_TOUCHPAD): vol.Any(None, cv.boolean),
        vol.Optional(CONF_BUTTONS, default=list): [_button],
        # Device settings in the card; without them, those of every media player
        vol.Optional(CONF_SETTINGS): vol.Any(None, [_setting]),
    }
)

BEFORE_SCHEMA = vol.Schema(
    {
        vol.Optional(CONF_DELAY, default=0): _SECONDS,
        vol.Optional(CONF_WAIT_FOR, default=list): [
            vol.Schema(
                {
                    vol.Required(CONF_DEVICE): _KEY,
                    vol.Optional(CONF_STATE, default=WAIT_FOR_ON): vol.In([WAIT_FOR_ON, WAIT_FOR_PICTURE]),
                }
            )
        ],
        vol.Optional(CONF_TIMEOUT, default=DEFAULT_BEFORE_TIMEOUT): vol.All(
            vol.Coerce(float), vol.Range(min=1, max=3600)
        ),
        vol.Optional(CONF_ON_TIMEOUT, default=ON_TIMEOUT_CONTINUE): vol.In(ON_TIMEOUT_OPTIONS),
    }
)

MONITOR_SCHEMA = vol.Schema(
    {
        vol.Optional(CONF_LOST_AFTER, default=DEFAULT_LOST_AFTER): _SECONDS,
        vol.Optional(CONF_PICTURE_LOST_AFTER, default=DEFAULT_PICTURE_LOST_AFTER): _SECONDS,
        vol.Optional(CONF_IDLE_AFTER, default=0): vol.All(vol.Coerce(float), vol.Range(min=0, max=86400)),
        vol.Optional(CONF_IDLE_WARNING, default=DEFAULT_IDLE_WARNING): _SECONDS,
    }
)

STARTED_BY_SCHEMA = vol.Schema(
    {
        vol.Required(CONF_ENTITY_ID): cv.entity_id,
        vol.Required(CONF_STATE): _STATES,
        vol.Optional(CONF_STOP_STATE): _STATES,
    }
)

_ACTIVITY_FIELDS = vol.Schema(
    {
        vol.Optional(CONF_NAME): str,
        vol.Optional(CONF_ICON): cv.icon,
        vol.Optional(CONF_ORDER): vol.Coerce(int),
        vol.Optional(CONF_DEVICES, default=list): [_KEY],
        vol.Optional(CONF_CHECKS, default=list): [CHECK_SCHEMA],
        vol.Optional(CONF_STEPS, default=list): [_step],
        # Device -> what to wait for before it is turned on
        vol.Optional(CONF_BEFORE, default=dict): {_KEY: BEFORE_SCHEMA},
        vol.Optional(CONF_STARTED_BY, default=list): [STARTED_BY_SCHEMA],
        vol.Optional(CONF_MONITOR, default=dict): MONITOR_SCHEMA,
        # Validated in depth by async_validate_config (needs hass)
        vol.Optional(CONF_ON_START, default=list): vol.Any(None, [dict]),
        vol.Optional(CONF_ON_STOP, default=list): vol.Any(None, [dict]),
        vol.Optional(CONF_REMOTE, default=dict): REMOTE_SCHEMA,
        vol.Optional(CONF_COMMANDS, default=dict): _COMMANDS,
    }
)


def _activity(value: Any) -> dict[str, Any]:
    return _ACTIVITY_FIELDS(move_picture_steps(value) if isinstance(value, dict) else value)


ACTIVITY_SCHEMA = _activity


ROOM_SCHEMA = vol.Schema(
    {
        vol.Optional(CONF_NAME): str,
        vol.Optional(CONF_AREA_ID): vol.Any(None, str),
        # Activity a plain "on" starts; without it, the last used one
        vol.Optional(CONF_DEFAULT_ACTIVITY): vol.Any(None, _KEY),
        vol.Optional(CONF_DEVICES, default=dict): {_KEY: DEVICE_SCHEMA},
        vol.Optional(CONF_ACTIVITIES, default=dict): {_KEY: ACTIVITY_SCHEMA},
    }
)

CONFIG_SCHEMA = vol.Schema({vol.Optional(CONF_ROOMS, default=dict): {_KEY: ROOM_SCHEMA}})


def _check_references(rooms: dict[str, Any]) -> None:
    """Raise vol.Invalid when an activity or step points to an unknown device."""
    for room_id, room in rooms.items():
        devices = room[CONF_DEVICES]
        default = room.get(CONF_DEFAULT_ACTIVITY)
        for device_id, device in devices.items():
            for idx, setting in enumerate(device.get(CONF_SETTINGS) or []):
                if CONF_SETTING in setting and not device[CONF_ENTITY_ID].startswith(
                    "media_player."
                ):
                    raise vol.Invalid(
                        f"source and sound mode need a media player, '{device_id}' is none",
                        path=[CONF_ROOMS, room_id, CONF_DEVICES, device_id, CONF_SETTINGS, idx],
                    )
        if default is not None and default not in room[CONF_ACTIVITIES]:
            raise vol.Invalid(
                f"unknown activity '{default}'",
                path=[CONF_ROOMS, room_id, CONF_DEFAULT_ACTIVITY],
            )
        for activity_id, activity in room[CONF_ACTIVITIES].items():
            base = [CONF_ROOMS, room_id, CONF_ACTIVITIES, activity_id]
            for idx, device in enumerate(activity[CONF_DEVICES]):
                if device not in devices:
                    raise vol.Invalid(
                        f"unknown device '{device}'", path=[*base, CONF_DEVICES, idx]
                    )
            for idx, check in enumerate(activity[CONF_CHECKS]):
                if check[CONF_DEVICE] not in devices:
                    raise vol.Invalid(
                        f"unknown device '{check[CONF_DEVICE]}'",
                        path=[*base, CONF_CHECKS, idx, CONF_DEVICE],
                    )
            for device_id, before in activity[CONF_BEFORE].items():
                if device_id not in activity[CONF_DEVICES]:
                    raise vol.Invalid(
                        f"'{device_id}' is not a device of this activity", path=[*base, CONF_BEFORE, device_id]
                    )
                for idx, wait in enumerate(before[CONF_WAIT_FOR]):
                    if wait[CONF_DEVICE] not in activity[CONF_DEVICES]:
                        raise vol.Invalid(
                            f"'{wait[CONF_DEVICE]}' is not a device of this activity",
                            path=[*base, CONF_BEFORE, device_id, CONF_WAIT_FOR, idx, CONF_DEVICE],
                        )
            for idx, step in enumerate(activity[CONF_STEPS]):
                device = step.get(CONF_DEVICE)
                if device is not None and device not in devices:
                    raise vol.Invalid(
                        f"unknown device '{device}'",
                        path=[*base, CONF_STEPS, idx, CONF_DEVICE],
                    )
            remote = activity[CONF_REMOTE]
            for group in COMMAND_GROUPS:
                device = remote.get(group)
                if device is not None and device not in devices:
                    raise vol.Invalid(
                        f"unknown device '{device}'", path=[*base, CONF_REMOTE, group]
                    )
            for idx, button in enumerate(remote[CONF_BUTTONS]):
                device = button.get(CONF_DEVICE)
                path = [*base, CONF_REMOTE, CONF_BUTTONS, idx, CONF_DEVICE]
                if device is not None and device not in devices:
                    raise vol.Invalid(f"unknown device '{device}'", path=path)
                if CONF_SOURCE in button and not devices[device][
                    CONF_ENTITY_ID
                ].startswith("media_player."):
                    raise vol.Invalid(
                        f"quick select needs a media player, '{device}' is none", path=path
                    )
            for idx, setting in enumerate(remote.get(CONF_SETTINGS) or []):
                device = setting[CONF_DEVICE]
                path = [*base, CONF_REMOTE, CONF_SETTINGS, idx, CONF_DEVICE]
                if device not in devices:
                    raise vol.Invalid(f"unknown device '{device}'", path=path)
                if CONF_SETTING in setting and not devices[device][CONF_ENTITY_ID].startswith(
                    "media_player."
                ):
                    raise vol.Invalid(
                        f"device settings need a media player, '{device}' is none", path=path
                    )


def ordered_activities(activities: dict[str, Any]) -> dict[str, Any]:
    """Activities in display order: by ``order``, then by name.

    Home Assistant stores config entries with sorted keys, so the order the
    activities were written in does not survive a restart.
    """
    return dict(
        sorted(
            activities.items(),
            key=lambda item: (
                item[1].get(CONF_ORDER, 1000),
                str(item[1].get(CONF_NAME) or item[0]).casefold(),
            ),
        )
    )


def validate_config(data: dict[str, Any]) -> dict[str, Any]:
    """Validate v2 data synchronously (schema and cross references)."""
    validated = CONFIG_SCHEMA(data)
    _check_references(validated[CONF_ROOMS])
    for room in validated[CONF_ROOMS].values():
        room[CONF_ACTIVITIES] = ordered_activities(room[CONF_ACTIVITIES])
    return validated


async def _async_validate_actions(
    hass: HomeAssistant, actions: Any, path: list[str | int]
) -> list[dict[str, Any]]:
    try:
        return await async_validate_actions_config(hass, cv.SCRIPT_SCHEMA(actions or []))
    except vol.Invalid as err:
        raise vol.Invalid(err.msg, path=[*path, *err.path]) from err


async def async_validate_config(hass: HomeAssistant, data: dict[str, Any]) -> dict[str, Any]:
    """Validate v2 data including the HA actions in hooks and commands."""
    validated = validate_config(data)
    for room_id, room in validated[CONF_ROOMS].items():
        base = [CONF_ROOMS, room_id]
        for device_id, device in room[CONF_DEVICES].items():
            for name, actions in device[CONF_COMMANDS].items():
                device[CONF_COMMANDS][name] = await _async_validate_actions(
                    hass, actions, [*base, CONF_DEVICES, device_id, CONF_COMMANDS, name]
                )
        for activity_id, activity in room[CONF_ACTIVITIES].items():
            path = [*base, CONF_ACTIVITIES, activity_id]
            for key in (CONF_ON_START, CONF_ON_STOP):
                activity[key] = await _async_validate_actions(
                    hass, activity.get(key), [*path, key]
                )
            for name, actions in activity[CONF_COMMANDS].items():
                activity[CONF_COMMANDS][name] = await _async_validate_actions(
                    hass, actions, [*path, CONF_COMMANDS, name]
                )
    return validated


def scene_unique_id(room_id: str, activity_id: str) -> str:
    """Unique ID of the scene of an activity."""
    return f"{DOMAIN}_{room_id}_{activity_id}"


def switch_unique_id(room_id: str) -> str:
    """Unique ID of a room's switch."""
    return f"{DOMAIN}_activity_{room_id}"


def sensor_unique_id(room_id: str) -> str:
    """Unique ID of a room's activity sensor."""
    return f"{DOMAIN}_activity_state_{room_id}"


def select_unique_id(room_id: str) -> str:
    """Unique ID of a room's scene select."""
    return f"{DOMAIN}_select_{room_id}"


def expected_unique_ids(rooms: dict[str, Any]) -> set[str]:
    """Unique IDs of all entities the configuration creates."""
    ids: set[str] = set()
    for room_id, room in rooms.items():
        ids.update(
            (switch_unique_id(room_id), sensor_unique_id(room_id), select_unique_id(room_id))
        )
        ids.update(
            scene_unique_id(room_id, activity_id)
            for activity_id in (room.get(CONF_ACTIVITIES) or {})
        )
        ids.update(problem_unique_id(room_id, kind) for kind in PROBLEMS)
    return ids


def problem_unique_id(room_id: str, kind: str) -> str:
    """Unique ID of a room's monitor problem sensor."""
    return f"{DOMAIN}_problem_{room_id}_{kind}"


@dataclass(frozen=True, slots=True)
class EntityReference:
    """An entity referenced from the configuration."""

    room_id: str
    path: str
    entity_id: str


def iter_entity_references(data: dict[str, Any]):
    """Yield every entity_id the configuration references directly."""
    for room_id, room in (data.get(CONF_ROOMS) or {}).items():
        for device_id, device in (room.get(CONF_DEVICES) or {}).items():
            base = f"devices.{device_id}"
            if device.get(CONF_ENTITY_ID):
                yield EntityReference(room_id, f"{base}.entity_id", device[CONF_ENTITY_ID])
            if device.get(CONF_POWER_SWITCH):
                yield EntityReference(
                    room_id, f"{base}.power_switch", device[CONF_POWER_SWITCH]
                )
            if device.get(CONF_REMOTE_ENTITY):
                yield EntityReference(
                    room_id, f"{base}.remote_entity", device[CONF_REMOTE_ENTITY]
                )
            if (device.get(CONF_READY) or {}).get(CONF_ENTITY_ID):
                yield EntityReference(
                    room_id, f"{base}.ready.entity_id", device[CONF_READY][CONF_ENTITY_ID]
                )
        for activity_id, activity in (room.get(CONF_ACTIVITIES) or {}).items():
            for idx, check in enumerate(activity.get(CONF_CHECKS) or []):
                if check.get(CONF_ENTITY_ID):
                    yield EntityReference(
                        room_id,
                        f"activities.{activity_id}.checks[{idx}].entity_id",
                        check[CONF_ENTITY_ID],
                    )
            for idx, trigger in enumerate(activity.get(CONF_STARTED_BY) or []):
                yield EntityReference(
                    room_id, f"activities.{activity_id}.started_by[{idx}].entity_id", trigger[CONF_ENTITY_ID]
                )
            for idx, step in enumerate(activity.get(CONF_STEPS) or []):
                if step.get(CONF_ENTITY_ID):
                    yield EntityReference(
                        room_id,
                        f"activities.{activity_id}.steps[{idx}].entity_id",
                        step[CONF_ENTITY_ID],
                    )


def find_missing_entities(hass: HomeAssistant, data: dict[str, Any]) -> list[EntityReference]:
    """Return references to entities that are neither registered nor have a state.

    A powered-off device that sits in setup_retry keeps its registry entry, so
    it does not count as missing.
    """
    registry = er.async_get(hass)
    return [
        ref
        for ref in iter_entity_references(data)
        if registry.async_get(ref.entity_id) is None
        and hass.states.get(ref.entity_id) is None
    ]
