/**
 * Data for Guide 22: Comparativos e Irregulares (Comparatives & Irregulars).
 *
 * `irregs` contains the 4 irregular comparative forms.
 * For grande and pequeño, TWO comparative forms are valid:
 *   - grande → mayor (specializes for age/importance) OR más grande
 *   - pequeño → menor (specializes for age) OR más pequeño
 * The canonical answer uses the truly irregular form (mayor/menor);
 * the regular periphrastic form lives in acceptableAnswers.
 */

export interface IrregComp {
  /** Positive (base) adjective */
  reg: string;
  /** Comparative form(s) — slash-separated when dual */
  comp: string;
  /** Superlative form(s) */
  sup: string;
  /** English gloss */
  en: string;
}

export const irregs: IrregComp[] = [
  {reg:"bueno", comp:"mejor",                    sup:"el/la mejor",                          en:"good → better → best"},
  {reg:"malo",  comp:"peor",                     sup:"el/la peor",                           en:"bad → worse → worst"},
  {reg:"grande",comp:"más grande / mayor",        sup:"el/la más grande / mayor",             en:"big → bigger → biggest; mayor specializes for age/importance"},
  {reg:"pequeño",comp:"más pequeño / menor",      sup:"el/la más pequeño / menor",            en:"small → smaller → smallest; menor specializes for age"},
];
