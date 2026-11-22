# Plan: automatic setup and device states (Easy AV Control)

Status: all five phases built (2026.11.20.2 to .6). Open: the roadmap at the end.

Originally drafted 2026-11-20. Updated with your answers: wait modes, Detect integrations any time, priority order, JVC
confirmed, Lumagen reviewed, shareable profiles, profile creation, debounce and failure handling, adding to the power-on order,
the design guide, and the roadmap. Nothing here is built yet.

## Goal

1. **Setup finds things itself.** Picking a device (or running **Detect integrations**, at any time) fills in what
   Easy AV Control can learn from the integrations already installed: the remote entity, the power outlet, which
   entity says the device is ready, and what the device offers as settings.
2. **Start and stop follow what the devices say**, by default. The JVC is "warming" until it's "on"; the
   StormAudio is "initializing" until it's "on"; the Shield is on when Android TV Remote says so. Easy AV Control
   waits for those states instead of fixed delays, shows them on the card, and stops with the device's own error
   when one reports it.

Anything set by hand still wins. A device with nothing detected works exactly as today.

## What Easy AV Control does today

Read from `coordinator.py` (`_async_start`, `_async_wait_ready`) and `model.py` (`READY_SCHEMA`):

- **Before** turning a device on, it can wait until an entity is *available* (or has one of a list of states).
  That's the `ready` block: `entity_id`, `state`, `timeout`, `reload_integration`, `on_timeout`.
- **After** turning it on, it only sleeps `delay_after_on` seconds ("warm up"). It never checks that the device
  actually came on.
- **Stopping** sleeps `delay_after_off` before cutting a power outlet (projector cool-down).
- "On" and "off" come from the device entity's own state: `off`, `standby`, `unavailable`, `unknown`, `closed`
  count as off.
- `ready` only looks at the **state**, never an attribute.
- The panel already does one detection: it finds the `remote.` entity on the same HA device and offers it.

So the fixed delays are guesses, and a device that never comes on is only noticed when a later step fails.

## What your integrations report

From your entity registry and config entries, and the integrations' code where we have it:

| Device | Integration | Best indicator | States | Notes |
|---|---|---|---|---|
| JVC projector | `jvc_projector_ha` (Ltek) | `sensor.jvc_projector_power_state` | `standby`, `warming`, `on`, `cooling`, `error` | Real warm-up and cool-down; **confirmed accurate**. `remote.jvc_projector` is the control entity; `select.jvc_projector_input` is a setting |
| StormAudio ISP | `stormaudio` (Ltek) | `media_player.isp`, attribute `detailed_state` | `off`, `initializing`, `on`, `shutting down` | The entity reads `on` while still initializing, so the **attribute** is what matters. `switch.isp_power` |
| Lumagen | `lumagen` (Ltek) | power: the Lumagen's sensors becoming **available**; video: `sensor.lumagen_radiancepro_input_video_status` | power: standby / active; video: `No Source`, `Active Video`, `Test Pattern` | See "Lumagen" below: the power switch reads `on` the moment it's pressed, before the unit has booted |
| Shield | `pipup`, `androidtv` (ADB), `androidtv_remote`, `cast` | PiPup, then ADB (see priority) | as the TVs | You added ADB and PiPup for it on 2026-11-18; the registry export I read is from 2026-11-12, so it didn't show them |
| Living Room / Play Room TV | `pipup`, `androidtv` (ADB), `androidtv_remote` | PiPup's screen; else ADB | PiPup: screen on / off, media `playing` / `paused` / `idle`; ADB: `off`, `standby`, `on`, `idle`, `playing`, `paused` | Three integrations, one TV |
| Plex clients | `plex` | none (not a power indicator) | | Now playing only |

Two findings shape the design:

- **HA doesn't link these integrations' devices.** None of your 42 AV devices has entities from two
  integrations. The Living Room TV is three separate HA devices, and the ADB and Android TV Remote MAC addresses
  differ (Wi-Fi vs Ethernet). What they share is the **IP address** in each config entry: `192.168.2.53` for
  ADB, Android TV Remote and PiPup. Grouping has to go by host.
- **Removing Android TV Remote and Cast:** with PiPup and ADB on both TVs and the Shield, nothing they provide
  is lost. Detect integrations (section 4) moves each device over.
