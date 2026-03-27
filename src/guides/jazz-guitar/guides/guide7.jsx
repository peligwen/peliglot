import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide7(){return(<div>
  <DarkBox title="The added note that changes everything"><div style={{fontSize:14}}>
    Add one chromatic passing tone to a scale so that <strong style={{color:"#c4a87a"}}>chord tones land on downbeats</strong> when you play continuous eighth notes. This is the rhythmic engine of bebop — it creates forward momentum and harmonic clarity simultaneously.
  </div></DarkBox>
  <Card color="#C62828" title="The three bebop scales">
    {[{scale:"Dominant Bebop",formula:"1 2 3 4 5 6 b7 7",added:"Add natural 7 between b7 and root",use:"Over dominant 7th chords. THE essential bebop scale.",color:"#EF9A9A"},
      {scale:"Major Bebop",formula:"1 2 3 4 5 #5 6 7",added:"Add #5 between 5 and 6",use:"Over major 7th chords. Less common but essential for landing chord tones.",color:"#81C784"},
      {scale:"Minor Bebop (Dorian)",formula:"1 2 b3 3 4 5 6 b7",added:"Add natural 3 between b3 and 4",use:"Over minor 7th chords. The passing tone creates a major flavor that resolves immediately.",color:"#90CAF9"},
    ].map((s,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<2?"1px solid #333":"none"}}>
      <div style={{fontSize:14,fontWeight:700,color:s.color}}>{s.scale}</div>
      <div style={{fontSize:12,fontFamily:"monospace",color:"#888",marginTop:2}}>{s.formula}</div>
      <div style={{fontSize:11,color:"#666",marginTop:2}}>Added note: {s.added}</div>
      <div style={{fontSize:11,color:"#999",marginTop:2}}>{s.use}</div>
    </div>))}
  </Card>
  <Insight text="Start a descending dominant bebop scale from the root on a downbeat. The chord tones (R, b7, 5, 3) will ALL land on downbeats. This is the Charlie Parker principle — the scale is designed for rhythmic alignment." />
</div>);}
