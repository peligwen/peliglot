/**
 * Peliglot supporter list.
 *
 * Schema notes:
 * - `tier` keeps donation amounts private while still ranking entries visually.
 *   patron ≥ $20/mo equivalent; supporter ≥ $5; friend = one-time or small.
 * - `url` is optional — only add if the supporter explicitly asks for a link.
 * - `message` is capped at 140 chars. Trim before committing.
 * - `date` is the ISO date the support landed (YYYY-MM-DD), not today's date.
 *
 * To add a new supporter: prepend an entry to the `supporters` array and
 * remove the placeholder once a real supporter exists.
 */

export interface Supporter {
  name: string;
  /** Optional URL to link the name to. */
  url?: string;
  /** Optional short message ≤140 chars. */
  message?: string;
  /** ISO date the support landed (YYYY-MM-DD). */
  date: string;
  /** Tier bucket — keeps amounts private while still ranking. */
  tier: 'patron' | 'supporter' | 'friend';
}

export const supporters: Supporter[] = [
  // First entry is a placeholder — replace once a real supporter lands.
  {
    name: 'Future you',
    message: 'Be the first to chip in.',
    date: '2026-04-26',
    tier: 'friend',
  },
];

// Dev-only sanity check — catches the inevitable date typo at the moment a
// contributor adds an entry. Skipped in production builds.
if (import.meta.env.DEV) {
  const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
  for (const s of supporters) {
    if (!ISO_DATE.test(s.date)) {
      console.warn(
        `[supporters] Bad date format for "${s.name}": ${JSON.stringify(s.date)} — expected YYYY-MM-DD.`,
      );
    }
    if (s.message && s.message.length > 140) {
      console.warn(
        `[supporters] Message for "${s.name}" is ${s.message.length} chars — trim to 140.`,
      );
    }
  }
}
