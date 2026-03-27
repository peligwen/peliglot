import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight as Nota } from '../../../components/Insight';

export function Guide15(){
  const uncountables=[{en:"information",es:"información"},{en:"advice",es:"consejo"},{en:"furniture",es:"muebles"},{en:"homework",es:"tarea"},{en:"research",es:"investigación"},{en:"news",es:"noticias"},{en:"travel",es:"viaje"},{en:"luggage",es:"equipaje"},{en:"progress",es:"progreso"},{en:"money",es:"dinero"}];
  return(<div>
    <DarkBox title="Contables vs Incontables"><div style={{fontSize:13}}>Algunos sustantivos que son contables en español son <strong style={{color:"#EF9A9A"}}>incontables en inglés</strong> — ¡NUNCA les pongas -s!</div></DarkBox>
    <Card color="#C62828" title="Incontables que SÍ son contables en español" subtitle="¡NUNCA les pongas -s!">
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:0}}>
        {uncountables.map((u,i)=>(<div key={i} style={{padding:"6px 14px",borderBottom:i<8?"1px solid #f0eeeb":"none",borderRight:i%2===0?"1px solid #f0eeeb":"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:14,fontWeight:700,color:"#C62828"}}>❌ {u.en}s</span>
          <span style={{fontSize:11,color:"#888"}}>{u.es}</span>
        </div>))}
      </div>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
      {[{q:"MUCH",use:"+ incontable",ex:"much water, much time",color:"#1565C0"},{q:"MANY",use:"+ contable",ex:"many books, many people",color:"#2E7D32"},{q:"A LOT OF",use:"+ ambos ✅",ex:"a lot of water, a lot of books",color:"#E65100"}].map(q=>(<div key={q.q} style={{background:q.color,borderRadius:10,padding:"10px",textAlign:"center",color:"#fff"}}>
        <div style={{fontSize:16,fontWeight:800}}>{q.q}</div>
        <div style={{fontSize:10,opacity:.8}}>{q.use}</div>
        <div style={{fontSize:10,fontStyle:"italic",opacity:.7,marginTop:2}}>{q.ex}</div>
      </div>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
      <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#1565C0",marginBottom:4}}>SOME en afirmativo</div>
        <div style={{fontSize:12,color:"#555"}}>I have some money. There's some water.</div>
      </div>
      <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#C62828",marginBottom:4}}>ANY en preguntas/negación</div>
        <div style={{fontSize:12,color:"#555"}}>Do you have any? I don't have any money.</div>
      </div>
    </div>
    <Nota text="A LOT OF funciona con contables e incontables — es la opción más segura si no estás seguro/a." />
  </div>);
}
