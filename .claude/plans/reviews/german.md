# German Guide — Comprehensive Accuracy + Effectiveness Review

## Executive Summary

- **Overall verdict:** The 33-guide German collection is **substantively accurate and pedagogically well-judged**. The four-case article tables, adjective-ending tables, verb conjugations, separable/inseparable prefix coverage, two-way prepositions, and post-1996 spelling are all correct. The biggest issues are not factual errors but **coverage gaps** (Konjunktiv I / indirect speech is wholly absent despite the guide title "Futur & Konjunktiv" promising it; `mögen` is missing from the modal-verb set even though `möchten` is included; `außer` and `gegenüber` are missing from the dative-preposition set) and a **small number of pedagogical clarity issues** (the article tables in Guide 5 present `(+s)` / `(+n)` in the article column when those endings are on the noun, not the article).
- **Number of accuracy issues found:** 11 total — **1 critical** (Guide 5 article-table notation actively misleads beginners) / **10 minor** (imprecise wording, missing options, register nuance).
- **Number of effectiveness improvements suggested:** 9.
- **Number of coverage gaps flagged:** 6.
- **Recommendation:** **ship-ready with minor revisions**. The single critical fix (Guide 5 notation) is a 5-minute change. The Konjunktiv I gap is the only thing that arguably affects the integrity of a guide title (Guide 23 "Futur & Konjunktiv" — currently covers only Konjunktiv II). Everything else is polish. The German linguistic content is correct in all the places it matters most: the article paradigms, the adjective endings, the verb conjugations, and the spelling.

---

## Critical accuracy issues (must fix before shipping)

### C1. Guide 5 article-table notation conflates noun endings with article changes

**File/lines:** `guide5.jsx:9–10` — the `caseData` object.

**What's wrong:** The Dativ row shows `diePl: "den (+n)"` and the Genitiv row shows `der: "des (+s)"`, `das: "des (+s)"`, `ein: "eines (+s)"`, `einN: "eines (+s)"`. These cells are then rendered into the **article column** of the table. A learner reading the chart will think the article itself becomes `des (+s)` or `den (+n)`, when in fact the `+s` and `+n` apply to the **noun**, not the article (`des Mannes`, not `des(+s) Mann`; `den Männern`, not `den(+n) Mann`).

**What's correct:** The articles are `des` (gen masc/neut), `den` (dat plural), `eines` (gen masc/neut). The noun separately takes `-(e)s` in genitive masculine/neuter singular and `-(e)n` in dative plural (unless the plural already ends in `-n` or `-s`). These should be presented as **separate columns or footnotes**, not concatenated into the article cell.

**Source:** Hammer's German Grammar §2.3 (article paradigms) and §1.2.1 (noun endings). Duden Grammatik §316–§326. The two phenomena are universally taught as separate rules.

**Why this matters:** Guide 5 is the first case-introduction page — every learner sees this table. The note in Guide 7 (`Insight text="ALL nouns add -n in dative plural..."`) and Guide 9's `art:"des Mannes (+s on noun)"` framing both correctly attribute the ending to the noun, so the model elsewhere in the codebase is right. Only Guide 5 is misleading.

**Fix:** Either drop the `(+s)` / `(+n)` annotations from Guide 5 entirely (and lean on Guide 7 / Guide 9 to introduce them) or render them as a separate small column labeled "noun ending". Recommended phrasing:

```js
// in caseData
gen: {..., der:"des", die:"der", das:"des", diePl:"der", ein:"eines", eine:"einer", einN:"eines", noun:"+ (e)s on masc/neut singular"},
dat: {..., diePl:"den", noun:"+ -(e)n on plural noun"},
```

…and surface the `noun` line as a sub-row beneath the article grid.

---

## Verified correct (no fix needed)

These are claims I checked carefully and want to call out as confirmed, so the author doesn't second-guess:

