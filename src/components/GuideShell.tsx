import { useState, useMemo, useRef } from 'react';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useGuideNavigation } from '../hooks/useGuideNavigation';
import { useRouteMeta } from '../hooks/useRouteMeta';
import { lightTheme } from '../styles/themes';
import { colors, spacing, radii, typography } from '../styles/tokens';
import { ErrorBoundary } from './ErrorBoundary';
import { GuideSidebar } from './GuideSidebar';
import { GuideNav } from './GuideNav';
import type { GuideMeta, GuideComponents, CategoryColors } from '../types/guide';
import type { Theme } from '../styles/themes';
import { collectionOneLiners } from '../copy/positioning';
import type { CollectionSlug } from '../copy/positioning';

// Update this map when adding new guide collections
const relatedCollections: Record<string, { slug: string; title: string; icon: string }> = {
  spanish: { slug: 'english', title: 'American English', icon: '\u{1F1FA}\u{1F1F8}' },
  english: { slug: 'spanish', title: 'Español', icon: '\u{1F1EA}\u{1F1F8}' },
  arabic: { slug: 'spanish', title: 'Español', icon: '\u{1F1EA}\u{1F1F8}' },
  german: { slug: 'english', title: 'American English', icon: '\u{1F1FA}\u{1F1F8}' },
  hawaiian: { slug: 'spanish', title: 'Español', icon: '\u{1F1EA}\u{1F1F8}' },
  music: { slug: 'jazz-guitar', title: 'Jazz Guitar', icon: '\u{1F3B8}' },
  'jazz-guitar': { slug: 'music', title: 'Music Theory', icon: '\u{1F3B9}' },
  math: { slug: 'ai-interaction', title: 'AI Interaction', icon: '\u{1F916}' },
  'ai-interaction': { slug: 'math', title: 'Math', icon: '\u{1F9EE}' },
};

export interface GuideShellProps {
  slug: CollectionSlug;
  guidesMeta: GuideMeta[];
  guideComponents: GuideComponents;
  categories: string[];
  catColors: CategoryColors;
  theme?: Theme;
  storageKey: string;
  sidebarTitle: string;
  sidebarSubtitle: string;
}

