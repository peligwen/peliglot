import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide23(){return(<div>
  <Card color="#880E4F" title="Konjunktiv II — the 'would' form">
    {[{form:"hätte",en:"would have",ex:"Wenn ich Zeit hätte... = If I had time..."},{form:"wäre",en:"would be",ex:"Das wäre schön. = That would be nice."},{form:"würde + inf.",en:"would + verb",ex:"Ich würde kommen. = I would come."}].map((f,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
      <span style={{fontSize:16,fontWeight:800,color:"#880E4F"}}>{f.form}</span> <span style={{color:"#888"}}>({f.en})</span><br/>
      <span style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{f.ex}</span>
    </div>))}
  </Card>
  <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
    <div style={{fontSize:13,fontWeight:700,color:"#880E4F",marginBottom:6}}>Polite requests — much softer than direct forms:</div>
    <div style={{fontSize:13,color:"#555",lineHeight:1.7}}>
      Könnten Sie mir helfen? = Could you help me?<br/>
      Ich hätte gern ein Bier. = I'd like a beer.<br/>
      Würden Sie bitte... = Would you please...
    </div>
  </div>
  <Insight text="Future tense (werden + infinitive) exists but is often replaced by present + time word: 'Ich komme morgen' = 'I'm coming tomorrow.' More natural in speech." />
</div>);}
