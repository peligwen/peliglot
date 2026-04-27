/**
 * Data for Guide 31: Verbos Reflexivos (Reflexive Verbs).
 *
 * `daily` = daily-routine verbs.
 *   v = reflexive infinitive, m = English meaning, ex = example sentence
 * `meaningChange` = 5 pairs where adding 'se' radically changes the meaning.
 *   base = non-reflexive verb, m1 = base meaning,
 *   refl = reflexive form, m2 = reflexive meaning, ex = example sentence
 * `reciprocal` = 3 reciprocal examples ("each other").
 *   english = English sentence, spanish = Spanish sentence
 */

export interface DailyVerb {
  v: string;
  m: string;
  ex: string;
}

export interface MeaningChangePair {
  base: string;
  m1: string;
  refl: string;
  m2: string;
  ex: string;
}

export interface ReciprocalExample {
  english: string;
  spanish: string;
}

export const daily: DailyVerb[] = [
  {v:"despertarse",m:"to wake up",ex:"Me despierto a las 7."},
  {v:"levantarse",m:"to get up",ex:"Se levanta temprano."},
  {v:"ducharse",m:"to shower",ex:"Nos duchamos por la mañana."},
  {v:"vestirse",m:"to get dressed",ex:"Me visto rápido."},
  {v:"acostarse",m:"to go to bed",ex:"Se acuestan tarde."},
  {v:"dormirse",m:"to fall asleep",ex:"Me duermo en 5 minutos."},
];

export const reciprocal: ReciprocalExample[] = [
  { english: "They talk to each other every day.", spanish: "Se hablan todos los días." },
  { english: "We write letters to each other.", spanish: "Nos escribimos cartas." },
  { english: "They love each other a lot.", spanish: "Se quieren mucho." },
];

export const meaningChange: MeaningChangePair[] = [
  {base:"ir",   m1:"to go",     refl:"irse",      m2:"to leave/go away",      ex:"¡Me voy! = I'm leaving!"},
  {base:"dormir",m1:"to sleep", refl:"dormirse",  m2:"to fall asleep",        ex:"Se durmió en clase."},
  {base:"poner", m1:"to put",   refl:"ponerse",   m2:"to put on / become",    ex:"Se puso la chaqueta. / Se puso triste."},
  {base:"llevar",m1:"to carry", refl:"llevarse",  m2:"to take away / get along", ex:"Nos llevamos bien."},
  {base:"parecer",m1:"to seem", refl:"parecerse", m2:"to resemble",           ex:"Se parece a su madre."},
];
