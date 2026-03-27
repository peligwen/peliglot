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
</div>);}

// ═══════════════════════════════════════════════════════════════
// COMPONENT ARRAY & MAIN APP
// ═══════════════════════════════════════════════════════════════

export const guideComponents=[Guide1,Guide2,Guide3,Guide4,Guide5,Guide6,Guide7,Guide8,Guide9,Guide10,Guide11,Guide12,Guide13,Guide14,Guide15,Guide16,Guide17,Guide18,Guide19,Guide20,Guide21,Guide22,Guide23,Guide24,Guide25,Guide26,Guide27,Guide28,Guide29,Guide30,Guide31,Guide32,Guide33];
