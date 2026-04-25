# Spanish Guide — Comprehensive Accuracy + Effectiveness Review

## Executive Summary

- **Overall verdict:** The 33-guide collection is impressively wide in scope and the conjugation paradigms are uniformly correct — every -AR/-ER/-IR ending table I checked is accurate, the irregular-verb dashboard in Guide 10 is solid across all five tenses, and the subjunctive coverage in Guides 28–30 is well-judged. However, three issues will actively mislead a beginner the first time they hit them: (1) Guide 30's tú-affirmative table has a typo that contradicts its own rule on the same line; (2) Guide 22's "Irregulars" gloss equates *grande/pequeño* with English *old/young*, which is wrong as a base-adjective claim; (3) Guide 32's pronoun-cycling builder produces ungrammatical output for `darse cuenta de` (renders "doy se cuenta de" when the user picks yo). Guide 1's alphabet inventory is also internally inconsistent against any RAE convention. Most of the rest is sound.
- **Number of accuracy issues found:** 22 total — **6 critical** (will mislead readers, including 1 code bug) / **16 minor** (imprecise wording, missing nuance, dialect-sensitive defaults).
- **Number of effectiveness improvements suggested:** 12.
- **Number of coverage gaps:** 6.
- **Recommendation:** **hold-for-revision.** The C1–C6 fixes are mostly one-line edits; once shipped, the collection is in good shape. The biggest substantive gap is the absence of subjunctive *adverbial* triggers (WEIRDO/cuando/antes que/para que/aunque) in Guide 28 — addressing that lifts the collection from "good intro" to "complete reference".

---

## Critical accuracy issues (must fix before shipping)

### C1. Guide 30 — Tú-affirmative example contradicts the stated rule
**File/line:** `guide30.jsx:18`

**What's wrong:** The mode-card lists `ex:["hablas → ¡habla!","comes → ¡come!","escribe → ¡escribe!"]`. The stated rule on the same line is "Drop the -s from present tú form." The first two examples follow the rule (hablas → habla, comes → come). The third does not: the present tú of *escribir* is **escribes**, not *escribe*. Dropping nothing from "escribe" is not the rule; dropping the -s from "escribes" is.

**What's correct:** The third arrow should read `escribes → ¡escribe!` — exactly parallel to the first two. The 2nd-person singular present indicative of *escribir* is *escribes* (Real Academia Española, *Nueva gramática*, §4.10).

**Source:** RAE *Diccionario de la lengua española*, entry "escribir" — conjugation table; RAE *Nueva gramática de la lengua española* (NGLE) §4.10. https://dle.rae.es/escribir

**Recommendation:** Change the third example to `"escribes → ¡escribe!"`. Single-character fix that restores internal coherence.

---

### C2. Guide 22 — "Irregulars" table glosses *grande/pequeño* as *old/young*
**File/line:** `guide22.jsx:18`

**What's wrong:** The irregulars table reads:
```
{reg:"grande",  comp:"mayor", sup:"el/la mayor", en:"old → older → oldest (age)"}
{reg:"pequeño", comp:"menor", sup:"el/la menor", en:"young → younger → youngest (age)"}
```

The base words *grande* and *pequeño* mean **big** and **small**, not **old** and **young**. The gloss tells the learner that *grande* = "old," which is simply wrong. *Mayor*/*menor* are indeed the irregular comparatives that **specialize for age** when the comparison is about people's ages, but the base-form English equivalents are still big/small.

The compounding error: *grande* and *pequeño* also have **regular** comparatives (*más grande*, *más pequeño*) that are used for size. *Mayor*/*menor* primarily mean "older/younger" (age) or "greater/lesser" (rank, abstract quantity). A learner reading this table comes away thinking "grande = old," which they will then misuse.

