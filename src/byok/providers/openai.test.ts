/**
 * Tests for the OpenAI provider implementation.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { makeOpenAIProvider, DEFAULT_OPENAI_MODEL } from './openai';
import { LlmProviderError } from './types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeResponse(
  status: number,
  body: unknown,
  headers: Record<string, string> = {},
): Response {
  const isOk = status >= 200 && status < 300;
  return {
    ok: isOk,
    status,
    headers: {
      get: (key: string) => headers[key] ?? null,
    },
    json: () => Promise.resolve(body),
    text: () =>
      Promise.resolve(typeof body === 'string' ? body : JSON.stringify(body)),
  } as unknown as Response;
}

function makeSuccessResponse(content = 'Hola', model = DEFAULT_OPENAI_MODEL) {
  return makeResponse(200, {
    choices: [{ message: { content } }],
    usage: { prompt_tokens: 10, completion_tokens: 20 },
    model,
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Request shape
// ---------------------------------------------------------------------------

describe('makeOpenAIProvider — request shape', () => {
  it('sends system message in messages array (not as top-level field)', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeOpenAIProvider('sk-openai-test');

    await provider.chat([
      { role: 'system', content: 'You are a Spanish tutor.' },
      { role: 'user', content: 'Hola' },
    ]);

    const [, init] = spy.mock.calls[0] as [string, { body: string; headers: Record<string, string> }];
    const body = JSON.parse(init.body) as Record<string, unknown>;

    expect(body.system).toBeUndefined();
    const msgs = body.messages as Array<{ role: string; content: string }>;
    expect(msgs[0]?.role).toBe('system');
    expect(msgs[0]?.content).toBe('You are a Spanish tutor.');
    expect(msgs).toHaveLength(2);
  });

  it('sends correct headers with Bearer token', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeOpenAIProvider('sk-openai-key-xyz');

    await provider.chat([{ role: 'user', content: 'test' }]);

    const [, init] = spy.mock.calls[0] as [string, { body: string; headers: Record<string, string> }];
    const headers = init.headers;
    expect(headers['Authorization']).toBe('Bearer sk-openai-key-xyz');
    expect(headers['Content-Type']).toBe('application/json');
  });

  it('posts to the correct OpenAI endpoint', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeOpenAIProvider('sk-openai-test');

    await provider.chat([{ role: 'user', content: 'test' }]);

    const [url] = spy.mock.calls[0] as [string, unknown];
    expect(url).toBe('https://api.openai.com/v1/chat/completions');
  });

  it('respects options.model override', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse('hi', 'gpt-4o'));
    const provider = makeOpenAIProvider('sk-openai-test');

    await provider.chat([{ role: 'user', content: 'test' }], { model: 'gpt-4o' });

    const [, init] = spy.mock.calls[0] as [string, { body: string; headers: Record<string, string> }];
    const body = JSON.parse(init.body) as Record<string, unknown>;
    expect(body.model).toBe('gpt-4o');
  });
});

// ---------------------------------------------------------------------------
// Response parsing
// ---------------------------------------------------------------------------

describe('makeOpenAIProvider — response parsing', () => {
  it('maps prompt_tokens → input, completion_tokens → output', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, {
        choices: [{ message: { content: '¡Hola!' } }],
        usage: { prompt_tokens: 7, completion_tokens: 13 },
        model: 'gpt-4o-mini',
      }),
    );
    const provider = makeOpenAIProvider('sk-openai-test');
    const result = await provider.chat([{ role: 'user', content: 'hi' }]);

    expect(result.text).toBe('¡Hola!');
    expect(result.usage).toEqual({ input: 7, output: 13 });
    expect(result.model).toBe('gpt-4o-mini');
  });
});

// ---------------------------------------------------------------------------
// Error classification
// ---------------------------------------------------------------------------

describe('makeOpenAIProvider — error classification', () => {
  it('throws LlmProviderError(unauthorized) on 401', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(401, { error: { message: 'Incorrect API key provided.' } }),
    );
    const provider = makeOpenAIProvider('bad-key');
    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'unauthorized',
    });
  });

  it('throws LlmProviderError(rate-limited) on 429 with Retry-After', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(429, { error: { message: 'Rate limit exceeded' } }, { 'Retry-After': '60' }),
    );
    const provider = makeOpenAIProvider('sk-openai-test');

    let caught: LlmProviderError | undefined;
    try {
      await provider.chat([{ role: 'user', content: 'hi' }]);
    } catch (e) {
      caught = e as LlmProviderError;
    }

    expect(caught?.kind).toBe('rate-limited');
    expect(caught?.retryAfterMs).toBe(60000);
  });

  it('throws LlmProviderError(http-error) on 500', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(500, { error: { message: 'Internal server error' } }),
    );
    const provider = makeOpenAIProvider('sk-openai-test');
    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'http-error',
      httpStatus: 500,
    });
  });

  it('throws LlmProviderError(network) on TypeError', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Network request failed'));
    const provider = makeOpenAIProvider('sk-openai-test');
    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'network',
    });
  });

  it('scrubs the key from provider-echoed error messages', async () => {
    const secretKey = 'sk-secret-openai-key-xyz';
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(500, {
        error: { message: `Internal error with token ${secretKey}` },
      }),
    );
    const provider = makeOpenAIProvider(secretKey);

    let caught: LlmProviderError | undefined;
    try {
      await provider.chat([{ role: 'user', content: 'hi' }]);
    } catch (e) {
      caught = e as LlmProviderError;
    }

    expect(caught?.message).not.toContain(secretKey);
    expect(caught?.message).toContain('[redacted]');
  });
});

// ---------------------------------------------------------------------------
// Provider identity
// ---------------------------------------------------------------------------

describe('makeOpenAIProvider — identity', () => {
  it('has id=openai and defaultModel=gpt-4o-mini', () => {
    const provider = makeOpenAIProvider('key');
    expect(provider.id).toBe('openai');
    expect(provider.defaultModel).toBe(DEFAULT_OPENAI_MODEL);
  });
});
