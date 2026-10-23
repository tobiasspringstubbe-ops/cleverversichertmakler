// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { SITE_URL } from "./src/config.ts";
import rehypeBase from "./src/lib/rehype-base.mjs";

/*
 * Statische Website ohne Server; Build erzeugt dist/.
 * Auf der eigenen Domain (SFTP) gelten die Standardwerte. Für GitHub Pages
 * setzt der Workflow SITE_URL und BASE_PATH (z. B. /cleverversichertmakler).
 */
const site = process.env.SITE_URL || SITE_URL;
const base = (process.env.BASE_PATH || "/").replace(/\/$/, "") || "/";

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  markdown: {
    processor: unified({ rehypePlugins: [[rehypeBase, { base }]] }),
  },
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
