"""Constants for the Easy AV Control integration."""
from typing import Final

DOMAIN: Final = "easy_av_control"

# Common prefix for the device name on all platforms
DEVICE_NAME_PREFIX: Final = "AV"

# Config entry schema version (see migration.py)
CONFIG_VERSION: Final = 2
CONFIG_MINOR_VERSION: Final = 2

# Configuration keys (schema v2: rooms -> devices / activities -> steps)
CONF_ROOMS: Final = "rooms"
CONF_ACTIVITIES: Final = "activities"
CONF_DEVICES: Final = "devices"
CONF_ENTITY_ID: Final = "entity_id"
CONF_STEPS: Final = "steps"
# What must be right before the activity counts as running (a picture on the Lumagen, on the projector)
CONF_CHECKS: Final = "checks"
CONF_NAME: Final = "name"
CONF_AREA_ID: Final = "area_id"
CONF_DEFAULT_ACTIVITY: Final = "default_activity"
CONF_DEVICE: Final = "device"
CONF_POWER_SWITCH: Final = "power_switch"
CONF_READY: Final = "ready"
CONF_REMOTE_ENTITY: Final = "remote_entity"
CONF_TIMEOUT: Final = "timeout"
CONF_STATE: Final = "state"
CONF_RELOAD_INTEGRATION: Final = "reload_integration"
CONF_ON_TIMEOUT: Final = "on_timeout"
CONF_DELAY_AFTER_ON: Final = "delay_after_on"
CONF_DELAY_AFTER_OFF: Final = "delay_after_off"
CONF_DELAY_AFTER_POWER: Final = "delay_after_power"
CONF_ON_START: Final = "on_start"
CONF_ON_STOP: Final = "on_stop"
CONF_ID: Final = "id"
CONF_TYPE: Final = "type"
CONF_ICON: Final = "icon"
CONF_ORDER: Final = "order"
CONF_COMMANDS: Final = "commands"
CONF_REMOTE: Final = "remote"
CONF_BUTTONS: Final = "buttons"
CONF_TOUCHPAD: Final = "touchpad"
# Device settings the card offers while an activity runs
CONF_SETTINGS: Final = "settings"
CONF_SETTING: Final = "setting"
CONF_OPTIONS: Final = "options"
SETTING_SOURCE: Final = "source"
SETTING_SOUND_MODE: Final = "sound_mode"
# A setting can also be an entity of the device, e.g. number.receiver_bass
CONF_ENTITY: Final = "entity"
SETTING_ENTITY_DOMAINS: Final = (
    "number", "input_number", "select", "input_select", "switch", "input_boolean",
)
CONF_COMMAND: Final = "command"

# Step parameters
CONF_SOURCE: Final = "source"
CONF_VOLUME_LEVEL: Final = "volume_level"
CONF_SOUND_MODE: Final = "sound_mode"
CONF_TRANSITION: Final = "transition"
CONF_POSITION: Final = "position"
CONF_TILT_POSITION: Final = "tilt_position"
CONF_ACTION: Final = "action"
CONF_BRIGHTNESS_PCT: Final = "brightness_pct"
CONF_COLOR_TEMP_KELVIN: Final = "color_temp_kelvin"
CONF_DATA: Final = "data"
CONF_TARGET: Final = "target"

# Device states (PLAN.md phase 2): what says a device is on, how to wait, what to do when a check fails
CONF_STATE_SOURCE: Final = "state_source"
# The profile a device uses, by id; absent = the one for its integration
CONF_PROFILE: Final = "profile"
CONF_ATTRIBUTE: Final = "attribute"
CONF_AVAILABLE_IS_ON: Final = "available_is_on"
CONF_WAIT_ON: Final = "wait_on"
CONF_WAIT_OFF: Final = "wait_off"
CONF_TIMEOUT_ON: Final = "timeout_on"
CONF_TIMEOUT_OFF: Final = "timeout_off"
CONF_DEBOUNCE: Final = "debounce"
CONF_ON_FAILURE: Final = "on_failure"
STATE_SOURCE_NONE: Final = "none"
WAIT_STATUS: Final = "status"
WAIT_TIME: Final = "time"
WAIT_BOTH: Final = "both"
WAIT_MODES: Final = [WAIT_STATUS, WAIT_TIME, WAIT_BOTH]
FAILURE_WARN: Final = "warn"
FAILURE_STOP: Final = "stop"
FAILURE_RETRY: Final = "retry"
FAILURE_ACTIONS: Final = [FAILURE_WARN, FAILURE_STOP, FAILURE_RETRY]
CHECK_TURN_ON: Final = "turn_on"
CHECK_TURN_OFF: Final = "turn_off"
CHECK_PICTURE: Final = "picture"
CHECKS: Final = [CHECK_TURN_ON, CHECK_TURN_OFF, CHECK_PICTURE]

