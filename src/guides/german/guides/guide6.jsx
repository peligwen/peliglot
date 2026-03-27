import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide6(){
  const changes=[
    {g:"Masculine",nom:"der / ein",akk:"den / einen",changed:true},
    {g:"Feminine",nom:"die / eine",akk:"die / eine",changed:false},
    {g:"Neuter",nom:"das / ein",akk:"das / ein",changed:false},
    {g:"Plural",nom:"die / —",akk:"die / —",changed:false},
  ];
  return(<div>
    <Card color="#1565C0" title="Nominativ → Akkusativ" subtitle="Only masculine changes!">
      {changes.map((c,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 30px 1fr",padding:"10px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none",alignItems:"center"}}>
        <span style={{fontSize:12,fontWeight:700,color:c.changed?"#C62828":"#555"}}>{c.g}</span>
        <span style={{fontSize:14,color:"#888"}}>{c.nom}</span>
        <span style={{color:"#ccc",textAlign:"center"}}>→</span>
        <span style={{fontSize:14,fontWeight:c.changed?800:400,color:c.changed?"#C62828":"#888"}}>{c.akk}</span>
      </div>))}
    </Card>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:"#1565C0",marginBottom:6}}>Accusative prepositions (always accusative):</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
        {[{p:"für",m:"for"},{p:"gegen",m:"against"},{p:"ohne",m:"without"},{p:"um",m:"around"},{p:"durch",m:"through"},{p:"bis",m:"until"}].map(x=>(<span key={x.p} style={{padding:"4px 10px",borderRadius:8,background:"#E3F2FD",color:"#1565C0",fontSize:12,fontWeight:700,border:"1px solid #BBDEFB"}}>{x.p} <span style={{fontWeight:400,color:"#888"}}>({x.m})</span></span>))}
      </div>
      <div style={{fontSize:11,color:"#888",marginTop:6}}>Mnemonic: <strong>DOGFU</strong> — durch, ohne, gegen, für, um</div>
    </div>
    <Insight text="Good news: ONLY masculine articles change from Nominativ to Akkusativ. der→den, ein→einen. Everything else stays identical." />
  </div>);
}
