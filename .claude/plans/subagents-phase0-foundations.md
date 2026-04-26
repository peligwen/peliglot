# Plan: Peliglot Phase 0 — Foundations

## Context

This executes Phase 0 of the Peliglot 10-year vision (`/Users/gwen/peliglot/VISION.md`). Phase 0 lands five interface bets that compound over the decade — refactors that get materially harder if deferred. The user is director, Claude is CEO; the operating mode is relaxed pace, do-it-right, see-it-through-to-completion.

## Goal

All of the following true, with `npm run check` passing and zero visual regressions on any of the 10 collections:

- Every `.jsx` under `src/` migrated to `.tsx` with prop types; no `any` in component contracts.
- Vitest in place, ≥1 smoke test per shared component and template; Playwright covers golden path for all 10 collections.
- `src/styles/tokens.ts` exists; `Card`, `DarkBox`, `Insight`, `ExpandSection`, `GuideShell` use tokens (existing guide files left as-is).
- `useProgress` hook in place; `GuideShell` and any other localStorage callers route through it.
- `GuideShell` split into ≤4 focused files, each <200 lines.
- Bundle sizes still <500KB per chunk.

## Constraints

- Stack stays simple: React + Vite, inline styles, per-guide files, lazy chunks <500KB. Only new deps allowed: Vitest, Playwright, TypeScript.
- `npm run check` passes at every commit; never break existing collections during the migration.
- Order is prescribed: tests first (safety net) → GuideShell decomposition → TS migration → tokens + useProgress.
- `CLAUDE.md` has the current component contracts and conventions — authoritative until TS types replace it.
- Hand leaf-level work to Sonnet, use Opus reviewers at phase boundaries, surface ambiguities to the director rather than guessing.

## Phases

Strict linear chain — each phase depends on the previous, no parallelism.

1. **Set up Vitest + Playwright test infrastructure.** Establish the regression safety net before any refactoring. Sub-decomposed by sub-planner into:
   - **1a. Vitest + component smoke tests.** Vitest config, jsdom, RTL. Smoke tests for every shared component and template. `npm test` passes; not yet wired into `check`.
   - **1b. Playwright e2e + check wiring.** Playwright against `vite preview` (built `dist/`), one e2e test per collection (10 slugs). Wire both Vitest and Playwright into `npm run check`.
2. **Decompose GuideShell into focused subcomponents.** Split the 466-line shell into ≤4 focused files, each <200 lines (sidebar / nav / keyboard concerns). Behavior unchanged; Phase 1 tests are the regression detector.
3. **Migrate shared components, templates, hooks, utils, router to TypeScript.** Add TS + tsconfig with `strict: true` and `allowJs: true`. Convert every file outside `src/guides/**` to `.tsx`/`.ts` with real prop interfaces. No `any` in component contracts.
4. **Migrate guide collections to TypeScript.** Bulk migration — every `.jsx`/`.js` under `src/guides/**` becomes `.tsx`/`.ts`, in order of smallest collection first. Add `GuideMeta` and related shared types in `src/types/`.
5. **Add design tokens and useProgress hook.** Create `src/styles/tokens.ts` (typed colors, spacing, radii, typography) and migrate `Card`, `DarkBox`, `Insight`, `ExpandSection`, `GuideShell` to consume it. Create `src/hooks/useProgress.ts` and route all `localStorage` progress access through it.

## Status

- [x] Phase 1: Test infrastructure
  - [x] 1a. Vitest + component smoke tests (55 tests passing)
  - [x] 1b. Playwright e2e + check wiring (10 collections, `npm run check` green)
- [x] Phase 2: GuideShell decomposition (GuideShell 466→166, GuideSidebar 174, GuideNav 93; 37 new tests)
- [x] Phase 3: TypeScript — shared surface
  - [x] 3a. TS infrastructure + tooling (TS 6.0.3, @types/react@18.3, vite/vitest configs, eslint TS block, typecheck wired)
  - [x] 3b. Migrate components + templates with real prop interfaces (14 components migrated, generics on 3 templates, src/types/{guide,theme}.ts created)
  - [x] 3c. Migrate utils/hooks/shell + CLAUDE.md update (9 files renamed, Theme moved to themes.ts, vite-env.d.ts added, NavigationState cast removed)
- [x] Phase 4: TypeScript — guide collections
  - [x] 4a. Small collections (freecad/math/ai-interaction/jazz-guitar) + tooling updates (122 guides; 8+ latent bugs caught; router.tsx now uses explicit guideImports map)
  - [x] 4b. Medium collections (music/hawaiian/german/english) (128 guides; 23+ latent bugs caught; AlphabetGrid.detailFields loosened to optional)
  - [x] 4c. Large collections (arabic/spanish) + final verification (71 files migrated; final verify confirmed empirically: 0 .jsx/.js, tsc strict clean, 10 e2e + 93 unit pass, bundles <500K)
- [x] Phase 5: Tokens + useProgress hook (tokens.ts: colors/spacing/radii/typography; 7 components consume tokens; lightTheme refactored to consume tokens; useProgress hook with readVisited helper; useGuideNavigation routed through it; 11 new tests)
