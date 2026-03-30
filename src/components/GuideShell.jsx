import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGuideNavigation } from '../hooks/useGuideNavigation';
import { lightTheme } from '../styles/themes';

// Update this map when adding new guide collections
const relatedCollections = {
  spanish: { slug: 'english', title: 'American English', icon: '\u{1F1FA}\u{1F1F8}' },
  english: { slug: 'spanish', title: 'Espa\u00f1ol', icon: '\u{1F1EA}\u{1F1F8}' },
  arabic: { slug: 'spanish', title: 'Espa\u00f1ol', icon: '\u{1F1EA}\u{1F1F8}' },
  german: { slug: 'english', title: 'American English', icon: '\u{1F1FA}\u{1F1F8}' },
  hawaiian: { slug: 'spanish', title: 'Espa\u00f1ol', icon: '\u{1F1EA}\u{1F1F8}' },
  music: { slug: 'jazz-guitar', title: 'Jazz Guitar', icon: '\u{1F3B8}' },
  'jazz-guitar': { slug: 'music', title: 'Music Theory', icon: '\u{1F3B9}' },
  math: { slug: 'ai-interaction', title: 'AI Interaction', icon: '\u{1F916}' },
  'ai-interaction': { slug: 'math', title: 'Math', icon: '\u{1F9EE}' },
};

function fuzzyScore(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return 100 - t.indexOf(q);
  let qi = 0, score = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      score += (ti === 0 || t[ti - 1] === ' ') ? 10 : 1;
      qi++;
    }
  }
  return qi === q.length ? score : 0;
}

function guideScore(g, query) {
  return Math.max(
    fuzzyScore(query, g.title) * 1.2,
    fuzzyScore(query, g.subtitle),
    fuzzyScore(query, g.cat) * 0.8
  );
}

