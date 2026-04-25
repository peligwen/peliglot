# English (American / Chattanooga) Guide — Comprehensive Accuracy + Effectiveness Review

## Executive Summary

- **Overall verdict:** A strong, opinionated 35-guide collection aimed at Spanish-speakers in Chattanooga, TN. The contrastive framing (Spanish vs English) is excellent, the Southern-dialect ("Chatt") callouts are well-researched and unusually accurate (pen-pin merger, doubled modals, "carry/cut/mash/buggy/Coke"), and the alphabet/IPA work is mostly solid. The weak spots are concentrated in three areas: **(a)** the Pronunciación section conflates AmE and BrE phonemes in a few places (Guide 4 `cough /ɒf/` is BrE; Guide 2 uses BrE-style "/ɑː/" length marks for an unmistakably American target), **(b)** several high-traffic ESL grammar topics that the guide *says* it covers are under-specified or wrong on the central distinction (phrasal-verb separability in Guide 13 is missing entirely; tag-question concord in Guide 27 is sketched but the auxiliary-matching rule isn't stated; AmE's actual present-perfect-vs-simple-past contrast in Guide 9 is misstated as "AmE always uses simple past"), and **(c)** a handful of small but consequential factual errors: Guide 4 says "-ough has 7 sounds" and lists 6; Guide 2 says English has "~15 vowels" and shows 12 (no /aɪ/, /aʊ/, /ɔɪ/, no rhotic vowels at all); Guide 11's subtitle promises "if I were" but the guide never shows the subjunctive form.
- **Number of accuracy issues found:** 19 total — **6 critical** (wrong claim, missing the central distinction, or AmE/BrE conflation that will misinform a Chattanooga-bound learner) / **13 minor** (under-specified, prescriptive without acknowledgment, or missing nuance).
- **Number of effectiveness improvements suggested:** 16
- **Number of coverage gaps flagged:** 9
- **Recommendation:** **revise-then-ship**. The collection is pedagogically very good and the Southern-English content is rare and valuable — once the AmE/BrE phoneme inconsistencies are fixed, Guide 9's Present-Perfect framing is corrected, Guide 13 gets a separable/inseparable note, and Guide 27 picks up wh-questions, this is a best-in-class regional ESL resource.

---

## Critical accuracy issues (must fix before shipping)

### C1. Guide 9 — "AmE always uses simple past for recent events" is wrong; the actual AmE/BrE difference is narrower
**File/lines:** `guide9.jsx:11`.

**What's wrong:** The DarkBox claims `En español "he comido" = pasado reciente. En inglés americano se usa el pasado simple: "I ate" para eventos recientes.` This is the popular ESL-textbook caricature of the AmE/BrE difference, but it overstates the case. AmE absolutely uses Present Perfect for recent events when the relevance-to-now is in focus ("I've just eaten", "I've already done it", "Have you ever been to Paris?"). The well-attested AmE preference is *narrower*: with the adverbs **already**, **just**, and **yet**, AmE *more often* (not always) selects Simple Past where BrE would prefer Present Perfect — "Did you eat yet?" is acceptable in AmE while in BrE it would be "Have you eaten yet?".

**What's correct:** Frame it as a **frequency/preference** difference confined mostly to *already / just / yet*, not as a categorical "AmE = simple past for recent events" rule. The Present Perfect uses listed in the guide ("ever", "never", "for/since", "experience") are exactly as standard and frequent in AmE as in BrE.

**Source:** Cambridge Grammar of the English Language (Huddleston & Pullum, 2002, ch. 3 §5.7); Swan's *Practical English Usage* §455 ("present perfect: American English"); Quirk et al. §4.20 note. Corpus evidence in COCA shows AmE uses Present Perfect with "ever/never/since/for" at rates indistinguishable from BNC's BrE; the divergence is concentrated on "already/just/yet".

**Fix:** Reword the DarkBox to: `En español "he comido" puede equivaler tanto a "I have eaten" como a "I ate". En inglés americano, con "already / just / yet", se usa MÁS el pasado simple ("Did you eat yet?") que en británico ("Have you eaten yet?"), pero en los demás casos el Present Perfect es igual de común en ambos.`

---

### C2. Guide 2 — "Inglés: ~15 vocales" claim conflicts with the 12 shown, and crucially omits AmE rhotic vowels and the three diphthongs /aɪ /aʊ/ /ɔɪ/
**File/lines:** `guide2.jsx:5–18` (the `vowelSounds` array — 12 entries) vs `guide2.jsx:26` ("Español: 5 vocales. Inglés: ~15.").

