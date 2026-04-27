/**
 * Extractor — Guide 20: Preguntas (question-word cards).
 *
 * 8 cards — one per quiz item.
 *
 * cardId convention: `spanish-20-${index}-${slugified-answer}`
 *   e.g. `spanish-20-0-que`, `spanish-20-6-por-que`
 *
 * The question field embeds the English meaning in parentheses:
 *   "___ quieres comer? (What do you want to eat?)"
 * We split on "(" to get:
 *   sentence     = "___ quieres comer?"
 *   englishMeaning = "What do you want to eat?"
 *
 * prompt: { kind: 'question-word', sentence, englishMeaning }
 * answer: the question word (without accent marks or ¿/? wrappers in the
 *   original data, e.g. "Qué", "Por qué", "Cuándo")
 *
 * For "Por qué": acceptableAnswers includes 'porque' (no space) as the
 * diacritic-stripped form 'por que' can trip up learners; also 'porqué'
 * (the noun) is included for tolerance. The canonical answer is "Por qué".
 */

import type { ReviewCard } from '../../../../mastery';
import { quizItems } from '../../guides/data20';
import { slugifySpanish } from '../util';

function splitQuestion(q: string): { sentence: string; englishMeaning: string } {
  const parenIdx = q.indexOf('(');
  if (parenIdx < 0) return { sentence: q.trim(), englishMeaning: '' };
  const sentence = q.slice(0, parenIdx).trim();
  const englishMeaning = q.slice(parenIdx + 1).replace(/\)$/, '').trim();
  return { sentence, englishMeaning };
}

export function extract(): ReviewCard[] {
  return quizItems.map((item, i) => {
    const { sentence, englishMeaning } = splitQuestion(item.question);
    const answerSlug = slugifySpanish(item.answer, ' ');

    const card: ReviewCard = {
      cardId: `spanish-20-${i}-${answerSlug}`,
      guideId: 20,
      guideSlug: 'spanish',
      kind: 'question-word',
      prompt: {
        kind: 'question-word',
        sentence,
        englishMeaning,
      },
      answer: item.answer,
      speakText: sentence.replace('___', item.answer),
    };

    // "Por qué" has common misspellings — include alternates for tolerance
    if (item.answer === 'Por qué') {
      card.acceptableAnswers = ['porque', 'porqué', 'por que'];
    }

    return card;
  });
}
