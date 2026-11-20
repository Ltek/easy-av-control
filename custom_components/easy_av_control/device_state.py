"""Device states at run time: what says a device is on, how long to wait for it, what to do when it doesn't.

PLAN.md phase 2. A device's **state source** is, in order:

1. ``state_source: none``: none. The device uses fixed times only, as AV Scenes did.
2. ``state_source: {...}``: set by hand (an entity, default the device's own, and what its values mean).
3. Otherwise automatic: the profile of the device entity's integration (device_profiles.py), if it has one of its
   own and that profile finds an indicator on the device. The generic media player profile is never used here,
   so a device without a profile behaves exactly as before.

Waiting for a state is **debounced**: the state must hold for ``debounce`` seconds before it counts, so a flicker
(a projector reporting "on" for a moment before it starts warming, an HDMI handshake) neither ends a wait nor
counts as a failure.
"""
from __future__ import annotations

import asyncio
from collections.abc import Callable
from dataclasses import dataclass
from typing import Any

from homeassistant.core import (
    CALLBACK_TYPE,
    Event,
    EventStateChangedData,
    HomeAssistant,
    State,
    callback,
)
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.util import dt as dt_util

from .const import (
    CHECK_TURN_OFF,
    CHECK_TURN_ON,
    CONF_ATTRIBUTE,
    CONF_AVAILABLE_IS_ON,
    CONF_DEBOUNCE,
    CONF_ENTITY_ID,
    CONF_ON_FAILURE,
    CONF_STATE_SOURCE,
    CONF_TIMEOUT_OFF,
    CONF_TIMEOUT_ON,
    CONF_WAIT_OFF,
    CONF_WAIT_ON,
    FAILURE_WARN,
    STATE_SOURCE_NONE,
    WAIT_STATUS,
    WAIT_TIME,
)
from .device_profiles import (
    DEFAULT_DEBOUNCE,
    DEFAULT_TIMEOUT_OFF,
    DEFAULT_TIMEOUT_ON,
    GROUP_ERROR,
    GROUP_OFF,
    GROUP_ON,
    GROUP_UNKNOWN,
    Profile,
    classify,
    resolve,
)
from .profile_library import profile_for_device

RESULT_OK = "ok"
RESULT_ERROR = "error"
RESULT_TIMEOUT = "timeout"


@dataclass
class StateSource:
    """The indicator a device is watched by, with its timing."""

    entity_id: str
    indicator: dict[str, Any]
    debounce: float = DEFAULT_DEBOUNCE
    timeout_on: float = DEFAULT_TIMEOUT_ON
    timeout_off: float = DEFAULT_TIMEOUT_OFF
    profile_id: str | None = None

    def group(self, state: State | None) -> str:
        return classify(self.indicator, state)

    def value(self, state: State | None) -> str | None:
        """The device's own word for its state ("warming"), for the card and messages."""
        if state is None:
            return None
        if self.indicator.get(CONF_AVAILABLE_IS_ON):
            return state.state
        attribute = self.indicator.get(CONF_ATTRIBUTE)
        value = state.attributes.get(attribute) if attribute else state.state
        return None if value is None else str(value)

    def current(self, hass: HomeAssistant) -> tuple[str, str | None]:
        state = hass.states.get(self.entity_id)
        return self.group(state), self.value(state)


def effective_source(
    hass: HomeAssistant, profiles: dict[str, Profile], device: dict[str, Any]
) -> StateSource | None:
    """The state source a device is watched by, or None for fixed times only."""
    raw = device.get(CONF_STATE_SOURCE)
    if raw == STATE_SOURCE_NONE:
        return None
    entity_id = device[CONF_ENTITY_ID]
    profile = profile_for_device(hass, profiles, device)

    if isinstance(raw, dict):
        indicator = {k: v for k, v in raw.items() if k != CONF_ENTITY_ID}
        target = raw.get(CONF_ENTITY_ID) or entity_id
    else:
        if profile is None or profile.indicator is None:
            return None
        resolved = resolve(hass, profile, entity_id)
        if not resolved.has_indicator:
            return None
        indicator = dict(profile.indicator)
        target = resolved.indicator_entity

    return StateSource(
        entity_id=target,
        indicator=indicator,
        debounce=device.get(CONF_DEBOUNCE, profile.debounce if profile else DEFAULT_DEBOUNCE),
        timeout_on=device.get(CONF_TIMEOUT_ON, profile.timeout(GROUP_ON) if profile else DEFAULT_TIMEOUT_ON),
        timeout_off=device.get(CONF_TIMEOUT_OFF, profile.timeout(GROUP_OFF) if profile else DEFAULT_TIMEOUT_OFF),
        profile_id=profile.id if profile else None,
    )


