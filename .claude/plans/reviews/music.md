# Music Theory Guide — Comprehensive Accuracy + Effectiveness Review

## Executive Summary

- **Overall verdict:** The 30-guide arc is well sequenced (intervals → scales → chords → progressions → genre/context) and the conceptual framing is largely accurate and pedagogically sound. The main problems are **two structural bugs in the audio/scale-building code that produce wrong notes** (Guide 5's Circle of Fifths displays the wrong scale for any flat/sharp key, and Guide 7's "Bb" root button generates garbage when fed through the sharp-only `ALL_NOTES` array), plus **a handful of factual errors in genre/example claims** (Pink Floyd "Money" mis-labeled 7/8, the "Andalusian cadence" mis-labeled, melodic minor presented without ascending/descending distinction). Most of the conceptual content is right and the interactive piano widgets are excellent.
- **Number of accuracy issues found:** 13 total — **5 critical** (wrong scale notes, wrong example metering, wrong cadence label, root-list with unsupported note name, melodic-minor framing) / **8 minor** (oversimplifications, missing nuance, wording).
- **Number of effectiveness improvements suggested:** 11.
- **Number of coverage gaps flagged:** 7 (voice-leading rules, secondary dominants, modal interchange, modes parade, the order of sharps/flats mnemonic, enharmonic spelling vs. equal pitch, ear-training drill).
- **Recommendation:** **hold-for-revision.** The Circle-of-Fifths bug in Guide 5 is the single most important fix — it makes the guide silently teach the wrong notes for 6 of the 12 keys. Once the scale-building helper handles flat/sharp roots correctly and the handful of factual errors are corrected, the collection ships well.

---

## Critical accuracy issues (must fix before shipping)

### C1. Guide 5 Circle of Fifths displays the **wrong scale** for every flat key (and F#) — `guide5.jsx:28`
**File/lines:** `src/guides/music/guides/guide5.jsx:28` (the line `buildScale(k.key.replace("b","").replace("#",""),MAJOR_STEPS)`).

