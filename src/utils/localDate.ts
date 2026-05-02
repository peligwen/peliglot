/**
 * Local-time date helpers shared across hooks, pages, and tests.
 *
 * Why string operations instead of epoch math: a "day" can be 23h or 25h on
 * DST boundaries. Comparing YYYY-MM-DD strings derived from local-time
 * components sidesteps the entire DST class of bugs.
 */

/**
 * Format a Date as a local-time YYYY-MM-DD string.
 */
export function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Add `n` calendar days to a YYYY-MM-DD string using symbolic (DST-safe)
 * date arithmetic. Returns the resulting YYYY-MM-DD string.
 */
export function addDays(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, (m as number) - 1, d as number);
  date.setDate(date.getDate() + n);
  return toLocalDateString(date);
}
