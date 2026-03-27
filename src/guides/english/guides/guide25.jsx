import { DarkBox } from '../../../components/DarkBox';
import { Trampa } from './_helpers';

export function Guide25(){
  const pairs=[
    {en:"depend ON",es:"depender DE",color:"#C62828"},{en:"consist OF",es:"consistir EN",color:"#1565C0"},
    {en:"interested IN",es:"interesado EN",color:"#2E7D32"},{en:"dream ABOUT",es:"soñar CON",color:"#6A1B9A"},
    {en:"married TO",es:"casado CON",color:"#E65100"},{en:"worry ABOUT",es:"preocuparse POR",color:"#880E4F"},
    {en:"listen TO",es:"escuchar ∅",color:"#C62828"},{en:"look AT",es:"mirar ∅",color:"#1565C0"},
    {en:"wait FOR",es:"esperar ∅",color:"#2E7D32"},{en:"arrive IN/AT",es:"llegar A (¡nunca TO!)",color:"#E65100"},
  ];
  return(<div>
    <DarkBox title="No coinciden con el español"><div style={{fontSize:13}}>Las preposiciones que acompañan a cada verbo son <strong style={{color:"#EF9A9A"}}>diferentes en cada idioma</strong>. Memorízalas como unidad.</div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
      {pairs.map((p,i)=>(<div key={i} style={{background:"#fff",borderRadius:8,padding:"8px 10px",border:`1.5px solid ${p.color}20`,textAlign:"center"}}>
        <div style={{fontSize:14,fontWeight:800,color:p.color}}>{p.en}</div>
        <div style={{fontSize:11,color:"#888",marginTop:2}}>{p.es}</div>
      </div>))}
    </div>
    <Trampa text="❌ I arrived TO Chattanooga. ✅ I arrived IN Chattanooga (ciudad). ✅ I arrived AT the airport (punto). Nunca 'arrive to'." />
  </div>);
}
