/**
 * Tests for the getProvider factory in providers/index.ts
 */

import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { getProvider } from './index';
import { LlmProviderError } from './types';
import {
  addToCost,
  setDailyCap,
  resetAllCosts,
  clearAllCaps,
  clearAllSilentUsage,
  markSilentUsage,
  getSilentUsageModelIds,
} from '../cost-storage';

// ---------------------------------------------------------------------------
// Storage mock — only the config storage; cost-storage uses real localStorage
// ---------------------------------------------------------------------------

vi.mock('../storage', () => ({
  readConfig: vi.fn(),
}));

import { readConfig } from '../storage';
const mockReadConfig = vi.mocked(readConfig);

afterEach(() => {
  vi.clearAllMocks();
});

beforeEach(() => {
  resetAllCosts();
  clearAllCaps();
  clearAllSilentUsage();
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

// ---------------------------------------------------------------------------
// Daily-cap preflight
// ---------------------------------------------------------------------------

describe('getProvider — daily-cap preflight', () => {
  beforeEach(() => {
    mockReadConfig.mockReturnValue({ provider: 'anthropic', apiKey: 'sk-ant-test' });
    // Make the underlying chat call fail loudly so we can tell whether the
    // preflight short-circuited (no fetch attempt) vs. the real chat ran.
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(
      new Error('fetch should not be called when cap is exceeded'),
    );
  });

  it('passes through chat when no cap is set', async () => {
    // No cap set — preflight should not throw cap-exceeded. The fetch mock
    // rejects, so we expect a non-cap-exceeded error to surface.
    const provider = getProvider('anthropic');
    expect(provider).not.toBeNull();
    await expect(provider!.chat([{ role: 'user', content: 'hi' }])).rejects.toSatisfy(err => {
      return !(err instanceof LlmProviderError) || err.kind !== 'cap-exceeded';
    });
  });

  it('passes through chat when cap is set but today\'s spend is below', async () => {
    setDailyCap('anthropic', 1.0);
    addToCost('anthropic', { input: 100, output: 50, costUsd: 0.5 }); // half the cap

    const provider = getProvider('anthropic');
    await expect(provider!.chat([{ role: 'user', content: 'hi' }])).rejects.toSatisfy(err => {
      return !(err instanceof LlmProviderError) || err.kind !== 'cap-exceeded';
    });
  });

  it('throws cap-exceeded when today\'s spend equals the cap', async () => {
    setDailyCap('anthropic', 1.0);
    addToCost('anthropic', { input: 100, output: 50, costUsd: 1.0 });

    const provider = getProvider('anthropic');
    await expect(provider!.chat([{ role: 'user', content: 'hi' }])).rejects.toBeInstanceOf(
      LlmProviderError,
    );
    await expect(provider!.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'cap-exceeded',
    });
  });

  it('throws cap-exceeded when today\'s spend exceeds the cap', async () => {
    setDailyCap('anthropic', 1.0);
    addToCost('anthropic', { input: 100, output: 50, costUsd: 1.5 });

    const provider = getProvider('anthropic');
    await expect(provider!.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'cap-exceeded',
    });
  });

  it('does not call the underlying provider when cap is exceeded', async () => {
    setDailyCap('anthropic', 1.0);
    addToCost('anthropic', { input: 100, output: 50, costUsd: 1.0 });

    const provider = getProvider('anthropic');
    try {
      await provider!.chat([{ role: 'user', content: 'hi' }]);
    } catch {
      // expected
    }
    // fetch should never be called — preflight rejected before reaching the network
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('cap-exceeded error references the configured cap value', async () => {
    setDailyCap('openai', 2.5);
    addToCost('openai', { input: 100, output: 50, costUsd: 3.0 });
    mockReadConfig.mockReturnValue({ provider: 'openai', apiKey: 'sk-openai-test' });

    const provider = getProvider('openai');
    await expect(provider!.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'cap-exceeded',
      message: expect.stringMatching(/2\.50/),
    });
  });

  it('re-allows requests after cap is raised mid-day', async () => {
    setDailyCap('anthropic', 1.0);
    addToCost('anthropic', { input: 100, output: 50, costUsd: 1.0 });

    const provider = getProvider('anthropic');
    // First call: blocked by cap
    await expect(provider!.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'cap-exceeded',
    });

    // Director raises the cap mid-day
    setDailyCap('anthropic', 2.0);

    // Next call: preflight passes (today $1.00 < cap $2.00). Underlying fetch
    // mock rejects, so we expect a non-cap-exceeded error to surface.
    await expect(provider!.chat([{ role: 'user', content: 'hi' }])).rejects.toSatisfy(err => {
      return !(err instanceof LlmProviderError) || err.kind !== 'cap-exceeded';
    });
  });
});

