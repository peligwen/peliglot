# Peliglot

**Interactive language learning guides you can flip through.**

Free, open-source visual grammar references for Spanish, Arabic, and Hawaiian. No accounts, no ads, no tracking. Just open and learn.

🌐 **[Live Site →](https://YOUR_USERNAME.github.io/peliglot/)**

---

## Languages

### 🇪🇸 Spanish (25 guides)
Covers pronunciation, all major verb tenses, noun gender/plurals, pronouns, ser vs estar, por vs para, sentence structure, numbers, formality, and false cognates. Leans toward Mexican/US Spanish where applicable.

### 🇵🇸 Arabic (30 guides)
The full writing system (alphabet, diacritics, connected writing), phonology, noun system (gender, plurals, case, iḍāfa), pronouns, verb forms I–X, sentence structure, and the root system. Includes Palestinian Arabic dialect notes throughout.

### 🌺 Hawaiian (30 guides)
The 13-letter alphabet, ʻokina & kahakō, VSO sentence structure, the O/A possessive class system, personal pronouns (with dual and inclusive/exclusive we), TAM markers, directional particles, and cultural context including language revival.

## How It Works

Each language guide is a single self-contained HTML file with React rendered client-side. No build step, no server, no dependencies to install.

- **Prev/Next buttons** to flip through guides sequentially
- **Arrow keys** for keyboard navigation
- **Dot indicators** to jump to any guide
- **☰ Sidebar menu** with categorized navigation
- **Interactive elements** — tap letters, toggle views, expand sections

## Hosting

The site is static HTML — deploy anywhere:

- **GitHub Pages** (recommended): Enable Pages in repo settings, set source to `main` branch, root folder
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
├── guides/
│   ├── spanish.html        # 25 Spanish grammar guides
│   ├── arabic.html         # 30 Arabic grammar guides
│   └── hawaiian.html       # 30 Hawaiian grammar guides
└── README.md
```

## Contributing

Suggestions, corrections, and new language additions are welcome. Open an issue or submit a PR.

## License

MIT — free to use, modify, and distribute.
