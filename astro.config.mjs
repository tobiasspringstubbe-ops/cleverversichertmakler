// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/config.ts";

// Statische Website ohne Server; Build erzeugt dist/ für den Upload per SFTP.
export default defineConfig({
  site: SITE_URL,
  output: "static",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
