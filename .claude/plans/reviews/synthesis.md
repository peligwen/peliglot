# Peliglot Codebase Review — Cross-Cutting Synthesis

## 1. Executive summary

Peliglot is in good shape as a *system*: the per-collection structure scales, `npm run check` passes, the largest chunk is at 70% of the 500 KB CI cap, and the freecad collection's 30/30 fix-and-verify cycle (see `freecad-verification.md`) demonstrates the review-to-resolution pipeline works end-to-end. The cross-cutting risks are concentrated in three areas. **First**, a small set of *shared-component contract drifts* propagate to every collection — `ExpandSection` prop name, `lightTheme.textSecondary` failing WCAG AA, `speakX` fallbacks pronouncing low-resource languages in English, and `AlphabetGrid` button aria-labels. **Second**, *orthography hygiene* is broken at the Unicode layer — Hawaiian uses U+0027 instead of U+02BB ʻokina collection-wide, Arabic collapses U+02BF ʿayn and U+02BE hamza into a single ASCII apostrophe in every guide. **Third**, the AI-interaction collection accumulated 24 version-pinned claims that were already wrong as of the project's 2026-04-24 environment date. Add to these a handful of *high-severity localized bugs* (Spanish C3 `darse cuenta` pronominal-cycler bug, Arabic C5 missing 5/13 conjugation forms, Music C1 Circle-of-Fifths producing wrong scales for 5 of 12 keys, Jazz-guitar C2 Cmaj7 audio missing the M7 the lesson teaches, Math C1 mortgage punchline off by 2×, AI C1 chain-of-thought demo labeled the inverse of what it shows) and the prioritized fix-list in §7 falls out naturally.

**By the numbers** (totals across all per-area reviews, freecad excluded since already resolved):
- **Critical:** 55 (Spanish 6 + Arabic 7 + English 6 + German 1 + Hawaiian 9 + Music 5 + Jazz-guitar 5 + Math 5 + AI 5 + Infrastructure 6).
- **Minor / effectiveness / coverage:** 126 minor + 116 effectiveness + 59 coverage gaps + 24 longevity-flagged claims.
- **Systemic vs. one-off (critical class only):** 7 of the 55 criticals collapse into 5 shared root-cause patterns enumerated in §2 — `ExpandSection` prop drift (P1, 1 instance: infra C1); speech-fallback (P2, 1 instance: infra C2 covering hawaiian E1 + arabic speech-config); theme contrast (P3, 1 instance: infra C4); ASCII apostrophe collapse (P4, 2 instances: hawaiian C1 + arabic C1); audio missing chord tones (P7, 2 instances: jazz-guitar C2 + music M5 promoted to systemic). The remaining 48 are one-off content/code bugs.
- **Recommendation:** ship-ready *if* the §7 top-15 fix-list is treated as a punch-list; the codebase is sound, content has known bugs.

---

## 2. Recurring component misuse

These are patterns where shared infrastructure is consistently used in a way that produces drift or quiet failure across multiple collections. In every case, a single fix addresses every instance — the leverage is high.

### P1. `ExpandSection` documented prop name doesn't match the actual API

The component's signature is `function ExpandSection({ label, color, children })` (`src/components/ExpandSection.jsx:3`), but `CLAUDE.md:220` documents it as `<ExpandSection title="Title">`. Anyone (Claude or human) generating new guides off the docs writes `title=`, gets an empty button label silently. The canonical reference is the wrong source of truth (see infrastructure.md C1).

**Fix (single edit):** Either update `CLAUDE.md` to use `label` and document `color`, or rename the prop to `title` in the component (one call site to migrate, in arabic guide10). The latter is preferable — it normalizes against `Card`, `DarkBox`, `QuizSection`, `FlashcardDeck`, all of which use `title`.

### P2. `speakX` falls back to system English voice silently when no language voice exists

`src/utils/speech.js:14–18` passes BCP-47 codes to Web Speech with no voice-availability check. Hawaiian (`'haw'`) has no voice on any major browser/OS as of 2026 — the synth uses the system default English voice and reads Hawaiian words in English. `'es'`, `'ar'`, `'de'` are bare codes and platform-default to Castilian / MSA-Saudi / de-DE, which mismatches: Spanish landing copy says "Mexican/US" (so `'es-MX'`), Arabic guides emphasize Palestinian dialect (closest available is `'ar-LB'`), German is fine (`'de-DE'`).

