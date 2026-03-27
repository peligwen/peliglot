import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { playNote } from '../../../utils/audio';
import { Insight, noteName, Piano, ALL_NOTES, isBlack, INTERVALS } from './_helpers';

export function Guide1(){
  const [selNote,setSelNote]=useState(null);
  return(<div>
    <DarkBox title="The entire alphabet of Western music"><div style={{fontSize:14,lineHeight:1.6}}>
      All of Western music — every genre, every song — uses just <strong style={{color:"#FFE77A"}}>12 notes</strong> that repeat in higher and lower octaves. That's it. The piano makes this visible: 12 keys (7 white + 5 black) repeating forever.
    </div></DarkBox>
    <Piano keys={13} highlighted={selNote?[selNote]:[]} highlightColor="#C62828" onPlay={(n,base)=>setSelNote(base)} labels={Object.fromEntries(ALL_NOTES.map(n=>[n,n]))} />
    <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:16}}>
      {ALL_NOTES.map(n=>(<button key={n} onClick={()=>{setSelNote(n);playNote(n+"4");}} style={{width:42,height:42,borderRadius:8,background:selNote===n?"#C62828":isBlack(n)?"#333":"#fff",color:selNote===n?"#fff":isBlack(n)?"#fff":"#333",border:isBlack(n)?"2px solid #555":"1.5px solid #ddd",cursor:"pointer",fontSize:13,fontWeight:700}}>{n}</button>))}
    </div>
    {selNote&&<div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:18,fontWeight:800,color:"#C62828"}}>{noteName(selNote)}</div>
      <div style={{fontSize:12,color:"#888",marginTop:4}}>This note repeats at every octave. C2, C3, C4, C5 are all "C" — same letter, different pitch. The distance between them is always 12 half-steps.</div>
    </div>}
    <Insight text="There's no note between B and C, or between E and F — these are natural half-steps. Every other pair of natural notes has a sharp/flat between them. This is why the piano has gaps in the black keys." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 2: INTERVALS
// ═══════════════════════════════════════════════════════════════
