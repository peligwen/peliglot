import type { GuideMeta, CategoryColors } from '../../types/guide';

export const guidesMeta: GuideMeta[] = [
  {id:1,title:"New File & Units",subtitle:"Project setup, metric, save habits",cat:"Setup",color:"#e67e22",icon:"📄"},
  {id:2,title:"Workbenches Tour",subtitle:"Where to find what you need",cat:"Setup",color:"#d35400",icon:"🧰"},
  {id:3,title:"Navigation & View",subtitle:"Mouse styles, nav cube, shortcuts",cat:"Setup",color:"#e67e22",icon:"🧭"},
  {id:4,title:"Starting a Sketch",subtitle:"Plane vs face — pick wisely",cat:"Sketching",color:"#f39c12",icon:"✏️"},
  {id:5,title:"Lines & Polylines",subtitle:"Drawing the skeleton",cat:"Sketching",color:"#e8a317",icon:"📏"},
  {id:6,title:"Circles & Arcs",subtitle:"Center, 3-point, tangent",cat:"Sketching",color:"#f39c12",icon:"⭕"},
  {id:7,title:"Rectangles & Polygons",subtitle:"Boxes, centered, N-sided",cat:"Sketching",color:"#e8a317",icon:"⬛"},
  {id:8,title:"Construction Geometry",subtitle:"Reference lines that don't build",cat:"Sketching",color:"#f39c12",icon:"📐"},
  {id:9,title:"Sketch Editing",subtitle:"Trim, extend, split, fillet, offset",cat:"Sketching",color:"#e8a317",icon:"✂️"},
  {id:10,title:"Geometric Constraints",subtitle:"Coincident, parallel, tangent, equal",cat:"Constraints",color:"#3498db",icon:"🔗"},
  {id:11,title:"Dimensional Constraints",subtitle:"Distance, radius, angle, expressions",cat:"Constraints",color:"#2980b9",icon:"📏"},
  {id:12,title:"Fully Constraining",subtitle:"Reading DoF and going green",cat:"Constraints",color:"#3498db",icon:"✅"},
  {id:13,title:"Symmetry & Centerlines",subtitle:"Mirror about an axis",cat:"Constraints",color:"#2980b9",icon:"🪞"},
  {id:14,title:"Pad",subtitle:"Extrude a sketch into solid",cat:"Features",color:"#27ae60",icon:"⬆️"},
  {id:15,title:"Pocket",subtitle:"Subtract a sketch from solid",cat:"Features",color:"#229954",icon:"⬇️"},
  {id:16,title:"Revolution & Groove",subtitle:"Spin a profile around an axis",cat:"Features",color:"#27ae60",icon:"🔄"},
  {id:17,title:"Loft & Additive Pipe",subtitle:"Profile-to-profile, sweep a path",cat:"Features",color:"#229954",icon:"🌊"},
  {id:18,title:"Hole Feature",subtitle:"Parametric screw holes",cat:"Features",color:"#27ae60",icon:"🕳️"},
  {id:19,title:"Fillet & Chamfer",subtitle:"Round or bevel edges",cat:"Features",color:"#229954",icon:"🔘"},
  {id:20,title:"Heat-Set Inserts",subtitle:"Brass threads for printed plastic",cat:"3D Printing",color:"#e74c3c",icon:"🧷"},
  {id:21,title:"Linear, Polar, Mirror Patterns",subtitle:"Duplicate features parametrically",cat:"Features",color:"#229954",icon:"▦"},
  {id:22,title:"Body & Part Containers",subtitle:"Tip, visibility, multi-body",cat:"Structure",color:"#9b59b6",icon:"📦"},
  {id:23,title:"Datum Planes & Axes",subtitle:"Stable reference geometry",cat:"Structure",color:"#8e44ad",icon:"✈️"},
  {id:24,title:"Spreadsheet Parameters",subtitle:"Drive dimensions from a table",cat:"Structure",color:"#9b59b6",icon:"📊"},
  {id:25,title:"ShapeBinders & External Geo",subtitle:"Safe cross-body references",cat:"Structure",color:"#8e44ad",icon:"🔀"},
  {id:26,title:"STEP & Mesh Import",subtitle:"Bringing in other formats",cat:"3D Printing",color:"#e74c3c",icon:"📥"},
  {id:27,title:"Walls & Overhangs",subtitle:"Designing for FDM limits",cat:"3D Printing",color:"#c0392b",icon:"🧱"},
  {id:28,title:"Tolerances & Clearance",subtitle:"Screw holes, press fits, slip fits",cat:"3D Printing",color:"#e74c3c",icon:"🔩"},
  {id:29,title:"STL Export & Orientation",subtitle:"Getting to the slicer",cat:"3D Printing",color:"#c0392b",icon:"📤"},
  {id:30,title:"Pitfalls & Recovery",subtitle:"TNP, broken sketches, saves",cat:"3D Printing",color:"#e74c3c",icon:"🚨"},
];

export const categories: string[] = ["Setup","Sketching","Constraints","Features","Structure","3D Printing"];

export const catColors: CategoryColors = {"Setup":"#e67e22","Sketching":"#f39c12","Constraints":"#3498db","Features":"#27ae60","Structure":"#9b59b6","3D Printing":"#e74c3c"};
