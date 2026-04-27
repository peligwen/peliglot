# Plan: Peliglot Phase 2 — Mastery Foundation, Spanish Pilot

## Context

This file is the long-term track for Phase 2 of the Peliglot 10-year vision
(`/Users/gwen/peliglot/VISION.md`). Phase 0 (Foundations) and Phase 1 (Identity
& Discovery) shipped. The director is User Zero on the Spanish mastery path.

Phase 2 in the vision is a Year 2-4 arc covering: magic-link auth, backend,
FSRS spaced repetition, Spanish pilot mastery surface, and gamification. A
single PR cannot deliver all of it. The director has explicitly directed that
**we are not yet ready to commit to a cloud backend** — so cloud + auth work
is **deferred behind an explicit director gate** and the local-first surface
gets built first.

## Goal

Phase 2 is complete when:

- A signed-out User Zero can run their full daily Spanish practice in the
  browser, on a single device, with FSRS-scheduled review of guide content.
- The streak / XP / daily-goal layer exists and tunes for actual learning, not
  casino loops.
- The Spanish mastery layer covers the 27 existing Spanish guides where
  mastery makes sense, with a sensible "no mastery here" verdict on guides
  that are pure explainer.
- Cloud sync + magic-link auth are available **as an opt-in**, layered on
  top of the local-first foundation, and only built once the director opens
  that gate.
- The `useMastery` hook's interface allows the cloud swap to be a single-file
  change, not a hunt.

## Constraints

- **Stack stays simple.** React + Vite, inline styles, hash routing, lazy
  chunks <500KB. New runtime deps must justify themselves.
- **Always works without an account.** Mastery features ARE available to
  signed-out users via localStorage. Sign-in upgrades them to portable +
  durable, never gates them.
- **Director-gated cloud.** No Cloudflare account linkage, no third-party
  auth provider, no backend code, until the explicit Phase 2d gate opens.
- **Other 9 collections untouched** by mastery work in this phase.
- **`npm run check` passes at every commit.** No regressions in existing
  collections.
- **Privacy first.** Local-first means truly local — no remote calls added
  in Phase 2a-2c.

## Sub-phases

### Phase 2a — Local FSRS mastery foundation (executable now)

The first PR. Establishes the entire local-first mastery layer with enough
content for User Zero to actually use it daily for weeks before Phase 2b.

**Engineering deliverables:**

- Implement an FSRS scheduler in TypeScript. Use `ts-fsrs` if it fits the
  bundle budget; otherwise hand-roll the minimal scheduler. Either way, the
  scheduler is wrapped behind a project-internal interface so the choice can
  be revisited.
