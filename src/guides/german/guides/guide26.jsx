import { DarkBox } from '../../../components/DarkBox';

export function Guide26(){
  const examples=[
    {parts:["Ich","gehe","heute","ins Kino."],labels:["1: Subject","2: VERB","...","..."],note:"Normal: subject first"},
    {parts:["Heute","gehe","ich","ins Kino."],labels:["1: Time","2: VERB","Subject flips","..."],note:"Inversion: verb stays at 2!"},
    {parts:["Ins Kino","gehe","ich","heute."],labels:["1: Place","2: VERB","Subject flips","Time"],note:"Anything can go first"},
  ];
  return(<div>
    <DarkBox title="The V2 Rule — the #1 rule of German"><div style={{fontSize:14}}>
      In a main clause, the conjugated verb is <strong style={{color:"#FFE77A"}}>ALWAYS in position 2</strong>. Anything can go in position 1, but the verb never moves from 2.
    </div></DarkBox>
    {examples.map((ex,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:6}}>
      <div style={{display:"flex",gap:4,marginBottom:4}}>
        {ex.parts.map((p,j)=>(<span key={j} style={{padding:"4px 8px",borderRadius:6,background:j===1?"#C62828":"#f5f3ef",color:j===1?"#fff":"#555",fontSize:14,fontWeight:j===1?800:600}}>{p}</span>))}
      </div>
      <div style={{display:"flex",gap:4}}>
        {ex.labels.map((l,j)=>(<span key={j} style={{fontSize:9,color:j===1?"#C62828":"#aaa",fontWeight:j===1?700:400,flex:1}}>{l}</span>))}
      </div>
    </div>))}
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#1565C0",marginBottom:6}}>The verb bracket (Satzklammer):</div>
      <div style={{fontSize:13,color:"#555",lineHeight:1.6}}>
        Ich <strong style={{color:"#C62828"}}>habe</strong> gestern ein Buch <strong style={{color:"#C62828"}}>gelesen</strong>.<br/>
        <span style={{fontSize:11,color:"#888"}}>Auxiliary at pos 2, participle at END. Everything sandwiched between.</span>
      </div>
    </div>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#1565C0",marginBottom:8}}>Time-Manner-Place (TeMaPla) — adverbials always in this order:</div>
      <div style={{display:"grid",gridTemplateColumns:"40px 1fr 1fr 1fr",gap:4,marginBottom:6,fontSize:10,fontWeight:700,color:"#999"}}>
        <div></div><div style={{color:"#E65100"}}>Time (wann?)</div><div style={{color:"#1565C0"}}>Manner (wie?)</div><div style={{color:"#2E7D32"}}>Place (wo?/wohin?)</div>
      </div>
      {[{s:"Ich fahre",t:"morgen",m:"mit dem Zug",p:"nach Berlin."},
        {s:"Er geht",t:"jeden Tag",m:"schnell",p:"zur Arbeit."},
        {s:"Sie hat",t:"gestern",m:"alleine",p:"im Park gesessen."},
      ].map((r,i)=>(<div key={i} style={{fontSize:12,marginBottom:4,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{color:"#555"}}>{r.s}</span>
        <span style={{background:"#FFF3E0",color:"#E65100",padding:"1px 6px",borderRadius:4,fontWeight:700}}>{r.t}</span>
        <span style={{background:"#E3F2FD",color:"#1565C0",padding:"1px 6px",borderRadius:4,fontWeight:700}}>{r.m}</span>
        <span style={{background:"#E8F5E9",color:"#2E7D32",padding:"1px 6px",borderRadius:4,fontWeight:700}}>{r.p}</span>
      </div>))}
      <div style={{fontSize:11,color:"#888",marginTop:6}}>Violating TeMaPla is grammatical but sounds unnatural to a native ear.</div>
    </div>
  </div>);
}
