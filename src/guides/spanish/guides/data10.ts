/**
 * Data for Guide 10 — Verbos Irregulares (Irregular Verb Dashboard).
 * Lifted from guide10.tsx so extractors can import without touching React.
 *
 * 8 high-frequency irregular verbs × 5 tenses.
 * Extractors use only 'present', 'preterite', and 'imperfect' (3 tenses).
 * 'future' and 'subjunctive' forms are present in the data but intentionally
 * deferred — emit cards for those tenses when dedicated future/subjunctive
 * guides (guide6 covers future for regular verbs; guide28/29 cover subjunctive)
 * have been fully cross-referenced and a separate irregular-future extractor
 * is planned.
 */

export interface IrregVerbEntry {
  m: string;
  present: string[];
  preterite: string[];
  imperfect: string[];
  future: string[];
  subjunctive: string[];
}

export const irregVerbs: Record<string, IrregVerbEntry> = {
  ser:   { m: "to be (perm)",  present: ["soy","eres","es","somos","sois","son"],               preterite: ["fui","fuiste","fue","fuimos","fuisteis","fueron"],         imperfect: ["era","eras","era","éramos","erais","eran"],                    future: ["seré","serás","será","seremos","seréis","serán"],             subjunctive: ["sea","seas","sea","seamos","seáis","sean"] },
  estar: { m: "to be (state)", present: ["estoy","estás","está","estamos","estáis","están"],    preterite: ["estuve","estuviste","estuvo","estuvimos","estuvisteis","estuvieron"], imperfect: ["estaba","estabas","estaba","estábamos","estabais","estaban"], future: ["estaré","estarás","estará","estaremos","estaréis","estarán"],  subjunctive: ["esté","estés","esté","estemos","estéis","estén"] },
  ir:    { m: "to go",         present: ["voy","vas","va","vamos","vais","van"],                 preterite: ["fui","fuiste","fue","fuimos","fuisteis","fueron"],         imperfect: ["iba","ibas","iba","íbamos","ibais","iban"],                    future: ["iré","irás","irá","iremos","iréis","irán"],                   subjunctive: ["vaya","vayas","vaya","vayamos","vayáis","vayan"] },
  tener: { m: "to have",       present: ["tengo","tienes","tiene","tenemos","tenéis","tienen"], preterite: ["tuve","tuviste","tuvo","tuvimos","tuvisteis","tuvieron"],   imperfect: ["tenía","tenías","tenía","teníamos","teníais","tenían"],        future: ["tendré","tendrás","tendrá","tendremos","tendréis","tendrán"], subjunctive: ["tenga","tengas","tenga","tengamos","tengáis","tengan"] },
  hacer: { m: "to do/make",    present: ["hago","haces","hace","hacemos","hacéis","hacen"],     preterite: ["hice","hiciste","hizo","hicimos","hicisteis","hicieron"],  imperfect: ["hacía","hacías","hacía","hacíamos","hacíais","hacían"],        future: ["haré","harás","hará","haremos","haréis","harán"],             subjunctive: ["haga","hagas","haga","hagamos","hagáis","hagan"] },
  poder: { m: "can/able",      present: ["puedo","puedes","puede","podemos","podéis","pueden"], preterite: ["pude","pudiste","pudo","pudimos","pudisteis","pudieron"],   imperfect: ["podía","podías","podía","podíamos","podíais","podían"],        future: ["podré","podrás","podrá","podremos","podréis","podrán"],       subjunctive: ["pueda","puedas","pueda","podamos","podáis","puedan"] },
  saber: { m: "to know",       present: ["sé","sabes","sabe","sabemos","sabéis","saben"],       preterite: ["supe","supiste","supo","supimos","supisteis","supieron"],   imperfect: ["sabía","sabías","sabía","sabíamos","sabíais","sabían"],        future: ["sabré","sabrás","sabrá","sabremos","sabréis","sabrán"],       subjunctive: ["sepa","sepas","sepa","sepamos","sepáis","sepan"] },
  decir: { m: "to say",        present: ["digo","dices","dice","decimos","decís","dicen"],      preterite: ["dije","dijiste","dijo","dijimos","dijisteis","dijeron"],   imperfect: ["decía","decías","decía","decíamos","decíais","decían"],        future: ["diré","dirás","dirá","diremos","diréis","dirán"],             subjunctive: ["diga","digas","diga","digamos","digáis","digan"] },
};

/** Keys of irregVerbs in display order */
export const verbKeys: string[] = Object.keys(irregVerbs);

/** Tense keys used in the guide UI */
export const tenseKeys: string[] = ["present","preterite","imperfect","future","subjunctive"];

/** The 6-pronoun labels matching the extractor's card order */
export const pronouns6: string[] = [
  "yo",
  "tú",
  "él/ella/Ud.",
  "nosotros",
  "vosotros",
  "ellos/Uds.",
];
