import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide21(){
  const forms=[
    {n:"II",pat:"فَعَّلَ / يُفَعِّلُ",meaning:"Causative / intensive",ex:"عَلَّمَ = he taught (from عَلِمَ = he knew)"},
    {n:"III",pat:"فاعَلَ / يُفاعِلُ",meaning:"Mutual / doing with someone",ex:"كاتَبَ = he corresponded (with)"},
    {n:"IV",pat:"أَفعَلَ / يُفعِلُ",meaning:"Causative (formal)",ex:"أَرسَلَ = he sent"},
    {n:"V",pat:"تَفَعَّلَ / يَتَفَعَّلُ",meaning:"Reflexive of II",ex:"تَعَلَّمَ = he learned (taught himself)"},
    {n:"VI",pat:"تَفاعَلَ / يَتَفاعَلُ",meaning:"Mutual / pretending",ex:"تَبادَلَ = they exchanged"},
    {n:"VII",pat:"اِنفَعَلَ / يَنفَعِلُ",meaning:"Passive / reflexive",ex:"اِنكَسَرَ = it broke (by itself)"},
    {n:"VIII",pat:"اِفتَعَلَ / يَفتَعِلُ",meaning:"Reflexive (common)",ex:"اِجتَمَعَ = they gathered"},
    {n:"IX",pat:"اِفعَلَّ / يَفعَلُّ",meaning:"Colors & defects",ex:"اِحمَرَّ = it turned red"},
    {n:"X",pat:"اِستَفعَلَ / يَستَفعِلُ",meaning:"Seeking / considering",ex:"اِستَخدَمَ = he used (sought service)"},
  ];
  return(<div>
    <DarkBox title="9 Derived Verb Forms"><div style={{fontSize:13}}>
      Form I (فَعَلَ) is the base. Forms II–X add prefixes, double letters, or extra consonants to shift meaning systematically.
    </div></DarkBox>
    {forms.map((f,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee",marginBottom:5}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{background:"#6A1B9A",color:"#fff",padding:"2px 8px",borderRadius:5,fontSize:12,fontWeight:800}}>{f.n}</span>
        <span style={{fontSize:15,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#6A1B9A",direction:"rtl"}}>{f.pat}</span>
        <span style={{fontSize:11,color:"#888",marginLeft:"auto"}}>{f.meaning}</span>
      </div>
      <div style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{f.ex}</div>
    </div>))}
    <Insight text="Forms II and V are extremely common. If you know Form I, you can often guess Forms II (causative/intensive) and V (reflexive of II)."/>
  </div>);
}
