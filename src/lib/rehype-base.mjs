/**
 * Rehype-Plugin: hängt den Basis-Pfad an wurzelrelative Links und Bilder
 * in Markdown-Artikeln, damit sie auch unter einem Unterverzeichnis
 * (GitHub Pages) funktionieren.
 */
export default function rehypeBase(options = {}) {
  const base = (options.base ?? "/").replace(/\/$/, "");
  return (tree) => {
    if (!base) return;
    const visit = (node) => {
      if (node.type === "element") {
        const p = node.properties ?? {};
        for (const key of ["href", "src"]) {
          const v = p[key];
          if (typeof v === "string" && v.startsWith("/") && !v.startsWith("//") && !v.startsWith(base + "/") && v !== base) {
            p[key] = base + v;
          }
        }
      }
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);
  };
}
