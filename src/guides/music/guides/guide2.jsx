import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { playSequence } from '../../../utils/audio';
import { Insight, Piano, ALL_NOTES, INTERVALS } from './_helpers';

export function Guide2(){
  const [root]=useState("C");
  const [selIv,setSelIv]=useState(null);
  const iv=selIv!==null?INTERVALS[selIv]:null;
  const hlNotes=iv?[root,ALL_NOTES[(ALL_NOTES.indexOf(root)+iv.half)%12]]:[];
  return(<div>
    <DarkBox title="The distance between any two notes"><div style={{fontSize:14}}>
      An interval = the <strong style={{color:"#FFE77A"}}>distance</strong> between two notes, measured in half-steps. Intervals are the most fundamental concept — scales, chords, and melodies are all built from them. Tap any to hear it from C.
    </div></DarkBox>
    <Piano keys={14} highlighted={hlNotes} highlightColor="#C62828" labels={iv?{[root]:"Root",[ALL_NOTES[(ALL_NOTES.indexOf(root)+iv.half)%12]]:iv.short}:{}} />
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(70px,1fr))",gap:4,marginBottom:16}}>
      {INTERVALS.map((intv,i)=>{const isSel=selIv===i;return(
        <button key={i} onClick={()=>{setSelIv(i);const n2=ALL_NOTES[(ALL_NOTES.indexOf(root)+intv.half)%12];playSequence([root+"4",n2+"4"],300);}} style={{padding:"6px 4px",borderRadius:8,border:isSel?"2.5px solid #C62828":"1.5px solid #ddd",background:isSel?"#C62828":"#fff",color:isSel?"#fff":"#333",cursor:"pointer",textAlign:"center"}}>
          <div style={{fontSize:12,fontWeight:800}}>{intv.short}</div>
          <div style={{fontSize:8,opacity:.7}}>{intv.half}h</div>
        </button>
      );})}
    </div>
    {iv&&<div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"2px solid #C62828",marginBottom:16}}>
      <div style={{fontSize:16,fontWeight:800,color:"#C62828"}}>{iv.name} <span style={{fontSize:12,color:"#888"}}>({iv.half} half-steps)</span></div>
      <div style={{fontSize:13,color:"#555",marginTop:4}}>{iv.mood}</div>
    </div>}
    <Insight text="The major third (4 half-steps) sounds happy. The minor third (3 half-steps) sounds sad. This single interval is what separates major from minor — the entire mood shift comes from ONE half-step difference." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 3: MAJOR SCALE
// ═══════════════════════════════════════════════════════════════
