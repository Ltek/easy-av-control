"""Binary sensors of Easy AV Control: one per room and problem kind of the monitor (monitor.py)."""
from __future__ import annotations

from typing import Any

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, PROBLEMS
from .coordinator import EasyAVControlCoordinator
from .model import problem_unique_id


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    coordinator: EasyAVControlCoordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_entities(ProblemSensor(coordinator, room_id, kind) for room_id in coordinator.rooms for kind in PROBLEMS)


class ProblemSensor(CoordinatorEntity[EasyAVControlCoordinator], BinarySensorEntity):
    """On while the monitor sees this problem in the room."""

    _attr_has_entity_name = True
    _attr_device_class = BinarySensorDeviceClass.PROBLEM

    def __init__(self, coordinator: EasyAVControlCoordinator, room_id: str, kind: str) -> None:
        super().__init__(coordinator)
        self.room_id = room_id
        self.kind = kind
        self._attr_translation_key = kind
        self._attr_unique_id = problem_unique_id(room_id, kind)

    @property
    def is_on(self) -> bool:
        return bool(self.coordinator.monitor.room_problems(self.room_id, self.kind))

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {"room": self.room_id, "problem": self.kind, **self.coordinator.monitor.attributes(self.room_id, self.kind)}

    @property
    def device_info(self) -> DeviceInfo:
        return self.coordinator.device_info(self.room_id)

    @callback
    def _handle_coordinator_update(self) -> None:
        self.async_write_ha_state()
