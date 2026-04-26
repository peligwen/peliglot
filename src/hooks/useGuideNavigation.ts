import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import type { RefObject } from 'react';
import type { GuideMeta } from '../types/guide';
import { useProgress } from './useProgress';

function readHashPage(total: number): number | null {
  const h = parseInt(location.hash.slice(1), 10);
  if (h >= 0 && h < total) return h;
  return null;
}

function trackRecent(storageKey: string, pageIndex: number, guidesMeta: GuideMeta[] | undefined): void {
  try {
    const meta = guidesMeta?.[pageIndex];
    const slug = storageKey.replace('peliglot-', '');
    localStorage.setItem('peliglot-recent', JSON.stringify({
      slug,
      page: pageIndex,
      title: meta?.subtitle || meta?.title || '',
      icon: meta?.icon || '',
      lastVisited: Date.now(),
    }));
  } catch { /* ignore */ }
}

export interface UseGuideNavigationResult {
  page: number;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  contentRef: RefObject<HTMLElement>;
  goTo: (index: number) => void;
  prev: () => void;
  next: () => void;
  visitedSet: Set<number>;
}

export function useGuideNavigation(
  total: number,
  storageKey: string,
  guidesMeta: GuideMeta[],
): UseGuideNavigationResult {
  const { state, setPage, markVisited } = useProgress(storageKey);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLElement>(null);

  // Keep a ref to current page so prev/next callbacks don't close over stale state,
  // matching the original's functional-setter pattern.
  const pageRef = useRef<number>(state.page);
  pageRef.current = state.page;

  // On mount, if a valid hash is present it takes precedence over localStorage.
  // useLayoutEffect runs before first paint so there's no visible flicker.
  useLayoutEffect(() => {
    const hashPage = readHashPage(total);
    if (hashPage !== null && hashPage !== pageRef.current) {
      setPage(hashPage);
    }
    // Intentionally runs only once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (i: number): void => {
    setPage(i);
    setMenuOpen(false);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const prev = useCallback(() => {
    const p = pageRef.current;
    if (p > 0) setPage(p - 1);
  }, [setPage]);

  const next = useCallback(() => {
    const p = pageRef.current;
    if (p < total - 1) setPage(p + 1);
  }, [total, setPage]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  // Swipe navigation for mobile
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    let startX: number | null = null;
    let startY = 0;
    const isInteractive = (node: HTMLElement | null): boolean => {
      while (node && node !== el) {
        const tag = node.tagName;
        if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return true;
        if (node.getAttribute('role') === 'button' || node.isContentEditable) return true;
        if (node.dataset && node.dataset.noSwipe !== undefined) return true;
        const style = window.getComputedStyle(node);
        if (style.overflowX === 'auto' || style.overflowX === 'scroll') return true;
        node = node.parentElement;
      }
      return false;
    };
    const onTouchStart = (e: TouchEvent) => {
      if (isInteractive(e.target instanceof HTMLElement ? e.target : null)) {
        startX = null;
        return;
      }
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) next();
        else prev();
      }
    };
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [prev, next]);

  useEffect(() => {
    history.replaceState(null, '', '#' + state.page);
  }, [state.page]);

  useEffect(() => {
    markVisited(state.page);
    trackRecent(storageKey, state.page, guidesMeta);
  }, [state.page, storageKey, guidesMeta, markVisited]);

  return { page: state.page, menuOpen, setMenuOpen, contentRef, goTo, prev, next, visitedSet: state.visited };
}
