import { DarkBox } from '../../../components/DarkBox';
import { SimpleGuide } from '../../../components/SimpleGuide';

export function Guide29(){return(<div>
  <DarkBox title="One Language, Many Voices"><div style={{fontSize:13,lineHeight:1.6}}>
    <strong style={{color:"#FFE77A"}}>MSA</strong> (Modern Standard Arabic) is the formal written/broadcast standard. <strong style={{color:"#90CAF9"}}>Dialects</strong> are what people actually speak at home.
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"Major dialect families",b:"🇪🇬 Egyptian — most widely understood (media influence)\n🇵🇸🇱🇧🇸🇾🇯🇴 Levantine — Palestinian, Lebanese, Syrian, Jordanian\n🇸🇦🇦🇪🇰🇼 Gulf — Saudi, Emirati, Kuwaiti\n🇲🇦🇩🇿🇹🇳 Maghrebi — Moroccan, Algerian, Tunisian"},
    {h:"🇵🇸 Palestinian Arabic highlights",b:"قاف → glottal stop: قال → آل ('he said')\nكاف feminine → often /tsh/: كيف حالك → kīf ḥālech\nFuture: رح raḥ + verb (رح أكتب = I will write)\nNegation: ما...ش frame (ما بعرفش = I don't know)"},
    {h:"Key differences across dialects",b:"'What': MSA ماذا · Egyptian إيه · Palestinian شو · Moroccan شنو\n'Now': MSA الآن · Egyptian دلوقتي · Palestinian هلّأ · Gulf الحين\n'Want': MSA أريد · Egyptian عايز · Palestinian بدّي · Gulf أبي"},
    {h:"Strategy: learn MSA + one dialect",b:"MSA for reading, news, formal writing\nDialect for conversation, travel, connecting with people\nMost Arabs code-switch between the two fluently"},
  ]}/>
</div>);}
