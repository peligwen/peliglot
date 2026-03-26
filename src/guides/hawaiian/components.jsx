import { useState } from 'react';
import { Card } from '../../components/Card';
import { DarkBox } from '../../components/DarkBox';
import { Insight as BaseInsight } from '../../components/Insight';
import { SimpleGuide } from '../../components/SimpleGuide';
import { ExpandSection } from '../../components/ExpandSection';
import { speakHawaiian } from '../../utils/speech';

// Hawaiian-specific components
function Insight({text}){return <BaseInsight text={text} emoji={"\u{1F33A}"} />;}
function CultureNote({text}){return(<div style={{background:"#E8F5E9",borderRadius:10,padding:"10px 14px",marginBottom:12,border:"1px solid #C8E6C9",fontSize:12,color:"#2E7D32",lineHeight:1.5}}>{"\u{1F33F}"} <strong>Cultural note:</strong> {text}</div>);}
function Hw({children}){return <span style={{fontStyle:"italic",color:"#2E7D32",fontWeight:600}}>{children}</span>;}


// ═══════════════════════════════════════════════════════════════
// GUIDE 1: THE HAWAIIAN ALPHABET
// ═══════════════════════════════════════════════════════════════
const hwnLetters=[
  {l:"A",sound:"/a/ — 'ah' as in father",type:"vowel",note:"Open front vowel"},
  {l:"E",sound:"/e/ — 'eh' as in bet",type:"vowel",note:"Mid front vowel"},
  {l:"I",sound:"/i/ — 'ee' as in see",type:"vowel",note:"High front vowel"},
  {l:"O",sound:"/o/ — 'oh' as in go (short)",type:"vowel",note:"Mid back vowel"},
  {l:"U",sound:"/u/ — 'oo' as in moon",type:"vowel",note:"High back vowel"},
  {l:"H",sound:"/h/ — as in English 'hat'",type:"consonant",note:"Same as English"},
  {l:"K",sound:"/k/ — softer than English 'k'",type:"consonant",note:"No aspiration (no puff of air). After 'i' sounds closer to 't' in some dialects"},
  {l:"L",sound:"/l/ — as in English 'let'",type:"consonant",note:"Lighter than English 'l'. Tongue touches just behind teeth"},
  {l:"M",sound:"/m/ — as in English 'mom'",type:"consonant",note:"Same as English"},
  {l:"N",sound:"/n/ — as in English 'no'",type:"consonant",note:"Same as English"},
  {l:"P",sound:"/p/ — softer than English 'p'",type:"consonant",note:"No aspiration. Gentle, unaspirated"},
  {l:"W",sound:"/w/ or /v/ — varies by position",type:"consonant",note:"After 'u' and 'o': /w/. After 'i' and 'e': often /v/. Word-initial: usually /w/"},
  {l:"ʻ",sound:"/ʔ/ — glottal stop",type:"consonant",note:"A real consonant! The catch in your throat like in 'uh-oh'. Written as ʻokina (opening single quote)"},
];

