import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';
import { pronouns6 } from './_helpers';

const haberForms={pp:{l:"Presente Perfecto",f:["he","has","ha","hemos","habéis","han"],c:"#1B5E20"},plup:{l:"Pluscuamperfecto",f:["había","habías","había","habíamos","habíais","habían"],c:"#4A148C"},futP:{l:"Futuro Perfecto",f:["habré","habrás","habrá","habremos","habréis","habrán"],c:"#E65100"},condP:{l:"Condicional Perfecto",f:["habría","habrías","habría","habríamos","habríais","habrían"],c:"#01579B"},ppS:{l:"Perfecto Subjuntivo",f:["haya","hayas","haya","hayamos","hayáis","hayan"],c:"#880E4F"},plupS:{l:"Pluscuamp. Subj.",f:["hubiera","hubieras","hubiera","hubiéramos","hubierais","hubieran"],c:"#3E2723"}};

const perfectUses={
  pp:{use:"Actions with present relevance",ex:"He viajado a España.",en:"I have traveled to Spain.",tip:"Like English present perfect. Often with ya, todavía, nunca, alguna vez."},
  plup:{use:"Action completed before another past action",ex:"Cuando llegué, ya habían comido.",en:"When I arrived, they had already eaten.",tip:"The 'earlier past' — sets up what happened before the main past event."},
  futP:{use:"Action that will be done by a future point",ex:"Para las 5, habré terminado.",en:"By 5:00, I will have finished.",tip:"Also used for probability: 'Habrá salido' = He must have left."},
  condP:{use:"Would have done (hypothetical past)",ex:"Habría ido, pero llovía.",en:"I would have gone, but it was raining.",tip:"Often paired with si + pluperfect subjunctive: Si hubiera sabido, habría venido."},
  ppS:{use:"Subjunctive: hoping/doubting something happened",ex:"Espero que hayan llegado bien.",en:"I hope they've arrived safely.",tip:"Triggered by subjunctive triggers (esperar, dudar, ojalá) + a completed action."},
  plupS:{use:"Hypothetical about a completed past event",ex:"Si hubiera estudiado, habría aprobado.",en:"If I had studied, I would have passed.",tip:"The 'if only' tense — for regrets and contrary-to-fact past conditions."},
};

export function Guide8(){
  const [at,setAt]=useState("pp");const t=haberForms[at];const u=perfectUses[at];
  return(<div>
    <DarkBox title="One Formula, Six Tenses"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>HABER</strong> (conjugated) + <strong>PARTICIPIO</strong> (-ado/-ido)<br/>
      <span style={{color:"#aaa",fontSize:12}}>The participle never changes — only haber conjugates!</span>
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:5}}>
      {Object.entries(haberForms).slice(0,3).map(([k,v])=>(<button key={k} onClick={()=>setAt(k)} style={{padding:"8px 4px",borderRadius:8,border:at===k?`2.5px solid ${v.c}`:"1.5px solid #ddd",background:at===k?v.c:"#fff",color:at===k?"#fff":"#555",cursor:"pointer",fontSize:10,fontWeight:700,textAlign:"center",lineHeight:1.2}}>{v.l}</button>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:16}}>
      {Object.entries(haberForms).slice(3).map(([k,v])=>(<button key={k} onClick={()=>setAt(k)} style={{padding:"8px 4px",borderRadius:8,border:at===k?`2.5px solid ${v.c}`:"1.5px solid #ddd",background:at===k?v.c:"#fff",color:at===k?"#fff":"#555",cursor:"pointer",fontSize:10,fontWeight:700,textAlign:"center",lineHeight:1.2}}>{v.l}</button>))}
    </div>
    <Card color={t.c} title={t.l} subtitle="hablar → hablado">
      {pronouns6.map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"0 16px",height:44,borderBottom:i<5?"1px solid #f0eeeb":"none"}}>
        <div style={{width:110,fontSize:12,color:"#999"}}>{p}</div>
        <div style={{fontSize:16,fontWeight:700}}><span style={{color:t.c}}>{t.f[i]}</span><span style={{color:"#ccc",margin:"0 6px"}}>+</span><span>hablado</span></div>
      </div>))}
    </Card>
    <Card color={t.c} title={"When to Use: "+t.l} subtitle={u.use}>
      <div style={{padding:"12px 16px"}}>
        <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{u.ex}</div>
        <div style={{fontSize:13,color:"#888",marginBottom:10}}>{u.en}</div>
        <div style={{background:`${t.c}10`,borderRadius:8,padding:"10px 12px",border:`1px solid ${t.c}25`,fontSize:12,color:"#555",lineHeight:1.5}}>{u.tip}</div>
      </div>
    </Card>
    <Insight text="Never separate haber from the participle! 'No he comido' (correct) — nothing goes between them except 'no'."/>
  </div>);
}
