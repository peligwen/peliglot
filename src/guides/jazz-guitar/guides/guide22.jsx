import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide22(){return(<div>
  <DarkBox title="Where the sound starts"><div style={{fontSize:14}}>
    Before the guitar, before the amp, before the mic — your <strong style={{color:"#c4a87a"}}>right hand</strong> determines 90% of your tone. Pick position, attack angle, and dynamics matter more than any gear.
  </div></DarkBox>
  <Card color="#37474F" title="Right hand approaches">
    {[{tech:"Pick (plectrum)",desc:"Heavier picks (1mm+) for warmth and control. Pick closer to the neck for jazz warmth, closer to the bridge for brightness. Angle matters — less 'scratch,' more 'press.'",who:"Joe Pass, Pat Metheny, Pat Martino"},
      {tech:"Thumb (Wes style)",desc:"Pure warm tone, natural dynamics. The flesh of the thumb creates a round attack. Harder to play fast but the tone is unmatched.",who:"Wes Montgomery, the defining jazz guitar sound"},
      {tech:"Fingerstyle",desc:"Classical technique adapted. Independence between voices. Essential for chord melody and solo guitar.",who:"Lenny Breau, Earl Klugh, Julian Lage (sometimes)"},
      {tech:"Hybrid (pick + fingers)",desc:"Pick for bass notes, fingers for upper voices. Best of both worlds for comping and chord melody simultaneously.",who:"Lenny Breau, Martin Taylor"},
    ].map((t,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #333":"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:700,color:"#B0BEC5"}}>{t.tech}</span>
        <span style={{fontSize:10,color:"#666"}}>{t.who}</span>
      </div>
      <span style={{fontSize:12,color:"#999"}}>{t.desc}</span>
    </div>))}
  </Card>
</div>);}