function Guide1(){
  const[sel,setSel]=useState(null);
  const[filter,setFilter]=useState("all");
  const filtered=hwnLetters.filter(l=>filter==="all"||l.type===filter);
  return(<div>
    <DarkBox title="Only 13 Letters"><div style={{fontSize:14,lineHeight:1.6}}>
      Hawaiian has the <strong style={{color:"#FFE77A"}}>shortest alphabet of any living language</strong>: 5 vowels + 7 consonants + the ʻokina (glottal stop). Every syllable ends in a vowel.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {[{id:"all",label:"All 13"},{id:"vowel",label:"Vowels (5)"},{id:"consonant",label:"Consonants (8)"}].map(f=>(
        <button key={f.id} onClick={()=>{setFilter(f.id);setSel(null)}} style={{padding:"6px 14px",borderRadius:16,border:filter===f.id?"2px solid #1B5E20":"1.5px solid #ddd",background:filter===f.id?"#1B5E20":"#fff",color:filter===f.id?"#fff":"#666",fontSize:12,fontWeight:600,cursor:"pointer"}}>{f.label}</button>
      ))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(58px, 1fr))",gap:6,marginBottom:16}}>
      {filtered.map(l=>{const isSel=sel?.l===l.l;const isV=l.type==="vowel";const isOkina=l.l==="ʻ";return(
        <button key={l.l} onClick={()=>{setSel(isSel?null:l);speakHawaiian(l.l);}} style={{aspectRatio:"1",border:isSel?"2.5px solid #1B5E20":isOkina?"2px solid #C62828":"1.5px solid #e0dcd5",borderRadius:12,background:isSel?"#1B5E20":isV?"#E8F5E9":isOkina?"#FFF3E0":"#fff",color:isSel?"#FFE77A":"#1a1a1a",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transform:isSel?"scale(1.08)":"scale(1)",transition:"all 0.15s",fontSize:isOkina?28:24,fontWeight:700,fontFamily:"'Georgia',serif"}}>
          {l.l}
          <span style={{fontSize:8,color:isSel?"rgba(255,231,122,0.7)":"#aaa",marginTop:2,fontFamily:"system-ui,sans-serif",fontWeight:400}}>{l.type}</span>
        </button>
      );})}
    </div>
    {sel&&(<div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #e0dcd5",marginBottom:16,animation:"fadeIn 0.2s ease"}}>
      <div style={{background:"#1B5E20",padding:"16px 20px",display:"flex",alignItems:"center",gap:16}}>
        <div style={{fontSize:48,fontWeight:700,color:"#FFE77A",fontFamily:"'Georgia',serif",lineHeight:1}}>{sel.l}</div>
        <div><div style={{color:"#FFE77A",fontSize:14,fontFamily:"monospace"}}>{sel.sound}</div></div>
      </div>
      <div style={{padding:"14px 18px"}}>
        <div style={{background:"#F5F9F5",borderRadius:8,padding:"10px 14px",border:"1px solid #D4E8D4",fontSize:13,color:"#333",lineHeight:1.5}}>{sel.note}</div>
      </div>
    </div>)}
    <Insight text="Hawaiian has no consonant clusters and every syllable is (C)V — an optional consonant followed by a vowel. This is why Hawaiian words flow so smoothly."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 2: VOWELS & DIPHTHONGS
// ═══════════════════════════════════════════════════════════════
const shortV=[{l:"a",s:"ah",w:"aloha"},{l:"e",s:"eh",w:"hele"},{l:"i",s:"ee",w:"wiki"},{l:"o",s:"oh",w:"ono"},{l:"u",s:"oo",w:"puka"}];
const longV=[{l:"ā",s:"aah (held)",w:"kāne"},{l:"ē",s:"eeh (held)",w:"mēle"},{l:"ī",s:"eee (held)",w:"kī"},{l:"ō",s:"ooh (held)",w:"kō"},{l:"ū",s:"ooo (held)",w:"kū"}];
const diphthongs=[{d:"ai",s:"'eye'",ex:"kai (sea)"},{d:"ae",s:"'ah-eh'",ex:"mae (wilt)"},{d:"ao",s:"'ah-oh'",ex:"ao (cloud)"},{d:"au",s:"'ow'",ex:"mau (always)"},
  {d:"ei",s:"'ay'",ex:"lei"},{d:"eu",s:"'eh-oo'",ex:"heu (to strip)"},{d:"oi",s:"'oy'",ex:"poi"},{d:"ou",s:"'oh-oo'",ex:"kou (your)"}];

function Guide2(){
  return(<div>
    <div style={{fontSize:12,fontWeight:700,color:"#999",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Short Vowels</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:16}}>
      {shortV.map(v=>(<div key={v.l} style={{textAlign:"center",padding:"12px 4px",background:"#fff",borderRadius:10,border:"1px solid #e0dcd5"}}>
        <div style={{fontSize:28,fontWeight:700,color:"#00695C",fontFamily:"'Georgia',serif"}}>{v.l}</div>
        <div style={{fontSize:13,color:"#C62828",fontWeight:700,fontFamily:"monospace"}}>{v.s}</div>
        <div style={{fontSize:10,color:"#999",fontStyle:"italic"}}>{v.w}</div>
      </div>))}
    </div>
    <div style={{fontSize:12,fontWeight:700,color:"#999",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Long Vowels (with kahakō)</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:16}}>
      {longV.map(v=>(<div key={v.l} style={{textAlign:"center",padding:"12px 4px",background:"#FFF8E7",borderRadius:10,border:"2px solid #F0E4C4"}}>
        <div style={{fontSize:28,fontWeight:700,color:"#C62828",fontFamily:"'Georgia',serif"}}>{v.l}</div>
        <div style={{fontSize:13,color:"#C62828",fontWeight:700,fontFamily:"monospace"}}>{v.s}</div>
        <div style={{fontSize:10,color:"#999",fontStyle:"italic"}}>{v.w}</div>
      </div>))}
    </div>
    <Card color="#00695C" title="Common Diphthongs">
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:0}}>
        {diphthongs.map((d,i)=>(<div key={d.d} style={{padding:"8px 14px",borderBottom:i<6?"1px solid #f0eeeb":"none",borderRight:i%2===0?"1px solid #f0eeeb":"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:16,fontWeight:800,color:"#00695C",fontFamily:"'Georgia',serif"}}>{d.d}</span>
          <span style={{fontSize:12,color:"#888"}}>{d.s}</span>
          <span style={{fontSize:11,color:"#aaa",fontStyle:"italic"}}>{d.ex}</span>
        </div>))}
      </div>
    </Card>
    <Insight text="Vowel length CHANGES MEANING. Kau = to place. Kāu = your (a-class). Kā'u = yours. Always pay attention to the kahakō!"/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 3: PRONUNCIATION & SYLLABLES
// ═══════════════════════════════════════════════════════════════
function Guide3(){
  const sylEx=[
    {word:"aloha",syls:["a","lo","ha"],stress:1},
    {word:"Hawaiʻi",syls:["Ha","wai","ʻi"],stress:1},
    {word:"mahalo",syls:["ma","ha","lo"],stress:1},
    {word:"humuhumunukunukuāpuaʻa",syls:["hu","mu","hu","mu","nu","ku","nu","ku","ā","pu","a","ʻa"],stress:8},
    {word:"kamaʻāina",syls:["ka","ma","ʻā","i","na"],stress:2},
  ];
  return(<div>
    <DarkBox title="The CV Rule"><div style={{fontSize:14,lineHeight:1.6}}>
      Every Hawaiian syllable is either a <strong style={{color:"#FFE77A"}}>vowel alone</strong> or a <strong style={{color:"#FFE77A"}}>consonant + vowel</strong>. No syllable ever ends in a consonant. No consonant clusters.
    </div></DarkBox>
    <Card color="#4527A0" title="Syllable Breakdown">
      {sylEx.map((w,i)=>(<div key={i} style={{padding:"10px 16px",borderBottom:i<sylEx.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:14,fontWeight:700,color:"#333",marginBottom:6,fontStyle:"italic"}}>{w.word}</div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
          {w.syls.map((s,si)=>(<span key={si} style={{padding:"4px 8px",borderRadius:6,fontSize:14,fontWeight:si===w.stress?800:400,color:si===w.stress?"#4527A0":"#999",background:si===w.stress?"#EDE7F6":"transparent",border:si===w.stress?"1.5px solid #4527A0":"1.5px solid transparent"}}>{s}</span>))}
        </div>
      </div>))}
    </Card>
    <SimpleGuide items={[
      {h:"Stress rules",b:"• Stress falls on the second-to-last syllable (penultimate) for most words\n• Long vowels (with kahakō) and diphthongs attract stress\n• In longer words, secondary stress falls on alternating syllables before the main stress"},
      {h:"The W sound variation",b:"• After 'u' or 'o': W sounds like English /w/\n• After 'i' or 'e': W often sounds like /v/\n• At the start of a word: usually /w/\n• Example: 'Ewa = 'eva, but wai = wai"},
    ]}/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 4: 'OKINA & KAHAKŌ
// ═══════════════════════════════════════════════════════════════
const minPairs=[
  {w1:"pau",m1:"finished",w2:"pa'u",m2:"skirt/sarong",w3:"pā'ū",m3:"moist, damp"},
  {w1:"kau",m1:"to place",w2:"ka'u",m2:"my (a-class)",w3:"kā'ū",m3:"a district on Hawaiʻi"},
  {w1:"moa",m1:"chicken",w2:"mo'a",m2:"cooked",w3:"—",m3:"—"},
  {w1:"ai",m1:"to eat",w2:"'ai",m2:"food",w3:"—",m3:"—"},
  {w1:"ko",m1:"sugarcane",w2:"kō",m2:"to drag/pull",w3:"ko'o",m3:"support"},
];

function Guide4(){
  return(<div>
    <DarkBox title="Not Decorations — They Change Meaning"><div style={{fontSize:14,lineHeight:1.6}}>
      The <strong style={{color:"#FFE77A"}}>ʻokina</strong> (ʻ) is a consonant — a glottal stop. The <strong style={{color:"#FFE77A"}}>kahakō</strong> (ā) doubles vowel length. Both are <strong style={{color:"#EF9A9A"}}>required</strong> for correct spelling and meaning.
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"2px solid #C62828",textAlign:"center"}}>
        <div style={{fontSize:48,fontWeight:700,color:"#C62828",fontFamily:"'Georgia',serif"}}>ʻ</div>
        <div style={{fontSize:14,fontWeight:700,color:"#C62828"}}>ʻOkina</div>
        <div style={{fontSize:12,color:"#666",marginTop:4}}>Glottal stop — the catch in "uh-oh"</div>
        <div style={{fontSize:11,color:"#999",marginTop:4}}>Looks like an opening single quote, NOT an apostrophe</div>
      </div>
      <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"2px solid #0D47A1",textAlign:"center"}}>
        <div style={{fontSize:48,fontWeight:700,color:"#0D47A1",fontFamily:"'Georgia',serif"}}>ā</div>
        <div style={{fontSize:14,fontWeight:700,color:"#0D47A1"}}>Kahakō</div>
        <div style={{fontSize:12,color:"#666",marginTop:4}}>Macron — doubles the vowel length</div>
        <div style={{fontSize:11,color:"#999",marginTop:4}}>Appears on all 5 vowels: ā ē ī ō ū</div>
      </div>
    </div>
    <Card color="#C62828" title="Minimal Pairs — Same Letters, Different Meaning">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div>Plain</div><div>With ʻokina</div><div>With kahakō</div>
      </div>
      {minPairs.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"8px 14px",borderBottom:i<minPairs.length-1?"1px solid #f0eeeb":"none"}}>
        <div><span style={{fontWeight:700,fontStyle:"italic"}}>{p.w1}</span><br/><span style={{fontSize:11,color:"#888"}}>{p.m1}</span></div>
        <div><span style={{fontWeight:700,fontStyle:"italic",color:"#C62828"}}>{p.w2}</span><br/><span style={{fontSize:11,color:"#888"}}>{p.m2}</span></div>
        <div><span style={{fontWeight:700,fontStyle:"italic",color:"#0D47A1"}}>{p.w3}</span><br/><span style={{fontSize:11,color:"#888"}}>{p.m3}</span></div>
      </div>))}
    </Card>
    <CultureNote text="Omitting the ʻokina and kahakō is considered disrespectful to the language. It's 'Hawaiʻi' not 'Hawaii', and 'ʻōlelo' not 'olelo'. The marks were not used historically in writing but the sounds were always there — they've been restored as part of language revitalization."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 5-9: SENTENCE STRUCTURE
