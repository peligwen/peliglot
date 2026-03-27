import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide12(){return(<div>
  <DarkBox title="Color filters over harmony"><div style={{fontSize:14}}>
    Instead of thinking "what scale fits this chord?", think "<strong style={{color:"#c4a87a"}}>which pentatonic gives me the color I want?</strong>" Pentatonics are 5-note filters that automatically select specific extensions.
  </div></DarkBox>
  <Card color="#6A1B9A" title="Pentatonic superimposition chart">
    {[{over:"Cmaj7",pent:"D major pent (D-E-F#-A-B)",sound:"Gives you 9-3-#11-13-7 — Lydian flavor",color:"#c4a87a"},
      {over:"Dm7",pent:"F major pent (F-G-A-C-D)",sound:"Gives you b3-4(11)-5-b7-R — pure Dorian",color:"#81C784"},
      {over:"G7",pent:"Ab minor pent (Ab-Cb-Db-Eb-Gb)",sound:"Gives you b9-3-b5(#11)-b13-R — altered dominant",color:"#EF9A9A"},
      {over:"G7",pent:"Bb major pent (Bb-C-D-F-G)",sound:"Gives you b3(#9)-4(11)-5-b7-R — Mixolydian/blues",color:"#90CAF9"},
      {over:"Cm7",pent:"Eb major pent (Eb-F-G-Bb-C)",sound:"Gives you b3-4(11)-5-b7-R — minor pentatonic from b3",color:"#CE93D8"},
    ].map((p,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #333":"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:700,color:"#ccc"}}>Over <strong style={{color:p.color}}>{p.over}</strong></span>
        <span style={{fontSize:11,color:p.color}}>play {p.pent.split("(")[0]}</span>
      </div>
      <div style={{fontSize:11,color:"#888",marginTop:2}}>{p.sound}</div>
    </div>))}
  </Card>
  <Insight text="The beauty of pentatonic superimposition: pentatonics fall naturally under the fingers and sound melodic by default. You get complex extensions without thinking about theory — the shape does the work." />
</div>);}
