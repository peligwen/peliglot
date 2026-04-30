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
import { PROVIDER_LABELS } from '../types';
import type { ChatMessage, ChatOptions, ChatResult, LlmProvider } from './types';
import { LlmProviderError } from './types';
import { readConfig } from '../storage';
import { getDailyCap, getTodayCost } from '../cost-storage';
import { formatCostUsd } from './pricing';
import { makeAnthropicProvider } from './anthropic';
import { makeOpenAIProvider } from './openai';
import { makeOpenAICompatibleProvider } from './openai-compatible';

/**
 * Wrap a raw provider with a daily-cap preflight check. The check runs before
 * each chat() call: if a cap is set and today's spend already meets/exceeds it,
 * throw `cap-exceeded` instead of firing the request.
 *
 * Pre-flight only — once a request is in flight we let it complete. The next
 * call after that completion will re-check the cap.
 */
function withDailyCap(inner: LlmProvider): LlmProvider {
  return {
    id: inner.id,
    defaultModel: inner.defaultModel,
    async chat(messages: ChatMessage[], options?: ChatOptions): Promise<ChatResult> {
      const cap = getDailyCap(inner.id);
      if (cap !== null) {
        const today = getTodayCost(inner.id);
        if (today.costUsd >= cap) {
          const label = PROVIDER_LABELS[inner.id];
          throw new LlmProviderError(
            `Daily cap of ${formatCostUsd(cap)} reached for ${label} (spent ${formatCostUsd(today.costUsd)} today). Adjust the limit in Settings or wait until tomorrow.`,
            'cap-exceeded',
          );
        }
      }
      return inner.chat(messages, options);
    },
  };
}

/**
 * Factory: read the config from byok storage and build the right provider.
 * Returns null if no config is set for the given id.
 *
 * Returned provider is wrapped with a daily-cap preflight check.
 */
export function getProvider(id: Provider): LlmProvider | null {
  const config = readConfig(id);
  if (config === null) return null;

  let raw: LlmProvider;
  switch (config.provider) {
    case 'anthropic':
      raw = makeAnthropicProvider(config.apiKey);
      break;
    case 'openai':
      raw = makeOpenAIProvider(config.apiKey);
      break;
    case 'openai-compatible':
      raw = makeOpenAICompatibleProvider({
        baseUrl: config.baseUrl,
        model: config.model,
        apiKey: config.apiKey,
      });
      break;
  }
  return withDailyCap(raw);
}