// ═══════════════════════════════════════════════════════════════
function Guide5(){return(<div>
  <DarkBox title="Hawaiian is Verb-First"><div style={{fontSize:14,lineHeight:1.6}}>
    English: <strong>I see the fish</strong> (SVO)<br/>
    Hawaiian: <strong style={{color:"#FFE77A"}}>Ke nānā nei au i ka iʻa</strong> (VSO)<br/>
    <span style={{color:"#aaa",fontSize:12}}>"Am looking I at the fish"</span>
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"Verbal sentence: action first",b:"Ua hele au i ke kula.\nUA (completed) + HELE (go) + AU (I) + I KE KULA (to school)\n= I went to school."},
    {h:"Equational sentence: X is Y (identification)",b:"He kumu ʻo Lani.\nHE (a) + KUMU (teacher) + ʻO LANI (Lani)\n= Lani is a teacher."},
    {h:"Descriptive sentence: X is [quality]",b:"Nani ke aloha.\nNANI (beautiful) + KE ALOHA (the love)\n= Love is beautiful. (Stative verb pattern)"},
    {h:"Locational sentence: X is at Y",b:"Aia ka puke ma ka pākaukau.\nAIA + KA PUKE (the book) + MA KA PĀKAUKAU (on the table)\n= The book is on the table."},
  ]}/>
  <Insight text="There is no verb 'to be' in Hawaiian! Equational and descriptive sentences simply place words in the right pattern — the structure itself conveys 'is.'"/>
</div>);}

function Guide6(){return(<SimpleGuide items={[
  {h:"What is Pepeke?",b:"Pepeke is the Hawaiian grammar framework that describes sentence patterns as 'seats' or positions. Each pattern has named slots that words fill."},
  {h:"Pepeke Painu (Action sentence)",b:"TAM + Verb + Subject + Object\nUa + heluhelu + ke keiki + i ka puke\n= The child read the book."},
  {h:"Pepeke Henua (Locational)",b:"Aia + Subject + Location\nAia + ka hale + ma Waikīkī\n= The house is in Waikīkī."},
  {h:"Pepeke ʻAike Hema (Descriptive)",b:"Stative verb + Subject\nNui + ka hale = The house is big."},
  {h:"Pepeke ʻAike ʻŌlelo Paʻa (Equational)",b:"He + noun + Subject\nHe kāne maikaʻi ʻo ia = He is a good man."},
  {h:"Why it matters",b:"The pepeke system helps you build sentences by filling in pattern slots rather than translating word-by-word from English. Think of it like sentence templates."},
]}/>);}

function Guide7(){
  const particles=[
    {p:"ʻo",use:"Subject marker (before proper nouns/pronouns)",ex:"ʻO Keoni ke kumu. = John is the teacher.",color:"#0D47A1"},
    {p:"ka / ke",use:"The (singular definite article)",ex:"ka hale = the house · ke aloha = the love",color:"#2E7D32"},
    {p:"nā",use:"The (plural definite article)",ex:"nā keiki = the children",color:"#2E7D32"},
    {p:"he",use:"A/an (indefinite article)",ex:"He kumu au. = I am a teacher.",color:"#E65100"},
    {p:"i / iā",use:"Object marker (i for things, iā for people)",ex:"Nānā au i ka moana. = I look at the ocean.\nNānā au iā Keoni. = I look at John.",color:"#6A1B9A"},
    {p:"ma",use:"At/in/on (location)",ex:"ma ka hale = at the house",color:"#00838F"},
    {p:"no / na",use:"For/belonging to (o/a class)",ex:"no Keoni = for/of John (o-class)",color:"#C62828"},
    {p:"a me",use:"And (connects nouns)",ex:"ka makuahine a me ka makuakāne = the mother and the father",color:"#880E4F"},
  ];
  return(<div>
    <DarkBox title="Small Words, Big Jobs"><div style={{fontSize:13}}>Hawaiian particles/markers do the work that English handles with word order and prepositions.</div></DarkBox>
    {particles.map((p,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:6}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{background:p.color,color:"#fff",padding:"2px 10px",borderRadius:6,fontSize:14,fontWeight:800,fontStyle:"italic"}}>{p.p}</span>
        <span style={{fontSize:12,color:"#888"}}>{p.use}</span>
      </div>
      <div style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{p.ex}</div>
    </div>))}
  </div>);
}

