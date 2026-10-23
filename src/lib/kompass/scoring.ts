/**
 * Reine Bewertungslogik des Tier-Kompass. Keine DOM-Zugriffe, damit sie
 * sich serverseitig (/so-bewerten-wir) und im Browser gleich verhält.
 * Quelle: BRIEF.md Abschnitt 5, „Scoring“.
 */
import type { Ampel, Criterion, Insurer, PreisSpanne, Species, SpeciesId } from "../../data/schema";

export type Schutz = "op" | "voll";
export type Sb = "ohne" | "mit";

export interface KompassInput {
  tierart: SpeciesId;
  status: "schon" | "bald";
  alter: string | null;
  groesse: string | null;
  nutzung: string | null;
  rasse: string;
  vorerkrankungen: "nein" | "ja";
  vorerkrankungenText: string;
  schutz: Schutz;
  sb: Sb;
}

export interface ScoredInsurer {
  insurer: Insurer;
  score: number;
  maxScore: number;
  werte: Record<string, Ampel>;
  preis: PreisSpanne | undefined;
}

export interface RankingResult {
  ranked: ScoredInsurer[];
  unrated: ScoredInsurer[];
  weights: Record<string, number>;
  /** Badge „Unsere Empfehlung“ nur, wenn mindestens drei vollständig bewertet sind. */
  recommend: boolean;
}

/** Gewichte je Kriterium nach den Eingaben. */
export function computeWeights(input: KompassInput, species: Species, criteria: Criterion[]): Record<string, number> {
  const weights: Record<string, number> = {};
  for (const c of criteria) weights[c.key] = c.gewicht;

  const set = (key: string, value: number) => {
    if (key in weights) weights[key] = value;
  };

  if (input.alter && species.senior.includes(input.alter)) {
    set("alter", 3);
    set("aufnahme", 3);
  }
  if (input.tierart === "hund" && input.groesse === "gross") set("hered", 2);
  if (input.tierart === "pferd" && (input.nutzung === "sport" || input.nutzung === "zucht")) {
    set("lahm", 2);
    set("nutzung", 2);
  }
  if (input.schutz === "op") {
    set("zahn", 0);
    set("limit", 1.5);
  }
  return weights;
}

export function priceFor(insurer: Insurer, input: KompassInput): PreisSpanne | undefined {
  if (!input.alter) return undefined;
  const bySpecies = insurer.preis[input.tierart];
  if (!bySpecies) return undefined;
  const band = bySpecies[input.schutz][input.alter];
  return band ?? undefined;
}

export function rank(input: KompassInput, species: Species, criteria: Criterion[], insurers: Insurer[]): RankingResult {
  const weights = computeWeights(input, species, criteria);
  const maxScore = criteria.reduce((sum, c) => sum + (weights[c.key] ?? 0) * 2, 0);
  const ranked: ScoredInsurer[] = [];
  const unrated: ScoredInsurer[] = [];

  for (const insurer of insurers) {
    if (!insurer.tierarten.includes(input.tierart)) continue;
    const werte = insurer.werte[input.tierart] ?? {};
    const complete = criteria.every((c) => werte[c.key] !== null && werte[c.key] !== undefined);
    const score = complete
      ? criteria.reduce((sum, c) => sum + (weights[c.key] ?? 0) * (werte[c.key] ?? 0), 0)
      : 0;
    const entry: ScoredInsurer = { insurer, score, maxScore, werte, preis: priceFor(insurer, input) };
    (complete ? ranked : unrated).push(entry);
  }

  const byName = (a: ScoredInsurer, b: ScoredInsurer) => a.insurer.name.localeCompare(b.insurer.name, "de");
  ranked.sort((a, b) => b.score - a.score || byName(a, b));
  unrated.sort(byName);

  return { ranked, unrated, weights, recommend: ranked.length >= 3 };
}

/** Datum im Format TT.MM.JJJJ aus einem ISO-Datum. */
export function formatStand(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
