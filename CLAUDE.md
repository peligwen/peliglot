# Peliglot — Claude Code Guide

## Project Overview

Interactive language learning guides built with React 18 + Vite. Each guide collection lives in `src/guides/{slug}/` and is lazy-loaded by React Router.

## Guide Generation Workflow

Generate guides **one at a time** using the per-guide file structure. Never try to generate an entire `components.jsx` monolith in one shot — it will time out.

### Step 1: Create the directory structure

```
src/guides/{slug}/
  meta.js
  index.jsx
  components.jsx          (barrel file)
  guides/
    _helpers.jsx           (language-specific helper components)
    guide1.jsx             (one file per guide)
    guide2.jsx
    ...
```

### Step 2: Generate `meta.js`

Small file (~30-50 lines). Contains `guidesMeta` array, `categories`, and `catColors`.

```js
export const guidesMeta = [
  { id: 1, title: "Title", subtitle: "Subtitle", cat: "Category", color: "#hex", icon: "emoji" },
  // ...
];
export const categories = ["Cat1", "Cat2", ...];
export const catColors = { Cat1: "#hex", Cat2: "#hex", ... };
```

### Step 3: Generate `index.jsx` (boilerplate)

Copy from any existing guide and change: storageKey, sidebarTitle, sidebarSubtitle, theme.

```jsx
import { GuideShell } from '../../components/GuideShell';
import { lightTheme } from '../../styles/themes';
import { guidesMeta, categories, catColors } from './meta';
import { guideComponents } from './components';

export function Component() {
  return (
    <GuideShell
      guidesMeta={guidesMeta}
      guideComponents={guideComponents}
      categories={categories}
      catColors={catColors}
      theme={lightTheme}
      storageKey="peliglot-{slug}"
      sidebarTitle="Guide Title"
      sidebarSubtitle="N Interactive Guides"
    />
  );
}
```

### Step 4: Generate `guides/_helpers.jsx`

Language-specific helper components shared across multiple guides. Examples:
- Custom `Insight` wrapper with language-specific emoji
- `CultureNote`, `Trampa`, `Chatt` components
- Shared data constants (pronoun arrays, color maps)

### Step 5: Generate each guide file individually

Each `guides/guideN.jsx` is a standalone file (~20-80 lines):

```jsx
import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { speak{Language} } from '../../../utils/speech';
import { HelperComponent } from './_helpers';

const data = [ /* guide-specific data */ ];

export function GuideN() {
  // component body using shared components + data
}
```

### Step 6: Update barrel `components.jsx` after each guide

```jsx
import { Guide1 } from './guides/guide1';
import { Guide2 } from './guides/guide2';
// ... add new imports as guides are created
export const guideComponents = [Guide1, Guide2, ...];
```

### Step 7: Register in router and landing page

- Add slug to `guideSlugs` array in `src/router.jsx`
- Add guide card to `src/LandingPage.jsx`
- Add `speak{Language}` to `src/utils/speech.js` if needed

## Available Templates

Templates in `src/components/templates/` reduce boilerplate for common guide patterns.

### AlphabetGrid

Interactive letter grid with filters and detail panel. Used for Guide1 in language guides.

```jsx
import { AlphabetGrid } from '../../../components/templates/AlphabetGrid';
import { speakLanguage } from '../../../utils/speech';

const letters = [
  { l: "A", sound: "/a/", note: "Like 'ah'" },
  // ...
];

export function Guide1() {
  return (
    <AlphabetGrid
      letters={letters}
      letterKey="l"
      nameKey="name"       // optional — field for subtitle under letter
      filterGroups={[
        { id: "all", label: "All", filterFn: () => true },
        { id: "vowel", label: "Vowels", filterFn: l => l.type === "vowel" },
      ]}
      detailFields={[
        { key: "sound" },  // first field shown in header
        { key: "note", label: "Tip", bgColor: "#F5F9F5", borderColor: "#D4E8D4", textColor: "#2E7D32" },
      ]}
      primaryColor="#1B5E20"
      speakFn={speakLanguage}
      introTitle="Section Title"
      introContent={<div>Intro text</div>}
      // Advanced props for custom guides:
      // renderDetail={(letter, {primaryColor, highlightColor}) => <JSX/>}  — fully custom detail panel
      // borderFn={l => l.tricky ? "2px solid #E65100" : null}             — per-letter border
      // badgeFn={l => l.tricky ? {color: "#E65100"} : null}               — dot indicator
      // gridProps={{direction: "rtl"}}                                      — extra grid styles (e.g. Arabic RTL)
    />
  );
}
```

