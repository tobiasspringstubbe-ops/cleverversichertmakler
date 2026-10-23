/**
 * Tier-Kompass im Browser: Eingaben, Ranking, Karten, Erklär-Panels.
 * Vanilla DOM, keine Bibliothek. Quelle: BRIEF.md Abschnitt 5.
 */
import speciesRaw from "../../data/species.json";
import criteriaRaw from "../../data/criteria.json";
import insurersRaw from "../../data/insurers.json";
import type { Ampel, Criterion, Insurer, Species, SpeciesId } from "../../data/schema";
import { getSpecies, onSpeciesChange } from "../species-client";
import { iconSvg } from "../icons";
import { formatStand, rank, type KompassInput, type ScoredInsurer } from "./scoring";

const speciesList = speciesRaw as Species[];
const criteriaList = criteriaRaw as Criterion[];
const insurers = insurersRaw as { stand: string; versicherer: Insurer[] };

const STORAGE_KEY = "cv_kompass";

interface Options {
  preview: boolean;
  placeholderMode: boolean;
}

type FormState = Omit<KompassInput, "tierart">;

const defaultState: FormState = {
  status: "schon",
  alter: null,
  groesse: null,
  nutzung: null,
  rasse: "",
  vorerkrankungen: "nein",
  vorerkrankungenText: "",
  schutz: "voll",
  sb: "ohne",
};

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

function loadState(): FormState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState, ...(JSON.parse(raw) as Partial<FormState>) };
  } catch {
    /* kein Speicher */
  }
  return { ...defaultState };
}

function saveState(state: FormState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* kein Speicher */
  }
}

function speciesById(id: SpeciesId): Species {
  const found = speciesList.find((s) => s.id === id);
  if (!found) throw new Error(`Unbekannte Tierart ${id}`);
  return found;
}

function ampelClass(v: Ampel): string {
  if (v === 2) return "chip--ok";
  if (v === 1) return "chip--warn";
  if (v === 0) return "chip--no";
  return "chip--unrated";
}

function ampelIcon(v: Ampel): string {
  if (v === 2) return iconSvg("haken", 16);
  if (v === 1) return iconSvg("warnung", 16);
  if (v === 0) return iconSvg("kreuz", 16);
  return iconSvg("minus", 16);
}

function ampelText(v: Ampel): string {
  if (v === 2) return "erfüllt";
  if (v === 1) return "mit Einschränkung";
  if (v === 0) return "nicht erfüllt";
  return "unbewertet";
}

function radioGroup(name: string, legend: string, options: { value: string; label: string }[], current: string | null): string {
  return `<fieldset class="field"><legend class="field__label">${esc(legend)}</legend><div class="segmented">${options
    .map(
      (o) =>
        `<label class="segmented__item"><input type="radio" name="${name}" value="${esc(o.value)}" ${o.value === current ? "checked" : ""}><span>${esc(o.label)}</span></label>`,
    )
    .join("")}</div></fieldset>`;
}

function select(name: string, label: string, options: { key: string; label: string }[], current: string | null, placeholder = "Bitte wählen"): string {
  return `<div class="field"><label class="field__label" for="k-${name}">${esc(label)}</label><select class="input" id="k-${name}" name="${name}"><option value="">${esc(placeholder)}</option>${options
    .map((o) => `<option value="${esc(o.key)}" ${o.key === current ? "selected" : ""}>${esc(o.label)}</option>`)
    .join("")}</select></div>`;
}

