# Phase 1.5 — Cross-Collection Audit

Scope: one targeted improvement per collection (~2h each). "No change" is a valid and valued outcome.
Files off-limits: shared components/templates, router, positioning.ts, SupportersPage, e2e/.

| Collection | Strong | Weak / Dated / Inconsistent | Targeted improvement | Landed |
|---|---|---|---|---|
| **spanish** | 33 guides covering the full grammar arc: alphabet through regional dialects. Consistent inline style, per-guide files, quiz sections, IPA throughout. False cognates guide and subjunctive guides are thorough. | Nothing material. Minor: some guides use terse inline styles that could use whitespace, but that's house style, not a bug. | No change — collection is consistent and complete. | — |
| **arabic** | 30 guides with isolated/initial/medial/final letter forms, Palestinian dialect notes (pal field) woven into every pronoun and verb guide, ar-LB lang code intentional for Levantine focus. | Nothing material. The dialect coverage is an intentional editorial choice, not a gap. | No change — collection is consistent and complete. | — |
| **english** | 35 guides for Spanish-speaking learners; Chattanooga dialect notes; y'all guide; IPA clusters mapped to Spanish speaker interference patterns. The audience framing is tight and consistent. | Nothing material. The regional flavor is coherent throughout. | No change — collection is consistent and complete. | — |
| **german** | 33 guides. Modalpartikeln guide (31) is the most complex and hardest to teach topic; it exists, which many courses skip. Adjective endings guide is interactive with three modes. | guide31 subtitle reads "Doch, Mal, Ja, Halt…" but only covers 5 particles (doch, mal, ja, halt/eben, eigentlich). Missing denn, wohl, schon, bloß/nur — all high-frequency. The trailing ellipsis in the subtitle sets an expectation the content doesn't meet. | Add the 4 missing particles (denn, wohl, schon, bloß/nur) to guide31 with usage notes and example sentences. Fix or remove the subtitle ellipsis. | DONE — see below |
| **hawaiian** | 30 guides. 13-letter alphabet guide self-flags that no browser ships a Hawaiian voice ("No browser currently ships a Hawaiian voice" shown in footerContent). Cultural revival coverage is deep. Possessives guide includes O/A-class cultural rationale. | Audio limitation is already honestly flagged in the UI. Not an actionable gap here. | No change — collection is consistent and complete; limitation is self-acknowledged. | — |
| **music** | 30 guides from piano basics through genre fingerprints. Piano component with real playNote audio, progression player with root selector and V7 toggle, genre guide is memorable. | Nothing material. | No change — collection is consistent and complete. | — |
| **jazz-guitar** | 32 guides for musicians-not-beginners. Drop-2 voicings with verified fret positions annotated in code, ii-V-I approaches, Bird Blues and Standard 12-bar variants. Voice matches the one-liner: "written for musicians, not beginners." | Nothing material. | No change — collection is consistent and complete. | — |
| **math** | 32 guides anchored in personal finance and real-world applications. Compound interest calculator with SVG chart, relatable "math you already do" framing. Zoomable number line in guide1. | Nothing material. | No change — collection is consistent and complete. | — |
| **ai-interaction** | 28 guides covering LLM internals, prompting, MCP protocols. Technically current and accurate. Per-guide file structure clean. | Multiple guides (at minimum guide1, guide16, guide28) use the generic DarkBox title "THE BIG IDEA" — all caps, formulaic, not the collection's natural voice. The collection's voice is direct and specific; this pattern is neither. It reads like a textbook callout, which is exactly what this site's voice is not. | Replace "THE BIG IDEA" DarkBox titles across all affected ai-interaction guides with specific, descriptive titles that match the actual content. | DONE — see below |
| **freecad** | 30 guides from unit setup through TNP/crash recovery. guide30 (Pitfalls & Recovery) is particularly strong — honest, specific, actionable. | guide20 (Heat-Set Inserts) has HTML entity bugs in JavaScript string data: `&apos;` and `&quot;` literals in JS strings that React renders as literal text, not as apostrophes/quotes. React only decodes HTML entities in JSX text nodes, not in string values passed via `{}`. | Fix the HTML entities in guide20: replace `&apos;` with `'` and `&quot;` with `"` in the JS string data. | DONE — see below |

---

## Improvements Executed

### German guide31 — Modalpartikeln (DONE)

Added 4 missing particles: `denn`, `wohl`, `schon`, `bloß/nur`. Each has a usage note and two example sentences. Updated subtitle to remove the trailing ellipsis that implied more content than was present.

### AI-Interaction — "THE BIG IDEA" DarkBox titles (DONE)

Replaced generic "THE BIG IDEA" DarkBox titles with specific descriptive titles across all affected guides. Titles now match the actual concept being introduced rather than using a formulaic all-caps callout.

### FreeCAD guide20 — HTML entity bugs (DONE)

Replaced `&apos;` with `'` and `&quot;` with `"` in JavaScript string data throughout guide20. These were rendering as literal entity strings in the browser.
