/**
 * Schema migration entrypoint for the mastery persistence layer.
 *
 * Versioning strategy: `schemaVersion` is stored in every `MasteryExport`.
 * When the card shape changes incompatibly, bump `CURRENT_SCHEMA_VERSION` and
 * add a migration function for the previous version to the `migrations` table.
 * The `migrate` function applies migrations in order until the snapshot
 * reaches the current version.
 *
 * Defensive contract: if the input is null, undefined, or missing a
 * recognisable `schemaVersion`, `migrate` returns a fresh empty export
 * rather than throwing. Callers can rely on this for safe construction-time
 * migration without a try/catch.
 */

import type { MasteryExport } from './types';

export const CURRENT_SCHEMA_VERSION = 1;

/** An empty, valid export — used as a safe fallback on malformed input. */
export function emptyExport(): MasteryExport {
  return { schemaVersion: CURRENT_SCHEMA_VERSION, cards: {} };
}

// ---------------------------------------------------------------------------
// Type guards
// ---------------------------------------------------------------------------

function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}

function hasSchemaVersion(x: Record<string, unknown>): x is { schemaVersion: number } & Record<string, unknown> {
  return typeof x['schemaVersion'] === 'number';
}

// ---------------------------------------------------------------------------
// Migration dispatch table
//
// Keys are the `schemaVersion` of the INCOMING snapshot (i.e. the version
// being migrated FROM). The function returns a snapshot at version + 1.
//
// v1 → v1 is a no-op identity; it exists so the dispatch table always has an
// entry for the current version, making the loop termination logic uniform.
// ---------------------------------------------------------------------------

const migrations: Record<number, (s: unknown) => unknown> = {
  1: (s: unknown): unknown => s,
  // Future: 2: (s: unknown) => { ... }
};

// ---------------------------------------------------------------------------
// Public entrypoint
// ---------------------------------------------------------------------------

/**
 * Migrate any prior snapshot to the current schema version.
 *
 * - If `snapshot` is null, undefined, or not an object → returns `emptyExport()`.
 * - If `schemaVersion` is missing or unrecognised → returns `emptyExport()`.
 * - Applies migrations in sequence until `schemaVersion === CURRENT_SCHEMA_VERSION`.
 * - If a migration step throws, catches and returns `emptyExport()`.
 */
export function migrate(snapshot: unknown): MasteryExport {
  if (!isObject(snapshot)) return emptyExport();
  if (!hasSchemaVersion(snapshot)) return emptyExport();

  let current: unknown = snapshot;
  let version = snapshot.schemaVersion;

  while (version < CURRENT_SCHEMA_VERSION) {
    const migrationFn = migrations[version];
    if (!migrationFn) {
      // Unknown version — cannot safely migrate; reset.
      return emptyExport();
    }
    try {
      current = migrationFn(current);
    } catch {
      return emptyExport();
    }
    version += 1;
    // Update schemaVersion in the working copy so the next iteration is correct.
    if (isObject(current)) {
      (current as Record<string, unknown>)['schemaVersion'] = version;
    }
  }

  // Validate that the result looks like a MasteryExport.
  if (!isObject(current)) return emptyExport();
  if (!hasSchemaVersion(current)) return emptyExport();
  if (current['schemaVersion'] !== CURRENT_SCHEMA_VERSION) return emptyExport();
  if (!isObject(current['cards'])) return emptyExport();

  // Cast is justified: we've checked all required top-level fields above.
  return current as unknown as MasteryExport;
}
