import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Ref } from './_helpers';

export function Guide23(){return(<div>
  <DarkBox title="The jazz sound is about what you DON'T hear"><div style={{fontSize:14}}>
    No brightness. No gain. No effects (traditionally). The classic jazz guitar tone is a <strong style={{color:"#c4a87a"}}>hollow-body, tone knob rolled way off, clean amp, played near the neck</strong>. It's warm, round, and sits behind the horn or vocal — never on top.
  </div></DarkBox>
  <Card color="#455A64" title="The signal chain">
    {[{stage:"Guitar",details:"Tone knob at 3-5 (not 10). Neck pickup. Hollow-body (175, L-5, ES-335) or even solid body with neck humbucker (Telecaster neck pickup works)."},
      {stage:"Amp",details:"Clean headroom. No breakup. Tube amps at low volume or quality solid state. Polytone Mini-Brute, Fender Deluxe Reverb (clean), Henriksen. The amp should amplify your tone, not color it."},
      {stage:"EQ approach",details:"Cut highs, don't boost lows. The warmth comes from removing brightness, not adding bass. Presence low or off. A slightly 'dark' room sound."},
      {stage:"Volume as expression",details:"Your amp shouldn't be so loud that you can't control dynamics with your hands. If you dig in and it distorts, you're too loud. Jazz guitar is an intimate instrument."},
    ].map((s,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:"#B0BEC5"}}>{s.stage}</span><br/>
      <span style={{fontSize:12,color:"#999"}}>{s.details}</span>
    </div>))}
  </Card>
  <Ref name="Listen" text="Jim Hall — the definitive 'transparent' jazz guitar sound. Joe Pass through a Polytone. Compare with Grant Green's slightly brighter, more attack-forward tone." />
</div>);}