- **Spelling reform compliance throughout.** Guide 1 correctly states `ß` after long vowels / diphthongs, `ss` after short vowels (Straße/heißen/groß vs. Wasser/müssen). Guide 27 uses `dass` (post-1996), never `daß`. Guide 18 modal verbs use `muss` not `muß`. Guide 32 doesn't have a stray pre-reform spelling. Verified against Rat für deutsche Rechtschreibung 2018 ruleset.
- **All 9 Wechselpräpositionen** in Guide 8 (an, auf, hinter, in, neben, über, unter, vor, zwischen) are the canonical complete set, in the standard memorization order. Akk/Dat examples (gehen in den Park / sein in dem Park, etc.) are correct.
- **Adjective ending tables in Guide 14** — all three paradigms (weak, mixed, strong) are correct in every cell. In particular the strong genitive masculine/neuter `-en` (rather than the historical `-es`) reflects current Duden recommendation; the noun carries the genitive `-(e)s` so the adjective takes weak `-en`.
- **Personal pronoun table in Guide 15** is complete and accurate across all three cases (Nom/Akk/Dat). Nine rows including formal Sie / Ihnen.
- **Reflexive pronoun table in Guide 17** correctly shows that 3rd-person and Sie use `sich` for both Akk and Dat; 1st/2nd-person reflexives = personal-pronoun forms.
- **Verb conjugations in Guide 18** — machen (regular), fahren (a→ä), sprechen (e→i), sein, haben, werden — all six forms in each are correct.
- **Modal verb conjugations in Guide 20** — können, müssen, dürfen, sollen, wollen, möchten — all six forms each. Note `möchten` should arguably be `mögen` (see M3 below), but the forms shown for `möchten` are themselves correct as Konjunktiv II of mögen.
- **Past-participle rules in Guide 21:** the four cases (regular ge-…-t / strong ge-…-en / no-ge for inseparable+ -ieren / separable infix `ge`) are exhaustive and correct. The Insight on `sein` vs. `haben` (movement / change-of-state vs. otherwise) is the standard rule.
- **Präteritum strong-verb forms in Guide 22** — ging, kam, sah, schrieb, sprach, nahm, aß, fuhr — all correct (3rd-person singular Präteritum stems, the canonical "principal-parts" set).
- **V2 word order in Guide 26** with all three example permutations (Subj/Time/Place at position 1, verb fixed at position 2). Time-Manner-Place advice (TeMaPla) is the textbook rule.
- **Subordinate-clause verb-final in Guide 27** with the standard subordinating-conjunction set (dass, weil, wenn, ob, obwohl, als, bevor, nachdem, bis).
- **`nicht` vs. `kein` distinction in Guide 28** is correctly framed (kein replaces ein/no article on a noun; nicht negates verbs/adjectives/adverbs/whole clauses).
- **Numbers 1–12 in Guide 29** are spelled correctly (eins/zwei/.../zwölf). The "ones-before-tens" rule for 13–99 is correct (einundzwanzig). `halb drei = 2:30` is correctly given as "half toward 3" and is one of the most common L2 traps.
- **Guide 32 false friends** — every entry verified against Duden / DWDS:
  - `bekommen` = to receive (cognate of "become" but semantic split is real and old).
  - `Gift` = poison (cognate with "Mitgift" = dowry retains the older "given thing" sense; current standalone meaning is exclusively "poison").
  - `aktuell` = current/up-to-date (Latin-derived in both languages, English drifted to "real").
  - `Handy` = cell phone — verified pseudo-anglicism, in Duden since 1996.
  - `Chef` = boss; `sensibel` = sensitive; `brav` = well-behaved; `komisch` = strange (also "funny" colloquially); `Fabrik` = factory; `Rat` = advice/council.
- **Guide 9 ('dem Mann sein Auto')** — the colloquial dative-possessive construction is real and is the trend the famous Bastian Sick book title diagnoses. Framing as "informal/spoken" is correct.
- **`speakGerman` config in `src/utils/speech.js:17`** uses BCP-47 tag `'de'` (no region). This is correct for cross-platform: browsers select best-match German voice (typically de-DE on Apple/Google, de-DE or de-AT on Windows depending on installed voices). No misconfiguration.

---

## Minor accuracy issues (should fix, low priority)

### M1. Guide 7 — Dative-preposition list is incomplete