export function GuideShell({
  slug,
  guidesMeta,
  guideComponents,
  categories,
  catColors,
  theme = lightTheme,
  storageKey,
  sidebarTitle,
  sidebarSubtitle,
}: GuideShellProps): ReactElement {
  const total = guidesMeta.length;
  const { page, menuOpen, setMenuOpen, contentRef, goTo, prev, next, visitedSet } =
    useGuideNavigation(total, storageKey, guidesMeta);

  const meta = guidesMeta[page];
  const GuideComp = guideComponents[page];

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const [focusSearch, setFocusSearch] = useState(false);

  const crossLinks = useMemo(() => {
    const sameCat = guidesMeta.filter(g => g.cat === meta.cat && g.id !== meta.id);
    return sameCat.length > 0 ? sameCat.slice(0, 2) : guidesMeta.filter(g => g.id !== meta.id).slice(0, 2);
  }, [guidesMeta, meta.cat, meta.id]);

  const openSearch = () => {
    setFocusSearch(true);
    setMenuOpen(true);
  };

  const related = relatedCollections[slug];

  // Per-route meta: update on every guide page change within this collection.
  // Format: "<guide title> — <sidebarTitle> | Peliglot"
  const guideTitle = `${meta.title} — ${sidebarTitle} | Peliglot`;
  const guideDescription =
    (meta.subtitle ?? collectionOneLiners[slug]) || sidebarSubtitle;
  const collectionJsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: sidebarTitle,
    url: `https://peliglot.com/guides/${slug}`,
    description: collectionOneLiners[slug] ?? sidebarSubtitle,
    mainEntity: {
      '@type': 'CreativeWorkSeries',
      name: sidebarTitle,
      hasPart: guidesMeta.map(g => ({
        '@type': 'CreativeWork',
        name: g.title,
        position: g.id,
      })),
    },
  }), [slug, sidebarTitle, sidebarSubtitle, guidesMeta]);

  useRouteMeta({
    title: guideTitle,
    description: guideDescription,
    canonical: `/guides/${slug}`,
    type: 'website',
    jsonLd: collectionJsonLd,
  });

  return (
    <div style={{
      height: '100dvh', display: 'flex', flexDirection: 'column',
      background: theme.bg, fontFamily: theme.outerFont,
      overflow: 'hidden', position: 'relative', color: theme.textPrimary,
    }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:${theme.scrollbarThumb};border-radius:4px}
        *:focus-visible{outline:2px solid ${theme.focusColor};outline-offset:2px;border-radius:4px}
        .skip-link{position:absolute;top:-40px;left:0;background:${theme.focusColor};color:#fff;padding:8px 16px;z-index:100;font-size:14px;text-decoration:none;border-radius:0 0 8px 0}
        .skip-link:focus{top:0}
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <GuideNav
        page={page}
        total={total}
        meta={meta}
        menuOpen={menuOpen}
        hamburgerRef={hamburgerRef}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        onPrev={prev}
        onNext={next}
        onOpenSearch={openSearch}
        theme={theme}
      />

      <main id="main-content" role="main" ref={contentRef} style={{ flex: 1, overflow: 'auto', padding: `${spacing.lg}px`, position: 'relative' }}>
        <div key={page} style={{ animation: 'fadeIn 0.2s ease', maxWidth: 700, margin: '0 auto', fontFamily: theme.contentFont }}>
          <ErrorBoundary>
            <GuideComp />
          </ErrorBoundary>

          {/* Cross-links: related guides in same category */}
          {crossLinks.length > 0 && (
            <div style={{ marginTop: spacing.xxl, display: 'flex', gap: spacing.sm, flexWrap: 'wrap', justifyContent: 'center' }}>
              {crossLinks.map(g => (
                <button key={g.id} onClick={() => goTo(g.id - 1)} style={{
                  padding: '6px 14px', borderRadius: radii.pill, border: `1px solid ${theme.borderColor}`,
                  background: theme.buttonBg, cursor: 'pointer', fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.semibold,
                  color: theme.textSecondary, display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span>{g.icon}</span> {g.subtitle}
                </button>
              ))}
            </div>
          )}

          {/* End-of-collection panel */}
          {page === total - 1 && (
            <div style={{
              marginTop: spacing.xxxl, padding: spacing.xxl, borderRadius: radii.xxxl,
              border: `1px solid ${theme.borderColor}`, background: theme.buttonBg,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: spacing.sm }}>{'🎉'}</div>
              <div style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.extrabold, color: theme.textPrimary, marginBottom: spacing.xs }}>
                You{"'"}ve reached the end!
              </div>
              <div style={{ fontSize: typography.fontSize.base, color: theme.textSecondary, marginBottom: spacing.lg }}>
                {visitedSet.size}/{total} guides visited in this collection.
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => goTo(0)} style={{
                  padding: '8px 18px', borderRadius: radii.lg, border: `1.5px solid ${theme.borderColor}`,
                  background: theme.buttonBg, cursor: 'pointer', fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold,
                  color: theme.textSecondary,
                }}>Start Over</button>
                {related && (
                  <Link to={`/guides/${related.slug}`} style={{
                    padding: '8px 18px', borderRadius: radii.lg, border: `1.5px solid ${meta.color}`,
                    background: meta.color, color: colors.text.white, fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.bold,
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    {related.icon} Explore {related.title}
                  </Link>
                )}
                <Link to="/" style={{
                  padding: '8px 18px', borderRadius: radii.lg, border: `1.5px solid ${theme.borderColor}`,
                  background: theme.buttonBg, color: theme.textSecondary, fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold,
                  textDecoration: 'none',
                }}>All Guides</Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* OVERLAY */}
      {menuOpen && <div onClick={() => setMenuOpen(false)} aria-hidden="true" style={{ position: 'fixed', inset: 0, background: theme.overlayBg, zIndex: 20 }} />}

      <GuideSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        focusSearch={focusSearch}
        onFocusSearchConsumed={() => setFocusSearch(false)}
        returnFocusRef={hamburgerRef}
        guidesMeta={guidesMeta}
        categories={categories}
        catColors={catColors}
        page={page}
        visitedSet={visitedSet}
        goTo={goTo}
        theme={theme}
        sidebarTitle={sidebarTitle}
        sidebarSubtitle={sidebarSubtitle}
      />
    </div>
  );
}
