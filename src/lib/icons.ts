/** Linien-Icons als SVG-Strings für Inseln, die im Browser rendern. */
const paths = {
  haken: "M5 12l5 5 9-10",
  warnung: "M12 4 2.5 20h19z M12 10v4 M12 17h.01",
  kreuz: "M6 6l12 12 M18 6 6 18",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 11v5 M12 8h.01",
  minus: "M6 12h12",
} as const;

export type ClientIconName = keyof typeof paths;

export function iconSvg(name: ClientIconName, size = 18): string {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="width:${size}px;height:${size}px"><path d="${paths[name]}"/></svg>`;
}
