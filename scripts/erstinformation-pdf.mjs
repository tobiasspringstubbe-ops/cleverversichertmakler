/**
 * Erzeugt public/erstinformation.pdf aus der gebauten Seite /erstinformation.
 * Voraussetzung: npm run build, dann läuft dieses Skript mit astro preview.
 * Einmalig: npx playwright install chromium. Aufruf: npm run pdf
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const port = 4398;
const preview = spawn("npx", ["astro", "preview", "--port", String(port)], { cwd: root, stdio: "ignore" });

async function waitForServer() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://localhost:${port}/erstinformation`);
      if (res.ok) return;
    } catch {
      /* noch nicht bereit */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Vorschau-Server nicht erreichbar. Vorher npm run build ausführen.");
}

try {
  await waitForServer();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}/erstinformation`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "header, .nav--bar, footer, .wa-floating, .breadcrumb, .cta, .skip-link { display: none !important }" });
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.pdf({ path: join(root, "public/erstinformation.pdf"), format: "A4", printBackground: true, margin: { top: "18mm", bottom: "18mm", left: "16mm", right: "16mm" } });
  await browser.close();
  console.log("public/erstinformation.pdf erzeugt. Danach erneut npm run build, damit das PDF in dist/ landet.");
} finally {
  preview.kill();
  spawn("npx", ["astro", "preview", "stop"], { cwd: root, stdio: "ignore" });
}
