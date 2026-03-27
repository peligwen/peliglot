import { DarkBox } from '../../../components/DarkBox';
import { SimpleGuide } from '../../../components/SimpleGuide';
import { CultureNote } from './_helpers';

export function Guide29(){return(<div>
  <DarkBox title="From Near-Extinction to Revival"><div style={{fontSize:13,lineHeight:1.6}}>
    In 1983, fewer than <strong style={{color:"#EF9A9A"}}>50 children</strong> were native speakers. Today, thanks to immersion schools and dedicated communities, <strong style={{color:"#81C784"}}>thousands</strong> are learning and using \u02BB\u014Clelo Hawai\u02BBi daily.
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"The decline",b:"1896: Hawaiian banned as medium of instruction in schools after the overthrow of the Hawaiian Kingdom.\nBy the 1980s, nearly all fluent speakers were elderly. The language was critically endangered."},
    {h:"P\u016Bnana Leo \u2014 the turning point (1984)",b:"Hawaiian-medium immersion preschools, modeled on M\u0101ori K\u014Dhanga Reo. Children raised entirely in Hawaiian from birth. Now operates on multiple islands."},
    {h:"Kula Kaiapuni \u2014 immersion K-12 schools",b:"Full Hawaiian-medium education from preschool through high school. Students learn all subjects in Hawaiian. Graduates are fluent speakers and proud cultural practitioners."},
    {h:"Today's status",b:"\u02BB\u014Clelo Hawai\u02BBi is an official state language of Hawai\u02BBi (since 1978).\nUniversity of Hawai\u02BBi offers a PhD program in Hawaiian.\nHawaiian-language media, music, and literature are growing.\nThe community remains small but passionate and growing."},
    {h:"How you can support",b:"Learn the language \u2014 even basics show respect.\nUse correct spelling with \u02BBokina and kahak\u014D.\nSupport P\u016Bnana Leo and Hawaiian-medium education.\nListen to Hawaiian music and read Hawaiian literature."},
  ]}/>
  <CultureNote text="Language revitalization is an act of cultural sovereignty. For Native Hawaiians, speaking \u02BB\u014Clelo Hawai\u02BBi is deeply connected to identity, land, and self-determination. Learning Hawaiian respectfully honors this ongoing work."/>
</div>);}
