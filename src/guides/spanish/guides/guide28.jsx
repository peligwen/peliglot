import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { VerbTypeSelector, ConjugationTable, TriggerChips } from './_helpers';

const subjData={
  ar:{verb:"hablar",stem:"habl",endings:["e","es","e","emos","éis","en"],meaning:"to speak"},
  er:{verb:"comer",stem:"com",endings:["a","as","a","amos","áis","an"],meaning:"to eat"},
  ir:{verb:"vivir",stem:"viv",endings:["a","as","a","amos","áis","an"],meaning:"to live"},
};

const triggers=[
  {cat:"Desire",color:"#C62828",words:["querer que","esperar que","pedir que","necesitar que","preferir que"]},
  {cat:"Emotion",color:"#6A1B9A",words:["alegrarse de que","tener miedo de que","sorprender que","molestar que"]},
  {cat:"Doubt",color:"#00695C",words:["dudar que","no creer que","no pensar que","es posible que"]},
  {cat:"Impersonal",color:"#0D47A1",words:["es importante que","es necesario que","es mejor que","ojalá (que)"]},
];

export function Guide28(){
  const [vt,setVt]=useState("ar");const d=subjData[vt];
  return(<div>
    <DarkBox title="Present Subjunctive"><div style={{fontSize:13,lineHeight:1.7}}>
      Used after triggers expressing <span style={{color:"#EF9A9A"}}>desire</span>, <span style={{color:"#CE93D8"}}>emotion</span>, <span style={{color:"#80CBC4"}}>doubt</span>, or <span style={{color:"#90CAF9"}}>impersonal judgment</span>.<br/>
      Formula: <strong>opposite vowel</strong> — -AR verbs take -E endings, -ER/-IR take -A endings.
    </div></DarkBox>
    <VerbTypeSelector vt={vt} setVt={setVt}/>
    <div style={{background:`${vt==="ar"?"#D84315":vt==="er"?"#00695C":"#4527A0"}12`,border:`2px dashed ${vt==="ar"?"#D84315":vt==="er"?"#00695C":"#4527A0"}44`,borderRadius:10,padding:"10px 14px",marginBottom:14,textAlign:"center",fontSize:13,fontWeight:600,color:vt==="ar"?"#D84315":vt==="er"?"#00695C":"#4527A0"}}>
      🔄 Flip the vowel: -{vt} verbs → {vt==="ar"?"-E":"-A"} endings
    </div>
    <ConjugationTable stem={d.stem} endings={d.endings} verb={d.verb} meaning={d.meaning} color={vt==="ar"?"#D84315":vt==="er"?"#00695C":"#4527A0"}/>
    <div style={{fontSize:13,fontWeight:800,color:"#1a1a1a",margin:"18px 0 10px"}}>Subjunctive Triggers</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
      {triggers.map(t=>(<TriggerChips key={t.cat} label={t.cat} color={t.color} words={t.words}/>))}
    </div>
    <Insight text="Irregulars in yo present indicative → irregular subjunctive base: tengo → tenga, digo → diga, salgo → salga. The 'yo-go' verbs carry their irregularity into ALL subjunctive forms."/>
  </div>);
}
