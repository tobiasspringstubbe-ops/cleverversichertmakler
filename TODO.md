# Offene Punkte

Jeder Platzhalter im Projekt steht hier mit Datei, Zeile und dem, was fehlt. Nichts davon blockiert den Bau, alles blockiert den Go-live. Die Nummern folgen BRIEF.md Abschnitt 9.

## Platzhalter in Dateien

| Datei | Zeile | Was fehlt | Nr. im Brief |
| --- | --- | --- | --- |
| `src/config.ts` | `WHATSAPP_NUMBER` | WhatsApp-Business-Nummer im internationalen Format ohne Plus | 3 |
| `src/config.ts` | `CONTACT_MAIL` | Kontakt-Mailadresse | 3 |
| `src/config.ts` | `CONTACT_PHONE` | Telefonnummer | 3 |
| `src/config.ts` | `ERREICHBARKEIT_TEXT` | Tage, Zeiten, realistische Antwortzeit | 3 |
| `src/config.ts` | `STANDORT` | Ort in Mittelhessen, kein Hausbesuch-Versprechen | 3 |
| `src/config.ts` | `FORM_ENDPOINT` | CRM-Webhook, falls Anfragen nicht nur per WhatsApp und Mail laufen | 12 |
| `src/config.ts` | `PLACEHOLDER_MODE` | Erst auf `false`, wenn alle Punkte hier abgehakt sind | – |
| `README.md` | Abschnitt Deploy | Hosting-Anbieter (Serverstandort Deutschland) und SFTP-Zugang | 11 |

## Annahmen beim Bau

- Die Domain lautet cleverversichertmakler.de und ist als `SITE_URL` eingetragen. Der Markenname bleibt überall „clever versichert“; die Domain erscheint nirgends als Markenname.
- `ERREICHBARKEIT_TEXT`, `CONTACT_PHONE` und `STANDORT` stehen zusätzlich zu den fünf im Brief genannten Werten in `src/config.ts`, weil Abschnitt 6 und 10 des Briefs sie verwenden.
- Astro 7 verlangt Node.js ab 22.23.4; die README nennt deshalb die LTS-Version 24 als Empfehlung.
- `npm run build` führt vor dem Build `astro check` aus, damit Typfehler den Build stoppen.

## Offene Punkte aus dem Brief (Abschnitt 9)

- [ ] 1 Finale Logovariante (SVG mit drei Streifen oder PNG mit vier)
- [ ] 2 Team: Name, Rolle, Statement, Hintergrund, Tier, Foto, Kontakt je Person
- [ ] 3 WhatsApp-Nummer, Mailadresse, Telefon, Erreichbarkeit
- [ ] 4 Versicherer je Tierart, die über die CLARUS AG vermittelbar sind
- [ ] 5 Kriterienbewertung je Versicherer und Tierart, Preisspannen, Bedingungsstand
- [ ] 6 Rechtsstatus, Firmendaten, Vertretungsberechtigte, Beteiligungen
- [ ] 7 Datenschutzerklärung nach Festlegung von Hosting, Formular-Endpunkt und WhatsApp
- [ ] 8 Erstinformation als PDF
- [ ] 9 Tierschutz: Partnervereine, Freigaben, Versprechen, Auszahlungsmodell
- [ ] 10 GOT-Beispielrechnungen für die neun Kostenkarten
- [ ] 11 Hosting-Anbieter und SFTP-Zugang (Domain: cleverversichertmakler.de)
- [ ] 12 Formular-Endpunkt (CRM-Webhook)
- [ ] 13 Google-Unternehmensprofil und erste Rezensionen
- [ ] 14 Echte Fotos: Team, Beratungssituation, Partnervereine

## Platzhalter und Annahmen aus Schritt 2 (Basislayout)

| Datei | Stelle | Was fehlt oder gilt | Nr. im Brief |
| --- | --- | --- | --- |
| `public/erstinformation.pdf` | Footer-Link „Erstinformation als PDF“ | Datei fehlt noch; der Link ist bis dahin tot und trägt das Badge | 8 |
| `src/components/Footer.astro` | Satz zu WhatsApp und Meta | Formulierung vom Datenschutz-Generator oder Anwalt bestätigen lassen | 7 |
| `public/brand/smiley.svg` | Bildmarke | Finale Logovariante; alle Icons (Favicon, Touch-Icon, og.png) werden aus dieser SVG erzeugt | 1 |

- Die Navigationspunkte verlinken auf Seiten, die erst in Schritt 5 entstehen. Bis dahin führen sie auf 404.
- Primär- und WhatsApp-Button tragen im Hellmodus weißen Text. Im Dunkelmodus sind `--wine` und `--whatsapp` heller, weißer Text erreicht dort keine 4,5:1; deshalb steht dort dunkler Text (`--on-accent`). Der Brief nennt nur Weiß.
- Die mobile Chip-Leiste der Navigation sitzt unter dem Sticky-Header, ist aber selbst nicht sticky, damit auf kleinen Bildschirmen Platz bleibt.
- Die Wortmarke „VERSICHERT“ steht im HTML als „versichert“ und wird per CSS in Versalien gesetzt, damit Vorleseprogramme das Wort natürlich lesen.
- Der WhatsApp-Link fällt ohne Nummer auf `wa.me` ohne Nummer zurück, bis `WHATSAPP_NUMBER` eingetragen ist.
- Die PNG-Icons und `og.png` entstehen mit Chromium aus `public/brand/smiley.svg` (Skript außerhalb des Projekts). Ändert sich die SVG, müssen sie neu erzeugt werden.

