/**
 * Lädt und validiert alle JSON-Daten. Jeder Import läuft durch das
 * Zod-Schema; Fehler stoppen den Build und nennen Datei und Pfad.
 */
import { z } from "zod";
import speciesRaw from "./species.json";
import criteriaRaw from "./criteria.json";
import insurersRaw from "./insurers.json";
import teamRaw from "./team.json";
import partnersRaw from "./partners.json";
import faqRaw from "./faq.json";
import costsRaw from "./costs.json";
import {
  costsFileSchema,
  criteriaListSchema,
  faqListSchema,
  insurersFileSchema,
  partnersSchema,
  speciesListSchema,
  teamListSchema,
  type Criterion,
  type Insurer,
  type Species,
  type SpeciesId,
} from "./schema";

function parse<T extends z.ZodType>(schema: T, data: unknown, file: string): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  ${issue.path.join(".") || "(Wurzel)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Ungültige Daten in src/data/${file}:\n${issues}`);
  }
  return result.data;
}

export const species = parse(speciesListSchema, speciesRaw, "species.json");
export const criteria = parse(criteriaListSchema, criteriaRaw, "criteria.json");
export const insurers = parse(insurersFileSchema, insurersRaw, "insurers.json");
export const team = parse(teamListSchema, teamRaw, "team.json");
export const partners = parse(partnersSchema, partnersRaw, "partners.json");
export const faq = parse(faqListSchema, faqRaw, "faq.json");
export const costs = parse(costsFileSchema, costsRaw, "costs.json");

export const speciesById = (id: SpeciesId): Species => {
  const found = species.find((s) => s.id === id);
  if (!found) throw new Error(`Unbekannte Tierart: ${id}`);
  return found;
};

/** Kriterien, die für eine Tierart gelten, in Katalogreihenfolge. */
export const criteriaFor = (id: SpeciesId): Criterion[] => criteria.filter((c) => c.tierarten.includes(id));

/** Versicherer, die eine Tierart versichern. */
export const insurersFor = (id: SpeciesId): Insurer[] => insurers.versicherer.filter((v) => v.tierarten.includes(id));

/* Querprüfungen, die ein einzelnes Schema nicht abdecken. */
for (const sp of species) {
  const keys = criteriaFor(sp.id).map((c) => c.key);
  if (new Set(keys).size !== keys.length) {
    throw new Error(`criteria.json: doppelter Schlüssel für ${sp.id}`);
  }
  const bands = sp.altersbaender.map((b) => b.key);
  for (const v of insurersFor(sp.id)) {
    const werte = v.werte[sp.id];
    if (!werte) throw new Error(`insurers.json: ${v.id} nennt ${sp.id}, hat aber keine werte.${sp.id}`);
    const missing = keys.filter((k) => !(k in werte));
    const extra = Object.keys(werte).filter((k) => !keys.includes(k));
    if (missing.length || extra.length) {
      throw new Error(
        `insurers.json: ${v.id}, werte.${sp.id}: fehlend [${missing.join(", ")}], überflüssig [${extra.join(", ")}]`,
      );
    }
    const preis = v.preis[sp.id];
    if (!preis) throw new Error(`insurers.json: ${v.id} nennt ${sp.id}, hat aber keine preis.${sp.id}`);
    for (const schutz of ["op", "voll"] as const) {
      const extraBands = Object.keys(preis[schutz]).filter((b) => !bands.includes(b));
      if (extraBands.length) {
        throw new Error(`insurers.json: ${v.id}, preis.${sp.id}.${schutz}: unbekannte Altersbänder [${extraBands.join(", ")}]`);
      }
    }
  }
}
for (const card of costs.karten) {
  if (card.von > card.bis) throw new Error(`costs.json: ${card.fall}: von größer als bis`);
}
