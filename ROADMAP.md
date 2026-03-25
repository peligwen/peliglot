# Peliglot Roadmap

A practical plan for improving the project, organized by effort and impact.

---

## Quality Review

### What works well

- **Self-contained architecture.** Each guide is a single HTML file with no build step. Clone and open — it just works.
- **Consistent structure.** Every guide follows the same pattern: metadata array, data definitions, shared components (Card, DarkBox, Insight), app shell with sidebar/navigation.
- **Thoughtful content.** Language guides include IPA transcriptions, dialect notes (Palestinian Arabic, Mexican Spanish, Chattanooga English), cultural context, and formality registers.
- **Interactive elements.** Speech synthesis in Spanish, Tone.js audio in Music Theory, sliders and filters across guides.
- **Broad scope.** 8 guides totaling 247 interactive lessons covering 5 languages, music theory, jazz guitar, and math.
- **Color-coded categories.** Each guide uses distinct accent colors for visual identity within its sidebar and cards.
- **No accounts, no tracking.** Respects users from the start.

### What needs work

- **README is out of date.** Lists 6 guides (missing Jazz Guitar and Math), says 25 Spanish guides (there are 27), and the total count is wrong.
- **index.html says "25 guides" for Spanish** but the file contains 27.
- **spanish.html data comment says "DATA FOR ALL 25 GUIDES"** but has 27 entries.
- **No accessibility.** Zero ARIA attributes across all files. `user-scalable=no` on every guide viewport meta prevents zoom. Color-dependent information has no text alternatives.
- **No Open Graph / SEO meta tags** on any page.
- **Shared components are copy-pasted** into each file with slight variations (e.g., Hawaiian Insight uses a hibiscus emoji instead of a lightbulb). No shared source of truth.
- **Inconsistent formatting.** Some files are well-formatted (spanish.html); others have compressed single-line styles (math.html).
- **CDN-only dependencies.** React 18.2, ReactDOM, Babel standalone, and Tone.js all load from cdnjs.cloudflare.com with no fallback or integrity hashes.
- **No tests, no CI/CD, no linting.**
- **No progress tracking.** Users cannot bookmark or resume where they left off.
- **No search** across guides.
- **No offline support** despite being ideal static PWA content.

---

## Phase 1 — Quick Wins

Low-effort fixes that improve accuracy and trust immediately.

- [x] **Fix README.md** — Add Jazz Guitar and Math to guide table and project structure; update Spanish count from 25 to 27; correct total to 247
- [x] **Fix index.html Spanish card** — Change "25 guides" to "27 guides"
- [x] **Fix spanish.html data comment** — Change "DATA FOR ALL 25 GUIDES" to "DATA FOR ALL 27 GUIDES"
- [x] **Remove `user-scalable=no`** from all 8 guide viewport meta tags (accessibility violation, blocks pinch-to-zoom)
- [x] **Add `lang` attribute** to each guide's `<html>` tag matching its content language (`es`, `ar`, `en`, `de`, `haw`, `en`)
- [x] **Add SRI hashes** to all CDN `<script>` tags (`integrity` + `crossorigin` attributes)
- [x] **Add Open Graph meta tags** (`og:title`, `og:description`, `og:type`) to index.html and all guides

---

## Phase 2 — Content Accuracy & Consistency

Fixes to content data and formatting that make the project reliable.

- [x] **Audit all guide counts** against their data arrays and update every reference (README, index.html, in-file comments) to match
- [x] **Normalize code formatting** — Pick a style (readable, not minified) and apply consistently across all 8 guide files; document the convention
- [x] **Standardize shared components** — Ensure Card, DarkBox, and Insight have identical signatures and styling across files (intentional per-guide variations like the Hawaiian hibiscus are fine, but document them)
- [x] **Add speech synthesis to more language guides** — Currently only spanish.html uses `speechSynthesis`; Arabic, German, Hawaiian, and English guides would benefit
- [x] **Add Tone.js audio to jazz-guitar.html** — Jazz Guitar currently has no audio playback despite being a music guide; Music Theory uses Tone.js and can serve as the reference implementation
- [x] **Review guides 26-27 in Spanish** (Calor, El Tiempo) — These were added after the original 25 and should be verified for consistency with earlier guides

