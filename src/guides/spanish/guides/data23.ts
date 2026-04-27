/**
 * Data for Guide 23 — Números y Fechas (number-spell cards).
 * Lifted from guide23.tsx so extractors can import without touching React.
 *
 * Two sources:
 *   - numbers: 28 cardinal entries (0–1,000,000)
 *   - ordinals: 10 ordinal entries (1º–10º)
 *
 * Total: 38 number-spell cards.
 */

export interface NumberEntry {
  /** Numeric value or string label, e.g. 47 or "1,000,000" */
  n: number;
  /** Spanish spelling */
  sp: string;
}

export interface OrdinalEntry {
  /** Symbol shown to learner, e.g. "1º" */
  ord: string;
  /** Spanish word(s), e.g. "primero/a" */
  sp: string;
}

/** 28 cardinal numbers — displayed in the number grid. */
export const numbers: NumberEntry[] = [
  { n: 0,       sp: "cero" },
  { n: 1,       sp: "uno" },
  { n: 2,       sp: "dos" },
  { n: 3,       sp: "tres" },
  { n: 4,       sp: "cuatro" },
  { n: 5,       sp: "cinco" },
  { n: 6,       sp: "seis" },
  { n: 7,       sp: "siete" },
  { n: 8,       sp: "ocho" },
  { n: 9,       sp: "nueve" },
  { n: 10,      sp: "diez" },
  { n: 11,      sp: "once" },
  { n: 12,      sp: "doce" },
  { n: 13,      sp: "trece" },
  { n: 14,      sp: "catorce" },
  { n: 15,      sp: "quince" },
  { n: 16,      sp: "dieciséis" },
  { n: 17,      sp: "diecisiete" },
  { n: 18,      sp: "dieciocho" },
  { n: 19,      sp: "diecinueve" },
  { n: 20,      sp: "veinte" },
  { n: 21,      sp: "veintiuno" },
  { n: 30,      sp: "treinta" },
  { n: 40,      sp: "cuarenta" },
  { n: 50,      sp: "cincuenta" },
  { n: 100,     sp: "cien" },
  { n: 1000,    sp: "mil" },
  { n: 1000000, sp: "un millón" },
];

/** 10 ordinal numbers (1º–10º). */
export const ordinals: OrdinalEntry[] = [
  { ord: "1º",  sp: "primero/a" },
  { ord: "2º",  sp: "segundo/a" },
  { ord: "3º",  sp: "tercero/a" },
  { ord: "4º",  sp: "cuarto/a" },
  { ord: "5º",  sp: "quinto/a" },
  { ord: "6º",  sp: "sexto/a" },
  { ord: "7º",  sp: "séptimo/a" },
  { ord: "8º",  sp: "octavo/a" },
  { ord: "9º",  sp: "noveno/a" },
  { ord: "10º", sp: "décimo/a" },
];