def picture_source(
    hass: HomeAssistant, profiles: dict[str, Profile], device: dict[str, Any]
) -> tuple[StateSource, float] | None:
    """The device's picture check (its profile's ``picture``) as a state source, with its timeout; or None."""
    profile = profile_for_device(hass, profiles, device)
    if profile is None or (picture := profile.data.get("picture")) is None:
        return None
    entity = resolve(hass, profile, device[CONF_ENTITY_ID]).picture_entity
    if entity is None:
        return None
    indicator: dict[str, Any] = {"on": list(picture["ok"])}
    if picture.get("attribute"):
        indicator[CONF_ATTRIBUTE] = picture["attribute"]
    return StateSource(entity, indicator, debounce=picture["debounce"], profile_id=profile.id), picture["timeout"]


def wait_mode(device: dict[str, Any], source: StateSource | None, *, on: bool) -> str:
    """status, time or both. Status needs a state source; without one it is always time."""
    if source is None:
        return WAIT_TIME
    return device.get(CONF_WAIT_ON if on else CONF_WAIT_OFF) or WAIT_STATUS


def failure_action(device: dict[str, Any], check: str) -> str:
    """What to do when a check fails: warn (default), stop or retry."""
    raw = device.get(CONF_ON_FAILURE)
    if isinstance(raw, dict):
        return raw.get(check, FAILURE_WARN)
    return raw or FAILURE_WARN


async def async_wait_for(
    hass: HomeAssistant,
    source: StateSource,
    target: str,
    timeout: float,
    *,
    on_change: Callable[[str | None], None] | None = None,
) -> tuple[str, str | None]:
    """Wait until the device's state is in ``target`` (or reports an error), debounced.

    Returns (ok | error | timeout, the device's own word for its state). An error state ends the wait like the
    target does, after the same debounce.
    """
    loop = asyncio.get_running_loop()
    done: asyncio.Future[tuple[str, str | None]] = loop.create_future()
    timer: asyncio.TimerHandle | None = None
    holding: str | None = None  # the group the running debounce timer is for
    last_value: list[str | None] = [None]

    def finish(result: tuple[str, str | None]) -> None:
        if not done.done():
            done.set_result(result)

    def evaluate(state: State | None, *, fresh: bool) -> None:
        nonlocal timer, holding
        group, value = source.group(state), source.value(state)
        if value != last_value[0]:
            last_value[0] = value
            if on_change is not None:
                on_change(value)
        outcome = RESULT_OK if group == target else RESULT_ERROR if group == GROUP_ERROR else None
        if outcome is None:
            if timer is not None:
                timer.cancel()
            timer, holding = None, None
            return
        if timer is not None and holding == group:
            return  # still the same group (e.g. an attribute changed): keep counting
        if timer is not None:
            timer.cancel()
        held = 0.0
        if not fresh and state is not None:
            since = state.last_updated if source.indicator.get(CONF_ATTRIBUTE) else state.last_changed
            held = max(0.0, (dt_util.utcnow() - since).total_seconds())
        remaining = source.debounce - held
        if remaining <= 0:
            finish((outcome, value))
            return
        holding = group
        timer = loop.call_later(remaining, finish, (outcome, value))

    @callback
    def _changed(event: Event[EventStateChangedData]) -> None:
        evaluate(event.data["new_state"], fresh=True)

    unsub: CALLBACK_TYPE = async_track_state_change_event(hass, [source.entity_id], _changed)
    try:
        evaluate(hass.states.get(source.entity_id), fresh=False)
        try:
            async with asyncio.timeout(timeout):
                return await done
        except TimeoutError:
            return RESULT_TIMEOUT, source.value(hass.states.get(source.entity_id))
    finally:
        unsub()
        if timer is not None:
            timer.cancel()


def describe_failure(name: str, result: str, value: str | None, target: str, timeout: float) -> str:
    """The message for a check that failed: the device's own error, or what it showed when time ran out."""
    if result == RESULT_ERROR:
        return f"{name} reports an error ({value})"
    shown = f", it shows {value}" if value not in (None, "") else ""
    return f"{name} isn't {target} after {timeout:g} s{shown}"


__all__ = [
    "CHECK_TURN_OFF",
    "CHECK_TURN_ON",
    "GROUP_UNKNOWN",
    "RESULT_ERROR",
    "RESULT_OK",
    "RESULT_TIMEOUT",
    "StateSource",
    "async_wait_for",
    "describe_failure",
    "effective_source",
    "failure_action",
    "wait_mode",
]
