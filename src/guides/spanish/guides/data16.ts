/**
 * Data for Guide 16 — Verbos como Gustar (gustar-pattern cards).
 * Lifted from guide16.tsx so extractors can import without touching React.
 *
 * quizItems: 10 English → Spanish sentences using gustar-pattern verbs.
 * Each question encodes the verb in parentheses: "I like tacos. (gustar)"
 */

export interface GustarQuizItem {
  /** English sentence with verb hint in parens, e.g. "I like tacos. (gustar)" */
  question: string;
  /** Canonical Spanish answer */
  answer: string;
}

export const quizItems: GustarQuizItem[] = [
  { question: "I like tacos. (gustar)",                answer: "Me gustan los tacos." },
  { question: "My head hurts. (doler)",                 answer: "Me duele la cabeza." },
  { question: "My face itches. (picar)",                answer: "Me pica la cara." },
  { question: "She loves music. (encantar)",            answer: "Le encanta la música." },
  { question: "It doesn't matter to us. (importar)",   answer: "No nos importa." },
  { question: "We're missing two chairs. (faltar)",     answer: "Nos faltan dos sillas." },
  { question: "Mosquitoes bother me. (molestar)",       answer: "Me molestan los mosquitos." },
  { question: "They're interested in history. (interesar)", answer: "Les interesa la historia." },
  { question: "My feet hurt. (doler)",                  answer: "Me duelen los pies." },
  { question: "It seems like a good idea. (parecer)",   answer: "Me parece buena idea." },
];
