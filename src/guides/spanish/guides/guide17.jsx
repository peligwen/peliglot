import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

const serUses=[
  {cat:"Identity / Definition",ex:"Soy profesora. — I'm a teacher."},
  {cat:"Origin / Nationality",ex:"Es de Colombia. — She's from Colombia."},
  {cat:"Material",ex:"La mesa es de madera. — The table is (made) of wood."},
  {cat:"Time / Date",ex:"Son las tres. — It's three o'clock."},
  {cat:"Possession",ex:"Es mi libro. — It's my book."},
  {cat:"Inherent traits",ex:"Ella es inteligente. — She is intelligent."},
  {cat:"Events (when/where)",ex:"La fiesta es en mi casa. — The party is at my house."},
  {cat:"Impersonal expressions",ex:"Es importante estudiar. — It's important to study."},
];
const estarUses=[
  {cat:"Location",ex:"Estoy en casa. — I'm at home."},
  {cat:"Emotions / Mood",ex:"Estoy feliz. — I'm happy (right now)."},
  {cat:"Physical condition",ex:"Estás cansado. — You're tired."},
  {cat:"Progressive tenses",ex:"Estoy comiendo. — I'm eating."},
  {cat:"Result of change",ex:"La puerta está abierta. — The door is open."},
  {cat:"Temporary states",ex:"El café está frío. — The coffee is cold."},
  {cat:"Appearance",ex:"Estás muy guapo hoy. — You look handsome today."},
  {cat:"Dead (result of dying)",ex:"El perro está muerto. — The dog is dead."},
];
const shifts=[
  {a:"aburrido",s:"boring (personality)",e:"bored (feeling)",exS:"Él es aburrido.",exE:"Él está aburrido."},
  {a:"listo",s:"clever / smart",e:"ready",exS:"Es muy lista.",exE:"¿Estás listo?"},
  {a:"malo",s:"bad / evil",e:"sick / unwell",exS:"Es mala persona.",exE:"Está malo, tiene fiebre."},
  {a:"rico",s:"wealthy",e:"delicious",exS:"Ella es rica.",exE:"Esta sopa está rica."},
  {a:"verde",s:"green (color)",e:"unripe",exS:"La casa es verde.",exE:"El plátano está verde."},
  {a:"seguro",s:"safe (place)",e:"sure / certain",exS:"Este barrio es seguro.",exE:"Estoy seguro de eso."},
];

export function Guide17(){
  const [sec,setSec]=useState("ser");
  const [expanded,setExpanded]=useState(-1);
  return(<div>
    <DarkBox title="Two 'To Be' Verbs"><div style={{fontSize:13,lineHeight:1.7}}>
      <strong style={{color:"#90CAF9"}}>SER</strong> = what something <em>is</em> (identity, essence, permanent qualities)<br/>
      <strong style={{color:"#EF9A9A"}}>ESTAR</strong> = how something <em>is</em> (state, location, condition, temporary)
    </div></DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
      {[{k:"ser",l:"SER",c:"#0D47A1"},{k:"estar",l:"ESTAR",c:"#BF360C"}].map(s=>(<button key={s.k} onClick={()=>setSec(s.k)} style={{flex:1,maxWidth:200,padding:"12px",borderRadius:10,border:sec===s.k?`2.5px solid ${s.c}`:"1.5px solid #ddd",background:sec===s.k?s.c:"#fff",color:sec===s.k?"#fff":"#666",cursor:"pointer",fontSize:16,fontWeight:800}}>{s.l}</button>))}
    </div>
    <Card color={sec==="ser"?"#0D47A1":"#BF360C"} title={sec==="ser"?"SER — What something IS":"ESTAR — How something IS (right now)"}>
      {(sec==="ser"?serUses:estarUses).map((u,i,a)=>(<div key={i} style={{padding:"8px 16px",borderBottom:i<a.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:13,fontWeight:700,color:sec==="ser"?"#0D47A1":"#BF360C"}}>• {u.cat}</div>
        <div style={{fontSize:12,color:"#555",fontStyle:"italic",marginTop:2}}>{u.ex}</div>
      </div>))}
    </Card>
    <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #eee",marginTop:8}}>
      <div style={{padding:"10px 16px",background:"#FFF8E7",fontSize:13,fontWeight:700,color:"#8B6914"}}>⚡ Meaning Shifts — Same adjective, different verb = different meaning</div>
      {shifts.map((s,i)=>(<div key={i} onClick={()=>setExpanded(expanded===i?-1:i)} style={{padding:"8px 16px",borderBottom:i<shifts.length-1?"1px solid #f0eeeb":"none",cursor:"pointer",transition:"background 0.15s",background:expanded===i?"#FAFAFA":"#fff"}}>
        <div style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",fontSize:12}}>
          <span style={{fontWeight:800,color:"#333"}}>{s.a}</span>
          <span style={{color:"#0D47A1"}}>ser = {s.s}</span>
          <span style={{color:"#BF360C"}}>estar = {s.e}</span>
        </div>
        {expanded===i&&<div style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",fontSize:11,marginTop:4,color:"#888",fontStyle:"italic"}}>
          <span/>
          <span>{s.exS}</span>
          <span>{s.exE}</span>
        </div>}
      </div>))}
    </div>
    <div style={{background:"#FFEBEE",borderRadius:10,padding:"10px 14px",marginTop:10,marginBottom:10,border:"1px solid #FFCDD2",fontSize:12,color:"#B71C1C",lineHeight:1.5}}>
      🚨 <strong>"Soy aburrido"</strong> = I'm a boring person. <strong>"Estoy aburrido"</strong> = I'm bored right now. This is one of the most common ser/estar mistakes!
    </div>
    <Insight text="When in doubt, ask: could this change? If yes → estar. 'She is tall' (won't change) → Es alta. 'She is tired' (will change) → Está cansada."/>
  </div>);
}
