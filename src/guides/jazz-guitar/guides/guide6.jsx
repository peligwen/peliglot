import { DarkBox } from '../../../components/DarkBox';

export function Guide6(){
  const subs=[
    {name:"Tritone substitution",rule:"Replace V7 with bII7",ex:"G7 → Db7 (same tritone: B-F = Cb-F). Both resolve to C.",how:"The 3rd and 7th swap roles. Db7's 3rd (F) = G7's 7th. Db7's 7th (Cb/B) = G7's 3rd.",color:"#c4a87a"},
    {name:"Diminished substitution",rule:"Any dim7 = 3 other dim7 chords",ex:"Cdim7 = Ebdim7 = Gbdim7 = Adim7 (same notes, different spellings).",how:"Symmetrical chord — every note is equidistant. Move it up minor 3rds and you get the same chord.",color:"#EF9A9A"},
    {name:"Diatonic substitution",rule:"Replace a chord with one sharing 2+ tones",ex:"iii for I (Em7 for Cmaj7), vi for IV (Am7 for Fmaj7).",how:"Em7 contains E-G-B-D — three of those (E, G, B) are in Cmaj7. The substitution adds the 9th (D).",color:"#81C784"},
    {name:"Chromatic approach",rule:"Approach target chord from a half step above or below",ex:"Before Dm7, play Ebm7 or C#m7 for a beat.",how:"Pure voice-leading tension. Every voice resolves by a half step. Creates forward motion.",color:"#90CAF9"},
  ];
  return(<div>
    <DarkBox title="The reharmonization toolkit"><div style={{fontSize:14}}>These are the tools for making a lead sheet <strong style={{color:"#c4a87a"}}>yours</strong>. Every substitution preserves the harmonic function while changing the color.</div></DarkBox>
    {subs.map((s,i)=>(<div key={i} style={{background:"#1e1e1e",borderRadius:12,padding:"12px 14px",border:"1px solid #333",marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{background:s.color+"30",color:s.color,padding:"2px 10px",borderRadius:4,fontSize:12,fontWeight:800}}>{s.name}</span>
        <span style={{fontSize:11,color:"#666"}}>{s.rule}</span>
      </div>
      <div style={{fontSize:13,color:"#ccc",marginBottom:4}}>{s.ex}</div>
      <div style={{fontSize:11,color:"#888"}}>{s.how}</div>
    </div>))}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 7-13: MELODY
// ═══════════════════════════════════════════════════════════════
