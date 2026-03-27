import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { playChord } from '../../../utils/audio';
import { Insight, Piano, buildChord } from './_helpers';

export function Guide8(){
  const [root,setRoot]=useState("C");
  const [type,setType]=useState("maj7");
  const types=[{k:"maj7",l:"Maj7",desc:"Dreamy, lush",c:"#1565C0"},{k:"min7",l:"Min7",desc:"Mellow, jazzy",c:"#6A1B9A"},{k:"dom7",l:"Dom7",desc:"Bluesy, wants to resolve",c:"#C62828"},{k:"dim7",l:"Dim7",desc:"Tense, spooky",c:"#E65100"},{k:"hdim7",l:"m7b5",desc:"Dark, unstable",c:"#880E4F"}];
  const chord=buildChord(root,CHORD_TYPES[type]);
  const lbls=["R","3","5","7"];
  return(<div>
    <DarkBox title="Adding a 4th note"><div style={{fontSize:14}}>Triads have 3 notes. Add a <strong style={{color:"#FFE77A"}}>7th</strong> (the note a third above the 5th) and you get richer, more colorful chords. The <strong style={{color:"#EF9A9A"}}>dominant 7th</strong> (V7) is the most important — it creates tension that wants to resolve to I.</div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {types.map(t=>(<button key={t.k} onClick={()=>{setType(t.k);playChord(buildChord(root,CHORD_TYPES[t.k]).map(n=>n+"4"));}} style={{padding:"6px 12px",borderRadius:8,border:type===t.k?`2.5px solid ${t.c}`:"1.5px solid #ddd",background:type===t.k?t.c:"#fff",color:type===t.k?"#fff":"#555",cursor:"pointer",fontWeight:700,fontSize:12}}>{t.l}</button>))}
    </div>
    <Piano keys={13} highlighted={chord} highlightColor={types.find(t=>t.k===type).c} labels={Object.fromEntries(chord.map((n,i)=>[n,lbls[i]||""]))} />
    <div style={{background:"#fff",borderRadius:12,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:15,fontWeight:700,color:types.find(t=>t.k===type).c}}>{root}{type==="maj7"?"maj7":type==="min7"?"m7":type==="dom7"?"7":type==="dim7"?"dim7":"m7b5"}: {chord.join(" – ")}</div>
      <div style={{fontSize:12,color:"#888",marginTop:4}}>{types.find(t=>t.k===type).desc}</div>
    </div>
    <Insight text="The dominant 7th (like G7 in the key of C) is the engine of Western harmony. It creates a strong pull back to the I chord. Blues is built almost entirely on dominant 7ths." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 9-11: CHORD SYMBOLS, POWER/SUS, EXTENSIONS
// ═══════════════════════════════════════════════════════════════
