/**
 * BYOK pricing table — hard-coded USD rates per model.
 *
 * Collection-agnostic. No imports from src/guides/, src/mastery/, or any
 * specific guide collection.
 *
 * Last verified: 2026-04-29.
 * Director re-audits when provider prices change.
 */

export interface ModelPricing {
  inputPer1M: number;   // USD per 1M input tokens
  outputPer1M: number;  // USD per 1M output tokens
}

/**
 * Hard-coded pricing snapshot. Keys are model id prefixes — matched by
 * lookupPricing against the model string echoed by the provider. Using
 * prefixes handles provider-appended date suffixes like
 * `claude-sonnet-4-6-20250101` while keeping the table readable.
 */
export const PRICING: Record<string, ModelPricing> = {
  // Anthropic
  'claude-sonnet-4-6':       { inputPer1M: 3.00,  outputPer1M: 15.00 },
  'claude-haiku-4-5':        { inputPer1M: 0.80,  outputPer1M: 4.00  },
  'claude-opus-4-7':         { inputPer1M: 15.00, outputPer1M: 75.00 },
  // OpenAI
  'gpt-4o-mini':             { inputPer1M: 0.15,  outputPer1M: 0.60  },
  'gpt-4o':                  { inputPer1M: 2.50,  outputPer1M: 10.00 },
  'gpt-4.1-mini':            { inputPer1M: 0.40,  outputPer1M: 1.60  },
  'gpt-4.1':                 { inputPer1M: 2.00,  outputPer1M: 8.00  },
};

/**
 * Look up pricing for a model id.
 *
 * Tries exact match first, then prefix match (longest prefix wins).
 * Prefix matching handles provider-appended date suffixes like
 * `claude-sonnet-4-6-20250101`.
 *
 * Returns null if no match — caller should display "—".
 */
export function lookupPricing(model: string): ModelPricing | null {
  // Exact match
  if (Object.prototype.hasOwnProperty.call(PRICING, model)) {
    return PRICING[model] ?? null;
  }

  // Prefix match — longest matching prefix wins (avoids spurious matches)
  let bestKey = '';
  let bestEntry: ModelPricing | null = null;
  for (const [key, entry] of Object.entries(PRICING)) {
    if (model.startsWith(key) && key.length > bestKey.length) {
      bestKey = key;
      bestEntry = entry;
    }
  }
  return bestEntry;
}

/**
 * Compute cost in USD from token usage and pricing.
 * Returns a number — caller formats as needed.
 */
export function computeCostUsd(
  usage: { input: number; output: number },
  pricing: ModelPricing,
): number {
  return (
    (usage.input  * pricing.inputPer1M  / 1_000_000) +
    (usage.output * pricing.outputPer1M / 1_000_000)
  );
}

/**
 * Format a USD cost for display:
 * - < $0.01  → 4 decimal places (e.g. "$0.0003")
 * - >= $0.01 → 2 decimal places (e.g. "$0.03")
 */
export function formatCostUsd(costUsd: number): string {
  if (costUsd < 0.01) {
    return `$${costUsd.toFixed(4)}`;
  }
  return `$${costUsd.toFixed(2)}`;
}
