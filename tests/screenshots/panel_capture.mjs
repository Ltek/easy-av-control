// Screenshots of the configuration panel and the card editor, from a real Home Assistant (panel_run.sh).
// Each page is taken in the dark and the light theme; files go to $OUT as panel-<name>[-light].png.
import fs from 'node:fs';
import path from 'node:path';

const HA = process.env.HA_URL || 'http://127.0.0.1:8125';
const OUT = process.env.OUT || 'docs/images';
const ROOM = JSON.parse(fs.readFileSync(process.env.ROOM_JSON, 'utf8'));
let chromium;
for (const mod of [process.env.PLAYWRIGHT_CORE, 'playwright-core', 'playwright'].filter(Boolean)) {
  try { ({ chromium } = await import(mod)); break; } catch (_e) { /* next */ }
}
if (!chromium) { console.error('playwright-core not found (set PLAYWRIGHT_CORE)'); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}),
  env: { ...process.env, LD_LIBRARY_PATH: '' },
});
const errors = [];
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'dark' });
const page = await context.newPage();
// Name the websocket command behind an "Unknown command" error
page.on('websocket', (ws) => {
  const sent = new Map();
  ws.on('framesent', ({ payload }) => {
    try { const m = JSON.parse(payload); if (m.id) sent.set(m.id, m.type); } catch { /* not JSON */ }
  });
  ws.on('framereceived', ({ payload }) => {
    try {
      for (const m of [].concat(JSON.parse(payload))) {
        if (m.error?.code === 'unknown_command') console.log('UNKNOWN COMMAND', sent.get(m.id));
      }
    } catch { /* not JSON */ }
  });
});
page.on('pageerror', (e) => errors.push(`${e.message} ${JSON.stringify(e).slice(0, 300)} ${(e.stack || '').split('\n').slice(0, 3).join(' | ')} [${page.url()}]`));
await page.addInitScript(() => window.addEventListener('unhandledrejection', (ev) => console.error('UNHANDLED', JSON.stringify(ev.reason), String(ev.reason?.stack || ''))));
page.on('console', async (m) => {
  if (m.type() !== 'error' || /favicon|manifest|service worker/i.test(m.text())) return;
  const args = await Promise.all(m.args().map((x) => x.jsonValue().catch(() => '?')));
  errors.push(`${JSON.stringify(args).slice(0, 300)} @ ${m.location().url?.split('/').pop()}:${m.location().lineNumber} [${page.url()}]`);
});
const settle = (ms = 1200) => page.waitForTimeout(ms);
const ws = (msg) => page.evaluate((m) => document.querySelector('home-assistant').hass.callWS(m), msg);
const api = (method, p, body) => page.evaluate(([m, p2, b]) => document.querySelector('home-assistant').hass.callApi(m, p2, b), [method, p, body]);

await page.goto(`${HA}/`);
await page.getByLabel('Username', { exact: true }).fill('demo');
await page.getByLabel('Password', { exact: true }).fill('demo');
await page.keyboard.press('Enter');
await page.waitForFunction(() => !!document.querySelector('home-assistant')?.hass?.states, null, { timeout: 60000 });
await settle(2500);
// Home Assistant serves the frontend before it has set up every integration: wait for the fake devices
await page.waitForFunction(
  () => {
    const s = document.querySelector('home-assistant')?.hass?.states ?? {};
    return !!s['media_player.projector'] && !!s['switch.projector_outlet'];
  },
  null,
  { timeout: 300000, polling: 1000 },
);
await settle(1500);

// The integration with the demo room, and one profile of your own for the fake devices
const flow = await api('POST', 'config/config_entries/flow', { handler: 'easy_av_control' });
await api('POST', `config/config_entries/flow/${flow.flow_id}`, {});
await settle(3000);
const config = await ws({ type: 'easy_av_control/config/get' });
await ws({ type: 'easy_av_control/config/save', rooms: { living_room: ROOM }, revision: config.revision });
await settle(4000);
await ws({
  type: 'easy_av_control/profiles/import',
  export: {
    kind: 'easy-av-control/profile', v: 1,
    profiles: {
      av_demo: {
        id: 'av_demo', name: 'AV Demo devices', integration: 'av_demo',
        device_entity: { domain: 'media_player' },
        indicator: { on: ['on', 'idle', 'playing', 'paused'], off: ['off'] },
        timeouts: { on: 60, off: 120 }, debounce: 1, order: 'middle', roles: { power: 1, now_playing: 1 },
      },
    },
  },
});

