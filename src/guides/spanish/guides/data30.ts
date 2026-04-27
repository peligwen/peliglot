/**
 * Data for Guide 30 — Imperativo (Commands).
 * Lifted from guide30.tsx so extractors can import without touching React.
 *
 * 8 irregular tú-command verbs × 2 polarities (affirmative, negative) = 16 cards.
 * Negative form includes the "no" prefix (e.g. "no digas").
 */

export interface IrregTuEntry {
  /** Infinitive */
  v: string;
  /** Affirmative tú command (e.g. "di") */
  cmd: string;
  /** Negative tú command including "no" prefix (e.g. "no digas") */
  neg: string;
}

export const irregTu: IrregTuEntry[] = [
  { v: "decir", cmd: "di",  neg: "no digas" },
  { v: "hacer", cmd: "haz", neg: "no hagas" },
  { v: "ir",    cmd: "ve",  neg: "no vayas" },
  { v: "poner", cmd: "pon", neg: "no pongas" },
  { v: "salir", cmd: "sal", neg: "no salgas" },
  { v: "ser",   cmd: "sé",  neg: "no seas" },
  { v: "tener", cmd: "ten", neg: "no tengas" },
  { v: "venir", cmd: "ven", neg: "no vengas" },
];