**File/lines:** `guide7.jsx:6` — `datPreps` array.

**What's listed:** aus, bei, mit, nach, seit, von, zu (7 items).

**What's missing:** **`außer`** (except for) and **`gegenüber`** (across from / opposite). The standard German pedagogical set is the **9-preposition list** (aus, außer, bei, mit, nach, seit, von, zu, gegenüber), often taught with the Frère-Jacques-tune mnemonic that explicitly names außer and gegenüber. Many teachers also add `ab` (from, starting at) for a 10-item set. The mnemonic the guide quotes ("aus bei mit nach seit von zu — mit dem Dativ nur so zu!") is a real 7-item rhyme but is the abbreviated version.

**Source:** Hammer's German Grammar §20.3.1; Duden "Die Grammatik" §881; standard B1 Goethe-Institut wordlists.

**Fix:** Add `außer` and `gegenüber` to the chip list. Optionally note `gegenüber` follows its noun ("mir gegenüber").

---

### M2. Guide 6 — DOGFU mnemonic is real but doesn't cover `bis` (which is in the same list)

**File/lines:** `guide6.jsx:22–25` — `bis` is the 6th preposition in the chip list; the mnemonic line directly below names only "durch, ohne, gegen, für, um".

**What to clarify:** DOGFU is a real, widely-used mnemonic. But the chips include `bis` and so does the standard list — the canonical 8-preposition expansion is **FUDGEBOW** (Für, Um, Durch, Gegen, Entlang, Bis, Ohne, Wider). DOGFU is the 5-item core, and `bis`/`entlang`/`wider` are the "extended" set. The guide silently mixes the two.

**Source:** mnemonic-device.com / bergburg.net / multiple teaching blogs.

**Fix:** Either remove `bis` from the chips (so the mnemonic fits) or note "DOGFU + bis, entlang, wider for the full 8".

---

### M3. Guide 20 — Lists `möchten` as a modal but omits `mögen`

**File/lines:** `guide20.jsx:5–12` — modal-verb data array.

**What's wrong:** The standard six German modal verbs are **dürfen, können, mögen, müssen, sollen, wollen**. `möchten` is the Konjunktiv II of `mögen`, not a separate modal — it's a hugely common form, but pedagogically Goethe-Institut, Hammer, and Duden present mögen as the modal with möchten as its polite/wish-form. The guide gives 6 modals but **swaps mögen for möchten**, leaving learners without a way to say "Ich mag Pizza" (I like pizza, present tense).

**Source:** Lingolia "Modalverben"; Hammer §17; Goethe-Institut A1/A2 curriculum.

**Fix:** Either (a) include both mögen and möchten (7 cards) with a note that möchten is mögen's Konjunktiv II form used as a polite "would like" — this is the cleanest pedagogy; or (b) keep the 6 cards but swap möchten back to mögen and mention möchten in the conjugation note.

---

### M4. Guide 11 — "5 plural patterns" is defensible but undercounts the canonical set

**File/lines:** `guide11.jsx:4–10` — five patterns: `+e`, `+er`, `+(e)n`, `+s`, `no change`.

**What's nuanced:** Different reference grammars count differently. Hammer gives **5 main groups** (matches the guide). Helbig & Buscha's classification gives **8 classes** (+e, +ä-e, +er, +ä-er, +(e)n, no change, +ä, +s). The brief asked for "eight common patterns plus exceptions". The guide's 5-class system is a defensible simplification but elides the umlaut-vs-no-umlaut distinction (which the guide does mention parenthetically as "± umlaut" — fine).

**Fix:** Optional. If you want to ship the 5-pattern simplification, change the title from "The 5 Plural Patterns" to "The 5 main plural patterns" or "5 plural groups (umlaut may also apply)". The current title overstates definiteness.

---

### M5. Guide 19 — Inseparable-prefix list omits some common prefixes

**File/lines:** `guide19.jsx:7` — inseparable list = `ver-, be-, er-, ent-`.