Affected collections: hawaiian (every Guide 1 letter audio), spanish (Castilian voice on Mexican-targeted content), arabic (MSA voice mispronouncing dialect transliterations), and any future low-resource collection. See infrastructure.md C2; hawaiian.md E1; arabic speech-config note.

**Fix (single edit):** In `speech.js`, add `pickVoice(prefix)` that runs `getVoices().find(v => v.lang.toLowerCase().startsWith(prefix))`; if it returns undefined, call `onEnd?.()` immediately and return — silent is better than wrong. Region-tag the durable codes (`'es-MX'`, `'de-DE'`). Add an 8-second `setTimeout` finish guard for Safari ghost failures. ~30 lines, fixes every "tap to hear" promise across the collection.

### P3. `lightTheme.textSecondary` is `#999` — fails WCAG AA across every collection

`themes.js:5–13` defines `textSecondary: '#999'` (used for sidebar guide subtitles, badges, ranking metadata) which gives 2.84:1 against `#FDFBF7` and 2.85:1 against `#fff` — well below AA's 4.5:1 minimum for normal text. `landing.css .card-sub` is `#888` (3.54:1 — also fails). Every collection inherits this through `GuideShell`.

**Fix (single edit):** Change `textSecondary` and `sidebarSubText` to `#6E6E6E` (4.6:1 — passes with headroom), and `landing.css .card-sub` to `#6e6e6e`. Optionally add a `textTertiary: '#999'` for genuinely de-emphasized text (large fonts only). See infrastructure.md C4.

### P4. ASCII apostrophe used for non-ASCII orthographic marks (PATTERN-LEVEL — Hawaiian's P1)

The Hawaiian collection uses U+0027 instead of U+02BB `ʻ` ʻokina in `meta.js` titles and in *the very minimal-pairs table that teaches the ʻokina* (`hawaiian/guide4.jsx:6–10`: `pa'u`, `'ai`, `ko'o`). The Arabic collection collapses U+02BF `ʿ` ʿayn and U+02BE `ʾ` hamza into a single `'` across every guide that touches transliteration (`arabic/guide1.jsx:5–32`, `guide6.jsx:7–20`, `guide7.jsx:7–10`, `guide8.jsx:30–31`, `guide17.jsx:4`, `guide27.jsx:4`, `guide30.jsx:10`). Both are pattern-level: they're "the developer hand-typed the easy character." See hawaiian.md C1 + Pattern P1, arabic.md C1.

**Fix (one tool, used once per collection):** Add a `npm run validate` lint rule that flags U+0027 between letters from a per-language non-ASCII character class. For Hawaiian, the class is `[aeiouāēīōūhklmnpwAEIOU…]`; for Arabic, the class is the Latin transliteration vowels and emphatic consonants. Then sweep both collections by hand (some `'` are legitimate English contractions in instructional prose and must stay). Spanish accents are correct; check before extending the rule.

### P5. `AlphabetGrid` letter buttons have no `aria-label`

`src/components/templates/AlphabetGrid.jsx:86–106` renders `<button>` containing `{ch}` plus optional name; no `aria-label`. For ʻokina, hamza, single non-ASCII characters, screen readers either skip or announce as "left single quotation mark" — neither helpful. Affects every alphabet guide across every language collection (Spanish 1, Arabic 1, English 1, German 1, Hawaiian 1, plus any future). See hawaiian.md P4.

**Fix (single template edit):** `aria-label={\`${ch}${nm ? \`, ${nm}\` : ''}\`}` on the button.

### P6. `useGuideNavigation` exhaustive-deps warnings flag a real latent bug

`src/hooks/useGuideNavigation.js:65, 108` — the keyboard and touch handler effects close over `prev` / `next` defined on every render. Today this is harmless because `setPage` is stable and `total` is in the deps, but the warnings will silently turn into stale-closure bugs the moment anyone adds state-dependent logic to navigation. Two unsuppressed warnings in CI is also a "tune-out" smell. See infrastructure.md C6.

**Fix:** Wrap `prev` / `next` in `useCallback` with `total` as the dep, add them to the effect's dep array.

### P7. Audio playback omits the chord tones the lesson teaches

