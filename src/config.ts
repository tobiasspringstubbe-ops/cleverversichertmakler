/**
 * Zentrale Konfiguration der Website clever versichert.
 *
 * Alle Werte, die Tobias liefert, stehen hier an einer Stelle. Werte mit dem
 * Präfix "TODO:" sind Platzhalter. Solange PLACEHOLDER_MODE wahr ist, zeigt
 * die Seite an jedem Platzhalter ein gelbes Badge „Platzhalter“.
 *
 * Die Domain cleverversichertmakler.de ist nur die technische Adresse.
 * Der Markenname bleibt überall „clever versichert“; die Domain erscheint
 * nirgends als Markenname.
 */

/** Markenname als Text, nie als Bild. */
export const BRAND_NAME = "clever versichert";

/** Claim, nur im Hero und im Footer. */
export const CLAIM = "Frage immer erst warum.";

/** Kanonische Adresse der Website, ohne Pfad und ohne Schrägstrich am Ende. */
export const SITE_URL = "https://cleverversichertmakler.de";

/** WhatsApp-Business-Nummer im internationalen Format ohne Plus, z. B. "4915112345678". */
export const WHATSAPP_NUMBER = "TODO: WhatsApp-Business-Nummer";

/** Kontakt-Mailadresse für Anfragen per Telefon oder E-Mail. */
export const CONTACT_MAIL = "TODO: Kontakt-Mailadresse";

/** Telefonnummer für Rückrufe, Anzeige auf /kontakt und im Footer. */
export const CONTACT_PHONE = "TODO: Telefonnummer";

/** Erreichbarkeit mit Tagen, Zeiten und realistischer Antwortzeit. */
export const ERREICHBARKEIT_TEXT = "TODO: Erreichbarkeit, z. B. Mo–Fr 9–18 Uhr, Antwort meist am selben Tag";

/** Standort als Ort, ohne Hausbesuch-Versprechen. */
export const STANDORT = "TODO: Ort in Mittelhessen";

/**
 * Optionaler Endpunkt (CRM-Webhook), an den das Kontaktformular zusätzlich
 * per POST als JSON sendet. Leer lassen, solange es keinen gibt.
 */
export const FORM_ENDPOINT = "";

/**
 * Solange wahr, zeigt die Seite an jedem Platzhalter ein gelbes Badge.
 * Erst auf false setzen, wenn alle Punkte in BRIEF.md Abschnitt 9 abgehakt sind.
 */
export const PLACEHOLDER_MODE = true;

/** Vorbefüllter Text des schwebenden WhatsApp-Buttons. */
export const WHATSAPP_DEFAULT_TEXT =
  "Hallo clever versichert, ich habe eine Frage zur Tierkrankenversicherung.";

/** Standardtitel und Beschreibung der Startseite. */
export const SITE_TITLE = "Tierkrankenversicherung für Hund, Katze und Pferd – clever versichert";
export const SITE_DESCRIPTION =
  "Wir vergleichen Tierkrankenversicherungen für Hund, Katze und Pferd nach dem Bedingungswerk, nicht nach der Werbung. Persönliche Beratung aus Mittelhessen, Kontakt per WhatsApp oder Formular.";

/** Sprache und Region für Meta-Tags. */
export const LOCALE = "de_DE";

/**
 * Prüft, ob ein Wert ein Platzhalter ist. Wird von den Komponenten genutzt,
 * um das Badge „Platzhalter“ anzuzeigen.
 */
export function isPlaceholder(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "" || value.startsWith("TODO");
  return false;
}
