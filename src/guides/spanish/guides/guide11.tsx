import { useState } from 'react';
import { QuizSection } from '../../../components/templates/QuizSection';
import { genderRules, quizItems } from './data11';

export function Guide11(){
  const [mode,setMode]=useState("rules");
  const mc="#1565C0",fc="#C62828";
  return(<div>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"rules",label:"📖 Rules"},{id:"quiz",label:"🧪 Quiz"}].map(t=>(<button key={t.id} onClick={()=>setMode(t.id)} style={{padding:"7px 16px",borderRadius:8,border:mode===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:mode===t.id?"#1a1a1a":"#fff",color:mode===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {mode==="rules"?<div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        <div style={{background:"#E3F2FD",borderRadius:12,padding:"14px",textAlign:"center",border:"2px solid #BBDEFB"}}>
          <div style={{fontSize:28,fontWeight:800,color:mc}}>EL</div><div style={{fontSize:12,color:mc,fontWeight:600}}>Masculino</div>
        </div>
        <div style={{background:"#FFEBEE",borderRadius:12,padding:"14px",textAlign:"center",border:"2px solid #FFCDD2"}}>
          <div style={{fontSize:28,fontWeight:800,color:fc}}>LA</div><div style={{fontSize:12,color:fc,fontWeight:600}}>Femenino</div>
        </div>
      </div>
      {genderRules.map((r,i)=>{const col=r.g==="M"?mc:fc;return(
        <div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 16px",marginBottom:8,border:"1px solid #eee"}}>
          <div style={{fontSize:13,fontWeight:700,color:col,marginBottom:6}}>{r.g==="M"?"♂":"♀"} {r.r}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{r.ex.map(e=>(<span key={e} style={{padding:"3px 10px",borderRadius:14,background:r.g==="M"?"#E3F2FD":"#FFEBEE",color:col,fontSize:12,fontWeight:600}}>{e}</span>))}</div>
          {r.exc.length>0&&<div style={{marginTop:6,display:"flex",flexWrap:"wrap",gap:5}}>{r.exc.map(e=>(<span key={e} style={{padding:"3px 10px",borderRadius:14,background:"#FFF8E7",color:"#8B6914",fontSize:11,fontWeight:600}}>⚠ {e}</span>))}</div>}
        </div>
      );})}
    </div>:<QuizSection
      items={quizItems}
      answerKey="answer"
      renderQuestion={(q)=>(<div>
        <div style={{fontSize:11,color:"#999",marginBottom:4}}>What article does this noun take?</div>
        <div style={{fontSize:28,fontWeight:800,color:"#1a1a1a"}}>___ {q.noun}</div>
      </div>)}
      optionCount={2}
      color="#1565C0"
      resultMessages={{high:"¡Perfecto! You've mastered gender rules!",mid:"Good! Review the exceptions.",low:"Study the rules tab and try again."}}
    />}
  </div>);
}