---

## Phase 3 — Accessibility

Making the guides usable by everyone.

- [x] **Add ARIA labels** to all interactive elements (navigation buttons, sidebar toggle, guide cards, expandable sections)
- [x] **Add `role` attributes** to landmark regions (navigation, main content, sidebar)
- [x] **Ensure keyboard navigation works fully** — Tab order through sidebar items, Enter/Space to activate, Escape to close sidebar
- [x] **Add skip-to-content links** at the top of each guide
- [x] **Provide text alternatives** for all color-coded information (category colors should also have text labels)
- [x] **Test with screen readers** (VoiceOver, NVDA) and document findings
- [x] **Add `prefers-reduced-motion` media query** — Disable transitions/animations for users who request it
- [x] **Add `prefers-color-scheme: dark` support** — Guides already have a DarkBox component; extend to a full dark mode

---

## Phase 4 — Technical Infrastructure

Improvements to reliability, developer experience, and performance.

### Developer Experience
- [x] **Add a CONTRIBUTING.md** — Document the file structure, component conventions, how to add a new guide, and formatting rules
- [x] **Add a basic CI pipeline** (GitHub Actions) — HTML validation, link checking, file size monitoring
- [x] **Add a linter config** — At minimum, an `.editorconfig` for consistent indentation
- [x] **Add automated guide-count verification** — A CI check that parses each file's data array length and compares against documented counts

### Performance & Reliability
- [x] **Add CDN fallback loading** — If cdnjs fails, fall back to unpkg or jsdelivr (or local copies)
- [x] **Add `<link rel="preconnect">` for cdnjs.cloudflare.com** to reduce connection latency
- [x] **Evaluate Babel standalone removal** — Babel standalone is 2+ MB; consider precompiling JSX to `React.createElement` calls at authoring time, keeping the "no build step" ethos for deployment while reducing page weight
- [x] **Add error boundaries** to the React app in each guide so a single broken component does not crash the entire page

### Features
- [x] **Add localStorage progress tracking** — Save the last-visited guide index per file; show a "Resume" indicator on return
- [x] **Add search functionality to index.html** — Client-side search across guide titles, subtopics, and categories
- [x] **Add URL hash routing** — Allow linking directly to a specific guide (e.g., `spanish.html#15`) and update the hash on navigation
- [x] **Add PWA support** — Service worker for offline access, manifest.json, installable on mobile

---

## Phase 5 — Future Content

New guides and content expansion, once the foundation is solid.

- [x] **French** — High demand, well-resourced language, pairs naturally with the existing Spanish guide structure
- [x] **Japanese** — Writing systems (hiragana, katakana, kanji) would showcase the interactive component approach
- [x] **Portuguese** — Leverage the existing Spanish content structure; highlight differences
- [x] **Music Theory II** — Advanced topics: modulation, counterpoint, orchestration, form analysis
- [x] **Statistics** — Natural extension of the Math guide; data literacy is broadly useful
- [x] **Programming fundamentals** — The "language-as-metaphor" approach used in Math and Music could extend to teaching programming concepts visually

---

## Priorities

If time is limited, this is the order that maximizes impact:

1. **Phase 1 (Quick Wins)** — Fixes factual errors and accessibility violations. Mostly find-and-replace. Do this first.
2. **Phase 3 (Accessibility)** — Full ARIA/keyboard support. High impact for underserved users.
3. **Phase 2: speech synthesis + Tone.js** — Adding audio to Jazz Guitar and speech to more language guides dramatically improves the learning experience.
4. **Phase 4: progress tracking + URL hash routing** — Low-effort features that make the guides significantly more usable for returning learners.
5. **Everything else** follows naturally.
