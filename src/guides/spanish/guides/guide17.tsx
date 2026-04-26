import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';
import { serUses, estarUses, shifts } from './data17';

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
