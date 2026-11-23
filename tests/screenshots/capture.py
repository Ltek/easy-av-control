#!/usr/bin/env python3
"""Take the README screenshots in the development Home Assistant.

Usage:  python3 tests/screenshots/capture.py [--headed] [--only NAME ...] [--theme light|dark]

Logs into HA-Dev with a browser, writes the living room from ``room.yaml``
into the Easy AV Control entry (other rooms stay as they are) and a dashboard
``easy-av-control-demo`` with the card, then drives the card and the configuration
panel. The room's devices are the fake ones of ``av_demo``, so nothing real
is switched. Images go to screenshots/, those of the dark theme with -dark.

Setup in HA-Dev, once:
  - this repository's custom_components/easy_av_control (with the built frontend)
    and tests/screenshots/av_demo in its custom_components
  - ``av_demo:`` in its configuration.yaml, then a restart
  - an admin user: AVS_HA_USER / AVS_HA_PASSWORD, exported or in
    tests/screenshots/.env (KEY=VALUE per line, gitignored)
  - AVS_HA_URL (default http://localhost:8123)
"""
from __future__ import annotations

import argparse
import io
import os
from pathlib import Path
import time

from PIL import Image
from playwright.sync_api import Page, sync_playwright
import yaml

HERE = Path(__file__).resolve().parent
OUT = HERE.parents[1] / "docs" / "images"
ROOM = "living_room"
DASHBOARD = "easy-av-control-demo"
OUTLETS = ["switch.av_rack_outlet", "switch.projector_outlet"]
# preview shows the live state of Movie, which card leaves running; dpad switches to TV
SHOTS = ("card", "settings", "panel", "flow", "preview", "dpad")
THEMES = ("light", "dark")


def load_env() -> None:
    env = HERE / ".env"
    if env.exists():
        for line in env.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key.strip(), value.strip())


load_env()
HA_URL = os.environ.get("AVS_HA_URL", "http://localhost:8123").rstrip("/")
USER = os.environ.get("AVS_HA_USER")
PASSWORD = os.environ.get("AVS_HA_PASSWORD")


# --- Home Assistant -------------------------------------------------------------


def login(page: Page) -> None:
    page.goto(f"{HA_URL}/", wait_until="networkidle", timeout=60000)
    page.wait_for_selector("input[name=username]", timeout=30000)
    page.fill("input[name=username]", USER)
    page.fill("input[name=password]", PASSWORD)
    page.keyboard.press("Enter")
    page.wait_for_function("() => !!document.querySelector('home-assistant')?.hass?.states", timeout=60000)


def ws(page: Page, msg: dict):
    """A WebSocket command through the frontend's own connection."""
    return page.evaluate("(m) => document.querySelector('home-assistant').hass.callWS(m)", msg)


def call(page: Page, domain: str, service: str, data: dict | None = None) -> None:
    ws(page, {"type": "call_service", "domain": domain, "service": service, "service_data": data or {}})


def state(page: Page, entity_id: str) -> str | None:
    return page.evaluate("(id) => document.querySelector('home-assistant').hass.states[id]?.state ?? null", entity_id)


def wait_state(page: Page, entity_id: str, wanted: str, timeout: float = 60) -> None:
    end = time.monotonic() + timeout
    while state(page, entity_id) != wanted:
        if time.monotonic() > end:
            raise TimeoutError(f"{entity_id} did not become {wanted}")
        page.wait_for_timeout(250)


def activity_sensor(page: Page, timeout: float = 60) -> str:
    """The room's activity sensor; its entity ID depends on the instance's language."""
    end = time.monotonic() + timeout
    while True:
        try:
            entries = ws(page, {"type": "config/entity_registry/list"})
        except Exception:  # noqa: BLE001 - the connection drops while the integration reloads
            entries = []
        for entry in entries:
            if entry["platform"] == "easy_av_control" and entry.get("unique_id") == f"easy_av_control_activity_state_{ROOM}":
                if state(page, entry["entity_id"]) not in (None, "unavailable"):
                    return entry["entity_id"]
        if time.monotonic() > end:
            raise TimeoutError("the activity sensor of the demo room did not appear")
        page.wait_for_timeout(500)


