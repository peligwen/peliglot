import { useState } from 'react';
import { playChord } from '../../../utils/audio';
import { Insight, Piano, buildChord } from './_helpers';

export function Guide10(){
  const [root,_setRoot]=useState("C");
  const [type,setType]=useState("power");
  const types=[{k:"power",l:"Power Chord (5)",desc:"Root + 5th only. No 3rd = neither major nor minor. Dominates rock, punk, metal.",iv:[7],c:"#2E7D32"},
    {k:"sus2",l:"Sus2",desc:"3rd replaced by 2nd. Open, ambiguous. Common in pop/folk.",iv:[2,5],c:"#1565C0"},
    {k:"sus4",l:"Sus4",desc:"3rd replaced by 4th. Tense, wants to resolve back to major/minor.",iv:[5,2],c:"#E65100"}];
  const t=types.find(x=>x.k===type);
  const chord=buildChord(root,t.iv);
  return(<div>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {types.map(tp=>(<button key={tp.k} onClick={()=>{setType(tp.k);playChord(buildChord(root,tp.iv).map(n=>n+"4"));}} style={{flex:1,maxWidth:160,padding:"8px",borderRadius:10,border:type===tp.k?`2.5px solid ${tp.c}`:"1.5px solid #ddd",background:type===tp.k?tp.c:"#fff",color:type===tp.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:13}}>{tp.l}</button>))}
    </div>
    <Piano keys={13} highlighted={chord} highlightColor={t.c} />
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:`2px solid ${t.c}`,marginBottom:16}}>
      <div style={{fontSize:16,fontWeight:800,color:t.c}}>{root}{type==="power"?"5":type} — {chord.join(" – ")}</div>
      <div style={{fontSize:12,color:"#555",marginTop:4}}>{t.desc}</div>
    </div>
    <Insight text="Power chords work for rock because distortion adds extra harmonics that make full chords sound muddy. By removing the 3rd, you get a clean, powerful sound that distortion can't mess up." />
  </div>);
}
