# FreeCAD Guide — Comprehensive Accuracy + Effectiveness Review

## Executive Summary

- **Overall verdict:** The 30-guide selection is well-chosen and the high-level pedagogy is good, but the cheat-sheet has **systematic errors in keyboard shortcuts** because it appears to mix FreeCAD 0.20 / 0.21-era K-prefix conventions with the FreeCAD 1.0 single-letter convention, and several specific shortcuts are simply wrong for 1.0. Counterbore values in Guide 18 are also wrong (the author used screw head diameters instead of DIN 974-1 counterbore diameters). Most of the 3D-printing content is accurate and well-judged.
- **Number of accuracy issues found:** 19 total — **8 critical** (wrong shortcut, wrong number, wrong menu path — readers will be misled) / **11 minor** (imprecise wording, missing nuance, defaults to verify).
- **Number of effectiveness improvements suggested:** 14
- **Recommendation:** **hold-for-revision**. The shortcut errors are pervasive enough across Guides 5–13 that shipping as-is would actively misinform readers. A focused revision pass on the Sketcher shortcut tables (Guides 7, 9, 10, 11, 13) and the counterbore table (Guide 18) — plus the Pad mode list, ShapeBinder menu path, and Auto-refine framing — will get this to ship-ready.

---

## Critical accuracy issues (must fix before shipping)

### C1. Sketcher constraint shortcuts use wrong scheme for FreeCAD 1.0 — Guide 10 and Guide 11
**File/lines:** `guide10.jsx:9–17` (constraint shortcut list), `guide11.jsx:8–15` (dimension shortcut list).

