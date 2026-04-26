/**
 * Data for Guide 17 — Ser vs Estar.
 * Lifted from guide17.tsx so extractors can import without touching React.
 */

export interface UseEntry {
  cat: string;
  ex: string;
}

export interface MeaningShift {
  a: string;
  s: string;
  e: string;
  exS: string;
  exE: string;
}

export const serUses: UseEntry[] = [
  { cat: "Identity / Definition",    ex: "Soy profesora. — I'm a teacher." },
  { cat: "Origin / Nationality",     ex: "Es de Colombia. — She's from Colombia." },
  { cat: "Material",                 ex: "La mesa es de madera. — The table is (made) of wood." },
  { cat: "Time / Date",              ex: "Son las tres. — It's three o'clock." },
  { cat: "Possession",               ex: "Es mi libro. — It's my book." },
  { cat: "Inherent traits",          ex: "Ella es inteligente. — She is intelligent." },
  { cat: "Events (when/where)",      ex: "La fiesta es en mi casa. — The party is at my house." },
  { cat: "Impersonal expressions",   ex: "Es importante estudiar. — It's important to study." },
];

export const estarUses: UseEntry[] = [
  { cat: "Location",                 ex: "Estoy en casa. — I'm at home." },
  { cat: "Emotions / Mood",          ex: "Estoy feliz. — I'm happy (right now)." },
  { cat: "Physical condition",       ex: "Estás cansado. — You're tired." },
  { cat: "Progressive tenses",       ex: "Estoy comiendo. — I'm eating." },
  { cat: "Result of change",         ex: "La puerta está abierta. — The door is open." },
  { cat: "Temporary states",         ex: "El café está frío. — The coffee is cold." },
  { cat: "Appearance",               ex: "Estás muy guapo hoy. — You look handsome today." },
  { cat: "Past-participle adjectives", ex: "La ventana está cerrada / abierta / escrita / rota / muerta. — All result-states use estar." },
];

export const shifts: MeaningShift[] = [
  { a: "aburrido", s: "boring (personality)", e: "bored (feeling)",    exS: "Él es aburrido.",         exE: "Él está aburrido." },
  { a: "listo",    s: "clever / smart",       e: "ready",              exS: "Es muy lista.",            exE: "¿Estás listo?" },
  { a: "malo",     s: "bad / evil",           e: "sick / unwell",      exS: "Es mala persona.",         exE: "Está malo, tiene fiebre." },
  { a: "rico",     s: "wealthy",              e: "delicious",          exS: "Ella es rica.",            exE: "Esta sopa está rica." },
  { a: "verde",    s: "green (color)",        e: "unripe",             exS: "La casa es verde.",        exE: "El plátano está verde." },
  { a: "seguro",   s: "safe (place)",         e: "sure / certain",     exS: "Este barrio es seguro.",   exE: "Estoy seguro de eso." },
];
