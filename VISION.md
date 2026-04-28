# Peliglot — Ten-Year Vision

> The long-term arc. The historical work log lives in [ROADMAP.md](./ROADMAP.md);
> this document is the forward plan.

---

## Why Peliglot

Self-directed polymathic learners hate textbook-shaped content but are
underserved by the alternatives. Duolingo gamifies them into shallow streaks.
YouTube is unstructured. Traditional courses are gated and joyless. There is no
place that combines:

1. genuinely interactive in-browser learning,
2. a coherent authorial voice across wildly different topics, and
3. a path from "curious browse" to "actually mastered."

Peliglot is that place.

## North Star

A *house style of teaching* applied to whatever the curious want to learn.
Eclectic by design. Opinionated and finite. Useful at every depth — drop in for ten
minutes of curiosity, or stay for months if you actually want to learn the
thing.

## Audience

Polymathic, self-directed, textbook-averse. Hackers, makers, lifelong learners.
The eclecticism is part of the appeal: the same person who lands on Spanish
will be intrigued by jazz guitar, FreeCAD, AI prompting.

## Operating Model

- **Director / CEO.** The owner is director; Claude is CEO. Relaxed pace
  sustained over a very long horizon. Things are done right and seen through
  to completion. No half-finished foundations.
- **User Zero.** The director is the first user of every mastery feature.
  If it doesn't work for them, it doesn't ship.
- **Revenue.** Donation with shoutout. No ads. No paywalls.
- **Local-first by default.** No backend. No accounts. No cloud sync. Progress
  lives in the browser; cross-device continuity is a user-driven action
  (export / import / share-link), not infrastructure. A cloud-and-auth phase
  exists as a contingency (see Phase C, off the timeline) — it ships only if
  benefit clearly outweighs the new attack surface and operational burden.

---

## Goals

- Stay a craft project. Quality and authorial voice over breadth-at-any-cost.
- Be findable. People who would love it should encounter it. Word-of-mouth is
  the channel; SEO and shareable artifacts are the substrate.
- Useful at every depth: ten-minute curiosity hit AND months-long mastery path.
- Director's tool first. User Zero uses it daily.

## Non-Goals

- No ads. No paywalls. No course marketplace. No UGC platform.
- Not Duolingo: gamification serves learning, not retention metrics.
- Not a textbook.
- Not chasing scale at any cost.
- Not abandoning the eclectic personal voice.
- Not every collection needs a mastery layer — explainer-only is a valid
  endpoint for some topics.

## Constraints

- **Stack stays simple.** React + Vite, inline styles, per-guide file
  structure, lazy-loaded chunks, < 500KB per asset. Change only when a phase
  forces it.
- **No accounts. No cloud. Local-first forever as the default.** Peliglot
  runs in the browser, stores progress locally, and never gates features
  behind sign-in, sync, or progress. Mastery is always additive, never a
  precondition for content. Cross-device continuity is handled by
  export/import and share-links — *cheating is not a risk factor*, so the
  share-link path optimises for friction, not tamper-resistance. The cloud
  phase is a contingency, not a destination.
- **Privacy first.** No creepy tracking. No third-party analytics if avoidable.
  Storing PII would mean accepting a category of legal and operational
  responsibility we currently don't have — the cloud phase does not ship
  without that being clearly worth it.

---

## Phased Approach

### Phase 0 — Foundations (Year 0–1)

Pulled forward because doing them later means migrating N files, not
implementing one feature. Every item below is an *interface bet* that
compounds over the decade.

1. **TypeScript migration.** Incremental, collection by collection. Component
   prop contracts (currently in `CLAUDE.md`) become enforced rather than
   described.
2. **Test infrastructure.** Vitest for component smoke tests, Playwright for
   one golden-path browser test per collection. Critical *because* of the
   relaxed pace — slow projects rot quietly without test coverage.
3. **Design token extraction.** `src/styles/tokens.ts` for colors, spacing,
   type scale, radii. New code uses tokens; existing guides migrate as
   touched. Inline styles convention preserved — only the *source* of values
   changes. Unlocks dark mode and theme variants without yak-shaving.
