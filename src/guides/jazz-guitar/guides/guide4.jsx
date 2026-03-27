import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide4(){
  const tensions=[
    {chord:"maj7",available:"9, #11, 13",avoid:"11 (clashes with 3rd)",color:"#c4a87a"},
    {chord:"m7",available:"9, 11, 13",avoid:"b13 (clashes with 5th)",color:"#81C784"},
    {chord:"dom7",available:"9, #9, b9, #11, 13, b13",avoid:"Natural 11 (clashes with 3rd)",color:"#EF9A9A"},
    {chord:"m7b5",available:"9, 11, b13",avoid:"13 (clashes with b5)",color:"#90CAF9"},
    {chord:"dim7",available:"9, 11, b13, maj7",avoid:"—",color:"#CE93D8"},
  ];
  return(<div>
    <DarkBox title="Adding color above the 7th"><div style={{fontSize:14}}>
      Tensions are scale tones a 9th or more above the root. Each chord type has <strong style={{color:"#c4a87a"}}>available tensions</strong> (those that don't clash with chord tones) and <strong style={{color:"#EF9A9A"}}>avoid notes</strong> (those that create unresolved dissonance).
    </div></DarkBox>
    <Card color="#4E342E" title="Available tensions by chord type">
      {tensions.map((t,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #333":"none"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
          <span style={{fontSize:14,fontWeight:800,color:t.color}}>{t.chord}</span>
          <span style={{fontSize:10,color:"#666"}}>avoid: {t.avoid}</span>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {t.available.split(", ").map(a=>(<span key={a} style={{padding:"2px 8px",borderRadius:4,background:`${t.color}20`,color:t.color,fontSize:12,fontWeight:600}}>{a}</span>))}
        </div>
      </div>))}
    </Card>
    <Insight text="The altered dominant (dom7 with b9, #9, #11, b13) is the most colorful chord in jazz. All alterations come from the melodic minor scale a half step above: G7alt = Ab melodic minor." />
  </div>);
}
