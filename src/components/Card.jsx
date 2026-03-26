export function Card({ color, title, subtitle, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #e0dcd5', marginBottom: 16 }}>
      <div style={{ background: color, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontSize: 15, fontWeight: 800 }}>{title}</span>
        {subtitle && <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}
