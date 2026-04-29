# Spanish Audio Audit

**Last updated:** Phase 2 Thread B.1 — audio audit (2026-04-29)
**Scope:** All 27 CardKinds × audio behavior in the practice flow
**Source files audited:** `src/guides/spanish/practice/index.tsx`,
`src/guides/spanish/mastery/extractors/guide*.ts`, `src/utils/speech.ts`,
`src/mastery/cards.ts`

---

## 1. Audio coverage matrix

Column definitions:

- **Auto-play on reveal** — `KINDS_AUTO_PLAY_ON_REVEAL` (`index.tsx`): the
  answer audio fires automatically when the card flips.
- **Prompt speaker button** — `KINDS_WITH_PROMPT_SPEAK` (`index.tsx`): a
  speaker icon appears on the *question* side so the learner can hear the
  prompt before answering.
- **speakText source** — what string is passed to `speakSpanish()` (from the
  extractor). "answer" means `card.answer` is used as the fallback when
  `speakText` is absent.
- **Cards in pool** — from `spanish-mastery-audit.md`; counts are as of Phase
  2c.5 (678 total).
- **Verdict** — current audio gap assessment.

### 1a. Self-rate kinds (no typed input, no MCQ)

These two kinds are neither in `TYPING_ENABLED_KINDS` nor `MCQ_KINDS`. The
learner sees the prompt, self-assesses, and rates.

| CardKind | Auto-play on reveal | Prompt speaker | speakText source | Cards | Verdict |
|----------|--------------------|-|----------------|-------|---------|
| `letter-sound` | yes | **yes** | letter NAME (e.g. "be"), NOT IPA — intentional | 30 | OK — prompt speaker enables listen-then-recall; auto-play reinforces the name on reveal |
| `word-stress` | no | no | bare word (dots stripped) | 18 | **gap: add reveal auto-play** — hearing the word spoken aloud after self-assessment reinforces the stress rule; the answer is rule-based so a speaker button on the prompt has low value, but reveal play-back does |

### 1b. Typing-enabled kinds — verb conjugation family

| CardKind | Auto-play on reveal | Prompt speaker | speakText source | Cards | Verdict |
|----------|--------------------|-|----------------|-------|---------|
| `verb-conjugation` | yes | no | conjugated form | 66 | OK — auto-play fires the target form; prompt already contains the infinitive as text |
| `verb-conjugation-stem-change` | yes | no | conjugated form | 24 | OK |
| `verb-conjugation-tensed` | yes | no | conjugated form | 210 | OK |
| `verb-spelling-change` | no | no | conjugated target form | 17 | **gap: add reveal auto-play** — learner should hear the spelled form to confirm pronunciation matches the written change |
| `imperative-tu` | yes | no | command form | 16 | OK |

### 1c. Typing-enabled kinds — noun / adjective family

| CardKind | Auto-play on reveal | Prompt speaker | speakText source | Cards | Verdict |
|----------|--------------------|-|----------------|-------|---------|
| `noun-gender` | no | no | bare noun | 19 | **gap: add reveal auto-play** — noun gender answers ("el"/"la") are short; hearing the noun spoken at reveal reinforces pronunciation alongside the gender rule |
| `noun-plural` | no | no | plural form | 19 | **gap: add reveal auto-play** — hearing the plural form spoken reinforces the pronunciation of plural endings (especially `-ces`, `-iones`) |
| `noun-adj-agreement` | no | no | `"${nounForm} ${agreedForm}"` | 20 | **gap: add reveal auto-play** — full noun+adjective phrase is exactly the value to reinforce through audio |

### 1d. Typing-enabled kinds — pronoun / register