Independent of language collections. **Music Guide 19** ProgressionPlayer plays `Dm – G – C` as triads when teaching ii-V-I — the "jazz backbone" lesson hinges on the 7ths (Dm7-G7-Cmaj7), and the audio doesn't reflect that. **Jazz-guitar Guides 1 and 18** have `Cmaj7`, `Fmaj7`, `Bbmaj7` audio arrays missing the M7 — the *very chord tone* whose half-step resolution from the V7's ♭7 is the central lesson. Same root cause: the audio array prioritizes "the visible voicing on screen" over "the chord-symbol's full note set." See music.md M5, jazz-guitar.md C2 (cross-referenced explicitly between the two reviews).

**Fix:** Either add a `chordExtensions` prop to `ProgressionPlayer` that defaults to producing the symbol's required tones, or factor a shared `chordToneArray(symbol)` helper. Audio fixes happen in two files (music `_helpers.jsx` and jazz-guitar `_helpers.jsx`), shared logic could live in a new `src/utils/chord.js`.

---

## 3. Orthography & character-encoding patterns

This deserves its own section because it's the highest-leverage *content* fix in the codebase: a single-pass automated check would prevent every recurrence, and the same fix is identical across every collection that has non-ASCII orthographic marks.

### The pattern

Three distinct manifestations, same shape:
- **Hawaiian** uses U+0027 `'` instead of U+02BB `ʻ` ʻokina collection-wide — most damningly in `meta.js` navigation titles and in the minimal-pairs table that teaches the ʻokina (`hawaiian.md C1`).
- **Arabic** collapses U+02BF `ʿ` ʿayn and U+02BE `ʾ` hamza into the same ASCII `'`, destroying a phonemic distinction that contrasts minimal pairs (*saʿd* vs. *saʾd*, both real words). Pervasive across alphabet, hamza, dialect transliterations (`arabic.md C1`).
- **Spanish** accents are correct (`á é í ó ú ñ ¿ ¡` all properly encoded), but the same risk pattern would apply to any new language with rich diacritics.

The primary sources are unambiguous: ALA-LC and DIN 31635 specify `ʿ` U+02BF for ʿayn and `ʾ` U+02BE for hamza; Wikipedia / UH Press / ʻAha Pūnana Leo / Pukui-Elbert all use U+02BB for ʻokina; standard cited in arabic.md C1 and hawaiian.md C1.

### Recommended fix — a single character-correctness lint

Add a script to `npm run validate` that scans `meta.js` and `guide*.jsx` for U+0027 between non-ASCII letters from each language's character class:

```js
// scripts/validate-orthography.cjs
const RULES = {
  hawaiian: { class: /[aeiouāēīōūhklmnpwAEIOUĀĒĪŌŪ]/, replacement: 'ʻ (U+02BB)' },
  arabic:   { class: /[āīūḥḍṣṭẓ]/, replacement: 'ʿ (U+02BF) for ʿayn / ʾ (U+02BE) for hamza' },
  // future languages add here
};
// flag: U+0027 with the class character on either side, in JSX string literals
```

Failures should print file:line and the offending substring. Some `'` are legitimate English contractions in instructional prose (`"don't"`, `"it's"`) — the rule must require both *neighbors* to match the language class, not just one.

This rule (a) prevents the bug recurring as new collections are added, (b) localizes the fix, (c) becomes a CI gate.

---

## 4. Cross-collection longevity risks

The patterns and claims below age badly and are scattered across multiple collections. Most of these are flagged in the per-area reviews; this section consolidates them and proposes a quarterly hygiene cadence.

### Version-pinned vendor / model / app names

The biggest concentration is `ai-interaction.md` (24 longevity-flagged claims, including 2 that are **already wrong** in 2026-04: "Codeium" + "Windsurf" listed as separate tools when Codeium *rebranded* to Windsurf in April 2025 and was subsequently acquired by Cognition AI; entire frontier-model list `GPT-4o, Claude Opus, Gemini Ultra` in `guide24.jsx:8–13` is 1–2 generations stale; "10× Google search" energy claim was revised ~10× downward by Epoch AI in Feb 2025; "Models don't have hidden thoughts" is contradicted by reasoning models — see ai-interaction.md C2/C3/C4/C5). Music and jazz-guitar are largely safe (Tone.js is the one named tool, and `tone@^14.8` is supported through 14.x bugfixes per infrastructure.md L3).

