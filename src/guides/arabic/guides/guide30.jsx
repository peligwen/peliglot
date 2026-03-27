import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide30(){
  const roots=[
    {root:"ك ت ب",meaning:"writing",words:[{ar:"كَتَبَ",tr:"kataba",m:"he wrote"},{ar:"كِتاب",tr:"kitāb",m:"book"},{ar:"كاتِب",tr:"kātib",m:"writer"},{ar:"مَكتوب",tr:"maktūb",m:"written/letter"},{ar:"مَكتَب",tr:"maktab",m:"office/desk"},{ar:"مَكتَبة",tr:"maktaba",m:"library"},{ar:"كِتابة",tr:"kitāba",m:"writing (act)"}]},
    {root:"د ر س",meaning:"studying",words:[{ar:"دَرَسَ",tr:"darasa",m:"he studied"},{ar:"دَرس",tr:"dars",m:"lesson"},{ar:"مُدَرِّس",tr:"mudarris",m:"teacher"},{ar:"مَدرَسة",tr:"madrasa",m:"school"},{ar:"دِراسة",tr:"dirāsa",m:"study"}]},
    {root:"ع ل م",meaning:"knowledge",words:[{ar:"عَلِمَ",tr:"'alima",m:"he knew"},{ar:"عِلم",tr:"'ilm",m:"science/knowledge"},{ar:"عالَم",tr:"'ālam",m:"world"},{ar:"عالِم",tr:"'ālim",m:"scholar"},{ar:"مُعَلِّم",tr:"mu'allim",m:"teacher"},{ar:"تَعليم",tr:"ta'līm",m:"education"},{ar:"مَعلومات",tr:"ma'lūmāt",m:"information"}]},
    {root:"ك ب ر",meaning:"bigness",words:[{ar:"كَبُرَ",tr:"kabura",m:"he grew big"},{ar:"كَبير",tr:"kabīr",m:"big"},{ar:"أَكبَر",tr:"akbar",m:"bigger/greatest"},{ar:"كِبار",tr:"kibār",m:"elders"},{ar:"تَكبير",tr:"takbīr",m:"magnification"}]},
    {root:"ح ب ب",meaning:"love",words:[{ar:"أَحَبَّ",tr:"aḥabba",m:"he loved"},{ar:"حُبّ",tr:"ḥubb",m:"love"},{ar:"حَبيب",tr:"ḥabīb",m:"beloved"},{ar:"مَحبوب",tr:"maḥbūb",m:"loved/popular"}]},
  ];
  const [selRoot,setSelRoot]=useState(0);
  const r=roots[selRoot];
  return(<div>
    <DarkBox title="The Root System — Arabic's Superpower"><div style={{fontSize:13,lineHeight:1.6}}>
      Most Arabic words derive from <strong style={{color:"#FFE77A"}}>3-consonant roots</strong>. Learn one root and you can recognize — or guess — dozens of related words.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:14,justifyContent:"center",flexWrap:"wrap"}}>
      {roots.map((rt,i)=>(<button key={i} onClick={()=>setSelRoot(i)} style={{padding:"6px 12px",borderRadius:8,border:selRoot===i?"2.5px solid #1B5E20":"1.5px solid #ddd",background:selRoot===i?"#1B5E20":"#fff",color:selRoot===i?"#fff":"#555",cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"'Noto Sans Arabic',serif",direction:"rtl"}}>{rt.root}</button>))}
    </div>
    <Card color="#1B5E20" title={`Root: ${r.root}`} subtitle={r.meaning}>
      {r.words.map((w,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"70px 80px 1fr",alignItems:"center",padding:"8px 14px",borderBottom:i<r.words.length-1?"1px solid #f0eeeb":"none",gap:8}}>
        <span style={{fontSize:20,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1B5E20",direction:"rtl",textAlign:"center"}}>{w.ar}</span>
        <span style={{fontSize:12,color:"#888"}}>{w.tr}</span>
        <span style={{fontSize:12,color:"#555"}}>{w.m}</span>
      </div>))}
    </Card>
    <Insight text="This is why Arabic vocabulary builds exponentially. Learn the root ك-ت-ب and you instantly have hooks for book, writer, office, library, letter, writing..."/>
  </div>);
}