| CardKind | Auto-play on reveal | Prompt speaker | speakText source | Cards | Verdict |
|----------|--------------------|-|----------------|-------|---------|
| `english-to-pronoun` | no | no | pronoun | 30 | **gap: add reveal auto-play** — pronoun pronunciation (especially "nosotros/vosotros", IO/prepositional pronouns) benefits from audio |
| `tu-vs-usted` | no | no | `card.answer` fallback ("tú" or "usted") — guide24 sets no `speakText` | 8 | **gap: add reveal auto-play + fix speakText in extractor** — current fallback speaks "tú" or "usted" without sentence context; extractor should set `speakText` to the situation sentence for listening reinforcement |

### 1e. Typing-enabled kinds — structural choice (prepositions, ser/estar)

| CardKind | Auto-play on reveal | Prompt speaker | speakText source | Cards | Verdict |
|----------|--------------------|-|----------------|-------|---------|
| `ser-vs-estar` | no | no | full Spanish sentence | 28 | **gap: add prompt speaker** — the prompt IS a Spanish sentence (the `sentence` field); learners benefit from hearing it before choosing ser/estar |
| `por-vs-para` | no | no | sentence with blank filled | 10 | **gap: add prompt speaker** — prompt contains a Spanish sentence with a blank; hearing the surrounding phrase helps with listening discrimination |
| `verb-prep-pair` | no | no | bare verb | 23 | **low priority** — prompt is English meaning, answer is the required preposition; neither side is meaningfully audio-first |

### 1f. Typing-enabled kinds — translation / production

| CardKind | Auto-play on reveal | Prompt speaker | speakText source | Cards | Verdict |
|----------|--------------------|-|----------------|-------|---------|
| `gustar-pattern` | no | no | Spanish answer sentence | 10 | **gap: add reveal auto-play** — learner hears full gustar sentence after typing; reinforces SOV-inverted word order through audio |
| `negation-translate` | no | no | Spanish answer sentence | 8 | **gap: add reveal auto-play** — hearing the double-negative construction reinforces spoken rhythm |
| `number-spell` | no | no | Spanish spelling | 38 | **gap: add reveal auto-play** — hearing the spoken number after typing the spelling is a strong reinforcement loop |
| `weather-expression` | no | no | Spanish expression | 14 | **gap: add reveal auto-play** — short fixed phrases are ideal for audio reinforcement |
| `question-word` | no | no | sentence with answer filled in | 8 | **gap: add reveal auto-play** |
| `comparative-irregular` | no | no | comparative form | 4 | **gap: add reveal auto-play** |
| `reflexive-daily-routine` | no | no | Spanish infinitive | 6 | **gap: add reveal auto-play** |
| `reciprocal-translate` | no | no | Spanish sentence | 3 | **gap: add reveal auto-play** |
| `sentence-correction` | no | no | corrected sentence | 7 | **gap: add reveal auto-play** — hearing the correct sentence spoken after the error is the reinforcement value |

### 1g. MCQ kinds (English-answer)

These three kinds are in `MCQ_KINDS` and return English text as the answer.
`ENGLISH_ANSWER_KINDS` is currently an **empty Set**. No current code path in
the practice renderer calls `speakSpanish()` on these kinds: none of them appear
in `KINDS_AUTO_PLAY_ON_REVEAL` (which contains only `letter-sound` and the
verb-conjugation family) and none appear in `KINDS_WITH_PROMPT_SPEAK`.
Therefore there is no active garbled-audio bug today.

However, `ENGLISH_ANSWER_KINDS` exists as a guard precisely for the scenario
where a reveal-speak path is later added for MCQ kinds. If any of these three
kinds were added to `KINDS_AUTO_PLAY_ON_REVEAL` without first being added to
`ENGLISH_ANSWER_KINDS`, `speakSpanish()` would speak the English answer string
over the es-MX voice (garbled audio). Section 3 Concern 2 flags populating
`ENGLISH_ANSWER_KINDS` as a guard to put in place before any listening-only
MCQ paths ship in Phase 3.

