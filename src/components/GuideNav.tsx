import type { RefObject, ReactElement } from 'react';
import type { GuideMeta } from '../types/guide';
import type { Theme } from '../styles/themes';
import { colors, spacing, radii, typography } from '../styles/tokens';

export interface GuideNavProps {
  page: number;
  total: number;
  meta: GuideMeta;
  menuOpen: boolean;
  hamburgerRef: RefObject<HTMLButtonElement>;
  onToggleMenu: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenSearch: () => void;
  theme: Theme;
}

export function GuideNav({
  page,
  total,
  meta,
  menuOpen,
  hamburgerRef,
  onToggleMenu,
  onPrev,
  onNext,
  onOpenSearch,
  theme,
}: GuideNavProps): ReactElement {
  return (
    <>
      {/* TOP BAR */}
      <header role="banner" style={{
        background: theme.headerBg, borderBottom: `1px solid ${theme.borderColor}`,
        padding: `10px ${spacing.lg}px`, display: 'flex', alignItems: 'center', gap: spacing.md,
        flexShrink: 0, zIndex: 10, fontFamily: theme.shellFont,
      }}>
        <button
          ref={hamburgerRef}
          onClick={onToggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open guide menu'}
          aria-expanded={menuOpen}
          aria-controls="sidebar-menu"
          style={{
            width: 36, height: 36, borderRadius: radii.lg, border: `1.5px solid ${theme.borderColor}`,
            background: theme.buttonBg, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: typography.fontSize['3xl'],
            color: theme.textMuted, flexShrink: 0,
          }}
        >
          {'☰'}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: typography.fontSize.nav, fontWeight: typography.fontWeight.extrabold, color: theme.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: theme.shellFont }}>
            {meta.icon} {meta.subtitle}
          </div>
          <div style={{ fontSize: typography.fontSize.md, color: theme.textSecondary, fontStyle: 'italic' }}>{meta.title}</div>
        </div>
        <div
          aria-label={`Guide ${page + 1} of ${total} guides`}
          style={{ background: meta.color, color: colors.text.white, padding: '3px 10px', borderRadius: radii.md, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, flexShrink: 0, fontFamily: theme.shellFont }}
        >
          {page + 1}/{total}
        </div>
      </header>

      {/* BOTTOM NAV */}
      <nav role="navigation" aria-label="Guide navigation" style={{
        background: theme.headerBg, borderTop: `1px solid ${theme.borderColor}`,
        padding: `${spacing.sm}px ${spacing.lg}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0, fontFamily: theme.shellFont,
      }}>
        <button
          onClick={onPrev} disabled={page === 0} aria-label="Previous guide"
          style={{
            padding: `${spacing.sm}px ${spacing.xl}px`, borderRadius: radii.lg, border: `1.5px solid ${theme.borderColor}`,
            background: page === 0 ? theme.buttonDisabledBg : theme.buttonBg,
            color: page === 0 ? theme.buttonDisabledText : theme.buttonText,
            fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.bold, cursor: page === 0 ? 'default' : 'pointer',
          }}
        >
          {'←'} Prev
        </button>
        <button
          onClick={onOpenSearch}
          aria-label="Search guides"
          style={{
            width: 36, height: 36, borderRadius: radii.lg, border: `1.5px solid ${theme.borderColor}`,
            background: theme.buttonBg, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: typography.fontSize.xl,
            color: theme.textMuted, flexShrink: 0,
          }}
        >
          {'⌕'}
        </button>
        <button
          onClick={onNext} disabled={page === total - 1} aria-label="Next guide"
          style={{
            padding: `${spacing.sm}px ${spacing.xl}px`, borderRadius: radii.lg, border: `1.5px solid ${theme.borderColor}`,
            background: page === total - 1 ? theme.buttonDisabledBg : theme.buttonBg,
            color: page === total - 1 ? theme.buttonDisabledText : theme.buttonText,
            fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.bold, cursor: page === total - 1 ? 'default' : 'pointer',
          }}
        >
          Next {'→'}
        </button>
      </nav>
    </>
  );
}
