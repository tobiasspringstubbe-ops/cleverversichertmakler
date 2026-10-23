import { WHATSAPP_NUMBER, isPlaceholder } from "../config";

/**
 * Baut den WhatsApp-Link. Solange die Nummer ein Platzhalter ist, fällt der
 * Link auf wa.me ohne Nummer zurück; WhatsApp öffnet dann die Kontaktwahl.
 */
export function whatsappLink(text: string): string {
  const number = isPlaceholder(WHATSAPP_NUMBER) ? "" : WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
