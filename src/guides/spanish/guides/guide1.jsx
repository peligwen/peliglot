import { useState, useRef, useEffect } from 'react';
import { AlphabetGrid } from '../../../components/templates/AlphabetGrid';
import { speakSpanish } from '../../../utils/speech';
import { VowelBar } from './_helpers';

// Modern RAE alphabet (post-2010 Ortografía): 27 letters.
// CH, LL, RR are digraphs — shown below the grid.
const letters = [
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

const digraphs = [
  { dg: "CH", name: "che", ipa: "/tʃ/", approx: "Like 'ch' in 'church'", tip: "Removed from the official alphabet in RAE Ortografía 2010, but still a key pronunciation pair. chaleco, mucho." },
  { dg: "LL", name: "elle", ipa: "/ʝ/", approx: "Like 'y' in 'yes'", tip: "Removed from the alphabet in 2010. Most speakers say LL = Y (yeísmo). In Argentina: 'sh' sound." },
  { dg: "RR", name: "erre doble", ipa: "/r/", approx: "Rolled/trilled 'r'", tip: "Never an official letter — always a digraph. perro (dog) vs pero (but). Multiple rapid tongue taps." },
];

const vowels = ["A","E","I","O","U"];

function DigraphsBlock() {
  return (
    <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #e8e5e0",marginTop:8}}>
      <div style={{padding:"8px 14px",background:"#F3E5F5",borderBottom:"1px solid #E1BEE7",fontSize:13,fontWeight:700,color:"#6A1B9A"}}>Dígrafos (Digraphs) — Not Letters, but Essential Sounds</div>
      <div style={{padding:"8px 12px",fontSize:11,color:"#888",borderBottom:"1px solid #f0eeeb",lineHeight:1.5}}>Since the 2010 RAE Ortografía, CH and LL are no longer official letters of the 27-letter Spanish alphabet. RR was never a letter under any RAE convention. All three are digraphs — two-character pronunciation pairs every learner needs.</div>
      {digraphs.map((d,i)=>(
        <div key={d.dg} style={{padding:"10px 14px",borderBottom:i<digraphs.length-1?"1px solid #f0eeeb":"none",display:"grid",gridTemplateColumns:"48px 80px 1fr",gap:8,alignItems:"start"}}>
          <span style={{fontSize:20,fontWeight:800,color:"#6A1B9A"}}>{d.dg}</span>
          <div><div style={{fontSize:11,fontWeight:700,color:"#1a1a1a"}}>{d.name}</div><div style={{fontSize:10,color:"#9C6CB0",fontFamily:"monospace"}}>{d.ipa} — {d.approx}</div></div>
          <div style={{fontSize:10,color:"#777",lineHeight:1.5}}>{d.tip}</div>
        </div>
      ))}
    </div>
  );
}

function AutoTourControl({ onStart, onStop, playing, curName, curLetter }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",background:"#F5F9F5",borderRadius:10,marginBottom:8,border:"1px solid #e0dcd5"}}>
      <button onClick={playing?onStop:onStart} style={{padding:"6px 16px",borderRadius:8,border:"none",background:playing?"#C62828":"#2C5F2D",color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}}>
        {playing?"⏹ Stop":"▶ Auto-Tour"}
      </button>
      <span style={{fontSize:11,color:"#888"}}>{playing?`Hearing: ${curName} (${curLetter})…`:"Tap any letter to hear it, or auto-tour all 27"}</span>
    </div>
  );
}

export function Guide1() {
  const [playing, setPlaying] = useState(false);
  const [tourIdx, setTourIdx] = useState(0);
  const idxRef = useRef(0);
  const timerRef = useRef(null);

  const stopTour = () => {
    clearInterval(timerRef.current);
    setPlaying(false);
  };

  const startTour = () => {
    idxRef.current = 0;
    setTourIdx(0);
    speakSpanish(letters[0].name);
    setPlaying(true);
    timerRef.current = setInterval(() => {
      const next = idxRef.current + 1;
      if (next >= letters.length) { clearInterval(timerRef.current); setPlaying(false); return; }
      idxRef.current = next;
      setTourIdx(next);
      speakSpanish(letters[next].name);
    }, 1600);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <div>
      <AutoTourControl
        onStart={startTour}
        onStop={stopTour}
        playing={playing}
        curName={letters[tourIdx]?.name || ""}
        curLetter={letters[tourIdx]?.letter || ""}
      />
      <AlphabetGrid
        letters={letters}
        letterKey="letter"
        nameKey="name"
        filterGroups={[
          {id:"all",label:"All",filterFn:()=>true},
          {id:"vowels",label:"Vowels",filterFn:l=>vowels.includes(l.letter)},
          {id:"tricky",label:"⚠ Tricky",filterFn:l=>l.tricky},
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
        borderFn={l=>playing&&letters[tourIdx]?.letter===l.letter?"2px solid #2C5F2D":null}
        speakFn={speakSpanish}
        speakKey="name"
        gridMin="56px"
        footerContent={<><VowelBar/><DigraphsBlock/></>}
      />
    </div>
  );
}
