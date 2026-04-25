import { useState } from 'react';
import { Card } from '../../../components/Card';

export function Guide30(){
  const falsos=[
    {es:"actualmente",parece:"actually",real:"currently",bien:"Actually = en realidad",d:5},
    {es:"asistir",parece:"assist",real:"to attend",bien:"Assist = ayudar",d:5},
    {es:"embarazada",parece:"embarrassed",real:"pregnant",bien:"Embarrassed = avergonzado/a",d:5},
    {es:"realizar",parece:"realize",real:"to carry out",bien:"Realize = darse cuenta",d:4},
    {es:"sensible",parece:"sensible",real:"sensitive",bien:"Sensible = sensato/a",d:4},
    {es:"éxito",parece:"exit",real:"success",bien:"Exit = salida",d:4},
    {es:"librería",parece:"library",real:"bookstore",bien:"Library = biblioteca",d:4},
    {es:"constipado",parece:"constipated",real:"having a cold",bien:"Constipated = estreñido",d:5},
    {es:"soportar",parece:"support",real:"to tolerate",bien:"Support = apoyar",d:4},
    {es:"molestar",parece:"molest",real:"to bother",bien:"Molest = abusar (¡MUY diferente!)",d:5},
  ];
  const dColors={5:"#C62828",4:"#E65100"};
  const [search,setSearch]=useState("");
  const filtered=falsos.filter(f=>f.es.includes(search.toLowerCase())||f.parece.includes(search.toLowerCase()));
  return(<div>
    <Card color="#E65100" title="Errores estructurales que todos cometemos">
      {[{wrong:"She is a beautiful car",right:"IT is a beautiful car",rule:"Objetos = siempre 'it'. No filtres el género del español."},
        {wrong:"I don't have nothing",right:"I don't have anything",rule:"Solo UNA negación en inglés estándar. (Nota: la doble negación ES normal en dialectos sureños, AAVE y habla coloquial — pero evítala en contextos formales.)"},
        {wrong:"People is nice here",right:"People ARE nice here",rule:"'People' = siempre plural."},
        {wrong:"Is cold today",right:"IT is cold today",rule:"Sujeto vacío (it/there) es obligatorio siempre."},
        {wrong:"I am agree",right:"I agree",rule:"'Agree' ya es verbo — no necesita 'am'."},
      ].map((e,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none"}}>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><span style={{color:"#C62828",fontSize:13}}>❌ {e.wrong}</span><span style={{color:"#2E7D32",fontSize:13}}>✅ {e.right}</span></div>
        <div style={{fontSize:11,color:"#888",marginTop:2}}>{e.rule}</div>
      </div>))}
    </Card>
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Buscar falso amigo..." style={{width:"100%",padding:"8px 14px",borderRadius:10,border:"1.5px solid #ddd",fontSize:13,marginBottom:8,outline:"none"}}/>
    <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:8}}>
      <div style={{fontSize:12,fontWeight:700,color:"#1565C0",marginBottom:6}}>Ortografía AmE vs BrE (el inglés americano es este curso):</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,fontSize:11}}>
        {[{ame:"-ize (realize, organize)",bre:"-ise (BrE)"},
          {ame:"-or (color, favor, honor)",bre:"-our (BrE: colour)"},
          {ame:"-er (center, theater)",bre:"-re (BrE: centre)"},
          {ame:"traveling, canceled",bre:"travelling, cancelled (BrE)"},
        ].map((p,i)=>(<div key={i} style={{background:"#E3F2FD",borderRadius:6,padding:"4px 8px",color:"#1565C0"}}>
          <strong>AmE:</strong> {p.ame}<br/><span style={{color:"#888",fontSize:10}}>{p.bre}</span>
        </div>))}
      </div>
      <div style={{fontSize:11,color:"#888",marginTop:4}}>Si lees contenido en inglés de todo el mundo, verás ambas formas. La ortografía AmE es la estándar en EEUU.</div>
    </div>
    <Card color="#C62828" title={`Falsos Amigos (${filtered.length})`}>
      {filtered.map((f,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"7px 14px",borderBottom:i<filtered.length-1?"1px solid #f0eeeb":"none",gap:8}}>
        <div style={{width:5,height:5,borderRadius:"50%",background:dColors[f.d],flexShrink:0}}/>
        <div style={{flex:1}}><span style={{fontWeight:700,color:dColors[f.d]}}>{f.es}</span> <span style={{color:"#ccc"}}>≠</span> <span style={{color:"#999",textDecoration:"line-through"}}>{f.parece}</span><br/><span style={{fontSize:11,color:"#888"}}>{f.bien}</span></div>
      </div>))}
    </Card>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍAS 31-35: PRÁCTICO — TODO VISIBLE
// ═══════════════════════════════════════════════════════════════
