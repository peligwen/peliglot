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
| `ExpandSection` | Collapsible section | `<ExpandSection title="Title">children</ExpandSection>` |
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
