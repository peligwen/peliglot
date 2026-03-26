import { useState, useEffect, useRef } from 'react';

export function useGuideNavigation(total, storageKey) {
  const [page, setPage] = useState(() => {
    const h = parseInt(location.hash.slice(1), 10);
    if (h >= 0 && h < total) return h;
    try {
      const s = parseInt(localStorage.getItem(storageKey), 10);
      if (s >= 0 && s < total) return s;
    } catch (e) { /* ignore */ }
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

  useEffect(() => {
    history.replaceState(null, null, '#' + page);
  }, [page]);

  useEffect(() => {
    try { localStorage.setItem(storageKey, page); } catch (e) { /* ignore */ }
  }, [page, storageKey]);

  return { page, menuOpen, setMenuOpen, contentRef, goTo, prev, next };
}
