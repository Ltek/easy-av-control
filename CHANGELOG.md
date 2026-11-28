# Changelog

## v2026.11.28.38

**Fixed**
- **The time at the right of a lane is how long the device took.** It was how far into the run the status first
  said on, so a device started late (the Shield, which waits for the JVC) read long though it came on in 2 s, and
  the JVC read less than the Shield. It is now counted from the moment the device was switched on until its status
  said on (JVC 36.8 s, Shield 1.7 s). A white tick on each lane marks when the device was switched on. A device that
  was on already says so, and one that never said on shows a dash.
- Lanes recorded by the previous build (without that moment) are made again from their trace when Reports opens.

## v2026.11.28.37

**Changed**
- **Measured times are until the status changed.** A wait is over once the status has held its new value for the
  debounce (2 s for most devices, 3 to 5 s for picture checks), and the time recorded included those seconds: the
  JVC read 38.8 s though its status changed to on at 36.8 s. The recorded time (Devices in Reports, Picture shown,
  Signal locked, the "usually N s" and the slow warning) now leaves the debounce out, so it agrees with the lanes.
  The wait itself is unchanged, and a suggested timeout adds the debounce back. The times already stored still
  include it, so a typical time is up to a debounce too long until they roll off (the last 10 per device).
  A failed wait is recorded as before (it ran to its timeout).

## v2026.11.28.36

