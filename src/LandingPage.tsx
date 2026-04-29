import { useState, useEffect, useMemo, useRef } from 'react';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ProgressRing } from './components/ProgressRing';
import { readVisited } from './hooks/useProgress';
import { useRouteMeta } from './hooks/useRouteMeta';
import { useMastery } from './hooks/useMastery';
import { guidesMeta as spanishMeta } from './guides/spanish/meta';
import { guidesMeta as arabicMeta } from './guides/arabic/meta';
import { guidesMeta as englishMeta } from './guides/english/meta';
import { guidesMeta as germanMeta } from './guides/german/meta';
import { guidesMeta as hawaiianMeta } from './guides/hawaiian/meta';
import { guidesMeta as musicMeta } from './guides/music/meta';
import { guidesMeta as jazzGuitarMeta } from './guides/jazz-guitar/meta';
import { guidesMeta as mathMeta } from './guides/math/meta';
import { guidesMeta as aiMeta } from './guides/ai-interaction/meta';
import { guidesMeta as freecadMeta } from './guides/freecad/meta';
import { SPANISH_CARD_COUNT } from './guides/spanish/mastery/index';
import { getRecommendation } from './mastery/recommendation';
import './styles/landing.css';
import type { GuideMeta } from './types/guide';
import { SITE_URL } from './config/site';
import {
  siteTagline,
  siteHeroPitch,
  siteFor,
  siteIsNot,
  sectionIntros,
  collectionOneLiners,
} from './copy/positioning';

interface CollectionEntry {
  slug: string;
  label: string;
  icon: string;
  meta: GuideMeta[];
}

const allGuideIndex: CollectionEntry[] = [
  { slug: 'spanish', label: 'Español', icon: '\u{1F1EA}\u{1F1F8}', meta: spanishMeta },
  { slug: 'arabic', label: 'العربية', icon: '\u{1F1F5}\u{1F1F8}', meta: arabicMeta },
  { slug: 'english', label: 'American English', icon: '\u{1F1FA}\u{1F1F8}', meta: englishMeta },
  { slug: 'german', label: 'Deutsch', icon: '\u{1F1E9}\u{1F1EA}', meta: germanMeta },
  { slug: 'hawaiian', label: 'ʻOlelo Hawaiʻi', icon: '\u{1F33A}', meta: hawaiianMeta },
  { slug: 'music', label: 'Music Theory', icon: '\u{1F3B9}', meta: musicMeta },
  { slug: 'jazz-guitar', label: 'Jazz Guitar', icon: '\u{1F3B8}', meta: jazzGuitarMeta },
  { slug: 'math', label: 'Math', icon: '\u{1F9EE}', meta: mathMeta },
  { slug: 'ai-interaction', label: 'AI Interaction', icon: '\u{1F916}', meta: aiMeta },
  { slug: 'freecad', label: 'FreeCAD', icon: '\u{1F4D0}', meta: freecadMeta },
];

interface SearchResult extends GuideMeta {
  slug: string;
  collectionLabel: string;
  collectionIcon: string;
  score: number;
}

function searchAllGuides(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];
  for (const collection of allGuideIndex) {
    for (const guide of collection.meta) {
      const titleMatch = (guide.title || '').toLowerCase().includes(q);
      const subMatch = (guide.subtitle || '').toLowerCase().includes(q);
      const catMatch = (guide.cat || '').toLowerCase().includes(q);
      if (titleMatch || subMatch || catMatch) {
        results.push({
          ...guide,
          slug: collection.slug,
          collectionLabel: collection.label,
          collectionIcon: collection.icon,
          score: titleMatch ? 3 : subMatch ? 2 : 1,
        });
      }
    }
  }
  return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

interface GuideCardItem {
  slug: string;
  accent: string;
  icon: string;
  title: string;
  sub: string;
  count: string;
  total?: number;
  soon?: boolean;
}

interface GuideSection {
  section: string;
  items: GuideCardItem[];
}

