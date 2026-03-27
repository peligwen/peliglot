import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide22(){return(<div>
  <DarkBox title="Tension, resolution & home"><div style={{fontSize:14}}>
    In any key, the <strong style={{color:"#FFE77A"}}>1st degree (tonic)</strong> is "home." The <strong style={{color:"#EF9A9A"}}>7th</strong> is one half-step below — maximum tension, desperately wants to resolve up to 1. Melody is the art of creating and releasing tension against this framework.
  </div></DarkBox>
  <Card color="#C62828" title="Scale degree feelings">
    {[{deg:"1 (Root)",feel:"Home. Resolution. Rest. Landing here = phrase feels complete.",color:"#2E7D32"},
      {deg:"2",feel:"Slight tension. Wants to step to 1 or 3. 'Passing through.'",color:"#1565C0"},
      {deg:"3",feel:"Defines major (happy) or minor (sad). The emotional core.",color:"#C62828"},
      {deg:"4",feel:"Gentle pull toward 3 or 5. Suspension, expectation.",color:"#1565C0"},
      {deg:"5",feel:"Stability, but not home. A resting point mid-phrase.",color:"#2E7D32"},
      {deg:"6",feel:"Warm in major, bittersweet. Can lean toward 5 or 7.",color:"#6A1B9A"},
      {deg:"7",feel:"Maximum tension. A half-step from home. NEEDS to resolve to 1.",color:"#C62828"},
    ].map((d,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<6?"1px solid #f0eeeb":"none",borderLeft:`4px solid ${d.color}`}}>
      <span style={{fontWeight:700,color:d.color}}>{d.deg}</span><br/>
      <span style={{fontSize:12,color:"#555"}}>{d.feel}</span>
    </div>))}
  </Card>
  <Insight text="Great melodies balance steps (moving to adjacent notes = smooth) with leaps (jumping intervals = dramatic). Too many steps = boring. Too many leaps = chaotic. The magic is in the mix." />
</div>);}
