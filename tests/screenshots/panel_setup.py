"""Write a fresh Home Assistant config for the panel screenshots (demo user, fake devices).

Used by panel_run.sh:  python panel_setup.py <config dir> <repo root>
"""
import json
import os
import sys
from pathlib import Path

CONFIG = """homeassistant:
  name: Demo Home
  unit_system: metric
  time_zone: America/Denver
  currency: USD
  country: US
  latitude: 0
  longitude: 0
  elevation: 0
  language: en
frontend:
config:
http:
  server_port: {port}
api:
av_demo:
logger:
  default: warning
  logs:
    custom_components.easy_av_control: info
"""


def main():
    config_dir = Path(sys.argv[1])
    repo = Path(sys.argv[2]).resolve()
    port = os.environ.get("HA_PORT", "8125")
    (config_dir / ".storage").mkdir(parents=True, exist_ok=True)
    (config_dir / "custom_components").mkdir(exist_ok=True)
    for name, target in (
        ("easy_av_control", repo / "custom_components" / "easy_av_control"),
        ("av_demo", repo / "tests" / "screenshots" / "av_demo"),
    ):
        link = config_dir / "custom_components" / name
        if not link.exists():
            link.symlink_to(target)
    (config_dir / "configuration.yaml").write_text(CONFIG.format(port=port))
    # The demo room as JSON for panel_capture.mjs (YAML anchors resolved here)
    import yaml

    room = yaml.safe_load((repo / "tests" / "screenshots" / "room.yaml").read_text())
    (config_dir / "room.json").write_text(json.dumps(room))
    (config_dir / ".storage" / "onboarding").write_text(
        json.dumps({"version": 4, "minor_version": 1, "key": "onboarding",
                    "data": {"done": ["user", "core_config", "analytics", "integration"]}})
    )


if __name__ == "__main__":
    main()
