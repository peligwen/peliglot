/**
 * BYOK storage helpers — read/write/clear provider configs in localStorage.
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 */

import type { Provider, ProviderConfig } from './types';

// ---------------------------------------------------------------------------
// Storage keys
// ---------------------------------------------------------------------------

const STORAGE_KEYS: Record<Provider, string> = {
  anthropic: 'peliglot-byok-anthropic',
  openai: 'peliglot-byok-openai',
  'openai-compatible': 'peliglot-byok-openai-compatible',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function storageKey(provider: Provider): string {
  return STORAGE_KEYS[provider];
}

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

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read the stored config for a provider. Returns null if not set or malformed.
 * Malformed JSON is cleaned up automatically.
 */
export function readConfig(provider: Provider): ProviderConfig | null {
  const key = storageKey(provider);
  const raw = safeGetItem(key);
  if (raw === null) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    // Malformed JSON — clear the bad entry
    safeRemoveItem(key);
    return null;
  }

  // Basic shape validation
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('provider' in parsed) ||
    (parsed as Record<string, unknown>).provider !== provider
  ) {
    safeRemoveItem(key);
    return null;
  }

  return parsed as ProviderConfig;
}

/** Persist a provider config to localStorage. */
export function writeConfig(config: ProviderConfig): void {
  const key = storageKey(config.provider);
  safeSetItem(key, JSON.stringify(config));
}

/** Remove a provider's config from localStorage. */
export function clearConfig(provider: Provider): void {
  safeRemoveItem(storageKey(provider));
}

/** Clear all BYOK configs. */
export function clearAll(): void {
  for (const provider of Object.keys(STORAGE_KEYS) as Provider[]) {
    safeRemoveItem(storageKey(provider));
  }
}

/**
 * Returns the list of providers that currently have a config stored.
 * Order matches getAllProviders() order.
 */
export function listConfigured(): Provider[] {
  const result: Provider[] = [];
  for (const provider of Object.keys(STORAGE_KEYS) as Provider[]) {
    if (readConfig(provider) !== null) {
      result.push(provider);
    }
  }
  return result;
}
