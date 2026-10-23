# Brief für Claude Code – Website clever versichert (Tierkrankenversicherung)

Oct 22, 2026 · @Tobias Springstubbe

## 1. Auftrag und Kontext

Baue die Website der Marke „clever versichert“: Vermittlung von Tierkrankenversicherungen für Hund, Katze und Pferd. Ziel der Seite ist nicht der Online-Abschluss, sondern Vertrauen und eine Kontaktanfrage per WhatsApp oder Formular. Kein Live-Tarifrechner: der Tier-Kompass ist ein transparentes Kriterien-Ranking mit gepflegten Daten.

| Punkt | Vorgabe |
| --- | --- |
| Marke | clever versichert, Claim „Frage immer erst warum.“ |
| Betreiber | Beratungsteam aus Mittelhessen; Maklerlösung angebunden an die CLARUS AG, Augsburg (TODO: Rechtsstatus und genaue Bezeichnung, siehe Abschnitt 9) |
| Zielgruppe | Halter und künftige Halter von Hunden, Katzen und Pferden in Deutschland; mehrheitlich mobil unterwegs |
| Ziel je Besuch | In 3 Sekunden das eigene Tier wählen, verstehen, warum und wo es Grenzen gibt, dann Kontakt aufnehmen |
| Sprache und Ton | Deutsch, Anrede „du“, warm, ehrlich, kurze Sätze; keine Emojis, keine Versalien-Labels, Sentence Case |
| Prinzip | Weniger ist mehr: 5 Navigationspunkte, ein Ziel, 3 Top-Tarife sichtbar, Rest eingeklappt |
| Nicht bauen | Online-Abschluss, Beitragsberechnung, Kundenportal, Blog-Kommentare, Tracking |

### Benchmark

