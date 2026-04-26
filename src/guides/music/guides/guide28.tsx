import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide28(){return(<div>
  <DarkBox title="How many layers, and how they interact"><div style={{fontSize:14}}>
    <strong style={{color:"#FFE77A"}}>Texture</strong> = what happens when multiple parts play simultaneously. Adding and removing layers is one of the most effective arrangement tools.
  </div></DarkBox>
  <Card color="#2E7D32" title="Types of musical texture">
    {[{type:"Monophony",desc:"A single melodic line, unaccompanied. Gregorian chant, a solo voice, a whistle.",feel:"Exposed, pure, intimate."},
      {type:"Homophony",desc:"A melody with chord accompaniment. A singer with guitar. This is most popular music.",feel:"Clear focus, supportive."},
      {type:"Polyphony",desc:"Multiple independent melodic lines simultaneously. Fugues, vocal harmonies, counterpoint.",feel:"Rich, complex, woven."},
      {type:"Arrangement as texture",desc:"Thin in the verse (just voice + guitar). Full in the chorus (drums + bass + keys + backing vocals + strings). The contrast IS the arrangement.",feel:""},
    ].map((t,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:14,fontWeight:700,color:"#2E7D32"}}>{t.type}</div>
      <div style={{fontSize:12,color:"#555",marginTop:2}}>{t.desc}</div>
      {t.feel&&<div style={{fontSize:11,color:"#888",marginTop:2}}>{t.feel}</div>}
    </div>))}
  </Card>
  <Insight text="The most powerful moment in many songs is when everything drops out except the vocal. That silence IS the arrangement. Texture is as much about what you remove as what you add." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 29-30: CONTEXT
// ═══════════════════════════════════════════════════════════════