### VerbConjugation

Pronoun-based verb conjugation table. Supports full Card mode and compact mini-table mode.

```jsx
import { VerbConjugation } from '../../../components/templates/VerbConjugation';

// Full mode — Card with title/subtitle
<VerbConjugation
  pronouns={["yo","tú","él/ella","nosotros","vosotros","ellos"]}
  stem="habl"
  endings={["o","as","a","amos","áis","an"]}
  verb="hablar"
  meaning="to speak"
  color="#D84315"
/>

// Compact mode — smaller rows, no Card wrapper
<VerbConjugation
  pronouns={["yo","tú","él","nos.","vos.","ellos"]}
  stem="habl"
  endings={["é","aste","ó","amos","asteis","aron"]}
  title="Pretérito"
  color="#B71C1C"
  compact
/>
```

### QuizSection

Multiple-choice quiz with scoring, visual feedback, and results screen.

```jsx
import { QuizSection } from '../../../components/templates/QuizSection';

const items = [
  { question: "It's hot", answer: "Hace calor", icon: "🌡️" },
  { question: "It's raining", answer: "Está lloviendo", icon: "🌧️" },
  // ...
];

<QuizSection
  items={items}
  answerKey="answer"         // field name for correct answer (default: "answer")
  renderQuestion={(q) => (   // custom question display
    <div>
      <div style={{fontSize:56}}>{q.icon}</div>
      <div style={{fontSize:17,fontWeight:700}}>{q.question}</div>
    </div>
  )}
  optionCount={4}            // number of choices (default: 4)
  color="#0277BD"            // accent color
  resultMessages={{          // optional custom result messages
    high: "¡Excelente!",
    mid: "¡Bien! Keep practicing.",
    low: "Review and try again."
  }}
/>
```

## Shared UI Components

All in `src/components/`:

| Component | Purpose | Usage |
|-----------|---------|-------|
| `Card` | Content section with colored header | `<Card color="#hex" title="Title">children</Card>` |
| `DarkBox` | Highlighted concept/intro box | `<DarkBox title="Title">children</DarkBox>` |
| `Insight` | Tip/hint callout with emoji | `<Insight text="tip text" emoji="emoji" />` |
| `SimpleGuide` | Q&A list from data array | `<SimpleGuide items={[{h:"heading",b:"body"}]} />` |
| `ExpandSection` | Collapsible section | `<ExpandSection title="Title" color="#hex">children</ExpandSection>` |
| `GuideShell` | Navigation wrapper (used in index.jsx only) | See Step 3 above |

## Conventions

- All styles are inline (no CSS modules, no Tailwind)
- Use `useState` for interactivity within guides
- Import speech functions from `../../utils/speech` (or `../../../utils/speech` from guide files)
- Guide functions are named `Guide1`, `Guide2`, etc. and exported as named exports
- The `guideComponents` array order must match `guidesMeta` order (indexed by page number)
- Hawaiian guide (`src/guides/hawaiian/`) is the reference implementation for the per-guide file structure

## CI Constraints

- Bundle size: each JS asset must be < 500KB
- Guide count: `meta.js` must have entries matching `{ *id:` pattern
- Build must produce `dist/index.html`

## Quick Validation Commands

| Command | What it does |
|---------|-------------|
| `npm run lint` | ESLint check — catches unused vars, missing imports, hooks violations |
| `npm run build` | Production build — verifies all imports resolve and produces `dist/` |
| `npm run validate` | Guide structure check — meta entries match file counts, all slugs registered |
| `npm run check` | Runs lint + build + validate in sequence |

## Bundle Size Debugging

