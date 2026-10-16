import type { ExamQuestion, AcsArea } from './types';
import { regulationQuestions } from './regulations';
import { airspaceQuestions } from './airspace';
import { weatherQuestions } from './weather';
import { loadingQuestions } from './loading';
import { operationsQuestions } from './operations';

export type { ExamQuestion, AcsArea } from './types';
export { AREA_NAMES } from './types';

/** Every question in the bank, in area order. */
export const allQuestions: ExamQuestion[] = [
  ...regulationQuestions,
  ...airspaceQuestions,
  ...weatherQuestions,
  ...loadingQuestions,
  ...operationsQuestions,
];

/** Questions for one guide's mini-quiz. */
export function byTopic(topic: string): ExamQuestion[] {
  return allQuestions.filter(q => q.topic === topic);
}

/**
 * Number of questions per area on the 60-question practice exam.
 * Mirrors the FAA's published weighting for the initial UAG test:
 * Regulations 15–25%, Airspace 15–25%, Weather 11–16%,
 * Loading & Performance 7–11%, Operations 35–45%.
 */
export const EXAM_BLUEPRINT: Record<AcsArea, number> = {
  I: 12,
  II: 12,
  III: 8,
  IV: 5,
  V: 23,
};

export const EXAM_LENGTH = 60;
export const EXAM_MINUTES = 120;
export const PASS_PERCENT = 70;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Build a 60-question exam sampled by area according to the blueprint. */
export function buildExam(): ExamQuestion[] {
  const picked: ExamQuestion[] = [];
  (Object.keys(EXAM_BLUEPRINT) as AcsArea[]).forEach(area => {
    const pool = shuffle(allQuestions.filter(q => q.area === area));
    picked.push(...pool.slice(0, EXAM_BLUEPRINT[area]));
  });
  return shuffle(picked);
}