[die-tierversicherer.de](https://die-tierversicherer.de) (Berliner Makler, laut Startseite am 22.10.2026: 41 Anbieter, über 600 Google-Bewertungen, 16.000 Tierhalter, Tierärzte im Team, WhatsApp-Beratung 7 bis 22 Uhr, Vergleich in 24 Stunden) zeigt das funktionierende Modell: WhatsApp-Funnel, Ratgeber mit GOT-Bezug, FAQ, Erstinformation. Nichts davon übernehmen – keine Texte, kein Design, kein Name mit „Tierversicherer“ (Verwechslungsgefahr).

| Lernen | Abgrenzen |
| --- | --- |
| Ein Ziel pro Seite: Gespräch | Pferd (beim Benchmark Fehlanzeige) |
| Ehrliche Einwandbehandlung in FAQ und Ratgeber | Tierschutz-Partnerschaft mit konkretem Versprechen |
| Rechtsseiten vollständig (Impressum, Datenschutz, Erstinformation) | Tier-Kompass: nachvollziehbares Kriterien-Ranking statt „vertrau uns“ |
| Team mit Gesicht und Statement | Regionale, persönliche Beratung, auch vor Ort |
| Nicht mit der Anbieterzahl werben | Keine Versprechen (Antwortzeiten), die ein kleines Team nicht hält |

## 2. Arbeitsanweisung für Claude Code

Baue eine statische Website mit Astro (aktuelle stabile Version, Output „static“), TypeScript und reinem CSS mit Custom Properties. Inhalte liegen als Markdown (Content Collections) und JSON in `src/data/`, damit Tobias sie ohne Programmierkenntnisse pflegen kann. Zur Laufzeit darf die Seite keine fremden Server anfragen: keine CDN-Skripte, keine Google-Fonts-Links, keine Tracker, keine Karten-Embeds, keine externen Bilder.

| Baustein | Vorgabe |
| --- | --- |
| Framework | Astro, `output: "static"`, Content Collections für `/wissen`, eine Interaktiv-Insel (`client:load`) nur für Tier-Kompass und Kontaktformular |
| Sprache | TypeScript strict, vanilla DOM-Code in den Inseln (kein React, kein Tailwind) |
| Styles | `src/styles/tokens.css` (Abschnitt 3) + `global.css`; mobile first, Breakpoints 600 px und 900 px |
| Schrift | Poppins über das npm-Paket `@fontsource/poppins` (self-hosted, Gewichte 400, 500, 600, 700, 800, Subset latin, `font-display: swap`) |
| Daten | `src/data/species.json`, `criteria.json`, `insurers.json`, `team.json`, `partners.json`, `faq.json`, `costs.json` – Schemas in Abschnitt 5 und 7 |
| Konfiguration | `src/config.ts`: `SITE_URL`, `WHATSAPP_NUMBER`, `CONTACT_MAIL`, `PLACEHOLDER_MODE`, `FORM_ENDPOINT` (alle mit `TODO`-Werten vorbelegt) |
| Bilder | lokal unter `public/img/`, WebP, feste Breiten und Höhen, `loading="lazy"` außer Hero |
| Build und Deploy | `npm run build` erzeugt `dist/`; Upload per SFTP auf deutschen Webspace; `README.md` beschreibt Start, Build, Deploy in je 3 Zeilen |
| Versionierung | `git init`, ein Commit je Schritt mit sprechender Nachricht |

### Vorgehen in 8 Schritten

1. Projekt anlegen: Astro minimal, TypeScript strict, `@fontsource/poppins` installieren, `README.md`, `TODO.md`, `src/config.ts` mit allen Platzhaltern.
2. Design-Tokens und Basislayout: `tokens.css` (hell und dunkel), `BaseLayout.astro` mit Header, Navigation, Footer, Sticky-WhatsApp-Button, Meta und Open-Graph-Tags, Favicon aus dem Smiley-SVG.
3. Datenmodelle anlegen und mit den Platzhaltern aus Abschnitt 5 und 7 füllen; Validierung der JSON-Dateien beim Build (Zod-Schema in `src/data/schema.ts`).
4. Komponenten: `SpeciesSwitch`, `CostCards`, `HonestyBlock`, `Kompass` (Insel), `RankingCard`, `CriterionChip` mit Erklär-Panel, `Steps`, `TeamCard`, `PartnerGrid`, `Faq`, `ContactForm` (Insel), `LegalBlock`, `Cta`.
5. Seiten: `/`, `/tier-kompass`, `/so-bewerten-wir`, `/wissen`, `/wissen/[slug]`, `/team`, `/tierschutz`, `/kontakt`, `/impressum`, `/datenschutz`, `/erstinformation`, `/404`.
6. Inhalte einpflegen: Texte aus Abschnitt 7, die 10 Wissen-Artikel als Markdown (je 600 bis 900 Wörter, nur belegte Zahlen, sonst `TODO`).
7. Qualitätssicherung: Darstellung bei 360 px, 768 px, 1280 px; Dark Mode; reine Tastaturbedienung; Lighthouse mindestens 90 in allen vier Kategorien; HTML-Validierung ohne Fehler; Network-Tab ohne fremde Domains; `npm run build` ohne Warnungen.
8. Abschluss: `TODO.md` mit jedem Platzhalter (Datei, Zeile, was fehlt), README mit Deploy-Anleitung, Dev-Server starten und die lokale Adresse nennen.

### Regeln

- Keine erfundenen Fakten: Versicherer-Bewertungen, Beiträge, Rechtsangaben, Teamdaten, Vereinsnamen und Zahlen ohne Quelle bleiben Platzhalter mit dem Präfix `TODO:`. Solange `PLACEHOLDER_MODE` wahr ist, zeigt die Seite an jedem Platzhalter ein kleines gelbes Badge „Platzhalter“.
- Keine fremden Logos einbetten (Versicherer, WhatsApp, Vereine); Namen als Text, bis Freigaben vorliegen.
- Keine Stockfotos, keine KI-Fotos von Tieren oder Menschen; stattdessen einfache SVG-Illustrationen in Markenfarben als Platzhalter.
- Bei Unklarheit nicht nachfragen, sondern die Annahme in `TODO.md` notieren und weiterbauen.
- Jede Seite muss ohne die anderen verständlich sein; jeder Abschnitt endet mit demselben Handlungsaufruf „Erzähl uns von deinem Tier“.
- Typografische Zeichen im Fließtext: „ “ und ’; in Code gerade Anführungszeichen.

### Definition of Done

- [ ] Alle 12 Seiten gebaut, verlinkt, ohne tote Links
- [ ] Tier-Kompass reagiert auf alle Eingaben, zeigt Top 3 und auf Wunsch alle Tarife, jede Karte mit Erklär-Panel und Stand-Datum
- [ ] Kontaktformular validiert, erzeugt den WhatsApp-Link und den Mail-Link, Vorbefüllung per URL-Parameter funktioniert
- [ ] Tierwahl bleibt über alle Seiten erhalten (localStorage und URL-Parameter)
- [ ] Hell- und Dunkelmodus ohne unlesbare Stellen; Kontrast mindestens AA
- [ ] Lighthouse mobil: Performance, Accessibility, Best Practices, SEO je mindestens 90
- [ ] Keine externen Requests zur Laufzeit
- [ ] `TODO.md` vollständig, README mit Deploy-Anleitung, alle Commits vorhanden

## 3. Marke und Design-System

Bildmarke ist der Smiley als SVG (drei Streifen, zentrierte Geometrie); die Wortmarke „clever VERSICHERT“ wird als HTML-Text gesetzt, nicht als Bild. Es existiert zusätzlich eine PNG-Variante mit vier Streifen (Navy, Türkis, Sand, Rot) – nicht verwenden; die Marke tritt auf der Website nur in der SVG-Variante auf (TODO: Tobias entscheidet die finale Logovariante, siehe Abschnitt 9).

Lege die Datei `public/brand/smiley.svg` mit genau diesem Inhalt an und erzeuge daraus `public/favicon.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png` (180 px) und das Open-Graph-Bild `public/og.png` (1200 × 630 px, Smiley links, Wortmarke rechts, Hintergrund Weiß):

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" shape-rendering="geometricPrecision">
  <title>clever versichert – Smiley</title>
  <defs>
    <clipPath id="circle-clip"><circle cx="512" cy="512" r="440" /></clipPath>
  </defs>
  <g id="three-stripes" clip-path="url(#circle-clip)">
    <rect x="72" y="72" width="880" height="880" fill="#3B617E" />
    <rect x="459.2" y="72" width="105.6" height="880" fill="#C2944D" />
    <rect x="564.8" y="72" width="387.2" height="880" fill="#8F3D4C" />
  </g>
  <g id="face" fill="#FFFFFF">
    <circle id="left-eye" cx="352.0" cy="433" r="75.5" />
    <path id="wink-eye" d="M 790 350 L 705 433 L 790 516" fill="none" stroke="#FFFFFF" stroke-width="66" stroke-linecap="round" stroke-linejoin="round" />
    <path id="smile" d="M 328.803956401473 658 C 413.803956401473 742 610.196043598527 742 695.196043598527 658" fill="none" stroke="#FFFFFF" stroke-width="66" stroke-linecap="butt" />
  </g>
</svg>
```

### Wortmarke und Claim

| Element | Setzung |
| --- | --- |
| „clever“ | Poppins 800, Kleinbuchstaben, Farbe `--navy`, Laufweite −0.02em, Höhe wie der Smiley daneben |
| „VERSICHERT“ | Poppins 500, Versalien, Laufweite 0.28em, Farbe `--navy`, Schriftgröße 45 % von „clever“, direkt darunter |
| Claim „Frage immer erst warum.“ | Poppins 400, nur im Hero und im Footer, Farbe `--ink-muted` |
| Header | Smiley 36 px + Wortmarke links, WhatsApp-Button rechts; Header bleibt beim Scrollen oben (`position: sticky`) |

### Farben (Custom Properties in `tokens.css`)

| Token | Hell | Dunkel | Verwendung |
| --- | --- | --- | --- |
| `--navy` | #011C40 | #EEF2F7 | Text, Überschriften, Wortmarke, aktive Tierkachel |
| `--slate` | #3B617E | #86ABC6 | Links, Icons, Rahmen aktiver Elemente, Sekundär-Button |
| `--gold` | #C2944D | #D6B06E | Sparsamer Akzent: Markierung „Unsere Empfehlung“, Trennlinien im Hero; nie als Textfarbe auf Weiß (Kontrast reicht nicht) |
| `--wine` | #8F3D4C | #C47585 | Primär-Button, Fokusring-Innenfarbe |
| `--paper` | #FFFFFF | #0B1626 | Seitenhintergrund |
| `--mist` | #F2F5F8 | #14223A | Abwechselnde Sektionen, Karten, Eingabefelder |
| `--ink-muted` | #5B6B7C | #AAB7C6 | Sekundärtext, Beschriftungen |
| `--line` | rgba(1,28,64,0.14) | rgba(255,255,255,0.14) | Linien und Rahmen |
| `--ok` / `--ok-bg` | #1F7A4D / #E6F4EC | #7FD1A3 / #12392A | Ampel grün: erfüllt |
| `--warn` / `--warn-bg` | #8A5A00 / #FFF3D6 | #F2C66B / #3A2A08 | Ampel gelb: mit Einschränkung |
| `--no` / `--no-bg` | #9B2335 / #FBE7EA | #F09BA8 / #3E1419 | Ampel rot: nicht erfüllt |
| `--unrated` / `--unrated-bg` | #5B6B7C / #EEF1F4 | #AAB7C6 / #1B2A42 | Ampel grau: unbewertet |
| `--whatsapp` | #1A7F4B | #2FA866 | WhatsApp-Button, Text darauf Weiß |

Dunkelmodus über `@media (prefers-color-scheme: dark)` plus `[data-theme="dark"]`, Umschalter im Footer; `color-scheme` passend setzen. Kontrast aller Text-Hintergrund-Paare mindestens 4,5:1 prüfen.

### Typografie und Form

| Regel | Wert |
| --- | --- |
| Schrift | nur Poppins; Fallback `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| Grundgröße | 17 px Desktop, 16 px Mobil; Zeilenhöhe 1.55; Zeilenlänge maximal 68 Zeichen (`max-width: 68ch`) |
| H1 | `clamp(30px, 6vw, 44px)`, Gewicht 700, Zeilenhöhe 1.1, Laufweite −0.015em |
| H2 | `clamp(24px, 4vw, 32px)`, Gewicht 600 |
| H3 | 20 px, Gewicht 600 |
| Buttons | Primär: `--wine` mit weißem Text; Sekundär: Rahmen `--slate`; WhatsApp: `--whatsapp`; Höhe 48 px, Radius 10 px, Text als Verb („Beitrag anfragen“), keine Pfeile |
| Karten | Radius 16 px, Hintergrund `--mist` oder `--paper` mit `--line`; keine Schatten, keine Verläufe |
| Bewegung | nur als Antwort auf eine Aktion (Aufklappen, Wechsel der Tierart); `prefers-reduced-motion` schaltet alles ab |
| Fokus | sichtbarer Ring 3 px `--slate` außen, 1 px `--paper` innen |
| Icons | eigene Linien-Icons als Inline-SVG (Hund, Katze, Pferd, Sprechblase, Telefon, Mail, Info, Haken, Warnung, Kreuz), Strichstärke 2.2, Rundungen; keine Icon-Fonts, keine Markenlogos |
| Verboten | Versalien-Eyebrows über Überschriften, Mittelpunkt-Trenner „A · B · C“, Pfeile in Buttons, Emojis, Verläufe, Schlagschatten |

Ein Element darf auffallen: die Tierwahl im Hero (drei große Kacheln mit Icon, aktive Kachel in `--navy` mit weißem Icon). Alles andere bleibt ruhig.

## 4. Seitenstruktur, Navigation und Startseite

Die Startseite ist ein One-Pager mit allen Kernabschnitten; die Unterseiten vertiefen je ein Thema. Jede Seite endet mit dem Handlungsaufruf „Erzähl uns von deinem Tier“, der zum Kontaktformular führt.

| Pfad | Zweck | Inhalt |
| --- | --- | --- |
| `/` | Orientierung in 3 Sekunden, Tierwahl, Vertrauen, Anfrage | Abschnitte 1 bis 10 unten |
| `/tier-kompass` | Vollständiges Kriterien-Ranking je Tierart | Eingaben, alle Tarife, Erklär-Panels, Methodik-Link, Anfrage-Button |
| `/so-bewerten-wir` | Methodik des Kompass | Kriterien, Gewichte, Stand-Datum, was nicht bewertet wird, Rolle als Makler |
| `/wissen` | Übersicht der Ratgeber, gefiltert nach Tierart | Kartenliste der 10 Artikel |
| `/wissen/[slug]` | Ratgeber-Artikel | Markdown aus Content Collection, Quellenliste, Kontakt-Aufruf am Ende |
| `/team` | Gesichter, Statements, Direktkontakt | Teamkarten aus `team.json` |
| `/tierschutz` | Partnervereine, konkretes Versprechen | Partnerliste, Versprechen, Zähler, so funktioniert es |
| `/kontakt` | Anfrage | Formular, WhatsApp, Telefon, Mail, Erreichbarkeit, Erstinformation-Link |
| `/impressum`, `/datenschutz`, `/erstinformation` | Pflichtseiten | Struktur aus Abschnitt 8, Inhalte als TODO |
| `/404` | Fehlerseite | Smiley, ein Satz, Links zu Start und Kontakt |

### Navigation

| Element | Verhalten |
| --- | --- |
| Header | Smiley und Wortmarke links (Link zu `/`), rechts der WhatsApp-Button; sticky oben, 64 px hoch, Hintergrund `--paper`, untere Linie `--line` |
| Hauptnavigation | Genau 5 Punkte: Tier-Kompass, Wissen, Team, Tierschutz, Kontakt. Mobil als horizontal scrollbare Chip-Leiste unter dem Header, kein Burger-Menü; Desktop als Textzeile im Header |
| Aktiver Punkt | Unterstreichung in `--gold`, 2 px |
| WhatsApp-Button | Mobil schwebend unten rechts (56 px rund, Sprechblasen-Icon, Beschriftung „WhatsApp“ als Tooltip und `aria-label`), Desktop im Header als Button mit Text; Link siehe Abschnitt 6 |
| Tierwahl global | Zustand `hund`, `katze`, `pferd` in `localStorage` (`cv_species`) und als URL-Parameter `?tier=`; ohne Wahl zeigt die Seite neutrale Texte und fordert zur Wahl auf |
| Footer | Vier Spalten (mobil gestapelt): Kontakt, Seiten, Rechtliches (Impressum, Datenschutz, Erstinformation als PDF und Seite), Marke mit Claim und Dunkelmodus-Schalter |

### Startseite von oben nach unten

1. Hero. H1 „Für wen suchst du Schutz?“, darunter drei Kacheln Hund, Katze, Pferd (Icon plus Wort, mindestens 96 px hoch, nebeneinander ab 600 px, mobil in einer Reihe mit kleineren Icons). Nach der Wahl erscheint eine Zeile: „Gut. Dann zeigen wir dir, was bei {Hunden} wirklich teuer wird – und welche Tarife das abdecken.“ Darunter der Claim. Keine Bildwand, kein Foto im Hero.
2. Vertrauenszeile. Drei kurze Aussagen in einer Reihe (Icon plus ein Satz): „Wir arbeiten für dich, nicht für einen Versicherer“ (TODO: Formulierung an den Rechtsstatus anpassen), „Wir sagen dir auch, was ein Tarif nicht zahlt“, „Mit jedem Vertrag unterstützen wir Tierschutzvereine“ (TODO: nur mit bestätigtem Versprechen).
3. Warum überhaupt. H2 „Was ein {Hund} wirklich kosten kann“, drei Kostenkarten aus `costs.json` (Fall, Richtwert, ein Satz Einordnung), darunter der GOT-Hinweis aus Abschnitt 7.
4. Ehrlichkeits-Block. H2 „Das zahlt keine Tierkrankenversicherung“, fünf Punkte aus Abschnitt 7, Schlusssatz und Handlungsaufruf. Dieser Block steht vor dem Kompass, weil er das Vertrauen aufbaut.
5. Tier-Kompass als Vorschau. Die Eingaben und die Top 3 aus der Insel; Link „Alle Tarife im Tier-Kompass“.
6. So läuft es. Drei nummerierte Schritte aus Abschnitt 7.
7. Team. Drei Karten aus `team.json`, Link „Das ganze Team“.
8. Tierschutz. Partner als Text-Badges, das Versprechen, ein Satz zur Funktionsweise, Link.
9. Fragen. Sechs Einträge aus `faq.json` als `<details>`-Akkordeon; die zwei weiteren nur auf `/kontakt`.
10. Kontakt. Das Formular aus Abschnitt 6 mit Überschrift „Erzähl uns von deinem Tier“, daneben Erreichbarkeit und die drei Kanäle.
11. Footer.

Abschnitte 3, 4, 5 und 9 wechseln ihre Inhalte mit der Tierart; der Wechsel ersetzt nur Texte und Daten, nie das Layout.

## 5. Tier-Kompass

Der Kompass rankt Tarife nach einem offengelegten Kriterienkatalog mit Ampelwerten (2 erfüllt, 1 mit Einschränkung, 0 nicht erfüllt, `null` unbewertet). Er berechnet keine Beiträge und gibt kein Angebot ab; jede Karte trägt ein Stand-Datum und den Link zu `/so-bewerten-wir`. Alle Bewertungen und Preisspannen starten als `null` und werden erst nach dem Kriterien-Check von Tobias eingetragen.

### Eingaben

| Feld | Typ | Werte |
| --- | --- | --- |
| `tierart` | Kacheln | `hund`, `katze`, `pferd` (global, siehe Abschnitt 4) |
| `status` | Umschalter | „schon bei mir“, „kommt bald“ |
| `alter` | Auswahl | Hund und Katze: unter 1, 1 bis 3, 4 bis 6, 7 bis 9, 10 und älter. Pferd: bis 2, 3 bis 8, 9 bis 14, 15 und älter |
| `groesse` | Auswahl | nur Hund: klein (bis 10 kg), mittel (10 bis 25 kg), groß (über 25 kg) |
| `nutzung` | Auswahl | nur Pferd: Freizeit, Sport, Zucht |
| `rasse` | Freitext, optional | wird nur in die Anfrage übernommen |
| `vorerkrankungen` | Umschalter plus Freitext | „nein“, „ja“ mit Beschreibung |
| `schutz` | Umschalter | „OP-Schutz“, „Vollschutz“ |
| `sb` | Umschalter | „ohne Selbstbeteiligung“, „mit Selbstbeteiligung“ |

### Kriterienkatalog Hund und Katze

| Schlüssel | Kriterium | 2 bedeutet | 1 bedeutet | 0 bedeutet |
| --- | --- | --- | --- | --- |
| `got` | GOT-Satz | erstattet bis 4-fach, auch im Notdienst | bis 3-fach | bis 2-fach oder weniger |
| `limit` | Jahreshöchstleistung | unbegrenzt | Limit ab 5.000 € | Limit unter 5.000 € |
| `hered` | Angeborene und rassetypische Erkrankungen (HD, ED, Patella, Atemwege bei Kurznasen) | mitversichert ohne Sonderwartezeit | mit Sonderwartezeit oder Zuschlag | ausgeschlossen |
| `kuend` | Kündigungsverzicht des Versicherers im Leistungsfall | ja, dauerhaft | eingeschränkt | nein |
| `warte` | Wartezeiten | keine oder bis 1 Monat | bis 3 Monate | länger oder viele Sonderwartezeiten |
| `sb` | Selbstbeteiligung | wählbar, fest, ohne Altersstaffel | prozentual | zwingend und steigend mit dem Alter |
| `alter` | Beitrag im Alter | keine Altersstaffel oder tarifgarantiert gedeckelt | moderate Staffel | starke Sprünge ab Alter 7 |
| `aufnahme` | Aufnahme- und Höchstalter | Aufnahme bis mindestens 9 Jahre, kein Endalter | Aufnahme bis 7 | Aufnahme bis 5 oder Endalter |
| `zahn` | Zahn, Physio, Vorsorge | alles enthalten mit Budget | teilweise | nicht enthalten |
| `direkt` | Abwicklung | Direktabrechnung mit Tierarzt und App | App oder Direktabrechnung | nur Postweg |

### Kriterienkatalog Pferd

| Schlüssel | Kriterium | 2 bedeutet | 1 bedeutet | 0 bedeutet |
| --- | --- | --- | --- | --- |
| `got` | GOT-Satz | bis 4-fach, auch Notdienst | bis 3-fach | bis 2-fach |
| `limit` | Jahreshöchstleistung | unbegrenzt | Limit ab 10.000 € | darunter |
| `kolik` | Kolik-OP inklusive Klinik und Nachsorge | voll | mit Limit | ausgeschlossen |
| `lahm` | Lahmheitsdiagnostik mit Bildgebung (Röntgen, Ultraschall, MRT) | voll | mit Limit | ausgeschlossen |
| `kuend` | Kündigungsverzicht im Leistungsfall | ja | eingeschränkt | nein |
| `warte` | Wartezeiten | bis 1 Monat | bis 3 Monate | länger |
| `sb` | Selbstbeteiligung | wählbar und fest | prozentual | zwingend und steigend |
| `nutzung` | Nutzungsarten | Freizeit, Sport und Zucht ohne Zuschlag | mit Zuschlag | nur Freizeit |
| `aufnahme` | Aufnahme- und Höchstalter | bis mindestens 15 Jahre, kein Endalter | bis 12 | bis 10 oder Endalter |
| `direkt` | Abwicklung | Direktabrechnung mit Klinik und App | eins davon | nur Postweg |

Jedes Kriterium hat ein Erklär-Panel (`info` in `criteria.json`): was es ist, warum es Geld kostet, bei welchen Tieren es häufig ist. Die Texte für `info` liefert Abschnitt 7 (Erkrankungen) und dieser Katalog; keine Prozentzahlen ohne Quelle.

### Scoring

1. Grundgewicht jedes Kriteriums 1, Wert 0 bis 2; Score = Summe aus Gewicht mal Wert.
2. Alter 7 bis 9 oder 10 und älter (Pferd: 15 und älter): `alter` und `aufnahme` Gewicht 3.
3. Hund groß: `hered` Gewicht 2. Pferd Sport oder Zucht: `lahm` und `nutzung` Gewicht 2.
4. OP-Schutz gewählt: `zahn` Gewicht 0, `limit` Gewicht 1,5.
5. Vorerkrankungen „ja“: kein Einfluss auf das Ranking, aber eine Hinweisbox über den Karten: „Bestehende Erkrankungen schließt jeder Tarif aus. Alles andere bleibt versicherbar – wir prüfen für dich, welcher Versicherer dein Tier annimmt.“
6. Sortierung absteigend nach Score, bei Gleichstand alphabetisch. Versicherer mit mindestens einem `null` werden nicht gerankt: sie stehen grau unter den bewerteten mit dem Text „Bewertung folgt“.
7. Platz 1 erhält das Badge „Unsere Empfehlung“ nur, wenn mindestens drei Versicherer vollständig bewertet sind.

### Preis

Preisspannen stammen aus `insurers.json` (`preis` je Tierart, Schutz und Altersband, in Euro pro Monat, als `[von, bis]`). Fehlt der Wert, zeigt die Karte „Beitrag auf Anfrage“. Ist er vorhanden: „ab ca. 32 €/Monat“ mit Fußnote „Richtwert, Stand {stand}; Beitrag und Annahme prüft der Versicherer“. Größe oder Nutzung verändern den angezeigten Wert nicht; sie fließen nur in die Anfrage ein.

### Datenmodell

`criteria.json`:

```json
[
  {
    "key": "hered",
    "tierarten": ["hund", "katze"],
    "name": "Angeborene und rassetypische Erkrankungen",
    "kurz": "HD, ED und Co.",
    "werte": { "2": "mitversichert", "1": "mit Wartezeit oder Zuschlag", "0": "ausgeschlossen" },
    "info": "Hüftdysplasie (HD) ist eine erblich mitbedingte Fehlentwicklung des Hüftgelenks, besonders bei großen Rassen. Viele Tarife schließen angeborene Erkrankungen aus oder verlangen Sonderwartezeiten. TODO: Quelle für Häufigkeit ergänzen.",
    "gewicht": 1
  }
]
```

`insurers.json` (ein Eintrag je Versicherer, Namen als Text; `null` heißt unbewertet):

```json
{
  "stand": "2026-10-22",
  "versicherer": [
    {
      "id": "barmenia",
      "name": "Barmenia",
      "tierarten": ["hund", "katze", "pferd"],
      "tarif": "TODO: Tarifname",
      "werte": {
        "hund": { "got": null, "limit": null, "hered": null, "kuend": null, "warte": null, "sb": null, "alter": null, "aufnahme": null, "zahn": null, "direkt": null },
        "katze": { "got": null, "limit": null, "hered": null, "kuend": null, "warte": null, "sb": null, "alter": null, "aufnahme": null, "zahn": null, "direkt": null },
        "pferd": { "got": null, "limit": null, "kolik": null, "lahm": null, "kuend": null, "warte": null, "sb": null, "nutzung": null, "aufnahme": null, "direkt": null }
      },
      "preis": {
        "hund": { "op": { "u1": null, "1-3": null, "4-6": null, "7-9": null, "10+": null }, "voll": { "u1": null, "1-3": null, "4-6": null, "7-9": null, "10+": null } }
      },
      "hinweis": "",
      "quelle": "TODO: Bedingungswerk und Datum"
    }
  ]
}
```

Kandidaten für die Liste (nur Namen, Reihenfolge ohne Bedeutung; TODO: mit den Courtagezusagen der CLARUS AG abgleichen und auf die vermittelbaren kürzen): Hund und Katze: Barmenia, HanseMerkur, Allianz, Uelzener, Agila, Helvetia, Deutsche Familienversicherung, Gothaer, DA Direkt, Petolo. Pferd: Uelzener, Allianz, R+V, Gothaer, Helvetia, Barmenia.

### Oberfläche

| Element | Vorgabe |
| --- | --- |
| Layout | mobil gestapelt (Eingaben, dann Ranking); ab 900 px zwei Spalten, Eingaben links sticky, Ranking rechts |
| Karte | Platz, Name als Text, Badge, Ampel-Chips je Kriterium (Farbe plus Kurzlabel, Info-Icon), Preisspanne, Button „Beitrag anfragen“, Stand-Datum |
| Erklär-Panel | Tippen oder Klick auf einen Chip öffnet das Panel unter der Chip-Reihe (kein reines Hover), Schließen per erneutem Tippen oder Escape; `aria-expanded` setzen |
| Top 3 | groß; darunter Schalter „Alle {n} Tarife anzeigen“ |
| Anfrage-Button | führt zu `/kontakt` mit URL-Parametern `tier`, `alter`, `groesse`, `nutzung`, `rasse`, `vorerkrankungen`, `schutz`, `sb`, `tarif` |
| Hinweiszeile | unter den Karten: „Bewertung nach unserem Kriterienkatalog, Stand {stand}. Keine Beitragsberechnung, kein Angebot. So bewerten wir“ (Link) |
| Leerzustand | ohne Tierwahl: die drei Kacheln und der Satz „Wähle dein Tier, dann sortieren wir die Tarife für dich.“ |

## 6. Kontakt-Funnel

Das Formular sammelt genau die Angaben, die für ein Tarifangebot nötig sind, und übergibt sie als vorbefüllte Nachricht an WhatsApp oder Mail. Die statische Seite verschickt selbst nichts; ein optionaler Endpunkt (`FORM_ENDPOINT`) kann später das CRM anbinden.

### Felder

| Feld | Pflicht | Typ und Prüfung |
| --- | --- | --- |
| Tierart | ja | Kacheln, vorbelegt aus der globalen Tierwahl |
| Name des Tiers | nein | Text, maximal 40 Zeichen |
| Status | ja | „schon bei mir“ oder „kommt bald“ |
| Alter | ja | Auswahl wie im Kompass; bei „kommt bald“ zusätzlich „weiß ich noch nicht“ |
| Rasse oder Größe | nein | Text (Hund: zusätzlich Größenauswahl; Pferd: Nutzung) |
| Vorerkrankungen | ja | „nein“ oder „ja“ mit Freitext (maximal 300 Zeichen) |
| Gewünschter Schutz | ja | „OP-Schutz“, „Vollschutz“, „weiß ich noch nicht“ |
| Interesse an Tarif | nein | aus URL-Parameter `tarif`, sonst leer |
| Dein Name | ja | Text, mindestens 2 Zeichen |
| Rückmeldung per | ja | „WhatsApp“, „Telefon“, „E-Mail“ |
| Telefonnummer | nur bei WhatsApp oder Telefon | Format prüfen (Ziffern, Leerzeichen, +, mindestens 7 Ziffern) |
| E-Mail | nur bei E-Mail | Format prüfen |
| Datenschutz | ja | Kontrollkästchen „Ich habe die Datenschutzerklärung gelesen“ mit Link |

Fehler stehen als Satz unter dem Feld (Farbe `--no`), z. B. „Bitte gib das Alter an, damit wir den passenden Tarif prüfen können.“; `aria-describedby` verknüpft Feld und Fehltext; der erste fehlerhafte Punkt bekommt den Fokus.

### Ablauf nach dem Absenden

1. Validierung, dann Nachricht aus der Vorlage unten zusammensetzen.
2. Kanal WhatsApp: neues Fenster mit `https://wa.me/{WHATSAPP_NUMBER}?text={encodeURIComponent(nachricht)}`.
3. Kanal Telefon oder E-Mail: `mailto:{CONTACT_MAIL}?subject={Betreff}&body={nachricht}`; Betreff „Anfrage Tierkrankenversicherung {Tierart}“.
4. Immer zusätzlich: die Nachricht in einem Kasten anzeigen mit Button „Text kopieren“, falls WhatsApp oder Mail auf dem Gerät nicht öffnet.
5. Wenn `FORM_ENDPOINT` gesetzt ist: zusätzlich `POST` als JSON an den Endpunkt; bei Fehler bleibt der Kanal-Link der Weg, kein Datenverlust.
6. Erfolgsmeldung in der Formular-Stimme: „Deine Angaben sind drin. Wir melden uns per {Kanal}, meist innerhalb von {ERREICHBARKEIT\_TEXT}.“ (TODO: Erreichbarkeit).

### Nachrichtenvorlage

```text
Hallo clever versichert,
ich interessiere mich für eine Tierkrankenversicherung.

Tier: {Tierart}{, Name}
Status: {schon bei mir | kommt bald}
Alter: {Altersband}
Rasse/Größe: {Angabe oder „keine Angabe“}
Vorerkrankungen: {nein | ja: Beschreibung}
Gewünschter Schutz: {OP-Schutz | Vollschutz | offen}
Interesse an: {Tarif oder „offen“}

Mein Name: {Name}
Rückmeldung bitte per: {Kanal} ({Nummer oder E-Mail})
```

### Vorbefüllung per URL

Parameter `tier`, `alter`, `groesse`, `nutzung`, `rasse`, `vorerkrankungen`, `schutz`, `sb`, `tarif` werden beim Laden gelesen und in die Felder geschrieben; unbekannte Werte werden ignoriert. Der Button „Beitrag anfragen“ im Kompass und der Handlungsaufruf jeder Sektion nutzen diese Parameter.

### Schwebender WhatsApp-Button

Link `https://wa.me/{WHATSAPP_NUMBER}?text=` mit dem Text „Hallo clever versichert, ich habe eine Frage zur Tierkrankenversicherung.“ Direkt am Formular und unter dem Button steht ein Satz: „WhatsApp ist ein Dienst von Meta. Was dabei mit deinen Daten passiert, steht in der Datenschutzerklärung.“ (TODO: Formulierung vom Datenschutz-Generator oder Anwalt bestätigen lassen.)

### Kontaktdaten auf `/kontakt`

Telefon, E-Mail, WhatsApp-Nummer, Erreichbarkeit (Wochentage und Zeiten), Standort (Ort, kein Hausbesuch-Versprechen), Link zur Erstinformation – alle Werte aus `src/config.ts`, bis sie geliefert sind als `TODO`.

## 7. Inhalte

Alle Texte in der Du-Form, kurze Sätze, keine Superlative. Zahlen nur mit Quelle; die Richtwerte unten sind Arbeitsstand und werden vor dem Go-live mit GOT-Beispielrechnungen belegt (TODO).

### Kostenkarten (`costs.json`)

| Tierart | Fall | Richtwert | Einordnung (ein Satz auf der Karte) |
| --- | --- | --- | --- |
| Hund | Kreuzband-OP | 2.500 bis 4.500 € | Die häufigste Knie-OP, nicht selten beidseitig. |
| Hund | Magendrehung, Not-OP | 2.500 bis 4.000 € | Lebensgefahr innerhalb von Stunden, vor allem große, tiefbrüstige Rassen. |
| Hund | Hüftdysplasie, OP je Seite | 2.000 bis 5.000 € | Erblich mitbedingt; viele Tarife schließen sie aus. |
| Katze | Harnröhrenverschluss, Not-OP | 1.000 bis 2.500 € | Typisch für Kater, oft nachts, immer ein Notfall. |
| Katze | Fremdkörper-OP | 1.500 bis 3.000 € | Spielzeug, Schnüre, Haargummis. |
| Katze | Zahnsanierung bei FORL | 500 bis 1.500 € | Schmerzhaft, häufig, oft mehrfach im Leben. |
| Pferd | Kolik-OP mit Klinik | 5.000 bis 10.000 € | Die Rechnung, die Pferdehalter am meisten fürchten. |
| Pferd | Arthroskopie (Chip) | 2.000 bis 4.000 € | Häufig bei jungen Sportpferden. |
| Pferd | Lahmheitsdiagnostik mit Bildgebung | 500 bis 2.500 € | Röntgen, Ultraschall, im Zweifel MRT. |

GOT-Hinweis unter den Karten: „Seit dem 22. November 2022 gilt die neue Gebührenordnung für Tierärzte (GOT). Tierärzte rechnen regulär bis zum 3-fachen Satz ab, im Notdienst bis zum 4-fachen Satz plus Notdienstgebühr.“ (TODO: Satz an der amtlichen GOT prüfen und die Verordnung verlinken.)

### Ehrlichkeits-Block

Überschrift „Das zahlt keine Tierkrankenversicherung“. Einleitung: „Bevor wir über Tarife reden, sagen wir dir, wo jeder Tarif Grenzen hat.“

1. Was dein Tier schon hat. Bestehende und bekannte Erkrankungen sind ausgeschlossen – deshalb lohnt der Abschluss früh.
2. Die ersten Wochen. Wartezeiten von meist 1 bis 3 Monaten, oft länger für bestimmte Eingriffe.
3. Alles über dem GOT-Satz des Tarifs. Rechnet der Tierarzt höher ab als der Tarif erstattet, zahlst du die Differenz.
4. Alles über der Jahreshöchstleistung. Ein Limit kann nach einer einzigen OP erreicht sein.
5. Was der Beitrag im Alter macht. Viele Tarife werden ab 7 Jahren deutlich teurer; manche kündigen nach Leistungsfällen.

Schlusssatz: „Darum lesen wir das Bedingungswerk, nicht die Werbung – und sagen dir vorher, was dein Tarif trägt.“ Dann der Handlungsaufruf.

### Häufige Erkrankungen (für Erklär-Panels und Artikel)

| Tierart | Erkrankungen |
| --- | --- |
| Hund | Hüft- und Ellbogendysplasie, Kreuzbandriss, Magendrehung, Hautallergien, Ohrenentzündungen, Zahnerkrankungen, Tumore im Alter |
| Katze | chronische Nierenerkrankung (CNE), FORL und Zahnerkrankungen, Harnwegserkrankungen, Diabetes, Schilddrüsenüberfunktion, Unfälle wie Fenstersturz |
| Pferd | Kolik, Hufrehe, Lahmheiten und Sehnenschäden, Mauke, Sommerekzem, Cushing (PPID), Zahnprobleme |

### So läuft es (drei Schritte)

1. Du erzählst uns von deinem Tier. Per WhatsApp, Formular oder Telefon – fünf Angaben reichen.
2. Wir prüfen die Tarife, die zu deinem Tier passen. Bedingungen, nicht nur Beiträge; du bekommst eine Empfehlung mit Begründung und eine Alternative.
3. Du entscheidest in Ruhe. Abschluss digital oder bei uns vor Ort; danach bleiben wir dein Ansprechpartner, auch bei Rechnungen und Streit mit dem Versicherer.

### Wissen-Artikel (`src/content/wissen/`, Frontmatter: `title`, `description`, `tierarten`, `date`, `sources`)

| Slug | Titel | Inhalt in einem Satz |
| --- | --- | --- |
| `got-tierarztkosten` | Was kostet der Tierarzt? Die GOT verstehen | Aufbau der GOT, Sätze, Notdienst, drei Beispielrechnungen je Tierart |
| `op-oder-vollschutz` | OP-Schutz oder Vollschutz – was passt zu deinem Tier? | Unterschiede, typische Beitragsspannen als TODO, Entscheidungshilfe nach Alter und Budget |
| `vier-streitpunkte` | Wartezeit, Vorerkrankung, GOT-Satz, Jahreslimit: die vier Streitpunkte | Wo Erstattungen scheitern und wie man das vor dem Abschluss erkennt |
| `hueftdysplasie-hund` | Hüftdysplasie beim Hund: Rassen, Kosten, Tarifklauseln | Erkrankung, betroffene Rassen, Behandlung, Ausschlussklauseln lesen |
| `magendrehung` | Magendrehung: Notfall, Kosten, Vorbeugung | Erkennen, Handeln, Kosten, was Tarife zahlen |
| `katze-dauerpatienten` | Katze: Niere, Zähne, Harnwege – die teuren Dauerpatienten | Chronische Erkrankungen, laufende Kosten, warum Vollschutz hier zählt |
| `kolik-pferd` | Kolik beim Pferd: wann es zur OP kommt und was sie kostet | Verlauf, Klinikkosten, Tarifunterschiede bei Kolik-OP |
| `alter-und-aufnahme` | Tierkrankenversicherung ab welchem Alter? Senioren, Grenzen, Beiträge | Aufnahmealter, Altersstaffeln, was für ältere Tiere noch geht |
| `sparen-statt-versichern` | Sparen statt versichern? Die ehrliche Rechnung | Rücklage gegen Beitrag gerechnet, Zeitrisiko, wann Sparen reicht |
| `glossar` | Glossar: 25 Begriffe aus Tarifbedingungen | Alphabetisch, je zwei Sätze, mit Verweis auf den Kompass |

Jeder Artikel endet mit dem Satz „Unsicher, was das für dein Tier heißt? Erzähl uns von ihm.“ und dem Handlungsaufruf. Quellen als Liste am Ende; fehlende Quellen als `TODO` im Text und in `TODO.md`.

### FAQ (`faq.json`, die ersten sechs auf der Startseite)

| Frage | Antwort |
| --- | --- |
| Was kostet eure Beratung? | Nichts extra. Wir erhalten eine Courtage vom Versicherer; der Beitrag ist derselbe wie beim Direktabschluss. (TODO: Formulierung an den Rechtsstatus anpassen.) |
| Mein Tier hat schon eine Vorerkrankung – geht noch etwas? | Die bestehende Erkrankung ist ausgeschlossen, alles andere bleibt versicherbar. Wir sagen dir vorher, welcher Versicherer dein Tier annimmt und mit welchem Ausschluss. |
| OP-Schutz oder Vollschutz? | OP-Schutz deckt Operationen mit Vor- und Nachbehandlung, Vollschutz auch Diagnostik, Medikamente und oft Vorsorge. Für Katzen mit chronischen Risiken und für Pferde mit Lahmheitsdiagnostik ist der Unterschied groß. |
| Was bedeutet GOT-Satz? | Die Gebührenordnung erlaubt Tierärzten einen Spielraum. Erstattet dein Tarif nur den 2-fachen Satz, der Tierarzt rechnet aber 3-fach ab, zahlst du den Rest. |
| Mein Tier ist schon älter – lohnt sich das noch? | Meist ja, solange ein Versicherer es aufnimmt. Wir prüfen Aufnahmegrenzen, Beiträge im Alter und sagen dir ehrlich, wenn Sparen die bessere Wahl ist. |
| Ich lege lieber 50 Euro im Monat zurück. | Das sind 600 Euro im Jahr; eine einzige Not-OP kostet oft das Fünffache, und sie fragt nicht, wie lange du schon sparst. Wir rechnen beides mit dir durch. |
| Wie schnell meldet ihr euch? | TODO: Erreichbarkeit und realistische Antwortzeit eintragen. |
| Was passiert nach dem Abschluss? | Wir bleiben Ansprechpartner: Rechnungen einreichen, Tarifwechsel, Streit mit dem Versicherer. (TODO: Umfang mit dem Team festlegen.) |

### Team (`team.json`)

```json
[
  {
    "id": "tobias-springstubbe",
    "name": "Tobias Springstubbe",
    "rolle": "Berater Tierkrankenversicherung",
    "statement": "TODO: ein Satz, warum du das machst",
    "hintergrund": ["In der Versicherungsberatung seit 2010", "Schwerpunkt Tierkrankenversicherung in Kooperation mit Tierschutzvereinen", "TODO: dritte Zeile"],
    "tier": "TODO: eigenes Tier mit Name",
    "foto": "TODO: public/img/team/tobias.webp (Hochformat 3:4, 800 px breit)",
    "telefon": "TODO",
    "mail": "TODO",
    "whatsapp": "TODO"
  },
  { "id": "platzhalter-2", "name": "TODO: Name", "rolle": "TODO", "statement": "TODO", "hintergrund": ["TODO", "TODO", "TODO"], "tier": "TODO", "foto": "TODO", "telefon": "TODO", "mail": "TODO", "whatsapp": "TODO" },
  { "id": "platzhalter-3", "name": "TODO: Name", "rolle": "TODO", "statement": "TODO", "hintergrund": ["TODO", "TODO", "TODO"], "tier": "TODO", "foto": "TODO", "telefon": "TODO", "mail": "TODO", "whatsapp": "TODO" }
]
```

Teamkarte: Foto (bis dahin ein Initialen-Kreis in `--slate`), Name, Rolle, Statement als Zitat, drei Zeilen Hintergrund, Zeile „Mit im Team: {Tier}“, drei Kontaktbuttons (Anrufen, Mail, WhatsApp) mit den Daten der Person.

### Tierschutz (`partners.json`)

```json
{
  "versprechen": "TODO: z. B. „Für jeden vermittelten Vertrag gehen 10 Euro an unsere Partnervereine.“",
  "zaehler": { "jahr": 2026, "summe_euro": null },
  "partner": [
    { "name": "TODO: Vereinsname", "ort": "TODO", "url": "TODO", "logo": null, "freigabe": false }
  ]
}
```

Seite und Sektion: Überschrift „Wir unterstützen Tierschutz – mit Geld, nicht mit Worten“, das Versprechen, der Zähler (nur anzeigen, wenn `summe_euro` nicht `null`), die Partner als Text-Badges mit Link (Logos erst bei `freigabe: true`), drei Sätze zur Funktionsweise: Vermittelter Vertrag, fester Betrag, Auszahlung an den Verein, den der Kunde wählt (TODO: Modell bestätigen).

### Mikrotexte

| Stelle | Text |
| --- | --- |
| Handlungsaufruf überall | „Erzähl uns von deinem Tier“ |
| Kompass-Button | „Beitrag anfragen“ |
| Formular absenden | „Anfrage senden“ |
| Kopieren | „Text kopieren“, danach „Kopiert“ |
| Schwebender Button | „WhatsApp“ |
| Leerer Kompass | „Wähle dein Tier, dann sortieren wir die Tarife für dich.“ |
| 404 | „Diese Seite gibt es nicht. Dein Tier ist trotzdem gut aufgehoben: zur Startseite oder gleich zum Kontakt.“ |

## 8. Rechtliches, Datenschutz, SEO, Barrierefreiheit, Performance

Die drei Pflichtseiten werden mit vollständiger Struktur und `TODO`-Werten gebaut; die endgültigen Texte liefert Tobias nach juristischer Prüfung. Keine Rechtstexte erfinden, keine Muster ungeprüft übernehmen.

### Impressum (`/impressum`)

| Angabe | Wert |
| --- | --- |
| Anbieter | TODO: Firma, Rechtsform, Anschrift, Vertretungsberechtigte |
| Kontakt | TODO: Telefon, E-Mail |
| Register | TODO: Handelsregister und Nummer, falls vorhanden; Umsatzsteuer-ID, falls vorhanden |
| Tätigkeit und Erlaubnis | TODO: entweder „Versicherungsmakler mit Erlaubnis nach § 34d Abs. 1 GewO“ oder die Bezeichnung der Tätigkeit für die CLARUS AG – der Status entscheidet den gesamten Block |
| Vermittlerregister | TODO: Registernummer im Format D-XXXX-XXXXX-XX; Register: DIHK, Vermittlerregister |
| Erlaubnisbehörde | TODO: zuständige IHK mit Anschrift |
| Berufsrechtliche Regelungen | § 34d GewO, §§ 59 bis 68 VVG, VersVermV – mit Link auf gesetze-im-internet.de |
| Beteiligungen | TODO: Angaben nach § 15 VersVermV (Beteiligungen über 10 % in beide Richtungen) |
| Schlichtungsstellen | Versicherungsombudsmann e.V., Postfach 08 06 32, 10006 Berlin; Ombudsmann Private Kranken- und Pflegeversicherung, Postfach 06 02 22, 10052 Berlin (TODO: Anschriften vor Go-live prüfen) |
| Verantwortlich für Inhalte | TODO: Name und Anschrift |

Kein Link mehr zur EU-Plattform für Online-Streitbeilegung; sie wurde 2025 eingestellt (TODO: Stand prüfen).

### Erstinformation (`/erstinformation` und `public/erstinformation.pdf`)

Inhalte nach § 15 VersVermV: Name und Anschrift, Tätigkeit (Makler oder Vertreter), Registernummer und Register, Erlaubnisbehörde, Beteiligungen, Vergütung (Courtage vom Versicherer, keine Zusatzkosten), Schlichtungsstellen. Die Seite ist aus dem Footer, dem Kontaktformular und der Kompass-Hinweiszeile verlinkt; das PDF wird aus derselben Quelle erzeugt (TODO: Inhalte).

### Datenschutzerklärung (`/datenschutz`)

| Abschnitt | Inhalt |
| --- | --- |
| Verantwortlicher | TODO |
| Hosting | TODO: Anbieter, Serverstandort Deutschland, Auftragsverarbeitung |
| Server-Logs | Zweck, Speicherdauer |
| Kontaktformular, E-Mail, Telefon | Zweck, Rechtsgrundlage, Speicherdauer, Weitergabe an Versicherer nur zur Angebotserstellung |
| WhatsApp | Dienst von Meta, Business-Konto, Hinweis auf Datenübermittlung, Alternativen (Mail, Telefon) |
| Lokale Speicherung | `localStorage` für die Tierwahl und den Dunkelmodus, technisch notwendig, kein Tracking |
| Keine Cookies, keine Analyse-Tools | Deshalb kein Cookie-Banner (TODO: bestätigen lassen, sobald Hosting und Formular-Endpunkt feststehen) |
| Betroffenenrechte, Beschwerderecht, Datenschutzbeauftragter | TODO |

### Kennzeichnung des Rankings

Unter jedem Ranking: „Bewertung nach unserem Kriterienkatalog, Stand {stand}. Keine Beitragsberechnung, kein Angebot. Beitrag und Annahme prüft der Versicherer.“ Auf `/so-bewerten-wir`: Kriterien, Gewichte, Datum der letzten Prüfung, Datenquelle je Versicherer (Bedingungswerk mit Datum), was nicht bewertet wird (Service, Schadenregulierung) und der Hinweis, dass Testergebnisse Dritter (Stiftung Warentest, Franke und Bornberg) nur mit Lizenz zitiert werden – bis dahin nicht erwähnen.

### SEO

| Punkt | Vorgabe |
| --- | --- |
| Titel und Beschreibung | je Seite eigen; Startseite: „Tierkrankenversicherung für Hund, Katze und Pferd – clever versichert“ |
| Open Graph und Twitter | `og.png` aus Abschnitt 3, Titel, Beschreibung, `og:locale` de\_DE |
| Strukturierte Daten | `Organization` mit `InsuranceAgency` (TODO-Werte), `FAQPage` auf der Startseite, `Article` je Wissen-Artikel, `BreadcrumbList` auf Unterseiten |
| Technik | `sitemap.xml`, `robots.txt`, kanonische URLs, saubere Slugs, `lang="de"`, keine Weiterleitungsketten |
| Inhalte | Wissen-Artikel mit H1, Zwischenüberschriften als Fragen, Quellen; Kompass-Seite mit Textteil, der die Kriterien erklärt (indexierbar ohne JavaScript) |

### Barrierefreiheit

- Kontrast mindestens 4,5:1 für Text, 3:1 für Icons und Rahmen; Ampelwerte zusätzlich als Text, nie nur als Farbe
- Tierwahl als `role="radiogroup"` mit `aria-checked`; Chips als Buttons mit `aria-expanded`; Akkordeon mit `details` und `summary`
- Alle Formularfelder mit `label`, Fehler mit `aria-describedby`, Fokus auf den ersten Fehler
- Tastatur: alles erreichbar, sichtbarer Fokusring, Escape schließt Panels; Touch-Ziele mindestens 44 px
- `prefers-reduced-motion` schaltet Animationen ab; Schriftgröße mobil nie unter 16 px
- Icons mit `aria-hidden`, Buttons mit Text oder `aria-label`

### Performance

| Budget | Wert |
| --- | --- |
| JavaScript gesamt | unter 60 KB komprimiert (nur Kompass- und Formular-Insel) |
| Größte Inhaltsdarstellung (LCP) mobil | unter 2,5 s |
| Schriften | zwei Dateien vorladen (400, 700), Subset latin, `font-display: swap` |
| Bilder | WebP, maximal 1600 px breit, feste Maße, lazy außer Hero |
| Lighthouse mobil | je mindestens 90 in Performance, Accessibility, Best Practices, SEO |

## 9. Offene Punkte, die Tobias liefert

Ohne diese Angaben baut Claude Code mit sichtbaren Platzhaltern weiter; nichts davon blockiert den Bau, alles blockiert den Go-live. Die Rechtsangaben (Punkte 6 bis 8) gehen vor der Veröffentlichung durch eine juristische Prüfung.

| Nr. | Was fehlt | Wo im Code | Status |
| --- | --- | --- | --- |
| 1 | Finale Logovariante (SVG mit drei Streifen oder PNG mit vier); der Brief nutzt die SVG | `public/brand/smiley.svg` | - \[ \] |
| 2 | Team: Name, Rolle, Statement, drei Zeilen Hintergrund, eigenes Tier, Foto 3:4, Telefon, Mail, WhatsApp je Person | `src/data/team.json`, `public/img/team/` | - \[ \] |
| 3 | WhatsApp-Business-Nummer, Kontakt-Mailadresse, Telefon, Erreichbarkeit (Tage, Zeiten, realistische Antwortzeit) | `src/config.ts` | - \[ \] |
| 4 | Versicherer je Tierart, die über die CLARUS AG vermittelbar sind (Courtagezusagen); Entscheidung, ob ein Tarifrechner des Pools eingebunden werden darf | `src/data/insurers.json` | - \[ \] |
| 5 | Kriterienbewertung je Versicherer und Tierart (Werte 0 bis 2 aus den Bedingungswerken), Preisspannen je Altersband, Bedingungsstand – das eigentliche Datenprojekt hinter dem Kompass | `src/data/insurers.json` | - \[ \] |
| 6 | Rechtsstatus: eigene Erlaubnis nach § 34d GewO mit Registernummer und IHK, oder Tätigkeit unter der CLARUS AG; Firmendaten, Vertretungsberechtigte, Beteiligungen | `/impressum`, `/erstinformation` | - \[ \] |
| 7 | Datenschutzerklärung nach Festlegung von Hosting, Formular-Endpunkt und WhatsApp-Nutzung | `/datenschutz` | - \[ \] |
| 8 | Erstinformation als PDF | `public/erstinformation.pdf` | - \[ \] |
| 9 | Tierschutz: Partnervereine mit Freigabe, Logo-Freigabe, Versprechen (Betrag je Vertrag), Auszahlungsmodell | `src/data/partners.json` | - \[ \] |
| 10 | GOT-Beispielrechnungen für die neun Kostenkarten (Quelle je Zahl) | `src/data/costs.json` | - \[ \] |
| 11 | Domain und Hosting-Anbieter (Serverstandort Deutschland), SFTP-Zugang | `README.md` | - \[ \] |
| 12 | Formular-Endpunkt (CRM-Webhook), falls Anfragen nicht nur per WhatsApp und Mail laufen sollen | `src/config.ts` | - \[ \] |
| 13 | Google-Unternehmensprofil anlegen und erste Rezensionen sammeln (Baustein „Was Kunden sagen“ erst dann einbauen) | später | - \[ \] |
| 14 | Echte Fotos: Team mit Tieren, Beratungssituation, Partnervereine | `public/img/` | - \[ \] |

## 10. So startest du Claude Code mit diesem Brief

Der Brief wird nicht in den Chat kopiert, sondern als Datei in den Projektordner gelegt; Claude Code liest ihn dort vollständig und arbeitet die Schritte ab. Das vermeidet abgeschnittene Prompts und hält den Brief als Referenz für spätere Änderungen im Projekt.

1. Claude Code einrichten: Installation und Voraussetzungen nach der offiziellen Anleitung unter [docs.claude.com](https://docs.claude.com/en/docs/claude-code/overview); dazu Node.js in einer aktuellen LTS-Version (Astro braucht es). Ein Git-Client ist hilfreich, nicht Pflicht.
2. Ordner anlegen: `clever-versichert-web` auf dem Rechner.
3. Dieses Dokument als Markdown exportieren (am Rechner: Dokumentname anklicken, Export, Markdown; am Handy liegt Export unter Teilen) und die Datei als `BRIEF.md` in den Ordner legen.
4. Claude Code im Ordner starten und diesen ersten Prompt senden:

```text
Lies BRIEF.md vollständig, bevor du irgendetwas anlegst. Baue die Website exakt nach diesem Brief, Schritt 1 bis 8 aus Abschnitt 2, in dieser Reihenfolge. Erfinde keine Platzhalterwerte: alles Fehlende kennzeichnest du als TODO in TODO.md und im UI. Lege public/brand/smiley.svg aus dem Quelltext in Abschnitt 3 an. Nach jedem Schritt: ein Commit und drei Zeilen, was fertig ist. Am Ende: Dev-Server starten, lokale Adresse nennen, TODO.md zeigen.
```

5. Prüfen: Die lokale Adresse am Rechner und am Handy im selben WLAN öffnen (Claude Code nennt auf Nachfrage die Netzwerkadresse), alle Tierarten durchklicken, Formular bis zum WhatsApp-Link testen.
6. Nachliefern, sobald die offenen Punkte aus Abschnitt 9 vorliegen – je ein Prompt pro Punkt, zum Beispiel:

```text
Trage in src/config.ts ein: WHATSAPP_NUMBER = "49…", CONTACT_MAIL = "…", ERREICHBARKEIT_TEXT = "Mo–Fr 9–18 Uhr, Antwort meist am selben Tag". Entferne die zugehörigen TODOs in TODO.md.
```

```text
Hier sind die Teamdaten für team.json (Name, Rolle, Statement, drei Zeilen Hintergrund, Tier, Kontakt): … Die Fotos liegen unter public/img/team/. Ersetze die Platzhalter und prüfe die Teamkarten auf 360 px.
```

```text
Hier sind die Kriterienwerte für Barmenia, Hund, Stand 10/2026, Quelle AVB vom …: got 2, limit 2, hered 1, kuend 2, warte 1, sb 2, alter 1, aufnahme 2, zahn 2, direkt 2. Preisspannen Vollschutz: u1 [38, 52], 1-3 [41, 58], … Trage sie in insurers.json ein und zeige mir das neue Ranking für Hund, 1 bis 3 Jahre, Vollschutz.
```

7. Veröffentlichen: `npm run build`, den Inhalt von `dist/` per SFTP in das Domain-Verzeichnis des Hostings laden, SSL aktivieren, danach Impressum, Datenschutz, Erstinformation und das Formular auf der Live-Domain testen. Erst wenn alle Punkte in Abschnitt 9 abgehakt sind, `PLACEHOLDER_MODE` auf `false` setzen und neu bauen.