function renderInputs(form: HTMLFormElement, species: Species, state: FormState): void {
  const parts: string[] = [];
  parts.push(radioGroup("status", "Dein Tier", [{ value: "schon", label: "schon bei mir" }, { value: "bald", label: "kommt bald" }], state.status));
  parts.push(select("alter", "Alter", species.altersbaender, state.alter));
  if (species.groessen.length) parts.push(select("groesse", "Größe", species.groessen, state.groesse));
  if (species.nutzungen.length) parts.push(select("nutzung", "Nutzung", species.nutzungen, state.nutzung));
  parts.push(
    `<div class="field"><label class="field__label" for="k-rasse">Rasse <span class="muted">(optional)</span></label><input class="input" id="k-rasse" name="rasse" type="text" maxlength="60" value="${esc(state.rasse)}" autocomplete="off"></div>`,
  );
  parts.push(radioGroup("vorerkrankungen", "Vorerkrankungen", [{ value: "nein", label: "nein" }, { value: "ja", label: "ja" }], state.vorerkrankungen));
  parts.push(
    `<div class="field" data-vorerkrankungen-text ${state.vorerkrankungen === "ja" ? "" : "hidden"}><label class="field__label" for="k-vorerkrankungen-text">Welche?</label><textarea class="input" id="k-vorerkrankungen-text" name="vorerkrankungenText" rows="2" maxlength="300">${esc(state.vorerkrankungenText)}</textarea></div>`,
  );
  parts.push(radioGroup("schutz", "Schutz", [{ value: "op", label: "OP-Schutz" }, { value: "voll", label: "Vollschutz" }], state.schutz));
  parts.push(radioGroup("sb", "Selbstbeteiligung", [{ value: "ohne", label: "ohne" }, { value: "mit", label: "mit" }], state.sb));
  form.innerHTML = parts.join("");
}

function readState(form: HTMLFormElement, previous: FormState): FormState {
  const data = new FormData(form);
  const str = (k: string) => {
    const v = data.get(k);
    return typeof v === "string" ? v : "";
  };
  const orNull = (v: string) => (v === "" ? null : v);
  return {
    status: str("status") === "bald" ? "bald" : "schon",
    alter: orNull(str("alter")),
    groesse: form.elements.namedItem("groesse") ? orNull(str("groesse")) : null,
    nutzung: form.elements.namedItem("nutzung") ? orNull(str("nutzung")) : null,
    rasse: str("rasse").slice(0, 60),
    vorerkrankungen: str("vorerkrankungen") === "ja" ? "ja" : "nein",
    vorerkrankungenText: str("vorerkrankungenText").slice(0, 300),
    schutz: str("schutz") === "op" ? "op" : "voll",
    sb: str("sb") === "mit" ? "mit" : "ohne",
    ...(previous.alter && !form.elements.namedItem("alter") ? { alter: previous.alter } : {}),
  };
}

function requestLink(input: KompassInput, insurer: Insurer): string {
  const params = new URLSearchParams();
  params.set("tier", input.tierart);
  if (input.alter) params.set("alter", input.alter);
  if (input.groesse) params.set("groesse", input.groesse);
  if (input.nutzung) params.set("nutzung", input.nutzung);
  if (input.rasse) params.set("rasse", input.rasse);
  params.set("vorerkrankungen", input.vorerkrankungen);
  params.set("schutz", input.schutz);
  params.set("sb", input.sb);
  const tarif = insurer.tarif.startsWith("TODO") ? insurer.name : `${insurer.name} ${insurer.tarif}`;
  params.set("tarif", tarif);
  return `/kontakt?${params.toString()}#anfrage`;
}

