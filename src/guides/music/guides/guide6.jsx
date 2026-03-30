import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { playChord } from '../../../utils/audio';
import { Insight, Piano, buildChord, ALL_NOTES, CHORD_TYPES } from './_helpers';

export function Guide6(){
  const [root,setRoot]=useState("C");
  const [type,setType]=useState("major");
  const chord=buildChord(root,CHORD_TYPES[type]);
  const labels=Object.fromEntries(chord.map((n,i)=>[n,i===0?"R":i===1?"3rd":"5th"]));
  return(<div>
    <DarkBox title="Stacking intervals of thirds"><div style={{fontSize:14}}>
      A chord = 3+ notes played together. The most basic chord (a <strong style={{color:"#FFE77A"}}>triad</strong>) is built by stacking two thirds. Major third + minor third = major triad. Minor third + major third = minor triad. That's the whole difference.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center"}}>
      {[{k:"major",l:"Major",c:"#C62828"},{k:"minor",l:"Minor",c:"#1565C0"},{k:"dim",l:"Diminished",c:"#E65100"},{k:"aug",l:"Augmented",c:"#6A1B9A"}].map(t=>(<button key={t.k} onClick={()=>{setType(t.k);playChord(buildChord(root,CHORD_TYPES[t.k]).map(n=>n+"4"));}} style={{padding:"6px 14px",borderRadius:8,border:type===t.k?`2.5px solid ${t.c}`:"1.5px solid #ddd",background:type===t.k?t.c:"#fff",color:type===t.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:12}}>{t.l}</button>))}
    </div>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:12}}>
      {ALL_NOTES.map(n=>(<button key={n} onClick={()=>{setRoot(n);playChord(buildChord(n,CHORD_TYPES[type]).map(x=>x+"4"));}} style={{width:36,height:28,borderRadius:6,border:root===n?"2px solid #C62828":"1.5px solid #ddd",background:root===n?"#C62828":"#fff",color:root===n?"#fff":"#555",cursor:"pointer",fontWeight:700,fontSize:11}}>{n}</button>))}
    </div>
    <Piano keys={13} highlighted={chord} highlightColor={type==="major"?"#C62828":type==="minor"?"#1565C0":"#E65100"} labels={labels} />
    <div style={{background:"#fff",borderRadius:12,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:14,fontWeight:700,color:"#C62828"}}>{root} {type}: {chord.join(" – ")}</div>
      <div style={{fontSize:12,color:"#888",marginTop:4}}>
        {type==="major"?"Root + Major 3rd (4h) + Minor 3rd (3h) = bright, happy":
         type==="minor"?"Root + Minor 3rd (3h) + Major 3rd (4h) = dark, sad":
         type==="dim"?"Root + Minor 3rd (3h) + Minor 3rd (3h) = tense, unstable":
         "Root + Major 3rd (4h) + Major 3rd (4h) = dreamy, unresolved"}
      </div>
    </div>
    <Insight text="The difference between a happy chord and a sad chord is ONE half-step in the middle note. C major = C-E-G. C minor = C-Eb-G. Just the E drops to Eb." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 7: THE 7 CHORDS IN A KEY
// ═══════════════════════════════════════════════════════════════
