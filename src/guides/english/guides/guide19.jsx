import { DarkBox } from '../../../components/DarkBox';
import { Chatt } from './_helpers';

export function Guide19(){
  const solutions=[
    {term:"Y'all",region:"Sur (Chattanooga ✓)",desc:"Neutral en género, claro, cálido. Contracción de 'you all'. ALL Y'ALL = énfasis.",color:"#C62828"},
    {term:"You guys",region:"Norte / Oeste",desc:"El más común fuera del sur. Criticado por no ser neutral en género.",color:"#1565C0"},
    {term:"Youse",region:"Nueva York, Filadelfia",desc:"Regional, cada vez menos usado fuera de esas áreas.",color:"#6A1B9A"},
    {term:"Folks",region:"Nacional (creciendo)",desc:"Inclusivo, moderno, cada vez más adoptado en contextos profesionales.",color:"#2E7D32"},
  ];
  return(<div>
    <DarkBox title="El pronombre que falta"><div style={{fontSize:14}}>El inglés estándar NO tiene 'ustedes'. "You" es singular Y plural. Cada región lo resuelve diferente.</div></DarkBox>
    {solutions.map((s,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:`2px solid ${s.color}`,marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
        <span style={{fontSize:22,fontWeight:800,color:s.color}}>{s.term}</span>
        <span style={{fontSize:11,color:"#888",marginLeft:"auto"}}>{s.region}</span>
      </div>
      <div style={{fontSize:12,color:"#555"}}>{s.desc}</div>
    </div>))}
    <Chatt text="En Chattanooga, y'all NO es jerga — es el plural estándar de segunda persona. Úsalo. Nunca escribas 'ya'll' — el apóstrofo reemplaza 'ou' de 'you all'." />
  </div>);
}
