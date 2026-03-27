import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

const irregTu=[
  {v:"decir",cmd:"di",neg:"no digas"},
  {v:"hacer",cmd:"haz",neg:"no hagas"},
  {v:"ir",cmd:"ve",neg:"no vayas"},
  {v:"poner",cmd:"pon",neg:"no pongas"},
  {v:"salir",cmd:"sal",neg:"no salgas"},
  {v:"ser",cmd:"sé",neg:"no seas"},
  {v:"tener",cmd:"ten",neg:"no tengas"},
  {v:"venir",cmd:"ven",neg:"no vengas"},
];

const modes=[
  {id:"tu",label:"Tú (+)",desc:"Drop the -s from present tú form",ex:["hablas → ¡habla!","comes → ¡come!","escribe → ¡escribe!"],color:"#2E7D32"},
  {id:"neg",label:"Tú (−)",desc:"No + present subjunctive tú form",ex:["¡no hables!","¡no comas!","¡no escribas!"],color:"#C62828"},
  {id:"ud",label:"Usted",desc:"Present subjunctive él/ella form",ex:["¡hable!","¡coma!","¡escriba!"],color:"#0D47A1"},
  {id:"nos",label:"Nosotros",desc:"Present subjunctive nosotros form (= Let's...)",ex:["¡hablemos!","¡comamos!","¡vamos! (ir)"],color:"#6A1B9A"},
];

export function Guide30(){
  const [mode,setMode]=useState("tu");const m=modes.find(x=>x.id===mode);
  return(<div>
    <DarkBox title="Commands (Imperativo)"><div style={{fontSize:13,lineHeight:1.7}}>
      Affirmative tú = unique form. <strong>Everything else</strong> uses the subjunctive.<br/>
      Negative commands <em>always</em> use subjunctive, even for tú.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {modes.map(md=>(<button key={md.id} onClick={()=>setMode(md.id)} style={{padding:"7px 14px",borderRadius:8,border:mode===md.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:mode===md.id?md.color:"#fff",color:mode===md.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{md.label}</button>))}
    </div>
    <div style={{background:`${m.color}08`,borderRadius:12,padding:"14px 16px",marginBottom:14,border:`1.5px solid ${m.color}30`}}>
      <div style={{fontSize:12,fontWeight:700,color:m.color,marginBottom:8}}>{m.desc}</div>
      {m.ex.map(e=>(<div key={e} style={{fontSize:14,fontWeight:600,color:"#1a1a1a",marginBottom:4}}>{e}</div>))}
    </div>
    <Card color="#E65100" title="8 Irregular Tú Commands">
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6}}>
        {irregTu.map(i=>(<div key={i.v} style={{background:"#fff",borderRadius:8,padding:"8px 12px",border:"1px solid #eee"}}>
          <div style={{fontSize:11,color:"#999"}}>{i.v}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
            <span style={{fontSize:15,fontWeight:800,color:"#2E7D32"}}>¡{i.cmd}!</span>
            <span style={{fontSize:11,fontWeight:600,color:"#C62828"}}>{i.neg}</span>
          </div>
        </div>))}
      </div>
    </Card>
    <Insight text="Pronouns ATTACH to affirmative commands (¡dime!) but go BEFORE negative commands (¡no me digas!). Add accent marks to keep stress: di + me = dime, but diga + me + lo = dígamelo."/>
  </div>);
}
