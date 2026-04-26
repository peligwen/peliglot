import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide17(){return(<div>
  <Card color="#2E7D32" title="Reflexive pronouns" subtitle="Accusative and dative forms">
    <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}><div></div><div>Akkusativ</div><div>Dativ</div></div>
    {[{p:"ich",a:"mich",d:"mir"},{p:"du",a:"dich",d:"dir"},{p:"er/sie/es",a:"sich",d:"sich"},{p:"wir",a:"uns",d:"uns"},{p:"ihr",a:"euch",d:"euch"},{p:"sie/Sie",a:"sich",d:"sich"}].map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr",padding:"5px 14px",borderBottom:i<5?"1px solid #f0eeeb":"none",fontSize:13}}>
      <span style={{color:"#888",fontSize:11}}>{r.p}</span>
      <span style={{fontWeight:700,color:"#C62828"}}>{r.a}</span>
      <span style={{fontWeight:700,color:"#E65100"}}>{r.d}</span>
    </div>))}
  </Card>
  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
    {["sich freuen (be happy)","sich erinnern (remember)","sich fühlen (feel)","sich setzen (sit down)","sich vorstellen (introduce/imagine)"].map(v=>(<span key={v} style={{padding:"4px 10px",borderRadius:8,background:"#E8F5E9",color:"#2E7D32",fontSize:12,fontWeight:600,border:"1px solid #C8E6C9"}}>{v}</span>))}
  </div>
  <Insight text="Possessives (mein, dein, sein, ihr, unser, euer, Ihr) decline like ein-words. Same endings as ein/eine/ein across all cases." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 18-25: VERBS
// ═══════════════════════════════════════════════════════════════
