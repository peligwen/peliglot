import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';

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
  <Insight text="Future tense (werden + infinitive) is often replaced by present + time word: 'Ich komme morgen' = 'I'm coming tomorrow.' More natural in speech. Note: werden + infinitive also expresses probability — 'Er wird zu Hause sein' = 'He's probably home' — this modal-inference use is actually more common in spoken German than the pure future." />
  <ExpandSection title="Strong-verb Konjunktiv II forms (käme, ginge, …)" color="#880E4F">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #e0dcd5",marginBottom:8}}>
      <div style={{fontSize:12,fontWeight:700,color:"#880E4F",marginBottom:8}}>Strong verbs form K-II from the Präteritum stem + umlaut + endings:</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
        {[{inf:"kommen",prat:"kam",kii:"käme"},{inf:"gehen",prat:"ging",kii:"ginge"},{inf:"fahren",prat:"fuhr",kii:"führe"},{inf:"lesen",prat:"las",kii:"läse"},{inf:"schreiben",prat:"schrieb",kii:"schriebe"},{inf:"nehmen",prat:"nahm",kii:"nähme"}].map((v,i)=>(<div key={i} style={{padding:"6px 8px",borderRadius:6,background:"#f5f3ef",fontSize:12}}>
          <div style={{fontWeight:700,color:"#880E4F"}}>{v.kii}</div>
          <div style={{fontSize:10,color:"#888"}}>{v.inf} (Prät: {v.prat})</div>
        </div>))}
      </div>
      <div style={{fontSize:11,color:"#888",marginTop:8}}>In formal writing, prefer <em>käme</em> over <em>würde kommen</em> — the synthetic form is more elegant and expected in literary/written registers.</div>
    </div>
  </ExpandSection>
  <ExpandSection title="Konjunktiv I — Indirekte Rede (Indirect Speech)" color="#5C1A6B">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #e0dcd5",marginBottom:8}}>
      <div style={{fontSize:12,fontWeight:700,color:"#5C1A6B",marginBottom:6}}>Used in journalism and formal reporting to quote without endorsing:</div>
      <div style={{fontSize:13,color:"#555",lineHeight:1.7,marginBottom:10}}>
        <em>Der Minister sagte, er <strong style={{color:"#5C1A6B"}}>sei</strong> bereit.</em><br/>
        <span style={{fontSize:11,color:"#888"}}>= The minister said he was ready. (K-I signals: "his words, not mine.")</span>
      </div>
      <div style={{fontSize:12,fontWeight:700,color:"#5C1A6B",marginBottom:6}}>Key K-I forms (3rd-person singular):</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5,marginBottom:10}}>
        {[{inf:"sein",ki:"sei (!)"},  {inf:"haben",ki:"habe"},{inf:"kommen",ki:"komme"},{inf:"sagen",ki:"sage"},{inf:"gehen",ki:"gehe"},{inf:"werden",ki:"werde"},{inf:"können",ki:"könne"},{inf:"müssen",ki:"müsse"}].map((v,i)=>(<div key={i} style={{padding:"5px 7px",borderRadius:6,background:v.inf==="sein"?"#EDE7F6":"#f5f3ef",fontSize:12}}>
          <div style={{fontWeight:700,color:"#5C1A6B"}}>{v.ki}</div>
          <div style={{fontSize:10,color:"#888"}}>{v.inf}</div>
        </div>))}
      </div>
      <div style={{fontSize:12,color:"#555",lineHeight:1.6,marginBottom:8}}>
        <strong style={{color:"#5C1A6B"}}>sei vs. ist:</strong> <em>sei</em> = K-I (reported speech, neutral) · <em>ist</em> = indicative (speaker states as fact).<br/>
        When K-I looks identical to the indicative (1st/3rd plural: <em>sie kommen</em>), German falls back to K-II: <em>sie kämen</em>.
      </div>
      <div style={{background:"#EDE7F6",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#555"}}>
        <strong style={{color:"#5C1A6B"}}>Journalistic register hedge:</strong><br/>
        Direct: <em>Er ist krank.</em> (I'm telling you this.)<br/>
        Reported: <em>Er <strong style={{color:"#5C1A6B"}}>sei</strong> krank.</em> (He says so / sources say so.)<br/>
        <span style={{fontSize:11,color:"#888"}}>You'll see K-I constantly in German newspapers, news broadcasts, and official summaries.</span>
      </div>
    </div>
  </ExpandSection>
</div>);}
