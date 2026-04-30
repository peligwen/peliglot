/**
 * Mastery layer public barrel.
 *
 * Consumers import types, the Rating enum, and the configured adapter instance
 * from here — never from subfiles directly. This keeps the import surface
 * stable across adapter swaps and avoids callers accidentally importing the
 * concrete class instead of the interface.
 *
 * Phase 2d swap: change only `src/mastery/adapters/cloudflare.ts` (new file)
 * and update `defaultMasteryAdapter` here. No other file in the codebase
 * needs to change.
 */

import { LocalStorageMasteryAdapter } from './adapters/localStorage';
import type { MasteryStorageAdapter } from './adapter';

// ---------------------------------------------------------------------------
// Singleton adapter instance — the only place the concrete class is wired up.
// ---------------------------------------------------------------------------

export const defaultMasteryAdapter: MasteryStorageAdapter =
  new LocalStorageMasteryAdapter();

// ---------------------------------------------------------------------------
// Re-export public interface types and the Rating enum.
// LocalStorageMasteryAdapter itself is intentionally NOT re-exported here.
// ---------------------------------------------------------------------------

export type { MasteryStorageAdapter } from './adapter';
export type { CardState, MasteryExport, MergeReport, StreakState, WriteResult, XpState } from './types';
export { Rating } from './types';
export type { SchedulerCard } from './types';
export { createCard, rateCard } from './scheduler';
export type { ReviewCard, CardKind, PromptShape, TensedConjugationTense } from './cards';
export { computeXp } from './xp';
export { getRecommendation } from './recommendation';
export type { Recommendation, RecommendationInput, RecommendationKind } from './recommendation';
export { migrate, migrateWithStatus, emptyExport, CURRENT_SCHEMA_VERSION } from './migrations';
export type { MigrationStatus } from './migrations';
