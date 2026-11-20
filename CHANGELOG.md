# Changelog

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
