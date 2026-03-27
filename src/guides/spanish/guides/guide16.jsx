import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { QuizSection } from '../../../components/templates/QuizSection';

const ios=["me","te","le","nos","les"];
const enSubj=["I","you","he/she","we","they"];

const verbs=[
  {v:"gustar",m:"to like (to be pleasing)",s:"gusta",p:"gustan",exS:"el chocolate",exP:"los tacos",exEn:["chocolate","tacos"]},
  {v:"encantar",m:"to love / delight",s:"encanta",p:"encantan",exS:"la música",exP:"las flores",exEn:["music","flowers"]},
  {v:"molestar",m:"to bother / annoy",s:"molesta",p:"molestan",exS:"el ruido",exP:"los mosquitos",exEn:["the noise","mosquitoes"]},
  {v:"doler",m:"to hurt / ache",s:"duele",p:"duelen",exS:"la cabeza",exP:"los pies",exEn:["my head","my feet"]},
  {v:"picar",m:"to itch / sting",s:"pica",p:"pican",exS:"la cara",exP:"los ojos",exEn:["my face","my eyes"]},
  {v:"importar",m:"to matter / care about",s:"importa",p:"importan",exS:"tu opinión",exP:"los resultados",exEn:["your opinion","the results"]},
  {v:"interesar",m:"to interest",s:"interesa",p:"interesan",exS:"la historia",exP:"los idiomas",exEn:["history","languages"]},
  {v:"faltar",m:"to lack / be missing",s:"falta",p:"faltan",exS:"un tenedor",exP:"dos sillas",exEn:["a fork","two chairs"]},
  {v:"parecer",m:"to seem",s:"parece",p:"parecen",exS:"buena idea",exP:"caros",exEn:["a good idea","expensive"]},
  {v:"quedar",m:"to have left / remaining",s:"queda",p:"quedan",exS:"un día",exP:"tres días",exEn:["one day","three days"]},
];

const quizItems=[
  {question:"I like tacos. (gustar)",answer:"Me gustan los tacos."},
  {question:"My head hurts. (doler)",answer:"Me duele la cabeza."},
  {question:"My face itches. (picar)",answer:"Me pica la cara."},
  {question:"She loves music. (encantar)",answer:"Le encanta la música."},
  {question:"It doesn't matter to us. (importar)",answer:"No nos importa."},
  {question:"We're missing two chairs. (faltar)",answer:"Nos faltan dos sillas."},
  {question:"Mosquitoes bother me. (molestar)",answer:"Me molestan los mosquitos."},
  {question:"They're interested in history. (interesar)",answer:"Les interesa la historia."},
  {question:"My feet hurt. (doler)",answer:"Me duelen los pies."},
  {question:"It seems like a good idea. (parecer)",answer:"Me parece buena idea."},
];

