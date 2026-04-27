/**
 * Data for Guide 29 — Subjuntivo Pasado (Past Subjunctive).
 * Lifted from guide29.tsx so extractors can import without touching React.
 *
 * Formation: 3rd-person plural preterite → drop -ron → add -ra endings.
 *
 * The -ra form is canonical; the -se alternate (hablase, comiese, etc.) is
 * equally correct (common in Spain) and is recorded in acceptableAnswers
 * by the extractor.
 *
 * NOTE: The nosotros form always carries a written accent mark in both forms
 * (habláramos / hablásemos). Because the accent falls on the stem's final
 * vowel rather than the ending itself, we store full nosotros forms explicitly
 * (nosotrosRa / nosotrosSe arrays). All other persons use stem + endings.
 *
 * "ir/ser" share identical past-subjunctive forms (fuera, fueras…) as they
 * share identical preterite stems (fue-). One entry handles both verbs.
 */

export interface PastSubjEntry {
  /** Display label / infinitive(s) */
  v: string;
  /** The stem after dropping -ron from 3pl preterite */
  stem: string;
  meaning: string;
  /** Full accented nosotros -ra form (e.g. "habláramos") */
  nosotrosRa: string;
  /** Full accented nosotros -se form (e.g. "hablásemos") */
  nosotrosSe: string;
}

/** 5 verbs — one card set each × 6 pronouns = 30 cards */
export const verbs: PastSubjEntry[] = [
  { v: "hablar", stem: "habla", meaning: "to speak",      nosotrosRa: "habláramos",  nosotrosSe: "hablásemos" },
  { v: "comer",  stem: "comie", meaning: "to eat",        nosotrosRa: "comiéramos",  nosotrosSe: "comiésemos" },
  { v: "tener",  stem: "tuvie", meaning: "to have",       nosotrosRa: "tuviéramos",  nosotrosSe: "tuviésemos" },
  { v: "poder",  stem: "pudie", meaning: "to be able",    nosotrosRa: "pudiéramos",  nosotrosSe: "pudiésemos" },
  { v: "ir/ser", stem: "fue",   meaning: "to go / to be", nosotrosRa: "fuéramos",    nosotrosSe: "fuésemos" },
];

/**
 * -ra endings (canonical).
 * Index 3 (nosotros) is "ramos" — used for all persons except nosotros where
 * the full form is stored in PastSubjEntry.nosotrosRa.
 */
export const endings: string[] = ["ra","ras","ra","ramos","rais","ran"];

/**
 * -se endings (alternate, equally correct).
 * Index 3 (nosotros) uses PastSubjEntry.nosotrosSe instead.
 */
export const seEndings: string[] = ["se","ses","se","semos","seis","sen"];

/** The 6-pronoun labels matching the extractor's card order */
export const pronouns6: string[] = [
  "yo",
  "tú",
  "él/ella/Ud.",
  "nosotros",
  "vosotros",
  "ellos/Uds.",
];
