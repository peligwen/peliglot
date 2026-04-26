import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { playChord, playSequence } from '../../../utils/audio';
import { Insight, Fretboard, playBtnStyle } from './_helpers';

// Drop-2 voicings on strings 5-4-3-2. Verified positions:
// String 5 (A2): open=A, each fret = +1 semitone
// String 4 (D3): open=D, each fret = +1 semitone
// String 3 (G3): open=G, each fret = +1 semitone
// String 2 (B3): open=B, each fret = +1 semitone
// Dm7 drop-2 (D-F-A-C): D@s5f5, A@s4f7, C@s3f5, F@s2f6
// G7 drop-2  (D-G-B-F): D@s5f5, G@s4f5, B@s3f4, F@s2f6 — smoothest voice-leading from Dm7
// Cmaj7 drop-2 (E-G-C-B): E@s5f7, G@s4f5, C@s3f5, B@s2f12? No — use s2f12 or pick:
//   close: E@s5f7, G@s4f5, C@s3f5, E@s2f5, but we need B. Use B@s2f0(open) or rearrange.
//   Best Cmaj7: E@s5f7, B@s4f9, C@s3f5, E@s2f5 (not pure drop-2 but has all tones including M7)
//   OR: Cmaj7 root inversion drop-2: drop G from (C3 E3 G3 B3) → G2 C3 E3 B3
//   Actually simplest with M7 in range: C@s5f3, G@s4f5, B@s3f4, E@s2f5
// Fmaj7 drop-2 (F-A-C-E): F@s5f8, A@s4f7, C@s3f5, E@s2f5

export function Guide1(){
  const [pair,setPair]=useState(0);
  const pairs=[
    // Dm7 → G7: D stays (root→5th), A→G (−2, 5th→root), C→B (−1, b7→3rd), F stays (b3→b7).
    // Verified: s5f5=(9+5)%12=2=D, s4f7=(2+7)%12=9=A, s3f5=(7+5)%12=0=C, s2f6=(11+6)%12=5=F ✓
    // G7:      s5f5=D, s4f5=(2+5)=7=G, s3f4=(7+4)=11=B, s2f6=F ✓
    {from:"Dm7",to:"G7",fromSF:4,toSF:3,
      fromNotes:[{string:5,fret:5,label:"D"},{string:4,fret:7,label:"A"},{string:3,fret:5,label:"C"},{string:2,fret:6,label:"F"}],
      toNotes:  [{string:5,fret:5,label:"D"},{string:4,fret:5,label:"G"},{string:3,fret:4,label:"B"},{string:2,fret:6,label:"F"}],
      motion:"The D (Dm7 root) stays as the 5th of G7. A drops a whole step to G (root). C drops a half step to B (3rd). F stays as the 7th of G7.",
      fromAudio:["D3","A3","C4","F4"],toAudio:["D3","G3","B3","F4"]},
    // G7 → Cmaj7: D→C (−2), G stays, B stays (3rd→M7 of Cmaj7!), F→E (−1, the key resolution).
    // Verified: Cmaj7 s5f3=(9+3)%12=0=C, s4f5=G, s3f4=B, s2f5=(11+5)%12=4=E ✓
    {from:"G7",to:"Cmaj7",fromSF:3,toSF:2,
      fromNotes:[{string:5,fret:5,label:"D"},{string:4,fret:5,label:"G"},{string:3,fret:4,label:"B"},{string:2,fret:6,label:"F"}],
      toNotes:  [{string:5,fret:3,label:"C"},{string:4,fret:5,label:"G"},{string:3,fret:4,label:"B"},{string:2,fret:5,label:"E"}],
      motion:"F (G7's b7) resolves down a half step to E (3rd of Cmaj7) — the essential guide-tone motion. D moves down to C (root). G stays as 5th. B stays — was the 3rd of G7, becomes the major 7th of Cmaj7.",
      fromAudio:["D3","G3","B3","F4"],toAudio:["C3","G3","B3","E4"]},
    // Cmaj7 → Fmaj7: C→F (+5, bass), G→A (+2), B→C (+1), E stays as M7 of Fmaj7.
    // Verified: Fmaj7 s5f8=(9+8)%12=5=F, s4f7=(2+7)=9=A, s3f5=(7+5)=0=C, s2f5=E ✓
    {from:"Cmaj7",to:"Fmaj7",fromSF:2,toSF:4,
      fromNotes:[{string:5,fret:3,label:"C"},{string:4,fret:5,label:"G"},{string:3,fret:4,label:"B"},{string:2,fret:5,label:"E"}],
      toNotes:  [{string:5,fret:8,label:"F"},{string:4,fret:7,label:"A"},{string:3,fret:5,label:"C"},{string:2,fret:5,label:"E"}],
      motion:"C moves to F (cycle-of-4ths bass motion). G moves up a whole step to A (3rd). B moves up a half step to C (5th). E stays — was the 3rd of Cmaj7, becomes the major 7th of Fmaj7.",
      fromAudio:["C3","G3","B3","E4"],toAudio:["F3","A3","C4","E4"]},
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
        <Fretboard frets={5} startFret={p.fromSF} dots={p.fromNotes} highlightColor="#c4a87a"/>
      </div>
      <div style={{fontSize:24,color:"#555"}}>→</div>
      <div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:"#81C784"}}>{p.to}</div>
        <Fretboard frets={5} startFret={p.toSF} dots={p.toNotes} highlightColor="#81C784"/>
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
