# Plan: Phase 2 capstone + Phase 3 opening + parity proof

> **10-year-plan checkpoint.** Phases 0, 1, 2a/2b/2c are shipped. This plan
> closes out Phase 2's remaining vision items and opens Phase 3 with the first
> capability that ships in Spanish but is built for parity from day one.

## Context

The four threads in this plan correspond to a director-approved menu (`/plan-subagents`
invocation, 2026-04-29):

- **A.** Cross-device continuity (export/import JSON + share-link via URL hash / QR) —
  capstones Phase 2's "Local Mastery Foundation" by making local-first progress
  portable without a backend. Adapter is already ~90% ready (`bulkExport` /
  `bulkImport` exist).
- **B.** Spanish content depth round — audio coverage, harder card kinds, tuning
  the practice flow based on User Zero usage. Sharpens the pilot before
  propagation.
- **C.** First Phase 3 move — BYOK LLM conversation prototype, Spanish-first,
  collection-agnostic interface from day one. User pastes Anthropic / OpenAI
  key; key lives in `localStorage`; browser calls the API directly. No backend,
  no proxy, no Peliglot-held secrets.
- **D.** Mastery-layer port to a second collection — proves the framework was
  built for parity, not Spanish-shaped. Likely target: English-for-non-natives
  or Jazz Guitar (planner to recommend, director confirms).

## Goal

A coherent, multi-phase plan that the director can drive at relaxed pace over
weeks-to-months, with each sub-phase independently shippable and reviewable.
Done = Phase 2 vision items shipped, Phase 3 first move proven in Spanish, and
parity demonstrated by porting mastery to a second collection.

## Constraints

- **Local-first forever.** No backend. No accounts. No cloud sync. No analytics
  beyond the existing privacy-respecting beacon.
- **BYOK only for LLM features.** Keys live in `localStorage`; the browser
  calls the LLM API directly; Peliglot never sees the key. No proxy.
- **Mastery never gates content.** All four threads must respect this.
- **Stack stays simple.** React + Vite, inline styles, per-guide file
  structure, lazy chunks, < 500KB per JS asset.
- **TypeScript everywhere.** Phase 0 migrated the codebase; new files are `.ts` / `.tsx`.
- **Adapter contract is sacred.** `src/mastery/adapter.ts` is the cloud-swap
  boundary — components never import the concrete adapter class. Cross-device
  continuity must reuse `bulkExport` / `bulkImport`.
- **Spanish-first, parity-eventual.** Frameworks (BYOK conversation, scenario
  engine, etc.) must be collection-agnostic from day one even when first
  content is Spanish. Thread D's whole point is proving this is real.
- **Authorship voice is AI-assisted, human-directed.** Never describe content
  as "hand-crafted" or "written by hand."
- **Each phase ships its own PR.** No mega-PRs. Director reviews and merges
  before the next phase starts.
- **No half-finished foundations.** A thread is "done" when it ships, has
  tests, and User Zero has used it for at least one session.

## Phases

Top-level Opus planner returned 8 phases (2026-04-29). Rationale: each phase is
"one shippable PR with tests, used once by User Zero, reviewer can hold the diff
in their head." Within threads, the planner found these natural seams:

- **A** stays as one phase — file + share-link both serialize the same
  `MasteryExport` and share conflict-resolution UX; splitting them duplicates UX.
- **B** splits into doc-first / code-second — the audit's findings shape what
  code follows, so doing them together would mean coding before knowing what to
  build.
- **C** splits into three — key management is a self-contained surface; provider
  abstraction + Spanish conversation is the load-bearing collection-agnostic
  asset; cost telemetry + error hardening turns the prototype into something
  User Zero will actually use.
- **D** splits into a deliberate "extract data into dataN.ts" prep phase
  (because both candidate second-collections inline data in `guideN.tsx` —
  Spanish's separate `dataN.ts` pattern is the parity test biting in advance)
  followed by the actual extractors + practice route.

**Thread D target: English-for-non-natives** (director decision, 2026-04-29 —
overrode planner's Jazz Guitar recommendation). Both candidates required
identical `dataN.ts` extraction work; English was chosen as the parity-proof
target. The framework still gets stress-tested: English uses `speakEnglish`
(an analog to `speakSpanish`) and reuses some language-card kinds, but it
will surface any place the codebase silently encodes "Spanish" (locale codes,
copy strings, route shapes, default voices, `getRecommendation` cold-start
copy, etc.). Phase 7 extracts data from English `guideN.tsx` files into
sibling `dataN.ts` files; phase 8 wires the practice route on English.

| # | Phase | Thread | Depends on |
|---|-------|--------|------------|
| 1 | Cross-device continuity (export/import file + share-link/QR) | A | — |
| 2 | Spanish audit refresh (audio coverage + skipped-guides re-audit + tuning intake) | B.1 | — |
| 3 | Spanish content depth code (new card kinds + flow tuning + maybe new extractors) | B.2 | 2 |
| 4 | BYOK key management (storage + validation + disclosure UI) | C.1 | 3 |
| 5 | Provider abstraction + Spanish conversation surface | C.2 | 4 |
| 6 | Cost telemetry + error hardening | C.3 | 5 |
| 7 | Data-extraction refactor on second collection (parity prep) | D.1 | 3 |
| 8 | Second-collection mastery wiring (parity proof) | D.2 | 3, 7 |

Parallelism opportunities:
- Phases 1 and 2 can run in parallel (both have no dependencies).
- Phase 7 can begin once phase 3 ships; it does not need to wait for the C
  thread (4–6) to finish.

## Status

- [x] Phase 1: Thread A — cross-device continuity *(branch `feat/cross-device-continuity`, PR open 2026-04-29; sub-phase 1: Settings page + file export/import + `useMastery.exportSnapshot/importSnapshot`; sub-phase 2: snapshot encode/decode util + `/import` route + share-link + lazy QR)*
- [ ] Phase 2: Thread B.1 — Spanish audit refresh
- [ ] Phase 3: Thread B.2 — Spanish content depth code
- [ ] Phase 4: Thread C.1 — BYOK key management
- [ ] Phase 5: Thread C.2 — Provider abstraction + Spanish conversation surface
- [ ] Phase 6: Thread C.3 — Cost telemetry + error hardening
- [ ] Phase 7: Thread D.1 — Data-extraction refactor (parity prep)
- [ ] Phase 8: Thread D.2 — Second-collection mastery wiring (parity proof)

## Director decisions (deferred or applied)

- 2026-04-29: Director chose "all four threads, large scope" over a single
  capstone chunk. Pacing remains relaxed — phases ship one at a time.
- 2026-04-29: Thread D target = **English-for-non-natives**. Director overrode
  planner's Jazz Guitar recommendation. Phases 7 and 8 update accordingly.
- 2026-04-29: Director directive — drive Phase 1 to an open PR this session
  without further check-ins. Subsequent sessions revisit pacing.
