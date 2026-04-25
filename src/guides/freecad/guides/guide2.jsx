import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide2(){
  const wbs=[
    {name:"Part Design",use:"Parametric solid modeling",verdict:"LIVE HERE",vc:"#27ae60",note:"Your primary workbench for all 3D-print modeling."},
    {name:"Sketcher",use:"2D constrained sketching",verdict:"LIVE HERE",vc:"#27ae60",note:"Auto-activates when you open a sketch inside Part Design."},
    {name:"Draft",use:"2D export, arrays, DXF",verdict:"Useful",vc:"#f39c12",note:"Good for 2D patterns and array tools. Not for 3D work."},
    {name:"Part",use:"Boolean ops on STEP imports",verdict:"Occasionally",vc:"#e67e22",note:"Use only for imported STEP geometry. Not for parametric modeling."},
    {name:"Mesh",use:"STL import / mesh repair",verdict:"At boundaries",vc:"#e67e22",note:"Use at import/export only. Keep mesh and solid worlds separate."},
    {name:"TechDraw",use:"2D drawings of 3D models",verdict:"Optional",vc:"#8fa3b8",note:"For engineering drawings. Skip unless you need dimensioned prints."},
    {name:"Assembly",use:"Full parametric assembly",verdict:"Advanced",vc:"#8fa3b8",note:"Native in FreeCAD 1.0. Overkill for most single-print parts."},
    {name:"Spreadsheet",use:"Drive dims from a table",verdict:"Powerful",vc:"#3498db",note:"Covered in Guide 24 — the cleanest way to manage parameters."},
  ];
  return(<div>
    <DarkBox title="WORKBENCH MAP"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      FreeCAD groups tools into <strong style={{color:"#e67e22"}}>workbenches</strong>. For 3D printing, you live in <strong style={{color:"#27ae60"}}>Part Design</strong> and <strong style={{color:"#27ae60"}}>Sketcher</strong> — Sketcher activates automatically when you open a sketch inside Part Design. Switching workbenches only changes the toolbar; your model and history stay intact.
    </div></DarkBox>
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #243a52",overflow:"hidden",marginBottom:14}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",padding:"7px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",gap:8}}>
        <span>Workbench</span><span>Use for</span><span>Status</span>
      </div>
      {wbs.map((w,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",padding:"9px 14px",borderTop:"1px solid #1e3a56",gap:8,alignItems:"center"}}>
        <div><div style={{fontSize:13,color:"#e8ecf0",fontWeight:700}}>{w.name}</div><div style={{fontSize:11,color:"#607387"}}>{w.note}</div></div>
        <div style={{fontSize:12,color:"#8fa3b8"}}>{w.use}</div>
        <div style={{fontSize:11,color:w.vc,fontWeight:700,textAlign:"right",whiteSpace:"nowrap"}}>{w.verdict}</div>
      </div>))}
    </div>
    <Insight text="Activating a workbench just swaps the toolbar — your features and history don't move. Right-click any toolbar to mix tools across workbenches (e.g. enable Sketcher constraints while in Mesh) and you'll skip most of the constant switching tax." />
  </div>);
}
