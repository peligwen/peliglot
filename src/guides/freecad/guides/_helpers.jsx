import { Insight as BaseInsight } from '../../../components/Insight';

export function Insight({text}){
  return <BaseInsight text={text} emoji={"\u{1F527}"} bg="#1a2f47" border="#2a4060" color="#e67e22" />;
}

export function Ref({name, text}) {
  return(<div style={{background:"#0f1e2d",borderRadius:10,padding:"10px 14px",marginBottom:12,border:"1px solid #243a52",fontSize:12,color:"#8fa3b8",lineHeight:1.5}}>
    📘 <strong style={{color:"#aaa"}}>{name}:</strong> {text}
  </div>);
}

export function btnStyle(active){
  return {padding:"6px 14px",borderRadius:8,border:active?"2px solid #e67e22":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#e67e22":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13};
}

export function SketchDiagram({geometry=[],constraints=[],dimensions=[],highlights=[],title,width=320,height=220,bg="#0f1e2d"}){
  const GRID_MINOR=10;const GRID_MAJOR=50;
  const normalColor="#8fa3b8";const accentColor="#e67e22";const dimColor="#f39c12";const constraintColor="#e67e22";

  const gridLines=[];
  for(let x=0;x<=width;x+=GRID_MINOR){gridLines.push(<line key={"gx"+x} x1={x} y1={0} x2={x} y2={height} stroke={x%GRID_MAJOR===0?"#1e3a56":"#152333"} strokeWidth={x%GRID_MAJOR===0?0.8:0.4}/>);}
  for(let y=0;y<=height;y+=GRID_MINOR){gridLines.push(<line key={"gy"+y} x1={0} y1={y} x2={width} y2={y} stroke={y%GRID_MAJOR===0?"#1e3a56":"#152333"} strokeWidth={y%GRID_MAJOR===0?0.8:0.4}/>);}

  function renderGeo(g,i){
    const hl=highlights.includes(i);const col=hl?accentColor:normalColor;const sw=hl?2:1;
    if(g.type==="line"){const dash=g.construction?"6,4":undefined;return(<line key={i} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} stroke={col} strokeWidth={sw} strokeDasharray={dash}/>);}
    if(g.type==="circle"){const dash=g.construction?"6,4":undefined;return(<circle key={i} cx={g.cx} cy={g.cy} r={g.r} fill="none" stroke={col} strokeWidth={sw} strokeDasharray={dash}/>);}
    if(g.type==="arc"){
      const s=g.start*(Math.PI/180);const e=g.end*(Math.PI/180);
      const x1=g.cx+g.r*Math.cos(s);const y1=g.cy+g.r*Math.sin(s);
      const x2=g.cx+g.r*Math.cos(e);const y2=g.cy+g.r*Math.sin(e);
      const large=(g.end-g.start)>180?1:0;
      return(<path key={i} d={`M${x1},${y1} A${g.r},${g.r} 0 ${large},1 ${x2},${y2}`} fill="none" stroke={col} strokeWidth={sw}/>);
    }
    if(g.type==="point"){return(<circle key={i} cx={g.x} cy={g.y} r={3} fill={col}/>);}
    return null;
  }

  function renderConstraint(c,i){
    const {x,y}=c.at;const col=constraintColor;
    if(c.type==="coincident"){return(<circle key={"c"+i} cx={x} cy={y} r={4} fill={col}/>);}
    if(c.type==="horizontal"){return(<g key={"c"+i}><line x1={x-6} y1={y} x2={x-2} y2={y} stroke={col} strokeWidth={1.5}/><line x1={x+2} y1={y} x2={x+6} y2={y} stroke={col} strokeWidth={1.5}/></g>);}
    if(c.type==="vertical"){return(<g key={"c"+i}><line x1={x} y1={y-6} x2={x} y2={y-2} stroke={col} strokeWidth={1.5}/><line x1={x} y1={y+2} x2={x} y2={y+6} stroke={col} strokeWidth={1.5}/></g>);}
    if(c.type==="parallel"){return(<g key={"c"+i}><line x1={x-4} y1={y-4} x2={x+4} y2={y-4} stroke={col} strokeWidth={1.5}/><line x1={x-4} y1={y+4} x2={x+4} y2={y+4} stroke={col} strokeWidth={1.5}/></g>);}
    if(c.type==="perpendicular"){return(<g key={"c"+i}><line x1={x-5} y1={y+5} x2={x-5} y2={y-5} stroke={col} strokeWidth={1.5}/><line x1={x-5} y1={y+5} x2={x+5} y2={y+5} stroke={col} strokeWidth={1.5}/></g>);}
    if(c.type==="tangent"){return(<text key={"c"+i} x={x} y={y+4} textAnchor="middle" fontSize={11} fill={col} fontWeight={700}>T</text>);}
    if(c.type==="equal"){return(<g key={"c"+i}><line x1={x-5} y1={y-2} x2={x+5} y2={y-2} stroke={col} strokeWidth={1.5}/><line x1={x-5} y1={y+2} x2={x+5} y2={y+2} stroke={col} strokeWidth={1.5}/></g>);}
    if(c.type==="symmetric"){return(<g key={"c"+i}><line x1={x-6} y1={y-3} x2={x-6} y2={y+3} stroke={col} strokeWidth={1.5}/><line x1={x-4} y1={y} x2={x-1} y2={y} stroke={col} strokeWidth={1}/><line x1={x+1} y1={y} x2={x+4} y2={y} stroke={col} strokeWidth={1}/><line x1={x+6} y1={y-3} x2={x+6} y2={y+3} stroke={col} strokeWidth={1.5}/></g>);}
    if(c.type==="fix"){return(<g key={"c"+i}><rect x={x-4} y={y} width={8} height={6} fill="none" stroke={col} strokeWidth={1.5}/><line x1={x} y1={y-4} x2={x} y2={y} stroke={col} strokeWidth={1.5}/><line x1={x-5} y1={y+6} x2={x+5} y2={y+6} stroke={col} strokeWidth={1.5}/></g>);}
    return null;
  }

  function renderDimension(d,i){
    const mx=(d.from.x+d.to.x)/2;const my=(d.from.y+d.to.y)/2;
    return(<g key={"d"+i}>
      <line x1={d.from.x} y1={d.from.y} x2={d.to.x} y2={d.to.y} stroke={dimColor} strokeWidth={0.8} strokeDasharray="4,3"/>
      <text x={mx} y={my-4} textAnchor="middle" fontSize={10} fill={dimColor} fontWeight={600}>{d.value}</text>
    </g>);
  }

  return(<div style={{marginBottom:16}}>
    {title&&<div style={{fontSize:12,fontWeight:700,color:"#8fa3b8",marginBottom:6,textAlign:"center"}}>{title}</div>}
    <div style={{display:"flex",justifyContent:"center"}}>
      <svg width={width} height={height} style={{background:bg,borderRadius:10,border:"1px solid #243a52",display:"block"}}>
        {gridLines}
        {geometry.map((g,i)=>renderGeo(g,i))}
        {dimensions.map((d,i)=>renderDimension(d,i))}
        {constraints.map((c,i)=>renderConstraint(c,i))}
      </svg>
    </div>
  </div>);
}