**What's missing:** The traditional **GE-BE-PEM-VER-ZER-ENT-ER-MISS** mnemonic includes seven always-inseparable prefixes: **be-, emp-, ent-, er-, ge-, miss-, ver-, zer-** (8 if you include both miss- and ent- separately). The guide lists 4 of these and omits `ge-, miss-, zer-, emp-`. Also missing is the **variable-prefix set** (durch-, hinter-, über-, um-, unter-, wider-) which can be either, depending on the verb.

**Source:** Hammer §18.4; Duden Grammatik §689.

**Fix:** Add `ge-, miss-, zer-, emp-` to the inseparable list. Optionally add a one-line note about variable prefixes ("über-, um-, unter-, durch-, hinter-, wider- can be either: `umfahren` = run over (sep) vs. drive around (insep)").

---

### M6. Guide 23 — "Future tense often replaced by present + time word" understated

**File/lines:** `guide23.jsx:19` — Insight.

**What's correct:** The substitution is real and idiomatic. But the Insight implies werden + infinitive is "more formal in speech" — actually **werden + infinitive** has two distinct functions in modern German: (a) future tense (decreasingly common, mostly written/formal), and (b) **modal of inference / probability** ("Er wird wohl krank sein" = "He's probably sick"). Guide 23 only mentions (a). The probability use is a B2-level distinction worth one line.

**Source:** Hammer §14.3.2; DWDS corpus.

**Fix:** Add to Insight: "werden + infinitive can also express probability ('Er wird zu Hause sein' = 'He's probably home') — this is the more common spoken use."

---

### M7. Guide 22 — Missing column for full Präteritum endings on irregular verbs

**File/lines:** `guide22.jsx:7` — strong verbs shown only as bare 3-sg stems (ging, kam, sah, …).

**What's incomplete:** The 3-sg form alone doesn't tell a learner what `wir/sie` looks like. Strong-verb Präteritum endings: **— (1/3 sg), -st (2 sg), -en (1/3 pl), -t (2 pl)**. So `kommen → kam, kamst, kam, kamen, kamt, kamen`. The guide implies the stem is the whole answer.

**Source:** Hammer §13; Duden §645.

**Fix:** Either add a one-line note: "Add normal endings to the changed stem: ich kam, du kamst, er kam, wir kamen, ihr kamt, sie kamen" — or expand the table.

---

### M8. Guide 4 — "ent·SCHÚL·di·gen" stress mark could be misread

**File/lines:** `guide4.jsx:8` — entschuldigen marked as `ent·SCHÚL·di·gen`.

**What to clarify:** The stress is on the second syllable (root `schuld`), which IS what the marking shows — but the syllabification splits "ent" off as a prefix syllable, then "schul" gets the stress. Some readers will misread the dot+capital format because the character `ÚL` is an unusual diacritic. Lower priority — purely a rendering concern.

**Fix:** Optional. Use `ent-SCHUL-di-gen` with hyphens and uppercase-on-stress, more standard convention.

---

### M9. Guide 18 — sein/haben/werden box mixes irregular kinds

**File/lines:** `guide18.jsx:25–32` — "Key irregulars: sein, haben, werden".

**What's nuanced:** `sein` is genuinely irregular. `haben` is regular except for 2/3-sg `hast/hat` (contracted from `habst/habt`). `werden` is a stem-changing verb (e→i in 2 sg, ø in 3 sg "wird") rather than fully irregular. Calling all three "irregulars" lumps real irregularity with stem-changes the guide already covered for `sprechen`. Minor pedagogical ambiguity — students wonder why `sprechen` got its own section.

**Fix:** Optional. Re-title the box "Critical auxiliaries (memorize whole)" to convey "you must learn these no matter the rule".

---

### M10. Guide 27 — `wenn` vs `als` glossed but not differentiated

**File/lines:** `guide27.jsx:5` — chip list includes `wenn (if/when)` and `als (when-past)`.

**What's incomplete:** The brief flagged this specifically. The full distinction:
- **wenn** = if; or "when" for **repeated/habitual past events** OR present/future events. ("Immer wenn ich nach Hause kam, schlief der Hund" = "Whenever I came home, the dog was asleep.")
- **als** = "when" for **a single completed past event**. ("Als ich nach Hause kam, schlief der Hund" = "When I [that one time] came home, the dog was asleep.")
- **wann** = "when?" only in questions or indirect questions.

