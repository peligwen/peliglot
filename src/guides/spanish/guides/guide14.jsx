import { Insight } from '../../../components/Insight';

export function Guide14(){
  const data=[
    {p:"1st sing",sub:"yo",do:"me",io:"me",ref:"me",prep:"mí / conmigo"},
    {p:"2nd sing",sub:"tú",do:"te",io:"te",ref:"te",prep:"ti / contigo"},
    {p:"3rd sing",sub:"él/ella/Ud.",do:"lo/la",io:"le",ref:"se",prep:"él/ella/Ud."},
    {p:"1st plur",sub:"nosotros/as",do:"nos",io:"nos",ref:"nos",prep:"nosotros/as"},
    {p:"3rd plur",sub:"ellos/Uds.",do:"los/las",io:"les",ref:"se",prep:"ellos/Uds."},
  ];
  return(<div>
    <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #eee",marginBottom:16}}>
      <div style={{background:"#1565C0",padding:"12px 16px",color:"#fff",fontSize:14,fontWeight:700}}>Pronoun Map</div>
      <div style={{overflowX:"auto"}}><div style={{minWidth:480}}>
        <div style={{display:"grid",gridTemplateColumns:"70px repeat(5,1fr)",padding:"6px 12px",borderBottom:"2px solid #eee"}}>
          <div/>{["Subject","D.O.","I.O.","Reflexive","After prep."].map(h=>(<div key={h} style={{textAlign:"center",fontSize:9,fontWeight:700,color:"#999",textTransform:"uppercase"}}>{h}</div>))}
        </div>
        {data.map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"70px repeat(5,1fr)",padding:"6px 12px",borderBottom:i<data.length-1?"1px solid #f0eeeb":"none"}}>
          <div style={{fontSize:9,color:"#aaa",display:"flex",alignItems:"center"}}>{r.p}</div>
          {[r.sub,r.do,r.io,r.ref,r.prep].map((v,j)=>(<div key={j} style={{textAlign:"center",fontSize:12,fontWeight:600,color:"#333"}}>{v}</div>))}
        </div>))}
      </div></div>
    </div>
    <Insight text="1st & 2nd person: me/te/nos are the same for DO, IO, and reflexive. 3rd person is where it splits: lo/la (DO), le (IO), se (reflexive)."/>
    <Insight text="🇲🇽 Vosotros is not used in Mexico. Use ustedes for all 'you plural'."/>
  </div>);
}
