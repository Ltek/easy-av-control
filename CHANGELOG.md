# Changelog

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