**Pattern fix:** stop naming specific products, vendors, and models in instructional content. Replace with categories ("frontier reasoning model," "agentic IDE," "inline-completion plugin"). The collection itself nails this in `ai-interaction/guide24.jsx:76–82` ("the model landscape moves fast … today's frontier model is next year's mid-tier") — that durable framing should govern the whole collection, not be quarantined to one card.

### Pop-culture / dated examples

The single clearest one is `music/guide15.jsx:11`: "Money" (Pink Floyd) is labeled `7/8` when it's universally known to be in `7/4` (`music.md C3`). This is partly factual error and partly "tied to a specific song that has a documented meter you can be wrong about." Solution: when a claim *can* be verified against published scores, verify it.

### Dialect / regional claims, unsourced

- Spanish M9 (`waiter at a casual restaurant — usted` — should hedge for Spain).
- Arabic M18 (Egyptian Arabic = "most widely understood" claim is durable but increasingly contested).
- English M18 (tipping % drifted upward post-2020).
- German M3 (`möchten` listed as a modal but `mögen` omitted — pedagogical convention drift).

These age more slowly than tech claims but still drift over a 5-year window.

### Dependency / framework risks

Per infrastructure.md L1–L3:
- **React 18 → 19:** clean drop-in. No `forwardRef`/`defaultProps`/`findDOMNode`/`componentWillMount` blockers. Strict Mode already enabled.
- **Vite 6 → 7:** clean. `manualChunks` API stable.
- **Tone 14 → 15:** API used (`PolySynth.triggerAttackRelease`) is unchanged across major versions.
- **Wrangler 3 → 4:** one-line `package.json` bump; the `assets:` block is already in `wrangler.jsonc`.

### Recommended longevity hygiene checklist (run quarterly)

1. **Fact-check named products / models / pricing claims** against vendor pages. If a name has changed, replace with a category. If a number has changed >50%, update; if <50%, soften wording.
2. **Re-run `npm run check`** plus a fresh `npm audit` and dependency scan against latest minors.
3. **Spot-check 1 song / 1 cultural example per non-AI collection** against published authoritative sources (e.g. for music, the published score).
4. **Re-walk the AI-interaction collection's longevity table (L1–L24 in ai-interaction.md).** It's a literal checklist; mark each row "still durable" / "needs update."
5. **Run the orthography lint** (per §3).
6. **Diff `CLAUDE.md` against shared-component signatures** to catch `ExpandSection`-style drift early.

Quarterly is the right cadence: AI moves in months, but most pedagogical content moves in years. Per-collection content reviews on the freecad-style cadence (one comprehensive review per year per collection) would catch deeper drift; the quarterly check is for surface drift only.

---

## 5. Content redundancy & consolidation across language collections

The five language collections (spanish, arabic, english, german, hawaiian) share `GuideShell`, `Card`, `DarkBox`, `Insight`, `AlphabetGrid`, `VerbConjugation`, `QuizSection`, plus `_helpers.jsx` per collection. Coverage is linguistically distinct — this is intentional and largely correct. A few patterns *could* consolidate; many should not.

### Consolidation candidates (worth doing)

