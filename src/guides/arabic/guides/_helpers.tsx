import type { ReactNode, ReactElement } from 'react';

interface PalNoteProps { text: string; }
interface ArProps { children: ReactNode; }

export function PalNote({ text }: PalNoteProps): ReactElement {
  return (
    <div style={{background:"#E8F5E9",borderRadius:10,padding:"10px 14px",marginBottom:12,border:"1px solid #C8E6C9",fontSize:12,color:"#2E7D32",lineHeight:1.5}}>
      {"\u{1F1F5}\u{1F1F8}"} <strong>Palestinian:</strong> {text}
    </div>
  );
}

export function Ar({ children }: ArProps): ReactElement {
  return <span style={{fontFamily:"'Noto Sans Arabic','Amiri','Scheherazade New',serif",fontSize:"1.15em",direction:"rtl",unicodeBidi:"isolate"}}>{children}</span>;
}

export function ArBig({ children }: ArProps): ReactElement {
  return <span style={{fontFamily:"'Noto Sans Arabic','Amiri','Scheherazade New',serif",fontSize:"1.6em",direction:"rtl",unicodeBidi:"isolate",fontWeight:700}}>{children}</span>;
}
