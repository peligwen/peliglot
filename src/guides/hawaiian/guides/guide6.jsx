import { SimpleGuide } from '../../../components/SimpleGuide';

export function Guide6(){return(<SimpleGuide items={[
  {h:"What is Pepeke?",b:"Pepeke is the Hawaiian grammar framework that describes sentence patterns as 'seats' or positions. Each pattern has named slots that words fill."},
  {h:"Pepeke Painu (Action sentence)",b:"TAM + Verb + Subject + Object\nUa + heluhelu + ke keiki + i ka puke\n= The child read the book."},
  {h:"Pepeke Henua (Locational)",b:"Aia + Subject + Location\nAia + ka hale + ma Waik\u012Bk\u012B\n= The house is in Waik\u012Bk\u012B."},
  {h:"Pepeke \u02BBAike Hema (Descriptive)",b:"Stative verb + Subject\nNui + ka hale = The house is big."},
  {h:"Pepeke \u02BBAike \u02BB\u014Clelo Pa\u02BBa (Equational)",b:"He + noun + Subject\nHe k\u0101ne maika\u02BBi \u02BBo ia = He is a good man."},
  {h:"Why it matters",b:"The pepeke system helps you build sentences by filling in pattern slots rather than translating word-by-word from English. Think of it like sentence templates."},
]}/>);}
