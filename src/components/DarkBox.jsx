export function DarkBox({ title, children, gradient = 'linear-gradient(135deg,#1a1a1a,#252525)', labelColor = '#666' }) {
  return (
    <div style={{ background: gradient, borderRadius: 14, padding: '16px 20px', marginBottom: 16, color: '#fff', textAlign: 'center' }}>
      {title && <div style={{ fontSize: 10, color: labelColor, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>{title}</div>}
      {children}
    </div>
  );
}
