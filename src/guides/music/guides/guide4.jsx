import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { playSequence } from '../../../utils/audio';
import { Insight, Piano, buildScale, ALL_NOTES } from './_helpers';

const MINOR_STEPS=[2,1,2,2,1,2,2];

export function Guide4(){
  const [root,setRoot]=useState("A");
  const [mode,setMode]=useState("natural");
  const steps={natural:MINOR_STEPS,harmonic:[2,1,2,2,1,3,1],melodic:[2,1,2,2,2,2,1]};
  const scale=buildScale(root,steps[mode]);
  const labels=Object.fromEntries(scale.map((n,i)=>[n,String(i+1)]));
  return(<div>
    <DarkBox title="The 'sad' scale"><div style={{fontSize:14}}>
      The minor scale has a <strong style={{color:"#FFE77A"}}>lowered 3rd, 6th, and 7th</strong> compared to major. That lowered 3rd is what creates the "sad" or "dark" sound. A minor and C major share the exact same notes — just different starting points.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center"}}>
      {[{k:"natural",l:"Natural Minor"},{k:"harmonic",l:"Harmonic Minor"},{k:"melodic",l:"Melodic Minor"}].map(m=>(<button key={m.k} onClick={()=>{setMode(m.k);playSequence(buildScale(root,steps[m.k]).map(x=>x+"4"),200);}} style={{padding:"6px 14px",borderRadius:8,border:mode===m.k?"2.5px solid #6A1B9A":"1.5px solid #ddd",background:mode===m.k?"#6A1B9A":"#fff",color:mode===m.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:12}}>{m.l}</button>))}
    </div>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:12}}>
      {ALL_NOTES.map(n=>(<button key={n} onClick={()=>{setRoot(n);playSequence(buildScale(n,steps[mode]).map(x=>x+"4"),200);}} style={{width:36,height:28,borderRadius:6,border:root===n?"2px solid #6A1B9A":"1.5px solid #ddd",background:root===n?"#6A1B9A":"#fff",color:root===n?"#fff":"#555",cursor:"pointer",fontWeight:700,fontSize:11}}>{n}</button>))}
    </div>
    <Piano keys={15} highlighted={scale} highlightColor="#6A1B9A" labels={labels} />
    <div style={{background:"#fff",borderRadius:12,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:12,fontWeight:700,color:"#6A1B9A",marginBottom:4}}>{root} {mode} minor:</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {scale.slice(0,7).map((n,i)=>(<span key={i} style={{padding:"4px 12px",borderRadius:8,background:"#EDE7F6",color:"#6A1B9A",fontSize:14,fontWeight:700,border:"1px solid #D1C4E9"}}>{n}</span>))}
      </div>
    </div>
    <Insight text="The 'relative minor' of any major key is the 6th degree. C major's relative minor = A minor. Same notes, different home base, completely different mood." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 5: KEY SIGNATURES / CIRCLE OF FIFTHS
// ═══════════════════════════════════════════════════════════════
