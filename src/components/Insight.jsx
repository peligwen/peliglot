export function Insight({
  text,
  emoji = '\u{1F4A1}',
  bg = '#FFF8E7',
  border = '#F0E4C4',
  color = '#8B6914',
}) {
  return (
    <div style={{ background: bg, borderRadius: 10, padding: '10px 14px', marginBottom: 12, border: `1px solid ${border}`, fontSize: 12, color, lineHeight: 1.5 }}>
      {emoji} {text}
    </div>
  );
}
