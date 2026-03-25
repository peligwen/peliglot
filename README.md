# Peliglot

**Interactive learning guides you can flip through.**

Free, open-source visual guides for languages and music theory. No accounts, no ads, no tracking. Just open and learn.

---

## Guides

### Languages

| Guide | Description | Count |
|-------|-------------|-------|
| 🇪🇸 **Spanish** | Pronunciation, all major verb tenses, noun gender/plurals, pronouns, ser vs estar, por vs para, sentence structure, numbers, formality, and false cognates. Mexican/US Spanish where applicable. | 27 guides |
| 🇵🇸 **Arabic** | The full writing system (alphabet, diacritics, connected writing), phonology, noun system (gender, plurals, case, iḍāfa), pronouns, verb forms I–X, sentence structure, and the root system. Palestinian dialect notes throughout. | 30 guides |
| 🇺🇸 **American English** | Inglés americano para hispanohablantes — sounds, verbs, articles, phrasal verbs, and more. Chattanooga dialect notes. | 35 guides |
| 🇩🇪 **German** | Cases, gender, word order, verb brackets, compound nouns, adjective endings, and modal particles. | 33 guides |
| 🌺 **Hawaiian** | The 13-letter alphabet, ʻokina & kahakō, VSO sentence structure, the O/A possessive class system, personal pronouns (with dual and inclusive/exclusive we), TAM markers, directional particles, and cultural context including language revival. | 30 guides |
| 🇫🇷 **French** | Pronunciation, nasal vowels, liaison, articles, verb tenses (present through subjunctive), pronouns, negation, comparisons, formality (tu/vous), false friends, and regional French. | 30 guides |
| 🇯🇵 **Japanese** | Hiragana, katakana, basic kanji, sentence structure (SOV), particles, verb groups, te-form, adjectives, politeness levels, counters, onomatopoeia, and loanwords. | 30 guides |
| 🇧🇷 **Portuguese** | Brazilian Portuguese pronunciation, nasal vowels, verb tenses, ser vs estar, personal infinitive, pronouns, prepositions — with Spanish comparison notes and European Portuguese variants. | 30 guides |

### Beyond Language

| Guide | Description | Count |
|-------|-------------|-------|
| 🎹 **Music Theory** | Notes, scales, chords, rhythm, progressions, melody, and genre — with interactive piano and playable audio. | 30 guides |
| 🎸 **Jazz Guitar** | Voice leading, chord voicings, comping, improvisation, and jazz standards — for experienced musicians. | 30 guides |
| 🧮 **Math** | Number sense, algebra, geometry, growth, data, and personal finance — interactive visual guides. | 32 guides |
| 🎼 **Music Theory II** | Extended harmony, modulation, counterpoint, form analysis, orchestration, and 20th-century techniques — with playable audio. | 30 guides |
| 📊 **Statistics** | Descriptive stats, probability, distributions, hypothesis testing, regression, and data literacy — interactive visualizations. | 30 guides |
| 💻 **Programming** | Variables, control flow, functions, data structures, algorithms, and patterns — visual, language-agnostic approach. | 30 guides |

## How It Works

Each guide is a single self-contained HTML file with React rendered client-side. No build step, no server, no dependencies to install.

- **Prev/Next buttons** to flip through guides sequentially
- **Arrow keys** for keyboard navigation
- **Dot indicators** to jump to any guide
- **Sidebar menu** with categorized navigation
- **Interactive elements** — tap letters, toggle views, expand sections

## Hosting

The site is static HTML — deploy anywhere:

- **Cloudflare Workers** (configured via `wrangler.jsonc`)
- **GitHub Pages**: Enable Pages in repo settings, set source to `main` branch, root folder
- **Netlify**: Drag and drop the repo folder
- **Any web server**: Just serve the files

## Local Development

No build step needed. Just open `index.html` in a browser:

```bash
git clone https://github.com/YOUR_USERNAME/peliglot.git
cd peliglot
open index.html
```

Or use a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Project Structure

```
peliglot/
├── index.html              # Landing page
├── wrangler.jsonc           # Cloudflare Workers config
├── guides/
│   ├── spanish.html         # 27 Spanish grammar guides
│   ├── arabic.html          # 30 Arabic grammar guides
│   ├── english.html         # 35 American English guides
│   ├── german.html          # 33 German grammar guides
│   ├── hawaiian.html        # 30 Hawaiian grammar guides
│   ├── french.html          # 30 French grammar guides
│   ├── japanese.html        # 30 Japanese language guides
│   ├── portuguese.html      # 30 Portuguese grammar guides
│   ├── music.html           # 30 Music theory guides
│   ├── jazz-guitar.html     # 30 Jazz guitar guides
│   ├── math.html            # 32 Math guides
│   ├── music2.html          # 30 Advanced music theory guides
│   ├── statistics.html      # 30 Statistics guides
│   └── programming.html     # 30 Programming fundamentals guides
└── README.md
```

## Contributing

Suggestions, corrections, and new language additions are welcome. Open an issue or submit a PR.

## License

MIT — free to use, modify, and distribute.
