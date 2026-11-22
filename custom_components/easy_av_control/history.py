"""Reports: a history of every run (start or stop of an activity) and of every measured device time.

Kept in ``.storage/easy_av_control.history``, shared by all config entries:

- **runs**, newest last, at most ``MAX_RUNS``: room, activity, start or stop, switching from which activity,
  when, how long in total, the result (ok, warning, error, cancelled) and its phases: each device brought up
  or switched off, the checks, the actions after start, the actions on start or stop.
- **devices**: per device entity, at most ``MAX_DEVICE_SAMPLES`` events: when, on or off, how long, the
  result (ok, or what went wrong: timeout, unavailable, …) and which room and activity it was for.

The short list in device_timings.py (the last 10 good times, for typical times and suggested timeouts) stays
as it is; this is the longer record the Reports page shows.
"""
from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import DOMAIN

MAX_RUNS = 300
MAX_DEVICE_SAMPLES = 100
_DATA = f"{DOMAIN}_history"


class History:
    """The stored history; changes are saved a few seconds later."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, 1, f"{DOMAIN}.history")
        self.runs: list[dict[str, Any]] = []
        self.devices: dict[str, list[dict[str, Any]]] = {}

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.runs = [r for r in data.get("runs") or [] if isinstance(r, dict)][-MAX_RUNS:]
        self.devices = {
            k: [e for e in v if isinstance(e, dict)][-MAX_DEVICE_SAMPLES:]
            for k, v in (data.get("devices") or {}).items()
            if isinstance(v, list)
        }

    @callback
    def _save(self) -> None:
        self._store.async_delay_save(lambda: {"runs": self.runs, "devices": self.devices}, 5)

    @callback
    def add_run(self, run: dict[str, Any]) -> None:
        self.runs = [*self.runs, run][-MAX_RUNS:]
        self._save()

    @callback
    def add_device_event(self, entity_id: str, event: dict[str, Any]) -> None:
        self.devices[entity_id] = [*self.devices.get(entity_id, []), event][-MAX_DEVICE_SAMPLES:]
        self._save()

    @callback
    def clear(self) -> None:
        self.runs = []
        self.devices = {}
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


class RunRecorder:
    """Times one start or stop and its phases, then adds it to the history."""

    def __init__(self, hass: HomeAssistant, **info: Any) -> None:
        self._hass = hass
        self._t0 = hass.loop.time()
        self._phase: dict[str, Any] | None = None
        self.run: dict[str, Any] = {"at": dt_util.utcnow().isoformat(), **info, "phases": []}

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
        self.end_phase("error" if result in ("error", "cancelled") else None)
        self.run.update(seconds=self._now(), result=result)
        if error:
            self.run["error"] = error
        if warnings:
            self.run["warnings"] = list(warnings)
            if result == "ok":
                self.run["result"] = "warning"
        if (history := history_of(self._hass)) is not None:
            history.add_run(self.run)


@callback
def async_setup_ws(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_history)
    websocket_api.async_register_command(hass, ws_history_clear)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/history/get"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_history(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Every stored run and device event, for the Reports page."""
    history = await async_get_history(hass)
    connection.send_result(msg["id"], {"runs": history.runs, "devices": history.devices})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/history/clear"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_history_clear(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    (await async_get_history(hass)).clear()
    connection.send_result(msg["id"], {})
