import { SimpleGuide } from '../../../components/SimpleGuide';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide17(){return(<div>
  <SimpleGuide items={[
  {h:"This/That (Demonstratives)",b:"هذا hādhā = this (m) · هذه hādhihi = this (f)\nذلك dhālika = that (m) · تلك tilka = that (f)\nهؤلاء hāʾulāʾi = these · أولئك ulāʾika = those"},
  {h:"Palestinian Arabic forms",b:"هاد hād / هادا hāda = this (m) · هادي hādi = this (f)\nهداك hadāk = that (m) · هديك hadīk = that (f)\nهدول hadōl = these/those"},
  {h:"Relative pronouns (who/which/that)",b:"الذي alladhī = who/which (m.s) · التي allatī = (f.s)\nالذين alladhīna = (m.pl) · اللاتي al-lātī = (f.pl, most common)\n(also: اللواتي al-lawātī · اللائي al-lāʾī)\nOnly used with DEFINITE nouns"},
  {h:"Palestinian Arabic relative",b:"اللي illi = who/which/that — ONE form for everything!\nالكتاب اللي قرأته = il-ktāb illi ʾarēto = the book that I read"},
]}/>
  <ExpandSection title="Dual relative pronouns (formal MSA)" color="#6A1B9A">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #eee",fontSize:12,lineHeight:1.7}}>
      <p style={{margin:"0 0 8px",color:"#555"}}>MSA has dedicated relative pronouns for dual referents, parallel to the dual personal pronouns in Guide 15.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {[
          {ar:"اللذانِ",tr:"alladhāni",m:"the two who (m) — nominative"},
          {ar:"اللذَيْنِ",tr:"alladhayni",m:"the two who (m) — acc/gen"},
          {ar:"اللتانِ",tr:"allatāni",m:"the two who (f) — nominative"},
          {ar:"اللتَيْنِ",tr:"allatayni",m:"the two who (f) — acc/gen"},
        ].map((r,i)=>(<div key={i} style={{background:"#F3E5F5",borderRadius:7,padding:"8px 10px"}}>
          <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:16,direction:"rtl",color:"#6A1B9A"}}>{r.ar}</div>
          <div style={{fontSize:11,color:"#6A1B9A",fontWeight:600}}>{r.tr}</div>
          <div style={{fontSize:11,color:"#555"}}>{r.m}</div>
        </div>))}
      </div>
    </div>
  </ExpandSection>
</div>);}
