/**
 * Data for Guide 1 — El Alfabeto.
 * Lifted from guide1.tsx so extractors can import without touching React.
 */

export interface LetterEntry {
  letter: string;
  name: string;
  ipa: string;
  approx: string;
  tricky: boolean;
  tip: string;
}

export interface DigraphEntry {
  dg: string;
  name: string;
  ipa: string;
  approx: string;
  tip: string;
}

// Modern RAE alphabet (post-2010 Ortografía): 27 letters.
export const letters: LetterEntry[] = [
  { letter: "A", name: "a", ipa: "/a/", approx: "Like 'ah' in 'father'", tricky: false, tip: "Open, clear vowel. Never changes." },
  { letter: "B", name: "be", ipa: "/b/, /β/", approx: "Like 'b' at start; softer between vowels", tricky: true, tip: "Between vowels, lips don't fully close. Spelled differently from V, but pronounced the same." },
  { letter: "C", name: "ce", ipa: "/k/, /s/", approx: "'k' before a/o/u; 's' before e/i", tricky: true, tip: "In Latin America, c before e/i = 's'. In Spain, it's 'th'." },
  { letter: "D", name: "de", ipa: "/d/, /ð/", approx: "Hard 'd' at start; soft 'th' between vowels", tricky: true, tip: "Between vowels, sounds like 'th' in 'the'." },
  { letter: "E", name: "e", ipa: "/e/", approx: "Like 'eh' in 'bet'", tricky: false, tip: "Always short and crisp." },
  { letter: "F", name: "efe", ipa: "/f/", approx: "Same as English 'f'", tricky: false, tip: "Identical to English." },
  { letter: "G", name: "ge", ipa: "/ɡ/, /x/", approx: "Hard 'g' before a/o/u; throaty 'h' before e/i", tricky: true, tip: "Before e/i, strong 'h' from throat." },
  { letter: "H", name: "hache", ipa: "silent", approx: "Always silent", tricky: true, tip: "Never pronounced. 'Hola' = 'ola'." },
  { letter: "I", name: "i", ipa: "/i/", approx: "Like 'ee' in 'see'", tricky: false, tip: "Always 'ee'. Short and pure." },
  { letter: "J", name: "jota", ipa: "/x/", approx: "Strong throaty 'h'", tricky: true, tip: "Stronger than English 'h'. México: softer." },
  { letter: "K", name: "ka", ipa: "/k/", approx: "Like English 'k'", tricky: false, tip: "Only in borrowed words." },
  { letter: "L", name: "ele", ipa: "/l/", approx: "Like English 'l'", tricky: false, tip: "Lighter than English 'dark l'." },
  { letter: "M", name: "eme", ipa: "/m/", approx: "Same as English", tricky: false, tip: "Identical to English." },
  { letter: "N", name: "ene", ipa: "/n/", approx: "Same as English", tricky: false, tip: "Identical to English." },
  { letter: "Ñ", name: "eñe", ipa: "/ɲ/", approx: "Like 'ny' in 'canyon'", tricky: true, tip: "Unique to Spanish!" },
  { letter: "O", name: "o", ipa: "/o/", approx: "Like 'oh' but shorter", tricky: false, tip: "Pure, round, short." },
  { letter: "P", name: "pe", ipa: "/p/", approx: "Like 'p' but no puff of air", tricky: false, tip: "Unaspirated." },
  { letter: "Q", name: "cu", ipa: "/k/", approx: "Always 'k'; u is silent in qu", tricky: false, tip: "que = 'keh', qui = 'kee'." },
  { letter: "R", name: "erre", ipa: "/ɾ/, /r/", approx: "Tapped between vowels; trilled at start of word", tricky: true, tip: "Quick tongue tap between vowels. Trilled at start of word or after n/l. perro vs pero." },
  { letter: "S", name: "ese", ipa: "/s/", approx: "Like English 's'", tricky: false, tip: "Always clean 's'. Never buzzes." },
  { letter: "T", name: "te", ipa: "/t/", approx: "Like 't' but dental", tricky: false, tip: "Tongue touches teeth." },
  { letter: "U", name: "u", ipa: "/u/", approx: "Like 'oo' in 'moon'", tricky: false, tip: "Always 'oo'. Silent after q." },
  { letter: "V", name: "uve", ipa: "/b/, /β/", approx: "Identical to B", tricky: true, tip: "Spelled differently from B, but pronounced identically. Must memorize spelling." },
  { letter: "W", name: "doble uve", ipa: "/w/", approx: "Like English 'w'", tricky: false, tip: "Only in borrowed words." },
  { letter: "X", name: "equis", ipa: "/ks/, /x/, /s/", approx: "Usually 'ks'; sometimes 'h'", tricky: true, tip: "In 'México' = 'h' (Nahuatl)." },
  { letter: "Y", name: "ye", ipa: "/ʝ/, /i/", approx: "Like 'y'; alone = 'ee'", tricky: false, tip: "The word 'y' (and) = 'ee'. Renamed 'ye' in 2010 RAE reform (was 'i griega')." },
  { letter: "Z", name: "zeta", ipa: "/s/", approx: "Like 's' in Latin America", tricky: true, tip: "In Mexico: always 's'. Spain: 'th'." },
];

// CH, LL, RR are digraphs — essential pronunciation pairs, not official letters.
export const digraphs: DigraphEntry[] = [
  { dg: "CH", name: "che", ipa: "/tʃ/", approx: "Like 'ch' in 'church'", tip: "Removed from the official alphabet in RAE Ortografía 2010, but still a key pronunciation pair. chaleco, mucho." },
  { dg: "LL", name: "elle", ipa: "/ʝ/", approx: "Like 'y' in 'yes'", tip: "Removed from the alphabet in 2010. Most speakers say LL = Y (yeísmo). In Argentina: 'sh' sound." },
  { dg: "RR", name: "erre doble", ipa: "/r/", approx: "Rolled/trilled 'r'", tip: "Never an official letter — always a digraph. perro (dog) vs pero (but). Multiple rapid tongue taps." },
];

export const vowels: string[] = ["A", "E", "I", "O", "U"];
