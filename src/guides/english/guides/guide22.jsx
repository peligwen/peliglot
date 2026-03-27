import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Chatt } from './_helpers';

export function Guide22(){
  const [mode,setMode]=useState("short");
  const tables={
    short:{title:"Cortos: -er / -est",data:[{b:"tall",c:"taller",s:"tallest"},{b:"big",c:"bigger",s:"biggest"},{b:"happy",c:"happier",s:"happiest"},{b:"nice",c:"nicer",s:"nicest"},{b:"hot",c:"hotter",s:"hottest"}],color:"#E65100"},
    long:{title:"Largos (2+ sílabas): more / most",data:[{b:"beautiful",c:"more beautiful",s:"most beautiful"},{b:"interesting",c:"more interesting",s:"most interesting"},{b:"expensive",c:"more expensive",s:"most expensive"},{b:"important",c:"more important",s:"most important"}],color:"#1565C0"},
    irreg:{title:"Irregulares (memoriza)",data:[{b:"good",c:"better",s:"best"},{b:"bad",c:"worse",s:"worst"},{b:"far",c:"farther",s:"farthest"},{b:"little",c:"less",s:"least"},{b:"much/many",c:"more",s:"most"}],color:"#C62828"},
  };
  const t=tables[mode];
  return(<div>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {Object.entries(tables).map(([k,v])=>(<button key={k} onClick={()=>setMode(k)} style={{flex:1,maxWidth:160,padding:"8px",borderRadius:10,border:mode===k?`2.5px solid ${v.color}`:"1.5px solid #ddd",background:mode===k?v.color:"#fff",color:mode===k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:12}}>{v.title.split(":")[0]}</button>))}
    </div>
    <Card color={t.color} title={t.title}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}><div>Base</div><div>Comparativo</div><div>Superlativo</div></div>
      {t.data.map((a,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"7px 14px",borderBottom:i<t.data.length-1?"1px solid #f0eeeb":"none",fontSize:13}}>
        <span style={{color:"#888"}}>{a.b}</span>
        <span style={{fontWeight:700,color:t.color}}>{a.c}</span>
        <span style={{fontWeight:700,color:"#6A1B9A"}}>{a.s}</span>
      </div>))}
    </Card>
    <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:13,fontWeight:700,color:"#2E7D32",marginBottom:4}}>Comparaciones con as...as:</div>
      <div style={{fontSize:13,color:"#555"}}>She's <strong>as tall as</strong> me. = Es tan alta como yo.<br/>It's <strong>not as cold as</strong> yesterday. = No hace tanto frío como ayer.</div>
    </div>
    <Chatt text="Intensificadores sureños: 'right' = muy ('right cold'), 'real' = realmente ('real nice'), 'plumb' = completamente ('plumb crazy')." />
  </div>);
}
