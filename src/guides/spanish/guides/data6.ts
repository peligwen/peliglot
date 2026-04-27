/**
 * Data for Guide 6 — Futuro y Condicional.
 * Lifted from guide6.tsx so extractors can import without touching React.
 *
 * Both tenses attach endings directly to the full infinitive "hablar".
 * No stem change — the infinitive itself is the stem.
 */

/** Future endings for hablar (hablaré, hablarás, …) */
export const futEndings: string[] = ["é","ás","á","emos","éis","án"];

/** Conditional endings for hablar (hablaría, hablarías, …) */
export const condEndings: string[] = ["ía","ías","ía","íamos","íais","ían"];

/** The 6-pronoun labels matching the extractor's card order */
export const pronouns6: string[] = [
  "yo",
  "tú",
  "él/ella/Ud.",
  "nosotros",
  "vosotros",
  "ellos/Uds.",
];
