# Arabic Guide — Comprehensive Accuracy + Effectiveness Review

## Executive Summary

- **Overall verdict:** The 30-guide arc is well-conceived — it covers script, phonology, noun system, pronouns, verbs, sentences, and Practical (MSA-vs-dialect, roots) in a sensible order, and the Palestinian-dialect callouts are a genuine differentiator. However, there are **systematic transliteration errors** running through every guide (the same character `'` is used for both ع *ʿayn* and ء *hamza*, which collapses a phonemic distinction); **a phonology mis-classification** in Guide 1 that flips ا and ه across the throat-letter boundary; **a hamza-rules guide whose own examples don't match the rule it teaches** (Guide 7); plus several smaller MSA inaccuracies (a feminine-plural pronoun absent from the past-tense table while the row label says "they (m)", a missing dual pronoun row, a Form-IX gloss that's actually correct but a Form-X gloss that's misleading, and a few diptote/case-ending statements that need tightening).
- **Number of accuracy issues found:** 25 total — **7 critical** (a learner will be misled or unable to decode the script as taught) / **18 minor** (imprecise wording, omitted forms, conventions worth tightening).
- **Number of effectiveness improvements suggested:** 13
- **Number of coverage gaps flagged:** 8
- **Recommendation:** **hold-for-revision**. The transliteration scheme (C1) and the throat-letter classification (C2) are pervasive across the collection and need to be corrected before shipping. The hamza-rules examples (C3) actively contradict the rule the guide teaches. Once those plus the missing-form issues in Guides 15/18/19/20 are fixed, the collection is strong.

---

## Critical accuracy issues (must fix before shipping)

### C1. Transliteration collapses ʿayn (ع) and hamza (ء) into a single `'` — across the entire collection
**File/lines:** Pervasive. Examples:
- `guide1.jsx:5–32` — column `tr` uses `'` for hamza-related letters (`tr:"'"` for ع on line 22) and the `n` (name) field also uses single `'` for both: `"'ayn"` (ع, line 22), `"hā'"` (ه, line 30 — hamza-final), `"bā'"`, `"tā'"`, `"thā'"`, `"ḥā'"`, `"khā'"`, `"rā'"`, `"ṭā'"`, `"ẓā'"`, `"fā'"`, `"yā'"`.
- `guide6.jsx:7,11,12,17–20` — `"'ayn"`, `"khā'"`, `"ṣād"` etc. all same single-prime convention.
- `guide7.jsx:7–10` — *Hamza rules* itself uses `'` for the very phoneme it's teaching: `"su'āl"` (سؤال), `"sa'ima"`, `"bi'r"`, `"samā'"`, `"juz'"` — all hamza, no ʿayn here, but ambiguous to a reader who's also seen `"'ayn"` for ع.
- `guide8.jsx:30–31` — `"'alā"` (على, ʿayn), `"Mūsā"`.
- `guide17.jsx:4` — `"hā'ulā'i"` (هؤلاء, two hamzas, no ʿayn) and `"ulā'ika"` (أولئك, hamza).
- `guide27.jsx:4` — `"'alā"` (على, ʿayn), `"'an"` (عن, ʿayn), `"ma'a"` (مع, ʿayn).
- `guide30.jsx:10` — `"'alima"` (علم, ʿayn), `"'ilm"`, `"'ālim"`, `"mu'allim"`, `"ta'līm"` — all ʿayn, but rendered with same `'` that elsewhere is hamza.

**What's wrong:** ʿayn (ع, /ʕ/) and hamza (ء, /ʔ/) are different phonemes — they contrast minimal pairs (e.g. *saʿd* "luck" vs. *saʾd* — both real words). Both standard romanization systems (ALA-LC and DIN 31635) distinguish them in print:

| Letter | Phoneme | ALA-LC / DIN 31635 | Unicode |
|---|---|---|---|
| ع *ʿayn* | /ʕ/ | `ʿ` (modifier letter left half ring) | U+02BF |
| ء *hamza* | /ʔ/ | `ʾ` (modifier letter right half ring) | U+02BE |

**Source:** ALA-LC Arabic Romanization Table (Library of Congress, 2012; current edition); DIN 31635:2011; Wikipedia "Romanization of Arabic" — both confirm `ʿ` U+02BF for ʿayn and `ʾ` U+02BE for hamza. Andreas Hallberg's typography reference (typographyofaynandhamza) catalogs the half-ring glyphs and warns specifically against using the single ASCII apostrophe for both.

