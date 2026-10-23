/**
 * Content Collection für die Wissen-Artikel unter src/content/wissen/.
 * Frontmatter: title, description, tierarten, date, sources.
 */
import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const wissen = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/wissen" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(200),
    tierarten: z.array(z.enum(["hund", "katze", "pferd"])).min(1),
    date: z.coerce.date(),
    sources: z.array(z.object({ label: z.string().min(1), url: z.url().optional() })),
  }),
});

export const collections = { wissen };
