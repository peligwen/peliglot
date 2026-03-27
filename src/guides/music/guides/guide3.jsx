import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { playSequence } from '../../../utils/audio';
import { Insight, Piano, buildScale, ALL_NOTES, MAJOR_STEPS } from './_helpers';

export function Guide3(){
  const [root,setRoot]=useState("C");
  const scale=buildScale(root,MAJOR_STEPS);
  const degreeNames=["1 (Root)","2","3","4","5","6","7","8 (Octave)"];
  const labels=Object.fromEntries(scale.map((n,i)=>[n,degreeNames[i]||""]));
  return(<div>
    <DarkBox title="The 7-note pattern that defines Western music"><div style={{fontSize:14}}>
      The major scale = <strong style={{color:"#FFE77A"}}>Whole-Whole-Half-Whole-Whole-Whole-Half</strong>. Pick any note, apply this pattern, and you get a major scale. They all sound "the same" — just shifted up or down.
    </div></DarkBox>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:12}}>
      {ALL_NOTES.map(n=>(<button key={n} onClick={()=>{setRoot(n);playSequence(buildScale(n,MAJOR_STEPS).map(x=>x+"4"),200);}} style={{padding:"5px 10px",borderRadius:8,border:root===n?"2.5px solid #1565C0":"1.5px solid #ddd",background:root===n?"#1565C0":"#fff",color:root===n?"#fff":"#555",cursor:"pointer",fontWeight:700,fontSize:13}}>{n}</button>))}
    </div>
    <Piano keys={15} highlighted={scale} highlightColor="#1565C0" labels={labels} />
    <div style={{display:"flex",gap:2,justifyContent:"center",marginBottom:16}}>
      {["W","W","H","W","W","W","H"].map((s,i)=>(<div key={i} style={{width:40,height:32,borderRadius:6,background:s==="H"?"#C62828":"#1565C0",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800}}>{s}</div>))}
    </div>
    <div style={{background:"#fff",borderRadius:12,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:12,fontWeight:700,color:"#1565C0",marginBottom:4}}>{root} major scale:</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {scale.slice(0,7).map((n,i)=>(<span key={i} style={{padding:"4px 12px",borderRadius:8,background:"#E3F2FD",color:"#1565C0",fontSize:14,fontWeight:700,border:"1px solid #BBDEFB"}}>{n}</span>))}
      </div>
    </div>
    <Insight text="C major has no sharps or flats — all white keys. That's why it's the 'default' key for learning. But every major scale sounds the same mood-wise, just at different pitches." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 4: MINOR SCALE
// ═══════════════════════════════════════════════════════════════
