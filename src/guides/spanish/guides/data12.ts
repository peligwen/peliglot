/**
 * Data for Guide 12 — Pluralización.
 * Lifted from guide12.tsx so extractors can import without touching React.
 */

export interface PluralPair {
  s: string;
  p: string;
}

export interface PluralRule {
  l: string;
  desc: string;
  ex: PluralPair[];
  color: string;
}

export interface QuizItem {
  singular: string;
  answer: string;
}

export const pluralRules: PluralRule[] = [
  {
    l: "Vowel → +S",
    desc: "If a word ends in a vowel, just add -s.",
    ex: [{ s: "casa", p: "casas" }, { s: "libro", p: "libros" }, { s: "estudiante", p: "estudiantes" }, { s: "gato", p: "gatos" }],
    color: "#2E7D32",
  },
  {
    l: "Consonant → +ES",
    desc: "If a word ends in a consonant, add -es.",
    ex: [{ s: "animal", p: "animales" }, { s: "ciudad", p: "ciudades" }, { s: "reloj", p: "relojes" }, { s: "profesor", p: "profesores" }],
    color: "#C62828",
  },
  {
    l: "-Z → -CES",
    desc: "Z changes to C before adding -es.",
    ex: [{ s: "lápiz", p: "lápices" }, { s: "vez", p: "veces" }, { s: "luz", p: "luces" }, { s: "pez", p: "peces" }],
    color: "#E65100",
  },
  {
    l: "Accent shifts",
    desc: "Some words gain or lose an accent mark in plural.",
    ex: [{ s: "joven", p: "jóvenes" }, { s: "examen", p: "exámenes" }, { s: "canción", p: "canciones" }, { s: "inglés", p: "ingleses" }],
    color: "#6A1B9A",
  },
  {
    l: "Unchanged (-s/-is ending)",
    desc: "Words already ending in unstressed -es or -is stay the same. Only the article changes.",
    ex: [{ s: "el lunes", p: "los lunes" }, { s: "la crisis", p: "las crisis" }, { s: "el paraguas", p: "los paraguas" }],
    color: "#455A64",
  },
];

export const quizItems: QuizItem[] = [
  { singular: "casa",     answer: "casas" },
  { singular: "animal",   answer: "animales" },
  { singular: "lápiz",    answer: "lápices" },
  { singular: "joven",    answer: "jóvenes" },
  { singular: "el lunes", answer: "los lunes" },
  { singular: "ciudad",   answer: "ciudades" },
  { singular: "luz",      answer: "luces" },
  { singular: "canción",  answer: "canciones" },
  { singular: "libro",    answer: "libros" },
  { singular: "pez",      answer: "peces" },
  { singular: "examen",   answer: "exámenes" },
  { singular: "reloj",    answer: "relojes" },
];