function Guide8(){return(<SimpleGuide items={[
  {h:"Yes/No questions: intonation or 'anei'",b:"Hele ʻoe? = Are you going? (rising intonation)\nHele anei ʻoe? = Are you going? (with question marker)"},
  {h:"aha — what",b:"He aha kēia? = What is this?\nE aha ana ʻoe? = What will you do?"},
  {h:"wai — who",b:"ʻO wai kou inoa? = What is your name? (lit. 'Who is your name?')\nNa wai kēia? = Whose is this?"},
  {h:"hea — where",b:"Ma hea ʻoe e noho nei? = Where do you live?\nI hea ʻoe? = Where were you?"},
  {h:"ʻahea — when",b:"ʻAhea ʻoe e hele ai? = When will you go?"},
  {h:"pehea — how",b:"Pehea ʻoe? = How are you?\nPehea ka hana? = How is the work?"},
  {h:"no ke aha — why",b:"No ke aha ʻoe i hele ai? = Why did you go?"},
]}/>);}

function Guide9(){return(<SimpleGuide items={[
  {h:"ʻAʻole — primary negator",b:"ʻAʻole au i hele. = I did not go.\nʻAʻole makaʻi kēia. = This is not good.\nPlaced at the beginning of the sentence."},
  {h:"ʻAʻohe — none / not any / there is no",b:"ʻAʻohe oʻu kālā. = I have no money.\nʻAʻohe mea. = It's nothing. / You're welcome."},
  {h:"Mai — don't (negative command)",b:"Mai hele! = Don't go!\nMai ʻai i kēlā. = Don't eat that."},
  {h:"ʻAʻole + TAM marker for tense",b:"ʻAʻole au i hele = I didn't go (past)\nʻAʻole au e hele ana = I won't go (future)"},
  {h:"Answering questions negatively",b:"ʻAʻole. = No.\nʻAʻole au. = Not me.\nʻAʻole pēlā. = Not like that."},
]}/>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 10-14: NOUNS & DETERMINERS
// ═══════════════════════════════════════════════════════════════
function Guide10(){return(<div>
  <SimpleGuide items={[
    {h:"ka vs ke — which form of 'the'?",b:"Use KE before words starting with: k, e, a, o\nUse KA for everything else\nMemory aid: 'ke' before KEAO letters\nke keiki (the child) · ke aloha (the love)\nka hale (the house) · ka mea (the thing)"},
    {h:"nā — the (plural)",b:"nā keiki = the children · nā hale = the houses\nHawaiian nouns don't change form for plural — only the article does!"},
    {h:"he — a/an (indefinite)",b:"He kumu au. = I am a teacher.\nHe keiki kēia. = This is a child."},
    {h:"kekahi — a certain / some",b:"kekahi lā = one day / a certain day\nkekahi mau mea = some things"},
  ]}/>
  <Insight text="Hawaiian nouns don't change for plural. Ka hale = the house. Nā hale = the houses. The noun stays the same — the article does the work!"/>
</div>);}

function Guide11(){
  const oClass=[
    {cat:"Relationships (older/born into)",ex:"parents, siblings, spouse, ancestors"},
    {cat:"Body & body parts",ex:"limbs, head, health"},
    {cat:"Clothing & adornment",ex:"clothes, lei, shoes"},
    {cat:"Transportation",ex:"canoe, car, horse (you ride it)"},
    {cat:"Shelter & buildings you inhabit",ex:"house, room, land you live on"},
    {cat:"Feelings & innate qualities",ex:"name, voice, shadow, spirit"},
  ];
  const aClass=[
    {cat:"Things you create or acquire",ex:"food, crafts, art you make"},
    {cat:"Things you control",ex:"children (younger), students, pets"},
    {cat:"Knowledge & skills",ex:"work, ideas, mana'o (thoughts)"},
    {cat:"Plants you cultivate",ex:"garden, crops"},
    {cat:"Food & drink",ex:"anything you eat or drink"},
    {cat:"Tools & instruments",ex:"pen, computer, surfboard"},
  ];
  return(<div>
    <DarkBox title="The Most Hawaiian Grammar Feature"><div style={{fontSize:13,lineHeight:1.6}}>
      Hawaiian divides ALL possessives into two classes based on your <strong style={{color:"#FFE77A"}}>relationship</strong> to the thing possessed — not the thing itself.
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"2px solid #0D47A1"}}>
        <div style={{background:"#0D47A1",padding:"10px 14px",color:"#fff",fontSize:13,fontWeight:700}}>O-class: things you DON'T control</div>
        <div style={{padding:"10px 14px"}}>{oClass.map((c,i)=>(<div key={i} style={{padding:"4px 0",borderBottom:i<oClass.length-1?"1px solid #f0eeeb":"none",fontSize:12}}>
          <strong style={{color:"#0D47A1"}}>{c.cat}</strong><br/><span style={{color:"#888"}}>{c.ex}</span>
        </div>))}</div>
      </div>
      <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"2px solid #C62828"}}>
        <div style={{background:"#C62828",padding:"10px 14px",color:"#fff",fontSize:13,fontWeight:700}}>A-class: things you DO control</div>
        <div style={{padding:"10px 14px"}}>{aClass.map((c,i)=>(<div key={i} style={{padding:"4px 0",borderBottom:i<aClass.length-1?"1px solid #f0eeeb":"none",fontSize:12}}>
          <strong style={{color:"#C62828"}}>{c.cat}</strong><br/><span style={{color:"#888"}}>{c.ex}</span>
        </div>))}</div>
      </div>
    </div>
    <Insight text="Think of O-class as 'received/inherent' — things that came to you or are part of you. A-class is 'acquired/created' — things you went out and got or made."/>
    <CultureNote text="The O/A distinction reflects Hawaiian values about humans' relationship to the world. Your parents are O-class — you didn't choose them; they're part of who you are. Your food is A-class — you actively sought it."/>
  </div>);
}

