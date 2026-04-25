# Plan: Comprehensive Codebase + Guide Content Review

## Context

Peliglot is an interactive learning-guides app (React 18 + Vite, ~14k lines) with 10 guide collections totaling 308 guides:

| Collection | Guides | Domain |
|---|---|---|
| spanish | 33 | Language (Romance) |
| arabic | 30 | Language (RTL script) |
| english | 35 | Language (Germanic) |
| german | 33 | Language (Germanic) |
| hawaiian | 30 | Language (reference impl) |
| music | 30 | Music theory |
| jazz-guitar | 30 | Music / instrument |
| math | 32 | Mathematics |
| ai-interaction | 25 | AI / soft skills |
| freecad | 30 | CAD / 3D-printing (already reviewed + fixed) |

Shared infra in `src/`:
- `components/` — `Card`, `DarkBox`, `Insight`, `SimpleGuide`, `ExpandSection`, `GuideShell`, `ProgressRing`, `ErrorBoundary`
- `components/templates/` — `AlphabetGrid`, `VerbConjugation`, `QuizSection`, `FlashcardDeck`
- `utils/` — `speech.js`, `audio.js`
- `styles/` — `global.css`, `landing.css`, `themes.js`
- `router.jsx`, `LandingPage.jsx`
- `scripts/validate-guides.cjs` — CI guide-structure validator

There is a strong precedent for this work: `.claude/plans/freecad-review.md` is the format we want — executive summary, critical issues, minor issues, effectiveness improvements, coverage gaps, per-guide notes, sources cited. The freecad review found 19 accuracy issues and 14 effectiveness improvements; subsequent commits fixed them.

## Goal

Produce thorough, actionable per-area review documents (in `.claude/plans/reviews/`) covering:

1. **Accuracy** — factual correctness of guide content (linguistic claims, music theory, math, AI guidance), and correctness of code (bugs, dead code, broken assumptions).
2. **Effectiveness** — pedagogy, learning-flow, whether interactive elements actually teach, missing-but-high-value content.
3. **Longevity** — code that will age well (abstractions, duplication, build/CI), guide claims that will stay true (avoid version-specific drift, prefer durable explanations over current-fad framing).

Each per-area review must follow the freecad-review format: executive summary, critical issues with file:line refs, minor issues, effectiveness improvements, coverage gaps, sources cited.

The deliverable is the **review documents themselves**. Fixes are a follow-up the user will decide on after reading.

## Constraints

- Do not modify guide content or code in this pass — review only. Reviewers may run `npm run check` to verify the codebase builds, but no fixes.
- Each review must cite primary sources for factual claims (linguistic authorities, music-theory texts, math standards, AI vendor docs).
- The freecad collection has already been reviewed/fixed (commits `d4cf99b`, `d5007b0`); a **lightweight verification pass** is sufficient there — don't redo the full review.
- Per-area reviews must reference specific `file:line` locations for every critical issue, matching the freecad-review format.
- Reviews go in `.claude/plans/reviews/{area}.md`.

## Phases

Decomposition rationale: 308 guides across 10 collections cannot fit in one Sonnet context. The freecad-sized unit (~30 guides) is the known-good budget. Each language collection is a distinct linguistic domain (no consolidation possible without losing reviewer expertise). Music + jazz-guitar share theory and bundle. Math / AI / infra each need their own specialist. Final synthesis surfaces cross-cutting patterns.

| # | Phase | Output | Depends on |
|---|---|---|---|
| 1 | Spanish review | `reviews/spanish.md` | — |
| 2 | Arabic review | `reviews/arabic.md` | — |
| 3 | English review | `reviews/english.md` | — |
| 4 | German review | `reviews/german.md` | — |
| 5 | Hawaiian review | `reviews/hawaiian.md` | — |
| 6 | Music + jazz-guitar | `reviews/music.md`, `reviews/jazz-guitar.md` | — |
| 7 | Math review | `reviews/math.md` | — |
| 8 | AI-interaction review | `reviews/ai-interaction.md` | — |
| 9 | Infrastructure + freecad verify | `reviews/infrastructure.md`, `reviews/freecad-verification.md` | — |
| 10 | Cross-cutting synthesis | `reviews/synthesis.md` | 1–9 |

Phases 1–9 dispatched in parallel as Opus background subagents. Phase 1 (Spanish) hit API 529 on initial dispatch and was retried successfully. Phase 10 dispatched after all 9 returned. `npm run check` passed (lint warnings only, build clean, validate green) — confirming no code was modified during the review.

## Status

- [x] Phase 1: Spanish — 6 critical / 16 minor / 12 effectiveness / 6 gaps
- [x] Phase 2: Arabic — 7 critical / 18 minor / 13 effectiveness / 8 gaps
- [x] Phase 3: English — 6 critical / 19 minor / 16 effectiveness / 9 gaps
- [x] Phase 4: German — 1 critical / 10 minor / 9 effectiveness / 6 gaps
- [x] Phase 5: Hawaiian — 9 critical / 17 minor / 12 effectiveness / 6 gaps + 5 pattern-level
- [x] Phase 6: Music + jazz-guitar — 5+5 critical / 8+9 minor / 11+12 effectiveness / 7+6 gaps
- [x] Phase 7: Math — 5 critical / 9 minor / 12 effectiveness / 5 gaps
- [x] Phase 8: AI-interaction — 5 critical / 13 minor / 12 effectiveness / 6 gaps + 24 longevity flags
- [x] Phase 9: Infrastructure + freecad verify — 6 critical / 7 minor / 7 effectiveness; freecad 30/30 resolved
- [x] Phase 10: Synthesis — 7 cross-cutting patterns / 15 prioritized fixes / 3 meta-recommendations

Total across collections: 54 critical issues, 126 minor issues, 126 effectiveness improvements, 65 coverage gaps. Synthesis collapses these into 7 cross-cutting patterns and a 15-item prioritized fix list. Read the synthesis first; per-area docs are reference material.