**Why this matters:**
- A learner reading `"'ayn"` and `"sa'ala"` cannot distinguish the consonants in the words.
- It's a **single global edit** to fix — replace `'` with `ʿ` for ʿayn cases and `ʾ` for hamza cases — and the collection then becomes consistent with every published MSA textbook (Al-Kitaab, Ryding, Wightwick & Gaafar, Hans Wehr).
- The collection is otherwise quite close to ALA-LC (it already uses `ā` `ī` `ū`, `ḥ` `ḍ` `ṣ` `ṭ` `ẓ`, `dh`, `th`, `sh`, `kh`, `gh`); fixing this one inconsistency completes the system.

**Recommendation:** Run a search-and-replace per-guide. The mapping is unambiguous for proper data: ʿ U+02BF wherever the source letter is ع; ʾ U+02BE wherever the source letter is ء. (For *ʿAyn* sentence-initial, use the same character — it's a letter, not a quotation mark; do not reach for typographic curly quotes.)

---

### C2. Throat-letter classification in Guide 1 puts alif (ا) in the throat group and excludes hā' (ه) — the canonical 6 *ḥurūf al-ḥalq* are inverted
**File/lines:** `guide1.jsx:5` (`{l:"ا", … cat:"throat"}`), `guide1.jsx:30` (`{l:"ه", … cat:"normal"}`).

**What's wrong:** The classical and pedagogical category *ḥurūf al-ḥalq* (the "throat letters") consists of **six letters: ء ه ع ح غ خ** — divided into lower throat (ء, ه), middle throat (ع, ح), and upper throat (خ, غ). This classification goes back to Sibawayh's *al-Kitāb* and is reproduced in every modern phonology reference. The bare alif (ا) is **not** a throat letter — it represents the long vowel /aː/, not a glottal stop. The glottal-stop carrier is hamza (ء), which the alphabet array doesn't include as a separate row at all (Guide 1 has 28 letters, the standard count, but the throat marking is wrong).

**What's correct:**

| Letter in Guide 1 | Currently `cat:` | Should be |
|---|---|---|
| ا (alif) | `"throat"` | `"normal"` (it's a long vowel / hamza-bearer) |
| ه (hā') | `"normal"` | `"throat"` |
| ح | `"throat"` | `"throat"` ✓ |
| ع | `"throat"` | `"throat"` ✓ |
| خ | `"throat"` | `"throat"` ✓ |
| غ | `"throat"` | `"throat"` ✓ |

The "no English equivalent" framing in Guide 6 (which lists pharyngeal ح ع, uvular خ غ ق, and emphatic ص ض ط ظ — that's correct phonology and a different cut from "throat letters") doesn't conflict with this fix; the two classifications coexist.

**Source:** Karin C. Ryding, *A Reference Grammar of Modern Standard Arabic* (Cambridge, 2005), §2.1.5 "Place of articulation"; W. Wright, *A Grammar of the Arabic Language* (3rd ed.), Vol. I §3; tajwīd literature (Sibawayh's classification is preserved unchanged in modern works such as Mishkah Academy "Huruf-e-Halqi" and Baytul Quran's "Throat Letters – Makharij al-Halq").

**Recommendation:** In `guide1.jsx`, swap the `cat` of ا (line 5) from `"throat"` to `"normal"`, and ه (line 30) from `"normal"` to `"throat"`. Optionally rename the filter from `"Throat"` to `"Throat (ḥurūf al-ḥalq)"` to match the technical term learners will see in tajwīd contexts. Note that after the fix, the throat filter will hold 5 letters (ح خ ع غ ه), not the classical 6 — because hamza ء is not a separate row in the 28-letter alphabet array (see E3 for adding a hamza footer note that bridges this gap).

---

### C3. Guide 7 hamza-seat examples violate the rule the guide teaches
**File/lines:** `guide7.jsx:7` — under "On alif (أ / إ) — At the start of a word, or when the surrounding vowel is fatḥa/no vowel", the second example is `إِسلام`.

**What's wrong:** The example `إِسلام` (*islām*) has hamza on alif — but the vowel under it is **kasra**, not fatḥa. The whole point of writing hamza on alif with a kasra under it (إ vs. أ) is precisely that the kasra is the dominant vowel; it's the same hierarchy the guide states two boxes lower in the Insight ("kasra > ḍamma > fatḥa"). So the rule label "fatḥa/no vowel" is wrong for this example — `إِسلام` belongs in a kasra-dominant rule, not a fatḥa rule.

The deeper issue is that the four-rule scheme conflates two separate conditions:
1. **Initial-position hamza** is *always* on an alif seat (أ / إ / آ), and the choice of *fatḥa above* (أَ), *kasra below* (إِ), or *madda* (آ) is purely about which short vowel follows. This is the rule that governs `أَخ` and `إِسلام`.
2. **Medial / final hamza** seat depends on the strongest of the two surrounding vowels — kasra > ḍamma > fatḥa > sukūn — which is what governs `سُؤال` (ḍamma seat → wāw), `سَئِمَ` (kasra seat → yā'), `سَماء` (after long ā → bare hamza on the line), `جُزء` (after sukūn → bare).

These are two different rules; the "On alif" card mixes them.

**What's correct:**
- `أَخ` (akh, "brother") — hamza on alif because it's word-initial; written with fatḥa above because the following vowel is /a/.
- `إِسلام` (islām) — hamza on alif because it's word-initial; written **below the alif** (إ) because the following vowel is /i/.
- `آدم` (Ādam) — hamza-with-madda above alif because /ʔaː/ (alif followed by another long alif); a useful third initial example.

**Source:** Ryding §2.1.4 "Hamza"; Brustad, Al-Batal, Al-Tonsi, *Al-Kitaab Alif Baa* (3rd ed.), §15 "Spelling Rules for hamza"; Wightwick & Gaafar, *Mastering Arabic 1* §2.4.

**Recommendation:** Split the "On alif" card into two: (a) **Initial hamza** — always on alif, choose seat-marking by the following short vowel (fatḥa above = أَ; kasra below = إِ; madda = آ for /ʔaː/ initial); (b) **Medial / final hamza on alif** — when surrounding vowels are fatḥa-dominant. Keep the existing "vowel hierarchy" Insight but move it under the *medial* rule where it actually applies.

---

### C4. Guide 15 — feminine-plural pronoun row is incorrect (label says "they (m)" but value is masculine; also the Palestinian column says "humme (same)" for هُنَّ)
**File/lines:** `guide15.jsx:9` — `{ar:"هُنَّ",tr:"hunna",m:"they (f)",p:"humme (same)"}` is fine for the Palestinian collapse, but **the table is missing the dual pronouns** that MSA distinguishes (أنتما, هما) and the **second-person-feminine plural** (أنتُنَّ, *antunna*).

The bigger issue: the row immediately above says `{ar:"هُم",tr:"hum",m:"they (m)",p:"humme"}` — this is correct. But there is no row for أنتُنَّ (you-pl-f), which means the table has 9 pronouns covering 8 grammatical cells (anā, anta, anti, huwa, hiya, naḥnu, antum, hum, hunna) and is silent on the feminine-second-person plural (`antunna`) and both duals. The Insight on line 20 acknowledges the gap ("MSA has separate dual pronouns (أنتما, هما) and feminine plurals (أنتنّ, هنّ)") — but هُنَّ is in the table and أنتُنَّ is not, asymmetrically.

**What's correct (full MSA personal-pronoun set, 12 cells):**

| Person | Singular | Dual | Plural |
|---|---|---|---|
| 1st | أنا anā | (نحن covers both) | نحن naḥnu |
| 2nd m | أنتَ anta | أنتما antumā | أنتم antum |
| 2nd f | أنتِ anti | أنتما antumā | **أنتُنَّ antunna** |
| 3rd m | هو huwa | هما humā | هم hum |
| 3rd f | هي hiya | هما humā | هنّ hunna |

**Source:** Ryding §11.1 "Personal pronouns"; Al-Kitaab Part 1 §1; Wightwick & Gaafar §3.

**Recommendation:** Add the missing rows (أنتُنَّ for 2nd-pl-f; antumā / humā for duals). If the design goal is "MSA simplified to what speakers use," at minimum keep both feminine-plural rows symmetric (both 2nd and 3rd) and put the duals under an ExpandSection labeled "Dual pronouns (formal MSA only)." This also fixes the asymmetry where Guide 13 ("The Dual Form") promises duals exist but Guide 15 hides them.

---

### C5. Guides 18 & 19 — past- and present-tense conjugation tables are missing 5 of 13 MSA forms (feminine plural, masculine dual, feminine dual)
**File/lines:** `guide18.jsx:6–11` (past tense, 8 rows); `guide19.jsx:7–12` (present tense, 8 rows).

**What's wrong:** A complete MSA conjugation has **13 distinct person-number-gender forms** (singular 1/2m/2f/3m/3f, dual 2/3m/3f, plural 1/2m/2f/3m/3f). The guides show only 8: 1s, 2ms, 2fs, 3ms, 3fs, 1p, 2mp, 3mp. They omit:

| Missing form | Past (kataba) | Present (yaktubu) |
|---|---|---|
| 2nd dual (m+f) | كَتَبْتُما katabtumā | تَكْتُبانِ taktubāni |
| 3rd dual m | كَتَبا katabā | يَكْتُبانِ yaktubāni |
| 3rd dual f | كَتَبَتا katabatā | تَكْتُبانِ taktubāni |
| 2nd plural f | كَتَبْتُنَّ katabtunna | تَكْتُبْنَ taktubna |
| 3rd plural f | كَتَبْنَ katabna | يَكْتُبْنَ yaktubna |

This is a deliberate simplification choice (Al-Kitaab and many beginner texts also show 8) — but Guide 13 "The Dual Form" explicitly teaches `كَتَبا` (line 7), and Guide 22 "Irregular Verbs" assumes all 13 forms exist. The collection is internally inconsistent: it teaches duals as "always required for exactly 2" (Guide 13:6) and feminine-plural agreement (Guide 10:47) but then never shows those rows in the conjugation tables.

**Source:** Ryding §21 "Verb tenses"; Al-Kitaab Part 1, lessons 7–9; Wightwick & Gaafar §10 "Verbs in the past" (lists all 13).

**Recommendation:** Either (a) add the missing 5 rows under an ExpandSection "Full MSA paradigm: dual + feminine-plural" in Guides 18 and 19, or (b) add a one-line note above each table: "Showing the 8 most common forms; MSA has 5 additional forms (duals, feminine plurals) — see *Al-Kitaab* lesson 7 for the full paradigm." Option (a) is preferable for a reference guide, since the user-promised "complete MSA paradigm" is implied by the iconography (✏ Verbs category, "Past Tense" title with no qualifier).

---

### C6. Guide 4 — the form-position labels for مَدرَسة are wrong
**File/lines:** `guide4.jsx:10` — `{word:"مَدرَسة",trans:"madrasa",meaning:"school",letters:["مـ","ـد","ر","سـ","ـة"],pos:["initial","(breaks)","(breaks)","initial","final tā' marbūṭa"]}`.

**What's wrong:** The `pos` (form-position) labels `"(breaks)"` are not standard form-position terms and are pedagogically misleading — they describe what the *previous* letter does, not the position of the current letter. The standard form positions are **isolated / initial / medial / final** (the same labels Guide 1 uses correctly).

For مَدرَسة, the actual form positions are:
- مـ — **initial** (first letter of the word, connects right) ✓
- ـد — **final** (after م; د takes the final form because it follows a connecting letter; د itself does not connect forward, which forces the *next* letter into isolated/initial)
- ر — **isolated** (because د didn't connect to it; ر also does not connect forward)
- سـ — **initial** (after the break caused by ر; س starts a new connected sub-word) ✓
- ـة — **final tā' marbūṭa** ✓

So `pos[1]` should be `"final"`, not `"(breaks)"`, and `pos[2]` should be `"isolated"`, not `"(breaks)"`. (The note "د and ر don't connect forward" is correct — but that note belongs as commentary, not as a position label.)

The same issue affects `wordExamples[1]` (`دَرَسَ`, line 8): د ر س are labeled as `["isolated*","isolated*","isolated"]` with the asterisk explained in a `note`. Since the asterisk version is right (د and ر *are* isolated because nothing precedes them; س *is* isolated because it follows ر which breaks), this row is technically correct — but inconsistent with the مَدرَسة row's labeling.

**Source:** Brustad, Al-Batal, Al-Tonsi, *Al-Kitaab Alif Baa* (3rd ed.), Unit 1, "Letter shapes and connectors"; Wightwick & Gaafar, *Mastering Arabic 1*, p. 7 "Joining letters."

**Recommendation:** Replace `"(breaks)"` with the actual form-position term (`"final"` for ـد, `"isolated"` for ر), and move the "د and ر don't connect forward" explanation into a structured `note` field. This makes Guide 4's labeling consistent with Guide 1's `iso/ini/med/fin` conventions, so a learner cross-referencing the alphabet sees the same vocabulary.

---

### C7. Guide 21 — Form X gloss "Seeking / considering" is misleading; the example etymology is folk-etymology, not Hans Wehr
**File/lines:** `guide21.jsx:14` — `{n:"X",pat:"اِستَفعَلَ / يَستَفعِلُ",meaning:"Seeking / considering",ex:"اِستَخدَمَ = he used (sought service)"}`.

**What's wrong:** Two issues:

1. **Gloss is too narrow.** Form X (*istafʿala*) in MSA productively means "to seek X," "to consider/regard as X," or "to come to do X" — but in modern usage it's most often just a derived transitive (e.g. اِستَعمَلَ / اِستَخدَمَ "to use," اِستَلَمَ "to receive," اِستَطاعَ "to be able to," اِستَمَرَّ "to continue"). Wright (§122) gives "to ask for, demand, seek for himself; to deem, consider; to come to be" — three senses. Hans Wehr just lists Form X verbs as primary entries with their actual meanings; he doesn't gloss the form generically.

2. **Folk-etymology in parentheses.** "اِستَخدَمَ = he used (sought service)" implies the form was derived from خ-د-م "service" via the X pattern's "seeking" sense. That's a plausible lay analysis, but the lexicalized meaning in MSA is just "to use, employ, utilize" (Hans Wehr p. 269). The "(sought service)" gloss is the kind of thing that aging language guides include and then date themselves; better to drop it and let the form's productive uses (Wright's three senses) stand on their own.

**What's correct:** Form X meaning is "to seek/request X-ing, to consider as X-ing, or to come to be in an X state" — productive senses, not "seeking" alone. Examples that are more representative of modern usage:
- اِستَخدَمَ "to use" (lexicalized; etymology debated but modern meaning is just "use")
- اِستَطاعَ "to be able" (the productive "come-to-be" sense)
- اِستَفسَرَ "to inquire" (the productive "seek X" sense — from فَسَرَ "to explain" → "to seek explanation")

**Source:** Wright Vol. I §122; Hans Wehr (Cowan ed., 4th ed.) entries for forms beginning ist-; Ryding §35 "Augmented triliteral verbs."

**Recommendation:** Change `meaning` to `"Seek / consider / come to be"` and replace the example with `اِستَفسَرَ = he inquired (sought explanation)` — that's a clearer fit for the productive sense. Keep اِستَخدَمَ in a separate row only if you label it "lexicalized: to use" without the etymological claim.

Note: the **Form IX** entry (`اِحمَرَّ = it turned red`, "Colors & defects") is **correct** — Wright §117 confirms IX is reserved for colors and bodily defects. Verified.

---

## Verified correct (no fix needed)

These are claims I checked and confirmed; flagging so the author doesn't second-guess:

- **Guide 1** — 28-letter alphabet count, order, and isolated/initial/medial/final shapes all match Unicode (the Arabic block U+0627–U+064A) and the standard alphabetic order. The 6 non-connecting letters (ا د ذ ر ز و) listed as `connect:false` is correct (Wright Vol. I §3).
- **Guide 2** — short-vowel and tanwīn diacritics correctly use Unicode combining marks: fatḥa U+064E, kasra U+0650, ḍamma U+064F, sukūn U+0652, shadda U+0651, fatḥatān U+064B, kasratān U+064D, ḍammatān U+064C. All renderings in the data array are correctly composed.
- **Guide 3** — sun-letter list (14 letters: ت ث د ذ ر ز س ش ص ض ط ظ ل ن) and moon-letter list (14 letters: ا ب ج ح خ ع غ ف ق ك م ه و ي) match every standard MSA reference. The assimilation example الشَّمس → ash-shams and القَمَر → al-qamar with shadda in the sun-letter version is correct.
- **Guide 6** — pharyngeal ح ع, uvular خ غ ق, and emphatic ص ض ط ظ groupings are correct phonology (Ryding §2.1).
- **Guide 8** — tā' marbūṭa pronunciation rules (final /a/ in pause, /at/ in iḍāfa or before continuing speech) match Ryding §1.4.2 and Wightwick & Gaafar §6.
- **Guide 9** — *al-* + sun letter assimilation rule, no *al-* on the first noun of an iḍāfa, both definite/indefinite contrasts. All correct.
- **Guide 10** — non-human plurals taking feminine-singular agreement is the *jamʿ ghayr ʿāqil* rule, correct (Ryding §6.1.3). The list of feminine-without-tā'-marbūṭa words (أمّ، أخت، شمس، أرض، نار) is canonical.
- **Guide 11** — iḍāfa rules (no al- or tanwīn on muḍāf, last term carries definiteness, adjectives follow the whole chain) are correctly stated (Ryding §8 "The construct phrase").
- **Guide 12** — sound-masculine -ūn/-īn, sound-feminine -āt, and the warning that broken plurals must be memorized are all standard. The Insight that non-human plurals take feminine-singular agreement is consistent with Guide 10. ✓
- **Guide 13** — dual endings -ān (nominative) / -ayn (accusative-genitive), tā' marbūṭa opening to plain tā' before the dual ending (مدرسة → مدرستان), and the strict-not-optional nature of the dual all correct. Verified against Ryding §7.
- **Guide 14** — the three-case system (mar fūʿ ◌ُ ◌ٌ / man ṣūb ◌َ ◌ً / maj rūr ◌ِ ◌ٍ), the diptote class (*mamnūʿ min al-ṣarf*) taking fatḥa for genitive, the absence of i'rāb in dialects — all correct (Ryding §7.1, §7.4).
- **Guide 16** — attached-pronoun suffix chart and the dual function (possessive on nouns/preps; object on verbs) is canonical.
- **Guide 19** — three moods of the present (indicative *yaktubu*, subjunctive *yaktuba* after أن، لن، كي، لِ, jussive *yaktub* after لم and prohibitive لا) are correctly stated. Verified against Ryding §21.
- **Guide 20** — imperative formed from the jussive, hamzat al-waṣl prosthetic, gendered/numbered endings (-ī fs, -ū mp), negative imperative with لا + jussive — all correct.
- **Guide 22** — the four irregular-verb categories (hollow, doubled, hamzated, weak-final) are the standard four (Ryding §27); examples chosen are textbook-canonical.
- **Guide 23** — Form I-X masdar / active-participle / passive-participle patterns are correct. The pattern recognition heuristics ("see مُـ at start → likely a participle of forms II-X"; "ـاعِل → active participle Form I"; "مَفعول → passive participle Form I") are accurate and pedagogically clean.
- **Guide 24** — nominal vs. verbal sentence distinction, no copula in present, VSO verb-stays-singular agreement rule are all canonical.
- **Guide 25** — six-way negation (mā for past, lā for present, lam for jussive-past, lan for subjunctive-future, laysa for nominal, plus the dialect mā…sh / mish frame) is correct. Verified.
- **Guide 26** — question particles (هل، أ for yes/no; man, mā/mādhā, ayna, matā, kayfa, limādhā, kam) all standard.
- **Guide 27** — the eight common prepositions (في، على، من، إلى، عن، بِـ، لِـ، مع) and their genitive case-government are correct. The "ʿinda + pronoun = to have" Palestinian rule is correctly framed as dialect.
- **Guide 30** — root-and-pattern morphology and the five sample roots (k-t-b, d-r-s, ʿ-l-m, k-b-r, ḥ-b-b) with their derivative families are accurate. The k-t-b family in particular is the textbook-canonical demonstration root.

---

## Minor accuracy issues (should fix, low priority)

### M1. Guide 1 — IPA descriptor for ر "trilled" overstates the MSA realization
**File/line:** `guide1.jsx:14` — `r ipa:"/r/ (trilled)"`.

In careful MSA, ر is a voiced alveolar trill `[r]`, but in conversational MSA and most dialects it's typically a tap `[ɾ]` (with the trill realization reserved for emphasis or word-initial gemination). "Trilled" is fine as a learner approximation; consider "tapped/trilled" for accuracy.

**Source:** Ryding §2.1.5; Watson, *The Phonology and Morphology of Arabic* (Oxford 2002), §2.

### M2. Guide 1 — IPA for ج says `/dʒ/ (like 'judge')` and lists Palestinian as `/ʒ/`
**File/line:** `guide1.jsx:9`.

Both are correct; the broader picture is that MSA admits both `[dʒ]` (Levantine, Gulf, Iraqi MSA pronunciation) and `[ɡ]` (Egyptian MSA, common in news broadcasts). Egypt (~100M speakers) uses `[ɡ]` for ج even when reading MSA. Worth one extra line: "Egyptian MSA pronounces this as /ɡ/."

**Source:** Ryding §1.3.

### M3. Guide 1 — `tr:"'"` for ع clashes with the system once C1 is fixed
**File/line:** `guide1.jsx:22` — `tr:"'"`.

After C1, this becomes `tr:"ʿ"`. Same applies to the Insights/notes that show "(qāla, 'he said')" with hamza-flavored apostrophes (e.g. `guide6.jsx:45`). Those are typographic apostrophes (curly), not the half-ring; they should be left as quotation marks (since they're enclosing prose) and only the *transliterated phonemes* should switch to half-rings.

### M4. Guide 1 — `connect: false` on alif applies "to the following letter" but the data implies the alif is non-connecting *as a whole*
The shapes ا (iso), ا (ini), ـا (med), ـا (fin) are correct: alif doesn't connect to the *left* (next letter), but it *does* connect to the right (previous letter). The convention "non-connecting" in the legend says exactly that ("This letter does NOT connect to the following letter") — accurate. Just a sanity check; no change needed. ✓

### M5. Guide 2 — Sukūn rendering on isolated bā' looks wrong in some fonts
**File/line:** `guide2.jsx:10` — `{name:"Sukūn",ar:"بْ",mark:"ْ",...}`.

The combination ب + U+0652 renders as بْ. This is correct Unicode but renders poorly in some fonts (the sukūn can clip). On `Noto Sans Arabic` and `Amiri` (the fonts used here) it's fine; just be aware that on `Scheherazade New` it's also fine but on default macOS `.SF Arabic` it can vertically misplace. Low priority.

### M6. Guide 3 — Insight "if your tongue stays behind your teeth for both" is a useful mnemonic but oversimplifies
**File/line:** `guide3.jsx:40`.

True for most sun letters (alveolar/dental: ت ث د ذ س ز ص ض ط ظ ن ل) — but ر and ش are also sun letters and their articulation isn't strictly "behind the teeth" (ر is alveolar tap; ش is post-alveolar). The mnemonic is roughly right and learners will benefit from it; consider hedging "for *most* sun letters."

### M7. Guide 7 — "kasra > ḍamma > fatḥa" hierarchy is correct, but applies to *medial/final* hamza only
**File/line:** `guide7.jsx:23` (Insight). See C3.

The hierarchy is indispensable for medial/final hamza and the Insight is correct in that scope. After C3 splits initial vs. medial/final into separate cards, this Insight should sit under the medial/final card.

### M8. Guide 7 — The "On the line (ء)" rule is incomplete
**File/line:** `guide7.jsx:10` — "After a long vowel or sukūn, or at the end of a word after a vowel."

The actual rule for bare hamza on the line: (a) at end of a word after a long vowel (سَماء, جاء), (b) at end of a word after a sukūn-bearing consonant (جُزء, دِفء). The simple rule the guide gives is workable for beginners; just consider strengthening "or at the end of a word after a vowel" to "or at the end of a word after a *long* vowel or consonant" to avoid implying short-vowel-then-bare-hamza.

**Source:** Ryding §2.1.4; Brustad et al., *Al-Kitaab Alif Baa* §15.

### M9. Guide 9 — Indefinite is marked by "tanwīn" — but the predicate is broader
**File/line:** `guide9.jsx:8`.

"Indefiniteness is marked by tanwīn" is true in fully vocalized MSA. In unvocalized MSA (the default in modern publications), indefiniteness is marked by *the absence of al-*, not by a visible diacritic. Consider one extra line: "In unvocalized text, the absence of al- is the only indefiniteness signal."

### M10. Guide 11 — "Three noun states in Arabic" is a slight oversimplification
**File/line:** `guide11.jsx:3`.

"Definite" and "indefinite" are *states* (ḥālatān: مُعَرَّف vs. مُنَكَّر). "Iḍāfa" is a *syntactic construction* in which a noun is in the construct state (مُضاف) — which makes it implicitly definite (or implicitly indefinite, depending on the second term). So really there are 2 states (definite, indefinite) crossed with 2 forms (free, construct) — not 3 parallel states. The guide's framing is workable but worth tightening to "Three syntactic situations" rather than "Three noun states."

**Source:** Ryding §8.1.

### M11. Guide 12 — Pattern names use mixed conventions
**File/line:** `guide12.jsx:14`.

`CuCuC: كتاب→كُتُب · CuCūC: بيت→بُيوت · aCCāC: ولد→أولاد · CiCāC: رجل→رِجال · CuCaCā': وزير→وُزَراء`.

