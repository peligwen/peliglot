/**
 * OpenAI-compatible provider implementation.
 *
 * For local LLMs (Ollama, llama.cpp, LM Studio, etc.) and self-hosted
 * OpenAI-compatible gateways.
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 */

import type { ChatMessage, ChatOptions, ChatResult, LlmProvider } from './types';
import { LlmProviderError } from './types';
import { normalizeBaseUrl, isMixedContent } from '../validate';

// ---------------------------------------------------------------------------
// Error message extraction
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
// Factory
// ---------------------------------------------------------------------------

export function makeOpenAICompatibleProvider(config: {
  baseUrl: string;
  model: string;
  apiKey?: string;
}): LlmProvider {
  const normalized = normalizeBaseUrl(config.baseUrl);

  return {
    id: 'openai-compatible',
    defaultModel: config.model,

    async chat(messages: ChatMessage[], options: ChatOptions = {}): Promise<ChatResult> {
      const model = options.model ?? config.model;
      const maxTokens = options.maxTokens ?? 1024;
      const temperature = options.temperature;

      // Pre-flight: mixed-content guard
      if (isMixedContent(normalized)) {
        throw new LlmProviderError(
          'Your browser blocks HTTPS pages from calling plain HTTP servers (mixed content). ' +
            'Use Tailscale (free `*.ts.net` HTTPS), Cloudflare Tunnel, or run your LLM on `localhost`.',
          'mixed-content',
        );
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (config.apiKey) {
        headers['Authorization'] = `Bearer ${config.apiKey}`;
      }

      const body: Record<string, unknown> = {
        model,
        max_tokens: maxTokens,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
      };
      if (temperature !== undefined) {
        body.temperature = temperature;
      }

      try {
        const response = await fetch(`${normalized}/chat/completions`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
          signal: options.signal,
        });

        if (!response.ok) {
          const msg = await extractErrorMessage(response, [config.apiKey]);
          if (response.status === 401 || response.status === 403) {
            throw new LlmProviderError(msg, 'unauthorized', undefined, response.status);
          }
          if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After');
            const retryAfterMs = retryAfter ? parseFloat(retryAfter) * 1000 : undefined;
            throw new LlmProviderError(msg, 'rate-limited', retryAfterMs, 429);
          }
          throw new LlmProviderError(msg, 'http-error', undefined, response.status);
        }

        const data = await response.json() as {
          choices: Array<{ message: { content: string } }>;
          // Many local servers don't return a usage block.
          // If missing/incomplete, cost tracking won't work for this provider.
          usage?: { prompt_tokens?: number; completion_tokens?: number };
          model?: string;
        };

        const text = data.choices[0]?.message?.content ?? '';

        return {
          text,
          usage: {
            input: data.usage?.prompt_tokens ?? 0,
            output: data.usage?.completion_tokens ?? 0,
          },
          // Fall back to the configured model name if the server doesn't echo it
          model: data.model ?? config.model,
        };
      } catch (err) {
        if (err instanceof LlmProviderError) throw err;
        if (err instanceof TypeError) {
          throw new LlmProviderError(
            "Your local server didn't respond, or it didn't allow this page's origin. " +
              'Common fix: set `OLLAMA_ORIGINS=https://peliglot.com` (Ollama) or pass ' +
              "`--cors-allow-origin https://peliglot.com` (llama.cpp's llama-server).",
            'cors-blocked',
          );
        }
        throw new LlmProviderError(
          err instanceof Error ? err.message : 'Unexpected error.',
          'unknown',
        );
      }
    },
  };
}
