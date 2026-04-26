import { useState, useRef, useEffect } from 'react';
import type { RefObject, ReactElement, KeyboardEvent } from 'react';
import type { GuideMeta, CategoryColors } from '../types/guide';
import type { Theme } from '../styles/themes';
import { colors, spacing, typography } from '../styles/tokens';

function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return 100 - t.indexOf(q);
  let qi = 0, score = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) { score += (ti === 0 || t[ti - 1] === ' ') ? 10 : 1; qi++; }
  }
  return qi === q.length ? score : 0;
}

function guideScore(g: GuideMeta, query: string): number {
  return Math.max(
    fuzzyScore(query, g.title) * 1.2,
    fuzzyScore(query, g.subtitle ?? '') ,
    fuzzyScore(query, g.cat) * 0.8
  );
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(
    'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
  ));
}

interface GuideItemProps {
  g: GuideMeta;
  idx: number;
  isActive: boolean;
  isVisited: boolean;
  showCatBadge: boolean;
  catColors: CategoryColors;
  theme: Theme;
  goTo: (idx: number) => void;
}

function GuideItem({ g, idx, isActive, isVisited, showCatBadge, catColors, theme, goTo }: GuideItemProps): ReactElement {
  return (
    <button
      key={g.id} onClick={() => goTo(idx)}
      aria-current={isActive ? 'page' : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
        padding: '8px 20px', border: 'none',
        background: isActive ? theme.sidebarActiveItemBg : 'transparent',
        cursor: 'pointer', textAlign: 'left',
        borderLeft: isActive ? `3px solid ${g.color}` : '3px solid transparent',
        color: theme.sidebarItemText,
      }}
    >
      <span style={{ fontSize: typography.fontSize.nav, width: 22, textAlign: 'center' }}>{g.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: typography.fontSize.base, fontWeight: isActive ? typography.fontWeight.extrabold : typography.fontWeight.semibold,
          color: isActive ? (theme.sidebarItemActiveText || g.color) : theme.sidebarItemText,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{g.subtitle}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: theme.sidebarSubText, fontStyle: 'italic' }}>{g.title}</div>
      </div>
      {showCatBadge ? (
        <span style={{
          fontSize: typography.fontSize['2xs'], fontWeight: typography.fontWeight.bold, color: catColors[g.cat],
          background: catColors[g.cat] + '18', padding: '1px 6px',
          borderRadius: spacing.xs, whiteSpace: 'nowrap',
        }}>{g.cat}</span>
      ) : isVisited && !isActive ? (
        <span style={{ fontSize: typography.fontSize.sm, color: colors.text.visited, fontWeight: typography.fontWeight.bold }}>{'✓'}</span>
      ) : (
        <span style={{ fontSize: typography.fontSize.xs, color: theme.buttonDisabledText, fontWeight: typography.fontWeight.semibold }}>{g.id}</span>
      )}
    </button>
  );
}

export interface GuideSidebarProps {
  open: boolean;
  onClose: () => void;
  focusSearch: boolean;
  onFocusSearchConsumed: () => void;
  returnFocusRef: RefObject<HTMLElement>;
  guidesMeta: GuideMeta[];
  categories: string[];
  catColors: CategoryColors;
  page: number;
  visitedSet: Set<number>;
  goTo: (idx: number) => void;
  theme: Theme;
  sidebarTitle: string;
  sidebarSubtitle: string;
}

