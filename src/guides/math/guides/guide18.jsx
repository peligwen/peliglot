import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide18(){return(<div>
  <DarkBox title="The inverse of exponentials"><div style={{fontSize:14}}>
    Exponential: 2<sup>?</sup> = 8. Answer: 3. Logarithm: log₂(8) = <strong style={{color:"#FFE77A"}}>3</strong>. A logarithm asks: "<strong style={{color:"#FFE77A"}}>How many times do I multiply?</strong>" Our senses work logarithmically — that's why decibels, Richter scale, and pH are all log scales.
  </div></DarkBox>
  <Card color="#2E7D32" title="Log scales in daily life">
    {[{name:"Decibels (sound)",desc:"Every +10 dB = 10× louder. 30 dB (whisper) → 60 dB (conversation) → 90 dB (lawnmower) → 120 dB (pain)",color:"#2E7D32"},
      {name:"Richter scale (earthquakes)",desc:"Every +1 = 10× stronger shaking, 31.6× more energy. A 7.0 is NOT 'a little worse' than 6.0 — it's 10× worse.",color:"#C62828"},
      {name:"pH (acidity)",desc:"Every -1 = 10× more acidic. pH 4 is 10× more acidic than pH 5, and 100× more acidic than pH 6.",color:"#1565C0"},
    ].map((s,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none",borderLeft:`4px solid ${s.color}`}}>
      <span style={{fontWeight:700,color:s.color}}>{s.name}</span><br/>
      <span style={{fontSize:12,color:"#555"}}>{s.desc}</span>
    </div>))}
  </Card>
  <Insight text="We use log scales because our senses perceive things logarithmically. A sound 10× louder only FEELS about 2× louder. That's why we need decibels instead of raw energy measurements." />
</div>);}
