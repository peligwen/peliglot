import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide18(){return(<div>
  <DarkBox title="The inverse of exponentials"><div style={{fontSize:14}}>
    Exponential: 2<sup>?</sup> = 8. Answer: 3. Logarithm: log₂(8) = <strong style={{color:"#FFE77A"}}>3</strong>. A logarithm asks: "<strong style={{color:"#FFE77A"}}>How many times do I multiply?</strong>" Our senses work logarithmically — that's why decibels, Richter scale, and pH are all log scales.
  </div></DarkBox>
  <Card color="#2E7D32" title="Log scales in daily life">
    {[{name:"Decibels (sound)",desc:"Every +10 dB = 10× the sound intensity (energy hitting your ear) — but only ~2× louder to your brain (Stevens' psychoacoustic law). 30 dB (whisper) → 60 dB (conversation, 1,000× more energy) → 90 dB (lawnmower) → 120 dB (pain)",color:"#2E7D32"},
      {name:"Richter scale (earthquakes)",desc:"Every +1 = 10× stronger shaking, 31.6× more energy. A 7.0 is NOT 'a little worse' than 6.0 — it's 10× worse.",color:"#C62828"},
      {name:"pH (acidity)",desc:"Every -1 = 10× more acidic. pH 4 is 10× more acidic than pH 5, and 100× more acidic than pH 6.",color:"#1565C0"},
    ].map((s,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none",borderLeft:`4px solid ${s.color}`}}>
      <span style={{fontWeight:700,color:s.color}}>{s.name}</span><br/>
      <span style={{fontSize:12,color:"#555"}}>{s.desc}</span>
    </div>))}
  </Card>
  <Insight text="We use log scales because our senses perceive things logarithmically. A sound with 10× more intensity only FEELS about 2× louder — so raw energy measurements would be useless for describing human experience. Decibels map the physics to the perception." />
  <ExpandSection title="Logarithm laws — the algebra of logs" color="#2E7D32">
    <div style={{background:"#fff",borderRadius:10,border:"1px solid #e0dcd5",padding:"12px 14px"}}>
      <div style={{fontSize:11,color:"#555",marginBottom:10}}>All logs use base b (usually 10 or e). The laws work for any consistent base.</div>
      {[{law:"Product rule",formula:"log(a × b) = log a + log b",why:"Multiplying numbers = adding their exponents",ex:"log(1000 × 100) = log 1000 + log 100 = 3 + 2 = 5"},
        {law:"Quotient rule",formula:"log(a ÷ b) = log a − log b",why:"Dividing = subtracting exponents",ex:"log(10,000 ÷ 100) = 4 − 2 = 2 → answer: 100"},
        {law:"Power rule",formula:"log(aⁿ) = n × log a",why:"Exponentiation = multiplying the log",ex:"log(10⁷) = 7 × log 10 = 7 × 1 = 7. Used in compound-interest doubling time."},
        {law:"Change of base",formula:"log_b(x) = log(x) / log(b)",why:"Convert between bases using any calculator",ex:"log₂(64) = log(64)/log(2) = 1.806/0.301 ≈ 6 ✓"},
      ].map((r,i)=>(<div key={i} style={{marginBottom:i<3?10:0,paddingBottom:i<3?10:0,borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
        <div style={{fontWeight:700,fontSize:12,color:"#2E7D32"}}>{r.law}</div>
        <div style={{fontFamily:"monospace",fontSize:13,fontWeight:800,color:"#333",margin:"2px 0 2px 8px"}}>{r.formula}</div>
        <div style={{fontSize:11,color:"#888",marginLeft:8}}>{r.why}</div>
        <div style={{fontSize:10,color:"#aaa",marginLeft:8,fontStyle:"italic"}}>{r.ex}</div>
      </div>))}
    </div>
  </ExpandSection>
</div>);}