export function FeatureTree({nodes=[],title}){
  function renderNode(node,depth){
    const indent=depth*12;const hasChildren=node.children&&node.children.length>0;
    return(<div key={node.label+depth}>
      <div style={{display:"flex",alignItems:"center",padding:"4px 8px",paddingLeft:8+indent,background:node.tip?"#3a2418":node.highlighted?"#1e3a56":"transparent",borderRadius:6,marginBottom:2,border:node.tip?"1px solid #e67e22":"none"}}>
        <span style={{color:"#607387",fontSize:10,marginRight:4}}>{hasChildren?"▸":"·"}</span>
        <span style={{fontSize:13,marginRight:6}}>{node.icon}</span>
        <span style={{fontSize:13,color:node.tip||node.highlighted?"#e67e22":"#c8d8e8",fontWeight:node.tip||node.highlighted?700:400}}>{node.label}</span>
        {node.tip&&<span style={{marginLeft:8,fontSize:9,padding:"1px 7px",borderRadius:4,background:"#e67e22",color:"#1a1510",fontWeight:800,letterSpacing:1}}>TIP</span>}
      </div>
      {hasChildren&&node.children.map(child=>renderNode(child,depth+1))}
    </div>);
  }
  return(<div style={{background:"#162a3d",borderRadius:12,border:"1px solid #243a52",padding:"10px 12px",marginBottom:16}}>
    {title&&<div style={{fontSize:10,color:"#607387",letterSpacing:2,textTransform:"uppercase",marginBottom:8,fontWeight:600}}>{title}</div>}
    {nodes.map(n=>renderNode(n,0))}
  </div>);
}
