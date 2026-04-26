import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide23(){return(<div>
  <DarkBox title="Every graph tells a story — but some graphs lie"><div style={{fontSize:14}}>
    The same data can look dramatically different depending on <strong style={{color:"#FFE77A"}}>axis scales</strong>, <strong style={{color:"#FFE77A"}}>time ranges</strong>, and <strong style={{color:"#FFE77A"}}>chart types</strong>. Always check the axes before believing a graph.
  </div></DarkBox>
  <Card color="#2E7D32" title="How graphs mislead">
    {[{trick:"Truncated Y-axis",desc:"Starting the Y-axis at 95 instead of 0 makes a tiny change (95→97) look dramatic. Always check where the axis starts.",color:"#C62828"},
      {trick:"Cherry-picked time range",desc:"A stock that's 'up 20% this week' might be down 40% this year. The time window changes the story completely.",color:"#E65100"},
      {trick:"Misleading 3D/perspective",desc:"3D pie charts distort sizes — the front slices look bigger. 3D bar charts hide actual values.",color:"#6A1B9A"},
      {trick:"Dual axes",desc:"Two different Y-axes can make any two things look correlated by adjusting the scales independently.",color:"#1565C0"},
    ].map((t,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none",borderLeft:`4px solid ${t.color}`}}>
      <span style={{fontWeight:700,color:t.color}}>{t.trick}</span><br/>
      <span style={{fontSize:12,color:"#555"}}>{t.desc}</span>
    </div>))}
  </Card>
</div>);}
