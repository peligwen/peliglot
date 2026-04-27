import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';
import { pronounsShort } from './_helpers';
import { irregVerbs, tenseKeys } from './data10';

const tenseLabels={present:"Presente",preterite:"Pretérito",imperfect:"Imperfecto",future:"Futuro",subjunctive:"Subjuntivo"};
const tColors={present:"#1B5E20",preterite:"#B71C1C",imperfect:"#1565C0",future:"#00695C",subjunctive:"#6A1B9A"};

export function Guide10(){
  type VerbKey = keyof typeof irregVerbs;
  type TenseKey = keyof typeof tenseLabels;
  const [sv,setSv]=useState<VerbKey>("ser");const [st,setSt]=useState<TenseKey>("present");const v=irregVerbs[sv];
  return(<div>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center",marginBottom:12}}>
      {(Object.keys(irregVerbs) as VerbKey[]).map(k=>(<button key={k} onClick={()=>setSv(k)} style={{padding:"6px 12px",borderRadius:8,border:sv===k?"2.5px solid #1a1a1a":"1.5px solid #ddd",background:sv===k?"#1a1a1a":"#fff",color:sv===k?"#FFE77A":"#555",cursor:"pointer",fontSize:12,fontWeight:700}}>{k}</button>))}
    </div>
    <div style={{textAlign:"center",marginBottom:12,fontSize:14,color:"#888"}}><strong style={{color:"#1a1a1a"}}>{sv}</strong> — {v.m}</div>
    <div style={{display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
      {(tenseKeys as TenseKey[]).map(t=>(<button key={t} onClick={()=>setSt(t)} style={{padding:"6px 12px",borderRadius:8,border:st===t?`2px solid ${tColors[t]}`:"1.5px solid #ddd",background:st===t?tColors[t]:"#fff",color:st===t?"#fff":"#666",cursor:"pointer",fontSize:11,fontWeight:700}}>{tenseLabels[t]}</button>))}
    </div>
    <Card color={tColors[st]} title={sv} subtitle={tenseLabels[st]}>
      {pronounsShort.map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"0 16px",height:42,borderBottom:i<5?"1px solid #f0eeeb":"none"}}>
        <div style={{width:60,fontSize:12,color:"#999"}}>{p}</div>
        <div style={{fontSize:18,fontWeight:700,color:tColors[st]}}>{v[st][i]}</div>
      </div>))}
    </Card>
    <Insight text="Ser & Ir share identical preterite forms. The imperfect only has 3 irregulars: ser, ir, ver."/>
    <div style={{background:"#FFF8E7",borderRadius:10,padding:"10px 14px",marginTop:8,border:"1px solid #F0E4C4",fontSize:12,color:"#8B6914",lineHeight:1.6}}>
      <strong>See also:</strong> venir, dar, ver, traer, querer, poner — all essential early-intermediate irregulars. Their stems follow the same patterns: <em>venir</em> (vine/vengo), <em>traer</em> (traje), <em>querer</em> (quise/quiero e→ie). Guide 9 covers boot-verb patterns (e→ie, o→ue).
    </div>
  </div>);
}
