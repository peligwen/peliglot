import { SimpleGuide } from '../../../components/SimpleGuide';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide25(){return(<div>
  <SimpleGuide items={[
  {h:"ما mā — negates past tense",b:"ما كَتَبَ = he did not write\nAlso negates present in some styles: ما يكتب"},
  {h:"لا lā — negates present tense",b:"لا أعرِفُ = I don't know\nAlso used for generic negation: لا إلهَ إلّا الله"},
  {h:"لم lam — negates past using jussive",b:"لم يَكتُبْ = he did not write (more formal than ما كتب)"},
  {h:"لن lan — negates future",b:"لن أكتُبَ = I will not write (uses subjunctive)"},
  {h:"ليس laysa — 'is not' (nominal negation)",b:"ليس كبيرًا = it is not big\nConjugates like a past-tense verb but means present\nThe predicate is in the accusative (كبيرًا not كبيرٌ)"},
  {h:"Palestinian Arabic negation",b:"ما...ش (mā...sh) wraps the verb: ما كتبش (ma katabsh) = he didn't write\nمش (mish) = is not: مش كبير (mish kbīr) = not big\nFuture negative: مش رح (mish raḥ) = will not"},
]}/>
  <ExpandSection title="Laysa conjugation (ليس) — full paradigm" color="#C62828">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #eee",fontSize:12,lineHeight:1.7}}>
      <p style={{margin:"0 0 8px",color:"#555"}}>ليس conjugates like a past-tense verb but means <strong>present</strong> negation. Its predicate is always accusative.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {[
          {p:"أنا",f:"لستُ",tr:"lastu",m:"I am not"},
          {p:"أنتَ",f:"لستَ",tr:"lasta",m:"you (m) are not"},
          {p:"أنتِ",f:"لستِ",tr:"lasti",m:"you (f) are not"},
          {p:"هُوَ",f:"ليسَ",tr:"laysa",m:"he is not"},
          {p:"هِيَ",f:"ليسَت",tr:"laysat",m:"she is not"},
          {p:"نحن",f:"لسنا",tr:"lasnā",m:"we are not"},
          {p:"أنتم",f:"لستُم",tr:"lastum",m:"you (pl.m) are not"},
          {p:"هُم",f:"ليسوا",tr:"laysū",m:"they (m) are not"},
        ].map((r,i)=>(<div key={i} style={{background:"#FFEBEE",borderRadius:7,padding:"7px 10px"}}>
          <div style={{fontSize:11,color:"#999",marginBottom:2}}>{r.p}</div>
          <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:16,direction:"rtl",color:"#C62828"}}>{r.f}</div>
          <div style={{fontSize:11,color:"#C62828",fontWeight:600}}>{r.tr}</div>
          <div style={{fontSize:11,color:"#555"}}>{r.m}</div>
        </div>))}
      </div>
      <div style={{background:"#FFF5F5",borderRadius:7,padding:"8px 10px",marginTop:8,fontSize:12}}>
        <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:14,direction:"rtl"}}>لستُ طالبًا</div>
        <div style={{color:"#555"}}>lastu ṭāliban — I am not a student (طالب → accusative طالبًا)</div>
      </div>
    </div>
  </ExpandSection>
</div>);}
