import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide32(){return(<div>
  <DarkBox title="You already speak math — you just don't know it"><div style={{fontSize:14}}>
    Every one of these is math. You've been doing it your whole life. The only difference between 'math I do' and 'math class' is <strong style={{color:"#FFE77A"}}>notation</strong>.
  </div></DarkBox>
  <Card color="#2E7D32" title="Math you do without thinking">
    {[{task:"Doubling a recipe",math:"Ratios & multiplication. Double 1¾ cups = 3½ cups.",icon:"🍳"},
      {task:"Tipping 20%",math:"Percentages. Move decimal left (10%), double it (20%). $45 → $4.50 → $9.",icon:"💵"},
      {task:"Splitting a bill",math:"Division. $120 among 4 people = $30 each. Add tip: $30 × 1.2 = $36.",icon:"🧾"},
      {task:"Driving time",math:"Rate × time. 180 miles at 60 mph = 3 hours. Leave at 2 PM, arrive at 5 PM.",icon:"🚗"},
      {task:"Unit pricing",math:"Division & comparison. $4.99/16oz vs $6.49/24oz. Which is cheaper per ounce?",icon:"🛒"},
      {task:"Sale prices",math:"Percentages. 30% off $80 = $80 × 0.70 = $56. Or: 10% = $8, ×3 = $24 off → $56.",icon:"🏷"},
      {task:"Comparing phone plans",math:"Linear equations. $40/mo unlimited vs $20/mo + $0.10/text. When does unlimited win?",icon:"📱"},
      {task:"Mortgage shopping",math:"Compound interest. 6% vs 6.5% on $300K over 30 years = $70K+ difference.",icon:"🏠"},
    ].map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"8px 14px",borderBottom:i<7?"1px solid #f0eeeb":"none",gap:10}}>
      <span style={{fontSize:22}}>{t.icon}</span>
      <div style={{flex:1}}><span style={{fontWeight:700,color:"#2E7D32"}}>{t.task}</span><br/><span style={{fontSize:12,color:"#555"}}>{t.math}</span></div>
    </div>))}
  </Card>
  <Insight text="Math anxiety comes from notation and abstraction — not from the concepts. You already understand ratios (recipes), percentages (tips), rates (driving), and compound growth (savings). You speak math. The guide just gave you the vocabulary." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// COMPONENT ARRAY & MAIN APP
// ═══════════════════════════════════════════════════════════════

export const guideComponents=[Guide1,Guide2,Guide3,Guide4,Guide5,Guide6,Guide7,Guide8,Guide9,Guide10,Guide11,Guide12,Guide13,Guide14,Guide15,Guide16,Guide17,Guide18,Guide19,Guide20,Guide21,Guide22,Guide23,Guide24,Guide25,Guide26,Guide27,Guide28,Guide29,Guide30,Guide31,Guide32];
