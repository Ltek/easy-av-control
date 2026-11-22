"""Integration profiles: what an integration's entities say about a device.

A profile describes one *integration* (JVC projector, StormAudio, PiPup, ...), never one installation: its
entities are found on the device's own Home Assistant device by domain, translation key, unique-ID suffix or
device class, never by entity ID. So a profile works as is on any Home Assistant, and can be shared.

A profile answers, for a device entity:

- **indicator**: which entity (and attribute) says whether the device is on, and what each value means:
  ``on``, ``starting`` (warming up), ``stopping`` (cooling down), ``off``, ``error``. Or ``available_is_on``:
  the device is on while that entity is available (a Lumagen's sensors are unavailable in standby).
- **companions**: its remote entity and key names, power outlet switch, settings for the card.
- **picture**: an optional "is there a picture" check (Lumagen ``Active Video``).
- **timeouts, debounce, order**: how long to wait, how long a state must hold, and where the device goes in an
  activity's power-on order (early / middle / late).
- **roles**: which jobs the integration does for a device several integrations cover (a TV with PiPup, ADB and
  Android TV Remote), with a priority each: lower is preferred.

This module only reads profiles and the registries; it changes nothing (phase 1 of PLAN.md).
"""
from __future__ import annotations

from collections.abc import Iterable
import copy
from dataclasses import dataclass, field
import logging
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import voluptuous as vol

from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import HomeAssistant, State
from homeassistant.helpers import device_registry as dr, entity_registry as er
from homeassistant.util.yaml import load_yaml_dict

_LOGGER = logging.getLogger(__name__)

PROFILES_DIR = Path(__file__).parent / "profiles"

ANY_INTEGRATION = "*"

GROUP_ON = "on"
GROUP_STARTING = "starting"
GROUP_STOPPING = "stopping"
GROUP_OFF = "off"
GROUP_ERROR = "error"
GROUP_UNKNOWN = "unknown"
STATE_GROUPS = (GROUP_ON, GROUP_STARTING, GROUP_STOPPING, GROUP_OFF, GROUP_ERROR)

ROLE_POWER = "power"
ROLE_NAVIGATION = "navigation"
ROLE_NOW_PLAYING = "now_playing"
ROLE_TURN_OFF = "turn_off"
ROLES = (ROLE_POWER, ROLE_NAVIGATION, ROLE_NOW_PLAYING, ROLE_TURN_OFF)

ORDER_EARLY = "early"
ORDER_MIDDLE = "middle"
ORDER_LATE = "late"
ORDERS = (ORDER_EARLY, ORDER_MIDDLE, ORDER_LATE)

DEFAULT_DEBOUNCE = 2.0
DEFAULT_TIMEOUT_ON = 120.0
DEFAULT_TIMEOUT_OFF = 300.0

# Entity domains that make a device worth offering in Detect integrations
AV_DOMAINS = ("media_player", "remote")


def _state_value(value: Any) -> str:
    """A state value. YAML reads a bare on / off as a boolean, which would never match a state: refuse it."""
    if isinstance(value, bool):
        raise vol.Invalid('quote on / off in a profile ("on"), YAML reads them as true / false')
    return str(value)


_STATES = vol.All(vol.Coerce(list), [_state_value])
_SECONDS = vol.All(vol.Coerce(float), vol.Range(min=0, max=3600))

MATCHER_SCHEMA = vol.Schema(
    {
        vol.Required("domain"): str,
        vol.Optional("translation_key"): str,
        vol.Optional("unique_id_suffix"): str,
        vol.Optional("device_class"): str,
    }
)

INDICATOR_SCHEMA = vol.Schema(
    {
        # Without an entity, the device entity itself
        vol.Optional("entity"): MATCHER_SCHEMA,
        vol.Optional("attribute"): str,
        vol.Optional("available_is_on", default=False): bool,
        # Any value but these means on (a Harmony hub's activity, anything but power_off)
        vol.Optional("on_unless"): _STATES,
        **{vol.Optional(group, default=list): _STATES for group in STATE_GROUPS},
    }
)


def _picture_has_states(value: dict[str, Any]) -> dict[str, Any]:
    if not value["ok"] and not value["fail"]:
        raise vol.Invalid("a picture check needs the values that mean a picture (ok) or no picture (fail)")
    return value