- **Some readiness lives in an attribute** (StormAudio `detailed_state`), so the ready check needs attribute
  support.

### Priority for Android / Google TV devices

Your order, **PiPup, ADB, Cast, Android TV Remote**, is right for the first two. I'd swap the last two:

| Integration | How fast it reports | Power on/off | Navigation keys | What's playing |
|---|---|---|---|---|
| **PiPup** (app 0.24+) | **push** (webhook), near-instant | screen on / off; reads off when unreachable | **home and back only** (its `send_key` has no arrows or OK) | yes, with app 0.32+ media session |
| **ADB** | **polls every 10 s** (HA's media player default) | reliable, incl. `standby` | yes | app and playback state |
| **Android TV Remote** | push | reliable on / off | yes | no |
| **Cast** | event-based, but about the Cast app | **not** the TV's power: idle can mean on or off | no | only for Cast sessions |

- PiPup first for power and what's playing: fastest. ADB's 10-second poll is the delay you've noticed.
- **Navigation keys come from ADB** (then Android TV Remote): PiPup's `send_key` only has media keys, home and
  back. Found while building phase 1.
- ADB second as the fallback (and the only one with a deep-sleep-safe Turn off today, per Plex Center).
- **Android TV Remote above Cast:** it reports the TV's real power and has navigation keys. Cast reports neither,
  so it should only ever be used for "what's playing". It's a moot point once you remove Android TV Remote.
- If PiPup's author adds the two ADB features you asked for, ADB becomes a pure fallback.

Priority is **per role**, not one list: power indicator, navigation keys, now playing and Turn off can each come
from a different integration of the same device, the best one for that job. The order is part of the profile
(section 1), so it can be changed without a new build.

### Lumagen

Read from `Ltek/lumagen` (`client.py`, `switch.py`, `entity.py`):

- **Power:** the Lumagen reports it itself: `S02` (0 = standby, 1 = active), `I25` field 24, and the
  `Power-up complete` / `POWER OFF` messages.
- **The power switch is optimistic:** `switch.lumagen_radiancepro_power` shows `on` the moment it's turned on,
  before the unit has booted. It can't be the ready check.
- **The real "booted" signal:** every Lumagen sensor and select is unavailable until the unit reports power
  active (`connected and power`). So "ready" = `sensor.lumagen_radiancepro_input_video_status` (or any of them)
  is available.
- **Video:** `input_video_status` = `No Source`, `Active Video` or `Test Pattern`. `Active Video` confirms a
  picture arrives, which is the best "the whole chain works" check. It depends on the source being on, so it
  belongs **after** the devices are on: a "wait for picture" step in the activity, which the Movie activity
  would get by default ("Lumagen: waiting for video", then "on", or stop with "No Source after 30 s").

## Design

### 1. Profiles: built in, your own, and shareable

**What AV Scenes had:** nothing shareable. Its "device profiles" (0.7.0 changelog) are each room's own device
entries. The only built-in knowledge is the Apple TV "ready" preset in the panel and the remote-key names for
`apple_tv` and `androidtv_remote` in `control.py`.

**A profile describes one integration**, not one person's devices, so it can be shared:

```yaml
id: jvc_projector_ha
name: JVC projector (jvc_projector_ha)
integration: jvc_projector_ha          # match on the integration (optional: manufacturer, model)
device_entity: {domain: remote}         # what the device entity is
indicator:                              # found on the same HA device, never by entity ID
  entity: {domain: sensor, translation_key: jvc_power_state}
  on: [on]
  starting: [warming]
  stopping: [cooling]
  off: [standby]
  error: [error]
remote: {domain: remote}                # navigation keys
settings:
  - {domain: select, translation_key: input}
timeouts: {on: 120, off: 300}
debounce: 2
order: early                            # place in an activity's power-on order: early | middle | late
```

Entities are matched by **domain + `translation_key`** (or original name) on the device's own HA device, which is
the same on every installation. A profile never contains anyone's entity IDs, so it works as is on another
Home Assistant.

A profile can also give:

- **attributes**: StormAudio's `detailed_state`
- **availability as the indicator**: Lumagen, "on when available"
- **remote key names**: what `control.py` hard-codes today
- **a per-role priority** for multi-integration devices
- **a "wait for picture" check**: Lumagen `Active Video`

**Three sources, shown together in a Profiles tab of the panel:**

| Source | Where | Editable |
|---|---|---|
| **Built in** | `profiles/*.yaml` in the integration, one file per integration | No (lock icon); **Duplicate** to change |
| **Yours** | Easy AV Control's storage in `.storage` | Yes |
| **Imported** | pasted from someone else; becomes yours | Yes |

- A device **links** to a profile (by id) rather than copying its values, so editing a profile updates every
  device that uses it. Values set on the device itself still win.
- **Export / Import as text**, the same way as the other Ltek cards' libraries: one profile or all of them, as
  JSON with `{kind: "easy-av-control/profile", v: 1}`. Import never overwrites: a clash gets a new id and is
  reported.
- **Share:** the Profiles tab links to the repo, where a profile can be offered as a new `profiles/<id>.yaml`
  (an issue with the exported text, or a pull request). Accepted ones ship as built ins in the next build.

**Creating a profile** for an integration that has none (from Detect integrations, or **+ Profile** in the
Profiles tab):

1. Detect integrations lists the AV-type integrations it found **without a profile** (anything with a
   `media_player`, `remote`, or a power `switch` on a device), each with a checkbox. You tick the ones you want.
2. For each, a draft profile is filled in from that integration's device: its entities by domain and
   translation key, and the states and attributes they show right now.
3. **Learn (optional):** "Turn the device on now". The panel records the indicator's states while it comes on
   and goes off again, and fills in *starting → on* and *stopping → off* from what it saw. You check them and
   save.
4. You review the draft in the normal profile editor, then save. It's yours, and can be exported or shared.

**Built-in profiles in this plan are only ones we can test** on your Home Assistant. Profiles for integrations
you don't have are on the roadmap (end of this file).

First built-in profiles, for what you have:

| Profile | Covers |
|---|---|
| `jvc_projector_ha` | JVC projector |
| `stormaudio` | StormAudio ISP |
| `lumagen` | Lumagen Radiance Pro |
| `pipup`, `androidtv`, `androidtv_remote`, `cast` | Android and Google TV devices |
| `yamaha_musiccast` | Yamaha MusicCast receivers: one media player per zone (your `…_ceiling` and `…_deck`), on / off reported at once (push); its numbers, selects and switches (tone, dialogue level, sleep timer, Pure Direct, …) offered as card settings. No warm-up state, so the profile mostly saves setup time |
| `media_player` (generic) | anything else: today's behaviour |

Apple TV keeps what AV Scenes already does (the ready preset and its key names) until it gets a tested profile.

**Sibling finder** (one physical device across integrations): same HA device; else same host in the config
entries (`host`, `ip_address`, or the host of `url`); else same MAC in the device registry. Name similarity is only
a suggestion, never applied silently.

### 1b. A device added by Detect integrations is ready to use

Whenever a device gets a profile, whether matched by Detect integrations or created through **+ Profile**:

- **It's added to the room**, with everything the profile finds filled in.
- **It's added to the power-on order** ("Switched on in this order") of the room's activities. Each activity is
  listed with a checkbox in the review, all ticked by default, so you can untick an activity it doesn't belong to
  (a TV in *Music*) before Save.
- **Its place in the order comes from the profile**, not "at the end":

  | Place | Devices |
  |---|---|
  | early | long warm-ups (projectors) and processors that have to be up first (Lumagen) |
  | middle | audio (receiver, StormAudio) |
  | late | sources (Shield, TV apps) |

  Within a place, the room's current order is kept. You can still move it afterwards.
- **The detection defaults are on:**
  - Status waits for turning on and off, with the profile's timeouts
  - the profile's debounce
  - Warn and continue on a failure
  - the indicator, remote entity and settings from the profile
  - the picture check, for a profile that has one (Lumagen), added as the last step of the activities it was
    added to

  Nothing is left switched off waiting for you to find it.
- The same applies to a device you add by hand: once its entity matches a profile, the **Detected** box offers
  all of this with one **Use these** click.

### 2. Runtime: wait for the device's own states (`coordinator.py`)

A device gets an **effective state source**: what you set by hand, else what its profile says, else today's
behaviour. With a profile in effect:

- **Turn on:** after `turn_on`, wait until the indicator means **on** (JVC `on`, StormAudio `detailed_state` =
  `on`), up to the timeout. While it reads "coming on", the card shows the device's own word ("JVC Projector:
  warming up · 0:42"). If it reads **error**, stop at once with the device's message, as the room hook already
  does for Plex Center.
- **Already on:** a device that reads on (or coming on) isn't sent `turn_on` again. Today that decision uses
  only the device entity's own state, which for the JVC is the remote entity, not the Power State sensor.
- **Turn off / power outlet:** wait until the indicator means **off** before cutting the outlet. JVC `cooling`
  → `standby` replaces the fixed `delay_after_off`. `delay_after_off` stays as a minimum and as the fallback.
- **During an activity:** a command to a device whose indicator says off or coming-on waits for it, using the
  same path the `ready` re-check uses today.

**Debounce first.** A state only counts once it has held for a short time, so a flicker doesn't end a wait or
raise a failure: an HDMI handshake can show `No Source` for a second, and a projector can report `on` briefly
before it starts warming. The time comes from the profile, and can be set per device.

- 2 s by default.
- 5 s for the Lumagen picture check.
- 0 turns it off.

**Wait mode, per device, separately for turning on and for turning off:**

| Mode | Turning on | Turning off (before the outlet is cut) |
|---|---|---|
| **Status** | wait until the indicator says on (up to the timeout) | wait until it says off (JVC `cooling` → `standby`) |
| **Fixed time** | wait `delay_after_on` seconds, as today | wait `delay_after_off` seconds, as today |
| **Both** | wait for the status, **then** the fixed time on top (e.g. "on", then 5 s for the picture to settle) | wait for the status, then the fixed time |

- The default is **Status** when the device has an indicator (from its profile or set by hand), else
  **Fixed time**. A device without an indicator can't pick Status or Both; the panel says why.
- With Status or Both, the status wait has its own timeout (default 120 s for on, 300 s for off, since
  projectors cool down slowly).

**When a check fails, per device:** a status that times out, a device that reports **error** (JVC `error`), or
a picture check that sees `No Source`. Each device has its own choice:

| Choice | What happens |
|---|---|
| **Warn and continue** (default for every device) | the activity carries on; the card and the log show the warning, and the room's sensor lists it under `warnings` |
| **Stop the activity** | it stops with the device's message, as `on_timeout: abort` does today |
| **Retry, then warn** | turns the device on (or off) once more and waits again; if that fails too, warns and continues |

The choice can be set once for the device, or differently for turning on, turning off and the picture check.
This replaces `on_timeout`, whose default in AV Scenes was **abort**. Easy AV Control has no existing users
(new domain), so the default can change to warn without a migration.
- Fixed time is still the plain sleep it is today, so switching a device to Fixed time gives exactly today's
  timings.

Config (backward compatible, byte-stable: nothing is written while you keep the defaults):

```yaml
devices:
  jvc:
    entity_id: remote.jvc_projector
    wait_on: status               # status | time | both; default status with an indicator, else time
    wait_off: both                # e.g. cooling -> standby, then delay_after_off on top
    delay_after_off: 10
    debounce: 2                   # seconds a state must hold (default from the profile)
    on_failure: warn              # warn | stop | retry; or per check:
    # on_failure: {turn_on: retry, turn_off: warn, picture: warn}
    state_source: auto            # default, not written. Or: none (no indicator),
                                  # or set by hand:
    # state_source:
    #   entity_id: sensor.jvc_projector_power_state
    #   attribute: detailed_state  # optional
    #   on: [on]
    #   starting: [warming]
    #   stopping: [cooling]
    #   off: [standby]
    #   error: [error]
```

`wait_on` / `wait_off` are only written when they differ from the default. `ready` gains an optional `attribute` for the "before turning on" check (StormAudio). Existing `ready`,
`delay_after_on` and `delay_after_off` keep working; with a profile they become fallbacks and minimums.

**Small extra:** make the room's **select** start the activity in the background instead of holding the
service call until the whole start is done. That's what made Plex Center's room hook wait outside its own
timeout. The `start_activity` action keeps waiting, for scripts that rely on it.

### 3. Panel: "Detected" box on each device

When you pick an entity, the device page shows what was found, before you save:

> **Detected: JVC Projector (jvc_projector_ha)**
> On / off from *Power State* (warming → on, cooling → standby) · Remote: `remote.jvc_projector` ·
> Settings: Input · [Use these] [Change]

- One click applies everything found. Each part can be changed or switched off; "None" goes back to today's
  behaviour.
- For a TV covered by several integrations, it lists them in priority order, so you can see why Android TV
  Remote was picked over ADB.
- The flow view (start / switch / stop preview) shows "wait for JVC Projector: on" instead of "wait 60 s".

### 4. "Detect integrations", any time

A **Detect integrations** button in the panel, always available, not only on first setup. Each run compares
what's installed now with what the rooms use, and shows the result as a list of proposed changes. Nothing
changes until you press Save.

**New:**
- A device whose integration was just installed: "Living Room TV: PiPup found. Use its screen sensor as a
  second indicator?"
- A device no room uses yet: offered as a new device in the room of its HA area.
- On an empty panel (first setup): rooms by HA area, the devices in them, and optional starter activities
  (*Movie* = Shield + StormAudio + Lumagen + JVC).

**Gone** (an integration you removed, e.g. Android TV Remote or Cast):
- Each place a room still uses one of its entities is listed: the device entity, the indicator, the remote
  entity, a setting, a power outlet, a ready check.
- For each, the next integration in priority order for the same physical device is offered as the replacement
  (Android TV Remote gone → PiPup for power and navigation keys, ADB as the fallback).
- If nothing can replace it, the device falls back to **Fixed time** and the list says so.

**Changed:** an entity that was renamed (the same registry entry with a new entity ID) is updated
automatically. Entity IDs in actions and commands are listed for you to check rather than edited.

The same check runs, without saving anything, each time Home Assistant starts. If something a room uses is
missing, it raises a **Repair** that points to Detect integrations. That way removing an integration can't
silently break an activity.

### 5. Design: every settings page follows `CARD_DESIGN_SYSTEM.md`

Today the panel is AV Scenes' own look (HA's `ha-form` with plain sections). The plan brings every page Easy AV
Control draws to the Ltek design guide:

