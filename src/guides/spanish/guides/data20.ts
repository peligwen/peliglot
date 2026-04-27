/**
 * Data for Guide 20: Preguntas (Question Words).
 *
 * `qWords` = the learn-mode word reference list.
 * `quizItems` = the drill items. Each has:
 *   question = sentence with ___ prefix and English meaning in parens
 *   answer   = the correct question word (without ¿ ?)
 *
 * NOTE: The quizItems in guide20.tsx embed the English meaning in the
 * question field, e.g. "___ quieres comer? (What do you want to eat?)".
 * The extractor splits this into sentence + englishMeaning at the "(" boundary.
 */

export interface QuestionWord {
  w: string;
  m: string;
  ex: string;
}

export interface QuizItem20 {
  question: string;
  answer: string;
}

export const qWords: QuestionWord[] = [
  {w:"¿Qué?",m:"What?",ex:"¿Qué quieres? — What do you want?"},
  {w:"¿Cuál(es)?",m:"Which?",ex:"¿Cuál es tu nombre? — What's your name?"},
  {w:"¿Quién(es)?",m:"Who?",ex:"¿Quién llamó? — Who called?"},
  {w:"¿Dónde?",m:"Where?",ex:"¿Dónde vives? — Where do you live?"},
  {w:"¿Cuándo?",m:"When?",ex:"¿Cuándo llegas? — When do you arrive?"},
  {w:"¿Cómo?",m:"How?",ex:"¿Cómo estás? — How are you?"},
  {w:"¿Por qué?",m:"Why?",ex:"¿Por qué estudias español? — Why do you study Spanish?"},
  {w:"¿Cuánto/a?",m:"How much/many?",ex:"¿Cuánto cuesta? — How much does it cost?"},
];

export const quizItems: QuizItem20[] = [
  {question:"___ quieres comer? (What do you want to eat?)",answer:"Qué"},
  {question:"___ es tu color favorito? (What is your favorite color?)",answer:"Cuál"},
  {question:"___ vive aquí? (Who lives here?)",answer:"Quién"},
  {question:"___ está el baño? (Where is the bathroom?)",answer:"Dónde"},
  {question:"___ empieza la clase? (When does class start?)",answer:"Cuándo"},
  {question:"___ se dice 'hello'? (How do you say 'hello'?)",answer:"Cómo"},
  {question:"___ no viniste? (Why didn't you come?)",answer:"Por qué"},
  {question:"___ cuesta esto? (How much does this cost?)",answer:"Cuánto"},
];
