import { Card } from '../../../components/Card';
import { Trampa } from './_helpers';

export function Guide33(){
  const conversions=[{us:"°F",metric:"°C",rule:"32°F = 0°C · 72°F = agradable · 100°F = muy caliente",icon:"🌡"},{us:"millas",metric:"km",rule:"1 milla ≈ 1.6 km",icon:"🛣"},{us:"libras (lbs)",metric:"kg",rule:"1 lb ≈ 0.45 kg · 150 lbs ≈ 68 kg",icon:"⚖"},{us:"pies/pulgadas",metric:"cm",rule:"5'10\" = 178 cm · 6' = 183 cm",icon:"📏"},{us:"galones",metric:"litros",rule:"1 galón ≈ 3.8 litros",icon:"🥛"}];
  return(<div>
    <Card color="#1565C0" title="Sistema imperial (perdón)">
      {conversions.map((c,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"30px 80px 50px 1fr",alignItems:"center",padding:"8px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none",gap:6}}>
        <span style={{fontSize:18}}>{c.icon}</span>
        <span style={{fontSize:13,fontWeight:700,color:"#1565C0"}}>{c.us}</span>
        <span style={{fontSize:11,color:"#aaa"}}>{c.metric}</span>
        <span style={{fontSize:11,color:"#888"}}>{c.rule}</span>
      </div>))}
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
      <Card color="#C62828" title="Propinas (¡obligatorias!)">
        {[{place:"Restaurantes",tip:"18-20%"},{place:"Cafeterías",tip:"$1-2"},{place:"Peluquería",tip:"15-20%"},{place:"Uber/Lyft",tip:"15-20%"}].map((t,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none",fontSize:12}}>
          <span style={{color:"#555"}}>{t.place}</span><span style={{fontWeight:700,color:"#C62828"}}>{t.tip}</span>
        </div>))}
      </Card>
      <Card color="#E65100" title="Dinero">
        {[{n:"$4.99",say:"'four ninety-nine'"},{n:"$20",say:"'twenty bucks' (casual)"},{n:"25¢",say:"a quarter"},{n:"10¢ / 5¢",say:"a dime / a nickel"}].map((m,i)=>(<div key={i} style={{padding:"5px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none",fontSize:12}}>
          <span style={{fontWeight:700,color:"#E65100"}}>{m.n}</span> = <span style={{color:"#555"}}>{m.say}</span>
        </div>))}
      </Card>
    </div>
    <Trampa text="Fechas: Mes/Día/Año (03/15 = 15 de marzo). Reloj: 12 horas AM/PM. NO dejar propina = MUY grosero. Código de área Chattanooga: 423." />
  </div>);
}
