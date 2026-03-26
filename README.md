# Peliglot

**Interactive learning guides you can flip through.**

Free, open-source visual guides for languages and music theory. No accounts, no ads, no tracking. Just open and learn.

**Live site: [peliglot.com](https://peliglot.com)**

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

### Beyond Language

| Guide | Description | Count |
|-------|-------------|-------|
| 🎹 **Music Theory** | Notes, scales, chords, rhythm, progressions, melody, and genre — with interactive piano and playable audio. | 30 guides |
| 🎸 **Jazz Guitar** | Voice leading, chord voicings, comping, improvisation, and jazz standards — for experienced musicians. | 30 guides |
| 🧮 **Math** | Number sense, algebra, geometry, growth, data, and personal finance — interactive visual guides. | 32 guides |

### Coming Soon

- 🇫🇷 **French** — Pronunciation, nasal vowels, liaison, articles, verb tenses, pronouns, negation, comparisons, formality, and regional French.
- 🇯🇵 **Japanese** — Hiragana, katakana, basic kanji, sentence structure, particles, verb groups, te-form, adjectives, politeness levels, counters, and loanwords.
- 🇧🇷 **Portuguese** — Brazilian Portuguese pronunciation, nasal vowels, verb tenses, ser vs estar, personal infinitive, pronouns, and prepositions.
- 🎼 **Music Theory II** — Extended harmony, modulation, counterpoint, form analysis, orchestration, and 20th-century techniques.
- 📊 **Statistics** — Descriptive stats, probability, distributions, hypothesis testing, regression, and data literacy.
- 💻 **Programming** — Variables, control flow, functions, data structures, algorithms, and patterns.

## How It Works

Peliglot is a Vite + React single-page application. Each guide collection is a self-contained module under `src/guides/` that is lazy-loaded via React Router. Shared components (navigation shell, cards, expandable sections) keep the guides consistent.

- **Prev/Next buttons** to flip through guides sequentially
- **Arrow keys** for keyboard navigation
- **Dot indicators** to jump to any guide
- **Sidebar menu** with categorized navigation
- **Interactive elements** — tap letters, toggle views, expand sections
- **Speech synthesis** for language guides
- **Audio playback** via Tone.js for music guides
- **Dark/light themes** with accessibility support

## Hosting

Build with `npm run build`, which outputs a `dist/` folder you can deploy anywhere:

- **Cloudflare Workers** (configured via `wrangler.jsonc` — run `npm run deploy`)
- **GitHub Pages**: Enable Pages in repo settings, point to `dist/`
- **Netlify**: Set build command to `npm run build`, publish directory to `dist/`
- **Any web server**: Serve the `dist/` folder

## Local Development

```bash
git clone https://github.com/peligwen/peliglot.git
cd peliglot
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project Structure

```
peliglot/
├── index.html              # Vite entry HTML
├── vite.config.js          # Vite + React config
├── wrangler.jsonc           # Cloudflare Workers config
├── package.json
├── public/                  # Static assets & PWA manifest
├── src/
│   ├── main.jsx             # React entry point
│   ├── router.jsx           # React Router routes (lazy-loaded)
│   ├── LandingPage.jsx      # Guide discovery & search
│   ├── components/          # Shared UI (GuideShell, Card, DarkBox, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Audio & speech utilities
│   ├── guides/
│   │   ├── spanish/         # 27 guides
│   │   ├── arabic/          # 30 guides
│   │   ├── english/         # 35 guides
│   │   ├── german/          # 33 guides
│   │   ├── hawaiian/        # 30 guides
│   │   ├── music/           # 30 guides
│   │   ├── jazz-guitar/     # 30 guides
│   │   └── math/            # 32 guides
│   └── styles/              # Global CSS & theme definitions
└── README.md
```

## Contributing

Suggestions, corrections, and new language additions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for details, or open an issue / submit a PR.

## License

MIT — free to use, modify, and distribute.
