/**
 * Question bank types for the FAA Part 107 collection.
 *
 * The real Unmanned Aircraft General (UAG) knowledge test is three-choice
 * multiple choice. Every question here follows that format so the practice
 * matches the exam.
 *
 * `area` maps to the five Airman Certification Standards areas:
 *   I   Regulations
 *   II  Airspace & Requirements
 *   III Weather
 *   IV  Loading & Performance
 *   V   Operations
 *
 * `topic` ties a question to the guide that teaches it, so each guide can
 * show its own mini-quiz and the practice exam can sample across all of them.
 */

export type AcsArea = 'I' | 'II' | 'III' | 'IV' | 'V';

export const AREA_NAMES: Record<AcsArea, string> = {
  I: 'Regulations',
  II: 'Airspace & Requirements',
  III: 'Weather',
  IV: 'Loading & Performance',
  V: 'Operations',
};

export interface ExamQuestion {
  /** Stable id — never reuse or renumber. */
  id: string;
  area: AcsArea;
  topic: string;
  q: string;
  options: [string, string, string];
  /** Index into `options` of the correct answer. */
  answer: 0 | 1 | 2;
  explain: string;
  /** Optional reference text shown above the question, e.g. a METAR. */
  figure?: string;
}
