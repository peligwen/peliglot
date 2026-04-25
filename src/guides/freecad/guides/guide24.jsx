import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide24(){
  const rows=[
    {cell:"B1",alias:"width",value:"40 mm"},
    {cell:"B2",alias:"height",value:"20 mm"},
    {cell:"B3",alias:"depth",value:"10 mm"},
    {cell:"B4",alias:"wall",value:"2 mm"},
    {cell:"B5",alias:"screw_clearance",value:"3.2 mm"},
    {cell:"B6",alias:"screw_count",value:"4"},
  ];
  return(<div>
    <DarkBox title="SPREADSHEET PARAMETERS"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      FreeCAD&apos;s <strong style={{color:"#9b59b6"}}>Spreadsheet workbench</strong> is first-class. Name cells with <strong style={{color:"#e67e22"}}>aliases</strong>, then reference them from sketch dimensions, Pad lengths, pattern counts — anywhere you&apos;d type a number.
    </div></DarkBox>
    <div style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52",overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"7px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",display:"grid",gridTemplateColumns:"60px 1fr 100px"}}>
        <span>Cell</span><span>Alias</span><span style={{textAlign:"right"}}>Value</span>
      </div>
      {rows.map((row,i)=>(<div key={i} style={{padding:"6px 14px",borderTop:"1px solid #1e3a56",display:"grid",gridTemplateColumns:"60px 1fr 100px",alignItems:"center"}}>
        <span style={{fontSize:12,color:"#607387",fontFamily:"monospace"}}>{row.cell}</span>
        <span style={{fontSize:13,color:"#9b59b6",fontWeight:700,fontFamily:"monospace"}}>{row.alias}</span>
        <span style={{fontSize:13,color:"#f39c12",textAlign:"right",fontFamily:"monospace"}}>{row.value}</span>
      </div>))}
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 14px",border:"1px solid #9b59b644",marginBottom:14}}>
      <div style={{fontSize:11,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,fontWeight:700}}>Using an alias in a sketch dimension</div>
      <div style={{fontSize:13,color:"#e8ecf0",lineHeight:1.6}}>Double-click a dimension → enter <code style={{color:"#9b59b6",background:"#1e3a56",borderRadius:4,padding:"1px 8px",fontSize:12}}>=Spreadsheet.width</code> → the dimension is now driven by the spreadsheet. Change the spreadsheet cell; every driven dimension updates automatically.</div>
      <div style={{marginTop:8,fontSize:12,color:"#8fa3b8"}}>To set an alias: right-click the cell → Properties → Alias tab → enter the name.</div>
    </div>
    <Insight text="For any part with more than 3 related dimensions, build a spreadsheet first, then model. Changing 'wall' from 2mm to 3mm re-drives the whole part instantly — no hunting for every dimension." />
  </div>);
}
