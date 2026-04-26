import { SimpleGuide } from '../../../components/SimpleGuide';
import { Insight } from './_helpers';

export function Guide10(){return(<div>
  <SimpleGuide items={[
    {h:"ka vs ke \u2014 which form of 'the'?",b:"Use KE before words starting with: k, e, a, o\nUse KA for everything else\nMemory aid: 'ke' before KEAO letters\nke keiki (the child) \u00B7 ke aloha (the love)\nka hale (the house) \u00B7 ka mea (the thing)"},
    {h:"n\u0101 \u2014 the (plural)",b:"n\u0101 keiki = the children \u00B7 n\u0101 hale = the houses\nHawaiian nouns don't change form for plural \u2014 only the article does!"},
    {h:"he \u2014 a/an (indefinite)",b:"He kumu au. = I am a teacher.\nHe keiki k\u0113ia. = This is a child."},
    {h:"kekahi \u2014 a certain / some",b:"kekahi l\u0101 = one day / a certain day\nkekahi mau mea = some things"},
  ]}/>
  <Insight text="Hawaiian nouns don't change for plural. Ka hale = the house. N\u0101 hale = the houses. The noun stays the same \u2014 the article does the work!"/>
</div>);}
