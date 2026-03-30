import { useState, useEffect, useRef } from 'react';

function readPage(storageKey, total) {
  const h = parseInt(location.hash.slice(1), 10);
  if (h >= 0 && h < total) return h;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw !== null) {
      // Support both old format (plain number) and new format (JSON)
      const parsed = Number(raw);
      if (!Number.isNaN(parsed) && parsed >= 0 && parsed < total) return parsed;
    }
  } catch { /* ignore */ }
  return 0;
}

function trackVisited(storageKey, pageIndex) {
  try {
    const key = storageKey + '-visited';
    const raw = localStorage.getItem(key);
    const visited = raw ? JSON.parse(raw) : [];
    if (!visited.includes(pageIndex)) {
      visited.push(pageIndex);
      localStorage.setItem(key, JSON.stringify(visited));
    }
  } catch { /* ignore */ }
}

function trackRecent(storageKey, pageIndex, guidesMeta) {
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

export function useGuideNavigation(total, storageKey, guidesMeta) {
  const [page, setPage] = useState(() => readPage(storageKey, total));
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef(null);

  const goTo = (i) => {
    setPage(i);
    setMenuOpen(false);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };
  const prev = () => setPage(p => p > 0 ? p - 1 : p);
  const next = () => setPage(p => p < total - 1 ? p + 1 : p);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [total]);

  // Swipe navigation for mobile
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    let startX = null;
    let startY = 0;
    const isInteractive = (node) => {
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
    const onTouchStart = (e) => {
      if (isInteractive(e.target)) {
        startX = null;
        return;
      }
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
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
  }, [total]);

  useEffect(() => {
    history.replaceState(null, null, '#' + page);
  }, [page]);

  useEffect(() => {
    try { localStorage.setItem(storageKey, page); } catch { /* ignore */ }
    trackVisited(storageKey, page);
    trackRecent(storageKey, page, guidesMeta);
  }, [page, storageKey, guidesMeta]);

  return { page, menuOpen, setMenuOpen, contentRef, goTo, prev, next };
}