- **Where:** the sidebar panel (room editor, device, activity, step, profile pages, Detect integrations review,
  flow view) and the remote card's own editor.
- **Tokens:** the `--ltek-*` token block, byte-identical to the other Ltek cards (checked with a diff in the
  tests).
- **Panels:**
  - top-level panels with the accent border when open
  - flat uppercase sub-panels
  - accent group subtitles in mixed case
  - muted hints at the top of each panel
- **Rows:**
  - content-width label rows
  - sliders with a bold readout and ↺ for every time, size and timeout, never number boxes
  - a feature's checkbox on the same row as its control
  - sub-settings hidden while their feature is off
- **Lists:** devices, activities, steps and profiles are list rows with ↑ ↓ ✏️ 🗑 (trash for delete, red on
  hover), and "+ Device" at the top.
- **Profiles tab:** the library-list rules: lock icon on built ins, eye for a preview, pencil, Duplicate,
  Export / Import as text in a `<dialog>`.
- **Colours:** any colour option is the four-mode control (default / theme / custom / CSS).
- **Footer:** ⭐ Star on GitHub + 🐛 Report an issue, one left-aligned row.
- **Behaviour:** editing never collapses open sections or loses your place; config is written byte-stably (only
  what differs from the defaults).

HA's own entity pickers stay (they're what make picking entities easy), placed inside our rows. The config flow
dialog (Settings → Add integration) is drawn by Home Assistant itself and can't be styled; it stays short and
hands over to the panel.