4. **`useProgress` hook.** Wrap localStorage access before calls proliferate.
   Implementation stays localStorage-backed indefinitely; the *interface* is
   drawn so that *if* the cloud phase ever triggers, the swap is one file,
   not a hunt.
5. **GuideShell decomposition.** The one component with size smell (466 lines
   vs. ≤32 for the others). Split sidebar / nav / keyboard concerns before it
   grows further. Not a rewrite — just decomposition.

### Phase 1 — Identity & Discovery (Year 1–2)

Sharpen what already exists; make it findable.

- Tighten landing-page voice and the "who is this for" pitch.
- SEO foundations: meta, sitemap, structured data, per-guide deep-link OG
  cards.
- Donation-with-shoutout flow live.
- Privacy-respecting analytics so we know what is actually used.
- Quietly raise the bar on every existing guide.

*Output: Peliglot is excellent at being itself, and findable.*

### Phase 2 — Local Mastery Foundation, Spanish Pilot (Year 2–4)

Largest content step, smallest infra step. Spanish becomes the pilot mastery
path — entirely client-side, no servers involved.

- Progress model with FSRS-style spaced repetition. *(In progress.)*
- **Spanish becomes the pilot mastery path** — User Zero is learning Spanish.
- Existing Spanish explainer remains the free intro; the mastery path is an
  additive layer alongside it. **Mastery never gates content.**
- Gamification layer (streak, XP, daily goal, "next thing today") — tuned
  for actual learning, not casino loops. *(In progress.)*
- **Cross-device continuity, lightweight by design** — only worth building
  because progress is meaningful enough to preserve for User Zero:
  - Full export/import as a downloadable JSON file (backup, device-loss
    recovery).
  - Share-link — encoded progress snapshot in a URL hash (or QR code on
    mobile) for "I'm switching devices, here's where I am." Friction-
    optimised, not tamper-resistant; cheating is not in the threat model.
  - Both flows are ~90% built already via the existing adapter's
    `bulkExport` / `bulkImport` (see `src/mastery/ARCHITECTURE.md`).
- Other 9 collections untouched.

*Output: one collection takes a beginner to conversational; the pattern is
proven for the next; zero servers, zero accounts, zero new attack surface.*

### Phase 3 — Interactivity Expansion (Year 4–6)

- **LLM-driven conversation practice via bring-your-own-key.** User pastes
  their Anthropic / OpenAI key; it lives in their browser; the browser calls
  the API directly. No backend, no proxy, no Peliglot-held secrets. The
  cloud phase is not a prerequisite.
- **Listening** (TTS prompt → typed answer) and **writing** practice with
  feedback. Both client-side; LLM grading via BYOK is optional polish.
- **Authoring layer** — internal lesson DSL so new content is faster to write
  than raw JSX. Designed *now* with real use cases in hand, not before.
- Mastery layer ported to a second collection — likely English (for
  non-natives) or jazz guitar.
- Decision point: which collections benefit from mastery, which stay as
  explainers.

*Output: mastery is repeatable; LLM features land without infrastructure;
the eclectic voice scales.*

### Phase 4 — Immersive Scenarios, 2D First (Year 6–8)

Before 3D, do 2D scenes well.

- Illustrated rooms, NPC dialogue trees, transactional roleplay (ordering
  coffee, asking directions, classroom small talk).
- Two flavors of NPC: **hand-authored dialogue trees** for canonical lessons,
  and **LLM-driven NPCs** (BYOK from Phase 3) for open practice.
- DOM + CSS first for static rooms; PixiJS / Phaser / Canvas only if a
  future feature genuinely needs them.
- Reusable scenario engine across languages.

*Output: Peliglot starts to feel like next-gen Duolingo for hackers.*

### Phase 5 — 3D and Voice (Year 8–10)

WebGPU mature, browser 3D normal, voice synth/recognition excellent.

- **One** beautifully crafted 3D scenario per language, not a full world.
- Three.js or whatever is right by 2033.
- Voice-driven NPC interaction. The hall-with-small-talk vision finally
  lives.

*Output: the dream is real, in production, for users.*

---

### Phase C — Cloud & Auth (contingency, off the timeline)

