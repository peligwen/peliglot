import { SimpleGuide } from '../../../components/SimpleGuide';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide20(){return(<div>
  <SimpleGuide items={[
  {h:"Form from the jussive (present without final vowel)",b:"يَكتُبْ → اُكتُبْ (uktub!) — write!\nDrop the prefix, add hamzat al-waṣl if needed"},
  {h:"Masculine singular",b:"اُكتُبْ uktub = write! · اِقرَأْ iqraʾ = read!\nاِذهَبْ idhhab = go! · اِفتَحْ iftaḥ = open!"},
  {h:"Feminine singular: add ي-",b:"اُكتُبي uktubī = write! (to a woman)"},
  {h:"Masculine plural: add وا-",b:"اُكتُبوا uktubū = write! (to a group, m)"},
  {h:"Negative imperative uses لا + jussive",b:"لا تَكتُبْ lā taktub = don't write!"},
  {h:"Palestinian Arabic imperatives",b:"اكتب uktub! · اقرأ iʾra! · روح rūḥ (go)!\nNegative: لا تكتب la tiktub!"},
]}/>
  <ExpandSection title="Full MSA imperative: dual + feminine-plural" color="#E65100">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #eee",fontSize:12,lineHeight:1.7}}>
      <div style={{fontSize:11,color:"#555",marginBottom:8}}>Imperative only has 2nd-person forms (you cannot command 1st or 3rd person). Palestinian Arabic does not use dual forms.</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {[
          {form:"اُكتُبا",tr:"uktubā",m:"2nd dual (m+f): write! (you two)"},
          {form:"اُكتُبنَ",tr:"uktubna",m:"2nd plural feminine: write! (women)"},
        ].map((r,i)=>(<div key={i} style={{background:"#FFF3E0",borderRadius:7,padding:"8px 10px"}}>
          <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:18,direction:"rtl",color:"#E65100"}}>{r.form}</div>
          <div style={{fontSize:11,color:"#E65100",fontWeight:600}}>{r.tr}</div>
          <div style={{fontSize:11,color:"#555"}}>{r.m}</div>
        </div>))}
      </div>
    </div>
  </ExpandSection>
</div>);}
