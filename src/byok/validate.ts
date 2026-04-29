/**
 * BYOK validation — test whether a provider config works.
 *
 * Each function fires a minimal request and classifies the outcome.
 * Keys are never logged or echoed in error messages.
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 */

import type { ValidationResult } from './types';

// ---------------------------------------------------------------------------
// Base URL normalizer (exported for testing)
// ---------------------------------------------------------------------------

/**
 * Normalize a user-supplied base URL:
 * - Trim whitespace
 * - Strip trailing /chat/completions if present
 * - Strip trailing /
 */
export function normalizeBaseUrl(baseUrl: string): string {
  let url = baseUrl.trim();
  // Strip trailing slashes first, then check for /chat/completions, then strip again
  while (url.endsWith('/')) {
    url = url.slice(0, url.length - 1);
  }
  if (url.endsWith('/chat/completions')) {
    url = url.slice(0, url.length - '/chat/completions'.length);
  }
  // Strip any trailing slashes left after removing /chat/completions
  while (url.endsWith('/')) {
    url = url.slice(0, url.length - 1);
  }
  return url;
}

// ---------------------------------------------------------------------------
// Mixed-content guard
// ---------------------------------------------------------------------------

/**
 * Returns true if this URL would be blocked as mixed content.
 * Applies only to non-localhost http:// URLs when the page is served over https:.
 *
 * Exported for reuse in provider implementations.
 */
export function isMixedContent(url: string): boolean {
  if (typeof window === 'undefined') return false;
  if (window.location.protocol !== 'https:') return false;
  if (!url.startsWith('http://')) return false;

  // Allow localhost / loopback
  try {
    const parsed = new URL(url);
    const h = parsed.hostname;
    if (h === 'localhost' || h === '127.0.0.1' || h === '[::1]') return false;
  } catch {
    // Malformed URL — will fail at fetch, not mixed content
    return false;
  }

  return true;
}

// ---------------------------------------------------------------------------
// Response error extraction (never echoes the key)
// ---------------------------------------------------------------------------

async function extractErrorMessage(
  response: Response,
  secrets: ReadonlyArray<string | undefined> = [],
): Promise<string> {
  let raw: string | null = null;
  try {
    const body: unknown = await response.json();
    if (typeof body === 'object' && body !== null) {
      const obj = body as Record<string, unknown>;
      // OpenAI: { error: { message: "..." } }
      if (
        typeof obj.error === 'object' &&
        obj.error !== null &&
        typeof (obj.error as Record<string, unknown>).message === 'string'
      ) {
        raw = (obj.error as Record<string, unknown>).message as string;
      } else if (typeof obj.message === 'string') {
        raw = obj.message;
      }
    }
  } catch {
    // body wasn't JSON — fall through
  }
  const message = raw ?? `HTTP ${response.status}`;
  return scrubSecrets(message, secrets);
}

/**
 * Defensive: never echo the user's own key back through an error message.
 * Self-hosted gateways have been known to quote pieces of the auth header
 * verbatim. Anthropic / OpenAI don't, but it's a one-line guard.
 */
function scrubSecrets(
  text: string,
  secrets: ReadonlyArray<string | undefined>,
): string {
  let out = text;
  for (const s of secrets) {
    if (s && s.length >= 4) {
      out = out.split(s).join('[redacted]');
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

export async function validateAnthropic(apiKey: string): Promise<ValidationResult> {
  const t0 = performance.now();
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1,
        messages: [{ role: 'user', content: 'hi' }],
      }),
    });

    const latencyMs = Math.round(performance.now() - t0);

    if (response.ok) {
      return { outcome: 'ok', latencyMs };
    }

    if (response.status === 401 || response.status === 403) {
      return {
        outcome: 'unauthorized',
        message: 'Provider rejected this key. Double-check it.',
      };
    }

    const msg = await extractErrorMessage(response, [apiKey]);
    return { outcome: 'http-error', status: response.status, message: msg };
  } catch (err) {
    if (err instanceof TypeError) {
      return {
        outcome: 'network-error',
        message: 'Could not reach Anthropic. Check your internet connection.',
      };
    }
    return {
      outcome: 'unknown-error',
      message: err instanceof Error ? err.message : 'Unexpected error.',
    };
  }
}

export async function validateOpenAI(apiKey: string): Promise<ValidationResult> {
  const t0 = performance.now();
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 1,
        messages: [{ role: 'user', content: 'hi' }],
      }),
    });

    const latencyMs = Math.round(performance.now() - t0);

    if (response.ok) {
      return { outcome: 'ok', latencyMs };
    }

    if (response.status === 401 || response.status === 403) {
      return {
        outcome: 'unauthorized',
        message: 'Provider rejected this key. Double-check it.',
      };
    }

    const msg = await extractErrorMessage(response, [apiKey]);
    return { outcome: 'http-error', status: response.status, message: msg };
  } catch (err) {
    if (err instanceof TypeError) {
      return {
        outcome: 'network-error',
        message: 'Could not reach OpenAI. Check your internet connection.',
      };
    }
    return {
      outcome: 'unknown-error',
      message: err instanceof Error ? err.message : 'Unexpected error.',
    };
  }
}

export async function validateOpenAICompatible(config: {
  baseUrl: string;
  model: string;
  apiKey?: string;
}): Promise<ValidationResult> {
  const normalized = normalizeBaseUrl(config.baseUrl);

  // Pre-flight: mixed-content check
  if (isMixedContent(normalized)) {
    return {
      outcome: 'mixed-content',
      message:
        'Your browser blocks HTTPS pages from calling plain HTTP servers (mixed content). ' +
        'Use Tailscale (free `*.ts.net` HTTPS), Cloudflare Tunnel, or run your LLM on `localhost`.',
    };
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`;
  }

  const t0 = performance.now();
  try {
    const response = await fetch(`${normalized}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: config.model,
        max_tokens: 1,
        messages: [{ role: 'user', content: 'hi' }],
      }),
    });

    const latencyMs = Math.round(performance.now() - t0);

    if (response.ok) {
      return { outcome: 'ok', latencyMs };
    }

    if (response.status === 401 || response.status === 403) {
      return {
        outcome: 'unauthorized',
        message: 'Provider rejected this key. Double-check it.',
      };
    }

    const msg = await extractErrorMessage(response, [config.apiKey]);
    return { outcome: 'http-error', status: response.status, message: msg };
  } catch (err) {
    if (err instanceof TypeError) {
      return {
        outcome: 'cors-blocked',
        message:
          "Your local server didn't respond, or it didn't allow this page's origin. " +
          'Common fix: set `OLLAMA_ORIGINS=https://peliglot.com` (Ollama) or pass ' +
          '`--cors-allow-origin https://peliglot.com` (llama.cpp\'s llama-server).',
      };
    }
    return {
      outcome: 'unknown-error',
      message: err instanceof Error ? err.message : 'Unexpected error.',
    };
  }
}