PICTURE_SCHEMA = vol.All(vol.Schema(
    {
        vol.Required("entity"): MATCHER_SCHEMA,
        vol.Optional("attribute"): str,
        # ok empty: any value except those in fail is a picture (a JVC shows its resolution, or no_signal)
        vol.Optional("ok", default=list): _STATES,
        vol.Optional("fail", default=list): _STATES,
        vol.Optional("debounce", default=5.0): _SECONDS,
        vol.Optional("timeout", default=30.0): _SECONDS,
    }
), _picture_has_states)

PROFILE_SCHEMA = vol.Schema(
    {
        vol.Required("id"): vol.Match(r"^[a-z0-9_]+$"),
        vol.Required("name"): str,
        vol.Required("integration"): str,
        vol.Optional("match", default=dict): vol.Schema(
            {vol.Optional("manufacturer"): str, vol.Optional("model"): str}
        ),
        vol.Required("device_entity"): MATCHER_SCHEMA,
        vol.Optional("indicator"): INDICATOR_SCHEMA,
        vol.Optional("remote"): MATCHER_SCHEMA,
        vol.Optional("remote_keys", default=dict): {str: str},
        vol.Optional("power_switch"): MATCHER_SCHEMA,
        vol.Optional("settings", default=list): [MATCHER_SCHEMA],
        vol.Optional("picture"): PICTURE_SCHEMA,
        vol.Optional("timeouts", default=dict): vol.Schema(
            {vol.Optional(GROUP_ON): _SECONDS, vol.Optional(GROUP_OFF): _SECONDS}
        ),
        vol.Optional("debounce", default=DEFAULT_DEBOUNCE): _SECONDS,
        vol.Optional("order", default=ORDER_MIDDLE): vol.In(ORDERS),
        vol.Optional("roles", default=dict): {vol.In(ROLES): vol.All(int, vol.Range(min=0, max=99))},
        # False for a profile written from an integration's code without a real device to try it on
        vol.Optional("tested", default=True): bool,
    }
)


@dataclass(frozen=True)
class Profile:
    """One validated profile."""

    data: dict[str, Any]
    source: str = "builtin"
    # As written (no defaults filled in): what the panel shows, exports and stores
    raw: dict[str, Any] = field(default_factory=dict, compare=False)

    @property
    def id(self) -> str:
        return self.data["id"]

    @property
    def name(self) -> str:
        return self.data["name"]

    @property
    def integration(self) -> str:
        return self.data["integration"]

    @property
    def generic(self) -> bool:
        return self.integration == ANY_INTEGRATION

    @property
    def indicator(self) -> dict[str, Any] | None:
        return self.data.get("indicator")

    @property
    def remote_keys(self) -> dict[str, str]:
        return self.data["remote_keys"]

    @property
    def order(self) -> str:
        return self.data["order"]

    @property
    def debounce(self) -> float:
        return self.data["debounce"]

    def timeout(self, group: str) -> float:
        default = DEFAULT_TIMEOUT_ON if group == GROUP_ON else DEFAULT_TIMEOUT_OFF
        return self.data["timeouts"].get(group, default)

    def priority(self, role: str) -> int | None:
        """This integration's priority for a role (lower is preferred); None when it doesn't do that job."""
        return self.data["roles"].get(role)


def validate_profile(data: dict[str, Any], source: str = "builtin") -> Profile:
    """Validate a profile; raises vol.Invalid with what is wrong."""
    return Profile(PROFILE_SCHEMA(data), source, copy.deepcopy(data))


def load_profiles(directory: Path = PROFILES_DIR) -> dict[str, Profile]:
    """Read every profile file of a folder (blocking: run it in the executor).

    A file that doesn't validate is logged and skipped, so one bad profile never stops the others.
    """
    profiles: dict[str, Profile] = {}
    for path in sorted(directory.glob("*.yaml")):
        try:
            profile = validate_profile(load_yaml_dict(path))
        except (vol.Invalid, Exception) as err:  # noqa: BLE001 - any bad file is skipped, not fatal
            _LOGGER.error("Profile %s is not valid and is skipped: %s", path.name, err)
            continue
        if profile.id in profiles:
            _LOGGER.error("Profile %s: id %s is used twice, skipped", path.name, profile.id)
            continue
        profiles[profile.id] = profile
    return profiles


async def async_load_profiles(hass: HomeAssistant) -> dict[str, Profile]:
    """The built-in profiles."""
    return await hass.async_add_executor_job(load_profiles)


# ----------------------------------------------------------------------------------------------- matching


