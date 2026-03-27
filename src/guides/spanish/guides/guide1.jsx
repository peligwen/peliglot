import { useState } from 'react';
import { AlphabetGrid } from '../../../components/templates/AlphabetGrid';
import { speakSpanish } from '../../../utils/speech';
import { VowelBar } from './_helpers';

const letters = [
  { letter: "A", name: "a", ipa: "/a/", approx: "Like 'ah' in 'father'", tricky: false, tip: "Open, clear vowel. Never changes." },
  { letter: "B", name: "be", ipa: "/b/, /\u03B2/", approx: "Like 'b' at start; softer between vowels", tricky: true, tip: "Between vowels, lips don't fully close." },
  { letter: "C", name: "ce", ipa: "/k/, /s/", approx: "'k' before a/o/u; 's' before e/i", tricky: true, tip: "In Latin America, c before e/i = 's'. In Spain, it's 'th'." },
  { letter: "D", name: "de", ipa: "/d/, /\u00F0/", approx: "Hard 'd' at start; soft 'th' between vowels", tricky: true, tip: "Between vowels, sounds like 'th' in 'the'." },
  { letter: "E", name: "e", ipa: "/e/", approx: "Like 'eh' in 'bet'", tricky: false, tip: "Always short and crisp." },
  { letter: "F", name: "efe", ipa: "/f/", approx: "Same as English 'f'", tricky: false, tip: "Identical to English." },
  { letter: "G", name: "ge", ipa: "/\u0261/, /x/", approx: "Hard 'g' before a/o/u; throaty 'h' before e/i", tricky: true, tip: "Before e/i, strong 'h' from throat." },
  { letter: "H", name: "hache", ipa: "silent", approx: "Always silent", tricky: true, tip: "Never pronounced. 'Hola' = 'ola'." },
  { letter: "I", name: "i", ipa: "/i/", approx: "Like 'ee' in 'see'", tricky: false, tip: "Always 'ee'. Short and pure." },
  { letter: "J", name: "jota", ipa: "/x/", approx: "Strong throaty 'h'", tricky: true, tip: "Stronger than English 'h'. M\u00E9xico: softer." },
  { letter: "K", name: "ka", ipa: "/k/", approx: "Like English 'k'", tricky: false, tip: "Only in borrowed words." },
  { letter: "L", name: "ele", ipa: "/l/", approx: "Like English 'l'", tricky: false, tip: "Lighter than English 'dark l'." },
  { letter: "LL", name: "elle", ipa: "/\u029D/", approx: "Like 'y' in 'yes'", tricky: true, tip: "In Mexico: 'y' sound. Argentina: 'sh'." },
  { letter: "M", name: "eme", ipa: "/m/", approx: "Same as English", tricky: false, tip: "Identical to English." },
  { letter: "N", name: "ene", ipa: "/n/", approx: "Same as English", tricky: false, tip: "Identical to English." },
  { letter: "\u00D1", name: "e\u00F1e", ipa: "/\u0272/", approx: "Like 'ny' in 'canyon'", tricky: true, tip: "Unique to Spanish!" },
  { letter: "O", name: "o", ipa: "/o/", approx: "Like 'oh' but shorter", tricky: false, tip: "Pure, round, short." },
  { letter: "P", name: "pe", ipa: "/p/", approx: "Like 'p' but no puff of air", tricky: false, tip: "Unaspirated." },
  { letter: "Q", name: "cu", ipa: "/k/", approx: "Always 'k'; u is silent in qu", tricky: false, tip: "que = 'keh', qui = 'kee'." },
  { letter: "R", name: "ere", ipa: "/\u027E/", approx: "Single tap, like 'tt' in 'butter'", tricky: true, tip: "Quick tongue tap." },
  { letter: "RR", name: "erre", ipa: "/r/", approx: "Rolled/trilled 'r'", tricky: true, tip: "Multiple rapid tongue taps." },
  { letter: "S", name: "ese", ipa: "/s/", approx: "Like English 's'", tricky: false, tip: "Always clean 's'. Never buzzes." },
  { letter: "T", name: "te", ipa: "/t/", approx: "Like 't' but dental", tricky: false, tip: "Tongue touches teeth." },
  { letter: "U", name: "u", ipa: "/u/", approx: "Like 'oo' in 'moon'", tricky: false, tip: "Always 'oo'. Silent after q." },
  { letter: "V", name: "ve", ipa: "/b/, /\u03B2/", approx: "Identical to B", tricky: true, tip: "No B/V difference!" },
  { letter: "W", name: "doble ve", ipa: "/w/", approx: "Like English 'w'", tricky: false, tip: "Only in borrowed words." },
  { letter: "X", name: "equis", ipa: "/ks/, /x/, /s/", approx: "Usually 'ks'; sometimes 'h'", tricky: true, tip: "In 'M\u00E9xico' = 'h' (Nahuatl)." },
  { letter: "Y", name: "ye", ipa: "/\u029D/, /i/", approx: "Like 'y'; alone = 'ee'", tricky: false, tip: "The word 'y' = 'ee'." },
  { letter: "Z", name: "zeta", ipa: "/s/", approx: "Like 's' in Latin America", tricky: true, tip: "In Mexico: always 's'. Spain: 'th'." },
];

const vowels = ["A","E","I","O","U"];

export function Guide1() {
  return (
    <AlphabetGrid
      letters={letters}
      letterKey="letter"
      nameKey="name"
      filterGroups={[
        {id:"all",label:"All",filterFn:()=>true},
        {id:"vowels",label:"Vowels",filterFn:l=>vowels.includes(l.letter)},
        {id:"tricky",label:"\u26A0 Tricky",filterFn:l=>l.tricky},
      ]}
      detailFields={[
        {key:"ipa"},
        {key:"approx",label:"Sounds Like",bgColor:"#FFF8E7",borderColor:"#F0E4C4",textColor:"#998544"},
        {key:"tip",label:"Tip",bgColor:"#F5F9F5",borderColor:"#D4E8D4",textColor:"#2C5F2D"},
      ]}
      primaryColor="#2C5F2D"
      accentBg="#FFF8E7"
      accentFn={l=>vowels.includes(l.letter)}
      badgeFn={l=>l.tricky?{color:"#D4A843"}:null}
      speakFn={speakSpanish}
      gridMin="56px"
      footerContent={<VowelBar/>}
    />
  );
}
