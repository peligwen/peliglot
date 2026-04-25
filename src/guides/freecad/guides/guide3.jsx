import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide3(){
  const [nav,setNav]=useState(0);
  const styles=[
    {name:"CAD",desc:"Recommended for FreeCAD",rotate:"Middle-click + drag",pan:"Middle + Right click + drag",zoom:"Scroll wheel",tilt:"—"},
    {name:"Blender",desc:"Familiar to Blender users",rotate:"Middle-click + drag",pan:"Shift + Middle-click + drag",zoom:"Scroll wheel",tilt:"—"},
    {name:"Touchpad",desc:"For laptops without middle mouse",rotate:"Shift + Ctrl + drag",pan:"Shift + drag",zoom:"Pinch or Ctrl + drag",tilt:"—"},
  ];
  const shortcuts=[
    {key:"0",action:"Home / axonometric view"},
    {key:"1",action:"Front view"},
    {key:"2",action:"Top view"},
    {key:"3",action:"Right view"},
    {key:"4",action:"Rear view"},
    {key:"5",action:"Bottom view"},
    {key:"6",action:"Left view"},
    {key:"V, F",action:"Fit all (press V then F)"},
    {key:"V, P",action:"Toggle perspective"},
    {key:"Space",action:"Toggle visibility of selected"},
  ];
  const s=styles[nav];
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e67e22":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#e67e22":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  return(<div>
    <DarkBox title="NAV STYLES"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      Pick a <strong style={{color:"#e67e22"}}>mouse navigation style</strong> once and stick with it. Set it in <strong style={{color:"#f39c12"}}>Edit &gt; Preferences &gt; Navigation</strong>. Also enable the <strong style={{color:"#e67e22"}}>Navigation Cube</strong> in that panel — it&apos;s a live orientation widget in the top-right corner.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center"}}>
      {styles.map((st,i)=>(<button key={i} onClick={()=>setNav(i)} style={btnStyle(nav===i)}>{st.name}</button>))}
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 16px",border:"1px solid #243a52",marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,color:"#e67e22",marginBottom:8}}>{s.name} <span style={{fontSize:11,color:"#607387",fontWeight:400}}>— {s.desc}</span></div>
      <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:"6px 14px",fontSize:13}}>
        <span style={{color:"#607387",fontWeight:600}}>Rotate:</span><span style={{color:"#e8ecf0"}}>{s.rotate}</span>
        <span style={{color:"#607387",fontWeight:600}}>Pan:</span><span style={{color:"#e8ecf0"}}>{s.pan}</span>
        <span style={{color:"#607387",fontWeight:600}}>Zoom:</span><span style={{color:"#e8ecf0"}}>{s.zoom}</span>
      </div>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #243a52",overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"7px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase"}}>View shortcuts</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)"}}>
        {shortcuts.map((sc,i)=>(<div key={i} style={{padding:"7px 14px",borderBottom:i<shortcuts.length-2?"1px solid #1e3a56":"none",borderRight:i%2===0?"1px solid #1e3a56":"none",display:"flex",gap:10,alignItems:"center"}}>
          <kbd style={{background:"#1e3a56",border:"1px solid #2a4060",borderRadius:5,padding:"2px 7px",fontSize:11,color:"#f39c12",fontFamily:"monospace",fontWeight:700,whiteSpace:"nowrap"}}>{sc.key}</kbd>
          <span style={{fontSize:12,color:"#8fa3b8"}}>{sc.action}</span>
        </div>))}
      </div>
    </div>
    <Insight text="The navigation cube in the top-right is a shortcut for all views. Clicking a face jumps to that view. Dragging rotates. Corners = isometric. Learn it once; save thousands of keypresses." />
  </div>);
}
