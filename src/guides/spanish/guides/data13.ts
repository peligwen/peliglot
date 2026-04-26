/**
 * Data for Guide 13 — Adjetivos.
 * Lifted from guide13.tsx so extractors can import without touching React.
 */

export type FormKey = "ms" | "fs" | "mp" | "fp";

export interface AdjEntry {
  base: string;
  forms: Record<FormKey, string>;
  en: string;
  type: string;
}

export interface MeaningShift {
  a: string;
  before: string;
  after: string;
  exS: string;
  exE: string;
}

export const adjs: AdjEntry[] = [
  { base: "alto",    forms: { ms: "alto",    fs: "alta",    mp: "altos",    fp: "altas"    }, en: "tall",       type: "4-form" },
  { base: "rojo",    forms: { ms: "rojo",    fs: "roja",    mp: "rojos",    fp: "rojas"    }, en: "red",        type: "4-form" },
  { base: "grande",  forms: { ms: "grande",  fs: "grande",  mp: "grandes",  fp: "grandes"  }, en: "big",        type: "2-form" },
  { base: "difícil", forms: { ms: "difícil", fs: "difícil", mp: "difíciles", fp: "difíciles" }, en: "difficult", type: "2-form" },
  { base: "español", forms: { ms: "español", fs: "española", mp: "españoles", fp: "españolas" }, en: "Spanish",  type: "nationality" },
];

/** The four noun forms used in the agreement grid. */
export const nouns: Record<FormKey, string> = {
  ms: "el chico",
  fs: "la chica",
  mp: "los chicos",
  fp: "las chicas",
};

export const shifts: MeaningShift[] = [
  { a: "pobre",       before: "unfortunate",       after: "poor (no money)",   exS: "Es un pobre hombre.",       exE: "Es un hombre pobre." },
  { a: "viejo",       before: "long-time (friend)", after: "elderly",           exS: "Es un viejo amigo.",         exE: "Es un amigo viejo." },
  { a: "grande/gran", before: "great",              after: "big (size)",        exS: "Es un gran libro.",          exE: "Es un libro grande." },
  { a: "nuevo",       before: "another/different",  after: "brand-new",         exS: "Necesito un nuevo coche.",   exE: "Quiero un coche nuevo." },
  { a: "único",       before: "only",               after: "unique",            exS: "Es el único motivo.",        exE: "Es un motivo único." },
];
