import { DarkBox } from '../../../components/DarkBox';
import { Insight as Nota } from '../../../components/Insight';

export function Guide35(){
  const features=[
    {name:"Fusión pen/pin",desc:"'pen' y 'pin' suenan idénticos (ambos como 'pin'). Igual con 'ten/tin', 'hem/him'. Si alguien dice 'ink pen', están aclarando porque los sonidos se fusionan.",color:"#C62828"},
    {name:"Southern drawl",desc:"Las vocales se estiran y a veces se dividen: 'well' → 'we-ull', 'can't' → 'cay-unt', 'here' → 'he-yur'. No es habla perezosa — es un sistema fonológico distinto.",color:"#1565C0"},
    {name:"Y'all / All y'all",desc:"Y'all = ustedes (2+). All y'all = TODOS ustedes (énfasis). Nunca escribas 'ya'll' — el apóstrofo reemplaza 'ou' de 'you all'.",color:"#2E7D32"},
    {name:"Modales dobles",desc:"Might could = tal vez pueda. Might should = tal vez debería. Used to could = antes podía. Fixin' to = estoy a punto de. El inglés estándar solo permite UN modal. El sureño los acumula.",color:"#6A1B9A"},
    {name:"Vocabulario único",desc:"Carry = llevar a alguien en carro ('Carry me to Walmart'). Cut on/off = encender/apagar ('Cut the light on'). Mash = presionar ('Mash that button'). Holler = valle pequeño o gritar. Buggy = carrito de super. Coke = CUALQUIER refresco ('What kind of Coke?' 'Sprite').",color:"#E65100"},
    {name:"Sir y Ma'am",desc:"Se espera en TODAS las interacciones con desconocidos, mayores y autoridades. 'Yes sir' / 'Yes ma'am' — no es ser sumiso, es ser educado. A los niños se les corrige si no lo dicen. Usarlo muestra que entiendes la cultura local.",color:"#880E4F"},
  ];
  return(<div>
    <DarkBox title="Donde los Apalaches se encuentran con el Sur Profundo"><div style={{fontSize:13}}>Chattanooga está en la <strong style={{color:"#FFE77A"}}>encrucijada</strong> del inglés apalachino y sureño. El dialecto local mezcla ambas tradiciones, más su propio sabor.</div></DarkBox>
    {features.map((f,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:`2px solid ${f.color}20`,marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
        <div style={{width:4,height:24,borderRadius:2,background:f.color,flexShrink:0}}/>
        <span style={{fontSize:15,fontWeight:800,color:f.color}}>{f.name}</span>
      </div>
      <div style={{fontSize:12,color:"#555",lineHeight:1.6}}>{f.desc}</div>
    </div>))}
    <Nota text="El inglés de Chattanooga NO es 'mal inglés'. Es un dialecto distinto con sus propias reglas e historia. Entenderlo te ayuda a conectar con la comunidad y comprender lo que la gente realmente dice." />
  </div>);
}


// ═══════════════════════════════════════════════════════════════
// ARRAY DE COMPONENTES
// ═══════════════════════════════════════════════════════════════

export const guideComponents=[Guide1,Guide2,Guide3,Guide4,Guide5,Guide6,Guide7,Guide8,Guide9,Guide10,Guide11,Guide12,Guide13,Guide14,Guide15,Guide16,Guide17,Guide18,Guide19,Guide20,Guide21,Guide22,Guide23,Guide24,Guide25,Guide26,Guide27,Guide28,Guide29,Guide30,Guide31,Guide32,Guide33,Guide34,Guide35];