function Guide12(){
  const poss=[
    {en:"my",o:"koʻu",a:"kaʻu"},{en:"your (s)",o:"kou",a:"kāu"},{en:"his/her",o:"kona",a:"kāna"},
    {en:"our (2 incl)",o:"ko kāua",a:"kā kāua"},{en:"our (3+ incl)",o:"ko kākou",a:"kā kākou"},
    {en:"our (2 excl)",o:"ko māua",a:"kā māua"},{en:"our (3+ excl)",o:"ko mākou",a:"kā mākou"},
    {en:"your (pl)",o:"ko ʻoukou",a:"kā ʻoukou"},{en:"their",o:"ko lākou",a:"kā lākou"},
  ];
  return(<div>
    <Card color="#1565C0" title="Possessive Pronouns" subtitle="O-class vs A-class">
      <div style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"2px solid #eee"}}>
        <div></div><div style={{textAlign:"center",color:"#0D47A1"}}>O-CLASS</div><div style={{textAlign:"center",color:"#C62828"}}>A-CLASS</div>
      </div>
      {poss.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",padding:"6px 14px",borderBottom:i<poss.length-1?"1px solid #f0eeeb":"none",alignItems:"center"}}>
        <span style={{fontSize:12,color:"#888"}}>{p.en}</span>
        <span style={{textAlign:"center",fontSize:14,fontWeight:700,color:"#0D47A1",fontStyle:"italic"}}>{p.o}</span>
        <span style={{textAlign:"center",fontSize:14,fontWeight:700,color:"#C62828",fontStyle:"italic"}}>{p.a}</span>
      </div>))}
    </Card>
    <SimpleGuide items={[
      {h:"Examples with O-class",b:"koʻu makuahine = my mother\nkou hale = your house\nkona inoa = his/her name"},
      {h:"Examples with A-class",b:"kaʻu puke = my book\nkāu hana = your work\nkāna keiki = his/her child (younger)"},
    ]}/>
  </div>);
}

function Guide13(){return(<SimpleGuide items={[
  {h:"Three-way system (here / by you / over there)",b:"kēia = this (near me)\nkēnā = that (near you)\nkēlā = that (far from both of us)"},
  {h:"As determiners before nouns",b:"kēia puke = this book\nkēnā keiki = that child (by you)\nkēlā mauna = that mountain (over there)"},
  {h:"Location words: nei / nā / lā",b:"nei = here · nā = there (by you) · lā = there (far)\nma ʻaneʻi = around here · ma laila = over there"},
  {h:"Direction from the land",b:"makai = toward the sea · mauka = toward the mountain\nUsed instead of north/south/east/west in daily Hawaiian directions"},
  {h:"Examples in sentences",b:"Aia ka hale ma ʻaneʻi. = The house is around here.\nE hele kāua ma uka. = Let's go toward the mountains."},
]}/>);}

function Guide14(){return(<SimpleGuide items={[
  {h:"Ko + person = O-class possession",b:"ko Keoni ka hale = Keoni's house (he lives there — O-class)\nko Lani ke keiki = Lani's child (older/born to her — O-class)"},
  {h:"Kā + person = A-class possession",b:"kā Keoni ka puke = Keoni's book (he acquired it — A-class)\nkā Lani ka hana = Lani's work (she does it — A-class)"},
  {h:"With pronouns: the full pattern",b:"koʻu mau makua = my parents (O-class, with mau for plural)\nkaʻu mau puke = my books (A-class)"},
  {h:"The pattern: possessor + ka/ke + thing",b:"ko Lani ka hale = Lani's house\nkā Keoni ke kālā = Keoni's money\nNote: the article (ka/ke) goes with the THING, not the possessor"},
]}/>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 15-17: PRONOUNS
// ═══════════════════════════════════════════════════════════════
function Guide15(){
  const pronouns=[
    {en:"I/me",hw:"au / wau",num:"singular",note:"wau after i or e"},
    {en:"you (s)",hw:"ʻoe",num:"singular",note:""},
    {en:"he/she",hw:"ia",num:"singular",note:"No gender distinction!"},
    {en:"we two (incl.)",hw:"kāua",num:"dual",note:"You and me"},
    {en:"we two (excl.)",hw:"māua",num:"dual",note:"Me and someone else (not you)"},
    {en:"you two",hw:"ʻolua",num:"dual",note:""},
    {en:"they two",hw:"lāua",num:"dual",note:""},
    {en:"we all (incl.)",hw:"kākou",num:"plural",note:"All of us including you"},
    {en:"we all (excl.)",hw:"mākou",num:"plural",note:"Us but not you"},
    {en:"you all",hw:"ʻoukou",num:"plural",note:""},
    {en:"they all",hw:"lākou",num:"plural",note:""},
  ];
  const numColors={singular:"#1B5E20",dual:"#E65100",plural:"#0D47A1"};
  return(<div>
    <DarkBox title="Singular, Dual & Plural + Inclusive vs Exclusive"><div style={{fontSize:13,lineHeight:1.6}}>
      Hawaiian distinguishes <strong style={{color:"#FFE77A"}}>exactly two</strong> from <strong style={{color:"#FFE77A"}}>three or more</strong>, and <strong style={{color:"#FFE77A"}}>inclusive 'we'</strong> (you + me) from <strong style={{color:"#FFE77A"}}>exclusive 'we'</strong> (me + others, not you).
    </div></DarkBox>
    <Card color="#1B5E20" title="All Personal Pronouns">
      {pronouns.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"90px 80px 1fr",padding:"8px 14px",borderBottom:i<pronouns.length-1?"1px solid #f0eeeb":"none",alignItems:"center",gap:8}}>
        <span style={{fontSize:12,color:"#888"}}>{p.en}</span>
        <span style={{fontSize:15,fontWeight:700,color:numColors[p.num],fontStyle:"italic"}}>{p.hw}</span>
        <span style={{fontSize:11,color:"#aaa"}}>{p.note}</span>
      </div>))}
    </Card>
    <Insight text="The inclusive/exclusive 'we' is a key feature. Saying 'kākou' (all of us together) vs 'mākou' (us but not you) carries important social meaning about inclusion."/>
  </div>);
}

function Guide16(){return(<SimpleGuide items={[
  {h:"Demonstrative pronouns as subjects",b:"ʻO kēia kaʻu puke. = This is my book.\nʻO kēlā kou hale? = Is that your house?"},
  {h:"Locative words",b:"maʻaneʻi / ma ʻaneʻi = here\nma laila = there\nma ʻō = over there (out of sight)"},
  {h:"Directional locatives (unique to Hawaiian)",b:"mauka = toward the mountain (inland)\nmakai = toward the sea\nThese replace north/south in everyday language based on island geography"},
  {h:"ʻō and ʻaneʻi in sentences",b:"E hele mai ʻoe i ʻaneʻi. = Come here.\nAia ʻo ia ma ʻō. = He/she is over there."},
]}/>);}

