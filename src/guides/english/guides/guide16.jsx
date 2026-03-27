import { Card } from '../../../components/Card';

export function Guide16(){
  const irregPlurals=[{s:"man",p:"men"},{s:"woman",p:"women"},{s:"child",p:"children"},{s:"tooth",p:"teeth"},{s:"foot",p:"feet"},{s:"mouse",p:"mice"},{s:"person",p:"people"},{s:"sheep",p:"sheep"},{s:"fish",p:"fish"}];
  return(<div>
    <Card color="#2E7D32" title="Plurales regulares">
      {[{rule:"Regla general: + s",ex:"book → books · car → cars · dog → dogs",color:"#2E7D32"},{rule:"-ch/-sh/-s/-x/-z: + es",ex:"watch → watches · bus → buses · box → boxes",color:"#1565C0"},{rule:"Consonante + y → -ies",ex:"city → cities · baby → babies · party → parties",color:"#6A1B9A"},{rule:"-f/-fe → -ves",ex:"knife → knives · wife → wives · leaf → leaves",color:"#E65100"}].map((r,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none",borderLeft:`4px solid ${r.color}`}}>
        <div style={{fontSize:13,fontWeight:700,color:r.color}}>{r.rule}</div>
        <div style={{fontSize:12,color:"#888",fontStyle:"italic"}}>{r.ex}</div>
      </div>))}
    </Card>
    <Card color="#C62828" title="Plurales irregulares (¡memoriza!)">
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:0}}>
        {irregPlurals.map((w,i)=>(<div key={i} style={{padding:"8px 10px",borderBottom:i<6?"1px solid #f0eeeb":"none",borderRight:(i%3<2)?"1px solid #f0eeeb":"none",textAlign:"center"}}>
          <span style={{fontSize:13,color:"#999"}}>{w.s}</span>
          <span style={{color:"#ccc",margin:"0 4px"}}>→</span>
          <span style={{fontSize:13,fontWeight:700,color:"#C62828"}}>{w.p}</span>
        </div>))}
      </div>
    </Card>
    <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:12,fontWeight:700,color:"#6A1B9A",marginBottom:4}}>Siempre plurales (sin forma singular):</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
        {["pants","jeans","shorts","glasses","scissors","stairs"].map(w=>(<span key={w} style={{padding:"3px 10px",borderRadius:8,background:"#EDE7F6",color:"#6A1B9A",fontSize:12,fontWeight:600,border:"1px solid #D1C4E9"}}>{w}</span>))}
      </div>
      <div style={{fontSize:11,color:"#888",marginTop:4}}>Usa 'a pair of': a pair of pants, a pair of scissors</div>
    </div>
  </div>);
}