The "CCC" notation is a phonological convention (consonant slots). The Arabic convention uses فُعُل، فُعول، أَفعال، فِعال، فُعَلاء. Either is fine for a learner, but mixing them ("CuCuC" alongside the Arabic patterns elsewhere) is inconsistent. Pick one — the Arabic فعل-based form is more durable since it appears in every dictionary.

### M12. Guide 14 — Diptote definition is partial
**File/line:** `guide14.jsx:13` — "Foreign names, broken plural patterns (مَساجِد), colors/defects."

The diptote class (*mamnūʿ min al-ṣarf*) is broader: it also includes (a) feminine proper names, (b) words ending in *-ān*, (c) the elative pattern *afʿal*, (d) words on the *fuʿalāʾ*, *afʿilāʾ* patterns, (e) plurals on *mafāʿil/mafāʿīl* patterns. The guide lists three correct categories; consider adding "and several morphological patterns (afʿal, fuʿalāʾ, mafāʿil…)" so a learner doesn't miss أَكبَر or فُقَراء.

**Source:** Ryding §7.4; Wright Vol. I §52.

### M13. Guide 16 — `(-ī/nī)` in suffix chart conflates two attached-pronoun forms
**File/line:** `guide16.jsx:7`.

The suffix `-ī` (my) attaches to nouns and prepositions; `-nī` (me) attaches to verbs. They're two suffixes for the same first-person referent, distributed by host. Listing them as "ي (-ī/nī) me/my" is correct but compressed. A clearer rendering: "ي  on nouns: -ī (my); on verbs: -nī (me)" — matches the explanatory bullets above the chart.