function Guide17(){return(<SimpleGuide items={[
  {h:"Relative clauses with 'ai'",b:"ka mea āu i ʻike ai = the thing you saw\nke kanaka e noho ana ma laila = the person who lives there"},
  {h:"Pattern: noun + relative clause",b:"ke keiki i hele i ke kula = the child who went to school\nka wahine e hana nei = the woman who is working"},
  {h:"Using 'ai' as a relative marker",b:"'ai' often appears at the end of relative clauses that refer back to the main noun:\nka hale āu i noho ai = the house where you lived"},
  {h:"Important: tense markers still apply inside",b:"ka mea au i makemake ai = the thing I wanted (past with 'i')\nka mea au e makemake nei = the thing I want (present with 'e...nei')"},
]}/>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 18-23: VERB SYSTEM
// ═══════════════════════════════════════════════════════════════
function Guide18(){
  const tams=[
    {marker:"ua",use:"Completed action (perfective)",ex:"Ua hele au. = I went/have gone.",color:"#C62828",time:"past/completed"},
    {marker:"ke ... nei",use:"Currently happening (progressive)",ex:"Ke heluhelu nei au. = I am reading.",color:"#E65100",time:"present"},
    {marker:"e ... ana",use:"Ongoing or future (imperfective)",ex:"E hele ana au. = I will go / I'm going to go.",color:"#0D47A1",time:"future/ongoing"},
    {marker:"i",use:"Past (simple past, in subordinate clauses)",ex:"I hele au i ke kula. = I went to school.",color:"#6A1B9A",time:"past"},
    {marker:"e",use:"Imperative / subjunctive",ex:"E hele! = Go! · E ola! = Live!",color:"#2E7D32",time:"command/wish"},
    {marker:"(none)",use:"Habitual / general truth",ex:"Hele au i ke kula. = I go to school (generally).",color:"#00695C",time:"habitual"},
  ];
  return(<div>
    <DarkBox title="Verbs Don't Change — Markers Do"><div style={{fontSize:14,lineHeight:1.6}}>
      Hawaiian verbs have <strong style={{color:"#FFE77A"}}>ONE form</strong>. Tense, aspect, and mood are shown by <strong style={{color:"#FFE77A"}}>particles before (and sometimes after) the verb</strong>.
    </div></DarkBox>
    {tams.map((t,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:6}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{background:t.color,color:"#fff",padding:"3px 10px",borderRadius:6,fontSize:14,fontWeight:800,fontStyle:"italic",fontFamily:"'Georgia',serif"}}>{t.marker}</span>
        <span style={{fontSize:12,color:"#888"}}>{t.use}</span>
        <span style={{marginLeft:"auto",fontSize:10,color:"#aaa",background:"#f5f3ef",padding:"2px 6px",borderRadius:4}}>{t.time}</span>
      </div>
      <div style={{fontSize:13,color:"#555",fontStyle:"italic"}}>{t.ex}</div>
    </div>))}
    <Insight text="The verb 'hele' (to go) is always just 'hele'. Ua hele = went. Ke hele nei = is going. E hele ana = will go. The markers do ALL the tense work."/>
  </div>);
}

function Guide19(){return(<div>
  <DarkBox title="Adjectives ARE Verbs"><div style={{fontSize:14,lineHeight:1.6}}>
    Hawaiian doesn't have a separate adjective class. Words like <Hw>nani</Hw> (beautiful), <Hw>nui</Hw> (big), <Hw>maikaʻi</Hw> (good) are <strong style={{color:"#FFE77A"}}>stative verbs</strong> meaning "is beautiful / is big / is good."
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"As predicates (main verb of the sentence)",b:"Nani ka pua. = The flower is beautiful. (lit. 'Is-beautiful the flower')\nNui ka hale. = The house is big.\nMaikaʻi ka lā. = The day is good."},
    {h:"As modifiers (after the noun)",b:"ka pua nani = the beautiful flower\nke keiki maikaʻi = the good child\nka hale nui = the big house"},
    {h:"With TAM markers for tense",b:"Ua nui ke keiki. = The child has grown big (completed).\nE nani ana. = It will be beautiful."},
    {h:"Common stative verbs",b:"nani = beautiful · nui = big · liʻiliʻi = small\nmaikaʻi = good · ʻino = bad · hou = new\nkahiko = old · aloha = loving · huhu = angry\nmaʻi = sick · ola = alive/healthy · make = dead"},
  ]}/>
</div>);}

function Guide20(){return(<SimpleGuide items={[
  {h:"Direct command: e + verb",b:"E hele! = Go!\nE noho! = Sit!\nE ʻai! = Eat!"},
  {h:"Polite command with subject",b:"E hele ʻoe. = (You) go. (gentler)\nE noho mālie. = Sit quietly."},
  {h:"With 'ʻoluʻolu' for 'please'",b:"E kōkua ʻoluʻolu. = Please help.\nE komo mai, ʻoluʻolu. = Please come in."},
  {h:"Negative command: mai",b:"Mai hele! = Don't go!\nMai ʻai i kēlā! = Don't eat that!\nMai hopohopo. = Don't worry."},
  {h:"Invitations with e ... kāua/kākou",b:"E hele kāua! = Let's (you and I) go!\nE ʻai kākou! = Let's (all of us) eat!"},
]}/>);}

function Guide21(){
  const dirs=[
    {p:"mai",dir:"Toward the speaker",ex:"E hele mai! = Come (toward me)!\nHaʻawi mai = Give (to me)",color:"#C62828",arrow:"←"},
    {p:"aku",dir:"Away from the speaker",ex:"E hele aku! = Go (away from me)!\nHaʻawi aku = Give (to someone else)",color:"#0D47A1",arrow:"→"},
    {p:"aʻe",dir:"Upward / next / more",ex:"E piʻi aʻe = Go up more\nKēia mua aʻe = the next one",color:"#2E7D32",arrow:"↑"},
    {p:"iho",dir:"Downward / self / less",ex:"E iho iho = Come down\nnoho iho = sit yourself down",color:"#6A1B9A",arrow:"↓"},
  ];
  return(<div>
    <DarkBox title="Uniquely Hawaiian"><div style={{fontSize:13}}>
      These four particles add <strong style={{color:"#FFE77A"}}>direction, degree, or perspective</strong> to verbs. They come right after the verb.
    </div></DarkBox>
    {dirs.map((d,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:`2px solid ${d.color}`,marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
        <span style={{fontSize:24,color:d.color}}>{d.arrow}</span>
        <span style={{fontSize:18,fontWeight:800,color:d.color,fontStyle:"italic",fontFamily:"'Georgia',serif"}}>{d.p}</span>
        <span style={{fontSize:12,color:"#888"}}>{d.dir}</span>
      </div>
      <div style={{fontSize:12,color:"#555",lineHeight:1.5,fontStyle:"italic"}}>{d.ex}</div>
    </div>))}
    <Insight text="The mai/aku distinction is one of the most important in Hawaiian. 'Hele mai' = come (to me). 'Hele aku' = go (away from me). The same verb, different direction."/>
  </div>);
}

