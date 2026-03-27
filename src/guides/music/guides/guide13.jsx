import { Card } from '../../../components/Card';

export function Guide13(){return(<div>
  <Card color="#1565C0" title="Note values in 4/4 time" subtitle="Each is half the previous">
    {[{name:"Whole note",beats:"4 beats",symbol:"𝅝",divisions:"= the entire bar"},{name:"Half note",beats:"2 beats",symbol:"𝅗𝅥",divisions:"= 2 per bar"},
      {name:"Quarter note",beats:"1 beat",symbol:"♩",divisions:"= 4 per bar (the 'pulse')"},{name:"Eighth note",beats:"½ beat",symbol:"♪",divisions:"= 8 per bar"},
      {name:"Sixteenth note",beats:"¼ beat",symbol:"𝅘𝅥𝅯",divisions:"= 16 per bar"},
    ].map((n,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"40px 100px 60px 1fr",padding:"8px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none",alignItems:"center"}}>
      <span style={{fontSize:24,color:"#1565C0"}}>{n.symbol}</span>
      <span style={{fontSize:13,fontWeight:700,color:"#333"}}>{n.name}</span>
      <span style={{fontSize:12,fontWeight:700,color:"#1565C0"}}>{n.beats}</span>
      <span style={{fontSize:11,color:"#888"}}>{n.divisions}</span>
    </div>))}
  </Card>
  <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:12}}>
    <div style={{fontSize:13,fontWeight:700,color:"#E65100",marginBottom:4}}>Special rhythms:</div>
    <div style={{fontSize:12,color:"#555",lineHeight:1.6}}>
      <strong>Dotted note</strong> = note + half its value. Dotted half = 3 beats. Dotted quarter = 1.5 beats.<br/>
      <strong>Triplet</strong> = 3 notes in the space of 2. Gives a "shuffle" feel.<br/>
      <strong>Rest</strong> = silence for that duration. Just as important as the notes!
    </div>
  </div>
</div>);}
