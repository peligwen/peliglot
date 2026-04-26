import { DarkBox } from '../../../components/DarkBox';

export function Guide16(){
  const forms=[
    {form:"du",who:"One friend, child, family member, pet",verb:"du bist, du hast, du kommst",color:"#2E7D32"},
    {form:"ihr",who:"Multiple people you'd each call 'du'",verb:"ihr seid, ihr habt, ihr kommt",color:"#E65100"},
    {form:"Sie",who:"Strangers, bosses, elders, service (always capitalized!)",verb:"Sie sind, Sie haben, Sie kommen",color:"#1565C0"},
  ];
  return(<div>
    {forms.map((f,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:`2px solid ${f.color}`,marginBottom:8}}>
      <div style={{fontSize:22,fontWeight:800,color:f.color,marginBottom:4}}>{f.form}</div>
      <div style={{fontSize:13,color:"#555",marginBottom:4}}>{f.who}</div>
      <div style={{fontSize:12,color:"#888",fontStyle:"italic"}}>{f.verb}</div>
    </div>))}
    <DarkBox title="Navigating the du/Sie boundary"><div style={{fontSize:13,lineHeight:1.6,textAlign:"left"}}>
      • Wait for the other person to offer 'du' (<strong style={{color:"#FFE77A"}}>Duzen</strong>)<br/>
      • Workplaces vary — tech is mostly du, law/banking is Sie<br/>
      • When in doubt, <strong style={{color:"#FFE77A"}}>use Sie</strong>. It's never wrong to be too formal<br/>
      • Once you switch to du, you can't go back to Sie
    </div></DarkBox>
  </div>);
}