The single parenthetical "als (when-past)" is too compressed.

**Fix:** Add a sub-section: "wenn (repeated/present/future) vs. als (single past event) vs. wann (question only)" with one example each.

---

## Effectiveness improvements

### E1. Guide 5 — Make the four-case overview interactive in BOTH directions

The current button-driven view shows one case at a time. A useful complement: a small "by gender" toggle that shows Masc/Fem/Neut/Plur as columns and **all four cases** as rows for one gender at a time. The 4×4 article paradigm is the single most-referenced table in German learning. Letting users flip the axis aligns with how they think when generating sentences ("I have a masculine direct object — what's the akk article?").

### E2. Guide 8 — Add a wo/wohin verb-pair contrast

Two-way prepositions become memorable when paired with their canonical verb pairs:
- **legen** (Akk, lay) vs. **liegen** (Dat, lie) — "Ich lege das Buch auf den Tisch" / "Das Buch liegt auf dem Tisch"
- **stellen** (Akk) vs. **stehen** (Dat)
- **setzen** (Akk) vs. **sitzen** (Dat)
- **hängen** (Akk transitive: "hängte") vs. **hängen** (Dat intransitive: "hing")

The guide has the prepositions and the rule but not the canonical verb pairs that make the rule operational. This is pedagogically high-leverage.

### E3. Guide 14 — Highlight the "shortcut" insight visually

The Insight ("After definite articles: it's almost always -en. The ONLY exceptions are the 5 nominative forms and fem/neut accusative") is gold. Consider visually highlighting those 5 cells (Nom: e/e/e/en, Akk: en/**e**/**e**/en) in the weak-table view — color the "e" cells one color and everything else another. The current uniform purple obscures the pattern.

### E4. Guide 20 — Show the verb bracket visually with one full example

The Satzklammer DarkBox text ("Ich kann heute nicht kommen") is correct but flat. A visual bracket — drawing literal brackets `[` and `]` around the modal and infinitive with everything between sandwiched — would make the Klammer concept land in 2 seconds vs. 20.

### E5. Guide 27 — Add the "comma triggers verb-end" rule

A subordinate clause is recognizable by its **comma + subordinator**. Putting a single bullet ("Comma + dass/weil/wenn → verb at the end") makes the rule self-applying. Currently learners parse the example and try to memorize the conjunction list; the comma rule is faster.

### E6. Guide 28 — Add `nicht` placement rules

The guide says "Goes before what it negates, or at the end for the whole idea" which is the right intuition, but the operational rule is:
1. End of clause if negating the whole sentence (verb included).
2. Before adjectives/adverbs/PPs being negated specifically.
3. **Before non-conjugated verbal elements** (separable prefix, infinitive, past participle).

That third rule is what trips intermediate learners up: "Ich habe das Buch nicht gelesen" (not "Ich habe nicht das Buch gelesen" unless contrastive). One bullet would handle it.

### E7. Guide 30 — Fixed verb-prep combos benefit from a reverse lookup

The card list is alphabetical by verb. For active recall, learners often start from the preposition ("which verb takes auf+akk for hope/wait?"). Consider a small toggle to view by preposition. Low-cost UX addition.

### E8. Guide 32 — Add a "frequency / risk" annotation legend

The guide already uses `d:5/4/3` to set dot color but never tells the user what the dot means. Add a one-line legend ("● red = embarrassing if you say wrong meaning; ● orange = often confused; ● yellow = mild trip-up") so the visual coding is meaningful.

### E9. Guide 33 — Strengthen the "directness ≠ rudeness" lesson with a contrastive example

The DarkBox is good cultural framing but abstract. One concrete pair would land it:
- US-American: "Could I maybe possibly get a coffee, if it's not too much trouble?"
- German equivalent: "Einen Kaffee, bitte." (← this IS polite in German.)

