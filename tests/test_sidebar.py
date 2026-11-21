"""The panel's sidebar entry can be switched off and on from the panel."""
from __future__ import annotations

from homeassistant.components.frontend import DATA_PANELS
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component

from custom_components.easy_av_control.sidebar import async_register_panel


async def test_sidebar_switch(hass: HomeAssistant, hass_ws_client) -> None:
    assert await async_setup_component(hass, "http", {})
    assert await async_setup_component(hass, "frontend", {})
    assert await async_setup_component(hass, "easy_av_control", {})
    await async_register_panel(hass, "/easy_av_control_static/easy-av-control-panel.js?v=1")
    assert hass.data[DATA_PANELS]["easy-av-control"].sidebar_title == "Easy AV Control"

    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "easy_av_control/ui/sidebar"})
    assert (await client.receive_json())["result"] == {"visible": True}

    await client.send_json_auto_id({"type": "easy_av_control/ui/sidebar", "visible": False})
    assert (await client.receive_json())["result"] == {"visible": False}
    panel = hass.data[DATA_PANELS]["easy-av-control"]
    assert panel.sidebar_title is None  # still there, only not in the sidebar
    assert panel.config["_panel_custom"]["module_url"].endswith("?v=1")

    await client.send_json_auto_id({"type": "easy_av_control/ui/sidebar", "visible": True})
    assert (await client.receive_json())["result"] == {"visible": True}
    assert hass.data[DATA_PANELS]["easy-av-control"].sidebar_title == "Easy AV Control"


async def test_flow_details(hass: HomeAssistant, hass_ws_client) -> None:
    """What the Flow counts as a detail: entity IDs and waits by default, then what the panel sets."""
    assert await async_setup_component(hass, "easy_av_control", {})
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "easy_av_control/ui/get"})
    assert (await client.receive_json())["result"]["flow_details"] == ["entities", "waits"]
    await client.send_json_auto_id({"type": "easy_av_control/ui/flow_details", "details": ["notes", "entities"]})
    assert (await client.receive_json())["result"] == {"flow_details": ["entities", "notes"]}
    await client.send_json_auto_id({"type": "easy_av_control/ui/get"})
    assert (await client.receive_json())["result"]["flow_details"] == ["entities", "notes"]