function renderCard(entry: ScoredInsurer, place: number | null, input: KompassInput, criteria: Criterion[], opts: Options, recommend: boolean): string {
  const { insurer, werte, preis } = entry;
  const cardId = `karte-${insurer.id}`;
  const unrated = place === null;
  const chips = criteria
    .map((c) => {
      const v = werte[c.key] ?? null;
      return `<button type="button" class="chip ${ampelClass(v)} rank-card__chip" data-chip="${esc(c.key)}" aria-expanded="false" aria-controls="${cardId}-panel">${ampelIcon(v)}<span>${esc(c.kurz)}</span><span class="visually-hidden">: ${ampelText(v)}</span>${iconSvg("info", 14)}</button>`;
    })
    .join("");
  const tarifIsTodo = insurer.tarif.startsWith("TODO");
  const badge = place === 1 && recommend ? `<span class="rank-card__badge">Unsere Empfehlung</span>` : "";
  const placeholder = opts.placeholderMode ? `<span class="placeholder-badge">Platzhalter</span>` : "";
  const priceHtml =
    preis && preis[0] !== undefined
      ? `<p class="rank-card__price"><strong>ab ca. ${preis[0].toLocaleString("de-DE")} €/Monat</strong><br><small>Richtwert, Stand ${formatStand(insurers.stand)}; Beitrag und Annahme prüft der Versicherer</small></p>`
      : `<p class="rank-card__price"><strong>Beitrag auf Anfrage</strong></p>`;
  return `<article class="rank-card card card--paper ${unrated ? "rank-card--unrated" : ""}" id="${cardId}" data-card>
    <header class="rank-card__head">
      <span class="rank-card__place" aria-label="${unrated ? "Nicht gerankt" : `Platz ${place}`}">${unrated ? "–" : place}</span>
      <div>
        <h3 class="rank-card__name">${esc(insurer.name)}</h3>
        <p class="rank-card__tarif">${tarifIsTodo ? `Tarif folgt ${placeholder}` : esc(insurer.tarif)}</p>
      </div>
      ${badge}
    </header>
    ${unrated ? `<p class="rank-card__pending">Bewertung folgt ${placeholder}</p>` : `<p class="rank-card__score">Score ${entry.score.toLocaleString("de-DE")} von ${entry.maxScore.toLocaleString("de-DE")}</p>`}
    <div class="rank-card__chips" role="group" aria-label="Kriterien">${chips}</div>
    <div class="rank-card__panel" id="${cardId}-panel" hidden></div>
    ${insurer.hinweis ? `<p class="rank-card__hint">${esc(insurer.hinweis)}</p>` : ""}
    ${priceHtml}
    <div class="rank-card__actions">
      <a class="button button--primary" href="${requestLink(input, insurer)}">Beitrag anfragen</a>
      <small class="rank-card__stand">Stand ${formatStand(insurers.stand)}, <a href="/so-bewerten-wir">so bewerten wir</a></small>
    </div>
  </article>`;
}

