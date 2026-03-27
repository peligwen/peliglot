import { Insight } from '../../../components/Insight';
import { AlphabetGrid } from '../../../components/templates/AlphabetGrid';
import { speakGerman } from '../../../utils/speech';

const germanLetters=[
  {l:"Ä ä",n:"A-Umlaut",ipa:"/ɛ/",approx:"Like 'e' in 'bed'",tip:"Pronounce 'a' but spread lips like 'e'. Short: Äpfel. Long: Mädchen.",type:"umlaut",color:"#C62828"},
  {l:"Ö ö",n:"O-Umlaut",ipa:"/ø/",approx:"No English equivalent",tip:"Make 'o' lips, try to say 'e'. The sound between them. Short: können. Long: schön.",type:"umlaut",color:"#C62828"},
  {l:"Ü ü",n:"U-Umlaut",ipa:"/y/",approx:"No English equivalent",tip:"Make 'oo' lips, try to say 'ee'. The sound between them. Short: müssen. Long: Tür.",type:"umlaut",color:"#C62828"},
  {l:"ß",n:"Eszett",ipa:"/s/",approx:"Always voiceless /s/",tip:"After LONG vowels/diphthongs: Straße, heißen, groß. After SHORT vowels use ss: Wasser, müssen.",type:"special",color:"#1565C0"},
  {l:"CH",n:"ich/ach-Laut",ipa:"/ç/ or /x/",approx:"Hissing (ich) or throat (ach)",tip:"After e,i,ä,ö,ü,consonants: soft /ç/ (ich, recht). After a,o,u,au: rough /x/ (Bach, noch).",type:"digraph",color:"#2E7D32"},
  {l:"SCH",n:"sch",ipa:"/ʃ/",approx:"Like English 'sh'",tip:"schön, Schule, Fisch. At word start, sp- and st- also become /ʃp/ and /ʃt/: sprechen, Straße.",type:"digraph",color:"#2E7D32"},
  {l:"R",n:"German R",ipa:"/ʁ/",approx:"Uvular — throat gargle",tip:"NOT the English R. Produced in the throat like a soft gargle. Similar to French R. At word end often becomes /ɐ/: Vater = /faːtɐ/.",type:"special",color:"#6A1B9A"},
  {l:"W",n:"German W",ipa:"/v/",approx:"Like English 'V'!",tip:"Wasser = /vasser/. German W = English V. This trips up everyone.",type:"swap",color:"#E65100"},
  {l:"V",n:"German V",ipa:"/f/ usually",approx:"Like English 'F'!",tip:"Vater = /faːtɐ/, Vogel = /foːɡəl/. In some foreign words: /v/ (Vase, Violine).",type:"swap",color:"#E65100"},
  {l:"Z",n:"German Z",ipa:"/ts/",approx:"Like 'ts' in 'cats'",tip:"Even at the start: Zeit = /tsaɪt/, zehn = /tseːn/. Never the English /z/ sound.",type:"swap",color:"#E65100"},
  {l:"S",n:"German S",ipa:"/z/ before vowels",approx:"Buzzes before vowels!",tip:"Sonne = /zɔnə/, sein = /zaɪn/. Before consonants or at end: /s/. The reverse of what you'd expect.",type:"swap",color:"#E65100"},
  {l:"EI",n:"ei/ai",ipa:"/aɪ/",approx:"Like 'eye'",tip:"mein, Wein, Mai, Kaiser. The SECOND letter tells you: EI = 'eye' sound.",type:"diphthong",color:"#880E4F"},
  {l:"IE",n:"ie",ipa:"/iː/",approx:"Like 'ee'",tip:"Bier, Liebe, Spiel. IE = 'ee' sound. EI vs IE is the #1 spelling trap.",type:"diphthong",color:"#880E4F"},
  {l:"EU/ÄU",n:"eu/äu",ipa:"/ɔɪ/",approx:"Like 'oy' in 'boy'",tip:"Freund, neu, Häuser, Bäume. EU and ÄU sound identical.",type:"diphthong",color:"#880E4F"},
  {l:"AU",n:"au",ipa:"/aʊ/",approx:"Like 'ow' in 'cow'",tip:"Haus, Frau, Baum, laut.",type:"diphthong",color:"#880E4F"},
];

export function Guide1(){
  return(
    <AlphabetGrid
      letters={germanLetters}
      letterKey="l"
      nameKey="n"
      filterGroups={[
        {id:"all",label:"All",filterFn:()=>true},
        {id:"umlaut",label:"Umlauts",filterFn:l=>l.type==="umlaut"},
        {id:"special",label:"Special",filterFn:l=>l.type==="special"},
        {id:"swap",label:"W/V/Z/S Swaps",filterFn:l=>l.type==="swap"},
        {id:"digraph",label:"CH/SCH",filterFn:l=>l.type==="digraph"},
        {id:"diphthong",label:"Diphthongs",filterFn:l=>l.type==="diphthong"},
      ]}
      primaryColor="#1a1a1a"
      speakFn={speakGerman}
      gridMin="64px"
      introTitle="26 letters + 4 special characters"
      introContent={<div style={{fontSize:14,lineHeight:1.6}}>
        German uses the English alphabet plus <strong style={{color:"#FFE77A"}}>ä, ö, ü</strong> (umlauts) and <strong style={{color:"#FFE77A"}}>ß</strong> (Eszett). Several consonants also sound different than English. Tap any to explore.
      </div>}
      renderDetail={(lt)=>(
        <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`2px solid ${lt.color}`,marginBottom:16,animation:"fadeIn 0.2s ease"}}>
          <div style={{background:lt.color,padding:"14px 18px",display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:36,fontWeight:800,color:"#FFE77A"}}>{lt.l}</div>
            <div><div style={{color:"#FFE77A",fontSize:15,fontFamily:"monospace"}}>{lt.ipa}</div><div style={{color:"rgba(255,255,255,0.7)",fontSize:12}}>{lt.approx}</div></div>
          </div>
          <div style={{padding:"12px 16px",fontSize:13,color:"#555",lineHeight:1.6}}>{lt.tip}</div>
        </div>
      )}
      footerContent={<Insight text="EI = 'eye' sound (mein, Wein). IE = 'ee' sound (Bier, Liebe). The SECOND letter tells you the sound. This is the #1 German spelling trap." />}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 2: VOWELS — LENGTH MATTERS
// ═══════════════════════════════════════════════════════════════
