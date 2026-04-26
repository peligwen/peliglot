import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide27(){
  const conjunctions=["dass (that)","weil (because)","wenn (if/when)","ob (whether)","obwohl (although)","als (when-past)","bevor (before)","nachdem (after)","bis (until)"];
  return(<div>
    <DarkBox title="Subordinate clause = verb goes to the END"><div style={{fontSize:14}}>
      Ich weiß, <strong style={{color:"#FFE77A"}}>dass er morgen kommt</strong>.<br/>
      <span style={{color:"#aaa",fontSize:12}}>= I know that he is coming tomorrow. Verb 'kommt' at the END.</span>
    </div></DarkBox>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:16,justifyContent:"center"}}>
      {conjunctions.map(c=>(<span key={c} style={{padding:"5px 12px",borderRadius:8,background:"#E3F2FD",color:"#1565C0",fontSize:12,fontWeight:700,border:"1px solid #BBDEFB"}}>{c}</span>))}
    </div>
    <div style={{background:"#E8F5E9",borderRadius:10,padding:"10px 14px",border:"1px solid #A5D6A7",marginBottom:12}}>
      <span style={{fontSize:13,fontWeight:700,color:"#2E7D32"}}>Quick rule: </span>
      <span style={{fontSize:13,color:"#555"}}>Comma + subordinator (dass/weil/wenn/…) → verb moves to the <strong style={{color:"#C62828"}}>END</strong></span>
    </div>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#1565C0",marginBottom:6}}>The "wait for the verb" experience:</div>
      <div style={{fontSize:12,color:"#555",lineHeight:1.6,fontStyle:"italic"}}>
        ...weil ich gestern Abend mit meinem besten Freund in einem neuen Restaurant in der Stadt gegessen <strong style={{color:"#C62828"}}>HABE</strong>.<br/>
        <span style={{fontStyle:"normal",color:"#888",fontSize:11}}>You hold everything in memory until the verb arrives. This is normal German.</span>
      </div>
    </div>
    <Insight text="Relative clauses also push the verb to the end: 'Der Mann, der dort steht, ist mein Bruder.' The relative pronoun (der/die/das) declines like articles." />
  <ExpandSection title="Coordinating vs. Subordinating conjunctions" color="#1565C0">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #e0dcd5",marginBottom:8}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <div style={{background:"#E8F5E9",borderRadius:8,padding:"8px 10px"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#2E7D32",marginBottom:4}}>Coordinating — NO verb-final</div>
          <div style={{fontSize:12,color:"#555"}}>und, oder, aber, sondern, denn</div>
          <div style={{fontSize:11,color:"#777",marginTop:4,fontStyle:"italic"}}>Ich komme, <strong>denn</strong> ich habe Zeit.</div>
        </div>
        <div style={{background:"#E3F2FD",borderRadius:8,padding:"8px 10px"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#1565C0",marginBottom:4}}>Subordinating — verb to END</div>
          <div style={{fontSize:12,color:"#555"}}>dass, weil, wenn, ob, obwohl, als…</div>
          <div style={{fontSize:11,color:"#777",marginTop:4,fontStyle:"italic"}}>Ich komme, <strong>weil</strong> ich Zeit <strong style={{color:"#C62828"}}>habe</strong>.</div>
        </div>
      </div>
      <div style={{fontSize:12,color:"#555",background:"#FFF3E0",borderRadius:6,padding:"8px 10px",border:"1px solid #FFE082"}}>
        <strong style={{color:"#E65100"}}>denn vs. weil</strong> — both mean "because" but:<br/>
        <em>denn</em> = coordinating → verb stays at position 2<br/>
        <em>weil</em> = subordinating → verb goes to the end<br/>
        <span style={{fontSize:11,color:"#aaa"}}>This is the single most famous word-order trap in German.</span>
      </div>
    </div>
  </ExpandSection>
  <ExpandSection title="wenn vs. als vs. wann — three 'when' words" color="#1565C0">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #e0dcd5"}}>
      {[{word:"wenn",use:"if · OR when (present/future OR repeated past)",ex:"Wenn ich nach Hause komme, koche ich. (whenever I come home...)",ex2:"Immer wenn ich jung war, spielte ich draußen. (whenever I was young...)"},
        {word:"als",use:"when — single completed past event only",ex:"Als ich nach Hause kam, schlief der Hund. (that one time...)"},
        {word:"wann",use:"when? — only in questions and indirect questions",ex:"Wann kommst du? · Ich weiß nicht, wann er kommt."}].map((r,i)=>(<div key={i} style={{paddingBottom:i<2?12:0,marginBottom:i<2?12:0,borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
        <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:4}}>
          <span style={{fontSize:15,fontWeight:800,color:"#1565C0",minWidth:44}}>{r.word}</span>
          <span style={{fontSize:12,color:"#555"}}>{r.use}</span>
        </div>
        <div style={{fontSize:12,color:"#777",fontStyle:"italic",marginLeft:52}}>{r.ex}</div>
        {r.ex2&&<div style={{fontSize:12,color:"#aaa",fontStyle:"italic",marginLeft:52}}>{r.ex2}</div>}
      </div>))}
      <div style={{fontSize:11,color:"#888",marginTop:10,background:"#E3F2FD",borderRadius:6,padding:"6px 10px"}}>The <strong>wenn/als</strong> distinction is one of the most common L2 errors. When in doubt about a single past event: use <strong>als</strong>.</div>
    </div>
  </ExpandSection>
  </div>);
}