| CardKind | Auto-play on reveal | Prompt speaker | speakText source | Cards | Verdict |
|----------|--------------------|-|----------------|-------|---------|
| `false-cognate` | no | no | Spanish word (`card.prompt.spanish`) | 15 | **gap: add prompt speaker using the Spanish word** — the Spanish term in the prompt is exactly what should be spoken; `ENGLISH_ANSWER_KINDS` should include this kind so reveal-speak is suppressed |
| `reflexive-meaning-change` | no | no | reflexive form (e.g. "dormirse") | 5 | **gap: add prompt speaker using the reflexive form** — same ENGLISH_ANSWER_KINDS concern |
| `idiom-meaning` | no | no | Spanish idiom | 22 | **gap: add prompt speaker using the idiom** — idiom-meaning MCQ is audio-first by nature; the learner should hear the idiom spoken, then choose the English meaning |

---

## 2. New CardKind proposals

### 2a. `listening-recall` — hear the word, type what you heard

**Motivation:** The current practice flow is 100% read-then-produce. No kind
asks the learner to hear Spanish audio and respond to it — even though the
Web Speech API is already integrated and most extractors set `speakText`.
Listening comprehension (recognizing words by sound) is a distinct skill from
reading-then-producing. Guides 1, 23, and 27 have structured word lists whose
`speakText` values are clean, short, and suitable for a "listen and type what
you heard" prompt.

**Proposed prompt shape:**

```ts
{ kind: 'listening-recall'; speakText: string; hint?: string }
```

**Answer:** the Spanish text that was spoken (same as `speakText`).

**Extraction surface:**
- Guide 1 (letters): 30 letter names — auto-play fires "be", "eme", "eñe";
  learner types the Spanish letter name.
- Guide 23 (numbers): 38 cardinals/ordinals — auto-play fires the spoken
  number; learner types the Spanish spelling (exact complement of the existing
  `number-spell` card which is read→write).
- Guide 27 (weather): 14 expressions — auto-play fires "hace frío"; learner
  types the expression.

**Practice renderer:** prompt side shows a large play button and optional hint
(e.g. category label); no text shown until reveal. Typed-answer input enabled.

**Effort:** new `CardKind` entry + `PromptShape` entry + extractor variants
for guides 1, 23, 27 + renderer branch in `renderers.tsx`.

---

### 2b. `accent-discrimination` — minimal-pair stress identification

**Motivation:** Guide 2 (Acentos) teaches stress-placement rules through
minimal pairs (e.g. *hablo* / *habló*, *papa* / *papá*). The existing
`word-stress` cards ask which rule category a word belongs to — a metalinguistic
judgment. An `accent-discrimination` kind flips this to a perceptual task:
hear two words, identify which carries the accent (or which meaning a stressed
form expresses). Guide 2's data file includes minimal pair examples.

**Proposed prompt shape:**

```ts
{ kind: 'accent-discrimination'; wordA: string; wordB: string; questionEnglish: string }
```

**Answer:** `wordA` or `wordB` (the accented/correct form for the given English
context). MCQ with 2 options (the pair).

**Extraction surface:**
- Guide 2 contains stress-pair examples (e.g. present vs. preterite 1sg:
  *hablo* / *habló*). At least 6 extractable pairs are present in the data.

**Practice renderer:** MCQ widget; prompt speaker plays both words in sequence
(or the learner taps each to hear individually); question shows the English
context.

**Effort:** new `CardKind` + `PromptShape` + extractor for guide 2 + MCQ
renderer branch. Moderate — the MCQ infrastructure already exists.

---

## 3. Practice-flow tuning intake

The following observations are grounded in the source code at the time of
this audit. No user-session data or invented feedback is included.

---

**Concern 1: Rating buttons have no keyboard mapping.**

*Code observation:* `RatingButtons` renders four styled `<button>` elements
(Again / Hard / Good / Easy) using click handlers only. There is no `onKeyDown`
or `accessKey` attribute on any rating button. After a typed answer is
submitted (Enter key), the learner must reach for the mouse to rate.

*Director answer:*

---

**Concern 2: MCQ kinds that return English answers are not in `ENGLISH_ANSWER_KINDS`.**

