# Spanish Mastery Audit

**Last updated:** Phase 2c.5 — PR #21 cleanup (2026-04-26)
**Coverage:** 29 of 33 Spanish guides wired (88%). 4 guides carry explicit skip verdicts.
**Total cards:** 678 (as of Phase 2c.5)

---

## 1. Phase 2a — Wired guides (9 guides, 254 cards)

| Guide | Title | Kind | Cards | Notes |
|-------|-------|------|-------|-------|
| 1 | El Alfabeto | `letter-sound` | 30 | All 30 letters of the Spanish alphabet, pronunciation + IPA |
| 2 | Acentos | `word-stress` | 18 | Stress rules: 6 categories × 3 examples each |
| 4 | Presente Indicativo | `verb-conjugation` | 66 | 3 regular verbs × 6 pronouns (18) + 8 irregulars × 6 (48) |
| 9 | Cambios de Raíz | `verb-conjugation-stem-change` | 24 | 4 boot-verb types × 6 pronouns |
| 11 | Género | `noun-gender` | 19 | Gender assignments for nouns |
| 12 | Pluralización | `noun-plural` | 19 | Plural formation rules |
| 13 | Adjetivos | `noun-adj-agreement` | 20 | Adjective agreement patterns |
| 14 | Pronombres | `english-to-pronoun` | 30 | All pronoun types: subject, DO, IO, reflexive, prepositional |
| 17 | Ser vs Estar | `ser-vs-estar` | 28 | ser uses (8) + estar uses (8) + meaning shifts (6 × 2) |

**Phase 2a subtotal: 254 cards**

---

## 2. Phase 2c — Wired guides (20 guides, 408 cards)

### Phase 2c.2 — Verb-conjugation extractors (7 guides, 226 cards)

| Guide | Title | Verdict | Kind | Cards | Rationale |
|-------|-------|---------|------|-------|-----------|
| 5 | Pretérito vs Imperfecto | extract | `verb-conjugation-tensed` | 36 | 2 tenses × 3 verbs × 6 pronouns |
| 6 | Futuro y Condicional | extract | `verb-conjugation-tensed` | 12 | 2 tenses × 1 verb × 6 pronouns |
| 8 | Tiempos Perfectos | extract | `verb-conjugation-tensed` | 18 | 3 compound tenses × 1 verb × 6 pronouns |
| 10 | Irregulares | extract | `verb-conjugation-tensed` | 96 | 2 tenses × 8 irregular verbs × 6 pronouns |
| 28 | Subjuntivo Presente | extract | `verb-conjugation-tensed` | 18 | present-subjunctive × 3 verbs × 6 pronouns |
| 29 | Subjuntivo Pasado | extract | `verb-conjugation-tensed` | 30 | past-subjunctive × 5 verbs × 6 pronouns |
| 30 | Imperativo | extract | `imperative-tu` | 16 | 8 verbs × 2 polarities (affirmative/negative) |

**Phase 2c.2 subtotal: 226 cards**

### Phase 2c.3 — Choice-discriminator extractors (9 guides, 98 cards)

| Guide | Title | Verdict | Kind | Cards | Rationale |
|-------|-------|---------|------|-------|-----------|
| 3 | Cambios Ortográficos | extract | `verb-spelling-change` | 17 | 6 spelling-change patterns × examples |
| 18 | Por vs Para | extract | `por-vs-para` | 10 | 10 quiz sentences with usage-reason context |
| 19 | Verbos + Preposiciones | extract | `verb-prep-pair` | 23 | 5 preposition buckets × verbs (de, a, con, en, por) |
| 20 | Preguntas | extract | `question-word` | 8 | 8 question-word quiz items |
| 21 | Negación | extract | `negation-translate` | 8 | 8 English → Spanish negative-pattern items |
| 22 | Comparativos | extract | `comparative-irregular` | 4 | 4 irregular comparative forms (mejor/peor/mayor/menor) |
| 24 | Tú vs Usted | extract | `tu-vs-usted` | 8 | 8 social-register scenarios |
| 25 | Trampas | extract | `false-cognate` + `sentence-correction` | 22 | 15 false cognate + 7 grammar trap sentence corrections |
| 31 | Reflexivos | extract | `reflexive-meaning-change` + `reflexive-daily-routine` + `reciprocal-translate` | 14 | 5 meaning-change pairs + 6 daily-routine reflexives + 3 reciprocal examples |

**Phase 2c.3 subtotal (updated in Phase 2c.5): 121 cards (was 98)**

### Phase 2c.4 — Phrase-translation extractors (4 guides, 84 cards)

| Guide | Title | Verdict | Kind | Cards | Rationale |
|-------|-------|---------|------|-------|-----------|
| 16 | Gustar | extract | `gustar-pattern` | 10 | 10 English → Spanish gustar-pattern sentences |
| 23 | Números y Fechas | extract | `number-spell` | 38 | 28 cardinals (0–1,000,000) + 10 ordinals (1º–10º) |
| 27 | El Tiempo | extract | `weather-expression` | 14 | 14 weather expressions (hace/está/hay patterns) |
| 32 | Expresiones | extract | `idiom-meaning` | 22 | tener idioms (10) + dar idioms (6) + hacer idioms (6) |

