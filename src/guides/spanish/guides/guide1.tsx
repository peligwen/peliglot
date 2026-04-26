import { useState, useRef, useEffect } from 'react';
import { AlphabetGrid } from '../../../components/templates/AlphabetGrid';
import { speakSpanish } from '../../../utils/speech';
import { VowelBar } from './_helpers';
import { letters, digraphs, vowels } from './data1';

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

interface AutoTourControlProps {
  onStart: () => void;
  onStop: () => void;
  playing: boolean;
  curName: string;
  curLetter: string;
}

function AutoTourControl({ onStart, onStop, playing, curName, curLetter }: AutoTourControlProps) {
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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTour = () => {
    if (timerRef.current !== null) clearInterval(timerRef.current);
    setPlaying(false);
  };

  const startTour = () => {
    idxRef.current = 0;
    setTourIdx(0);
    speakSpanish(letters[0].name);
    setPlaying(true);
    timerRef.current = setInterval(() => {
      const next = idxRef.current + 1;
      if (next >= letters.length) { if (timerRef.current !== null) clearInterval(timerRef.current); setPlaying(false); return; }
      idxRef.current = next;
      setTourIdx(next);
      speakSpanish(letters[next].name);
    }, 1600);
  };

  useEffect(() => () => { if (timerRef.current !== null) clearInterval(timerRef.current); }, []);

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
        letters={letters as unknown as Record<string, unknown>[]}
        letterKey="letter"
        nameKey="name"
        filterGroups={[
          {id:"all",label:"All",filterFn:()=>true},
          {id:"vowels",label:"Vowels",filterFn:l=>vowels.includes(l['letter'] as string)},
          {id:"tricky",label:"⚠ Tricky",filterFn:l=>!!l['tricky']},
        ]}
        detailFields={[
          {key:"ipa"},
          {key:"approx",label:"Sounds Like",bgColor:"#FFF8E7",borderColor:"#F0E4C4",textColor:"#998544"},
          {key:"tip",label:"Tip",bgColor:"#F5F9F5",borderColor:"#D4E8D4",textColor:"#2C5F2D"},
        ]}
        primaryColor="#2C5F2D"
        accentBg="#FFF8E7"
        accentFn={l=>vowels.includes(l['letter'] as string)}
        badgeFn={l=>l['tricky']?{color:"#D4A843"}:null}
        borderFn={l=>playing&&letters[tourIdx]?.letter===(l['letter'] as string)?"2px solid #2C5F2D":null}
        speakFn={speakSpanish}
        speakKey="name"
        gridMin="56px"
        footerContent={<><VowelBar/><DigraphsBlock/></>}
      />
    </div>
  );
}