const panel = () => page.locator('easy-av-control-panel');
async function openPanel() {
  await page.goto(`${HA}/easy-av-control`);
  try {
    await panel().waitFor({ timeout: 60000 });
  } catch (err) {
    await page.screenshot({ path: path.join(OUT, 'failed.png') });
    console.log(errors.join('\n'));
    throw err;
  }
  await page.locator('easy-av-control-room-editor').waitFor({ timeout: 30000 });
  await settle(2000);
}
async function shotBoth(name, prepare) {
  for (const scheme of ['dark', 'light']) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.evaluate((dark) => {
      const ha = document.querySelector('home-assistant');
      ha.dispatchEvent(new CustomEvent('settheme', { detail: { dark }, bubbles: true, composed: true }));
    }, scheme === 'dark');
    await settle(800);
    if (prepare) await prepare();
    const file = path.join(OUT, `panel-${name}${scheme === 'light' ? '-light' : ''}.png`);
    await page.screenshot({ path: file });
    console.log('saved', file);
  }
}

await openPanel();
await shotBoth('devices');
// The Guide opens in the right pane; Close goes back
await page.locator('easy-av-control-panel nav button', { hasText: 'Guide' }).click();
await settle(1000);
await shotBoth('guide');
await page.locator('easy-av-control-guide button', { hasText: 'Close' }).click();
await settle(600);
// Reports: runs grouped by activity, one expanded with its phases; then the devices
await page.locator('easy-av-control-panel nav button', { hasText: 'Reports' }).click();
await settle(1500);
await page.locator('easy-av-control-reports button.row').first().click();
await settle(600);
await page.locator('easy-av-control-reports button.run-row').first().click();
await settle(600);
await shotBoth('reports-runs');
await page.locator('easy-av-control-reports summary', { hasText: 'Devices' }).click();
await settle(800);
await page.locator('easy-av-control-reports details[open] .ltek-item.group button.row').nth(1).click();
await settle(600);
await shotBoth('reports-devices');
// Notifications: an offer per room and monitor problem
await page.getByRole('button', { name: 'Notifications' }).last().click();
await page.locator('easy-av-control-notifications .offer').first().waitFor({ timeout: 30000 });
await settle(1200);
await shotBoth('notifications');
await page.locator('easy-av-control-panel nav button.room', { hasText: 'Living room' }).click();
await settle(1000);
await settle(800);

// A device: the Device state panel with what was detected
await page.getByRole('button', { name: /Projector/ }).first().click();
await settle(2500);
await shotBoth('device', async () => {
  await page.locator('easy-av-control-room-editor details.ltek-sec').nth(1).scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo({ top: 0 }));
});
await page.mouse.wheel(0, 650);
await settle(800);
await shotBoth('device-state');

// Power Outlet: its checkbox, greyed out while unticked
await page.locator('easy-av-control-room-editor summary', { hasText: 'Power Outlet' }).click();
await settle(800);
await page.locator('easy-av-control-room-editor summary', { hasText: 'Power Outlet' }).scrollIntoViewIfNeeded();
await shotBoth('device-power');
await page.locator('easy-av-control-room-editor label.check input').first().click();
await settle(800);
await shotBoth('device-power-off');

// An activity with its flow
await openPanel();
await page.getByRole('tab', { name: 'Activities' }).click();
await settle(800);
await page.getByRole('button', { name: /^TV/ }).first().click();
await settle(3000);
await shotBoth('activity');
// The Flow is the editor: ✎ on a device opens its order, Before and settings in place
await page.locator('easy-av-control-flow li.device button.edit').nth(2).click();
await settle(1500);
await page.locator('easy-av-control-flow li.inline').scrollIntoViewIfNeeded();
await shotBoth('activity-flow-edit-device');
await page.locator('easy-av-control-flow li.checks button.edit').first().click();
await settle(1500);
await page.locator('easy-av-control-flow li.inline').scrollIntoViewIfNeeded();
await shotBoth('activity-checks');
await page.locator('easy-av-control-room-editor .inline-bar button').first().click();
await settle(800);
await page.locator('easy-av-control-flow .adder').scrollIntoViewIfNeeded();
await shotBoth('activity-flow-add');
await page.locator('easy-av-control-flow [slot="add-start"] button.ltek-add', { hasText: 'Started by' }).click();
await settle(1200);
await page.locator('easy-av-control-flow [slot="add-start"] .inline-add').scrollIntoViewIfNeeded();
await shotBoth('activity-started-by');
// While active: the monitor
await page.locator('easy-av-control-flow .modes button', { hasText: 'While active' }).click();
await settle(1500);
await page.locator('easy-av-control-flow [slot="add-monitor"] button.ltek-add', { hasText: 'Auto-off' }).click();
await settle(1500);
await page.locator('easy-av-control-flow').scrollIntoViewIfNeeded();
await shotBoth('activity-monitor');
await page.locator('easy-av-control-room-editor summary', { hasText: 'Remote control preview' }).click();
await settle(2500);
await page.locator('easy-av-control-remote-preview').scrollIntoViewIfNeeded();
await shotBoth('activity-preview');

