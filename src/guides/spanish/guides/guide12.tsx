import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { QuizSection } from '../../../components/templates/QuizSection';

const pluralRules=[
  {l:"Vowel → +S",desc:"If a word ends in a vowel, just add -s.",ex:[{s:"casa",p:"casas"},{s:"libro",p:"libros"},{s:"estudiante",p:"estudiantes"},{s:"gato",p:"gatos"}],color:"#2E7D32"},
  {l:"Consonant → +ES",desc:"If a word ends in a consonant, add -es.",ex:[{s:"animal",p:"animales"},{s:"ciudad",p:"ciudades"},{s:"reloj",p:"relojes"},{s:"profesor",p:"profesores"}],color:"#C62828"},
  {l:"-Z → -CES",desc:"Z changes to C before adding -es.",ex:[{s:"lápiz",p:"lápices"},{s:"vez",p:"veces"},{s:"luz",p:"luces"},{s:"pez",p:"peces"}],color:"#E65100"},
  {l:"Accent shifts",desc:"Some words gain or lose an accent mark in plural.",ex:[{s:"joven",p:"jóvenes"},{s:"examen",p:"exámenes"},{s:"canción",p:"canciones"},{s:"inglés",p:"ingleses"}],color:"#6A1B9A"},
  {l:"Unchanged (-s/-is ending)",desc:"Words already ending in unstressed -es or -is stay the same. Only the article changes.",ex:[{s:"el lunes",p:"los lunes"},{s:"la crisis",p:"las crisis"},{s:"el paraguas",p:"los paraguas"}],color:"#455A64"},
];

const quizItems=[
  {singular:"casa",answer:"casas"},{singular:"animal",answer:"animales"},
  {singular:"lápiz",answer:"lápices"},{singular:"joven",answer:"jóvenes"},
  {singular:"el lunes",answer:"los lunes"},{singular:"ciudad",answer:"ciudades"},
  {singular:"luz",answer:"luces"},{singular:"canción",answer:"canciones"},
  {singular:"libro",answer:"libros"},{singular:"pez",answer:"peces"},
  {singular:"examen",answer:"exámenes"},{singular:"reloj",answer:"relojes"},
];

export function Guide12(){
  const [mode,setMode]=useState("learn");
  return(<div>
    <DarkBox title="Pluralization Rules"><div style={{fontSize:13,lineHeight:1.7}}>
      The ending of a Spanish word determines how you make it plural. Most just add <strong>-s</strong>, but consonants, <strong>-z</strong> endings, and accent shifts have special rules.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"learn",label:"📖 Learn"},{id:"quiz",label:"🧪 Quiz"}].map(t=>(<button key={t.id} onClick={()=>setMode(t.id)} style={{padding:"7px 16px",borderRadius:8,border:mode===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:mode===t.id?"#1a1a1a":"#fff",color:mode===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {mode==="learn"?<div>
      {pluralRules.map((r,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #eee",marginBottom:10}}>
        <div style={{padding:"10px 14px",background:r.color,color:"#fff",fontSize:13,fontWeight:700}}>{r.l}</div>
        <div style={{padding:"6px 14px",fontSize:12,color:"#666",borderBottom:"1px solid #f0f0f0"}}>{r.desc}</div>
        {r.ex.map((e,j)=>(<div key={j} style={{display:"flex",alignItems:"center",padding:"8px 16px",borderBottom:j<r.ex.length-1?"1px solid #f0eeeb":"none"}}>
          <span style={{flex:1,fontSize:14,color:"#999"}}>{e.s}</span>
          <span style={{fontSize:16,color:"#ccc",margin:"0 12px"}}>→</span>
          <span style={{flex:1,fontSize:14,fontWeight:700,color:r.color}}>{e.p}</span>
        </div>))}
      </div>))}
      <Insight text="Canción → canciones: the accent on -ón disappears because the stress naturally falls on the second-to-last syllable when -es is added."/>
    </div>:<QuizSection
      items={quizItems}
      answerKey="answer"
      renderQuestion={(q)=>(<div>
        <div style={{fontSize:11,color:"#999",marginBottom:4}}>What is the plural form?</div>
        <div style={{fontSize:24,fontWeight:800,color:"#1a1a1a"}}>{q.singular}</div>
      </div>)}
      optionCount={4}
      color="#2E7D32"
      resultMessages={{high:"¡Perfecto! You've mastered Spanish plurals!",mid:"Good! Review the accent shift rules.",low:"Study the rules tab and try again."}}
    />}
  </div>);
}
