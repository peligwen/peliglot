import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide8(){
  const preps=["an","auf","hinter","in","neben","über","unter","vor","zwischen"];
  const [mode,setMode]=useState("akk");
  const akkEx=[{p:"in",ex:"Ich gehe in den Park.",m:"I'm going into the park."},{p:"auf",ex:"Er legt das Buch auf den Tisch.",m:"He puts the book onto the table."},{p:"an",ex:"Sie hängt das Bild an die Wand.",m:"She hangs the picture on the wall."}];
  const datEx=[{p:"in",ex:"Ich bin in dem (im) Park.",m:"I'm in the park."},{p:"auf",ex:"Das Buch liegt auf dem Tisch.",m:"The book is on the table."},{p:"an",ex:"Das Bild hängt an der Wand.",m:"The picture hangs on the wall."}];
  const examples=mode==="akk"?akkEx:datEx;
  return(<div>
    <DarkBox title="9 prepositions, 2 possible cases"><div style={{fontSize:14}}>
      <strong style={{color:"#EF9A9A"}}>Motion/direction → Akkusativ (wohin?)</strong><br/>
      <strong style={{color:"#90CAF9"}}>Location/state → Dativ (wo?)</strong>
    </div></DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:12,justifyContent:"center"}}>
      <button onClick={()=>setMode("akk")} style={{padding:"8px 18px",borderRadius:10,border:mode==="akk"?"2.5px solid #C62828":"1.5px solid #ddd",background:mode==="akk"?"#C62828":"#fff",color:mode==="akk"?"#fff":"#666",cursor:"pointer",fontWeight:700}}>Akkusativ (wohin? →)</button>
      <button onClick={()=>setMode("dat")} style={{padding:"8px 18px",borderRadius:10,border:mode==="dat"?"2.5px solid #1565C0":"1.5px solid #ddd",background:mode==="dat"?"#1565C0":"#fff",color:mode==="dat"?"#fff":"#666",cursor:"pointer",fontWeight:700}}>Dativ (wo? •)</button>
    </div>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center",marginBottom:14}}>
      {preps.map(p=>(<span key={p} style={{padding:"6px 12px",borderRadius:16,background:mode==="akk"?"#FFEBEE":"#E3F2FD",color:mode==="akk"?"#C62828":"#1565C0",fontSize:14,fontWeight:700,border:"1px solid "+(mode==="akk"?"#FFCDD2":"#BBDEFB")}}>{p}</span>))}
    </div>
    <Card color={mode==="akk"?"#C62828":"#1565C0"} title={mode==="akk"?"Akkusativ = movement INTO/ONTO":"Dativ = already THERE"}>
      {examples.map((e,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:14,fontWeight:700,color:mode==="akk"?"#C62828":"#1565C0",fontStyle:"italic"}}>{e.ex}</div>
        <div style={{fontSize:12,color:"#888"}}>{e.m}</div>
      </div>))}
    </Card>
    <Insight text="If there's a CHANGE of position (going somewhere) = accusative. If the position is STATIC (being somewhere) = dative." />
  <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
    <div style={{fontSize:12,fontWeight:700,color:"#555",marginBottom:8}}>Canonical verb pairs — direction vs. location:</div>
    {[{akk:"legen (lay → Akk)",dat:"liegen (lie/be → Dat)",ex1:"Ich lege das Buch auf den Tisch.",ex2:"Das Buch liegt auf dem Tisch."},
      {akk:"stellen (stand upright → Akk)",dat:"stehen (be standing → Dat)",ex1:"Ich stelle die Flasche in den Kühlschrank.",ex2:"Die Flasche steht im Kühlschrank."},
      {akk:"setzen (set/seat → Akk)",dat:"sitzen (sit/be seated → Dat)",ex1:"Ich setze das Kind auf den Stuhl.",ex2:"Das Kind sitzt auf dem Stuhl."},
      {akk:"hängen (hang, transitive → Akk)",dat:"hängen (hang, intransitive → Dat)",ex1:"Ich hänge das Bild an die Wand.",ex2:"Das Bild hängt an der Wand."},
    ].map((p,i)=>(<div key={i} style={{paddingBottom:8,marginBottom:8,borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <div style={{display:"flex",gap:4,marginBottom:4}}>
        <span style={{padding:"2px 8px",borderRadius:5,background:"#FFEBEE",color:"#C62828",fontSize:11,fontWeight:700}}>{p.akk}</span>
        <span style={{color:"#ccc",fontSize:11,alignSelf:"center"}}>↔</span>
        <span style={{padding:"2px 8px",borderRadius:5,background:"#E3F2FD",color:"#1565C0",fontSize:11,fontWeight:700}}>{p.dat}</span>
      </div>
      <div style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{p.ex1}</div>
      <div style={{fontSize:12,color:"#777",fontStyle:"italic"}}>{p.ex2}</div>
    </div>))}
  </div>
  </div>);
}
