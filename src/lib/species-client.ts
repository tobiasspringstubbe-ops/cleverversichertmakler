/**
 * Globale Tierwahl im Browser: localStorage (cv_species), URL-Parameter
 * ?tier= und das Attribut data-species am <html>. Alle Inseln hören auf
 * das Ereignis "cv:species". Quelle: BRIEF.md Abschnitt 4.
 */
export type SpeciesId = "hund" | "katze" | "pferd";

export const SPECIES_IDS: readonly SpeciesId[] = ["hund", "katze", "pferd"];
export const STORAGE_KEY = "cv_species";
export const EVENT_NAME = "cv:species";

export function isSpeciesId(value: unknown): value is SpeciesId {
  return typeof value === "string" && (SPECIES_IDS as readonly string[]).includes(value);
}

export function getSpecies(): SpeciesId | null {
  const attr = document.documentElement.getAttribute("data-species");
  return isSpeciesId(attr) ? attr : null;
}

export function setSpecies(next: SpeciesId | null, options: { updateUrl?: boolean } = {}): void {
  const root = document.documentElement;
  if (next) root.setAttribute("data-species", next);
  else root.removeAttribute("data-species");
  try {
    if (next) localStorage.setItem(STORAGE_KEY, next);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* Speicher nicht verfügbar */
  }
  if (options.updateUrl !== false) {
    const url = new URL(location.href);
    if (next) url.searchParams.set("tier", next);
    else url.searchParams.delete("tier");
    history.replaceState(history.state, "", url);
  }
  updateSpeciesLinks(next);
  document.dispatchEvent(new CustomEvent<SpeciesId | null>(EVENT_NAME, { detail: next }));
}

/** Hängt ?tier= an alle Links mit data-species-link, z. B. die Handlungsaufrufe. */
export function updateSpeciesLinks(current: SpeciesId | null = getSpecies()): void {
  document.querySelectorAll<HTMLAnchorElement>("a[data-species-link]").forEach((a) => {
    const url = new URL(a.getAttribute("href") ?? "/", location.origin);
    if (current) url.searchParams.set("tier", current);
    else url.searchParams.delete("tier");
    a.setAttribute("href", url.pathname + url.search + url.hash);
  });
}

export function onSpeciesChange(handler: (species: SpeciesId | null) => void): void {
  document.addEventListener(EVENT_NAME, (event) => handler((event as CustomEvent<SpeciesId | null>).detail));
}
