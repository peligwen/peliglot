/**
 * Canonical positioning copy for Peliglot.
 *
 * Single source of truth consumed by LandingPage, future SEO meta tags,
 * OG cards, and the donation/supporters page.
 *
 * Voice rules: direct, occasionally dry. No LinkedIn-speak.
 * Eclectic + textbook-averse + opinionated are the three notes.
 */

export type CollectionSlug =
  | 'spanish'
  | 'arabic'
  | 'english'
  | 'german'
  | 'hawaiian'
  | 'music'
  | 'jazz-guitar'
  | 'math'
  | 'ai-interaction'
  | 'freecad';

/** ≤80 chars. Goes in <meta name="description"> and OG site card. */
export const siteTagline =
  'Free interactive guides for languages and more. No ads, no accounts.';

/**
 * The longer hero copy. 1–3 sentences.
 * Used as the lead on the landing page.
 */
export const siteHeroPitch =
  'Ten collections. Over 300 guides. Built by one person who wanted to learn, not to be marketed to.';

/**
 * Who this is for.
 * Used in the "For / Not for" block on the landing page.
 */
export const siteFor = [
  'People who would rather tinker than watch a lecture.',
  'Learners who bounce between wildly different topics and call it a personality.',
  'Anyone who picked up a textbook once and put it back down.',
] as const;

/**
 * What this is not.
 * Parallel to siteFor. Keeps the positioning honest.
 */
export const siteIsNot = [
  'A course platform. No certificates, no modules, no "learning paths."',
  'Duolingo. Gamification serves the learning, not the streak.',
] as const;

/**
 * One short intro line per section heading on the landing page.
 */
export const sectionIntros: { Languages: string; BeyondLanguage: string } = {
  Languages:
    'Five languages, each with its own dialect notes, cultural context, and audio.',
  BeyondLanguage:
    'The same hands that wrote the Spanish guides also built music theory, jazz guitar, and FreeCAD.',
};

/**
 * One-liner per collection. ~80–120 chars each.
 * Lean into per-collection idiosyncrasies — Mexican Spanish, Hawaiian revival,
 * dry FreeCAD, "you already play guitar" Jazz Guitar, Spanish-speaker English.
 */
export const collectionOneLiners: Record<CollectionSlug, string> = {
  spanish:
    'ser/estar, subjuntivo, boot verbs, and false cognates — Mexican and US Spanish throughout.',

  arabic:
    'Script, roots, and verb forms. Palestinian dialect notes woven in from the start.',

  english:
    'Inglés americano para hispanohablantes: sonidos, verbos, artículos y phrasal verbs. Notas de Chattanooga.',

  german:
    'Cases, der/die/das, verb brackets, modal particles — the parts no one explains clearly.',

  hawaiian:
    'Sounds, sentences, possessives, and the revival story behind a language that nearly disappeared.',

  music:
    'Notes through chord progressions through genre, with playable audio at every step.',

  'jazz-guitar':
    'Voice leading, shell voicings, drop 2, tritone subs — written for musicians, not beginners.',

  math:
    'Number sense through personal finance: algebra, geometry, and data without the worksheet energy.',

  'ai-interaction':
    'How LLMs actually work, how to prompt them well, and what to watch out for.',

  freecad:
    'Sketches, constraints, Part Design, and 3D-print workflow — a cheat sheet for daily use.',
};

/**
 * Donation / supporters context.
 * Warm and matter-of-fact. Not a pitch, not a plea.
 * Will appear on a future Supporters page and possibly in the footer.
 */
export const siteSupportPitch =
  'Peliglot is free and has no ads. If it has saved you time or taught you something, ' +
  'a small donation keeps the lights on — and gets your name in the credits.';
