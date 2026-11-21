/**
 * The guide at the top of the panel: how to set up a room, the terms used
 * in the forms and an example. Collapsed by default; the browser remembers
 * whether it was open.
 */
import { LitElement, css, html, type TemplateResult } from "lit";
import { ltekChrome, ltekPanelScale, ltekTokens } from "./ltek-styles";

const DOCS = "https://github.com/Ltek/easy-av-control#readme";

interface Guide {
  title: string;
  close: string;
  steps_title: string;
  steps: TemplateResult[];
  terms_title: string;
  terms: [string, string][];
  example_title: string;
  example: TemplateResult[];
  docs: TemplateResult;
}

const GUIDES: Record<string, Guide> = {
  en: {
    title: "Guide",
    close: "Close",
    steps_title: "How it works",
    steps: [
      html`<b>Add the devices</b> of the room under <i>Devices</i>: pick each device's entity. If it hangs on a
        switchable outlet, enter it under <i>Power Outlet</i>. If it loses its connection without power (Apple TV), use
        the recommended button under <i>Connection check</i>.`,
      html`<b>Put together activities</b> under <i>Activities</i>: choose the devices in the order they are
        switched on, and under <i>Actions after start</i> for example the TV's input. Quick-select buttons start apps.`,
      html`<b>Save and add the card:</b> save at the top right. On a dashboard, add a card, search for
        <i>Easy AV Control Remote</i> and choose the room.`,
    ],
    terms_title: "Terms",
    terms: [
      ["Outlet", "Switch that powers the device. Switched on first and off last; outlets shared by several devices stay on while one of them is needed."],
      ["Boot time", "Wait after the outlet came on, before the device is switched on. Only when the outlet was off."],
      ["Waiting times", "After switching on: until the device accepts commands. After switching off: cool-down, e.g. for a projector lamp."],
      ["Connection check", "Waits until the device is reachable in Home Assistant, at the start and before remote buttons; can reload its integration until it connects."],
      ["Checks", "What must be right before the activity counts as running, e.g. a picture on the Lumagen and the projector."],
      ["Actions after start", "Run once all devices are on and the checks passed: input, volume, sound mode, any action."],
      ["Remote control", "Which device gets volume, channels, playback and arrow keys. Automatic: volume to the first media player, the rest to the last."],
      ["Quick select", "Buttons that switch a media player to a source, on an Apple TV to an app."],
      ["Settings in the card", "On a device: source, sound mode and entities such as tone controls, changeable in the card in every activity that uses it; automatic or chosen with favourites. An activity can choose its own."],
    ],
    example_title: "Example: TV and Apple TV",
    example: [
      html`Device <i>TV</i>: entity <code>media_player.tv</code>, outlet <code>switch.tv_outlet</code>, boot time
        15 s, wait after switching on 10 s.`,
      html`Device <i>Apple TV</i>: entity <code>media_player.apple_tv</code>, under <i>Connection check</i> the
        button <i>Use remote.apple_tv for the connection check and the arrow keys</i>.`,
      html`Activity <i>Apple TV</i>: devices TV, then Apple TV; action after start <i>Set source</i> on the TV to its
        HDMI input; quick select Apple TV with Netflix.`,
      html`Save, add the card, start the activity.`,
    ],
    docs: html`All options and the YAML reference: <a href=${DOCS} target="_blank" rel="noreferrer">documentation on GitHub</a>.`,
  },
  de: {
    title: "Anleitung",
    close: "Schließen",
    steps_title: "So geht's",
    steps: [
      html`<b>Geräte anlegen</b> unter <i>Geräte</i>: Für jedes Gerät die Entität wählen. Hängt es an einer
        schaltbaren Steckdose, diese unter <i>Steckdose</i> eintragen. Verliert es ohne Strom die Verbindung (Apple
        TV), unter <i>Verbindung prüfen</i> den empfohlenen Knopf nutzen.`,
      html`<b>Aktivitäten zusammenstellen</b> unter <i>Aktivitäten</i>: die Geräte in Einschaltreihenfolge wählen,
        unter <i>Aktionen nach dem Start</i> zum Beispiel den Eingang des TV. Schnellwahl-Tasten starten Apps.`,
      html`<b>Speichern und Card einfügen:</b> oben rechts speichern. Im Dashboard eine Karte hinzufügen,
        <i>Easy AV Control Remote</i> suchen und den Raum wählen.`,
    ],
    terms_title: "Begriffe",
    terms: [
      ["Steckdose", "Schalter, an dem das Gerät hängt. Wird zuerst ein- und zuletzt ausgeschaltet; gemeinsame Steckdosen mehrerer Geräte bleiben an, solange eines davon gebraucht wird."],
      ["Startzeit", "Wartezeit nach dem Einschalten der Steckdose, bevor das Gerät eingeschaltet wird. Nur wenn die Steckdose aus war."],
      ["Wartezeiten", "Nach dem Einschalten: bis das Gerät Befehle annimmt. Nach dem Ausschalten: Abkühlzeit, z. B. für eine Beamer-Lampe."],
      ["Verbindung prüfen", "Wartet, bis das Gerät in Home Assistant erreichbar ist, beim Start und vor Tasten der Fernbedienung; kann seine Integration neu laden, bis sie verbunden ist."],
      ["Prüfungen", "Was stimmen muss, bevor die Aktivität als laufend gilt, z. B. ein Bild am Lumagen und am Projektor."],
      ["Aktionen nach dem Start", "Laufen, sobald alle Geräte an sind und die Prüfungen bestanden: Eingang, Lautstärke, Klangmodus, beliebige Aktion."],
      ["Fernbedienung", "Welches Gerät Lautstärke, Sender, Wiedergabe und Pfeiltasten bekommt. Automatisch: Lautstärke an den ersten Mediaplayer, der Rest an den letzten."],
      ["Schnellwahl", "Tasten, die einen Mediaplayer auf eine Quelle schalten, beim Apple TV auf eine App."],
      ["Einstellungen in der Karte", "Am Gerät: Quelle, Klangmodus und Entitäten wie Klangregler, in der Karte änderbar in jeder Aktivität, die es nutzt; automatisch oder ausgewählt mit Favoriten. Eine Aktivität kann eigene wählen."],
    ],
    example_title: "Beispiel: TV und Apple TV",
    example: [
      html`Gerät <i>TV</i>: Entität <code>media_player.tv</code>, Steckdose <code>switch.steckdose_tv</code>,
        Startzeit 15 s, Warten nach Einschalten 10 s.`,
      html`Gerät <i>Apple TV</i>: Entität <code>media_player.apple_tv</code>, unter <i>Verbindung prüfen</i> der
        Knopf <i>remote.apple_tv für Verbindungsprüfung und Pfeiltasten nutzen</i>.`,
      html`Aktivität <i>Apple TV</i>: Geräte TV, dann Apple TV; Aktion nach dem Start <i>Quelle wählen</i> am TV auf
        den HDMI-Eingang; Schnellwahl Apple TV mit Netflix.`,
      html`Speichern, Card einfügen, Aktivität starten.`,
    ],
    docs: html`Alle Optionen und die YAML-Referenz: <a href=${DOCS} target="_blank" rel="noreferrer">Dokumentation auf GitHub</a>.`,
  },
};



