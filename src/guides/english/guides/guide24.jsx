import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Chatt } from './_helpers';

export function Guide24(){
  const [mode,setMode]=useState("time");
  const rules={time:[
    {prep:"IN",use:"Meses, años, estaciones, partes del día",items:["in January","in 2024","in summer","in the morning"],color:"#C62828"},
    {prep:"ON",use:"Días, fechas específicas",items:["on Monday","on July 4th","on my birthday","on weekends"],color:"#E65100"},
    {prep:"AT",use:"Horas, comidas, 'night'",items:["at 3 o'clock","at noon","at night","at Christmas"],color:"#1565C0"},
  ],place:[
    {prep:"IN",use:"Espacios cerrados, ciudades, países",items:["in the room","in Chattanooga","in the US","in a car"],color:"#C62828"},
    {prep:"ON",use:"Superficies, calles, pisos, transporte público",items:["on the table","on Main St","on the 2nd floor","on the bus"],color:"#E65100"},
    {prep:"AT",use:"Puntos específicos, direcciones, eventos",items:["at the door","at 123 Main St","at school","at the party"],color:"#1565C0"},
  ]};
  return(<div>
    <DarkBox title="Sin lógica, solo memoriza"><div style={{fontSize:13}}>Estas tres preposiciones son la parte más frustrante del inglés. Las reglas son <strong style={{color:"#EF9A9A"}}>mayormente arbitrarias</strong>.</div></DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:14,justifyContent:"center"}}>
      {[{k:"time",l:"⏰ Tiempo"},{k:"place",l:"📍 Lugar"}].map(m=>(<button key={m.k} onClick={()=>setMode(m.k)} style={{flex:1,maxWidth:180,padding:"10px",borderRadius:10,border:mode===m.k?"2.5px solid #C62828":"1.5px solid #ddd",background:mode===m.k?"#C62828":"#fff",color:mode===m.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{m.l}</button>))}
    </div>
    {rules[mode].map((r,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,overflow:"hidden",border:`2px solid ${r.color}`,marginBottom:8}}>
      <div style={{background:r.color,padding:"8px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{color:"#fff",fontSize:20,fontWeight:800}}>{r.prep}</span>
        <span style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>{r.use}</span>
      </div>
      <div style={{padding:"8px 14px",display:"flex",flexWrap:"wrap",gap:4}}>
        {r.items.map((e,j)=>(<span key={j} style={{padding:"4px 10px",borderRadius:8,background:`${r.color}10`,color:r.color,fontSize:12,fontWeight:600,border:`1px solid ${r.color}20`}}>{e}</span>))}
      </div>
    </div>))}
    <Chatt text="'Over yonder' = por allá. 'Up the road a piece' = a poca distancia. 'Down the mountain' = en el valle." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍAS 25-26: PREPOSICIONES Y CONECTORES
// ═══════════════════════════════════════════════════════════════
