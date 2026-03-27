import { useState } from 'react';
import { Card } from '../../../components/Card';

const verbConj={machen:{stem:"mach",forms:["mache","machst","macht","machen","macht","machen"]},fahren:{stem:"fahr/fähr",forms:["fahre","fährst","fährt","fahren","fahrt","fahren"]},sprechen:{stem:"sprech/sprich",forms:["spreche","sprichst","spricht","sprechen","sprecht","sprechen"]}};

const prons6=["ich","du","er/sie/es","wir","ihr","sie/Sie"];

export function Guide18(){
  const [verb,setVerb]=useState("machen");
  const v=verbConj[verb]; const colors={machen:"#1565C0",fahren:"#C62828",sprechen:"#2E7D32"};const col=colors[verb];
  return(<div>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {Object.keys(verbConj).map(k=>(<button key={k} onClick={()=>setVerb(k)} style={{padding:"8px 18px",borderRadius:10,border:verb===k?`2.5px solid ${col}`:"1.5px solid #ddd",background:verb===k?col:"#fff",color:verb===k?"#fff":"#666",cursor:"pointer",fontWeight:800,fontSize:15}}>{k}</button>))}
    </div>
    <Card color={col} title={verb} subtitle={verb==="machen"?"regular":verb==="fahren"?"a→ä stem change":"e→i stem change"}>
      <div style={{display:"grid",gridTemplateColumns:"90px 50px 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}><div></div><div>Ending</div><div>Conjugated</div></div>
      {prons6.map((p,i)=>{const endings=["-e","-st","-t","-en","-t","-en"];const changed=verb!=="machen"&&(i===1||i===2);return(
        <div key={i} style={{display:"grid",gridTemplateColumns:"90px 50px 1fr",padding:"6px 14px",borderBottom:i<5?"1px solid #f0eeeb":"none",alignItems:"center",background:changed?`${col}08`:"transparent"}}>
          <span style={{fontSize:12,color:"#888"}}>{p}</span>
          <span style={{fontSize:12,color:col,fontWeight:700}}>{endings[i]}</span>
          <span style={{fontSize:16,fontWeight:700,color:changed?col:"#333"}}>{v.forms[i]}</span>
        </div>
      );})}
    </Card>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:"#555",marginBottom:6}}>Key irregulars: sein, haben, werden</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,fontSize:12}}>
        {[{v:"sein",f:"bin, bist, ist, sind, seid, sind"},{v:"haben",f:"habe, hast, hat, haben, habt, haben"},{v:"werden",f:"werde, wirst, wird, werden, werdet, werden"}].map(x=>(<div key={x.v} style={{padding:"6px 8px",borderRadius:6,background:"#f5f3ef"}}>
          <strong style={{color:"#C62828"}}>{x.v}</strong><br/><span style={{fontSize:10,color:"#888"}}>{x.f}</span>
        </div>))}
      </div>
    </div>
  </div>);
}
