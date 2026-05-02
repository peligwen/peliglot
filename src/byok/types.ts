/**
 * BYOK (Bring Your Own Key) — shared types.
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 */

export type Provider = 'anthropic' | 'openai' | 'openai-compatible';

/** Returns all supported providers. */
export function getAllProviders(): Provider[] {
  return ['anthropic', 'openai', 'openai-compatible'];
}

/**
 * Human-readable provider names for use in error messages and informational
 * copy. These are sentence-friendly (e.g. "Anthropic is rate-limiting…").
 * The conversation UI uses its own dropdown labels.
 */
export const PROVIDER_LABELS: Record<Provider, string> = {
  anthropic: 'Anthropic',
  openai: 'OpenAI',
  'openai-compatible': 'your custom server',
};

/** Storage shape — what's persisted in localStorage per provider. */
export type ProviderConfig =
  | { provider: 'anthropic'; apiKey: string }
  | { provider: 'openai'; apiKey: string }
  | {
      provider: 'openai-compatible';
      /** User-supplied base URL; should NOT include trailing /chat/completions */
      baseUrl: string;
      /** User-typed model name */
      model: string;
      /** Optional — many local servers ignore auth */
      apiKey?: string;
      /** Optional friendly name, e.g. "Home llama-3 70b" */
      label?: string;
    };

/** Result of a "Test" validation call. */
export type ValidationResult =
  | { outcome: 'ok'; latencyMs: number }
  | { outcome: 'unauthorized'; message: string }
  | { outcome: 'mixed-content'; message: string }
  | { outcome: 'cors-blocked'; message: string }
  | { outcome: 'network-error'; message: string }
  | { outcome: 'http-error'; status: number; message: string }
  | { outcome: 'unknown-error'; message: string };
