import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { QuizSection } from '../../../components/templates/QuizSection';

const negWords=[
  {w:"no",m:"not",ex:["No hablo francés.","No quiero ir."],note:"Goes directly before the conjugated verb."},
  {w:"nunca / jamás",m:"never",ex:["Nunca como carne.","No como carne nunca."],note:"Can go before verb (alone) or after verb (with no)."},
  {w:"nada",m:"nothing",ex:["No quiero nada.","Nada es imposible."],note:"After verb needs 'no' before verb. Before verb stands alone."},
  {w:"nadie",m:"nobody",ex:["No conozco a nadie.","Nadie llamó."],note:"Needs personal 'a' as direct object: No veo a nadie."},
  {w:"tampoco",m:"neither / not either",ex:["Yo tampoco.","No quiero ir tampoco."],note:"Opposite of 'también'. Works alone or with no."},
  {w:"ni...ni",m:"neither...nor",ex:["No quiero ni café ni té.","Ni sé ni me importa."],note:"Links two negated options. Can start a sentence."},
  {w:"ya no",m:"not anymore",ex:["Ya no vivo ahí.","Ya no me gusta."],note:"Indicates a change from past to present."},
  {w:"todavía no",m:"not yet",ex:["Todavía no llega.","No ha llegado todavía."],note:"Implies the action will happen eventually."},
];

const quizItems=[
  {question:"I don't want anything.",answer:"No quiero nada."},
  {question:"Nobody called.",answer:"Nadie llamó."},
  {question:"I never eat meat.",answer:"Nunca como carne."},
  {question:"Neither coffee nor tea.",answer:"No quiero ni café ni té."},
  {question:"I don't live there anymore.",answer:"Ya no vivo ahí."},
  {question:"She hasn't arrived yet.",answer:"Todavía no llega."},
  {question:"Me neither.",answer:"Yo tampoco."},
  {question:"I don't speak French.",answer:"No hablo francés."},
];

export function Guide21(){
  const [mode,setMode]=useState("learn");
  return(<div>
    <DarkBox title="Core Rule"><div style={{fontSize:13,lineHeight:1.7}}>
      Put <strong style={{color:"#EF9A9A"}}>no</strong> directly before the conjugated verb. Object pronouns go between: <em>No lo quiero.</em><br/>
      Double negatives are <strong>correct</strong> in Spanish — they reinforce, not cancel!
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"learn",label:"📖 Learn"},{id:"quiz",label:"🧪 Quiz"}].map(t=>(<button key={t.id} onClick={()=>setMode(t.id)} style={{padding:"7px 16px",borderRadius:8,border:mode===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:mode===t.id?"#1a1a1a":"#fff",color:mode===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {mode==="learn"?<div>
      {negWords.map((n,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee",marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <span style={{fontSize:15,fontWeight:800,color:"#C62828"}}>{n.w}</span>
          <span style={{fontSize:12,color:"#999"}}>{n.m}</span>
        </div>
        {n.ex.map((e,j)=>(<div key={j} style={{fontSize:13,color:"#555",fontStyle:"italic",marginBottom:2}}>{e}</div>))}
        <div style={{fontSize:11,color:"#888",marginTop:4,background:"#FAFAFA",padding:"4px 8px",borderRadius:6}}>{n.note}</div>
      </div>))}
      <Insight text="Two valid patterns: 'Nunca como carne' (negative word first, no 'no' needed) OR 'No como carne nunca' ('no' + verb + negative word). Both mean the same thing!"/>
    </div>:<QuizSection
      items={quizItems}
      answerKey="answer"
      renderQuestion={(q)=>(<div>
        <div style={{fontSize:11,color:"#999",marginBottom:4}}>How do you say this in Spanish?</div>
        <div style={{fontSize:15,fontWeight:700,color:"#1a1a1a"}}>{q.question}</div>
      </div>)}
      optionCount={4}
      color="#C62828"
      resultMessages={{high:"¡Perfecto! You've mastered negation!",mid:"Good! Review nunca/nada/nadie placement.",low:"Study the learn tab and try again."}}
    />}
  </div>);
}
