import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { playChord } from '../../../utils/audio';
import { Insight, Fretboard, playBtnStyle } from './_helpers';

export function Guide2(){
  const [type,setType]=useState("drop2");
  const [chordType,setChordType]=useState(0);
  const chords=[
    {name:"Cmaj7",drop2:[
      {inv:"Root",dots:[{string:5,fret:3,label:"C"},{string:4,fret:4,label:"G"},{string:3,fret:4,label:"B"},{string:2,fret:5,label:"E"}],sf:2,audio:["C3","G3","B3","E4"]},
      {inv:"1st",dots:[{string:5,fret:7,label:"E"},{string:4,fret:7,label:"B"},{string:3,fret:9,label:"E"},{string:2,fret:8,label:"G"}],sf:6,audio:["E3","B3","E4","G4"]},
    ],drop3:[
      {inv:"Root",dots:[{string:6,fret:8,label:"C"},{string:4,fret:9,label:"B"},{string:3,fret:9,label:"E"},{string:2,fret:8,label:"G"}],sf:7,audio:["C3","B3","E4","G4"]},
    ]},
    {name:"Dm7",drop2:[
      {inv:"Root",dots:[{string:5,fret:5,label:"D"},{string:4,fret:5,label:"A"},{string:3,fret:5,label:"C"},{string:2,fret:6,label:"F"}],sf:4,audio:["D3","A3","C4","F4"]},
    ],drop3:[
      {inv:"Root",dots:[{string:6,fret:10,label:"D"},{string:4,fret:10,label:"C"},{string:3,fret:10,label:"F"},{string:2,fret:10,label:"A"}],sf:9,audio:["D3","C4","F4","A4"]},
    ]},
    {name:"G7",drop2:[
      {inv:"Root",dots:[{string:5,fret:10,label:"G"},{string:4,fret:9,label:"D"},{string:3,fret:10,label:"F"},{string:2,fret:10,label:"B"}],sf:8,audio:["G3","D4","F4","B4"]},
    ],drop3:[
      {inv:"Root",dots:[{string:6,fret:3,label:"G"},{string:4,fret:3,label:"F"},{string:3,fret:4,label:"B"},{string:2,fret:3,label:"D"}],sf:2,audio:["G2","F3","B3","D4"]},
    ]},
  ];
  const ch=chords[chordType];
  const voicings=type==="drop2"?ch.drop2:ch.drop3;
  return(<div>
    <DarkBox title="The bread and butter of jazz guitar comping"><div style={{fontSize:14}}>
      <strong style={{color:"#c4a87a"}}>Drop 2</strong>: take the second-highest voice of a close voicing and drop it an octave. <strong style={{color:"#c4a87a"}}>Drop 3</strong>: drop the third-highest. These sit naturally on the guitar where close voicings don't.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:8,justifyContent:"center"}}>
      {[{k:"drop2",l:"Drop 2"},{k:"drop3",l:"Drop 3"}].map(t=>(<button key={t.k} onClick={()=>setType(t.k)} style={{padding:"6px 16px",borderRadius:8,border:type===t.k?"2px solid #c4a87a":"1.5px solid #444",background:type===t.k?"#3a3025":"#1e1e1e",color:type===t.k?"#c4a87a":"#888",cursor:"pointer",fontWeight:700,fontSize:13}}>{t.l}</button>))}
    </div>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center"}}>
      {chords.map((c,i)=>(<button key={i} onClick={()=>setChordType(i)} style={{padding:"5px 14px",borderRadius:8,border:chordType===i?"2px solid #81C784":"1.5px solid #444",background:chordType===i?"#1B5E20":"#1e1e1e",color:chordType===i?"#81C784":"#888",cursor:"pointer",fontWeight:700}}>{c.name}</button>))}
    </div>
    {voicings.map((v,i)=>(<div key={i}><Fretboard frets={5} startFret={v.sf} dots={v.dots} highlightColor={type==="drop2"?"#c4a87a":"#81C784"} title={`${ch.name} ${type} — ${v.inv} inversion`}/>{v.audio&&<div style={{textAlign:"center",marginBottom:12}}><button onClick={()=>playChord(v.audio)} style={playBtnStyle}>▶ Play {ch.name} {v.inv}</button></div>}</div>))}
    <Insight text="Master Drop 2 voicings on the middle four strings (5-4-3-2 and 4-3-2-1) first. These cover 90% of comping situations. Drop 3 adds bass-register depth for solo guitar or duo settings." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 3: SHELL VOICINGS
// ═══════════════════════════════════════════════════════════════