- After build, check sizes: `ls -lh dist/assets/*.js`
- Each JS asset must be < 500KB (enforced by CI)
- Each guide collection lazy-loads independently via React Router, so adding guides to one collection doesn't affect other chunks
- `react-vendor` chunk is split out in `vite.config.js` via `manualChunks`
- If a chunk is too large, check for oversized inline data arrays or unnecessary imports in that guide's files

## Common Pitfalls

- `guideComponents` array in `components.jsx` must match `guidesMeta` order in `meta.js` (indexed by page number)
- After adding a new guide file, update **both** `components.jsx` (barrel import) and `meta.js` (metadata entry)
- New guide collections need entries in three places: `src/router.jsx` (`guideSlugs`), `src/LandingPage.jsx`, and optionally `src/utils/speech.js`
- All styles are inline — no CSS files, no Tailwind, no CSS modules
- Speech functions use the Web Speech API; available voices vary by platform

## Verifying Changes

Run `npm run check` before considering any change complete. This catches:
- Syntax errors and broken imports (via build)
- Unused variables and hooks violations (via lint)
- Missing guide files or registration gaps (via validate)

## Shared Component Contracts

The authoritative source of truth is always the component file itself. This section is a
quick-reference for anyone generating new guide content.

### `Card({ color, title, children })`

`src/components/Card.jsx` — a content section with a colored header bar.

```jsx
<Card color="#1B5E20" title="Section Title">
  {/* body content */}
</Card>
```

- `color` (string, required) — header background color.
- `title` (string, required) — header text.
- `children` — body content.

---

### `DarkBox({ title, children })`

`src/components/DarkBox.jsx` — a dark-background concept callout used at the top of a guide.

```jsx
<DarkBox title="Key Concept">
  <p>Explanation text…</p>
</DarkBox>
```

- `title` (string, required) — callout heading.
- `children` — body content.

---

### `Insight({ text, emoji })`

`src/components/Insight.jsx` — a tip/hint callout with an emoji.

```jsx
<Insight text="Remember: adjective agrees in gender." emoji="💡" />
```

- `text` (string, required) — tip text.
- `emoji` (string) — leading emoji; defaults to 💡 if omitted.

---

### `SimpleGuide({ items })`

`src/components/SimpleGuide.jsx` — a Q&A / definition list from a data array.

```jsx
<SimpleGuide items={[
  { h: "¿Cómo estás?", b: "How are you?" },
]} />
```

- `items` (array, required) — each item has `h` (heading) and `b` (body).

---

### `ExpandSection({ title, color, children })`

`src/components/ExpandSection.jsx` — a collapsible section with a toggle button.

> **Note:** The prop was renamed from `label` → `title` (Phase 1 infrastructure commit).
> If you encounter old code using `label=`, rename it.

```jsx
<ExpandSection title="Advanced Notes" color="#1B5E20">
  {/* hidden content */}
</ExpandSection>
```

- `title` (string, required) — button label.
- `color` (string) — background color when open; defaults to `#1a1a1a`.
- `children` — revealed content.

---

### `GuideShell({ guidesMeta, guideComponents, categories, catColors, theme, storageKey, sidebarTitle, sidebarSubtitle })`

`src/components/GuideShell.jsx` — the full navigation wrapper. Used only in `index.jsx` files; never inside guide components.

- `guidesMeta` (array) — from `meta.js`; see Step 2.
- `guideComponents` (array) — from `components.jsx`; must be same order as `guidesMeta`.
- `categories` (array of strings) — from `meta.js`.
- `catColors` (object `{ [cat]: "#hex" }`) — from `meta.js`.
- `theme` (object) — from `src/styles/themes.js`; default `lightTheme`.
- `storageKey` (string) — e.g. `"peliglot-spanish"`.
- `sidebarTitle` (string) — collection name shown in sidebar header.
- `sidebarSubtitle` (string) — e.g. `"30 Interactive Guides"`.

---

### `AlphabetGrid({ letters, letterKey?, nameKey?, filterGroups, detailFields, primaryColor, speakFn?, introTitle, introContent, renderDetail?, borderFn?, badgeFn?, gridProps?, ... })`

`src/components/templates/AlphabetGrid.jsx` — interactive letter grid with filter buttons and a detail panel.

