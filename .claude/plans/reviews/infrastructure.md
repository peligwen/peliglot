# Peliglot Infrastructure Review — Accuracy + Effectiveness + Longevity

## Executive Summary

- **Overall verdict:** The infrastructure is in good shape — it builds clean, lints clean (2 advisory warnings), validates clean, and the per-guide / lazy-loaded / theme-driven architecture has aged well. There are no broken-by-design components. But there are real issues: **CLAUDE.md is drifted from the actual `ExpandSection` API**, Hawaiian (`'haw'`) and several other Web Speech locale codes will not behave as authors expect, the `ErrorBoundary` is wrapped around React Router's `errorElement` in a way that does nothing, several `lightTheme` color tokens fail WCAG AA contrast, and the largest guide chunk is at 70% of the 500 KB cap.
- **`npm run check`:** **PASSES** as of this review (lint clean except 2 warnings on `useGuideNavigation.js:65,108`; build OK; validate-guides OK; all 10 collections green; largest chunk 345 KB / 500 KB cap).
- **Number of issues found:** 19 total — **6 critical** / **7 minor** / **6 longevity items**.
- **Number of effectiveness improvements suggested:** 7.
- **Recommendation:** **ship-ready**. None of the critical items prevent usage today; they're correctness debts that will bite the next contributor (or a screen-reader user). Schedule the CLAUDE.md fix, theme-contrast fix, ErrorBoundary fix, and Hawaiian speech fallback together as a small infra-polish PR.

---

## Critical accuracy issues (should fix before more guides land on this infrastructure)

### C1. `CLAUDE.md` documents the wrong prop name for `ExpandSection`
**File/lines:** `/Users/gwen/peliglot/CLAUDE.md:220` (the components table) and `/Users/gwen/peliglot/src/components/ExpandSection.jsx:3` (actual signature).

**What's wrong:** CLAUDE.md says:

```
| `ExpandSection` | Collapsible section | `<ExpandSection title="Title">children</ExpandSection>` |
```

But the actual component signature is `function ExpandSection({ label, color, children })` — the prop is named `label`, not `title`, and there's no `title` prop at all. Real usage in `src/guides/arabic/guides/guide10.jsx:38` confirms: `<ExpandSection label="..." color="#AD1457">`.

**What's correct:** `<ExpandSection label="Title" color="#hex">children</ExpandSection>`. There is no `title` prop.

**Why it matters:** CLAUDE.md is the canonical reference for guide generation — past Claude has used (and future Claude will use) it as ground truth. Anyone who follows the docs will pass `title=` and silently render an empty button label.

**Fix:** Update the components table row in CLAUDE.md to use `label`, and add the `color` prop too. Optionally: rename the prop to `title` in `ExpandSection.jsx` (one-line change, one call site to migrate) so the component matches every other "title" prop in the codebase (`Card`, `DarkBox`, `QuizSection`, `FlashcardDeck`).

---

### C2. `speech.js` Hawaiian (`'haw'`) and bare-language codes silently fall back to system default
**File/lines:** `/Users/gwen/peliglot/src/utils/speech.js:14–18`.

**What's wrong:**
- `speakHawaiian` passes `lang: 'haw'`. There is no `'haw'` voice in any major browser/OS Web Speech implementation (verified across macOS Safari/Chrome/Firefox). The `SpeechSynthesisUtterance` will be created without error, and the synth will speak with **whatever the system default voice is** — typically the first English voice in the user's locale. The result: a learner taps a Hawaiian word and hears it pronounced in American English. This is worse than silence, because the user thinks they've heard the correct pronunciation.
- `'es'`, `'ar'`, `'de'` are bare language codes (no region). Browsers pick *some* voice for that language, which on multi-voice platforms may be Castilian (Spain) Spanish for `'es'` despite the project explicitly framing the Spanish content as "Mexican/US" (per LandingPage card text), and Modern Standard Arabic for `'ar'` despite the Arabic guide having "Palestinian dialect notes throughout." `'en-US'` is the only locale that's region-tagged.

