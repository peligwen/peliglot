/**
 * Stub LlmProvider for use in tests.
 *
 * NOT exported from the barrel — imported directly by test files only.
 * Provides a scripted sequence of ChatResult responses. When the script
 * is exhausted, subsequent calls throw an error (prevents silent test drift).
 */

import type { ChatMessage, ChatOptions, ChatResult, LlmProvider } from './types';
import { LlmProviderError } from './types';

export function makeStubProvider(scriptedResponses: ChatResult[]): LlmProvider & {
  calls: Array<{ messages: ChatMessage[]; options?: ChatOptions }>;
} {
  const queue = [...scriptedResponses];
  const calls: Array<{ messages: ChatMessage[]; options?: ChatOptions }> = [];

  return {
    id: 'anthropic',
    defaultModel: 'stub-model',
    calls,

    async chat(messages: ChatMessage[], options?: ChatOptions): Promise<ChatResult> {
      calls.push({ messages, options });
      const next = queue.shift();
      if (next === undefined) {
        throw new LlmProviderError(
          'Stub provider exhausted — no more scripted responses.',
          'unknown',
        );
      }
      return next;
    },
  };
}

/** Convenience: make a stub that always throws the given LlmProviderError. */
export function makeErrorStubProvider(error: LlmProviderError): LlmProvider & {
  calls: Array<{ messages: ChatMessage[]; options?: ChatOptions }>;
} {
  const calls: Array<{ messages: ChatMessage[]; options?: ChatOptions }> = [];
  return {
    id: 'anthropic',
    defaultModel: 'stub-error-model',
    calls,
    async chat(messages: ChatMessage[], options?: ChatOptions): Promise<ChatResult> {
      calls.push({ messages, options });
      throw error;
    },
  };
}