- `letters` (array, required) — letter objects (any shape).
- `letterKey` (string, default `"l"`) — field for the displayed glyph.
- `nameKey` (string, default `"name"`) — field for the small subtitle under each letter.
- `filterGroups` (array `[{ id, label, filterFn }]`) — filter buttons above the grid.
- `detailFields` (array `[{ key, label?, bgColor?, borderColor?, textColor? }]`) — fields shown in the detail panel.
- `primaryColor` (string) — accent color for selection + header.
- `speakFn` (function `(text) => void`) — called on letter tap.
- `speakKey` (string) — field passed to `speakFn`; defaults to `letterKey`.
- `introTitle` / `introContent` — optional `DarkBox` shown above the grid.
- `renderDetail` (function `(letter, { primaryColor, highlightColor }) => JSX`) — fully custom detail panel.
- `borderFn` (function `(letter) => string | null`) — per-letter border override.
- `badgeFn` (function `(letter) => { color } | null`) — small dot badge on letter.
- `gridProps` (object) — extra styles on the grid container (e.g. `{ direction: "rtl" }`).

---

### `VerbConjugation({ pronouns, stem, endings, verb?, meaning?, color, title?, compact? })`

`src/components/templates/VerbConjugation.jsx` — pronoun-based conjugation table.

```jsx
// Full Card mode
<VerbConjugation pronouns={["yo","tú","él"]} stem="habl" endings={["o","as","a"]}
  verb="hablar" meaning="to speak" color="#D84315" />

// Compact mode (no Card wrapper)
<VerbConjugation pronouns={["yo","tú","él"]} stem="habl" endings={["é","aste","ó"]}
  title="Pretérito" color="#B71C1C" compact />
```

- `pronouns` (array, required) — pronoun labels.
- `stem` (string, required) — verb stem.
- `endings` (array, required) — one ending per pronoun.
- `verb` / `meaning` (strings) — shown in the Card header (full mode).
- `color` (string, required) — accent color.
- `title` (string) — used in compact mode instead of verb/meaning.
- `compact` (boolean) — omit the Card wrapper; render a smaller table.

---

### `QuizSection({ items, answerKey?, renderQuestion, optionCount?, color, resultMessages? })`

`src/components/templates/QuizSection.jsx` — multiple-choice quiz with scoring.

> **Always pass `resultMessages`** for non-English collections so the result text
> matches the collection language or is at least appropriate.

```jsx
<QuizSection
  items={items}
  answerKey="answer"
  renderQuestion={(q) => <div>{q.question}</div>}
  optionCount={4}
  color="#0277BD"
  resultMessages={{ high: "¡Excelente!", mid: "¡Bien!", low: "Sigue practicando." }}
/>
```

- `items` (array, required) — quiz items (any shape).
- `answerKey` (string, default `"answer"`) — field name for the correct answer string.
- `renderQuestion` (function `(item) => JSX`, required) — custom question renderer.
- `optionCount` (number, default `4`) — number of choices.
- `color` (string, required) — accent color.
- `resultMessages` (object `{ high, mid, low }`) — result screen text.

---

### `FlashcardDeck({ items, color?, title?, speakFn?, speakKey? })`

`src/components/templates/FlashcardDeck.jsx` — swipeable flashcard deck with got-it / again flow.

```jsx
<FlashcardDeck items={[{ front: "hola", back: "hello" }]} color="#1565C0" />
```

- `items` (array, required) — each item has `front` (displayed before flip) and `back` (shown after flip).
- `color` (string, default `"#1565C0"`) — accent color.
- `title` (string) — optional label above the deck.
- `speakFn` (function `(text) => void`) — called when card flips.
- `speakKey` (string, default `"front"`) — field passed to `speakFn`.

---

### `ProgressRing({ progress, size?, strokeWidth?, color? })`

`src/components/ProgressRing.jsx` — circular SVG progress indicator.

```jsx
<ProgressRing progress={0.75} size={48} color="#2E7D32" />
```

- `progress` (number 0–1, required) — fill fraction.
- `size` (number, default `36`) — SVG width/height in px.
- `strokeWidth` (number, default `3`) — ring thickness in px.
- `color` (string, default `"#2E7D32"`) — ring fill color.
