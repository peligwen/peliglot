/**
 * BYOK cost storage helpers — track cumulative token usage and cost per
 * provider in localStorage, plus per-day buckets and an optional daily cap.
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 *
 * Storage keys:
 *   peliglot-byok-cost-{provider}      — cumulative + daily buckets (DailyBucket map)
 *   peliglot-byok-cap-{provider}       — daily USD cap (or absent = no cap)
 *
 * Daily buckets are keyed by local-date YYYY-MM-DD strings (DST-safe; same
 * convention used by mastery streak). Buckets older than DAILY_BUCKET_RETENTION_DAYS
 * are pruned on write to keep localStorage small.
 *
 * Malformed JSON → fresh zeroes (best-effort recovery).
 */

import type { Provider } from './types';
import { toLocalDateString } from '../utils/localDate';
import { lookupPricing } from './providers/pricing';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DailyBucket {
  input: number;
  output: number;
  costUsd: number;
}

export interface ProviderCostState {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUsd: number;
  /** Unix ms — informational; not used for computation. */
  lastUpdated: number;
  /** Local-date (YYYY-MM-DD) → bucket. May be empty. */
  byDate: Record<string, DailyBucket>;
}

// ---------------------------------------------------------------------------
// Storage keys + constants
// ---------------------------------------------------------------------------

const COST_KEYS: Record<Provider, string> = {
  anthropic: 'peliglot-byok-cost-anthropic',
  openai: 'peliglot-byok-cost-openai',
  'openai-compatible': 'peliglot-byok-cost-openai-compatible',
};

const CAP_KEYS: Record<Provider, string> = {
  anthropic: 'peliglot-byok-cap-anthropic',
  openai: 'peliglot-byok-cap-openai',
  'openai-compatible': 'peliglot-byok-cap-openai-compatible',
};

/** Per-provider list of model IDs that have been called without pricing data. */
const UNPRICED_KEYS: Record<Provider, string> = {
  anthropic: 'peliglot-byok-unpriced-anthropic',
  openai: 'peliglot-byok-unpriced-openai',
  'openai-compatible': 'peliglot-byok-unpriced-openai-compatible',
};

/** Cap on how many distinct unpriced model IDs we remember per provider. */
const MAX_UNPRICED_MODELS = 8;

/** Keep this many days of bucket history (rolling window). */
const DAILY_BUCKET_RETENTION_DAYS = 30;

/** Defensive cap on user-supplied daily limit to prevent typos like 100000. */
export const MAX_DAILY_CAP_USD = 1000;

const ZERO_BUCKET: DailyBucket = { input: 0, output: 0, costUsd: 0 };

const ZERO_STATE: ProviderCostState = {
  totalInputTokens: 0,
  totalOutputTokens: 0,
  totalCostUsd: 0,
  lastUpdated: 0,
  byDate: {},
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode, storage full, etc. — silently fail.
  }
}

function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

function parseDailyBuckets(raw: unknown): Record<string, DailyBucket> {
  if (typeof raw !== 'object' || raw === null) return {};
  const out: Record<string, DailyBucket> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof v !== 'object' || v === null) continue;
    const b = v as Record<string, unknown>;
    if (isFiniteNumber(b.input) && isFiniteNumber(b.output) && isFiniteNumber(b.costUsd)) {
      out[k] = { input: b.input, output: b.output, costUsd: b.costUsd };
    }
  }
  return out;
}

function parseCostState(raw: string): ProviderCostState {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      isFiniteNumber((parsed as Record<string, unknown>).totalInputTokens) &&
      isFiniteNumber((parsed as Record<string, unknown>).totalOutputTokens) &&
      isFiniteNumber((parsed as Record<string, unknown>).totalCostUsd)
    ) {
      const p = parsed as Record<string, unknown>;
      return {
        totalInputTokens: p.totalInputTokens as number,
        totalOutputTokens: p.totalOutputTokens as number,
        totalCostUsd: p.totalCostUsd as number,
        lastUpdated: isFiniteNumber(p.lastUpdated) ? p.lastUpdated : 0,
        byDate: parseDailyBuckets(p.byDate),
      };
    }
  } catch {
    // fall through
  }
  return { ...ZERO_STATE, byDate: {} };
}

/**
 * Drop bucket entries older than DAILY_BUCKET_RETENTION_DAYS relative to today.
 * Keeps storage size bounded; the kept window is enough for reasonable history UI.
 *
 * "Older than N days" means: keep dates strictly after (today - N days). With
 * N=30 that's a 30-day rolling window ending today.
 */
