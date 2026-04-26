import { SimpleGuide } from '../../../components/SimpleGuide';

export function Guide6(){return(<SimpleGuide items={[
  {h:"What is Pepeke?",b:"Pepeke is the Hawaiian grammar framework that describes sentence patterns as 'seats' or positions. Each pattern has named slots that words fill."},
  {h:"Pepeke Painu (Action / Stative sentence)",b:"TAM + Verb + Subject + Object\nUa + heluhelu + ke keiki + i ka puke\n= The child read the book.\nAlso covers stative predicates:\nNui + ka hale = The house is big. (stative verb as predicate)"},
  {h:"Pepeke Henua (Locational)",b:"Aia + Subject + Location\nAia + ka hale + ma Waikīkī\n= The house is in Waikīkī."},
  {h:"Pepeke ʻAike He (Class-inclusional — 'is a')",b:"He + noun + Subject\nHe kāne maikaʻi ʻo ia = He is a good man.\nHe kumu ʻo Lani = Lani is a teacher.\n(Predicate begins with indefinite article he)"},
  {h:"Pepeke ʻAike ʻO (Equational — 'is the')",b:"ʻO + noun + Subject\nʻO Lani ke kumu = Lani is the teacher.\nʻO kēia kaʻu puke = This is my book.\n(Predicate begins with subject marker ʻo)"},
  {h:"Why it matters",b:"The pepeke system helps you build sentences by filling in pattern slots rather than translating word-by-word from English. Pepeke ʻAike He ('is a') and Pepeke ʻAike ʻO ('is the') are the standard terms used in Hawaiian-immersion schools (Pūnana Leo, Kula Kaiapuni) — knowing the names lets you follow instruction in those contexts."},
]}/>);}
