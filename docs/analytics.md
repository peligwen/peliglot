# Analytics at Peliglot

## What's measured

When you navigate to a real route — the landing page (`/`), a guide collection
(`/guides/<slug>`), the supporters page (`/support`), or the analytics page
(`/analytics`) — Cloudflare Web Analytics records a pageview. Each pageview
includes:

- The URL path (no query strings, no hash fragments)
- Browser family and version
- Country and city (derived from IP; the IP itself is not stored)
- Referring URL (if any)

That's it.

## What's NOT measured

- **No cookies.** Cloudflare Web Analytics sets no cookies, first-party or
  third-party.
- **No fingerprinting.** No canvas, font, or device fingerprinting.
- **No PII.** No names, email addresses, or any personally identifiable
  information.
- **No per-user tracking.** Sessions are not stitched together across visits.
- **No ad targeting.** The data is never used for advertising or sold to third
  parties.
## Within-collection navigation

When you move between guides inside a collection (e.g. from Spanish Guide 1 to
Guide 2), only the URL hash changes (`/guides/spanish` → `/guides/spanish#1`).
Cloudflare's beacon records the path, not the hash, so individual guide visits
inside a collection are **not** measured. We see that someone opened the
Spanish collection — we don't see which guides they read. Per-guide signal is
out of scope for this phase; a deliberate trade for the privacy promise.

## Fonts

The site loads the Playfair Display and Source Sans 3 typefaces from
**Google Fonts** (`fonts.googleapis.com`, `fonts.gstatic.com`). This is a
standard CDN font fetch — no tracking pixels, no analytics — but it does
contact Google's servers on every page load. Google's own privacy policy
governs that request. If you prefer zero Google contact, a browser extension
that blocks `fonts.googleapis.com` will fall back to the system sans-serif
stack and everything will still work.

## Tool

[Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) — a
privacy-first, cookieless analytics product included in Cloudflare's free tier.
The beacon script loads from `static.cloudflareinsights.com` and reports to
`cloudflareinsights.com`. Both are Cloudflare-operated.

## Donations

The /support page links out to **Ko-fi** (`ko-fi.com`). No Ko-fi script or
iframe loads on Peliglot itself; the link is a plain `<a target="_blank">` and
no request is made until you click it. From the moment you click, you're on
Ko-fi's site and Ko-fi's privacy policy applies.

## Why

We want to know which collections are actually used so we can invest time in the
right places. That's the entire reason. We don't want to compromise the privacy
promise ("no accounts, no tracking") to get that signal, so we chose the tool
with the smallest footprint we could find.

## How to access

Dashboard at <https://dash.cloudflare.com> → Analytics & Logs → Web Analytics →
Peliglot.

Access is currently restricted to the project maintainer.
