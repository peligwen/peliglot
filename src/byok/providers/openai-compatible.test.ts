/**
 * Tests for the OpenAI-compatible provider implementation.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { makeOpenAICompatibleProvider } from './openai-compatible';

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

function makeSuccessResponse(content = 'Test response', model = 'llama3') {
  return makeResponse(200, {
    choices: [{ message: { content } }],
    usage: { prompt_tokens: 5, completion_tokens: 10 },
    model,
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  Object.defineProperty(window, 'location', {
    value: { ...window.location, protocol: 'http:' },
    writable: true,
    configurable: true,
  });
});

// ---------------------------------------------------------------------------
// Mixed-content path — no fetch
// ---------------------------------------------------------------------------

describe('makeOpenAICompatibleProvider — mixed-content', () => {
  it('throws LlmProviderError(mixed-content) before any fetch on non-localhost HTTP over HTTPS', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, protocol: 'https:' },
      writable: true,
      configurable: true,
    });

    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://my-home-server.local:11434/v1',
      model: 'llama3',
    });

    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'mixed-content',
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('does NOT block localhost over HTTPS', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, protocol: 'https:' },
      writable: true,
      configurable: true,
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });

    const result = await provider.chat([{ role: 'user', content: 'hi' }]);
    expect(result.text).toBe('Test response');
  });
});

// ---------------------------------------------------------------------------
// Request shape
// ---------------------------------------------------------------------------

describe('makeOpenAICompatibleProvider — request shape', () => {
  it('appends /chat/completions to normalized base URL', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });

    await provider.chat([{ role: 'user', content: 'hi' }]);

    const [url] = spy.mock.calls[0] as [string, unknown];
    expect(url).toBe('http://localhost:11434/v1/chat/completions');
  });

  it('normalizes baseUrl before appending /chat/completions (strips /chat/completions suffix)', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1/chat/completions',
      model: 'llama3',
    });

    await provider.chat([{ role: 'user', content: 'hi' }]);

    const [url] = spy.mock.calls[0] as [string, unknown];
    expect(url).toBe('http://localhost:11434/v1/chat/completions');
  });

  it('includes Authorization header when apiKey provided', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
      apiKey: 'my-local-key',
    });

    await provider.chat([{ role: 'user', content: 'hi' }]);

    const [, init] = spy.mock.calls[0] as [string, { body: string; headers: Record<string, string> }];
    const headers = init.headers;
    expect(headers['Authorization']).toBe('Bearer my-local-key');
  });

  it('omits Authorization header when no apiKey', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });

    await provider.chat([{ role: 'user', content: 'hi' }]);

    const [, init] = spy.mock.calls[0] as [string, { body: string; headers: Record<string, string> }];
    const headers = init.headers;
    expect(headers['Authorization']).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Response parsing
// ---------------------------------------------------------------------------

describe('makeOpenAICompatibleProvider — response parsing', () => {
  it('returns usage zeros when server omits usage block', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, {
        choices: [{ message: { content: 'Ok' } }],
        // no usage field
      }),
    );
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });
    const result = await provider.chat([{ role: 'user', content: 'hi' }]);

    expect(result.usage).toEqual({ input: 0, output: 0 });
  });

  it('falls back to configured model name when server does not echo model', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, {
        choices: [{ message: { content: 'Ok' } }],
        // no model field
      }),
    );
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1',
      model: 'my-custom-model',
    });
    const result = await provider.chat([{ role: 'user', content: 'hi' }]);
    expect(result.model).toBe('my-custom-model');
  });
});

// ---------------------------------------------------------------------------
// Error classification
// ---------------------------------------------------------------------------

describe('makeOpenAICompatibleProvider — error classification', () => {
  it('throws LlmProviderError(unauthorized) on 401', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(401, { error: { message: 'Unauthorized' } }),
    );
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });
    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'unauthorized',
    });
  });

  it('throws LlmProviderError(cors-blocked) on TypeError', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });
    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'cors-blocked',
    });
  });

  it('throws LlmProviderError(http-error) on 500', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(500, { error: { message: 'Server error' } }),
    );
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });
    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'http-error',
      httpStatus: 500,
    });
  });

  it('throws LlmProviderError(rate-limited) on 429', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(429, { error: { message: 'Too many requests' } }, { 'Retry-After': '10' }),
    );
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });
    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'rate-limited',
      retryAfterMs: 10000,
    });
  });
});

// ---------------------------------------------------------------------------
// Provider identity
// ---------------------------------------------------------------------------

describe('makeOpenAICompatibleProvider — identity', () => {
  it('has id=openai-compatible and defaultModel from config', () => {
    const provider = makeOpenAICompatibleProvider({
      baseUrl: 'http://localhost:11434/v1',
      model: 'my-local-model',
    });
    expect(provider.id).toBe('openai-compatible');
    expect(provider.defaultModel).toBe('my-local-model');
  });
});