- **Alphabet introductions** — All five language collections use `AlphabetGrid` for Guide 1. The template handles filters, detail panels, and audio. Hawaiian and Arabic both want a "throat letters / non-connecting letters / digraphs" filter pattern that's currently per-language. Consider extending `AlphabetGrid`'s `filterGroups` doc to be a stronger first-class concept.
- **False-friend / cognate cards** — Spanish Guide 25, English Guide 30, German Guide 32 each implement a `FalsoAmigo`-style component with subtly different shape. These could be a shared `FalsoAmigo` component in `src/components/`. See english.md "Code-quality notes."
- **Pronoun tables** — Each language collection ships a personal-pronoun reference table with similar structure (subject / object / possessive). The Hawaiian `Guide 15` and Arabic `Guide 15` both fail symmetric coverage (Hawaiian C2 typo, Arabic C4 missing forms). A shared `PronounTable` component would normalize the structure and make completeness checks easier to perform manually.
- **Reflexive / pronominal verb conjugation** — The Spanish `darse cuenta` bug (spanish.md C3) is a special case of "pronominal verb" that the data shape didn't handle. If reflexive verbs become a recurring pattern, extend `VerbConjugation` to accept a `reflexive: true` row property.
- **Helper component discipline (Hawaiian's pattern-level note 5)** — Hawaiian's `_helpers.jsx` is ~6 lines (3 small components: `Insight` wrapper, `CultureNote`, `Hw`). The reference pattern. Other collections drift toward larger helpers; the convention "shared components live in `src/components/`; per-collection helpers are *light* and only for collection-specific styling" should be added to `CLAUDE.md`.

### Keep separate because…

- **Conjugation systems** — Spanish has 6 pronoun rows, vosotros + voseo regional variations; Arabic has 13 in MSA (singular + dual + plural × m/f); German has 6 with separable-verb interactions; Hawaiian doesn't conjugate verbs at all (TAM markers vary instead). A shared "VerbConjugation" template would have to absorb mutually exclusive structural differences. The current `VerbConjugation` template is correctly scoped to "pronoun × stem-and-ending tables" and shouldn't expand.
- **Case systems** — German has 4 cases × 3 genders + plural × 3 article paradigms (def / indef / null); Arabic has 3 cases × 3 number × 2 gender plus diptote class; Hawaiian has no case morphology, a/o-class possessive logic instead. Cases ≠ a shared template.
- **Scripts / orthographies** — Arabic is RTL with connecting/non-connecting letters and root-and-pattern morphology; Hebrew (if added later) is also RTL; Hawaiian has 13 letters and a glottal-stop letter; Spanish/English/German share Latin script but differ in diacritic conventions. Per-collection `_helpers.jsx` handles per-script rendering correctly.
- **Dialect callouts** — Each language has a unique dialect framing (Spanish voseo/sheísmo/leísmo, Arabic Palestinian, English Chattanooga "Chatt", German Hochdeutsch baseline, Hawaiian vs. Hawaiʻi Pidgin). These are pedagogically distinct framings, not the same component.
- **Hawaiian's pepeke framework** (hawaiian.md C3) — the `Pepeke ʻAike He / Pepeke ʻAike ʻO / Pepeke Painu / Pepeke Henua` system is a real Hawaiian-specific grammatical framework with no analog in Indo-European pedagogy. Don't generalize.

### Praise to spread (per the brief)

- **Hawaiian pepeke framework** (Guide 6, once hawaiian.md C3 is fixed) — explicit grammatical-framework instruction is a strong pattern. Spanish/English/German could borrow the *idea* (an explicit "sentence-pattern framework" guide) without the specific terminology.
- **English's Chatt callouts** — region-specific dialect notes integrated into core grammar guides (rather than ghettoed into a single dialect chapter). Genuinely useful for the Chattanooga audience and pedagogically novel. Consider a "Pal" callout discipline check across the Arabic collection (arabic.md E13: "alternates between Palestinian / Levantine / Palestinian Arabic — pick one").
- **Spanish RAE-grounded paradigms** (Guides 4–10, 28–30) — every conjugation paradigm is verifiable against RAE *NGLE*. The discipline of citing primary sources in the data layer (not just the review) is a model worth replicating.

---

## 6. Pedagogy patterns

### What works (port these patterns)

- **Interactive frameworks that teach a *system*, not a fact.** Hawaiian's pepeke (once C3 is fixed) and the freecad collection's Guide 12 DoF interactive (per the brief) both succeed because the user is learning how to *think* about the domain, not memorizing items. Spanish Guide 17 (ser/estar shifts table) does this well. The Arabic root-system Guide 30 is praised for the same reason.
- **Praise-worthy callout components.** English's Chatt component is a discrete cultural-context callout that doesn't disrupt the main grammar flow. Hawaiian's `CultureNote` 🌿 is similar. Both succeed by being *small and specific* rather than long and meandering.
- **Frequency-graded examples.** Spanish Guide 8 (six perfect tenses) is information-dense; the music collection's E5 "common vs. rare filter" recommendation captures the same idea. When a guide has 6+ items, mark which 2–3 are daily-use.
- **Audio per row in conjugation tables** (arabic.md E6) — when speech voices exist (German, Spanish, English), conjugation tables benefit hugely from row-level audio because prosody/stress is crucial. Hawaiian and Arabic collections are blocked here by §2-P2 (speech fallback) — fix that, the value lights up.

### Anti-patterns to avoid (decorative interactivity that doesn't teach)

- **Math collection has "decorative counters"** (per math.md). The `coin-flip simulator` (Guide 20) shows totals but not a histogram — the central limit theorem is the *lesson* and it's invisible. The mortgage calculator (Guide 28) shows endpoints but not balance-over-time. Interactive ≠ pedagogical; the right test is "does clicking change what the user understands?"
- **Single-tap audio on alphabet guides** (spanish.md E1) — letter audio plays once per click. A "tap to start auto-tour" mode that cycles the alphabet would 10× the drilling value with the same data. Same opportunity in Hawaiian Guide 1 once the speech fallback (P2) is solved.
- **Audio that demonstrates the *opposite* of the lesson** (jazz-guitar.md C2; music.md M5). Cmaj7 audio that's a C major triad teaches the wrong thing. The audio test is "does playing this back demonstrate the headline claim?"
- **Quizzes that don't surface the *why*** (spanish.md E9). Guide 18 has rationale data (`why:"purpose/goal"`) for each por/para item, but the quiz UI doesn't show it on the result screen. Data exists; surface it.
- **Prose where a diagram would land** (jazz-guitar.md E10, math.md E4, ai-interaction.md E9). Guide 21 "song forms" is text when a 4-block diagram would teach in 2 seconds. Math Guide 15 (coordinate geometry) is text-only in a deck where most peer guides have sliders.

---

## 7. Prioritized cross-codebase fix-list

The top 15 follow-ups, ordered by impact / effort. Each is independently take-or-skip.

| # | Title | Files | Why it matters | Effort | Lens |
|---|---|---|---|---|---|
| 1 | **Fix `lightTheme.textSecondary` contrast (P3)** | `src/styles/themes.js`, `src/styles/landing.css` | WCAG AA fail on every collection's sidebar subtitles, badges, and landing-page subheadings (#999/#888 → #6E6E6E). Single-token edit, every collection inherits. | Trivial | Accuracy |
| 2 | **Add `speakX` voice-availability fallback (P2)** | `src/utils/speech.js`, `hawaiian/guide1.jsx` | Hawaiian guides currently mispronounce in English; Spanish gets Castilian voice on Mexican-targeted content. ~30 lines with a `pickVoice()` helper, region-tag durable codes, 8s safety timeout. | Small | Effectiveness |
| 3 | **Reconcile `ExpandSection` API drift (P1)** | `CLAUDE.md`, `src/components/ExpandSection.jsx`, `arabic/guides/guide10.jsx` | Future Claude generations will write `title=` and silently render empty headers. Either rename prop in component (one call site) or fix CLAUDE.md row. | Trivial | Effectiveness |
| 4 | **Add orthography lint to `npm run validate` (§3)** | `scripts/validate-orthography.cjs` (new), `package.json`, hawaiian + arabic guides for sweep | Prevents ʻokina / ʿayn / hamza ASCII collapse from recurring; fixes the existing instances in one sweep. Hawaiian C1 and Arabic C1 are both pattern-level. | Medium | Accuracy |
| 5 | **Fix Music Circle of Fifths scale-builder (music C1)** | `music/guides/guide5.jsx`, `music/guides/guide7.jsx`, `music/_helpers.jsx` | Db / Eb / Ab / Bb / F# major scales currently display the wrong scale (root letter is stripped, not enharmonically mapped). Same root cause as guide7's broken Bb root. Add `ENHARMONIC` map; reverse-spell display. | Small | Accuracy |
| 6 | **Add M7 to Cmaj7 / Fmaj7 / Bbmaj7 audio (jazz-guitar C2; music M5)** | `jazz-guitar/guides/guide1.jsx`, `guide18.jsx`; `music/_helpers.jsx` | Audio is the *lesson*; the missing M7 is the resolution the lesson teaches. Music ProgressionPlayer has the same shape (triads instead of 7ths). Shared `chordToneArray()` helper recommended. | Small | Effectiveness |
| 7 | **Fix Spanish `darse cuenta` pronominal-cycler (spanish C3)** | `spanish/guides/guide32.jsx` | Real code bug: yields ungrammatical `"doy se cuenta de"` for yo. Add `reflexive:true` flag + reflexive-pronoun array branch in render. | Trivial | Accuracy |
| 8 | **Fix AI-interaction Guide 9 CoT demo (ai-interaction C1)** | `ai-interaction/guides/guide9.jsx` | Direct (no CoT) labeled "(incorrect)" but shows correct answer; footnote says "Both get 56 here." Five-character fix (or rewrite Direct response to a plausible failure mode). | Trivial | Accuracy |
| 9 | **Update Math mortgage punchline (math C1)** | `math/guides/guide32.jsx` | "$70K+" claim for 6% vs 6.5% on $300K is actually ~$35K (the $70K matches 6% vs 7%). Closing capstone, most concrete claim, off by 2×. Replace number or replace rates. | Trivial | Accuracy |
| 10 | **Strip vendor / model names from AI-interaction Guide 24 (ai-interaction C5; L3, L17, L23)** | `ai-interaction/guides/guide24.jsx`, `guide18.jsx`, `guide3.jsx` | Frontier list (`GPT-4o, Claude Opus, Gemini Ultra`) is 1–2 generations stale; Codeium and Windsurf listed as separate tools (same product). Replace with category descriptions; the guide's own callout says "specific names go out of date." | Small | Longevity |
| 11 | **Add Hawaiian `ʻolua` typo + pepeke + Pōʻakahi etymology fixes (hawaiian C2, C3, C8)** | `hawaiian/guides/guide15.jsx`, `guide6.jsx`, `guide25.jsx`, `meta.js` | Three localized accuracy fixes in the reference-implementation collection. `ʻlua` → `ʻolua`, mislabeled pepeke terminology + swapped examples, wrong day-name etymology. Each is a one-line edit; collectively they restore the collection's authority. | Small | Accuracy |
| 12 | **Add Arabic conjugation completeness (arabic C4, C5)** | `arabic/guides/guide15.jsx`, `guide18.jsx`, `guide19.jsx` | MSA tables show 8 of 13 forms; Guide 13 ("Dual Form") teaches the dual but Guide 15 omits the dual pronouns. Add the 5 missing rows (or wrap in ExpandSection). Internal coherence fix; no new pedagogy needed. | Medium | Accuracy |
| 13 | **Fix English Guide 9 AmE/Present-Perfect framing + Guide 13 phrasal-verb separability (english C1, C4)** | `english/guides/guide9.jsx`, `guide13.jsx` | "AmE always uses simple past" is an ESL-textbook caricature; the real rule is narrower (already / just / yet). Guide 13 entirely omits separable / inseparable distinction — *the* highest-frequency phrasal-verb error pattern. Add `sep` boolean and Trampa. | Medium | Accuracy |
| 14 | **Fix `useGuideNavigation` exhaustive-deps warnings (P6)** | `src/hooks/useGuideNavigation.js` | Two unsuppressed warnings in CI is "tune-out" smell; warnings flag a real (latent) stale-closure bug. Wrap `prev` / `next` in `useCallback`. | Trivial | Effectiveness |
| 15 | **Add `aria-label` to `AlphabetGrid` buttons (P5)** | `src/components/templates/AlphabetGrid.jsx` | Every alphabet guide currently has letter buttons that announce as "left single quotation mark" or are skipped by screen readers. One template edit, every alphabet guide benefits. | Trivial | Accuracy |

**Quick wins (bottom-up):** items 1, 3, 7, 8, 9, 14, 15 are all trivial — together they take an afternoon and resolve 7 high-impact issues across the codebase, including 4 that touch every collection.

**Single-fix-touches-every-collection wins:** 1, 2, 3, 4, 14, 15 (6 items).

**Specific high-severity bug wins:** 5, 6, 7, 8, 9, 11, 12, 13 (8 items).

**Longevity-class win:** 10.

---

## 8. Open recommendations to the user

Three meta-recommendations beyond the fix list itself.

### R1. Add a content pre-commit check

Create `npm run validate-content` that runs (a) the orthography lint from §3, (b) an internal-link integrity check (`Guide N` references resolve to actual guides), (c) a "broken Unicode" check (BOM, mismatched surrogate pairs), and (d) a "hard-coded version pinning" check that flags strings matching `^(GPT-|Claude-|Gemini-|Llama-)\d` outside of designated longevity-acknowledged sections. The check would run in CI and as a Husky pre-commit hook. Modeled on the `validate-guides.cjs` infrastructure already in place.

### R2. Add a "shared-component contract" section to `CLAUDE.md`

Given the `ExpandSection` drift discovered in this review, `CLAUDE.md` should grow a section explicitly documenting the prop contracts of every shared component, with the source-of-truth pointing to the component file (or, better, generated from JSDoc). Today the components table lists prop *example* usage but not signature; that's how `title` vs `label` drift slipped in. The fix is structural, not editorial: `CLAUDE.md` should reference `src/components/*.jsx` JSDoc rather than restating it.

### R3. Adopt the freecad review-and-verify cadence as standard

The freecad collection went through: (a) comprehensive per-area review (`freecad-review.md`, the original), (b) 2 fix commits (`d4cf99b`, `d5007b0`) covering all 8 critical + 9 minor + 13 effectiveness items, (c) verification review (`freecad-verification.md`) confirming 30/30 resolved with no regressions. The cadence works — and `freecad-verification.md` is direct evidence that "comprehensive review → focused fix sprint → verify" is the right shape. Apply this to the other 9 collections in the same order (highest-impact-first per §7), one collection per sprint, so each collection eventually carries a `*-review.md` + `*-verification.md` pair. The current 11 per-area reviews already serve as the input for sprints 1–10.

---

## 9. Sources

This synthesis cites only the per-area reviews; each per-area review cites primary sources directly. Cross-cutting references reached for in this synthesis:

- `/Users/gwen/peliglot/.claude/plans/reviews/spanish.md` — RAE *NGLE*, *DPD*, *DLE*, *Ortografía* 2010; Butt & Benjamin; Lipski.
- `/Users/gwen/peliglot/.claude/plans/reviews/arabic.md` — Ryding; Wright; Al-Kitaab; Hans Wehr; Wightwick & Gaafar; Watson; ALA-LC / DIN 31635 romanization standards.
- `/Users/gwen/peliglot/.claude/plans/reviews/english.md` — Cambridge Grammar (Huddleston & Pullum); Quirk et al.; Swan; Wells *Accents of English*; Labov / Atlas of North American English; Battistella on doubled modals.
- `/Users/gwen/peliglot/.claude/plans/reviews/german.md` — Hammer's German Grammar; Duden Grammatik; Goethe-Institut; Rat für deutsche Rechtschreibung.
- `/Users/gwen/peliglot/.claude/plans/reviews/hawaiian.md` — Pukui & Elbert; Schütz *The Voices of Eden*; Hawkins *Hawaiian Sentence Structures*; ʻAha Pūnana Leo curricula; wehewehe.org.
- `/Users/gwen/peliglot/.claude/plans/reviews/music.md` — Aldwell & Schachter; Mark Levine; Walter Piston; Persichetti.
- `/Users/gwen/peliglot/.claude/plans/reviews/jazz-guitar.md` — Mark Levine; William Leavitt; Mick Goodrick; Joe Pass; Mickey Baker; Barry Harris; Bergonzi.
- `/Users/gwen/peliglot/.claude/plans/reviews/math.md` — Wolfram MathWorld; Spivak; Larson; Graham/Knuth/Patashnik; Moore *Basic Practice of Statistics*; Mankiw; IRS Rev. Procs. 2023-34 / 2024-40.
- `/Users/gwen/peliglot/.claude/plans/reviews/ai-interaction.md` — Anthropic / OpenAI / Google primary docs (extended thinking, MCP, o1 system card); Wei et al. (CoT); Yao et al. (ReAct); Liu et al. (lost in the middle); Schaeffer et al. (mirage); Epoch AI energy reanalysis (2025).
- `/Users/gwen/peliglot/.claude/plans/reviews/infrastructure.md` — WebAIM contrast checker; WCAG 2.1 AA §1.4.3; React Router 7 docs; Tone.js docs; MDN `SpeechSynthesisUtterance`.
- `/Users/gwen/peliglot/.claude/plans/reviews/freecad-verification.md` — verifies fix commits `d4cf99b` and `d5007b0` against `freecad-review.md`; cited as evidence for R3.

Cross-cutting standards referenced directly:
- **WCAG 2.2** — Web Content Accessibility Guidelines, §1.4.3 (Contrast Minimum), §2.4.3 (Focus Order), §2.4.7 (Focus Visible). https://www.w3.org/TR/WCAG22/
- **Unicode Standard** — Modifier Letters block (U+02B0–U+02FF); Arabic block (U+0600–U+06FF); General Punctuation (U+2018 left single quotation, U+02BB modifier letter turned comma, distinct code points). https://www.unicode.org/charts/
- **ALA-LC Romanization Tables** — Library of Congress, Arabic table (2012). https://www.loc.gov/catdir/cpso/romanization/arabic.pdf
- **DIN 31635:2011** — Romanization of the Arabic alphabet.
- **React 19 release notes** — for L1 readiness in `infrastructure.md`. https://react.dev/blog/2024/12/05/react-19
