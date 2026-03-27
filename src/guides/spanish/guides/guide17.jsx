import { useState } from 'react';
import { Card } from '../../../components/Card';

export function Guide17(){
  const [sec,setSec]=useState("ser");
  const serUses=["Identity / Definition","Origin / Nationality","Material","Time / Date","Possession","Inherent traits","Events (when/where)","Impersonal expressions"];
  const estarUses=["Location","Emotions / Mood","Physical condition","Progressive tenses","Result of change","Temporary states","Appearance","Dead (result of dying)"];
  const shifts=[{a:"aburrido",s:"boring",e:"bored"},{a:"listo",s:"clever",e:"ready"},{a:"malo",s:"bad/evil",e:"sick"},{a:"rico",s:"wealthy",e:"delicious"},{a:"verde",s:"green (color)",e:"unripe"},{a:"seguro",s:"safe (place)",e:"sure/certain"}];
  return(<div>
    <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
      {[{k:"ser",l:"SER",c:"#0D47A1"},{k:"estar",l:"ESTAR",c:"#BF360C"}].map(s=>(<button key={s.k} onClick={()=>setSec(s.k)} style={{flex:1,maxWidth:200,padding:"12px",borderRadius:10,border:sec===s.k?`2.5px solid ${s.c}`:"1.5px solid #ddd",background:sec===s.k?s.c:"#fff",color:sec===s.k?"#fff":"#666",cursor:"pointer",fontSize:16,fontWeight:800}}>{s.l}</button>))}
    </div>
    <Card color={sec==="ser"?"#0D47A1":"#BF360C"} title={sec==="ser"?"SER — What something IS":"ESTAR — How something IS (right now)"}>
      {(sec==="ser"?serUses:estarUses).map((u,i,a)=>(<div key={i} style={{padding:"8px 16px",borderBottom:i<a.length-1?"1px solid #f0eeeb":"none",fontSize:13,color:"#555"}}>• {u}</div>))}
    </Card>
    <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #eee",marginTop:8}}>
      <div style={{padding:"10px 16px",background:"#FFF8E7",fontSize:13,fontWeight:700,color:"#8B6914"}}>⚡ Meaning Shifts</div>
      {shifts.map((s,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",padding:"8px 16px",borderBottom:i<shifts.length-1?"1px solid #f0eeeb":"none",fontSize:12}}>
        <span style={{fontWeight:800,color:"#333"}}>{s.a}</span>
        <span style={{color:"#0D47A1"}}>ser = {s.s}</span>
        <span style={{color:"#BF360C"}}>estar = {s.e}</span>
      </div>))}
    </div>
  </div>);
}