// ---------------------------------------------------------------------------
// Silent-usage guard
// ---------------------------------------------------------------------------

/**
 * Build a fetch response that mimics a successful Anthropic chat reply.
 * `inputTokens` and `outputTokens` control the reported usage; both zero
 * trips the silent-usage guard.
 */
function fakeAnthropicResponse(opts: {
  inputTokens: number;
  outputTokens: number;
  model?: string;
  text?: string;
}): Response {
  const body = JSON.stringify({
    content: [{ type: 'text', text: opts.text ?? 'hi' }],
    usage: { input_tokens: opts.inputTokens, output_tokens: opts.outputTokens },
    model: opts.model ?? 'claude-sonnet-4-6',
  });
  return new Response(body, { status: 200, headers: { 'content-type': 'application/json' } });
}

describe('getProvider — silent-usage guard', () => {
  beforeEach(() => {
    mockReadConfig.mockReturnValue({ provider: 'anthropic', apiKey: 'sk-ant-test' });
    // Raise the cap above the experimental default so the cap preflight doesn't
    // confound silent-usage tests if any earlier state leaked in.
    setDailyCap('anthropic', 100);
  });

  it('marks silent usage when a successful response reports zero tokens', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      fakeAnthropicResponse({ inputTokens: 0, outputTokens: 0 }),
    );

    const provider = getProvider('anthropic');
    const result = await provider!.chat([{ role: 'user', content: 'hi' }]);

    // The call itself succeeded — we don't drop the response, the user can see it.
    expect(result.text).toBe('hi');
    // But the model is now flagged.
    expect(getSilentUsageModelIds('anthropic')).toContain('claude-sonnet-4-6');
  });

  it('does not mark silent usage when usage > 0', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      fakeAnthropicResponse({ inputTokens: 10, outputTokens: 5 }),
    );

    const provider = getProvider('anthropic');
    await provider!.chat([{ role: 'user', content: 'hi' }]);

    expect(getSilentUsageModelIds('anthropic')).toEqual([]);
  });

  it('blocks subsequent calls with a silent-usage error once flagged', async () => {
    markSilentUsage('anthropic', 'claude-sonnet-4-6');

    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const provider = getProvider('anthropic');
    await expect(provider!.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'silent-usage',
    });

    // Critical: no network I/O should happen — the user is blocked locally.
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('un-blocks calls after the silent-usage record is cleared', async () => {
    markSilentUsage('anthropic', 'claude-sonnet-4-6');

    const provider = getProvider('anthropic');
    await expect(provider!.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'silent-usage',
    });

    // User clears the record from Settings
    clearAllSilentUsage();

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      fakeAnthropicResponse({ inputTokens: 5, outputTokens: 2 }),
    );

    const result = await provider!.chat([{ role: 'user', content: 'hi' }]);
    expect(result.text).toBe('hi');
  });

  it('does not flag silent usage on openai-compatible (self-hosted servers commonly omit it)', async () => {
    // Switch the mock config to openai-compatible
    mockReadConfig.mockReturnValue({
      provider: 'openai-compatible',
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });

    // Build an OpenAI-shaped success response with zero usage
    const body = JSON.stringify({
      choices: [{ message: { content: 'hi' } }],
      usage: { prompt_tokens: 0, completion_tokens: 0 },
      model: 'llama3',
    });
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(body, { status: 200, headers: { 'content-type': 'application/json' } }),
    );

    const provider = getProvider('openai-compatible');
    await provider!.chat([{ role: 'user', content: 'hi' }]);

    // Zero usage on a self-hosted endpoint is normal — no record created.
    expect(getSilentUsageModelIds('openai-compatible')).toEqual([]);
  });
});