*Code observation:* `ENGLISH_ANSWER_KINDS` is an empty `Set<CardKind>` in
`index.tsx`. The three MCQ kinds (`idiom-meaning`, `false-cognate`,
`reflexive-meaning-change`) all return English text as `card.answer`. Any
reveal-speak path that calls `speakSpanish()` on an English answer string
will produce garbled audio (Spanish TTS voice reading English text). The
`ENGLISH_ANSWER_KINDS` Set exists precisely to suppress this, but it is
unpopulated.

*Director answer:*

---

**Concern 3: MCQ distractors for `false-cognate` are drawn from the same-kind
pool, which is small (15 cards).**

*Code observation:* `getMcqOptions()` samples distractors from cards with the
same `kind` using an FNV-1a-seeded shuffle. With only 15 false-cognate cards
in the pool, a 4-option MCQ always draws from the full pool minus the correct
answer (14 candidates). This is workable but means that after a learner has
seen all 15 cards, every MCQ session reuses the same distractor set, making
options predictable through repetition.

*Director answer:*

---

**Concern 4: The `EmptyState` (all-caught-up screen) has only a back-link CTA.**

*Code observation:* `EmptyState` in `index.tsx` renders the streak, today's
review count, and a single "Back to Spanish guides" `<Link>`. There is no
"come back tomorrow" framing, no next-review countdown, and no forward action
(e.g. "Review all cards anyway"). A learner who completes their daily goal has
no signal of when cards will next be due.

*Director answer:*

---

**Concern 5: `word-stress` cards have no audio at any point in the flow.**

*Code observation:* `word-stress` is absent from both `KINDS_WITH_PROMPT_SPEAK`
and `KINDS_AUTO_PLAY_ON_REVEAL`. It is also absent from `TYPING_ENABLED_KINDS`
(self-rate). The learner sees the word, decides which stress rule applies, then
self-rates — without ever hearing the word spoken. The extractor sets
`speakText` to the bare word (syllable dots stripped), so the audio value is
already available.

*Director answer:*

---

**Concern 6: `tu-vs-usted` extractor does not set `speakText`, so the
fallback speaks a single-word answer ("tú" / "usted") rather than the
situation sentence.**

*Code observation:* `guide24.ts` does not set `speakText` on any card. The
practice renderer falls back to `card.answer`. For `tu-vs-usted` the answer
is always "tú" or "usted" — a single word that conveys no contextual audio
information. The `prompt.situation` field contains the full Spanish-register
scenario, which is the content worth hearing.

*Director answer:*

---

**Concern 7: `NEXT_DUE_DISPLAY_MS` (800 ms) may be too short for longer typed answers.**

*Code observation:* After a typed answer is checked, the result (correct /
close / incorrect) is shown for `NEXT_DUE_DISPLAY_MS = 800` milliseconds before
the rating buttons appear. For long production answers (e.g. `gustar-pattern`,
`reciprocal-translate`), 800 ms may not give the learner enough time to read
the canonical answer before the UI shifts to rating mode.

*Director answer:*

---

**Concern 8: Typing-enabled kinds that produce full Spanish sentences have no
reveal audio (`sentence-correction`, `gustar-pattern`, `reciprocal-translate`,
`negation-translate`).**

*Code observation:* These four kinds all set `speakText` to the full Spanish
answer sentence in their extractors, but none are in `KINDS_AUTO_PLAY_ON_REVEAL`.
The audio value of hearing the correct sentence spoken immediately after a
translation task is well-established in the SRS literature and is already
implemented for the verb-conjugation family. The infrastructure to add these
kinds to `KINDS_AUTO_PLAY_ON_REVEAL` is a one-line change per kind.

*Director answer:*

---

**Concern 9: No per-session audio toggle exists.**