Not scheduled. Not promised. Triggered if and only if a concrete need emerges
that local-first genuinely cannot meet, *and* the benefit clearly outweighs
the cost.

**What would trigger it:**
- Sustained, repeated user demand for automatic cross-device sync — beyond
  what export/import and share-links satisfy.
- A feature that fundamentally requires a server (e.g. classroom / shared
  modes — currently not on the roadmap).
- User Zero personally hits a wall the local approach can't solve.

**What it would entail (if ever):**
- Authentication — passkey / OAuth / magic link, choice deferred to trigger
  time.
- Cloudflare Workers + D1, or whatever stack is right at trigger time.
- The *code* swap is small: the adapter contract in `src/mastery/` already
  isolates it to ~2 new files plus small edits to two more. The *new
  surface* is auth, email infra (if magic link), abuse and
  cost-amplification mitigation, and ongoing privacy / GDPR responsibility.

**What it would cost beyond code:**
- Becoming a data controller — privacy policy, deletion endpoint, real
  legal responsibility for user data.
- A maintenance category that never goes away — auth bitrot, deliverability,
  account recovery, abuse reports.
- Cloudflare account compromise becomes a real concern (hardware 2FA,
  billing caps, rate limit rules).

**Default posture:** it doesn't ship. The bar is not "is it possible" but
"is the benefit clearly worth the new attack surface and operational
burden." If we never get there, the local-first product is a complete
answer.

*Output (if ever): true cross-device sync; everything else stays the same.*

---

## Cross-Cutting Threads

- **Local-first, by default, forever.** Every feature is designed to work on
  one device, in the browser, without an account. The user's data lives on
  their device. Cross-device is a user-initiated action, never an automatic
  sync. The cloud phase is a separate decision, not an inevitability.
- **AI as collaborator throughout** — authoring, tutoring, scenario
  generation. We don't compete with AI; we lean into it as part of the
  product. Where the user calls AI directly (BYOK), Peliglot doesn't sit in
  the middle.
- **One collection's growth never breaks another's chunk.** Lazy-loaded
  boundaries are sacred.
- **Periodic re-grounding** every 12–18 months: sanity-check that Peliglot
  still feels like Peliglot — and revisit whether Phase C's trigger
  conditions have changed.
- **Mid-life rewrite expected.** By year 5 something in the stack will be old.
  Plan for it; don't pretend it won't happen.
- **Brand voice persists across collections** — even as authoring scales,
  the irreverent, learn-by-doing, no-textbook-mush tone is preserved.

## Risks

- **Personal motivation over 10 years** is the biggest risk. Mitigation: User
  Zero, relaxed pace, no burnout pressure.
- **Scope creep.** 3D scenarios are seductive; we will not start them in year 2.
- **Tech rot.** Expect one mid-life rewrite. Don't pretend otherwise.
- **AI changes the field.** By 2028 AI tutoring may be excellent. Mitigation:
  lean into AI as part of the product, don't compete with it.
- **Brand drift** as the product grows. Periodic re-grounding handles this.
- **Discoverability.** Relaxed pace + no marketing = could go unfound.
  Distribution is *part of* the work, not an afterthought.
- **Cloud-phase risk asymmetry.** Local-first means the worst-case data loss
  is "this device's localStorage was cleared" — recoverable with an
  occasional export. A cloud phase introduces credential theft,
  cost-amplification ("denial of wallet"), GDPR exposure, account-recovery
  support load, and email deliverability ops — none of which exist today.
  The trigger to ship cloud must be a feature gain that's clearly worth
  those costs.

## Open Questions

- **What would actually justify shipping Phase C (cloud & auth)?** Concrete
  trigger criteria — sustained multi-device demand, a feature that genuinely
  can't be local, repeated user requests for sync — vs. signals that local
  + export/import is enough indefinitely. Re-evaluate at each periodic
  re-grounding.
- Does Peliglot's eclectic voice survive mastery + 3D, or do mastery-mode
  collections become a sub-brand?
- Should the scenario engine eventually be open-sourced (engine yes, content
  no), and if so when?
- How do we measure "phase complete" without falling into perfectionism?