### M14. Guide 17 — Feminine-plural relative اللواتي is acceptable but not the most common form
**File/line:** `guide17.jsx:6`.

MSA admits three feminine-plural relative pronouns: اللاتي *al-lātī*, اللواتي *al-lawātī*, اللائي *al-lāʾī*. The Quranic and most-frequent form is اللاتي. Either listing اللاتي as primary with اللواتي / اللائي as variants, or noting "(also اللاتي / اللائي)" would be more conventional. The guide chose اللواتي without acknowledging the alternatives.

**Source:** Ryding §11.4 "Relative pronouns"; ProZ KudoZ "اللائي - اللاتي - اللواتي" thread (linguistics consensus matches Ryding).

### M15. Guide 17 — Dual relative pronouns are missing
**File/line:** `guide17.jsx:6`.

MSA distinguishes dual relative pronouns parallel to the singular/plural set:
- masculine dual: اللذانِ (nominative) / اللذَيْنِ (accusative-genitive) *alladhāni / alladhayni* "the two who (m)"
- feminine dual: اللتانِ (nominative) / اللتَيْنِ (accusative-genitive) *allatāni / allatayni* "the two who (f)"

This is the same gap C4 flagged for personal pronouns: the collection teaches duals as obligatory in Guide 13 but then omits them from the relative-pronoun and personal-pronoun tables. Add a row or an ExpandSection with the dual relatives.

