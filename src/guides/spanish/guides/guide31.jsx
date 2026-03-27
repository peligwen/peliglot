import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

const daily=[
  {v:"despertarse",m:"to wake up",ex:"Me despierto a las 7."},
  {v:"levantarse",m:"to get up",ex:"Se levanta temprano."},
  {v:"ducharse",m:"to shower",ex:"Nos duchamos por la mañana."},
  {v:"vestirse",m:"to get dressed",ex:"Me visto rápido."},
  {v:"acostarse",m:"to go to bed",ex:"Se acuestan tarde."},
  {v:"dormirse",m:"to fall asleep",ex:"Me duermo en 5 minutos."},
];

const meaningChange=[
  {base:"ir",m1:"to go",refl:"irse",m2:"to leave/go away",ex:"¡Me voy! = I'm leaving!"},
  {base:"dormir",m1:"to sleep",refl:"dormirse",m2:"to fall asleep",ex:"Se durmió en clase."},
  {base:"poner",m1:"to put",refl:"ponerse",m2:"to put on / become",ex:"Se puso la chaqueta. / Se puso triste."},
  {base:"llevar",m1:"to carry",refl:"llevarse",m2:"to take away / get along",ex:"Nos llevamos bien."},
  {base:"parecer",m1:"to seem",refl:"parecerse",m2:"to resemble",ex:"Se parece a su madre."},
];

const pronouns=["me","te","se","nos","os","se"];

export function Guide31(){
  const [tab,setTab]=useState("daily");
  return(<div>
    <DarkBox title="Reflexive Verbs"><div style={{fontSize:13,lineHeight:1.7}}>
      The subject does the action <strong>to itself</strong>. Reflexive pronouns match the subject:<br/>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:6}}>
        {["yo→me","tú→te","él/ella→se","nosotros→nos","vosotros→os","ellos→se"].map(p=>(<span key={p} style={{background:"#E8EAF6",padding:"3px 8px",borderRadius:8,fontSize:11,fontWeight:700,color:"#283593"}}>{p}</span>))}
      </div>
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"daily",label:"Daily Routine"},{id:"change",label:"Meaning Changes"},{id:"recip",label:"Reciprocal"}].map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 14px",borderRadius:8,border:tab===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:tab===t.id?"#283593":"#fff",color:tab===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {tab==="daily"&&<div>
      {daily.map(d=>(<div key={d.v} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:14,fontWeight:700,color:"#283593"}}>{d.v}</div><div style={{fontSize:11,color:"#999"}}>{d.m}</div></div>
        <div style={{fontSize:12,fontWeight:600,color:"#555",fontStyle:"italic",textAlign:"right",maxWidth:"55%"}}>{d.ex}</div>
      </div>))}
    </div>}
    {tab==="change"&&<Card color="#C62828" title="Verbs That Change Meaning with SE">
      {meaningChange.map(mc=>(<div key={mc.base} style={{marginBottom:10,paddingBottom:10,borderBottom:"1px solid #f0f0f0"}}>
        <div style={{display:"flex",gap:12,marginBottom:4}}>
          <span style={{fontSize:13,fontWeight:700,color:"#555"}}>{mc.base} <span style={{fontWeight:400,fontSize:11}}>({mc.m1})</span></span>
          <span style={{fontSize:13,fontWeight:700,color:"#C62828"}}>{mc.refl} <span style={{fontWeight:400,fontSize:11}}>({mc.m2})</span></span>
        </div>
        <div style={{fontSize:12,color:"#666",fontStyle:"italic"}}>{mc.ex}</div>
      </div>))}
    </Card>}
    {tab==="recip"&&<div>
      <div style={{background:"#E8F5E9",borderRadius:12,padding:"14px 16px",marginBottom:12,border:"1.5px solid #C8E6C9"}}>
        <div style={{fontSize:13,fontWeight:700,color:"#2E7D32",marginBottom:8}}>Reciprocal = "each other" (plural only)</div>
        {["Se hablan todos los días. (They talk to each other every day.)","Nos escribimos cartas. (We write letters to each other.)","Se quieren mucho. (They love each other a lot.)"].map(ex=>(<div key={ex} style={{fontSize:13,color:"#1a1a1a",marginBottom:4,fontStyle:"italic"}}>{ex}</div>))}
      </div>
      <Insight text="Context tells you reflexive vs reciprocal: 'Se miran' = They look at themselves OR They look at each other. Add 'el uno al otro' to clarify: Se miran el uno al otro."/>
    </div>}
  </div>);
}
