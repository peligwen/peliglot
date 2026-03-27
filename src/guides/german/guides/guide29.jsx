import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide29(){
  const nums=[{n:"1",w:"eins"},{n:"2",w:"zwei"},{n:"3",w:"drei"},{n:"4",w:"vier"},{n:"5",w:"fünf"},{n:"6",w:"sechs"},{n:"7",w:"sieben"},{n:"8",w:"acht"},{n:"9",w:"neun"},{n:"10",w:"zehn"},{n:"11",w:"elf"},{n:"12",w:"zwölf"}];
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:16}}>
      {nums.map(n=>(<div key={n.n} style={{textAlign:"center",padding:"8px 4px",background:"#fff",borderRadius:8,border:"1px solid #e0dcd5"}}>
        <div style={{fontSize:20,fontWeight:800,color:"#E65100"}}>{n.n}</div>
        <div style={{fontSize:10,color:"#555"}}>{n.w}</div>
      </div>))}
    </div>
    <DarkBox title="13-99: ones BEFORE tens (backwards!)"><div style={{fontSize:14}}>
      21 = <strong style={{color:"#FFE77A"}}>ein</strong>und<strong style={{color:"#FFE77A"}}>zwanzig</strong> (one-and-twenty)<br/>
      54 = <strong style={{color:"#FFE77A"}}>vier</strong>und<strong style={{color:"#FFE77A"}}>fünfzig</strong> (four-and-fifty)<br/>
      99 = <strong style={{color:"#FFE77A"}}>neun</strong>und<strong style={{color:"#FFE77A"}}>neunzig</strong> (nine-and-ninety)
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"2px solid #C62828",marginBottom:16}}>
      <div style={{fontSize:14,fontWeight:700,color:"#C62828",marginBottom:6}}>⚠ Time: halb = BEFORE the hour!</div>
      <div style={{fontSize:13,color:"#555",lineHeight:1.6}}>
        <strong style={{color:"#C62828"}}>halb drei = 2:30</strong> (NOT 3:30!)<br/>
        halb means 'half TO' the next hour.<br/>
        Viertel vor drei = 2:45 · Viertel nach zwei = 2:15
      </div>
    </div>
    <Insight text="Dates: Tag.Monat.Jahr → 15.03.2024 = March 15, 2024. Day first (opposite of American format)." />
  </div>);
}
