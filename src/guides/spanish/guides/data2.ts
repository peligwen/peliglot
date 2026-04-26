/**
 * Data for Guide 2 — Acentos.
 * Lifted from guide2.tsx so extractors can import without touching React.
 */

export interface StressExample {
  /** Word with syllable separators (·), e.g. "ha·blar" */
  word: string;
  /** Zero-based index of the stressed syllable */
  s: number;
  /** Whether the word has a written accent mark */
  a: boolean;
  /** English meaning */
  m: string;
}

export interface StressRule {
  id: string;
  name: string;
  rule: string;
  when: string;
  color: string;
  examples: StressExample[];
}

export interface MinPair {
  w1: string;
  m1: string;
  w2: string;
  m2: string;
}

export const stressRules: StressRule[] = [
  {
    id: "agudas",
    name: "Agudas",
    rule: "Stress on LAST syllable",
    when: "Accent when ending in vowel, -n, -s",
    color: "#E63946",
    examples: [
      { word: "ha·blar", s: 1, a: false, m: "to speak" },
      { word: "ca·fé", s: 1, a: true, m: "coffee" },
      { word: "na·ción", s: 1, a: true, m: "nation" },
      { word: "re·loj", s: 1, a: false, m: "clock" },
    ],
  },
  {
    id: "llanas",
    name: "Llanas",
    rule: "Stress on 2ND-TO-LAST",
    when: "Accent when NOT ending in vowel, -n, -s",
    color: "#457B9D",
    examples: [
      { word: "ca·sa", s: 0, a: false, m: "house" },
      { word: "di·fí·cil", s: 1, a: true, m: "difficult" },
      { word: "ár·bol", s: 0, a: true, m: "tree" },
      { word: "jue·ves", s: 0, a: false, m: "Thursday" },
    ],
  },
  {
    id: "esdrujulas",
    name: "Esdrújulas",
    rule: "Stress on 3RD-TO-LAST",
    when: "ALWAYS have accent mark",
    color: "#2A9D8F",
    examples: [
      { word: "mú·si·ca", s: 0, a: true, m: "music" },
      { word: "te·lé·fo·no", s: 1, a: true, m: "telephone" },
      { word: "mé·di·co", s: 0, a: true, m: "doctor" },
      { word: "plá·ta·no", s: 0, a: true, m: "banana" },
    ],
  },
];

export const minPairs: MinPair[] = [
  { w1: "papa", m1: "potato", w2: "papá", m2: "dad" },
  { w1: "si", m1: "if", w2: "sí", m2: "yes" },
  { w1: "el", m1: "the", w2: "él", m2: "he" },
  { w1: "tu", m1: "your", w2: "tú", m2: "you" },
  { w1: "como", m1: "like/as", w2: "cómo", m2: "how?" },
  { w1: "mas", m1: "but (literary)", w2: "más", m2: "more" },
];