**Source:** Ryding §11.4; Wright Vol. I §347.

### M16. Guide 21 — Form II/V semantic relation is "intensive/causative + reflexive" not strictly "reflexive of II"
**File/line:** `guide21.jsx:9` — Form V described as "Reflexive of II."

True for many verbs (عَلَّمَ → تَعَلَّمَ "to learn = teach oneself"), but Form V also has *gradual development / process* meaning (تَكَوَّنَ "to be formed gradually," تَطَوَّرَ "to develop"). "Reflexive of II" is the most teachable gloss for beginners, just slightly narrow.

**Source:** Wright Vol. I §117 §V; Ryding §35.5.

### M17. Guide 28 — "13-19: same reverse rule + counted noun is singular accusative indefinite" is *partly* right
**File/line:** `guide28.jsx:6`.

For 13–19, the construction is `unit + ʿasharah/ʿashar + counted-noun-singular-accusative-indefinite`. The **unit** part still uses gender reversal (e.g. ثلاثةَ عَشَرَ كتابًا "13 books," with feminine ثلاثة on a masculine noun). But the **tens** part (عَشَرَ for masculine, عَشْرَةَ for feminine) **agrees** with the noun's gender — *not* reverses. So the rule is "unit reverses, tens agrees" for 13–19, not "same reverse rule" applied to both.

