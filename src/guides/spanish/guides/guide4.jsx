import { useState } from 'react';
import { Insight } from '../../../components/Insight';
import { VerbTypeSelector, ConjugationTable } from './_helpers';

const presentData={
  ar:{verb:"hablar",stem:"habl",endings:["o","as","a","amos","áis","an"],meaning:"to speak"},
  er:{verb:"comer",stem:"com",endings:["o","es","e","emos","éis","en"],meaning:"to eat"},
  ir:{verb:"vivir",stem:"viv",endings:["o","es","e","imos","ís","en"],meaning:"to live"},
};

export function Guide4(){
  const [vt,setVt]=useState("ar");const d=presentData[vt];const cols={ar:"#D84315",er:"#00695C",ir:"#4527A0"};
  return(<div>
    <VerbTypeSelector vt={vt} setVt={setVt} cols={cols}/>
    <div style={{background:`${cols[vt]}12`,border:`2px dashed ${cols[vt]}44`,borderRadius:10,padding:"10px 14px",marginBottom:14,textAlign:"center",fontSize:13,color:cols[vt],fontWeight:600}}>
      ✂️ {d.verb} → drop -{vt} → {d.stem}- → add endings
    </div>
    <ConjugationTable stem={d.stem} endings={d.endings} verb={d.verb} meaning={d.meaning} color={cols[vt]}/>
    <Insight text="-ER and -IR share most endings — they only differ in nosotros (-emos vs -imos) and vosotros (-éis vs -ís)"/>
  </div>);
}
