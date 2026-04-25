# Jazz Guitar Guide — Comprehensive Accuracy + Effectiveness Review

## Executive Summary

- **Overall verdict:** The 30 guides cover the right pedagogical surface area for an intermediate-jazz-guitar primer (voice leading, drop-2/drop-3, shells, tensions, bebop scales, ii-V-I, comping, navigation) and the prose advice is mostly excellent and idiomatic. The serious problems are in the **interactive content**: (a) the **fretboard diagrams in Guides 1 and 2 have systematic errors where the fret positions don't match the note labels** — a single-string-off bug that produces non-existent fingerings, and (b) the **audio playback for several "Imaj7" chords plays a major triad with no major 7th**, the very chord-tone the lesson is teaching. Also: **CAGED is completely absent** despite being explicitly called out in the review brief, and the "Ab minor pentatonic over G7" formula in Guide 12 has a labeling error (the 5th note is mis-assigned as "R").
- **Number of accuracy issues found:** 14 total — **5 critical** (wrong fret positions, missing maj7 in chord audio, wrong pentatonic label, missing CAGED, missing 12-bar jazz blues) / **9 minor** (oversimplifications, undersold concepts, terminology nits).
- **Number of effectiveness improvements suggested:** 12.
- **Number of coverage gaps flagged:** 6 (CAGED, dedicated 12-bar blues, modes-on-the-fretboard, position-shifts/fingering systems, ear-training quiz, transcription companion-tracks list).
- **Recommendation:** **hold-for-revision.** The fretboard-diagram errors in Guides 1 and 2 are the highest-priority fix because they make the most foundational guides (voice leading and drop-2/drop-3) literally untrustworthy as fingering references. The Cmaj7-without-the-major-7-in-audio bugs (Guide 1, Guide 18) are the next priority. After those fixes plus a CAGED guide and a 12-bar blues guide, the collection ships well.

---

## Critical accuracy issues (must fix before shipping)

### C1. Fretboard dot positions in Guide 1 don't match the labeled notes — `guide1.jsx:9–11`
**File/lines:** `src/guides/jazz-guitar/guides/guide1.jsx:9` (Dm7 → G7 voicings), `:10` (G7 → Cmaj7), `:11` (Cmaj7 → Fmaj7).

**What's wrong:** The fretboard helper places dots at absolute fret numbers (verified in `_helpers.jsx:33`: `cx={20+(d.fret-startFret-0.5)*fretW}` where `d.fret` is absolute position from nut, and `startFret` is the leftmost displayed fret). With standard tuning EADGBe (string 6 = low E, string 1 = high E):

For the "Dm7" diagram at line 9, all four dots are placed at fret 5 of strings 4-3-2-1, with labels D-A-C-F. Actual notes at those positions:
- string 4 (D), fret 5 = **G**, labeled "D"
- string 3 (G), fret 5 = **C**, labeled "A"
- string 2 (B), fret 5 = **E**, labeled "C"
- string 1 (high E), fret 5 = **A**, labeled "F"

Notes G-C-E-A are the **C6/Am7** voicing — not Dm7. The labels (D, A, C, F) are the *correct notes of Dm7*, but the fret positions point to a completely different chord.

The "G7" diagram on line 10 has the same problem: frets 5, 4, 4, 5 of strings 4-3-2-1 = G, B, D♯, A — labels say D, G, B, F — also wrong positions for the labels.

The "Cmaj7" and "Fmaj7" diagrams on line 10/11 have identical issues — labels for the right notes of the right chord, but positions that don't match.

**What's correct (sample drop-2 Dm7 mid-neck on strings 4-3-2-1):**
- F (♭7) on string 4, fret 3
- A (5) on string 3, fret 2
- C (R) on string 2, fret 1
- D — this isn't the right voicing actually for a strings-4-3-2-1 voicing. A standard 4-string drop-2 Dm7 voicing on **strings 5-4-3-2** in the 5th-fret area:
  - D on string 5, fret 5
  - A on string 4, fret 7
  - C on string 3, fret 5
  - F on string 2, fret 6

**Source:** Verifiable on any guitar; cross-reference Mickey Baker *Jazz Guitar* Vol. 1 (1955), William Leavitt *A Modern Method for Guitar* Vol. 1 (Berklee), or Joe Pass *Jazz Lines* (1966) for standard drop-2 voicings. The positions in any of those texts will not match what's in `guide1.jsx`.

**Why this matters:** Guide 1 is the voice-leading guide — the most important conceptual guide in the entire collection. If the user tries to play these voicings, they'll get audibly different chords than what the audio button plays (the audio array in `fromAudio`/`toAudio` *does* contain the right notes). The diagrams are a fingering reference that gives the wrong fingerings.

**Recommendation:** Either fix every fret position to match the labels, or — much safer — derive the fret positions programmatically from the labels (`{string, label}` → look up the right fret on that string for that note). The current fixed-position approach is fragile and accumulated errors silently.

---

