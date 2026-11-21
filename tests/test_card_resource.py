"""Tests for the card's dashboard resource."""
from __future__ import annotations

from pathlib import Path
from unittest.mock import patch

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component

from .common import living_room
from custom_components.easy_av_control import _async_register_frontend
from custom_components.easy_av_control.card_resource import (
    async_register_card_resource,
    async_remove_card_resource,
    copy_to_www,
)
from custom_components.easy_av_control.const import DOMAIN

BASE = "/easy_av_control_static/easy-av-control-card.js"
LOCAL = "/local/easy_av_control/easy-av-control-card.js"


@pytest.fixture(autouse=True)
def no_www_copy():
    """Never write a www folder into the test config."""
    with patch(
        "custom_components.easy_av_control.copy_to_www", return_value=False
    ) as copy:
        yield copy


def urls(hass: HomeAssistant) -> list[str]:
    return [item["url"] for item in hass.data["lovelace"].resources.async_items()]


async def test_register_update_and_remove(hass: HomeAssistant) -> None:
    """The resource is added once, follows the version and can be removed."""
    assert await async_setup_component(hass, "lovelace", {})
    resources = hass.data["lovelace"].resources
    await resources.async_create_item({"res_type": "module", "url": "/local/other.js"})

    assert await async_register_card_resource(hass, BASE, f"{BASE}?v=1")
    assert await async_register_card_resource(hass, BASE, f"{BASE}?v=1")
    assert urls(hass) == ["/local/other.js", f"{BASE}?v=1"]

    # A new version updates the entry; a duplicate is cleaned up
    await resources.async_create_item({"res_type": "module", "url": BASE})
    assert await async_register_card_resource(hass, BASE, f"{BASE}?v=2")
    assert urls(hass) == ["/local/other.js", f"{BASE}?v=2"]

    await async_remove_card_resource(hass, BASE)
    assert urls(hass) == ["/local/other.js"]


async def test_yaml_resources_are_left_alone(hass: HomeAssistant) -> None:
    """With resources in YAML the caller has to load the card itself."""
    assert await async_setup_component(
        hass, "lovelace", {"lovelace": {"resource_mode": "yaml", "resources": []}}
    )
    assert not await async_register_card_resource(hass, BASE, f"{BASE}?v=1")


async def test_removing_the_last_entry_removes_the_resource(
    hass: HomeAssistant, devices
) -> None:
    """The resource goes with the last entry, not before."""
    assert await async_setup_component(hass, "lovelace", {})
    assert await async_register_card_resource(hass, BASE, f"{BASE}?v=1")
    entries = []
    for _ in range(2):
        entry = MockConfigEntry(domain=DOMAIN, version=2, minor_version=1, data=living_room())
        entry.add_to_hass(hass)
        entries.append(entry)
    assert await hass.config_entries.async_setup(entries[0].entry_id)
    await hass.async_block_till_done()

    await hass.config_entries.async_remove(entries[0].entry_id)
    assert urls(hass) == [f"{BASE}?v=1"]
    await hass.config_entries.async_remove(entries[1].entry_id)
    assert urls(hass) == []


def test_copy_to_www(tmp_path: Path) -> None:
    """The card is copied when it changed; /local counts once www was there at the start."""
    source = tmp_path / "src" / "easy-av-control-card.js"
    source.parent.mkdir()
    source.write_text("one")
    www = tmp_path / "www"
    target = www / "easy_av_control" / "easy-av-control-card.js"

    assert copy_to_www(str(www), "easy_av_control", source) is False  # www is new
    assert target.read_text() == "one"
    assert copy_to_www(str(www), "easy_av_control", source) is True
    source.write_text("two")
    assert copy_to_www(str(www), "easy_av_control", source) is True
    assert target.read_text() == "two"
    assert not list(target.parent.glob("*.tmp"))


async def test_resource_moves_to_local_without_a_duplicate(
    hass: HomeAssistant, no_www_copy
) -> None:
    """An old static-path resource becomes the /local one; nothing is added."""
    assert await async_setup_component(hass, "http", {})
    assert await async_setup_component(hass, "lovelace", {})
    resources = hass.data["lovelace"].resources
    await resources.async_create_item({"res_type": "module", "url": f"{BASE}?v=old"})
    hass.config.components.add("frontend")
    no_www_copy.return_value = True
    with patch("homeassistant.components.panel_custom.async_register_panel"):
        await _async_register_frontend(hass)
    [url] = urls(hass)
    assert url.startswith(f"{LOCAL}?v=")
    copy_args = no_www_copy.call_args.args
    assert copy_args[0] == hass.config.path("www")

    # www missing at HA's start: this run keeps the static path
    no_www_copy.return_value = False
    with patch("homeassistant.components.panel_custom.async_register_panel"):
        await _async_register_frontend(hass)
    [url] = urls(hass)
    assert url.startswith(f"{BASE}?v=")


async def test_removal_finds_either_url(hass: HomeAssistant) -> None:
    """Removing the card removes it at the static path and in www."""
    assert await async_setup_component(hass, "lovelace", {})
    resources = hass.data["lovelace"].resources
    for url in (f"{BASE}?v=1", f"{LOCAL}?v=2"):
        await resources.async_create_item({"res_type": "module", "url": url})
    await async_remove_card_resource(hass, (BASE, LOCAL))
    assert urls(hass) == []
