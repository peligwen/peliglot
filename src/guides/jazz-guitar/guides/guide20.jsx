import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide20(){return(<div>
  <DarkBox title="Navigating rapid harmonic motion"><div style={{fontSize:14}}>
    Turnarounds and cycles are <strong style={{color:"#c4a87a"}}>multiple ii-V's chained together</strong>, often moving fast. The skill is connecting them smoothly — each chord barely gets a beat or two before the next arrives.
  </div></DarkBox>
  <Card color="#33691E" title="Essential turnaround types">
    {[{name:"Standard turnaround (I-vi-ii-V)",prog:"Cmaj7 → Am7 → Dm7 → G7",desc:"The default last 2 bars of a 32-bar standard. Returns you to the top.",color:"#81C784"},
      {name:"Tritone sub turnaround",prog:"Cmaj7 → Eb7 → Ab7 → Db7",desc:"Replace each V7 with its tritone sub. Creates chromatic bass line: C→Eb→Ab→Db. Very smooth.",color:"#c4a87a"},
      {name:"Coltrane changes (giant steps)",prog:"Cmaj7 → Eb7 → Abmaj7 → B7 → Emaj7 → G7 → Cmaj7",desc:"Major thirds cycle. Moves through 3 tonal centers separated by major 3rds. The ultimate harmonic obstacle course.",color:"#EF9A9A"},
      {name:"Rhythm changes bridge",prog:"D7 → G7 → C7 → F7",desc:"Dominant 7ths descending in 4ths, each lasting 2 bars. The bridge of 'I Got Rhythm' and hundreds of contrafacts.",color:"#90CAF9"},
    ].map((t,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #333":"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:700,color:t.color}}>{t.name}</span>
      </div>
      <div style={{fontSize:13,color:"#ccc",fontFamily:"monospace",margin:"4px 0"}}>{t.prog}</div>
      <span style={{fontSize:11,color:"#888"}}>{t.desc}</span>
    </div>))}
  </Card>
</div>);}
