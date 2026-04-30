/**
 * LLM provider abstraction types.
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 */

import type { Provider } from '../types';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatOptions {
  /** Override the provider's default model. Optional. */
  model?: string;
  /** Override max output tokens. Optional. */
  maxTokens?: number;
  /** Override temperature. Optional. */
  temperature?: number;
  /** Abort signal. Optional. */
  signal?: AbortSignal;
}

export interface TokenUsage {
  input: number;
  output: number;
}

export interface ChatResult {
  text: string;
  usage: TokenUsage;
  /** The model id the provider actually used (echoed by the server). */
  model: string;
}

export interface LlmProvider {
  readonly id: Provider;
  /** Default model id for cloud providers; user-supplied for openai-compatible. */
  readonly defaultModel: string;
  chat(messages: ChatMessage[], options?: ChatOptions): Promise<ChatResult>;
}

/** Possible failure modes during chat. */
export class LlmProviderError extends Error {
  constructor(
    message: string,
    public readonly kind:
      | 'unauthorized'
      | 'rate-limited'
      | 'mixed-content'
      | 'cors-blocked'
      | 'network'
      | 'http-error'
      | 'cap-exceeded'
      | 'unknown',
    public readonly retryAfterMs?: number, // populated for rate-limited
    public readonly httpStatus?: number,
  ) {
    super(message);
    this.name = 'LlmProviderError';
  }
}
