export function SimpleGuide({ items }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '10px 14px', border: '1px solid #e0dcd5', marginBottom: 6 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{item.h}</div>
          <div style={{ fontSize: 12, color: '#666', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.b}</div>
        </div>
      ))}
    </div>
  );
}
