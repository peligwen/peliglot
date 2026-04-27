/**
 * Data for Guide 18: Por vs Para.
 *
 * `quizItems` are the drill-shaped sentence-with-blank items.
 * Each item: sentence = Spanish sentence with ___ for the blank,
 * answer = 'por' | 'para', why = the usage reason label.
 *
 * `paraUses`, `porUses`, and `tricky` are the learn-mode display data.
 */

export interface PorParaQuizItem {
  sentence: string;
  answer: 'por' | 'para';
  why: string;
}

export interface PrepUse {
  cat: string;
  icon: string;
  ex: string;
}

export interface TrickyExpr {
  sp: string;
  en: string;
  note: string;
}

export const paraU: PrepUse[] = [
  {cat:"Purpose / Goal",icon:"🎯",ex:"Estudio para aprender. — I study to learn."},
  {cat:"Recipient",icon:"🎁",ex:"Es para ti. — It's for you."},
  {cat:"Destination",icon:"✈️",ex:"Salgo para México. — I'm leaving for Mexico."},
  {cat:"Deadline",icon:"📅",ex:"Es para el lunes. — It's due by Monday."},
  {cat:"Comparison",icon:"⚖️",ex:"Para ser niño, cocina bien. — For a kid, he cooks well."},
  {cat:"Employment",icon:"💼",ex:"Trabajo para Google. — I work for Google."},
];

export const porU: PrepUse[] = [
  {cat:"Cause / Reason",icon:"🔥",ex:"Lo hizo por amor. — He did it out of love."},
  {cat:"Duration",icon:"⏱",ex:"Estudié por dos horas. — I studied for two hours."},
  {cat:"Exchange",icon:"💱",ex:"Lo compré por $50. — I bought it for $50."},
  {cat:"Through / Along",icon:"🚶",ex:"Camino por el parque. — I walk through the park."},
  {cat:"Means",icon:"📞",ex:"Hablamos por teléfono. — We talked by phone."},
  {cat:"On behalf of",icon:"🤝",ex:"Firmé por mi jefe. — I signed for my boss."},
  {cat:"Per / Rate",icon:"📊",ex:"Tres veces por semana. — Three times per week."},
];

export const tricky: TrickyExpr[] = [
  {sp:"por favor",en:"please",note:"Fixed — always por"},
  {sp:"por supuesto",en:"of course",note:"Fixed — always por"},
  {sp:"por eso",en:"that's why / therefore",note:"Cause → por"},
  {sp:"por fin",en:"finally",note:"Fixed — always por"},
  {sp:"para siempre",en:"forever",note:"Fixed — always para"},
  {sp:"para nada",en:"not at all",note:"Fixed — always para"},
];

export const quizItems: PorParaQuizItem[] = [
  {sentence:"Estudio ___ aprender.",answer:"para",why:"purpose/goal"},
  {sentence:"Lo hizo ___ amor.",answer:"por",why:"cause"},
  {sentence:"Es ___ ti.",answer:"para",why:"recipient"},
  {sentence:"Caminé ___ el parque.",answer:"por",why:"through"},
  {sentence:"Trabajo ___ Google.",answer:"para",why:"employment"},
  {sentence:"Lo compré ___ $50.",answer:"por",why:"exchange"},
  {sentence:"Tres veces ___ semana.",answer:"por",why:"rate"},
  {sentence:"Es ___ el lunes.",answer:"para",why:"deadline"},
  {sentence:"Firmé ___ mi jefe.",answer:"por",why:"on behalf of"},
  {sentence:"Salgo ___ México mañana.",answer:"para",why:"destination"},
];