// The menu's Flow icon opens the activity at its Flow
await page.locator('easy-av-control-panel button.nav-flow').first().click();
await settle(2500);
await page.locator('easy-av-control-flow').scrollIntoViewIfNeeded();
await shotBoth('activity-flow');
await page.locator('easy-av-control-flow details.options summary').click();
await settle(600);
await page.locator('easy-av-control-flow details.options').scrollIntoViewIfNeeded();
await shotBoth('activity-flow-options');
await page.locator('easy-av-control-flow details.options summary').click();
// The Remote control card's panels under their divider; Settings in the card by integration
await page.locator('easy-av-control-room-editor summary', { hasText: 'Settings in the card' }).click();
await settle(1200);
await page.locator('easy-av-control-room-editor .card-divider').scrollIntoViewIfNeeded();
await shotBoth('activity-card');

// Profiles
await page.getByRole('button', { name: 'Profiles' }).last().click();
await settle(1500);
await page.locator('easy-av-control-profiles button[title="Show the summary"]').nth(1).click();
await settle(600);
await shotBoth('profiles');
await page.locator('easy-av-control-profiles button[title="View"]').first().click();
await settle(1500);
await shotBoth('profile-view');
await page.getByRole('button', { name: /Close/ }).first().click();
await settle(800);
await page.locator('easy-av-control-profiles button[title="Export"]').first().click();
await settle(1200);
await shotBoth('profile-export');
await page.keyboard.press('Escape');

// The profile form: your own profile (editable), its Status panel open
await openPanel();
await page.getByRole('button', { name: 'Profiles' }).last().click();
await settle(1200);
await page.locator('easy-av-control-profiles [data-profile="av_demo"] button[title="Edit"]').click();
await page.locator('easy-av-control-profile-form').waitFor({ timeout: 30000 });
await settle(1500);
await shotBoth('profile-form');
await page.locator('easy-av-control-profile-form details.ltek-sec >> nth=1 >> summary').click();
await settle(800);
await shotBoth('profile-form-status');
await page.getByRole('button', { name: /Cancel/ }).first().click();
await settle(600);

// Detect integrations: with the demo profile deleted, the fake devices' integration has no profile
await ws({ type: 'easy_av_control/profiles/delete', profile_id: 'av_demo' });
await openPanel();
await page.getByRole('button', { name: 'Detect integrations' }).click();
await page.locator('easy-av-control-detect .ltek-btn.primary').waitFor({ timeout: 30000 });
await settle(1500);
await shotBoth('detect');
// + Profile from there: a draft with Learn
await page.locator('easy-av-control-detect button.ltek-add').first().click();
await page.locator('easy-av-control-profiles easy-av-control-profile-form').waitFor({ timeout: 30000 });
await settle(2000);
await shotBoth('profile-draft');

// The card editor
await page.evaluate(async () => {
  const ha = document.querySelector('home-assistant');
  await customElements.whenDefined('easy-av-control-card-editor');
  const host = document.createElement('div');
  host.id = 'ed-host';
  host.style.cssText = 'position:fixed;inset:0;z-index:99999;background:var(--primary-background-color);padding:24px;overflow:auto';
  const box = document.createElement('div');
  box.style.cssText = 'max-width:560px;background:var(--card-background-color);padding:16px;border-radius:12px';
  const ed = document.createElement('easy-av-control-card-editor');
  ed.hass = ha.hass;
  ed.setConfig({ type: 'custom:easy-av-control-card', room: 'living_room' });
  box.appendChild(ed); host.appendChild(box); document.body.appendChild(host);
});
await settle(2500);
await shotBoth('card-editor');

// The card as Home Assistant's editor shows it (it sets preview = true), with its Flow open
await page.evaluate(async () => {
  document.getElementById('ed-host')?.remove();
  const ha = document.querySelector('home-assistant');
  await customElements.whenDefined('easy-av-control-card');
  const host = document.createElement('div');
  host.id = 'card-host';
  host.style.cssText = 'position:fixed;inset:0;z-index:99999;background:var(--primary-background-color);padding:24px;overflow:auto';
  const box = document.createElement('div');
  box.style.cssText = 'max-width:520px';
  const card = document.createElement('easy-av-control-card');
  card.hass = ha.hass;
  card.setConfig({ type: 'custom:easy-av-control-card', room: 'living_room' });
  card.preview = true;
  box.appendChild(card); host.appendChild(box); document.body.appendChild(host);
  window.__eacCard = card;
});
await settle(2500);
await page.evaluate(() => window.__eacCard._flowOpen = true);
await settle(2500);
await shotBoth('card-flow');
// Starting: the Flow marks what is done and what runs now
await page.evaluate(() => {
  const ha = document.querySelector('home-assistant');
  ha.hass.callService('easy_av_control', 'start_activity', { room: 'living_room', activity: 'movie' });
});
await settle(5000);
await shotBoth('card-flow-live');

console.log(errors.length ? `PAGE ERRORS:\n${[...new Set(errors)].join('\n')}` : 'no page errors');
await browser.close();
