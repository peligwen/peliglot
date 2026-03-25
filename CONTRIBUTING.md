# Contributing to Peliglot

## Project Overview

Peliglot is a static HTML interactive learning platform. It consists of 8 self-contained guide files and a landing page. There is no build step -- just open any HTML file in a browser.

## File Structure

```
index.html              Landing page
guides/
  spanish.html
  arabic.html
  english.html
  german.html
  hawaiian.html
  music.html
  jazz-guitar.html
  math.html
```

Each guide is a standalone HTML file. There are no shared bundles or generated assets.

## Tech Stack

- **React 18.2** via CDN (with unpkg fallback)
- **Babel standalone** for in-browser JSX transformation (see note below)
- **Tone.js** for audio synthesis (used in `music.html` and `jazz-guitar.html`)
- **Web Speech API** for text-to-speech (used in language guides)

> **Note on Babel standalone (~2 MB):** Babel is needed to transform JSX at runtime. Removing it would require precompiling JSX to `React.createElement` calls at authoring time. While this would reduce page weight significantly, it conflicts with the project's "no build step" ethos — contributors can edit JSX directly and see changes by refreshing the browser. We accept the tradeoff for now.

## Component Conventions

Every guide uses a small set of reusable component functions defined inside the same file:

| Component | Purpose |
|-----------|---------|
| **Card** | White rounded card with a title. Primary content container. |
| **DarkBox** | Dark gradient box for highlighting key concepts. |
| **Insight** | Highlighted tip with an icon. Default icon is a lightbulb; Hawaiian guide uses a hibiscus. |

## Adding a New Guide

1. Copy an existing guide HTML file as a template (pick one closest to your topic).
2. Update the `guidesMeta` array in the new file with the guide's metadata.
3. Add your `Guide` functions with the relevant content.
4. Add a link to the new guide in `index.html`.
5. Add an entry in `README.md`.

## Formatting Rules

- Write readable JSX -- do not minify.
- Use consistent indentation (2 spaces).
- Keep each guide fully self-contained; do not extract shared modules.

## Accessibility

All guides must include:

- Semantic HTML landmarks (`<header>`, `<main>`, `<nav>`, `<aside>`)
- ARIA labels on interactive elements
- A skip-to-content link
- Full keyboard navigation support
- `prefers-reduced-motion` media query support
- `prefers-color-scheme: dark` media query support
