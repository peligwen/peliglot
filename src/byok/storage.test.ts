/**
 * Tests for src/byok/storage.ts
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  readConfig,
  writeConfig,
  clearConfig,
  clearAll,
  listConfigured,
} from './storage';
import type { ProviderConfig } from './types';

// ---------------------------------------------------------------------------
// Setup — clear BYOK storage before each test
// ---------------------------------------------------------------------------

beforeEach(() => {
  localStorage.removeItem('peliglot-byok-anthropic');
  localStorage.removeItem('peliglot-byok-openai');
  localStorage.removeItem('peliglot-byok-openai-compatible');
});

// ---------------------------------------------------------------------------
// Roundtrip tests
// ---------------------------------------------------------------------------

describe('readConfig / writeConfig — roundtrip', () => {
  it('stores and retrieves an Anthropic config', () => {
    const config: ProviderConfig = { provider: 'anthropic', apiKey: 'sk-ant-test-key' };
    writeConfig(config);
    expect(readConfig('anthropic')).toEqual(config);
  });

  it('stores and retrieves an OpenAI config', () => {
    const config: ProviderConfig = { provider: 'openai', apiKey: 'sk-openai-test-key' };
    writeConfig(config);
    expect(readConfig('openai')).toEqual(config);
  });

  it('stores and retrieves an openai-compatible config (full)', () => {
    const config: ProviderConfig = {
      provider: 'openai-compatible',
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama-3.1-70b-instruct',
      apiKey: 'optional-key',
      label: 'Home llama',
    };
    writeConfig(config);
    expect(readConfig('openai-compatible')).toEqual(config);
  });

  it('stores and retrieves an openai-compatible config (minimal, no apiKey/label)', () => {
    const config: ProviderConfig = {
      provider: 'openai-compatible',
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama-3',
    };
    writeConfig(config);
    const retrieved = readConfig('openai-compatible');
    expect(retrieved).not.toBeNull();
    expect(retrieved?.provider).toBe('openai-compatible');
    if (retrieved?.provider === 'openai-compatible') {
      expect(retrieved.baseUrl).toBe('http://localhost:11434/v1');
      expect(retrieved.model).toBe('llama-3');
    }
  });

  it('returns null when nothing is stored', () => {
    expect(readConfig('anthropic')).toBeNull();
    expect(readConfig('openai')).toBeNull();
    expect(readConfig('openai-compatible')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// clearConfig
// ---------------------------------------------------------------------------

describe('clearConfig', () => {
  it('removes just the specified provider', () => {
    writeConfig({ provider: 'anthropic', apiKey: 'key-a' });
    writeConfig({ provider: 'openai', apiKey: 'key-b' });

    clearConfig('anthropic');

    expect(readConfig('anthropic')).toBeNull();
    expect(readConfig('openai')).toEqual({ provider: 'openai', apiKey: 'key-b' });
  });
});

// ---------------------------------------------------------------------------
// clearAll
// ---------------------------------------------------------------------------

describe('clearAll', () => {
  it('removes all three providers', () => {
    writeConfig({ provider: 'anthropic', apiKey: 'key-a' });
    writeConfig({ provider: 'openai', apiKey: 'key-b' });
    writeConfig({
      provider: 'openai-compatible',
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });

    clearAll();

    expect(readConfig('anthropic')).toBeNull();
    expect(readConfig('openai')).toBeNull();
    expect(readConfig('openai-compatible')).toBeNull();
  });

  it('also clears cumulative cost data and the conversation-provider preference', () => {
    writeConfig({ provider: 'anthropic', apiKey: 'key-a' });
    // Seed cost + provider preference manually so we don't depend on the
    // cost-storage barrel API for this assertion.
    localStorage.setItem(
      'peliglot-byok-cost-anthropic',
      JSON.stringify({ totalInputTokens: 100, totalOutputTokens: 50, totalCostUsd: 0.01, lastUpdated: Date.now() }),
    );
    localStorage.setItem('peliglot-conversation-provider', 'anthropic');

    clearAll();

    expect(localStorage.getItem('peliglot-byok-cost-anthropic')).toBeNull();
    expect(localStorage.getItem('peliglot-conversation-provider')).toBeNull();
  });

  it('is a no-op when nothing is stored', () => {
    expect(() => clearAll()).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// listConfigured
// ---------------------------------------------------------------------------

describe('listConfigured', () => {
  it('returns empty array when nothing configured', () => {
    expect(listConfigured()).toEqual([]);
  });

  it('returns only configured providers', () => {
    writeConfig({ provider: 'openai', apiKey: 'key-o' });
    const result = listConfigured();
    expect(result).toContain('openai');
    expect(result).not.toContain('anthropic');
    expect(result).not.toContain('openai-compatible');
  });

  it('returns all three when all configured', () => {
    writeConfig({ provider: 'anthropic', apiKey: 'key-a' });
    writeConfig({ provider: 'openai', apiKey: 'key-o' });
    writeConfig({
      provider: 'openai-compatible',
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });
    const result = listConfigured();
    expect(result).toHaveLength(3);
    expect(result).toContain('anthropic');
    expect(result).toContain('openai');
    expect(result).toContain('openai-compatible');
  });
});

// ---------------------------------------------------------------------------
// Malformed JSON cleanup
// ---------------------------------------------------------------------------

describe('readConfig — malformed JSON cleanup', () => {
  it('returns null and removes the bad entry for malformed JSON', () => {
    localStorage.setItem('peliglot-byok-anthropic', 'not-valid-json{{{');
    expect(readConfig('anthropic')).toBeNull();
    // Entry should have been cleaned up
    expect(localStorage.getItem('peliglot-byok-anthropic')).toBeNull();
  });

  it('returns null and removes entry with wrong provider field', () => {
    localStorage.setItem('peliglot-byok-openai', JSON.stringify({ provider: 'anthropic', apiKey: 'k' }));
    expect(readConfig('openai')).toBeNull();
    expect(localStorage.getItem('peliglot-byok-openai')).toBeNull();
  });

  it('returns null for null-value entry (JSON null)', () => {
    localStorage.setItem('peliglot-byok-anthropic', 'null');
    expect(readConfig('anthropic')).toBeNull();
  });

  it('returns null for non-object entry (JSON number)', () => {
    localStorage.setItem('peliglot-byok-anthropic', '42');
    expect(readConfig('anthropic')).toBeNull();
  });
});
