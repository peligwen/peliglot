import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';
import { pronounsShort } from './_helpers';

const irregVerbs={
  ser:{m:"to be (perm)",present:["soy","eres","es","somos","sois","son"],preterite:["fui","fuiste","fue","fuimos","fuisteis","fueron"],imperfect:["era","eras","era","éramos","erais","eran"],future:["seré","serás","será","seremos","seréis","serán"],subjunctive:["sea","seas","sea","seamos","seáis","sean"]},
  estar:{m:"to be (state)",present:["estoy","estás","está","estamos","estáis","están"],preterite:["estuve","estuviste","estuvo","estuvimos","estuvisteis","estuvieron"],imperfect:["estaba","estabas","estaba","estábamos","estabais","estaban"],future:["estaré","estarás","estará","estaremos","estaréis","estarán"],subjunctive:["esté","estés","esté","estemos","estéis","estén"]},
  ir:{m:"to go",present:["voy","vas","va","vamos","vais","van"],preterite:["fui","fuiste","fue","fuimos","fuisteis","fueron"],imperfect:["iba","ibas","iba","íbamos","ibais","iban"],future:["iré","irás","irá","iremos","iréis","irán"],subjunctive:["vaya","vayas","vaya","vayamos","vayáis","vayan"]},
  tener:{m:"to have",present:["tengo","tienes","tiene","tenemos","tenéis","tienen"],preterite:["tuve","tuviste","tuvo","tuvimos","tuvisteis","tuvieron"],imperfect:["tenía","tenías","tenía","teníamos","teníais","tenían"],future:["tendré","tendrás","tendrá","tendremos","tendréis","tendrán"],subjunctive:["tenga","tengas","tenga","tengamos","tengáis","tengan"]},
  hacer:{m:"to do/make",present:["hago","haces","hace","hacemos","hacéis","hacen"],preterite:["hice","hiciste","hizo","hicimos","hicisteis","hicieron"],imperfect:["hacía","hacías","hacía","hacíamos","hacíais","hacían"],future:["haré","harás","hará","haremos","haréis","harán"],subjunctive:["haga","hagas","haga","hagamos","hagáis","hagan"]},
  poder:{m:"can/able",present:["puedo","puedes","puede","podemos","podéis","pueden"],preterite:["pude","pudiste","pudo","pudimos","pudisteis","pudieron"],imperfect:["podía","podías","podía","podíamos","podíais","podían"],future:["podré","podrás","podrá","podremos","podréis","podrán"],subjunctive:["pueda","puedas","pueda","podamos","podáis","puedan"]},
  saber:{m:"to know",present:["sé","sabes","sabe","sabemos","sabéis","saben"],preterite:["supe","supiste","supo","supimos","supisteis","supieron"],imperfect:["sabía","sabías","sabía","sabíamos","sabíais","sabían"],future:["sabré","sabrás","sabrá","sabremos","sabréis","sabrán"],subjunctive:["sepa","sepas","sepa","sepamos","sepáis","sepan"]},
  decir:{m:"to say",present:["digo","dices","dice","decimos","decís","dicen"],preterite:["dije","dijiste","dijo","dijimos","dijisteis","dijeron"],imperfect:["decía","decías","decía","decíamos","decíais","decían"],future:["diré","dirás","dirá","diremos","diréis","dirán"],subjunctive:["diga","digas","diga","digamos","digáis","digan"]},
};
const tenseKeys=["present","preterite","imperfect","future","subjunctive"];
const tenseLabels={present:"Presente",preterite:"Pretérito",imperfect:"Imperfecto",future:"Futuro",subjunctive:"Subjuntivo"};
const tColors={present:"#1B5E20",preterite:"#B71C1C",imperfect:"#1565C0",future:"#00695C",subjunctive:"#6A1B9A"};

export function Guide10(){
  const [sv,setSv]=useState("ser");const [st,setSt]=useState("present");const v=irregVerbs[sv];
  return(<div>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center",marginBottom:12}}>
      {Object.keys(irregVerbs).map(k=>(<button key={k} onClick={()=>setSv(k)} style={{padding:"6px 12px",borderRadius:8,border:sv===k?"2.5px solid #1a1a1a":"1.5px solid #ddd",background:sv===k?"#1a1a1a":"#fff",color:sv===k?"#FFE77A":"#555",cursor:"pointer",fontSize:12,fontWeight:700}}>{k}</button>))}
    </div>
    <div style={{textAlign:"center",marginBottom:12,fontSize:14,color:"#888"}}><strong style={{color:"#1a1a1a"}}>{sv}</strong> — {v.m}</div>
    <div style={{display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
      {tenseKeys.map(t=>(<button key={t} onClick={()=>setSt(t)} style={{padding:"6px 12px",borderRadius:8,border:st===t?`2px solid ${tColors[t]}`:"1.5px solid #ddd",background:st===t?tColors[t]:"#fff",color:st===t?"#fff":"#666",cursor:"pointer",fontSize:11,fontWeight:700}}>{tenseLabels[t]}</button>))}
    </div>
    <Card color={tColors[st]} title={sv} subtitle={tenseLabels[st]}>
      {pronounsShort.map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"0 16px",height:42,borderBottom:i<5?"1px solid #f0eeeb":"none"}}>
        <div style={{width:60,fontSize:12,color:"#999"}}>{p}</div>
        <div style={{fontSize:18,fontWeight:700,color:tColors[st]}}>{v[st][i]}</div>
      </div>))}
    </Card>
    <Insight text="Ser & Ir share identical preterite forms. The imperfect only has 3 irregulars: ser, ir, ver."/>
  </div>);
}
