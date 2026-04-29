/**
 * BYOK barrel export.
 *
 * Components import from '../byok' (or the appropriate relative path),
 * never from the individual sub-modules.
 */

// Types
export type { Provider, ProviderConfig, ValidationResult } from './types';
export { getAllProviders } from './types';

// Storage
export {
  readConfig,
  writeConfig,
  clearConfig,
  clearAll,
  listConfigured,
} from './storage';

// Provider abstraction
export type {
  ChatMessage,
  ChatOptions,
  ChatResult,
  LlmProvider,
  TokenUsage,
} from './providers';
export {
  LlmProviderError,
  DEFAULT_ANTHROPIC_MODEL,
  DEFAULT_OPENAI_MODEL,
  getProvider,
} from './providers';

// Validation — single dispatch entry point
import type { ProviderConfig, ValidationResult } from './types';
import { validateAnthropic, validateOpenAI, validateOpenAICompatible } from './validate';

/**
 * Validate a provider config. Dispatches to the appropriate validator.
 * The `provider` arg must match `config.provider`.
 */
export async function validate(
  provider: ProviderConfig['provider'],
  config: ProviderConfig,
): Promise<ValidationResult> {
  switch (provider) {
    case 'anthropic':
      if (config.provider !== 'anthropic') {
        return { outcome: 'unknown-error', message: 'Provider mismatch.' };
      }
      return validateAnthropic(config.apiKey);

    case 'openai':
      if (config.provider !== 'openai') {
        return { outcome: 'unknown-error', message: 'Provider mismatch.' };
      }
      return validateOpenAI(config.apiKey);

    case 'openai-compatible':
      if (config.provider !== 'openai-compatible') {
        return { outcome: 'unknown-error', message: 'Provider mismatch.' };
      }
      return validateOpenAICompatible({
        baseUrl: config.baseUrl,
        model: config.model,
        apiKey: config.apiKey,
      });
  }
}
