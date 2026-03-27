import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { SimpleGuide } from '../../../components/SimpleGuide';
import { PalNote } from './_helpers';

export function Guide12(){return(<div>
  <DarkBox title="Three Plural Systems"><div style={{fontSize:13,lineHeight:1.6}}>
    Arabic has <strong style={{color:"#FFE77A"}}>sound plurals</strong> (regular endings) and <strong style={{color:"#EF9A9A"}}>broken plurals</strong> (internal pattern changes). Most nouns use broken plurals.
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"Sound Masculine Plural: add ون/-ين",b:"معلّم → معلّمون (nom) / معلّمين (acc/gen)\nOnly for male humans (teachers, engineers, etc.)"},
    {h:"Sound Feminine Plural: add ات-",b:"معلّمة → معلّمات (female teachers)\nAlso for many loanwords and verbal nouns"},
    {h:"Broken Plurals: internal pattern change",b:"كتاب → كُتُب (books) · بيت → بُيوت (houses)\nقلم → أقلام (pens) · رجل → رجال (men)\nPatterns like أفعال، فُعول، فِعال are common"},
    {h:"Common broken plural patterns",b:"CuCuC: كتاب→كُتُب · CuCūC: بيت→بُيوت\naCCāC: ولد→أولاد · CiCāC: رجل→رِجال\nCuCaCā': وزير→وُزَراء"},
  ]}/>
  <Insight text="Non-human plurals take FEMININE SINGULAR agreement. كُتُب كبيرة (big books) — even though كتاب is masculine!"/>
  <PalNote text="Palestinian Arabic uses the same broken plurals as MSA. Sound masculine plural often becomes -īn for all cases: معلّمين (mu'allimīn)."/>
</div>);}
