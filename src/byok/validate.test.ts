/**
 * Tests for src/byok/validate.ts
 *
 * Uses vi.spyOn(globalThis, 'fetch') to stub network calls.
 * The mixed-content path is tested without any fetch call at all.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  validateAnthropic,
  validateOpenAI,
  validateOpenAICompatible,
  normalizeBaseUrl,
} from './validate';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeResponse(status: number, body: unknown, ok?: boolean): Response {
  const isOk = ok ?? (status >= 200 && status < 300);
  return {
    ok: isOk,
    status,
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(typeof body === 'string' ? body : JSON.stringify(body)),
  } as unknown as Response;
}

afterEach(() => {
  vi.restoreAllMocks();
  // Reset window.location.protocol override if any
  Object.defineProperty(window, 'location', {
    value: { ...window.location, protocol: 'http:' },
    writable: true,
    configurable: true,
  });
});

// ---------------------------------------------------------------------------
// normalizeBaseUrl
// ---------------------------------------------------------------------------

describe('normalizeBaseUrl', () => {
  it('trims whitespace', () => {
    expect(normalizeBaseUrl('  http://localhost:11434/v1  ')).toBe('http://localhost:11434/v1');
  });

  it('strips trailing /chat/completions', () => {
    expect(normalizeBaseUrl('http://localhost:11434/v1/chat/completions')).toBe('http://localhost:11434/v1');
  });

  it('strips trailing slash', () => {
    expect(normalizeBaseUrl('http://localhost:11434/v1/')).toBe('http://localhost:11434/v1');
  });

  it('strips multiple trailing slashes', () => {
    expect(normalizeBaseUrl('http://localhost:11434/v1///')).toBe('http://localhost:11434/v1');
  });

  it('strips trailing /chat/completions then trailing slash', () => {
    expect(normalizeBaseUrl('http://localhost:11434/v1/chat/completions/')).toBe('http://localhost:11434/v1');
  });

  it('leaves clean URL unchanged', () => {
    expect(normalizeBaseUrl('http://localhost:11434/v1')).toBe('http://localhost:11434/v1');
  });

  it('handles https URLs', () => {
    expect(normalizeBaseUrl('https://my-tunnel.ts.net/v1/chat/completions')).toBe('https://my-tunnel.ts.net/v1');
  });
});

// ---------------------------------------------------------------------------
// validateAnthropic
// ---------------------------------------------------------------------------

describe('validateAnthropic', () => {
  it('returns ok on 200', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, { content: [] })
    );
    const result = await validateAnthropic('sk-ant-test');
    expect(result.outcome).toBe('ok');
    if (result.outcome === 'ok') {
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
    }
  });

  it('returns unauthorized on 401', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(401, { error: { message: 'Invalid API key' } })
    );
    const result = await validateAnthropic('bad-key');
    expect(result.outcome).toBe('unauthorized');
  });

  it('returns unauthorized on 403', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(403, { error: { message: 'Forbidden' } })
    );
    const result = await validateAnthropic('bad-key');
    expect(result.outcome).toBe('unauthorized');
  });

  it('does not echo the key in the unauthorized message', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(401, { error: { message: 'Invalid API key' } })
    );
    const result = await validateAnthropic('sk-ant-super-secret-key');
    expect(result.outcome).toBe('unauthorized');
    if (result.outcome === 'unauthorized') {
      expect(result.message).not.toContain('sk-ant-super-secret-key');
    }
  });

  it('returns http-error on 500', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(500, { error: { message: 'Internal server error' } })
    );
    const result = await validateAnthropic('sk-ant-test');
    expect(result.outcome).toBe('http-error');
    if (result.outcome === 'http-error') {
      expect(result.status).toBe(500);
    }
  });

  it('returns network-error on TypeError (fetch throws)', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));
    const result = await validateAnthropic('sk-ant-test');
    expect(result.outcome).toBe('network-error');
  });
});

// ---------------------------------------------------------------------------
// validateOpenAI
// ---------------------------------------------------------------------------

describe('validateOpenAI', () => {
  it('returns ok on 200', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, { choices: [] })
    );
    const result = await validateOpenAI('sk-openai-test');
    expect(result.outcome).toBe('ok');
  });

  it('returns unauthorized on 401', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(401, { error: { message: 'Incorrect API key provided.' } })
    );
    const result = await validateOpenAI('bad-key');
    expect(result.outcome).toBe('unauthorized');
  });

  it('does not echo the key in the unauthorized message', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(401, { error: { message: 'Incorrect API key provided.' } })
    );
    const result = await validateOpenAI('sk-secret-openai-key');
    if (result.outcome === 'unauthorized') {
      expect(result.message).not.toContain('sk-secret-openai-key');
    }
  });

  it('returns http-error on 429 (rate limit)', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(429, { error: { message: 'Rate limit exceeded' } })
    );
    const result = await validateOpenAI('sk-openai-test');
    expect(result.outcome).toBe('http-error');
    if (result.outcome === 'http-error') {
      expect(result.status).toBe(429);
    }
  });

  it('returns network-error on TypeError', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Network request failed'));
    const result = await validateOpenAI('sk-test');
    expect(result.outcome).toBe('network-error');
  });

  it('scrubs the user key out of provider-echoed error messages (defense-in-depth)', async () => {
    const userKey = 'sk-this-key-should-never-leak-back';
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(500, { error: { message: `Internal error: bad token sk-this-key-should-never-leak-back rejected` } })
    );
    const result = await validateOpenAI(userKey);
    expect(result.outcome).toBe('http-error');
    if (result.outcome === 'http-error') {
      expect(result.message).not.toContain(userKey);
      expect(result.message).toContain('[redacted]');
    }
  });
});

// ---------------------------------------------------------------------------
// validateOpenAICompatible — mixed-content path (no fetch)
// ---------------------------------------------------------------------------

describe('validateOpenAICompatible — mixed-content', () => {
  it('returns mixed-content when HTTPS page calls plain HTTP non-localhost URL', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, protocol: 'https:' },
      writable: true,
      configurable: true,
    });

    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const result = await validateOpenAICompatible({
      baseUrl: 'http://my-home-server.local:11434/v1',
      model: 'llama3',
    });

    expect(result.outcome).toBe('mixed-content');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('does NOT flag mixed-content for localhost even over https', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, protocol: 'https:' },
      writable: true,
      configurable: true,
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, { choices: [] })
    );

    const result = await validateOpenAICompatible({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });

    // Should not be mixed-content — fetch should have been called
    expect(result.outcome).not.toBe('mixed-content');
  });

  it('does NOT flag mixed-content for 127.0.0.1', async () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, protocol: 'https:' },
      writable: true,
      configurable: true,
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, { choices: [] })
    );

    const result = await validateOpenAICompatible({
      baseUrl: 'http://127.0.0.1:11434/v1',
      model: 'llama3',
    });

    expect(result.outcome).not.toBe('mixed-content');
  });
});

// ---------------------------------------------------------------------------
// validateOpenAICompatible — network / cors path
// ---------------------------------------------------------------------------

describe('validateOpenAICompatible — network', () => {
  it('returns ok on 200', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, { choices: [] })
    );
    const result = await validateOpenAICompatible({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });
    expect(result.outcome).toBe('ok');
  });

  it('sends Authorization header when apiKey provided', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, { choices: [] })
    );
    await validateOpenAICompatible({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
      apiKey: 'my-local-key',
    });
    const [, init] = spy.mock.calls[0] as [string, { headers: Record<string, string> }];
    const headers = init.headers;
    expect(headers['Authorization']).toBe('Bearer my-local-key');
  });

  it('does not send Authorization header when no apiKey', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, { choices: [] })
    );
    await validateOpenAICompatible({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });
    const [, init] = spy.mock.calls[0] as [string, { headers: Record<string, string> }];
    const headers = init.headers;
    expect(headers['Authorization']).toBeUndefined();
  });

  it('returns cors-blocked on TypeError (no server / CORS rejection)', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));
    const result = await validateOpenAICompatible({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
    });
    expect(result.outcome).toBe('cors-blocked');
  });

  it('normalizes baseUrl before appending /chat/completions', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(200, { choices: [] })
    );
    await validateOpenAICompatible({
      baseUrl: 'http://localhost:11434/v1/chat/completions',
      model: 'llama3',
    });
    const [url] = spy.mock.calls[0] as [string, unknown];
    expect(url).toBe('http://localhost:11434/v1/chat/completions');
  });

  it('returns unauthorized on 401', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      makeResponse(401, { error: { message: 'Unauthorized' } })
    );
    const result = await validateOpenAICompatible({
      baseUrl: 'http://localhost:11434/v1',
      model: 'llama3',
      apiKey: 'bad-key',
    });
    expect(result.outcome).toBe('unauthorized');
  });
});
