import { useState, useEffect, useMemo, useRef } from 'react';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ProgressRing } from './components/ProgressRing';
import { readVisited } from './hooks/useProgress';
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
import './styles/landing.css';
import type { GuideMeta } from './types/guide';

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
    { slug: 'spanish', accent: '#C62828', icon: '\u{1F1EA}\u{1F1F8}', title: 'Español', sub: 'Spanish grammar from pronunciation to false cognates. Mexican/US Spanish when applicable.', count: '33 guides', total: 33 },
    { slug: 'arabic', accent: '#1B5E20', icon: '\u{1F1F5}\u{1F1F8}', title: 'العربية', sub: 'Arabic writing system, grammar, and verb forms. Palestinian dialect notes throughout.', count: '30 guides', total: 30 },
    { slug: 'english', accent: '#1565C0', icon: '\u{1F1FA}\u{1F1F8}', title: 'American English', sub: 'Inglés americano para hispanohablantes. Sonidos, verbos, artículos, phrasal verbs. Notas de Chattanooga.', count: '35 guías', total: 35 },
    { slug: 'german', accent: '#1a1a1a', icon: '\u{1F1E9}\u{1F1EA}', title: 'Deutsch', sub: 'Cases, gender, word order, verb brackets, compound nouns, adjective endings, and modal particles.', count: '33 guides', total: 33 },
    { slug: 'hawaiian', accent: '#00695C', icon: '\u{1F33A}', title: 'ʻOlelo Hawaiʻi', sub: 'Hawaiian sounds, sentence patterns, possessives, and cultural context. With language revival notes.', count: '30 guides', total: 30 },
    { slug: 'portuguese', accent: '#00695C', icon: '\u{1F1E7}\u{1F1F7}', title: 'Português', sub: 'Brazilian Portuguese pronunciation, grammar, and verb tenses — with Spanish comparison notes throughout.', count: 'Coming soon', soon: true },
  ]},
  { section: 'Beyond Language', items: [
    { slug: 'music', accent: 'linear-gradient(180deg, #C62828, #1565C0)', icon: '\u{1F3B9}', title: 'Music Theory', sub: 'Notes, scales, chords, rhythm, progressions, melody, and genre — with interactive piano and playable audio.', count: '30 guides', total: 30 },
    { slug: 'jazz-guitar', accent: 'linear-gradient(180deg, #8D6E63, #3E2723)', icon: '\u{1F3B8}', title: 'Jazz Guitar', sub: 'Voice leading, chord voicings, comping, improvisation, and jazz standards — for experienced musicians.', count: '30 guides', total: 30 },
    { slug: 'math', accent: 'linear-gradient(180deg, #1565C0, #2E7D32)', icon: '\u{1F9EE}', title: 'Math', sub: 'Number sense, algebra, geometry, growth, data, and personal finance — 32 interactive guides.', count: '32 guides', total: 32 },
    { slug: 'ai-interaction', accent: 'linear-gradient(180deg, #1565C0, #6A1B9A)', icon: '\u{1F916}', title: 'AI Interaction', sub: 'Prompt engineering, tokens, agents, ethics, and practical skills for working with AI — 28 interactive guides.', count: '28 guides', total: 28 },
    { slug: 'freecad', accent: 'linear-gradient(180deg, #0d1b2a, #e67e22)', icon: '\u{1F4D0}', title: 'FreeCAD', sub: 'Sketches, constraints, Part Design features, and 3D-printing workflow — a daily-session cheat sheet.', count: '30 guides', total: 30 },
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

function ResumeToast(): ReactElement | null {
  const [recent, setRecent] = useState<RecentActivity | null>(null);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    const activity = getRecentActivity();
    setRecent(activity);
    if (!activity) return;
    const timer = setTimeout(() => setDismissed(true), 8000);
    return () => clearTimeout(timer);
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

export function LandingPage(): ReactElement {
  const visitedCounts = useVisitedCounts();
  return (
    <>
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}@media(prefers-reduced-motion:reduce){.resume-toast{animation:none!important}}`}</style>
      <a href="#guides" className="skip-link">Skip to content</a>
      <header role="banner" className="hero">
        <div className="logo">Peliglot</div>
        <h1>Learn <em>visually</em></h1>
        <p className="subtitle">
          Interactive guides for languages and more.
          No accounts, no ads, no tracking. Just open and learn.
        </p>
        <GlobalSearch />
        <span className="tag" style={{ marginTop: 12 }}>Free & Open Source</span>
      </header>

      <main id="guides" role="main" className="guides">
        {guides.map(section => (
          <div key={section.section}>
            <h2 className="section-label">{section.section}</h2>
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
                <Link key={g.slug} to={`/guides/${g.slug}`} className="guide-card" aria-label={`${g.title} — ${g.count}`}>
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
              );
            })}
          </div>
        ))}
      </main>

      <footer className="footer" role="contentinfo">
        <p>Built with care. All content is free to use.</p>
        <p style={{ marginTop: 8 }}><a href="https://github.com/peligwen/peliglot">View on GitHub</a></p>
      </footer>

      <ResumeToast />
    </>
  );
}
