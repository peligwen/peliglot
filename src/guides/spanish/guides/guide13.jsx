import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide13(){
  const [gen,setGen]=useState("m");const [num,setNum]=useState("s");
  const adjs=[
    {base:"alto",forms:{ms:"alto",fs:"alta",mp:"altos",fp:"altas"},en:"tall",type:"4-form"},
    {base:"rojo",forms:{ms:"rojo",fs:"roja",mp:"rojos",fp:"rojas"},en:"red",type:"4-form"},
    {base:"grande",forms:{ms:"grande",fs:"grande",mp:"grandes",fp:"grandes"},en:"big",type:"2-form"},
    {base:"difícil",forms:{ms:"difícil",fs:"difícil",mp:"difíciles",fp:"difíciles"},en:"difficult",type:"2-form"},
    {base:"español",forms:{ms:"español",fs:"española",mp:"españoles",fp:"españolas"},en:"Spanish",type:"nationality"},
  ];
  const key=gen+num;const nouns={ms:"el chico",fs:"la chica",mp:"los chicos",fp:"las chicas"};
  const col=gen==="m"?"#1565C0":"#AD1457";
  const shifts=[{a:"pobre",before:"unfortunate",after:"poor (no money)"},{a:"viejo",before:"long-time (friend)",after:"elderly"},{a:"grande/gran",before:"great",after:"big (size)"},{a:"nuevo",before:"another/different",after:"brand-new"},{a:"único",before:"only",after:"unique"}];
  return(<div>
    <DarkBox title="Agreement Rule"><div style={{fontSize:14}}>Adjectives must match the noun in <strong style={{color:"#90CAF9"}}>gender</strong> and <strong style={{color:"#FFE77A"}}>number</strong>. Toggle below to see how they change.</div></DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:10,justifyContent:"center"}}>
      {[{k:"m",l:"Masculine",c:"#1565C0"},{k:"f",l:"Feminine",c:"#AD1457"}].map(g=>(<button key={g.k} onClick={()=>setGen(g.k)} style={{flex:1,maxWidth:160,padding:"10px",borderRadius:10,border:gen===g.k?`2.5px solid ${g.c}`:"1.5px solid #ddd",background:gen===g.k?g.c:"#fff",color:gen===g.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{g.l}</button>))}
    </div>
    <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
      {[{k:"s",l:"Singular"},{k:"p",l:"Plural"}].map(n=>(<button key={n.k} onClick={()=>setNum(n.k)} style={{flex:1,maxWidth:160,padding:"10px",borderRadius:10,border:num===n.k?`2.5px solid ${col}`:"1.5px solid #ddd",background:num===n.k?col:"#fff",color:num===n.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{n.l}</button>))}
    </div>
    <Card color={col} title={nouns[key]} subtitle="adjective forms">
      {adjs.map((a,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"8px 16px",borderBottom:i<adjs.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{flex:1}}><span style={{fontSize:16,fontWeight:700,color:col}}>{a.forms[key]}</span></div>
        <div style={{fontSize:11,color:"#999"}}>{a.en}</div>
        <div style={{marginLeft:8,padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:700,background:a.type==="4-form"?"#E3F2FD":a.type==="2-form"?"#F3E5F5":"#FFF3E0",color:a.type==="4-form"?"#1565C0":a.type==="2-form"?"#6A1B9A":"#E65100"}}>{a.type}</div>
      </div>))}
    </Card>
    <Card color="#1a1a1a" title="Placement: Before vs After = Meaning Shift">
      {shifts.map((s,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",alignItems:"center",padding:"8px 16px",borderBottom:i<shifts.length-1?"1px solid #f0eeeb":"none",fontSize:12}}>
        <span style={{fontWeight:800,color:"#333"}}>{s.a}</span>
        <span style={{color:"#2E7D32"}}>before = {s.before}</span>
        <span style={{color:"#C62828"}}>after = {s.after}</span>
      </div>))}
    </Card>
    <Insight text="Default position is AFTER the noun: 'la casa roja'. Before the noun adds subjective or emotional emphasis: 'la hermosa vista'."/>
  </div>);
}