export class EasyAvControlGuide extends LitElement {
  static properties = { language: {} };

  declare language?: string;

  protected render(): TemplateResult {
    const lang = (this.language ?? "en").split("-")[0];
    const g = GUIDES[lang] ?? GUIDES.en;
    return html`<div class="page">
      <div class="head">
        <h2><ha-icon icon="mdi:help-circle-outline"></ha-icon>${g.title}</h2>
        <button class="ltek-btn" @click=${() => this.dispatchEvent(new CustomEvent("close"))}>
          <ha-icon icon="mdi:close"></ha-icon> ${g.close}
        </button>
      </div>
      <div class="body">
        <h3>${g.steps_title}</h3>
        <ol>
          ${g.steps.map((step) => html`<li>${step}</li>`)}
        </ol>
        <h3>${g.terms_title}</h3>
        <dl>
          ${g.terms.map(([term, text]) => html`<dt>${term}</dt><dd>${text}</dd>`)}
        </dl>
        <h3>${g.example_title}</h3>
        <ol>
          ${g.example.map((step) => html`<li>${step}</li>`)}
        </ol>
        <p>${g.docs}</p>
      </div>
    </div>`;
  }

  static styles = [
    ltekTokens,
    ltekPanelScale,
    ltekChrome,
    css`
    :host {
      display: block;
      margin-bottom: 16px;
      font-size: var(--ltek-fs-label);
    }
    .page {
      border: 1px solid var(--ltek-c-accent);
      border-radius: var(--ltek-r-panel);
      background: var(--ltek-c-surface);
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--ltek-sp-3);
      padding: var(--ltek-sp-5) var(--ltek-sp-6);
    }
    h2 {
      display: flex;
      align-items: center;
      gap: var(--ltek-sp-3);
      margin: 0;
      font-size: var(--ltek-fs-panel-title);
      font-weight: var(--ltek-fw-semibold);
      --mdc-icon-size: var(--ltek-icon-lg);
    }
    h2 ha-icon {
      color: var(--ltek-c-accent);
    }
    .head .ltek-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--ltek-sp-1);
      --mdc-icon-size: 16px;
    }
    .body {
      padding: 0 var(--ltek-sp-6) var(--ltek-sp-6);
      line-height: 1.5;
    }
    h3 {
      color: var(--accent-color, var(--ltek-c-accent));
      font-size: var(--ltek-fs-group);
      font-weight: 500;
      margin: 12px 0 4px;
    }
    ol {
      margin: 0;
      padding-left: 22px;
    }
    li {
      margin-bottom: 6px;
    }
    dl {
      margin: 0;
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 4px 16px;
    }
    dt {
      font-weight: 500;
    }
    dd {
      margin: 0;
      color: var(--secondary-text-color);
    }
    @media (max-width: 600px) {
      dl {
        grid-template-columns: 1fr;
      }
      dd {
        margin-bottom: 6px;
      }
    }
    code {
      font-size: var(--ltek-fs-body);
      overflow-wrap: anywhere;
    }
    a {
      color: var(--primary-color);
    }
  `,
  ];
}

if (!customElements.get("easy-av-control-guide")) {
  customElements.define("easy-av-control-guide", EasyAvControlGuide);
}
