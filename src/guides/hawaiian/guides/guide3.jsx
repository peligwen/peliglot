import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { SimpleGuide } from '../../../components/SimpleGuide';

export function Guide3(){
  const sylEx=[
    {word:"aloha",syls:["a","lo","ha"],stress:1},
    {word:"Hawai\u02BBi",syls:["Ha","wai","\u02BBi"],stress:1},
    {word:"mahalo",syls:["ma","ha","lo"],stress:1},
    {word:"humuhumunukunuku\u0101pua\u02BBa",syls:["hu","mu","hu","mu","nu","ku","nu","ku","\u0101","pu","a","\u02BBa"],stress:8},
    {word:"kama\u02BB\u0101ina",syls:["ka","ma","\u02BB\u0101","i","na"],stress:2},
  ];
  return(<div>
    <DarkBox title="The CV Rule"><div style={{fontSize:14,lineHeight:1.6}}>
      Every Hawaiian syllable is either a <strong style={{color:"#FFE77A"}}>vowel alone</strong> or a <strong style={{color:"#FFE77A"}}>consonant + vowel</strong>. No syllable ever ends in a consonant. No consonant clusters.
    </div></DarkBox>
    <Card color="#4527A0" title="Syllable Breakdown">
      {sylEx.map((w,i)=>(<div key={i} style={{padding:"10px 16px",borderBottom:i<sylEx.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:14,fontWeight:700,color:"#333",marginBottom:6,fontStyle:"italic"}}>{w.word}</div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
          {w.syls.map((s,si)=>(<span key={si} style={{padding:"4px 8px",borderRadius:6,fontSize:14,fontWeight:si===w.stress?800:400,color:si===w.stress?"#4527A0":"#999",background:si===w.stress?"#EDE7F6":"transparent",border:si===w.stress?"1.5px solid #4527A0":"1.5px solid transparent"}}>{s}</span>))}
        </div>
      </div>))}
    </Card>
    <SimpleGuide items={[
      {h:"Stress rules",b:"\u2022 Stress falls on the second-to-last syllable (penultimate) for most words\n\u2022 Long vowels (with kahak\u014D) and diphthongs attract stress\n\u2022 In longer words, secondary stress falls on alternating syllables before the main stress"},
      {h:"The W sound variation",b:"\u2022 After 'u' or 'o': W sounds like English /w/\n\u2022 After 'i' or 'e': W often sounds like /v/\n\u2022 At the start of a word: usually /w/\n\u2022 Example: 'Ewa = 'eva, but wai = wai"},
    ]}/>
  </div>);
}
