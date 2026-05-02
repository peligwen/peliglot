/**
 * Anthropic provider implementation.
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 */

import type { ChatMessage, ChatOptions, ChatResult, LlmProvider } from './types';
import { LlmProviderError } from './types';
import { extractErrorMessage } from '../_scrub';

export const DEFAULT_ANTHROPIC_MODEL = 'claude-sonnet-4-6';

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function makeAnthropicProvider(apiKey: string): LlmProvider {
  return {
    id: 'anthropic',
    defaultModel: DEFAULT_ANTHROPIC_MODEL,

    async chat(messages: ChatMessage[], options: ChatOptions = {}): Promise<ChatResult> {
      const model = options.model ?? DEFAULT_ANTHROPIC_MODEL;
      const maxTokens = options.maxTokens ?? 1024;
      const temperature = options.temperature;

      // Anthropic takes system prompt as a separate top-level field, never in
      // the messages array. Concatenate any role:'system' messages (regardless
      // of position) into one top-level system field; pass everything else
      // through. Robust to future callers that send system mid-stream.
      const systemParts: string[] = [];
      const userMessages: ChatMessage[] = [];
      for (const m of messages) {
        if (m.role === 'system') {
          systemParts.push(m.content);
        } else {
          userMessages.push(m);
        }
      }
      const systemPrompt = systemParts.length > 0 ? systemParts.join('\n\n') : undefined;

      const body: Record<string, unknown> = {
        model,
        max_tokens: maxTokens,
        messages: userMessages.map(m => ({ role: m.role, content: m.content })),
      };
      if (systemPrompt !== undefined) {
        body.system = systemPrompt;
      }
      if (temperature !== undefined) {
        body.temperature = temperature;
      }

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
            'x-api-key': apiKey,
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
          content: Array<{ type: string; text?: string }>;
          usage: { input_tokens: number; output_tokens: number };
          model: string;
        };

        // Concatenate all text blocks
        const text = data.content
          .filter(block => block.type === 'text' && typeof block.text === 'string')
          .map(block => block.text as string)
          .join('');

        return {
          text,
          usage: {
            input: data.usage.input_tokens,
            output: data.usage.output_tokens,
          },
          model: data.model,
        };
      } catch (err) {
        if (err instanceof LlmProviderError) throw err;
        if (err instanceof TypeError) {
          throw new LlmProviderError(
            'Could not reach Anthropic. Check your internet connection.',
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
