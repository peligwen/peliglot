/**
 * Tests for src/byok/_scrub.ts — defense-in-depth secret scrubbing.
 */

import { describe, it, expect } from 'vitest';
import { scrubSecrets, extractErrorMessage } from './_scrub';

describe('scrubSecrets', () => {
  it('replaces a key substring with [redacted]', () => {
    expect(scrubSecrets('error: bad key sk-secret-123 rejected', ['sk-secret-123']))
      .toBe('error: bad key [redacted] rejected');
  });

  it('handles undefined secrets without throwing', () => {
    expect(scrubSecrets('error: bad key', [undefined])).toBe('error: bad key');
  });

  it('skips secrets shorter than 4 chars (avoids clobbering common substrings)', () => {
    expect(scrubSecrets('foo bar baz', ['foo'])).toBe('foo bar baz');
    expect(scrubSecrets('foo bar baz', ['fooo'])).toBe('foo bar baz'); // not present
  });

  it('redacts multiple distinct secrets', () => {
    expect(scrubSecrets('a=sk-aaaa b=sk-bbbb', ['sk-aaaa', 'sk-bbbb']))
      .toBe('a=[redacted] b=[redacted]');
  });

  it('redacts the same secret appearing multiple times', () => {
    expect(scrubSecrets('first sk-key then sk-key again', ['sk-key']))
      .toBe('first [redacted] then [redacted] again');
  });

  it('passes through text when no secrets match', () => {
    expect(scrubSecrets('clean message', ['sk-not-here'])).toBe('clean message');
  });

  it('handles a mix of defined and undefined secrets', () => {
    expect(scrubSecrets('x=sk-real and y=other', [undefined, 'sk-real']))
      .toBe('x=[redacted] and y=other');
  });

  it('handles an empty secrets array', () => {
    expect(scrubSecrets('any text', [])).toBe('any text');
  });
});

describe('extractErrorMessage', () => {
  function makeResponse(status: number, body: unknown): Response {
    return {
      ok: false,
      status,
      json: () => Promise.resolve(body),
    } as unknown as Response;
  }

  it('extracts OpenAI/Anthropic-shaped { error: { message } }', async () => {
    const res = makeResponse(401, { error: { message: 'Invalid API key' } });
    expect(await extractErrorMessage(res)).toBe('Invalid API key');
  });

  it('extracts top-level { message }', async () => {
    const res = makeResponse(500, { message: 'Server explosion' });
    expect(await extractErrorMessage(res)).toBe('Server explosion');
  });

  it('falls back to "HTTP <status>" when body is not parseable', async () => {
    const res = {
      ok: false,
      status: 502,
      json: () => Promise.reject(new Error('not json')),
    } as unknown as Response;
    expect(await extractErrorMessage(res)).toBe('HTTP 502');
  });

  it('scrubs a leaked key in the provider message', async () => {
    const res = makeResponse(500, {
      error: { message: 'Bad token sk-hello-world rejected' },
    });
    expect(await extractErrorMessage(res, ['sk-hello-world']))
      .toBe('Bad token [redacted] rejected');
  });

  it('handles undefined secrets in the array', async () => {
    const res = makeResponse(401, { error: { message: 'Invalid key' } });
    expect(await extractErrorMessage(res, [undefined])).toBe('Invalid key');
  });
});
