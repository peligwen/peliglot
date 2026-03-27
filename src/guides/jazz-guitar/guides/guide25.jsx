import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide25(){return(<div>
  <DarkBox title="Capturing the sound in the room"><div style={{fontSize:14}}>
    Recording jazz guitar is about capturing <strong style={{color:"#c4a87a"}}>warmth, presence, and dynamics</strong>. Mic placement changes EVERYTHING — inches matter. The room is an instrument.
  </div></DarkBox>
  <Card color="#607D8B" title="Recording approaches">
    {[{approach:"Mic on the amp (standard)",details:"Dynamic mic (SM57) or ribbon (Royer 121) 1-6 inches from the speaker cone. Off-center = warmer. On-center = brighter. Ribbon adds natural warmth."},
      {approach:"Mic on the body (acoustic/hollow-body)",details:"Condenser mic (AKG 414, Neumann U87) 8-12 inches from where the neck meets the body. Captures the 'air' of a hollow-body. Watch for feedback at higher volumes."},
      {approach:"DI + mic blend",details:"DI for attack and definition, mic for warmth and room. Blend to taste. The DI catches what the mic misses (and vice versa). Phase-check both signals."},
      {approach:"Room as instrument",details:"In a good room, a second mic placed 3-6 feet back captures natural reverb that no plugin can replicate. Blend with the close mic for depth."},
      {approach:"Phase and hollow-body issues",details:"Hollow-bodies can have phase cancellation between the top and back vibrating. If the recorded sound is thin, try moving the mic or the guitar slightly."},
    ].map((a,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:"#B0BEC5"}}>{a.approach}</span><br/>
      <span style={{fontSize:12,color:"#999"}}>{a.details}</span>
    </div>))}
  </Card>
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 26-30: NAVIGATION
// ═══════════════════════════════════════════════════════════════
