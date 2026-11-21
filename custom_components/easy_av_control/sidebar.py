"""Settings of the panel and the card's look, kept in ``.storage/easy_av_control.ui``.

- The configuration panel's sidebar entry, which the panel can switch off and on. Hidden, the panel stays
  at /easy-av-control and behind the integration's Configure; only the sidebar link goes.
- What the Flow counts as a detail: shown only with Details on (the card's chip, the panel's).
"""
from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store

from .const import DOMAIN, PANEL_URL_PATH

_STORE = f"{DOMAIN}.ui"
_DATA = f"{DOMAIN}_ui"
_MODULE = f"{DOMAIN}_panel_module"

# What the Flow can hide as a detail; entity IDs and waits by default
FLOW_DETAILS = ["entities", "waits", "notes", "reloads", "outlets", "hooks"]
DEFAULT_FLOW_DETAILS = ["entities", "waits"]


async def _async_ui(hass: HomeAssistant) -> dict[str, Any]:
    if (ui := hass.data.get(_DATA)) is None:
        store: Store[dict[str, Any]] = Store(hass, 1, _STORE)
        ui = hass.data[_DATA] = {"store": store, "data": await store.async_load() or {}}
    return ui


async def async_sidebar_visible(hass: HomeAssistant) -> bool:
    return bool((await _async_ui(hass))["data"].get("sidebar", True))


async def async_register_panel(hass: HomeAssistant, module_url: str | None = None) -> None:
    """Register (or register again) the panel, in the sidebar unless it was switched off."""
    # Imported late: the frontend is only an after-dependency
    from homeassistant.components import frontend, panel_custom

    if module_url is not None:
        hass.data[_MODULE] = module_url
    if (module_url := hass.data.get(_MODULE)) is None:
        return
    visible = await async_sidebar_visible(hass)
    if PANEL_URL_PATH in hass.data.get(frontend.DATA_PANELS, {}):
        frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name="easy-av-control-panel",
        sidebar_title="Easy AV Control" if visible else None,
        sidebar_icon="mdi:remote-tv" if visible else None,
        module_url=module_url,
        require_admin=True,
        config_panel_domain=DOMAIN,
    )


async def async_flow_details(hass: HomeAssistant) -> list[str]:
    details = (await _async_ui(hass))["data"].get("flow_details")
    return list(DEFAULT_FLOW_DETAILS if details is None else details)


@callback
def async_setup_ws(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_sidebar)
    websocket_api.async_register_command(hass, ws_ui_get)
    websocket_api.async_register_command(hass, ws_flow_details)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/ui/get"})
@websocket_api.async_response
async def ws_ui_get(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """The settings the card and the panel draw with (any user)."""
    connection.send_result(
        msg["id"],
        {"sidebar": await async_sidebar_visible(hass), "flow_details": await async_flow_details(hass)},
    )


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/ui/flow_details", vol.Required("details"): [vol.In(FLOW_DETAILS)]}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_flow_details(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Set what the Flow counts as a detail."""
    ui = await _async_ui(hass)
    ui["data"]["flow_details"] = [d for d in FLOW_DETAILS if d in msg["details"]]
    await ui["store"].async_save(ui["data"])
    connection.send_result(msg["id"], {"flow_details": ui["data"]["flow_details"]})


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/ui/sidebar", vol.Optional("visible"): bool}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_sidebar(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Whether the panel is in the sidebar; with ``visible``, change it first."""
    ui = await _async_ui(hass)
    if "visible" in msg and msg["visible"] != ui["data"].get("sidebar", True):
        ui["data"]["sidebar"] = msg["visible"]
        await ui["store"].async_save(ui["data"])
        await async_register_panel(hass)
    connection.send_result(msg["id"], {"visible": await async_sidebar_visible(hass)})
