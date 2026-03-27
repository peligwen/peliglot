import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide5(){return(<div>
  <DarkBox title="It's a language agreement, not a math law"><div style={{fontSize:14}}>
    PEMDAS isn't "true" the way 2+2=4 is true. It's a <strong style={{color:"#FFE77A"}}>convention</strong> — a shared agreement on how to read math notation, like grammar rules for a language.
  </div></DarkBox>
  <Card color="#6A1B9A" title="PEMDAS / BODMAS" subtitle="The reading order">
    {[{step:"P / B",name:"Parentheses / Brackets",desc:"Do what's inside ( ) first",ex:"(3 + 2) × 4 = 5 × 4 = 20",color:"#C62828"},
      {step:"E / O",name:"Exponents / Orders",desc:"Powers and roots",ex:"3² + 1 = 9 + 1 = 10",color:"#E65100"},
      {step:"M & D",name:"Multiply & Divide",desc:"Left to right (equal priority)",ex:"12 ÷ 3 × 2 = 4 × 2 = 8",color:"#1565C0"},
      {step:"A & S",name:"Add & Subtract",desc:"Left to right (equal priority)",ex:"10 - 3 + 2 = 7 + 2 = 9",color:"#2E7D32"},
    ].map((s,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none",borderLeft:`4px solid ${s.color}`}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
        <span style={{background:s.color,color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:14,fontWeight:800}}>{s.step}</span>
        <span style={{fontSize:13,fontWeight:700,color:"#333"}}>{s.name}</span>
      </div>
      <div style={{fontSize:12,color:"#555"}}>{s.desc}</div>
      <div style={{fontSize:12,color:"#888",fontFamily:"monospace",marginTop:2}}>{s.ex}</div>
    </div>))}
  </Card>
  <Insight text="The viral equation '6 ÷ 2(1+2) = ?' causes arguments because the notation is ambiguous, not because people are bad at math. In real math and programming, you'd add parentheses to make it clear." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 6-10: ALGEBRA
// ═══════════════════════════════════════════════════════════════
