/**
 * Data for Guide 28 — Subjuntivo Presente (Present Subjunctive).
 * Lifted from guide28.tsx so extractors can import without touching React.
 *
 * 3 model verbs (hablar, comer, vivir) with present-subjunctive endings.
 * Formula: "opposite vowel" — -AR verbs take -E endings, -ER/-IR take -A endings.
 */

export type VerbType = 'ar' | 'er' | 'ir';

export interface SubjEntry {
  verb: string;
  meaning: string;
  stem: string;
  endings: string[];
}

export const subjData: Record<VerbType, SubjEntry> = {
  ar: { verb: "hablar", meaning: "to speak", stem: "habl", endings: ["e","es","e","emos","éis","en"] },
  er: { verb: "comer",  meaning: "to eat",   stem: "com",  endings: ["a","as","a","amos","áis","an"] },
  ir: { verb: "vivir",  meaning: "to live",   stem: "viv",  endings: ["a","as","a","amos","áis","an"] },
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
