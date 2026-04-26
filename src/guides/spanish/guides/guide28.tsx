import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { VerbTypeSelector, ConjugationTable, TriggerChips } from './_helpers';
import type { VerbType } from './_helpers';

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
  const [vt,setVt]=useState<VerbType>("ar");const d=subjData[vt];
  return(<div>
    <DarkBox title="Present Subjunctive"><div style={{fontSize:13,lineHeight:1.7}}>
      Used after triggers expressing <span style={{color:"#EF9A9A"}}>desire</span>, <span style={{color:"#CE93D8"}}>emotion</span>, <span style={{color:"#80CBC4"}}>doubt</span>, <span style={{color:"#90CAF9"}}>impersonal judgment</span>, or <span style={{color:"#FFD54F"}}>adverbial conjunctions</span>.<br/>
      Formula: <strong>opposite vowel</strong> — -AR verbs take -E endings, -ER/-IR take -A endings.
    </div></DarkBox>
    <VerbTypeSelector vt={vt} setVt={setVt}/>
    <div style={{background:`${vt==="ar"?"#D84315":vt==="er"?"#00695C":"#4527A0"}12`,border:`2px dashed ${vt==="ar"?"#D84315":vt==="er"?"#00695C":"#4527A0"}44`,borderRadius:10,padding:"10px 14px",marginBottom:14,textAlign:"center",fontSize:13,fontWeight:600,color:vt==="ar"?"#D84315":vt==="er"?"#00695C":"#4527A0"}}>
      🔄 Flip the vowel: -{vt} verbs → {vt==="ar"?"-E":"-A"} endings
    </div>
    <ConjugationTable stem={d.stem} endings={d.endings} verb={d.verb} meaning={d.meaning} color={vt==="ar"?"#D84315":vt==="er"?"#00695C":"#4527A0"}/>
    <div style={{fontSize:13,fontWeight:800,color:"#1a1a1a",margin:"18px 0 10px"}}>Subjunctive Triggers</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
      {triggers.map(t=>(<TriggerChips key={t.cat} label={t.cat} color={t.color} words={t.words}/>))}
    </div>
    <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #eee",marginBottom:16}}>
      <div style={{padding:"8px 12px",background:"#F57F17",color:"#fff",fontSize:11,fontWeight:700}}>⚡ Adverbial Conjunctions</div>
      <div style={{padding:"10px 12px",fontSize:12,color:"#555",lineHeight:1.7}}>
        These conjunctions trigger subjunctive when referring to <strong>future or uncertain</strong> events (not established facts):
        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8,marginBottom:8}}>
          {["cuando","en cuanto","hasta que","antes (de) que","para que","sin que","aunque"].map(w=>(<span key={w} style={{padding:"3px 8px",borderRadius:12,background:"#FFF8E1",color:"#E65100",fontSize:11,fontWeight:600,border:"1px solid #FFE082"}}>{w}</span>))}
        </div>
        <div style={{borderTop:"1px solid #f0eeeb",paddingTop:8,display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,fontSize:11}}>
          <div><span style={{fontWeight:700,color:"#C62828"}}>Subj (future/uncertain):</span><br/><em>Te llamo cuando llegue.</em><br/><span style={{color:"#888"}}>I'll call you when I arrive.</span></div>
          <div><span style={{fontWeight:700,color:"#2E7D32"}}>Indic (past/fact):</span><br/><em>Te llamé cuando llegué.</em><br/><span style={{color:"#888"}}>I called you when I arrived.</span></div>
        </div>
        <div style={{borderTop:"1px solid #f0eeeb",paddingTop:8,marginTop:4,display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,fontSize:11}}>
          <div><span style={{fontWeight:700,color:"#C62828"}}>Aunque + subj:</span><br/><em>Aunque llueva, voy.</em><br/><span style={{color:"#888"}}>Even if it rains, I'll go. (uncertain)</span></div>
          <div><span style={{fontWeight:700,color:"#2E7D32"}}>Aunque + indic:</span><br/><em>Aunque llueve, voy.</em><br/><span style={{color:"#888"}}>Even though it's raining, I'll go. (fact)</span></div>
        </div>
      </div>
    </div>
    <Insight text="Irregulars in yo present indicative → irregular subjunctive base: tengo → tenga, digo → diga, salgo → salga. The 'yo-go' verbs carry their irregularity into ALL subjunctive forms."/>
    <div style={{background:"#EDE7F6",borderRadius:10,padding:"10px 14px",marginTop:8,border:"1.5px solid #D1C4E9",fontSize:12,color:"#4527A0",lineHeight:1.6}}>
      <strong>Bridge to past subjunctive:</strong> Polite requests like <em>Quisiera que…</em> and <em>Me gustaría que…</em> use the past subjunctive after a conditional verb — the trigger is the same desire/wish category, just expressed more softly. See Guide 29.
    </div>
  </div>);
}
