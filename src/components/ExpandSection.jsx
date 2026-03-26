import { useState } from 'react';

export function ExpandSection({ label, color, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 8 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '10px 16px', borderRadius: 10,
          border: '1.5px solid #e0dcd5',
          background: open ? (color || '#1a1a1a') : '#fff',
          color: open ? '#fff' : '#555',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <span>{label}</span>
        <span style={{ fontSize: 16, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>{'\u2304'}</span>
      </button>
      {open && <div style={{ marginTop: 8 }}>{children}</div>}
    </div>
  );
}
