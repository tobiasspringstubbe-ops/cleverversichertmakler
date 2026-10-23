# Offene Punkte

Jeder Platzhalter im Projekt steht hier mit Datei, Stelle und dem, was fehlt. Nichts davon blockiert den Bau, alles blockiert den Go-live. Die Nummern folgen BRIEF.md Abschnitt 9. Stand: 23.10.2026, alle acht Schritte aus Abschnitt 2 sind gebaut.

Schnellster Weg zum Go-live: Punkte 3, 6, 7 und 8 liefern, `PLACEHOLDER_MODE` bleibt bis dahin `true`. Punkt 5 (Bewertungen) kann schrittweise nachgeliefert werden; der Kompass zeigt unbewertete Versicherer grau mit „Bewertung folgt“.

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
| `public/erstinformation.pdf` | Footer-Link „Erstinformation als PDF“ | Platzhalter-PDF, mit `npm run pdf` aus der Seite /erstinformation erzeugt; enthält dieselben TODO-Werte und Badges | 8 |
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

## Ergebnis der Qualitätssicherung (Schritt 7)

Geprüft am 23.10.2026 auf dem Produktions-Build mit Chromium (Playwright) und Lighthouse 13, mobil.

| Prüfung | Ergebnis |
| --- | --- |
| Lighthouse `/`, `/tier-kompass`, `/kontakt`, `/wissen/got-tierarztkosten` | Performance 100, Accessibility 99 bis 100 (nach Korrektur 100 erwartet), Best Practices 100, SEO 100 |
| HTML-Validierung (html-validate, Regelsatz recommended) | 0 Fehler in allen 22 Seiten; Regel `prefer-native-element` abgeschaltet, weil der Brief `role="radiogroup"` mit `aria-checked` für die Tierwahl vorgibt |
| Fremde Requests zur Laufzeit | keine; nur Links auf wa.me und gesetze-im-internet.de, die erst beim Klick öffnen |
| Konsolenfehler auf allen 12 Seiten | keine |
| Tastatur | Skip-Link, Tierwahl per Pfeiltasten, Chip per Enter öffnet Panel, Escape schließt, Dunkelmodus per Enter |
| JavaScript gesamt | rund 12 KB komprimiert (Budget 60 KB) |
| Darstellung 360, 768, 1280 px, hell und dunkel | geprüft, keine unlesbaren Stellen |
| Tote interne Links | keine; `/erstinformation.pdf` ist seit Schritt 8 ein Platzhalter-PDF aus der Seite |
| `npm run build` | ohne Fehler und Warnungen |

Nicht automatisch geprüft: die Links auf gesetze-im-internet.de und vermittlerregister.info (Netz im Build-Container gesperrt).

## Abschluss (Schritt 8)

- `scripts/brand-assets.mjs` (`npm run brand`) erzeugt Favicon, Touch-Icon und og.png aus `public/brand/smiley.svg`; `scripts/erstinformation-pdf.mjs` (`npm run pdf`) erzeugt das PDF aus der Seite. Beide brauchen einmalig `npx playwright install chromium`.
- Das PDF enthält den Satz „Du findest sie auch als PDF zum Herunterladen“, weil es aus der Seite entsteht. Vor dem Go-live mit den endgültigen Inhalten neu erzeugen; der Satz kann dann per Druck-CSS ausgeblendet werden.
- Die Punkte 13 (Google-Unternehmensprofil, Baustein „Was Kunden sagen“) und 14 (echte Fotos) sind bewusst nicht gebaut; die Teamkarten zeigen Initialen-Kreise, bis Fotos unter `public/img/team/` liegen und in `team.json` eingetragen sind.
- Hinweis zum Punkt 6: Die Domain cleverversichertmakler.de nennt den Maklerstatus. Sollte die Tätigkeit nicht unter eigener Erlaubnis nach § 34d GewO laufen, gehört die Domain selbst in die juristische Prüfung.

## GitHub Pages

- Deploy läuft über `.github/workflows/deploy.yml` bei jedem Push auf `main`. Adresse ohne eigene Domain: `https://tobiasspringstubbe-ops.github.io/cleverversichertmakler/`. Der Workflow setzt `SITE_URL` und `BASE_PATH`; alle internen Links laufen über `src/lib/url.ts`, Markdown-Links über `src/lib/rehype-base.mjs`.
- Für die eigene Domain: in den Repository-Einstellungen unter Pages die Custom Domain eintragen, DNS setzen. Der Basis-Pfad wird dann leer, `robots.txt` und Sitemap stimmen dann wieder.
- Der Workflow versucht, Pages selbst zu aktivieren (`enablement: true`). Schlägt das mangels Rechten fehl: Settings, Pages, Source auf „GitHub Actions“ stellen und den Workflow erneut starten.
- `build.format` ist `file` (`/kontakt` liegt als `kontakt.html`). GitHub Pages löst `/kontakt` automatisch auf; ein Apache-Webspace braucht dafür `Options +MultiViews` oder eine Rewrite-Regel in `.htaccess` (TODO bei Punkt 11).

## Änderungen nach Abnahme

- 23.10.2026, Kostenblock: zeigt wieder nur die Karten der gewählten Tierart, wie im Brief. Zwischenzeitlich waren alle neun Karten sichtbar; Ursache war ein Fehler im CSS (siehe unten), nicht die Umschaltung.
- 23.10.2026, Fehler behoben: Das Ausblenden tierfremder Inhalte (`[data-for] { display: none }`) hatte eine niedrigere Spezifität als die scoped Komponentenregel `.cost-cards__grid { display: grid }`, deshalb waren alle drei Kartensätze sichtbar. Jetzt gilt `!important` für Aus- und Einblenden, und `data-for` sitzt nur noch auf Wrappern ohne eigene Layout-Stile. Die Qualitätssicherung in Schritt 7 hatte den Kostenblock nicht gezielt geprüft.
- 23.10.2026, Hund als Standard: Ohne gespeicherte Wahl zeigt die Seite jetzt Hund statt der neutralen Fassung (Vorgabe Tobias; Brief Abschnitt 4 sah neutrale Texte vor). Die Wahl wird erst gespeichert, wenn jemand eine Kachel antippt.
- 23.10.2026, Hero: Tierwahl, goldene Trennlinie und Einleitungssatz haben dieselbe Breite (volle Containerbreite); der Satz steht ab 1280 px in einer Zeile, darunter mit ausgeglichenem Umbruch (`text-wrap: balance`).
- 23.10.2026, Tiersymbole: Hund, Katze und Pferd sind gefüllte Silhouetten aus Phosphor Icons (MIT) statt eigener Linien-Icons (Brief Abschnitt 3 sah eigene Linien-Icons vor). Lizenzhinweis in der README.
