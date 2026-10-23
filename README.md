# clever versichert – Website

Statische Website der Marke „clever versichert“: Vermittlung von Tierkrankenversicherungen für Hund, Katze und Pferd. Gebaut mit Astro, TypeScript und reinem CSS. Der vollständige Auftrag steht in `BRIEF.md`, offene Punkte in `TODO.md`.

Voraussetzung: Node.js ab 22.23.4, empfohlen die aktuelle LTS-Version 24.

## Start

1. `npm install` installiert alle Abhängigkeiten.
2. `npm run dev` startet den Entwicklungsserver unter `http://localhost:4321`.
3. Mit `npm run dev -- --host` ist die Seite auch am Handy im selben WLAN erreichbar.

## Build

1. `npm run build` prüft die Typen und erzeugt die fertige Seite in `dist/`.
2. `npm run preview` zeigt den Inhalt von `dist/` lokal zum Gegenprüfen.
3. Der Build läuft ohne fremde Server; alle Schriften und Bilder liegen im Projekt.

## Deploy

1. Den kompletten Inhalt von `dist/` per SFTP in das Domain-Verzeichnis des Hostings laden (TODO: Hosting-Anbieter und SFTP-Zugang, siehe `TODO.md`).
2. SSL für cleverversichertmakler.de aktivieren und danach Impressum, Datenschutz, Erstinformation und Formular auf der Live-Domain testen.
3. Erst wenn alle Punkte in `TODO.md` abgehakt sind, in `src/config.ts` `PLACEHOLDER_MODE` auf `false` setzen und neu bauen.

## Inhalte pflegen

- Texte und Daten liegen in `src/data/` als JSON und in `src/content/wissen/` als Markdown.
- Kontaktdaten, Domain und Schalter stehen in `src/config.ts`.
- Der Markenname bleibt überall „clever versichert“; die Domain erscheint nirgends als Markenname.
