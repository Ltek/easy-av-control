"""Measured times: how long each device really takes to come on and go off.

Recorded by the coordinator whenever a status wait succeeds on the first try: from switching the device until
its state changed to on (or off); the debounce the wait had to see it hold for is not counted. The last
``MAX_SAMPLES`` per device and direction are kept in the coordinator's store, keyed by the device entity, so every room using the same device shares them.

From them: the **typical** time (the median), a **suggested timeout** (half as long again as typical, and
never shorter than the slowest time seen plus 10 %), and whether a new time is **slow** (more than twice the
typical time and at least 10 s over it), which the coordinator reports as a warning.
"""
from __future__ import annotations

import math
from statistics import median
from typing import Any

from homeassistant.core import HomeAssistant

from .const import DOMAIN

MAX_SAMPLES = 10
MIN_SAMPLES = 3
DIRECTIONS = ("on", "off")


def typical(samples: list[float]) -> float | None:
    return round(median(samples), 1) if samples else None


def suggested_timeout(samples: list[float], debounce: float = 0.0) -> float | None:
    """A timeout that fits the times seen, rounded up to 5 s; None until there are enough of them. The times are
    until the status changed, and a wait also has to see it hold for the ``debounce``: that is added."""
    if len(samples) < MIN_SAMPLES:
        return None
    wanted = max(median(samples) * 1.5, max(samples) * 1.1, 10) + debounce
    return float(math.ceil(wanted / 5) * 5)


def is_slow(samples: list[float], seconds: float) -> bool:
    if len(samples) < MIN_SAMPLES:
        return False
    usual = median(samples)
    return seconds > usual * 2 and seconds - usual >= 10


def add_sample(samples: list[float], seconds: float) -> list[float]:
    return [*samples, round(seconds, 1)][-MAX_SAMPLES:]


def view(timings: dict[str, list[float]] | None, debounce: float = 0.0) -> dict[str, Any] | None:
    """What the panel shows for one device. Times are until the status changed; a wait also has to see it hold
    for the debounce, so a suggested timeout has that added."""
    if not timings or not any(timings.get(d) for d in DIRECTIONS):
        return None
    out: dict[str, Any] = {}
    for direction in DIRECTIONS:
        samples = timings.get(direction) or []
        out[direction] = {
            "samples": len(samples),
            "typical": typical(samples),
            "last": samples[-1] if samples else None,
            "slowest": max(samples) if samples else None,
            "suggested": suggested_timeout(samples, debounce),
        }
    return out


def timings_of(hass: HomeAssistant, entity_id: str) -> dict[str, list[float]] | None:
    """A device's measured times, from whichever coordinator has them."""
    for coordinator in hass.data.get(DOMAIN, {}).values():
        timings = getattr(coordinator, "timings", None)
        if isinstance(timings, dict) and entity_id in timings:
            return timings[entity_id]
    return None


def typical_of(hass: HomeAssistant, entity_id: str, direction: str) -> float | None:
    return typical((timings_of(hass, entity_id) or {}).get(direction) or [])
