import { useState, useEffect, useRef } from 'react';

export function useGuideNavigation(total, storageKey) {
  const [page, setPage] = useState(() => {
    const h = parseInt(location.hash.slice(1), 10);
    if (h >= 0 && h < total) return h;
    try {
      const s = parseInt(localStorage.getItem(storageKey), 10);
      if (s >= 0 && s < total) return s;
    } catch { /* ignore */ }
    return 0;
  });
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
  }, [page, storageKey]);

  return { page, menuOpen, setMenuOpen, contentRef, goTo, prev, next };
}
