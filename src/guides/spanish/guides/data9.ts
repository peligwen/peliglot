/**
 * Data for Guide 9 — Cambios de Raíz (Boot Verbs).
 * Lifted from guide9.tsx so extractors can import without touching React.
 */

export interface StemTypeEntry {
  id: string;
  label: string;
  color: string;
  model: {
    verb: string;
    forms: string[];
  };
  verbs: string[];
}

export const stemTypes: StemTypeEntry[] = [
  {
    id: "e-ie",
    label: "E → IE",
    color: "#C62828",
    model: { verb: "pensar", forms: ["pienso", "piensas", "piensa", "pensamos", "pensáis", "piensan"] },
    verbs: ["pensar", "querer", "preferir", "sentir", "cerrar", "entender"],
  },
  {
    id: "o-ue",
    label: "O → UE",
    color: "#1565C0",
    model: { verb: "poder", forms: ["puedo", "puedes", "puede", "podemos", "podéis", "pueden"] },
    verbs: ["poder", "dormir", "volver", "encontrar", "recordar", "almorzar"],
  },
  {
    id: "e-i",
    label: "E → I",
    color: "#2E7D32",
    model: { verb: "pedir", forms: ["pido", "pides", "pide", "pedimos", "pedís", "piden"] },
    verbs: ["pedir", "servir", "repetir", "seguir", "vestirse", "reír"],
  },
  {
    id: "u-ue",
    label: "U → UE",
    color: "#6A1B9A",
    model: { verb: "jugar", forms: ["juego", "juegas", "juega", "jugamos", "jugáis", "juegan"] },
    verbs: ["jugar"],
  },
];

/**
 * Which positions in the 6-form conjugation undergo the stem change.
 * true = boot form (changed); false = regular (nosotros/vosotros).
 */
export const bootPattern: boolean[] = [true, true, true, false, false, true];

/** Canonical pronoun labels for the 6 positions. */
export const pronouns6: string[] = [
  "yo",
  "tú",
  "él/ella/Ud.",
  "nosotros",
  "vosotros",
  "ellos/Uds.",
];
