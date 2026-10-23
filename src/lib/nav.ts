/** Die genau fünf Punkte der Hauptnavigation. Quelle: BRIEF.md Abschnitt 4. */
export const NAV_ITEMS = [
  { href: "/tier-kompass", label: "Tier-Kompass" },
  { href: "/wissen", label: "Wissen" },
  { href: "/team", label: "Team" },
  { href: "/tierschutz", label: "Tierschutz" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

/** Prüft, ob ein Navigationspunkt zur aktuellen Seite gehört (auch Unterseiten). */
export function isActive(pathname: string, href: string): boolean {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return clean === href || clean.startsWith(`${href}/`);
}
