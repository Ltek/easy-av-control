# Changelog

## v2026.11.21.15

**Fixed**
- **The card showed "Pick a room in the card settings"** in Home Assistant's card editor and on a dashboard in
  edit mode. Home Assistant sets `preview` on every card it shows there, and the card took that for its own demo
  mode. The panel's Remote control preview now uses its own property; both draw with the same card.

**Added**
- **Live Flow on the card.** A Flow chip under the status shows the same Flow as the panel, for the running
  activity (or the one the power button starts). It opens by itself while the room starts or stops and marks
  each row: ✓ done, spinning while it runs, dimmed still to come. A Details chip shows or hides entities,
  actions and notes. Card options: `show_flow` (default on), `flow_details` (default off).
- **Device states in the Flow,** in the panel and on the card: each device's number and icons take the theme's
  colour for its state now (active, starting/stopping, off, error, unavailable), with its own word for it
  ("now: warming"). Outlets show whether they are on.

**Changed**
- The card editor's fields use the design guide's style.

## v2026.11.21.14

**Changed**
- The sidebar chip in the left menu is labelled **Editor in Sidebar**.

## v2026.11.21.13

**Added**
- **Flow: ✎ on every row** opens the panel the row comes from: a device's Device, Device state, Power Outlet,
  Waiting times or Connection check, or the activity's Checks, Actions after start or Advanced.
- **Editor in Sidebar** chip in the left menu: shows or hides Easy AV Control in Home Assistant's sidebar. Hidden, the
  panel stays at `/easy-av-control` and behind the integration's Configure.

**Changed**
- **Larger text** in the panel (nothing below 10px): the left menu, labels, hints and the Flow.
- **Fields in the design guide's style** everywhere in the panel: a label beside each control, native text
  boxes, dropdowns and checkboxes, sliders with a value readout. Home Assistant's own pickers (entity, area,
  icon) are bordered instead of filled.
- **+ Add room** is a + beside the ROOMS heading.
- **One highlighted menu item:** an open activity is highlighted instead of its room; a click on the room goes
  back to the room's page.
- **Guide** moved to the left menu, under Profiles. It opens in the right pane; Close goes back to where you were.

## v2026.11.21.12

**Added**
- **Checks** on every activity: what must be right before the activity counts as running, e.g. a picture on the
  Lumagen and on the projector. They run at the same time once every device is on, before the actions after
  start, and also when switching to the activity from another. A check uses the device's picture check from its
  profile, or an entity of your own and the values that mean it's right. Each has a timeout and "if it isn't
  right": warn and go on (default) or stop the activity. The Flow shows them as their own block.
- **JVC projector profile: picture check.** Source Display showing a resolution means a picture; *no signal* and
  *out of range* mean none. A profile's picture check can now list only the values that mean no picture.

**Changed**
- **Wait for a picture is no longer a step.** Existing Wait for a picture steps become checks when Home
  Assistant starts (config entry 2.2), with the same timeout. Detect integrations adds checks instead of steps.
- "Steps after power-on" is now **Actions after start**: only actions, run once the checks passed.

## v2026.11.21.11

**Added**
- **Activities in the left menu**, under their room. A click opens the activity; the icon beside it opens it
  at its Flow.
- **Power Outlet** (was "Power") has a checkbox. Unticked, the outlet and its boot time are greyed out and not
  used; ticking it again brings back the outlet it had.
- **Wait for a picture** says what it waits for (e.g. "Waits until Lumagen Input video status shows Active Video
  or Test Pattern"), or that the device has no picture check.

**Changed**
- An activity's **Devices** are a design-guide ordered list: + Device on top, numbered rows with the device's
  icon, entity, integration, move and delete. A click on a device opens it.
- **Settings in the card** lists what the card shows in a column per integration.
- Everything for the Remote control card sits under a **Remote control card** line at the bottom of the
  activity page (buttons, quick select, settings in the card, preview, extra buttons) and of the device page
  (settings in the card). Extra buttons have their own panel; Advanced keeps commands and actions.
- **Flow:** each device's number and name are in the theme's accent colour, the times in its active-state
  icon colour.
- "Start sequence" is now **Steps after power-on**, with a clearer explanation.

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
