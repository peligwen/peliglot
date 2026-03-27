import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide16(){
  const [io,setIo]=useState(0);const [sing,setSing]=useState(true);
  const ios=["me","te","le","nos","les"];const enSubj=["I","you","he/she","we","they"];
  return(<div>
    <DarkBox title="The Mental Shift"><div style={{fontSize:13,lineHeight:1.6}}>
      English: <strong style={{color:"#90CAF9"}}>I</strong> like <strong style={{color:"#EF9A9A"}}>tacos</strong><br/>
      Spanish: <strong style={{color:"#EF9A9A"}}>Tacos</strong> are pleasing <strong style={{color:"#90CAF9"}}>to me</strong><br/>
      <span style={{color:"#888",fontSize:11}}>The thing liked is the real subject!</span>
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:10,justifyContent:"center",flexWrap:"wrap"}}>
      {ios.map((p,i)=>(<button key={i} onClick={()=>setIo(i)} style={{padding:"7px 14px",borderRadius:8,border:io===i?"2.5px solid #D84315":"1.5px solid #ddd",background:io===i?"#D84315":"#fff",color:io===i?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{p}</button>))}
    </div>
    <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
      <button onClick={()=>setSing(true)} style={{flex:1,maxWidth:150,padding:"10px",borderRadius:8,border:sing?"2.5px solid #2E7D32":"1.5px solid #ddd",background:sing?"#2E7D32":"#fff",color:sing?"#fff":"#666",cursor:"pointer",fontWeight:700}}>GUSTA<br/><span style={{fontSize:10,fontWeight:400}}>1 thing</span></button>
      <button onClick={()=>setSing(false)} style={{flex:1,maxWidth:150,padding:"10px",borderRadius:8,border:!sing?"2.5px solid #1565C0":"1.5px solid #ddd",background:!sing?"#1565C0":"#fff",color:!sing?"#fff":"#666",cursor:"pointer",fontWeight:700}}>GUSTAN<br/><span style={{fontSize:10,fontWeight:400}}>2+ things</span></button>
    </div>
    <div style={{background:"#FAFAF5",borderRadius:12,padding:"16px",textAlign:"center",border:"1px solid #eee",marginBottom:16}}>
      <div style={{fontSize:22,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:6,flexWrap:"wrap"}}>
        <span style={{color:"#D84315",background:"#FFF3E0",padding:"3px 8px",borderRadius:5}}>{ios[io]}</span>
        <span style={{color:sing?"#2E7D32":"#1565C0",background:sing?"#E8F5E9":"#E3F2FD",padding:"3px 8px",borderRadius:5}}>{sing?"gusta":"gustan"}</span>
        <span style={{color:"#333"}}>{sing?"el chocolate":"los tacos"}</span>
      </div>
      <div style={{fontSize:13,color:"#888",marginTop:6,fontStyle:"italic"}}>{enSubj[io]} like{io===2?"s":""} {sing?"chocolate":"tacos"}</div>
    </div>
    <Insight text="Only two verb forms matter: gusta (1 thing/infinitive) and gustan (plural). Similar verbs: encantar, interesar, importar, molestar, doler, parecer."/>
  </div>);
}
