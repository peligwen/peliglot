/**
 * Provider abstraction barrel.
 *
 * This is the only module that reads from byok storage and dispatches to
 * provider factories. Components import from '../../byok' (the outer barrel),
 * never from this module directly.
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 */

export type { ChatMessage, ChatOptions, ChatResult, LlmProvider, TokenUsage } from './types';
export { LlmProviderError } from './types';
export { DEFAULT_ANTHROPIC_MODEL, makeAnthropicProvider } from './anthropic';
export { DEFAULT_OPENAI_MODEL, makeOpenAIProvider } from './openai';
export { makeOpenAICompatibleProvider } from './openai-compatible';

import type { Provider } from '../types';
import type { LlmProvider } from './types';
import { readConfig } from '../storage';
import { makeAnthropicProvider } from './anthropic';
import { makeOpenAIProvider } from './openai';
import { makeOpenAICompatibleProvider } from './openai-compatible';

/**
 * Factory: read the config from byok storage and build the right provider.
 * Returns null if no config is set for the given id.
 */
export function getProvider(id: Provider): LlmProvider | null {
  const config = readConfig(id);
  if (config === null) return null;

  switch (config.provider) {
    case 'anthropic':
      return makeAnthropicProvider(config.apiKey);
    case 'openai':
      return makeOpenAIProvider(config.apiKey);
    case 'openai-compatible':
      return makeOpenAICompatibleProvider({
        baseUrl: config.baseUrl,
        model: config.model,
        apiKey: config.apiKey,
      });
  }
}