## Platzhalter und Annahmen aus Schritt 3 (Datenmodelle)

| Datei | Stelle | Was fehlt | Nr. im Brief |
| --- | --- | --- | --- |
| `src/data/insurers.json` | alle `werte` | Kriterienbewertung 0 bis 2 je Versicherer und Tierart aus den Bedingungswerken; alle Werte sind `null` | 5 |
| `src/data/insurers.json` | alle `preis` | Preisspannen je Tierart, Schutz und Altersband; alle `null` | 5 |
| `src/data/insurers.json` | `tarif`, `quelle` je Versicherer | Tarifname, Bedingungswerk mit Datum | 5 |
| `src/data/insurers.json` | Liste der Versicherer | Mit den Courtagezusagen der CLARUS AG abgleichen und auf die vermittelbaren kürzen | 4 |
| `src/data/criteria.json` | `info` bei `got` (Hund, Katze, Pferd) | Satz an der amtlichen GOT prüfen | 10 |
| `src/data/criteria.json` | `info` bei `hered` | Quelle für Häufigkeit je Rasse | 10 |
| `src/data/costs.json` | `quelle` je Karte, `got_todo` | GOT-Beispielrechnung je Zahl, Verordnung verlinken | 10 |
| `src/data/team.json` | alle drei Einträge | Name, Rolle, Statement, Hintergrund, Tier, Foto, Telefon, Mail, WhatsApp | 2 |
| `src/data/partners.json` | `versprechen`, `zaehler.summe_euro`, `partner` | Versprechen, Betrag, Vereine mit Freigabe | 9 |
| `src/data/faq.json` | `antwortzeit`, `todo` bei `kosten-beratung` und `nach-abschluss` | Erreichbarkeit, Rechtsstatus-Formulierung, Umfang der Betreuung | 3, 6 |

- Kriterien, die für Hund und Katze anders definiert sind als für Pferd (`got`, `limit`, `kuend`, `warte`, `sb`, `aufnahme`, `direkt`), stehen zweimal in `criteria.json`: einmal mit `tierarten: ["hund", "katze"]`, einmal mit `["pferd"]`. Die Zuordnung läuft über Schlüssel plus Tierart.
- Die Altersbänder beim Pferd heißen `u2`, `3-8`, `9-14`, `15+`; bei Hund und Katze `u1`, `1-3`, `4-6`, `7-9`, `10+`.
- Die FAQ-Texte sind tierartneutral, weil der Brief nur eine Fassung je Frage nennt. Der Brief sieht vor, dass Abschnitt 9 mit der Tierart wechselt; das würde eigene Antworten je Tierart brauchen.
- Die Validierung läuft in `src/data/index.ts` beim Build: Schema je Datei plus Querprüfung, dass jeder Versicherer genau die Kriterienschlüssel und Altersbänder seiner Tierarten hat.

## Platzhalter aus Schritt 6 (Wissen-Artikel)

Jede Zahl ohne Quelle trägt im Artikel ein Badge „Platzhalter“ und ein `TODO`. Die Quellen stehen im Frontmatter unter `sources`.

| Datei | Was fehlt | Nr. im Brief |
| --- | --- | --- |
| `src/content/wissen/got-tierarztkosten.md` | Verordnungstext und Datum prüfen, Höhe der Notdienstgebühr, drei GOT-Beispielrechnungen | 10 |
| `src/content/wissen/op-oder-vollschutz.md` | Nachbehandlungszeitraum je Tarif, typische Beitragsspannen je Tierart und Schutzart | 5 |
| `src/content/wissen/vier-streitpunkte.md` | Spannen der Sonderwartezeiten je Tarif | 5 |
| `src/content/wissen/hueftdysplasie-hund.md` | Fachquelle zu Entstehung und Rassen, Häufigkeit je Rasse, GOT-Beispielrechnung je Verfahren | 10 |
| `src/content/wissen/magendrehung.md` | Fachquelle zu Symptomen und Risikofaktoren, GOT-Beispielrechnung, Tarifprüfung zur vorbeugenden Magenfixierung | 10 |
| `src/content/wissen/katze-dauerpatienten.md` | Fachquelle zu CNE, FORL und Harnwegen, GOT-Beispielrechnungen | 10 |
| `src/content/wissen/kolik-pferd.md` | Fachquelle zu Kolikformen, GOT-Beispielrechnung, Bedingungswerke zu Kolik-OP | 10 |
| `src/content/wissen/alter-und-aufnahme.md` | Mindestalter, Höchstaufnahmealter und Altersstaffeln je Tarif | 5 |
| `src/content/wissen/sparen-statt-versichern.md` | Beitragsspannen, GOT-Beispielrechnungen | 5, 10 |
| `src/content/wissen/glossar.md` | keine offenen Zahlen; Begriffe bei Bedarf ergänzen | – |

- Die Quellenlinks auf gesetze-im-internet.de (GOT, VVG, GewO, VersVermV) sind aus dem Gedächtnis gesetzt und vor dem Go-live zu prüfen.
- Die Badges in den Artikeln sind als HTML im Markdown gesetzt; sie verschwinden mit allen anderen Badges, sobald `PLACEHOLDER_MODE` auf `false` steht.