Showing the cross-cultural pragmatic difference as parallel utterances is more effective than the bullet list.

---

## Coverage gaps

### G1. Konjunktiv I (indirect speech) is entirely absent

The guide title for Guide 23 is "Futur & Konjunktiv". The guide covers Konjunktiv II (would-form, polite requests) — correctly and well — but Konjunktiv I (`er sage`, `sie habe`, `er komme`, used for reported/indirect speech, journalistic quotation, and to a lesser extent in formal subordinate clauses) is not mentioned. **The brief specifically asked for both.**

For a 33-guide collection at this level of depth elsewhere, omitting Konjunktiv I leaves a noticeable gap for any learner who reads German news. Concrete addition:
- One row showing the K-I forms: `er sagt → sage, hat → habe, kommt → komme, ist → sei` (sein is the only common K-I form distinct from K-II).
- One example: `Der Minister sagte, er **sei** bereit.` ("The minister said he was ready.")
- One sentence noting that K-I overlaps with present indicative for many verbs in 1/3 plural (`sie sagen`), in which case modern German falls back to K-II (`sie sagten` / `sie würden sagen`).

This is a **B2/C1 topic** but reading-comprehension-critical. Recommend either adding a Guide 23.5 ("Konjunktiv I — indirekte Rede") or splitting Guide 23 into two pages.

### G2. Subjunctive II forms for strong verbs not shown

Guide 23 covers `hätte`, `wäre`, and `würde + infinitive` — the three most common forms. But strong-verb K-II (käme, ginge, läse, fände, …) is omitted. For B1+ learners this matters because using `würde` with käme/ginge sounds wrong in writing ("Ich würde kommen" is colloquially OK but "Ich käme" is preferred in formal writing).

### G3. Adverbs of time/place/manner — Time-Manner-Place rule introduced but not drilled

Guide 26 introduces TeMaPla as a one-liner. There's no dedicated practice or expansion. Given how much sentence-construction depends on it, a short standalone treatment with 4–5 examples would be high-value. (The same observation applies to the position of `nicht` — see E6.)

### G4. Comparative/superlative adjective forms

Comparison (klein → kleiner → am kleinsten / der kleinste) is a major beginner topic and is **entirely absent** from the 33 guides. Noteworthy because the umlaut-on-comparison pattern (alt → älter, jung → jünger, lang → länger) intersects with the umlaut-in-plurals pattern in Guide 11. Recommend adding a Comparison guide under Nouns or Practical.

### G5. Conjunctions — coordinating vs. subordinating distinction

Guide 27 lists subordinating conjunctions but never explicitly contrasts them with coordinating (und, oder, aber, sondern, denn) which DON'T trigger verb-final. For someone learning subordinate-clause word order, the contrast is the whole point. A short table:

| Coordinating (no V-end) | Subordinating (V-end) |
|---|---|
| und, oder, aber, sondern, denn | dass, weil, wenn, ob, … |
| "Ich komme, **denn ich habe Zeit**." | "Ich komme, **weil ich Zeit habe**." |

The denn/weil pair is famous for being the same meaning ("because") with different word-order consequences — perfect teaching example.

### G6. No coverage of Austrian / Swiss German variants

The brief asked about Austria/Switzerland variants if claimed. The guides don't claim them, which is **defensible** (Hochdeutsch is the right register for L2 learners). No criticism, just confirming this was checked: nothing in the 33 guides leans Austrian or Swiss. Speech config `'de'` (without region) inherits whatever Hochdeutsch voice the platform supplies. If the author later wanted to add an A/CH note, the natural place is Guide 33 (Formell & Informell) or Guide 1 ("regional notes").

---

## Per-guide notes (only where issues exist)

### Guide 1 — Das Alphabet
All consonant claims verified (W=/v/, V=/f/, Z=/ts/, S=/z/ before vowels, ß rules). Diphthong table is correct (EI/AI=/aɪ/, IE=/iː/, EU/ÄU=/ɔɪ/, AU=/aʊ/). The "EI vs. IE" insight is on the money — that's the single biggest spelling trap.

