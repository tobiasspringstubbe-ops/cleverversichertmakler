/**
 * Zod-Schemas für alle JSON-Dateien in src/data/.
 * Die Prüfung läuft beim Build über src/data/index.ts; ein ungültiger
 * Eintrag stoppt den Build mit einer lesbaren Fehlermeldung.
 */
import { z } from "zod";

export const speciesIdSchema = z.enum(["hund", "katze", "pferd"]);
export type SpeciesId = z.infer<typeof speciesIdSchema>;

const optionSchema = z.object({ key: z.string().min(1), label: z.string().min(1) });

export const speciesSchema = z.object({
  id: speciesIdSchema,
  name: z.string().min(1),
  plural: z.string().min(1),
  dativPlural: z.string().min(1),
  mitArtikel: z.string().min(1),
  akkusativ: z.string().min(1),
  icon: z.enum(["hund", "katze", "pferd"]),
  altersbaender: z.array(optionSchema).min(1),
  senior: z.array(z.string()),
  groessen: z.array(optionSchema),
  nutzungen: z.array(optionSchema),
  erkrankungen: z.array(z.string()),
});
export const speciesListSchema = z.array(speciesSchema).length(3);
export type Species = z.infer<typeof speciesSchema>;

/** Ampelwert: 2 erfüllt, 1 mit Einschränkung, 0 nicht erfüllt, null unbewertet. */
export const ampelSchema = z.union([z.literal(0), z.literal(1), z.literal(2)]).nullable();
export type Ampel = z.infer<typeof ampelSchema>;

export const criterionSchema = z.object({
  key: z.string().min(1),
  tierarten: z.array(speciesIdSchema).min(1),
  name: z.string().min(1),
  kurz: z.string().min(1),
  werte: z.object({ "2": z.string().min(1), "1": z.string().min(1), "0": z.string().min(1) }),
  info: z.string().min(1),
  gewicht: z.number().nonnegative(),
});
export const criteriaListSchema = z.array(criterionSchema).min(1);
export type Criterion = z.infer<typeof criterionSchema>;

/** Preisspanne in Euro pro Monat als [von, bis], null wenn unbekannt. */
export const preisSpanneSchema = z.tuple([z.number().nonnegative(), z.number().nonnegative()]).nullable();
export type PreisSpanne = z.infer<typeof preisSpanneSchema>;

const preisJeSchutzSchema = z.object({
  op: z.record(z.string(), preisSpanneSchema),
  voll: z.record(z.string(), preisSpanneSchema),
});

export const insurerSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  tierarten: z.array(speciesIdSchema).min(1),
  tarif: z.string(),
  werte: z.partialRecord(speciesIdSchema, z.record(z.string(), ampelSchema)),
  preis: z.partialRecord(speciesIdSchema, preisJeSchutzSchema),
  hinweis: z.string(),
  quelle: z.string(),
});
export const insurersFileSchema = z.object({
  stand: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  versicherer: z.array(insurerSchema).min(1),
});
export type Insurer = z.infer<typeof insurerSchema>;
export type InsurersFile = z.infer<typeof insurersFileSchema>;

export const teamMemberSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  rolle: z.string().min(1),
  statement: z.string().min(1),
  hintergrund: z.array(z.string()).length(3),
  tier: z.string().min(1),
  foto: z.string(),
  telefon: z.string(),
  mail: z.string(),
  whatsapp: z.string(),
});
export const teamListSchema = z.array(teamMemberSchema).min(1);
export type TeamMember = z.infer<typeof teamMemberSchema>;

export const partnersSchema = z.object({
  versprechen: z.string().min(1),
  zaehler: z.object({ jahr: z.number().int(), summe_euro: z.number().nonnegative().nullable() }),
  partner: z.array(
    z.object({
      name: z.string().min(1),
      ort: z.string(),
      url: z.string(),
      logo: z.string().nullable(),
      freigabe: z.boolean(),
    }),
  ),
});
export type Partners = z.infer<typeof partnersSchema>;

export const faqItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  frage: z.string().min(1),
  antwort: z.string().min(1),
  todo: z.string().optional(),
});
export const faqListSchema = z.array(faqItemSchema).min(1);
export type FaqItem = z.infer<typeof faqItemSchema>;

export const costCardSchema = z.object({
  tierart: speciesIdSchema,
  fall: z.string().min(1),
  von: z.number().positive(),
  bis: z.number().positive(),
  einordnung: z.string().min(1),
  quelle: z.string(),
});
export const costsFileSchema = z.object({
  got_hinweis: z.string().min(1),
  got_todo: z.string(),
  karten: z.array(costCardSchema).min(1),
});
export type CostCard = z.infer<typeof costCardSchema>;
export type CostsFile = z.infer<typeof costsFileSchema>;