const guides: GuideSection[] = [
  { section: 'Languages', items: [
    { slug: 'spanish', accent: '#C62828', icon: '\u{1F1EA}\u{1F1F8}', title: 'Español', sub: collectionOneLiners.spanish, count: '33 guides', total: 33 },
    { slug: 'arabic', accent: '#1B5E20', icon: '\u{1F1F5}\u{1F1F8}', title: 'العربية', sub: collectionOneLiners.arabic, count: '30 guides', total: 30 },
    { slug: 'english', accent: '#1565C0', icon: '\u{1F1FA}\u{1F1F8}', title: 'American English', sub: collectionOneLiners.english, count: '35 guías', total: 35 },
    { slug: 'german', accent: '#1a1a1a', icon: '\u{1F1E9}\u{1F1EA}', title: 'Deutsch', sub: collectionOneLiners.german, count: '33 guides', total: 33 },
    { slug: 'hawaiian', accent: '#00695C', icon: '\u{1F33A}', title: 'ʻOlelo Hawaiʻi', sub: collectionOneLiners.hawaiian, count: '30 guides', total: 30 },
    { slug: 'portuguese', accent: '#00695C', icon: '\u{1F1E7}\u{1F1F7}', title: 'Português', sub: 'Brazilian Portuguese pronunciation, grammar, and verb tenses — with Spanish comparison notes throughout.', count: 'Coming soon', soon: true },
  ]},
  { section: 'Beyond Language', items: [
    { slug: 'music', accent: 'linear-gradient(180deg, #C62828, #1565C0)', icon: '\u{1F3B9}', title: 'Music Theory', sub: collectionOneLiners.music, count: '30 guides', total: 30 },
    { slug: 'jazz-guitar', accent: 'linear-gradient(180deg, #8D6E63, #3E2723)', icon: '\u{1F3B8}', title: 'Jazz Guitar', sub: collectionOneLiners['jazz-guitar'], count: '30 guides', total: 30 },
    { slug: 'math', accent: 'linear-gradient(180deg, #1565C0, #2E7D32)', icon: '\u{1F9EE}', title: 'Math', sub: collectionOneLiners.math, count: '32 guides', total: 32 },
    { slug: 'ai-interaction', accent: 'linear-gradient(180deg, #1565C0, #6A1B9A)', icon: '\u{1F916}', title: 'AI Interaction', sub: collectionOneLiners['ai-interaction'], count: '28 guides', total: 28 },
    { slug: 'freecad', accent: 'linear-gradient(180deg, #0d1b2a, #e67e22)', icon: '\u{1F4D0}', title: 'FreeCAD', sub: collectionOneLiners.freecad, count: '30 guides', total: 30 },
    { slug: 'music2', accent: 'linear-gradient(180deg, #7B1FA2, #1565C0)', icon: '\u{1F3BC}', title: 'Music Theory II', sub: 'Extended harmony, modulation, counterpoint, form analysis, orchestration, and 20th-century techniques — with playable audio.', count: 'Coming soon', soon: true },
  ]},
];

function getVisitedCount(slug: string): number {
  return readVisited(`peliglot-${slug}`).size;
}

interface RecentActivity {
  slug: string;
  page: number;
  title: string;
  icon: string;
  lastVisited: number;
}

function getRecentActivity(): RecentActivity | null {
  try {
    const raw = localStorage.getItem('peliglot-recent');
    if (!raw) return null;
    const data = JSON.parse(raw) as RecentActivity;
    if (Date.now() - data.lastVisited > 30 * 24 * 60 * 60 * 1000) return null;
    return data;
  } catch { return null; }
}

// ---------------------------------------------------------------------------
// SpanishRecommendationCTA — context-aware practice affordance for the
// Spanish card only. Isolated in its own subcomponent so useMastery runs
// in this subtree, not in the root LandingPage render.
// ---------------------------------------------------------------------------

// SPANISH_CARD_COUNT is imported as a plain constant so the landing page chunk
// does not pull in the full extractor pool. Maintained in index.ts.

function SpanishRecommendationCTA(): ReactElement {
  const { dueCards, todaysReviewCount, isHydrated } = useMastery();

  // Before hydration finishes we don't have reliable counts. Show the
  // static "Practice" fallback so the link is always present.
  if (!isHydrated) {
    return (
      <Link
        to="/guides/spanish/practice"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 12,
          fontWeight: 700,
          color: '#C62828',
          textDecoration: 'none',
          background: '#fff0f0',
          border: '1px solid #f5c6c6',
          borderRadius: 20,
          padding: '4px 12px',
          letterSpacing: 0.3,
        }}
        aria-label="Practice Spanish with spaced repetition"
      >
        <span aria-hidden="true">{'🎴'}</span> Practice
      </Link>
    );
  }

  const rec = getRecommendation({
    cardCount: SPANISH_CARD_COUNT,
    dueCount: dueCards.length,
    reviewedToday: todaysReviewCount,
  });

  if (rec.kind === 'caught-up') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: '#2E7D32', fontWeight: 600 }}>
          {'✓'} {rec.message}
        </span>
        <Link
          to={rec.ctaTarget}
          style={{
            fontSize: 11,
            color: '#888',
            textDecoration: 'underline',
            fontFamily: "system-ui,'Segoe UI',sans-serif",
          }}
        >
          Open practice anyway
        </Link>
      </div>
    );
  }

  return (
    <Link
      to={rec.ctaTarget}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 12,
        fontWeight: 700,
        color: '#C62828',
        textDecoration: 'none',
        background: '#fff0f0',
        border: '1px solid #f5c6c6',
        borderRadius: 20,
        padding: '4px 12px',
        letterSpacing: 0.3,
      }}
      aria-label="Practice Spanish with spaced repetition"
    >
      <span aria-hidden="true">{'🎴'}</span>{' '}
      {rec.kind === 'cold-start' ? 'Practice' : rec.message}
    </Link>
  );
}

