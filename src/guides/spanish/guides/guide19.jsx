import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

const groups={
  a:{color:"#C62828",prep:"A",verbs:[
    {v:"empezar a",m:"to begin to",ex:"Empecé a estudiar."},
    {v:"ir a",m:"to be going to",ex:"Voy a comer."},
    {v:"aprender a",m:"to learn to",ex:"Aprendí a nadar."},
    {v:"ayudar a",m:"to help to",ex:"Me ayudó a entender."},
    {v:"volver a",m:"to do again",ex:"Volvió a llamar."},
  ]},
  de:{color:"#0D47A1",prep:"DE",verbs:[
    {v:"dejar de",m:"to stop (doing)",ex:"Dejé de fumar."},
    {v:"tratar de",m:"to try to",ex:"Trato de entender."},
    {v:"acabar de",m:"to have just",ex:"Acabo de llegar."},
    {v:"enamorarse de",m:"to fall in love with",ex:"Se enamoró de ella."},
    {v:"depender de",m:"to depend on",ex:"Depende de ti."},
    {v:"salir de",m:"to leave from",ex:"Salí de casa."},
  ]},
  en:{color:"#00695C",prep:"EN",verbs:[
    {v:"pensar en",m:"to think about",ex:"Pienso en ti."},
    {v:"insistir en",m:"to insist on",ex:"Insiste en pagar."},
    {v:"fijarse en",m:"to notice",ex:"Fíjate en esto."},
    {v:"tardar en",m:"to take time to",ex:"Tardó en llegar."},
  ]},
  con:{color:"#6A1B9A",prep:"CON",verbs:[
    {v:"soñar con",m:"to dream about",ex:"Soñé con volar."},
    {v:"contar con",m:"to count on",ex:"Cuento contigo."},
    {v:"salir con",m:"to date / go out with",ex:"Sale con María."},
    {v:"casarse con",m:"to marry",ex:"Se casó con él."},
  ]},
  none:{color:"#37474F",prep:"∅ NONE",verbs:[
    {v:"buscar",m:"to look for",ex:"Busco mi llave. (no 'para')"},
    {v:"escuchar",m:"to listen to",ex:"Escucho música. (no 'a')"},
    {v:"esperar",m:"to wait for",ex:"Espero el bus. (no 'para')"},
    {v:"pedir",m:"to ask for",ex:"Pido ayuda. (no 'para')"},
  ]},
};

export function Guide19(){
  const [tab,setTab]=useState("a");const g=groups[tab];
  return(<div>
    <DarkBox title="Verb + Preposition Pairs"><div style={{fontSize:13,lineHeight:1.7}}>
      Many Spanish verbs require a <strong>specific preposition</strong> that doesn't match English. Others need <strong>no preposition</strong> where English requires one.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:14}}>
      {Object.entries(groups).map(([k,v])=>(<button key={k} onClick={()=>setTab(k)} style={{padding:"6px 14px",borderRadius:8,border:tab===k?"2px solid #1a1a1a":"1.5px solid #ddd",background:tab===k?v.color:"#fff",color:tab===k?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{v.prep}</button>))}
    </div>
    {g.verbs.map(v=>(<div key={v.v} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid #eee"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
        <span style={{fontSize:14,fontWeight:700,color:g.color}}>{v.v}</span>
        <span style={{fontSize:12,color:"#555"}}>{v.m}</span>
      </div>
      <div style={{fontSize:12,color:"#888",fontStyle:"italic",marginTop:2}}>{v.ex}</div>
    </div>))}
    <Insight text="Pensar changes meaning with preposition: pensar EN = think about (Pienso en ti), pensar DE = have opinion of (¿Qué piensas de esto?)"/>
  </div>);
}
