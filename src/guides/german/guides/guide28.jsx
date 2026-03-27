import { Card } from '../../../components/Card';

export function Guide28(){
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      <Card color="#C62828" title="nicht" subtitle="Negates verbs/adj/adv">
        <div style={{padding:"10px 14px",fontSize:13,color:"#555",lineHeight:1.6}}>
          Ich komme <strong style={{color:"#C62828"}}>nicht</strong>.<br/>
          Das ist <strong style={{color:"#C62828"}}>nicht</strong> gut.<br/>
          Er arbeitet <strong style={{color:"#C62828"}}>nicht</strong> gern.<br/>
          <span style={{fontSize:11,color:"#888"}}>Goes before what it negates, or at the end for the whole idea.</span>
        </div>
      </Card>
      <Card color="#1565C0" title="kein" subtitle="Negates nouns (replaces ein)">
        <div style={{padding:"10px 14px",fontSize:13,color:"#555",lineHeight:1.6}}>
          Ich habe <strong style={{color:"#1565C0"}}>kein</strong> Geld.<br/>
          Das ist <strong style={{color:"#1565C0"}}>keine</strong> gute Idee.<br/>
          Er hat <strong style={{color:"#1565C0"}}>keinen</strong> Hund.<br/>
          <span style={{fontSize:11,color:"#888"}}>NOT 'nicht ein' — always use kein. Declines like ein.</span>
        </div>
      </Card>
    </div>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#2E7D32",marginBottom:6}}>Questions — just move the verb:</div>
      <div style={{fontSize:13,color:"#555",lineHeight:1.7}}>
        <strong>Yes/No:</strong> Kommst du morgen? · Hast du das Buch gelesen?<br/>
        <strong>W-questions:</strong> Wo wohnst du? · Was machst du? · Wann kommst du?<br/>
        <span style={{fontSize:11,color:"#888"}}>No auxiliary needed (unlike English 'do you'!)</span>
      </div>
    </div>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 29-33: PRACTICAL
// ═══════════════════════════════════════════════════════════════
