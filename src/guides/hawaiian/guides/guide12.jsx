import { Card } from '../../../components/Card';
import { SimpleGuide } from '../../../components/SimpleGuide';

export function Guide12(){
  const poss=[
    {en:"my",o:"ko\u02BBu",a:"ka\u02BBu"},{en:"your (s)",o:"kou",a:"k\u0101u"},{en:"his/her",o:"kona",a:"k\u0101na"},
    {en:"our (2 incl)",o:"ko k\u0101ua",a:"k\u0101 k\u0101ua"},{en:"our (3+ incl)",o:"ko k\u0101kou",a:"k\u0101 k\u0101kou"},
    {en:"our (2 excl)",o:"ko m\u0101ua",a:"k\u0101 m\u0101ua"},{en:"our (3+ excl)",o:"ko m\u0101kou",a:"k\u0101 m\u0101kou"},
    {en:"your (pl)",o:"ko \u02BBoukou",a:"k\u0101 \u02BBoukou"},{en:"their",o:"ko l\u0101kou",a:"k\u0101 l\u0101kou"},
  ];
  return(<div>
    <Card color="#1565C0" title="Possessive Pronouns" subtitle="O-class vs A-class">
      <div style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"2px solid #eee"}}>
        <div></div><div style={{textAlign:"center",color:"#0D47A1"}}>O-CLASS</div><div style={{textAlign:"center",color:"#C62828"}}>A-CLASS</div>
      </div>
      {poss.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",padding:"6px 14px",borderBottom:i<poss.length-1?"1px solid #f0eeeb":"none",alignItems:"center"}}>
        <span style={{fontSize:12,color:"#888"}}>{p.en}</span>
        <span style={{textAlign:"center",fontSize:14,fontWeight:700,color:"#0D47A1",fontStyle:"italic"}}>{p.o}</span>
        <span style={{textAlign:"center",fontSize:14,fontWeight:700,color:"#C62828",fontStyle:"italic"}}>{p.a}</span>
      </div>))}
    </Card>
    <SimpleGuide items={[
      {h:"Examples with O-class",b:"ko\u02BBu makuahine = my mother\nkou hale = your house\nkona inoa = his/her name"},
      {h:"Examples with A-class",b:"ka\u02BBu puke = my book\nk\u0101u hana = your work\nk\u0101na keiki = his/her child (younger)"},
    ]}/>
  </div>);
}