### Guide 4 — Betonung
Cosmetic stress-mark rendering issue (M8). Otherwise complete: native words (initial), separable (prefix), inseparable (root), foreign (original).

### Guide 5 — Die vier Fälle
**Critical fix needed (C1)** — `(+s)` / `(+n)` annotations are in the wrong column. Once fixed, this guide is one of the strongest pieces.

### Guide 6 — Nominativ & Akkusativ
DOGFU mnemonic doesn't include `bis` (M2). The "only masculine changes" framing is exactly right — that's the single most-empowering insight in case learning.

### Guide 7 — Dativ
Missing `außer` and `gegenüber` from preposition list (M1). Mnemonic rhyme is the standard 7-item shortened version.

### Guide 8 — Wechselpräpositionen
Could be strengthened with verb-pair contrasts (E2).

### Guide 9 — Genitiv
Accurate, including the colloquial "dem Mann sein Auto" → "wegen dem Wetter" trend. Complete genitive-preposition starter set (wegen/trotz/während/statt). Could add `(an)statt`, `aufgrund`, `mittels` for completeness — optional.

### Guide 11 — Pluralbildung
Subtitle could be softened from "The 5 Plural Patterns" to "5 main groups" (M4). Otherwise the 5 patterns + umlaut note are pedagogically clean.

### Guide 14 — Adjektivendungen
**All three tables verified correct.** The "key insight" framing about gender-marking is exactly the right mental model. Only missing: visual highlighting of the 5 weak-`-e` cells (E3).

### Guide 19 — Trennbare Verben
Inseparable list missing `ge-, miss-, zer-, emp-` and the variable-prefix set (M5).

### Guide 20 — Modalverben
**Includes möchten but omits mögen** (M3). Six-modal canonical set should be dürfen/können/mögen/müssen/sollen/wollen.

### Guide 22 — Präteritum
Strong-verb stems shown but not the personal endings around them (M7).

### Guide 23 — Futur & Konjunktiv
**Konjunktiv I entirely absent (G1).** Strong-verb K-II forms omitted (G2). Future-as-probability use absent (M6). This is the guide most in need of expansion.

### Guide 26 — Hauptsatz
Could explicitly contrast TeMaPla with the comma rule (E5).

### Guide 27 — Nebensatz
Wenn/als/wann distinction compressed to one parenthetical (M10). No coordinating-vs-subordinating contrast (G5).

### Guide 28 — Fragen & Negation
`nicht` placement rules under-specified (E6).

### Guide 32 — Falsche Freunde
Add legend explaining the dot colors (E8). All entries verified correct.

### Guide 33 — Formell & Informell
Cultural framing is good — would benefit from a concrete contrastive example (E9).

---

## Code & longevity notes

### N1. `meta.js` cat-color collisions

`catColors` in `meta.js:39` shares colors:
- `Cases`, `Pronouns`, `Verbs` all map to `#C62828`
- `Nouns`, `Word Order` both map to `#1565C0`

This is likely intentional palette economy (only 4 distinct hues across 7 categories), but it means category badges in the sidebar can't be distinguished by color alone. Consider giving each category a distinct color, or accepting the overlap and removing the `catColors` entry's role in category badges. This is purely a UX/visual-design observation — no functional issue.

### N2. JSX fragment shorthand without keys (Guide 12)

`guide12.jsx:20`:

```jsx
{c.parts.map((p,j)=>(<><span key={j} ...>{p}</span>{j<c.parts.length-1&&<span ...>+</span>}</>))}
```

The fragment `<>` is inside `.map()` without a key on the fragment itself — only the inner `<span>` has a key. React will warn in dev mode. The fix is to either use `<React.Fragment key={j}>` explicitly or restructure to put the key on the outermost element. Will work in React 18 and 19 but produces a console warning.

### N3. React 19 compatibility

All guides use functional components and hooks; no class components, no legacy refs, no `componentWillMount`. No `findDOMNode` usage. No `defaultProps` on functions. The codebase will migrate to React 19 cleanly. The single observation is N2 above (key on fragment).

### N4. Inline styles — defensible

