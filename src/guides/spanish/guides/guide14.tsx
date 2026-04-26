import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { types } from './data14';

export function Guide14(){
  const [tab,setTab]=useState("sub");
  const t=types.find(x=>x.id===tab)!;
  return(<div>
    <DarkBox title="Pronoun System"><div style={{fontSize:13,lineHeight:1.7}}>
      Spanish has <strong>5 pronoun types</strong>. The form changes based on the pronoun's <em>role</em> in the sentence. Select a type below to see all forms with examples.
    </div></DarkBox>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",marginBottom:14}}>
      {types.map(ty=>(<button key={ty.id} onClick={()=>setTab(ty.id)} style={{padding:"6px 12px",borderRadius:8,border:tab===ty.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:tab===ty.id?ty.color:"#fff",color:tab===ty.id?"#fff":"#666",fontSize:11,fontWeight:700,cursor:"pointer"}}>{ty.label}</button>))}
    </div>
    <div style={{fontSize:12,color:t.color,fontWeight:600,textAlign:"center",marginBottom:10}}>{t.desc}</div>
    {t.data.map((d,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid #eee"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
        <span style={{fontSize:15,fontWeight:800,color:t.color}}>{d.p}</span>
        <span style={{fontSize:12,color:"#999"}}>{d.en}</span>
      </div>
      <div style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{d.ex}</div>
    </div>))}
    <div style={{background:t.color+"10",borderRadius:10,padding:"10px 14px",marginTop:8,border:`1.5px solid ${t.color}25`,fontSize:12,color:t.color,fontWeight:600}}>{t.tip}</div>
    <Insight text="🇲🇽 Vosotros is not used in Mexico or Latin America. Use ustedes for ALL plural 'you' — both formal and informal."/>
  </div>);
}
