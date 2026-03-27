import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { playChord, playSequence } from '../../../utils/audio';
import { Insight, playBtnStyle } from './_helpers';

export function Guide18(){
  const iiVI_C = {dm7:["D3","A3","C4","F4"], g7:["D3","G3","B3","F4"], cmaj7:["E3","G3","C4","E4"]};
  const iiVI_F = {dm7:["G3","D4","F4","Bb4"], g7:["G3","C4","E4","Bb4"], cmaj7:["A3","C4","F4","A4"]};
  const iiVI_Bb = {dm7:["C4","G4","Bb4","Eb5"], g7:["C4","F4","A4","Eb5"], cmaj7:["D4","F4","Bb4","D5"]};
  const guideTones = [["F4","C5"],["F4","B4"],["E4","B4"]];
  return(<div>
  <DarkBox title="The single most important progression in jazz"><div style={{fontSize:14}}>
    <strong style={{color:"#c4a87a"}}>Dm7 → G7 → Cmaj7.</strong> Master this in all 12 keys and you can navigate 80% of the standard repertoire. Every device — voice leading, arpeggios, enclosures, chromaticism — should be practiced over ii-V-I first.
  </div></DarkBox>
  <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:12}}>
    <button onClick={()=>playSequence([iiVI_C.dm7, iiVI_C.g7, iiVI_C.cmaj7], 700)} style={playBtnStyle}>▶ ii-V-I in C</button>
    <button onClick={()=>playSequence([iiVI_F.dm7, iiVI_F.g7, iiVI_F.cmaj7], 700)} style={playBtnStyle}>▶ ii-V-I in F</button>
    <button onClick={()=>playSequence([iiVI_Bb.dm7, iiVI_Bb.g7, iiVI_Bb.cmaj7], 700)} style={playBtnStyle}>▶ ii-V-I in Bb</button>
  </div>
  <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:12}}>
    <button onClick={()=>playChord(iiVI_C.dm7)} style={playBtnStyle}>▶ Dm7</button>
    <button onClick={()=>playChord(iiVI_C.g7)} style={playBtnStyle}>▶ G7</button>
    <button onClick={()=>playChord(iiVI_C.cmaj7)} style={playBtnStyle}>▶ Cmaj7</button>
  </div>
  <Card color="#2E7D32" title="Approaches over major ii-V-I">
    {[{approach:"Guide tones",line:"F→F (Dm7) → F→B (G7) → E→B (Cmaj7)",desc:"3rds and 7ths moving by half step. The skeleton of voice-led harmony.",audio:guideTones},
      {approach:"Enclosure into 3rd of resolution",line:"Over G7: approach E (3rd of C) from F above and Eb below → land on E",desc:"THE most-used device. Target the 3rd of the I chord.",audio:null},
      {approach:"Scale-based with bebop note",line:"Dm7: D dorian → G7: G mixolydian bebop → Cmaj7: C major",desc:"Add the natural 7 (F#) to G mixolydian for downbeat alignment.",audio:null},
      {approach:"Arpeggio superimposition",line:"Dm7: Fmaj7 arp → G7: Bdim7 arp → Cmaj7: Em7 arp",desc:"Each arp outlines upper extensions of the underlying chord.",audio:[["F4","A4","C5","E5"],["B3","D4","F4","Ab4"],["E4","G4","B4","D5"]]},
      {approach:"Pentatonic approach",line:"Dm7: F major pent → G7: Ab minor pent → Cmaj7: D major pent",desc:"Pentatonics as color filters. The G7 pent creates altered tension.",audio:null},
    ].map((a,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #333":"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:700,color:"#81C784"}}>{a.approach}</span>
        {a.audio&&<button onClick={()=>playSequence(a.audio, 600)} style={playBtnStyle}>▶ Play</button>}
      </div>
      <div style={{fontSize:12,color:"#ccc",fontFamily:"monospace",margin:"4px 0"}}>{a.line}</div>
      <span style={{fontSize:11,color:"#888"}}>{a.desc}</span>
    </div>))}
  </Card>
  <Insight text="Practice these in all 12 keys. Use the cycle of 4ths: C, F, Bb, Eb, Ab, Db, Gb, B, E, A, D, G. If you can nail ii-V-I in all keys, you can play most standards." />
</div>);}
