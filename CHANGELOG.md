# Changelog

## v2026.11.21.10

**Fixed**
- **The card no longer 404s while Home Assistant starts.** The card was served only from the integration's own
  path, which exists once Easy AV Control is set up, so a dashboard opened during HA's start (or the Companion
  App reconnecting) got a 404 and "Custom element doesn't exist: easy-av-control-card". The card is now copied
  to `<config>/www/easy_av_control/` (only when it changed) and the dashboard resource points at
  `/local/easy_av_control/easy-av-control-card.js`, which HA serves from its start. The existing resource is
  updated in place, not added a second time. The old path keeps working as a fallback and for the sidebar panel.

**Restart Home Assistant after updating.** If `<config>/www` didn't exist, it is created now and HA starts
serving it from the next restart, so that case needs a second restart before the resource moves to `/local/`.

## v2026.11.21.9

**Added**
- **Profile form:** profiles are edited in a form instead of only YAML (YAML stays one click away). Panels for
  General, Status, Timing, Remote / outlet / settings, Picture check and Jobs, one open at a time. Entities are
  picked on a real device of the integration and stored the way any Home Assistant finds them (type and
  translation key, else the unique-ID suffix or device class), never by entity ID. State values are chips:
  the values the picked entity can show are offered (a value already used in another group isn't), and any
  other can be typed. Built-in profiles open in the same form, read only.

## v2026.11.21.8

**Changed**
- **Detect integrations:** "New devices" is now **Detected devices**, grouped by Home Assistant area, each area
  with its room, the activities to add to and **Select all**. Nothing is ticked until you tick it (renamed
  entities stay ticked: it's the same entity). Each device shows a chip that opens its profile, a chip per
  integration (the one used for its state in blue) and a coloured power-on order chip (early, middle, late).
  **Apply**, **Detect again** and the new-activity option are at the top.
- **Create a new Activity per Room using the selected Devices** (replaces one activity per source): each room
  that gets detected devices and has no activities gets one, named after the room, with those devices in
  their power-on order.
- **One panel open at a time** on the room, device and activity pages.
- **Star on GitHub, Report an issue and the version** are at the bottom of the panel's menu, and nowhere
  else in the panel.

## v2026.11.20.7

**Added**
- **Measured times:** each status wait that succeeds records how long the device took to come on or go off (the
  last 10 per device, kept through restarts). The device page shows them, with **Use measured timeouts**
  (half as long again as usual, and longer than the slowest seen). The flow view uses the usual time as the
  earliest ("usually 42 s"). A start far slower than usual (more than twice, and 10 s over) is a warning.

## v2026.11.20.6

**Changed**
- **README screenshots retaken** from a real Home Assistant with the made-up demo devices, showing Easy AV
  Control and the new panel look; new ones of a device page, the Profiles page and Detect integrations.
- `tests/screenshots/panel_run.sh` starts a fresh Home Assistant with the demo devices and takes them (README=1
  for the README images, else every panel page in both themes). See Development in the README.

## v2026.11.20.5

**Added**
- **Detect integrations** in the panel, any time: new AV devices no room uses (one per physical device, with the
  best integration for each job, its outlet, and the activities to add it to at the place its profile gives in
  the power-on order), better integrations for devices in rooms, missing entities with a replacement from the
  same device, renamed entities, and integrations without a profile. Apply shows the result as unsaved changes.
- **Starter activities** for new rooms: one per source, with the room's displays and audio.
- **+ Profile** for an integration without one: a draft from its device, and **Learn**, which records what the
  device shows while you turn it on and off and fills in its states.
- **Wait for a picture** step (`wait_picture`): waits for the device's picture check (Lumagen *Active Video*);
  added automatically with a Lumagen. `on_failure: {picture: warn | stop}`.
- Easy AV Control remembers each entity a room uses (`.storage/easy_av_control.seen`), so a removed or renamed
  one can still be traced to its device. The Repair for a missing entity points to Detect integrations.

## v2026.11.20.4

**Added**
- **Profiles page** in the panel: every built-in profile (locked, with a summary, a read-only view and
  **Duplicate**) and your own (edit as YAML, duplicate, delete). **Export** and **Import** as text; an import
  never replaces a profile you have (a taken ID gets a new one). Your own profile for an integration is used
  instead of the built-in one; a device can name one with `profile: <id>`.
- **Device state** on every device page: what was **Detected** (the profile, the status entity, its state now,
  the remote, outlet and settings it found, and which integration does which job for a device several cover),
  **Use these** for the remote and outlet, and the status settings: profile, status (automatic / none), wait
  for when turning on and before cutting the outlet, timeouts, debounce, and what to do when the device
  doesn't come on or go off. Only what differs from the profile is written.
- **The flow view** shows the status waits ("Wait until Projector says it's on, at most 2:00") and outlets cut
  once their devices say they're off.

**Changed**
- **Every settings page follows the Ltek card design** (the panel, the profile pages and the card editor):
  panels with an accent border when open, list rows with action icons, a trash icon for delete, the dashed
  **+ Add** at the top of each list, sliders for every time, and the Star / Report links.

## v2026.11.20.3

**Added: waiting for the devices' own states**
- **Turning on waits until the device says it's on**, instead of a fixed time: the JVC projector's *warming* →
  *on*, StormAudio's *initializing* → *on*, the Lumagen's sensors coming up, PiPup's screen. Found automatically
  from the integration's profile. The card shows the device's own word while it waits ("JVC Projector:
  warming").
- **The outlet is cut once the device says it's off** (JVC *cooling* → *standby*) instead of after a fixed
  cool-down.
- **Wait modes** per device, for turning on and off separately (`wait_on`, `wait_off`): `status`, `time` (the
  fixed delays, as before) or `both` (the state, then the fixed time on top).
- **Debounce**: a state must hold (2 s by default) before it counts, so a flicker doesn't end a wait.
- **When a check fails** (no state in time, or the device reports an error), per device (`on_failure`): `warn`
  and go on (default), `stop` the activity (when turning off: leave the outlet on), or `retry` once.
- A device that already says it's on, or is still warming up, isn't switched on again; one still cooling down
  is switched on once it's off. A remote button for a device that's warming up waits until it's on.
- `state_source` sets the watched entity, attribute and values by hand; `state_source: none` keeps fixed times.
- The readiness check (`ready`) can compare an **attribute** (`attribute: detailed_state`).

**Changed**
- **The room's select starts and stops in the background**, so whoever sets it (an automation, Plex Center's
  room hook) follows the room's sensor instead of waiting for the whole start. The `start_activity` and
  `stop_activity` actions still wait.

A device without a profile (or with `state_source: none`) works exactly as before.

## v2026.11.20.2

**Added** (groundwork, nothing changes in how activities run yet)
- **Integration profiles** in `custom_components/easy_av_control/profiles/`, one YAML file per integration:
  which entity says a device is on, what its states mean (on, starting, stopping, off, error), its remote
  entity and key names, power outlet, card settings, a picture check, timeouts, debounce, its place in the
  power-on order, and which jobs it does when several integrations cover one device.
  Built in: JVC projector (`jvc_projector_ha`), StormAudio, Lumagen, PiPup, Android TV (ADB), Android TV Remote,
  Google Cast, Yamaha MusicCast, and a generic media player. Entities are found on the device by domain and
  translation key, never by entity ID, so a profile works on any Home Assistant.
- **One physical device across integrations:** a TV covered by PiPup, ADB and Android TV Remote is recognised as
  one device by its shared MAC address or IP address.
- See [PLAN.md](PLAN.md) for what's next: waiting for the devices' own states, the Detected box, Detect
  integrations, and the redesigned panel.

## v2026.11.20.1

First build of **Easy AV Control (Ltek)**, a separate project based on
[AV Scenes](https://github.com/mkshb/hass-av-scenes) 0.7.0 by mkshb (MIT). AV Scenes' own history is in
[its changelog](https://github.com/mkshb/hass-av-scenes/blob/main/CHANGELOG.md).

- **New domain `easy_av_control`**, so it can't clash with AV Scenes on the same Home Assistant. The card is
  `custom:easy-av-control-card`, the panel is **Easy AV Control** in the sidebar, the actions are
  `easy_av_control.*`.
- **Installs from `main` through HACS:** the built remote control card and panel are part of the repository; no
  release archive.
- Versions follow `YYYY.MM.DD.BUILD`.