function ResumeToast(): ReactElement | null {
  const [recent, setRecent] = useState<RecentActivity | null>(null);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    const activity = getRecentActivity();
    setRecent(activity);
    if (!activity) return;
    const timer = setTimeout(() => setDismissed(true), 8000);
    const onScroll = () => setDismissed(true);
    window.addEventListener('scroll', onScroll, { once: true, passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!recent || dismissed) return null;

  return (
    <Link
      to={`/guides/${recent.slug}#${recent.page}`}
      className="resume-toast"
      onClick={() => setDismissed(true)}
      style={{
        position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        background: '#1a1a1a', color: '#fff', padding: '12px 20px',
        borderRadius: 14, fontSize: 14, fontWeight: 600, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)', animation: 'toastIn 0.3s ease',
        maxWidth: 'calc(100vw - 40px)', whiteSpace: 'nowrap',
      }}
    >
      <span>{recent.icon}</span>
      <span>Continue {recent.title}</span>
      <span style={{ fontSize: 18 }}>{'→'}</span>
      <button
        onClick={e => { e.preventDefault(); e.stopPropagation(); setDismissed(true); }}
        aria-label="Dismiss"
        style={{
          background: 'none', border: 'none', color: '#888', cursor: 'pointer',
          fontSize: 16, padding: '0 0 0 4px', lineHeight: 1,
        }}
      >{'×'}</button>
    </Link>
  );
}

