"""The remote control card as a dashboard resource.

Dashboards load their resource list fresh on every page load, and the URL
carries the version, so a browser never runs an old card after an update.
A card added with ``add_extra_js_url`` sits in the page itself instead, which
the frontend's service worker serves from its cache first: after an update
or a restart, a page load could show an old card or none at all.

This works only while resources are kept in storage (the default). With
resources in YAML, the caller falls back to ``add_extra_js_url``.

The resource points at a copy of the card in ``<config>/www``: HA serves
``/local`` from its start, while the integration's own static path only
exists once the integration is set up. A dashboard opened while HA starts (or
the Companion App reconnecting) would otherwise get a 404 and "Custom element
doesn't exist".
"""
from __future__ import annotations

import logging
import os
import shutil
from collections.abc import Iterable
from pathlib import Path
from typing import Any

from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)


def copy_to_www(www: str, subdir: str, source: Path) -> bool:
    """Copy the card to ``<www>/<subdir>/``, only when its bytes changed.

    Runs in the executor. True when ``/local`` serves the copy now: HA serves
    www only if the folder was there when it started, so a www made here
    counts from the next start.
    """
    served = os.path.isdir(www)
    folder = os.path.join(www, subdir)
    target = os.path.join(folder, source.name)
    os.makedirs(folder, exist_ok=True)
    data = source.read_bytes()
    if not os.path.isfile(target) or Path(target).read_bytes() != data:
        tmp = f"{target}.tmp"
        with open(tmp, "wb") as file:
            file.write(data)
        shutil.copystat(source, tmp)
        os.replace(tmp, target)
    return served


def _storage_resources(hass: HomeAssistant) -> Any | None:
    """The resource collection, if resources are kept in storage."""
    try:
        from homeassistant.components.lovelace.resources import (
            ResourceStorageCollection,
        )
    except ImportError:
        return None
    data = hass.data.get("lovelace")
    resources = getattr(data, "resources", None)
    if resources is None and isinstance(data, dict):
        # Home Assistant before LovelaceData
        resources = data.get("resources")
    return resources if isinstance(resources, ResourceStorageCollection) else None


def _bases(base: str | Iterable[str]) -> tuple[str, ...]:
    return (base,) if isinstance(base, str) else tuple(base)


def _ours(item: dict[str, Any], bases: tuple[str, ...]) -> bool:
    return str(item.get("url", "")).split("?", 1)[0] in bases


async def async_register_card_resource(
    hass: HomeAssistant, base: str | Iterable[str], url: str
) -> bool:
    """Add the card as a resource or update its version.

    ``base`` is the URL without query, or all URLs the card was ever served
    at (so a move to another path updates the entry instead of adding a
    second one); ``url`` is the one to use, with the version.
    Returns False when resources are not in storage or could not be changed,
    so the caller can load the card another way.
    """
    bases = _bases(base)
    resources = _storage_resources(hass)
    if resources is None:
        return False
    try:
        # Loads the collection from storage
        await resources.async_get_info()
        ours = [item for item in resources.async_items() if _ours(item, bases)]
        if not ours:
            _LOGGER.debug("Adding dashboard resource %s", url)
            await resources.async_create_item({"res_type": "module", "url": url})
        elif ours[0]["url"] != url:
            _LOGGER.debug("Updating dashboard resource to %s", url)
            await resources.async_update_item(
                ours[0]["id"], {"res_type": "module", "url": url}
            )
        for item in ours[1:]:
            await resources.async_delete_item(item["id"])
    except Exception:  # noqa: BLE001 - the card must not stop the integration
        _LOGGER.warning("Could not register the dashboard resource", exc_info=True)
        return False
    return True


async def async_remove_card_resource(
    hass: HomeAssistant, base: str | Iterable[str]
) -> None:
    """Remove the card's resource, e.g. when the integration is removed."""
    bases = _bases(base)
    resources = _storage_resources(hass)
    if resources is None:
        return
    try:
        await resources.async_get_info()
        for item in [i for i in resources.async_items() if _ours(i, bases)]:
            await resources.async_delete_item(item["id"])
    except Exception:  # noqa: BLE001 - removing the entry must not fail
        _LOGGER.warning("Could not remove the dashboard resource", exc_info=True)