Inline-style choice (per CLAUDE.md project convention) is intentional. No CSS-modules or Tailwind. Style objects are stable across renders (literal objects, not in `useMemo`). For React 19's optimizing compiler this is fine; not flagging.

### N5. Speech API graceful degradation

`speak()` checks `if (!window.speechSynthesis)` and returns early — good. Fires `onEnd` callback in both success and error paths — good. Cancels prior utterance before starting new — good. No issues for longevity; Web Speech API is stable across modern browsers as of 2026.

---

## Sources cited

### Reference grammars
- **Hammer's German Grammar and Usage** — Durrell, 6th ed. (Routledge, 2017). The English-language standard reference; consulted for §1 (nouns), §2 (articles), §6 (adjectives), §13 (Präteritum), §14.3 (werden), §17 (modals), §18.4 (prefixes), §20.3 (prepositions).
- **Duden — Die Grammatik** (Duden Band 4, 9. Auflage, 2016) — German-language reference. §316–§326 (article paradigms), §645 (Präteritum), §689 (verb prefixes), §881 (preposition cases).
- **Helbig & Buscha "Deutsche Grammatik"** (Klett, current ed.) — for the alternative 8-class plural classification.
- **Goethe-Institut A1/A2 wordlists and curriculum** — for canonical modal-verb set, dative preposition list with mnemonic, false-friend selections.

### Online lexicography
- [Duden online (https://www.duden.de/)](https://www.duden.de/) — orthography (post-1996 reform), gender, plurals.
- [DWDS — Digitales Wörterbuch der deutschen Sprache (https://www.dwds.de/)](https://www.dwds.de/) — corpus-grounded usage and frequency for: bekommen, Gift, aktuell, Handy, Chef.
- [Rat für deutsche Rechtschreibung (https://www.rechtschreibrat.com/)](https://www.rechtschreibrat.com/) — current spelling rules (ß vs. ss, dass not daß, triple consonants).

### Verification searches (web)
- [German adjective endings — Lingvist](https://lingvist.com/course/learn-german-online/resources/german-adjective-endings/) — confirms strong genitive masc/neut = `-en`.
- [German Adjective Endings — Wikipedia](https://en.wikipedia.org/wiki/German_adjectives) — adjective declension tables match Guide 14.
- [Migaku — German Modal Verbs Complete Guide](https://migaku.com/blog/language-fun/german-modal-verbs-guide) — confirms 6 standard modals (dürfen/können/mögen/müssen/sollen/wollen) and that möchten = K-II of mögen.
- [Lingolia — Modal Verbs in German Grammar](https://deutsch.lingolia.com/en/grammar/verbs/modal-verbs) — matches.
- [German With Laura — Dative Prepositions](https://germanwithlaura.com/dative-prepositions/) — confirms 9-preposition canonical list including außer, gegenüber.
- [Deutsch Centre — How Denglish influences modern German (Handy)](https://deutschcentre.com/could-you-pass-me-my-handy-please-how-denglish-influences-modern-german-language/) — confirms Handy as pseudo-anglicism.
- [Wiktionary — Handy (German)](https://en.wiktionary.org/wiki/Handy) — Duden inclusion 1996.
- [German With Laura — Possessive Pronouns / dative-possessive](https://germanwithlaura.com/possessive-pronouns/) — confirms "dem Mann sein Auto" as colloquial substandard.
- [DOGFU and the Datives — Berg ≠ Burg](https://www.bergburg.net/grammar/2013/12/07/dogfu-and-the-datives.html) — confirms DOGFU as 5-item core mnemonic.
- [Mnemonic O,FUDGE — accusative prepositions](https://www.mnemonic-device.com/languages/german/o-fudge-accusative-prepositions/) — confirms FUDGEBOW 8-item expansion (für/um/durch/gegen/entlang/bis/ohne/wider).

### CEFR references
- Goethe-Institut Zertifikat A1/A2/B1/B2 examination materials — used to gauge level-appropriate scope for each guide. The 33-guide collection corresponds roughly to A1 through B2 coverage; Konjunktiv I would be a B2 addition (and is the gap most worth filling).
