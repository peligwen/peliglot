import { SimpleGuide } from '../../../components/SimpleGuide';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide28(){return(<div>
  <SimpleGuide items={[
  {h:"Numbers 1-10",b:"١ واحد · ٢ اثنان · ٣ ثلاثة · ٤ أربعة · ٥ خمسة\n٦ ستّة · ٧ سبعة · ٨ ثمانية · ٩ تسعة · ١٠ عشرة"},
  {h:"⚠ The gender REVERSAL (3-10)",b:"With masculine nouns: use FEMININE number form\nثلاثةُ كُتُبٍ = three books (كتاب is masc, so ثلاثة with ة)\nWith feminine nouns: use MASCULINE number form\nثلاثُ مُدَرِّساتٍ = three female teachers (no ة!)"},
  {h:"Numbers 13-19: units reverse, tens agree",b:"Unit reverses gender (like 3-10); tens AGREES with noun gender\nثلاثةَ عَشَرَ كتابًا = 13 books (masc noun: unit ثلاثة fem, tens عَشَرَ masc)\nثلاثَ عَشْرَةَ مدرسةً = 13 schools (fem noun: unit ثلاث masc, tens عَشْرَةَ fem)\nCounted noun: singular accusative indefinite (كتابًا not كتبًا)"},
  {h:"Tens and round numbers",b:"عِشرون 20 · ثلاثون 30 · أربعون 40 · خمسون 50\nستّون 60 · سبعون 70 · ثمانون 80 · تِسعون 90\nمِئة 100 · مِئتان 200 · ألف 1000 · ألفان 2000"},
  {h:"Palestinian Arabic numbers",b:"Often use same forms but simplified: تلاتة tlāte (3), أربعة ʾarbaʿa (4)\nGender reversal is less strict in daily speech"},
]}/>
  <ExpandSection title="Numbers 100+ and Compounds" color="#C62828">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #eee",fontSize:12,lineHeight:1.7}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        {[
          {ar:"مِئة",tr:"miʾa",m:"100"},
          {ar:"مِئتان",tr:"miʾatān",m:"200 (dual)"},
          {ar:"ثلاثمئة",tr:"thalāthumiʾa",m:"300"},
          {ar:"خمسمئة",tr:"khamsumiʾa",m:"500"},
          {ar:"ألف",tr:"ʾalf",m:"1,000"},
          {ar:"ألفان",tr:"ʾalfān",m:"2,000 (dual)"},
          {ar:"خمسة آلاف",tr:"khamsat ʾālāf",m:"5,000"},
          {ar:"مليون",tr:"milyūn",m:"1,000,000"},
        ].map((n,i)=>(<div key={i} style={{background:"#FFEBEE",borderRadius:7,padding:"7px 10px"}}>
          <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:16,direction:"rtl",color:"#C62828"}}>{n.ar}</div>
          <div style={{fontSize:11,color:"#C62828",fontWeight:600}}>{n.tr}</div>
          <div style={{fontSize:11,color:"#555"}}>{n.m}</div>
        </div>))}
      </div>
      <div style={{background:"#FFF5F5",borderRadius:7,padding:"8px 10px",fontSize:12,marginBottom:8}}>
        <div style={{fontWeight:700,color:"#C62828",marginBottom:4}}>Compound numbers:</div>
        <div>مئة وخمسة = 105 (lit: "one hundred and five")</div>
        <div>ألف وتسعمئة وخمسة وعشرون = 1925</div>
        <div style={{marginTop:4,fontSize:11,color:"#888"}}>Units precede tens (reversed from English): خمسة وعشرون = 25 (five and twenty)</div>
      </div>
    </div>
  </ExpandSection>
  <ExpandSection title="Ordinal Numbers (أعداد ترتيبية)" color="#2E7D32">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #eee",fontSize:12,lineHeight:1.7}}>
      <p style={{margin:"0 0 8px",color:"#555"}}>Ordinals follow فاعِل pattern for most numbers (same as active participle Form I).</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {[
          {ar:"أوّل / أُولى",tr:"ʾawwal / ʾūlā",m:"first (m/f) — irregular"},
          {ar:"ثانٍ / ثانية",tr:"thānin / thāniya",m:"second"},
          {ar:"ثالث / ثالثة",tr:"thālith / thālitha",m:"third"},
          {ar:"رابع / رابعة",tr:"rābiʿ / rābiʿa",m:"fourth"},
          {ar:"خامس / خامسة",tr:"khāmis / khāmisa",m:"fifth"},
          {ar:"سادس / سادسة",tr:"sādis / sādisa",m:"sixth"},
          {ar:"سابع / سابعة",tr:"sābiʿ / sābiʿa",m:"seventh"},
          {ar:"عاشر / عاشرة",tr:"ʿāshir / ʿāshira",m:"tenth"},
        ].map((n,i)=>(<div key={i} style={{background:"#E8F5E9",borderRadius:7,padding:"7px 10px"}}>
          <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:14,direction:"rtl",color:"#2E7D32"}}>{n.ar}</div>
          <div style={{fontSize:11,color:"#2E7D32",fontWeight:600}}>{n.tr}</div>
          <div style={{fontSize:11,color:"#555"}}>{n.m}</div>
        </div>))}
      </div>
      <div style={{background:"#F5FBF5",borderRadius:7,padding:"8px 10px",marginTop:8,fontSize:11,color:"#555"}}>
        Ordinals agree with their noun in gender: الدرسُ الأوّل (masc) · المرّةُ الأُولى (fem)
      </div>
    </div>
  </ExpandSection>
</div>);}
