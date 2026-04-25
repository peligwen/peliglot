# Plan: Comprehensive implementation of all review findings

## Context

Following the comprehensive multi-agent review (`.claude/plans/subagents-codebase-review.md` and the 12 documents under `.claude/plans/reviews/`), this plan implements every actionable finding. The reviews produced:

- 55 critical issues across 11 areas
- 126 minor issues
- 116 effectiveness improvements
- 59 coverage gaps
- 24 longevity-flagged AI claims
- 7 cross-cutting patterns
- 15 prioritized cross-codebase fixes
- 3 meta-recommendations

The synthesis document at `.claude/plans/reviews/synthesis.md` is the strategic guide — its §7 prioritized fix-list orders the work by impact/effort. Individual per-area reviews (`spanish.md`, `arabic.md`, etc.) are the authoritative source for specific file:line fixes.

## Goal

Apply every actionable finding across the codebase. Definition of done:

1. Every critical issue (C-prefixed) in every per-area review is addressed: either fixed in code/content, or explicitly flagged with a defensible "won't-do" rationale captured in this plan file.
2. Every minor issue (M-prefixed) is addressed where the fix is clear and low-cost; deliberately punted ones are listed with rationale.
3. Effectiveness improvements (E-prefixed) and coverage gaps are addressed in priority order; remaining ones are documented.
4. The 7 cross-cutting patterns from synthesis §2 are resolved — `ExpandSection` prop, `speakX` fallback, theme contrast, ASCII apostrophe sweep, `AlphabetGrid` aria-label, `useGuideNavigation` deps, audio chord-tone helper.
5. The 3 meta-recommendations from synthesis §8 are evaluated and either implemented or explicitly punted: orthography lint, CLAUDE.md shared-component contract, review-cadence cron.
6. `npm run check` passes throughout — no phase ships with a broken build.
7. Changes land as a series of focused commits on a feature branch (`claude/review-fixes`), so the user can cherry-pick or revert per phase if they disagree with any decision.

## Constraints