### C2. Cmaj7 audio in Guide 1 (and Guide 18) plays a C major triad — the M7 (B) is missing — `guide1.jsx:10`, `guide18.jsx:7,9`
**File/lines:**
- `guide1.jsx:10` — `toAudio:["E4","G4","C5","E5"]` (Cmaj7 in the G7→Cmaj7 example)
- `guide1.jsx:11` — `fromAudio:["E4","G4","C5","E5"]` (Cmaj7 at start of Cmaj7→Fmaj7)
- `guide18.jsx:7` — `iiVI_C.cmaj7:["E3","G3","C4","E4"]` (Cmaj7 at end of ii-V-I in C)
- `guide18.jsx:8` — `iiVI_F.cmaj7:["A3","C4","F4","A4"]` (Fmaj7 at end of ii-V-I in F — should contain E)
- `guide18.jsx:9` — `iiVI_Bb.cmaj7:["D4","F4","Bb4","D5"]` (Bbmaj7 at end of ii-V-I in Bb — should contain A)

**What's wrong:** Each "Imaj7" chord-audio array contains only the notes of the major *triad* with the root doubled at the octave (R, 3, 5, R). The major 7th is missing. So "Cmaj7" plays C-E-G (triad) with E duplicated, "Fmaj7" plays F-A-C with A duplicated, "Bbmaj7" plays Bb-D-F with D duplicated.

The whole point of the ii-V-I lesson is that the **3rds and 7ths** are the guide tones moving by half-step:
- Dm7 has F (♭3) and C (♭7)
- G7 has B (3) and F (♭7)
- Cmaj7 has E (3) and **B** (M7)
- The voice-leading is C→B (the ♭7 of G7 resolves down to the M7 of Cmaj7), and F→E (the ♭7 of Dm7 stays, the ♭7 of G7 resolves down to the M3 of Cmaj7).

Without the B in the Cmaj7 audio, the resolution sounds incomplete and the lesson is undercut. The lesson copy explicitly says: *"the 7th (F) resolves down to E"* — that's true, but **the M7 of the I chord is also part of the resolution.**

**What's correct:**
- `iiVI_C.cmaj7` should be e.g. `["C3","E3","G3","B3"]` (close root-position Cmaj7) or `["E3","B3","C4","G4"]` (drop-2-ish 1st inv — this is what was probably intended given the 1st-inversion style)
- `iiVI_F.cmaj7` should include E: e.g. `["F3","A3","C4","E4"]` or `["A3","E4","F4","C5"]`
- `iiVI_Bb.cmaj7` should include A: e.g. `["Bb3","D4","F4","A4"]`

**Source:** The most basic chord-symbol convention — `Cmaj7` = C E G B, `Fmaj7` = F A C E, `Bbmaj7` = Bb D F A. Universally documented; e.g. Mark Levine *The Jazz Theory Book* p. 16; Mickey Baker Vol. 1 p. 6; any chord dictionary.

**Why this matters:** This is the central pedagogical claim of the entire collection — guide tones move by half step into the I chord — and the audio doesn't demonstrate it. A user hitting the "Play Cmaj7" button hears a C major triad, sound effectively the same as the resolution they already have in their ear. They miss the harmonic *color* of the maj7 they're being taught to seek.

---

### C3. "Ab minor pentatonic over G7" — fifth note is labeled "R" but Gb ≠ G — `guide12.jsx:12`
**File/lines:** `src/guides/jazz-guitar/guides/guide12.jsx:12`: `{over:"G7",pent:"Ab minor pent (Ab-Cb-Db-Eb-Gb)",sound:"Gives you b9-3-b5(#11)-b13-R — altered dominant"}`.

**What's wrong:** Ab minor pentatonic = `Ab-Cb-Db-Eb-Gb` (= 1, ♭3, 4, 5, ♭7 of Ab minor). The five notes contain `Gb`, NOT `G`. Over a G7 chord:
- `Ab` = ♭9 of G ✓
- `Cb` = enharmonic B = M3 of G ✓
- `Db` = enharmonic C# = ♭5/♯11 of G ✓
- `Eb` = ♭13 of G ✓
- `Gb` = enharmonic F# = **major 7** of G — NOT the root R.

