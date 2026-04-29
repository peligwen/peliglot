/**
 * Spanish mastery aggregator.
 *
 * `getAllSpanishCards()` concatenates all extractor outputs into one flat
 * array. The practice surface (Phase 2a.4) imports this to seed the
 * due-card pool.
 *
 * Phase 2a extractors (guides 1, 2, 4, 9, 11, 12, 13, 14, 17): ~215 cards
 * Phase 2c.2 extractors (guides 5, 6, 8, 10, 28, 29, 30):
 *   guide5:  36 cards (preterite + imperfect × 3 verbs × 6 pronouns)
 *   guide6:  12 cards (future + conditional × 1 verb × 6 pronouns)
 *   guide8:  18 cards (pp + plup + ppS × 1 verb × 6 pronouns)
 *   guide10: 96 cards (preterite + imperfect × 8 irregular verbs × 6 pronouns)
 *   guide28: 18 cards (present-subjunctive × 3 verbs × 6 pronouns)
 *   guide29: 30 cards (past-subjunctive × 5 verbs × 6 pronouns)
 *   guide30: 16 cards (imperative-tu × 8 verbs × 2 polarities)
 * Phase 2c.2 subtotal: ~226 new cards
 * Phase 2c.3 extractors (guides 3, 18, 19, 20, 21, 22, 24, 25, 31): ~98 cards
 *   guide3:  17 cards (verb-spelling-change: 6 patterns × examples)
 *   guide18: 10 cards (por-vs-para: quiz items)
 *   guide19: 23 cards (verb-prep-pair: 5 buckets × verbs)
 *   guide20:  8 cards (question-word: quiz items)
 *   guide21:  8 cards (negation-translate: quiz items)
 *   guide22:  4 cards (comparative-irregular: 4 irregular forms)
 *   guide24:  8 cards (tu-vs-usted: 8 scenarios)
 *   guide25: 15 cards (false-cognate: 15 falseCogs entries)
 *   guide31:  5 cards (reflexive-meaning-change: 5 meaningChange pairs)
 * Phase 2c.3 subtotal: ~98 new cards
 * Phase 2c.4 extractors (guides 16, 23, 27, 32): ~84 cards
 *   guide16: 10 cards (gustar-pattern: 10 quiz items)
 *   guide23: 38 cards (number-spell: 28 cardinals + 10 ordinals)
 *   guide27: 14 cards (weather-expression: 14 expressions)
 *   guide32: 22 cards (idiom-meaning: tener=10 + dar=6 + hacer=6)
 * Phase 2c.4 subtotal: ~84 new cards
 * Phase 2c.5 (PR #21 cleanup — guide25 grammarTraps + guide31 daily + reciprocal): 16 new cards
 *   guide25: +7 cards (sentence-correction: 7 grammarTrap entries)
 *   guide31: +9 cards (reflexive-daily-routine: 6 daily verbs + reciprocal-translate: 3 reciprocal examples)
 * Phase 2c.5 subtotal: 16 new cards
 * Phase 3 (B.2) additions: 76 new cards
 *   listening-recall: 64 cards (28 cardinals + 10 ordinals + 14 weather + 12 nouns)
 *   accent-discrimination: 12 cards (6 minPairs × 2 directions)
 * Phase 3 subtotal: 76 new cards
 *
 * Total: ~754 cards across 31 extractors (91% coverage of 33 Spanish guides).
 *
 * SPANISH_CARD_COUNT: exported constant for the landing page lazy-load
 * optimisation — avoids eagerly importing this whole module. Update this
 * number whenever extractors are added or data arrays change.
 */

import type { ReviewCard } from '../../../mastery/cards';
import { extract as extractListeningRecall } from './extractors/listening-recall';
import { extract as extractAccentDiscrimination } from './extractors/accent-discrimination';
import { extract as extractGuide1 } from './extractors/guide1';
import { extract as extractGuide2 } from './extractors/guide2';
import { extract as extractGuide3 } from './extractors/guide3';
import { extract as extractGuide4 } from './extractors/guide4';
import { extract as extractGuide5 } from './extractors/guide5';
import { extract as extractGuide6 } from './extractors/guide6';
import { extract as extractGuide8 } from './extractors/guide8';
import { extract as extractGuide9 } from './extractors/guide9';
import { extract as extractGuide10 } from './extractors/guide10';
import { extract as extractGuide11 } from './extractors/guide11';
import { extract as extractGuide12 } from './extractors/guide12';
import { extract as extractGuide13 } from './extractors/guide13';
import { extract as extractGuide14 } from './extractors/guide14';
import { extract as extractGuide16 } from './extractors/guide16';
import { extract as extractGuide17 } from './extractors/guide17';
import { extract as extractGuide18 } from './extractors/guide18';
import { extract as extractGuide19 } from './extractors/guide19';
import { extract as extractGuide20 } from './extractors/guide20';
import { extract as extractGuide21 } from './extractors/guide21';
import { extract as extractGuide22 } from './extractors/guide22';
import { extract as extractGuide23 } from './extractors/guide23';
import { extract as extractGuide24 } from './extractors/guide24';
import { extract as extractGuide25 } from './extractors/guide25';
import { extract as extractGuide27 } from './extractors/guide27';
import { extract as extractGuide28 } from './extractors/guide28';
import { extract as extractGuide29 } from './extractors/guide29';
import { extract as extractGuide30 } from './extractors/guide30';
import { extract as extractGuide31 } from './extractors/guide31';
import { extract as extractGuide32 } from './extractors/guide32';

export function getAllSpanishCards(): ReviewCard[] {
  return [
    ...extractGuide1(),
    ...extractGuide2(),
    ...extractGuide3(),
    ...extractGuide4(),
    ...extractGuide5(),
    ...extractGuide6(),
    ...extractGuide8(),
    ...extractGuide9(),
    ...extractGuide10(),
    ...extractGuide11(),
    ...extractGuide12(),
    ...extractGuide13(),
    ...extractGuide14(),
    ...extractGuide16(),
    ...extractGuide17(),
    ...extractGuide18(),
    ...extractGuide19(),
    ...extractGuide20(),
    ...extractGuide21(),
    ...extractGuide22(),
    ...extractGuide23(),
    ...extractGuide24(),
    ...extractGuide25(),
    ...extractGuide27(),
    ...extractGuide28(),
    ...extractGuide29(),
    ...extractGuide30(),
    ...extractGuide31(),
    ...extractGuide32(),
    // Phase 3 (B.2) additions
    ...extractListeningRecall(),
    ...extractAccentDiscrimination(),
  ];
}

/**
 * Total card count published as a constant so the landing page can render
 * cold-start state ("0 cards" copy) without eagerly importing the entire
 * extractor pool. Updated each time extractors are added.
 *
 * NOTE: If you add a new extractor, bump this number to match
 * `getAllSpanishCards().length`. See docs/spanish-mastery-audit.md for context.
 *
 * Current tally (Phase 3 / B.2):
 *   Phase 2a (~215) + Phase 2c.2 (~226) + Phase 2c.3 (~98) + Phase 2c.4 (~84)
 *   + Phase 2c.5 (16) + Phase 3 (76) = 754
 * Exact value confirmed by running `getAllSpanishCards().length` in vitest.
 */
export const SPANISH_CARD_COUNT = 754;
