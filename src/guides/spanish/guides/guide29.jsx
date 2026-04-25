import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { MiniTable } from './_helpers';

const verbs=[
  {v:"hablar",stem:"habla",meaning:"to speak"},
  {v:"comer",stem:"comie",meaning:"to eat"},
  {v:"tener",stem:"tuvie",meaning:"to have"},
  {v:"poder",stem:"pudie",meaning:"to be able"},
  {v:"ir/ser",stem:"fue",meaning:"to go / to be"},
];
const endings=["ra","ras","ra","ramos","rais","ran"];

const siClauses=[
  {type:"Possible (present/future)",si:"Si + present indicative",result:"present or future",ex:"Si llueve, me quedo en casa. / Si llueve, me quedaré en casa.",color:"#2E7D32"},
  {type:"Unlikely (hypothetical)",si:"Si + past subjunctive",result:"conditional",ex:"Si tuviera dinero, viajaría a España.",color:"#E65100"},
  {type:"Impossible (past)",si:"Si + pluperfect subjunctive",result:"conditional perfect",ex:"Si hubiera estudiado, habría aprobado.",color:"#C62828"},
];

export function Guide29(){
  const [verb,setVerb]=useState(0);const v=verbs[verb];
  return(<div>
    <DarkBox title="Past Subjunctive"><div style={{fontSize:13,lineHeight:1.7}}>
      Formation: <strong>3rd person plural preterite</strong> → drop <em>-ron</em> → add <strong>-ra</strong> endings<br/>
      hablaron → habla- → hablara · tuvieron → tuvie- → tuviera
    </div></DarkBox>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:14}}>
      {verbs.map((vb,i)=>(<button key={vb.v} onClick={()=>setVerb(i)} style={{padding:"6px 14px",borderRadius:8,border:verb===i?"2px solid #1a1a1a":"1.5px solid #ddd",background:verb===i?"#4527A0":"#fff",color:verb===i?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{vb.v}</button>))}
    </div>
    <MiniTable title={v.v} color="#4527A0" stem={v.stem} endings={endings}/>
    <Card color="#1a1a1a" title="Si Clauses — Three Patterns">
      {siClauses.map(c=>(<div key={c.type} style={{background:`${c.color}08`,borderRadius:10,padding:"10px 14px",marginBottom:8,borderLeft:`4px solid ${c.color}`}}>
        <div style={{fontSize:12,fontWeight:800,color:c.color,marginBottom:4}}>{c.type}</div>
        <div style={{fontSize:11,color:"#555",marginBottom:6}}>{c.si} → {c.result}</div>
        <div style={{fontSize:13,fontWeight:600,color:"#1a1a1a",fontStyle:"italic"}}>"{c.ex}"</div>
      </div>))}
    </Card>
    <Insight text="The -se form (hablase, tuviese) is equally correct and common in Spain. In Latin America, -ra is strongly preferred."/>
    <div style={{background:"#E8F5E9",borderRadius:12,padding:"14px 16px",marginTop:8,border:"1.5px solid #C8E6C9"}}>
      <div style={{fontSize:13,fontWeight:800,color:"#2E7D32",marginBottom:8}}>Contrary-to-fact advice: "Si yo fuera tú…"</div>
      <div style={{fontSize:12,color:"#555",lineHeight:1.7,marginBottom:8}}>
        The most common use of the unlikely si-clause is giving advice. The formula is: <strong>Si yo fuera tú, + conditional.</strong>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,fontSize:12}}>
        <div style={{background:"#fff",borderRadius:8,padding:"8px 10px",border:"1px solid #C8E6C9"}}>
          <div style={{fontWeight:700,color:"#2E7D32",marginBottom:2}}>Si yo fuera tú,</div>
          <div style={{fontStyle:"italic",color:"#1a1a1a"}}>no lo haría.</div>
          <div style={{color:"#888",fontSize:11}}>If I were you, I wouldn't do it.</div>
        </div>
        <div style={{background:"#fff",borderRadius:8,padding:"8px 10px",border:"1px solid #C8E6C9"}}>
          <div style={{fontWeight:700,color:"#2E7D32",marginBottom:2}}>Si tuviera más tiempo,</div>
          <div style={{fontStyle:"italic",color:"#1a1a1a"}}>estudiaría más.</div>
          <div style={{color:"#888",fontSize:11}}>If I had more time, I'd study more.</div>
        </div>
      </div>
    </div>
  </div>);
}
