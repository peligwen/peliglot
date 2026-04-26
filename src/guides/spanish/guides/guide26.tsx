import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide26(){
  const [sec,setSec]=useState("tener");
  const tenerUses=["Person / animal feels warm","Subjective sensation of heat","Living beings only","Uses tener + calor (calor is a noun)","Tengo calor → I feel hot","Ella tiene calor → She feels hot"];
  const estarUses=["Object / thing has high temperature","Physical state of being hot","Things, places, food, drinks","La sopa está caliente → The soup is hot","El motor está caliente → The engine is hot","⚠️ Colloquial: sexually aroused — avoid for temperature!"];
  const examples=[{phrase:"Tengo calor.",eng:"I feel hot."},{phrase:"El café está caliente.",eng:"The coffee is hot."},{phrase:"Ella tiene mucho calor.",eng:"She is very hot (feeling)."},{phrase:"El agua está caliente.",eng:"The water is hot."},{phrase:"Tenemos calor en verano.",eng:"We feel hot in summer."},{phrase:"La estufa está caliente.",eng:"The stove is hot."}];
  return(<div>
    <DarkBox title="KEY DISTINCTION">
      <div style={{fontSize:14,lineHeight:1.6}}>
        <strong>Tener calor</strong> = people feeling hot · <strong>Estar caliente</strong> = objects being hot
      </div>
    </DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
      {[{k:"tener",l:"TENER CALOR",c:"#E65100"},{k:"estar",l:"ESTAR CALIENTE",c:"#B71C1C"}].map(s=>(<button key={s.k} onClick={()=>setSec(s.k)} style={{flex:1,maxWidth:200,padding:"12px",borderRadius:10,border:sec===s.k?`2.5px solid ${s.c}`:"1.5px solid #ddd",background:sec===s.k?s.c:"#fff",color:sec===s.k?"#fff":"#666",cursor:"pointer",fontSize:15,fontWeight:800}}>{s.l}</button>))}
    </div>
    <Card color={sec==="tener"?"#E65100":"#B71C1C"} title={sec==="tener"?"TENER CALOR — Feeling hot (people)":"ESTAR CALIENTE — Being hot (objects)"}>
      {(sec==="tener"?tenerUses:estarUses).map((u,i,a)=>(<div key={i} style={{padding:"8px 16px",borderBottom:i<a.length-1?"1px solid #f0eeeb":"none",fontSize:13,color:"#555"}}>• {u}</div>))}
    </Card>
    <div style={{background:"#FFEBEE",borderRadius:10,padding:"10px 14px",marginBottom:12,border:"1px solid #FFCDD2",fontSize:12,color:"#B71C1C",lineHeight:1.5}}>🚨 Never say <strong>"Estoy caliente"</strong> to mean you feel hot — in most of Latin America this means sexually aroused. Always say <strong>"Tengo calor"</strong> for personal warmth.</div>
    <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #e0dcd5",marginTop:8}}>
      <div style={{padding:"10px 16px",background:"#FFF8E7",fontSize:13,fontWeight:700,color:"#8B6914"}}>📝 Examples</div>
      {examples.map((ex,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr",padding:"8px 16px",borderBottom:i<examples.length-1?"1px solid #f0eeeb":"none",fontSize:12}}>
        <span style={{fontWeight:700,color:"#333"}}>{ex.phrase}</span>
        <span style={{color:"#777"}}>{ex.eng}</span>
      </div>))}
    </div>
    <Insight text="For weather, use 'Hace calor' (It's hot out) — neither estar caliente nor tener calor works for weather." />
  </div>);
}
