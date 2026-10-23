/**
 * Basis-Pfad der Website. Bei eigener Domain ist er leer; auf GitHub Pages
 * unter /cleverversichertmakler. Alle internen Links laufen über href().
 */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Hängt den Basis-Pfad an einen wurzelrelativen Pfad ("/kontakt"). */
export function href(path: string): string {
  return path.startsWith("/") ? `${BASE}${path}` : path;
}

/** Pfad der aktuellen Seite ohne Basis-Pfad, mit führendem Schrägstrich. */
export function currentPath(pathname: string): string {
  const stripped = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return (stripped.replace(/\/+$/, "") || "/");
}
