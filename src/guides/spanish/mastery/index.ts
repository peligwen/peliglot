/**
 * Spanish mastery aggregator.
 *
 * `getAllSpanishCards()` concatenates all extractor outputs into one flat
 * array. The practice surface (Phase 2a.4) imports this to seed the
 * due-card pool.
 *
 * Add new extractors here as more Spanish guides are wired up in Phase 2c.
 */

import type { ReviewCard } from '../../../mastery/cards';
import { extract as extractGuide1 } from './extractors/guide1';
import { extract as extractGuide2 } from './extractors/guide2';
import { extract as extractGuide4 } from './extractors/guide4';
import { extract as extractGuide9 } from './extractors/guide9';
import { extract as extractGuide11 } from './extractors/guide11';
import { extract as extractGuide12 } from './extractors/guide12';
import { extract as extractGuide13 } from './extractors/guide13';
import { extract as extractGuide14 } from './extractors/guide14';
import { extract as extractGuide17 } from './extractors/guide17';

export function getAllSpanishCards(): ReviewCard[] {
  return [
    ...extractGuide1(),
    ...extractGuide2(),
    ...extractGuide4(),
    ...extractGuide9(),
    ...extractGuide11(),
    ...extractGuide12(),
    ...extractGuide13(),
    ...extractGuide14(),
    ...extractGuide17(),
  ];
}