function Guide22(){return(<SimpleGuide items={[
  {h:"'And' — a me (nouns) / a (clauses)",b:"ke kāne a me ka wahine = the man and the woman\nHele au a hana. = I go and work."},
  {h:"'Because' — no ka mea",b:"ʻAʻole au i hele no ka mea ua ua. = I didn't go because it rained."},
  {h:"'If' — inā",b:"Inā ua hele ʻoe, ua ʻike ʻoe. = If you had gone, you would have seen."},
  {h:"'When' — i ka wā / ke ... nei",b:"I ka wā i hiki mai ai ʻo ia = When he arrived"},
  {h:"'So that / in order to' — i",b:"Ua hele au i hana. = I went in order to work."},
  {h:"Chaining verbs",b:"Hawaiian can stack verb phrases:\nUa hele au e ʻike i ka hale hou.\n= I went to see the new house."},
]}/>);}

function Guide23(){return(<SimpleGuide items={[
  {h:"Passive with 'ʻia'",b:"Ua ʻai ʻia ka iʻa. = The fish was eaten.\nUa kūkulu ʻia ka hale. = The house was built.\nʻia attaches to the verb to mark passive."},
  {h:"Agent in passive (e ... ana / na)",b:"Ua hana ʻia e Keoni. = It was done by John.\nThe agent follows 'e' (not 'na')."},
  {h:"The 'ua ... ʻia' pattern",b:"ua + verb + ʻia (+ e + agent)\nUa kākau ʻia ka leka e ka haumāna.\n= The letter was written by the student."},
  {h:"Stative passive (result state)",b:"Wehe ʻia ka puka. = The door is opened (state).\nPaʻa ka hana. = The work is done/solid."},
]}/>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 24-28: VOCABULARY
// ═══════════════════════════════════════════════════════════════
function Guide24(){
  const nums=[{n:"1",h:"ʻekahi"},{n:"2",h:"ʻelua"},{n:"3",h:"ʻekolu"},{n:"4",h:"ʻehā"},{n:"5",h:"ʻelima"},
    {n:"6",h:"ʻeono"},{n:"7",h:"ʻehiku"},{n:"8",h:"ʻewalu"},{n:"9",h:"ʻeiwa"},{n:"10",h:"ʻumi"}];
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:16}}>
      {nums.map(n=>(<div key={n.n} style={{textAlign:"center",padding:"10px 4px",background:"#fff",borderRadius:10,border:"1px solid #e0dcd5"}}>
        <div style={{fontSize:24,fontWeight:800,color:"#C62828"}}>{n.n}</div>
        <div style={{fontSize:11,color:"#555",fontStyle:"italic",marginTop:2}}>{n.h}</div>
      </div>))}
    </div>
    <SimpleGuide items={[
      {h:"Teens and tens",b:"11: ʻumikūmākahi · 12: ʻumikūmālua · 20: iwakālua\n30: kanakolu · 40: kanahā · 50: kanalima\n100: hoʻokahi haneli · 1000: hoʻokahi kaukani"},
      {h:"Counting things (with classifiers)",b:"ʻElua puke = two books · ʻEkolu keiki = three children\nNumber comes before the noun (no article needed)"},
      {h:"Traditional Hawaiian counting",b:"Hawaiian had a base-4 and base-40 system for certain counts (fish, taro). Kauna = 4, kanaha = 40, lau = 400, mano = 4000. Still referenced culturally."},
    ]}/>
  </div>);
}

function Guide25(){return(<SimpleGuide items={[
  {h:"Days of the week",b:"Pōʻakahi = Monday · Pōʻalua = Tuesday\nPōʻakolu = Wednesday · Pōʻahā = Thursday\nPōʻalima = Friday · Pōʻaono = Saturday\nLāpule = Sunday"},
  {h:"Pattern: Pōʻa + number",b:"Pō = night, ʻa = of, kahi = one. So Monday = 'first-night day'\nLāpule = 'day of prayer' (Sunday)"},
  {h:"Months (modern Hawaiian)",b:"Ianuali, Pepeluali, Malaki, ʻApelila, Mei, Iune,\nIulai, ʻAukake, Kepakemapa, ʻOkakopa, Nowemapa, Kēkēmapa\n(Adapted from English — traditional Hawaiian used lunar months)"},
  {h:"Telling time",b:"Ka hola ʻekahi = 1 o'clock\nKa hola ʻelua a me ka hapahā = 2:15 (two and a quarter)\nKa hola ʻekolu a me ka hapalua = 3:30 (three and a half)"},
]}/>);}

function Guide26(){return(<div>
  <SimpleGuide items={[
    {h:"Parents",b:"makuakāne = father · makuahine = mother\nmakua = parent (gender-neutral plural: nā makua = parents)"},
    {h:"Siblings (relative age matters!)",b:"kaikuaʻana = older sibling (same gender)\nkaikaina = younger sibling (same gender)\nkaikuahine = sister (of a male)\nkaikunāne = brother (of a female)"},
    {h:"Children & grandchildren",b:"keiki = child · kaikamahine = daughter · keikikāne = son\nmoʻopuna = grandchild"},
    {h:"Spouse & extended family",b:"kāne = husband/man · wahine = wife/woman\nkupuna = grandparent/ancestor · ʻohana = family"},
    {h:"Hānai — the Hawaiian adoption tradition",b:"keiki hānai = adopted/fostered child\nA deeply valued cultural practice of raising children within the extended ʻohana"},
  ]}/>
  <CultureNote text="In Hawaiian culture, ʻohana extends far beyond the nuclear family. Aunts/uncles (ʻanakē/ʻanakala) are often called 'mom' and 'dad'. All elders are treated as kupuna (grandparents). Family terms carry deep relational responsibility."/>
  <Insight text="Family terms use O-class possessives — you don't choose your family. Koʻu makuahine = my mother (O-class, not A-class)."/>
</div>);}

function Guide27(){return(<div>
  <SimpleGuide items={[
    {h:"Land & water",b:"ʻāina = land · honua = earth · moana = deep ocean\nkai = sea/saltwater · wai = freshwater · kahawai = stream/river\nmauna = mountain · kuahiwi = mountain range · pali = cliff"},
    {h:"Sky & weather",b:"lani = sky/heaven · lā = sun · mahina = moon\nao = cloud · ua = rain · makani = wind\nānuenue = rainbow · hōkū = star"},
    {h:"Plants & animals",b:"lāʻau = tree/plant · pua = flower · niu = coconut\nkalo = taro (sacred staple) · ʻulu = breadfruit\niʻa = fish · manu = bird · honu = sea turtle\nmano = shark · naiʻa = dolphin · koholā = whale"},
    {h:"Place name meanings",b:"Waikīkī = spouting water · Honolulu = sheltered bay\nMauna Kea = white mountain · Haleakalā = house of the sun\nHawaiian place names describe the land — learning them teaches geography AND vocabulary"},
  ]}/>
  <CultureNote text="In Hawaiian worldview, people belong TO the land (ʻāina), not the other way around. This is reflected in the O-class possessive: koʻu ʻāina = my land (the land that holds me, not land I own)."/>
</div>);}