export function GuideSidebar({
  open, onClose, focusSearch, onFocusSearchConsumed, returnFocusRef,
  guidesMeta, categories, catColors, page, visitedSet, goTo,
  theme, sidebarTitle, sidebarSubtitle,
}: GuideSidebarProps): ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const bodyOverflowRef = useRef('');
  const wasOpenRef = useRef(false);

  const searchResults: (GuideMeta & { score: number })[] | null = searchTerm.trim()
    ? guidesMeta
        .map(g => ({ ...g, score: guideScore(g, searchTerm.trim()) }))
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
    : null;

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      bodyOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      if (focusSearch && searchRef.current) {
        searchRef.current.focus();
        onFocusSearchConsumed?.();
      } else if (sidebarRef.current) {
        const focusable = getFocusable(sidebarRef.current);
        if (focusable.length > 0) focusable[0].focus();
      }
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      document.body.style.overflow = bodyOverflowRef.current;
      setSearchTerm('');
      (returnFocusRef?.current as HTMLElement | null)?.focus();
    }
  }, [open, focusSearch, onFocusSearchConsumed, returnFocusRef]);

  useEffect(() => () => { document.body.style.overflow = bodyOverflowRef.current; }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      if (searchTerm) { setSearchTerm(''); searchRef.current?.focus(); }
      else onClose();
      return;
    }
    if (e.key === 'Tab' && sidebarRef.current) {
      const focusable = getFocusable(sidebarRef.current);
      if (focusable.length === 0) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
    }
  };

  return (
    <aside
      ref={sidebarRef} id="sidebar-menu" role="dialog" aria-modal="true"
      aria-label="Guide list" onKeyDown={handleKeyDown}
      style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 280,
        background: theme.sidebarBg, zIndex: 30,
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
        boxShadow: open ? '4px 0 24px rgba(0,0,0,0.15)' : 'none',
        display: 'flex', flexDirection: 'column', fontFamily: theme.shellFont,
      }}
    >
      <div style={{ padding: `${spacing.lg}px ${spacing.xl}px`, borderBottom: `1px solid ${theme.borderColor}`, flexShrink: 0 }}>
        <div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.extrabold, color: theme.textPrimary }}>{sidebarTitle}</div>
        <div style={{ fontSize: typography.fontSize.md, color: theme.textSecondary }}>{sidebarSubtitle}</div>
      </div>
      <div style={{ padding: '8px 12px', flexShrink: 0, borderBottom: `1px solid ${theme.borderColor}`, position: 'relative' }}>
        <input ref={searchRef} type="text" placeholder="Search guides..." value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '7px 28px 7px 10px', fontSize: 16, border: `1.5px solid ${theme.borderColor}`, borderRadius: 8, background: theme.buttonBg, color: theme.textPrimary, outline: 'none', fontFamily: theme.shellFont }}
        />
        {searchTerm && (
          <button onClick={() => { setSearchTerm(''); searchRef.current?.focus(); }} aria-label="Clear search"
            style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, color: theme.textSecondary, padding: 2, lineHeight: 1 }}
          >{'×'}</button>
        )}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
        {searchResults !== null ? (
          searchResults.length === 0
            ? <div style={{ padding: '20px', textAlign: 'center', color: theme.textSecondary, fontSize: typography.fontSize.base }}>No guides found</div>
            : searchResults.map(g => <GuideItem key={g.id} g={g} idx={g.id - 1} isActive={g.id - 1 === page} isVisited={false} showCatBadge catColors={catColors} theme={theme} goTo={goTo} />)
        ) : (
          categories.map(cat => {
            const items = guidesMeta.filter(g => g.cat === cat);
            const catVisited = items.filter(g => visitedSet.has(g.id - 1)).length;
            return (
              <div key={cat}>
                <div role="heading" aria-level={2}
                  style={{ padding: `6px ${spacing.xl}px`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, color: catColors[cat], textTransform: 'uppercase', letterSpacing: 1.5, marginTop: spacing.xs, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span>{cat}</span>
                  {catVisited > 0 && <span style={{ fontSize: typography.fontSize['2xs'], fontWeight: typography.fontWeight.semibold, color: theme.textSecondary, textTransform: 'none', letterSpacing: 0 }}>{catVisited}/{items.length}</span>}
                </div>
                {items.map(g => <GuideItem key={g.id} g={g} idx={g.id - 1} isActive={g.id - 1 === page} isVisited={visitedSet.has(g.id - 1)} showCatBadge={false} catColors={catColors} theme={theme} goTo={goTo} />)}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
