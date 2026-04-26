import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide28(){return(<div>
  <DarkBox title="Knowing where you are in 32 bars"><div style={{fontSize:14}}>
    Getting lost in the form is the #1 fear on the bandstand. The cure: <strong style={{color:"#c4a87a"}}>hear the melody</strong> internally while you solo. The melody IS the form — if you can sing "All the Things You Are" in your head, you always know where the bridge is.
  </div></DarkBox>
  <Card color="#424242" title="Form navigation strategies">
    {[{strategy:"Sing the melody internally",desc:"While improvising, hear the original melody in your head. This keeps you locked to the form without conscious counting. The most reliable method."},
      {strategy:"Landmark chords",desc:"Know the 'signpost' chords: the first chord of each section, the turnaround, the bridge entry. Even if you drift, these landmarks bring you back."},
      {strategy:"Count in 4-bar or 8-bar phrases",desc:"Don't count individual bars — feel in 4-bar and 8-bar groups. A section 'feels' 8 bars long. The bridge 'feels' like a departure and return."},
      {strategy:"Watch the bass player's hands",desc:"The bass player is your safety net. If you're lost, watch their hand position — the root movement tells you where you are in the form."},
      {strategy:"Practice soloing over one chorus forms",desc:"Before tackling multi-chorus solos, practice just playing through the form once with purpose. Build stamina and confidence from there."},
    ].map((s,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:"#aaa"}}>{s.strategy}</span><br/>
      <span style={{fontSize:12,color:"#888"}}>{s.desc}</span>
    </div>))}
  </Card>
  <Insight text="Record yourself soloing over a standard. Can you always hear where the bridge is? If you get lost, that's your homework — sing the melody 100 times until it's unconscious." />
</div>);}
