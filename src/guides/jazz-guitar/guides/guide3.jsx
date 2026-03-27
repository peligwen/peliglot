import { DarkBox } from '../../../components/DarkBox';
import { playChord } from '../../../utils/audio';
import { Insight, Ref, Fretboard, playBtnStyle } from './_helpers';

export function Guide3(){
  const shells=[
    {name:"Cmaj7",root:6,dots:[{string:6,fret:8,label:"R"},{string:4,fret:9,label:"7"},{string:3,fret:9,label:"3"}],sf:7,note:"Root on 6th string. 5th omitted — bass has it.",audio:["C3","B3","E4"]},
    {name:"Dm7",root:5,dots:[{string:5,fret:5,label:"R"},{string:3,fret:5,label:"b7"},{string:2,fret:6,label:"b3"}],sf:4,note:"Root on 5th string. Three notes, full chord identity.",audio:["D3","C4","F4"]},
    {name:"G7",root:6,dots:[{string:6,fret:3,label:"R"},{string:4,fret:3,label:"b7"},{string:3,fret:4,label:"3"}],sf:2,note:"Dominant 7th shell. The b7 and 3 form a tritone — maximum tension.",audio:["G2","F3","B3"]},
    {name:"Cm7",root:6,dots:[{string:6,fret:8,label:"R"},{string:4,fret:8,label:"b7"},{string:3,fret:8,label:"b3"}],sf:7,note:"Minor shell. All three notes on the same fret — easy shape.",audio:["C3","Bb3","Eb4"]},
  ];
  return(<div>
    <DarkBox title="Root, 3rd, 7th — that's the whole chord"><div style={{fontSize:14}}>
      Shell voicings are the <strong style={{color:"#c4a87a"}}>minimum viable chord</strong>. The 5th is redundant (the bass covers it). The root grounds the harmony. The 3rd tells you major/minor. The 7th tells you the chord type. Three notes. Done.
    </div></DarkBox>
    {shells.map((s,i)=>(<div key={i} style={{background:"#1e1e1e",borderRadius:12,padding:"10px 14px",border:"1px solid #333",marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{fontSize:16,fontWeight:800,color:"#c4a87a"}}>{s.name}</span>
        <span style={{fontSize:11,color:"#666"}}>root on string {s.root}</span>
      </div>
      <Fretboard frets={4} startFret={s.sf} dots={s.dots} highlightColor="#c4a87a"/>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><div style={{fontSize:11,color:"#888",flex:1}}>{s.note}</div><button onClick={()=>playChord(s.audio)} style={playBtnStyle}>▶ Play</button></div>
    </div>))}
    <Insight text="In a band with bass, piano, and drums, playing big voicings muddies everything. Shell voicings let you comp clearly without stepping on anyone. Freddie Green took this further — sometimes just root + 3rd." />
    <Ref name="Listen" text="Freddie Green with Count Basie — the ultimate in shell voicing economy. Joe Pass solo guitar for the opposite: full voicings when you ARE the whole band." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 4-6: TENSIONS, QUARTAL, SUBSTITUTION
// ═══════════════════════════════════════════════════════════════