**What's correct:** Either:
- Reframe the gloss: `"big → bigger → biggest (size); also mayor = older / menor = younger for age"`, **or**
- Keep mayor/menor as primarily age comparatives, but pair them with *viejo/joven* (note that *más viejo*/*más joven* are equally valid and more common in everyday Latin American speech).

**Source:** RAE *Diccionario panhispánico de dudas*, "grande" §1.2 and "mayor": "*mayor* y *menor* son las formas comparativas de *grande* y *pequeño*, respectivamente, cuando estos adjetivos significan, respectivamente, 'de mayor edad' y 'de menor edad' o, en sentido figurado, 'de mayor o menor importancia'. […] Cuando *grande* y *pequeño* significan tamaño, sus comparativos son *más grande* y *más pequeño*." https://www.rae.es/dpd/mayor

**Recommendation:** Replace row with:
```
{reg:"grande",  comp:"más grande / mayor", sup:"el/la más grande / mayor",
 en:"big → bigger → biggest; mayor specializes for age/importance"}
{reg:"pequeño", comp:"más pequeño / menor", sup:"el/la más pequeño / menor",
 en:"small → smaller → smallest; menor specializes for age"}
```

---

### C3. Guide 32 — Pronoun cycler renders ungrammatical "darse cuenta" forms (CODE BUG)
**File/line:** `guide32.jsx:29` (data) plus the render at `guide32.jsx:62`

**What's wrong:** The expression `darse cuenta de` is encoded as `{sp:"darse cuenta de", tail:"se cuenta de"}`. The render at line 62 builds the conjugated form as `${forms[pro]} ${i.tail}`, where `forms` is the conjugation table for *dar* and `pro` is the pronoun index. So when the user picks "yo," the rendered output is `"doy se cuenta de"`. When they pick "tú": `"das se cuenta de"`. **All of these are ungrammatical.**

*Darse cuenta de* is a **pronominal verb**: the reflexive pronoun must agree with the subject. Correct conjugation:
- yo **me** doy cuenta de
- tú **te** das cuenta de
- él/ella **se** da cuenta de
- nosotros **nos** damos cuenta de
- vosotros **os** dais cuenta de
- ellos **se** dan cuenta de

The tail string "se cuenta de" is the bug: it freezes the 3rd-person reflexive *se* into every form. None of the other items in the *dar* group have this problem because they aren't pronominal (`dar un paseo`, `dar igual`, etc.).

**Source:** RAE *DLE* "darse cuenta" entry — listed as a pronominal locution (verbo pronominal). The reflexive pronoun is part of the verb's argument structure and must agree. RAE *NGLE* §41.13 (on pronominal verbs). https://dle.rae.es/cuenta#9OC8tdM (entry for "darse cuenta de algo").

**Recommendation:** Either (a) drop *darse cuenta de* from this guide because it's the only pronominal item in the set and breaks the simple "tail" model, or (b) extend the data shape to handle pronominal verbs. Quick fix:

```js
// Add a flag, then branch in render:
{sp:"darse cuenta de", en:"to realize", lit:"to give oneself account of",
 tail:"cuenta de", reflexive:true}

// In render (line 62):
const reflPron = ["me","te","se","nos","os","se"];
const verb = pro===-1
  ? i.sp
  : i.reflexive
    ? `${reflPron[pro]} ${forms[pro]} ${i.tail}`
    : `${forms[pro]} ${i.tail}`;
```

This also implicitly fixes the missing-vosotros bug noted in M3 below if the team adds a 6th pronoun.

---

### C4. Guide 1 — Alphabet inventory is incoherent against any RAE convention (LL+RR included, CH excluded)
**File/lines:** `guide1.jsx:5–35` (the `letters` array)

**What's wrong:** The alphabet grid contains 29 entries including standalone rows for **LL** (line 18) and **RR** (line 26), but does **not** include **CH**. This combination matches no RAE convention:

- **Pre-1994 (traditional 29-letter alphabet):** CH and LL were treated as standalone letters (sorted between C/D and L/M respectively). RR was **never** an official letter — it was always a digraph. So the pre-1994 inventory was 29 letters with CH and LL but **not** RR.
- **1994 RAE reform:** CH and LL kept their letter names but were sorted alphabetically as C+H and L+L for indexing.
- **2010 *Ortografía*:** CH and LL were **removed** from the alphabet entirely; both are now classified as digraphs (*dígrafos*). Modern Spanish alphabet has 27 letters: A–Z plus Ñ. RR was also reaffirmed as a digraph. Y was renamed *ye* (formerly *i griega*).

The current code mixes inventories: it has LL (only valid pre-2010), it has RR (never an official letter under any convention), and it omits CH (only consistent with post-2010). No coherent reading of any RAE standard produces this set.

**What's correct (modern, post-2010):** 27 letters — A B C D E F G H I J K L M N **Ñ** O P Q R S T U V W X Y Z. *CH*, *LL*, and *RR* are digraphs and conventionally taught **separately** as pronunciation pairs, not letters of the alphabet.

**Source:** RAE / Asociación de Academias, *Ortografía de la lengua española* (2010), pp. 64–67: "*el alfabeto español queda reducido a las veintisiete letras siguientes: a, b, c, d, e, f, g, h, i, j, k, l, m, n, ñ, o, p, q, r, s, t, u, v, w, x, y, z. […] Los dígrafos ch y ll dejan de ser considerados letras del abecedario.*" RAE summary: https://www.rae.es/espanol-al-dia/exclusion-de-ch-y-ll-del-abecedario

**Recommendation:** Two acceptable fixes:

1. **Modern alphabet, digraphs as bonus pronunciation pairs.** Keep 27 letters (drop LL and RR rows), then add a small "Digraphs" footer block showing CH, LL, and RR with their pronunciation rules. This matches what learners will see in any modern textbook, dictionary, or spell-checker.
2. **Pre-2010 traditional alphabet.** Restore CH (between C and D), keep LL, **drop RR**. Add a header note: "29 traditional letters; modern dictionaries since 2010 alphabetize CH and LL within C and L."

Either way, the grid should not contain LL+RR but exclude CH. That combination has no precedent.

The pronunciation tip on line 18 — "In Mexico: 'y' sound. Argentina: 'sh'" — is fine on its own; just move it to the digraphs section.

---

### C5. Guide 14 — Vosotros/os entirely absent across all 5 pronoun types
**File/lines:** `guide14.jsx:7, 10, 13, 16, 19` (each `data` array shows only 5 rows)

**What's wrong:** Every pronoun type displays only 5 rows (yo/tú/él/nosotros/ellos for subject; me/te/lo,la/nos/los,las for DO; etc.) — *vosotros/vosotras* and the corresponding object/reflexive *os* are simply missing. Beyond the inventory gap, this makes the tip on line 17 inaccurate:

> "1st & 2nd person pronouns (me, te, nos) are identical for DO, IO, and reflexive."

The complete list is **me, te, nos, os**. Dropping *os* makes the claim feel complete but it isn't.

This is inconsistent with the rest of the collection: `_helpers.jsx:4` defines `pronouns6=["yo","tú","él/ella/Ud.","nosotros","vosotros","ellos/Uds."]`, every conjugation guide (4, 5, 6, 7, 8, 9, 10, 28, 29) uses six pronouns including vosotros, Guide 24 covers tú vs. usted regional usage, and Guide 33 explicitly discusses voseo/vosotros differences. Only Guide 14 — the pronoun reference — omits vosotros.

**What's correct:** Add the 6th row to each type:
- Subject: `vosotros/as — you all (informal, Spain) — Vosotros estudiáis juntos.`
- DO: `os — you all — Os vi ayer.`
- IO: `os — to you all — Os mandé un mensaje.`
- Reflexive: `os — yourselves — Os despertáis temprano.`
- After preposition: `vosotros/as — you all — Es para vosotros.`

And update the reflexive tip: `1st & 2nd person pronouns (me, te, nos, os) are identical for DO, IO, and reflexive.`

**Source:** RAE *NGLE*, §16 ("El pronombre personal"); RAE *DPD* "ustedes": "*En España, ustedes se usa solo como tratamiento de respeto; el plural informal es vosotros/as. En América, vosotros no se usa: ustedes cubre ambos registros.*" https://www.rae.es/dpd/ustedes

**Recommendation:** Add the 6th row to each `data` array. The Insight on line 42 already says "Vosotros is not used in Mexico or Latin America. Use ustedes for ALL plural 'you'" — this is correct guidance for omitting vosotros *in production*, but the **reference guide** should still teach all forms so a learner reading Spanish texts (which include vosotros) can recognize them.

---

### C6. Guide 17 — "Dead (result of dying)" listed under ESTAR is misleading
**File/line:** `guide17.jsx:24` — `{cat:"Dead (result of dying)", ex:"El perro está muerto. — The dog is dead."}`

**What's wrong:** "Dead" is the canonical example used by traditional textbooks to illustrate "death is a permanent state, but Spanish uses *estar* anyway because it's the *result of a change*." That framing is the standard one, and the example sentence is grammatically fine. The problem is the parenthetical category label "(result of dying)" — pedagogically this is the right framing, but the wording invites the reader to ask "why isn't death permanent enough for ser?" without supplying the answer.

More importantly, the entry sits next to "Result of change" (line 21) which says exactly the same thing with a clearer example (*La puerta está abierta*). The "dead" row is conceptually a duplicate of the row above and ends up confusing rather than illuminating.

**What's correct:** Death is a *resultant state* in Spanish — `estar muerto` is correct because the participle *muerto* describes the state that results from the action of dying, parallel to *estar abierto/cerrado/dormido/vivo*. The rule is: **all participles used as adjectives go with *estar*** (because they describe a state resulting from a verb), regardless of whether English perceives the state as permanent.

**Source:** RAE *NGLE* §37.5 (estar + participle); Butt & Benjamin, *A New Reference Grammar of Modern Spanish* (5th ed.), §29.2.5: "Past participles used as adjectives go with *estar*."

**Recommendation:** Replace the row with the underlying rule:

```js
{cat:"Past-participle adjectives", ex:"La ventana está cerrada / Está muerto / Está casado. — All result-states use estar."}
```

This subsumes `dead`, `married`, `tired`, `awake`, `seated`, etc. under one mental rule. Strong case for the more powerful framing.

(Note also: `Está casado` is an interesting case — many speakers say `Es casado` meaning "he's a married man" as identity. The rule has nuance, but `estar + past participle` is the safe default.)

---

## Verified correct (no fix needed)

These are claims I checked carefully and want to call out as confirmed, so the author doesn't second-guess:

- **All -AR/-ER/-IR conjugation paradigms** in Guides 4 (present), 5 (preterite + imperfect), 6 (future + conditional), 7 (progressive), 8 (six perfect tenses including auxiliaries), 28 (present subjunctive), 29 (past subjunctive), 30 (commands). Endings, accent placement, and irregular yo-forms (tengo, hago, digo, salgo) all match RAE *NGLE* §4.
- **Guide 8** — All six *haber* forms verified: presente (he/has/ha…), pluscuamperfecto (había…), futuro (habré…), condicional (habría…), presente subjuntivo (haya…), pluscuamperfecto subjuntivo (hubiera…). All accent marks correct.
- **Guide 9** — Boot-pattern claim (e→ie, o→ue, e→i, u→ue change in 1s/2s/3s/3p but **not** in 1p/2p) is exactly right. The model verbs *pensar*, *poder*, *pedir*, *jugar* are textbook choices and conjugate as shown.
- **Guide 10** — The complete irregular-verb dashboard for ser/estar/ir/tener/hacer/poder/saber/decir across present/preterite/imperfect/future/subjunctive: every cell I sampled is correct. *Decir* preterite as `["dije","dijiste","dijo","dijimos","dijisteis","dijeron"]` correctly drops the "i" of *-ieron* after the *j*-stem, per RAE *NGLE* §4.13.4.
- **Guide 11** — Gender rules. The "*-ción/-sión* always feminine" and "*-dad/-tad* always feminine" claims are exception-free in RAE-attested vocabulary. The exceptions list for *-o → masc* (la mano, la foto, la moto, la radio) is the standard set.
- **Guide 12** — Pluralization. "*-z → -ces*" is correct; the accent-shift examples (*joven → jóvenes*, *examen → exámenes*, *canción → canciones*) accurately reflect the rule that the stress syllable doesn't move when -es is added, so accents appear or disappear to match the natural stress placement.
- **Guide 16** — Gustar paradigm. The agreement rule ("the THING is the subject, not the person") is the correct mental model. The verb list (gustar, encantar, molestar, doler, picar, importar, interesar, faltar, parecer, quedar) is a high-yield, accurate selection.
- **Guide 17** — Ser/estar uses lists. Both eight-row breakdowns are accurate. The "meaning shifts" table (aburrido, listo, malo, rico, verde, seguro) is canonical and the examples are correct.
- **Guide 18** — Por vs. para. The visual metaphor (PARA = destination, POR = through/cause) is the standard pedagogical framing. The use lists and quiz items are well-calibrated.
- **Guide 21** — Negation. Double-negative agreement is correctly framed as obligatory, not stylistic. *Nadie* requires personal *a* (`No conozco a nadie`) — verified.
- **Guide 24** — Tú/usted regional notes. Argentina voseo, Colombia ustedeo, Mexico ustedes-only, Spain vosotros — all accurate. The grammar tip ("usted uses 3rd person verb forms") is exactly right.
- **Guide 25** — False cognates. Every entry verified: *embarazada/pregnant*, *constipado/cold*, *éxito/success*, *librería/bookstore*, *sensible/sensitive*, *realizar/accomplish*, *soportar/tolerate*, *introducir/insert*, *carpeta/folder*, *recordar/remember*. All registered correctly. *Asistir/attend* and *molestar/bother* are the "high-traffic" traps. Excellent list.
- **Guide 26** — Tener calor / estar caliente. The "estar caliente" colloquial warning is accurate for most of Latin America (RAE *DPD*, "caliente"). `Hace calor` for weather is correct.
- **Guide 28** — The "opposite vowel" rule (-AR → -e endings, -ER/-IR → -a endings) is a clean and accurate framing. The "yo-go" carryover ("tengo → tenga, digo → diga") is exactly right and a great mnemonic.
- **Guide 29** — Past subjunctive formation rule (3rd-person plural preterite minus *-ron* + endings) is the standard derivation. The si-clause table (possible/unlikely/impossible) maps correctly to the three si-construction patterns. The note that *-se* forms are equally correct in Spain is accurate per RAE *NGLE* §4.14.6.
- **Guide 30** — Irregular tú-affirmative commands list (di, haz, ve, pon, sal, sé, ten, ven) is the full canonical set. Negative forms use subjunctive — correct.
- **Guide 31** — Reflexive pronouns (me/te/se/nos/os/se) — listed correctly in DarkBox at line 29 (this is the only place in Guide 14's neighborhood where *os* appears!). Meaning-change pairs (ir/irse, dormir/dormirse, poner/ponerse, llevar/llevarse, parecer/parecerse) are accurate.
- **Guide 33** — Voseo conjugation patterns (vos tenés, vos sabés, vos podés) are correct for Rioplatense voseo. Vocabulary regional differences verified. Distinción/seseo/yeísmo/sheísmo/aspirated-s isoglosses match standard dialectology references (Lipski, *Latin American Spanish*).

---

## Minor accuracy issues (should fix, low priority)

### M1. Guide 1 — RR is not an official Spanish letter under any RAE convention
**File/line:** `guide1.jsx:26`. RR has always been a digraph (*dígrafo*), never a letter. See C4 above — this is part of the same issue but flagged separately because even a "pre-2010 traditional alphabet" reading wouldn't include RR. If C4 is fixed by adopting the modern 27-letter inventory + digraphs section, this row goes there.

### M2. Guide 1 — V/B claim "No B/V difference!"
**File/line:** `guide1.jsx:30`. The claim is mostly correct: in standard Spanish, *b* and *v* represent the same phonemes (`/b/` and `/β/` allophonically). However, the framing "No B/V difference" can lead beginners to spell freely. RAE notes (*Ortografía* 2010, ch. 6.2.1) that the spelling distinction is fixed by etymology and orthographic norms, even though the pronunciation is identical. Consider: "Spelled differently, **pronounced the same** — but you must memorize the spelling."

### M3. Guide 14 — DO pronoun *lo* incomplete (no *lo* neuter)
**File/line:** `guide14.jsx:10`. Lists *lo / la* meaning "him-it / her-it." The neuter *lo* (which references concepts/clauses, not antecedents with gender — `Lo sé` "I know it / I know that") is technically a third use of *lo*. Worth one-line mention given the quiz/practice value. Per RAE *NGLE* §16.4.

### M4. Guide 17 — *Estar muerto* without further nuance
**File/line:** `guide17.jsx:24`. Already covered in C6, but secondary point: many native speakers in some regions use *ser muerto* in fixed religious or literary contexts (*fue muerto en la batalla*). Not worth teaching, but the unconditional "always estar" is a simplification. Beginners can ignore this.

### M5. Guide 18 — "Para niño, cocina bien" missing article
**File/line:** `guide18.jsx:12`. Spanish typically requires a determiner: `Para ser un niño, cocina bien` or `Para un niño, cocina bien.` Bare `Para niño` without article is colloquial/elliptical and won't sound right to most learners' ears. Source: RAE *NGLE* §15.1 (article use with countable singular nouns).

**Recommendation:** Replace with `Para ser niño, cocina bien.` (using bare *para ser* + adjective is a common idiom) or `Para un niño, cocina bien.`

### M6. Guide 22 — Reciprocal *tan...como* with comparison
**File/line:** `guide22.jsx:18`. Already covered as C2; the same row also says `(age)` parenthetically, which is correct usage but the gloss `old → older → oldest` is the wrong base meaning. See C2 for the recommended fix.

### M7. Guide 23 — Number grid skips 17, 18, 19
**File/lines:** `guide23.jsx:10–11` (number list jumps `16, 20, 21`). The intro at line 33 says "16-29: compound words (dieciséis, veintiuno)" — but only 16 and 21 are shown. *Diecisiete*, *dieciocho*, *diecinueve* are exactly the same compounding pattern (diez + i + siete/ocho/nueve) and should be there for completeness. Trivial fix, but the omission undercuts the pedagogical claim.

### M8. Guide 23 — `1:00 — Es la una` and the 24-hour issue
**File/line:** `guide23.jsx:17`. The example `1:00 → Es la una` is correct, but most Spanish-speaking countries use 24-hour for written/digital displays. The `4:45 → Son las cinco menos cuarto` reading is fine for Spain; in much of Latin America (especially Mexico), `Son las cuatro y cuarenta y cinco` or `Quince para las cinco` is more common. Worth a one-line dialect note.

### M9. Guide 24 — "A waiter at a casual restaurant — usted" is dialect-sensitive
**File/line:** `guide24.jsx:25`. The *usted* answer is correct for most of Latin America (especially Mexico, Colombia, Peru), but in Spain — particularly in Madrid and Barcelona casual settings — *tú* is increasingly default with younger waiters. The "why" rationale ("Service context → usted is standard in most countries") is fair but should hedge: "*…in most Latin American countries; in Spain, tú is common in casual venues.*"

### M10. Guide 25 — Personal-*a* example confounds two issues
**File/line:** `guide25.jsx:31`. The example `Vi a la película → Vi la película` works to show that personal *a* is for people, not things. But "*a la película*" makes the reader puzzle through the *a + la → a la* contraction at the same time. A cleaner counter-example: `Vi a Madrid → Vi Madrid` (cities/countries used to take personal *a* and modern usage drops it for places). Per RAE *DPD*, "a" §1.1.2: with proper place names, personal *a* is now optional/avoided.

### M11. Guide 27 — `Hay lluvia / Hay granizo` is a less natural register
**File/lines:** `guide27.jsx:21–22`. *Hay niebla* and *Hay tormenta* are common; *hay lluvia* and *hay granizo* are register-marked (forecast/news prose). In ordinary speech: *Está lloviendo* / *Está granizando* / *Cae granizo*. Not wrong, but a learner repeating "Hay lluvia" in casual conversation will sound slightly stilted. Add a parenthetical: `(forecast register; conversationally, "Está lloviendo" is more common)`.

### M12. Guide 28 — Past subjunctive *querer* doesn't appear, but should be in trigger set
**File/line:** `guide28.jsx:13`. The trigger list "Desire" includes *querer que*, *esperar que*, *pedir que*, *necesitar que*, *preferir que*. Solid list, but one of the most-used "subjunctive triggers" in real conversation is the polite *Quisiera que…* / *Me gustaría que…* — these use the past subjunctive after the conditional verb. Worth a one-line mention as the bridge between this guide and Guide 29.

### M13. Guide 29 — *Si* clause example "Si llueve, me quedo en casa"
**File/line:** `guide29.jsx:17`. Correct grammatically. But the formula `Si + present indicative → present/future` would benefit from a future-result example too: `Si llueve, **me quedaré** en casa.` Both are valid; the present-result is the most common, but learners should see both patterns to recognize them in reading.

### M14. Guide 31 — Reflexive vs. pronominal distinction
**File/line:** `guide31.jsx:6–13` (Daily routine list) plus `guide31.jsx:16–21` (meaning-change pairs).

The verbs *llevarse bien*, *parecerse*, *dormirse* are technically *pronominal* verbs (the *se* doesn't make the action reflexive — *se durmió* doesn't mean "he slept himself"), not strictly reflexive. RAE *NGLE* §41.13 distinguishes:
- True reflexive: `Me lavo` (I wash myself — could be `Lavo a mi hijo` instead)
- Reciprocal: `Se quieren` (they love each other)
- Pronominal/intrinsic: `Me arrepiento`, `Se atrevió` (no non-reflexive base meaning)
- "Aspectual" pronominal: `Dormirse` ≠ *dormir* (a different aspect/event)

The guide doesn't make the four-way distinction (and arguably doesn't need to at this level), but lumping all four under "Reflexive" is technically a simplification. Worth a footnote: "Linguists call some of these *pronominal* or *aspectual* uses of *se* — the pronoun is part of the verb, not literally 'oneself'."

### M15. Guide 33 — "Sheísmo" terminology
**File/line:** `guide33.jsx:23`. The Argentine LL/Y pronounced /ʃ/ is more correctly called *rehilamiento* or *yeísmo rehilado*; *sheísmo* is a popular but non-canonical term. Most modern speakers (especially women, urban) use /ʃ/ (sh); older/rural speakers often use /ʒ/ (zh). The claim is essentially right; consider adding the technical name in parentheses for completeness.

### M16. Guide 33 — Leísmo definition slightly off
**File/line:** `guide33.jsx:28`. "Le/les used for direct objects (people)" is the *leísmo de persona* form, which RAE accepts as standard ("leísmo de cortesía" with usted is even prescribed). The guide's framing is fine but slightly underspecified — it's specifically for **masculine, animate** direct objects in standard leísmo. Adding "(masculine animate)" would make it more precise. Per RAE *DPD*, "leísmo".

---

## Effectiveness improvements

### E1. Guide 1 — Fix the alphabet (C4) first, then add a "tap to hear" model voice that pre-warms iOS speech
The interactive grid is well-designed (filter chips, vowel bar footer). Once C4's alphabet inventory is corrected, adding a "tap any letter to hear it pronounced" auto-tour mode (cycle through all letters) would make the guide far more useful for repeated drilling. The current single-tap only plays one letter at a time.

### E2. Guide 4 — "Show Top 4 Irregulars" button is brilliant; expand to 8
The four shown (ser, ir, tener, hacer) are exactly the right place to start. But *estar*, *poder*, *saber*, *decir* are equally essential and cause similar early-learner pain. Show them all by default, or extend the toggle to "Show 8 irregulars" — Guide 10 already has the conjugation data for these, so consistency would help.

### E3. Guide 5 — Pretérito vs Imperfecto needs a "what changes the verb in the middle" example
The trigger chips (ayer, anoche, una vez vs. siempre, cada día, de niño/a) are excellent. Missing: the **interrupted-action** pattern, which is the highest-frequency real-world use. Add an example: `Comía cuando llegó.` ("I was eating when she arrived.") Imperfect for the ongoing background, preterite for the completed interruption. This single example teaches more than the trigger lists alone.

### E4. Guide 7 — Add "verbs that resist the progressive" list
The "When NOT to Use It" card is good, but a high-value list for learners would be the verbs that almost never go progressive in Spanish even when they would in English: *ir, venir, estar, tener, ser*. `Estoy yendo al cine` is grammatically possible but very rare; native speakers say `Voy al cine.` Adding this list would prevent the most common over-application of the progressive.

### E5. Guide 8 — Six tenses in one guide is ambitious; consider a "common vs. rare" filter
The data is impeccable, but presenting six perfect tenses simultaneously is information-dense. *Presente perfecto* and *pluscuamperfecto* are daily-use; *futuro perfecto* and *condicional perfecto* are textbook-rare; the two perfect-subjunctive tenses are advanced. Consider tagging each pill with a frequency badge (★★★ / ★★ / ★) to set learner expectations.

### E6. Guide 10 — Add a "missing verbs" note
The 8 irregulars in the dashboard cover the highest-frequency core, but learners will hit *venir, dar, ver, traer, querer, poner* very early too. Either expand the dashboard to ~14 verbs, or add a small "see also" footer linking to the per-verb conjugation entries (e.g., *querer* → e→ie boot in Guide 9; *venir* → mixed irregular...).

### E7. Guide 14 — Fix vosotros omission (C5), then add a "pick your dialect" toggle
After C5 is fixed, the guide will have all six pronoun rows. Add a toggle at the top: `[All] [Latin America: hide vosotros] [Spain: emphasize vosotros]`. This lets learners drill the form they actually need without losing access to the other.

### E8. Guide 15 — Position rules don't show double-pronoun edge case
The "Double: IO + DO → SE lo" row is well-explained. Missing: the placement question when **both** pronouns and an infinitive/gerund appear: `Voy a dárselo` / `Se lo voy a dar` / `Estoy diciéndoselo` / `Se lo estoy diciendo.` The rules cascade in interesting ways and the accent marks shift (*dárselo* needs the accent on *dár-* because the new word has 3+ syllables ending in a vowel). Adding one more interactive row covering this would close the loop.

### E9. Guide 18 — Add reverse "test your understanding" of why
The quiz tests "fill in *por* or *para*" with 10 items. After answering, the guide could optionally show the **rationale chip** for each (`why: rate / cause / destination`). Currently this metadata exists in the data (`why:"purpose/goal"`) but isn't surfaced in the UI. Show it on the result screen.

### E10. Guide 21 — "Tampoco/También" pairing
*Tampoco* is in the negation list. The mirror affirmative *también* isn't taught here (it's in no guide). Consider a one-line callout or "Affirmative pairs" mini-table:
- *siempre / nunca*
- *algo / nada*
- *alguien / nadie*
- *también / tampoco*
- *algún / ningún*

This bidirectional view makes the negation set easier to remember.

### E11. Guide 23 — Add ordinals (primero, segundo, tercero…)
Numbers tab is strong on cardinals; ordinals (1st = primero, 2nd = segundo, 3rd = tercero, etc.) are essential for dates, addresses, floor numbers, royalty, anniversaries. The dates tab mentions *el primero* but doesn't show the rest of the ordinal series. One small card or footer adding 1º–10º would close this.

### E12. Guide 28 — Subjunctive guide missing adverbial triggers (also see "Coverage gaps" #1)
The trigger set covers desire/emotion/doubt/impersonal but omits **adverbial conjunctions** that trigger subjunctive — *cuando*, *en cuanto*, *hasta que*, *antes (de) que*, *para que*, *sin que*, *aunque* (with future reference). The standard mnemonic *WEIRDO* (Wishes, Emotion, Impersonal expressions, Recommendations/Requests, Doubt, Ojalá) is a good organizing frame but doesn't capture adverbials. This is the most important coverage gap in the entire collection — see Coverage gaps section.

---

## Coverage gaps

### Missing topics that matter for daily use

1. **Adverbial subjunctive triggers** — Guide 28 covers nominal triggers (desire/emotion/doubt) but not adverbial ones (cuando/antes que/para que/sin que/aunque). Adding a fifth trigger category to Guide 28's `triggers` array would close the biggest gap. Per RAE *NGLE* §25.4. The temporal contrast (`Te llamo cuando llegue` future-uncertain → subjunctive vs. `Te llamé cuando llegué` past-fact → indicative) is heavy-hit pedagogy that's currently absent.

2. **"Si yo fuera tú" / contrary-to-fact present** — Guide 29 covers si + past subjunctive for hypotheticals, but the high-frequency advice-giving idiom (*Si yo fuera tú, no lo haría*) deserves explicit pedagogy. Currently buried in the table.

3. **Personal *a*** — Mentioned briefly in Guide 25 (false-cognate adjacency) and Guide 14's IO tip, but never given its own treatment. The personal *a* with direct-object animate nouns is one of the highest-impact rules for English speakers (`Veo a María` not `Veo María`). RAE *DPD* "a" §1.1 has detailed coverage; deserves its own card or short section.

4. **Tener idioms beyond Guide 32** — Guide 32 covers tener + noun for states (hambre/sed/calor/etc.), but *tener que + infinitive* (obligation: "I have to") is the single most-used tener structure and isn't taught here. Belongs either in Guide 32 or a "Modal verbs" guide (deber, poder, tener que, hay que).

5. **Demonstratives** — *este/ese/aquel* (with masc/fem/sing/plural agreement and the neuter forms *esto/eso/aquello*) is a complete topic absent from the collection. High-frequency, easy to teach, no dependency on other guides.

6. **Possessives** — *mi/tu/su/nuestro* (short) and *mío/tuyo/suyo/nuestro* (long, post-nominal) are also entirely absent. Guide 13 (adjectives) doesn't include them. They follow a parallel agreement pattern to descriptive adjectives but with their own placement quirks (typically pre-nominal short-form).

### Borderline-redundant topics

- **Guide 17 (Ser/Estar) and Guide 26 (Calor)** — Guide 26 is essentially a deep-dive on one ser/estar shift. Defensible as a "common pitfall" callout, but the guide is small (33 lines of code) and could fold into Guide 17's `shifts` table. If kept separate, consider also expanding to other "tener vs. ser/estar" pairs (*tener miedo* vs. *estar asustado*, *tener hambre* vs. *estar hambriento*).
- **Guide 27 (Weather) and Guide 32 (Tener idioms)** — Both touch *hace calor / tener calor*. Cross-link them; currently they don't reference each other.

### Category structure
The 8-category split (Pronunciation / Verbs / Nouns / Pronouns / Core / Prepositions / Sentences / Practical) is reasonable. "Core" with only Guides 17 and 26 is light; consider folding 26 into Practical or merging Core with Practical. "Practical" is already the catch-all (numbers, formality, traps, weather, regional, idioms) — could be split into "Conversation" (24, 26, 27, 32) and "Reference" (23, 25, 33) for clarity.

---

## Per-guide notes (only where issues exist)

### Guide 1 — El Alfabeto
- Alphabet inventory is incoherent (C4): LL+RR included, CH excluded. No RAE convention matches this.
- B/V framing (M2) is OK but could prevent spelling errors with one extra word.

### Guide 14 — Pronombres
- Vosotros/os entirely missing across all 5 pronoun types (C5).
- DO list missing neuter *lo* (M3).

### Guide 17 — Ser vs. Estar
- "Dead" row is a duplicate of "Result of change" with worse framing (C6). Replace with broader past-participle rule.

### Guide 18 — Por vs. Para
- "Para niño, cocina bien" missing article (M5).

### Guide 22 — Comparativos
- Irregulars table glosses *grande/pequeño* as English *old/young* (C2). The mayor/menor age gloss is correct in context, but the base-form English meanings are wrong.

### Guide 23 — Números y Fechas
- Number grid skips 17/18/19 while showing 16 (M7). 24-hour caveat (M8) for Latin American time.

### Guide 24 — Tú vs. Usted
- Waiter scenario answer (usted) needs a Spain hedge (M9).

### Guide 25 — Trampas
- Personal-*a* example confounds with article contraction (M10).

### Guide 27 — El Tiempo
- *Hay lluvia / hay granizo* are register-marked (forecast prose), not conversational (M11).

### Guide 28 — Subjuntivo Presente
- Missing adverbial triggers (Coverage gap #1, E12).
- Could mention bridge to past subjunctive via *quisiera que* (M12).

### Guide 29 — Subjuntivo Pasado
- Si-clause "possible" pattern would benefit from a future-result variant (M13).

### Guide 30 — Imperativo
- Tú-affirmative typo: `escribe → ¡escribe!` should be `escribes → ¡escribe!` (C1). Single-character fix.

### Guide 31 — Reflexivos
- Loose use of "reflexive" for verbs that are technically pronominal/aspectual (M14). Defensible simplification but worth a footnote.

### Guide 32 — Expresiones
- **Code bug:** *darse cuenta de* renders ungrammatically when conjugated through the pronoun cycler (C3). Renders "doy se cuenta de" instead of "me doy cuenta de" for yo. Real bug, not just imprecise wording.

### Guide 33 — Español Regional
- Sheísmo terminology (M15). Leísmo definition could be more precise (M16).

---

## Sources cited

### RAE / ASALE primary sources
- **Real Academia Española**, *Ortografía de la lengua española* (2010): https://www.rae.es/. Specifically the abolition of CH and LL as letters of the alphabet (pp. 64–67) and the renaming of Y as *ye*. RAE summary: https://www.rae.es/espanol-al-dia/exclusion-de-ch-y-ll-del-abecedario
- **RAE / ASALE**, *Nueva gramática de la lengua española* (NGLE) (2009): https://www.rae.es/gram%C3%A1tica/.
  - §4 — verb morphology and irregular paradigms.
  - §16 — personal pronouns (used to confirm the *me/te/nos/os* parallel set in C5).
  - §25.4 — adverbial subjunctive (Coverage gap #1).
  - §37.5 — *estar* + past participle (C6).
  - §41.13 — pronominal verbs (C3, M14).
- **RAE**, *Diccionario panhispánico de dudas* (DPD) (2005, ongoing online updates): https://www.rae.es/dpd/
  - "mayor": https://www.rae.es/dpd/mayor — distinguishes *mayor/menor* (age, importance) from *más grande/más pequeño* (size). Key for C2.
  - "ustedes": https://www.rae.es/dpd/ustedes — Spain vs. Latin America informal/formal distinction. Key for C5.
  - "a" §1.1 — personal *a* with proper place names. Key for M10.
  - "leísmo" — distinguishes leísmo de persona (accepted) from leísmo de cosa (not accepted). Key for M16.
  - "caliente" — colloquial register warning. Verifies Guide 26's claim.
- **RAE**, *Diccionario de la lengua española* (DLE): https://dle.rae.es/
  - "escribir" conjugation table — used to verify C1.
  - "darse cuenta" entry — used to verify C3.

### Reference grammars
- **Butt, John & Carmen Benjamin**, *A New Reference Grammar of Modern Spanish* (5th ed., Routledge, 2011) — used for cross-checks on ser/estar (§29), past participles as adjectives (§29.2.5), and reflexive/pronominal classifications.
- **Lipski, John M.**, *Latin American Spanish* (Longman, 1994) — used for dialectal claims in Guide 33 (sheísmo, aspirated -s, voseo distribution).

### Additional verification
- **RAE Conjugator** (built into DLE) — used to spot-check conjugation paradigms across all of Guides 4–10, 28–30 cited in "Verified correct."
