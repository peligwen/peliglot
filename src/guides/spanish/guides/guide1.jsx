import { useState } from 'react';
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

export function Guide1() {
  const [sel, setSel] = useState(null);
  const [filter, setFilter] = useState("all");
  const [speaking, setSpeaking] = useState(false);
  const vowels = ["A","E","I","O","U"];
  const filtered = letters.filter(l => filter === "all" ? true : filter === "vowels" ? vowels.includes(l.letter) : l.tricky);
  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:16,justifyContent:"center",flexWrap:"wrap"}}>
        {[{id:"all",label:"All"},{id:"vowels",label:"Vowels"},{id:"tricky",label:"\u26A0 Tricky"}].map(f=>(
          <button key={f.id} onClick={()=>{setFilter(f.id);setSel(null)}} style={{padding:"6px 14px",borderRadius:20,border:filter===f.id?"2px solid #2C5F2D":"1.5px solid #ddd",background:filter===f.id?"#2C5F2D":"#fff",color:filter===f.id?"#fff":"#666",fontSize:12,fontWeight:600,cursor:"pointer"}}>{f.label}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(56px, 1fr))",gap:6,marginBottom:16}}>
        {filtered.map(l=>{
          const isV=vowels.includes(l.letter); const isSel=sel?.letter===l.letter;
          return (<button key={l.letter} onClick={()=>setSel(isSel?null:l)} style={{aspectRatio:"1",border:isSel?`2.5px solid #2C5F2D`:l.tricky?"2px solid #D4A843":"1.5px solid #e0ddd8",borderRadius:10,background:isSel?"#2C5F2D":isV?"#FFF8E7":"#fff",color:isSel?"#FFE77A":"#1a1a1a",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",transform:isSel?"scale(1.08)":"scale(1)",transition:"all 0.15s"}}>
            <span style={{fontSize:l.letter.length>1?16:20,fontWeight:700,lineHeight:1}}>{l.letter}</span>
            <span style={{fontSize:8,color:isSel?"rgba(255,231,122,0.7)":"#aaa",marginTop:1}}>{l.name}</span>
            {l.tricky&&!isSel&&<div style={{position:"absolute",top:3,right:4,width:5,height:5,borderRadius:"50%",background:"#D4A843"}}/>}
          </button>);
        })}
      </div>
      {sel&&(<div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #e8e5e0",marginBottom:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:"#2C5F2D",padding:"16px 20px",display:"flex",alignItems:"center",gap:16}}>
          <div style={{fontSize:40,fontWeight:700,color:"#FFE77A",minWidth:50,textAlign:"center"}}>{sel.letter}</div>
          <div><div onClick={(e)=>{e.stopPropagation();if(speaking)return;setSpeaking(true);speakSpanish(sel.name,()=>setSpeaking(false))}} style={{color:"rgba(255,255,255,0.6)",fontSize:11,cursor:window.speechSynthesis?"pointer":"default",display:"inline-flex",alignItems:"center",gap:4,opacity:speaking?0.6:1,transition:"opacity 0.15s"}}>Name: <strong style={{color:"#fff"}}>{sel.name}</strong>{window.speechSynthesis&&<span style={{fontSize:12,opacity:speaking?1:0.6,animation:speaking?"pulse 0.8s ease infinite":"none"}}>{speaking?"\uD83D\uDD0A":"\uD83D\uDD08"}</span>}</div><div style={{color:"#FFE77A",fontSize:16,fontFamily:"monospace",fontWeight:700}}>{sel.ipa}</div></div>
        </div>
        <div style={{padding:"14px 18px"}}>
          <div style={{background:"#FFF8E7",borderRadius:8,padding:"10px 14px",marginBottom:10,border:"1px solid #F0E4C4"}}>
            <div style={{fontSize:10,color:"#998544",fontWeight:600,marginBottom:3,textTransform:"uppercase",letterSpacing:1}}>Sounds Like</div>
            <div style={{fontSize:14,color:"#1a1a1a",fontWeight:600}}>{sel.approx}</div>
          </div>
          <div style={{background:"#F5F9F5",borderRadius:8,padding:"10px 14px",border:"1px solid #D4E8D4"}}>
            <div style={{fontSize:10,color:"#2C5F2D",fontWeight:600,marginBottom:3,textTransform:"uppercase",letterSpacing:1}}>Tip</div>
            <div style={{fontSize:13,color:"#333",lineHeight:1.5}}>{sel.tip}</div>
          </div>
        </div>
      </div>)}
      <VowelBar/>
    </div>
  );
}