*Code observation:* `speakSpanish()` is called unconditionally whenever the
auto-play or prompt-speaker conditions are met. There is no mute state in
`useMastery`, `index.tsx`, or the settings page. A learner practicing in a
public place has no way to silence audio without muting their device entirely.
The settings page (`SettingsPage`) has no audio-related controls.

*Director answer:*

---

**Concern 10: `letter-sound` is the only kind with a prompt-speaker button,
but the button calls `speakSpanish()` with the letter name (e.g. "be"),
not the letter glyph ("b").**

*Code observation:* `guide1.ts` extractor sets `speakText = entry.name` (the
letter's spoken name) rather than the glyph. This is intentional — the card
tests whether the learner can produce the letter name from the glyph. The
prompt speaker therefore correctly speaks the letter name for audio preview.
However, the prompt question reads "Letter: B" while the speaker plays "be" —
a learner unfamiliar with the convention may find this confusing. No other kind
uses prompt-speak, so this is the only place the convention needs documentation.

*Director answer:*

---

## 4. Phase 3 (B.2) backlog

Ranked by impact (learning value gained) × effort (implementation cost).
Higher rank = ship sooner.

1. **Populate `ENGLISH_ANSWER_KINDS`** (3 MCQ kinds) — zero learning value
   lost without it, but audio currently misfires on reveal for
   `idiom-meaning`, `false-cognate`, `reflexive-meaning-change`. One-line
   Set population. Zero new card kinds. Effort: trivial. Prevents a silent
   audio regression.

2. **Add reveal auto-play for high-card-count typing kinds** — `noun-gender`
   (19), `noun-plural` (19), `noun-adj-agreement` (20), `english-to-pronoun`
   (30), `verb-spelling-change` (17), `word-stress` (18). 123 cards gain reveal
   audio. `KINDS_AUTO_PLAY_ON_REVEAL` additions only — no extractor changes.
   Effort: trivial per kind.

3. **Add reveal auto-play for sentence-production kinds** —
   `gustar-pattern` (10), `negation-translate` (8), `sentence-correction` (7),
   `reciprocal-translate` (3), `reflexive-daily-routine` (6), `number-spell`
   (38), `weather-expression` (14), `question-word` (8),
   `comparative-irregular` (4). 98 more cards gain reveal audio. Same
   `KINDS_AUTO_PLAY_ON_REVEAL` mechanism. Effort: trivial.

4. **Add prompt-speaker for MCQ kinds** (`idiom-meaning`, `false-cognate`,
   `reflexive-meaning-change`) — 42 cards gain a Spanish-side speaker button
   on the prompt. Requires populating `KINDS_WITH_PROMPT_SPEAK` and verifying
   the correct `speakText` field is available for each kind. Effort: low.

5. **Add prompt-speaker for structural-choice kinds** (`ser-vs-estar`,
   `por-vs-para`) — 38 cards gain listening context before choosing. Prompts
   already contain full Spanish sentences in `speakText`. Effort: low.

6. **Fix `tu-vs-usted` `speakText`** — update `guide24.ts` extractor to set
   `speakText` to `prompt.situation` (the scenario sentence) instead of
   leaving it absent. 8 cards. Effort: trivial extractor change + test update.

7. **Keyboard shortcuts for rating buttons** — add `1/2/3/4` or `a/h/g/e`
   key bindings to `RatingButtons`. Significant UX improvement for desktop
   users; zero impact on mobile. Effort: low.

8. **Per-session audio toggle** — add mute state (local, not persisted) to
   the practice route. A single icon button in the practice header. Effort:
   low (one `useState` + conditional on all `speakSpanish` calls).

9. **`listening-recall` CardKind** (new) — hear the word, type what you heard.
   Extraction surface: guides 1, 23, 27. Adds listening-comprehension as a
   distinct skill. Effort: medium (new kind + renderer + 3 extractors).

10. **`accent-discrimination` CardKind** (new) — minimal-pair MCQ from guide 2
    stress data. Adds perceptual accent training. Effort: medium (new kind +
    MCQ renderer variant + guide 2 extractor extension).