**What's wrong:** The guides claim `K, C` for Coincident, `K, H` for Horizontal, `K, V` for Vertical, `K, P` for Parallel, `K, N` for Perpendicular, `K, T` for Tangent, `K, E` for Equal, `K, S` for Symmetric, plus `K, H` / `K, V` for *horizontal/vertical distance*, `K, N` for *Diameter*. This was the FreeCAD 0.20 convention, and the guide's own usage even collides with itself (`K, N` is claimed for both "Perpendicular" in Guide 10 and "Diameter" in Guide 11 — these can't both be true).

**What's correct (FreeCAD 1.0, verified against current wiki pages):**

| Tool | Shortcut in 1.0 |
|---|---|
| Coincident (Unified) | `C` |
| Horizontal | `H` |
| Vertical | `V` |
| Auto Horizontal/Vertical | `A` |
| Parallel | `P` |
| Perpendicular | `N` |
| Tangent | `T` |
| Equal | `E` |
| Symmetric | `S` |
| Block (the modern "lock to current pose" constraint) | `K, B` |
| Dimension (smart, contextual) | `D` |
| Distance (legacy individual) | `K, D` |
| Horizontal distance (DistanceX) | `L` |
| Vertical distance (DistanceY) | `I` |
| Radius | `K, R` |
| Diameter | `K, O` |
| Angle | `K, A` |
| Lock (legacy "fix X and Y of point") | `K, L` |

**Source:** Current FreeCAD documentation, e.g. `Sketcher_ConstrainCoincidentUnified.md` (C), `Sketcher_ConstrainHorizontal.md` (H), `Sketcher_ConstrainVertical.md` (V), `Sketcher_ConstrainParallel.md` (P), `Sketcher_ConstrainPerpendicular.md` (N), `Sketcher_ConstrainTangent.md` (T), `Sketcher_ConstrainEqual.md` (E), `Sketcher_ConstrainSymmetric.md` (S), `Sketcher_Dimension.md` (D), `Sketcher_ConstrainDistance.md` (K,D), `Sketcher_ConstrainDistanceX.md` (L), `Sketcher_ConstrainDistanceY.md` (I), `Sketcher_ConstrainRadius.md` (K,R), `Sketcher_ConstrainDiameter.md` (K,O), `Sketcher_ConstrainAngle.md` (K,A), `Sketcher_ConstrainLock.md` (K,L), `Sketcher_ConstrainBlock.md` (K,B).

**Why this matters:** Readers will hit `K, H` and get nothing (or trigger the wrong tool). The whole point of a cheat-sheet is the shortcuts being right.

---

### C2. Several Sketcher draw-tool shortcuts are wrong or have changed scope — Guide 5, 6, 7, 9
**File/lines:**
- `guide5.jsx:9–10` claims `G, L` (Line), `G, M` (Polyline) — **both correct**.
- `guide6.jsx:10` claims `G, C / G, A`, `G, 3, C / G, 3, A`, `G, G` for tangent arc. **G,C / G,A / G,3,C / G,3,A are all verified correct in 1.0** (per `Sketcher_Create3PointCircle.md` and `Sketcher_Create3PointArc.md`). The `G, G` claim for "tangent arc" is **not corroborated** by any current FreeCAD 1.0 wiki page; in 1.0 the tangent-arc behavior is reached via the Arc tool's `M` mode-cycle, not a dedicated chord. Either remove `G, G` or confirm via in-app `Tools > Customize > Keyboard`.
- `guide7.jsx:18` claims `G, R` (Rectangle), `G, O` (Centered Rectangle), `G, P` (Polygon).
  - `G, R` — **correct**.
  - `G, O` — **WRONG**. Centered rectangle is `G, V` in 1.0. (`G, O` is unassigned in current 1.0; the rectangle modes are reached via `M` cycling within the rectangle tool.)
  - `G, P` — **partial**. The base Polygon shortcut is `G, P, R` for Regular Polygon (the `R` selects the regular-polygon variant from a polygon family); just `G, P` will not invoke it directly.
- `guide9.jsx:9, 13, 16, 20` claims `G, T` (Trim), `G, E` (Extend), `G, Z` (Split), `G, F` (Fillet).
  - `G, T` — **correct**.
  - `G, E` — **WRONG**. Extend is `G, Q` in 1.0. (`G, E` invokes Ellipse.)
  - `G, Z` — **correct**.
  - `G, F` — **partial**. Sketch-fillet is `G, F, F` in 1.0 (the second `F` selects the standard fillet from the fillet family).
- `guide5.jsx:10`, `guide8.jsx:17` claim `G, N` for Toggle Construction — **correct**.

**What's correct, source by source:** wiki `Sketcher_CreateLine.md` (G,L), `Sketcher_CreatePolyline.md` (G,M), `Sketcher_CreateCircle.md` (G,C), `Sketcher_CreateArc.md` (G,A), `Sketcher_CreateRectangle.md` (G,R; M cycles modes; U = rounded; J = frame/offset), `Sketcher_CreateRectangle_Center.md`-equivalent (G,V for centered), `Sketcher_CreateRegularPolygon.md` (G,P,R), `Sketcher_Trimming.md` (G,T), `Sketcher_Extend.md` (G,Q), `Sketcher_Split.md` (G,Z), `Sketcher_CreateFillet.md` (G,F,F), `Sketcher_ToggleConstruction.md` (G,N).

**Why it matters:** Same as C1 — keys that don't fire = broken cheat-sheet.

---

### C3. Smart Distance shortcut wrong in Guide 11 — `K, D` is the *legacy* single-tool, not the smart contextual one
**File/lines:** `guide11.jsx:8` lists `K, D — Smart Distance (auto H/V/slanted)`.

**What's wrong:** The "smart contextual" dimension tool that auto-picks H/V/distance/radius/etc. in FreeCAD 1.0 is the new **Dimension** tool with shortcut **`D`** (single key), not `K, D`. `K, D` is still the legacy "Constrain distance" tool, which is *not* fully contextual (it only does point-to-point distance / line length).

**Source:** `Sketcher_Dimension.md` says shortcut `D`. `Sketcher_ConstrainDistance.md` says shortcut `K, D`.

**Recommendation:** Change `K, D` row to `D — Dimension (contextual: distance, radius, angle, …)` and keep a separate `K, D — Distance (point-to-point / length, legacy)` row if you want completeness. Then the Insight ("Use K, D by default") becomes "Use D by default" — actually correct for 1.0.

---

### C4. Counterbore values in Guide 18 are wrong (used screw-head diameter, not counterbore diameter)
**File/lines:** `guide18.jsx:11–16` (the `data` array's `cbDia` and `cbDepth` columns).

**What's wrong:** The guide quotes counterbore ø/depth values:
- M3: 5.5 × 3.0
- M4: 7.0 × 4.0
- M5: 8.5 × 5.0
- M6: 10.0 × 6.0

These are **the head diameters and head heights of ISO 4762 socket head cap screws**, not counterbore dimensions. A counterbore must be larger than the head; per **DIN 974-1** ("Diameters of counterbores — Manufacturing dimensions — Part 1: Hexagon socket head cap screws"), the standard "normal series" values are:

| Size | Head ø dk (ISO 4762) | DIN 974-1 counterbore ø d2 | DIN 974-1 depth t2 |
|---|---|---|---|
| M3 | 5.5 | **6.5** | **3.5** (or 3.4 depending on series) |
| M4 | 7.0 | **8.0** | **4.6** (often 4.8) |
| M5 | 8.5 | **10.0** | **5.7** (often 5.8) |
| M6 | 10.0 | **11.0** | **6.8** |

(FreeCAD's own Hole feature, when set to ISO 4762 + DIN 974-1, populates these values automatically.)

**Source:** DIN 974-1:2008, ISO 4762 (head dimensions), and the engineersbible.com counterbore-socket-DIN reference table.

**Recommendation:** Replace the table values with the correct DIN 974-1 numbers above. Optionally add a footnote: "For low-head socket caps (ISO 7984), counterbore is smaller — use DIN 7984."

---

### C5. SubShapeBinder menu path is wrong — Guide 25
**File/lines:** `guide25.jsx:10`: `In Part Design, use 'Model > Helpers > SubShapeBinder' to copy referenced geometry…`

**What's wrong:** There is no `Model > Helpers` menu in FreeCAD 1.0. SubShapeBinder lives under **Part Design > Helper tools > Create a sub-object(s) shape binder** (or the toolbar button). The "Model" menu in FreeCAD's main bar is the project-tree dock, not a command menu.

**Source:** FreeCAD wiki `PartDesign_SubShapeBinder.md` and `PartDesign_Workbench.md` both describe it under "Part Design > Helper tools".

**Recommendation:** "In Part Design, **Part Design > Helper tools > Create a sub-object(s) shape binder** (or click the toolbar icon)."

---

### C6. Pad mode list in Guide 14 is incomplete and slightly mislabels FreeCAD 1.0 modes
**File/lines:** `guide14.jsx:8–13` (5 modes: Dimension / Symmetric / Two dimensions / Up to first / Up to face).

**What's wrong:** FreeCAD 1.0 Pad has **7 type modes** in the dropdown:
1. Dimension
2. Through all *(yes — Pad has Through all too in 1.0)*
3. To first
4. To last *(new in 1.0 / present in modern releases)*
5. Up to face
6. Two dimensions
7. **Up to shape** (added in 1.0 — extends to multiple faces of a selected shape)

Plus "Symmetric to plane" is a **checkbox** that combines with Dimension or Through all, not its own mode. The guide lists Symmetric as a mode, conflates "Up to first" with the modern "To first," and omits "Through all" / "To last" / "Up to shape." Same applies to Guide 15 (Pocket modes — mostly OK; Pocket has the same 7-mode dropdown but the guide labels them slightly differently).

**Source:** wiki `PartDesign_Pad.md` and `PartDesign_Pocket.md`.

**Recommendation:** Fix the mode list. The "Symmetric is TNP-safe and recommended" advice is still good — just note that Symmetric is a checkbox modifier on Dimension/Through-all, not a standalone Type. Add "Up to shape" with a note that it's the new 1.0 mode for ending on multiple faces.

---

### C7. View Fit-All / View shortcut formatting in Guide 3 is misleading
**File/lines:** `guide3.jsx:20–22`: lists `V, F` for "Fit all (press V then F)", `V, O` for "Toggle ortho/perspective".

**What's wrong:** `V, F` (Fit All) is correct. `V, O` for ortho/perspective toggle is **not** a standard FreeCAD shortcut — there's no documented `V, O` in the wiki. The standard view shortcuts are `V, 1` … `V, 7` (draw styles), `V, P` (perspective), `V, O` is sometimes assigned to "ortho" via custom keymap but is **not** a built-in default in stock FreeCAD 1.0. Recommend either dropping `V, O` or noting "user-customisable".

Also, the basic numpad-1..6 view shortcuts (1=Front, 2=Top, 3=Right, etc.) are correct for FreeCAD's stock keymap.

**Source:** wiki `Std_ViewFitAll.md` confirms `V, F`. There is no `Std_ViewToggleOrthoPerspective.md` page with `V, O`.

**Recommendation:** Drop the `V, O` row, or replace with `V, P — toggle perspective` (which is documented).

---

### C8. "Auto refine model — OFF — causes Toponaming issues" advice in Guide 1 is partially defensible but oversimplified
**File/lines:** `guide1.jsx:16`.

**What's correct:** The "Automatically refine model after [boolean / applying operation]" preferences exist under **Edit > Preferences > Part Design > General > Model Settings** (there are actually **two checkboxes**, both default ON in FreeCAD 1.0). Disabling them is debated in the community.

**What's nuanced:** The relationship to TNP is not strictly causal. Auto-refine can produce non-ideal shapes for certain downstream operations (notably helices / threaded shapes — e.g. issue #17846), and refinement does change topology IDs which historically aggravated TNP. With the FreeCAD 1.0 TNP fix the situation is much better, and the community is **not** unanimous that it should be off; some advise leaving the defaults. The honest framing is: "If you hit weird Helix / fillet issues after a boolean, try toggling this off."

**Source:** GitHub issues #17846, #25465, #13472 (FreeCAD repo).

**Recommendation:** Soften the claim. Replace "OFF — causes Toponaming issues" with something like "OFF if you see problems with helices / threads / cascading fillets after booleans (default is ON; FreeCAD 1.0's TNP fix reduces — but doesn't eliminate — refinement-related instability)."

---

## Verified correct (no fix needed)

These are claims I checked and want to call out as confirmed, so the author doesn't second-guess:

- **Guide 4** — "FreeCAD 1.0's topological naming improvements make this [face-sketching] much more reliable… but the face can still change shape." Verified accurate against 1.0 release notes ("not completely solved, further improvements will follow"). The wording is right. Consider one-line strengthening: named-face references (Up-to-Face, fillets on specific edges) still break under heavy upstream edits — recommend datums for sketches that downstream features will reference.
- **Guide 18** clearance values — M3 3.2 / M4 4.3 / M5 5.3 / M6 6.4 are correct ISO 273 close-fit values.
- **Guide 18** tap drill values — M3 2.5 / M4 3.3 / M5 4.2 / M6 5.0 are correct for ISO metric coarse threads.
- **Guide 24** spreadsheet syntax `=Spreadsheet.width` and the alias-via-right-click-Properties workflow.
- **Guide 30** `.FCBak` backup file extension and recovery workflow.
- **Guide 29** the export menu path `File > Export` for STL.

---

## Minor accuracy issues (should fix, low priority)

### M1. Guide 1 — "Auto-save every 5 min — ON" — `guide1.jsx:13`
This is fine, but FreeCAD's Auto-save is actually OFF by default in 1.0 (or set to a high interval). Confirm and add "(default OFF — turn it ON)" if accurate.

### M2. Guide 16 — "Profile must be entirely on one side of the axis" — `guide16.jsx:51`
True for Revolution, but the Sketcher will *try* to revolve a profile that crosses the axis and produce a self-intersecting solid (depending on cross direction). The error message in FreeCAD says exactly that. The claim is correct; consider mentioning the error text users will actually see.

### M3. Guide 17 — "Profile is a separate closed sketch at the spine's start" — `guide17.jsx:10`
Additive Pipe in FreeCAD 1.0 has **multiple modes** for orienting the profile along the spine (Constant, Frenet, Binormal, Auxiliary spine). The single-sentence description is accurate but skips the Mode picker that frequently determines whether the result twists weirdly. Worth a one-line mention.

### M4. Guide 18 — "Add 0.1–0.3mm to clearance for FDM" — `guide18.jsx:83`
Correct sign of the adjustment, but the magnitude is printer-specific and slicer-specific (XY hole compensation in PrusaSlicer / Bambu can absorb most of this). Consider noting "if your slicer doesn't have hole-comp enabled" or "this is on top of nominal — hole comp may already cover it."

### M5. Guide 21 — Mirror diagram on `guide21.jsx:51`
The interactive shows mirror across YZ plane (a vertical line in the SVG) but the Insight talks about polar around Z axis. Internally consistent; just noting the SVG axis labels are absent.

### M6. Guide 22 — "Right-click feature → 'Set tip'" — `guide22.jsx:34`
Correct in FreeCAD 1.0 — the menu item is "Move object to other body" / "Set tip" (tip is set automatically when you create new features but can be moved). Wording is fine.

### M7. Guide 24 — "=Spreadsheet.width" — `guide24.jsx:29`
Correct syntax. Note that the Spreadsheet object's name in the tree is by default "Spreadsheet" but could be renamed; if the user renames it, the expression must use the new label. One-line note worthwhile.

### M8. Guide 25 — "External Geometry … your sketch turns red, feature fails" — `guide25.jsx:9`
Mostly true historically, but FreeCAD 1.0's TNP fix means External Geometry is **substantially better** than in 0.21. The "fragile" framing is still defensible (ShapeBinder remains more robust for cross-body refs), but the description is one major version out of date in tone. Consider softening to "External Geometry is improved in 1.0 but ShapeBinder is still the safer choice across bodies."

### M9. Guide 26 — "Convert to shape from mesh" — `guide26.jsx:13`
The actual menu paths in FreeCAD 1.0 are:
- Mesh > "Mesh to Shape" (then optionally "Refine shape from mesh")
- Part > "Convert to solid"

The guide's wording is close but not exact. Update to the menu-name that ships in 1.0.

### M10. Guide 29 — Mesh refinement values quoted as if they map to "Standard / Fine / Very Fine" presets — `guide29.jsx:8–13`
**FreeCAD's STL export dialog uses two parameters: "Linear deflection" (max edge) and "Angular deflection" (degrees).** The numerical values quoted (15° / 0.3 mm; 5° / 0.1 mm; 2° / 0.05 mm) are *reasonable picks* a user could enter, but they are **not preset names** in FreeCAD's UI — there's no "Standard" preset button. The guide reads as if these are dropdown options. Reword to "values you'd enter for {standard / fine / very fine} quality" rather than implying preset names.

### M11. Guide 30 — ".FCBak backups" — `guide30.jsx:10`
Correct — FreeCAD's backups are written as `*.FCBak` next to the `.FCStd` file. The naming and behavior is correct. Note the recent issue #26833 where `.FCBak` files cannot be opened directly without renaming — worth a one-line mention.

### M12. Guide 3 — Blender nav-style pan binding — `guide3.jsx:9`
The guide lists Pan = "Shift + Middle-click + drag" for Blender style. This is one of the bindings FreeCAD's Blender mode supports, but real Blender uses `Shift + middle-drag` and FreeCAD's Blender preset has been adjusted across versions. Worth a quick confirmation in current 1.0 against `Std_UserEditMode` / Navigation preferences. Lower-priority — flagging for human verification.

### M13. Guide 5 — Polyline coincident-dot rendering convention
The functional claim that Polyline auto-applies coincident at every joint is correct. The `SketchDiagram` SVG renders coincident dots in a particular color/style; verify in `_helpers.jsx` that the legend matches (orange dots = coincident is the implied convention, but no on-screen legend says so). Consider adding a tiny legend below the diagram in Guide 5 (and Guide 10) so the symbols are unambiguous.

---

## Effectiveness improvements

### E1. Guides 10 / 11 / 12 / 13 are pedagogically excellent — but only useful once the shortcuts are fixed (C1, C3)
Once corrected, these guides do real work. The DoF interactive in Guide 12 is one of the strongest pieces in the deck — the 0/1/2/4 progression with the green "Fully constrained" badge is exactly the right mental model.

### E2. Guide 6 — `G, G` "tangent arc" needs verification or removal
Recommend either documenting the *exact* in-1.0 way to get a tangent arc (currently: draw an arc with `G, A`, the M key cycles modes, or use the unified Arc tool with auto-tangent at endpoint) or removing the `G, G` claim altogether.

### E3. Guide 14 — Pad Insight is great; add a one-line "but if your part is asymmetric, pick Dimension" so readers don't blanket-apply Symmetric.

### E4. Guide 18 — Once C4 is fixed, the interactive is excellent. Consider adding **heat-set insert** sizing (M3 brass insert — typical hole 4.0 mm × 4.0 mm depth) alongside the screw clearance/tap rows. This is daily-use 3D-printing data; users will reach for it constantly.

### E5. Guide 20 — Draft. Borderline. The actual 3D-printing utility of Draft is genuinely small for FDM users. The "future-proof for tooling" justification is real but niche. Consider either:
- Replacing Guide 20 with **"Heat-set inserts and threaded holes"** (much more daily-use for FDM), or
- Keeping Draft but combining with a "When NOT to use Draft" callout (most FDM cases).

### E6. Guide 22 — "Toggle Tip" mention is good but the visual could call out the Tip with a star or arrow more clearly. The current `← Tip` text marker is subtle. Consider color-coding the Tip row.

### E7. Guide 24 — Spreadsheet Insight is strong. Add: **"Drive a parameter from another parameter with `=Spreadsheet.wall * 2`"** — expressions inside the spreadsheet are how you encode "all walls = 2× nozzle width" type design intent. This is the killer use case.

### E8. Guide 25 — After fixing C5, also note that `SubShapeBinder` has a **"Claim children"** property. Setting it lets you freely move the source body without breaking the binder. This is a power-user tip readers will not find on their own.

### E9. Guide 27 — Wall thickness framing is mathematically clean (0.4 / 0.8 / 1.2 = 1/2/3 perimeters). Confirm this matches the *user's* slicer perimeter width. With a 0.4 mm nozzle, **PrusaSlicer's default extrusion width is 0.45 mm**, so 0.8 mm wall actually fits ~1.78 perimeters → slicer rounds. Worth a one-line caveat: "exact perimeter count depends on slicer extrusion width — set wall = N × extrusion-width, not N × nozzle-diameter, for best results."

### E10. Guide 27 — Add **"horizontal bridges"** to the supportless-design list. Bridge max length is a daily-use number FDM designers care about (typical 30-50 mm with good cooling).

### E11. Guide 28 — Tolerance numbers (-0.1 press / +0.2 slip / +0.4 loose for Ø3) are reasonable defaults for an uncalibrated stock-profile FDM with a 0.4 mm nozzle, **on the X/Y axes, on a part oriented vertically with hole walls printed as perimeters**. Holes printed flat (downward-facing or upward-facing) shrink less because they're built layer-by-layer in Z. Consider a one-line addition: "These assume vertical-axis holes; horizontal-axis holes deform less in diameter but more in roundness."

### E12. Guide 29 — Add **"Binary STL is half the file size of ASCII STL"** — File > Export → format selector. Trivial setting that 80% of users miss.

### E13. Guide 30 — Add **"Sketcher: Validate sketch (Sketch > Validate sketch)"** as the recovery move for self-intersection. The guide mentions "Validate Sketch" once at the end of "Self-intersecting profile" recovery; surface it more prominently.

### E14. Across all 30 — the `Insight` callouts are mostly very good. The weak ones (in my view) are Guide 2 ("Don't overthink which workbench you're in") and Guide 16 ("Revolution over 360° is how you model anything cylindrical"). These are restating the obvious. Consider rewriting:
- Guide 2: "Activating a workbench just changes the toolbar; **try right-clicking the toolbar to enable specific Part Design tools while in another workbench** to avoid the switching tax."
- Guide 16: "Revolutions inherit the sketch plane's normal as the default axis. **Build the profile on XZ and the part stands up the Z-axis automatically**, ready to export."

---

## Coverage gaps

### Missing topics that matter for daily 3D-printing work
1. **Heat-set inserts / threaded inserts** — extremely common in FDM. No guide covers the 4.0 × 4.0 (M3 brass) sizing convention. Strong candidate to swap in for Guide 20 (Draft).
2. **Layer-line awareness in design** — orientation affects strength along Z (between layers) very differently from XY (along extrusion). Brief mention in Guide 29 about orientation is insufficient. A dedicated guide on "Print orientation for strength" would be more valuable than Draft.
3. **Tolerance test print / calibration cube** — Guide 28 says "calibrate for your printer" but doesn't describe the test-print workflow (the Maker's Muse / All3DP fit-test cubes). One screenshot + reference would be very actionable.
4. **Threaded holes** — designing ISO-thread holes for self-tap into plastic vs. cut-thread (heat-set, tap-and-die in printed material). Guide 18 hints at it ("real metric screw") but doesn't separate the use cases.
5. **Boolean operations between bodies** (Boolean tool in Part Design — Add / Subtract / Intersect across bodies in same Part). Guide 22 covers multi-body but not how to combine them.
6. **Multi-body alignment in a Part container** — Guide 22 mentions Part container holds bodies, but not *how* to keep them aligned (LCS, attachment offsets).

### Borderline-redundant topics
- **Guide 5 vs Guide 9** — both touch on line tools. Guide 5 is well-scoped to Line/Polyline; Guide 9 is well-scoped to editing tools. No real overlap. Fine.
- **Guide 16 (Revolution & Groove) and Guide 17 (Loft & Additive Pipe)** — These are 4 features in 2 guides; could be split or kept compact. The current pairing is fine.
- **Guide 14 (Pad) and Guide 15 (Pocket)** — Almost mirror content. The decision to give them separate guides is reasonable since the 3D-printing implications differ (Pocket through-all is the killer move; Pad symmetric is the killer move). Keep separate.

### Category structure
The 6-category split (Setup / Sketching / Constraints / Features / Structure / 3D Printing) is **coherent and defensible**. "Structure" is the slightly odd one — it bundles Body/Part containers, Datums, Spreadsheets, and ShapeBinders, which is a wide range. Could be renamed "Project Organization" for clarity, or split into "References" (Datums, ShapeBinders) and "Parametrics" (Spreadsheets, Containers). Optional polish.

---

## Per-guide notes (only where issues exist)

### Guide 1 — New File & Units
- Auto-save default likely OFF in stock 1.0 — verify (M1).
- Auto refine wording is too definitive (C8).

### Guide 3 — Navigation & View
- `V, O` not a standard binding (C7).
- Blender pan binding worth verifying (M12).

### Guide 4 — Starting a Sketch
- TNP framing is verified accurate. Consider stronger language about face-sketches still being risky for sketches that downstream features will reference (see "Verified correct" section).

### Guide 5 — Lines & Polylines
- Shortcuts correct.

### Guide 6 — Circles & Arcs
- `G, G` for tangent arc unverified — likely doesn't exist as a dedicated shortcut in 1.0 (C2 / E2).

### Guide 7 — Rectangles & Polygons
- `G, O` for centered rectangle is **wrong** — actual is `G, V` (C2).
- `G, P` for polygon needs `G, P, R` qualifier (C2).

### Guide 8 — Construction Geometry
- `G, N` correct.

### Guide 9 — Sketch Editing
- `G, E` for Extend is **wrong** — actual is `G, Q` (C2).
- `G, F` for Fillet should be `G, F, F` (C2).

### Guide 10 — Geometric Constraints
- All `K, X` shortcuts wrong for FreeCAD 1.0 (C1). Should be single-letter (C, H, V, P, N, T, E, S, A=auto-HV, K,B for Block).

### Guide 11 — Dimensional Constraints
- `K, D` is legacy, smart Dimension is `D` (C3).
- `K, H` / `K, V` for horizontal/vertical distance are wrong — actual `L` and `I` (C1).
- `K, N` for diameter is wrong — actual `K, O` (C1).
- `K, R`, `K, A`, `K, L` are correct.

### Guide 12 — Fully Constraining
- Excellent guide. No accuracy issues. Insight is strong.

### Guide 13 — Symmetry & Centerlines
- The `K, S` reference (line 57) is wrong if Guide 10 is updated — Symmetric is just `S` in 1.0 (C1).

### Guide 14 — Pad
- Mode list incomplete (C6). Symmetric is a checkbox not a Type. Missing Through-all / To-last / Up-to-shape.

### Guide 15 — Pocket
- Mode label "Up to first" should be "To first" — minor wording (C6 spillover). Otherwise good.

### Guide 18 — Hole Feature
- Counterbore values are wrong (C4) — used screw head Ø not counterbore Ø. Critical fix.
- Tap drill values for M3/M4/M5/M6 (2.5/3.3/4.2/5.0) — verified correct.
- Clearance values for M3/M4/M5/M6 (3.2/4.3/5.3/6.4) — verified correct (these are ISO 273 close/fine fit).

### Guide 20 — Draft
- Accurate but niche for FDM. Consider replacement (E5).

### Guide 25 — ShapeBinders
- Menu path wrong (C5). External Geometry framing one major version out of date (M8).

### Guide 26 — STEP & Mesh Import
- Menu names slightly off (M9). Tone is correct.

### Guide 27 — Walls & Overhangs
- Wall = N × nozzle ø is approximate; should be N × extrusion-width (E9).

### Guide 28 — Tolerances & Clearance
- Numbers are reasonable defaults; add orientation caveat (E11).

### Guide 29 — STL Export & Orientation
- Quality "presets" aren't real UI presets in FreeCAD's STL dialog (M10).
- No mention of binary STL (E12).

### Guide 30 — Pitfalls & Recovery
- All six pitfalls are accurate and well-described. Strong guide.

---

## Sources cited

### FreeCAD 1.0 documentation (current wiki, mirrored on GitHub)
- Sketcher Workbench overview: https://github.com/FreeCAD/FreeCAD-documentation/blob/main/wiki/Sketcher_Workbench.md
- Release notes 1.0: https://wiki.freecad.org/Release_notes_1.0 (and GitHub mirror: https://github.com/FreeCAD/FreeCAD-documentation/blob/main/wiki/Release_notes_1.0.md)
- Drawing tool shortcuts (verified individually):
  - Line `G, L` — `Sketcher_CreateLine.md`
  - Polyline `G, M` — `Sketcher_CreatePolyline.md`
  - Circle `G, C` — `Sketcher_CreateCircle.md`
  - Arc `G, A` — `Sketcher_CreateArc.md`
  - Rectangle `G, R` (M cycles modes; centered = `G, V`; rounded = `U`; frame = `J`) — `Sketcher_CreateRectangle.md`
  - Polygon `G, P, R` (Regular Polygon) — `Sketcher_CreateRegularPolygon.md`
  - Trim `G, T` — `Sketcher_Trimming.md`
  - Extend `G, Q` — `Sketcher_Extend.md`
  - Split `G, Z` — `Sketcher_Split.md`
  - Sketch Fillet `G, F, F` — `Sketcher_CreateFillet.md`
  - Toggle Construction `G, N` — `Sketcher_ToggleConstruction.md`
- Constraint shortcuts (verified individually):
  - Coincident `C` — `Sketcher_ConstrainCoincidentUnified.md`
  - Horizontal `H` — `Sketcher_ConstrainHorizontal.md`
  - Vertical `V` — `Sketcher_ConstrainVertical.md`
  - Auto-HV `A` — `Sketcher_ConstrainHorVer.md`
  - Parallel `P` — `Sketcher_ConstrainParallel.md`
  - Perpendicular `N` — `Sketcher_ConstrainPerpendicular.md`
  - Tangent `T` — `Sketcher_ConstrainTangent.md`
  - Equal `E` — `Sketcher_ConstrainEqual.md`
  - Symmetric `S` — `Sketcher_ConstrainSymmetric.md`
  - Block `K, B` — `Sketcher_ConstrainBlock.md`
  - Dimension (smart) `D` — `Sketcher_Dimension.md`
  - Distance `K, D` — `Sketcher_ConstrainDistance.md`
  - Horizontal Distance `L` — `Sketcher_ConstrainDistanceX.md`
  - Vertical Distance `I` — `Sketcher_ConstrainDistanceY.md`
  - Radius `K, R` — `Sketcher_ConstrainRadius.md`
  - Diameter `K, O` — `Sketcher_ConstrainDiameter.md`
  - Angle `K, A` — `Sketcher_ConstrainAngle.md`
  - Lock `K, L` — `Sketcher_ConstrainLock.md`
- Pad / Pocket modes — `PartDesign_Pad.md`, `PartDesign_Pocket.md` (lists Dimension / Through all / To first / To last / Up to face / Two dimensions / Up to shape; Symmetric is a checkbox)
- SubShapeBinder location — `PartDesign_SubShapeBinder.md`, `PartDesign_Workbench.md` (under Helper tools)
- Auto refine preferences — GitHub issues #17846, #25465, #13472

### TNP context
- FreeCAD 1.0 release announcement (Hackster.io): https://www.hackster.io/news/freecad-hits-1-0-after-two-decades-finally-sees-an-end-to-the-toponaming-problem-7e7ac2df3e63
- Ondsel blog "Topological naming problem is history": https://www.ondsel.com/blog/toponaming-problem-is-history/
- Open TNP regressions: GitHub issues #17041, #17554, #18671, #29154 (FreeCAD/FreeCAD)

### ISO / DIN standards
- **ISO 273:1979** — Fasteners — Clearance holes for bolts and screws (clearance Ø values for M3/M4/M5/M6 close fit: 3.2 / 4.3 / 5.3 / 6.4 — confirmed correct in Guide 18)
- **ISO metric coarse thread tap drills** — M3 → 2.5; M4 → 3.3; M5 → 4.2; M6 → 5.0 (confirmed correct in Guide 18)
- **DIN 974-1:2008** — Diameters of counterbores. Standard counterbore Ø d2 / depth t2 for ISO 4762 socket caps: M3 6.5/3.5; M4 8.0/4.6 (or 4.8); M5 10.0/5.7 (or 5.8); M6 11.0/6.8. (Guide 18 currently uses screw-head Ø not counterbore Ø — see C4.)
- **ISO 4762:2004** — Hexagon socket head cap screws (head diameters dk: M3 5.5; M4 7.0; M5 8.5; M6 10.0 — these are what Guide 18 mistakenly inserted into the "counterbore Ø" column)
- Reference compilation: https://engineersbible.com/counterbore-socket-din/
