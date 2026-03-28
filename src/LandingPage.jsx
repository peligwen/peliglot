import { Link } from 'react-router-dom';
import './styles/landing.css';

const guides = [
  { section: 'Languages', items: [
    { slug: 'spanish', accent: '#C62828', icon: '\u{1F1EA}\u{1F1F8}', title: 'Espa\u00f1ol', sub: 'Spanish grammar from pronunciation to false cognates. Mexican/US Spanish when applicable.', count: '33 guides' },
    { slug: 'arabic', accent: '#1B5E20', icon: '\u{1F1F5}\u{1F1F8}', title: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', sub: 'Arabic writing system, grammar, and verb forms. Palestinian dialect notes throughout.', count: '30 guides' },
    { slug: 'english', accent: '#1565C0', icon: '\u{1F1FA}\u{1F1F8}', title: 'American English', sub: 'Ingl\u00e9s americano para hispanohablantes. Sonidos, verbos, art\u00edculos, phrasal verbs. Notas de Chattanooga.', count: '35 gu\u00edas' },
    { slug: 'german', accent: '#1a1a1a', icon: '\u{1F1E9}\u{1F1EA}', title: 'Deutsch', sub: 'Cases, gender, word order, verb brackets, compound nouns, adjective endings, and modal particles.', count: '33 guides' },
    { slug: 'hawaiian', accent: '#00695C', icon: '\u{1F33A}', title: '\u02BBOlelo Hawai\u02BBi', sub: 'Hawaiian sounds, sentence patterns, possessives, and cultural context. With language revival notes.', count: '30 guides' },
    { slug: 'french', accent: '#1A237E', icon: '\u{1F1EB}\u{1F1F7}', title: 'Fran\u00e7ais', sub: 'Pronunciation, articles, verb tenses, pronouns, negation, and French culture \u2014 with audio.', count: 'Coming soon', soon: true },
    { slug: 'japanese', accent: '#D32F2F', icon: '\u{1F1EF}\u{1F1F5}', title: '\u65E5\u672C\u8A9E', sub: 'Hiragana, katakana, kanji, particles, verb forms, politeness levels, and cultural context.', count: 'Coming soon', soon: true },
    { slug: 'portuguese', accent: '#00695C', icon: '\u{1F1E7}\u{1F1F7}', title: 'Portugu\u00eas', sub: 'Brazilian Portuguese pronunciation, grammar, and verb tenses \u2014 with Spanish comparison notes throughout.', count: 'Coming soon', soon: true },
  ]},
  { section: 'Beyond Language', items: [
    { slug: 'music', accent: 'linear-gradient(180deg, #C62828, #1565C0)', icon: '\u{1F3B9}', title: 'Music Theory', sub: 'Notes, scales, chords, rhythm, progressions, melody, and genre \u2014 with interactive piano and playable audio.', count: '30 guides' },
    { slug: 'jazz-guitar', accent: 'linear-gradient(180deg, #8D6E63, #3E2723)', icon: '\u{1F3B8}', title: 'Jazz Guitar', sub: 'Voice leading, chord voicings, comping, improvisation, and jazz standards \u2014 for experienced musicians.', count: '30 guides' },
    { slug: 'math', accent: 'linear-gradient(180deg, #1565C0, #2E7D32)', icon: '\u{1F9EE}', title: 'Math', sub: 'Number sense, algebra, geometry, growth, data, and personal finance \u2014 32 interactive guides.', count: '32 guides' },
    { slug: 'ai-interaction', accent: 'linear-gradient(180deg, #1565C0, #6A1B9A)', icon: '\u{1F916}', title: 'AI Interaction', sub: 'Prompt engineering, tokens, agents, ethics, and practical skills for working with AI \u2014 25 interactive guides.', count: '25 guides' },
    { slug: 'music2', accent: 'linear-gradient(180deg, #7B1FA2, #1565C0)', icon: '\u{1F3BC}', title: 'Music Theory II', sub: 'Extended harmony, modulation, counterpoint, form analysis, orchestration, and 20th-century techniques \u2014 with playable audio.', count: 'Coming soon', soon: true },
    { slug: 'statistics', accent: 'linear-gradient(180deg, #E65100, #1565C0)', icon: '\u{1F4CA}', title: 'Statistics', sub: 'Descriptive stats, probability, distributions, hypothesis testing, regression, and data literacy \u2014 interactive visualizations.', count: 'Coming soon', soon: true },
    { slug: 'programming', accent: 'linear-gradient(180deg, #2E7D32, #1565C0)', icon: '\u{1F4BB}', title: 'Programming', sub: 'Variables, control flow, functions, data structures, algorithms, and patterns \u2014 visual, language-agnostic approach.', count: 'Coming soon', soon: true },
  ]},
];

export function LandingPage() {
  return (
    <>
      <a href="#guides" className="skip-link">Skip to content</a>
      <header role="banner" className="hero">
        <div className="logo">Peliglot</div>
        <h1>Learn <em>visually</em></h1>
        <p className="subtitle">
          Interactive guides for languages and more.
          No accounts, no ads, no tracking. Just open and learn.
        </p>
        <span className="tag">Free & Open Source</span>
        <div style={{ marginTop: 20, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          <input
            type="search" id="guide-search" placeholder="Search guides..."
            aria-label="Search guides"
            className="search-input"
            onChange={(e) => {
              const q = e.target.value.toLowerCase().trim();
              document.querySelectorAll('.guide-card').forEach(card => {
                card.style.display = card.textContent.toLowerCase().includes(q) || q === '' ? '' : 'none';
              });
              document.querySelectorAll('.section-label').forEach(label => {
                let next = label.nextElementSibling;
                let hasVisible = false;
                while (next && !next.classList.contains('section-label')) {
                  if (next.classList.contains('guide-card') && next.style.display !== 'none') hasVisible = true;
                  next = next.nextElementSibling;
                }
                label.style.display = hasVisible || q === '' ? '' : 'none';
              });
            }}
          />
        </div>
      </header>

      <main id="guides" role="main" className="guides">
        {guides.map(section => (
          <div key={section.section}>
            <h2 className="section-label">{section.section}</h2>
            {section.items.map(g => g.soon ? (
              <div key={g.slug} className="guide-card" style={{ opacity: 0.5, cursor: 'default' }} aria-label={`${g.title} \u2014 ${g.count}`}>
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
              <Link key={g.slug} to={`/guides/${g.slug}`} className="guide-card" aria-label={`${g.title} \u2014 ${g.count}`}>
                <div className="card-accent" style={{ background: g.accent }} />
                <div className="card-body">
                  <div className="card-icon">{g.icon}</div>
                  <div className="card-text">
                    <div className="card-title">{g.title}</div>
                    <div className="card-sub">{g.sub}</div>
                  </div>
                  <div className="card-count">{g.count}</div>
                  <div className="card-arrow">{'\u2192'}</div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </main>

      <footer className="footer" role="contentinfo">
        <p>Built with care. All content is free to use.</p>
        <p style={{ marginTop: 8 }}><a href="https://github.com/peligwen/peliglot">View on GitHub</a></p>
      </footer>
    </>
  );
}