def set_up(page: Page) -> None:
    """The demo room and the dashboard, rewritten on every run so their content is known."""
    try:
        config = ws(page, {"type": "easy_av_control/config/get"})
    except Exception:  # noqa: BLE001 - a fresh Home Assistant: set the integration up first
        flow = page.evaluate(
            "() => document.querySelector('home-assistant').hass.callApi('POST', 'config/config_entries/flow',"
            " {handler: 'easy_av_control'})"
        )
        page.evaluate(
            "(id) => document.querySelector('home-assistant').hass.callApi('POST', `config/config_entries/flow/${id}`, {})",
            flow["flow_id"],
        )
        page.wait_for_timeout(3000)
        config = ws(page, {"type": "easy_av_control/config/get"})
    room = yaml.safe_load((HERE / "room.yaml").read_text())
    if config["rooms"].get(ROOM) != room:
        rooms = {**config["rooms"], ROOM: room}
        ws(page, {"type": "easy_av_control/config/save", "rooms": rooms, "revision": config["revision"]})
        page.wait_for_timeout(2000)
        activity_sensor(page)  # a new room reloads the integration
    existing = ws(page, {"type": "lovelace/dashboards/list"})
    if not any(d.get("url_path") == DASHBOARD for d in existing):
        ws(page, {"type": "lovelace/dashboards/create", "url_path": DASHBOARD, "title": "Easy AV Control Demo",
                  "mode": "storage", "icon": "mdi:remote-tv", "show_in_sidebar": False, "require_admin": True})
    ws(page, {"type": "lovelace/config/save", "url_path": DASHBOARD, "config": {
        "views": [{"title": "Living room", "path": "living-room",
                   "cards": [{"type": "custom:easy-av-control-card", "room": ROOM}]}],
    }})


def reset(page: Page) -> None:
    """Room off, outlets off, blinds open: the state before a first start."""
    call(page, "easy_av_control", "stop_activity", {"room": ROOM})
    page.wait_for_timeout(1000)
    for outlet in OUTLETS:
        call(page, "switch", "turn_off", {"entity_id": outlet})
    call(page, "cover", "open_cover", {"entity_id": "cover.living_room_blinds"})
    # Drops the projector's cool-down, which the card would show
    call(page, "easy_av_control", "reload")
    page.wait_for_timeout(2000)
    activity_sensor(page)


# --- Screenshots ----------------------------------------------------------------


def image(name: str, theme: str, ext: str = "png") -> Path:
    return OUT / f"{name}{'-dark' if theme == 'dark' else ''}.{ext}"


def open_card(page: Page):
    """The card at phone width."""
    page.set_viewport_size({"width": 412, "height": 915})
    page.goto(f"{HA_URL}/{DASHBOARD}/living-room", wait_until="networkidle")
    element = page.locator("easy-av-control-card").first
    element.wait_for()
    page.wait_for_timeout(1500)
    return element


def card(page: Page, theme: str) -> None:
    """A start of Movie from off as GIF, then the running activity as PNG."""
    element = open_card(page)
    frames: list[tuple[Image.Image, float]] = []
    shot = lambda: Image.open(io.BytesIO(element.screenshot())).convert("RGB")
    frames.append((shot(), 1.5))
    sensor = activity_sensor(page)
    element.get_by_role("button", name="Movie").click()
    end = time.monotonic() + 60
    while time.monotonic() < end:
        frames.append((shot(), 0.25))
        if state(page, sensor) == "active":
            break
        page.wait_for_timeout(150)
    page.wait_for_timeout(1500)
    final = shot()
    frames.append((final, 3))
    final.save(image("card", theme))
    save_gif(frames, image("card", theme, "gif"), width=420)


def settings(page: Page, theme: str) -> None:
    """The device settings of the running Movie, opened."""
    element = open_card(page)
    # Tall enough for the whole opened card
    page.set_viewport_size({"width": 412, "height": 2000})
    toggle = element.get_by_role("button", name="Settings")
    toggle.click()
    page.wait_for_timeout(800)
    # The lower part of the card, with its border and padding
    card = element.locator("ha-card").bounding_box()
    top = element.locator(".settings").bounding_box()["y"] - 12
    page.screenshot(
        path=image("card-settings", theme),
        clip={"x": card["x"], "y": top, "width": card["width"], "height": card["y"] + card["height"] - top},
    )
    # Closed again, as every other image shows it
    toggle.click()


