const genderRules=[
  {g:"M",r:"Ending -O → masculine (99%)",ex:["el libro","el gato","el vaso"],exc:["la mano","la foto"]},
  {g:"F",r:"Ending -A → feminine (90%)",ex:["la casa","la mesa","la vida"],exc:["el día","el mapa","el problema","el tema"]},
  {g:"F",r:"-CIÓN/-SIÓN → always feminine",ex:["la nación","la educación","la televisión"],exc:[]},
  {g:"F",r:"-DAD/-TAD → always feminine",ex:["la ciudad","la libertad","la verdad"],exc:[]},
  {g:"M",r:"-AJE → always masculine",ex:["el viaje","el mensaje","el lenguaje"],exc:[]},
  {g:"M",r:"-OR → usually masculine",ex:["el color","el amor","el dolor"],exc:["la flor"]},
];

export function Guide11(){
  const mc="#1565C0",fc="#C62828";
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      <div style={{background:"#E3F2FD",borderRadius:12,padding:"14px",textAlign:"center",border:"2px solid #BBDEFB"}}>
        <div style={{fontSize:28,fontWeight:800,color:mc}}>EL</div><div style={{fontSize:12,color:mc,fontWeight:600}}>Masculino</div>
      </div>
      <div style={{background:"#FFEBEE",borderRadius:12,padding:"14px",textAlign:"center",border:"2px solid #FFCDD2"}}>
        <div style={{fontSize:28,fontWeight:800,color:fc}}>LA</div><div style={{fontSize:12,color:fc,fontWeight:600}}>Femenino</div>
      </div>
    </div>
    {genderRules.map((r,i)=>{const col=r.g==="M"?mc:fc;return(
      <div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 16px",marginBottom:8,border:"1px solid #eee"}}>
        <div style={{fontSize:13,fontWeight:700,color:col,marginBottom:6}}>{r.g==="M"?"♂":"♀"} {r.r}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{r.ex.map(e=>(<span key={e} style={{padding:"3px 10px",borderRadius:14,background:r.g==="M"?"#E3F2FD":"#FFEBEE",color:col,fontSize:12,fontWeight:600}}>{e}</span>))}</div>
        {r.exc.length>0&&<div style={{marginTop:6,display:"flex",flexWrap:"wrap",gap:5}}>{r.exc.map(e=>(<span key={e} style={{padding:"3px 10px",borderRadius:14,background:"#FFF8E7",color:"#8B6914",fontSize:11,fontWeight:600}}>⚠ {e}</span>))}</div>}
      </div>
    );})}
  </div>);
}