For 11 and 12, both elements agree directly (no reversal) — the guide is correct on that.

**What's correct:** ثلاثةَ عَشَرَ كتابًا (13 books, m) — ثلاثة feminine (reverses), عَشَرَ masculine (agrees with masc كتاب). ثلاثَ عَشْرَةَ مدرسةً (13 schools, f) — ثلاث masculine (reverses), عَشْرَةَ feminine (agrees with fem مدرسة).

**Source:** Ryding §13.4 "Cardinal numbers 13–19"; Al-Kitaab Part 1, lesson 13.

**Recommendation:** Reword to "13–19: **unit reverses gender as in 3–10; tens agrees with noun gender**; counted noun is singular accusative indefinite."

### M18. Guide 29 — "Egyptian — most widely understood (media influence)" is a softening claim
**File/line:** `guide29.jsx:9`.

Historically true (mid-20th-century Egyptian cinema/TV dominance). In 2025, satellite TV and streaming have shifted the landscape: Levantine (Lebanese-Syrian-Palestinian) drama and Khaleeji (Gulf) media are widely consumed across the Arab world; younger speakers often understand Levantine and Gulf better than older speakers do. The "most widely understood" claim is durable but increasingly contested. Consider hedging: "Egyptian — historically the most widely understood across the Arab world due to its film and TV industry, though Levantine and Gulf media have grown in reach."

**Source:** Bassiouney, *Arabic Sociolinguistics* (Edinburgh, 2009); the broader landscape is dynamic and any specific claim ages.

---

## Effectiveness improvements

### E1. Fix C1 first; it's the single highest-impact change
After the ʿayn/hamza split (C1), every existing guide reads more like a real Arabic textbook and less like a romanization shortcut. The change is mechanical and improves coherence everywhere.

### E2. Guide 1 — add the *ḥurūf al-ḥalq* filter alongside the existing throat/emphatic split
After fixing C2, consider exposing the canonical 6-throat-letter group as a filter button labeled "Throat (ḥurūf al-ḥalq)." This anchors a learner's mental model to the term they'll encounter in tajwīd materials.

### E3. Guide 1 — the alphabet array doesn't include hamza (ء) as a letter
This is a defensible choice (the standard 28 letters omit ء as a "diacritic" rather than a letter), but it contributes to the C1 confusion. Add an ExpandSection or small footer card: "Hamza (ء) is treated as a *mark*, not a letter — but it's a full phoneme. See Guide 7 for placement rules." This bridges Guide 1 → Guide 7.

### E4. Guides 2 & 14 — link the diacritics to the case system
Guide 2 introduces fatḥa/kasra/ḍamma/tanwīn as "short vowels" and Guide 14 introduces them as case markers. A learner who reads Guide 2 first wonders why these "short vowel marks" sometimes mean "nominative" — because of course the vowel and the case marker are the same character. Add a one-line bridge in Guide 2: "These same marks also signal grammatical case — see Guide 14."

### E5. Guide 7 — after fixing C3, add a fifth card "Madda (آ)"
Initial /ʔaː/ is written with madda (hamza+alif merged: آ U+0622), e.g. آدم Ādam, آلة āla. This is a very common pattern that the four-card scheme currently omits.

### E6. Guides 18, 19, 20 — add audio per row
Each row in the past/present/imperative tables is a strong candidate for `speakArabic(c.f)` on click. Currently only Guide 1 hooks letters to speech. Conjugation tables benefit hugely from audio because the prosody/stress is crucial.

### E7. Guide 21 — Form II/III/V/VI semantic templates are fine; consider adding *productivity* indicators
A column "Frequency" or color-coded productivity (II ★★★★★, X ★★★★★, III ★★★, IX ★★) helps learners prioritize. Wright (§115–123) and Ryding (§35) both discuss productivity — Forms II, V, VII, VIII, X are productive in modern usage; III, IV, VI, IX are less so.

### E8. Guide 22 — the four irregular categories are correct but the guide doesn't show *how the irregularity surfaces*
Hollow verb قال has past قال / قُلتُ (the alif disappears in 1st-person). Doubled رَدَّ has past رَدَّ but رَدَدتُ (the gemination breaks). Without showing the "transformation," a learner can't predict which form they'll encounter. Add a 3-row mini-paradigm under each category showing 3rd-singular, 1st-singular, and a present form — so the alternation is visible.

### E9. Guide 24 — nominal-sentence example "no copula in present" is great; add the past
Add: "In past tense, use *kāna* (كانَ) as copula: الكتابُ كانَ كبيرًا 'the book was big.' كان is the only verb that takes its predicate in the *accusative* (a hallmark of *kāna* and her sisters)."

