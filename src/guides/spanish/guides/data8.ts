/**
 * Data for Guide 8 — Tiempos Perfectos.
 * Lifted from guide8.tsx so extractors can import without touching React.
 *
 * `haberForms` covers 6 compound tenses. The extractor uses only the 3
 * high-frequency tenses (pp, plup, ppS). The low-frequency tenses
 * (futP, condP, plupS) are deferred — add extractors if/when the guide
 * adds dedicated practice content for them.
 *
 * Canonical participle used in all cards: "hablado" (hablar → to speak).
 * The guide UI also labels the subtitle "hablar → hablado".
 */

export type PerfectKey = 'pp' | 'plup' | 'futP' | 'condP' | 'ppS' | 'plupS';

export interface HaberEntry {
  /** Display label for the tense name */
  l: string;
  /** 6 conjugated haber forms (yo → ellos/Uds.) */
  f: string[];
  /** Hex color for the guide UI */
  c: string;
  /** Frequency rating shown in the guide UI */
  freq: string;
}

export const haberForms: Record<PerfectKey, HaberEntry> = {
  pp:    { l: "Presente Perfecto",   f: ["he","has","ha","hemos","habéis","han"],           c: "#1B5E20", freq: "★★★" },
  plup:  { l: "Pluscuamperfecto",    f: ["había","habías","había","habíamos","habíais","habían"], c: "#4A148C", freq: "★★★" },
  futP:  { l: "Futuro Perfecto",     f: ["habré","habrás","habrá","habremos","habréis","habrán"],  c: "#E65100", freq: "★☆☆" },
  condP: { l: "Condicional Perfecto",f: ["habría","habrías","habría","habríamos","habríais","habrían"], c: "#01579B", freq: "★☆☆" },
  ppS:   { l: "Perfecto Subjuntivo", f: ["haya","hayas","haya","hayamos","hayáis","hayan"],  c: "#880E4F", freq: "★★☆" },
  plupS: { l: "Pluscuamp. Subj.",    f: ["hubiera","hubieras","hubiera","hubiéramos","hubierais","hubieran"], c: "#3E2723", freq: "★★☆" },
};

/** The 6-pronoun labels matching the extractor's card order */
export const pronouns6: string[] = [
  "yo",
  "tú",
  "él/ella/Ud.",
  "nosotros",
  "vosotros",
  "ellos/Uds.",
];
