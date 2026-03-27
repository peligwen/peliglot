import { DarkBox } from '../../../components/DarkBox';
import { SimpleGuide } from '../../../components/SimpleGuide';
import { PalNote } from './_helpers';

export function Guide14(){return(<div>
  <DarkBox title="Case Endings (I'rāb)"><div style={{fontSize:13,lineHeight:1.6}}>
    MSA has 3 cases marked by short vowels on the last letter. These are <strong style={{color:"#EF9A9A"}}>dropped in spoken Arabic</strong> but important for reading classical/formal texts.
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"Nominative (مرفوع) — ◌ُ / ◌ٌ",b:"Subject of a sentence, predicate of nominal sentence\nالطالبُ كتبَ = the student wrote\nIndefinite: طالبٌ = a student (nom)"},
    {h:"Accusative (منصوب) — ◌َ / ◌ً",b:"Direct object, after إنّ and sisters, adverbs of time/place\nقرأتُ كتابًا = I read a book\nIndefinite gets alif: كتابًا"},
    {h:"Genitive (مجرور) — ◌ِ / ◌ٍ",b:"After prepositions, second noun in iḍāfa\nفي البيتِ = in the house\nكتابُ الطالبِ = the student's book"},
    {h:"Diptotes (ممنوع من الصرف)",b:"Some nouns don't take tanwīn and use fatḥa for genitive:\nForeign names, broken plural patterns (مَساجِد), colors/defects"},
  ]}/>
  <PalNote text="Case endings are completely absent in Palestinian Arabic (and all dialects). Word order and context handle the job instead. You only encounter i'rāb in formal MSA, Quran, and poetry."/>
</div>);}
