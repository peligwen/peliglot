import { SimpleGuide } from '../../../components/SimpleGuide';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide27(){return(<div>
  <SimpleGuide items={[
  {h:"Common prepositions + their effects",b:"في fī = in · على ʿalā = on · من min = from\nإلى ilā = to · عن ʿan = about · بـ bi- = with/by\nلـ li- = for/to · مع maʿa = with"},
  {h:"Prepositions take the genitive case",b:"في البيتِ = in the house (kasra on تِ)\nمن المدرسةِ = from the school"},
  {h:"Prepositions merging with the definite article",b:"لِـ + الكتاب = لِلكتاب li-l-kitāb (for the book)\nبِـ + البيت = بِالبيت bi-l-bayt (in/by the house)\nNote: ل and ب always contract; في and من do not"},
  {h:"With attached pronouns",b:"فيه fī-hi = in it · عليها ʿalay-hā = on her\nمنّي min-nī = from me · لنا la-nā = for us\nعندي ʿind-ī = at me / I have"},
  {h:"Palestinian Arabic: 'to have' = عند + pronoun",b:"عندي ʿindī = I have · عندك ʿindak = you have\nما عندي = I don't have\nفي + pronoun also means 'there is': في كتاب = there's a book"},
]}/>
  <ExpandSection title="Time Expressions and Dates (CG6)" color="#2E7D32">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #eee",fontSize:12,lineHeight:1.7}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <div style={{background:"#E8F5E9",borderRadius:7,padding:"8px 10px"}}>
          <div style={{fontWeight:700,color:"#2E7D32",fontSize:11,marginBottom:4}}>Days of the week</div>
          {[["الأحد","al-ʾaḥad","Sunday"],["الاثنين","al-ʾithnāyn","Monday"],["الثلاثاء","al-thulāthāʾ","Tuesday"],["الأربعاء","al-ʾarbiʿāʾ","Wednesday"],["الخميس","al-khamīs","Thursday"],["الجمعة","al-jumʿa","Friday"],["السبت","al-sabt","Saturday"]].map((d,i)=>(<div key={i} style={{display:"flex",gap:6,alignItems:"baseline",marginBottom:1}}>
            <span style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:13,direction:"rtl",color:"#2E7D32",minWidth:65}}>{d[0]}</span>
            <span style={{fontSize:10,color:"#888"}}>{d[1]} — {d[2]}</span>
          </div>))}
        </div>
        <div>
          <div style={{background:"#E8F5E9",borderRadius:7,padding:"8px 10px",marginBottom:8}}>
            <div style={{fontWeight:700,color:"#2E7D32",fontSize:11,marginBottom:4}}>Key time words</div>
            {[["اليوم","al-yawm","today"],["أمس","ʾams","yesterday"],["غدًا","ghadan","tomorrow"],["الآن","al-ʾān","now"],["بعد غدٍ","baʿda ghadin","day after tomorrow"],["الساعة","al-sāʿa","the hour/time"]].map((w,i)=>(<div key={i} style={{marginBottom:1}}>
              <span style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:13,direction:"rtl",color:"#2E7D32"}}>{w[0]}</span>
              <span style={{fontSize:10,color:"#888"}}> {w[1]} — {w[2]}</span>
            </div>))}
          </div>
          <div style={{background:"#E8F5E9",borderRadius:7,padding:"8px 10px"}}>
            <div style={{fontWeight:700,color:"#2E7D32",fontSize:11,marginBottom:4}}>Clock time</div>
            <div style={{marginBottom:2}}>الساعة كم؟ = What time is it?</div>
            <div style={{marginBottom:2}}>الساعة ثلاثة = It's 3 o'clock</div>
            <div>الساعة ثلاثة وربع = 3:15 (+ a quarter)</div>
            <div>الساعة ثلاثة إلا ربع = 2:45 (minus a quarter)</div>
          </div>
        </div>
      </div>
      <div style={{background:"#F5FBF5",borderRadius:7,padding:"8px 10px",fontSize:11,color:"#555"}}>
        <strong>Prepositions with time:</strong> في يوم الخميس (on Thursday) · قبل (before) · بعد (after) · منذ (since) · خلال (during)
      </div>
    </div>
  </ExpandSection>
</div>);}