**Changed**
- **Runs from before the colour lanes get them too.** The last 30 runs still have their trace (every state change
  of the room's entities, with times); when Reports opens, their lanes are rebuilt from it and kept. They use the
  devices as they are configured now: a device that was removed since, or a run whose room or activity is gone,
  keeps its bars. Runs older than the last 30 have no trace and keep their bars.

## v2026.11.28.35

**Changed**
- **Reports: the time line of a run shows each device's status.** One lane per device, coloured by what its status
  said during the run: off red, standby grey, starting / warming / shutting down yellow, idle blue, on green
  (unavailable hatched). The time on the right is until the status said on (the JVC's warming shows as yellow until
  it reads on), not how long Easy AV Control spent sending the command, which was 0.3 s for a device it doesn't
  wait for. The outlets, the checks and the actions after start are listed under the lanes as before; a check is
  not in a device's lane, because it doesn't hold up any device's power-on. Runs from before this build keep their
  bars.

## v2026.11.26.34

**Added**
- **The Flow in the panel shows how a running activity is getting on.** While the activity you have open starts, each
  row's icon turns **yellow** while it is in progress, **green** when it is done and **red** where the start failed;
  a finished start is all green, and rows still to come are dimmed. Startup colours while it starts, Shutdown while
  it stops (the tab follows when a run begins). Editing works as before. The colours follow the saved
  configuration of the running activity: an unsaved change to the Flow can shift them.

## v2026.11.26.33

**Added**
- **Checks are timed.** Reports → Devices shows, per device, how long it took to show its picture (*Picture shown*:
  the device's picture check, e.g. the JVC's Source Display or the Lumagen's input video) and to lock a signal
  (*Signal locked*: a check on an entity of your own, e.g. the StormAudio Stream Type for the audio), counted from
  switching the device on in that start, with the typical time and the deviation of each run, also when the check
  times out (with what it showed). A device that was on already is counted from the start of the check and left
  out of the typical time. The run's trace holds each check with its time.

## v2026.11.24.32

**Fixed**
- **Typing in a name field no longer jumps back.** Text and number fields were reset to the stored value whenever
  Home Assistant updated the page, which in a busy house happens several times a second, so a room or activity name
  could not be changed.

**Changed**
- **Header for a room and an activity.** The page starts with the name as a header, with the general settings under
  it: a room's area (and floor) and default activity, an activity's room, position and whether it is the default.
  The lock in the header opens them for editing; **Save** there applies and saves them, **Cancel** (or the lock)
  drops them. The General section of an activity is gone.
- An activity page has no **← Activities** button any more: the menu lists the activities under their room. A device
  page keeps **← Devices**.

## v2026.11.23.31

**Changed**
- **Quick Start has two tabs.** **System** holds what is needed once (a room, its devices, their status, no other
  automation switching them, the notifications blueprint and notifications, the card, the sidebar). **Activities**
  lists, per activity, what it needs on its own: its devices, a startup that worked, checks, Harmony Started by,
  auto-off. The page is no longer collapsible.
- The README gallery is built from `screenshots/` on GitHub (`scripts/update-screenshots.py` and
  `.github/workflows/update-screenshots.yml`). All screenshots moved there from `docs/images/`, and the panel pages
  were taken again with this build.

## v2026.11.23.30

**Changed**
- **A Flow holds devices and actions; a device is only what it is.** The connection check, boot time, the waits when
  turning on and off (status, fixed time, both or none, with timeout and how long a state must hold), what to do
  on failure, the cool-down and the later turn-off are now set per activity, with ✎ on the device in its Flow. The
  device page keeps the entity, name, remote, outlet, status source and profile, card settings and the Watchdog.
- Your setup is moved on update (configuration 2.3): every activity gets its devices' current values in its own
  Flow, so nothing runs differently. Changing a wait in one activity no longer changes any other.
- **Import** replaces only the activity's Flow: devices the room has (same entity) are left as they are, others are
  added; no confirmation. An export from an earlier build has these settings on its devices: they go into the
  imported activity's Flow.

## v2026.11.23.29

**Added**
- **Quick Start**, as in House Modes & Alarm Center: at the top of Setup in the menu, and the first page while
  there is no room. Chips for what is set up (rooms, devices, activities, runs, alerts), then **Your setup**: a
  room, your AV devices (with what Detect integrations still finds), each device's status, an activity, **no other
  automation switching the AV devices** (it names yours that do, each opening in a new tab), a startup that worked,
  checks, Harmony Started by, auto-off, the notifications blueprint, notifications, the card on a dashboard (checked
  in the browser), and the editor in the sidebar. Each step is done, to apply, for you or optional, with a link to
  the page for it. **Apply** does the automatic ones and changes nothing that exists.

## v2026.11.23.28

**Changed**
- **Import replaces** instead of merging: an activity of the same name, and every device with the same entity, are
  replaced completely by the file's. When other activities use a replaced device, it asks first and names them.
  Before, an import kept the room's devices as they were and added the activity beside the old one with the same
  name.

**Added**
- **Import as a copy**: adds the activity beside the old one as "Name 2" (3, …), without its Started by.

## v2026.11.23.27

**Added**
- **Enabled** switch beside an activity's name. A disabled activity (`enabled: false`) can't be started: the
  start action refuses it, the card and the Scene select leave it out, its scene is unavailable, Started by ignores
  it and it is never the default activity. It is crossed out in the menu and marked in the Activities list.
- **Entities** on the Reports page: per room, the entities Easy AV Control makes and the ones it relies on, each
  with what it is for and its state now.

## v2026.11.22.26

**Added**
- **Export and Import of activities.** **Export** on an activity's page, **Export all** and **Import** on the
  Activities tab. An export is JSON (copy or download) with the activities and every device they use. Import (paste
  or choose the file) adds them to the room: a device with the same entity as one of the room's is that device, the
  others are added, taken IDs get new ones and every reference follows. Started by is left out when another activity
  of the room already starts on that entity. Nothing is stored until Save.

## v2026.11.22.25

**Changed**
- **Watchdog** is a tab on the room's page (Devices, Activities, Watchdog, YAML) instead of an entry in the menu
  among the activities.
- **Edit** on the Notifications page opens the automation in a new browser tab.

## v2026.11.22.24

**Changed**
- One word per idea: **Checks** run once during Startup; **Monitoring** watches an activity while it is active;
  **Watchdog** watches the room outside its activities.
- **Watchdog** is a page per room in the menu, under its activities: what is wrong now (with the actions), and
  each device's watch setting in one list. The device page no longer has a Monitor panel.
- The Flow's "While active" view is **Monitoring**, and shows only the activity's own items. Picture lost is now
  the activity's **Checks** kept running: each check has **Keep checking while active** (on by default).
- `easy_av_control.monitor_action` is now **`easy_av_control.problem_action`**; the old name still works. Alerts
  made from the Notifications page call the new name. Each problem sensor has a `scope` attribute (watchdog or
  monitoring), and the Notifications page groups its offers by it.

## v2026.11.22.23

**Added**
- **Duplicate** on an activity's page: an unsaved copy named "… (copy)", opened at once. Started by is left out, so
  the copy doesn't start together with the original.
- **Arrows** in the Flow to move a device earlier or later, in Startup and in Shutdown (Shutdown runs the devices in
  reverse, so its arrows move them the other way in the list), and to reorder the actions after start and the checks.

**Changed**
- The Flow's **+** buttons are at its top, without the "Add to the startup" line.
- "Flow options" is now **Flow Details Filters**.

**Fixed**
- A device not saved yet had no state chip in the Flow; the panel now sends the devices as edited.
- A Harmony hub (any select device) without its profile read `power_off` as on.

## v2026.11.22.22

**Added**
- **Notifications** page: one ready-made alert per room and monitor problem. **Create** makes a native Home
  Assistant automation from the Smart Repeating Alerts blueprint for the phones you tick. It notifies when the
  problem's sensor turns on and clears the notification when it turns off. Its buttons (Turn off, Keep on, Shut
  down, Turn on, Dismiss, as the problem allows) only call `easy_av_control.monitor_action`: the integration does
  what they ask. A device error repeats every hour; the others notify once.
- The Smart Repeating Alerts blueprint (2026.11.13.44) ships with Easy AV Control. It is installed in
  `blueprints/automation/LTek/` at startup, or updated when the file there is ours and older, the same way House
  Modes & Alarm Center does it; another file at that path is never replaced.

## v2026.11.22.21

**Added**
- **Monitor**: between startups and shutdowns, the devices are checked every few seconds. Each kind of problem is
  a binary sensor per room (`binary_sensor.av_<room>_…`), on while it lasts:
  - **Device on unexpectedly**: a device is on while nothing uses it, after 2 min. Set per device in its new
    **Monitor** panel: notify (default), notify then turn it off after a time, or don't watch.
  - **Device lost** / **Picture lost**: while the activity is active, a device is off or unreachable, or a check
    fails, for 60 s.
  - **Left on** (auto-off, off by default): nothing has played for a time; the activity shuts down after a warning.
  - **Device error**: a device reports an error state.
- The Flow's new **While active** view shows and edits what the monitor watches; ✎, the trash icon and + work as
  in Startup and Shutdown.
- `easy_av_control.monitor_action`: what to do about a problem (turn off, turn on, keep on, shut down, dismiss).
  The integration does it; a notification button only calls this. Each sensor lists its actions. The
  `easy_av_control_monitor` event reports every change.

## v2026.11.22.20

**Added**
- **Started by**, per activity, in its Flow: entities whose state starts the activity, and optionally shuts it
  down. A Harmony hub's Activities select fills in its activity and `power_off` by itself, so the Harmony remote's
  activity button starts the activity and its off button shuts it down. Works for a wall switch or an
  `input_boolean` too. Changes from or to unavailable (a reconnect) are ignored, and so are changes that match
  what the room does already, such as the hub switching to its activity because this activity's startup selected
  it. The run's trace and Reports export say what started it.

## v2026.11.22.19

**Changed**
- **The Flow is the activity's editor**, at the top of its page. ✎ on a line opens its settings in place under it:
  a device's order, what it waits for before it is turned on, and its own settings; the checks; the actions after
  start; the actions on start and stop. The trash icon removes a line: a device from the activity, a wait, a check,
  an action. **+** under the Flow adds a device, a check or an action. The separate Devices, Checks and Actions
  after start panels are gone, and the actions on start and stop moved out of Advanced.
- A device's state chip in the Flow says what the state means (on, off, starting …); its raw value is the tooltip.
  A Lumagen in standby showed "unavailable", which is its sensor's normal state then.

**Added**
- **Before turning it on**, per device of an activity: a delay, then other devices of the activity to wait for,
  all at once, until they are on or show a picture; with a timeout and what to do then (go on or stop).
- **No wait** for a device (`wait_on: none`, or the trash icon on its wait in the Flow): it is turned on and the
  next one follows at once, so devices boot together. Its time is still measured for Reports.
- **Turn off after** a shutdown (`turn_off_after`): the device goes off that long after the shutdown, in the
  background. For seats or lights; a new startup within that time keeps it on.
- **Logitech Harmony Hub** profile: its Activities select is a device. Startup selects its activity (`option`,
  without one the hub's first), Shutdown selects `power_off` (`off_option`).

**Fixed**
- An action after start added in the panel had no device until one was picked, so the configuration was invalid
  and the Flow showed nothing. It now starts with the activity's first device.
- Renaming a device now also renames it in the activity's checks.

## v2026.11.22.18

**Fixed**
- **A device that was unreachable for a moment was not turned on.** When its power entity was unavailable at
  the instant Easy AV Control got to it (the integration had just lost its connection, or was reloading), the
  turn-on was skipped with a warning. Now it waits for the entity to come back, up to the device's connection
  timeout (30 s without one); reloads its integration once if it takes over 10 s; and turns it on once it has
  stayed reachable for 2 s. Its measured time starts after that wait.

**Added**
- **Export** on the Reports page: a JSON report to download (and copied to the clipboard): the runs, each with
  its **trace**, the device times, the rooms as configured, the profiles' entities' states now, and the versions
  of Home Assistant, Easy AV Control and every integration involved. An opened run has its own export.
- **Run traces** for the last 30 runs: in order and timed, what the run was busy with, every service call with
  its result and duration, every state change of the room's entities (device, status, outlets, remotes,
  connection and picture checks) with whether the integration reported the entity available, waits for an
  unreachable device, reloads and warnings; and every such entity's state and attributes at the start and end.
- **Startup** and **Shutdown** buttons beside an activity's name in the panel. Startup must be held for 3
  seconds and runs the activity as saved; Shutdown runs on a tap.

**Changed**
- "Start" / "Stop" are **Startup** / **Shutdown** in the Reports page and the Flow.

## v2026.11.22.17

**Added**
- **Reports** in the left menu, under Setup. Two panels:
  - **Runs:** every start and stop, grouped by room · activity (and, for a start, the activity it switched
    from), with the typical time, fastest to slowest, failures and a bar chart of the runs over time. Each run
    shows when it was, its total, how far it was from the typical time and its result; opened, its phases on one
    time line: each device, the outlets, the checks, the actions.
  - **Devices:** per device, how long it took to come on and to go off: typical, fastest to slowest, a bar chart,
    and every time with the room and activity it was for, slow ones and failures marked.
- The history is kept in `.storage/easy_av_control.history`: the last 300 runs and 100 times per device.
  Times are measured while Easy AV Control switches, as before; failed waits are now kept too. **Clear** empties
  it (the typical times used for timeouts stay).

## v2026.11.21.16

**Fixed**
- **Remote control preview showed "Pick a room in the card settings".** The preview used whatever card the
  browser had loaded for the dashboard, which can be an older cached build. It now draws with the panel's own
  copy of the card.

**Added**
- **Flow options** at the top of the panel's Flow: what counts as a detail (entity IDs and actions, waits,
  notes, reloads, outlets, actions on start and stop; entity IDs and waits by default). Details off hides them,
  in the panel (its new Details chip) and on the card. The choice is kept for the whole installation.
- **Failed steps** in the card's live Flow: the step a start stopped at is marked red.

**Changed**
- **Flow colours:** times in the theme's secondary text colour, device names in its accent colour; a step's
  number and icon turn yellow while it runs, green when done and red when it failed.
- **A device's state** is a colour-coded chip right beside its name, instead of "now: …".
- Wording: "Switch on/off" is now "Turn on/off", "the state must hold" is "state must hold".

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
