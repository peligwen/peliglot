/**
 * Data for Guide 14 — Pronombres (All Pronoun Types).
 * Lifted from guide14.tsx so extractors can import without touching React.
 */

export interface PronounEntry {
  /** Spanish pronoun (or pronoun pair) */
  p: string;
  /** English equivalent */
  en: string;
  /** Example sentence showing usage */
  ex: string;
}

export interface PronounType {
  id: string;
  label: string;
  color: string;
  desc: string;
  data: PronounEntry[];
  tip: string;
}

export const types: PronounType[] = [
  {
    id: "sub",
    label: "Subject",
    color: "#0D47A1",
    desc: "Who does the action",
    data: [
      { p: "yo",               en: "I",                          ex: "Yo hablo español." },
      { p: "tú",               en: "you (informal)",             ex: "Tú eres mi amigo." },
      { p: "él / ella / Ud.",  en: "he / she / you (formal)",    ex: "Ella trabaja aquí." },
      { p: "nosotros/as",      en: "we",                         ex: "Nosotros estudiamos juntos." },
      { p: "vosotros/as",      en: "you all (informal, Spain)",  ex: "Vosotros estudiáis juntos." },
      { p: "ellos / ellas / Uds.", en: "they / you all",         ex: "Ellos viven en Madrid." },
    ],
    tip: "Subject pronouns are often OMITTED because the verb ending tells you who: Hablo = I speak.",
  },
  {
    id: "do",
    label: "D.O.",
    color: "#2E7D32",
    desc: "Replaces the thing being acted on",
    data: [
      { p: "me",      en: "me",                ex: "Ella me ve. — She sees me." },
      { p: "te",      en: "you",               ex: "Te quiero. — I love you." },
      { p: "lo / la", en: "him-it / her-it",   ex: "Lo compré. — I bought it. (Also neuter lo: Lo sé = I know it.)" },
      { p: "nos",     en: "us",                ex: "Nos invitaron. — They invited us." },
      { p: "os",      en: "you all (Spain)",   ex: "Os vi ayer. — I saw you all yesterday." },
      { p: "los / las", en: "them",            ex: "Las encontré. — I found them (fem)." },
    ],
    tip: "Lo/la must match the GENDER of the noun replaced: el libro → Lo leí. La carta → La leí.",
  },
  {
    id: "io",
    label: "I.O.",
    color: "#E65100",
    desc: "Replaces 'to whom' / 'for whom'",
    data: [
      { p: "me",  en: "to me",         ex: "Me dijo la verdad. — He told me the truth." },
      { p: "te",  en: "to you",        ex: "Te compré un regalo. — I bought you a gift." },
      { p: "le",  en: "to him/her/you", ex: "Le escribí una carta. — I wrote him a letter." },
      { p: "nos", en: "to us",         ex: "Nos explicó todo. — She explained everything to us." },
      { p: "os",  en: "to you all (Spain)", ex: "Os mandé un mensaje. — I sent you all a message." },
      { p: "les", en: "to them/you all", ex: "Les mandé un mensaje. — I sent them a message." },
    ],
    tip: "Le/les don't show gender! Add 'a él/a ella' to clarify: Le di el libro a ella.",
  },
  {
    id: "ref",
    label: "Reflexive",
    color: "#6A1B9A",
    desc: "The action reflects back on the subject",
    data: [
      { p: "me",  en: "myself",          ex: "Me despierto a las 7. — I wake (myself) up at 7." },
      { p: "te",  en: "yourself",        ex: "Te duchas rápido. — You shower quickly." },
      { p: "se",  en: "himself/herself", ex: "Ella se viste. — She gets dressed." },
      { p: "nos", en: "ourselves",       ex: "Nos sentamos. — We sit down." },
      { p: "os",  en: "yourselves (Spain)", ex: "Os despertáis temprano. — You all wake up early." },
      { p: "se",  en: "themselves",      ex: "Se acuestan tarde. — They go to bed late." },
    ],
    tip: "1st & 2nd person pronouns (me, te, nos, os) are identical for DO, IO, and reflexive. Only 3rd person splits.",
  },
  {
    id: "prep",
    label: "After preposition",
    color: "#455A64",
    desc: "Used after a, de, para, con, etc.",
    data: [
      { p: "mí / conmigo",    en: "me / with me",      ex: "Es para mí. — It's for me." },
      { p: "ti / contigo",    en: "you / with you",    ex: "Voy contigo. — I'll go with you." },
      { p: "él / ella / Ud.", en: "him / her / you",   ex: "Hablé de ella. — I talked about her." },
      { p: "nosotros/as",     en: "us",                ex: "Vienen con nosotros. — They're coming with us." },
      { p: "vosotros/as",     en: "you all (Spain)",   ex: "Es para vosotros. — It's for you all." },
      { p: "ellos / ellas / Uds.", en: "them / you all", ex: "Es para ellos. — It's for them." },
    ],
    tip: "Special forms: conmigo (with me), contigo (with you), consigo (with himself). NOT *con mí.",
  },
];
