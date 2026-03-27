import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide21(){return(<div>
  <DarkBox title="Changing key mid-song"><div style={{fontSize:14}}>
    <strong style={{color:"#FFE77A"}}>Modulation</strong> = moving to a different key. It creates a sense of lift, surprise, or emotional shift. Every key has its own "color" — modulating changes that color.
  </div></DarkBox>
  <Card color="#880E4F" title="Common modulation techniques">
    {[{name:"Up a half-step (truck driver's modulation)",desc:"The final chorus goes up a half-step for extra energy. The cheapest trick in pop — but it works.",ex:"Beyoncé 'Love on Top', Bon Jovi 'Livin' on a Prayer'"},
      {name:"To the relative minor/major",desc:"Shift between parallel emotional worlds. C major ↔ A minor. Same notes, different home.",ex:"Verse in minor, chorus in relative major — very common."},
      {name:"Pivot chord modulation",desc:"A chord that exists in BOTH keys serves as a bridge. Smooth and sophisticated.",ex:"Am is vi in C major and ii in G major — pivot through it."},
      {name:"Direct modulation",desc:"Just jump. No preparation. Shocking but effective when intentional.",ex:"Abrupt key change between song sections."},
    ].map((m,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:14,fontWeight:700,color:"#880E4F"}}>{m.name}</div>
      <div style={{fontSize:12,color:"#555",marginTop:2}}>{m.desc}</div>
      <div style={{fontSize:11,color:"#888",marginTop:2,fontStyle:"italic"}}>{m.ex}</div>
    </div>))}
  </Card>
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 22-25: MELODY
// ═══════════════════════════════════════════════════════════════
