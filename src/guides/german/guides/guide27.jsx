import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

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
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#1565C0",marginBottom:6}}>The "wait for the verb" experience:</div>
      <div style={{fontSize:12,color:"#555",lineHeight:1.6,fontStyle:"italic"}}>
        ...weil ich gestern Abend mit meinem besten Freund in einem neuen Restaurant in der Stadt gegessen <strong style={{color:"#C62828"}}>HABE</strong>.<br/>
        <span style={{fontStyle:"normal",color:"#888",fontSize:11}}>You hold everything in memory until the verb arrives. This is normal German.</span>
      </div>
    </div>
    <Insight text="Relative clauses also push the verb to the end: 'Der Mann, der dort steht, ist mein Bruder.' The relative pronoun (der/die/das) declines like articles." />
  </div>);
}