- Design and implement `useMastery` hook backed by an explicit
  `MasteryStorageAdapter` interface. **Hard constraints on the contract**
  (this is the load-bearing design — Phase 2d's cloud swap depends on it):
  - **Async from day one.** Adapter methods return Promises even when
    backed by localStorage. Sync-now → async-later is a refactor-everything
    job; we pay the trivial cost upfront.
  - **Single swap point.** All persistence flows through
    `MasteryStorageAdapter`. Read / write / list-due / bulk-export /
    bulk-import are named operations. No component reaches into
    localStorage directly.
  - **Conflict semantics: last-write-wins per card by timestamp.** Each
    card's scheduling state carries a `updatedAt` field. CRDT is
    over-engineering at this scale; LWW is correct for single-user multi-
    device sync, and document it.
  - **Sign-in migration story documented in code.** First sign-in on a
    device with local data: per-card LWW merge between local and cloud,
    so a user who's been practicing locally for months doesn't lose state
    when they later sign in. Test this contract now with a stub
    `RemoteAdapter` so Phase 2d only writes the network bits.
  - Versioned schema (`schemaVersion` field on persisted state, with a
    migration entrypoint) — needed regardless of cloud, useful when card
    shape changes.
- A "Practice" surface — new `/#/spanish/practice` route that pulls due
  cards from across enrolled guides and runs the user through them with
  speech, immediate feedback, and an FSRS rating step (Again / Hard / Good
  / Easy).
- Streak counter + daily goal layer (minimal, kept out of casino-loop
  territory): streak with one-day grace (one missed day doesn't reset),
  daily goal user-configurable with a sensible low default for consistency-
  over-volume. Both persisted via `useMastery`. **XP and "next thing today"
  recommendations defer to 2b** — they need real usage to tune well.

**Content deliverables (director-picked beginner arc, 9 guides):**

Wire each of these to the mastery layer with extracted card-shaped review
items. The planner should inspect each guide's data array and produce
review items that test the load-bearing thing the guide teaches.

| Guide | Card type |
|---|---|
| 1. Alfabeto | letter → sound prompt |
| 2. Acentos | word → stress/accent answer |
| 4. Presente Indicativo | verb + pronoun → conjugation |
| 9. Cambios de Raíz (boot verbs) | verb + pronoun → stem-changed conjugation |
| 11. Género | noun → masculine/feminine |
| 12. Pluralización | singular noun → plural form |
| 13. Adjetivos | noun + adjective → agreement form |
| 14. Pronombres | English clue → Spanish pronoun |
| 17. Ser vs Estar | sentence → ser-or-estar choice |

The planner may downgrade or revise per-guide card shapes if the data
doesn't support the suggested format; flag any such revision in the
implementation summary so director can review.

**Quality bar:**

- Full TypeScript. No `any`. Strict mode passes.
- Vitest unit tests for FSRS scheduler, `useMastery` hook, and the
  `MasteryStorageAdapter` LWW merge.
- Playwright e2e for the practice flow (enroll → review one card → see
  next-due-date update → reload preserves state).
- `npm run check` green at every commit; bundle still <500KB per chunk.
- All other 9 collections completely untouched and visually unchanged.
- `CLAUDE.md` updated with the mastery contract section.
- An in-code `MASTERY_ARCHITECTURE.md` (or comparable doc) describing the
  adapter interface, LWW semantics, sign-in migration, and exact files
  Phase 2d will need to touch.

**Decision gate before Phase 2b:** director go-ahead after 2a merges +
weeks of User Zero use of the local mastery surface.

### Phase 2b — XP and recommendation surface (local)

Streak + daily goal already shipped in 2a. This phase adds the parts that
need real usage data to tune well.

- XP awarded for review work, weighted by FSRS difficulty at review time.
  Tuning informed by User Zero's 2a usage patterns.
- "Next thing today" surface on the Spanish landing — single-CTA "do this
  next" recommendation pulled from the FSRS due queue + cold-start logic
  for new enrollments.
- Optional achievements / milestones — only if User Zero's 2a usage
  shows a real motivational gap; otherwise dropped.

**Decision gate before Phase 2c:** director go-ahead.

### Phase 2c — Spanish content build-out across all 27 guides

Apply the mastery layer to the rest of the Spanish guides where it makes
sense. Some guides are pure explainer (e.g. cultural notes) and stay
review-free.

- Per-guide audit: mastery-eligible cards extracted from each guide's
  data arrays.
- Bulk wiring of guide → mastery items.
- Director reviews a sampled subset before bulk merge.

**Decision gate before Phase 2d:** director go-ahead AND director decision
to commit to a backend stack.

### Phase 2d — Cloud + auth (director-gated; no work until opened)

When the director is ready, this gate opens and we build:

- Backend stack chosen by director (Cloudflare Workers + D1 + KV is the
  vision default; Supabase, self-hosted, or other is on the table).
- Magic-link auth via a director-chosen email provider (Resend recommended
  by current Claude analysis; revisit at gate time).
- Sync layer: `useMastery` swaps from localStorage to cloud-backed.
- Migration path for existing local-mastery users — no data loss when they
  sign in for the first time.
- `DEPLOY.md` runbook updated; director provisions secrets and runs deploy.

**Zero work happens here until director explicitly opens this gate.**
The interface design in 2a must keep this swap to a single file change.

### Phase 2e — Mastery decisions for other collections (Phase 3 territory)

Tracked here so it isn't lost. Phase 3 of the vision covers porting the
mastery layer to a second collection (likely English-for-non-natives or
jazz guitar). That decision happens when Phase 2d closes.

## Status

- [x] Phase 2a: Local FSRS mastery foundation — **shipped via PR #19 (merge commit 4c0acea)**
  - [x] 2a.1 — FSRS scheduler + MasteryStorageAdapter contract + localStorage adapter
  - [x] 2a.2 — useMastery hook + streak + daily goal
  - [x] 2a.3 — Card extractors for the 9 Spanish guides (247 cards)
  - [x] 2a.4 — Practice route + UI (47KB lazy chunk)
  - [x] 2a.5 — ARCHITECTURE.md, CLAUDE.md update, polish, PR
- [x] Phase 2b: XP + recommendation surface + tester-feedback fixes — **shipped via PR #20 (merge commit c0b2a29)**
  - [x] 2b.1 — Data layer (XP formula, recommendation function, hook extension, stub adapter symmetry)
  - [x] 2b.2 — Bug 1 (ResumeToast scroll-dismiss) + Bug 2 (typed-answer flow) + XP header + landing recommendation CTA
- [x] Phase 2c: Spanish content build-out across remaining 24 guides — **shipped via PR (phase-2c-content-buildout)**
  - **Audit complete:** 20 extract verdicts, 4 skip verdicts (guides 7, 15, 26, 33) — see docs/spanish-mastery-audit.md
  - **15 new CardKinds:** verb-spelling-change, verb-conjugation-tensed, gustar-pattern, por-vs-para, verb-prep-pair, question-word, negation-translate, comparative-irregular, number-spell, tu-vs-usted, false-cognate, weather-expression, imperative-tu, reflexive-meaning-change, idiom-meaning
  - [x] 2c.1 — Schema additions: 15 new CardKinds + PromptShapes + renderers + TYPING_ENABLED_KINDS
  - [x] 2c.2 — Verb-conjugation extractors: guides 5, 6, 8, 10, 28, 29, 30 (226 cards)
  - [x] 2c.3 — Choice-discriminator extractors: guides 3, 18, 19, 20, 21, 22, 24, 25, 31 (98 cards)
  - [x] 2c.4 — Phrase-translation extractors (16, 23, 27, 32) + LandingPage lazy-load polish + audit doc + PR (84 cards)
  - **Total: 408 new cards across 20 newly-wired guides; 662 cards in mastery pool (29/33 guides, 88% coverage)**
- [ ] Phase 2d: Cloud + auth (gated on explicit director decision; deferred)
- [ ] Phase 2e: Other-collection mastery decisions (Phase 3 boundary)

## Director decisions (deferred or applied)

- **Cloud backend stack:** **DEFERRED** — director explicitly not ready to
  commit to Cloudflare or any other backend at the start of Phase 2.
  Re-asked at the Phase 2d gate.
- **Magic-link email provider:** **DEFERRED** with Phase 2d. Resend is the
  current recommended default if/when the gate opens.
- **Phase 2a scope:** local-first FSRS + 9-guide beginner-arc practice
  surface (Alfabeto, Acentos, Presente Indicativo, Cambios de Raíz, Género,
  Pluralización, Adjetivos, Pronombres, Ser vs Estar) + streak + daily
  goal. XP and recommendation surface defer to 2b (need usage data to
  tune). Director may revise after seeing the 2a PR.
- **Practice surface placement:** new `/#/spanish/practice` route under the
  Spanish collection (default applied; planner may revise based on existing
  router structure).
- **Cloud-swap contract pinned in 2a:** async-from-day-one
  `MasteryStorageAdapter` interface, last-write-wins per-card by timestamp,
  documented sign-in migration path, schemaVersion field. Phase 2d's job
  is reduced to writing a network adapter against this interface.
