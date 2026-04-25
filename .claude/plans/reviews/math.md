# Math Guide — Comprehensive Accuracy + Effectiveness Review

## Executive Summary

- **Scope identified:** The 32 guides target *everyday math literacy* — a K-12 review through personal finance and statistical thinking. Coverage: number sense (place value, negatives, fractions/decimals/%, ratios, PEMDAS); pre-algebra/algebra-1 (variables, linear equations, inequalities, formulas, functions); plane and solid geometry (area/perimeter, volume/surface area, triangles + Pythagoras, circles, coordinate plane); growth and probability (linear, exponential, logs, sequences, probability basics); descriptive stats and statistical reasoning (M/M/M, spread, graphs, correlation/causation, base-rate fallacy, sampling); personal finance (compound interest, amortization, marginal tax, expected value); and a "math you already do" capstone. Notably absent: scientific notation, log laws, formal conditional probability / Bayes' formula, combinatorics (permutations / combinations / factorial), and inflation / time value of money. No calculus and no formal proof — appropriate for the scope.
- **Overall verdict:** **hold-for-revision.** Most guides are accurate and pedagogically sharp. Three concrete bugs need fixing before shipping: a wrong numerical claim about a mortgage rate spread (Guide 32), a broken Mode calculation that mis-teaches the concept (Guide 21), and a stale + slightly miscoded tax-bracket implementation (Guide 29). Several smaller fixes and one or two coverage gaps round out the list.
- **Number of accuracy issues found:** 14 total — **5 critical** (wrong number, wrong concept, undefined mathematical object) / **9 minor** (imprecision, edge case, wording).
- **Number of effectiveness improvements suggested:** 12.
- **Number of coverage gaps flagged:** 5.
- **Recommendation:** Fix the five critical issues, decide on at least one of the coverage gaps (scientific notation is the highest leverage), then ship. The pedagogy is strong; the bugs are localized.

---

## Critical accuracy issues (must fix before shipping)

### C1. Guide 32 — "$70K+ difference" claim for 6% vs 6.5% mortgage is wrong (it's ~$35K)
**File/lines:** `guide32.jsx:17` — the Mortgage shopping row: `"Compound interest. 6% vs 6.5% on $300K over 30 years = $70K+ difference."`

**What's wrong:** Recompute the standard mortgage formula `M = P · r(1+r)ⁿ / ((1+r)ⁿ − 1)` with monthly compounding (`r = annual/12`, `n = 360`):

| Rate | Monthly payment | Total paid (360 × M) |
|---|---|---|
| 6.0 % | $1,798.65 | $647,514.57 |
| 6.5 % | $1,896.20 | $682,633.47 |
| 7.0 % | $1,995.91 | $718,526.69 |

`$682,633 − $647,515 ≈ $35,119`. So 6 % → 6.5 % over 30 years on $300K costs about **$35K extra**, not "$70K+". The $70K+ figure actually matches **6 % vs 7 %** (1 percentage-point gap): `$718,527 − $647,515 ≈ $71,012`. The author appears to have used a 1-pp gap example and labelled it as a 0.5-pp gap.

**Source:** Standard amortization formula (e.g. Investopedia / *CFA Level 1: Quantitative Methods*); same formula the guide itself uses correctly in Guide 28.

**Why it matters:** Guide 32 is the closing capstone, and this is the most concrete "math actually pays off" claim in the whole deck. Being off by 2× on the punchline undermines the deck's credibility.

**Recommended fix (pick one):**
- Keep the rates and correct the number: `"6% vs 6.5% on $300K over 30 years ≈ $35K difference."`
- Or keep the impact and correct the rates: `"6% vs 7% on $300K over 30 years ≈ $71K difference."` (more dramatic, still real-world plausible.)

---

