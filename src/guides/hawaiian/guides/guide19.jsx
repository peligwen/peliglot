import { DarkBox } from '../../../components/DarkBox';
import { SimpleGuide } from '../../../components/SimpleGuide';
import { Hw } from './_helpers';

export function Guide19(){return(<div>
  <DarkBox title="Adjectives ARE Verbs"><div style={{fontSize:14,lineHeight:1.6}}>
    Hawaiian doesn't have a separate adjective class. Words like <Hw>nani</Hw> (beautiful), <Hw>nui</Hw> (big), <Hw>maika&#x02BB;i</Hw> (good) are <strong style={{color:"#FFE77A"}}>stative verbs</strong> meaning "is beautiful / is big / is good."
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"As predicates (main verb of the sentence)",b:"Nani ka pua. = The flower is beautiful. (lit. 'Is-beautiful the flower')\nNui ka hale. = The house is big.\nMaika\u02BBi ka l\u0101. = The day is good."},
    {h:"As modifiers (after the noun)",b:"ka pua nani = the beautiful flower\nke keiki maika\u02BBi = the good child\nka hale nui = the big house"},
    {h:"With TAM markers for tense",b:"Ua nui ke keiki. = The child has grown big (completed).\nE nani ana. = It will be beautiful."},
    {h:"Common stative verbs",b:"nani = beautiful \u00B7 nui = big \u00B7 li\u02BBili\u02BBi = small\nmaika\u02BBi = good \u00B7 \u02BBino = bad \u00B7 hou = new\nkahiko = old \u00B7 aloha = loving \u00B7 huhu = angry\nma\u02BBi = sick \u00B7 ola = alive/healthy \u00B7 make = dead"},
  ]}/>
</div>);}
