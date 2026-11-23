#!/usr/bin/env bash
# Screenshots of the configuration panel from a real Home Assistant with the fake devices of av_demo/:
#   PYTHON=/path/to/venv/bin/python tests/screenshots/panel_run.sh [out dir]
# PYTHON needs homeassistant and home-assistant-frontend. Node needs playwright-core (PLAYWRIGHT_CORE can point
# to its index.mjs) and Chromium (CHROME, else Playwright's own).
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../.." && pwd)"
PYTHON="${PYTHON:-python3}"
export HA_PORT="${HA_PORT:-8125}"
export HA_URL="http://127.0.0.1:${HA_PORT}"
export OUT="${1:-$REPO/screenshots}"
CONFIG="$(mktemp -d)"
cleanup() { [ -n "${HA_PID:-}" ] && kill "$HA_PID" 2>/dev/null || true; wait 2>/dev/null || true; [ -n "${KEEP:-}" ] && cp "$CONFIG/home-assistant.log" "$KEEP" ; rm -rf "$CONFIG"; }
trap cleanup EXIT
"$PYTHON" "$HERE/panel_setup.py" "$CONFIG" "$REPO"
"$PYTHON" -m homeassistant --script auth -c "$CONFIG" add demo demo >/dev/null
# From the config folder: run from the repo, Python would import the repo's custom_components (which has no
# av_demo) instead of the config's
# A brand-new config doesn't set up custom integrations on its very first start: start once, then for real.
cd "$CONFIG"
"$PYTHON" -m homeassistant -c "$CONFIG" >"$CONFIG/first-start.log" 2>&1 &
HA_PID=$!
for _ in $(seq 1 120); do curl -s -m 2 -o /dev/null "$HA_URL/" && break; sleep 2; done
sleep 20
kill -INT "$HA_PID"; wait "$HA_PID" 2>/dev/null || true
"$PYTHON" -m homeassistant -c "$CONFIG" >"$CONFIG/home-assistant.log" 2>&1 &
HA_PID=$!
cd "$REPO"
for _ in $(seq 1 120); do curl -s -m 2 -o /dev/null "$HA_URL/" && break; sleep 2; done
if [ "${README:-}" = 1 ]; then
  # The README images (tests/screenshots/capture.py; SHOTS_PYTHON needs playwright, pillow, pyyaml)
  AVS_HA_URL="$HA_URL" AVS_HA_USER=demo AVS_HA_PASSWORD=demo "${SHOTS_PYTHON:-python3}" "$HERE/capture.py" \
    || { tail -60 "$CONFIG/home-assistant.log"; exit 1; }
else
  ROOM_JSON="$CONFIG/room.json" node "$HERE/panel_capture.mjs" || { tail -60 "$CONFIG/home-assistant.log"; exit 1; }
fi
grep -E "ERROR|Traceback" "$CONFIG/home-assistant.log" | grep -i -E "easy_av_control|av_demo" | head -20 || true
