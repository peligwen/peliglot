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
    {ar:"مَدينة",tr:"madīna",m:"city"},{ar:"جامِعة",tr:"jāmi'a",m:"university"},
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
    <ExpandSection label="⚠ Feminine WITHOUT tā' marbūṭa" color="#AD1457">
      <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee"}}>
        {femNoTM.map((w,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"6px 0",borderBottom:i<femNoTM.length-1?"1px solid #f0eeeb":"none",gap:10}}>
          <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#AD1457",direction:"rtl",minWidth:50,textAlign:"center"}}>{w.ar}</span>
          <span style={{fontSize:12,color:"#888"}}>{w.tr} — {w.m}</span>
        </div>))}
        <div style={{fontSize:11,color:"#888",marginTop:6}}>Body parts that come in pairs, country/city names, and some nature words are often feminine without ة.</div>
      </div>
    </ExpandSection>
    <Insight text="Key rule: non-human plurals are treated as FEMININE SINGULAR for agreement purposes. 'The books are big' = الكتب كبيرة (not كبيرون)."/>
    <PalNote text="Gender works the same in Palestinian Arabic. The tā' marbūṭa ending shifts to -e in dialect: مدرسة = madrase, سيّارة = sayyāra (stays similar)."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 11-30: PLACEHOLDER FUNCTIONS (will be built out)
// ═══════════════════════════════════════════════════════════════