def dpad(page: Page, theme: str) -> None:
    """TV with arrow keys and the channel rocker of the satellite receiver."""
    element = open_card(page)
    sensor = activity_sensor(page)
    call(page, "easy_av_control", "start_activity", {"room": ROOM, "activity": "tv"})
    end = time.monotonic() + 90
    while not (state(page, sensor) == "active" and page.evaluate(
        "(id) => document.querySelector('home-assistant').hass.states[id].attributes.activity_id", sensor
    ) == "tv"):
        if time.monotonic() > end:
            raise TimeoutError("TV did not start")
        page.wait_for_timeout(500)
    page.wait_for_timeout(1500)
    element.screenshot(path=image("card-dpad", theme))


def save_gif(frames: list[tuple[Image.Image, float]], path: Path, width: int) -> None:
    size = max(f.size for f, _ in frames)
    # Shorter frames are padded with the page background around the card
    background = max(frames, key=lambda f: f[0].size[1])[0].getpixel((0, 0))
    scaled = []
    for frame, seconds in frames:
        canvas = Image.new("RGB", size, background)
        canvas.paste(frame)
        canvas = canvas.resize((width, round(size[1] * width / size[0])), Image.LANCZOS)
        scaled.append((canvas.quantize(colors=128, method=Image.Quantize.MEDIANCUT), seconds))
    first, *rest = scaled
    first[0].save(path, save_all=True, append_images=[f for f, _ in rest],
                  duration=[round(s * 1000) for _, s in scaled], loop=0, optimize=True)


def open_panel(page: Page, width: int = 1100, height: int = 800) -> None:
    page.set_viewport_size({"width": width, "height": height})
    page.goto(f"{HA_URL}/easy-av-control", wait_until="networkidle")
    page.locator("easy-av-control-panel").wait_for()
    page.get_by_role("button", name="Living room").first.click()
    page.wait_for_timeout(800)


def open_activity(page: Page, name: str) -> None:
    # Tall enough that a section fits without scrolling under the sticky toolbar
    open_panel(page, height=2600)
    page.get_by_role("tab", name="Activities").click()
    page.locator("button.ltek-item", has_text=name).first.click()
    page.wait_for_timeout(1000)


def section(page: Page, inner: str):
    """The panel section that holds an element, with its title and hint."""
    return page.locator("details.ltek-sec", has=page.locator(inner)).first


def panel(page: Page, theme: str) -> None:
    open_panel(page)
    page.screenshot(path=image("panel", theme))


def flow(page: Page, theme: str) -> None:
    open_activity(page, "Movie")
    page.wait_for_timeout(500)
    section(page, "easy-av-control-flow").screenshot(path=image("flow", theme))


def preview(page: Page, theme: str) -> None:
    open_activity(page, "Movie")
    element = section(page, "easy-av-control-remote-preview")
    element.locator("easy-av-control-remote-preview").get_by_role("button", name="Netflix").first.click()
    page.wait_for_timeout(500)
    element.screenshot(path=image("preview", theme))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--headed", action="store_true")
    parser.add_argument("--only", action="append", choices=SHOTS)
    parser.add_argument("--theme", action="append", choices=THEMES)
    args = parser.parse_args()
    if not USER or not PASSWORD:
        print("AVS_HA_USER and AVS_HA_PASSWORD are needed (exported or in tests/screenshots/.env)")
        return 2
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=not args.headed,
            args=["--no-sandbox", "--lang=en-US"],
            # CHROME: a Chromium of your own instead of Playwright's download
            **(
                {"executable_path": os.environ["CHROME"], "env": {**os.environ, "LD_LIBRARY_PATH": ""}}
                if os.environ.get("CHROME")
                else {}
            ),
        )
        try:
            for theme in args.theme or THEMES:
                context = browser.new_context(viewport={"width": 1280, "height": 900}, device_scale_factor=2,
                                              locale="en-US", color_scheme=theme)
                # The sidebar would show the development instance's own dashboards; the
                # theme is chosen per browser, so a profile setting does not interfere
                context.add_init_script(
                    "localStorage.setItem('dockedSidebar', JSON.stringify('always_hidden'));"
                    f"localStorage.setItem('selectedTheme', JSON.stringify({{theme: 'default', dark: {str(theme == 'dark').lower()}}}))"
                )
                page = context.new_page()
                try:
                    login(page)
                    set_up(page)
                    for name in args.only or SHOTS:
                        if name == "card":
                            reset(page)
                        globals()[name](page, theme)
                        print(f"{name} ({theme}): done")
                except Exception:
                    page.screenshot(path=OUT / "failed.png")
                    raise
                finally:
                    context.close()
        finally:
            browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
