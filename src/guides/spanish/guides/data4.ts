/**
 * Data for Guide 4 — Presente Indicativo.
 * Lifted from guide4.tsx so extractors can import without touching React.
 */

export type VerbType = 'ar' | 'er' | 'ir';

export interface PresentEntry {
  verb: string;
  stem: string;
  endings: string[];
  meaning: string;
}

export interface IrregularEntry {
  v: string;
  forms: string[];
  m: string;
}

export const presentData: Record<VerbType, PresentEntry> = {
  ar: { verb: "hablar", stem: "habl", endings: ["o", "as", "a", "amos", "áis", "an"], meaning: "to speak" },
  er: { verb: "comer", stem: "com", endings: ["o", "es", "e", "emos", "éis", "en"], meaning: "to eat" },
  ir: { verb: "vivir", stem: "viv", endings: ["o", "es", "e", "imos", "ís", "en"], meaning: "to live" },
};

export const irregulars: IrregularEntry[] = [
  { v: "ser",   forms: ["soy", "eres", "es", "somos", "sois", "son"],                    m: "to be (essence)" },
  { v: "ir",    forms: ["voy", "vas", "va", "vamos", "vais", "van"],                     m: "to go" },
  { v: "tener", forms: ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"],       m: "to have" },
  { v: "hacer", forms: ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"],           m: "to do/make" },
  { v: "estar", forms: ["estoy", "estás", "está", "estamos", "estáis", "están"],          m: "to be (state/location)" },
  { v: "poder", forms: ["puedo", "puedes", "puede", "podemos", "podéis", "pueden"],       m: "to be able to (o→ue boot)" },
  { v: "saber", forms: ["sé", "sabes", "sabe", "sabemos", "sabéis", "saben"],             m: "to know (facts)" },
  { v: "decir", forms: ["digo", "dices", "dice", "decimos", "decís", "dicen"],            m: "to say/tell" },
];

/** Canonical pronoun labels matching the 6-form conjugation table. */
export const pronouns6: string[] = [
  "yo",
  "tú",
  "él/ella/Ud.",
  "nosotros",
  "vosotros",
  "ellos/Uds.",
];
