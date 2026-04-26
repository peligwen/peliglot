# Plan: Peliglot Phase 1 — Identity & Discovery

## Context

This executes Phase 1 of the Peliglot 10-year vision (`/Users/gwen/peliglot/VISION.md`). Phase 0 (Foundations) shipped: TypeScript, Vitest+Playwright, design tokens, useProgress hook, GuideShell decomposition. The user is director, Claude is CEO; pace is relaxed, do-it-right, see-things-through. "Do, don't defer."

Phase 1 = "sharpen what already exists; make it findable." Five interlocking workstreams:
1. Tighten landing-page voice and "who is this for" pitch.
2. SEO foundations: per-route titles/descriptions, sitemap, robots, structured data, per-guide OG cards.
3. Donation-with-shoutout flow live.
4. Privacy-respecting analytics so we know what is actually used.
5. Quietly raise the bar on every existing guide.

## Goal

All five workstreams complete, with `npm run check` passing and zero visual/UX regressions:

- **Landing copy** rewritten with a clear hero + "who this is for" pitch that lands the eclecticism without being twee. Reads tight on 320px and on desktop.
- **SEO**:
  - Each guide route sets a unique `<title>` and `<meta name="description">` based on the guide it's currently showing.
  - `/sitemap.xml` enumerates the landing page + every collection + every guide deep-link, refreshed at build time.
  - `/robots.txt` allows crawling.
  - JSON-LD structured data on landing (Organization/WebSite + SearchAction) and on each collection (CollectionPage/CreativeWorkSeries).
  - Open Graph + Twitter card meta on every route, with a per-collection (or per-guide if feasible) image generated at build time and cached in `public/og/`.
- **Donation**: a real, public flow — not a placeholder. Director chooses the platform; integration must respect privacy (no third-party trackers loaded by default, even on the donation page). Public shoutout list lives in-repo and renders on a Supporters page or section.
- **Analytics**: privacy-respecting (no cookies, no fingerprinting, no PII). Default candidate is Cloudflare Web Analytics (already accessible). Verify it loads in production only and that no tracker fires before consent isn't required for the chosen tool.
- **"Quietly raise the bar"**: scoped, not unbounded. Concrete deliverables: a written guide audit (one row per collection), and 3–5 targeted improvements applied across collections — based on what the audit finds (e.g., dated copy, missing speech, broken speech voices, weakest guide per collection).

## Constraints

- **Stack stays simple.** React + Vite, inline styles, hash routing, lazy chunks <500KB. New runtime deps must justify themselves; build-time deps fine.
- **Privacy first.** No third-party analytics that set cookies or fingerprint. Donation provider's payment iframe is OK; persistent trackers are not.
- **Phase-1-shaped, not Phase-2-shaped.** No accounts, no backend, no DB. SEO/analytics/donations are all client-side or static-build-time work. If a workstream tempts toward "we'd need a server for this," cut scope until it doesn't.
- **`npm run check` passes at every commit.** Don't break existing collections.
- **Per-guide deep-link OG cards** need real images. Acceptable: build-time generation (e.g., `@vercel/og` or satori, or a small playwright screenshotter, or hand-authored per-collection cards). Decide and execute.
- **Director surface.** When real architectural choices come up (donation platform, analytics tool), the planner should ask via `questions_for_user`, not guess.

## Phases

1. **Landing voice and positioning.** Hero rewrite, "for polymathic, self-directed, textbook-averse learners" framing, section intros, "what this is / what this isn't" block, per-collection one-liners. Extract canonical copy into `src/copy/positioning.ts` so SEO meta, OG cards, and supporter pitch consume one source of truth.
2. **SEO infrastructure.** Client-side route-meta updater (`document.title`, `<meta name="description">`, OG, Twitter card, JSON-LD) wired into `GuideShell` + landing. Build-time sitemap generator from every `meta.ts`. `robots.txt`. Wired into `npm run build` and CI. No image generation yet.
3. **Per-route OG card images.** Build-time generation via the chosen strategy (default: `@vercel/og` + `satori` JSX templates). Site / collection / guide tiers. Cached by content hash; output to `public/og/`. Phase 2's meta updater wires in the URLs.
4. **Donation flow and Supporters page.** Director-chosen provider. New `/#/support` route, repo-tracked `src/data/supporters.ts`, click-to-embed (no persistent trackers). Discreet support link in footer/sidebar. Added to sitemap + JSON-LD.
5. **Cross-collection audit and targeted improvements.** `docs/phase-1-audit.md` (one row per collection: strong / weak / one targeted improvement). Director approves the improvement list. Execute with hard ceiling per collection (default: ~2h or one targeted change). Already-strong collections get an explicit "no change" note.
6. **Privacy-respecting analytics.** Director-chosen tool. Hash-routing pageview adapter (one file, swappable). No cookies, no fingerprinting, no PII. Doc page noting what is and isn't measured.

## Status

- [x] Phase 1: Landing voice and positioning (positioning.ts + landing rewrite + for/isn't block + all 10 collection one-liners)
- [x] Phase 2: SEO infrastructure — useRouteMeta hook, JSON-LD, build-time sitemap (324 URLs), robots.txt, e2e title assertions
- [x] Phase 3: Per-route OG card images — site + 10 collection PNGs (1200x630), Hawaiian/Arabic with proper orthography, content-hash cached, validator extended
- [ ] Phase 4: Donation flow and Supporters page (depends on 1, 2)
- [ ] Phase 5: Cross-collection audit + improvements (depends on 1)
- [ ] Phase 6: Privacy-respecting analytics (depends on 1, 2, 3, 4, 5)

## Director decisions (defaults applied where deferred)

- **OG card strategy:** `@vercel/og` + `satori` JSX templates (default applied).
- **Phase 5 scope ceiling:** one targeted improvement per collection, ~2h max, no sweeps (default applied).
- **Voice review cadence:** commit one version, iterate from there (faster path applied).
- **Donation provider:** Ko-fi.
- **Analytics tool:** Cloudflare Web Analytics.
