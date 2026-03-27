import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';
import { pronouns6 } from './_helpers';

const progUseYes=[
  {ex:"Estoy comiendo ahora.",en:"I'm eating right now.",use:"Action happening right now"},
  {ex:"Está lloviendo.",en:"It's raining (at this moment).",use:"Current, ongoing event"},
  {ex:"Estaban bailando cuando llegué.",en:"They were dancing when I arrived.",use:"Background action interrupted"},
];
const progUseNo=[
  {ex:"Vivo en Madrid. (NOT estoy viviendo)",en:"I live in Madrid.",use:"Ongoing state — use simple present"},
  {ex:"Estudio español. (NOT estoy estudiando)",en:"I study Spanish.",use:"Habitual action — use simple present"},
  {ex:"Mañana voy al cine. (NOT estaré yendo)",en:"Tomorrow I'm going to the movies.",use:"Future plans — use simple present or ir a"},
];

export function Guide7(){
  const [mode,setMode]=useState("present");
  const estar=mode==="present"?["estoy","estás","está","estamos","estáis","están"]:["estaba","estabas","estaba","estábamos","estabais","estaban"];
  const col=mode==="present"?"#E65100":"#283593";
  return(<div>
    <DarkBox title="The Formula"><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,flexWrap:"wrap",marginBottom:8}}>
      <span style={{background:col,padding:"6px 14px",borderRadius:8,fontWeight:700}}>ESTAR</span>
      <span style={{fontSize:20,color:"#444"}}>+</span>
      <span style={{background:"#555",padding:"6px 14px",borderRadius:8,fontWeight:700}}>-ANDO / -IENDO</span>
    </div><div style={{fontSize:12,color:"#aaa"}}>Only for actions happening <strong style={{color:"#FFE77A"}}>right at this moment</strong>. Spanish uses this far less than English!</div></DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
      {[{k:"present",l:"Present Progressive"},{k:"past",l:"Past Progressive"}].map(m=>(<button key={m.k} onClick={()=>setMode(m.k)} style={{flex:1,maxWidth:200,padding:"10px",borderRadius:10,border:mode===m.k?`2.5px solid ${col}`:"1.5px solid #ddd",background:mode===m.k?col:"#fff",color:mode===m.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:13}}>{m.l}</button>))}
    </div>
    <Card color={col} title="hablar → hablando" subtitle="speaking">
      {pronouns6.map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"0 16px",height:44,borderBottom:i<5?"1px solid #f0eeeb":"none"}}>
        <div style={{width:110,fontSize:12,color:"#999"}}>{p}</div>
        <div style={{fontSize:16,fontWeight:700}}><span style={{color:col}}>{estar[i]}</span><span style={{color:"#ccc",margin:"0 6px"}}>+</span><span style={{color:"#1a1a1a"}}>hablando</span></div>
      </div>))}
    </Card>
    <Card color="#2E7D32" title="When TO Use the Progressive" subtitle="right-now actions only">
      {progUseYes.map((u,i)=>(<div key={i} style={{padding:"10px 16px",borderBottom:i<progUseYes.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#2E7D32",textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>{u.use}</div>
        <div style={{fontSize:15,fontWeight:700}}>{u.ex}</div>
        <div style={{fontSize:12,color:"#888"}}>{u.en}</div>
      </div>))}
    </Card>
    <Card color="#C62828" title="When NOT to Use It" subtitle="use simple present instead">
      {progUseNo.map((u,i)=>(<div key={i} style={{padding:"10px 16px",borderBottom:i<progUseNo.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#C62828",textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>{u.use}</div>
        <div style={{fontSize:15,fontWeight:700}}>{u.ex}</div>
        <div style={{fontSize:12,color:"#888"}}>{u.en}</div>
      </div>))}
    </Card>
    <Insight text="English 'I'm eating' can mean right now OR generally — Spanish only uses the progressive for right now. 'I'm studying Spanish (in general)' = Estudio español."/>
  </div>);
}
