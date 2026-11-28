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
    (config_dir / ".storage" / "easy_av_control.history").write_text(json.dumps(demo_history()))
    (config_dir / ".storage" / "onboarding").write_text(
        json.dumps({"version": 4, "minor_version": 1, "key": "onboarding",
                    "data": {"done": ["user", "core_config", "analytics", "integration"]}})
    )


def demo_history():
    """A made-up history for the Reports screenshots: three weeks of evenings in the living room."""
    import random
    from datetime import datetime, timedelta, timezone

    rnd = random.Random(7)
    runs, devices = [], {"media_player.av_receiver": [], "media_player.projector": [], "media_player.apple_tv": []}
    names = {"media_player.av_receiver": "AV receiver", "media_player.projector": "Projector",
             "media_player.apple_tv": "Apple TV"}
    usual = {"media_player.av_receiver": 6, "media_player.projector": 38, "media_player.apple_tv": 4}
    start = datetime(2026, 11, 1, 19, 0, tzinfo=timezone.utc)
    for day in range(21):
        at = start + timedelta(days=day, minutes=rnd.randint(0, 90))
        activity, label = ("movie", "Movie") if day % 3 else ("tv", "TV")
        phases, t = [{"kind": "outlets_on", "start": 0, "seconds": 0.4}], 0.4
        failed = day == 13
        for entity in ("media_player.av_receiver", "media_player.projector", "media_player.apple_tv"):
            took = round(usual[entity] * rnd.uniform(0.85, 1.25) + (25 if day == 9 and "projector" in entity else 0), 1)
            ok = not (failed and "projector" in entity)
            if not ok:
                took = 90.0
            phases.append({"kind": "device", "device": entity.split(".")[1], "name": names[entity],
                           "start": round(t, 1), "seconds": took, **({} if ok else {"result": "error"})})
            devices[entity].append({"at": (at + timedelta(seconds=t)).isoformat(), "direction": "on", "seconds": took,
                                    "result": "ok" if ok else "timeout", "name": names[entity],
                                    "room_name": "Living room", "activity_name": label,
                                    **({"slow": True} if took > usual[entity] * 1.8 and ok else {}),
                                    **({} if ok else {"value": "warming"})})
            if entity == "media_player.projector" and ok:
                # The projector's picture shows a while after it is on; the receiver's audio signal locks soon after
                for kind, source, extra in (("picture", "sensor.projector_source_display", 11), ("signal", "sensor.av_receiver_stream_type", 4)):
                    shown = round(took + extra * rnd.uniform(0.8, 1.3), 1)
                    devices[entity].append({"at": (at + timedelta(seconds=t + shown)).isoformat(), "direction": kind,
                                            "seconds": shown, "result": "ok", "name": names[entity],
                                            "source": source, "room_name": "Living room", "activity_name": label})
            t += took
            if not ok:
                break
        if not failed:
            phases.append({"kind": "steps", "start": round(t, 1), "seconds": 1.2})
            t += 1.2
        # What each device's status said during the run: off (the projector in standby), warming, on
        lanes, begin = [], 0.4
        for ph in [p for p in phases if p["kind"] == "device"]:
            went_on = ph["start"] + ph["seconds"]
            off_word, on_word = ("standby", "on") if ph["device"] == "projector" else ("off", "on")
            segs = [{"start": 0.0, "end": round(ph["start"], 1), "value": off_word, "group": "off"},
                    {"start": round(ph["start"], 1), "end": round(went_on, 1),
                     "value": "warming" if ph["device"] == "projector" else "starting", "group": "starting"}]
            if "result" not in ph:
                last = round(max(t, went_on), 1)
                if ph["device"] == "apple_tv" and last - went_on > 2:
                    mid = round(went_on + (last - went_on) / 2, 1)
                    segs += [{"start": round(went_on, 1), "end": mid, "value": on_word, "group": "on"},
                             {"start": mid, "end": last, "value": "idle", "group": "on"}]
                else:
                    segs.append({"start": round(went_on, 1), "end": last, "value": on_word, "group": "on"})
            lanes.append({"device": ph["device"], "name": ph["name"], "entity_id": f"media_player.{ph['device']}",
                          "segments": [x for x in segs if x["end"] > x["start"]]})
        runs.append({"at": at.isoformat(), "room": "living_room", "room_name": "Living room", "activity": activity,
                     "activity_name": label, "mode": "start", "seconds": round(t, 1), "phases": phases, "lanes": lanes,
                     "result": "error" if failed else ("warning" if day == 9 else "ok"),
                     **({"error": "Projector: not on after 90 s, it shows warming"} if failed else {}),
                     **({"warnings": ["Projector took 70 s to come on (usually 40 s)"]} if day == 9 else {})})
        stop_at = at + timedelta(hours=2)
        off = round(rnd.uniform(4, 7), 1)
        runs.append({"at": stop_at.isoformat(), "room": "living_room", "room_name": "Living room", "activity": activity,
                     "activity_name": label, "mode": "stop", "seconds": off, "result": "ok",
                     "phases": [{"kind": "device", "name": "Apple TV", "start": 0, "seconds": 0.3},
                                {"kind": "device", "name": "Projector", "start": 0.3, "seconds": 0.3},
                                {"kind": "outlets_off", "start": 0.6, "seconds": round(off - 0.6, 1)}]})
        devices["media_player.projector"].append({"at": stop_at.isoformat(), "direction": "off",
                                                  "seconds": round(rnd.uniform(150, 200), 1), "result": "ok",
                                                  "name": "Projector", "room_name": "Living room",
                                                  "activity_name": label})
    return {"version": 1, "minor_version": 1, "key": "easy_av_control.history",
            "data": {"runs": runs, "devices": devices}}


if __name__ == "__main__":
    main()
