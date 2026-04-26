import { useState, useMemo, useCallback } from 'react';

export interface ProgressState {
  page: number;
  visited: Set<number>;
}

export interface UseProgressReturn {
  state: ProgressState;
  setPage: (page: number) => void;
  markVisited: (guideIndex: number) => void;
  reset: () => void;
}

/** Read the persisted visited set for a given storageKey without mounting a hook. */
export function readVisited(storageKey: string): Set<number> {
  try {
    const raw = localStorage.getItem(storageKey + '-visited');
    return raw ? new Set<number>(JSON.parse(raw) as number[]) : new Set<number>();
  } catch {
    return new Set<number>();
  }
}

function readPage(storageKey: string): number {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw !== null) {
      const parsed = Number(raw);
      if (!Number.isNaN(parsed) && parsed >= 0) return parsed;
    }
  } catch { /* ignore */ }
  return 0;
}

function persistPage(storageKey: string, page: number): void {
  try {
    localStorage.setItem(storageKey, String(page));
  } catch { /* ignore */ }
}

function persistVisited(storageKey: string, visited: Set<number>): void {
  try {
    localStorage.setItem(storageKey + '-visited', JSON.stringify([...visited]));
  } catch { /* ignore */ }
}

/**
 * useProgress — per-collection progress state backed by localStorage.
 *
 * Persists two keys:
 *   - `storageKey`           → current page index (number)
 *   - `storageKey-visited`   → visited guide indices (JSON array of numbers)
 *
 * Designed for a Phase 2 swap to Cloudflare-backed sync: only this file and
 * `readVisited` need to change.
 */
export function useProgress(storageKey: string): UseProgressReturn {
  // Version counter to force visitedSet recomputation after mutations.
  const [visitedVersion, setVisitedVersion] = useState<number>(0);
  const [page, setPageState] = useState<number>(() => readPage(storageKey));

  const setPage = useCallback((nextPage: number): void => {
    setPageState(nextPage);
    persistPage(storageKey, nextPage);
  }, [storageKey]);

  const markVisited = useCallback((guideIndex: number): void => {
    const current = readVisited(storageKey);
    if (!current.has(guideIndex)) {
      current.add(guideIndex);
      persistVisited(storageKey, current);
      setVisitedVersion(v => v + 1);
    }
  }, [storageKey]);

  const reset = useCallback((): void => {
    try {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(storageKey + '-visited');
    } catch { /* ignore */ }
    setPageState(0);
    setVisitedVersion(v => v + 1);
  }, [storageKey]);

  const visited = useMemo<Set<number>>(() => {
    return readVisited(storageKey);
    // visitedVersion is the only dependency that changes on mutation;
    // storageKey is stable per-render but included for correctness.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, visitedVersion]);

  const state: ProgressState = { page, visited };

  return { state, setPage, markVisited, reset };
}
