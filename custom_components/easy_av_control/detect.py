"""Detect integrations: compare what is installed with what the rooms use, and propose changes.

PLAN.md phase 4. ``detect_all`` only reads; ``apply_detect`` turns the choices the user ticked into new rooms. The
panel shows the result as unsaved changes, so nothing is stored until Save.

- **new**: an AV device (one physical device, possibly covered by several integrations) that no room uses yet and
  that has a profile. It is proposed for the room of its Home Assistant area, with the best integration for each
  job (power, arrow keys), its outlet, and the rooms' activities to add it to: at the place its profile gives in
  the power-on order (projectors and processors early, audio in the middle, sources late).
- **better**: a device a room uses whose physical device now has a better integration for its power state (PiPup
  next to ADB). Offered, not ticked.
- **gone**: an entity a room refers to that no longer exists. When Easy AV Control has seen it before, the same
  physical device's best remaining integration is offered as its replacement.
- **renamed**: the same registry entry under a new entity ID; replaced everywhere except in actions and commands.
- **unmatched**: AV integrations installed here without a profile of their own (see + Profile in the panel).

Easy AV Control remembers, for each entity a room uses, its registry ID and its physical device's hosts and MAC
addresses (``.storage/easy_av_control.seen``), so a removed or renamed entity can still be traced.
"""
from __future__ import annotations

import copy
import re
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import (
    area_registry as ar,
    device_registry as dr,
    entity_registry as er,
)
from homeassistant.helpers.storage import Store
from homeassistant.util import slugify

from .const import (
    CONF_ACTIVITIES,
    CONF_AREA_ID,
    CONF_COMMANDS,
    CONF_DEVICE,
    CONF_DEVICES,
    CONF_ENTITY_ID,
    CONF_NAME,
    CONF_ON_START,
    CONF_ON_STOP,
    CONF_POWER_SWITCH,
    CONF_REMOTE_ENTITY,
    CONF_ROOMS,
    CONF_STEPS,
    CONF_TYPE,
    DOMAIN,
    STEP_TYPE_CALL_ACTION,
    STEP_TYPE_WAIT_PICTURE,
)
from .device_profiles import (
    ORDER_EARLY,
    ORDER_LATE,
    ORDER_MIDDLE,
    ROLE_NAVIGATION,
    ROLE_POWER,
    PhysicalDevice,
    Profile,
    best_for_role,
    entity_matches,
    physical_devices,
    resolve,
    unmatched_integrations,
)
from .model import find_missing_entities, iter_entity_references
from .profile_library import profile_for_device

SEEN_KEY = f"{DOMAIN}.seen"
DATA_SEEN = f"{DOMAIN}_seen"
RANK = {ORDER_EARLY: 0, ORDER_MIDDLE: 1, ORDER_LATE: 2}
UNASSIGNED = "new_room"


# ----------------------------------------------------------------------------------------------- seen entities


