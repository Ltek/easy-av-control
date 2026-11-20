"""The profile library: built-in profiles plus the user's own, in one place.

Built-in profiles ship as ``profiles/*.yaml`` and can't be changed. The user's own profiles (made with
**Duplicate**, imported as text, or created in the panel) are stored in ``.storage/easy_av_control.profiles``.
Both live in one dict that every coordinator reads, so a saved profile takes effect at once.

Which profile a device uses (``profile_for_device``):

1. the device's ``profile`` key, when it names a known profile;
2. else the user's own profile for the device entity's integration (the newest one, if there are several);
3. else the built-in profile for that integration.

The generic media player profile never counts here: a device without a profile keeps fixed times.
"""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.storage import Store

from .const import CONF_PROFILE, DOMAIN
from .device_profiles import Profile, async_load_profiles, validate_profile

_LOGGER = logging.getLogger(__name__)

STORAGE_KEY = f"{DOMAIN}.profiles"
STORAGE_VERSION = 1
DATA_LIBRARY = f"{DOMAIN}_library"

SOURCE_BUILTIN = "builtin"
SOURCE_USER = "user"


# Export / import envelope
EXPORT_KIND = "easy-av-control/profile"
EXPORT_VERSION = 1


class ProfileLibrary:
    """Built-in and user profiles; ``profiles`` is the merged view."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.builtin: dict[str, Profile] = {}
        self.user: dict[str, Profile] = {}
        # Merged, the same dict object for the library's whole life: coordinators keep a reference
        self.profiles: dict[str, Profile] = {}

    async def async_load(self) -> None:
        self.builtin = await async_load_profiles(self.hass)
        stored = await self._store.async_load() or {}
        self.user = {}
        for data in stored.get("profiles", []):
            try:
                profile = validate_profile(data, SOURCE_USER)
            except vol.Invalid as err:
                _LOGGER.error("Your profile %s is not valid and is skipped: %s", data.get("id"), err)
                continue
            if profile.id in self.builtin:
                _LOGGER.error("Your profile %s has the id of a built-in profile and is skipped", profile.id)
                continue
            self.user[profile.id] = profile
        self._merge()

    def _merge(self) -> None:
        self.profiles.clear()
        self.profiles.update(self.builtin)
        self.profiles.update(self.user)

    async def _async_save(self) -> None:
        await self._store.async_save({"profiles": [p.raw for p in self.user.values()]})

    def free_id(self, wanted: str) -> str:
        """``wanted``, or ``wanted_2``, ``wanted_3`` … when it is taken."""
        if wanted not in self.profiles:
            return wanted
        n = 2
        while f"{wanted}_{n}" in self.profiles:
            n += 1
        return f"{wanted}_{n}"

    async def async_save(self, data: dict[str, Any], previous_id: str | None = None) -> Profile:
        """Add or change one of the user's profiles. Raises vol.Invalid with what is wrong."""
        profile = validate_profile(data, SOURCE_USER)
        if profile.id in self.builtin:
            raise vol.Invalid(f"{profile.id} is a built-in profile; give yours another id", path=["id"])
        if previous_id is not None and previous_id not in self.user:
            raise vol.Invalid(f"{previous_id} is not one of your profiles", path=["id"])
        if profile.id != previous_id and profile.id in self.user:
            raise vol.Invalid(f"you already have a profile {profile.id}", path=["id"])
        if previous_id is not None and previous_id != profile.id:
            self.user.pop(previous_id)
        self.user[profile.id] = profile
        self._merge()
        await self._async_save()
        return profile

    async def async_delete(self, profile_id: str) -> None:
        if profile_id in self.builtin:
            raise vol.Invalid(f"{profile_id} is built in and can't be deleted")
        if self.user.pop(profile_id, None) is None:
            raise vol.Invalid(f"{profile_id} is not one of your profiles")
        self._merge()
        await self._async_save()

    def duplicate(self, profile_id: str) -> dict[str, Any]:
        """A copy of a profile under a free id, not saved yet (the panel opens it in the editor)."""
        source = self.profiles[profile_id]
        data = {k: v for k, v in source.raw.items() if k != "tested"}
        data["id"] = self.free_id(f"{source.id}_mine")
        data["name"] = f"{source.name} (mine)"
        return data

    def export(self, profile_ids: list[str]) -> dict[str, Any]:
        return {
            "kind": EXPORT_KIND,
            "v": EXPORT_VERSION,
            "profiles": {
                pid: {k: v for k, v in self.profiles[pid].raw.items() if k != "tested"}
                for pid in profile_ids
                if pid in self.profiles
            },
        }

    async def async_import(self, envelope: dict[str, Any]) -> dict[str, Any]:
        """Add the profiles of an export. Never overwrites: a taken id gets a new one, reported back."""
        if envelope.get("kind") != EXPORT_KIND:
            raise vol.Invalid("this isn't an Easy AV Control profile export")
        if int(envelope.get("v", 0)) > EXPORT_VERSION:
            _LOGGER.warning("Profile export version %s is newer than this build understands", envelope.get("v"))
        added: list[str] = []
        renamed: dict[str, str] = {}
        invalid: dict[str, str] = {}
        for pid, data in (envelope.get("profiles") or {}).items():
            data = {**data, "id": str(data.get("id") or pid)}
            data.pop("tested", None)
            new_id = self.free_id(data["id"])
            if new_id != data["id"]:
                renamed[data["id"]] = new_id
                data["id"] = new_id
            try:
                profile = validate_profile(data, SOURCE_USER)
            except vol.Invalid as err:
                invalid[pid] = str(err)
                renamed.pop(pid, None)
                continue
            self.user[profile.id] = profile
            self._merge()
            added.append(profile.id)
        if added:
            await self._async_save()
        return {"added": added, "renamed": renamed, "invalid": invalid}

    def view(self, profile: Profile) -> dict[str, Any]:
        """A profile as the panel lists it."""
        return {
            "id": profile.id,
            "name": profile.name,
            "integration": profile.integration,
            "source": profile.source,
            "tested": profile.data["tested"],
            "generic": profile.generic,
            "data": profile.raw,
        }


async def async_get_library(hass: HomeAssistant) -> ProfileLibrary:
    """The library, loaded once per Home Assistant start."""
    if (library := hass.data.get(DATA_LIBRARY)) is None:
        library = ProfileLibrary(hass)
        await library.async_load()
        hass.data[DATA_LIBRARY] = library
    return library


def profiles_of(hass: HomeAssistant) -> dict[str, Profile]:
    """The merged profiles, or none before the library is loaded (e.g. a flow preview without setup)."""
    library: ProfileLibrary | None = hass.data.get(DATA_LIBRARY)
    return library.profiles if library is not None else {}


def profile_for_device(
    hass: HomeAssistant, profiles: dict[str, Profile], device: dict[str, Any]
) -> Profile | None:
    """The profile a device uses (see the module docstring); never the generic one."""
    if (pid := device.get(CONF_PROFILE)) and (profile := profiles.get(pid)) is not None:
        return profile
    entry = er.async_get(hass).async_get(device.get("entity_id") or "")
    if entry is None:
        return None
    own = [p for p in profiles.values() if not p.generic and p.integration == entry.platform]
    users = [p for p in own if p.source == SOURCE_USER]
    if users:
        return users[-1]
    return next((p for p in own if p.source == SOURCE_BUILTIN), None)
