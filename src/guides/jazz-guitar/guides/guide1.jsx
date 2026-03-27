import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { playChord, playSequence } from '../../../utils/audio';
import { Insight, Fretboard, playBtnStyle } from './_helpers';

export function Guide1(){
  const [pair,setPair]=useState(0);
  const pairs=[
    {from:"Dm7",to:"G7",fromNotes:[{string:4,fret:5,label:"D"},{string:3,fret:5,label:"A"},{string:2,fret:5,label:"C"},{string:1,fret:5,label:"F"}],toNotes:[{string:4,fret:5,label:"D"},{string:3,fret:4,label:"G"},{string:2,fret:4,label:"B"},{string:1,fret:5,label:"F"}],motion:"Root stays, 5th drops to root, 7th drops to 3rd, 3rd stays as 7th",fromAudio:["D4","A4","C5","F5"],toAudio:["D4","G4","B4","F5"]},
    {from:"G7",to:"Cmaj7",fromNotes:[{string:4,fret:5,label:"D"},{string:3,fret:4,label:"G"},{string:2,fret:4,label:"B"},{string:1,fret:5,label:"F"}],toNotes:[{string:4,fret:5,label:"E"},{string:3,fret:5,label:"G"},{string:2,fret:5,label:"C"},{string:1,fret:4,label:"E"}],motion:"Each voice moves by a half step or stays. The 7th (F) resolves down to E.",fromAudio:["D4","G4","B4","F5"],toAudio:["E4","G4","C5","E5"]},
    {from:"Cmaj7",to:"Fmaj7",fromNotes:[{string:4,fret:5,label:"E"},{string:3,fret:5,label:"G"},{string:2,fret:5,label:"C"},{string:1,fret:4,label:"E"}],toNotes:[{string:4,fret:5,label:"E"},{string:3,fret:5,label:"A"},{string:2,fret:5,label:"C"},{string:1,fret:5,label:"F"}],motion:"E stays, G moves to A, C stays, E moves to F. Maximum common tones.",fromAudio:["E4","G4","C5","E5"],toAudio:["E4","A4","C5","F5"]},
  ];
  const p=pairs[pair];
  return(<div>
    <DarkBox title="Minimum motion, maximum harmony"><div style={{fontSize:14,lineHeight:1.6}}>
      Jazz guitar comping isn't about grabbing chord shapes — it's about <strong style={{color:"#c4a87a"}}>moving individual voices smoothly</strong> from one chord to the next. The 3rd and 7th are your <strong style={{color:"#c4a87a"}}>guide tones</strong> — they define the chord quality and create the melody of the harmony.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center"}}>
      {pairs.map((pp,i)=>(<button key={i} onClick={()=>setPair(i)} style={{padding:"6px 14px",borderRadius:8,border:pair===i?"2px solid #c4a87a":"1.5px solid #444",background:pair===i?"#3a3025":"#1e1e1e",color:pair===i?"#c4a87a":"#888",cursor:"pointer",fontWeight:700,fontSize:13}}>{pp.from} → {pp.to}</button>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"center",marginBottom:12}}>
      <div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:"#c4a87a"}}>{p.from}</div>
        <Fretboard frets={4} startFret={3} dots={p.fromNotes} highlightColor="#c4a87a"/>
      </div>
      <div style={{fontSize:24,color:"#555"}}>→</div>
      <div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:"#81C784"}}>{p.to}</div>
        <Fretboard frets={4} startFret={3} dots={p.toNotes} highlightColor="#81C784"/>
      </div>
    </div>
    <div style={{background:"#1e1e1e",borderRadius:10,padding:"10px 14px",border:"1px solid #333",marginBottom:12,fontSize:12,color:"#aaa"}}>{p.motion}</div>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:12}}>
      <button onClick={()=>playChord(p.fromAudio)} style={playBtnStyle}>▶ {p.from}</button>
      <button onClick={()=>playChord(p.toAudio)} style={playBtnStyle}>▶ {p.to}</button>
      <button onClick={()=>playSequence([p.fromAudio, p.toAudio], 600)} style={playBtnStyle}>▶ Play {p.from} → {p.to}</button>
    </div>
    <Insight text="The guide tone line (3rds and 7ths moving through a progression) IS a melody. Practice playing just the guide tones through a standard — that's the harmonic skeleton everything else hangs on." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 2: DROP 2 & DROP 3
// ═══════════════════════════════════════════════════════════════
