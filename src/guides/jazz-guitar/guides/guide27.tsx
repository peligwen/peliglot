import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide27(){return(<div>
  <DarkBox title="The conversation metaphor"><div style={{fontSize:14}}>
    Comping behind a soloist is like being in a conversation. You <strong style={{color:"#c4a87a"}}>listen</strong> first, <strong style={{color:"#c4a87a"}}>respond</strong> to what you hear, and <strong style={{color:"#c4a87a"}}>support</strong> without talking over them. The best comping is reactive, not pre-planned.
  </div></DarkBox>
  <Card color="#212121" title="Comping principles">
    {[{rule:"Listen first",desc:"Hear what the soloist is doing rhythmically and dynamically before deciding what to play. Your first impulse should be to NOT play."},
      {rule:"Fill the gaps",desc:"If the soloist plays a flurry of notes, leave space. If they leave a hole, fill it — with a chord, a rhythmic figure, a melodic response."},
      {rule:"Match the energy",desc:"Quiet soloist = quiet comping. Building intensity = build with them. Don't drive the energy — follow it. The soloist leads."},
      {rule:"Suggest, don't dictate",desc:"You can hint at reharmonizations — play a tritone sub, suggest a rhythmic figure. But if the soloist doesn't pick it up, drop it. It's their solo."},
      {rule:"Lay out when needed",desc:"Sometimes the bass and drums provide all the accompaniment needed. Especially during bass solos or when the soloist signals 'just drums.' Not playing IS playing."},
    ].map((r,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:"#aaa"}}>{r.rule}</span><br/>
      <span style={{fontSize:12,color:"#888"}}>{r.desc}</span>
    </div>))}
  </Card>
</div>);}