function renderResults(container: HTMLElement, input: KompassInput, state: { showAll: boolean }, opts: Options): void {
  const species = speciesById(input.tierart);
  const criteria = criteriaList.filter((c) => c.tierarten.includes(input.tierart));
  const result = rank(input, species, criteria, insurers.versicherer);
  const all: { entry: ScoredInsurer; place: number | null }[] = [
    ...result.ranked.map((entry, i) => ({ entry, place: i + 1 })),
    ...result.unrated.map((entry) => ({ entry, place: null })),
  ];
  const total = all.length;
  const visible = opts.preview || !state.showAll ? all.slice(0, 3) : all;

  const parts: string[] = [];
  if (input.vorerkrankungen === "ja") {
    parts.push(
      `<div class="notice" role="note">${iconSvg("info", 20)}<p>Bestehende Erkrankungen schließt jeder Tarif aus. Alles andere bleibt versicherbar – wir prüfen für dich, welcher Versicherer dein Tier annimmt.</p></div>`,
    );
  }
  parts.push(`<div class="rank-list">${visible.map((v) => renderCard(v.entry, v.place, input, criteria, opts, result.recommend)).join("")}</div>`);
  if (opts.preview) {
    parts.push(`<p class="rank-more"><a class="button button--secondary" href="/tier-kompass">Alle Tarife im Tier-Kompass</a></p>`);
  } else if (total > 3) {
    parts.push(
      `<p class="rank-more"><button type="button" class="button button--secondary" data-toggle-all aria-expanded="${state.showAll}">${state.showAll ? "Nur Top 3 anzeigen" : `Alle ${total} Tarife anzeigen`}</button></p>`,
    );
  }
  parts.push(
    `<p class="rank-note">Bewertung nach unserem Kriterienkatalog, Stand ${formatStand(insurers.stand)}. Keine Beitragsberechnung, kein Angebot. Beitrag und Annahme prüft der Versicherer. <a href="/so-bewerten-wir">So bewerten wir</a></p>`,
  );
  container.innerHTML = parts.join("");

  // Erklär-Panels
  container.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
    const panel = card.querySelector<HTMLElement>(".rank-card__panel");
    const chips = Array.from(card.querySelectorAll<HTMLButtonElement>("[data-chip]"));
    if (!panel) return;
    const close = () => {
      panel.hidden = true;
      panel.innerHTML = "";
      chips.forEach((c) => c.setAttribute("aria-expanded", "false"));
    };
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const open = chip.getAttribute("aria-expanded") === "true";
        close();
        if (open) return;
        const key = chip.dataset.chip ?? "";
        const criterion = criteria.find((c) => c.key === key);
        if (!criterion) return;
        const insurerId = card.id.replace("karte-", "");
        const insurer = insurers.versicherer.find((v) => v.id === insurerId);
        const value = insurer?.werte[input.tierart]?.[key] ?? null;
        const valueLabel = value === null ? "noch nicht bewertet" : criterion.werte[String(value) as "0" | "1" | "2"];
        panel.innerHTML = `<div class="rank-panel">
          <div class="rank-panel__head"><strong>${esc(criterion.name)}</strong><button type="button" class="rank-panel__close" data-close aria-label="Panel schließen">${iconSvg("kreuz", 18)}</button></div>
          <p class="rank-panel__value"><span class="chip ${ampelClass(value)}">${ampelIcon(value)}<span>${esc(ampelText(value))}</span></span> ${esc(valueLabel)}</p>
          <p>${esc(criterion.info)}</p>
          <p class="rank-panel__scale"><span class="chip chip--ok">2</span> ${esc(criterion.werte["2"])} <span class="chip chip--warn">1</span> ${esc(criterion.werte["1"])} <span class="chip chip--no">0</span> ${esc(criterion.werte["0"])}</p>
          <p><a href="/so-bewerten-wir">So bewerten wir</a></p>
        </div>`;
        panel.hidden = false;
        chip.setAttribute("aria-expanded", "true");
        panel.querySelector<HTMLButtonElement>("[data-close]")?.addEventListener("click", () => {
          close();
          chip.focus();
        });
      });
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        event.preventDefault();
        const openChip = chips.find((c) => c.getAttribute("aria-expanded") === "true");
        close();
        openChip?.focus();
      }
    });
  });

  container.querySelector<HTMLButtonElement>("[data-toggle-all]")?.addEventListener("click", () => {
    state.showAll = !state.showAll;
    renderResults(container, input, state, opts);
    container.querySelector<HTMLElement>("[data-toggle-all]")?.focus();
  });
}

export function mountKompass(root: HTMLElement): void {
  const opts: Options = { preview: root.dataset.preview === "true", placeholderMode: root.dataset.placeholder === "true" };
  const form = root.querySelector<HTMLFormElement>("[data-kompass-inputs]");
  const results = root.querySelector<HTMLElement>("[data-kompass-results]");
  if (!form || !results) return;

  let state = loadState();
  const view = { showAll: false };
  let current: SpeciesId | null = getSpecies();

  const update = () => {
    if (!current) return;
    const input: KompassInput = { tierart: current, ...state };
    renderResults(results, input, view, opts);
  };

  const build = () => {
    if (!current) return;
    const species = speciesById(current);
    if (state.alter && !species.altersbaender.some((b) => b.key === state.alter)) state.alter = null;
    if (!state.alter) state.alter = species.altersbaender[1]?.key ?? null;
    renderInputs(form, species, state);
    update();
  };

  form.addEventListener("submit", (e) => e.preventDefault());
  form.addEventListener("input", () => {
    state = readState(form, state);
    const textField = form.querySelector<HTMLElement>("[data-vorerkrankungen-text]");
    if (textField) textField.hidden = state.vorerkrankungen !== "ja";
    saveState(state);
    update();
  });

  onSpeciesChange((value) => {
    current = value;
    view.showAll = false;
    if (value) build();
  });

  build();
}
