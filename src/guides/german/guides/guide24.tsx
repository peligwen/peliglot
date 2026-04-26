import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide24(){return(<div>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
    <Card color="#00838F" title="Process (werden)">
      <div style={{padding:"10px 14px",fontSize:13,color:"#555",lineHeight:1.6}}>
        Das Haus <strong style={{color:"#00838F"}}>wird gebaut</strong>.<br/>= The house is being built.<br/><br/>
        Das Buch <strong style={{color:"#00838F"}}>wurde geschrieben</strong>.<br/>= The book was written.<br/><br/>
        <span style={{fontSize:11,color:"#888"}}>Focus on the PROCESS.</span>
      </div>
    </Card>
    <Card color="#2E7D32" title="Result (sein)">
      <div style={{padding:"10px 14px",fontSize:13,color:"#555",lineHeight:1.6}}>
        Das Haus <strong style={{color:"#2E7D32"}}>ist gebaut</strong>.<br/>= The house is built (done).<br/><br/>
        Die Tür <strong style={{color:"#2E7D32"}}>ist geschlossen</strong>.<br/>= The door is closed.<br/><br/>
        <span style={{fontSize:11,color:"#888"}}>Focus on the RESULT.</span>
      </div>
    </Card>
  </div>
  <Insight text="Agent = von + dative: 'Das Buch wurde von Goethe geschrieben.' = 'The book was written by Goethe.'" />
</div>);}
