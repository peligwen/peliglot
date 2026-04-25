import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';
import { PalNote, ArBig } from './_helpers';

export function Guide10(){
  const mascPat=[
    {ar:"كِتاب",tr:"kitāb",m:"book"},{ar:"بَيت",tr:"bayt",m:"house"},{ar:"وَلَد",tr:"walad",m:"boy"},
    {ar:"قَلَم",tr:"qalam",m:"pen"},{ar:"باب",tr:"bāb",m:"door"},
  ];
  const femPat=[
    {ar:"مَدرَسة",tr:"madrasa",m:"school"},{ar:"سَيّارة",tr:"sayyāra",m:"car"},{ar:"غُرفة",tr:"ghurfa",m:"room"},
    {ar:"مَدينة",tr:"madīna",m:"city"},{ar:"جامِعة",tr:"jāmiʿa",m:"university"},
  ];
  const femNoTM=[
    {ar:"أُمّ",tr:"umm",m:"mother"},{ar:"أُخت",tr:"ukht",m:"sister"},{ar:"شَمس",tr:"shams",m:"sun"},
    {ar:"أَرض",tr:"arḍ",m:"earth/land"},{ar:"نار",tr:"nār",m:"fire"},
  ];
  return(<div>
    <DarkBox title="Every Noun Has a Gender"><div style={{fontSize:13,lineHeight:1.6}}>
      Arabic has two genders: <strong style={{color:"#90CAF9"}}>masculine</strong> and <strong style={{color:"#EF9A9A"}}>feminine</strong>. The main marker for feminine is <ArBig>ة</ArBig> (tā' marbūṭa).
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      <Card color="#1565C0" title="♂ Masculine" subtitle="No special ending">
        {mascPat.map((w,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"6px 14px",borderBottom:i<mascPat.length-1?"1px solid #f0eeeb":"none",gap:8}}>
          <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1565C0",direction:"rtl",minWidth:50,textAlign:"center"}}>{w.ar}</span>
          <span style={{fontSize:12,color:"#888"}}>{w.tr} — {w.m}</span>
        </div>))}
      </Card>
      <Card color="#AD1457" title="♀ Feminine" subtitle="Usually ends in ة">
        {femPat.map((w,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"6px 14px",borderBottom:i<femPat.length-1?"1px solid #f0eeeb":"none",gap:8}}>
          <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#AD1457",direction:"rtl",minWidth:50,textAlign:"center"}}>{w.ar}</span>
          <span style={{fontSize:12,color:"#888"}}>{w.tr} — {w.m}</span>
        </div>))}
      </Card>
    </div>
    <ExpandSection title="⚠ Feminine WITHOUT tā' marbūṭa" color="#AD1457">
      <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee"}}>
        {femNoTM.map((w,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"6px 0",borderBottom:i<femNoTM.length-1?"1px solid #f0eeeb":"none",gap:10}}>
          <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#AD1457",direction:"rtl",minWidth:50,textAlign:"center"}}>{w.ar}</span>
          <span style={{fontSize:12,color:"#888"}}>{w.tr} — {w.m}</span>
        </div>))}
        <div style={{fontSize:11,color:"#888",marginTop:6}}>Body parts that come in pairs, country/city names, and some nature words are often feminine without ة.</div>
      </div>
    </ExpandSection>
    <Insight text="Key rule: non-human plurals are treated as FEMININE SINGULAR for agreement purposes. 'The books are big' = الكتب كبيرة (not كبيرون)."/>
    <ExpandSection title="Adjective–Noun Agreement (4 dimensions)" color="#1565C0">
      <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #eee",fontSize:12,lineHeight:1.7}}>
        <p style={{margin:"0 0 8px",fontWeight:700,color:"#1565C0"}}>An adjective must agree with its noun in ALL four dimensions:</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          {[
            {dim:"1. Gender",rule:"Masc noun → masc adj; fem noun → fem adj (add ة)"},
            {dim:"2. Number",rule:"Singular, dual, or plural adj matches noun number"},
            {dim:"3. Definiteness",rule:"Definite noun (al-) → definite adj (al-) · Indefinite → indefinite"},
            {dim:"4. Case",rule:"Adjective takes the same case ending as its noun"},
          ].map((d,i)=>(<div key={i} style={{background:"#EEF2F9",borderRadius:7,padding:"8px 10px"}}>
            <div style={{fontWeight:700,color:"#1565C0",fontSize:11,marginBottom:2}}>{d.dim}</div>
            <div style={{color:"#444",fontSize:11}}>{d.rule}</div>
          </div>))}
        </div>
        <div style={{background:"#F5F9F5",borderRadius:7,padding:"8px 10px",border:"1px solid #D4E8D4",fontSize:12}}>
          <div style={{fontWeight:700,color:"#2E7D32",marginBottom:4}}>Examples:</div>
          <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:15,direction:"rtl",marginBottom:2}}>الكِتابُ الكَبيرُ</div>
          <div style={{color:"#555",marginBottom:6}}>al-kitābu l-kabīru — <em>the big book</em> (masc, sing, definite, nominative)</div>
          <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:15,direction:"rtl",marginBottom:2}}>مَدرَسةٌ كَبيرةٌ</div>
          <div style={{color:"#555",marginBottom:6}}>madrasatun kabīratun — <em>a big school</em> (fem, sing, indefinite, nominative)</div>
          <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:15,direction:"rtl",marginBottom:2}}>الكُتُبُ الكَبيرةُ</div>
          <div style={{color:"#555"}}>al-kutubu l-kabīratu — <em>the big books</em> (non-human plural → feminine singular adjective)</div>
        </div>
        <div style={{fontSize:11,color:"#888",marginTop:8}}>⚠ Non-human plurals always take a feminine singular adjective, regardless of the noun's own gender. This is the most common beginner pitfall.</div>
      </div>
    </ExpandSection>
    <PalNote text="Gender works the same in Palestinian Arabic. The tā' marbūṭa ending shifts to -e in dialect: مدرسة = madrase, سيّارة = sayyāra (stays similar)."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 11-30: PLACEHOLDER FUNCTIONS (will be built out)
// ═══════════════════════════════════════════════════════════════
