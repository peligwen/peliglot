/**
 * Data for Guide 21: Negación (Negation).
 *
 * `negWords` = the learn-mode reference entries. Note: ex[] sometimes
 *   contains two different forms of the same concept (e.g. nunca has both
 *   pre-verb and post-verb forms); sometimes two unrelated examples.
 *
 * `quizItems` = the drill items. Each has:
 *   question = English sentence to translate
 *   answer   = primary Spanish answer
 *
 * acceptableAnswers for the mastery extractor are defined separately in the
 * extractor file, mapped from negWords context.
 */

export interface NegWord {
  w: string;
  m: string;
  ex: string[];
  note: string;
}

export interface QuizItem21 {
  question: string;
  answer: string;
}

export const negWords: NegWord[] = [
  {w:"no",m:"not",ex:["No hablo francés.","No quiero ir."],note:"Goes directly before the conjugated verb."},
  {w:"nunca / jamás",m:"never",ex:["Nunca como carne.","No como carne nunca."],note:"Can go before verb (alone) or after verb (with no)."},
  {w:"nada",m:"nothing",ex:["No quiero nada.","Nada es imposible."],note:"After verb needs 'no' before verb. Before verb stands alone."},
  {w:"nadie",m:"nobody",ex:["No conozco a nadie.","Nadie llamó."],note:"Needs personal 'a' as direct object: No veo a nadie."},
  {w:"tampoco",m:"neither / not either",ex:["Yo tampoco.","No quiero ir tampoco."],note:"Opposite of 'también'. Works alone or with no."},
  {w:"ni...ni",m:"neither...nor",ex:["No quiero ni café ni té.","Ni sé ni me importa."],note:"Links two negated options. Can start a sentence."},
  {w:"ya no",m:"not anymore",ex:["Ya no vivo ahí.","Ya no me gusta."],note:"Indicates a change from past to present."},
  {w:"todavía no",m:"not yet",ex:["Todavía no llega.","No ha llegado todavía."],note:"Implies the action will happen eventually."},
];

export const quizItems: QuizItem21[] = [
  {question:"I don't want anything.",answer:"No quiero nada."},
  {question:"Nobody called.",answer:"Nadie llamó."},
  {question:"I never eat meat.",answer:"Nunca como carne."},
  {question:"Neither coffee nor tea.",answer:"No quiero ni café ni té."},
  {question:"I don't live there anymore.",answer:"Ya no vivo ahí."},
  {question:"She hasn't arrived yet.",answer:"Todavía no llega."},
  {question:"Me neither.",answer:"Yo tampoco."},
  {question:"I don't speak French.",answer:"No hablo francés."},
];
