/**
 * Data for Guide 11 — Género (Masculine & Feminine).
 * Lifted from guide11.tsx so extractors can import without touching React.
 */

export interface GenderRule {
  g: "M" | "F";
  r: string;
  ex: string[];
  exc: string[];
}

export interface QuizItem {
  noun: string;
  answer: string;
}

export const genderRules: GenderRule[] = [
  { g: "M", r: "Ending -O → masculine (99%)",       ex: ["el libro", "el gato", "el vaso"],             exc: ["la mano", "la foto"] },
  { g: "F", r: "Ending -A → feminine (90%)",         ex: ["la casa", "la mesa", "la vida"],              exc: ["el día", "el mapa", "el problema", "el tema"] },
  { g: "F", r: "-CIÓN/-SIÓN → always feminine",      ex: ["la nación", "la educación", "la televisión"], exc: [] },
  { g: "F", r: "-DAD/-TAD → always feminine",        ex: ["la ciudad", "la libertad", "la verdad"],      exc: [] },
  { g: "M", r: "-AJE → always masculine",            ex: ["el viaje", "el mensaje", "el lenguaje"],      exc: [] },
  { g: "M", r: "-OR → usually masculine",            ex: ["el color", "el amor", "el dolor"],            exc: ["la flor"] },
];

export const quizItems: QuizItem[] = [
  { noun: "libro",    answer: "el (masculine)" },
  { noun: "casa",     answer: "la (feminine)" },
  { noun: "problema", answer: "el (masculine)" },
  { noun: "mano",     answer: "la (feminine)" },
  { noun: "ciudad",   answer: "la (feminine)" },
  { noun: "viaje",    answer: "el (masculine)" },
  { noun: "nación",   answer: "la (feminine)" },
  { noun: "día",      answer: "el (masculine)" },
  { noun: "flor",     answer: "la (feminine)" },
  { noun: "mensaje",  answer: "el (masculine)" },
  { noun: "libertad", answer: "la (feminine)" },
  { noun: "mapa",     answer: "el (masculine)" },
];
