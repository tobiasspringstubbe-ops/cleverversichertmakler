# clever versichert – Website

Statische Website der Marke „clever versichert“: Vermittlung von Tierkrankenversicherungen für Hund, Katze und Pferd. Gebaut mit Astro, TypeScript und reinem CSS. Der vollständige Auftrag steht in `BRIEF.md`, alle offenen Punkte in `TODO.md`.

Voraussetzung: Node.js ab 22.23.4, empfohlen die aktuelle LTS-Version 24.

## Start

1. `npm install` installiert alle Abhängigkeiten.
2. `npm run dev` startet den Entwicklungsserver unter `http://localhost:4321`.
3. `npm run dev -- --host` macht die Seite auch am Handy im selben WLAN erreichbar; die Netzwerkadresse steht dann in der Konsole.

## Build

1. `npm run build` prüft die Typen, validiert die JSON-Daten und erzeugt die fertige Seite in `dist/`.
2. `npm run preview` zeigt den Inhalt von `dist/` lokal zum Gegenprüfen.
3. Der Build läuft ohne fremde Server; alle Schriften, Bilder und Skripte liegen im Projekt.

## Deploy

1. Den kompletten Inhalt von `dist/` per SFTP in das Domain-Verzeichnis des Hostings für cleverversichertmakler.de laden (TODO: Hosting-Anbieter mit Serverstandort Deutschland und SFTP-Zugang, siehe `TODO.md`).
2. SSL aktivieren, danach Impressum, Datenschutz, Erstinformation und das Formular auf der Live-Domain testen.
3. Erst wenn alle Punkte in `TODO.md` abgehakt sind, in `src/config.ts` `PLACEHOLDER_MODE` auf `false` setzen und neu bauen.

## Inhalte pflegen

- Kontaktdaten, Domain und Schalter: `src/config.ts`.
- Tarife und Bewertungen: `src/data/insurers.json` (Werte 0 bis 2 oder `null`, Preisspannen als `[von, bis]`); Kriterien und Erklärtexte: `src/data/criteria.json`.
- Team, Partnervereine, FAQ, Kostenkarten: `src/data/team.json`, `partners.json`, `faq.json`, `costs.json`. Ein ungültiger Wert stoppt den Build mit Datei und Pfad.
- Ratgeber: ein Markdown je Artikel in `src/content/wissen/` mit `title`, `description`, `tierarten`, `date`, `sources`.
- Bildmarke neu erzeugen nach Änderung an `public/brand/smiley.svg`: einmalig `npx playwright install chromium`, dann `npm run brand`.
- Erstinformation als PDF aus der Seite erzeugen: `npm run build`, dann `npm run pdf`, dann erneut `npm run build`.
- Der Markenname bleibt überall „clever versichert“; die Domain erscheint nirgends als Markenname.
