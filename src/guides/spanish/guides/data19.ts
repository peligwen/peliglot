/**
 * Data for Guide 19: Verbos + Preposiciones (Verb + Preposition Pairs).
 *
 * `groups` is keyed by preposition bucket (a, de, en, con, none).
 * The 'none' bucket means the verb takes NO preposition where English
 * uses one (e.g. "buscar" = "to look for" — no "para" in Spanish).
 *
 * Each verb entry: v = verb (with preposition for non-none buckets),
 * m = English meaning, ex = example sentence.
 */

export interface VerbPrepEntry {
  v: string;
  m: string;
  ex: string;
}

export interface PrepGroup {
  color: string;
  prep: string;
  verbs: VerbPrepEntry[];
}

export const groups: { a: PrepGroup; de: PrepGroup; en: PrepGroup; con: PrepGroup; none: PrepGroup } = {
  a: {color:"#C62828",prep:"A",verbs:[
    {v:"empezar a",m:"to begin to",ex:"Empecé a estudiar."},
    {v:"ir a",m:"to be going to",ex:"Voy a comer."},
    {v:"aprender a",m:"to learn to",ex:"Aprendí a nadar."},
    {v:"ayudar a",m:"to help to",ex:"Me ayudó a entender."},
    {v:"volver a",m:"to do again",ex:"Volvió a llamar."},
  ]},
  de: {color:"#0D47A1",prep:"DE",verbs:[
    {v:"dejar de",m:"to stop (doing)",ex:"Dejé de fumar."},
    {v:"tratar de",m:"to try to",ex:"Trato de entender."},
    {v:"acabar de",m:"to have just",ex:"Acabo de llegar."},
    {v:"enamorarse de",m:"to fall in love with",ex:"Se enamoró de ella."},
    {v:"depender de",m:"to depend on",ex:"Depende de ti."},
    {v:"salir de",m:"to leave from",ex:"Salí de casa."},
  ]},
  en: {color:"#00695C",prep:"EN",verbs:[
    {v:"pensar en",m:"to think about",ex:"Pienso en ti."},
    {v:"insistir en",m:"to insist on",ex:"Insiste en pagar."},
    {v:"fijarse en",m:"to notice",ex:"Fíjate en esto."},
    {v:"tardar en",m:"to take time to",ex:"Tardó en llegar."},
  ]},
  con: {color:"#6A1B9A",prep:"CON",verbs:[
    {v:"soñar con",m:"to dream about",ex:"Soñé con volar."},
    {v:"contar con",m:"to count on",ex:"Cuento contigo."},
    {v:"salir con",m:"to date / go out with",ex:"Sale con María."},
    {v:"casarse con",m:"to marry",ex:"Se casó con él."},
  ]},
  none: {color:"#37474F",prep:"∅ NONE",verbs:[
    {v:"buscar",m:"to look for",ex:"Busco mi llave. (no 'para')"},
    {v:"escuchar",m:"to listen to",ex:"Escucho música. (no 'a')"},
    {v:"esperar",m:"to wait for",ex:"Espero el bus. (no 'para')"},
    {v:"pedir",m:"to ask for",ex:"Pido ayuda. (no 'para')"},
  ]},
};