def profile_for(
    profiles: dict[str, Profile] | Iterable[Profile],
    platform: str | None,
    manufacturer: str | None = None,
    model: str | None = None,
) -> Profile | None:
    """The profile for an integration: the most specific match, else the generic one."""
    items = list(profiles.values()) if isinstance(profiles, dict) else list(profiles)

    def fits(p: Profile) -> bool:
        m = p.data["match"]
        if "manufacturer" in m and (manufacturer or "").lower() != m["manufacturer"].lower():
            return False
        return not ("model" in m and m["model"].lower() not in (model or "").lower())

    specific = [p for p in items if p.integration == platform and fits(p)]
    if specific:
        # a profile that names a manufacturer / model beats the plain one
        return max(specific, key=lambda p: len(p.data["match"]))
    return next((p for p in items if p.generic), None)


def entity_matches(entry: er.RegistryEntry, matcher: dict[str, Any]) -> bool:
    """Whether a registry entry fits a profile's matcher."""
    if entry.domain != matcher["domain"]:
        return False
    if "translation_key" in matcher and entry.translation_key != matcher["translation_key"]:
        return False
    if "unique_id_suffix" in matcher and not str(entry.unique_id).endswith(matcher["unique_id_suffix"]):
        return False
    return not (
        "device_class" in matcher
        and (entry.device_class or entry.original_device_class) != matcher["device_class"]
    )


def _device_entries(hass: HomeAssistant, entry: er.RegistryEntry) -> list[er.RegistryEntry]:
    """The enabled entities on the same HA device (and integration) as an entity."""
    registry = er.async_get(hass)
    if entry.device_id is None:
        return [entry]
    return [
        e
        for e in er.async_entries_for_device(registry, entry.device_id)
        if e.disabled_by is None and e.platform == entry.platform
    ]


def _find(entries: list[er.RegistryEntry], matcher: dict[str, Any] | None) -> str | None:
    if matcher is None:
        return None
    found = sorted(e.entity_id for e in entries if entity_matches(e, matcher))
    return found[0] if found else None


@dataclass
class Resolved:
    """A profile applied to one device entity: the actual entity IDs on this Home Assistant."""

    profile: Profile
    entity_id: str
    indicator_entity: str | None = None
    indicator_attribute: str | None = None
    remote_entity: str | None = None
    power_switch: str | None = None
    settings: list[str] = field(default_factory=list)
    picture_entity: str | None = None

    @property
    def has_indicator(self) -> bool:
        return self.indicator_entity is not None


def resolve(hass: HomeAssistant, profile: Profile, entity_id: str) -> Resolved:
    """Find the profile's entities on the device an entity belongs to.

    The indicator without its own matcher is the device entity itself. A matcher with no entity on this device
    (an older integration version, a disabled entity) leaves that part empty instead of failing.
    """
    resolved = Resolved(profile, entity_id)
    entry = er.async_get(hass).async_get(entity_id)
    entries = _device_entries(hass, entry) if entry is not None else []
    data = profile.data

    if (indicator := data.get("indicator")) is not None:
        if "entity" in indicator:
            resolved.indicator_entity = _find(entries, indicator["entity"])
        else:
            resolved.indicator_entity = entity_id
        if resolved.indicator_entity is not None:
            resolved.indicator_attribute = indicator.get("attribute")
    resolved.remote_entity = _find(entries, data.get("remote"))
    resolved.power_switch = _find(entries, data.get("power_switch"))
    resolved.settings = [s for m in data["settings"] if (s := _find(entries, m)) is not None]
    if (picture := data.get("picture")) is not None:
        resolved.picture_entity = _find(entries, picture["entity"])
    return resolved


def classify(indicator: dict[str, Any] | None, state: State | None, attribute: str | None = None) -> str:
    """What an indicator's state means: one of STATE_GROUPS, or "unknown".

    ``attribute`` reads that attribute instead of the state (StormAudio ``detailed_state``). With
    ``available_is_on``, any available state is "on" and unavailable is "off".
    """
    if indicator is None:
        return GROUP_UNKNOWN
    if indicator.get("available_is_on"):
        if state is None or state.state == STATE_UNAVAILABLE:
            return GROUP_OFF
        return GROUP_ON
    if state is None or state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
        return GROUP_UNKNOWN
    attribute = attribute if attribute is not None else indicator.get("attribute")
    value = state.attributes.get(attribute) if attribute else state.state
    if value is None:
        return GROUP_UNKNOWN
    value = str(value)
    if (unless := indicator.get("on_unless")) is not None:
        return GROUP_OFF if value in unless else GROUP_ON
    for group in STATE_GROUPS:
        if value in indicator.get(group, ()):
            return group
    return GROUP_UNKNOWN


