import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide33(){return(<div>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
    <Card color="#1a1a1a" title="Formal email">
      <div style={{padding:"10px 14px",fontSize:12,color:"#555",lineHeight:1.6}}>
        <strong>Sehr geehrte Frau Müller,</strong><br/>
        <span style={{color:"#888"}}>(Dear Ms. Müller,)</span><br/><br/>
        ...body...<br/><br/>
        <strong>Mit freundlichen Grüßen</strong><br/>
        <span style={{color:"#888"}}>(Yours sincerely)</span>
      </div>
    </Card>
    <Card color="#2E7D32" title="Informal email">
      <div style={{padding:"10px 14px",fontSize:12,color:"#555",lineHeight:1.6}}>
        <strong>Liebe Anna, / Lieber Tom,</strong><br/>
        <span style={{color:"#888"}}>(Dear Anna/Tom,)</span><br/><br/>
        Hi! / Hallo! / Hey!<br/><br/>
        <strong>Liebe Grüße / LG</strong><br/>
        <span style={{color:"#888"}}>(Warm regards)</span>
      </div>
    </Card>
  </div>
  <DarkBox title="German directness is not rudeness"><div style={{fontSize:13,lineHeight:1.6,textAlign:"left"}}>
    • Germans say <strong style={{color:"#FFE77A"}}>'Nein'</strong> without softening it<br/>
    • <strong style={{color:"#FFE77A"}}>'Das stimmt nicht'</strong> (That's not correct) is normal, not aggressive<br/>
    • Fewer 'please' and 'sorry' than English — it's <strong style={{color:"#FFE77A"}}>efficiency, not hostility</strong><br/>
    • Direct feedback = they trust you to handle it
  </div></DarkBox>
  <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
    <div style={{fontSize:12,fontWeight:700,color:"#1a1a1a",marginBottom:8}}>Same request — two cultures:</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <div style={{background:"#F3F8FF",borderRadius:8,padding:"8px 12px"}}>
        <div style={{fontSize:10,fontWeight:700,color:"#1565C0",marginBottom:4,textTransform:"uppercase"}}>American English</div>
        <div style={{fontSize:12,color:"#555",fontStyle:"italic"}}>"Could I maybe possibly get a coffee, if it's not too much trouble?"</div>
      </div>
      <div style={{background:"#F5FFF5",borderRadius:8,padding:"8px 12px"}}>
        <div style={{fontSize:10,fontWeight:700,color:"#2E7D32",marginBottom:4,textTransform:"uppercase"}}>German equivalent (equally polite)</div>
        <div style={{fontSize:13,color:"#333",fontWeight:700}}>"Einen Kaffee, bitte."</div>
      </div>
    </div>
    <div style={{fontSize:11,color:"#888",marginTop:8}}>The German phrase is not rude — it's the normal, polite way to order. No hedging needed; the context handles it.</div>
  </div>
</div>);}