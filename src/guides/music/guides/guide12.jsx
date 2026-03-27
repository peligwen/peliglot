import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide12(){return(<div>
  <DarkBox title="How music is organized in time"><div style={{fontSize:14}}>
    <strong style={{color:"#FFE77A"}}>Time signature</strong> = how beats are grouped. <strong style={{color:"#FFE77A"}}>Tempo</strong> = how fast. 4/4 at 120 BPM and 4/4 at 60 BPM have the same grouping at different speeds.
  </div></DarkBox>
  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
    {[{ts:"4/4",name:"Common Time",desc:"4 beats per bar. Vast majority of pop, rock, hip-hop, R&B, country.",pct:"~90% of popular music",color:"#E65100"},
      {ts:"3/4",name:"Waltz Time",desc:"3 beats per bar. Waltzes, some ballads, folk songs. ONE-two-three.",pct:"Waltzes, ballads",color:"#1565C0"},
      {ts:"6/8",name:"Compound Time",desc:"2 groups of 3. Feels different from 3/4 — a swing/lilt. Many Irish/folk songs.",pct:"Folk, ballads, blues",color:"#2E7D32"},
    ].map(ts=>(<div key={ts.ts} style={{background:"#fff",borderRadius:12,padding:"12px",border:`2px solid ${ts.color}30`,textAlign:"center"}}>
      <div style={{fontSize:28,fontWeight:800,color:ts.color,fontFamily:"monospace"}}>{ts.ts}</div>
      <div style={{fontSize:12,fontWeight:700,color:"#333"}}>{ts.name}</div>
      <div style={{fontSize:11,color:"#555",marginTop:4}}>{ts.desc}</div>
      <div style={{fontSize:10,color:"#aaa",marginTop:4}}>{ts.pct}</div>
    </div>))}
  </div>
  <Insight text="If you can count '1-2-3-4' to a song, it's in 4/4. If it makes you want to waltz (1-2-3, 1-2-3), it's 3/4. If it lilts in groups of 3 but feels like 2 big beats, it's 6/8." />
</div>);}