export function Guide16(){
  const [tab,setTab]=useState("build");
  const [io,setIo]=useState(0);
  const [sing,setSing]=useState(true);
  const [verb,setVerb]=useState(0);
  const vb=verbs[verb];
  return(<div>
    <DarkBox title="The Mental Shift"><div style={{fontSize:13,lineHeight:1.6}}>
      English: <strong style={{color:"#90CAF9"}}>I</strong> like <strong style={{color:"#EF9A9A"}}>tacos</strong><br/>
      Spanish: <strong style={{color:"#EF9A9A"}}>Tacos</strong> are pleasing <strong style={{color:"#90CAF9"}}>to me</strong><br/>
      <span style={{color:"#888",fontSize:11}}>The thing liked/felt is the real subject. The person is an indirect object.</span>
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"build",label:"🔧 Builder"},{id:"verbs",label:"📖 All Verbs"},{id:"quiz",label:"🧪 Quiz"}].map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 14px",borderRadius:8,border:tab===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:tab===t.id?"#1a1a1a":"#fff",color:tab===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {tab==="build"&&<div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",marginBottom:10}}>
        {verbs.map((v,i)=>(<button key={v.v} onClick={()=>setVerb(i)} style={{padding:"4px 10px",borderRadius:6,border:verb===i?"2px solid #D84315":"1.5px solid #ddd",background:verb===i?"#D84315":"#fff",color:verb===i?"#fff":"#666",fontSize:11,fontWeight:700,cursor:"pointer"}}>{v.v}</button>))}
      </div>
      <div style={{display:"flex",gap:5,marginBottom:10,justifyContent:"center",flexWrap:"wrap"}}>
        {ios.map((p,i)=>(<button key={i} onClick={()=>setIo(i)} style={{padding:"7px 14px",borderRadius:8,border:io===i?"2.5px solid #D84315":"1.5px solid #ddd",background:io===i?"#D84315":"#fff",color:io===i?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{p}</button>))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
        <button onClick={()=>setSing(true)} style={{flex:1,maxWidth:150,padding:"10px",borderRadius:8,border:sing?"2.5px solid #2E7D32":"1.5px solid #ddd",background:sing?"#2E7D32":"#fff",color:sing?"#fff":"#666",cursor:"pointer",fontWeight:700}}>{vb.s.toUpperCase()}<br/><span style={{fontSize:10,fontWeight:400}}>1 thing</span></button>
        <button onClick={()=>setSing(false)} style={{flex:1,maxWidth:150,padding:"10px",borderRadius:8,border:!sing?"2.5px solid #1565C0":"1.5px solid #ddd",background:!sing?"#1565C0":"#fff",color:!sing?"#fff":"#666",cursor:"pointer",fontWeight:700}}>{vb.p.toUpperCase()}<br/><span style={{fontSize:10,fontWeight:400}}>2+ things</span></button>
      </div>
      <div style={{background:"#FAFAF5",borderRadius:12,padding:"16px",textAlign:"center",border:"1px solid #eee",marginBottom:16}}>
        <div style={{fontSize:22,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:6,flexWrap:"wrap"}}>
          <span style={{color:"#D84315",background:"#FFF3E0",padding:"3px 8px",borderRadius:5}}>{ios[io]}</span>
          <span style={{color:sing?"#2E7D32":"#1565C0",background:sing?"#E8F5E9":"#E3F2FD",padding:"3px 8px",borderRadius:5}}>{sing?vb.s:vb.p}</span>
          <span style={{color:"#333"}}>{sing?vb.exS:vb.exP}</span>
        </div>
        <div style={{fontSize:13,color:"#888",marginTop:6,fontStyle:"italic"}}>{sing?vb.exEn[0]:vb.exEn[1]} {vb.v==="doler"||vb.v==="picar"?"— "+enSubj[io]:(io===2?"— "+enSubj[io]:"")} ({vb.m})</div>
      </div>
      <Insight text="Formula: IO pronoun (me/te/le/nos/les) + verb (singular or plural) + the thing. The THING determines singular vs plural, not the person!"/>
    </div>}
    {tab==="verbs"&&<div>
      {verbs.map((v,i)=>(<div key={v.v} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid #eee"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
          <span style={{fontSize:15,fontWeight:800,color:"#D84315"}}>{v.v}</span>
          <span style={{fontSize:12,color:"#999"}}>{v.m}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          <div style={{fontSize:12,color:"#555"}}><span style={{fontWeight:700,color:"#2E7D32"}}>me {v.s}</span> {v.exS}</div>
          <div style={{fontSize:12,color:"#555"}}><span style={{fontWeight:700,color:"#1565C0"}}>me {v.p}</span> {v.exP}</div>
        </div>
      </div>))}
      <Insight text="Doler and picar work just like gustar: Me duele la cabeza (My head hurts), Me pica la cara (My face itches). The body part is the subject!"/>
    </div>}
    {tab==="quiz"&&<QuizSection
      items={quizItems}
      answerKey="answer"
      renderQuestion={(q)=>(<div>
        <div style={{fontSize:11,color:"#999",marginBottom:4}}>Translate to Spanish:</div>
        <div style={{fontSize:15,fontWeight:700,color:"#1a1a1a"}}>{q.question}</div>
      </div>)}
      optionCount={4}
      color="#D84315"
      resultMessages={{high:"¡Perfecto! You've mastered the gustar pattern!",mid:"Good! Remember: the THING is the subject, not the person.",low:"Review the builder tab — practice with different verbs and pronouns."}}
    />}
  </div>);
}
