/**
 * Data for Guide 32 — Expresiones Idiomáticas (idiom-meaning cards).
 * Lifted from guide32.tsx so extractors can import without touching React.
 *
 * Three groups of idiomatic expressions using tener, dar, and hacer.
 * Total: tener=10 + dar=6 + hacer=6 = 22 cards.
 */

export interface IdiomEntry {
  /** Spanish idiomatic expression (infinitive form) */
  sp: string;
  /** English meaning */
  en: string;
  /** Literal (word-for-word) translation */
  lit: string;
  /** The noun/phrase that follows the verb */
  tail: string;
  /** True if the expression is reflexive (e.g. darse cuenta de) */
  reflexive?: boolean;
}

export interface IdiomGroup {
  color: string;
  label: string;
  note: string;
  items: IdiomEntry[];
}

export const groups: Record<"tener" | "dar" | "hacer", IdiomGroup> = {
  tener: {
    color: "#C62828",
    label: "Tener + noun",
    note: "Where English says 'to be...', Spanish says 'to have...'",
    items: [
      { sp: "tener hambre",      en: "to be hungry",        lit: "to have hunger",         tail: "hambre" },
      { sp: "tener sed",         en: "to be thirsty",       lit: "to have thirst",         tail: "sed" },
      { sp: "tener sueño",       en: "to be sleepy",        lit: "to have sleep",          tail: "sueño" },
      { sp: "tener calor",       en: "to be hot",           lit: "to have heat",           tail: "calor" },
      { sp: "tener frío",        en: "to be cold",          lit: "to have cold",           tail: "frío" },
      { sp: "tener miedo",       en: "to be afraid",        lit: "to have fear",           tail: "miedo" },
      { sp: "tener razón",       en: "to be right",         lit: "to have reason",         tail: "razón" },
      { sp: "tener prisa",       en: "to be in a hurry",    lit: "to have hurry",          tail: "prisa" },
      { sp: "tener suerte",      en: "to be lucky",         lit: "to have luck",           tail: "suerte" },
      { sp: "tener ... años",    en: "to be ... years old", lit: "to have ... years",      tail: "... años" },
    ],
  },
  dar: {
    color: "#0D47A1",
    label: "Dar + noun",
    note: "Dar = to give, but in many expressions it means something completely different.",
    items: [
      { sp: "dar un paseo",         en: "to take a walk",  lit: "to give a walk",               tail: "un paseo" },
      { sp: "dar igual",            en: "to not matter",   lit: "to give equal",                 tail: "igual" },
      { sp: "darse cuenta de",      en: "to realize",      lit: "to give oneself account of",    tail: "cuenta de", reflexive: true },
      { sp: "dar a luz",            en: "to give birth",   lit: "to give to light",              tail: "a luz" },
      { sp: "dar la bienvenida",    en: "to welcome",      lit: "to give the welcome",           tail: "la bienvenida" },
      { sp: "dar miedo",            en: "to scare",        lit: "to give fear",                  tail: "miedo" },
    ],
  },
  hacer: {
    color: "#00695C",
    label: "Hacer + noun",
    note: "Hacer = to do/make, but appears in many fixed expressions.",
    items: [
      { sp: "hacer falta",       en: "to be needed",      lit: "to make lack",          tail: "falta" },
      { sp: "hacer caso",        en: "to pay attention",  lit: "to make case",          tail: "caso" },
      { sp: "hacer cola",        en: "to stand in line",  lit: "to make tail",          tail: "cola" },
      { sp: "hacer trampa",      en: "to cheat",          lit: "to make trap",          tail: "trampa" },
      { sp: "hacer daño",        en: "to hurt",           lit: "to make damage",        tail: "daño" },
      { sp: "hacer las maletas", en: "to pack",           lit: "to make the suitcases", tail: "las maletas" },
    ],
  },
};
