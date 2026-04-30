/**
 * Tests for src/byok/trustedHosts.ts
 */

import { describe, it, expect } from 'vitest';
import { isTrustedHost } from './trustedHosts';

describe('isTrustedHost — loopback', () => {
  it.each([
    'http://localhost:11434/v1',
    'https://localhost/v1',
    'http://127.0.0.1:8080',
    'http://[::1]:8080',
    'localhost',
    '127.0.0.1',
  ])('trusts %s', input => {
    expect(isTrustedHost(input)).toBe(true);
  });
});

describe('isTrustedHost — Tailscale', () => {
  it.each([
    'https://laptop.tailnet-abc.ts.net/v1',
    'http://laptop.ts.net',
    'laptop.ts.net',
  ])('trusts %s', input => {
    expect(isTrustedHost(input)).toBe(true);
  });

  it('does not trust an ts.net imposter without the dot prefix', () => {
    expect(isTrustedHost('https://evilts.net')).toBe(false);
    expect(isTrustedHost('https://ts.net.evil.com')).toBe(false);
  });
});

describe('isTrustedHost — Cloudflare quick tunnels', () => {
  it.each([
    'https://random-words.trycloudflare.com',
    'random-words.trycloudflare.com',
  ])('trusts %s', input => {
    expect(isTrustedHost(input)).toBe(true);
  });

  it('does not trust a trycloudflare.com imposter', () => {
    expect(isTrustedHost('https://trycloudflare.com.evil.com')).toBe(false);
    expect(isTrustedHost('https://eviltrycloudflare.com')).toBe(false);
  });
});

describe('isTrustedHost — untrusted', () => {
  it.each([
    'https://api.openai.com',
    'https://api.anthropic.com',
    'https://attacker.example.com/v1',
    'https://192.168.1.1',
    'https://corp.internal',
  ])('does not trust %s', input => {
    expect(isTrustedHost(input)).toBe(false);
  });
});

describe('isTrustedHost — case insensitivity', () => {
  it('lowercases the host before checking', () => {
    expect(isTrustedHost('https://LOCALHOST:8080')).toBe(true);
    expect(isTrustedHost('https://Laptop.TS.NET/v1')).toBe(true);
  });
});

describe('isTrustedHost — fail-closed on bad input', () => {
  it.each([
    '',
    '   ',
    'not a url',
    'http://',
    '://nohost',
  ])('returns false for %s', input => {
    expect(isTrustedHost(input)).toBe(false);
  });
});
