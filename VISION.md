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
Eclectic by design. Crafted by hand. Useful at every depth — drop in for ten
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
- **Backend.** Cloudflare ecosystem available (Workers, D1, KV, R2) as the
  default; final stack chosen at the moment we need to commit.

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
- **Always works without an account.** Accounts unlock mastery features; they
  never gate content.
- **Privacy first.** No creepy tracking. No third-party analytics if avoidable.

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
   Implementation stays localStorage-backed for now; the *interface* is drawn
   so Phase 2's swap to cloud-backed sync is one file, not a hunt.
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

### Phase 2 — Mastery Foundation, Spanish Pilot (Year 2–4)

Largest architectural step. Static frontend → real app, in **one** collection.

- Authentication (magic link).
- Backend (Cloudflare unless redirected).
- Progress model with FSRS-style spaced repetition.
- **Spanish becomes the pilot mastery path** — User Zero is learning Spanish.
- Existing Spanish explainer remains the free intro; mastery path is the long
  journey behind sign-in.
- Gamification layer (streak, XP, daily goal, "next thing today") — tuned
  for actual learning, not casino loops.
- Other 9 collections untouched.

*Output: one collection takes a beginner to conversational; the pattern is
proven for the next.*

### Phase 3 — Interactivity Expansion (Year 4–6)

- LLM-driven conversation practice (text first, voice when ready).
- Listening and writing practice with feedback.
- **Authoring layer** — internal lesson DSL so new content is faster to write
  than raw JSX. Designed *now* with real use cases in hand, not before.
- Mastery layer ported to a second collection — likely English (for non-
  natives) or jazz guitar.
- Decision point: which collections benefit from mastery, which stay as
  explainers.

*Output: mastery is repeatable; we can scale it where it fits.*

### Phase 4 — Immersive Scenarios, 2D First (Year 6–8)

Before 3D, do 2D scenes well.

- Illustrated rooms, NPC dialogue trees, transactional roleplay (ordering
  coffee, asking directions, classroom small talk).
- PixiJS / Phaser / custom Canvas — chosen at decision time.
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

## Cross-Cutting Threads

- **AI as collaborator throughout** — authoring, tutoring, scenario
  generation. We don't compete with AI; we lean into it as part of the
  product.
- **One collection's growth never breaks another's chunk.** Lazy-loaded
  boundaries are sacred.
- **Periodic re-grounding** every 12–18 months: sanity-check that Peliglot
  still feels like Peliglot.
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

## Open Questions

- Backend stack at Phase 2: stay flexible, Cloudflare as default unless
  redirected.
- Does Peliglot's eclectic voice survive mastery + 3D, or do mastery-mode
  collections become a sub-brand?
- Should the scenario engine eventually be open-sourced (engine yes, content
  no), and if so when?
- How do we measure "phase complete" without falling into perfectionism?
