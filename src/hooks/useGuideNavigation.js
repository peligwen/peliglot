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
  const prev = () => { if (page > 0) goTo(page - 1); };
  const next = () => { if (page < total - 1) goTo(page + 1); };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  useEffect(() => {
    history.replaceState(null, null, '#' + page);
  }, [page]);

  useEffect(() => {
    try { localStorage.setItem(storageKey, page); } catch (e) { /* ignore */ }
  }, [page, storageKey]);

  return { page, menuOpen, setMenuOpen, contentRef, goTo, prev, next };
}
