/**
 * chordToneArray(symbol, options) — parse a chord symbol and return its pitch
 * names in scientific notation (e.g. "C4", "E4", "G4", "B4").
 *
 * CONTRACT
 * --------
 * @param symbol   Chord symbol, e.g. "Cmaj7", "G7", "Dm7b5", "Bb13"
 * @param options
 *   octave  Root octave (tones stay close above root). Default 4.
 *
 * @returns Scientific-pitch strings, root first.
 *   Example: chordToneArray("Cmaj7")       → ["C4","E4","G4","B4"]
 *            chordToneArray("Dm7b5")        → ["D4","F4","Ab4","C5"]
 *            chordToneArray("G7b9")         → ["G4","B4","D5","F5","Ab5"]
 *            chordToneArray("C", {octave:3})→ ["C3","E3","G3"]
 *
 * SUPPORTED QUALITIES
 * -------------------
 * Major triad:          "C", "Cmaj"
 * Minor triad:          "Cm", "Cmin"
 * Diminished triad:     "Cdim", "C°"
 * Augmented triad:      "Caug", "C+"
 * Dominant 7:           "C7"
 * Major 7:              "Cmaj7", "CM7", "CΔ7"
 * Minor 7:              "Cm7"
 * Half-dim 7 (m7b5):    "Cm7b5", "Cø", "Cø7"
 * Diminished 7:         "Cdim7", "C°7"
 * Minor-major 7:        "CmM7"
 * Dominant 9:           "C9"
 * Dominant 11:          "C11"
 * Dominant 13:          "C13"
 * Alt. 7 extensions:    "C7b9", "C7#9", "C7#11", "C7b13"
 *
 * ROOT PARSING
 * ------------
 * Roots: A–G, followed by optional # / b / ♭ / ♯.
 * Accidentals: b → flat, # → sharp. Double accidentals not supported.
 *
 * VOICING NOTE
 * ------------
 * This function returns tones only — it does NOT handle voicings (drop-2 etc.).
 * The caller chooses octave/layout. Tones are stacked in close position above
 * the root octave (no tone lower than the root, 7ths etc. wrap to the next
 * octave as needed).
 *
 * EXPECTED OUTPUTS (documentation tests — run manually or with a test runner)
 * ---------------------------------------------------------------------------
 * chordToneArray("C")        → ["C4","E4","G4"]
 * chordToneArray("Cm")       → ["C4","Eb4","G4"]
 * chordToneArray("Cdim")     → ["C4","Eb4","Gb4"]
 * chordToneArray("Caug")     → ["C4","E4","G#4"]
 * chordToneArray("C7")       → ["C4","E4","G4","Bb4"]
 * chordToneArray("Cmaj7")    → ["C4","E4","G4","B4"]
 * chordToneArray("CM7")      → ["C4","E4","G4","B4"]
 * chordToneArray("Cm7")      → ["C4","Eb4","G4","Bb4"]
 * chordToneArray("Cm7b5")    → ["C4","Eb4","Gb4","Bb4"]
 * chordToneArray("Cdim7")    → ["C4","Eb4","Gb4","A4"]
 * chordToneArray("CmM7")     → ["C4","Eb4","G4","B4"]
 * chordToneArray("C9")       → ["C4","E4","G4","Bb4","D5"]
 * chordToneArray("C11")      → ["C4","E4","G4","Bb4","D5","F5"]
 * chordToneArray("C13")      → ["C4","E4","G4","Bb4","D5","F5","A5"]
 * chordToneArray("G7b9")     → ["G4","B4","D5","F5","Ab5"]
 * chordToneArray("G7#9")     → ["G4","B4","D5","F5","Bb5"]   (A#→Bb via flat normalisation)
 * chordToneArray("G7#11")    → ["G4","B4","D5","F5","A5","Db6"]  (C#→Db via flat normalisation)
 * chordToneArray("G7b13")    → ["G4","B4","D5","F5","A5","C6","Eb6"]
 */

/** Chromatic pitch names (sharp spelling). */
const PITCHES: string[] = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

/** Enharmonic flat spellings for display. */
const FLAT_NAMES: Record<string, string> = { 'C#':'Db','D#':'Eb','F#':'Gb','G#':'Ab','A#':'Bb' };

/** Convert semitone index (0=C) to a display name, preferring flats for black keys. */
function semitoneToName(semi: number): string {
  const name = PITCHES[((semi % 12) + 12) % 12];
  return FLAT_NAMES[name] || name;
}