- **Branch**: work on `claude/review-fixes` (created from current `main`). Do not push to remote without confirmation. Do not merge to main without confirmation.
- **No interactive git rebase / amend** — each phase commits its own work.
- **`npm run check` must pass after every phase** — phases that would break the build need to be split or reordered.
- **Cross-cutting fixes first**, then per-collection fixes — this maximizes leverage (fixing `ExpandSection` once means every collection's docs are right; fixing speech.js once means all language collections benefit).
- **Auto mode**: proceed without per-step confirmation, but pause before any destructive op (rm -rf, force-push, etc.) and before any operation visible outside the local repo (gh pr create, git push).
- **Honor the synthesis' "Skip" calls** — the synthesis explicitly punted some items (e.g. some AI longevity flags it judged durable enough to leave). Where it punted, this plan does not unilaterally re-include them.
- **Preserve interactive behavior** — the goal is correcting content/code, not changing the UX patterns the user has approved. If a fix would substantially alter how a guide *looks or plays*, surface it as a "design decision needed" rather than implementing unilaterally.

## Phases

11 phases. Phase 1 lands cross-cutting infrastructure first; phases 2–10 are per-collection content sweeps that run in parallel in git worktrees after Phase 1 commits; phase 11 wires the orthography lint into CI once Phases 3 (Arabic sweep) and 4 (Hawaiian sweep) have removed the ASCII-apostrophe violations.

| # | Phase | Files | Depends on |
|---|---|---|---|
| 1 | Cross-cutting infra (P1–P7, R1, R2, infra C1/C3/C4/C5/C6) | shared components, utils, themes, hooks, router, scripts, CLAUDE.md | — |
| 2 | Spanish — fix all C/M/E/coverage | `src/guides/spanish/` | 1 |
| 3 | Arabic — orthography sweep + fix all C/M/E/coverage | `src/guides/arabic/` | 1 |
| 4 | Hawaiian — orthography sweep + fix all C/M/E/coverage | `src/guides/hawaiian/` | 1 |
| 5 | English — fix all C/M/E/coverage | `src/guides/english/` | 1 |
| 6 | German — fix all C/M/E/coverage | `src/guides/german/` | 1 |
| 7 | Music + jazz-guitar — fix all C/M/E/coverage (consume `chord.js`) | `src/guides/music/`, `src/guides/jazz-guitar/` | 1 |
| 8 | Math — fix all C/M/E/coverage | `src/guides/math/` | 1 |
| 9 | AI — fix C1/C2/C3 + minor + effectiveness + 3 new guides (hallucination, RAG, training-cutoff) | `src/guides/ai-interaction/` | 1 |
| 10 | AI — longevity sweep (C4/C5 + 24 L-flags) | `src/guides/ai-interaction/` | 1 |
| 11 | Wire orthography lint into `npm run validate` + final sweep | `scripts/`, `package.json`, possibly CLAUDE.md | 3, 4 |

Decisions on the planner's questions:
- **Q1 (net-new guides):** authorized for AI-interaction (hallucination + RAG + training-cutoff). Other collections expand existing guides for coverage gaps; do not author net-new content for non-AI collections. The user's "don't defer, DO" directive scopes specifically to "actionable findings"; synthesis explicitly named the three AI guides as highest-impact AI literacy concepts.
- **Q2 (speakArabic locale):** use `'ar-LB'` (closest universally-shipping voice for Palestinian/Levantine emphasis in the collection). Phase 1 absorbs this.

## Status

- [x] Phase 1: Cross-cutting infra (commits `4fe4214`, `45e89aa`)
- [x] Phase 2: Spanish (commit `5db62ee`, follow-up `0fad229`) — 6/6 critical, 16/16 minor, 11/12 effectiveness, 6/6 coverage gaps
- [x] Phase 3: Arabic (commit `97dd2d5`) — 7/7 critical, 16/18 minor, 6/13 effectiveness, 8/8 coverage gaps; orthography 17→0
- [x] Phase 4: Hawaiian (commit `65ea5b3`) — 9/9 critical, 14/17 minor, 5/12 effectiveness, 5/6 coverage gaps, 5/5 pattern-level; orthography 12→0
- [x] Phase 5: English (commit `3babe20`) — 6/6 critical, 19/19 minor, 16/16 effectiveness, 9/9 coverage gaps
- [x] Phase 6: German (commit `2a12bda`) — 1/1 critical, 10/10 minor, 9/9 effectiveness, 6/6 coverage gaps; Konjunktiv I added to Guide 23
- [x] Phase 7: Music + jazz-guitar (commit `2e9aaf7`) — 5+5 critical, 8+9 minor, 11+12 effectiveness, 7+6 coverage gaps; CAGED + 12-bar blues guides added (jazz-guitar 30→32)
- [x] Phase 8: Math (commit `81ee140`) — 5/5 critical, 9/9 minor, 12/12 effectiveness, 5/5 coverage gaps
- [x] Phase 9: AI core fixes + 3 new guides (commit `17beb96`) — 3 critical, 13 minor, 12 effectiveness, 6 coverage gaps; ai-interaction 25→28 (hallucination, RAG, training-cutoff)
- [x] Phase 10: AI longevity sweep (commit `07dfb3e`) — C4 + C5 + 24 L-flags addressed (10 actively replaced, 14 verified-durable per review doc)
- [x] Phase 11: Wire orthography lint + final sweep (this commit)

Final state: `npm run check` passes — lint clean, build succeeds (largest chunk 345 KB / 500 KB cap), all 10 collections validate (308 → 313 guides total: spanish 33, arabic 30, english 35, german 33, hawaiian 30, music 30, jazz-guitar 32, math 32, ai-interaction 28, freecad 30), check-orthography reports 0 violations.