function pruneOldBuckets(byDate: Record<string, DailyBucket>, today: string): Record<string, DailyBucket> {
  const [y, m, d] = today.split('-').map(Number);
  const cutoff = new Date(y, (m as number) - 1, d as number);
  cutoff.setDate(cutoff.getDate() - DAILY_BUCKET_RETENTION_DAYS);
  const cutoffStr = toLocalDateString(cutoff);

  const out: Record<string, DailyBucket> = {};
  for (const [date, bucket] of Object.entries(byDate)) {
    if (date > cutoffStr) out[date] = bucket;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Public API — cost
// ---------------------------------------------------------------------------

/**
 * Read cost state for a provider. Never returns null — returns zeroes if
 * unset or malformed.
 */
export function readCost(provider: Provider): ProviderCostState {
  const raw = safeGetItem(COST_KEYS[provider]);
  if (raw === null) return { ...ZERO_STATE, byDate: {} };
  return parseCostState(raw);
}

/**
 * Get today's bucket for a provider. Never returns null — returns a zero
 * bucket if no spend has occurred today.
 */
export function getTodayCost(provider: Provider, now: Date = new Date()): DailyBucket {
  const today = toLocalDateString(now);
  const state = readCost(provider);
  return state.byDate[today] ?? { ...ZERO_BUCKET };
}

/**
 * Add a usage delta to the stored cost for a provider. Updates cumulative
 * totals and today's bucket. Reads → accumulates → writes (single-threaded JS;
 * cross-tab races possible but result in display drift only, not correctness).
 */
export function addToCost(
  provider: Provider,
  delta: { input: number; output: number; costUsd: number },
  now: Date = new Date(),
): void {
  const key = COST_KEYS[provider];
  const today = toLocalDateString(now);
  const current = readCost(provider);
  const todayBucket = current.byDate[today] ?? { ...ZERO_BUCKET };

  const nextByDate = pruneOldBuckets(
    {
      ...current.byDate,
      [today]: {
        input: todayBucket.input + delta.input,
        output: todayBucket.output + delta.output,
        costUsd: todayBucket.costUsd + delta.costUsd,
      },
    },
    today,
  );

  const next: ProviderCostState = {
    totalInputTokens: current.totalInputTokens + delta.input,
    totalOutputTokens: current.totalOutputTokens + delta.output,
    totalCostUsd: current.totalCostUsd + delta.costUsd,
    lastUpdated: now.getTime(),
    byDate: nextByDate,
  };
  safeSetItem(key, JSON.stringify(next));
}

/** Reset cost counters for one provider. Caps are NOT cleared. */
export function resetCost(provider: Provider): void {
  safeRemoveItem(COST_KEYS[provider]);
}

/** Reset cost counters for all providers. Caps are NOT cleared. */
export function resetAllCosts(): void {
  for (const provider of Object.keys(COST_KEYS) as Provider[]) {
    safeRemoveItem(COST_KEYS[provider]);
  }
}

// ---------------------------------------------------------------------------
// Public API — daily cap
// ---------------------------------------------------------------------------

/**
 * Read the daily USD cap for a provider. Returns null when no cap is set.
 * Invalid stored values (non-finite, negative, above MAX_DAILY_CAP_USD) are
 * treated as no-cap to fail open rather than block the user with bad data.
 */
export function getDailyCap(provider: Provider): number | null {
  const raw = safeGetItem(CAP_KEYS[provider]);
  if (raw === null) return null;
  const parsed = parseFloat(raw);
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > MAX_DAILY_CAP_USD) return null;
  return parsed;
}

/**
 * Set the daily USD cap for a provider. Pass null to clear.
 * Values <= 0 or > MAX_DAILY_CAP_USD are rejected (no-op + return false).
 */
export function setDailyCap(provider: Provider, capUsd: number | null): boolean {
  if (capUsd === null) {
    safeRemoveItem(CAP_KEYS[provider]);
    return true;
  }
  if (!Number.isFinite(capUsd) || capUsd <= 0 || capUsd > MAX_DAILY_CAP_USD) return false;
  safeSetItem(CAP_KEYS[provider], String(capUsd));
  return true;
}

/** Clear daily caps for all providers. Called from clearAll() to honor "Forget all keys". */
export function clearAllCaps(): void {
  for (const provider of Object.keys(CAP_KEYS) as Provider[]) {
    safeRemoveItem(CAP_KEYS[provider]);
  }
}

// ---------------------------------------------------------------------------
// Public API — unpriced-model tracking
//
// When a chat call succeeds but the model has no entry in pricing.ts, we
// can't compute its cost — and therefore the daily cap can never engage for
// that model. This is precisely the silent-burn footgun BYOK is supposed to
// prevent, so we track these calls and surface a warning in the UI.
// ---------------------------------------------------------------------------

function parseUnpricedList(raw: string | null): string[] {
  if (raw === null) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed) && parsed.every(s => typeof s === 'string')) {
      return parsed as string[];
    }
  } catch {
    // fall through
  }
  return [];
}

/**
 * Record that a call to `provider` returned `modelId` with no pricing data.
 * The list is deduplicated and capped at MAX_UNPRICED_MODELS to bound storage.
 */
export function markUnpricedCall(provider: Provider, modelId: string): void {
  if (typeof modelId !== 'string' || modelId.trim() === '') return;
  const key = UNPRICED_KEYS[provider];
  const current = parseUnpricedList(safeGetItem(key));
  if (current.includes(modelId)) return;
  const next = [...current, modelId].slice(-MAX_UNPRICED_MODELS);
  safeSetItem(key, JSON.stringify(next));
}

/**
 * Read the recorded unpriced model IDs for a provider, filtering out any that
 * are now in the pricing table. This makes the warning self-healing: when
 * pricing.ts is updated to include a previously-unknown model, stale entries
 * disappear from the UI on next read instead of lingering forever.
 */
export function getUnpricedModelIds(provider: Provider): string[] {
  const all = parseUnpricedList(safeGetItem(UNPRICED_KEYS[provider]));
  return all.filter(id => lookupPricing(id) === null);
}

/** Clear unpriced-model records for all providers. */
export function clearAllUnpriced(): void {
  for (const provider of Object.keys(UNPRICED_KEYS) as Provider[]) {
    safeRemoveItem(UNPRICED_KEYS[provider]);
  }
}