/** Convert a root name (e.g. "Bb", "F#") to semitone 0–11. */
const ROOT_SEMITONES: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
  'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
};

/**
 * Build a sorted list of relative semitones from root for a set of interval names.
 * intervals is a flat array of semitone offsets.
 */
function toSPN(rootSemi: number, octave: number, intervals: number[]): string[] {
  const result: string[] = [];
  let prevAbsolute = rootSemi + octave * 12;
  for (const interval of intervals) {
    // Keep each tone at or above the previous one (close position stacking).
    let absolute = rootSemi + octave * 12 + interval;
    while (absolute < prevAbsolute) absolute += 12;
    const oct = Math.floor(absolute / 12);
    const semi = absolute % 12;
    result.push(semitoneToName(semi) + oct);
    prevAbsolute = absolute;
  }
  return result;
}

/**
 * Quality → semitone interval array (root omitted, relative to root=0).
 * Each entry is an array of semitone offsets that define the chord tones.
 */
const QUALITIES: Record<string, number[]> = {
  // Triads
  'maj':   [4, 7],
  'm':     [3, 7],
  'dim':   [3, 6],
  'aug':   [4, 8],
  // Seventh chords
  'maj7':  [4, 7, 11],
  'M7':    [4, 7, 11],
  'Δ7':    [4, 7, 11],
  'm7':    [3, 7, 10],
  '7':     [4, 7, 10],
  'mM7':   [3, 7, 11],
  'm7b5':  [3, 6, 10],
  'ø':     [3, 6, 10],
  'ø7':    [3, 6, 10],
  'dim7':  [3, 6, 9],
  '°':     [3, 6],
  '°7':    [3, 6, 9],
  // Extended
  '9':     [4, 7, 10, 14],
  '11':    [4, 7, 10, 14, 17],
  '13':    [4, 7, 10, 14, 17, 21],
  // Alterations on dominant 7
  '7b9':   [4, 7, 10, 13],
  '7#9':   [4, 7, 10, 15],
  '7#11':  [4, 7, 10, 14, 18],
  '7b13':  [4, 7, 10, 14, 17, 20],
};

/**
 * Quality tokens sorted longest-first so greedy matching works correctly
 * (e.g. "maj7" is tried before "maj" and "7", "m7b5" before "m7" before "m").
 */
const QUALITY_TOKENS: string[] = Object.keys(QUALITIES).sort((a, b) => b.length - a.length);

interface ParsedChord {
  rootName: string;
  rootSemi: number;
  intervals: number[];
}

/**
 * Parse root and quality from a chord symbol.
 * Returns { rootName, rootSemi, intervals } or throws on bad input.
 */
function parseChord(symbol: string): ParsedChord {
  let rest = symbol.trim();

  // Parse root note (A–G) + optional accidental (b, ♭, #, ♯)
  const rootMatch = rest.match(/^([A-G])(bb|##|[b♭#♯])?/);
  if (!rootMatch) throw new Error(`chordToneArray: cannot parse root from "${symbol}"`);

  let rootName = rootMatch[1];
  const acc = rootMatch[2];
  if (acc === 'b' || acc === '♭') rootName += 'b';
  else if (acc === '#' || acc === '♯') rootName += '#';
  rest = rest.slice(rootMatch[0].length);

  const rootSemi = ROOT_SEMITONES[rootName];
  if (rootSemi === undefined) throw new Error(`chordToneArray: unknown root "${rootName}"`);

  // Match quality (longest-first)
  let intervals: number[] | null = null;
  for (const token of QUALITY_TOKENS) {
    if (rest === token || rest.startsWith(token)) {
      intervals = QUALITIES[token];
      rest = rest.slice(token.length);
      break;
    }
  }

  // No quality token → major triad
  if (intervals === null) {
    intervals = QUALITIES['maj'];
  }

  // Any remaining text is unrecognised — ignore silently so new extensions
  // degrade gracefully rather than throwing.

  return { rootName, rootSemi, intervals };
}

/**
 * chordToneArray — main export.
 */
export function chordToneArray(symbol: string, options: { octave?: number } = {}): string[] {
  const { octave = 4 } = options;
  const { rootSemi, intervals } = parseChord(symbol);
  return toSPN(rootSemi, octave, [0, ...intervals]);
}