ON_TIMEOUT_CONTINUE: Final = "continue"
ON_TIMEOUT_ABORT: Final = "abort"
ON_TIMEOUT_OPTIONS: Final = [ON_TIMEOUT_CONTINUE, ON_TIMEOUT_ABORT]

DEFAULT_READY_TIMEOUT: Final = 60
# Upper bound for a single blocking service call during an activity
DEFAULT_SERVICE_TIMEOUT: Final = 15

# Step types
STEP_TYPE_POWER_ON: Final = "power_on"
STEP_TYPE_POWER_OFF: Final = "power_off"
STEP_TYPE_SET_SOURCE: Final = "set_source"
STEP_TYPE_SET_VOLUME: Final = "set_volume"
STEP_TYPE_SET_SOUND_MODE: Final = "set_sound_mode"
STEP_TYPE_SET_BRIGHTNESS: Final = "set_brightness"
STEP_TYPE_SET_COLOR_TEMP: Final = "set_color_temp"
STEP_TYPE_SET_POSITION: Final = "set_position"
STEP_TYPE_SET_TILT: Final = "set_tilt"
STEP_TYPE_CALL_ACTION: Final = "call_action"
STEP_TYPE_DELAY: Final = "delay"
STEP_TYPE_WAIT_AVAILABLE: Final = "wait_available"
# Wait until the device (its profile's picture check, e.g. Lumagen "Active Video") shows a picture
STEP_TYPE_WAIT_PICTURE: Final = "wait_picture"

# Activity states
ACTIVITY_STATE_IDLE: Final = "idle"
ACTIVITY_STATE_STARTING: Final = "starting"
ACTIVITY_STATE_ACTIVE: Final = "active"
ACTIVITY_STATE_STOPPING: Final = "stopping"
ACTIVITY_STATE_ERROR: Final = "error"

# Services
SERVICE_START_ACTIVITY: Final = "start_activity"
SERVICE_STOP_ACTIVITY: Final = "stop_activity"
SERVICE_TOGGLE_ACTIVITY: Final = "toggle_activity"
SERVICE_RELOAD: Final = "reload"
SERVICE_SEND_COMMAND: Final = "send_command"

# Attributes
ATTR_ROOM: Final = "room"
ATTR_ACTIVITY: Final = "activity"
ATTR_COMMAND: Final = "command"
ATTR_DEVICE: Final = "device"
ATTR_VALUE: Final = "value"
ATTR_CURRENT_ACTIVITY: Final = "current_activity"
ATTR_AVAILABLE_ACTIVITIES: Final = "available_activities"

# Remote control: command groups an activity routes to one device each
GROUP_VOLUME: Final = "volume"
GROUP_CHANNELS: Final = "channels"
GROUP_TRANSPORT: Final = "transport"
GROUP_NAVIGATION: Final = "navigation"
COMMAND_GROUPS: Final[dict[str, tuple[str, ...]]] = {
    GROUP_VOLUME: ("volume_up", "volume_down", "mute", "volume_set"),
    GROUP_CHANNELS: ("channel_up", "channel_down"),
    GROUP_TRANSPORT: ("play_pause", "play", "pause", "stop", "next", "previous"),
    GROUP_NAVIGATION: (
        "up", "down", "left", "right", "ok", "back", "menu", "home", "info", "guide", "exit",
    ),
}

# Signal sent whenever the state or configuration of a room changes
SIGNAL_ROOMS_UPDATED: Final = f"{DOMAIN}_rooms_updated"

# Frontend
FRONTEND_URL_BASE: Final = f"/{DOMAIN}_static"
CARD_FILENAME: Final = "easy-av-control-card.js"
# The card's copy in <config>/www, which HA serves as /local from its start, before integrations load
LOCAL_DIR: Final = DOMAIN
LOCAL_URL_BASE: Final = f"/local/{LOCAL_DIR}"
PANEL_FILENAME: Final = "easy-av-control-panel.js"
PANEL_URL_PATH: Final = "easy-av-control"
