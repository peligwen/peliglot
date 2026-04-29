/**
 * BYOK cost storage helpers — track cumulative token usage and cost per
 * provider in localStorage.
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 *
 * Storage keys: peliglot-byok-cost-{provider}
 * Malformed JSON → fresh zeroes.
 */

import type { Provider } from './types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProviderCostState {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUsd: number;
  /** Unix ms — informational; not used for computation. */
  lastUpdated: number;
}

// ---------------------------------------------------------------------------
// Storage keys
// ---------------------------------------------------------------------------

const COST_KEYS: Record<Provider, string> = {
  anthropic: 'peliglot-byok-cost-anthropic',
  openai: 'peliglot-byok-cost-openai',
  'openai-compatible': 'peliglot-byok-cost-openai-compatible',
};

const ZERO_STATE: ProviderCostState = {
  totalInputTokens: 0,
  totalOutputTokens: 0,
  totalCostUsd: 0,
  lastUpdated: 0,
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

function parseCostState(raw: string): ProviderCostState {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof (parsed as Record<string, unknown>).totalInputTokens === 'number' &&
      typeof (parsed as Record<string, unknown>).totalOutputTokens === 'number' &&
      typeof (parsed as Record<string, unknown>).totalCostUsd === 'number'
    ) {
      const p = parsed as Record<string, unknown>;
      return {
        totalInputTokens: p.totalInputTokens as number,
        totalOutputTokens: p.totalOutputTokens as number,
        totalCostUsd: p.totalCostUsd as number,
        lastUpdated: typeof p.lastUpdated === 'number' ? p.lastUpdated : 0,
      };
    }
  } catch {
    // fall through
  }
  return { ...ZERO_STATE };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read cost state for a provider. Never returns null — returns zeroes if
 * unset or malformed.
 */
export function readCost(provider: Provider): ProviderCostState {
  const raw = safeGetItem(COST_KEYS[provider]);
  if (raw === null) return { ...ZERO_STATE };
  return parseCostState(raw);
}

/**
 * Add a usage delta to the stored cost for a provider.
 * Reads → accumulates → writes atomically (single-threaded JS; no races).
 */
export function addToCost(
  provider: Provider,
  delta: { input: number; output: number; costUsd: number },
): void {
  const key = COST_KEYS[provider];
  const current = readCost(provider);
  const next: ProviderCostState = {
    totalInputTokens: current.totalInputTokens + delta.input,
    totalOutputTokens: current.totalOutputTokens + delta.output,
    totalCostUsd: current.totalCostUsd + delta.costUsd,
    lastUpdated: Date.now(),
  };
  safeSetItem(key, JSON.stringify(next));
}

/** Reset cost counters for one provider. */
export function resetCost(provider: Provider): void {
  safeRemoveItem(COST_KEYS[provider]);
}

/** Reset cost counters for all providers. */
export function resetAllCosts(): void {
  for (const provider of Object.keys(COST_KEYS) as Provider[]) {
    safeRemoveItem(COST_KEYS[provider]);
  }
}
