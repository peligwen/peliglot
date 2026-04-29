/**
 * OpenAI provider implementation.
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 */

import type { ChatMessage, ChatOptions, ChatResult, LlmProvider } from './types';
import { LlmProviderError } from './types';

export const DEFAULT_OPENAI_MODEL = 'gpt-4o-mini';

// ---------------------------------------------------------------------------
// Error message extraction (never echoes the key)
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

export function makeOpenAIProvider(apiKey: string): LlmProvider {
  return {
    id: 'openai',
    defaultModel: DEFAULT_OPENAI_MODEL,

    async chat(messages: ChatMessage[], options: ChatOptions = {}): Promise<ChatResult> {
      const model = options.model ?? DEFAULT_OPENAI_MODEL;
      const maxTokens = options.maxTokens ?? 1024;
      const temperature = options.temperature;

      // OpenAI takes system prompt as a message in the array (role: 'system')
      const body: Record<string, unknown> = {
        model,
        max_tokens: maxTokens,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
      };
      if (temperature !== undefined) {
        body.temperature = temperature;
      }

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify(body),
          signal: options.signal,
        });

        if (!response.ok) {
          const msg = await extractErrorMessage(response, [apiKey]);
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
          usage: { prompt_tokens: number; completion_tokens: number };
          model: string;
        };

        const text = data.choices[0]?.message?.content ?? '';

        return {
          text,
          usage: {
            input: data.usage.prompt_tokens,
            output: data.usage.completion_tokens,
          },
          model: data.model,
        };
      } catch (err) {
        if (err instanceof LlmProviderError) throw err;
        if (err instanceof TypeError) {
          throw new LlmProviderError(
            'Could not reach OpenAI. Check your internet connection.',
            'network',
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
