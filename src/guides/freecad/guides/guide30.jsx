import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide30(){
  const pitfalls=[
    {name:"Toponaming (TNP)",color:"#e74c3c",symptom:"Red error: \"Missing reference\" after editing an upstream feature",recovery:"Edit the sketch/feature with the broken reference, re-pick the current face or datum. FreeCAD 1.0 reduces this drastically — legacy files still suffer."},
    {name:"Broken sketch (open contour)",color:"#e67e22",symptom:"Pad/Pocket fails with 'sketch is not closed' even though it looks fine",recovery:"View > Sketch > Highlight missing constraints or Show missing coincidents. Find the gap — usually a near-miss endpoint. Add coincident constraint or fix the overlap."},
    {name:"Self-intersecting profile",color:"#e74c3c",symptom:"Pad fails, possibly with no clear error. Profile looks correct from a distance",recovery:"Open Sketch > Validate Sketch — it's the canonical recovery tool: highlights overlapping/crossing edges, missing coincidents, and reversed segments in one pass. Then zoom to the highlighted spot and trim or delete."},
    {name:"Circular dependency",color:"#9b59b6",symptom:"'Recursive reference' error, usually when a ShapeBinder or expression loops back",recovery:"Delete the binder or expression causing the loop. Rebuild using a feature that is strictly upstream. Avoid referencing the Tip of a Body from within that same Body."},
    {name:"Crash during long operation",color:"#e67e22",symptom:"FreeCAD closes unexpectedly during Loft, complex Pad, or mesh conversion",recovery:"Reopen the file — FreeCAD creates .FCBak backups next to the .FCStd. To open one, rename it from foo.FCStd1.FCBak → foo.FCStd (issue #26833 — FreeCAD won't open .FCBak directly). Edit > Preferences > General > Backup: keep ≥ 3. Save constantly with Ctrl+S."},
    {name:"Jagged STL curves",color:"#e74c3c",symptom:"Exported STL has visible faceting even though the model looks smooth in FreeCAD",recovery:"Re-export with finer mesh settings: reduce Angular deviation (5° or less) and Max edge length (0.1mm). Or use Mesh workbench > Mesh from Shape for explicit control."},
  ];
  return(<div>
    <DarkBox title="PITFALLS &amp; RECOVERY"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      FreeCAD is powerful but has <strong style={{color:"#e74c3c"}}>sharp edges</strong>. These six pitfalls account for most lost hours. Knowing the symptom before you hit it means you spend 5 minutes recovering, not 2 hours confused.
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
      {pitfalls.map((p,i)=>(<div key={i} style={{background:"#162a3d",borderRadius:10,border:`1px solid ${p.color}44`,overflow:"hidden"}}>
        <div style={{padding:"8px 12px",background:p.color+"22",borderBottom:`1px solid ${p.color}33`}}>
          <div style={{fontSize:13,fontWeight:800,color:p.color}}>{p.name}</div>
        </div>
        <div style={{padding:"8px 12px"}}>
          <div style={{fontSize:11,color:"#607387",marginBottom:4,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Symptom</div>
          <div style={{fontSize:12,color:"#e8ecf0",lineHeight:1.4,marginBottom:8}}>{p.symptom}</div>
          <div style={{fontSize:11,color:"#607387",marginBottom:4,fontWeight:600,textTransform:"uppercase",letterSpacing:0.5}}>Recovery</div>
          <div style={{fontSize:12,color:"#8fa3b8",lineHeight:1.4}}>{p.recovery}</div>
        </div>
      </div>))}
    </div>
    <Insight text="Save every 2 minutes. Enable backups (keep 3). Never work on an unsaved file for an hour. FreeCAD's crash recovery is improving but still not bulletproof — your Ctrl+S habit is the best insurance policy." />
  </div>);
}