**Source:** Ryding §22.4 "Kāna and her sisters."

### E10. Guide 27 — add prepositions that contract / merge with definite article
Some prepositions merge orthographically with al-: لِ + الكتاب = لِلكتاب (li-l-kitāb, not lī al-kitāb). Worth one more bullet.

### E11. Guide 28 — the gender-reversal rule is the trickiest beginner topic; add a quiz
The DoF/quiz template (`QuizSection`) would fit this guide well: present a number + noun pair, ask the learner to pick the right form. ("4 cars" → أربع سيارات; "4 books" → أربعة كتب.) Actively practiced beats passively read.

### E12. Guide 30 — root system is well-illustrated; add a "find the root" interactive
Given a derived word (مُعَلِّم, كاتِب, مَكتوب), have the user identify the 3-letter root. This is the productive skill the guide is teaching but doesn't drill.

### E13. Across all guides — consistent dialect column header
The Palestinian column's "🇵🇸" emoji is great branding, but the guides alternate between calling it "Palestinian," "Levantine," "Palestinian Arabic," and "in Palestinian." Pick one phrase ("Palestinian Arabic" or just "Palestinian") and use it consistently in headers, mid-text, and PalNote prose. The phrase appears 30+ times across the collection.

---

## Coverage gaps

These are MSA topics that are referenced but not fully addressed, in priority order:

### CG1. Adjective–noun agreement (one of the most common Arabic surprises)
Mentioned in passing in Guide 10 ("non-human plurals take feminine-singular agreement") and Guide 11 ("Adjectives go AFTER the whole iḍāfa"). Never given its own guide. The full rule has 4 dimensions (gender, number, definiteness, case) and is *the* daily-use rule that beginners stumble on. Strong candidate for a dedicated guide; would replace one of the more compressed dialect-and-MSA guides.

### CG2. Comparatives and superlatives (أفعل التفضيل)
The elative pattern *afʿal* is mentioned implicitly (أَكبَر appears in Guide 30:11) but never explained as the comparative/superlative formation. كَبير → أَكبَر "bigger/biggest"; جَميل → أَجمَل. This is high-frequency vocabulary that the collection should cover.

**Source:** Ryding §10 "Comparative and superlative."

### CG3. Conjunctions (و، فَ، ثُمَّ، لكن، أو، أم، لأنّ)
Guide 24 uses و and فَ implicitly but never lists them. Connectors are essential for sentence-level reading and they have specific rules (fa- = "and so"; thumma = "and then"; ammā…fa = "as for…X").

### CG4. Inna and her sisters (إنّ، أنّ، لكنّ، كأنّ، ليتَ، لعلّ)
Guide 14 mentions "after إنّ and sisters" as a context for the accusative. The sisters themselves are never listed and their semantic effects (إنّ = emphatic; أنّ = "that" in indirect speech; لكنّ = "but"; كأنّ = "as if") are absent.

**Source:** Ryding §22.5 "Inna and her sisters."

### CG5. Negation of nominal sentences and laysa conjugation
Guide 25 introduces *laysa* but doesn't show its conjugation. *Laysa* conjugates like a past-tense verb but means present-negative — لستُ، لسنا، ليسَ، ليست. Worth a 6-row mini-table.

### CG6. Time expressions and dates
Days, months, "yesterday/tomorrow," reading clock time. Practical-category material, not present.

### CG7. Numbers 100+ and ordinals
Guide 28 stops at "مئة 100, ألف 1000." Hundreds/thousands compounds (مئتان، ثلاثمئة، خمسة آلاف) and ordinals (أوّل، ثاني، ثالث) are missing. Daily-use vocabulary.

### CG8. Passive voice (المبني للمجهول)
Voice is mentioned only in a brief participle reference in Guide 23. The passive-voice construction (كُتِبَ "was written" — internal vowel change to فُعِلَ) is a frequent feature of news-Arabic and academic-Arabic and is core MSA.

**Source:** Ryding §38 "Passive voice."

---

## Per-guide notes (only where issues exist)

### Guide 1 — The Arabic Alphabet
- Throat/normal classification of ا and ه is inverted (C2).
- ʿayn rendering uses single `'` — needs `ʿ` (C1).
- ر "trilled" is fine but tap is more common (M1).
- ج "judge" Levantine; mention Egyptian /g/ (M2).
- Hamza (ء) is missing as a letter row — defensible but worth a footer note pointing to Guide 7 (E3).

### Guide 2 — Short Vowels & Diacritics
- Sukūn rendering may clip in some fonts — verify in target browsers (M5).
- Add a one-line bridge to Guide 14 noting these marks double as case markers (E4).

### Guide 3 — Sun & Moon Letters
- "Tongue stays behind teeth" mnemonic works for most but not all sun letters (ر، ش are exceptions) (M6).

### Guide 4 — Connected Writing
- Form-position labels for مَدرَسة use `(breaks)` instead of standard isolated/initial/medial/final (C6).

### Guide 6 — Emphatic & Throat Sounds
- ʿayn rendering uses single `'` (C1).

### Guide 7 — Hamza Rules
- Initial-position vs. medial/final-position rules are conflated; إِسلام example is in the wrong card (C3).
- "On the line" rule statement is incomplete (M8).
- Add Madda (آ) as a fifth case (E5).

### Guide 8 — Tā' Marbūṭa & Alif Maqṣūra
- Both letter explanations correct. ✓

### Guide 9 — The Definite Article al-
- Indefiniteness-marked-by-tanwīn is true only in vocalized text (M9).

### Guide 10 — Gender
- Correct. ✓

### Guide 11 — Noun States & Iḍāfa
- "Three noun states" framing is slightly oversimplified — really 2 states × 2 forms (M10).

### Guide 12 — Plurals: Sound & Broken
- Pattern notation mixes Latin (CuCuC) and Arabic (فُعُل) — pick one (M11).

### Guide 13 — The Dual Form
- Correct, but Guide 15 doesn't show the dual pronouns this guide promises exist (asymmetry — see C4).

### Guide 14 — Case Endings
- Diptote class definition is partial — add the morphological patterns (M12).

### Guide 15 — Personal Pronouns
- Missing أنتُنَّ (2nd-pl-f) row; missing dual rows (C4). The Insight acknowledges the gap but doesn't resolve it.

### Guide 16 — Attached Pronouns
- `(-ī/nī)` shorthand could be split for clarity (M13).

