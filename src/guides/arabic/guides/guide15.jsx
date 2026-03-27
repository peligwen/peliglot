import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide15(){
  const pronouns=[
    {ar:"أنا",tr:"anā",m:"I",p:"ana"},{ar:"أنتَ",tr:"anta",m:"you (m)",p:"inte/inta"},{ar:"أنتِ",tr:"anti",m:"you (f)",p:"inti"},
    {ar:"هُوَ",tr:"huwa",m:"he",p:"huwwe"},{ar:"هِيَ",tr:"hiya",m:"she",p:"hiyye"},
    {ar:"نَحنُ",tr:"naḥnu",m:"we",p:"iḥna"},{ar:"أنتُم",tr:"antum",m:"you (pl.m)",p:"intu"},
    {ar:"هُم",tr:"hum",m:"they (m)",p:"humme"},{ar:"هُنَّ",tr:"hunna",m:"they (f)",p:"humme (same)"},
  ];
  return(<div>
    <Card color="#1B5E20" title="Personal Pronouns" subtitle="الضمائر المنفصلة">
      {pronouns.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"60px 70px 80px 1fr",alignItems:"center",padding:"8px 14px",borderBottom:i<pronouns.length-1?"1px solid #f0eeeb":"none",gap:6}}>
        <span style={{fontSize:20,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1B5E20",direction:"rtl",textAlign:"center"}}>{p.ar}</span>
        <span style={{fontSize:12,color:"#888"}}>{p.tr}</span>
        <span style={{fontSize:13,fontWeight:600,color:"#333"}}>{p.m}</span>
        <span style={{fontSize:11,color:"#2E7D32",fontStyle:"italic"}}>🇵🇸 {p.p}</span>
      </div>))}
    </Card>
    <Insight text="MSA has separate dual pronouns (أنتما, هما) and feminine plurals (أنتنّ, هنّ). Palestinian Arabic simplifies: أنتم/هم cover all plurals."/>
  </div>);
}
