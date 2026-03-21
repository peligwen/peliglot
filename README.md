# Peliglot

**Interactive language learning guides you can flip through.**

Free, open-source visual grammar references for Spanish, Arabic, English (for Spanish speakers), German, and Hawaiian. No accounts, no ads, no tracking. Just open and learn.

---

## Languages

### 🇪🇸 Spanish (25 guides)
Covers pronunciation, all major verb tenses, noun gender/plurals, pronouns, ser vs estar, por vs para, sentence structure, numbers, formality, and false cognates. Leans toward Mexican/US Spanish where applicable.

### 🇵🇸 Arabic (30 guides)
The full writing system (alphabet, diacritics, connected writing), phonology, noun system (gender, plurals, case, iḍāfa), pronouns, verb forms I–X, sentence structure, and the root system. Includes Palestinian Arabic dialect notes throughout.

### 🇺🇸 American English — for Spanish speakers (35 guides)
All UI in Spanish. Pronunciation challenges, the full verb system (tenses, modals, conditionals, phrasal verbs), articles, countable/uncountable nouns, adjective order, prepositions, sentence structure, false friends, and practical/cultural guides. Chattanooga/Southern English dialect notes throughout.

### 🇩🇪 German (33 guides)
The four cases, two-way prepositions, grammatical gender with prediction patterns, five plural types, compound nouns, adjective endings, the V2 word order rule, verb brackets, separable/inseparable prefixes, modal verbs, Perfekt vs Präteritum, Konjunktiv II, modal particles, and formal/informal register.

### 🌺 Hawaiian (30 guides)
The 13-letter alphabet, ʻokina & kahakō, VSO sentence structure, the O/A possessive class system, personal pronouns (with dual and inclusive/exclusive we), TAM markers, directional particles, and cultural context including language revival.

## Tech Stack

- **React** — UI components
- **Vite** — build tool
- **React Router** — client-side routing with lazy-loaded guides
- **Cloudflare Pages** — hosting

Each language guide is code-split into its own chunk for fast initial loads.

## Deployment (Cloudflare Pages)

1. Push this repo to GitHub
2. In Cloudflare Pages dashboard, connect the repo
3. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `18` (or higher)
4. Deploy

Cloudflare will automatically rebuild on each push.

## Local Development

```bash
git clone https://github.com/YOUR_USERNAME/peliglot.git
cd peliglot
npm install
npm run dev
```

Open `http://localhost:5173`

## Project Structure

```
peliglot/
├── index.html              # Vite entry point
├── package.json
├── vite.config.js
├── public/
│   └── _redirects          # Cloudflare SPA routing
├── src/
│   ├── main.jsx            # React mount
│   ├── App.jsx             # Router + landing page
│   └── guides/
│       ├── spanish.jsx     # 25 guides
│       ├── arabic.jsx      # 30 guides
│       ├── english.jsx     # 35 guides (UI in Spanish)
│       ├── german.jsx      # 33 guides
│       └── hawaiian.jsx    # 30 guides
└── README.md
```

## Contributing

Suggestions, corrections, and new language additions are welcome. Open an issue or submit a PR.

## License

MIT — free to use, modify, and distribute.