export function GuideShell({
  guidesMeta,
  guideComponents,
  categories,
  catColors,
  theme = lightTheme,
  storageKey,
  sidebarTitle,
  sidebarSubtitle,
}) {
  const total = guidesMeta.length;
  const { page, menuOpen, setMenuOpen, contentRef, goTo, prev, next, visitedSet } = useGuideNavigation(total, storageKey, guidesMeta);
  const meta = guidesMeta[page];
  const GuideComp = guideComponents[page];

  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);
  const focusSearchRef = useRef(false);

  const crossLinks = useMemo(() => {
    const sameCat = guidesMeta.filter(g => g.cat === meta.cat && g.id !== meta.id);
    return sameCat.length > 0 ? sameCat.slice(0, 2) : guidesMeta.filter(g => g.id !== meta.id).slice(0, 2);
  }, [guidesMeta, meta.cat, meta.id]);

  const searchResults = useMemo(() => {
    const q = searchTerm.trim();
    if (!q) return null;
    return guidesMeta
      .map(g => ({ ...g, score: guideScore(g, q) }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [searchTerm, guidesMeta]);

  useEffect(() => {
    if (menuOpen && focusSearchRef.current && searchRef.current) {
      searchRef.current.focus();
      focusSearchRef.current = false;
    }
    if (!menuOpen) setSearchTerm('');
  }, [menuOpen]);

  const openSearch = () => {
    focusSearchRef.current = true;
    setMenuOpen(true);
  };

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

      {/* TOP BAR */}
      <header role="banner" style={{
        background: theme.headerBg, borderBottom: `1px solid ${theme.borderColor}`,
        padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12,
        flexShrink: 0, zIndex: 10, fontFamily: theme.shellFont,
      }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open guide menu'}
          aria-expanded={menuOpen}
          aria-controls="sidebar-menu"
          style={{
            width: 36, height: 36, borderRadius: 10, border: `1.5px solid ${theme.borderColor}`,
            background: theme.buttonBg, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 18,
            color: theme.textMuted, flexShrink: 0,
          }}
        >
          {'\u2630'}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: theme.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: theme.shellFont }}>
            {meta.icon} {meta.subtitle}
          </div>
          <div style={{ fontSize: 12, color: theme.textSecondary, fontStyle: 'italic' }}>{meta.title}</div>
        </div>
        <div
          aria-label={`Guide ${page + 1} of ${total} guides`}
          style={{ background: meta.color, color: '#fff', padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700, flexShrink: 0, fontFamily: theme.shellFont }}
        >
          {page + 1}/{total}
        </div>
      </header>

      {/* CONTENT */}
      <main id="main-content" role="main" ref={contentRef} style={{ flex: 1, overflow: 'auto', padding: '16px', position: 'relative' }}>
        <div key={page} style={{ animation: 'fadeIn 0.2s ease', maxWidth: 700, margin: '0 auto', fontFamily: theme.contentFont }}>
          <GuideComp />

          {/* Cross-links: related guides in same category */}
          {crossLinks.length > 0 && (
            <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {crossLinks.map(g => (
                <button key={g.id} onClick={() => goTo(g.id - 1)} style={{
                  padding: '6px 14px', borderRadius: 20, border: `1px solid ${theme.borderColor}`,
                  background: theme.buttonBg, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  color: theme.textSecondary, display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span>{g.icon}</span> {g.subtitle}
                </button>
              ))}
            </div>
          )}

          {/* End-of-collection panel */}
          {page === total - 1 && (() => {
            const slug = storageKey.replace('peliglot-', '');
            const related = relatedCollections[slug];
            return (
              <div style={{
                marginTop: 32, padding: 24, borderRadius: 16,
                border: `1px solid ${theme.borderColor}`, background: theme.buttonBg,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{'\u{1F389}'}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: theme.textPrimary, marginBottom: 4 }}>
                  You{"'"}ve reached the end!
                </div>
                <div style={{ fontSize: 13, color: theme.textSecondary, marginBottom: 16 }}>
                  {visitedSet.size}/{total} guides visited in this collection.
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => goTo(0)} style={{
                    padding: '8px 18px', borderRadius: 10, border: `1.5px solid ${theme.borderColor}`,
                    background: theme.buttonBg, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    color: theme.textSecondary,
                  }}>Start Over</button>
                  {related && (
                    <Link to={`/guides/${related.slug}`} style={{
                      padding: '8px 18px', borderRadius: 10, border: `1.5px solid ${meta.color}`,
                      background: meta.color, color: '#fff', fontSize: 13, fontWeight: 700,
                      textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      {related.icon} Explore {related.title}
                    </Link>
                  )}
                  <Link to="/" style={{
                    padding: '8px 18px', borderRadius: 10, border: `1.5px solid ${theme.borderColor}`,
                    background: theme.buttonBg, color: theme.textSecondary, fontSize: 13, fontWeight: 600,
                    textDecoration: 'none',
                  }}>All Guides</Link>
                </div>
              </div>
            );
          })()}
        </div>
      </main>

      {/* BOTTOM NAV */}
      <nav role="navigation" aria-label="Guide navigation" style={{
        background: theme.headerBg, borderTop: `1px solid ${theme.borderColor}`,
        padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0, fontFamily: theme.shellFont,
      }}>
        <button
          onClick={prev} disabled={page === 0} aria-label="Previous guide"
          style={{
            padding: '8px 20px', borderRadius: 10, border: `1.5px solid ${theme.borderColor}`,
            background: page === 0 ? theme.buttonDisabledBg : theme.buttonBg,
            color: page === 0 ? theme.buttonDisabledText : theme.buttonText,
            fontSize: 13, fontWeight: 700, cursor: page === 0 ? 'default' : 'pointer',
          }}
        >
          {'\u2190'} Prev
        </button>
        <button
          onClick={openSearch}
          aria-label="Search guides"
          style={{
            width: 36, height: 36, borderRadius: 10, border: `1.5px solid ${theme.borderColor}`,
            background: theme.buttonBg, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 16,
            color: theme.textMuted, flexShrink: 0,
          }}
        >
          {'\u2315'}
        </button>
        <button
          onClick={next} disabled={page === total - 1} aria-label="Next guide"
          style={{
            padding: '8px 20px', borderRadius: 10, border: `1.5px solid ${theme.borderColor}`,
            background: page === total - 1 ? theme.buttonDisabledBg : theme.buttonBg,
            color: page === total - 1 ? theme.buttonDisabledText : theme.buttonText,
            fontSize: 13, fontWeight: 700, cursor: page === total - 1 ? 'default' : 'pointer',
          }}
        >
          Next {'\u2192'}
        </button>
      </nav>

      {/* OVERLAY */}
      {menuOpen && <div onClick={() => setMenuOpen(false)} aria-hidden="true" style={{ position: 'fixed', inset: 0, background: theme.overlayBg, zIndex: 20 }} />}

      {/* SIDE MENU */}
      <aside
        id="sidebar-menu" role="navigation" aria-label="Guide list"
        onKeyDown={e => {
          if (e.key === 'Escape') {
            if (searchTerm) { setSearchTerm(''); searchRef.current?.focus(); }
            else setMenuOpen(false);
          }
        }}
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, width: 280,
          background: theme.sidebarBg, zIndex: 30,
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease',
          boxShadow: menuOpen ? '4px 0 24px rgba(0,0,0,0.15)' : 'none',
          display: 'flex', flexDirection: 'column', fontFamily: theme.shellFont,
        }}
      >
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.borderColor}`, flexShrink: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: theme.textPrimary }}>{sidebarTitle}</div>
          <div style={{ fontSize: 12, color: theme.textSecondary }}>{sidebarSubtitle}</div>
        </div>
        <div style={{ padding: '8px 12px', flexShrink: 0, borderBottom: `1px solid ${theme.borderColor}`, position: 'relative' }}>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search guides..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '7px 28px 7px 10px', fontSize: 16,
              border: `1.5px solid ${theme.borderColor}`, borderRadius: 8,
              background: theme.buttonBg, color: theme.textPrimary,
              outline: 'none', fontFamily: theme.shellFont,
            }}
          />
          {searchTerm && (
            <button
              onClick={() => { setSearchTerm(''); searchRef.current?.focus(); }}
              aria-label="Clear search"
              style={{
                position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)',
                border: 'none', background: 'none', cursor: 'pointer',
                fontSize: 14, color: theme.textSecondary, padding: 2, lineHeight: 1,
              }}
            >{'\u00d7'}</button>
          )}
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
          {searchResults !== null ? (
            searchResults.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: theme.textSecondary, fontSize: 13 }}>
                No guides found
              </div>
            ) : (
              searchResults.map(g => {
                const idx = g.id - 1;
                const isActive = idx === page;
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
                    <span style={{ fontSize: 14, width: 22, textAlign: 'center' }}>{g.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 13, fontWeight: isActive ? 800 : 600,
                        color: isActive ? (theme.sidebarItemActiveText || g.color) : theme.sidebarItemText,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {g.subtitle}
                      </div>
                      <div style={{ fontSize: 10, color: theme.sidebarSubText, fontStyle: 'italic' }}>{g.title}</div>
                    </div>
                    <span style={{
                      fontSize: 9, fontWeight: 700, color: catColors[g.cat],
                      background: catColors[g.cat] + '18', padding: '1px 6px',
                      borderRadius: 4, whiteSpace: 'nowrap',
                    }}>{g.cat}</span>
                  </button>
                );
              })
            )
          ) : (
            categories.map(cat => {
              const items = guidesMeta.filter(g => g.cat === cat);
              const catVisited = items.filter(g => visitedSet.has(g.id - 1)).length;
              return (
                <div key={cat}>
                  <div
                    role="heading" aria-level="2"
                    style={{ padding: '6px 20px', fontSize: 10, fontWeight: 700, color: catColors[cat], textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>{cat}</span>
                    {catVisited > 0 && (
                      <span style={{ fontSize: 9, fontWeight: 600, color: theme.textSecondary, textTransform: 'none', letterSpacing: 0 }}>
                        {catVisited}/{items.length}
                      </span>
                    )}
                  </div>
                  {items.map(g => {
                    const idx = g.id - 1;
                    const isActive = idx === page;
                    const isVisited = visitedSet.has(idx);
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
                        <span style={{ fontSize: 14, width: 22, textAlign: 'center' }}>{g.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: 13, fontWeight: isActive ? 800 : 600,
                            color: isActive ? (theme.sidebarItemActiveText || g.color) : theme.sidebarItemText,
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          }}>
                            {g.subtitle}
                          </div>
                          <div style={{ fontSize: 10, color: theme.sidebarSubText, fontStyle: 'italic' }}>{g.title}</div>
                        </div>
                        {isVisited && !isActive ? (
                          <span style={{ fontSize: 11, color: '#4CAF50', fontWeight: 700 }}>{'\u2713'}</span>
                        ) : (
                          <span style={{ fontSize: 10, color: theme.buttonDisabledText, fontWeight: 600 }}>{g.id}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </aside>
    </div>
  );
}