function GlobalSearch(): ReactElement {
  const [query, setQuery] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const results = useMemo(() => searchAllGuides(query), [query]);
  const showResults = focused && query.trim().length > 0;

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setFocused(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', maxWidth: 400, margin: '16px auto 0', zIndex: 5 }}>
      <input
        type="text"
        placeholder="Search all guides..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onKeyDown={e => { if (e.key === 'Escape') { setQuery(''); setFocused(false); } }}
        aria-label="Search all guides"
        role="combobox"
        aria-expanded={showResults}
        style={{
          width: '100%', padding: '10px 16px', fontSize: 15, borderRadius: 12,
          border: '1.5px solid #e0dcd5', background: '#fff', color: '#1a1a1a',
          outline: 'none', fontFamily: "'Source Sans 3', sans-serif",
        }}
      />
      {showResults && (
        <div role="listbox" aria-label="Search results" style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          background: '#fff', borderRadius: 12, border: '1px solid #e0dcd5',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)', overflow: 'hidden', zIndex: 10,
        }}>
          {results.length === 0 ? (
            <div style={{ padding: 16, textAlign: 'center', fontSize: 13, color: '#999' }}>No guides found</div>
          ) : (
            results.map((r, i) => (
              <Link
                key={`${r.slug}-${r.id}`}
                to={`/guides/${r.slug}#${r.id - 1}`}
                role="option"
                onClick={() => { setQuery(''); setFocused(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
                  textDecoration: 'none', color: '#1a1a1a', fontSize: 13,
                  borderTop: i > 0 ? '1px solid #f0eeeb' : 'none',
                }}
              >
                <span style={{ fontSize: 16 }}>{r.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.subtitle}</div>
                  <div style={{ fontSize: 11, color: '#999' }}>{r.collectionIcon} {r.collectionLabel}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function useVisitedCounts(): Record<string, number> {
  return useMemo(() => {
    const counts: Record<string, number> = {};
    for (const section of guides) {
      for (const g of section.items) {
        if (g.total) counts[g.slug] = getVisitedCount(g.slug);
      }
    }
    return counts;
  }, []);
}

const landingJsonLd: object[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Peliglot',
    url: SITE_URL,
    description:
      'Free interactive guides for languages and more. No ads, no accounts.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Peliglot',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
];

export function LandingPage(): ReactElement {
  const visitedCounts = useVisitedCounts();

  useRouteMeta({
    title: 'Peliglot — Interactive learning guides',
    description: siteTagline,
    canonical: '/',
    type: 'website',
    jsonLd: landingJsonLd,
    ogImage: `${SITE_URL}/og/site.png`,
  });

  return (
    <>
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}@media(prefers-reduced-motion:reduce){.resume-toast{animation:none!important}}`}</style>
      <a href="#guides" className="skip-link">Skip to content</a>
      <header role="banner" className="hero">
        <div className="logo">Peliglot</div>
        <h1>{siteHeroPitch}</h1>
        <p className="subtitle">{siteTagline}</p>
        <GlobalSearch />
        <span className="tag" style={{ marginTop: 12 }}>Free &amp; Open Source</span>
      </header>

      <div className="for-block" role="complementary" aria-label="Who this is for">
        <div className="for-col">
          <div className="for-heading">For people who</div>
          <ul className="for-list">
            {siteFor.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="for-col">
          <div className="for-heading">Not a</div>
          <ul className="for-list">
            {siteIsNot.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <main id="guides" role="main" className="guides">
        {guides.map(section => (
          <div key={section.section}>
            <div className="section-header">
              <h2 className="section-label">{section.section}</h2>
              <p className="section-intro">
                {section.section === 'Languages'
                  ? sectionIntros.Languages
                  : sectionIntros.BeyondLanguage}
              </p>
            </div>
            {section.items.map(g => {
              const visited = g.total ? (visitedCounts[g.slug] || 0) : 0;
              const progress = g.total ? visited / g.total : 0;
              const accentColor = g.accent.startsWith('linear') ? '#1565C0' : g.accent;
              return g.soon ? (
                <div key={g.slug} className="guide-card" style={{ opacity: 0.5, cursor: 'default' }} aria-label={`${g.title} — ${g.count}`}>
                  <div className="card-accent" style={{ background: g.accent }} />
                  <div className="card-body">
                    <div className="card-icon">{g.icon}</div>
                    <div className="card-text">
                      <div className="card-title">{g.title}</div>
                      <div className="card-sub">{g.sub}</div>
                    </div>
                    <div className="card-count">{g.count}</div>
                  </div>
                </div>
              ) : (
                <div key={g.slug}>
                  <Link to={`/guides/${g.slug}`} className="guide-card" aria-label={`${g.title} — ${g.count}`}>
                    <div className="card-accent" style={{ background: g.accent }} />
                    <div className="card-body">
                      <div className="card-icon">{g.icon}</div>
                      <div className="card-text">
                        <div className="card-title">{g.title}</div>
                        <div className="card-sub">{g.sub}</div>
                      </div>
                      {progress > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                          <ProgressRing progress={progress} size={32} strokeWidth={3} color={accentColor} />
                          <span style={{ fontSize: 11, fontWeight: 700, color: accentColor }}>{visited}/{g.total}</span>
                        </div>
                      ) : (
                        <div className="card-count">{g.count}</div>
                      )}
                      <div className="card-arrow">{'→'}</div>
                    </div>
                  </Link>
                  {g.slug === 'spanish' && (
                    <div style={{ padding: '0 0 4px 0', display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}>
                      <Link
                        to="/guides/spanish/conversation"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#1565C0',
                          textDecoration: 'none',
                          background: '#e3f0ff',
                          border: '1px solid #b0cfe8',
                          borderRadius: 20,
                          padding: '4px 12px',
                          letterSpacing: 0.3,
                        }}
                        aria-label="Conversation practice in Spanish"
                      >
                        <span aria-hidden="true">{'💬'}</span> Conversation
                      </Link>
                      <SpanishRecommendationCTA />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </main>

      <footer className="footer" role="contentinfo">
        <p>Built with care. All content is free to use. No accounts, no tracking.</p>
        <p style={{ marginTop: 8 }}>
          <a href="https://github.com/peligwen/peliglot">View on GitHub</a>
          <span style={{ margin: '0 8px', color: '#ccc' }}>·</span>
          <Link to="/support" style={{ color: '#999', textDecoration: 'none' }}>Support Peliglot</Link>
          <span style={{ margin: '0 8px', color: '#ccc' }}>·</span>
          <Link to="/analytics" style={{ color: '#999', textDecoration: 'none' }}>Privacy-respecting analytics</Link>
          <span style={{ margin: '0 8px', color: '#ccc' }}>·</span>
          <Link to="/settings" style={{ color: '#999', textDecoration: 'none' }}>Settings</Link>
        </p>
      </footer>

      <ResumeToast />
    </>
  );
}
