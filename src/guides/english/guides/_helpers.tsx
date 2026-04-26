import type { ReactElement } from 'react';

export function Trampa({ text }: { text: string }): ReactElement {
  return (
    <div style={{background:"#FFEBEE",borderRadius:10,padding:"10px 14px",marginBottom:12,border:"1px solid #FFCDD2",fontSize:12,color:"#C62828",lineHeight:1.5}}>
      {"⚠️"} <strong>Trampa:</strong> {text}
    </div>
  );
}

export function Chatt({ text }: { text: string }): ReactElement {
  return (
    <div style={{background:"#E3F2FD",borderRadius:10,padding:"10px 14px",marginBottom:12,border:"1px solid #BBDEFB",fontSize:12,color:"#0D47A1",lineHeight:1.5}}>
      {"\u{1F3D4}"} <strong>En Chattanooga:</strong> {text}
    </div>
  );
}
