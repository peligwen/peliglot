import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight as Nota } from '../../../components/Insight';

export function Guide17(){return(<div>
  <DarkBox title="Its vs It's — el error #1 del inglés"><div style={{fontSize:14,lineHeight:1.6}}>
    <strong style={{color:"#FFE77A"}}>ITS</strong> = posesivo (su, de ello): <em>The dog wagged its tail.</em><br/>
    <strong style={{color:"#EF9A9A"}}>IT'S</strong> = it is / it has: <em>It's raining. It's been a long day.</em><br/>
    <span style={{color:"#aaa",fontSize:12}}>¡Sin apóstrofo para el posesivo! Hasta los nativos se equivocan.</span>
  </div></DarkBox>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
    <Card color="#E65100" title="'s para personas">
      <div style={{padding:"10px 14px",fontSize:13,color:"#555",lineHeight:1.6}}>
        Maria<strong style={{color:"#E65100"}}>'s</strong> house<br/>
        my brother<strong style={{color:"#E65100"}}>'s</strong> car<br/>
        the children<strong style={{color:"#E65100"}}>'s</strong> toys<br/>
        <span style={{fontSize:11,color:"#888"}}>NO: 'the house of Maria'</span>
      </div>
    </Card>
    <Card color="#1565C0" title="'of' para cosas">
      <div style={{padding:"10px 14px",fontSize:13,color:"#555",lineHeight:1.6}}>
        the door <strong style={{color:"#1565C0"}}>of</strong> the house<br/>
        the end <strong style={{color:"#1565C0"}}>of</strong> the movie<br/>
        the color <strong style={{color:"#1565C0"}}>of</strong> the car<br/>
        <span style={{fontSize:11,color:"#888"}}>NO: 'the house's door'</span>
      </div>
    </Card>
  </div>
  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12,justifyContent:"center"}}>
    {[{p:"mine",es:"mío"},{p:"yours",es:"tuyo"},{p:"his",es:"de él"},{p:"hers",es:"de ella"},{p:"ours",es:"nuestro"},{p:"theirs",es:"de ellos"}].map(x=>(<span key={x.p} style={{padding:"5px 12px",borderRadius:8,background:"#FFF3E0",color:"#E65100",fontSize:13,fontWeight:700,border:"1px solid #FFCC80"}}>{x.p} <span style={{fontWeight:400,color:"#888",fontSize:11}}>({x.es})</span></span>))}
  </div>
  <Nota text="Whose = ¿de quién? ('Whose book is this?') · Whose ≠ Who's (who is). 'Who's there?' vs 'Whose bag is this?'" />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUÍAS 18-20: PRONOMBRES
// ═══════════════════════════════════════════════════════════════
