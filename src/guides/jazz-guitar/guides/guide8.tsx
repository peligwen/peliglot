import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide8(){return(<div>
  <DarkBox title="Through the changes, not over them"><div style={{fontSize:14}}>
    Arpeggios are the <strong style={{color:"#c4a87a"}}>skeleton of jazz melody</strong>. Target chord tones on strong beats, connect them with scale tones and chromatic passing tones. The hierarchy: R and 5th = "safe." 3rd and 7th = "colorful." Extensions = "spice."
  </div></DarkBox>
  <Card color="#D84315" title="Arpeggio superimposition">
    {[{over:"Cmaj7",play:"Em7 arpeggio (E-G-B-D)",result:"Gives you 3-5-7-9 of Cmaj7. Instant major 9 sound.",color:"#EF9A9A"},
      {over:"Dm7",play:"Fmaj7 arpeggio (F-A-C-E)",result:"Gives you b3-5-b7-9 of Dm7. Bright minor sound.",color:"#81C784"},
      {over:"G7",play:"Bdim7 arpeggio (B-D-F-Ab)",result:"Gives you 3-5-b7-b9 of G7. Dominant tension.",color:"#90CAF9"},
      {over:"G7alt",play:"Abm(maj7) arpeggio",result:"Gives you b9-3-b13-7 — the altered sound.",color:"#CE93D8"},
    ].map((a,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #333":"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:700,color:"#ccc"}}>Over <strong style={{color:a.color}}>{a.over}</strong></span>
        <span style={{fontSize:12,color:a.color}}>play {a.play}</span>
      </div>
      <div style={{fontSize:11,color:"#888",marginTop:2}}>{a.result}</div>
    </div>))}
  </Card>
  <Insight text="Practice arpeggios in all inversions across the neck, not just from the root. Being able to start an arpeggio from the 3rd, 5th, or 7th gives you melodic flexibility." />
</div>);}
