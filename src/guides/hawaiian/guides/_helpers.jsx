import { Insight as BaseInsight } from '../../../components/Insight';

export function Insight({text}){return <BaseInsight text={text} emoji={"\u{1F33A}"} />;}
export function CultureNote({text}){return(<div style={{background:"#E8F5E9",borderRadius:10,padding:"10px 14px",marginBottom:12,border:"1px solid #C8E6C9",fontSize:12,color:"#2E7D32",lineHeight:1.5}}>{"\u{1F33F}"} <strong>Cultural note:</strong> {text}</div>);}
export function Hw({children}){return <span style={{fontStyle:"italic",color:"#2E7D32",fontWeight:600}}>{children}</span>;}
