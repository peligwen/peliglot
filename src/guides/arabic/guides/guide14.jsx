import { DarkBox } from '../../../components/DarkBox';
import { SimpleGuide } from '../../../components/SimpleGuide';
import { ExpandSection } from '../../../components/ExpandSection';
import { PalNote } from './_helpers';

export function Guide14(){return(<div>
  <DarkBox title="Case Endings (I'rāb)"><div style={{fontSize:13,lineHeight:1.6}}>
    MSA has 3 cases marked by short vowels on the last letter. These are <strong style={{color:"#EF9A9A"}}>dropped in spoken Arabic</strong> but important for reading classical/formal texts.
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"Nominative (مرفوع) — ◌ُ / ◌ٌ",b:"Subject of a sentence, predicate of nominal sentence\nالطالبُ كتبَ = the student wrote\nIndefinite: طالبٌ = a student (nom)"},
    {h:"Accusative (منصوب) — ◌َ / ◌ً",b:"Direct object, after إنّ and sisters, adverbs of time/place\nقرأتُ كتابًا = I read a book\nIndefinite gets alif: كتابًا"},
    {h:"Genitive (مجرور) — ◌ِ / ◌ٍ",b:"After prepositions, second noun in iḍāfa\nفي البيتِ = in the house\nكتابُ الطالبِ = the student's book"},
    {h:"Diptotes (ممنوع من الصرف)",b:"Some nouns don't take tanwīn and use fatḥa for genitive:\nForeign names, broken plural patterns (مَساجِد), colors/defects,\nfeminine proper names, words ending in ـان, the elative pattern أَفعَل,\nand morphological patterns فُعَلاء · أَفعِلاء · مَفاعِل · مَفاعيل"},
  ]}/>
  <ExpandSection title="Inna and Her Sisters (إنّ وأخواتها)" color="#6A1B9A">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #eee",fontSize:12,lineHeight:1.7}}>
      <p style={{margin:"0 0 8px",color:"#555"}}>These six particles take a noun subject in the <strong>accusative</strong> (not nominative). They introduce nominal sentences and add semantic nuance.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {[
          {p:"إنّ ʾinna",m:"Emphasises the following statement: 'Indeed, verily'"},
          {p:"أنّ ʾanna",m:"'That…' — used in indirect speech after verbs of saying/knowing"},
          {p:"لكنّ lākinna",m:"'But, however' — contrastive"},
          {p:"كأنّ kaʾanna",m:"'As if' — comparison/metaphor"},
          {p:"لَيتَ layta",m:"'Would that / if only' — wishful"},
          {p:"لَعَلَّ laʿalla",m:"'Perhaps / maybe' — hope or uncertainty"},
        ].map((r,i)=>(<div key={i} style={{background:"#F3E5F5",borderRadius:7,padding:"7px 10px"}}>
          <div style={{fontWeight:700,color:"#6A1B9A",fontSize:12,fontFamily:"'Noto Sans Arabic','Amiri',serif",direction:"rtl"}}>{r.p.split(' ')[0]}</div>
          <div style={{fontSize:11,color:"#6A1B9A",fontWeight:600}}>{r.p.split(' ').slice(1).join(' ')}</div>
          <div style={{fontSize:11,color:"#555"}}>{r.m}</div>
        </div>))}
      </div>
      <div style={{background:"#EDE7F6",borderRadius:7,padding:"8px 10px",fontSize:12}}>
        <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:15,direction:"rtl",marginBottom:2}}>إنَّ الطالبَ مجتهدٌ</div>
        <div style={{color:"#555"}}>ʾinna ṭ-ṭāliba mujtahidun — <em>Indeed, the student is diligent</em> (الطالب accusative after إنّ)</div>
      </div>
    </div>
  </ExpandSection>
  <PalNote text="Case endings are completely absent in Palestinian Arabic (and all dialects). Word order and context handle the job instead. You only encounter iʿrāb in formal MSA, Quran, and poetry."/>
</div>);}
