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
import {
  getDailyCap,
  getTodayCost,
  getSilentUsageModelIds,
  markSilentUsage,
} from '../cost-storage';
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
 * Wrap a provider with a silent-usage guard.
 *
 * Two checks:
 *  1. Pre-flight: if a previous chat call recorded silent usage for this
 *     provider (cloud only), block subsequent calls until the user clears
 *     the record in Settings. The vendor is silently billing without
 *     reporting tokens, so neither our meter nor the cap can engage —
 *     better to halt than to keep spending blind.
 *  2. Post-flight: if the call returns successfully but `usage.input` and
 *     `usage.output` are both zero, mark the model as silent-usage so the
 *     next call is blocked. We still return this call's result — the user
 *     hasn't been told yet, no point dropping the response they're looking at.
 *
 * Wrapped outside of `withDailyCap` so the silent-usage block runs first;
 * a "we can't track at all" condition is more fundamental than a cap.
 */
function withSilentUsageGuard(inner: LlmProvider): LlmProvider {
  return {
    id: inner.id,
    defaultModel: inner.defaultModel,
    async chat(messages: ChatMessage[], options?: ChatOptions): Promise<ChatResult> {
      if (getSilentUsageModelIds(inner.id).length > 0) {
        const label = PROVIDER_LABELS[inner.id];
        throw new LlmProviderError(
          `${label} returned a successful response without reporting token usage on a previous call. ` +
            `The provider may be billing without Peliglot being able to track it. ` +
            `Investigate, then clear the warning in Settings to re-enable chat.`,
          'silent-usage',
        );
      }
      const result = await inner.chat(messages, options);
      if (result.usage.input === 0 && result.usage.output === 0) {
        markSilentUsage(inner.id, result.model);
      }
      return result;
    },
  };
}

/**
 * Factory: read the config from byok storage and build the right provider.
 * Returns null if no config is set for the given id.
 *
 * Returned provider is wrapped with the silent-usage guard (outermost) and
 * the daily-cap preflight (inner). Order: silent-usage runs first because
 * "we can't track at all" is a more fundamental halt than a USD threshold.
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
  return withSilentUsageGuard(withDailyCap(raw));
}
