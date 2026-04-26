import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide26(){return(<div>
  <DarkBox title="Why polls get it wrong"><div style={{fontSize:14}}>
    A poll of 1,000 people can represent 300 million — IF the sample is <strong style={{color:"#FFE77A"}}>random and representative</strong>. When it's not, you get garbage results dressed up as data.
  </div></DarkBox>
  <Card color="#880E4F" title="Common biases">
    {[{bias:"Selection bias",desc:"Surveying people at a gym about exercise habits. The sample isn't representative of the general population.",color:"#C62828"},
      {bias:"Survivorship bias",desc:"'Most successful people dropped out of college' — ignoring the millions of dropouts who aren't successful.",color:"#E65100"},
      {bias:"Confirmation bias",desc:"Looking for data that supports what you already believe and ignoring data that doesn't.",color:"#1565C0"},
      {bias:"Response bias",desc:"People answer surveys how they think they SHOULD, not what they actually do. 'Do you exercise regularly?' Everyone says yes.",color:"#6A1B9A"},
    ].map((b,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none",borderLeft:`4px solid ${b.color}`}}>
      <span style={{fontWeight:700,color:b.color}}>{b.bias}</span><br/>
      <span style={{fontSize:12,color:"#555"}}>{b.desc}</span>
    </div>))}
  </Card>
  <Insight text="When you see a statistic, ask: WHO was sampled? HOW MANY? HOW were they selected? WHO paid for the study? These four questions catch most bad data." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 27-30: MONEY MATH (interactive calculators)
// ═══════════════════════════════════════════════════════════════
