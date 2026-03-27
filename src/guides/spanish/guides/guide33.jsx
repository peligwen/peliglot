import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { QuizSection } from '../../../components/templates/QuizSection';

const mistakes=[
  {wrong:"Estoy embarazada",seems:"I'm embarrassed",actual:"I'm pregnant",correct:"Estoy avergonzado/a",question:"How do you say 'I'm embarrassed'?",answer:"Estoy avergonzado/a"},
  {wrong:"Estoy caliente",seems:"I'm hot (temperature)",actual:"I'm aroused",correct:"Tengo calor",question:"How do you say 'I'm hot' (temperature)?",answer:"Tengo calor"},
  {wrong:"Soy aburrido",seems:"I'm bored",actual:"I'm boring (as a person)",correct:"Estoy aburrido",question:"How do you say 'I'm bored'?",answer:"Estoy aburrido/a"},
  {wrong:"Estoy excitado",seems:"I'm excited",actual:"I'm aroused",correct:"Estoy emocionado/a",question:"How do you say 'I'm excited'?",answer:"Estoy emocionado/a"},
  {wrong:"Busco para mi llave",seems:"I'm looking for my key",actual:"Incorrect — no preposition needed",correct:"Busco mi llave",question:"'I'm looking for my key' = ?",answer:"Busco mi llave"},
  {wrong:"Yo soy 25 años",seems:"I am 25 years old",actual:"Incorrect — use tener",correct:"Tengo 25 años",question:"How do you say 'I am 25 years old'?",answer:"Tengo 25 años"},
  {wrong:"Es bueno para salud",seems:"It's good for health",actual:"Missing article — LA salud",correct:"Es bueno para la salud",question:"'It's good for your health' = ?",answer:"Es bueno para la salud"},
  {wrong:"Me gusta los libros",seems:"I like the books",actual:"Wrong — gustan (plural) needed",correct:"Me gustan los libros",question:"'I like the books' = ?",answer:"Me gustan los libros"},
  {wrong:"Conozco a Madrid",seems:"I know Madrid",actual:"Wrong verb — use saber for facts, conocer for familiarity",correct:"Conozco Madrid",question:"'I know Madrid (am familiar with it)' = ?",answer:"Conozco Madrid"},
  {wrong:"Vi a la película",seems:"I saw the movie",actual:"Personal 'a' only for people, not things",correct:"Vi la película",question:"'I saw the movie' = ?",answer:"Vi la película"},
];

export function Guide33(){
  const [mode,setMode]=useState("learn");
  return(<div>
    <DarkBox title="Common Mistakes"><div style={{fontSize:13,lineHeight:1.7}}>
      The most frequent errors English speakers make in Spanish. Learn these traps — then quiz yourself!
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"learn",label:"📖 Learn"},{id:"quiz",label:"🧪 Quiz"}].map(t=>(<button key={t.id} onClick={()=>setMode(t.id)} style={{padding:"7px 16px",borderRadius:8,border:mode===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:mode===t.id?"#1a1a1a":"#fff",color:mode===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {mode==="learn"?<div>
      {mistakes.map((m,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"12px 14px",marginBottom:8,border:"1px solid #eee"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6}}>
          <span style={{fontSize:13,fontWeight:700,color:"#C62828",textDecoration:"line-through"}}>{m.wrong}</span>
          <span style={{fontSize:11,color:"#999"}}>≠ {m.seems}</span>
        </div>
        <div style={{fontSize:11,color:"#C62828",marginBottom:4}}>Actually means: {m.actual}</div>
        <div style={{fontSize:14,fontWeight:700,color:"#2E7D32"}}>✓ {m.correct}</div>
      </div>))}
    </div>:<QuizSection
      items={mistakes}
      answerKey="answer"
      renderQuestion={(q)=>(<div>
        <div style={{fontSize:15,fontWeight:700,color:"#1a1a1a",marginBottom:4}}>{q.question}</div>
      </div>)}
      optionCount={4}
      color="#C62828"
      resultMessages={{high:"¡Perfecto! You avoided the traps!",mid:"Getting there! Review the tricky ones.",low:"Review the learn tab and try again."}}
    />}
  </div>);
}
