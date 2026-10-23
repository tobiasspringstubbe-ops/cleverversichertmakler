/**
 * Erzeugt aus public/brand/smiley.svg die Dateien favicon.svg, favicon-32.png,
 * apple-touch-icon.png (180 px) und og.png (1200 × 630, Smiley links,
 * Wortmarke rechts, Hintergrund Weiß). Einmalig: npx playwright install chromium
 * Aufruf: npm run brand
 */
import { chromium } from "playwright";
import { copyFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public/brand/smiley.svg"), "utf8");
const fontDir = join(root, "node_modules/@fontsource/poppins/files");
const fontFace = `
  @font-face { font-family: Poppins; font-weight: 800; src: url(file://${fontDir}/poppins-latin-800-normal.woff2) format("woff2"); }
  @font-face { font-family: Poppins; font-weight: 500; src: url(file://${fontDir}/poppins-latin-500-normal.woff2) format("woff2"); }
`;

copyFileSync(join(root, "public/brand/smiley.svg"), join(root, "public/favicon.svg"));

const browser = await chromium.launch();
const page = await browser.newPage();

for (const [name, size] of [["favicon-32.png", 32], ["apple-touch-icon.png", 180]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg.replace(/width="1024" height="1024"/, `width="${size}" height="${size}"`)}</body></html>`);
  await page.screenshot({ path: join(root, "public", name), omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
}

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!doctype html><html><head><style>${fontFace}
  html,body{margin:0;width:1200px;height:630px;background:#fff;font-family:Poppins,sans-serif;color:#011C40}
  .wrap{display:flex;align-items:center;justify-content:center;gap:72px;height:100%}
  .mark{width:400px;height:400px}
  .word{display:flex;flex-direction:column;line-height:1}
  .clever{font-weight:800;font-size:200px;letter-spacing:-0.02em;line-height:0.95}
  .versichert{font-weight:500;font-size:90px;letter-spacing:0.28em;text-transform:uppercase;margin-top:12px}
</style></head><body><div class="wrap">
  ${svg.replace(/width="1024" height="1024"/, 'class="mark"')}
  <div class="word"><span class="clever">clever</span><span class="versichert">versichert</span></div>
</div></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, "public/og.png"), clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log("Bildmarke erzeugt: favicon.svg, favicon-32.png, apple-touch-icon.png, og.png");