Checked in a browser against a mocked HA theme, with screenshots of each page, like Easy Camera Grid Card's editor.

### 6. Docs and screenshots

- README: "Automatic setup" and "Device states" sections, with the profile table.
- Screenshots: retake them with the demo devices in `tests/screenshots` (now showing Easy AV Control), adding
  a JVC-like device that warms up.

## Order of work

Each phase is its own build: tested, and usable on its own.

| Phase | What | Changes behaviour? |
|---|---|---|
| 1 | Profile format, built-in profiles, sibling finder, unit tests | No |
| 2 | Runtime: wait modes (status / fixed time / both) for on and off, error stop, card text; `ready.attribute`; non-blocking select | Yes, for devices with an indicator (Fixed time gives today's timings) |
| 3 | Panel redesign to the design guide; "Detected" box; Profiles tab (built in / yours, duplicate, export / import, + Profile with Learn); flow-view wording | Editor only |
| 4 | Detect integrations (new / gone / renamed, any time), adding to the power-on order with defaults on, starter activities, the start-up Repair | Editor only, nothing saved without Save |
| 5 | README, screenshots | No |

The redesign is part of phase 3 so the new pages (Detected box, Profiles tab) are built once, in the new
style, instead of in AV Scenes' style first.

Phase 2 is where the real benefit is (no guessed delays). Phases 1 and 2 can ship before any UI changes:
devices you set up already pick up their profile automatically.

## Tests

- **Profiles:** each profile against a fake state stream; e.g. JVC `standby` → `warming` → `on` is
  "coming on, then on", and `error` aborts with the device's message.
- **Sibling finder:** a fake registry shaped like yours (TV at `.53` in three integrations with different
  MACs, Shield at `.72`, projector at `.73`).
- **Runtime:**
  - start waits for `on`, not `delay_after_on`
  - stop waits for `standby` before the outlet is cut
  - a hand-set `state_source` overrides the profile
  - `state_source: none`, or Fixed time, gives today's timings exactly
  - Both waits for the status, then adds the fixed time
  - debounce: a 1-second `on` during warming doesn't end the wait; a 1-second `No Source` doesn't fail the
    picture check
  - each `on_failure` choice for a timeout, an `error` state and a picture check; warn is the default
  - a device already warming isn't sent `turn_on` again
- **Adding a device:** it lands in every ticked activity's power-on order at the place its profile gives
  (projector early, Shield late), with status waits, debounce, warn, indicator and remote filled in; the Lumagen
  picture check is added as the last step.
- **Design:** the token block matches Easy Camera Grid Card's; editing a field keeps open sections open.
- **Profile creation:** unmatched integrations are listed; the draft is built from a fake device; Learn turns a
  recorded state sequence into the right state groups.
- **Detect integrations:** with Android TV Remote removed from the fake registry, the TVs get ADB / PiPup
  replacements; a device with no other integration is reported and falls back to Fixed time; a renamed
  entity is updated; the start-up check raises the Repair.
- **Byte-stability:** a room saved before this change loads and saves byte-identically.
- The existing 116 Python and 27 frontend tests keep passing.

## Decided

- First setup: Detect integrations, match profiles, offer to create the missing ones, then propose rooms, devices
  and starter activities. Nothing is saved without Save.
- Failure handling per device, warn and continue by default, after a debounce.
- Built-in profiles only for integrations we can test here; yours plus `yamaha_musiccast`.
- A device that gets a profile goes into the power-on order with every detection default on.
- Every settings page follows the design guide.

## Done in 2026.11.22.18 (noted 2026-11-22)

- Startup / Shutdown wording and buttons (Startup held 3 s).
- Lumagen not turned on in the first Theater run: its integration had just dropped the connection, so the switch
  was unavailable and the turn-on was skipped. Easy AV Control now waits for an unreachable device; Ltek/lumagen
  v2026.11.22.3 no longer drops the connection on one late reply and gives 90 s after a power command.
- Report export with run traces.

## Roadmap (after this plan)

Done after the plan: **measured times** (2026.11.20.7).

| Priority | Feature |
|---|---|
| High | **Auto-off when nothing plays:** stop the activity after N minutes with nothing playing (from PiPup / ADB), with a warning on the card first ("Theater turns off in 5 min · Keep on") |
| Medium | **Lights follow playback:** per-activity actions on play, pause and stop (dim to 0 on play, 20 % on pause, up on stop), with a short delay so skipping a chapter doesn't flash the lights |
| Medium | **House Modes link:** stop every room when House Modes goes to Away; optionally block or ask before a start in Night mode |
| Low | **Picture follows the content:** actions when the Lumagen's aspect ratio or dynamic range changes while an activity runs (JVC lens memory, HDR picture mode), debounced |
| Low | **More built-in profiles** for integrations you don't have (`denonavr`, `onkyo`, `apple_tv`, `webostv`, `braviatv`, `samsungtv`, `roku`, `kodi`), from each integration's code, labelled *not tested on a device* until someone confirms one through Share |
| Low | **Shared profiles from the repo:** list `profiles/` from GitHub in the Profiles tab, so an accepted profile can be added without a new build |