### Guide 17 — Demonstratives & Relatives
- اللواتي is acceptable but اللاتي is the more common Quranic form (M14).
- Dual relative pronouns (اللذانِ / اللتانِ) are missing (M15) — same gap pattern as Guide 15 personal pronouns.
- Hamzas in `hā'ulā'i` and `ulā'ika` use single `'` — should be `ʾ` (C1).

### Guide 18 — Past Tense
- Only 8 of 13 conjugation forms shown (C5).

### Guide 19 — Present Tense & Moods
- Only 8 of 13 conjugation forms shown (C5).
- Three-mood explanation is correct. ✓

### Guide 20 — Imperative
- Correct. ✓

### Guide 21 — Verb Forms II–X
- Form X gloss "Seeking / considering" is too narrow; etymology in اِستَخدَمَ example is folk-etymology (C7).
- Form V "reflexive of II" is correct but slightly narrow (M16).
- Consider adding productivity/frequency indicators (E7).

### Guide 22 — Irregular Verbs
- Categories correct; consider showing the actual transformation (E8).

### Guide 23 — Verbal Nouns & Participles
- Correct and well-organized. ✓

### Guide 24 — Sentence Types
- No-copula-in-present rule correct; add كان for past (E9).

### Guide 25 — Negation
- All six particles correct. ✓ Add *laysa* conjugation (CG5).

### Guide 26 — Questions
- Correct. ✓

### Guide 27 — Prepositions
- Correct. ✓ Add merging with al- (E10).

### Guide 28 — Numbers & Counting
- 13–19 rule statement is partial — units reverse, tens *agree* (M17).

### Guide 29 — MSA vs Dialect
- "Egyptian most widely understood" claim should be hedged (M18).

### Guide 30 — Root System
- Excellent guide. ✓

---

## Speech configuration note

`src/utils/speech.js:16` — `speakArabic` uses generic `'ar'` lang code. This is reasonable for a multi-dialect collection (the browser/OS picks its default Arabic voice — typically Saudi or generic MSA) but means:
- Palestinian transliterations in the data (e.g. *iḥna*, *humme*, *baktub*) **will not render** — the voice will pronounce the MSA written form, not the dialect form.
- For consistency with the educational claim "we teach MSA + Palestinian," consider adding a future `speakArabicPal` that explicitly requests `ar-LB` or `ar-EG` (closest available Levantine voices on most platforms) and falling back to `ar` if none.

This is an enhancement, not a bug — flagging since the task asked.

---

## Sources cited

### Standard MSA references
- **Karin C. Ryding**, *A Reference Grammar of Modern Standard Arabic*, Cambridge University Press, 2005. Sections cited: §1.3 (consonants), §1.4.2 (tā' marbūṭa), §2.1 (phonology and articulation), §2.1.4 (hamza), §2.1.5 (place of articulation), §6.1.3 (non-human plural agreement), §7 (case and dual), §7.4 (diptotes), §8 (iḍāfa / construct), §10 (comparative/superlative), §11 (pronouns), §13 (numerals), §21 (verb tenses and moods), §22 (kāna/inna sisters), §27 (irregular verbs), §35 (augmented triliteral verbs), §38 (passive voice).
- **W. Wright**, *A Grammar of the Arabic Language*, 3rd edition, Cambridge University Press, 1896 (still authoritative). Vol. I §3 (alphabet), §52 (diptotes), §115–123 (verb forms II–X).
- **Hans Wehr** (Cowan ed., 4th edition, 1979), *A Dictionary of Modern Written Arabic* — for lexical / etymological claims about specific verbs (e.g. اِستَخدَمَ).
- **Brustad, Al-Batal, Al-Tonsi**, *Al-Kitaab Alif Baa* (3rd edition, Georgetown University Press) — Unit 1 (letter shapes/connectors), §15 (hamza spelling rules).
- **Brustad, Al-Batal, Al-Tonsi**, *Al-Kitaab fī Taʿallum al-ʿArabiyya, Part 1* (3rd edition) — lesson 7 (full conjugation paradigm), lesson 13 (numbers 11–19).
- **Wightwick & Gaafar**, *Mastering Arabic 1*, Palgrave Macmillan — §2.4 (hamza), §3 (pronouns), §6 (tā' marbūṭa), §10 (verbs in past).
- **Janet Watson**, *The Phonology and Morphology of Arabic*, Oxford University Press, 2002 — §2 (consonant phonetics, including ر realization).

### Romanization standards
- **ALA-LC Arabic Romanization Table**, Library of Congress, 2012 (current), https://www.loc.gov/catdir/cpso/romanization/arabic.pdf — confirms `ʿ` U+02BF for ع and `ʾ` U+02BE for ء.
- **DIN 31635:2011** — Information and documentation — Romanization of the Arabic alphabet — same convention.
- Wikipedia, "Romanization of Arabic" — https://en.wikipedia.org/wiki/Romanization_of_Arabic
- Andreas Hallberg, "The typography of ʿ and ʾ" — http://andreasmhallberg.github.io/typographyofaynandhamza/ (catalogs the half-ring glyphs and warns against the ASCII apostrophe collapse).

### Unicode
- **Unicode Standard, Arabic block** (U+0600–U+06FF), https://www.unicode.org/charts/PDF/U0600.pdf — Arabic letters, harakat, hamza forms.
- **Modifier Letters block** (U+02B0–U+02FF), https://www.unicode.org/charts/PDF/U0250.pdf — `ʾ` (U+02BE) and `ʿ` (U+02BF).
- **Arabic Presentation Forms-A** (U+FB50–U+FDFF), https://www.unicode.org/charts/PDF/UFB50.pdf — initial/medial/final/isolated form encodings (used at rendering time, not in data).

### Phonology / classical sources
- **Sibawayh**, *al-Kitāb*, on articulation points (16 points; ḥurūf al-ḥalq classification preserved in modern tajwīd).
- Mishkah Academy, "Huruf-e-Halqi (Throat Letters)" — https://mishkahacademy.com/huruf-e-halqi/
- Baytul Quran, "Understanding the Throat Letters – Makharij al-Halq" — https://baytulquran.com/tajweed-throat-letters-huruf-al-halq/
- Shaykhi Academy, "The 6 Throat Letters In Arabic" — https://shaykhi.com/blog/throat-letters-in-tajweed-and-arabic/

### Sociolinguistics
- **Reem Bassiouney**, *Arabic Sociolinguistics*, Edinburgh University Press, 2009 — for dialect-prestige claims (Egyptian/Levantine/Gulf media reach).

### Specific lookup
- ProZ KudoZ thread "اللائي - اللاتي - اللواتي" — https://www.proz.com/kudoz/arabic/linguistics/993012 (consensus on relative-pronoun frequency).
