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

<!-- Filled in by the top-level Opus planner -->

## Status

<!-- Filled in by the top-level Opus planner -->
