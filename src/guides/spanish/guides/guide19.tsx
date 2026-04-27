import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { groups } from './data19';

export function Guide19(){
  type GroupKey = keyof typeof groups;
  const [tab,setTab]=useState<GroupKey>("a");const g=groups[tab];
  return(<div>
    <DarkBox title="Verb + Preposition Pairs"><div style={{fontSize:13,lineHeight:1.7}}>
      Many Spanish verbs require a <strong>specific preposition</strong> that doesn't match English. Others need <strong>no preposition</strong> where English requires one.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:14}}>
      {(Object.entries(groups) as [GroupKey, typeof groups[GroupKey]][]).map(([k,v])=>(<button key={k} onClick={()=>setTab(k)} style={{padding:"6px 14px",borderRadius:8,border:tab===k?"2px solid #1a1a1a":"1.5px solid #ddd",background:tab===k?v.color:"#fff",color:tab===k?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{v.prep}</button>))}
    </div>
    {g.verbs.map(v=>(<div key={v.v} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid #eee"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
        <span style={{fontSize:14,fontWeight:700,color:g.color}}>{v.v}</span>
        <span style={{fontSize:12,color:"#555"}}>{v.m}</span>
      </div>
      <div style={{fontSize:12,color:"#888",fontStyle:"italic",marginTop:2}}>{v.ex}</div>
    </div>))}
    <Insight text="Pensar changes meaning with preposition: pensar EN = think about (Pienso en ti), pensar DE = have opinion of (¿Qué piensas de esto?)"/>
  </div>);
}