**Phase 2c.4 subtotal: 84 cards**

**Phase 2c total: 424 cards (updated from 408 in Phase 2c.5)**

---

## 3. Skipped guides (4 guides)

| Guide | Title | Verdict | Rationale |
|-------|-------|---------|-----------|
| 7 | Progresivo | skip | The guide teaches a single structural rule (estar + gerund). The pattern is already covered as part of the present-progressive weather expressions and the present-perfect extractors. A separate card set would be low signal and redundant with estar cards in guide 17. |
| 15 | Posición de Objetos | skip | Direct/indirect object placement rules require sentence-level grammatical judgment. Correct ordering depends on verb, clitic climbing, and context — no single-answer card type captures it without oversimplifying. Defer to a future `sentence-order` card kind if warranted. |
| 26 | Calor | skip | One-concept guide (estar caliente vs. tener calor). Too narrow for a standalone extractor; the distinction is better handled as an `Insight` note in the ser-vs-estar or gustar-pattern card context. |
| 33 | Español Regional | skip | Dialect survey guide with no right/wrong answers. Presenting regional variation as a quiz would create incorrect "correct" answers (e.g. "vosotros" is standard in Spain but absent in most of Latin America). No extractable card shape exists. |

---

## 4. CardKind inventory (27 total)

### Phase 2a (9 kinds)

| CardKind | Description |
|----------|-------------|
| `letter-sound` | Given a letter glyph, produce its pronunciation / IPA sound |
| `word-stress` | Given a word, identify or apply the correct stress-rule category |
| `verb-conjugation` | Given a verb infinitive and pronoun, produce the present-indicative form |
| `verb-conjugation-stem-change` | Like `verb-conjugation` but for o→ue / e→ie / e→i boot verbs |
| `noun-gender` | Given a noun, state its grammatical gender (masculine / feminine) |
| `noun-plural` | Given a singular noun, produce the plural form |
| `noun-adj-agreement` | Given a noun and adjective, produce the agreed form |
| `english-to-pronoun` | Given an English subject/object description, produce the Spanish pronoun |
| `ser-vs-estar` | Given a sentence context, choose ser or estar |

### Phase 2c.2 (2 kinds)

| CardKind | Description |
|----------|-------------|
| `verb-conjugation-tensed` | Given a verb, pronoun, and tense label, produce the conjugated form |
| `imperative-tu` | Given a verb and polarity (affirmative/negative), produce the tú command form |

### Phase 2c.3 (9 kinds)

| CardKind | Description |
|----------|-------------|
| `verb-spelling-change` | Given an infinitive and target form, identify the spelling-change pattern |
| `por-vs-para` | Given a sentence with a blank, choose por or para |
| `verb-prep-pair` | Given a verb and its meaning, supply the required preposition |
| `question-word` | Given a question sentence and English gloss, supply the correct interrogative word |
| `negation-translate` | Translate an English negative sentence to Spanish using the correct double-negative pattern |
| `comparative-irregular` | Given the positive adjective, supply the irregular comparative form |
| `tu-vs-usted` | Given a social situation, choose the appropriate register (tú or usted) |
| `false-cognate` | Given a Spanish word and its false English friend, supply the actual meaning |
| `reflexive-meaning-change` | Given the base verb and reflexive form, supply the reflexive meaning |

### Phase 2c.4 (4 kinds)

| CardKind | Description |
|----------|-------------|
| `gustar-pattern` | Given an English sentence and the gustar-class verb, produce the Spanish sentence |
| `number-spell` | Given a numeral or ordinal symbol, produce the Spanish spelling |
| `weather-expression` | Given an English weather phrase and icon, produce the Spanish expression |
| `idiom-meaning` | Given a Spanish idiom and its literal translation, supply the English meaning |

### Phase 2c.5 — PR #21 cleanup (3 kinds)

| CardKind | Description |
|----------|-------------|
| `sentence-correction` | Given a grammatically wrong Spanish sentence, type the corrected version (explanation shown after reveal) |
| `reflexive-daily-routine` | Given an English daily-routine action, supply the Spanish reflexive infinitive |
| `reciprocal-translate` | Given an English "each other" sentence, produce the Spanish reciprocal-reflexive construction |

---

## 5. Architecture notes

- All extractors import data from `src/guides/spanish/guides/dataN.ts` files.
  Guide JSX files (`guideN.tsx`) import from the same data files so data is
  never duplicated.
- The `SPANISH_CARD_COUNT` constant in `src/guides/spanish/mastery/index.ts`
  is maintained manually and must be bumped whenever extractors are added.
  Current value: 678 (as of Phase 2c.5).
- The `getAllSpanishCards()` function is imported only by the practice route
  chunk (`/guides/spanish/practice`). The landing page uses the plain
  `SPANISH_CARD_COUNT` constant to avoid pulling the entire extractor pool
  into the landing-page chunk.
- Architecture invariant: extractors import from `'../../../../mastery'`
  (the barrel) only — never from mastery sub-files directly. See
  `src/mastery/ARCHITECTURE.md` for the full contract.
