import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide30(){return(<div>
  <DarkBox title="Should I take the deal?"><div style={{fontSize:14}}>
    <strong style={{color:"#FFE77A"}}>Expected value</strong> = (probability of winning × amount won) – (probability of losing × amount lost). If EV is positive, the deal favors you over time. If negative, walk away.
  </div></DarkBox>
  <Card color="#E65100" title="Expected value in practice">
    {[{scenario:"Lottery ticket ($2, 1 in 300M chance of $500M)",ev:"-$0.33",verdict:"Negative EV. You lose ~$0.33 per ticket on average. Entertainment, not investment.",color:"#C62828"},
      {scenario:"Insurance ($1200/year, 1% chance of $50K claim)",ev:"-$700",verdict:"Negative EV for you, positive for the insurer. You're paying for peace of mind.",color:"#E65100"},
      {scenario:"Coin flip: win $150 heads, lose $100 tails",ev:"+$25",verdict:"Positive EV! Take this bet every time. Over many flips, you profit $25 on average.",color:"#2E7D32"},
    ].map((s,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:13,color:"#333"}}>{s.scenario}</div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
        <span style={{fontWeight:800,color:s.color,fontSize:16}}>EV: {s.ev}</span>
        <span style={{fontSize:11,color:"#888"}}>{s.verdict}</span>
      </div>
    </div>))}
  </Card>
  <Insight text="Casinos have a positive expected value on every game — that's their business model. The 'house edge' is the gap between true odds and the payout. Over millions of bets, the math always wins." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 31-32: MATH IN THE WILD
// ═══════════════════════════════════════════════════════════════
