/**
 * Data for Guide 25: Trampas (False Cognates and Grammar Traps).
 *
 * `falseCogs` = 15 false-cognate entries (the mastery scope for Phase 2c.3).
 *   s = Spanish word, l = false-friend English meaning, a = actual meaning,
 *   d = difficulty (5=critical, 4=high, 3=moderate), ex = example sentence
 *
 * `grammarTraps` = 7 grammar-trap entries (deferred — not extracted in this phase).
 *
 * The quiz items (cogQuizItems, gramQuizItems, allQuizItems) are derived from
 * these arrays in the component and are not exported separately.
 */

export interface FalseCog {
  s: string;
  l: string;
  a: string;
  d: number;
  ex: string;
}

export interface GrammarTrap {
  wrong: string;
  seems: string;
  actual: string;
  correct: string;
  note: string;
}

export const falseCogs: FalseCog[] = [
  {s:"embarazada",l:"embarrassed",a:"pregnant",d:5,ex:"Está embarazada. = She's pregnant. (Use avergonzado/a for embarrassed.)"},
  {s:"constipado",l:"constipated",a:"having a cold",d:5,ex:"Estoy constipado. = I have a cold. (Use estreñido for constipated.)"},
  {s:"molestar",l:"to molest",a:"to bother/annoy",d:5,ex:"No me molestes. = Don't bother me."},
  {s:"actualmente",l:"actually",a:"currently",d:5,ex:"Actualmente vivo en Madrid. = I currently live in Madrid. (Use en realidad for actually.)"},
  {s:"éxito",l:"exit",a:"success",d:4,ex:"Fue un gran éxito. = It was a great success. (Use salida for exit.)"},
  {s:"asistir",l:"to assist",a:"to attend",d:4,ex:"Asistí a la reunión. = I attended the meeting. (Use ayudar for to assist.)"},
  {s:"librería",l:"library",a:"bookstore",d:4,ex:"Compré un libro en la librería. = I bought a book at the bookstore. (Use biblioteca for library.)"},
  {s:"sensible",l:"sensible",a:"sensitive",d:4,ex:"Es muy sensible. = He's very sensitive. (Use sensato for sensible.)"},
  {s:"realizar",l:"to realize",a:"to carry out / accomplish",d:4,ex:"Realizó su sueño. = She accomplished her dream. (Use darse cuenta for to realize.)"},
  {s:"soportar",l:"to support",a:"to tolerate / bear",d:4,ex:"No lo soporto. = I can't stand it. (Use apoyar for to support.)"},
  {s:"introducir",l:"to introduce (a person)",a:"to insert / put in",d:4,ex:"Introduzca la tarjeta. = Insert the card. (Use presentar for introducing people.)"},
  {s:"ropa",l:"rope",a:"clothing",d:3,ex:"Necesito ropa nueva. = I need new clothes. (Use cuerda for rope.)"},
  {s:"carpeta",l:"carpet",a:"folder",d:3,ex:"Pon los papeles en la carpeta. = Put the papers in the folder. (Use alfombra for carpet.)"},
  {s:"recordar",l:"to record",a:"to remember",d:3,ex:"No recuerdo su nombre. = I don't remember his name. (Use grabar for to record.)"},
  {s:"preocupado",l:"preoccupied",a:"worried / concerned",d:3,ex:"Estoy preocupado por ti. = I'm worried about you. (Use distraído for preoccupied.)"},
];

export const grammarTraps: GrammarTrap[] = [
  {wrong:"Estoy excitado",seems:"I'm excited",actual:"I'm aroused",correct:"Estoy emocionado/a",note:"Excitado has a sexual connotation in Spanish."},
  {wrong:"Busco para mi llave",seems:"I'm looking for my key",actual:"Incorrect — no preposition needed",correct:"Busco mi llave",note:"Buscar already means 'to look FOR'. No para needed."},
  {wrong:"Yo soy 25 años",seems:"I am 25 years old",actual:"Incorrect — use tener, not ser",correct:"Tengo 25 años",note:"Spanish says 'I HAVE 25 years', not 'I AM 25 years'."},
  {wrong:"Es bueno para salud",seems:"It's good for health",actual:"Missing the article",correct:"Es bueno para la salud",note:"Spanish requires articles where English drops them."},
  {wrong:"Me gusta los libros",seems:"I like the books",actual:"Wrong — gustan (plural) needed",correct:"Me gustan los libros",note:"Gustar agrees with the THING liked, not the person."},
  {wrong:"Conozco a Madrid",seems:"I know Madrid",actual:"Personal 'a' is for people only",correct:"Conozco Madrid",note:"Personal 'a' goes before people: Conozco A María. Not places or things."},
  {wrong:"Vi a la película",seems:"I saw the movie",actual:"Personal 'a' is for people only",correct:"Vi la película",note:"Personal 'a' goes before people: Vi A mi hermano ✓. Not before things: Vi la película ✓ (no 'a')."},
];

export const dColors: Record<number, string> = {5:"#C62828",4:"#E65100",3:"#F9A825"};
