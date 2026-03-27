import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Piano } from './_helpers';

export function Guide27(){return(<div>
  <DarkBox title="The difference between playing notes and making music"><div style={{fontSize:14}}>
    <strong style={{color:"#FFE77A"}}>Dynamics</strong> = how soft or loud you play. The space between whisper and scream is where expression lives. A song at one volume is a lecture. A song with dynamics is a conversation.
  </div></DarkBox>
  <Card color="#C62828" title="Dynamic markings (quietest → loudest)">
    <div style={{display:"flex",flexWrap:"wrap",gap:4,padding:"10px 14px"}}>
      {[{m:"pp",n:"Pianissimo",d:"Very soft"},{m:"p",n:"Piano",d:"Soft"},{m:"mp",n:"Mezzo-piano",d:"Medium soft"},{m:"mf",n:"Mezzo-forte",d:"Medium loud"},{m:"f",n:"Forte",d:"Loud"},{m:"ff",n:"Fortissimo",d:"Very loud"}].map((d,i,a)=>(<div key={i} style={{flex:1,minWidth:80,textAlign:"center",padding:"8px",borderRadius:8,background:`rgba(198,40,40,${0.1+i*0.15})`,color:i>3?"#fff":"#333"}}>
        <div style={{fontSize:18,fontWeight:800,fontStyle:"italic"}}>{d.m}</div>
        <div style={{fontSize:10}}>{d.n}</div>
      </div>))}
    </div>
  </Card>
  <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:12}}>
    <div style={{fontSize:12,color:"#555",lineHeight:1.6}}>
      <strong style={{color:"#C62828"}}>Crescendo</strong> = gradually louder. <strong style={{color:"#1565C0"}}>Diminuendo</strong> = gradually softer. These are the most powerful tools for building and releasing tension over time.
    </div>
  </div>
</div>);}