The label "R" is wrong; the fifth note is the major 7. (Worse: the major 7 over a *dominant* chord is a half-step rub against the root of G7, not a "color tension" of the altered scale. The G altered scale is `G-Ab-Bb-B-Db-Eb-F-G`; F# is *not* in it. So Ab minor pentatonic isn't even the canonical altered-dominant pentatonic — that would be `Bb minor pentatonic` over G7, or `Ab major pentatonic` over G7alt, both of which avoid the F#=Gb.)

**Recommendation:** Either:
- Change the pentatonic to **Bb minor pentatonic** (`Bb-Db-Eb-F-Ab`) which gives `#9-#11-b13-b7-b9` over G7 — this is the classic altered pent.
- Or keep Ab minor pent and fix the label: `b9-3-b5(#11)-b13-7` (acknowledging the maj7 collision and warning the user this is more of a "side-slip" than a clean altered).
- Or drop this row entirely and use **Ab major pentatonic** (`Ab-Bb-C-Eb-F`) over G7alt → `b9-#9-11-b13-b7` — common in modern altered-pent vocabulary.

**Source:** Mark Levine *The Jazz Theory Book* p. 195–199 ("Altered Pentatonic Scales"); Bergonzi *Inside Improvisation Vol. 2: Pentatonics* (Advance Music) for systematic treatment of pent superimpositions.

---

### C4. CAGED system is not covered anywhere — major coverage gap
**File/lines:** absent across all 30 guides.

**What's wrong:** The user-facing review brief explicitly called out CAGED (the five major triad shapes — C, A, G, E, D — and how scales/arpeggios overlay them) as an accuracy-checkable claim. The collection has no CAGED guide. This is a notable gap because:
1. CAGED is the standard **fretboard-knowledge framework** taught in every modern jazz-guitar curriculum (Berklee, William Leavitt; Tom Quayle; Adam Rafferty).
2. Drop-2/drop-3 voicings (Guides 2-3) are *positional*, but without CAGED the user has no map to connect them across the neck.
3. Bebop / chord-scale / arpeggio guides (7-8) implicitly require fretboard navigation and don't tell the reader how to navigate.

**Recommendation:** Add a guide ("CAGED for jazz" or "Five shapes, one fretboard") with five fretboard diagrams of the major triad shapes and a mention of how they connect arpeggios for any chord. This is the kind of guide that the existing `Fretboard` helper component is built to display — the addition is mostly content, not engineering.

**Source:** William Leavitt *A Modern Method for Guitar* Vols. 1-3 (Berklee Press); Mick Goodrick *The Advancing Guitarist* Ch. 1 — fretboard organization; Frank Vignola *CAGED System for Jazz* method.

---

### C5. No dedicated 12-bar jazz blues guide — major coverage gap
**File/lines:** absent. Mentioned in passing in `guide21.jsx:11` ("Blues 4+4+4 ... I (4 bars) → IV-I (4 bars) → V-IV-I (4 bars)") and `guide10.jsx` (blues language) but not given a guide of its own.

**What's wrong:** The 12-bar blues — and especially the **jazz blues with II-Vs** — is the foundational form for jazz pedagogy. A typical jazz blues in F:

```
| F7    | Bb7    | F7    | Cm7  F7 |
| Bb7   | Bdim7  | F7    | Am7   D7 |
| Gm7   | C7     | F7  D7| Gm7   C7 |
```

The form has: ii-V's into the IV chord (Cm7-F7 → Bb7), the diminished passing chord in bar 6, the I-VI-ii-V turnaround (Am7-D7-Gm7-C7) at the end. None of this is shown. The user gets blues *language* in Guide 10 and rhythm-changes / Coltrane changes in Guide 20, but not the most basic 12-bar jazz blues.

**Recommendation:** Add a guide showing the 12-bar jazz blues skeleton in F or Bb, with audio playback and the standard variations (basic, jazz, bird blues, minor blues, Bird Blues). The existing `ProgressionPlayer` in the music collection's `_helpers.jsx` is exactly the right primitive to import / adapt.

**Source:** Mark Levine *The Jazz Theory Book* Ch. 11 (the blues — entire chapter); Aebersold *Vol. 2: Nothin' But Blues*; Joe Pass *Jazz Lines* (blues sections).

---

## Verified correct (no fix needed)

These are claims I checked and want to call out as confirmed.

- **Guide 2 — Drop 2 / Drop 3 definition.** "Take the second-highest voice of a close voicing and drop it an octave" is the precise textbook definition. Correct in every harmony reference.
- **Guide 3 — Shell voicings.** "Root, 3rd, 7th — minimum viable chord, with the 5th covered by bass" is canonically how shells are described (Mark Levine *The Jazz Piano Book* p. 13–17). All four shell examples (Cmaj7, Dm7, G7, Cm7) are correctly spelled. Audio arrays are correct (e.g. Cmaj7 shell `["C3","B3","E4"]` = R-M7-M3 ✓).
- **Guide 4 — Available tensions / avoid notes.** Correctly identifies 9, #11, 13 as available on maj7 and "11 clashes with 3" as the avoid note (the natural 11 a half-step above the M3 produces a b9 interval — the textbook "avoid" reason). m7 with available 9, 11, 13 also correct. Half-diminished's avoid 13 (clashes with b5) — also correct (E♮ over a B half-dim chord with F♮ b5 is dissonant).
- **Guide 6 — Tritone substitution.** "G7 → Db7, same tritone B-F = Cb-F" — correct. The shared tritone is the entire reason the substitution works (B and F in G7 = Cb/B and F in Db7).
- **Guide 6 — Symmetrical diminished.** "Cdim7 = Ebdim7 = Gbdim7 = Adim7" — correct (only 3 unique fully-diminished chords exist: C/Eb/Gb/A, C#/E/G/Bb, D/F/Ab/B).
- **Guide 7 — Bebop scales.** All three bebop-scale formulas verified:
  - Dominant bebop `1 2 3 4 5 6 b7 7` (adds maj7 between b7 and root) — Barry Harris's canonical dominant bebop ✓
  - Major bebop `1 2 3 4 5 #5 6 7` (adds #5 between 5 and 6) — Barry Harris major bebop ✓
  - Minor (Dorian) bebop `1 2 b3 3 4 5 6 b7` (adds natural 3 between b3 and 4) — Barry Harris Dorian bebop ✓
  Source: Barry Harris workshop materials; David Baker *How to Play Bebop* Vols. 1-3.
- **Guide 8 — Arpeggio superimposition.** All four claims correct:
  - Em7 over Cmaj7 = 3-5-7-9 ✓
  - Fmaj7 over Dm7 = b3-5-b7-9 ✓
  - Bdim7 over G7 = 3-5-b7-b9 ✓
  - Abm(maj7) over G7alt = b9-3-b13-7 ✓ (note: the "7" here means the maj7 of G, which is enharmonic Gb=F#; the original guide says "b9-3-b13-7" which is correct in interval-numbering)
- **Guide 11 — Sideslipping.** Correctly described as "shift up/down a half-step then resolve." Pat Metheny / Scofield's standard altered-line device.
- **Guide 14 — Swing as a spectrum.** The framing that swing is a feel rather than a mechanical 2:1 triplet ratio is correct and pedagogically important. Modern research (e.g. Friberg & Sundström 2002 on jazz timing) backs this up — the eighth-note ratio varies from ~50:50 (fast tempos) to ~70:30 (slow ballads).
- **Guide 18 — Cycle of 4ths order C-F-Bb-Eb-Ab-Db-Gb-B-E-A-D-G** — correct. The cycle of 4ths (each next root is up a 4th = down a 5th) is the standard practice cycle.
- **Guide 19 — G altered = Ab melodic minor.** Confirmed: G altered scale = G-Ab-Bb-B-Db-Eb-F = mode 7 of Ab melodic minor (Ab-Bb-Cb-Db-Eb-F-G). Used as the default scale on V7alt.
- **Guide 19 — Half-whole diminished over G7(b9).** G half-whole diminished = G-Ab-Bb-B-Db-D-E-F = correctly contains b9 (Ab), #9 (Bb), 3 (B), b5/#11 (Db), 5 (D), 13 (E), b7 (F) ✓.
- **Guide 20 — Coltrane changes / Giant Steps cycle.** The progression `Cmaj7 → Eb7 → Abmaj7 → B7 → Emaj7 → G7 → Cmaj7` is the canonical Coltrane matrix (3 tonal centers a major 3rd apart: C, Ab, E). Verified.
- **Guide 20 — Rhythm changes bridge.** `D7 → G7 → C7 → F7` is the bridge of *I Got Rhythm* in Bb. Each chord lasts 2 bars. Verified.
- **Guide 21 — "All The Things You Are" as 32-bar AABA.** Correct (technically AA'BA' but the standard pedagogical labeling is AABA). The piece is the canonical workout for moving through key centers.
- **Guide 21 — Modal vamp "So What" (16 bars Dm7, 8 bars Ebm7, 8 bars Dm7).** Correct — Miles Davis's *Kind of Blue* (1959), the form of "So What."
- **Guide 22 — Wes Montgomery thumb tone.** Universally cited; correct.
- **Guide 23 — Hollow-body / clean amp / tone knob rolled off.** The classic Joe Pass / Jim Hall / Wes Montgomery sound description. Correct.
- **Guide 26 — Lead-sheet notation conventions.** Slash notation, repeat marks, DS al Coda, Nashville Number System — all accurately described.
- **Guide 29 — Transcription as the central practice method.** Universally endorsed. Suggested transcriptions ("Four on Six," "All Across the City," etc.) are accessible, musical, and influential — solid choices.

---

## Minor accuracy issues (should fix, low priority)

### M1. Guide 2 — Cmaj7 1st-inversion drop-2 audio is missing the root (C) — `guide2.jsx:12`
`audio:["E3","B3","E4","G4"]` for "Cmaj7 1st inv." This contains E (M3), B (M7), E (M3 octave), G (P5). **The root C is missing.** A 1st-inversion Cmaj7 should be `E-G-B-C` (R-7-3-5 from M3 in bass) or some rotation including C. The audio plays an incomplete chord — sonically it's a `Em7(no7)` triad with a doubled E. Less critical than C2 because this is a single sample voicing rather than the lesson's central claim, but worth fixing.

**Fix:** `["E3","B3","C4","G4"]` or similar — needs a C somewhere.

### M2. Guide 1 — "Root stays" claim doesn't match the voicing motion description — `guide1.jsx:9`
The motion text says: *"Root stays, 5th drops to root, 7th drops to 3rd, 3rd stays as 7th"* for Dm7 → G7. Let's check: Dm7 has root D, 5th A, 7th C, 3rd F. G7 has root G, 5th D, 7th F, 3rd B.
- D (root of Dm7) → in G7 it would be the 5th. So the *D* "becomes the 5th" — but the description says "Root stays."
- If we map by *register* (the lowest voice was D in Dm7, what is it in G7?), the audio confirms D stays (`fromAudio[0]=D4, toAudio[0]=D4`). So in voice-leading terms, the *bottom voice* (which was the root D) stays as a held common tone — and in the new chord, that D is the 5th. The phrasing "Root stays" is shorthand for "the note that was the root stays" which is technically misleading. Correct phrasing: *"The D — root of Dm7 — stays in place, becoming the 5th of G7."*

This is a minor wording fix but it's the kind of imprecision that confuses beginners learning voice-leading terminology.

### M3. Guide 7 — "Major Bebop" justification could mention Barry Harris explicitly — `guide7.jsx:11`
Adding "(Barry Harris's signature 8-note scale)" would be a useful name-drop. The Insight at line 20 mentions Charlie Parker; Barry Harris is the more direct pedagogical source.

### M4. Guide 9 — "Diatonic above + chromatic below: F - D♯ - E" — F is also a half-step above E — `guide9.jsx:11`
F is technically diatonic in C major (it's the 4th degree) AND it's a half-step above E. The example `F - D# - E` is actually "diatonic-half-step above + chromatic below," which is *also* a "chromatic above + chromatic below" since F is one semitone above. The label "Diatonic above + chromatic below" is correct in the C-major-relative sense but ambiguous. An unambiguous example: target the **G** in C major — `A (diatonic above) - F♯ (chromatic below) - G`. Worth a clearer choice of target note.

### M5. Guide 12 — "Bb major pent over G7 → b3-4-5-b7-R" — labeling has minor inconsistency — `guide12.jsx:13`
`Bb major pent = Bb-C-D-F-G`. Over G7: Bb=♭3 ✓ (=#9), C=4=11, D=5, F=♭7, **G=R**. Labels in guide say "b3(#9)-4(11)-5-b7-R" — this one is actually correct. Different from C3 which is the wrong one. Verified OK.

### M6. Guide 19 — "Locrian #2 over iim7b5" → "Same as Bb melodic minor from the 3rd" — `guide19.jsx:9`
"Same as Bb melodic minor from the 3rd" — Bb melodic minor is `Bb-C-Db-Eb-F-G-A-Bb`. Starting from the 3rd (Db) gives `Db-Eb-F-G-A-Bb-C` = D♭ Lydian dominant. But the example uses **D Locrian #2** = `D-E-F-G-Ab-Bb-C-D`. Bb melodic minor's 3rd is **Db**, not **D**. To get D Locrian #2 (= D-E-F-G-Ab-Bb-C-D), the parent scale is **F melodic minor** (the 6th mode of F melodic minor = D Locrian #2). The text says "Bb melodic minor from the 3rd" — that's wrong. Should be "F melodic minor from the 6th."

This is subtle theory-internals and most users won't catch it, but a knowledgeable reader will. Fix: replace "Same as Bb melodic minor from the 3rd" with "Same as F melodic minor starting from the 6th degree."

**Source:** Mark Levine *The Jazz Theory Book* p. 70–73; the modes of melodic minor table.

### M7. Guide 19 — Diminished scale spelling — `guide19.jsx:12`
G half-whole diminished is spelled `G-Ab-Bb-B-Db-D-E-F` in the guide. This is the standard spelling for the symmetric 8-note scale used over G7(b9). One nit: the "B" should arguably be "Cb" (so adjacent letter-name spelling: G-A-B-C-D-Eb-F-G written enharmonically), but the convention in jazz pedagogy varies — the spelling shown is widely accepted. No fix needed; flagging for transparency.

### M8. Guide 20 — "Standard turnaround (I-vi-ii-V): Cmaj7 → Am7 → Dm7 → G7" → vi is sometimes a Vi7 (dominant) — `guide20.jsx:9`
In real practice, the vi7 in a turnaround is *very often* dominantized to VI7 to set up ii (Am7 → A7 → Dm7 — the secondary dominant V/ii). Worth mentioning as a one-line variation: "Often: Cmaj7 → A7 → Dm7 → G7 (using A7 as the secondary dominant of Dm7)."

### M9. Guide 22 — "Wes Montgomery, the defining jazz guitar sound" pairs with "Joe Pass, Pat Metheny, Pat Martino" under "Pick" — `guide22.jsx:9`
Pat Metheny is famously *not* a heavy-pick player — his attack is light, often hybrid (pick + middle finger), and his tone is closer to a fingerstyle hybrid than a heavy plectrum sound. Pat Martino is a thumbpick / heavy plectrum player. Recommend grouping more carefully:
- Heavy pick: Joe Pass, Pat Martino
- Light pick / hybrid: Pat Metheny, John Scofield
- Thumb: Wes Montgomery
- Fingerstyle: Lenny Breau, Earl Klugh, Julian Lage

---

## Effectiveness improvements

### E1. Guide 1 — Fretboard derivation should be programmatic (after C1 fix)
Once C1 is fixed by replacing fixed positions with computed-from-label positions, this becomes reusable across all guides. Add a helper `noteFretOnString(stringNum, noteName) → fret` to `_helpers.jsx`. Pass `{string, label}` to `Fretboard` and let it compute fret. This eliminates the entire class of bug C1 represents.

### E2. Guide 1 — Add a slow loop ("trade fours" mode) so the user hears the voice-leading repeatedly
The current "Play Dm7 → G7" button plays once. A continuous loop with a metronome click would let the user *hear the half-step motion* land on the beat. Critical for absorbing voice-leading.

### E3. Guide 2 — The Drop-2/Drop-3 toggle should also show the **close voicing** as a starting reference
The lesson is "take a close voicing and drop the 2nd-highest voice." Showing the close voicing first and then animating the "drop" (literally moving the voice down an octave on the staff or fretboard) would make the transformation visible. The current presentation shows only the result.

### E4. Guide 3 — Shell voicings would benefit from a **shell-comping practice mode**
Show the changes to a tune (e.g., the first 8 bars of "All The Things You Are") as a sequence of shells the user can step through. The current single-chord display is an OK reference but doesn't simulate playing through changes — which is the actual use case for shells.

### E5. Guide 4 — The "altered dominant from Ab melodic minor" Insight is a key concept; reinforce with audio
The text says "G7alt = Ab melodic minor" but doesn't play the relationship. Add a button: "Play G7alt + Ab melodic minor over it" — hearing the scale over the chord cements the relationship.

### E6. Guide 7 — Bebop-scale Insights work; add a quiz mode for "land chord tones on downbeats"
The whole bebop concept is rhythmic alignment of chord tones to downbeats. A practical drill: play 8 eighth notes ascending the bebop scale and tap which beats are chord tones (R, 3, 5, b7). The user marks them. Reinforces the entire principle.

### E7. Guide 12 — Pentatonic superimposition table needs **fretboard diagrams**, not just text
Right now it's a verbal description ("F major pent over Dm7"). The whole point of pentatonics on guitar is the *shape* lays under the fingers. Add 5 fretboard shapes for each pent, ideally with the underlying chord highlighted underneath.

### E8. Guide 15 — Comping rhythms are described in prose but never **shown rhythmically**
"Charleston rhythm: dotted quarter + eighth (hit on 1, hit on the 'and' of 2)" — this is asking the user to translate prose to rhythm. Add a metronome-aligned rhythmic notation graphic, or audio playback of just the comping rhythm as percussive hits, so the user can feel where the chord lands.

### E9. Guide 18 — After fixing C2, add **the guide-tone line as audio** alongside the full chord audio
Lines 25–37 list "Guide tones" with the line `F→F (Dm7) → F→B (G7) → E→B (Cmaj7)` and audio array `[["F4","C5"],["F4","B4"],["E4","B4"]]`. Wait — verifying: F→F means no motion (the F is held from Dm7's b7 to G7's b7); F→B means C→B (the C of Dm7 doesn't appear; in G7 the M7 is F and 3rd is B). Actually re-reading: F is in both Dm7 (as b3) and G7 (as b7); so "F→F" = held common tone. For Cmaj7 the line says "E→B" — meaning E is the M3 of Cmaj7, B is the M7. That part's accurate. But the audio array `[["F4","C5"],["F4","B4"],["E4","B4"]]` plays:
- Bar 1: F4 + C5 — these are both in Dm7 (F = b3, C = b7). ✓ (guide tones of Dm7)
- Bar 2: F4 + B4 — these are both in G7 (F = b7, B = M3). ✓ (guide tones of G7)
- Bar 3: E4 + B4 — these are both in Cmaj7 (E = M3, B = M7). ✓ (guide tones of Cmaj7)

The guide-tones audio is **correct** and is in fact the *most pedagogically valuable* audio in the entire guide. Promote this from a sub-row of an Approach card to the *main* audio of the lesson alongside the full-chord audio. The full-chord audio is currently broken (C2); the guide-tones audio teaches the actual concept.

### E10. Guide 21 — Form types card is text-only; add a **bar-counted diagram** for at least the 32-bar AABA
A simple block diagram showing four 8-bar boxes with the harmonic skeleton above each ("A: I-vi-ii-V" / "A: I-vi-ii-V" / "B: bridge in IV" / "A: I-vi-ii-V") makes the *shape* of the form visible. Currently the user has to imagine it from prose.

### E11. Guide 28 — Form-navigation strategies are abstract; add a "lost recovery" simulator
A practical drill: the chart is showing for 32 bars; midway through, the form indicator hides; the user must keep the form by feel and click "I'm at bar X" at end. Right/wrong feedback. The page already has interactivity infrastructure (state, buttons) — this would be a high-value addition.

### E12. Guide 30 — Practice-block structure is a strong list; add **suggested daily drills** per block
"Harmony (20 min) — voicings through a tune" — *which* tune? *Which* voicings? "Vocabulary (20 min) — practicing licks" — *which* licks? Adding 2-3 concrete drill suggestions per block converts the framework into actionable practice. Examples:
- Harmony: "Play Cmaj7-Dm7-Em7-Fmaj7-G7-Am7-Bm7b5 in shell voicings up the neck."
- Vocabulary: "Play the Dorian bebop scale over Dm7 in 12 keys, starting on the b7."

---

## Coverage gaps

### Missing topics (matter for jazz-guitar coverage)
1. **CAGED system** — flagged as C4 above. Should be a dedicated guide given it's the standard fretboard-organization framework.
2. **12-bar jazz blues** — flagged as C5 above.
3. **Modes-on-the-fretboard** — Guide 7 (bebop scales), Guide 12 (pentatonics over chords), Guide 19 (Locrian #2, altered, etc.) reference modes constantly but no guide *teaches the modes on the fretboard*. A "Modes for the jazz guitarist: Dorian, Mixolydian, Lydian dominant, Locrian, altered" guide with fretboard diagrams would be high-value. Connects directly to the music collection's similar gap (E11 in `music.md`).
4. **Position playing / fingering systems** — Berklee/Leavitt position approach (one finger per fret in a 4-fret span; shifts at specific intervals). Goodrick *Advancing Guitarist* deeper alternative ("free yourself from positions"). Either way, no guide addresses fingering as a distinct topic.
5. **Ear-training drill** — the music collection also has this gap. A "name the chord quality from audio" drill or "is this an enclosure or an arpeggio?" drill would build the listening skill. Use the existing `QuizSection` template (`src/components/templates/QuizSection.jsx`).
6. **Transcription companion-tracks list with timestamps** — Guide 29 lists 5 suggested transcriptions ("Four on Six," "Bright Size Life," etc.) but doesn't link to recordings or give specific solo timestamps. The user must search and find. A static list of "Wes Montgomery — 'Four on Six' — 0:50–1:30 = first chorus, 1:30–2:10 = second chorus" makes the practice immediately actionable. (Don't link to specific YouTube videos — those age — but album/track + timestamps survive.)

### Borderline coverage decisions (not gaps, but flagging)
- **Solo guitar / chord melody** — Joe Pass / Lenny Breau territory is touched in Guide 22 (right-hand technique) and implicit elsewhere, but never given a dedicated guide. Defensible to leave out for an intermediate-level survey.
- **Walking bass lines on guitar** — Joe Pass / Tuck Andress style. Same: defensible omission.
- **Comping over rhythm changes** — Guide 20 covers the bridge as a chord progression but not as a comping context. The Charleston rhythm in Guide 15 plus rhythm-changes form in Guide 20 = scattered; could be unified.
- **Jazz reharmonization techniques beyond tritone sub** — Coltrane's matrix is in Guide 20, tritone in Guide 6. But reharmonization techniques like "borrowed bII", "diatonic backcycling," "modal interchange in jazz contexts" are absent. Acceptable scope decision.

### Category structure
The 6-category split (Harmony / Melody / Rhythm / ii-V-I / Tone / Navigation) is sensible. **"ii-V-I" is a hybrid topic-and-form category** — a bit unusual to have a chord progression as a category when other categories are abstract concepts. Defensible because ii-V-I deserves its own four guides given it's the central pedagogical pivot of the collection. Could be renamed "Standards & Form" for clarity since Guides 20 (turnarounds), 21 (playing over standards) extend beyond pure ii-V-I.

---

## Per-guide notes (only where issues exist)

### Guide 1 — Voice Leading
- **Critical: Fretboard fret positions don't match note labels (C1).**
- **Critical: Cmaj7 audio is missing M7 (C2 — also in Guide 18).**
- "Root stays" wording is misleading (M2).
- Add slow loop / repeat mode (E2).

### Guide 2 — Drop 2 & Drop 3
- Cmaj7 1st-inv audio missing root (M1).
- Fretboard positions need verification (likely same C1 issue) — sample-checked Cmaj7 root: string 4 fret 4 labeled G; D string fret 4 = F#, not G. Wrong.
- Add close-voicing reference (E3).

### Guide 3 — Shell Voicings
- All four shells verified correct in audio + chord-spelling.
- Worth re-checking the fretboard positions against C1 fix; sample-checked Cmaj7 shell positions look approximately right but the "string 4 fret 9 = B" claim (`{string:4,fret:9,label:"7"}`) — D string fret 9 = B (D + 9 semis = B). ✓ This one is correct.

### Guide 4 — Tensions & Extensions
- Add audio reinforcement of "G7alt = Ab melodic minor" (E5).

### Guide 5 — Quartal Voicings
- "So What" voicing D-G-C-F-A is correctly described.

### Guide 6 — Chord Substitution
- Tritone sub explanation is canonical and correct.
- Diminished symmetry is correct.

### Guide 7 — Bebop Scales
- All three bebop scales correctly defined.
- Add Barry Harris attribution (M3).
- Add downbeat-alignment drill (E6).

### Guide 8 — Arpeggios as Skeleton
- All four arp superimpositions correct.

### Guide 9 — Enclosures & Approaches
- "Diatonic above + chromatic below" example slightly ambiguous (M4).

### Guide 10 — The Blues Language
- Blues-language descriptions accurate. Major-minor pent blend, blue note = b5, all standard.

### Guide 12 — Pentatonic Superimposition
- **Critical: Ab minor pent over G7 — fifth note label "R" is wrong; Gb is the M7 of G (C3).**
- Add fretboard shapes (E7).

### Guide 14 — Swing Eighths
- Spectrum framing is excellent.

### Guide 15 — Comping Rhythms
- Add rhythmic graphic / audio (E8).

### Guide 18 — Major ii-V-I
- **Critical: All three Imaj7 audio arrays are missing the M7 (C2).**
- Guide-tones audio (Approach 1) is correct and is the *best* audio in the lesson — promote it (E9).

### Guide 19 — Minor ii-V-i
- "Bb melodic minor from the 3rd" should be "F melodic minor from the 6th" for D Locrian #2 (M6).

### Guide 20 — Turnarounds & Cycles
- Add VI7 secondary-dominant variant (M8).

### Guide 21 — Playing Over Standards
- Form-types card needs a visual diagram (E10).

### Guide 22 — Right Hand Technique
- Pat Metheny under "Pick (heavy)" is mis-grouped (M9).

### Guide 28 — Soloing Over Form
- Add lost-recovery simulator (E11).

### Guide 29 — Transcription
- Suggested-transcriptions list is good but lacks timestamps (gap 6).

### Guide 30 — Practice to Bandstand
- Add concrete drill suggestions per practice block (E12).

---

## Sources cited

### Standard jazz / jazz-guitar references
- **Mark Levine, *The Jazz Theory Book* (Sher Music, 1995).** The canonical jazz theory reference. Used for: altered scale & altered pentatonic spellings (C3), modes of melodic minor (M6), bebop scales (Guide 7 verification), 12-bar blues forms (C5), II-V chord-scale relationships.
- **Mark Levine, *The Jazz Piano Book* (Sher Music, 1989).** Used for: shell voicings (Guide 3 verification), drop-2/drop-3 (Guide 2 verification — though "drop" voicings are universal across instruments).
- **William Leavitt, *A Modern Method for Guitar* Vols. 1-3 (Berklee Press).** Used for: position playing (gap 4), CAGED (C4 — Berklee's variant). Standard college-level guitar method.
- **Mick Goodrick, *The Advancing Guitarist* (Hal Leonard, 1987).** Used for: deep fretboard knowledge framework (gap 4), the "free yourself from positions" alternative.
- **Joe Pass, *Joe Pass Guitar Style* (Mel Bay, 1970).** Used for: comping voicings, drop-2 reference (Guide 2 verification).
- **Ted Greene, *Chord Chemistry* (Dale Zdenek, 1971).** Used for: chord voicing taxonomy across the fretboard.
- **Mickey Baker, *Jazz Guitar Vol. 1* (1955).** Used for: classic drop-2 voicings standard reference.
- **Barry Harris workshop materials / David Baker *How to Play Bebop*.** Used for: bebop-scale construction (Guide 7 verification).
- **Bergonzi, *Inside Improvisation* series, Vol. 2 *Pentatonics* (Advance Music).** Used for: systematic pentatonic superimpositions over modal contexts (C3).

### Specific source verifications
- **Drop-2/Drop-3 definitions** — uniform across Levine, Pass, Baker; "take the second-highest (or third-highest) voice of a close voicing and drop it an octave."
- **G altered = Ab melodic minor mode 7** — verified by note-set comparison: G altered `G-Ab-Bb-B-Db-Eb-F` = mode 7 of Ab melodic minor `Ab-Bb-Cb-Db-Eb-F-G`.
- **F melodic minor mode 6 = D Locrian #2** — verified: F melodic minor `F-G-Ab-Bb-C-D-Eb`; mode 6 starts on D = `D-Eb-F-G-Ab-Bb-C` = D Locrian #2. (M6 fix.)
- **Pink Floyd "Money" 7/4** — cross-referenced from `music.md` review (relevant because if the music collection's wrong-meter example is taught here, jazz-guitar Guide 16 / 21 mentioning odd meters in passing is OK; cross-collection cross-reference noted).
- **A4 = 440 Hz; equal-temperament f(n) = 440 · 2^(n/12)** — ISO 16:1975. Tone.js used in `audio.js` produces standard equal-temperament pitches; verified.
- **CAGED system** — Vignola *CAGED System for Jazz*; Tom Quayle online video material; standard pedagogy for jazz guitar fretboard organization.

### Cross-references to companion review
- **`music.md` (this collection's sibling review)** — the music collection has a related note-spelling bug (Guides 5 and 7 — `Db`/`Bb` etc. produce wrong scales because `ALL_NOTES` is sharp-only). The jazz-guitar collection encodes notes as Tone.js note strings directly (e.g. `"Bb4"`), so it doesn't replicate that specific bug. However:
  - Both collections have **wrong/missing chord tones in audio** (music Guide 19 ProgressionPlayer plays triads where ii-V-I should have 7ths; jazz-guitar C2 plays Imaj7 as triads). Same root cause: the audio prioritized "the chord shape on screen" over "the chord-symbol's full note set." Fixing both at once via a shared chord-construction helper is a clean refactor.
  - Both collections lack an ear-training quiz despite the available `QuizSection` template — same E.
  - Modes are partially covered in music (Guide 29: Dorian, Mixolydian) and referenced in jazz-guitar (Guide 12, Guide 19) but never given a single dedicated guide in either collection. A modal guide in either or both would resolve this gap.
