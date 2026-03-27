import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide15(){return(<div>
  <DarkBox title="Every point has an address"><div style={{fontSize:14}}>
    The <strong style={{color:"#FFE77A"}}>coordinate plane</strong> is a map where every location has an (x, y) address. X = horizontal position. Y = vertical. (3, 5) means "go right 3, up 5." It's how GPS, game graphics, and data visualization work.
  </div></DarkBox>
  <Card color="#6A1B9A" title="Key concepts">
    {[{concept:"Slope = steepness = rise/run",desc:"How much y changes per unit of x. Slope of 2 means 'up 2 for every 1 to the right.' Negative slope = downhill."},
      {concept:"Distance = Pythagorean theorem",desc:"Distance between (1,2) and (4,6) = √((4-1)²+(6-2)²) = √(9+16) = √25 = 5. Same formula as the triangle diagonal."},
      {concept:"Midpoint = average the coordinates",desc:"Midpoint of (2,4) and (8,10) = ((2+8)/2, (4+10)/2) = (5, 7). Just average the x's and average the y's."},
    ].map((c,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:13,fontWeight:700,color:"#6A1B9A"}}>{c.concept}</div>
      <div style={{fontSize:12,color:"#555",marginTop:2}}>{c.desc}</div>
    </div>))}
  </Card>
  <Insight text="Slope is everywhere: a road grade of 6% means 6 ft of rise per 100 ft of run (slope = 0.06). A roof pitch of 4/12 means 4 inches up per 12 inches across (slope = 0.33)." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 16-20: GROWTH & PROBABILITY
// ═══════════════════════════════════════════════════════════════