function Guide28(){
  const phrases=[
    {hw:"Aloha",en:"Hello/goodbye/love",note:"The most important Hawaiian word — far deeper than just a greeting"},
    {hw:"Mahalo",en:"Thank you",note:"Also means gratitude, admiration, praise"},
    {hw:"ʻAe",en:"Yes",note:"Simple and direct"},
    {hw:"ʻAʻole",en:"No",note:"Also used in negation patterns"},
    {hw:"E komo mai",en:"Welcome / come in",note:"Used to invite someone in"},
    {hw:"A hui hou",en:"Until we meet again",note:"Common farewell — not 'goodbye' but 'see you later'"},
    {hw:"Pehea ʻoe?",en:"How are you?",note:"Literally 'How (are) you?'"},
    {hw:"Maikaʻi au",en:"I'm good/well",note:"Response to Pehea ʻoe"},
    {hw:"ʻO wai kou inoa?",en:"What is your name?",note:"Lit. 'Who (is) your name?' — O-class for 'name'"},
    {hw:"ʻO [name] koʻu inoa",en:"My name is [name]",note:"O-class possessive for name"},
    {hw:"ʻAʻohe mea",en:"You're welcome / it's nothing",note:"Response to mahalo"},
    {hw:"Kala mai iaʻu",en:"Excuse me / forgive me",note:"Lit. 'forgive me'"},
    {hw:"E ʻoluʻolu ʻoe",en:"Please",note:"Lit. 'be comfortable/kind (you)'"},
    {hw:"Hauʻoli lā hānau",en:"Happy birthday",note:"hauʻoli = happy, lā = day, hānau = birth"},
  ];
  return(<div>
    <Card color="#4527A0" title="Essential Phrases">
      {phrases.map((p,i)=>(<div key={i} style={{padding:"10px 16px",borderBottom:i<phrases.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
          <span style={{fontSize:16,fontWeight:700,color:"#4527A0",fontStyle:"italic"}}>{p.hw}</span>
          <span style={{fontSize:13,color:"#555"}}>{p.en}</span>
        </div>
        <div style={{fontSize:11,color:"#aaa",marginTop:2}}>{p.note}</div>
      </div>))}
    </Card>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 29-30: CULTURE
// ═══════════════════════════════════════════════════════════════
function Guide29(){return(<div>
  <DarkBox title="From Near-Extinction to Revival"><div style={{fontSize:13,lineHeight:1.6}}>
    In 1983, fewer than <strong style={{color:"#EF9A9A"}}>50 children</strong> were native speakers. Today, thanks to immersion schools and dedicated communities, <strong style={{color:"#81C784"}}>thousands</strong> are learning and using ʻŌlelo Hawaiʻi daily.
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"The decline",b:"1896: Hawaiian banned as medium of instruction in schools after the overthrow of the Hawaiian Kingdom.\nBy the 1980s, nearly all fluent speakers were elderly. The language was critically endangered."},
    {h:"Pūnana Leo — the turning point (1984)",b:"Hawaiian-medium immersion preschools, modeled on Māori Kōhanga Reo. Children raised entirely in Hawaiian from birth. Now operates on multiple islands."},
    {h:"Kula Kaiapuni — immersion K-12 schools",b:"Full Hawaiian-medium education from preschool through high school. Students learn all subjects in Hawaiian. Graduates are fluent speakers and proud cultural practitioners."},
    {h:"Today's status",b:"ʻŌlelo Hawaiʻi is an official state language of Hawaiʻi (since 1978).\nUniversity of Hawaiʻi offers a PhD program in Hawaiian.\nHawaiian-language media, music, and literature are growing.\nThe community remains small but passionate and growing."},
    {h:"How you can support",b:"Learn the language — even basics show respect.\nUse correct spelling with ʻokina and kahakō.\nSupport Pūnana Leo and Hawaiian-medium education.\nListen to Hawaiian music and read Hawaiian literature."},
  ]}/>
  <CultureNote text="Language revitalization is an act of cultural sovereignty. For Native Hawaiians, speaking ʻŌlelo Hawaiʻi is deeply connected to identity, land, and self-determination. Learning Hawaiian respectfully honors this ongoing work."/>
</div>);}

function Guide30(){return(<SimpleGuide items={[
  {h:"What is Pidgin (Hawaiʻi Creole English)?",b:"A creole language that developed on sugar plantations in the late 1800s-early 1900s from English, Hawaiian, Japanese, Chinese, Portuguese, and Filipino languages mixing together."},
  {h:"Pidgin ≠ Hawaiian",b:"Pidgin is English-based with Hawaiian loanwords.\nHawaiian is a Polynesian language — completely different grammar.\n'Da kine' is Pidgin. 'Ke aloha' is Hawaiian.\nThey coexist but are distinct languages."},
  {h:"Hawaiian words commonly used in Pidgin/English",b:"aloha, mahalo, ʻohana, lei, luau, hula, wiki, poke (the fish dish), lanai, kama'āina, haole, keiki, wahine, kāne, pūpū (appetizer), makai/mauka"},
  {h:"Why the distinction matters",b:"Calling Pidgin 'Hawaiian' erases the actual Hawaiian language.\nPidgin is the daily language of many Hawaiʻi residents.\nHawaiian is an indigenous Polynesian language in active revitalization.\nBoth deserve respect — and accurate naming."},
  {h:"Key grammatical differences",b:"Pidgin: 'Da baby stay sleeping' (SVO, English-based)\nHawaiian: 'Ke hiamoe nei ke keiki' (VSO, Polynesian)\nCompletely different language families and structures."},
]}/>);}

// ═══════════════════════════════════════════════════════════════
// GUIDE COMPONENTS ARRAY
// ═══════════════════════════════════════════════════════════════

export const guideComponents=[Guide1,Guide2,Guide3,Guide4,Guide5,Guide6,Guide7,Guide8,Guide9,Guide10,Guide11,Guide12,Guide13,Guide14,Guide15,Guide16,Guide17,Guide18,Guide19,Guide20,Guide21,Guide22,Guide23,Guide24,Guide25,Guide26,Guide27,Guide28,Guide29,Guide30];
