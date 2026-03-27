import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

const caseData={
  nom:{name:"Nominativ",role:"Subject — who does it",der:"der",die:"die",das:"das",diePl:"die",ein:"ein",eine:"eine",einN:"ein",color:"#1565C0"},
  akk:{name:"Akkusativ",role:"Direct object — whom/what",der:"den",die:"die",das:"das",diePl:"die",ein:"einen",eine:"eine",einN:"ein",color:"#C62828"},
  dat:{name:"Dativ",role:"Indirect object — to/for whom",der:"dem",die:"der",das:"dem",diePl:"den (+n)",ein:"einem",eine:"einer",einN:"einem",color:"#E65100"},
  gen:{name:"Genitiv",role:"Possession — whose",der:"des (+s)",die:"der",das:"des (+s)",diePl:"der",ein:"eines (+s)",eine:"einer",einN:"eines (+s)",color:"#00695C"},
};

export function Guide5(){
  const [activeCase,setActiveCase]=useState("nom");
  const c=caseData[activeCase];
  return(<div>
    <DarkBox title="Why cases exist"><div style={{fontSize:14,lineHeight:1.6}}>
      Cases tell you <strong style={{color:"#FFE77A"}}>what role each noun plays</strong>. English uses word order. German uses <strong style={{color:"#FFE77A"}}>article changes</strong> — which means word order is much more flexible.
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:16}}>
      {Object.entries(caseData).map(([k,v])=>(<button key={k} onClick={()=>setActiveCase(k)} style={{padding:"10px 4px",borderRadius:10,border:activeCase===k?`2.5px solid ${v.color}`:"1.5px solid #ddd",background:activeCase===k?v.color:"#fff",color:activeCase===k?"#fff":"#555",cursor:"pointer",textAlign:"center"}}>
        <div style={{fontSize:13,fontWeight:800}}>{v.name}</div>
        <div style={{fontSize:9,opacity:.7,marginTop:2}}>{v.role.split(" — ")[0]}</div>
      </button>))}
    </div>
    <Card color={c.color} title={c.name} subtitle={c.role}>
      <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div></div><div>Masc</div><div>Fem</div><div>Neut</div><div>Plural</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr 1fr",padding:"8px 14px",borderBottom:"1px solid #f0eeeb"}}>
        <span style={{fontSize:11,color:"#888"}}>definite</span>
        <span style={{fontWeight:700,color:c.color}}>{c.der}</span>
        <span style={{fontWeight:700,color:c.color}}>{c.die}</span>
        <span style={{fontWeight:700,color:c.color}}>{c.das}</span>
        <span style={{fontWeight:700,color:c.color}}>{c.diePl}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr 1fr",padding:"8px 14px"}}>
        <span style={{fontSize:11,color:"#888"}}>indefinite</span>
        <span style={{fontWeight:700,color:c.color}}>{c.ein}</span>
        <span style={{fontWeight:700,color:c.color}}>{c.eine}</span>
        <span style={{fontWeight:700,color:c.color}}>{c.einN}</span>
        <span style={{fontWeight:700,color:"#aaa"}}>—</span>
      </div>
    </Card>
    <Insight text="English has case remnants too: I/me/my, he/him/his, who/whom/whose. German just applies this to EVERY noun through article changes." />
  </div>);
}