### C2. Guide 21 — Mode is computed and displayed for a dataset that has no mode
**File/lines:** `guide21.jsx:6, 11, 23` — sample data `[30, 35, 40, 42, 45, 50, 55, 250]`; the mode pipeline:
```js
const freq={}; data.forEach(d=>{freq[d]=(freq[d]||0)+1;});
const modeVal=Object.entries(freq).sort((a,b)=>b[1]-a[1])[0];
// renders: <div>{modeVal?modeVal[0]:"none"}</div> with "({modeVal?modeVal[1]:0}× occurrence)"
```
With this data, every value occurs **exactly once**, so by the standard definition the dataset is either *amodal* ("no mode") or *equally multimodal* (every value is a mode). The code, however, returns `["30", 1]` because `Object.entries` preserves insertion order and `.sort` is stable, so the renderer displays `Mode: 30 (1× occurrence)`. That is mathematically wrong and pedagogically toxic — students will infer that "the mode is the first value when there's a tie."

**Source:** Standard definition: a *mode* of a sample is a value that occurs with maximum frequency, defined only when that maximum is strictly greater than 1 (or, more strictly, when only one value attains the maximum); see e.g. Wolfram MathWorld, "Mode" (https://mathworld.wolfram.com/Mode.html), or any standard statistics text (Moore, *The Basic Practice of Statistics*).

**Recommended fix (pick one):**
1. **Change the data** so a mode actually exists — e.g. `[30, 35, 40, 42, 45, 45, 55, 250]`. Then mean = 67.75, median = 43.5, mode = 45 (occurs 2×). All three measures tell a coherent story about the outlier.
2. **Fix the algorithm** to detect "no mode" and "multimodal":
   ```js
   const counts = Object.values(freq);
   const max = Math.max(...counts);
   const modes = Object.entries(freq).filter(([,c])=>c===max).map(([v])=>Number(v));
   const modeDisplay = max === 1 ? "none" : modes.length === 1 ? modes[0] : `${modes.join(", ")}`;
   ```

Option 1 is preferable — the dataset already exists to demonstrate the outlier-pulls-mean phenomenon; choosing a value with frequency ≥ 2 lets all three measures land on a clean teachable contrast.

---

### C3. Guide 29 — Tax brackets are 2024 single-filer values (stale) and the bracket-width formula has an off-by-one
**File/lines:** `guide29.jsx:7, 10`.

**What's wrong, part A (longevity / accuracy):** The hardcoded brackets (`{min:0,max:11600,rate:10}, {min:11601,max:47150,rate:12}, {min:47151,max:100525,rate:22}, {min:100526,max:191950,rate:24}, {min:191951,max:243725,rate:32}, {min:243726,max:609350,rate:35}, {min:609351,max:Infinity,rate:37}`) are the **IRS 2024 single-filer** brackets. Today's date in the project env is **2026-04-24**. The 2024 brackets were already superseded by 2025 brackets (e.g. 10 % up to $11,925; 12 % to $48,475; 22 % to $103,350; 24 % to $197,300; 32 % to $250,525; 35 % to $626,350) and will continue to drift each year. There is no caveat in the UI noting tax year, filing status (single only), or that standard deduction is excluded — the input is labelled "Taxable income" which is correct, but a user searching for "what's my tax" will misuse it.

**What's wrong, part B (off-by-one):** The bracket-width calculation:
```js
const taxable = Math.min(Math.max(remaining, 0), b.max - b.min + 1);
```
The `+1` is wrong. The width of a bracket is `max − min`, not `max − min + 1`. With the integer-dollar boundaries used here, this adds $1 of phantom-taxed width per bracket — at $75K income the discrepancy works out to about **$0.12 of overstated tax** (negligible numerically), but the *logic* is wrong: tax brackets are defined on continuous income, not on integer dollars, and a contiguous-interval treatment should compute width as `max − min` and start the next bracket at the same boundary (e.g. `min: 47150` not `min: 47151`).

This is also why the displayed bar widths (line 20) are very slightly off when income lands exactly on a boundary.

**Source:**
- IRS Revenue Procedure 2023-34 (2024 brackets, used in the code) and Rev. Proc. 2024-40 (2025 brackets). Quick reference: https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2025
- Continuous-interval convention: any econ / public-finance text (Mankiw, *Principles of Economics*, ch. on taxation).

**Recommended fix:**
1. **Update brackets.** Pull 2025 single-filer brackets (or the latest published) and add a small "Tax year 2025 · Single filer · Federal only · Pre-deduction" caption beneath the slider. Consider sourcing the table at the top of the file with a comment linking to the IRS Rev. Proc.
2. **Fix the off-by-one.** Change boundaries to non-overlapping `min` / `max` (e.g. `[{min:0,max:11925}, {min:11925,max:48475}, ...]`) and change the width line to `b.max - b.min`.
3. **(Optional) Add a filing-status toggle** (Single / MFJ / HoH) — three brackets-by-status arrays, one selector. Big effectiveness win for ~30 lines of code.

---

### C4. Guide 10 — function definition is loose; misses the "single-valued" requirement
**File/lines:** `guide10.jsx:13` (DarkBox text) and `guide10.jsx:9` (the `rules` array containing `f(x) = x²`).

**What's wrong:** The guide defines a function as "a machine: input → rule → output … Every function is just a rule." The single-valuedness (each input maps to *exactly one* output) is the entire mathematical content of the function concept and is omitted. The standard definition: a function `f: A → B` is a relation `f ⊆ A × B` such that for every `a ∈ A` there is exactly one `b ∈ B` with `(a, b) ∈ f`. Without "exactly one," the definition does not exclude relations like "x ↦ ±√x," which is precisely the canonical example of *not* a function.

**Source:** Wolfram MathWorld, "Function" (https://mathworld.wolfram.com/Function.html); Spivak, *Calculus*, ch. 3 ("Functions"). ISO 80000-2:2019 follows the same convention.

**Recommended fix:** Tighten the DarkBox to:
> *A function is a rule that gives **exactly one** output for each input. f(x) = 2x + 1 means "double it and add one." Different inputs can share an output (like x² turning both 3 and −3 into 9), but a single input never has two outputs — that's what makes it a function.*

This is barely longer and front-loads the misconception. Consider also adding the "vertical-line test" mention as a one-liner Insight ("On a graph: if any vertical line crosses the curve more than once, it's not a function.") — high-leverage and visualizable.

---

### C5. Guide 18 — "Every +10 dB = 10× louder" contradicts the guide's own closing Insight and is wrong as stated
**File/lines:** `guide18.jsx:10` (Card row "Decibels (sound)"): `"Every +10 dB = 10× louder. 30 dB (whisper) → 60 dB (conversation) → 90 dB (lawnmower) → 120 dB (pain)"`. The Insight on line 18 then says: *"A sound 10× louder only FEELS about 2× louder. That's why we need decibels instead of raw energy measurements."*

**What's wrong:** The two statements are mutually incompatible if "louder" means the same thing in both places. The standard formulation:
- **+10 dB = 10× the sound intensity** (power-per-unit-area, a physical quantity).
- **+10 dB ≈ 2× perceived loudness** (psychoacoustic, Stevens' power law for loudness gives roughly *L ∝ I^0.3*, so 10× intensity ≈ 10^0.3 ≈ 2× perceived).

The guide's main claim conflates the two senses of "louder," then the Insight (correctly) calls out the perceptual-vs-physical gap. The teaching wins if these are made consistent.

**Source:** ISO 532-1:2017 (Loudness method); Stevens, S. S. (1957), "On the psychophysical law," *Psychological Review* 64, 153–181. NIH Hearing reference: https://www.nidcd.nih.gov/health/noise-induced-hearing-loss

**Recommended fix:** Replace the line with:
> *Every +10 dB = 10× the **sound intensity** (energy hitting your ear) — but only feels about **2× louder** subjectively. 30 dB (whisper) → 60 dB (conversation, 1,000× more energy but ~8× the perceived loudness) → 90 dB (lawnmower) → 120 dB (pain).*

That makes the closing Insight a deepening rather than a contradiction.

---

## Verified correct (no fix needed)

These claims I rechecked in detail and want to certify so the author doesn't second-guess:

- **Guide 4** (recipe / unit pricing) — `$4.99/16 oz = $0.311875/oz` and `$6.99/24 oz = $0.29125/oz`. Round-to-cents-per-ounce works out to `$0.31` vs `$0.29` as displayed.
- **Guide 13** — 3-4-5 triangle and the 12-16-20 worked example (`√(144 + 256) = √400 = 20`). Both correct.
- **Guide 17** — Rule of 72: `72/7 = 10.29 yr`. Exact doubling time at 7 % monthly compounding is `ln 2 / (12 · ln(1 + 0.07/12)) = 9.93 yr`; at 7 % annual compounding `ln 2 / ln 1.07 = 10.24 yr`. The "≈ 10 years" framing is accurate. (Rule of 72 is a 1st-order Taylor approximation around continuous compounding; the exact "rule of 69.3" matches `ln 2 ≈ 0.693`.)
- **Guide 17 / 27** — Future value of an annuity: `FV = PMT · ((1+r)ⁿ − 1)/r`. The code matches this. For the displayed defaults ($200/mo, 7 %, 30 yr): `FV = 200 · ((1 + 0.07/12)^360 − 1)/(0.07/12) ≈ $243,994`; with $1,000 initial added: `$1,000 · 1.0058^360 + $243,994 ≈ $252,111`. Calculator output matches.
- **Guide 18** — Richter scale: amplitude factor 10× per +1 magnitude is correct; energy factor `10^1.5 = 31.62×` is correct (Gutenberg-Richter relation).
- **Guide 22** — 68/95/99.7 rule cited as "1 / 2 / 3 SD." Exact figures from the standard normal: 68.27 % / 95.45 % / 99.73 %. The rounded percentages displayed are conventional and correct.
- **Guide 22** — IQ: mean 100, SD 15. "145 is 3 SD above … top 0.15 %." Exact: P(Z > 3) = 0.135 %; "0.15 %" is the conventionally-rounded one-tail figure used in most psychometrics texts. OK.
- **Guide 25** — Bayes example. Assumes 99 % accuracy means **both** sensitivity = 99 % **and** specificity = 99 % (the standard simplification for intro presentation). With prevalence 1/1000, n = 10,000: 10 true cases → 10 TP at 99 % sensitivity (rounding); 9,990 healthy → 99.9 ≈ 100 FP at 1 % FPR. PPV = 10/110 = 9.09 %. The narrative matches the math; the simplifying assumption is conventional. Worth flagging the assumption explicitly inline (see E10 below) but not an error.
- **Guide 28** — Mortgage formula `M = P · r(1+r)ⁿ / ((1+r)ⁿ − 1)` is implemented correctly. For default inputs ($250K, 6.5 %, 30 yr): payment $1,580.17/mo, total paid $568,861, interest $318,861. Matches code.
- **Guide 29** — Even with the off-by-one (C3), at $75K income the displayed total tax is $11,553 vs the correct $11,553 (rounded) — the integer-cent off-by-one is below cents-displayed precision. Marginal-rate explanation ("The first ~$11K is taxed at 10 %, the next ~$35K at 12 %, etc.") is conceptually exactly right.
- **Guide 30** — All three EVs check: lottery `500e6/300e6 − 2 = −$0.33`; insurance `0.01·50,000 − 1,200 = −$700`; coin `0.5·150 − 0.5·100 = +$25`.
- **Guide 32** — Tipping `$45 × 0.10 × 2 = $9`; sale `$80 × 0.70 = $56`; recipe doubling `1¾ · 2 = 3½`. All correct except the mortgage row (C1).

---

## Minor accuracy issues (should fix, low priority)

### M1. Guide 1 — "infinitely more numbers between any two"
**File/lines:** `guide1.jsx:13, 26`.

The claim "between any two numbers there are infinitely more" is correct for the reals (and the rationals). The pedagogy is fine. Consider a one-line strengthening: between any two integers there are infinitely many *rationals*, and infinitely many *more* irrationals — this is the gateway to "the reals are uncountable." Optional. Nothing wrong, just an opportunity.

### M2. Guide 2 — "negative × negative = positive" via "two reversals"
**File/lines:** `guide2.jsx:30`.

The "turn around twice" intuition is good but obscures the algebraic justification (distributivity: `0 = a · 0 = a(b + (−b)) = ab + a(−b)`, so `a(−b) = −ab`, etc.). Consider adding a one-line "the algebra reason" Insight or footnote, e.g. *"Algebraically: this is the only definition that keeps a(b + c) = ab + ac working when c is negative."* Otherwise the guide silently encourages "math is metaphors" rather than "math is consistent."

### M3. Guide 3 — `1/3 = 33.3 %` truncation inconsistency
**File/lines:** `guide3.jsx:38`.

The chip displays `1/3 = 0.333... = 33.3%`. Either both should use ellipsis (`33.3...%`) or both should round to a fixed precision. The decimal does the right thing (`0.333...`); the percent silently rounds. Tiny but pedagogically the "..." is a teaching moment about repeating decimals — keep the convention consistent.

### M4. Guide 5 — PEMDAS example "12 ÷ 3 × 2 = 8"
**File/lines:** `guide5.jsx:12`.

Correct under "left-to-right within equal-priority operators." Good choice of example because it lands on the most-debated case. Consider strengthening the Insight (line 23) to *show why* `6 ÷ 2(1+2)` is ambiguous (juxtaposition-implies-higher-priority is a different convention used in physics and in the original Casio implementation; programming languages and modern texts use strict PEMDAS). One sentence would close the loop. Not an error.

### M5. Guide 9 — Distance / rate / time edge cases
**File/lines:** `guide9.jsx:6, 16`.

`dist/rate` is computed and displayed even when `rate = 0` (would be `Infinity`) or when the slider lets `rate` go negative. Currently `rate` is set via `<NumInput>` with no `min` / `max`, so a user typing `0` shows `Infinity hours`. Not catastrophic but ugly. Add `min={1}` to the speed input or guard the display.

Same applies to Guide 3 — the `den=0` case is guarded (`Math.max(1, ...)`) which is good; the C-to-F input is unconstrained (negative °C is fine, no division). All good.

### M6. Guide 12 — Surface area of a rectangular prism
**File/lines:** `guide12.jsx:18`.

`2(lw + lh + wh)` — correct. The displayed default values (`l=10, w=8, h=6`) give `2(80 + 60 + 48) = 376 ft²` — matches code. No issue.

### M7. Guide 14 — Visual circle radius doesn't scale linearly
**File/lines:** `guide14.jsx:14`: `width:Math.min(r*16, 200), height:Math.min(r*16, 200), borderRadius:"50%"`.

The visual is a circle of pixel-radius `r·16` capped at 200 px. Once `r ≥ 13`, the visual stops growing — but the numerical Diameter / Circumference / Area continue updating. No accuracy problem, but mildly misleading: for `r = 20` the visual is the same as for `r = 13`. Either remove the cap or (better) communicate the cap with a note "(visual scaled to fit; numbers exact)."

### M8. Guide 15 — Slope of a line via "rise over run"
**File/lines:** `guide15.jsx:10`.

`Slope = rise/run` is correct. The example "slope of 2 means up 2 for every 1 to the right" is correct. The follow-up "Negative slope = downhill" is correct *if the convention is "left-to-right";* a negative slope going right-to-left goes uphill. Pedagogically fine for everyday math, but worth a tiny clarification — *"reading left-to-right, the line goes down."* Not an error.

### M9. Guide 19 — "Sequences & Series" title vs content
**File/lines:** `guide19.jsx`, sidebar subtitle "Patterns that repeat."

The guide shows two sequences (arithmetic and geometric) but never distinguishes a *sequence* (ordered list of terms `aₙ`) from a *series* (sum of those terms, `Σ aₙ`). The Insight at line 21 alludes to the distinction ("savings plan = arithmetic series … investment growth = geometric series") but doesn't define either. Since the title promises both, define both:
> *A **sequence** is a list of terms in order. A **series** is what you get when you add them up. Sequence: 2, 5, 8, 11, … Series: 2 + 5 + 8 + 11 + … = how much you've saved after 4 months.*

Closes the gap and makes the Insight land.

### M10. Guide 31 — Fermi estimate: "actual answer is about 80-100"
**File/lines:** `guide31.jsx:21`.

Fermi's original 1950s estimate for Chicago was ~50; modern Yellow Pages-based counts have ranged 80–290 depending on what counts as "tuner" (active vs. listed). The "80–100" figure is credible but is one published estimate among several. Soften to "the actual count is somewhere in 50–200, depending on how you count" — preserves the Fermi-is-right-to-an-order-of-magnitude lesson without overcommitting. (Source: *Guesstimation* by Weinstein & Adam, ch. 1; original Fermi recollection in Doerr, "How the Fermi Method Works.")

---

## Effectiveness improvements

### E1. Guide 10 — once C4 is fixed, add the vertical-line test as the visual companion
A one-line Insight under the existing UI: *"On any graph, draw a vertical line. If it crosses the curve more than once at the same x, it's not a function."* This is the canonical visual-intuition payoff for the "exactly one output" definition.

### E2. Guide 13 — Pythagoras is here, but "180° in a triangle" promised in the meta subtitle isn't
The sidebar reads "180° and Pythagoras" but the guide only treats Pythagoras. Add a small block: *"The three angles in any triangle sum to 180°. Two angles are 50° and 60°? The third must be 70°."* Either include or update the subtitle to match.

### E3. Guide 14 — circle interactive should show π emerging
The strongest possible interactive here would compute `circumference / diameter` and display `π ≈ 3.14159…` regardless of the radius slider. That's the point of the guide — *"watch this ratio, it never changes."* Currently the user has to mentally divide. Trivial code change with high pedagogical payoff.

### E4. Guide 15 — needs a coordinate-plane interactive, not just a Card
Guide 15 is text-only inside a 32-guide deck where most growth/finance guides have sliders. A draggable point that shows `(x, y)` and updates the slope/distance/midpoint formulas would be the strongest single addition to the deck. Even a static SVG with a few labeled points would beat the current pure-text treatment.

### E5. Guide 16 — y = mx + b but the visual only shows b + mx (positive slope only)
The "salary with raise" example fixes `m > 0` and `b > 0`. Linear functions absolutely include negative slope (cooling, depreciation, debt paydown) and need to. Add a second worked example with negative slope: *"Car depreciation: a $30K car at $3K/year. Value in year n = 30,000 − 3,000·n. After 10 years, $0."* Same UI, different numbers.

### E6. Guide 17 — once the FV is right, add an "if you started 10 years earlier…" comparison
The dramatic compound-interest-needs-time lesson is muted by the single-knob UI. A two-column comparison ("Starts at 25" vs. "Starts at 35," same monthly contribution, same rate) would land harder. The 25-year-old contributes 10 more years and ends up with 2-3× the 35-year-old's portfolio. That's the lesson.

### E7. Guide 19 — define "series" and add the closed-form sums
After M9, also include the closed-form sums:
- Arithmetic series: `Sₙ = n(a₁ + aₙ)/2`.
- Finite geometric series: `Sₙ = a · (1 − rⁿ)/(1 − r)`, valid for `r ≠ 1`.
- Infinite geometric series: `S = a / (1 − r)`, valid for `|r| < 1`.

The third one is the math behind perpetuities and "0.999… = 1" — universally useful. (Source: any algebra-2 text, e.g. Larson *Algebra and Trigonometry*; Concrete Mathematics, Graham/Knuth/Patashnik, ch. 2.)

### E8. Guide 20 — the coin-flip simulator is good; add a histogram, not just totals
After 1,000 flips the % column is informative, but the *distribution* of "heads in 100 flips" across many trials would visualize the central limit theorem. One small bar chart of "out of N batches of 100 flips, how often did we get k heads" would carry double the lesson — Law of Large Numbers (already mentioned) **plus** binomial / normal approximation (the bell-curve shape).

### E9. Guide 22 — "spread" without computing it
The bell-curve guide describes σ as a concept but never shows the formula `σ = √(Σ(xᵢ − x̄)²/n)` or has the user compute it. Even a non-interactive worked example for the IQ data would make σ feel concrete. Currently it's an abstract symbol.

### E10. Guide 25 — surface the "sensitivity = specificity = 99%" assumption
After C3 is fixed, also tighten the language. "A test is 99% accurate" is ambiguous in real medicine — sensitivity (true-positive rate) and specificity (true-negative rate) are usually different numbers. Adding one sentence — *"Here we assume the test catches 99% of real cases AND wrongly flags only 1% of healthy people. Real tests usually have different numbers for these two."* — would prevent the takeaway from being "tests are bad" and make it "ask for both numbers."

### E11. Guide 27 / 28 — chart the dollar trajectory, not just the endpoints
Both guides display final-state dollars only. A simple line/bar chart of "balance over time" would make the *exponential vs. linear shape* visceral. Guide 17 has the bar chart (good!); 27 and 28 should match.

### E12. Guide 31 — add a second, contrasting Fermi estimate
One Fermi worked example doesn't quite land the technique. Add a second — "How many gallons of gasoline does the U.S. burn per day?" or "How many cups of coffee are sold in NYC per day?" — to demonstrate the *generalizability* of the method. The technique is what's being taught, not the specific Chicago answer.

---

## Coverage gaps

For an everyday-math-literacy deck, these are the highest-value missing topics, ordered by impact:

### G1. Scientific notation
Place value (Guide 1) goes to ×10⁻²; physical reasoning (atom radius ≈ 5×10⁻¹¹ m, distance to sun ≈ 1.5×10¹¹ m, US GDP ≈ 2.7×10¹³ $) all needs ×10ⁿ. This is a one-guide gap that pays off across statistics, money, and Fermi estimation. **Highest priority addition.** Could be inserted after Guide 1 or paired with Guide 31 (estimation).

### G2. Logarithm laws (`log(ab) = log a + log b`, change of base)
Guide 18 explains *what logs are* and *why log scales matter* but never gives the algebraic rules. For users wanting to *use* logs (interest doubling time, decibel arithmetic, pH calculations) the laws are the operating manual. Worth one extra guide or a Card append to Guide 18.

### G3. Conditional probability and Bayes' formula stated explicitly
Guide 25 walks one example through Bayes-by-counting but never states `P(A|B) = P(A∩B) / P(B)` or `P(A|B) = P(B|A)·P(A) / P(B)`. With the formula explicit, students could apply the same reasoning to a new scenario (which is the whole point). Short addition.

### G4. Combinatorics: factorials, permutations, combinations
The deck talks about probability (Guide 20, 25, 30) and lottery odds (Guide 30) but never explains *how to count*. "1 in 300M chance of winning the lottery" is opaque without combinatorics: in MegaMillions, `(70 choose 5) · 25 = 302,575,350`. One guide on `n!`, `nPr`, `nCr` (with the canonical poker / lottery / birthday-paradox examples) closes the loop. Standard discrete-math intro material (Rosen, *Discrete Mathematics and Its Applications*, ch. 6).

### G5. Inflation / time value of money
Guide 27 (compound interest) and Guide 28 (loans) cover the *nominal* arithmetic perfectly, but the deck never mentions that "$50K in 1980 ≠ $50K in 2026." Without a real-vs-nominal distinction, "$50/month for 30 years" comparisons are fundamentally misleading. Even a one-Insight callout would help; a full guide on CPI / real vs nominal returns / "rule of 72 applied to inflation" would be ideal. Pairs naturally with Guide 27.

(Lower-priority gaps to consider eventually: trigonometry beyond Pythagoras — sin/cos/tan in right triangles for "how tall is that building" estimation; basic set notation and Venn diagrams for the data/probability cluster; matrix arithmetic for the linear-algebra-curious.)

---

## Per-guide notes (only where issues exist)

### Guide 1 — How Numbers Work
- Sound. Optional pedagogical strengthening (M1) about rationals vs. reals.

### Guide 2 — Negative Numbers
- Algebraic justification for `(−)·(−) = +` could be added (M2).

### Guide 3 — Fractions, Decimals & %
- 1/3 ↔ 33.3 % notation inconsistency (M3).

### Guide 5 — Order of Operations
- The 6 ÷ 2(1+2) Insight could explain *why* it's ambiguous (M4).

### Guide 9 — Formulas You Use
- `dist/rate` undefined when rate=0; constrain input (M5).

### Guide 10 — Functions
- **Definition is loose** — missing single-valuedness (C4). Critical fix.
- Add vertical-line test (E1).

### Guide 13 — Angles & Triangles
- Title promises 180°-sum theorem; only Pythagoras is shown (E2).

### Guide 14 — Circles
- Visual capped at r=13 (M7).
- Show C/d converging to π (E3).

### Guide 15 — Coordinate Geometry
- Sole text-only guide; needs an interactive (E4).

### Guide 16 — Linear Growth
- Add a negative-slope example (E5).

### Guide 17 — Exponential Growth
- Add "10-years-earlier" comparison (E6).

### Guide 18 — Logarithms
- **+10 dB = "10× louder" contradicts the Insight** (C5). Critical.
- Missing log laws (G2).

### Guide 19 — Sequences & Series
- "Series" never defined; add closed-form sums (M9, E7).

### Guide 20 — Probability Basics
- Add a distribution histogram, not just totals (E8).

### Guide 21 — Mean, Median, Mode
- **Mode is wrong on the sample data** (C2). Critical.

### Guide 22 — Spread & Distribution
- σ is conceptual only; show the formula or a worked example (E9).

### Guide 25 — Probability in Practice
- "99 % accurate" assumes sensitivity = specificity = 99 %; surface this (E10).

### Guide 27 — Compound Interest
- Add a balance-vs-time chart (E11).

### Guide 28 — Loans & Debt
- Add a balance-vs-time / principal-vs-interest stack chart (E11).

### Guide 29 — Taxes & Brackets
- **Brackets are 2024; year is now 2026** (C3). Critical.
- Off-by-one in `b.max - b.min + 1` (C3, minor numeric impact, real logical bug).
- No filing-status selector — single-only is a strong implicit assumption.

### Guide 31 — Estimation
- Soften "real answer 80-100" range (M10).
- Add a second Fermi example (E12).

### Guide 32 — Math You Already Do
- **$70K+ mortgage-rate-spread claim is wrong** (C1). Critical.

---

## Sources cited

### Mathematical references
- **Wolfram MathWorld** — Function: https://mathworld.wolfram.com/Function.html ; Mode: https://mathworld.wolfram.com/Mode.html ; Pythagorean Theorem: https://mathworld.wolfram.com/PythagoreanTheorem.html
- **ISO 80000-2:2019** — *Quantities and units — Part 2: Mathematics.* (Function notation, set notation conventions used to back the Guide 10 fix.)
- **Spivak, M.** *Calculus*, 4th ed., Publish or Perish, 2008. Ch. 3 ("Functions") for the canonical definition used in C4.
- **Larson, R.** *Algebra and Trigonometry*, 10th ed., Cengage, 2018. Used for closed-form geometric series formulas (E7).
- **Graham, Knuth, Patashnik.** *Concrete Mathematics*, 2nd ed., Addison-Wesley, 1994. Ch. 2 (sums) — geometric / arithmetic series identities.
- **Rosen, K.** *Discrete Mathematics and Its Applications*, 8th ed., McGraw-Hill, 2018. Ch. 6 (counting) — referenced for the combinatorics gap (G4).
- **Moore, D., Notz, W., Fligner, M.** *The Basic Practice of Statistics*, 9th ed., W. H. Freeman, 2021. Used for the standard mode/median/mean definitions (C2) and for the 68-95-99.7 figures.

### Finance / amortization
- **CFA Institute Curriculum**, Quantitative Methods, Level 1 (mortgage and annuity formulas). The standard derivation `M = P · r(1+r)ⁿ / ((1+r)ⁿ − 1)` used in C1 verification.
- **Investopedia**, "How Is a Loan Amortization Schedule Calculated?": https://www.investopedia.com/terms/a/amortization.asp
- **Mankiw, N. G.** *Principles of Economics*, 10th ed., Cengage, 2024. Used for marginal-tax-rate continuous-interval treatment (C3).

### Tax data
- **IRS Revenue Procedure 2023-34** (2024 single-filer brackets, the values currently hardcoded in Guide 29): https://www.irs.gov/irb/2023-48_IRB
- **IRS Revenue Procedure 2024-40** (2025 brackets, replacement): https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2025

### Acoustics
- **Stevens, S. S.** (1957), "On the psychophysical law," *Psychological Review* **64** (3), 153–181.
- **ISO 532-1:2017**, *Acoustics — Methods for calculating loudness — Part 1: Zwicker method.*
- **NIH/NIDCD** Noise-induced hearing loss reference: https://www.nidcd.nih.gov/health/noise-induced-hearing-loss

### Earth science
- **USGS** Richter magnitude / energy relations: https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity (energy ratio = 10^1.5 per +1 magnitude — used to verify Guide 18).

### Estimation / Fermi
- **Weinstein, L. & Adam, J.** *Guesstimation: Solving the World's Problems on the Back of a Cocktail Napkin*, Princeton, 2008. Used for M10.