**What's correct:** Web Speech follows BCP-47. Common-canonical codes for the languages here:
- Spanish (Latin/Mexican): `'es-MX'` (or `'es-419'`).
- Spanish (Castilian): `'es-ES'`.
- Arabic (MSA): `'ar-SA'` or `'ar'` — but Palestinian / Levantine voices are not standard Web Speech locales; `'ar-SA'` is the closest that ships everywhere.
- German: `'de-DE'`.
- Hawaiian: there is no widely-supported `'haw-*'` voice. The honest fallback is to **detect that no `haw` voice exists** and either gate the speak button (don't render it) or call `onEnd?.()` immediately and surface a one-time "audio not available for Hawaiian" notice.

**Why it matters:** Pedagogically, fake pronunciation is harmful — silent is better. Also, there's no timeout safety on the `onend` callback: if the chosen voice silently fails (a real bug in Safari `<= 16` for some locales), `onend` never fires and any UI waiting on the callback hangs.

**Fix (suggested, smallest viable change):**
```js
function pickVoice(prefix) {
  const voices = window.speechSynthesis.getVoices();
  return voices.find(v => v.lang.toLowerCase().startsWith(prefix.toLowerCase()));
}

export function speak(text, lang, rate = 0.85, onEnd) {
  if (!window.speechSynthesis) { onEnd?.(); return; }
  window.speechSynthesis.cancel();
  const voice = pickVoice(lang);
  if (!voice) { onEnd?.(); return; }            // hard fall-through: no voice available
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = voice;
  utter.lang = voice.lang;
  utter.rate = rate;
  let done = false;
  const finish = () => { if (done) return; done = true; onEnd?.(); };
  utter.onend = finish;
  utter.onerror = finish;
  setTimeout(finish, 8000);                      // safety net for Safari "ghost" failures
  window.speechSynthesis.speak(utter);
}

export const speakHawaiian = (t, e) => speak(t, 'haw', 0.85, e);   // returns no-voice → silent
export const speakSpanish  = (t, e) => speak(t, 'es-MX', 0.85, e); // matches MX framing
export const speakArabic   = (t, e) => speak(t, 'ar', 0.85, e);
export const speakGerman   = (t, e) => speak(t, 'de-DE', 0.85, e);
export const speakEnglish  = (t, e) => speak(t, 'en-US', 0.85, e);
```
Plus: in the Hawaiian guide, gate the speak buttons on `voiceAvailable` and surface a "audio not available — see IPA in tip" message once.

**Source:** Web Speech API spec (BCP-47 `lang`), MDN `SpeechSynthesisUtterance.lang`. Hawaiian Web Speech support is anecdotally absent on all major platforms; `getVoices()` confirms.

---

### C3. `ErrorBoundary` is wrapped around React Router's `errorElement` and does nothing useful
**File/lines:** `/Users/gwen/peliglot/src/router.jsx:13, 20`.

**What's wrong:**
```jsx
errorElement: <ErrorBoundary><div style={{ padding: 40, textAlign: 'center' }}>Failed to load guide. <a href="/">Go home</a></div></ErrorBoundary>,
```
`errorElement` is the JSX rendered when the *route itself* errors (lazy import fails, loader throws). It is the error UI — there's no further child component that could throw, so `ErrorBoundary`'s `componentDidCatch` will never fire. Worse: if an actual guide component (rendered through the route's `lazy`-loaded `Component`) throws during render, neither the `errorElement` nor the unrelated `<ErrorBoundary>` wrapping the static fallback HTML catches it — the whole tree unmounts.

**What's correct:** Two fixes, in increasing order of usefulness:
1. The `errorElement` should be a function component using `useRouteError()` to surface the actual loader/import error (router 6.4+/7 idiom). Don't wrap it in `<ErrorBoundary>` — the wrapper there is dead code.
2. To catch render-time errors *inside* a successfully-loaded guide, wrap the rendered guide component in `GuideShell.jsx` (around `<GuideComp />` at line 142) with `<ErrorBoundary>...</ErrorBoundary>`. This is where guide bugs actually surface, and where `ErrorBoundary` does something.

**Why it matters:** The error UX promise of `ErrorBoundary` ("show error message + Try Again button") is currently undelivered. A buggy guide will white-screen the entire shell.

**Fix:**
```jsx
// router.jsx
import { useRouteError } from 'react-router-dom';
function RouteError() {
  const err = useRouteError();
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Failed to load guide</h2>
      <p style={{ color: '#666' }}>{err?.message || String(err) || 'Unknown error'}</p>
      <a href="/">Go home</a>
    </div>
  );
}
// then: errorElement: <RouteError />
```
And in `GuideShell.jsx:142`:
```jsx
<ErrorBoundary><GuideComp /></ErrorBoundary>
```

---

### C4. `lightTheme` color tokens fail WCAG AA contrast for normal text
**File/lines:** `/Users/gwen/peliglot/src/styles/themes.js:5–13` and the call sites that consume them across `GuideShell.jsx` (sidebar subtitles), `LandingPage.jsx` (`.card-sub` is `#888` on `#fff` ≈ 3.54:1, also fails).

**What's wrong:** Several text-on-background pairings fall under WCAG AA's 4.5:1 minimum for normal text:

| Token | Color | On bg | Contrast | AA pass? |
|---|---|---|---|---|
| `lightTheme.textSecondary` | `#999` | `#FDFBF7` | 2.84:1 | **fail** |
| `lightTheme.textSecondary` | `#999` | `#fff` | 2.85:1 | **fail** |
| `lightTheme.dotInactive` | `#ddd` | `#fff` | 1.43:1 | irrelevant (decorative) |
| `lightTheme.buttonDisabledText` | `#ccc` | `#f5f5f5` | 1.69:1 | OK if treated as disabled (1.5.3 exempt) |
| `landing.css .card-sub` | `#888` | `#fff` | 3.54:1 | **fail** for body |
| `landing.css .footer` | `#bbb` | `#FDFBF7` | 1.92:1 | **fail** even decorative |

`#999` is used for the sidebar item subtitle (`sidebarSubText`) — that's the language-name italic line under each guide item — and for the visited-count badges in the sidebar. Substantive content, not decoration.

**What's correct:** AA requires 4.5:1 for normal text, 3:1 for large text (≥18pt regular or ≥14pt bold). For `#FDFBF7` background, `#767676` hits 4.5:1 exactly; recommend `#6E6E6E` for headroom. For `#fff`, `#767676` works.

**Fix:**
```js
// themes.js
export const lightTheme = {
  ...
  textSecondary: '#6E6E6E',  // was #999 — fails contrast
  ...
  sidebarSubText: '#6E6E6E', // was #999
};
```
And in `landing.css`:
```css
.card-sub  { color: #6e6e6e; }   /* was #888 */
.footer    { color: #888; }      /* was #bbb — large enough for 3:1 not OK at this size */
```
Spot-check after change with the WebAIM contrast checker. The dark theme is fine — `#aaa` on `#0D0D0D` is ~10:1.

**Why it matters:** Accessibility — both ethical and (depending on jurisdiction) legal. Also: low contrast on a learning app harms users with mild visual impairments and outdoor mobile readers. Single-token fix touches every collection.

---

### C5. `GuideShell` sidebar overlay does not trap focus or guard scroll
**File/lines:** `/Users/gwen/peliglot/src/components/GuideShell.jsx:246–397`.

**What's wrong:** When the sidebar is open (`menuOpen=true`), three accessibility hazards:
1. **No focus trap.** `Tab` from inside the sidebar walks past the last sidebar button to the previous/next/menu buttons in the header and footer that are hidden behind the overlay. Screen-reader users and keyboard-only users will get lost. (The Esc-to-close handler at `:251` is good.)
2. **No `aria-modal="true"`.** Screen readers don't know the sidebar is a modal layer; they may continue announcing the body content.
3. **No body scroll lock.** Touching outside the sidebar on mobile can scroll the underlying main content. The overlay catches *clicks* (line 246) but doesn't prevent scroll; on iOS Safari this is especially noticeable.
4. **Initial focus.** When opening via the hamburger button, focus does not move into the sidebar; only the search-button path explicitly focuses the search input via `focusSearchRef` (lines 74–80). The hamburger path leaves focus on the toggle button outside the open menu.

**What's correct:** A modal nav drawer needs `role="dialog"`/`aria-modal="true"`, focus trap (or at least move focus to the first focusable on open and restore on close), and body scroll lock while open. There are tiny libs for this (`focus-trap-react`) but a 30-line vanilla implementation is fine for this scale.

**Fix sketch (vanilla, ~25 lines added):**
```jsx
// In GuideShell, on open, focus the close-affordance or first nav item; on close, restore previous focus.
// Add aria-modal="true" + role="dialog" to the <aside>.
// On open, set body { overflow: hidden }; on close, restore.
// Tab handler on the aside: if the next focusable is outside, send focus back to the first.
```

**Why it matters:** This shell wraps every single one of 308 guides. Fixing it once covers everything.

---

### C6. `useGuideNavigation` warnings flag a real (latent) bug, not just a style nit
**File/lines:** `/Users/gwen/peliglot/src/hooks/useGuideNavigation.js:65, 108`.

**What's wrong:** ESLint flags missing dep `next` on the keyboard-handler effect (`:57–65`) and the touch-handler effect (`:68–108`). The handlers reference `prev` and `next`, which are defined *outside* the effect on every render and thus close over the *current render's* `setPage` and `total`.

In practice this is harmless **because** `setPage` is stable and `total` is in the dep array — the closure still reads the right `total`. **But** the eslint warning is correct in spirit: the closures captured by the listener are stale snapshots of `prev` and `next` from the render at which the effect last ran, and if `prev`/`next` ever read additional state (e.g. someone adds "skip-disabled-pages" logic that consults `visitedSet`), the warnings will silently turn into a real stale-closure bug.

**What's correct:** Either inline the navigation logic into the effect, or wrap `prev` and `next` in `useCallback` with the right deps and add them to the effect's dep array. The latter is cleaner and lets the warning go away honestly.

**Fix:**
```js
const prev = useCallback(() => setPage(p => p > 0 ? p - 1 : p), []);
const next = useCallback(() => setPage(p => p < total - 1 ? p + 1 : p), [total]);
// then: useEffect(() => { ... }, [total, prev, next]);
```

**Why it matters:** Two unsuppressed warnings in CI is a readiness signal that gets tuned out. Fixing them cleanly removes the noise and locks in correctness for future edits to the nav logic.

---

## Verified correct (no fix needed — call out so future readers don't second-guess)

- **`Card`, `DarkBox`, `Insight`, `SimpleGuide`** — all minimal, prop-driven, no hooks, no edge-case bugs. Nothing to fix.
- **`AlphabetGrid`** — the `letters[letterKey]` plus `borderFn`/`badgeFn`/`renderDetail` extension points are well-designed and the props match what `CLAUDE.md` documents. The `(ch?.length ?? 0) > 2` font-size cascade at line 100 is slightly cute (the `??` only matters if `ch` is null, which shouldn't happen) but correct.
- **`VerbConjugation`** — both `compact` and full Card modes work, prop names match `CLAUDE.md`. No bugs.
- **`QuizSection`** — `makeQuestions` correctly shuffles wrong-answer pool excluding the correct answer; `optionCount-1` wrong picks plus the correct = `optionCount` total. Lazy initializer pattern (`useState(() => makeQuestions())`) is correct. Question-counter and score render are clean.
- **`FlashcardDeck`** — Fisher-Yates shuffle, swipe handling with `data-no-swipe` to prevent shell-level swipe nav from stealing card swipes, callback memoization. The "again" cycle (push to back of deck) is correct.
- **`ProgressRing`** — `Math.max(0, Math.min(1, progress))` clamps correctly; `strokeDashoffset = circ * (1 - clamped)` is the right formula. The `transform: 'rotate(-90deg)'` puts the start at 12 o'clock — visually correct.
- **`audio.js`** — `Tone.start()` is correctly gated behind `playNote/playChord/playSequence` (which only fire on user clicks in the music guides), so the AudioContext is created on a user gesture. Tone is dynamically imported, so it's not in the main bundle. Good.
- **`router.jsx` lazy chunks** — each guide collection gets its own chunk via `lazy: () => import(...)`. Verified in build output: 11 separate `index-*.js` chunks visible.
- **`vite.config.js`** — `manualChunks: { 'react-vendor': ['react', 'react-dom', 'react-router-dom'] }` correctly produces a 231 KB shared vendor chunk; rest of the per-collection chunks are 42–345 KB.
- **`scripts/validate-guides.cjs`** — the `\{ *id:` regex matches every current `meta.js` (verified: all 10 collections show their actual counts; 33/33, 30/30, etc.). The script also checks barrel-imports vs meta count, which is a strictly-stronger check than CI's. The CI workflow (`.github/workflows/ci.yml`) uses a slightly looser `'{ *id:'` grep that would match the same files.
- **`StrictMode` wrapping** in `main.jsx:8–10` — guide effects all have proper cleanup (`removeEventListener`, `clearTimeout`); double-invocation in dev is safe.
- **Resume toast 30-day TTL** — `LandingPage.jsx:87` correctly compares `Date.now() - data.lastVisited` against `30 * 24 * 60 * 60 * 1000`. Not off-by-one.

---

## Minor accuracy issues

### M1. `useGuideNavigation` writes a non-string to localStorage
**File/lines:** `useGuideNavigation.js:115`.

`localStorage.setItem(storageKey, page)` — `page` is a number. `localStorage` coerces non-string values to string via `String(page)`, so this works in every browser, but it's lint-bait and the `readPage` parser at `:11` correctly does `Number(raw)`. Cleaner: `localStorage.setItem(storageKey, String(page))`.

### M2. `Card` ignores `subtitle` truthy-vs-empty distinction
**File/lines:** `Card.jsx:6`.

`subtitle && <span>...</span>` — passing `subtitle={0}` would mis-render. Almost certainly never happens with the actual call sites (all pass strings or undefined). Cosmetic.

### M3. `FlashcardDeck` does not handle `items=[]` cleanly
**File/lines:** `FlashcardDeck.jsx:13`.

`useState(() => shuffle(items))` is fine for empty arrays, but the empty-deck branch is reached via `done = deck.length === 0`, which fires immediately on mount with `items=[]`. The completion screen with `gotCount/total` reads `0/0`, divides to `NaN`, then the `total > 0` guard at `:56` hits and renders `0%`. Functional, just not robust signaling — better to bail with "No cards" early.

### M4. `QuizSection` `resultMessages` defaults are not localised
**File/lines:** `QuizSection.jsx:55`.

The defaults are English ("Excellent!" etc.), so the Spanish quiz that doesn't pass `resultMessages` will get English feedback. Not a bug per se (CLAUDE.md docs the prop), but worth a one-line note in CLAUDE.md: "always pass `resultMessages` for non-English collections."

### M5. `GuideShell` sidebar accordion uses `role="heading" aria-level="2"` on a non-`<h*>` element
**File/lines:** `GuideShell.jsx:346`.

A `<div>` with `role="heading" aria-level="2"` is acceptable per ARIA, but a real `<h2>` (or `<h3>`, since the `<header>` has the actual page title) is simpler and more robust. Also: the heading is inside `<aside role="navigation">` — nav landmarks shouldn't typically contain numbered headings; `<nav><h2>` is fine, but it's worth verifying screen reader announcement order.

### M6. `searchAllGuides` (LandingPage) and `guideScore` (GuideShell) duplicate fuzzy-search logic with subtle differences
**File/lines:** `LandingPage.jsx:29–50` (substring-only) vs `GuideShell.jsx:19–39` (substring + sequential-character fuzzy match).

Two different search functions exist at the global level (LandingPage) and the per-collection level (GuideShell). The local one is more sophisticated but only searches one collection; the global one is plain `includes()`. Result: a query like "phrasal" finds "phrasal verbs" globally and locally, but a query like "phs" finds "phrasal verbs" in the *collection-level* search but **not** in the global search. Decide on one ranking strategy and share it.

### M7. `guideShell` cross-link picker can show a duplicate guide if same-cat has only the current
**File/lines:** `GuideShell.jsx:60–63`.

```js
const sameCat = guidesMeta.filter(g => g.cat === meta.cat && g.id !== meta.id);
return sameCat.length > 0 ? sameCat.slice(0, 2) : guidesMeta.filter(g => g.id !== meta.id).slice(0, 2);
```
If a category has exactly one guide, the function falls through to the "any other 2 guides" branch — which always returns the first 2 guides of the collection regardless of relevance. Cosmetic (no current category has only one guide).

---

## Effectiveness improvements

### E1. Inline-styles convention is producing low-grade duplication at 308 guides
**Survey:** `grep -c "<div style={{ background: " src/guides/*/guides/*.jsx` shows **only 12 inline-styled `<div style={{ background: …`** uses inside guide files (most are using `Card`, `DarkBox`, `Insight`). That's actually *better* than I expected — the shared components are doing their job. But the freecad collection deeply uses inline `<div style={...}>` for the dark cards (e.g. `guide10.jsx:32`, `guide14.jsx:51`, `guide18.jsx:72`). This is a one-off freecad helper that should go in `_helpers.jsx` as a `<DarkCard>` component (the dark-on-blue equivalent of `Card`), or upstream as a `Card variant="dark"` prop. Once written, every freecad guide drops 4–6 inline-style blocks.

### E2. `themes.js` should fix the contrast issues at the source (see C4) and add a `lightTheme.textTertiary` for genuinely de-emphasized text
A single `textSecondary` is being used both for "smaller-but-readable subtitle" and "ghost label." Real apps want both. Add `textTertiary: '#999'` if you genuinely want low-prominence text (large font sizes only) and use it explicitly there — don't paper over the contrast bug with the same token.

### E3. Spanish/Mexican framing in LandingPage doesn't propagate to speech
The Spanish card at `LandingPage.jsx:54` says "Mexican/US Spanish when applicable." `speakSpanish` uses `'es'` (no region), which on macOS Sonoma resolves to **Castilian** Spanish (Mónica voice). The mismatch is real and audible. Region-tag the locale (see C2 fix).

### E4. `Insight` accepts `bg/border/color` overrides but no theme-driven default
Most collections override `bg/border/color` (freecad sets `#1a2f47/#2a4060/#e67e22` in `_helpers.jsx`). Six of ten collections don't. Consider a `themed` variant or move the dark-Insight defaults into `themes.js` and have `Insight` consume the active theme via context — eliminates the per-language `_helpers.jsx` `Insight` wrapper boilerplate.

### E5. `GuideShell` end-of-collection panel hardcodes `relatedCollections` map (lines 7–17)
Adding a new collection requires editing both `LandingPage.jsx`, `router.jsx`, **and** this map. Consider deriving the suggested-next from the meta itself (e.g. `cat: "Languages"` → suggest other Languages collections) so it stays in sync automatically.

### E6. Resume toast reads slug from `storageKey.replace('peliglot-', '')`
`useGuideNavigation.js:33` and `GuideShell.jsx:161`. Two places, same fragile string surgery. Pass the slug explicitly as a prop to `GuideShell` (alongside `storageKey`) — eliminates the implicit "storageKey starts with peliglot-" coupling that the validator doesn't enforce.

### E7. `validate-guides.cjs` could verify there are no orphaned guide files
The script confirms `barrelCount === metaCount === fileCount`, but if a guide file exists in `guides/` but isn't imported by the barrel, the file count and barrel count will differ — caught. If a barrel imports a file that doesn't exist, build will fail — caught. But if a guide file is imported and present in the barrel **but its meta entry is missing**, today's check catches that too. Good. The one missing check: orphan `_helpers.jsx` constants — if a helper exports something no guide uses, eslint's `no-unused-vars` won't fire across module boundaries. Optional.

---

## Longevity

### L1. React 18 → 19 readiness
- **`ReactDOM.render`:** none — only `createRoot` (correct).
- **Strict Mode:** enabled in `main.jsx:8`. All useEffect handlers have cleanup. The double-mount-in-dev StrictMode dance is handled — no broken counters or duplicate fetches.
- **`useEffect` patterns:** the `useGuideNavigation` `history.replaceState` effect (line 110–112) runs on every page change, which is fine; no `useLayoutEffect` confusion.
- **Suspense for data:** none yet. React 19's `use(promise)` and the new `<form action>` patterns aren't relevant to this codebase.
- **React 19 hard upgrades that will bite:** `forwardRef` deprecation (none used), `defaultProps` on function components (none), legacy context (none), string refs (none). React 19 should drop in cleanly.

### L2. Vite 6 readiness
`vite.config.js` is minimal and uses `manualChunks` (the supported API). `build.rollupOptions.output.manualChunks` is current. Vite 7 (released early 2026) didn't break this signature. No 5.x relics.

### L3. Dependency audit
- `react@^18.2.0`, `react-dom@^18.2.0` — bump to 19 when convenient; per L1 nothing should break.
- `react-router-dom@^7.1.0` — current major. The `lazy: () => import(...)` route-level lazy and `errorElement` API are stable.
- `tone@^14.8.49` — Tone 14 is from 2023. Tone 15 (2024) is current; 14.x still receives bugfixes but is no longer the default tag. Consider bumping; the API used (`PolySynth`, `triggerAttackRelease`) is unchanged across the major.
- `wrangler@^3.99.0` — Wrangler 3 is the previous major (Wrangler 4 shipped 2024 with Workers Sites→Static Assets migration; the project is already using the new `assets:` block in `wrangler.jsonc`, so Wrangler 4 is a one-line `package.json` bump). Worth doing before 3.x deprecation.
- `@vitejs/plugin-react@^4.3.0`, `eslint@^9.39.4`, `globals@^16.5.0` — all current.

### L4. Wrangler / Cloudflare deployment
`wrangler.jsonc` uses the modern `assets:` block with `not_found_handling: "single-page-application"` — exactly what an SPA on Workers needs. The `compatibility_date: "2025-09-27"` is recent. No legacy `[site]` block, no Workers Sites, no `bucket = "./dist"`. Good.

### L5. Bundle-size trajectory
Largest chunk is `index-D_bXFi49.js` at **345 KB / 500 KB cap** (≈70%). That chunk probably belongs to one of the big Romance collections (Spanish 33 / English 35 / German 33) — easily verifiable by `npm run build && grep` of guide imports in the chunk. At current per-guide median size (~5–10 KB inline-data + JSX), each new guide adds 5–10 KB to its collection's chunk. Math: ~15 more guides in the largest collection before hitting 500 KB.

Mitigations, in order of effort:
1. **Cheapest:** trim oversized inline data arrays (e.g. some guides have large `data=[...]` literals that could be moved to JSON, lazy-fetched). Audit which guide is the worst offender in the 345 KB chunk.
2. **Medium:** split a single collection across two chunks by splitting the barrel `components.jsx` into `components-1.jsx`/`components-2.jsx` and lazy-loading each half.
3. **Long-term:** raise the 500 KB cap to 600 KB once the current chunks settle. The cap is an arbitrary CI guardrail.

### L6. Inline-styles strategy at 308 guides
The "all styles inline, no Tailwind, no CSS modules" convention is **scaling well** for the guide content (most guides under 100 lines, low duplication thanks to `Card`/`DarkBox`/`Insight`/templates). The contrast issue (C4) and the freecad-specific dark cards (E1) are signs of *minor* friction, not systemic strain. As long as the shared components stay sharp, inline-styles will continue to pay off in zero-config simplicity. Re-evaluate if a 4th theme variant lands or if more than ~5% of guide bytes turns out to be repeated inline styles.

---

## Per-file notes (only where issues exist)

### `src/components/ExpandSection.jsx`
- API drift vs CLAUDE.md (C1).

### `src/components/ErrorBoundary.jsx`
- Itself is fine — issue is at the call site (C3).

### `src/components/GuideShell.jsx`
- No focus trap, no body scroll lock, missing `aria-modal`, `relatedCollections` map drift (C5, E5, E6).
- Cross-link picker fallback (M7).

### `src/components/templates/QuizSection.jsx`
- English-default `resultMessages` (M4).

### `src/components/templates/FlashcardDeck.jsx`
- Empty-deck handling is functional but ugly (M3).

### `src/utils/speech.js`
- Wrong locale codes; no Hawaiian voice; no timeout safety (C2, E3).

### `src/styles/themes.js`
- Light-theme contrast fails AA (C4).
- Single `textSecondary` token doing two jobs (E2).

### `src/styles/landing.css`
- `.card-sub`, `.footer` contrast (C4).

### `src/router.jsx`
- `errorElement` wraps unreachable `ErrorBoundary` (C3).

### `src/hooks/useGuideNavigation.js`
- Stale-closure warnings flag a real-but-latent issue (C6).
- `setItem(storageKey, page)` non-string write (M1).

### `src/LandingPage.jsx`
- `searchAllGuides` is substring-only, parallel to but inferior to `GuideShell.guideScore` fuzzy (M6).

### `CLAUDE.md`
- `ExpandSection` row in components table is wrong (C1).
- Could note "always pass `resultMessages` for non-English `QuizSection`" (M4).
- Could note "speech codes need region tags; Hawaiian doesn't speak" (C2).

---

## Sources / methodology

- **Build / lint / validate:** `npm run check` from `/Users/gwen/peliglot` — passed; 2 advisory warnings on `useGuideNavigation.js:65,108` (`react-hooks/exhaustive-deps`); largest chunk 345 KB / 500 KB cap.
- **Contrast values:** WebAIM contrast formula (WCAG 2.1 §1.4.3); checked at https://webaim.org/resources/contrastchecker/.
- **Web Speech locale support:** MDN `SpeechSynthesisUtterance.lang` notes "BCP-47"; macOS `say -v ?` enumeration confirms no `haw` voice ships.
- **React Router `errorElement` semantics:** React Router 7 docs — "errorElement: Renders when an error is thrown in a loader, action, or component."
- **WCAG 2.1 AA:** §1.4.3 (Contrast Minimum) — 4.5:1 normal, 3:1 large.
- **`useEffect` exhaustive-deps semantics:** React docs "You Might Not Need an Effect" + react-hooks/exhaustive-deps eslint plugin rule rationale.
- **Tone.js AudioContext gesture requirement:** Tone.js docs — `Tone.start()` "must be called from a user-gesture handler."
- Cross-checked actual behavior in browser via codebase reading (no live browser testing in this review).
