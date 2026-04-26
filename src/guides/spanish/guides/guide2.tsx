import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { stressRules, minPairs } from './data2';

export function Guide2(){
  const [ar,setAr]=useState("agudas"); const [sp,setSp]=useState<number|null>(null);
  const rule=stressRules.find(r=>r.id===ar)!;
  return(<div>
    <DarkBox title="The Two Default Rules"><div style={{fontSize:14,lineHeight:1.7}}>
      <span style={{color:"#FFE77A"}}>①</span> Ends in <strong>vowel, -n, -s</strong> → stress 2nd-to-last<br/>
      <span style={{color:"#FFE77A"}}>②</span> Ends in <strong>anything else</strong> → stress last<br/>
      <span style={{color:"#aaa",fontSize:12,fontStyle:"italic"}}>An accent mark means the word breaks these defaults.</span>
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:16}}>
      {stressRules.map(r=>(<button key={r.id} onClick={()=>setAr(r.id)} style={{padding:"10px 6px",borderRadius:10,border:ar===r.id?`2.5px solid ${r.color}`:"1.5px solid #ddd",background:ar===r.id?r.color:"#fff",color:ar===r.id?"#fff":"#555",cursor:"pointer",textAlign:"center"}}>
        <div style={{fontSize:14,fontWeight:800}}>{r.name}</div><div style={{fontSize:10,marginTop:2,opacity:.8}}>{r.rule}</div>
      </button>))}
    </div>
    <Card color={rule.color} title={rule.name} subtitle={rule.when}>
      {rule.examples.map((ex,i)=>{const syls=ex.word.split("·");return(
        <div key={i} style={{display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:i<rule.examples.length-1?"1px solid #f5f3ef":"none"}}>
          <div style={{flex:1,display:"flex",gap:3}}>{syls.map((s,si)=>(<span key={si} style={{padding:"4px 8px",borderRadius:6,fontSize:15,fontWeight:si===ex.s?800:400,color:si===ex.s?rule.color:"#999",background:si===ex.s?`${rule.color}15`:"transparent",border:si===ex.s?`1.5px solid ${rule.color}`:"1.5px solid transparent"}}>{s}</span>))}</div>
          <div style={{width:24,height:24,borderRadius:"50%",background:ex.a?rule.color:"#f0eeeb",color:ex.a?"#fff":"#ccc",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,margin:"0 10px"}}>{ex.a?"´":"—"}</div>
          <div style={{fontSize:12,color:"#999",minWidth:60,textAlign:"right"}}>{ex.m}</div>
        </div>
      );})}
    </Card>
    <Card color="#1a1a1a" title="⚡ Minimal Pairs — Accent Changes Meaning">
      {minPairs.map((p,i)=>(<div key={i} onClick={()=>setSp(sp===i?null:i)} style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center",padding:"10px 16px",borderBottom:i<minPairs.length-1?"1px solid #f5f3ef":"none",cursor:"pointer",background:sp===i?"#FFF8E7":"transparent"}}>
        <div style={{textAlign:"center"}}><div style={{fontSize:18,color:"#999"}}>{p.w1}</div><div style={{fontSize:11,color:"#aaa"}}>{p.m1}</div></div>
        <div style={{width:30,height:30,borderRadius:"50%",background:"#E63946",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,margin:"0 8px"}}>vs</div>
        <div style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:700,color:"#E63946"}}>{p.w2}</div><div style={{fontSize:11,color:"#aaa"}}>{p.m2}</div></div>
      </div>))}
    </Card>
  </div>);
}
