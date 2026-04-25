# Plan: FreeCAD Guide for 3D Printing

## Context

Peliglot is a static-site collection of interactive learning guides (languages + "Beyond Language" topics like Music, Jazz Guitar, Math). Each guide is a single self-contained HTML file hosting a React/Babel app with ~30 curated sub-guides, a category structure, and custom interactive components tailored to the topic (e.g., piano keyboard for Music, fretboard diagrams for Jazz Guitar).

The user wants a new "Beyond Language" guide for **developing models for 3D printing using FreeCAD** — framed as a cheat sheet for ~95% of what a user does in a daily FreeCAD session.

## Goal

A new `guides/freecad.html` page shipped in the same visual/structural pattern as `guides/jazz-guitar.html` / `guides/math.html`:

- Single self-contained HTML file using React 18 + Babel standalone from CDN
- ~30 sub-guides covering daily FreeCAD 3D-printing workflow
- Organized into ~5–7 categories (e.g., Setup, Sketching, Part Design, Modifications, Patterns, Export/Print)
- Custom interactive diagrams where they meaningfully aid understanding (SVG sketches with constraints, parametric trees, workbench flow diagrams, etc.)
- Linked from `index.html` with a card in the "Beyond Language" section
- Theme: a distinctive FreeCAD-appropriate color palette (the FreeCAD brand is a blueprint/technical feel — deep blue + warm orange accents)

## Constraints

- Do NOT change the structural pattern of other guides. Match the conventions exactly: same CDN deps, same layout shell, same navigation/category UI pattern as jazz-guitar.html (which is the closest analogue — technical skill for experienced practitioners).
- Self-contained HTML — no build step, no external assets beyond the existing CDN scripts and Google Fonts.
- Content must be accurate FreeCAD 1.0+ advice. Assume the reader is on a recent stable version (FreeCAD 1.0 shipped late 2024 with the Toponaming fix — that matters). Part Design workbench is the primary focus; mention Part and Draft workbenches only where they're commonly needed alongside Part Design.
- Content quality: a practicing FreeCAD user should read a guide and say "yes, that's how I'd describe it." No hand-wavy generalities; each guide should have 2–4 concrete, actionable items — the kind of thing that saves someone from opening the forums.
- Leave the codebase cleaner — fix any obvious nearby issues while touching index.html.

## Phases

### Phase 1 — Scaffold freecad.html
Create the file with: HTML shell (CDN deps, blueprint/navy+orange theme), `guidesMeta` with 30 pre-curated topics in 6 categories (Setup, Sketching, Constraints, Features, Structure, 3D Printing), shared components (Card/DarkBox/Insight/Ref), custom `SketchDiagram` SVG widget for annotated 2D sketches with constraint glyphs, optional `FeatureTree` widget, 30 `GuideN` stubs (DarkBox "Coming soon" + Insight), full `App` with category filter + grid + detail-view/back-button navigation.

### Phase 2 — Author Guides 1–15 (depends on Phase 1)
Replace stubs 1–15 with expert FreeCAD 1.0+ content: New File & Units, Workbenches Tour, Navigation & View, Starting a Sketch, Lines & Polylines, Circles & Arcs, Rectangles & Polygons, Construction Geometry, Sketch Editing, Geometric Constraints, Dimensional Constraints, Fully Constraining, Symmetry & Centerlines, Pad, Pocket. Each: DarkBox intro + interactive element + Insight (and Ref where relevant).

### Phase 3 — Author Guides 16–30 (depends on Phase 2)
Replace stubs 16–30: Revolution & Groove, Loft & Additive Pipe, Hole Feature, Fillet & Chamfer, Draft, Patterns, Body & Part Containers, Datum Planes & Axes, Spreadsheet Parameters, External Geometry & ShapeBinders, STEP & Mesh Import, Wall Thickness & Overhangs, Tolerances & Clearance, STL Export & Orientation, Pitfalls & Recovery (TNP, broken sketches).

### Phase 4 — Wire into index.html (depends on Phase 3)
Add one `.guide-card` in the "Beyond Language" section linking to `guides/freecad.html`, matching the visual pattern with a blueprint-navy-to-orange `card-accent` gradient and the final hex values used in the guide.

## Status

- [x] Phase 1: Scaffold freecad.html
- [x] Phase 2: Author Guides 1–15
- [x] Phase 3: Author Guides 16–30
- [x] Phase 4: Wire into index.html
