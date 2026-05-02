/**
 * Tests for the Anthropic provider implementation.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { makeAnthropicProvider, DEFAULT_ANTHROPIC_MODEL } from './anthropic';
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

function makeSuccessResponse(text = 'Hola, ¿cómo estás?', model = DEFAULT_ANTHROPIC_MODEL) {
  return makeResponse(200, {
    content: [{ type: 'text', text }],
    usage: { input_tokens: 10, output_tokens: 20 },
    model,
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Request shape
// ---------------------------------------------------------------------------

describe('makeAnthropicProvider — request shape', () => {
  it('sends system prompt as top-level field, not in messages', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeAnthropicProvider('sk-ant-test');

    await provider.chat([
      { role: 'system', content: 'You are a Spanish tutor.' },
      { role: 'user', content: 'Hola' },
    ]);

    const [, init] = spy.mock.calls[0] as [string, { body: string; headers: Record<string, string> }];
    const body = JSON.parse(init.body) as Record<string, unknown>;

    expect(body.system).toBe('You are a Spanish tutor.');
    // system message must not appear in the messages array
    const msgs = body.messages as Array<{ role: string }>;
    expect(msgs.every(m => m.role !== 'system')).toBe(true);
    expect(msgs).toHaveLength(1);
  });

  it('sends correct headers including x-api-key', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeAnthropicProvider('sk-ant-key-123');

    await provider.chat([{ role: 'user', content: 'test' }]);

    const [, init] = spy.mock.calls[0] as [string, { body: string; headers: Record<string, string> }];
    const headers = init.headers;
    expect(headers['x-api-key']).toBe('sk-ant-key-123');
    expect(headers['anthropic-version']).toBe('2023-06-01');
    expect(headers['anthropic-dangerous-direct-browser-access']).toBe('true');
    expect(headers['Content-Type']).toBe('application/json');
  });

  it('posts to the Anthropic messages endpoint', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeAnthropicProvider('sk-ant-test');

    await provider.chat([{ role: 'user', content: 'test' }]);

    const [url] = spy.mock.calls[0] as [string, unknown];
    expect(url).toBe('https://api.anthropic.com/v1/messages');
  });

  it('uses options.model when provided', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse('hi', 'claude-opus-4-5'));
    const provider = makeAnthropicProvider('sk-ant-test');

    await provider.chat([{ role: 'user', content: 'test' }], { model: 'claude-opus-4-5' });

    const [, init] = spy.mock.calls[0] as [string, { body: string; headers: Record<string, string> }];
    const body = JSON.parse(init.body) as Record<string, unknown>;
    expect(body.model).toBe('claude-opus-4-5');
  });

  it('handles conversation without system message', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(makeSuccessResponse());
    const provider = makeAnthropicProvider('sk-ant-test');

    await provider.chat([
      { role: 'user', content: '¿Cómo se dice hello?' },
      { role: 'assistant', content: 'Se dice "hola".' },
      { role: 'user', content: '¿Y goodbye?' },
    ]);

    const [, init] = spy.mock.calls[0] as [string, { body: string; headers: Record<string, string> }];
    const body = JSON.parse(init.body) as Record<string, unknown>;
    expect(body.system).toBeUndefined();
    expect((body.messages as unknown[]).length).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// Response parsing
// ---------------------------------------------------------------------------

describe('makeAnthropicProvider — response parsing', () => {
  it('returns concatenated text and usage', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, {
        content: [
          { type: 'text', text: 'Hola' },
          { type: 'text', text: ', ¿cómo estás?' },
        ],
        usage: { input_tokens: 5, output_tokens: 15 },
        model: 'claude-sonnet-4-6',
      }),
    );
    const provider = makeAnthropicProvider('sk-ant-test');
    const result = await provider.chat([{ role: 'user', content: 'hi' }]);

    expect(result.text).toBe('Hola, ¿cómo estás?');
    expect(result.usage).toEqual({ input: 5, output: 15 });
    expect(result.model).toBe('claude-sonnet-4-6');
  });

  it('skips non-text content blocks', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, {
        content: [
          { type: 'tool_use', id: 'abc' },
          { type: 'text', text: 'Done.' },
        ],
        usage: { input_tokens: 3, output_tokens: 4 },
        model: 'claude-sonnet-4-6',
      }),
    );
    const provider = makeAnthropicProvider('sk-ant-test');
    const result = await provider.chat([{ role: 'user', content: 'hi' }]);
    expect(result.text).toBe('Done.');
  });
});

// ---------------------------------------------------------------------------
// Error classification
// ---------------------------------------------------------------------------

describe('makeAnthropicProvider — error classification', () => {
  it('throws LlmProviderError(unauthorized) on 401', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(401, { error: { message: 'Invalid API key' } }),
    );
    const provider = makeAnthropicProvider('bad-key');
    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'unauthorized',
    });
  });

  it('throws LlmProviderError(unauthorized) on 403', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(403, { error: { message: 'Forbidden' } }),
    );
    const provider = makeAnthropicProvider('bad-key');
    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'unauthorized',
    });
  });

  it('throws LlmProviderError(rate-limited) on 429 with Retry-After', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(429, { error: { message: 'Rate limit exceeded' } }, { 'Retry-After': '30' }),
    );
    const provider = makeAnthropicProvider('sk-ant-test');

    let caught: LlmProviderError | undefined;
    try {
      await provider.chat([{ role: 'user', content: 'hi' }]);
    } catch (e) {
      caught = e as LlmProviderError;
    }

    expect(caught).toBeDefined();
    expect(caught?.kind).toBe('rate-limited');
    expect(caught?.retryAfterMs).toBe(30000);
    expect(caught?.httpStatus).toBe(429);
  });

  it('throws LlmProviderError(http-error) on 500', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(500, { error: { message: 'Internal server error' } }),
    );
    const provider = makeAnthropicProvider('sk-ant-test');
    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'http-error',
      httpStatus: 500,
    });
  });

  it('throws LlmProviderError(network) on TypeError', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));
    const provider = makeAnthropicProvider('sk-ant-test');
    await expect(provider.chat([{ role: 'user', content: 'hi' }])).rejects.toMatchObject({
      kind: 'network',
    });
  });

  it('does not echo the key in error messages', async () => {
    const secretKey = 'sk-ant-super-secret-12345';
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(401, { error: { message: `Invalid key: ${secretKey}` } }),
    );
    const provider = makeAnthropicProvider(secretKey);

    let caught: LlmProviderError | undefined;
    try {
      await provider.chat([{ role: 'user', content: 'hi' }]);
    } catch (e) {
      caught = e as LlmProviderError;
    }

    expect(caught?.message).not.toContain(secretKey);
  });
});

// ---------------------------------------------------------------------------
// Provider identity
// ---------------------------------------------------------------------------

describe('makeAnthropicProvider — identity', () => {
  it('has id=anthropic and defaultModel=claude-sonnet-4-6', () => {
    const provider = makeAnthropicProvider('key');
    expect(provider.id).toBe('anthropic');
    expect(provider.defaultModel).toBe(DEFAULT_ANTHROPIC_MODEL);
  });
});
