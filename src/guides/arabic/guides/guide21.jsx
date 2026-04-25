import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide21(){
  const forms=[
    {n:"II",pat:"فَعَّلَ / يُفَعِّلُ",meaning:"Causative / intensive",ex:"عَلَّمَ = he taught (from عَلِمَ = he knew)"},
    {n:"III",pat:"فاعَلَ / يُفاعِلُ",meaning:"Mutual / doing with someone",ex:"كاتَبَ = he corresponded (with)"},
    {n:"IV",pat:"أَفعَلَ / يُفعِلُ",meaning:"Causative (formal)",ex:"أَرسَلَ = he sent"},
    {n:"V",pat:"تَفَعَّلَ / يَتَفَعَّلُ",meaning:"Reflexive of II / gradual process",ex:"تَعَلَّمَ = he learned (taught himself) · تَطَوَّرَ = it developed"},
    {n:"VI",pat:"تَفاعَلَ / يَتَفاعَلُ",meaning:"Mutual / reciprocal",ex:"تَبادَلَ = they exchanged"},
    {n:"VII",pat:"اِنفَعَلَ / يَنفَعِلُ",meaning:"Passive / reflexive",ex:"اِنكَسَرَ = it broke (by itself)"},
    {n:"VIII",pat:"اِفتَعَلَ / يَفتَعِلُ",meaning:"Reflexive (common)",ex:"اِجتَمَعَ = they gathered"},
    {n:"IX",pat:"اِفعَلَّ / يَفعَلُّ",meaning:"Colors & defects",ex:"اِحمَرَّ = it turned red"},
    {n:"X",pat:"اِستَفعَلَ / يَستَفعِلُ",meaning:"Seek / consider / come to be",ex:"اِستَفسَرَ = he inquired (sought explanation) · اِستَطاعَ = he was able to"},
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
    <Insight text="Forms II and V are extremely common. If you know Form I, you can often guess Forms II (causative/intensive) and V (reflexive/process of II)."/>
    <ExpandSection title="Comparatives and Superlatives (أفعل التفضيل)" color="#6A1B9A">
      <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #eee",fontSize:12,lineHeight:1.7}}>
        <p style={{margin:"0 0 8px",color:"#555"}}>The <strong>elative pattern أَفعَل</strong> (same shape as Form IV) forms both comparatives and superlatives from adjectives.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          {[
            {ar:"كَبير → أَكبَر",tr:"kabīr → akbar",m:"big → bigger / biggest"},
            {ar:"جَميل → أَجمَل",tr:"jamīl → ajmal",m:"beautiful → more/most beautiful"},
            {ar:"صَغير → أَصغَر",tr:"ṣaghīr → aṣghar",m:"small → smaller / smallest"},
            {ar:"كَثير → أَكثَر",tr:"kathīr → akthar",m:"many → more / most"},
          ].map((ex,i)=>(<div key={i} style={{background:"#F3E5F5",borderRadius:7,padding:"8px 10px"}}>
            <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:15,direction:"rtl",color:"#6A1B9A"}}>{ex.ar}</div>
            <div style={{fontSize:11,color:"#6A1B9A",fontWeight:600}}>{ex.tr}</div>
            <div style={{fontSize:11,color:"#555"}}>{ex.m}</div>
          </div>))}
        </div>
        <div style={{background:"#EDE7F6",borderRadius:7,padding:"8px 10px",fontSize:12}}>
          <div style={{marginBottom:4,fontWeight:700,color:"#6A1B9A"}}>Usage:</div>
          <div style={{marginBottom:2}}><strong>Comparative:</strong> أَكبَر مِن (akbar min) = bigger than</div>
          <div style={{marginBottom:2}}><strong>Superlative:</strong> الأَكبَر (al-akbar) = the biggest</div>
          <div><strong>Note:</strong> أَفعَل is a diptote — takes fatḥa (not kasra) in genitive position.</div>
        </div>
      </div>
    </ExpandSection>
  </div>);
}
