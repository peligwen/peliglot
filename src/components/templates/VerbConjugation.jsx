import { Card } from '../Card';

/**
 * VerbConjugation — reusable conjugation table template.
 *
 * Props:
 *   pronouns  — array of pronoun strings (e.g. ["yo","tú","él/ella",...])
 *   stem      — verb stem shown in gray
 *   endings   — array of endings (same length as pronouns), highlighted in color
 *   verb      — verb infinitive (Card title)
 *   meaning   — translation (Card subtitle)
 *   color     — accent color for endings + Card header
 *   compact   — if true, renders smaller rows without Card wrapper
 *   title     — used instead of verb when compact (header bar label)
 */
export function VerbConjugation({
  pronouns,
  stem,
  endings,
  verb,
  meaning,
  color,
  compact = false,
  title,
}) {
  if (compact) {
    return (
      <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #eee" }}>
        <div style={{ background: color, padding: "8px 12px", color: "#fff", fontSize: 13, fontWeight: 700 }}>{title || verb}</div>
        {pronouns.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 12px", height: 30, borderBottom: i < pronouns.length - 1 ? "1px solid #f5f3ef" : "none", fontSize: 12 }}>
            <span style={{ color: "#aaa", width: 40 }}>{p}</span>
            <span style={{ fontWeight: 700 }}>
              <span style={{ color: "#999" }}>{stem}</span>
              <span style={{ color }}>{endings[i]}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card color={color} title={verb} subtitle={meaning}>
      {pronouns.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", padding: "0 16px", height: 44, borderBottom: i < pronouns.length - 1 ? "1px solid #f0eeeb" : "none" }}>
          <div style={{ width: 110, fontSize: 12, color: "#999", fontWeight: 500 }}>{p}</div>
          <div style={{ flex: 1, fontSize: 17, fontWeight: 700 }}>
            <span style={{ color: "#999" }}>{stem}</span>
            <span style={{ color, background: `${color}18`, padding: "1px 4px", borderRadius: 3 }}>{endings[i]}</span>
          </div>
        </div>
      ))}
    </Card>
  );
}