# ----------------------------------------------------------------------------------------------- physical devices


@dataclass
class PhysicalDevice:
    """One real device, as seen by every integration that covers it."""

    device_ids: set[str] = field(default_factory=set)
    hosts: set[str] = field(default_factory=set)
    macs: set[str] = field(default_factory=set)
    # integration -> its AV entities (media_player / remote) on this device
    entities: dict[str, list[str]] = field(default_factory=dict)

    @property
    def integrations(self) -> list[str]:
        return sorted(self.entities)


def config_entry_host(data: dict[str, Any]) -> str | None:
    """The host a config entry connects to: host, ip_address, or the host of a url."""
    for key in ("host", "ip_address", "ip"):
        if value := data.get(key):
            return str(value).strip().lower()
    if url := data.get("url"):
        host = urlparse(str(url)).hostname
        return host.lower() if host else None
    return None


def _norm_mac(mac: str) -> str:
    return dr.format_mac(mac).lower()


def physical_devices(hass: HomeAssistant) -> list[PhysicalDevice]:
    """Group the AV devices of every integration into physical devices.

    Two HA devices are the same physical device when they share a MAC address in the device registry, or the
    host of their config entry (only when that entry has one device: a Cast or Plex entry covers many). Name
    similarity is never used here.
    """
    ent_reg = er.async_get(hass)
    dev_reg = dr.async_get(hass)

    av: dict[str, dict[str, list[str]]] = {}
    for entry in ent_reg.entities.values():
        if entry.disabled_by is not None or entry.device_id is None or entry.domain not in AV_DOMAINS:
            continue
        av.setdefault(entry.device_id, {}).setdefault(entry.platform, []).append(entry.entity_id)

    devices_per_entry: dict[str, int] = {}
    for device in dev_reg.devices.values():
        for entry_id in device.config_entries:
            devices_per_entry[entry_id] = devices_per_entry.get(entry_id, 0) + 1

    parent: dict[str, str] = {}

    def find(key: str) -> str:
        parent.setdefault(key, key)
        while parent[key] != key:
            parent[key] = parent[parent[key]]
            key = parent[key]
        return key

    def union(a: str, b: str) -> None:
        parent[find(a)] = find(b)

    hosts: dict[str, set[str]] = {}
    macs: dict[str, set[str]] = {}
    for device_id in av:
        device = dev_reg.async_get(device_id)
        if device is None:
            continue
        key = f"device:{device_id}"
        find(key)
        for kind, value in device.connections:
            if kind == dr.CONNECTION_NETWORK_MAC:
                mac = _norm_mac(value)
                macs.setdefault(device_id, set()).add(mac)
                union(key, f"mac:{mac}")
        for entry_id in device.config_entries:
            entry = hass.config_entries.async_get_entry(entry_id)
            if entry is None or devices_per_entry.get(entry_id, 0) != 1:
                continue
            if host := config_entry_host(dict(entry.data)):
                hosts.setdefault(device_id, set()).add(host)
                union(key, f"host:{host}")

    groups: dict[str, PhysicalDevice] = {}
    for device_id, per_platform in av.items():
        root = find(f"device:{device_id}")
        group = groups.setdefault(root, PhysicalDevice())
        group.device_ids.add(device_id)
        group.hosts |= hosts.get(device_id, set())
        group.macs |= macs.get(device_id, set())
        for platform, entity_ids in per_platform.items():
            group.entities.setdefault(platform, []).extend(sorted(entity_ids))
    return sorted(groups.values(), key=lambda g: (sorted(g.hosts), sorted(g.device_ids)))


def best_for_role(
    profiles: dict[str, Profile], device: PhysicalDevice, role: str
) -> tuple[str, Profile] | None:
    """The integration of a physical device that should do a job, by its profile's priority for that role."""
    candidates = []
    for platform in device.integrations:
        profile = profile_for(profiles, platform)
        if profile is None or profile.generic:
            continue
        if (priority := profile.priority(role)) is not None:
            candidates.append((priority, platform, profile))
    if not candidates:
        return None
    _, platform, profile = min(candidates)
    return platform, profile


def unmatched_integrations(hass: HomeAssistant, profiles: dict[str, Profile]) -> list[str]:
    """AV integrations installed here that have no profile of their own (only the generic one)."""
    found = {
        e.platform
        for e in er.async_get(hass).entities.values()
        if e.disabled_by is None and e.domain in AV_DOMAINS
    }
    own = {p.integration for p in profiles.values() if not p.generic}
    return sorted(found - own)
