import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { ProgressionPlayer } from './_helpers';

export function Guide19(){
  const [root,_setRoot]=useState("C");
  return(<div>
    <DarkBox title="The backbone of jazz harmony"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>ii – V – I</strong> is to jazz what I – IV – V is to blues. It works because each chord is a fifth away from the next — the strongest resolution in music, chained together.
    </div></DarkBox>
    <ProgressionPlayer root={root} numerals={["2","5","1"]} chordTypes={["minor","major","major"]} color="#E65100" />
    <Card color="#E65100" title="Why ii – V – I works">
      {[{step:"ii (minor)",role:"Preparation — creates mild tension and forward motion.",ex:"Dm7 in the key of C"},
        {step:"V (dominant)",role:"Maximum tension — the dominant 7th NEEDS to resolve.",ex:"G7 in the key of C"},
        {step:"I (tonic)",role:"Resolution — home. The tension dissolves.",ex:"Cmaj7 in the key of C"},
      ].map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
        <span style={{fontWeight:700,color:"#E65100"}}>{s.step}</span> — <span style={{color:"#555"}}>{s.role}</span><br/>
        <span style={{fontSize:11,color:"#888"}}>{s.ex}</span>
      </div>))}
    </Card>
  </div>);
}