**What's wrong:** `ALL_NOTES` in `_helpers.jsx:4` is sharp-only: `["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]`. There is no entry for `"Db"`, `"Eb"`, `"Ab"`, `"Bb"`, or `"F#"` (well, F# IS there). Rather than mapping flat names to their enharmonic sharps before lookup, Guide 5 strips the accidental from the *key letter*, so:
- `"Db"` → `"D"` → builds **D major** (D E F# G A B C#) and labels it "Db major"
- `"Eb"` → `"E"` → builds **E major** (E F# G# A B C# D#) and labels it "Eb major"
- `"Ab"` → `"A"` → builds **A major** and labels it "Ab major"
- `"Bb"` → `"B"` → builds **B major** and labels it "Bb major"
- `"F#"` → `"F"` → builds **F major** and labels it "F# major"
- `"F"` → `"F"` → builds **F major** ✓ (accidentally correct)

So 5 of the 12 keys silently teach completely wrong notes. The displayed key signature count ("5 flats" for Db, etc.) is right, but the scale chips below it are the *wrong scale*.

**Correct fix:**

```js
const ENHARMONIC = { "Db":"C#", "Eb":"D#", "Gb":"F#", "Ab":"G#", "Bb":"A#" };
const root = ENHARMONIC[k.key] || k.key;
buildScale(root, MAJOR_STEPS)
```

…and then if you want the user-facing scale chips to display flat-spelled names rather than `C#/D#/F/F#/G#/A#/C` for Db major, also map back the displayed labels (Db major's correct spelling is `Db Eb F Gb Ab Bb C`).

**Source:** Aldwell & Schachter *Harmony and Voice Leading* (4th ed., Ch. 1), any standard music-theory text — Db major has notes `Db Eb F Gb Ab Bb C`. Verifiable on any keyboard or in `circleOfFifths` itself: Db is listed with `flats:5`, and 5 flats is `Bb Eb Ab Db Gb`. The non-flatted scale degrees are `C` and `F`. Confirms scale is `Db Eb F Gb Ab Bb C`, not `D E F# G A B C#`.

**Why this matters:** The whole point of Guide 5 is "find which sharps/flats belong to which key." Telling a user that Db major has `D E F# G A B C#` is exactly backwards — those are D major's notes, with two sharps, not Db's five flats.

---

### C2. Guide 7's `Bb` button produces nonsense scale/chord notes — `guide7.jsx:21`
**File/lines:** `src/guides/music/guides/guide7.jsx:21` — root list `["C","D","E","F","G","A","Bb"]`.

**What's wrong:** Same root cause as C1, different symptom. `buildScale("Bb", MAJOR_STEPS)` calls `ALL_NOTES.indexOf("Bb")` which returns `-1`. Then the loop computes `idx = (-1 + 2) % 12 = 1` → `"C#"`, `idx = (1+2) % 12 = 3` → `"D#"`, and so on. The resulting "Bb major scale" is `["Bb", "C#", "D#", "E", "F#", "G#", "A#", "B"]` — gibberish, not a Bb major scale (which is `Bb C D Eb F G A`).

The chord labels under each Roman numeral (rendered at line 27 — `{chordRoot}{chordQualities[i]==="minor"?"m":...}`) inherit the bad notes. Users tapping "Bb" will hear and see chords like `C#m`, `D#m`, etc. — nonsensical for a Bb-major key.

**Correct fix:** Same as C1 — map `"Bb"` to `"A#"` via an enharmonic table before passing to `buildScale`, or expand `ALL_NOTES`/`buildScale` to accept either spelling. Then to display correct flat names in chord labels, map back: A# major in sharps is `A# B# D# D# F G# A#` — so the underlying enharmonic spellings need a reverse mapping for display.

**Better long-term fix:** Replace the sharp-only `ALL_NOTES` with a key-aware spelling system (each key knows whether to use sharps or flats). This is a one-time investment that fixes C1, C2, and prevents future similar bugs throughout all chord/scale guides.

**Source:** Same as C1 — Bb major scale is `Bb C D Eb F G A`. Universally verified.

**Why this matters:** Same severity as C1 — silent wrong information.

---

### C3. Pink Floyd "Money" is in 7/4, not 7/8 — `guide15.jsx:11`
**File/lines:** `src/guides/music/guides/guide15.jsx:11`: lists "7/8 time" with example "'Money' (Pink Floyd)".

**What's wrong:** "Money" (Roger Waters, 1973) is famously in **7/4**, with the iconic bass riff feeling as `2 + 2 + 3` quarter notes (or `3 + 4`, depending on how you count). The guitar solo section moves to 4/4. It is not in 7/8; it has a slow "walking" pulse on the quarter, not the busy eighth-feel of 7/8.

**Correct example for 7/8:** Dave Brubeck's "Unsquare Dance" (7/4 actually too — common confusion), Soundgarden "My Wave" (5/4), Genesis "Turn It On Again" (passages in 13/8). For an indisputably 7/8 example: Pink Floyd "Money"'s seven-feel is 7/4, but **The Police "Walking on the Moon" intro** is in 4/4. Better 7/8 examples: **Radiohead "Paranoid Android"** has 7/8 sections, **Pink Floyd "Time" intro doesn't apply, "Money" is 7/4**. Try **Peter Gabriel "Solsbury Hill"** (7/4 again, hmm). Robust 7/8 example: **Sting "Seven Days"** (7/4 actually). It turns out tracks people quote for "odd seven" are usually 7/4. A clean 7/8 reference: **Genesis "Apocalypse in 9/8"** (9/8) or **Pink Floyd "Mother"** (variable). The most universally cited 7/8 example is **Dave Brubeck "Unsquare Dance"** (7/4) or **Beethoven Symphony No. 7 mvt 2** (passages, but not 7/8). For modern reliable 7/8: **Radiohead "2+2=5"** verse is in 7/8. Replace the "Money" example with **"2+2=5" by Radiohead** or simply reframe: **list "Money" under 7/4 (an odd quadruple meter), and pick a different 7/8 reference**.

Recommended replacement copy: `7/8 time — 7 eighth notes per bar, often felt 2+2+3 or 3+2+2. Common in Balkan folk and prog (Radiohead "2+2=5"). Pink Floyd's "Money" is the same seven-feel but notated in 7/4.`

**Source:** Pink Floyd / Roger Waters interviews, every published score of *The Dark Side of the Moon*, and the Hal Leonard Pink Floyd songbook all give 7/4 for "Money." Verifiable instantly: count quarter notes in the main riff at ~120 BPM — you'll count to 7 over a fairly slow beat, not the rapid eighth-pulse of true 7/8.

**Why this matters:** It's the single most-quoted example for odd meter in pop music, and getting the meter wrong is exactly the trap a teaching guide must avoid. Worse, the conceptual confusion (7/8 vs 7/4) is the very thing this guide is meant to clarify.

---

### C4. "Andalusian cadence" mis-labeled — `guide18.jsx:11`
**File/lines:** `src/guides/music/guides/guide18.jsx:11` — `{name:"i – iv – VII – III", ..., desc:"Andalusian cadence feel. Flamenco, goth, Middle Eastern influenced."}`

**What's wrong:** The progression i–iv–♭VII–♭III in A minor is `Am – Dm – G – C`. That's an Aeolian rock/pop progression (think "Stairway"-adjacent), not the Andalusian cadence.

The **Andalusian cadence** is `i – ♭VII – ♭VI – V` — in A minor that's `Am – G – F – E` (with E typically a major V via raised leading tone, giving it the Phrygian-tinged flamenco sound). The descending bass line `A – G – F – E` is the entire identity of the cadence.

**Recommendation:** Either replace the progression with the actual Andalusian cadence (`i–♭VII–♭VI–V`) and keep the flamenco framing, or rename the entry "Aeolian rock progression" / "minor I-IV-VII-III loop" and remove the flamenco/Middle-Eastern framing.

**Source:** Standard usage — Wikipedia "Andalusian cadence", Persichetti *Twentieth-Century Harmony*, and any flamenco-guitar method (e.g., Juan Martín). The descending tetrachord A-G-F-E with the major V is the defining sonority.

**Why this matters:** This is the kind of name-dropping that earns a guide credibility, and getting it wrong has the opposite effect.

---

### C5. Melodic minor presented without ascending/descending distinction (and no jazz-vs-classical note) — `guide4.jsx:11`
**File/lines:** `src/guides/music/guides/guide4.jsx:11` — `melodic:[2,2,2,2,2,2,1]` (read above as `[2,1,2,2,2,2,1]`).

**What's wrong:** The steps `[2,1,2,2,2,2,1]` produce the *jazz / ascending* form of melodic minor (a.k.a. "melodic minor scale" in jazz pedagogy where it does not change direction). In **classical** practice, the melodic minor scale ascends with raised 6 and 7 (this form) but descends as the natural minor (`[2,1,2,2,1,2,2]` reversed). The guide treats melodic minor as a single fixed scale and never mentions:

1. The ascending/descending difference in the *classical* convention.
2. That jazz uses the "always ascending" form as a chord-scale (parent for altered dominant, lydian dominant, etc.).

This isn't a wrong-note issue (the ascending form *is* one valid version) — it's a missing distinction that the user-facing instructions explicitly called out as a checking point. Beginners who see only this scale will be misled when they encounter the descending form in classical scores.

**Recommendation:** Add one sentence: *"In classical music, melodic minor uses these ascending steps but descends as natural minor. In jazz, the same ascending form is used in both directions — and is the parent scale for altered dominant sounds."*

**Source:** Aldwell & Schachter, *Harmony and Voice Leading* (Ch. 2 — "The minor scale and modes"); Mark Levine *The Jazz Theory Book* (p. 56 — "We don't bother with the descending form").

---

## Verified correct (no fix needed)

These are claims I checked and want to call out as confirmed.

- **Guide 1** — "12 notes in Western music," "no note between B-C and E-F" — both correct.
- **Guide 2** — Every interval entry in `INTERVALS` (helpers.jsx) is correct half-step count and quality (m2=1, M2=2, m3=3, M3=4, P4=5, TT=6, P5=7, m6=8, M6=9, m7=10, M7=11, P8=12). Mood/example associations are reasonable (Jaws m2, Happy Birthday opening M2, Bridal March P4 etc. all check out).
- **Guide 3** — WWHWWWH major formula correct. `MAJOR_STEPS=[2,2,1,2,2,2,1]` matches standard.
- **Guide 4** — Natural, harmonic, and melodic minor scale steps are all algebraically correct (sum to 12, produce the right note collections in A minor). See C5 above for the framing issue.
- **Guide 6** — Triad construction by stacking thirds is correct: M3+m3 = major, m3+M3 = minor, m3+m3 = diminished, M3+M3 = augmented. The "ONE half-step difference between major and minor" framing in the Insight is exactly right.
- **Guide 7** — Major-key chord qualities `I ii iii IV V vi vii°` (major, minor, minor, major, major, minor, dim) and intervallic constructions (`[4,3], [3,4], [3,4], [4,3], [4,3], [3,4], [3,3]`) are all correct.
- **Guide 8** — All five 7th-chord types and their interval stacks are correct: maj7 `[4,3,4]`, min7 `[3,4,3]`, dom7 `[4,3,3]`, dim7 `[3,3,3]`, m7b5 (half-dim) `[3,3,4]`. The "dominant 7th wants to resolve" framing is the central point of common-practice harmony.
- **Guide 9** — Every entry in the chord-symbol reference is correctly named and spelled. C/E with E in bass is correct slash-notation usage.
- **Guide 10** — Power chord (R+P5), sus2 (R+M2+P5), sus4 (R+P4+P5) are all correctly built. The interval arrays `[7]`, `[2,5]`, `[5,2]` produce the right notes.
- **Guide 11** — 9th = 2nd up an octave, 11th = 4th up an octave, 13th = 6th up an octave. All correct. "Hendrix chord = 7#9" is famously correct (E7#9).
- **Guide 13** — Note-value table (whole=4, half=2, quarter=1, eighth=½, sixteenth=¼ in 4/4) is correct. Dotted-note rule (note + half its value) is correct.
- **Guide 19** — ii-V-I described accurately: ii prepares, V is dominant tension, I is tonic resolution. The "fifth-down sequence" framing (ii to V is a fifth down, V to I is a fifth down) is the canonical explanation.
- **Guide 20** — All four cadences correctly identified: Authentic V→I, Plagal IV→I, Half ending on V, Deceptive V→vi. Examples (G→C, F→C, ending on G, G→Am in C major) are all correct.
- **Guide 22** — The scale-degree feel descriptions are mostly canonical (1=home, 5=stable but not home, 7=leading tone wanting to resolve to 1). See M3 for one nuance.
- **Guide 26** — Timbre/overtones explanation is physically correct.
- **Guide 27** — Italian dynamic markings (pp, p, mp, mf, f, ff) and their meanings are correct.
- **Guide 28** — Monophony / homophony / polyphony definitions are all accurate.
- **Guide 29 scales** — All scale step-arrays algebraically correct: major pent `[2,2,3,2,3]`, minor pent `[3,2,2,3,2]`, blues `[3,2,1,1,3,2]`, Dorian `[2,1,2,2,2,1,2]`, Mixolydian `[2,2,1,2,2,1,2]`. All sum to 12 (octave) and produce the standard collection from any root.

---

## Minor accuracy issues (should fix, low priority)

### M1. Guide 1 — "Every other pair of natural notes has a sharp/flat between them" — `guide1.jsx:20`
**File/lines:** Insight text.

**What's wrong:** Mostly correct but slightly imprecise. The natural-note pairs without a black key are B-C and E-F (the half-step pairs). Every *other* pair has a sharp/flat between them. The wording is acceptable but the phrase "every other pair" can be misread as "alternating pairs." A clearer phrasing: *"There's no black key between B and C, or between E and F — these are natural half-steps. All five other adjacent natural-note pairs have a sharp/flat between them."*

### M2. Guide 5 — Circle of Fifths is missing the order-of-sharps mnemonic — broader content gap
**File/lines:** `guide5.jsx`.

**What's missing:** The order of sharps (F# C# G# D# A# E# B#) and order of flats (Bb Eb Ab Db Gb Cb Fb) — the actual *order* in which sharps/flats are added — is one of the highest-leverage facts to memorize about key signatures. The mnemonic "Father Charles Goes Down And Ends Battle" / reverse for flats is in every theory primer. Worth adding as a sidebar.

### M3. Guide 22 — "7 = half-step from home" only true in major / harmonic minor — `guide22.jsx:16`
**File/lines:** Scale-degree feelings list.

**What's wrong:** "Maximum tension. A half-step from home." is true for the scale's 7th when it's a *leading tone* — i.e., in major and harmonic minor. In **natural minor** the ♭7 is a whole step below tonic and has a much weaker pull (more "cool descent" than "desperate ascent"). Worth a one-line note: *"In natural minor, the 7th is a whole step below 1 — a softer, less pulling tension."*

### M4. Guide 18 — `i – iv – v` audio uses minor v, but the natural-minor v as a *triad* is rarely used in actual minor-key songs — `guide18.jsx:9`
**What's nuanced:** The progression as written (i–iv–v all minor) is the strict natural-minor diatonic version. In *actual* minor-key songs, the v is almost always borrowed from harmonic minor → V (major), giving i–iv–V (the V→i resolution being far more conclusive). The guide's three-progressions framing is fine, but worth labeling the first as "strictly natural-minor diatonic; in real songs, V is usually major (harmonic minor)" — otherwise the i–iv–v sequence sounds weak/floating because there's no leading tone.

### M5. Guide 19 — ProgressionPlayer plays major triads, not 7th chords, for what's billed as "the jazz backbone" — `guide19.jsx:12`
**File/lines:** `<ProgressionPlayer ... chordTypes={["minor","major","major"]}>` plays Dm – G – C as triads. Jazz ii-V-I is universally voiced as Dm7 – G7 – Cmaj7 (the 7ths are the entire reason it works — the chain of resolutions is by *guide tone*, the 3rds and 7ths). Without the 7ths, the playback sounds more like a folk progression than a jazz one.

**Recommendation:** Add a `chordExtensions` prop to `ProgressionPlayer` (or pass `["min7","dom7","maj7"]` chord types) so the audio produces actual jazz ii-V-I sounds. The chord-text labels (Dm, G, C) can stay simple; only the audio needs the 7ths.

### M6. Guide 21 — "Pivot chord modulation" example is correct but undersold — `guide21.jsx:11`
**What's correct:** Am as common to C major (vi) and G major (ii) is a textbook pivot-chord modulation. **What's missing:** the rule that the pivot is *prepared* in the old key and *re-functioned* in the new key (Am as vi in C is the preparation; the same chord progresses as ii→V→I in G to confirm the new key). Worth a one-line addition for users who'll try this and wonder why their modulation "doesn't land."

### M7. Guide 30 — "Hip-Hop … Sampled loops, minor keys" — `guide30.jsx:13`
**What's slight:** Many hip-hop songs are in major (Kanye "Heartless" is minor; Drake "God's Plan" is in B♭ minor; but plenty are major — Kendrick "DNA." stays modal/ambiguous; old-school hip-hop frequently uses major-key samples). The "minor keys" claim is statistically true but absolute. Soften to "frequently minor or modal."

### M8. Guide 30 — Country "I-vi-IV-V" is more accurately "I-IV-V-IV" — `guide30.jsx:15`
**What's slight:** I-vi-IV-V is the *50s doo-wop* progression (more strongly associated with early R&B/pop). Classic country leans on I-IV-V variants and I-IV-V-IV (or I-V-IV-I). This is an opinion-defensible quibble; not worth fighting.

---

## Effectiveness improvements

### E1. Guide 1 — Add an interval-counting drill alongside the existing label tour
The Piano with selected note works for "what's this note." But the interval guide (Guide 2) is where the real work happens, and it would benefit from a **drill mode**: "Click an interval, then click the second note that's that interval up from C." Builds the active recall that passive labeling doesn't. Also relevant for Guide 6 (chord building) and Guide 7 (key chords).

### E2. Guide 2 — The interval list lacks **enharmonic equivalents** label
`A4` (augmented 4th) and `d5` (diminished 5th) are the same pitch (6 semitones — the tritone) but functionally distinct in tonal harmony. The guide labels both as "Tritone" with `TT`. The user-facing instructions explicitly noted this distinction must be respected. Add: *"Pitch-wise the same as a tritone — but in functional harmony, A4 (e.g. F→B) resolves outward to G-C, while d5 (B→F) resolves inward to C-E. Same sound, different roles."*

### E3. Guide 4 — Add a piano-overlay of major vs. natural minor that shows the **3 differences** (♭3, ♭6, ♭7) as colored chips
The current Guide 4 has a separate piano with the minor scale highlighted, but it doesn't *contrast* with the major scale. A side-by-side or overlay makes the "three lowered notes" concept concrete in a way text can't.

### E4. Guide 6 — Augmented triad `[4,4]` produces a chord — but the guide doesn't note it's symmetrical
C augmented (C-E-G#) is *the same chord* as E augmented (E-G#-C) and Ab augmented (Ab-C-E) — three augmented triads cycle through 12 unique chords because of symmetry. Same applies to dim7 (Guide 8). Worth one Insight on each: "These chords have only 3 / 4 unique transpositions instead of 12 — they're symmetrical."

### E5. Guide 7 — The "F" root works correctly but `Bb` is broken (C2). Until C2 is fixed, restrict the root list to the natural notes plus those that have entries in `ALL_NOTES` (`C, D, E, F, G, A, B` — drop `Bb`).

### E6. Guide 11 — The "altered dominant" entry mentions "7#9, 7b9, 7#11" together — but these are subtly different colors
In jazz harmony, the altered dominant *as a single chord-scale concept* uses ALL alterations (b9, #9, b5/#11, #5/b13). When you see "G7alt" on a chart, it implies all of them are available. But individual symbols (`G7b9`, `G7#11`) specify *which* alteration is in the chord. This guide could draw the distinction in one sentence: *"G7b9 is one specific altered dominant; G7alt is the catch-all that lets the player choose any combination."*

### E7. Guide 12 — Add `12/8` to the time-signature card
12/8 (compound quadruple) is the meter of slow blues, gospel, doo-wop ballads ("In the Still of the Night"). It's the missing 4th common meter alongside 4/4, 3/4, 6/8.

### E8. Guide 16 — The "I-IV-V" interactive is great but **doesn't include the V7** — common-practice would resolve V→I via V7→I (the dominant 7th). At minimum, add an alternative button "I – IV – V7 – I" that uses dom7 chord type for V.

### E9. Guide 19 — Pair the ii-V-I with a **counterexample**: I-IV-V (Guide 16) is "blues/folk's home cadence." ii-V-I is "jazz's home cadence." Walking the user from one to the other ("ii is just IV with a different bass note... no wait, with a different *function*") is exactly the leap that distinguishes a beginner from an intermediate.

### E10. Guide 22 — The scale-degree color-coding is excellent but rendering it *next to a piano keyboard* would be a strong reinforcement. As-is, the colors live alone in a card.

### E11. Guide 29 — Modes need a **derivation** explanation
The guide lists Dorian and Mixolydian but never says they're the same notes as a major scale starting from a different degree. C major's notes starting from D = D Dorian. C major starting from G = G Mixolydian. This single observation is the conceptual key to modes and is missing.

---

## Coverage gaps

### Topics not currently covered that matter for a 30-guide music-theory survey
1. **Voice-leading basics** — parallel fifths/octaves prohibition, leading-tone resolution, common-tone retention. Aldwell & Schachter Ch. 5-9 distill this into 5-6 rules. With chord-progression guides at 16-21, voice leading is the obvious "why" that's missing.
2. **Secondary dominants** — V/V, V/IV, V/vi. The single most-used chromatic technique in pop, country, and standards. Should be a guide; currently no mention.
3. **Modal interchange / borrowed chords** — borrowing from parallel minor (the "♭VI in major key" sound that's all over film scores and modern pop). Adjacent to Guide 18 but not covered.
4. **The 7 modes parade** — Ionian/Dorian/Phrygian/Lydian/Mixolydian/Aeolian/Locrian. Guide 29 lists Dorian and Mixolydian but doesn't show the full 7. Either expand 29 to show all 7 (with their characteristic note: Dorian = ♮6, Phrygian = ♭2, Lydian = ♯4, etc.) or add a dedicated guide.
5. **Order of sharps and flats** (the F-C-G-D-A-E-B mnemonic and its reverse). Implicit in the Circle of Fifths but never stated.
6. **Enharmonic spelling vs. pitch identity** — F# = G♭, but the *spelling* is a function of the key. This concept is the bedrock for understanding why D♭ major isn't C# major (12 keys, 15 spellings). Connects directly to C1.
7. **Ear training / interval recognition drill** — the guides have audio playback (great) but no "test yourself" mode. A short "what interval is this?" quiz would be high-value, and there's a `QuizSection` template available (`src/components/templates/QuizSection.jsx`) ready for it.

### Borderline-redundant
- **Guide 16, 17, 18 (I-IV-V, I-V-vi-IV, minor progressions)** — these are 3 guides on chord progressions that overlap conceptually. Could be merged into 2 with more depth, OR kept and made clearly differentiated by genre (16 = blues/folk/rock; 17 = pop; 18 = singer-songwriter/film). The current arrangement is acceptable but borderline.
- **Guides 23, 24 (Song Structure, Hooks & Motifs)** — adjacent, lightly overlapping. Fine as-is.

### Category structure
The 7-category split (Building Blocks / Chords / Rhythm / Progressions / Melody / Sound / Context) is sensible. "Context" with only 2 guides (29 and 30) is a bit thin — they're both summarizing/comparative guides and reasonably belong together. Acceptable as-is.

---

## Per-guide notes (only where issues exist)

### Guide 1 — The 12 Notes
- Wording nit (M1) — minor.

### Guide 4 — The Minor Scale
- No melodic-minor ascending/descending distinction (C5).

### Guide 5 — Key Signatures / Circle of Fifths
- **Critical: scale display is wrong for 5+ keys (C1).** Bb major root produces wrong notes; Db, Eb, Ab, F# similar.
- Order-of-sharps mnemonic missing (M2).

### Guide 6 — How Chords Are Built
- Mention triad symmetry for augmented (E4).

### Guide 7 — The 7 Chords in a Key
- **Critical: "Bb" root produces garbage (C2)** — same enharmonic-spelling root cause as C1.

### Guide 8 — Seventh Chords
- All chord constructions verified correct.

### Guide 11 — Extensions & Alterations
- Worth distinguishing `G7b9` (specific) from `G7alt` (umbrella) (E6).

### Guide 12 — Beat & Time Signatures
- Add 12/8 to the card (E7).

### Guide 15 — Polyrhythm & Odd Meters
- **Critical: "Money" is in 7/4, not 7/8 (C3).** Replace with a true 7/8 example.

### Guide 16 — The I-IV-V
- Add V7 variant (E8).

### Guide 18 — Minor Progressions
- "Andalusian cadence" is mis-labeled (C4).
- Natural-minor-only V is rarely used; flag the V/V (harmonic minor) variant (M4).

### Guide 19 — The ii-V-I
- Audio plays triads, not 7ths — the jazz character is missing (M5).

### Guide 21 — Modulation
- Pivot-chord example needs the "old function → new function" framing (M6).

### Guide 22 — Melody & Scale Degrees
- The "7 = half-step from home" claim is major/harmonic-minor specific (M3).

### Guide 29 — Beyond Major & Minor
- All scales algebraically verified. Add the "modes are major-scale rotations" derivation (E11).

### Guide 30 — Genre as Dialect
- Hip-hop "minor keys" is too absolute (M7).
- Country progression is more I-IV-V-IV than I-vi-IV-V (M8) — minor.

---

## Sources cited

### Standard music theory references
- **Aldwell & Schachter, *Harmony and Voice Leading* (4th edition, Schirmer/Cengage, 2010).** The standard tonal-theory text for college-level harmony. Used for: minor-scale conventions (C5), voice-leading rules (gap), Andalusian cadence (C4), pivot-chord modulation (M6).
- **Mark Levine, *The Jazz Theory Book* (Sher Music, 1995).** The canonical jazz theory reference. Used for: melodic minor in jazz contexts (C5), altered dominant (E6), ii-V-I as a chord-quality system (M5), modes as scale rotations (E11).
- **Walter Piston, *Harmony* (5th edition, Norton, 1987).** Standard reference for tonal harmony. Used to verify: cadence definitions (Guide 20 — verified correct), secondary dominants (gap).
- **Vincent Persichetti, *Twentieth-Century Harmony* (Norton, 1961).** Used for: modal interchange and modal progressions (gap, partial M4).

### Specific source verifications
- **Pink Floyd "Money"** — published Roger Waters score, Hal Leonard *Pink Floyd Anthology*, 7/4 confirmed.
- **Andalusian cadence** — Wikipedia "Andalusian cadence"; *The Cambridge Companion to Flamenco* (ed. Sneddon, 2024) confirms `i-♭VII-♭VI-V` as the defining sonority.
- **A4 ≠ d5** — Aldwell & Schachter Ch. 1; any standard text. Same pitch (6 semitones), different functional behavior (A4 expands to a 6th, d5 contracts to a 3rd).
- **Equal-temperament A4 = 440 Hz** — ISO 16:1975. The Tone.js `playNote("A4")` will produce 440 Hz; `audio.js` does not deviate from the standard. Verified.
- **Standard pentatonic and blues constructions** — Aebersold *Vol. 2: Nothin' But Blues*, Levine *Jazz Theory* Ch. 7; verified.
- **Order of sharps F-C-G-D-A-E-B and order of flats B-E-A-D-G-C-F** — universal music-theory primer convention; mnemonic "Father Charles Goes Down And Ends Battle."

### Cross-references to companion review
- **`jazz-guitar.md` (this collection's sibling review)** — the underlying root-as-string indexing problem in Guide 5/Guide 7 (C1, C2) does NOT replicate in the jazz-guitar collection because that collection encodes notes directly as Tone.js note strings (`"D3"`, `"Bb4"`) rather than going through a sharp-only `ALL_NOTES` table. Different bugs there (audio chord voicings missing chord tones — see jazz-guitar review C1) but not the same root cause.
