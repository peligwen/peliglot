import { DarkBox } from '../../../components/DarkBox';
import { SimpleGuide } from '../../../components/SimpleGuide';
import { Insight } from './_helpers';

export function Guide5(){return(<div>
  <DarkBox title="Hawaiian is Verb-First"><div style={{fontSize:14,lineHeight:1.6}}>
    English: <strong>I see the fish</strong> (SVO)<br/>
    Hawaiian: <strong style={{color:"#FFE77A"}}>Ke n\u0101n\u0101 nei au i ka i\u02BBa</strong> (VSO)<br/>
    <span style={{color:"#aaa",fontSize:12}}>"Am looking I at the fish"</span>
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"Verbal sentence: action first",b:"Ua hele au i ke kula.\nUA (completed) + HELE (go) + AU (I) + I KE KULA (to school)\n= I went to school."},
    {h:"Equational sentence: X is Y (identification)",b:"He kumu \u02BBo Lani.\nHE (a) + KUMU (teacher) + \u02BBO LANI (Lani)\n= Lani is a teacher."},
    {h:"Descriptive sentence: X is [quality]",b:"Nani ke aloha.\nNANI (beautiful) + KE ALOHA (the love)\n= Love is beautiful. (Stative verb pattern)"},
    {h:"Locational sentence: X is at Y",b:"Aia ka puke ma ka p\u0101kaukau.\nAIA + KA PUKE (the book) + MA KA P\u0100KAUKAU (on the table)\n= The book is on the table."},
  ]}/>
  <Insight text="There is no verb 'to be' in Hawaiian! Equational and descriptive sentences simply place words in the right pattern \u2014 the structure itself conveys 'is.'"/>
</div>);}
