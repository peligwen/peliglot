import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide6(){return(<div>
  <DarkBox title="A variable is just a blank in a sentence"><div style={{fontSize:14}}>
    "Something + 3 = 7" → "<strong style={{color:"#FFE77A"}}>x</strong> + 3 = 7." That's it. The letter stands for a number you don't know yet. Algebra is just finding the blank.
  </div></DarkBox>
  <Card color="#1565C0" title="English → Math translation">
    {[{en:"A number plus five",math:"x + 5"},{en:"Three times a number",math:"3x"},{en:"A number divided by two",math:"x / 2"},{en:"Five less than a number",math:"x - 5"},{en:"A number squared",math:"x²"},{en:"Double a number, then add one",math:"2x + 1"}].map((t,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",padding:"8px 14px",borderBottom:i<5?"1px solid #f0eeeb":"none",alignItems:"center"}}>
      <span style={{fontSize:13,color:"#555"}}>{t.en}</span>
      <span style={{fontSize:16,color:"#ccc",margin:"0 12px"}}>→</span>
      <span style={{fontSize:16,fontWeight:800,color:"#1565C0",fontFamily:"monospace"}}>{t.math}</span>
    </div>))}
  </Card>
  <Insight text="The = sign means 'is the same as,' not 'the answer is.' 3 + 4 = 7 reads as '3 plus 4 is the same as 7.' This matters when you start rearranging equations." />
</div>);}
