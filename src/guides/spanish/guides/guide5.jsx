import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { VerbTypeSelector, MiniTable, TriggerChips } from './_helpers';

const pretData={ar:{stem:"habl",endings:["é","aste","ó","amos","asteis","aron"]},er:{stem:"com",endings:["í","iste","ió","imos","isteis","ieron"]},ir:{stem:"viv",endings:["í","iste","ió","imos","isteis","ieron"]}};
const impData={ar:{stem:"habl",endings:["aba","abas","aba","ábamos","abais","aban"]},er:{stem:"com",endings:["ía","ías","ía","íamos","íais","ían"]},ir:{stem:"viv",endings:["ía","ías","ía","íamos","íais","ían"]}};

export function Guide5(){
  const [vt,setVt]=useState("ar");const pret=pretData[vt];const imp=impData[vt];
  return(<div>
    <DarkBox title="Two Past Tenses"><div style={{fontSize:13,lineHeight:1.6}}>
      <span style={{color:"#EF9A9A"}}>Pretérito</span> = completed, done, specific point<br/>
      <span style={{color:"#90CAF9"}}>Imperfecto</span> = ongoing, habitual, background
    </div></DarkBox>
    <VerbTypeSelector vt={vt} setVt={setVt}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      <MiniTable title="Pretérito" color="#B71C1C" stem={pret.stem} endings={pret.endings}/>
      <MiniTable title="Imperfecto" color="#1565C0" stem={imp.stem} endings={imp.endings}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      <TriggerChips label="Preterite triggers" color="#B71C1C" words={["ayer","anoche","una vez","de repente","en 2020"]}/>
      <TriggerChips label="Imperfect triggers" color="#1565C0" words={["siempre","cada día","de niño/a","mientras","generalmente"]}/>
    </div>
    <Insight text="The imperfect only has 3 irregular verbs: ser, ir, ver. And -ER/-IR share identical endings in BOTH tenses!"/>
  </div>);
}
