import { SimpleGuide } from '../../../components/SimpleGuide';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide24(){return(<div>
  <SimpleGuide items={[
  {h:"Nominal sentence (جملة اسمية) — starts with a noun",b:"الكتابُ كبيرٌ = The book is big\nSubject (مبتدأ) + Predicate (خبر)\nNo verb 'to be' in present tense!"},
  {h:"Past nominal sentence: use كانَ",b:"الكتابُ كانَ كبيرًا = The book was big\nكان takes its predicate in the ACCUSATIVE (كبيرًا not كبيرٌ)\nكان conjugates like a past-tense verb: كنتُ، كنتَ، كانَ، كانَت، كنّا..."},
  {h:"Verbal sentence (جملة فعلية) — starts with a verb",b:"كَتَبَ الطالبُ الدرسَ = The student wrote the lesson\nVerb + Subject + Object (VSO order)"},
  {h:"Key difference: verb agreement",b:"Verbal sentence: verb is ALWAYS singular (even with plural subject)\nكَتَبَ الطلابُ = the students wrote (not كتبوا الطلاب)"},
  {h:"Palestinian Arabic word order",b:"SVO is the default: الطالب كتب الدرس\nVerbal sentences (VSO) sound more formal/literary in dialect"},
]}/>
  <ExpandSection title="Conjunctions (حروف العطف)" color="#1565C0">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #eee",fontSize:12,lineHeight:1.7}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {[
          {ar:"وَ",tr:"wa-",m:"and — simple addition; prefixed to next word"},
          {ar:"فَ",tr:"fa-",m:"and so / and then — implies sequence or consequence"},
          {ar:"ثُمَّ",tr:"thumma",m:"and then — marks a time gap between events"},
          {ar:"أو",tr:"aw",m:"or — choice between alternatives"},
          {ar:"أم",tr:"am",m:"or — in yes/no questions between two options"},
          {ar:"لكن",tr:"lākin",m:"but, however — contrast"},
          {ar:"لأنّ",tr:"liʾanna",m:"because — followed by noun in accusative (like إنّ)"},
          {ar:"حتى",tr:"ḥattā",m:"until / so that — purpose or extent"},
        ].map((c,i)=>(<div key={i} style={{background:"#EEF2F9",borderRadius:7,padding:"7px 10px"}}>
          <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:16,direction:"rtl",color:"#1565C0"}}>{c.ar}</div>
          <div style={{fontSize:11,color:"#1565C0",fontWeight:600}}>{c.tr}</div>
          <div style={{fontSize:11,color:"#555"}}>{c.m}</div>
        </div>))}
      </div>
      <div style={{background:"#E3F2FD",borderRadius:7,padding:"8px 10px",fontSize:12}}>
        <div style={{fontWeight:700,color:"#1565C0",marginBottom:4}}>Note on وَ vs. فَ:</div>
        <div>ذهبَ وعادَ = he went and came back (simple sequence)</div>
        <div>ذهبَ فعادَ = he went and so came back (consequential / tighter sequence)</div>
        <div style={{marginTop:4}}>أمّا…فَـ = "as for…(then)": أمّا الكتابُ فمفيدٌ = As for the book, it is useful</div>
      </div>
    </div>
  </ExpandSection>
</div>);}