**What's wrong:** The collection targets American English and is even paired with a Web Speech `en-US` voice (`utils/speech.js:18`). But the inventory shown is missing:
- **/aɪ/** as in `time, my, ride` (closing diphthong; PRICE lexical set)
- **/aʊ/** as in `cow, now, house` (closing diphthong; MOUTH lexical set)
- **/ɔɪ/** as in `boy, coin` (closing diphthong; CHOICE set)
- **/ɝ/ ~ /ɜːr/** as in `bird, her, work` (rhotic vowel; NURSE set — completely absent, which is bizarre for a Chattanooga-targeted guide)
- **/ɑːr/, /ɔːr/, /ɪr/, /ɛr/, /ʊr/** as rhotic colorations (or analyse as vowel + /r/ — but Wells's standard 24-set Lexical Sets has eight more entries than this guide shows)

The discrepancy is internal: the prose says "~15", the chart says 12, and three of the most frequent monophthong/diphthong vowels of English (the PRICE, MOUTH, CHOICE diphthongs are in roughly every 10th syllable) are not on the chart at all. Guide 1 *does* mention `/aɪ/` for letters I and Y (`guide1.jsx:13, 29`), so the omission in Guide 2's vowel inventory is the surprising one.

**Also, length marks are inconsistent with AmE pedagogical convention:** the chart uses `/iː/, /uː/, /ɔː/, /ɑː/` with length marks. In broad AmE transcription (CMU Pronouncing Dictionary; Merriam-Webster's IPA respelling key) the conventional marks for tense/lax pairs are `/i/ /ɪ/, /u/ /ʊ/, /eɪ/ /ɛ/, /oʊ/ /ʌ/`, no length marks; length marks are the BrE Daniel-Jones convention. Either pick one (and the AmE convention is more appropriate here) or note that you're using the IPA length-mark convention deliberately.

**What's correct (broad AmE inventory, GenAm/Wells standard):**
- Monophthongs: `/i/ /ɪ/ /ɛ/ /æ/ /ʌ/ /ə/ /ɝ/ /ɑ/ /ɔ/ /ʊ/ /u/` — 11
- Diphthongs: `/eɪ/ /aɪ/ /ɔɪ/ /oʊ/ /aʊ/` — 5
- Total ~16 (depending on whether /ɔ/ is merged with /ɑ/ — the **cot–caught merger** is dominant in younger AmE speakers, including much of Tennessee, though Chattanooga is on the boundary)

**Source:** Wells, *Accents of English* (1982), vol. 1 ch. 2 and vol. 3 ch. 6 (Southern States); Ladefoged & Johnson, *A Course in Phonetics* 7th ed. ch. 3; CMU Pronouncing Dictionary phoneme set. For Chattanooga-specific phonology: Atlas of North American English (Labov, Ash & Boberg 2006) maps Chattanooga as inside the Southern Shift / pen-pin merger zone.

**Fix:** Add `/aɪ/`, `/aʊ/`, `/ɔɪ/`, and `/ɝ/` to the `vowelSounds` array. Either remove the length marks (use `/i/, /u/, /ɔ/, /ɑ/`) or add a footnote explaining the convention. Update the intro count to "16" (or to "15+, depending on dialect"), and add a one-line note about the cot–caught merger ("In Chattanooga, /ɑ/ and /ɔ/ may sound the same — `cot` and `caught` are often homophones for younger speakers"), which is a more useful note for the target audience than the "~15" framing.

---

### C3. Guide 4 — "-ough has 7 sounds" then lists only 6, and `cough /ɒf/` is BrE not AmE
**File/lines:** `guide4.jsx:8`.

**What's wrong:** Two issues:
1. The label says **"¡7 sonidos!"** but the array contains **6** entries (`through /uː/`, `though /oʊ/`, `thought /ɔː/`, `tough /ʌf/`, `cough /ɒf/`, `bough /aʊ/`).
2. **`cough /ɒf/`** uses the LOT vowel `/ɒ/`, which exists in BrE (RP) but **not in standard AmE**, where LOT is unrounded `/ɑ/`. The AmE pronunciation of `cough` is `/kɔf/` (THOUGHT vowel) or `/kɑf/` (LOT, with cot–caught merger), but never `/kɒf/`. Other AmE-targeted guides use `/ɑː/` or `/ɔː/` consistently — using `/ɒ/` here is the only place in the whole 35-guide collection that the BrE LOT vowel appears, and it directly contradicts Guide 1 and Guide 2's vowel inventory.

**What's correct (AmE):** `cough /kɔf/` (or `/kɑf/` with the merger). Either pick a 7th example to live up to "7 sonidos" — common candidates are **`hiccough /ʌp/`** (where -ough = /ʌp/, archaic spelling of "hiccup") or **`lough /ɒk/`** (Irish English; BrE-style). For an AmE-focused guide, `hiccough` is the cleanest 7th, though it's archaic; alternatively, drop the "7" claim and say "6 sonidos" honestly.

**Source:** Merriam-Webster pronunciation entries (`cough` = `\ˈkȯf\` AmE); Wells, *Longman Pronunciation Dictionary* 3rd ed. (gives `/kɒf/` UK and `/kɔːf, kɑːf/` US).

**Fix:** Change `cough /ɒf/` to `cough /ɔːf/` (or `/ɔf/` if dropping length marks per C2). Either add a 7th example (`hiccough /ʌp/`) or change the headline to `¡6 sonidos!`.

---

### C4. Guide 13 — Missing the separable/inseparable distinction entirely; this is *the* phrasal-verb topic ESL learners need
**File/lines:** `guide13.jsx:8–13` (the data) and the whole guide.

**What's wrong:** The 5-base / ~25 phrasal verbs listed are correct, but the central learner problem with phrasal verbs — *can the particle move?* — is not addressed at all. The single most error-prone pattern for Spanish-speaking learners is: with **separable transitive** phrasal verbs, a pronoun object **must** go between the verb and the particle:
- `take off your shoes` ✓
- `take your shoes off` ✓
- `take them off` ✓
- `*take off them` ✗

With **inseparable** phrasal verbs, the particle stays with the verb regardless of object:
- `look after the kids` ✓
- `look after them` ✓
- `*look the kids after` ✗
- `*look them after` ✗

The guide lists `take off`, `take on`, `take out`, `take over` (mostly separable), `look up` (separable), `look after`, `look forward to`, `look into` (inseparable), and `come up with`, `come across`, `get over`, `get through`, etc. all mixed in with no indication of which is which. A learner reading this guide will produce sentences like `*I'll take off them` or `*She got over it him` constantly.

**What's correct:** Add a marker (✂ separable / 🔒 inseparable) or split the list into two sections, and state the pronoun rule explicitly as a Trampa.

**Source:** Quirk et al. §16.3–16.7; Swan §437–438; Cambridge Grammar §16. The pronoun-position constraint is the most empirically robust phrasal-verb fact and is the first thing every ESL phrasal-verb chapter covers.

**Fix:** Add a `sep` boolean to each phrasal verb in the data and render it as ✂/🔒. Add this Trampa: `❌ I'll take off them. ✅ I'll take them off. Con phrasal verbs separables y un PRONOMBRE objeto, el pronombre va EN MEDIO. Con verbos inseparables (look after, get over, come across…) el pronombre va al final: 'I look after them' ✓.`

---

### C5. Guide 11 — Subtitle promises "if I were" but the guide never shows the past-subjunctive form
**File/lines:** `meta.js:12` (`subtitle:"Las 4 condicionales + if I were"`) and `guide11.jsx:8` (Second Conditional row).

**What's wrong:** The Second Conditional row says `If + pasado, would + base`, with example `If I had money, I would travel.` That's correct, but it conceals the well-known **were-subjunctive** that the subtitle advertises: in formal/written English (and increasingly preserved in fixed phrases) the second conditional uses `were` for *all persons*, not `was`:
- `If I were rich, I would travel.` (not `If I was rich`)
- `If he were here, he'd help us.`
- `If I were you, I would…` — fixed phrase, never `If I was you` in formal usage

The guide's own example `If I had money` doesn't trigger this contrast (no `be` verb). A learner reading only the guide would miss that they should say `If I were you` rather than `If I was you`, even though the subtitle explicitly advertises this.

**What's correct:** Add a row or note showing the `were` form. AmE/BrE note: in **informal AmE**, `was` for first/third singular in the second conditional is widespread and accepted ("If I was rich…"). In **formal writing and traditional grammar**, `were` is required. Both should be acknowledged.

**Source:** Cambridge Grammar §16 §3.4 (mandative/irrealis subjunctive); Swan §261; Garner's Modern English Usage entry "subjunctives." Corpus: COCA shows ~30% `was` / ~70% `were` in spoken AmE for `if I _ rich`, with `were` dominant in writing.

**Fix:** Add a row like `If I WERE you, I would... (formal/escrito)` or a Trampa: `Forma subjuntiva: 'If I WERE you' (formal). En conversación AmE, 'If I WAS you' también se oye, pero en escrito siempre 'were'. Para 'if I were rich', 'were' es lo correcto en todos los registros formales.`

---

### C6. Guide 27 — Tag-question rule is incomplete; missing Wh-questions entirely; missing the auxiliary-matching rule
**File/lines:** `guide27.jsx:17–22` (tag questions) and the whole guide (Wh-questions).

**What's wrong:** Two related problems with this guide on "Word Order":

1. **Tag questions:** The guide gives two examples (`You're from Mexico, aren't you?` and `She speaks English, doesn't she?`) and says "positive → negative tag, negative → positive tag." The polarity rule is correct. But the **auxiliary-matching rule is not stated**: the tag must use the **same auxiliary** as the main clause (or `do`-support if the main clause has no auxiliary). A learner producing `*You speak English, don't you?` correctly versus `*You're from Mexico, don't you?` (wrong — should be `aren't you`) needs the auxiliary rule explicitly. Also missing: the special case `I am → aren't I?` (irregular suppletion).

2. **Wh-questions are entirely absent.** The guide is titled "Word Order" with subtitle "SVO, do/does/did, tags". But Wh-questions (what/where/why/when/how/who) are arguably the highest-frequency question type and have their own subject/object asymmetry that trips up Spanish speakers:
   - **Object Wh-question**: `What did you eat?` (do-support, inversion) ← Spanish speakers tend to omit the auxiliary
   - **Subject Wh-question**: `Who ate the cake?` (no do-support, no inversion) ← Spanish speakers tend to over-add do-support: `*Who did eat the cake?`

   This subject/object asymmetry is the second-most error-prone English question pattern after yes/no questions, and it's missing.

**What's correct:** Add the auxiliary-matching rule for tags (`Use the same auxiliary as in the main clause; if there's no auxiliary, use do/does/did`) plus the `I am → aren't I` exception. Add a section on Wh-questions distinguishing subject from object Wh-questions.

**Source:** Cambridge Grammar §10 (clauses; question types); Swan §484, §583. Cambridge Learner Corpus error data shows Spanish-speaker learners produce `*Who did write this?` and `*Where you went?` at very high rates.

**Fix:** Add a Wh-question card with:
- Object Wh: `What/where/when/why/how + did/do/does + sujeto + verbo? — What DID you eat?`
- Subject Wh: `Who/what + verbo? (sin do) — Who ate the cake? Who called?`

And tighten the tag rule to: `Usa el MISMO auxiliar que la oración principal. Sin auxiliar, usa do/does/did. Excepción: 'I am' → 'aren't I?' (irregular).`

---

## Verified correct (no fix needed)

These are claims I checked and want to call out as confirmed, so the author doesn't second-guess:

- **Guide 1** — letter-by-letter IPA: A `/æ/ /eɪ/ /ɑː/ /ɔː/ /ə/`, E `/ɛ/ /iː/ /ə/ /ɪ/`, I `/ɪ/ /aɪ/ /iː/ /ə/`, O `/ɑː/ /oʊ/ /uː/ /ə/`, U `/ʌ/ /uː/ /ʊ/ /juː/`, J `/dʒ/`, R `/ɹ/`, T flap `/ɾ/` between vowels ("butter") — all correct against Wells's Lexical Sets and Merriam-Webster. The articulatory note for /v/ ("dientes superiores tocan labio inferior") is the standard place-of-articulation description for the labiodental fricative. The note for /ɹ/ ("la lengua se curva hacia atrás sin tocar nada") is a correct description of the AmE postalveolar/retroflex approximant.
- **Guide 5** — stress pairs (REcord/reCORD, OBject/obJECT, etc.) all standard noun-verb stress alternations and are the textbook examples (Quirk et al. §3.30; Wells *LPD* entries).
- **Guide 7** — irregular verb data: all 24 entries are correct, including the AmE-specific `get → got → gotten` (BrE: `got/got/got`). The `-ed` allomorph rule (/t/ after voiceless, /d/ after voiced, /ɪd/ after t/d) is exactly correct.
- **Guide 16** — irregular plurals (man/men, child/children, foot/feet, mouse/mice, person/people, sheep/sheep, fish/fish): all correct. `pants/jeans/shorts/glasses/scissors/stairs` as pluralia tantum + "a pair of": correct.
- **Guide 17** — its/it's distinction; whose/who's distinction. Correct, and well-pitched as the #1 confusable for both natives and learners.
- **Guide 18** — pronoun table is **fully correct** in all 7 rows × 4 columns, including the often-missed `theirs/themselves` and the non-existence of `*hers's` or `*its'`. Singular `they` is described correctly as "modern English standard, not an error" — accurate per Merriam-Webster (added to dictionary 2019), AP Stylebook (since 2017), APA Style 7th edition.
- **Guide 19** — Y'all etymology and apostrophe placement (`y'all` not `*ya'll`) is correct (apostrophe replaces the `ou` of `you all`). Regional distribution (Sur/Norte/Filadelfia/national) is accurate to current usage.
- **Guide 21** — the OSASCOMP (Opinion-Size-Age-Shape-Color-Origin-Material-Purpose) order is the standard descriptive rule (Cambridge Grammar §6 §14; Quirk et al. §17.114). Mark Forsyth's "lovely little old rectangular green French silver whittling knife" example is accurately quoted.
- **Guide 30** — every false-friend is a real false friend (verified against Diccionario panhispánico de dudas and Cambridge Spanish Dictionary). `embarazada/embarrassed/pregnant` and `molestar/molest/bother` are particularly important warnings for Spanish-speakers in the US — these errors have real consequences.
- **Guide 33** — all conversion ratios are correct (1 mile = 1.609344 km; 1 lb = 0.4536 kg; 1 US gal = 3.785 L; 5'10" = 177.8 cm). Chattanooga area code **423** is correct (covers SE Tennessee; the only other TN code adjacent is 615 Nashville, 901 Memphis, 731 W. TN, 865 Knoxville, 931 Middle TN).
- **Guide 35** — every dialectal feature is well-attested in the linguistic literature:
  - **Pen-pin merger**: documented in Atlas of North American English (Labov et al. 2006); Chattanooga is solidly inside the merger zone.
  - **Southern drawl / vowel breaking**: Labov, Ash & Boberg's "Southern Shift"; Wells *Accents of English* vol. 3 ch. 6.
  - **Doubled modals (might could, might should, used to could)**: well-documented in syntactic literature (Battistella 1995, "The syntax of the double modal construction"; Mishoe & Montgomery 1994).
  - **Carry = drive someone, cut on/off, mash, holler, buggy, Coke = any soda**: all in the *Dictionary of American Regional English* (DARE) and Harvard Dialect Survey (Vaux & Golder 2003) maps.
- **Guide 32** — Bless your heart's ambiguity (genuine sympathy vs. soft insult) is an accurate cultural framing. "Fixin' to" / "I reckon" / "over yonder" are accurate Southern expressions.

---

## Minor accuracy issues (should fix, low priority)

### M1. Guide 1 — `letter X: /ɡz/ "antes de vocal acentuada"` — `guide1.jsx:28`
The rule "X = /ɡz/ before a stressed vowel" is the classic textbook formulation but has clearer counter-examples than implied. `examination`, `exact`, `exhaust` all have /ɡz/ as claimed, but `expect` /ɪkˈspɛkt/, `excel` /ɪkˈsɛl/ have /ks/ even though the second syllable is stressed — the actual rule is more like "/ɡz/ when X is followed by a vowel-initial stressed syllable AND the X is not part of a `-ex-` prefix followed by a voiceless consonant." Accept the simplification, but consider adding "y otras palabras como exam, exist" rather than implying it's a clean rule.

### M2. Guide 1 — `letter Y: vocal /aɪ/ (my) o /ɪ/ (gym)` is incomplete — `guide1.jsx:29`
Missing the very common Y = /i/ word-finally in unstressed syllables (`happy /ˈhæpi/`, `funny`, `pretty`, `every`). For ESL learners this is the most common Y-as-vowel pattern by far. Add: `o /i/ al final no acentuado: happy, funny, pretty.`

### M3. Guide 2 — `/eɪ/ "diptongo, empieza en e y se desliza a i"` — partial — `guide2.jsx:10`
Correct shape, but Spanish speakers tend to produce a pure monophthong `/e/` for FACE (cake → `[ke]` instead of `[keɪ]`). The off-glide is the part that's missing in their L1. The description should emphasize that the *off-glide is essential*, not optional. Same applies to `/oʊ/` (note → not `[no]` but `[noʊ]`).

### M4. Guide 2 — categorization labels — `guide2.jsx:23`
`Cerradas/Medias/Abiertas` is the standard articulatory taxonomy for monophthongs, but `/eɪ/` and `/oʊ/` are diphthongs and should be labeled as such (or shown in a separate "Diptongos" filter). Currently `/eɪ/` is in the "mid" bucket and `/oʊ/` is in "mid", which is descriptively half-right (the starting position is mid) but obscures their diphthong status. Add a `cat:"diphthong"` group, or rename `mid` → `mid/diphthong`.

### M5. Guide 3 — `/θ/ "Como la Z de España"` — `guide3.jsx:10`
True for Peninsular Spanish (Castilian) but **false for Latin American Spanish** (where `z` and `c` before `e/i` are pronounced `/s/`, the `seseo` pattern). The target audience here is Latin-American (likely Mexican/Central-American given Chattanooga demographics), so the analogy `θ ≈ Z española` is unhelpful unless they happen to know Castilian Spanish. Better analogy: `Lengua entre los dientes — sin vibración. Es un sonido NUEVO, no existe en español latinoamericano.`

### M6. Guide 3 — `/ð/ "Como la D suave del español entre vocales"` — `guide3.jsx:11`
This is the correct analogy and is helpful (the Spanish intervocalic /d/ in "nada", "todo" is realised as `[ð]` in many dialects). Fine. The contrast with M5 is the issue: `θ` *doesn't* have a Latin-American Spanish equivalent, but the guide implies it does via the Castilian Z analogy. Treat `θ` as a new sound, `ð` as repurposing a familiar allophone.

### M7. Guide 4 — i-before-e rule is missing — `guide4.jsx`
The classic English spelling rule "i before e except after c, or when sounded as `a` as in `neighbor` and `weigh`" isn't covered. It's a productive rule (over a hundred common words: receive, deceive, ceiling, perceive, eight, weigh, vein, neighbor) — and so are its famous exceptions (weird, height, foreign, seize, science, ancient, sufficient). Worth adding as a 7th or 8th pattern. Source: Merriam-Webster's spelling rule notes.

### M8. Guide 8 — subtitle promises "fixin' to" but the guide content doesn't include it as a tracked form — `meta.js:9`, `guide8.jsx:7,16`
The interactive shows three modes: `will`, `going to`, `present progressive`. "Fixin' to" appears only in the Chatt callout, not as one of the buttons. Either add a 4th button for `fixin' to / finna` (which would be appropriate given Chattanooga focus), or change the subtitle. The current state is internally inconsistent.

### M9. Guide 10 — `must` example only shows deontic (obligation) — `guide10.jsx:11`
`must = obligación, certeza` correctly identifies the two senses (deontic + epistemic), but the example `You must wear a seatbelt` is purely deontic. Add an epistemic example: `He must be tired (= seguro que está cansado)` to illustrate the certainty/inference reading. Same comment applies to `should` (only shows advice, not the expectation/inference reading: `The package should arrive tomorrow`).

### M10. Guide 14 — articles with proper nouns and institutions are missing — `guide14.jsx:7–11`
Generic / specific / zero is well-presented for common nouns. Missing rules:
- Plural country names take `the`: `the United States, the Netherlands, the Philippines`
- Rivers, oceans, mountain ranges, deserts take `the`: `the Mississippi, the Pacific, the Rockies, the Sahara`
- Single mountains, lakes, individual islands take zero: `Mt. Everest, Lake Michigan, Cuba`
- Institutions with `the` (the Pentagon, the Supreme Court) vs without (Congress, Parliament)

This is a high-error area for Spanish speakers and a common gap. Worth a 4th button or a sub-card.

### M11. Guide 15 — `news` is grammatically singular but ends in `-s` — should be flagged — `guide15.jsx:6`
`news` is correctly in the uncountables list, but the agreement issue (`The news IS bad`, not `*The news ARE bad`) is a separate trap that deserves a one-line note. Same for `mathematics`, `physics`, `economics`, `politics` (all singular despite -s). These aren't in the list but are common high-frequency examples. Source: Quirk et al. §5.85.

### M12. Guide 17 — "'s for people, of for things" rule is overstated — `guide17.jsx:11–28`
The two-card framing implies a hard rule. In current English usage, 's freely attaches to inanimate nouns, especially with companies, places, time, and measurement: `today's news, the company's policy, a week's vacation, England's weather, the car's engine`. The "of for things" rule is a teaching simplification that contradicts a lot of natural usage. Soften: `Generalmente 's para personas y animales, of para cosas — pero 's también se usa con empresas, lugares, tiempo y medidas: today's news, the car's engine.` Source: Cambridge Grammar §5 §15; Swan §439; corpus evidence in Biber et al. *Longman Grammar of Spoken and Written English* §4.6.

### M13. Guide 22 — `farther/farthest` is shown but not `further/furthest` — `guide22.jsx:10`
The double comparative for `far` is a real ESL stumbling block. AmE convention: **farther** for physical distance, **further** for figurative/abstract ("further information", "further details"). Both forms are now widely interchangeable in conversational AmE but written usage still respects the split. Add `further/furthest` as a parallel row or a one-line note.

### M14. Guide 23 — "good vs well: 'She sings good (casual americano)'" — too lenient — `guide23.jsx:17`
The descriptive claim is correct (it's used informally in AmE) but for an ESL audience this is misleading: "She sings good" is widely flagged as nonstandard even by AmE speakers, and would mark a learner as having low proficiency in any formal context. The framing should be: `well = estándar (siempre seguro). good como adverbio = muy informal, en escritura/contextos formales se considera incorrecto.` Source: Merriam-Webster usage note on "good" (adverb); Garner's Modern English Usage entry.

### M15. Guide 26 — `however/therefore` shown as parallel to `but/so` but they're a different syntactic class — `guide26.jsx:8`
`but` and `so` are coordinating conjunctions: `He's tired, but he's working.` `However` and `therefore` are conjunctive adverbs: they require either a semicolon (`He's tired; however, he's working.`) or a sentence break (`He's tired. However, he's working.`). The most common ESL error is `*He's tired, however he's working` (comma splice). The guide currently presents them as drop-in synonyms differing only by register, which will produce comma splices. Add a one-line punctuation note: `'However' y 'therefore' necesitan PUNTO Y COMA o nuevo punto antes — nunca solo coma.`

### M16. Guide 28 — backshift exceptions and time/place changes are missing — `guide28.jsx:5–9`
The four backshift rules shown (present→past, will→would, past→past perfect, can→could) are correct but the well-known **exceptions** are missing:
- `must` (deontic) usually doesn't backshift: `'You must leave' → He said I must leave / had to leave` (both OK).
- `should`, `would`, `could`, `might` don't backshift (they're already past forms of modals).
- General/timeless truths optionally don't backshift: `'The earth orbits the sun' → He said the earth orbits the sun` (no shift required).
- **Time/place expressions also shift**: `now → then; today → that day; tomorrow → the next day; here → there; this → that`. Major coverage gap.

### M17. Guide 29 — restrictive `which` vs `that` is presented as a hard rule — `guide29.jsx:7–8`
`This book, which I bought yesterday, is great` (non-restrictive, with commas) and `The book that I read was good` (restrictive, no commas) are both correct. But the implied rule "which = non-restrictive only, that = restrictive only" is **prescriptive AmE style** (Garner, Strunk-White, *Chicago Manual of Style*), not how English actually works. In BrE and conversational AmE, restrictive `which` is fully grammatical: `The book which I read was good` is fine. Worth noting this is a style preference, not a rule of grammar. Source: Cambridge Grammar §12 §3.1; Pullum's Language Log post "The cult of `which` hunting" (2004).

### M18. Guide 33 — tipping % is climbing post-2020; "18-20%" is a baseline, not a current expectation — `guide33.jsx:17`
The 18-20% range for restaurants was the standard from ~1990–2020. Post-pandemic, point-of-sale tip prompts default to 20-25-30% in many establishments and the cultural expectation has crept up. **18% is now the floor for adequate service** in cities; 20% is normal; 22-25% for excellent service or large groups. The guide's number isn't *wrong* but it's slightly behind current practice. Consider revising to "18-22%, 20% es lo normal" or noting the trend. (For a Chattanooga-targeted guide, the urban tipping-creep is less pronounced than NYC/SF, so this is less critical.)

### M19. `Insight as Nota` aliasing in components.jsx imports is fine but inconsistent — `guide4.jsx:3`, `guide12.jsx:3`, `guide15.jsx:3`, `guide17.jsx:3`, `guide20.jsx:2`, `guide21.jsx:3`, `guide26.jsx:2`, `guide29.jsx:2`
Some guides rename the `Insight` component to `Nota` via import alias, others use it directly. Not an accuracy issue, but a minor consistency issue for future maintainers. Pick one (probably `Nota` since the rest of the UI is Spanish) and update consistently. Lower priority — flagging only.

---

## Effectiveness improvements

### E1. Add an audio button to every IPA chip (Guide 2, Guide 3, Guide 4)
Guide 1 already does this — clicking a sound chip in the alphabet detail panel speaks the example word. Guides 2, 3, and 4 don't. The whole point of pronunciation interactive content is the speech button. Adding `onClick={()=>speakEnglish(v.word)}` to the IPA buttons in Guide 2 (`vowelSounds`), Guide 3 (`consonantChallenges`), and Guide 4 (`spellingPatterns`) would massively increase usefulness for the same code change. This is the highest-leverage improvement in the collection.

### E2. Guide 2 — add a Chattanooga-specific note about cot-caught merger
The pen-pin merger Chatt note is excellent. Add a parallel note for the **cot-caught merger** which is also present in younger Tennessee speakers: `'cot' y 'caught' suenan iguales para muchos hablantes jóvenes de Chattanooga. Si oyes solo un sonido entre /ɑ/ y /ɔ/, no te preocupes — está cambiando.` This contextualizes the inventory question raised in C2.

### E3. Guide 6 — "verb works" → call out the third-person -s spelling rules
The `goes/works/has` table is correct but misses the spelling rules for adding -s/-es to verbs:
- Most verbs: + s (works, plays, drives)
- Verbs in -ch/-sh/-s/-x/-z: + es (watches, washes, fixes)
- Verbs in consonant + y: y → ies (study → studies, try → tries)
- Verbs in -o: + es (go → goes, do → does)

Guide 16 covers the parallel noun rules; the verb rules deserve one parallel card here.

### E4. Guide 7 — add **gone vs been** distinction (high ESL error rate)
The participle of `go` is `gone`, but `been` is also used as the past participle of `go` in "I have been to Paris" (= visited and returned) vs "I have gone to Paris" (= I am there now / left for there). This is a classic Cambridge Learner Corpus error pattern. Add: `He gone vs He been: 'Have you ever BEEN to NY?' (visitar) vs 'He's GONE to NY' (se fue, sigue allá).`

### E5. Guide 9 — once C1 is fixed, add Present Perfect Continuous
The guide currently treats Present Perfect as a single form. Present Perfect Continuous (`I've been working since 9 AM`) is a separate aspect with its own meaning (ongoing process up to now, often emphasizing duration or recent activity). Cambridge Learner Corpus shows Spanish speakers heavily under-use this form. Worth a section.

### E6. Guide 10 — separate **modal** from **semi-modal** (have to, ought to, had better, used to)
The 7 modals listed are pure modals. The semi-modals — especially `have to` (deontic, not subject to negation differently from `must not`), `ought to` (mild advice, similar to `should` but more formal), `had better` (warning/threat) — are missing. `must` vs `have to` is a major ESL distinction:
- `must` = internal/personal obligation OR strong inference
- `have to` = external obligation
- `mustn't` = prohibition (you are NOT allowed)
- `don't have to` = no obligation (you don't need to)

Note also `must not / mustn't` and `don't have to` are NOT synonyms — the `mustn't ≠ don't have to` distinction is one of the highest-frequency errors in the Cambridge English Profile error data.

### E7. Guide 11 — add mixed conditionals and inversion
After fixing C5, the guide could be strengthened with:
- **Mixed conditionals**: `If I had studied (past), I would be a doctor now (present)` — third-condition antecedent + second-condition consequent.
- **Inversion in formal English**: `Had I known, I would have helped` (= If I had known...). High-utility for written/formal contexts; appears constantly in formal AmE writing.

### E8. Guide 12 — passive across all tenses
The guide shows 4 tense forms in the DarkBox (`is cleaned, was built, will be sold, has been painted`) but the interactive doesn't let users explore them. Convert the DarkBox into a tense selector showing all common forms:
- Simple Present passive: is/are + V3
- Simple Past passive: was/were + V3
- Present Continuous passive: is/are being + V3 (`The road is being repaired`)
- Past Continuous passive: was/were being + V3 (`The house was being painted when I arrived`)
- Modal passive: must/should/can + be + V3 (`This must be done by Friday`)
- Past Perfect passive: had been + V3

### E9. Guide 13 — add ✂/🔒 markers (per C4) AND a "particle stays close to verb when topic shifts" example
After C4 is fixed, also note that with separable phrasal verbs and a **long noun-phrase object**, the particle tends to *stay close to the verb* even though it could move:
- `Take off your old worn-out winter boots` ✓ (better)
- `Take your old worn-out winter boots off` ✓ (grammatical but heavier)

This is a frequency/style fact that ESL grammars often miss.

### E10. Guide 18 — add a note on **case in coordinated subjects/objects** (#1 native-speaker confusion)
"My friend and I" vs "My friend and me" — this is the most common case error among both natives and learners. The rule: if you'd use "I" alone as subject, use "my friend and I"; if you'd use "me" alone as object, use "my friend and me." Test by removing the other phrase: `*Me went to the store` → so `*My friend and me went` is wrong. `*She gave I a book` → so `*She gave my friend and I a book` is wrong (despite being heard everywhere). Worth a one-line trampa.

### E11. Guide 24 — add `IN/ON/AT` for transportation (`in a car / on a bus`)
The guide correctly puts `in a car` (cars are *in*) and `on the bus` (buses are *on*) in the place section. Worth dedicating a row to transportation specifically — it's a learner sticking-point: `IN: car, taxi (small/private). ON: bus, train, plane, boat (large/public).` The historical reason is that `in` was for enclosed spaces you ducked into, `on` for surfaces you stepped onto — and ships had decks. Useful mnemonic.

### E12. Guide 27 — once C6 is fixed, add **indirect questions** (no inversion)
`Where is the bank?` (direct, with inversion) vs `Could you tell me where the bank IS?` (indirect, no inversion — Spanish speakers heavily over-invert here). This is the second-most-common question error after subject vs object Wh.

### E13. Guide 30 — add `realize` vs `realise` (AmE/BrE spelling pairs)
The guide is firmly AmE. Worth a one-line callout naming the systematic AmE/BrE spelling differences a learner will encounter:
- `-ize / -ise` (realize/realise, organize/organise)
- `-or / -our` (color/colour, favor/favour)
- `-er / -re` (center/centre, theater/theatre)
- `traveling / travelling`, `canceled / cancelled`

This belongs in Guide 30 (Common Errors) or maybe Guide 4 (Spelling). Spanish speakers reading both AmE and BrE materials get confused.

### E14. Guide 32 — "I'm down" gloss could backfire
`I'm down (le entro / me apunto)` is correct in current AmE slang (= "I'm in, I agree to"), but `I'm down` historically also meant `I'm depressed` and the affirmative/negative split is generationally cued. For an ESL learner who picks this up and uses it in a conservative/older context, they may be misread. Add: `I'm down = informal/joven. En contexto profesional, di 'I'm in' o 'Sounds good'.`

### E15. Guide 35 — add a note that doubled modals are **regional pride**, not "broken English"
The guide already does a good job framing Southern English as a distinct dialect, not bad English. Specifically for doubled modals, point out that they're a productive grammatical construction (not random combinations) and have **subject-Aux inversion patterns** that prove they're real syntax: `Could you might help me?` is **ungrammatical** even in Southern English; only `Might you could help me?` is grammatical. This shows learners they're real syntax with rules, not free combinations. Source: Battistella 1995.

### E16. Across the collection — `Insight` callouts
The Insights are consistently good but a few are restating the obvious. Examples:
- Guide 21: "¡Los adjetivos ingleses NO cambian por género ni número!" — true but most learners notice this on day 1; better to surface a deeper hint, e.g. "Las únicas excepciones son `this/these` y `that/those` — los demonstrativos sí concuerdan con el número (no género)."
- Guide 26: "Usa los conectores casuales al hablar, los formales al escribir." — better to give the actual punctuation rule for conjunctive adverbs (per M15).
Consider one polish pass to make every Insight punchy and non-trivial.

---

## Coverage gaps

### G1. **Wh-questions (subject vs object)** — critical (see C6)
Currently no coverage. This is one of the two most error-prone English question patterns for Spanish speakers (the other being yes/no questions, which Guide 27 covers). Add to Guide 27 or split off into a new guide.

### G2. **Indirect questions / embedded questions** (per E12)
`Could you tell me where the bank is?` (no inversion). Common in polite/professional speech. Missing entirely.

### G3. **Phrasal-verb separability** (per C4)
The single most important phrasal-verb rule, completely absent.

### G4. **Gerund vs Infinitive** (verb complementation)
No guide covers `enjoy doing` vs `decide to do` vs `like doing/like to do` vs `stop doing` (= cease) vs `stop to do` (= pause in order to). This is one of the highest-density ESL topics — Cambridge English Profile covers it across A2-C1 levels — and it's missing entirely. Strong candidate for a new guide or a section in Guide 13 (which is currently only phrasal verbs).

### G5. **Mixed conditionals and conditional inversion** (per E7)
After fixing C5, add mixed conditionals and inversion for completeness. Both common in real-world AmE writing.

### G6. **Passive across all tenses + modal passives + get-passive uses beyond informal** (per E8)
Guide 12 introduces passive but doesn't fully tabulate it.

### G7. **Articles with proper nouns and institutions** (per M10)
Plural country names, rivers, mountain ranges, oceans, deserts — Spanish speakers especially get this wrong because Spanish article use with proper nouns differs.

### G8. **AmE/BrE spelling and lexical differences** (per E13)
A learner reading both Netflix and BBC content needs this. The collection is firmly AmE-targeted but never explicitly contrasts.

### G9. **Tag-question auxiliary-matching rule** (per C6)
Currently the polarity rule is shown but not the auxiliary-matching rule. Major omission.

### Borderline-redundant topics (none)
The 35-guide split feels mostly tight. Guide 19 (Y'all) and Guide 35 (Chattanooga English) overlap on `y'all` but the framing is different (Guide 19 is about the missing 2nd-person plural pronoun; Guide 35 is about the dialect overall). Both useful.

### Category structure
The 8-category split (Pronunciación / Verbos / Sustantivos / Pronombres / Adjetivos / Preposiciones / Oraciones / Práctico) is clean and matches Spanish-speaker mental models for grammar instruction. The `catColors` map has `Sustantivos: "#C62828"` and `Oraciones: "#C62828"` — both red. Not an accuracy issue but visually conflating; consider separating.

---

## Per-guide notes (only where issues exist)

### Guide 1 — The Alphabet
- IPA values verified correct.
- X rule (M1) is a useful simplification but not literally "before stressed vowel."
- Y missing the very common `/i/` ending (M2).

### Guide 2 — Vowel Sounds
- Inventory of 12 vs claim of "~15"; missing /aɪ/, /aʊ/, /ɔɪ/, /ɝ/ (C2).
- Length-mark convention is BrE-style for an AmE-targeted guide (C2).
- /eɪ/ /oʊ/ off-glides need emphasis as essential, not optional (M3).
- /eɪ/ /oʊ/ in "mid" bucket conflates monophthongs with diphthongs (M4).
- Add cot-caught merger note (E2).

### Guide 3 — Consonant Challenges
- /θ/ ≈ "Z española" assumes Castilian (M5); revise for Latin American audience.
- /ð/ analogy with intervocalic /d/ is good (M6 — keep).
- Add audio buttons (E1).

### Guide 4 — Spelling Patterns
- "-ough has 7 sounds" but lists 6; `cough /ɒf/` is BrE not AmE (C3).
- i-before-e rule missing (M7).
- Add audio buttons (E1).

### Guide 5 — Stress & Rhythm
- All 6 noun-verb stress pairs correct.

### Guide 6 — Simple Present
- Conjugation correct.
- Add 3rd-person -s spelling rules (E3).

### Guide 7 — Simple Past
- All 24 irregulars correct including AmE-specific `gotten`.
- Chatt note on doubled modals is misplaced (it's about modals, not past). Move to Guide 10 footer or replace with a past-tense Southern note (e.g. `dove vs dived` — AmE uses both).
- Add `gone vs been` distinction (E4).

### Guide 8 — Future
- Subtitle promises "fixin' to" but it's only in the Chatt callout (M8).

### Guide 9 — Present Perfect
- Critical: AmE/PP framing is wrong as stated (C1).
- Add Present Perfect Continuous (E5).

### Guide 10 — Modals
- `must` example only deontic; add epistemic (M9).
- Add semi-modals: `have to`, `ought to`, `had better`, `used to` (E6).
- Add `must / have to / mustn't / don't have to` distinction (E6).

### Guide 11 — Conditionals
- Subtitle promises `if I were` — content doesn't deliver (C5).
- Add mixed conditionals and inversion (E7).

### Guide 12 — Passive Voice
- Make the tense list interactive (E8).
- "Don't overuse passive" is fine but slightly prescriptive — passive has legitimate uses (focus, agent unknown, formal register).

### Guide 13 — Phrasal Verbs
- Critical: missing separable/inseparable distinction (C4).
- Particle-position-with-pronouns rule missing (C4).
- Coverage of gerund vs infinitive belongs nearby (G4).

### Guide 14 — Articles
- Articles with proper nouns / institutions missing (M10).

### Guide 15 — Countable vs Uncountable
- `news` agreement note missing (M11).
- `some` in offers/requests not covered.

### Guide 16 — Plurals
- Greek/Latin plurals not covered: `analysis/analyses`, `crisis/crises`, `cactus/cacti`, `criterion/criteria`, `phenomenon/phenomena`, `index/indices`. Coverage gap.

### Guide 17 — Possessives
- "'s for people, of for things" overstated (M12).

### Guide 18 — Pronouns
- Pronoun table is fully correct.
- Add coordinated-subject case rule (E10).

### Guide 19 — Y'all
- Etymology and apostrophe rule correct.

### Guide 20 — Demonstratives
- All correct.

### Guide 21 — Adjective Order
- OSASCOMP order correct. Forsyth example correct.

### Guide 22 — Comparatives
- Add `further/furthest` alongside `farther/farthest` (M13).

### Guide 23 — Adverbs
- "good vs well" framing too lenient for ESL audience (M14).
- `slow / slowly` framing fine but consider noting "slowly" is the safe choice in writing.

### Guide 24 — In / On / At
- Correct.
- Transportation `in/on` worth dedicated row (E11).

### Guide 25 — Verb + Preposition
- All 10 collocations correct.
- `dream about` could note `dream of` as alternative.
- `arrive in/at` Trampa is well-pitched.

### Guide 26 — Connectors
- `however/therefore` punctuation rule missing — will produce comma splices (M15).

### Guide 27 — Word Order
- Tag rule incomplete (auxiliary-matching not stated) (C6).
- Wh-questions entirely missing (C6).
- Indirect questions missing (E12).

### Guide 28 — Reported Speech
- Backshift exceptions and time/place changes missing (M16).

### Guide 29 — Relative Clauses
- `which` restrictive use overstated as ungrammatical; it's a style preference (M17).
- Relative adverbs `when/why` not covered.
- `whom` not covered (formal object form).

### Guide 30 — Errores Comunes
- All 10 false friends correct and well-chosen.
- Structural errors all correct.
- Double negation rule should acknowledge it's standard in many dialects (Southern AAVE, Appalachian) just not in formal/standard.
- Add AmE/BrE spelling differences (E13).

### Guide 31 — Registro
- Correct.

### Guide 32 — Modismos
- All idioms correct.
- `I'm down` could backfire generationally (E14).

### Guide 33 — Numbers/Measures
- All conversions correct.
- Tipping % reflects 2010s norm; current AmE is creeping toward 20-25% (M18).
- Chattanooga area code 423 correct.

### Guide 34 — Small Talk
- Cultural framing accurate.

### Guide 35 — Chattanooga English
- Every dialectal feature is well-attested in the linguistic literature.
- Add note that doubled modals are productive syntax with rules, not free combinations (E15).

---

## Code-quality notes (not accuracy, but worth flagging)

- `Insight as Nota` aliasing inconsistency across files (M19) — minor maintenance issue.
- `meta.js:41` has duplicate color values (`Pronombres` and `Pronunciación` both `#1565C0`; `Sustantivos` and `Oraciones` both `#C62828`). Visually conflates categories. Not a bug.
- `_helpers.jsx` defines `Trampa` and `Chatt` but no language-specific helpers like the FreeCAD guide's `SketchDiagram` — fine, but if more language guides are added the helper-component conventions could be unified (e.g. all language guides could share a `FalsoAmigo` component for false-friend cards).

---

## Sources cited

### Reference grammars
- **Huddleston, R. & Pullum, G. K.** (2002). *The Cambridge Grammar of the English Language.* Cambridge University Press. (CGEL — modern descriptive reference. Used for: present perfect aspect §3.5.7; conditionals §16; relative clauses §12; phrasal verbs §16.)
- **Quirk, R., Greenbaum, S., Leech, G. & Svartvik, J.** (1985). *A Comprehensive Grammar of the English Language.* Longman. (Used for: tag questions §11.8; modals §4.49; passives §3.65.)
- **Swan, M.** (2016). *Practical English Usage* (4th ed.). Oxford University Press. (Canonical ESL reference. Used for: §455 American/British present perfect; §261 subjunctives; §437–438 phrasal verbs; §583 indirect questions.)
- **Biber, D., Johansson, S., Leech, G., Conrad, S. & Finegan, E.** (1999). *Longman Grammar of Spoken and Written English.* (Used for: corpus frequency of possessive 's with inanimates §4.6.)
- **Garner, B.** (2022). *Garner's Modern English Usage* (5th ed.). Oxford University Press. (AmE prescriptive/descriptive distinctions.)

### Phonology
- **Wells, J. C.** (1982). *Accents of English* (3 vols.). Cambridge University Press. (Used for: Lexical Sets framework — TRAP, FACE, GOAT, NURSE, etc.; vol. 3 ch. 6 Southern States.)
- **Wells, J. C.** (2008). *Longman Pronunciation Dictionary* (3rd ed.). (Used for AmE/BrE pronunciation differences, e.g. `cough`.)
- **Labov, W., Ash, S. & Boberg, C.** (2006). *The Atlas of North American English: Phonetics, Phonology and Sound Change.* Mouton de Gruyter. (Used for: pen-pin merger geography; Southern Shift; cot-caught merger map. Chattanooga is mapped as Inland South dialect region with pen-pin merger.)
- **Ladefoged, P. & Johnson, K.** (2014). *A Course in Phonetics* (7th ed.). (Used for: standard IPA; place/manner descriptions.)
- **CMU Pronouncing Dictionary** — http://www.speech.cs.cmu.edu/cgi-bin/cmudict (AmE phoneme inventory standard.)
- **Merriam-Webster online** — https://www.merriam-webster.com/ (Used for: AmE pronunciations of `cough, get-gotten, news`; usage notes on `good (adv.)`, singular `they`.)

### Dialect / Southern English
- **Battistella, E.** (1995). "The syntax of the double modal construction." *Linguistica Atlantica* 17, 19–44. (Used for: doubled modals are syntactic, not random; subject-Aux inversion constraints.)
- **Mishoe, M. & Montgomery, M.** (1994). "The pragmatics of multiple modal variation in North and South Carolina." *American Speech* 69(1), 3–29.
- **Cassidy, F. G. & Hall, J. H.** (eds.) *Dictionary of American Regional English* (DARE). Harvard University Press. (Used for: `carry, cut on/off, mash, holler, buggy, Coke as generic`.)
- **Vaux, B. & Golder, S.** (2003). *Harvard Dialect Survey.* http://dialect.redlog.net/ (Used for: "Coke" as generic soda mapping in SE US; `you guys` vs `y'all` distribution.)

### Corpus and learner-error data
- **Corpus of Contemporary American English (COCA)** — https://www.english-corpora.org/coca/ (Used for: `was/were` in second conditional; present-perfect with `already/just/yet`.)
- **Cambridge English Corpus / Cambridge Learner Corpus** — used for: high-frequency Spanish-speaker error patterns (Wh-questions, `mustn't / don't have to`, `gone vs been`, gerund/infinitive). Cited via Cambridge English Profile and English Vocabulary Profile (https://www.englishprofile.org/).

### AmE style and usage
- **AP Stylebook** (since 2017 — singular `they`).
- **APA Publication Manual** (7th ed., 2020 — singular `they`).
- **Chicago Manual of Style** (17th ed., §5.220 on `that`/`which`).

### Language-Log debunkings of prescriptive rules
- **Pullum, G. K.** "The Cult of Which Hunting" (2004), *Language Log*. (Used for M17: restrictive `which` is fully grammatical; the `that/which` rule is a 20th-century AmE style choice, not a grammar rule.)
