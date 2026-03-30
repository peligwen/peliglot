import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

const regions=[
  {id:"voseo",label:"Voseo",color:"#6A1B9A",desc:"Argentina, Uruguay, parts of Central America",content:[
    {feat:"Vos replaces tú",ex:"Vos tenés (tú tienes) · Vos sabés (tú sabes) · Vos podés (tú puedes)"},
    {feat:"Different verb stress pattern",ex:"-ás, -és, -ís instead of -as, -es: hablás, comés, vivís"},
    {feat:"Commands differ too",ex:"¡Hablá! ¡Vení! ¡Decí! (instead of habla, ven, di)"},
  ]},
  {id:"vocab",label:"Vocabulary",color:"#00695C",desc:"Same object, different words across regions",content:[
    {feat:"Car",ex:"🇪🇸 coche · 🇲🇽 carro · 🇦🇷 auto"},
    {feat:"Computer",ex:"🇪🇸 ordenador · 🇲🇽🇦🇷 computadora"},
    {feat:"Cell phone",ex:"🇪🇸 móvil · 🇲🇽 celular"},
    {feat:"Bus",ex:"🇪🇸 autobús · 🇲🇽 camión · 🇦🇷 colectivo · 🇨🇺 guagua"},
    {feat:"Apartment",ex:"🇪🇸 piso · 🇲🇽🇦🇷 departamento · 🇨🇴 apartamento"},
    {feat:"Juice",ex:"🇪🇸 zumo · 🇲🇽🇦🇷 jugo"},
  ]},
  {id:"pronun",label:"Pronunciation",color:"#C62828",desc:"Sound differences across the Spanish-speaking world",content:[
    {feat:"Distinción (Spain)",ex:"C/Z before e/i = /θ/ (like English 'th'): cerveza → /therbetha/"},
    {feat:"Seseo (Latin America)",ex:"C/Z before e/i = /s/ (no 'th'): cerveza → /serbesa/"},
    {feat:"Yeísmo (most regions)",ex:"LL = Y sound: pollo → /poyo/"},
    {feat:"Sheísmo (Argentina)",ex:"LL/Y = /sh/: pollo → /posho/, yo → /sho/"},
    {feat:"Aspirated -s (Caribbean)",ex:"Final -s weakens or drops: estos → /ehtoh/ or /etoh/"},
  ]},
  {id:"grammar",label:"Grammar",color:"#0D47A1",desc:"Structural differences between regions",content:[
    {feat:"Ustedes replaces vosotros",ex:"All of Latin America uses ustedes for ALL plural 'you' (formal + informal)"},
    {feat:"Leísmo (Spain)",ex:"Le/les used for direct objects (people): Le vi ayer (instead of Lo vi)"},
    {feat:"Pretérito vs Perfecto",ex:"🇪🇸 He comido hoy (present perfect common) · 🇲🇽 Comí hoy (preterite preferred)"},
  ]},
];

export function Guide33(){
  const [reg,setReg]=useState("voseo");const r=regions.find(x=>x.id===reg);
  return(<div>
    <DarkBox title="Regional Spanish"><div style={{fontSize:13,lineHeight:1.7}}>
      Spanish is spoken across 20+ countries. The grammar core is the same, but <strong>pronunciation</strong>, <strong>vocabulary</strong>, and some <strong>grammar patterns</strong> vary by region.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:14}}>
      {regions.map(rg=>(<button key={rg.id} onClick={()=>setReg(rg.id)} style={{padding:"7px 14px",borderRadius:8,border:reg===rg.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:reg===rg.id?rg.color:"#fff",color:reg===rg.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{rg.label}</button>))}
    </div>
    <div style={{fontSize:11,color:"#999",textAlign:"center",marginBottom:12,fontStyle:"italic"}}>{r.desc}</div>
    {r.content.map((c,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid #eee"}}>
      <div style={{fontSize:13,fontWeight:700,color:r.color,marginBottom:4}}>{c.feat}</div>
      <div style={{fontSize:12,color:"#555"}}>{c.ex}</div>
    </div>))}
    <Insight text="All regional varieties are equally correct! Choose one region to focus on for consistency, but learn to understand all of them. Most textbooks teach either Mexican or Peninsular Spanish."/>
  </div>);
}
