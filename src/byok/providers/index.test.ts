/**
 * Tests for the getProvider factory in providers/index.ts
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { getProvider } from './index';

// ---------------------------------------------------------------------------
// Storage mock
// ---------------------------------------------------------------------------

vi.mock('../storage', () => ({
  readConfig: vi.fn(),
}));

import { readConfig } from '../storage';
const mockReadConfig = vi.mocked(readConfig);

afterEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// Dispatch tests
// ---------------------------------------------------------------------------

describe('getProvider', () => {
  it('returns null when no config is stored', () => {
    mockReadConfig.mockReturnValue(null);
    expect(getProvider('anthropic')).toBeNull();
    expect(getProvider('openai')).toBeNull();
    expect(getProvider('openai-compatible')).toBeNull();
  });

  it('returns an Anthropic provider when anthropic config is present', () => {
    mockReadConfig.mockReturnValue({ provider: 'anthropic', apiKey: 'sk-ant-test' });
    const provider = getProvider('anthropic');
    expect(provider).not.toBeNull();
    expect(provider?.id).toBe('anthropic');
    expect(provider?.defaultModel).toBe('claude-sonnet-4-6');
  });

  it('returns an OpenAI provider when openai config is present', () => {
    mockReadConfig.mockReturnValue({ provider: 'openai', apiKey: 'sk-openai-test' });
    const provider = getProvider('openai');
    expect(provider).not.toBeNull();
    expect(provider?.id).toBe('openai');
    expect(provider?.defaultModel).toBe('gpt-4o-mini');
  });

  it('returns an OpenAI-compatible provider when compatible config is present', () => {
    mockReadConfig.mockReturnValue({
      provider: 'openai-compatible',
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });
    const provider = getProvider('openai-compatible');
    expect(provider).not.toBeNull();
    expect(provider?.id).toBe('openai-compatible');
    expect(provider?.defaultModel).toBe('llama3');
  });

  it('calls readConfig with the correct provider id', () => {
    mockReadConfig.mockReturnValue(null);
    getProvider('anthropic');
    expect(mockReadConfig).toHaveBeenCalledWith('anthropic');
  });
});
