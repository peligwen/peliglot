import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide21(){
  const dirs=[
    {p:"mai",dir:"Toward the speaker",ex:"E hele mai! = Come (toward me)!\nHa\u02BBawi mai = Give (to me)",color:"#C62828",arrow:"\u2190"},
    {p:"aku",dir:"Away from the speaker",ex:"E hele aku! = Go (away from me)!\nHa\u02BBawi aku = Give (to someone else)",color:"#0D47A1",arrow:"\u2192"},
    {p:"a\u02BBe",dir:"Upward / next / more",ex:"E pi\u02BBi a\u02BBe = Go up more\nK\u0113ia mua a\u02BBe = the next one",color:"#2E7D32",arrow:"\u2191"},
    {p:"iho",dir:"Downward / self / less",ex:"E iho iho = Come down\nnoho iho = sit yourself down",color:"#6A1B9A",arrow:"\u2193"},
  ];
  return(<div>
    <DarkBox title="Uniquely Hawaiian"><div style={{fontSize:13}}>
      These four particles add <strong style={{color:"#FFE77A"}}>direction, degree, or perspective</strong> to verbs. They come right after the verb.
    </div></DarkBox>
    {dirs.map((d,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:`2px solid ${d.color}`,marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
        <span style={{fontSize:24,color:d.color}}>{d.arrow}</span>
        <span style={{fontSize:18,fontWeight:800,color:d.color,fontStyle:"italic",fontFamily:"'Georgia',serif"}}>{d.p}</span>
        <span style={{fontSize:12,color:"#888"}}>{d.dir}</span>
      </div>
      <div style={{fontSize:12,color:"#555",lineHeight:1.5,fontStyle:"italic"}}>{d.ex}</div>
    </div>))}
    <Insight text="The mai/aku distinction is one of the most important in Hawaiian. 'Hele mai' = come (to me). 'Hele aku' = go (away from me). The same verb, different direction."/>
  </div>);
}