class Seen:
    """Registry ID, hosts and MACs of every entity a room uses, as last seen."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, 1, SEEN_KEY)
        self.data: dict[str, dict[str, Any]] = {}

    async def async_load(self) -> None:
        self.data = (await self._store.async_load() or {}).get("entities", {})

    def remember(self, rooms: dict[str, Any], groups: list[PhysicalDevice] | None = None) -> bool:
        """Note the entities the rooms use that exist now. True when something changed."""
        registry = er.async_get(self.hass)
        groups = physical_devices(self.hass) if groups is None else groups
        group_of = {e: g for g in groups for ids in g.entities.values() for e in ids}
        changed = False
        for ref in iter_entity_references({CONF_ROOMS: rooms}):
            entry = registry.async_get(ref.entity_id)
            if entry is None:
                continue
            group = group_of.get(ref.entity_id)
            if group is None and entry.device_id is not None:
                group = next((g for g in groups if entry.device_id in g.device_ids), None)
            record = {
                "id": entry.id,
                "platform": entry.platform,
                "domain": entry.domain,
                "hosts": sorted(group.hosts) if group else [],
                "macs": sorted(group.macs) if group else [],
            }
            if self.data.get(ref.entity_id) != record:
                self.data[ref.entity_id] = record
                changed = True
        if changed:
            self._store.async_delay_save(lambda: {"entities": self.data}, 5)
        return changed


async def async_get_seen(hass: HomeAssistant) -> Seen:
    if (seen := hass.data.get(DATA_SEEN)) is None:
        seen = Seen(hass)
        await seen.async_load()
        hass.data[DATA_SEEN] = seen
    return seen


# ----------------------------------------------------------------------------------------------- helpers


def _name(hass: HomeAssistant, entity_id: str) -> str:
    if (state := hass.states.get(entity_id)) is not None and state.name:
        return state.name
    entry = er.async_get(hass).async_get(entity_id)
    if entry is not None and (entry.name or entry.original_name):
        return entry.name or entry.original_name
    return entity_id.split(".", 1)[-1].replace("_", " ").title()


def _area(hass: HomeAssistant, entity_ids: list[str]) -> str | None:
    """The area of the first entity that has one (its own, else its device's)."""
    ent_reg, dev_reg = er.async_get(hass), dr.async_get(hass)
    for entity_id in entity_ids:
        entry = ent_reg.async_get(entity_id)
        if entry is None:
            continue
        if entry.area_id:
            return entry.area_id
        if entry.device_id and (device := dev_reg.async_get(entry.device_id)) and device.area_id:
            return device.area_id
    return None


def _device_entities(hass: HomeAssistant, group: PhysicalDevice, platform: str, profile: Profile) -> list[str]:
    """The entities of one integration on a physical device that fit the profile's device entity."""
    registry = er.async_get(hass)
    found = [
        e.entity_id
        for device_id in sorted(group.device_ids)
        for e in er.async_entries_for_device(registry, device_id)
        if e.platform == platform and e.disabled_by is None and entity_matches(e, profile.data["device_entity"])
    ]
    return sorted(set(found))


def rank(hass: HomeAssistant, profiles: dict[str, Profile], device: dict[str, Any]) -> int:
    profile = profile_for_device(hass, profiles, device)
    return RANK[profile.order] if profile is not None else RANK[ORDER_MIDDLE]


def used_entities(rooms: dict[str, Any]) -> set[str]:
    used = {ref.entity_id for ref in iter_entity_references({CONF_ROOMS: rooms})}
    for room in rooms.values():
        for device in (room.get(CONF_DEVICES) or {}).values():
            if isinstance(device.get("state_source"), dict) and device["state_source"].get(CONF_ENTITY_ID):
                used.add(device["state_source"][CONF_ENTITY_ID])
            for setting in device.get("settings") or []:
                if setting.get("entity"):
                    used.add(setting["entity"])
    return used


def _room_for_area(rooms: dict[str, Any], area_id: str | None) -> str | None:
    if area_id is None:
        return None
    return next((rid for rid, room in rooms.items() if room.get(CONF_AREA_ID) == area_id), None)


def _role_entity(
    hass: HomeAssistant, profiles: dict[str, Profile], group: PhysicalDevice, role: str
) -> tuple[str, str, Profile] | None:
    """(platform, device entity, profile) of the integration that should do a job on a physical device."""
    best = best_for_role(profiles, group, role)
    if best is None:
        return None
    platform, profile = best
    entities = _device_entities(hass, group, platform, profile)
    return (platform, entities[0], profile) if entities else None


# ----------------------------------------------------------------------------------------------- detect


def detect_all(
    hass: HomeAssistant, profiles: dict[str, Profile], rooms: dict[str, Any], seen: Seen | None = None
) -> dict[str, Any]:
    """What Detect integrations shows. Reads only."""
    groups = physical_devices(hass)
    used = used_entities(rooms)
    area_reg = ar.async_get(hass)
    result: dict[str, Any] = {"new": [], "better": [], "gone": [], "renamed": [], "unmatched": []}

    for group in groups:
        members = {e for ids in group.entities.values() for e in ids}
        power = _role_entity(hass, profiles, group, ROLE_POWER)
        nav = _role_entity(hass, profiles, group, ROLE_NAVIGATION)
        if members & used:
            # An existing device: is there now a better integration for its power state?
            if power is None:
                continue
            platform, best_entity, _ = power
            for room_id, room in rooms.items():
                for device_id, device in (room.get(CONF_DEVICES) or {}).items():
                    current = device.get(CONF_ENTITY_ID)
                    entry = er.async_get(hass).async_get(current or "")
                    if current in members and entry is not None and entry.platform != platform and current != best_entity:
                        result["better"].append(
                            {
                                "room": room_id,
                                "device": device_id,
                                "path": f"devices.{device_id}.entity_id",
                                "entity_id": current,
                                "integration": entry.platform,
                                "replacement": best_entity,
                                "replacement_integration": platform,
                            }
                        )
            continue

        # A new physical device: each fitting device entity of its best integration is one device (zones)
        choice = power or nav
        if choice is None:
            continue
        platform, _, profile = choice
        for entity_id in _device_entities(hass, group, platform, profile):
            found = resolve(hass, profile, entity_id)
            device: dict[str, Any] = {CONF_ENTITY_ID: entity_id, CONF_NAME: _name(hass, entity_id)}
            remote = found.remote_entity
            if nav is not None and nav[0] != platform:
                remote = resolve(hass, nav[2], nav[1]).remote_entity or remote
            if remote:
                device[CONF_REMOTE_ENTITY] = remote
            if found.power_switch:
                device[CONF_POWER_SWITCH] = found.power_switch
            area_id = _area(hass, [entity_id, *sorted(members)])
            area = area_reg.async_get_area(area_id) if area_id else None
            room_id = _room_for_area(rooms, area_id)
            result["new"].append(
                {
                    "key": entity_id,
                    "entity_id": entity_id,
                    "name": device[CONF_NAME],
                    "integration": platform,
                    "integrations": group.integrations,
                    "profile": profile.id,
                    "profile_name": profile.name,
                    "order": profile.order,
                    "picture": found.picture_entity is not None,
                    "area_id": area_id,
                    "area_name": area.name if area else None,
                    "room": room_id,
                    "new_room": None if room_id else (slugify(area.name) if area else UNASSIGNED),
                    "new_room_name": None if room_id else (area.name if area else "New room"),
                    "activities": sorted((rooms.get(room_id) or {}).get(CONF_ACTIVITIES, {})) if room_id else [],
                    "device": device,
                }
            )

    # Gone and renamed, traced through what was seen before
    registry = er.async_get(hass)
    renamed: dict[str, dict[str, Any]] = {}
    for ref in find_missing_entities(hass, {CONF_ROOMS: rooms}):
        record = (seen.data if seen else {}).get(ref.entity_id, {})
        entry = registry.async_get(record["id"]) if record.get("id") else None
        if entry is not None and entry.entity_id != ref.entity_id:
            item = renamed.setdefault(ref.entity_id, {"old": ref.entity_id, "new": entry.entity_id, "uses": []})
            item["uses"].append({"room": ref.room_id, "path": ref.path})
            continue
        replacement = _replacement(hass, profiles, groups, record, ref.path)
        result["gone"].append(
            {
                "room": ref.room_id,
                "path": ref.path,
                "entity_id": ref.entity_id,
                "integration": record.get("platform"),
                "replacement": replacement[1] if replacement else None,
                "replacement_integration": replacement[0] if replacement else None,
            }
        )
    result["renamed"] = list(renamed.values())

    result["unmatched"] = unmatched_integrations(hass, profiles)
    return result


def _replacement(
    hass: HomeAssistant,
    profiles: dict[str, Profile],
    groups: list[PhysicalDevice],
    record: dict[str, Any],
    path: str,
) -> tuple[str, str] | None:
    """The same physical device's best remaining integration for the job the gone entity did."""
    hosts, macs = set(record.get("hosts") or []), set(record.get("macs") or [])
    if not hosts and not macs:
        return None
    group = next((g for g in groups if g.hosts & hosts or g.macs & macs), None)
    if group is None:
        return None
    if path.endswith(f".{CONF_REMOTE_ENTITY}"):
        nav = _role_entity(hass, profiles, group, ROLE_NAVIGATION)
        if nav is None:
            return None
        remote = resolve(hass, nav[2], nav[1]).remote_entity
        return (nav[0], remote) if remote else None
    if re.fullmatch(r"devices\.[^.]+\.entity_id", path):
        power = _role_entity(hass, profiles, group, ROLE_POWER)
        return (power[0], power[1]) if power else None
    return None


# ----------------------------------------------------------------------------------------------- apply


_PATH = re.compile(r"([^.\[\]]+)|\[(\d+)\]")


def _set_path(room: dict[str, Any], path: str, value: Any) -> bool:
    keys: list[Any] = [m.group(1) if m.group(1) is not None else int(m.group(2)) for m in _PATH.finditer(path)]
    node: Any = room
    for key in keys[:-1]:
        try:
            node = node[key]
        except (KeyError, IndexError, TypeError):
            return False
    try:
        node[keys[-1]] = value
    except (IndexError, TypeError):
        return False
    return True


def _rename(node: Any, old: str, new: str) -> Any:
    """Replace a value equal to ``old`` everywhere, except in actions and commands (listed, not edited)."""
    if isinstance(node, str):
        return new if node == old else node
    if isinstance(node, list):
        return [_rename(item, old, new) for item in node]
    if isinstance(node, dict):
        if node.get(CONF_TYPE) == STEP_TYPE_CALL_ACTION:
            return node
        return {
            k: (v if k in (CONF_COMMANDS, CONF_ON_START, CONF_ON_STOP) else _rename(v, old, new))
            for k, v in node.items()
        }
    return node


def _unique(base: str, taken: set[str]) -> str:
    base = slugify(base) or "device"
    if base not in taken:
        return base
    n = 2
    while f"{base}_{n}" in taken:
        n += 1
    return f"{base}_{n}"


def _insert(hass: HomeAssistant, profiles: dict[str, Profile], room: dict[str, Any], order: list[str], key: str) -> list[str]:
    """``order`` with ``key`` after the last device of the same or an earlier place in the power-on order."""
    devices = room[CONF_DEVICES]
    mine = rank(hass, profiles, devices[key])
    at = 0
    for index, other in enumerate(order):
        if other in devices and rank(hass, profiles, devices[other]) <= mine:
            at = index + 1
    return [*order[:at], key, *order[at:]]


def _with_picture(steps: list[dict[str, Any]], key: str) -> list[dict[str, Any]]:
    if any(s.get(CONF_TYPE) == STEP_TYPE_WAIT_PICTURE and s.get(CONF_DEVICE) == key for s in steps):
        return steps
    return [*steps, {CONF_TYPE: STEP_TYPE_WAIT_PICTURE, CONF_DEVICE: key}]


def starter_activity(
    hass: HomeAssistant, profiles: dict[str, Profile], room: dict[str, Any], members: list[str], pictures: set[str]
) -> dict[str, Any]:
    """One activity, named after the room, with the given devices in their power-on order (projectors and
    processors early, audio in the middle, sources last) and a picture check for each device that has one."""
    devices = room[CONF_DEVICES]
    ordered = sorted(members, key=lambda k: (rank(hass, profiles, devices[k]), k))
    steps: list[dict[str, Any]] = []
    for member in ordered:
        if member in pictures:
            steps = _with_picture(steps, member)
    return {CONF_NAME: room.get(CONF_NAME) or "On", "order": 1, CONF_DEVICES: ordered, CONF_STEPS: steps}


def apply_detect(
    hass: HomeAssistant, profiles: dict[str, Profile], rooms: dict[str, Any], choices: dict[str, Any]
) -> dict[str, Any]:
    """The rooms with the ticked changes applied. Pure: the caller decides whether to keep them."""
    rooms = copy.deepcopy(rooms)

    for item in choices.get("renamed") or []:
        rooms = _rename(rooms, item["old"], item["new"])

    for item in [*(choices.get("gone") or []), *(choices.get("better") or [])]:
        if item.get("replacement") and item.get("room") in rooms:
            _set_path(rooms[item["room"]], item["path"], item["replacement"])

    created: set[str] = set()
    pictures: dict[str, set[str]] = {}
    added: dict[str, list[str]] = {}
    for item in choices.get("new") or []:
        room_id = item.get("room")
        if not room_id or room_id not in rooms:
            room_id = item.get("new_room") or UNASSIGNED
            if room_id not in rooms:
                rooms[room_id] = {
                    CONF_NAME: item.get("new_room_name") or "New room",
                    CONF_DEVICES: {},
                    CONF_ACTIVITIES: {},
                    **({CONF_AREA_ID: item["area_id"]} if item.get("area_id") else {}),
                }
                created.add(room_id)
        room = rooms[room_id]
        room.setdefault(CONF_DEVICES, {})
        room.setdefault(CONF_ACTIVITIES, {})
        key = _unique(item["device"].get(CONF_NAME) or item["entity_id"].split(".", 1)[-1], set(room[CONF_DEVICES]))
        room[CONF_DEVICES][key] = dict(item["device"])
        added.setdefault(room_id, []).append(key)
        if item.get("picture"):
            pictures.setdefault(room_id, set()).add(key)
        for activity_id in item.get("activities") or []:
            activity = room[CONF_ACTIVITIES].get(activity_id)
            if activity is None:
                continue
            activity[CONF_DEVICES] = _insert(hass, profiles, room, list(activity.get(CONF_DEVICES) or []), key)
            if item.get("picture"):
                activity[CONF_STEPS] = _with_picture(list(activity.get(CONF_STEPS) or []), key)

    # One new activity per room that has none yet, with the devices selected for it
    if choices.get("starter"):
        for room_id, keys in added.items():
            room = rooms[room_id]
            if not room[CONF_ACTIVITIES]:
                activity = starter_activity(hass, profiles, room, keys, pictures.get(room_id, set()))
                room[CONF_ACTIVITIES] = {_unique(activity[CONF_NAME], set()): activity}
    return rooms


# ----------------------------------------------------------------------------------------------- + Profile


_STATE_WORDS = ("power", "state", "status")


def draft_profile(hass: HomeAssistant, integration: str) -> dict[str, Any] | None:
    """A starting point for a profile of an integration without one, from its first AV device here.

    The device entity is its media player (else its remote); the indicator is a sensor whose translation key
    says power or state, else a binary sensor of class power, else the device entity itself. Its states right
    now go into the matching group; the rest is filled in with Learn in the panel, or by hand.
    """
    registry = er.async_get(hass)
    entries = [e for e in registry.entities.values() if e.platform == integration and e.disabled_by is None]
    av = sorted((e for e in entries if e.domain in ("media_player", "remote")), key=lambda e: (e.domain != "media_player", e.entity_id))
    if not av:
        return None
    main = av[0]
    siblings = [e for e in entries if main.device_id is not None and e.device_id == main.device_id]

    def matcher(e: er.RegistryEntry) -> dict[str, Any]:
        m: dict[str, Any] = {"domain": e.domain}
        if e.translation_key:
            m["translation_key"] = e.translation_key
        elif e.unique_id and main.unique_id and str(e.unique_id).startswith(str(main.unique_id)) and e.unique_id != main.unique_id:
            m["unique_id_suffix"] = str(e.unique_id)[len(str(main.unique_id)) :]
        return m

    indicator_entry = next(
        (e for e in siblings if e.domain == "sensor" and any(w in (e.translation_key or e.entity_id) for w in _STATE_WORDS)),
        None,
    ) or next(
        (e for e in siblings if e.domain == "binary_sensor" and (e.device_class or e.original_device_class) == "power"),
        None,
    )
    indicator: dict[str, Any] = {"entity": matcher(indicator_entry)} if indicator_entry else {}
    watched = indicator_entry.entity_id if indicator_entry else main.entity_id
    state = hass.states.get(watched)
    if state is not None and state.state not in ("unavailable", "unknown"):
        indicator["off" if state.state in ("off", "standby") else "on"] = [state.state]
    data: dict[str, Any] = {
        "id": slugify(integration),
        "name": integration.replace("_", " ").title(),
        "integration": integration,
        "device_entity": matcher(main) if main.translation_key else {"domain": main.domain},
        "indicator": indicator,
        "order": "middle",
        "roles": {"power": 5},
    }
    if main.domain != "remote" and (remote := next((e for e in siblings if e.domain == "remote"), None)):
        data["remote"] = {"domain": "remote"}
        data["roles"]["navigation"] = 5
        _ = remote
    if switch := next((e for e in siblings if e.domain == "switch" and "power" in (e.translation_key or e.entity_id)), None):
        data["power_switch"] = matcher(switch)
    selects = [matcher(e) for e in siblings if e.domain == "select" and e.translation_key and e.entity_category is None]
    if selects:
        data["settings"] = selects[:4]
    return {"profile": data, "device_entity": main.entity_id, "watch": watched}
