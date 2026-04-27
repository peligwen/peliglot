/**
 * Data for Guide 5 — Pretérito vs Imperfecto.
 * Lifted from guide5.tsx so extractors can import without touching React.
 *
 * Each entry has stem + endings for 6 pronouns (matching pronouns6 order),
 * plus verb + meaning for use in extractor prompts.
 */

export type VerbType = 'ar' | 'er' | 'ir';

export interface TenseEntry {
  verb: string;
  meaning: string;
  stem: string;
  endings: string[];
}

/** Preterite conjugation data — 3 model verbs */
export const pretData: Record<VerbType, TenseEntry> = {
  ar: { verb: "hablar", meaning: "to speak", stem: "habl", endings: ["é","aste","ó","amos","asteis","aron"] },
  er: { verb: "comer",  meaning: "to eat",   stem: "com",  endings: ["í","iste","ió","imos","isteis","ieron"] },
  ir: { verb: "vivir",  meaning: "to live",   stem: "viv",  endings: ["í","iste","ió","imos","isteis","ieron"] },
};

/** Imperfect conjugation data — 3 model verbs */
export const impData: Record<VerbType, TenseEntry> = {
  ar: { verb: "hablar", meaning: "to speak", stem: "habl", endings: ["aba","abas","aba","ábamos","abais","aban"] },
  er: { verb: "comer",  meaning: "to eat",   stem: "com",  endings: ["ía","ías","ía","íamos","íais","ían"] },
  ir: { verb: "vivir",  meaning: "to live",   stem: "viv",  endings: ["ía","ías","ía","íamos","íais","ían"] },
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
