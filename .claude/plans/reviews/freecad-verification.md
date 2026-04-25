# FreeCAD Verification — Did the prior review's fixes land?

## Summary

- **8 / 8 critical issues resolved** (one as a clean variant — see C2).
- **High-priority minor issues (M1, M2, M4, M5, M7, M9, M10, M11, M13): 9 / 9 resolved.**
- **High-priority effectiveness improvements (E1, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14): 13 / 13 applied.**
- **Open issues:** none.
- **Regressions introduced by the fix commits:** none observed. All fixes are localised to the cited file/lines and `npm run check` passes.
- One non-issue worth flagging: **Heat-Set Inserts is `id: 20` but `cat: "3D Printing"`** (per `meta.js:21`), while the immediately-adjacent ids 19 and 21 are `Features`. The sidebar groups by category (it's not a flat ordered list), so Heat-Set will appear in the "3D Printing" section between guides 26 and 30 and the numeric badges within "3D Printing" run 20, 26, 27, 28, 29, 30. That's a deliberate design choice from commit `d5007b0` (the swap from Draft to Heat-Set), not a regression. If contiguous numbering across the bottom of the deck matters, the fix is to renumber 20 ↔ 21 ↔ 26 etc.; not recommended.

The fix commits applied are:
- `d4cf99b` — "Fix accuracy and effectiveness issues from comprehensive review" (16 files, +80/-60).
- `d5007b0` — "Replace Draft guide with Heat-Set Inserts; apply remaining review polish" (15 files, +114/-50).

Together they touched all the files the review called out, plus `meta.js` for the Draft→Heat-Set rename and `_helpers.jsx` for the new `node.tip` prop on `FeatureTree`.

---

## Per-issue verification

### C1 — Sketcher constraint shortcuts (Guides 10, 11, 13)
**Status:** Resolved.
**Files:** `src/guides/freecad/guides/guide10.jsx:8–17`, `guide11.jsx:7–16`, `guide13.jsx:10`.
**What I checked:** The 8 geometric constraints in Guide 10 now read `C / H / V / P / N / T / E / S` (the correct FreeCAD 1.0 single-letter scheme). The `K, N` self-collision (Perpendicular vs Diameter) is gone — Perpendicular is `N`, Diameter is `K, O`. Guide 11's dimensional list shows `D` for smart Dimension, `K, D` for legacy Distance, `L` for Horizontal distance, `I` for Vertical distance, `K, R` for Radius, `K, O` for Diameter, `K, A` for Angle, `K, L` for Lock — all matching the wiki sources cited in the original review. The DarkBox intro at Guide 10 lines 20–22 calls out "single-letter shortcuts (C, H, V, P, N, T, E, S)" explicitly. Guide 13's Symmetric reference at line 10 says "Symmetric constraint (S)" — no `K, S` typo.
**Notes:** Clean fix. No regressions.

### C2 — Sketcher draw-tool shortcuts (Guides 5, 6, 7, 9)
**Status:** Resolved (variant for tangent arc).
**Files:** `guide5.jsx:9–10`, `guide6.jsx:8–11`, `guide7.jsx:18–28`, `guide9.jsx:8–25`.
**What I checked:**
- Guide 5: `G, L` (Line) and `G, M` (Polyline) — already correct, untouched.
- Guide 6: tangent-arc claim no longer says `G, G`. New copy at `guide6.jsx:11` reads `"G, A → M"` with the explanation "Draw an arc with G, A, then press M to cycle modes — the endpoint-tangent mode auto-applies the tangent constraint." That's a documented variant of the original recommendation (which said either remove or document the in-1.0 method) — counted as **Resolved (variant)**, exactly what the review framework allows.
- Guide 7: Centered Rectangle is now `G, V` (line 18 and the diagram label at line 27), Polygon is `G, P, R` (line 18, line 28 label).
- Guide 9: Extend is `G, Q` (line 13), Fillet is `G, F, F` (line 20). Trim `G, T`, Split `G, Z` correct as before.
**Notes:** All four guides match the wiki sources. The G,A → M tangent-arc framing is more honest than a fake `G, G` shortcut.

### C3 — Smart Distance shortcut (Guide 11)
**Status:** Resolved.
**File:** `src/guides/freecad/guides/guide11.jsx:8–9, 59`.
**What I checked:** Top of the shortcut list now reads:
```
{key:"D",action:"Dimension (contextual: distance, radius, angle…)"},
{key:"K, D",action:"Distance — point-to-point / length (legacy)"},
```
The Insight at line 59 now says "Use D (Dimension) by default in FreeCAD 1.0" and explicitly calls `K, D` "the legacy point-to-point distance tool." The two are correctly disambiguated.
**Notes:** Clean.

### C4 — Counterbore values in Guide 18
**Status:** Resolved.
**File:** `src/guides/freecad/guides/guide18.jsx:11–16`.
**What I checked:** The `data` array now has DIN 974-1 counterbore values:
- M3: `cbDia: 6.5, cbDepth: 3.5`
- M4: `cbDia: 8.0, cbDepth: 4.6`
- M5: `cbDia: 10.0, cbDepth: 5.7`
- M6: `cbDia: 11.0, cbDepth: 6.8`

These match the DIN 974-1 normal series exactly. The previous (wrong) values that were **screw-head dimensions from ISO 4762** are gone.
**Notes:** Clearance values (3.2/4.3/5.3/6.4) and tap-drill values (2.5/3.3/4.2/5.0) — both already correct, untouched, still correct. Heat-set insert callout added at lines 83–85 (E4 satisfied).

### C5 — SubShapeBinder menu path (Guide 25)
**Status:** Resolved.
**File:** `src/guides/freecad/guides/guide25.jsx:10`.
**What I checked:** Now reads:
```
"In Part Design, use 'Part Design > Helper tools > Create a sub-object(s) shape binder' (toolbar icon also available) …"
```
The bogus `Model > Helpers` path is gone. Also includes the Claim Children property tip ("set the binder's 'Claim children' property to true so the source body can be moved or edited freely without re-breaking the link") at line 10, satisfying E8.
**Notes:** External Geometry framing also softened at line 9 ("FreeCAD 1.0's TNP fix has substantially improved reliability here, but cross-body references via raw External Geometry are still the more fragile choice") — addresses M8 implicitly.

### C6 — Pad mode list (Guide 14)
**Status:** Resolved.
**File:** `src/guides/freecad/guides/guide14.jsx:9–17, 33–35, 39–43`.
**What I checked:** Modes array now has all 7 FreeCAD 1.0 types: Dimension / Through all / Two Dimensions / To first / To last / Up to face / Up to shape. "Symmetric" is no longer listed as a mode — instead, lines 39–43 render a separate **Symmetric to plane checkbox** that's only enabled when `mode === 0 || mode === 1` (Dimension or Through-all), with a hint "checkbox modifier — combines with Dimension or Through-all". The DarkBox at lines 33–35 says "FreeCAD 1.0 has 7 Type modes plus a Symmetric to plane checkbox that combines with Dimension or Through-all" — the architecture is correctly modeled. "Up to shape" is flagged as new in 1.0 in its description.
**Notes:** This is the most architecturally substantial fix in the batch and it landed cleanly. The interactive (which arrows render for which mode) was rebuilt to match the new mode set — all 7 modes have correct arrow geometry at lines 21–29.

### C7 — V, F / V, O view shortcuts (Guide 3)
**Status:** Resolved.
**File:** `src/guides/freecad/guides/guide3.jsx:20–21`.
**What I checked:** The shortcuts list now shows `V, F — Fit all` and `V, P — Toggle perspective`. The unverified `V, O` is gone, replaced with the documented `V, P`.
**Notes:** Clean.

### C8 — Auto refine framing (Guide 1)
**Status:** Resolved.
**File:** `src/guides/freecad/guides/guide1.jsx:16`.
**What I checked:** The auto-refine row now reads:
```
{path:"Edit > Preferences > Part Design","setting":"Auto refine model","value":"Default ON; toggle OFF if you hit helix/thread/cascading-fillet weirdness after booleans"}
```
The "OFF — causes Toponaming issues" oversimplification is gone. The replacement framing matches the nuanced reality (default is ON; toggle OFF only as a workaround for specific symptoms).
**Notes:** Auto-save row at line 13 also fixed (M1 — see below) — same commit improved both Guide 1 prefs.

---

## High-priority minor / effectiveness items

### M1 — Auto-save default (Guide 1)
**Status:** Resolved. `guide1.jsx:13` — "Default OFF — turn ON, set interval ≤ 5 min." Matches the actual FreeCAD 1.0 default.

### M2 — Revolution error text (Guide 16)
**Status:** Resolved. `guide16.jsx:52` — "FreeCAD refuses with the error 'BRep_API: command not done' (or 'profile is across the axis of revolution' in newer 1.0 builds)." Concrete error text now reproduced for the user.

### M4 — Slicer hole compensation note (Guide 18)
**Status:** Resolved. `guide18.jsx:86` — Insight now says "unless your slicer's hole compensation (PrusaSlicer 'Elephant foot compensation' / Bambu 'XY hole compensation') is already enabled, in which case the nominal ISO value is fine." Honest about the slicer-side adjustment.

### M5 — Mirror diagram axis labels (Guide 21)
**Status:** Resolved. `guide21.jsx:57–63` — X and Y axis labels are now drawn into the mirror SVG with arrow indicators. "YZ datum plane (mirror)" is also labelled.

### M7 — Spreadsheet renaming caveat (Guide 24)
**Status:** Resolved. `guide24.jsx:30` — "The expression uses the spreadsheet's label, not its filename — if you rename the Spreadsheet object in the tree, every `=Spreadsheet.X` reference will break. Pick a stable label early."

### M9 — Mesh import menu names (Guide 26)
**Status:** Resolved. `guide26.jsx:13` — Steps now use the actual 1.0 menu names: "Mesh > Mesh to Shape (optional: Refine shape from mesh — lossy)" and "Part > Convert to solid."

### M10 — STL "presets" reframing (Guide 29)
**Status:** Resolved. `guide29.jsx:23` — DarkBox now says "FreeCAD's STL dialog has two parameters — Linear deflection (max edge length) and Angular deflection (degrees). There are no preset names; the labels below are values you'd enter for each quality level." Plus the section header at line 25: "Mesh refinement (values to enter)." Honest framing.

### M11 — `.FCBak` cannot open directly (Guide 30)
**Status:** Resolved. `guide30.jsx:10` — "To open one, rename it from foo.FCStd1.FCBak → foo.FCStd (issue #26833 — FreeCAD won't open .FCBak directly)." Concrete recovery instruction included.

### M13 — Diagram glyph legends (Guides 5, 10)
**Status:** Resolved. `guide5.jsx:43–48` and `guide10.jsx:27–31` both now render an inline glyph legend below the diagram showing the orange-dot = coincident, orange-mark = H/V/parallel/equal/tangent conventions. Symbols are unambiguous.

### E3 — Pad Symmetric advice softening (Guide 14)
**Status:** Resolved. `guide14.jsx:59` — Insight ends with "For asymmetric parts (where one side is mounted/referenced), don't force Symmetric — plain Dimension off the appropriate face is clearer and just as stable." Doesn't blanket-promote Symmetric.

### E4 — Heat-set insert callout in Guide 18
**Status:** Resolved. `guide18.jsx:83–85` — dedicated callout for the Ø4.0 mm × 4.0 mm M3 brass insert, with reference to Guide 20 for the full treatment.

### E5 — Replace Draft (Guide 20) with Heat-Set Inserts
**Status:** Resolved. `src/guides/freecad/guides/guide20.jsx` is a brand-new ~80-line component covering M2/M3/M4/M5 sizes with hole/depth/edge-clearance data, an installation procedure (5 steps with iron temperatures 245–280 °C), top + section SVG diagrams, and a "When NOT to use" callout. `meta.js:21` now says `title:"Heat-Set Inserts", subtitle:"Brass threads for printed plastic", cat:"3D Printing"`. The Draft content is gone.

### E6 — Tip badge in FeatureTree (Guide 22)
**Status:** Resolved. `_helpers.jsx:79–83` — `FeatureTree` now reads `node.tip` and renders an orange "TIP" badge with a distinctive background. `guide22.jsx:14, 23, 27` mark the appropriate features with `tip: true`.

### E7 — Spreadsheet expressions inside spreadsheet (Guide 24)
**Status:** Resolved. `guide24.jsx:32–34` — second callout titled "Expressions inside the spreadsheet itself" with the example `=wall * 2` and the framing "Encode design intent, not just numbers."

### E8 — ShapeBinder Claim children (Guide 25)
**Status:** Resolved. See C5 above — included in same fix.

### E9 — Wall = N × extrusion-width caveat (Guide 27)
**Status:** Resolved. `guide27.jsx:34–35` — slicer caveat callout: "wall = N × your slicer's configured extrusion width, not nozzle diameter." The 0.42–0.48 mm extrusion-width range is named.

### E10 — Bridge length in supportless design (Guide 27)
**Status:** Resolved. `guide27.jsx:55` — "Bridge spans: Unsupported horizontal bridges print fine up to ~30 mm with good cooling, ~50 mm at the limits." Added to the supportless-design moves list.

### E11 — Hole orientation caveat (Guide 28)
**Status:** Resolved. `guide28.jsx:53` — "Hole orientation matters: the numbers above assume vertical-axis holes…Holes with a horizontal axis (printed layer-by-layer) deform less in diameter but more in roundness…increase clearance by another +0.1 mm or reorient the part if the hole is critical."

### E12 — Binary STL recommendation (Guide 29)
**Status:** Resolved. `guide29.jsx:48` — dedicated callout: "Pick Binary STL, not ASCII — same geometry, roughly half the file size."

### E13 — Validate Sketch surfaced (Guide 30)
**Status:** Resolved. `guide30.jsx:8` — Self-intersecting profile recovery now reads "Open Sketch > Validate Sketch — it's the canonical recovery tool: highlights overlapping/crossing edges, missing coincidents, and reversed segments in one pass."

### E14 — Stronger Insights for Guide 2 and Guide 16
**Status:** Resolved.
- Guide 2: `guide2.jsx:29` — "Activating a workbench just swaps the toolbar… Right-click any toolbar to mix tools across workbenches (e.g. enable Sketcher constraints while in Mesh)…" Concrete actionable tip.
- Guide 16: `guide16.jsx:54` — "Revolutions inherit the sketch plane's normal as the default axis. Build the profile on XZ and revolve around Z, and the part stands up the Z-axis automatically — ready to export and print without re-orienting in the slicer."

---

## Conclusion

All 8 critical issues (C1–C8), all high-priority minor issues, and all listed effectiveness improvements landed cleanly between commits `d4cf99b` and `d5007b0`. The accompanying `npm run check` runs in both commits' messages — and again in this verification — confirms no build/lint/validate regressions. The FreeCAD collection is ship-ready for the originally cited critique.
