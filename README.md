# Easy AV Control (Ltek)

[![Add to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Ltek&repository=easy-av-control&category=integration)

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.11%2B-41BDF5.svg)](https://www.home-assistant.io/)
[![License](https://img.shields.io/github/license/Ltek/easy-av-control.svg)](LICENSE)

**One button for the whole home cinema.** Activity-based AV control for Home Assistant — an open-source alternative to Logitech Harmony and Roomie Remote.

Based on [AV Scenes](https://github.com/mkshb/hass-av-scenes) by mkshb (MIT). History is in [CHANGELOG.md](CHANGELOG.md).

<p>
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/card.gif" alt="The remote control card starting the Movie activity, light theme" width="49%">
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/card-dark.gif" alt="The remote control card starting the Movie activity, dark theme" width="49%">
</p>

Easy AV Control controls the devices of a room (AV receiver, projector, TV, set-top box, lights, covers, power outlets) through named **activities** such as "TV" or "Movie". Starting an activity powers the devices it needs, waits until they are actually ready, applies sources, sound modes and volume, and runs any Home Assistant actions you attach. Switching to another activity only touches what differs; stopping shuts everything down in reverse order, with cool-down times and power outlets last.

---

## Why Easy AV Control

A script that switches on a receiver, a projector and a set-top box works until one of them takes longer to boot than its delay. Easy AV Control handles what such scripts get wrong:

- **No guessed delays.** Each device is switched on once its entity is actually available. Integrations that gave up while the device had no power are reloaded instead of waiting minutes for their retry.
- **Power outlets done right.** Devices on switched outlets boot in parallel. A projector keeps its power for its cool-down before the outlet is cut, and an outlet shared with another room stays on while that room needs it.
- **Switching, not restarting.** Going from TV to Music switches off the projector and the set-top box, changes the receiver's input and leaves it on.
- **One remote for every activity.** The dashboard card shows only what the running activity offers and sends volume to the receiver, channels to the set-top box and arrow keys to the Apple TV.
- **Set up in the UI.** Devices and activities are edited in a sidebar panel with Home Assistant's own pickers; a flow view shows step by step what a start, a switch and a stop will do before you save. YAML stays available.
- **Wall buttons and automations.** Every room is a switch, a select and a sensor; `toggle_activity` and `send_command` make a single push button or a volume rocker on the wall work like the remote.

---

## Screenshots

### Remote control card

Power, activities, start progress with what it is busy with, now playing, volume, d-pad or touch surface, channels, own buttons and device settings.

<p>
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/card.png" alt="Remote control card while an activity runs, light theme" width="49%">
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/card-dark.png" alt="Remote control card while an activity runs, dark theme" width="49%">
</p>

With arrow keys instead of the touch surface, here for a satellite receiver with its channel keys:

<p>
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/card-dpad.png" alt="Remote control card with arrow keys, light theme" width="49%">
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/card-dpad-dark.png" alt="Remote control card with arrow keys, dark theme" width="49%">
</p>

Below the buttons, the settings of the activity's devices: sound mode with favourites, tone controls and speaker levels of the receiver, the inputs of projector and Apple TV:

<p>
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/card-settings.png" alt="Device settings opened in the remote control card, light theme" width="49%">
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/card-settings-dark.png" alt="Device settings opened in the remote control card, dark theme" width="49%">
</p>

### Configuration panel

Rooms, devices and activities in the sidebar, each edited on its own page with help texts.

![Configuration panel with the devices and activities of a room, light theme](https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/panel.png)

![Configuration panel with the devices and activities of a room, dark theme](https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/panel-dark.png)

### Flow of an activity

What starting, switching and stopping do with the configuration you are editing, with the earliest and latest time of each row.

![Flow view of an activity in the configuration panel, light theme](https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/flow.png)

![Flow view of an activity in the configuration panel, dark theme](https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/flow-dark.png)

### Remote control preview

The card as it looks while the activity runs. A tap shows which device gets the button and what runs there instead of sending it.

![Remote control preview in the configuration panel, light theme](https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/preview.png)

![Remote control preview in the configuration panel, dark theme](https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/preview-dark.png)

### Device state

What was detected for a device (its profile, the entity that says it's on, its state now) and how to wait for
it: its status, a fixed time, or both, with timeouts, debounce, and what to do when it doesn't come on.

<p>
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/device.png" alt="A device page with its Detected box, light theme" width="49%">
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/device-dark.png" alt="A device page with its Detected box, dark theme" width="49%">
</p>

### Profiles

Built-in profiles (locked: duplicate one to change it) and your own, with export and import as text.

<p>
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/profiles.png" alt="The Profiles page, light theme" width="49%">
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/profiles-dark.png" alt="The Profiles page, dark theme" width="49%">
</p>

### Detect integrations

What's installed compared with what the rooms use: new devices, better integrations, missing and renamed
entities, and integrations without a profile. (The screenshots' made-up devices have no profile, so only the last
section shows.)

<p>
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/detect.png" alt="Detect integrations, light theme" width="49%">
  <img src="https://raw.githubusercontent.com/Ltek/easy-av-control/main/docs/images/detect-dark.png" alt="Detect integrations, dark theme" width="49%">
</p>

---

## Coming from Harmony

The concepts carry over almost one to one:

| Harmony | Easy AV Control |
|---------|-----------|
| Device | Device: entity, power outlet, readiness check, boot and cool-down time |
| Activity | Activity: its devices in power-on order, then steps |
| Power-on order and inter-device delay | Device order; readiness check instead of a fixed delay, `delay_after_on` where a device needs one |
| Inputs and settings of an activity | Steps: `set_source`, `set_sound_mode`, `set_volume` |
| Switching between activities | Smart switching: only devices the new activity does not use are switched off |
| Button mapping per activity | Button groups (`volume`, `channels`, `transport`, `navigation`) routed to a device per activity |
| Favorite channels and custom buttons | Extra buttons, quick select for inputs and apps |
| Help button for devices out of sync | Not needed: devices report their real state through their Home Assistant integrations, and a device that is already on is not toggled |
| Harmony remote | The card in the browser and the Home Assistant app, wall buttons through `toggle_activity` and `send_command` |

Devices that only understand infrared keep working through any Home Assistant integration that sends IR codes, such as a Harmony Hub or a Broadlink: an own command calls `remote.send_command` on it (see [Own commands and buttons](#own-commands-and-buttons)):

```yaml
devices:
  onkyo:
    entity_id: media_player.onkyo_receiver
    commands:
      volume_up:
        action: remote.send_command
        target: {entity_id: remote.harmony_hub}
        data: {device: Onkyo AV Receiver, command: VolumeUp}
```

---

## Features

| Feature | Description |
|---------|-------------|
| Device profiles | Each device is described once per room: entity, power outlet, readiness check, warm-up and cool-down time |
| Power outlets | Devices without standby power are supplied via a switch; shared outlets stay on as long as any device on them is needed, also by another room |
| Readiness check | Waits until a device's entity is available instead of guessing delays; reloads its integration to skip the `setup_retry` back-off |
| Cool-down | `delay_after_off` per device, e.g. 180 s for a projector before its outlet may be switched off |
| Smart switching | Devices the new activity does not use are switched off; shared devices stay on and are reconfigured |
| Hooks | `on_start` / `on_stop` take any Home Assistant actions — conditions, covers, lights, scripts |
| Cancelling | A stop during a long start takes effect immediately |
| Failure handling | A failed readiness check can abort the start; the room shows `error` with the reason |
| Restart-safe | The running activity survives a Home Assistant restart |
| Repairs | Entities that do not exist (typo, renamed entity) are reported in **Settings → Repairs** |
| Configuration panel | An admin page in the sidebar with a built-in guide: devices and activities as lists, each edited on its own page in short sections with help texts, using Home Assistant's own pickers; plus a YAML view |
| Remote control card | A dashboard card per room: power, activities, volume, d-pad, channels, playback, your own buttons and device settings such as source, sound mode or tone controls — only what the running activity offers |
| Command routing | `easy_av_control.send_command` sends a button (e.g. `volume_up`) to whichever device the running activity uses for it — from the card, automations or wall switches |
| 4 entity platforms | Scene, Switch, Sensor, Select — one virtual device per room |

---

## Installation

### HACS (recommended)

[![Add to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Ltek&repository=easy-av-control&category=integration)

1. Click **Add to HACS** above, or in HACS: three dots top right → **Custom repositories**, add
   `https://github.com/Ltek/easy-av-control`, category **Integration**
2. Find "Easy AV Control (Ltek)" and click **Download**
3. Restart Home Assistant

### Manual

Copy `custom_components/easy_av_control/` from this repository into `config/custom_components/` and restart Home
Assistant. The built remote control card and panel are included.

---

## Setup

1. **Settings** → **Devices & Services** → **+ Add Integration** → **Easy AV Control**
2. Open **Easy AV Control** in the sidebar (administrators only)
3. **Add room**, then add devices and activities and **Save**

### Configuration panel

The panel edits everything the [configuration](#configuration) below describes:

- **Devices** — entity and power outlet with Home Assistant's entity picker; boot time, wait times and readiness check as fields; own `commands` in a YAML field. Renaming a device ID updates every reference; a device that an activity still uses cannot be deleted.
- **Activities** — name, icon, position, devices in power-on order, steps (source and sound mode lists come from the device), remote button routing, and `on_start` / `on_stop` in Home Assistant's action editor, the same as in automations. The activity ID is part of the entity IDs and cannot be changed.
- **Flow** — on every activity's page: what a start, a switch from another activity or a stop does with this configuration, step by step: which outlets and devices are switched with which action, boot times, readiness checks with their timeout and what happens on a timeout, steps, the actions on start and stop, outlets cut in the background, and the earliest and latest time of each row. It follows every change before it is saved; see also [ACTIVITY_FLOW.md](ACTIVITY_FLOW.md).
- **Remote control preview** — on every activity's page: the card as it looks while the activity runs, following the button routing, quick select and extra buttons as you change them. Tapping a button sends nothing but shows which device gets it and what runs there (e.g. `remote.send_command "select"` on the Apple TV's remote). Buttons that would do nothing are listed, and every button group shows its device, whether it was chosen or automatic, and why it is missing.
- **YAML** — the whole room as YAML, for anything the forms do not cover.

**Save** checks the configuration first: errors are shown with their exact place, unknown entities of the room as a warning you can confirm. If the configuration was changed elsewhere in the meantime (a second browser, the YAML editor below), the panel asks you to reload instead of overwriting it.

### YAML editor in the integration options

**Configure** on the integration opens the same configuration as YAML: **Add room**, **Edit room**, **Delete room** and **Edit whole configuration**, which shows all rooms as one YAML document — handy for backups and copying activities between rooms.

Every save is validated. Errors name the exact place, e.g. `rooms.wohnzimmer.activities.tv.devices.0: unknown device 'vu'`. Entities that do not exist in Home Assistant are listed as warnings that you can confirm or go back and fix. A device without power still counts as existing, because its entity stays in the entity registry.

Changes to the content of a room are applied immediately without interrupting a running activity. Adding, removing or renaming rooms or activities reloads the integration, since entities change.

---

## Configuration

A room consists of **devices** and **activities**:

```yaml
name: Wohnzimmer
default_activity: tv   # optional: what a plain "on" starts (switch, toggle_activity)
devices:
  onkyo:
    entity_id: media_player.onkyo_receiver
    power_switch: switch.wz_steckdose_multimedia_5_4_grau
    ready: {timeout: 60, reload_integration: true, on_timeout: abort}
  beamer:
    entity_id: media_player.epson_ehtw7400
    power_switch: switch.wz_steckdose_beamer_5_3_schwarz
    ready: {timeout: 60, reload_integration: true, on_timeout: continue}
    delay_after_off: 180
  vu:
    entity_id: media_player.vu_as2b_de
    power_switch: switch.wz_steckdose_multimedia_5_4_grau
    ready: {timeout: 60, reload_integration: true, on_timeout: continue}
activities:
  tv:
    name: TV
    devices: [onkyo, beamer, vu]
    steps:
      - {type: set_source, device: onkyo, source: SAT}
      - {type: set_sound_mode, device: onkyo, sound_mode: THX}
      - {type: set_volume, device: onkyo, volume_level: 0.35}
    on_start:
      - if:
          - condition: numeric_state
            entity_id: sensor.wz_helligkeit
            above: 20000
        then:
          - action: cover.close_cover
            target: {area_id: wohnzimmer}
      - action: light.turn_on
        target: {entity_id: light.wz_ambiente}
        data: {brightness_pct: 15, color_temp_kelvin: 2400}
    on_stop:
      - action: cover.open_cover
        target: {area_id: wohnzimmer}
  musik:
    name: Musik
    devices: [onkyo]
    steps:
      - {type: set_source, device: onkyo, source: NET}
```

`default_activity` is the activity a plain "on" starts: the room's switch, `toggle_activity` without an activity and wall buttons wired to them. Without it, the last used activity is started, which can be surprising on a single button: after watching TV, a press meant for music would switch the projector on.

### Devices

| Key | Default | Description |
|-----|---------|-------------|
| `entity_id` | — | The entity that represents the device (required) |
| `name` | — | Optional display name |
| `power_switch` | — | Switch that supplies the device with power. Several devices may share one |
| `remote_entity` | — | A `remote` entity for the navigation keys of the card (arrows, OK, back, home, menu), e.g. `remote.apple_tv`, see [Own commands and buttons](#own-commands-and-buttons) |
| `ready` | — | Readiness check before the device is switched on (see below) |
| `delay_after_power` | `0` | Boot time: seconds the device needs after its `power_switch` came on before it accepts commands. Counted from switching the outlet on, so devices on the same outlet boot in parallel. Skipped when the outlet was already on. Use it for devices that report `off` instead of `unavailable` while they have no power — the readiness check cannot tell those states apart |
| `delay_after_on` | `0` | Seconds to wait after switching the device on (wait mode *time* or *both*). Skipped when the device was already on |
| `delay_after_off` | `0` | Seconds the device needs after switching off before its power is cut (cool-down, wait mode *time* or *both*); the room does not wait for it |
| `state_source` | automatic | What says the device is on, see [Device states](#device-states) |
| `wait_on` / `wait_off` | `status` with a state source, else `time` | How to wait after turning on, and before cutting the outlet after turning off: `status`, `time` or `both` |
| `timeout_on` / `timeout_off` | from the profile (120 / 300 s) | How long to wait for the state |
| `debounce` | from the profile (2 s) | Seconds a state must hold before it counts |
| `on_failure` | `warn` | When the state doesn't come in time, or the device reports an error: `warn` (go on), `stop` (stop the activity; when turning off: leave the outlet on) or `retry` (switch it once more, then warn). One value, or `{turn_on: …, turn_off: …}` |
| `commands` | — | Remote buttons as Home Assistant actions, see [Remote control](#remote-control) |

`ready` takes:

| Key | Default | Description |
|-----|---------|-------------|
| `entity_id` | the device | Check another entity, e.g. `remote.apple_tv`: the Apple TV integration reports its media player as `off` while it is not connected, while its remote is `on` only when connected |
| `state` | — | Wait for this state (or a list of states) instead of "not `unavailable`" |
| `attribute` | — | Compare this attribute with `state` instead of the state itself |
| `timeout` | `60` | Seconds to wait for the entity |
| `reload_integration` | `false` | Reload the integration that provides the entity before waiting, and again every 5 s while it stays in `setup_retry` because the device does not answer yet. This skips the back-off of an integration in `setup_retry`, whose growing pauses (5, 10, 20, 40 s …) can otherwise take more than a minute after the device got power. When the device's `power_switch` was just switched on, the integration is reloaded after the boot time even if the device looks ready: some integrations keep reporting the last state (e.g. `off`) while the device has no power. A reload that does not finish within `timeout` does not hold up the start; it goes on with a warning |
| `on_timeout` | `abort` | `abort` stops the start and puts the room into `error`; `continue` logs a warning and goes on |

The check also runs before a remote button (`send_command`) reaches the device: if the connection was lost while the activity runs, it is brought back first, then the command is sent. Example for an Apple TV:

```yaml
aptv:
  entity_id: media_player.apple_tv
  ready: {entity_id: remote.apple_tv, state: "on", timeout: 30, reload_integration: true, on_timeout: continue}
```

### Device states

Many integrations say more than "on" or "off": a JVC projector is *warming* before it's *on* and *cooling* before
it's in *standby*; a StormAudio processor is *initializing*. Easy AV Control waits for those states instead of
fixed times.

**Automatic:** the integration's **profile** says which entity to watch and what its states mean. Built in:

| Profile | Watches |
|---|---|
| JVC projector (`jvc_projector_ha`) | its Power State sensor: `standby`, `warming`, `on`, `cooling`, `error` |
| StormAudio | the media player's `detailed_state`: `initializing`, `on`, `shutting down`, `off` |
| Lumagen | its sensors: they're unavailable until the unit has booted |
| PiPup | the screen sensor |
| Android TV (ADB), Android TV Remote | the media player |
| Yamaha MusicCast | the zone's media player |

Google Cast has a profile too, but only for what's playing: its state doesn't say whether the TV is on. A device
without a profile keeps fixed times (`delay_after_on`, `delay_after_off`), exactly as before.

**Wait modes** (`wait_on`, `wait_off`):

| Mode | Turning on | Before the outlet is cut |
|---|---|---|
| `status` | until the state says on | until the state says off |
| `time` | `delay_after_on` | `delay_after_off` |
| `both` | the state, then `delay_after_on` | the state, then `delay_after_off` |

A device that already says it's on (or is warming up) isn't switched on again; one that's still cooling down is
switched on once it's off. Each state is **debounced**: it must hold for `debounce` seconds, so a flicker
doesn't count. While waiting, the card shows the device's own word for its state ("JVC Projector: warming").

**By hand:** `state_source` names another entity, an attribute, and which values mean what. `state_source: none`
turns it off.

```yaml
isp:
  entity_id: media_player.isp
  state_source:
    attribute: detailed_state
    "on": ["on"]
    starting: [initializing]
    stopping: [shutting down]
    "off": ["off"]
  on_failure: {turn_on: retry, turn_off: warn}
```

Unquoted `on` / `off` work too (YAML reads them as true / false; Easy AV Control takes them back).

**Profiles** are listed in the panel under **Profiles**: the built-in ones (locked) and your own. **Duplicate**
a built-in profile to change it, edit yours as YAML, and **Export** / **Import** them as text to share. Your own
profile for an integration is used instead of the built-in one; a device can also name one with `profile: <id>`.
Each device page shows what was **detected** for it, with **Use these** for the remote and outlet it found.

### Detect integrations

**Detect integrations** in the panel compares what's installed with what the rooms use. Run it any time: after
adding an integration, after removing one, or on a first setup. Each change has a checkbox; **Apply** shows the
result as unsaved changes, and nothing is stored until **Save**.

| Section | What it offers |
|---|---|
| New devices | AV devices no room uses yet, for the room of their Home Assistant area (or a new room), with the best integration for each job (a TV with PiPup, ADB and Android TV Remote is one device: PiPup for its state, ADB for the arrow keys), its outlet, and the activities to add it to, at the place its profile gives in the power-on order. A device with a picture check (Lumagen) gets a **Wait for a picture** step. New rooms can get **starter activities**, one per source |
| Better integrations | A device a room uses that another integration now covers better. Not ticked |
| Missing entities | Entities a room uses that no longer exist. When the same device is still covered by another integration, it's offered as the replacement |
| Renamed entities | The same entity under a new ID: replaced everywhere except in actions and commands |
| Integrations without a profile | **+ Profile** starts a draft from the integration's device; **Learn** records what it shows while you turn it on and off and fills in its states |

A Repair for a missing entity points here too.

**Wait for a picture** (`type: wait_picture`, with `device`) waits until the device's picture check passes
(Lumagen *Active Video*), up to its `timeout`. When there's no picture in time, `on_failure: {picture: …}`
decides: `warn` (default) or `stop`.

**The room's select** starts and stops in the background, so whoever sets it (an automation, Plex Center's room
hook) follows the room's sensor instead of waiting minutes for the select. The `start_activity` and
`stop_activity` actions still wait until the room is done.

### Activities

| Key | Description |
|-----|-------------|
| `name` | Display name (defaults to the key) |
| `icon` | Icon in the remote control card, e.g. `mdi:television` |
| `order` | Position in lists; without it, activities are sorted by name. Home Assistant stores the configuration with sorted keys, so the order in which you write activities is not kept |
| `devices` | Devices the activity uses, in power-on order |
| `steps` | Settings applied once the devices are up |
| `on_start` | Home Assistant actions, run alongside the start |
| `on_stop` | Home Assistant actions, run alongside a stop |
| `remote` | Which device gets which remote buttons, and extra buttons, see [Remote control](#remote-control) |
| `commands` | Remote buttons only this activity has, see [Remote control](#remote-control) |

`on_start` and `on_stop` use the same syntax as scripts and automations: `action`, `if`/`then`, `choose`, `delay`, `wait_template`, `parallel` and so on. They run on a full stop only, not when switching to another activity.

### Steps

Every step has a `type` and may have `delay_after` (seconds to wait afterwards). `device` refers to a key in `devices`.

| Type | Parameters | Action |
|------|------------|--------|
| `set_source` | `device`, `source` | `media_player.select_source` |
| `set_volume` | `device`, `volume_level` (0–1) | `media_player.volume_set` |
| `set_sound_mode` | `device`, `sound_mode` | `media_player.select_sound_mode` |
| `set_brightness` | `device`, `brightness_pct`, `color_temp_kelvin`, `transition` | `light.turn_on` |
| `set_color_temp` | `device`, `color_temp_kelvin` | `light.turn_on` |
| `set_position` | `device`, `position` (0–100) | `cover.set_cover_position` |
| `set_tilt` | `device`, `tilt_position` (0–100) | `cover.set_cover_tilt_position` |
| `power_on` / `power_off` | `device` | Switch a device on or off in the middle of the sequence |
| `call_action` | `action`, `data`, `target` | Any Home Assistant action |
| `wait_available` | `device` or `entity_id`, `state`, `timeout`, `reload_integration`, `on_timeout` | Same as a device's `ready`, for any entity at any point |
| `delay` | `delay_after` | Only wait |

Every service call waits for the device to finish (`blocking`), at most 15 seconds. A failing step is logged and listed in the sensor's `warnings` attribute; the activity continues.

---

## What happens when

The short version is below; [ACTIVITY_FLOW.md](ACTIVITY_FLOW.md) shows the whole flow as diagrams: commands, room states, start, readiness check, stop, which action switches which device, and the example step by step.

### Start

1. **Smart switching** — if another activity runs in the room, its devices that the new one does not use are switched off. Power outlets that are no longer needed are switched off in the background once those devices had their `delay_after_off`.
2. **Power** — all outlets of the activity's devices are switched on at once, so the devices boot in parallel.
3. **`on_start`** starts running alongside.
4. **Devices**, in order: boot time `delay_after_power` (only if its outlet was off), readiness check, switch on (only if off), `delay_after_on` (only if it was switched on).
5. **Steps**, in order.
6. When `on_start` has finished too, the activity is `active`.

### Stop

1. **`on_stop`** starts running alongside.
2. **Devices** are switched off in reverse order. The room is idle once they are off and `on_stop` is done; a status LED on a wall button goes out right away.
3. **Power outlets** whose devices need no cool-down are switched off at once. The others follow in the background after the longest `delay_after_off` of their devices; a device that was already off only counts what is left of its cool-down. Starting an activity in the meantime keeps the outlets it needs.

For the example above: VU+, projector and Onkyo off → room idle → multimedia outlet off → 180 s later the projector outlet off.

### Commands while something runs

A new command cancels whatever runs in the room: a stop during a long start takes effect immediately, and a stop from the `error` state switches off what the failed start had already powered. Sending the command that is already running just waits for it.

---

## Remote control

### The card

Add the card to any dashboard (**Edit dashboard → Add card → Easy AV Control Remote**) and pick the room. Since Home Assistant 2026.6 the card picker also suggests it by entity: under **By entity**, open the area and the room's device ("AV: <room>") or pick one of its entities, and the card is offered with that room already set. Or in YAML:

```yaml
type: custom:easy-av-control-card
room: wohnzimmer
name: Living room   # optional title
```

The card shows the room's state with a power button (toggle), the activities as buttons, the start progress with what it is busy with (e.g. "Epson Beamer is booting, 40 s left", "Waiting for Apple TV, at most 1:56", "Step 1 of 3: Set source"), devices cooling down after a stop or switch ("Cooling down: Epson Beamer, power off in 2:30", also while the room is off), errors, and — while an activity runs — what is playing (app, title, series or artist, artwork and the position of a film or episode, from the activity's playback device or else its last media player) and the remote: volume rocker and slider, d-pad, channel rocker, navigation and playback keys and the activity's own and quick-select buttons. Only what the running activity offers is shown. Keys send when released, so scrolling the dashboard across the remote sends nothing; volume and arrow keys repeat while held. It works for every user, in the browser and in the Home Assistant app.

The integration registers the card as a dashboard resource itself (**Settings → Dashboards → Resources**, `/easy_av_control_static/easy-av-control-card.js?v=…`) and updates its version after every update, so browsers and the app load the current card instead of a cached one. Removing the integration removes the resource. With resources in YAML (`lovelace: resource_mode: yaml`), the card is loaded on every page instead; there is nothing to add in either case. A dashboard loaded in the few seconds of a restart before the integration is set up shows "Custom element doesn't exist"; reloading it once fixes that.

### Which device gets which button

Buttons belong to four groups. Each activity sends a group to one of its devices:

| Group | Commands | Default device |
|-------|----------|----------------|
| `volume` | `volume_up`, `volume_down`, `mute`, `volume_set` | First media player of the activity |
| `channels` | `channel_up`, `channel_down` | Last media player, if it is a separate source (e.g. a set-top box behind the receiver) |
| `transport` | `play_pause`, `play`, `pause`, `stop`, `next`, `previous` | Last media player |
| `navigation` | `up`, `down`, `left`, `right`, `ok`, `back`, `menu`, `home`, `info`, `guide`, `exit` | Last device with a `remote_entity` or navigation `commands` |

Media players handle volume, channels and playback without any configuration (`media_player.volume_up`, `media_next_track`, …; set-top boxes such as Enigma2 map next/previous track to the channel keys). Override the defaults per activity, or hide a group with `null`:

```yaml
activities:
  tv:
    remote:
      volume: onkyo
      channels: vu
      transport: null
```

When navigation goes to a device with a `remote_entity` (e.g. an Apple TV), the card shows a touch surface instead of the arrow keys: every swipe of about 40 px sends one arrow key in its direction, a long swipe several, a tap sends OK. `touchpad: true` or `false` under `remote` turns it on or off for an activity; in the panel it is "Touch surface" next to the button groups. A key next to back and home switches between arrow keys and touch surface in the card; the browser remembers that choice per room and activity.

### Own commands and buttons

`commands` maps a command name to Home Assistant actions — on a device for every activity that uses it, or on an activity for that activity only. The variables `command`, `value` and (on devices) `entity_id` are available in templates. Own commands override the built-in ones.

Navigation keys need a remote or commands, since most media players have no actions for them. A device with a `remote_entity` gets the arrow keys, OK, back, home and menu through `remote.send_command`, with the key names of its integration (Apple TV: `select`, `menu` for back, `top_menu` for menu; Android TV Remote: `DPAD_UP` …; others: the command name). In the panel, a device whose integration also provides a remote shows a button that sets this up together with the connection check:

```yaml
aptv:
  entity_id: media_player.apple_tv
  remote_entity: remote.apple_tv
  ready: {entity_id: remote.apple_tv, state: "on", timeout: 60, reload_integration: true, on_timeout: continue}
```

Own `commands` win over the remote, key by key. Enigma2 receivers (VU+, Dreambox) accept key codes through OpenWebif; the codes below are Linux input key codes — check them against your box:

```yaml
# configuration.yaml
rest_command:
  vu_key:
    url: "http://vu-as2b.local/api/remotecontrol?command={{ code }}"
```

```yaml
# Easy AV Control room
devices:
  vu:
    entity_id: media_player.vu_as2b_de
    commands:
      up:    {action: rest_command.vu_key, data: {code: 103}}
      down:  {action: rest_command.vu_key, data: {code: 108}}
      left:  {action: rest_command.vu_key, data: {code: 105}}
      right: {action: rest_command.vu_key, data: {code: 106}}
      ok:    {action: rest_command.vu_key, data: {code: 352}}
      exit:  {action: rest_command.vu_key, data: {code: 174}}
      menu:  {action: rest_command.vu_key, data: {code: 139}}
      info:  {action: rest_command.vu_key, data: {code: 358}}
      guide: {action: rest_command.vu_key, data: {code: 365}}
activities:
  tv:
    icon: mdi:television
    order: 1
    remote:
      buttons:
        - guide
        - {command: netflix, name: Netflix, icon: mdi:netflix}
    commands:
      netflix:
        - action: media_player.select_source
          target: {entity_id: media_player.onkyo_receiver}
          data: {source: STRM BOX}
```

`buttons` lists extra buttons of the activity; each names a command (standard or own) with optional `name`, `icon` and `device`.

### Quick select

A button with `device` and `source` instead of `command` switches that media player to a source: an input of a receiver, or an app on an Apple TV, whose source list holds its installed apps. It runs `media_player.select_source`, after the device's readiness check like every other button. Without `name`, the button is labelled with the source.

```yaml
activities:
  apple_tv:
    remote:
      buttons:
        - {device: aptv, source: Netflix, icon: mdi:netflix}
        - {device: aptv, source: YouTube, icon: mdi:youtube}
        - {device: aptv, source: ARD Mediathek, name: ARD}
```

In the configuration panel, quick select has its own list under **Remote control**: pick the device, then the source from its list. The integration remembers the last source list of every configured media player, so the list is there even while the device is off; an Apple TV reports its apps only while it is connected, so start it once after adding it. A name that is not in the list can be typed in.

`easy_av_control.send_command` does the same with `command: select_source`, `value: <source>` and `device`.

### Device settings

Below the buttons, the card has a **Settings** section for what you change during a film rather than at every start: the source and the sound mode of the activity's media players, and any number, select or switch entity of a device, such as the tone controls or speaker levels a receiver's integration provides. The card shows a source, sound mode or select as a list with its current value, a number as a slider with its range, a switch as an on/off key. The section is closed until it is opened; each browser remembers that per room. A change runs the matching action (`media_player.select_source`, `media_player.select_sound_mode`, `number.set_value`, `select.select_option`, `switch.turn_on`/`turn_off`) after the device's readiness check, like every button.

Settings belong to a device, and every activity that uses the device shows them. Without configuration a device offers, automatically:

- the source and sound mode of a media player that reported such a list (the integration remembers the lists while the device is off),
- the `number` and `select` entities of the same device, such as tone controls or speaker levels. For an integration without devices, those of the same integration entry without a device. Disabled, hidden and diagnostic entities are left out, and switches are never added automatically.

`settings` on a device chooses instead, in this order, with optional favourites, so a receiver with fifteen sound modes offers the three you use; an empty list shows nothing of that device:

```yaml
devices:
  onkyo:
    entity_id: media_player.onkyo_receiver
    settings:
      - {setting: sound_mode, options: ["DOLBY ATMOS/DOLBY SURROUND", "THX CINEMA", "DIRECT"]}
      - {setting: source}   # the receiver's whole source list
      - {entity: number.onkyo_bass, name: Bass}
      - {entity: switch.onkyo_late_night, name: Late night}
  beamer:
    entity_id: media_player.epson_ehtw7400
    settings: []            # nothing of the projector in the card
```

`entity` takes a `number`, `select`, `switch` or their `input_*` helpers; `name` labels it, else its own name. Easy AV Control does not talk to the device itself: what the card can offer depends on the entities the device's integration provides.

An activity can make its own choice instead of its devices' settings, with `settings` under `remote`; each entry then names its `device`:

```yaml
activities:
  apple_tv:
    remote:
      settings:
        - {device: onkyo, setting: sound_mode}
```

`easy_av_control.send_command` sets an entity setting with the entity ID as `command`, the new value as `value` and the device as `device`, e.g. `command: number.onkyo_bass`, `value: -2`, `device: onkyo`.

In the panel it is **Settings in the card** on every device's page (automatic, or chosen with favourites) and on every activity's page (from the devices, or chosen for that activity). A receiver can still refuse a sound mode that does not fit the incoming signal; the card then keeps showing the mode it actually uses.

A command is resolved in this order: the activity's own `commands`, then the device of its group (own `commands` or built-in action), then the first device of the activity that defines it — so digit keys `"0"`–`"9"` only need to exist on the set-top box.

---

## Entities

One virtual device per room, in the room's area (or in an existing area of the same name; no area is created) with four entities. Entity names and state labels are translated (English and German); the state values themselves are stable keys, so automations work regardless of the language. Entity IDs are generated by Home Assistant from the translated names and may differ per installation — look them up on the room's device page.

### Select — Scene

Shows the running activity and starts, switches or stops activities.

| Option (state value) | Shown as | Meaning |
|----------------------|----------|---------|
| Activity name | Activity name | That activity is active — select another one to switch |
| `idle` | `—` | Idle; selecting it stops the current activity |
| `starting` / `stopping` | `Starting …` / `Stopping …` | Transition in progress (read-only) |
| `error` | `Error` | The last start was aborted (read-only) — see the sensor |

### Sensor — Activity

**State:** `idle` · `starting` · `active` · `stopping` · `error`

| Attribute | Description |
|-----------|-------------|
| `activity_id`, `activity_name` | The current activity, or `null` |
| `available_activities` | Names of all activities of the room |
| `current_step`, `total_steps`, `step_progress_pct` | Progress (devices and steps) |
| `error` | Why the last start was aborted |
| `warnings` | Steps that failed during the last start |
| `devices`, `steps` | Summary of the current activity |

An aborted start is also reported in **Settings → Repairs**; the entry disappears with the next start or stop of the room.

### Switch — Active

`on` while an activity runs, starts or failed. `turn_on` starts the room's `default_activity`, else the last used activity (or the first one); `turn_off` stops. Exposed to KNX, its state drives the status LED of a wall button.

### Scene — one per activity

One scene per activity; activating it starts the activity. Like the other entities it is named after the room's device and the activity, e.g. "AV: Wohnzimmer TV".

Entities of a deleted activity and the device of a deleted room are removed on the next start of the integration, instead of staying "unavailable".

---

## Actions

```yaml
# Start an activity (by key or display name)
action: easy_av_control.start_activity
data:
  room: wohnzimmer
  activity: tv

# Stop the current activity
action: easy_av_control.stop_activity
data:
  room: wohnzimmer

# Stop if something runs, otherwise start (default: the last used activity)
action: easy_av_control.toggle_activity
data:
  room: wohnzimmer
  activity: tv        # optional

# Send a remote button to the device the running activity uses for it
action: easy_av_control.send_command
data:
  room: wohnzimmer
  command: volume_up  # or volume_set with value: 0.4, ok, channel_up, an own command …
  device: vu          # optional: this device instead, works while nothing runs

# Reload the configuration
action: easy_av_control.reload
```

The room ID is the key in the configuration (shown in **Edit whole configuration**).

The actions return when the activity has fully started or stopped, which can take minutes with cool-down times. Use `mode: parallel` in automations that call them, so that a second trigger (e.g. a stop while starting) is not swallowed by `mode: single`.

### Example: KNX push button

```yaml
alias: Living room TV push button
mode: parallel
triggers:
  - trigger: knx.telegram
    destination: "5/1/10"
    group_value_read: false
    group_value_response: false
actions:
  - action: easy_av_control.toggle_activity
    data:
      room: wohnzimmer
      activity: tv
```

With a rocker that sends separate on/off telegrams, switch the room's switch (it starts the `default_activity`) and expose it for the status LED:

```yaml
alias: Living room rocker
mode: parallel
triggers:
  - trigger: knx.telegram
    destination: "2/0/35"
    group_value_read: false
    group_value_response: false
actions:
  - action: "switch.turn_{{ 'on' if trigger.payload == 1 else 'off' }}"
    target:
      entity_id: switch.wohnzimmer_activity
```

```yaml
# KNX expose (knx.yaml): status for the LED
- type: binary
  entity_id: switch.wohnzimmer_activity
  address: "2/1/35"
```

A long press on another group address can start a second activity with `start_activity`. Volume buttons on the wall work the same way with `send_command`, and always reach the device of the running activity.

---

## Troubleshooting

- **Logs:** **Settings → Devices & Services → Easy AV Control → ⋮ → Enable debug logging**. Every step, wait and reload is logged with its room.
- **Device not ready in time:** raise `ready.timeout`, and set `reload_integration: true` for integrations that go into `setup_retry` without power.
- **Repairs entry "entity is missing":** the entity was renamed or removed; fix `entity_id` in the room.

---

## Development

```bash
pip install -r requirements_test.txt
pytest
```

The remote control card and the configuration panel live in `frontend/` (Lit, TypeScript, esbuild):

```bash
cd frontend
npm ci
npm test        # tests of the card logic (Node test runner)
npm run build   # writes easy-av-control-card.js and easy-av-control-panel.js to custom_components/easy_av_control/frontend/
```

The build output is committed: after changing anything in `frontend/`, run `npm run build` and commit the two built files with the change, since HACS installs straight from `main`.

The screenshots are taken from a real Home Assistant with the made-up devices of `tests/screenshots/av_demo`:

```bash
# The README images (docs/images/): needs playwright, pillow and pyyaml in SHOTS_PYTHON
README=1 SHOTS_PYTHON=/path/to/venv/bin/python PYTHON=/path/to/ha-venv/bin/python tests/screenshots/panel_run.sh
# Every panel page in both themes, into a folder of your choice (Node, playwright-core)
PYTHON=/path/to/ha-venv/bin/python tests/screenshots/panel_run.sh /tmp/shots
```

`PYTHON` needs `homeassistant` and `home-assistant-frontend`. `CHROME` can point to a Chromium of your own, and
`PLAYWRIGHT_NODEJS_PATH` to your own Node when Playwright's can't start.

---

## License & Support

- License: [MIT](LICENSE)
- Bugs & feature requests: [GitHub Issues](https://github.com/Ltek/easy-av-control/issues)
- Changelog: [CHANGELOG.md](CHANGELOG.md)
