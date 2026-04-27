/**
 * localStorage-backed implementation of `MasteryStorageAdapter`.
 *
 * Design: reads and writes the full snapshot on every operation. This is
 * acceptable at expected scale (<2 000 cards); revisit if the card count
 * approaches ~5 000, at which point per-card keying or IndexedDB should be
 * considered.
 *
 * Graceful degradation: if `localStorage` is unavailable (private browsing
 * mode, storage quota exceeded, etc.) the adapter falls back to an in-memory
 * snapshot for the lifetime of the instance. Write errors are silently
 * swallowed; reads continue to work from memory.
 *
 * Invariant: `MasteryStorageAdapter` is the ONLY place in `src/mastery/`
 * that reads or writes localStorage. No other file in this directory touches
 * storage directly.
 */

import type { MasteryStorageAdapter, WriteResult, MergeReport } from '../adapter';
import type { CardState, MasteryExport, StreakState, XpState } from '../types';
import { migrate, emptyExport, CURRENT_SCHEMA_VERSION } from '../migrations';

const STORAGE_KEY = 'peliglot-mastery-v1';

export class LocalStorageMasteryAdapter implements MasteryStorageAdapter {
  /** In-memory snapshot; the authoritative state when localStorage is unavailable. */
  private snapshot: MasteryExport;

  constructor() {
    this.snapshot = this.loadFromStorage();
  }

  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------

  private loadFromStorage(): MasteryExport {
    let raw: string | null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable (private mode, etc.)
      return emptyExport();
    }
    if (raw === null) return emptyExport();
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.warn('[mastery] localStorage snapshot was unparseable; resetting', err);
      return emptyExport();
    }
    return migrate(parsed);
  }

  private persistSnapshot(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.snapshot));
    } catch {
      // Swallow write errors (quota exceeded, private mode, etc.)
      // In-memory snapshot remains correct for this session.
    }
  }

  // ---------------------------------------------------------------------------
  // MasteryStorageAdapter implementation
  // ---------------------------------------------------------------------------

  async read(cardId: string): Promise<CardState | null> {
    return this.snapshot.cards[cardId] ?? null;
  }

  async write(cardId: string, state: CardState): Promise<WriteResult> {
    const existing = this.snapshot.cards[cardId];

    if (existing !== undefined && existing.updatedAt > state.updatedAt) {
      return { outcome: 'dropped' };
    }

    this.snapshot = {
      ...this.snapshot,
      cards: { ...this.snapshot.cards, [cardId]: state },
    };
    this.persistSnapshot();
    return { outcome: 'accepted' };
  }

  async listDue(now: number): Promise<Array<{ cardId: string; state: CardState }>> {
    return Object.values(this.snapshot.cards)
      .filter(state => state.due <= now)
      .map(state => ({ cardId: state.cardId, state }));
  }

  async bulkExport(): Promise<MasteryExport> {
    // Return a deep copy so external mutations cannot corrupt the adapter's
    // internal snapshot. Shallow-copying the cards record is not enough:
    // a caller doing `exported.cards['c1'].reps++` would mutate the shared
    // CardState object. Each card value is spread into a new object.
    const cards: Record<string, CardState> = {};
    for (const [id, state] of Object.entries(this.snapshot.cards)) {
      cards[id] = { ...state };
    }
    return {
      schemaVersion: this.snapshot.schemaVersion,
      cards,
      ...(this.snapshot.streak !== undefined && { streak: { ...this.snapshot.streak } }),
      ...(this.snapshot.settings !== undefined && { settings: { ...this.snapshot.settings } }),
      ...(this.snapshot.xp !== undefined && { xp: { ...this.snapshot.xp } }),
    };
  }

  async writeMeta(meta: {
    streak?: StreakState;
    settings?: { dailyGoal?: number };
    xp?: XpState;
  }): Promise<void> {
    // Partial merge: only overwrite present fields; leave absent ones intact.
    this.snapshot = {
      ...this.snapshot,
      ...(meta.streak !== undefined && { streak: { ...meta.streak } }),
      ...(meta.settings !== undefined && {
        settings: { ...this.snapshot.settings, ...meta.settings },
      }),
      ...(meta.xp !== undefined && { xp: { ...meta.xp } }),
    };
    this.persistSnapshot();
  }

  async bulkImport(incoming: MasteryExport): Promise<MergeReport> {
    let accepted = 0;
    let rejected = 0;
    let unchanged = 0;

    const updatedCards = { ...this.snapshot.cards };

    for (const [cardId, remoteState] of Object.entries(incoming.cards)) {
      const localState = updatedCards[cardId];

      if (localState === undefined) {
        // Card absent locally — always accept.
        updatedCards[cardId] = remoteState;
        accepted += 1;
      } else if (remoteState.updatedAt > localState.updatedAt) {
        // Remote is newer — overwrite.
        updatedCards[cardId] = remoteState;
        accepted += 1;
      } else if (remoteState.updatedAt < localState.updatedAt) {
        // Local is newer — discard remote.
        rejected += 1;
      } else {
        // Equal timestamps — idempotent, no write needed.
        unchanged += 1;
      }
    }

    this.snapshot = {
      ...this.snapshot,
      schemaVersion: CURRENT_SCHEMA_VERSION,
      cards: updatedCards,
    };
    this.persistSnapshot();

    return { accepted, rejected, unchanged };
  }
}
