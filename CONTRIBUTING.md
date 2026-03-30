# Contributing to Peliglot

## Tech Stack

- **React 18** + **Vite** — SPA with fast HMR
- **React Router v7** — lazy-loaded guide collections
- **Tone.js** — audio synthesis (music guides)
- **Web Speech API** — text-to-speech (language guides)
- **Cloudflare Workers** — deployment target

## Getting Started

```bash
npm install
npm run dev      # Start dev server with hot reload
```

## Project Structure

```
src/
  guides/{slug}/         # One directory per guide collection
    meta.js              # Guide metadata (titles, categories, colors)
    index.jsx            # Entry point (GuideShell wrapper)
    components.jsx       # Barrel file exporting all guide components
    guides/
      _helpers.jsx       # Shared helper components for this collection
      guide1.jsx         # Individual guide files
      guide2.jsx
      ...
  components/            # Shared UI components (Card, DarkBox, Insight, etc.)
  components/templates/  # Reusable guide templates (AlphabetGrid, QuizSection, etc.)
  utils/                 # Speech and audio utilities
  hooks/                 # Custom React hooks
  styles/                # Global CSS and theme definitions
```

## Adding a New Guide Collection

See `CLAUDE.md` for the full step-by-step workflow. In brief:

1. Create `src/guides/{slug}/` with `meta.js`, `index.jsx`, `components.jsx`, and `guides/` subdirectory
2. Generate individual guide files one at a time
3. Register the slug in `src/router.jsx` and `src/LandingPage.jsx`

## Validation

```bash
npm run lint       # ESLint — catches real errors (unused vars, broken imports)
npm run build      # Vite production build
npm run validate   # Guide structure consistency checks
npm run check      # All three in sequence
```

## Conventions

- All styles are inline (no CSS modules, no Tailwind)
- Guide functions are named `Guide1`, `Guide2`, etc.
- `guideComponents` array order must match `guidesMeta` order
- Hawaiian guide (`src/guides/hawaiian/`) is the reference implementation

## CI Checks

PRs to `main` run: build verification, bundle size check (< 500KB per JS asset), and guide count validation.
