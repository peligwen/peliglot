import { useState } from 'react';
import { Insight as BaseInsight } from '../../../components/Insight';

/* ── Domain-specific Insight wrappers ── */

export function NetTip({ text }) {
  return <BaseInsight text={text} emoji="💡" bg="#E1F5FE" border="#4FC3F7" color="#01579B" />;
}

export function Warning({ text }) {
  return <BaseInsight text={text} emoji="⚠️" bg="#FFF3E0" border="#FFB74D" color="#E65100" />;
}

export function SupportTip({ text }) {
  return <BaseInsight text={text} emoji="🎧" bg="#F3E5F5" border="#CE93D8" color="#6A1B9A" />;
}

/* ── Term — inline highlighted technical term ── */

export function Term({ children, color = "#0277BD" }) {
  return <span style={{ fontWeight: 700, color }}>{children}</span>;
}

/* ── StatusBadge — colored status indicator ── */

export function StatusBadge({ label, color = "#4CAF50" }) {
  return (
    <span style={{
      display: "inline-block", background: color + "22", color,
      padding: "2px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700,
      border: `1px solid ${color}44`,
    }}>{label}</span>
  );
}

/* ── GlossaryCard — flip-card term definitions ── */

export function GlossaryCard({ terms, filterCategories }) {
  const [filter, setFilter] = useState("All");
  const [flipped, setFlipped] = useState({});

  const filtered = filter === "All" ? terms : terms.filter(t => t.cat === filter);
  const cats = ["All", ...(filterCategories || [...new Set(terms.map(t => t.cat))])];

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
            background: filter === c ? "#0277BD" : "#fff",
            color: filter === c ? "#fff" : "#2C3E50",
            border: `1px solid ${filter === c ? "#0277BD" : "#AED6F1"}`,
          }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
        {filtered.map((t, i) => {
          const key = `${t.term}-${i}`;
          const isFlipped = flipped[key];
          return (
            <div key={key} onClick={() => setFlipped(prev => ({ ...prev, [key]: !prev[key] }))}
              style={{
                minHeight: 100, borderRadius: 12, cursor: "pointer", padding: 16,
                background: isFlipped ? "#E1F5FE" : "#fff",
                border: `1px solid ${isFlipped ? "#0277BD" : "#AED6F1"}`,
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                textAlign: "center", transition: "all 0.2s",
              }}>
              {!isFlipped ? (
                <>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>{t.term}</div>
                  {t.abbr && <div style={{ fontSize: 11, color: "#0277BD", marginTop: 4 }}>{t.abbr}</div>}
                  <div style={{ fontSize: 10, color: "#5D6D7E", marginTop: 6 }}>tap to reveal</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#0277BD", marginBottom: 6 }}>{t.term}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.5, color: "#333" }}>{t.def}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── NetworkDiagram — interactive clickable topology (vertical layout) ── */

export function NetworkDiagram({ nodes, connections, title }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ margin: "12px 0" }}>
      {title && <div style={{ fontSize: 13, fontWeight: 700, color: "#5D6D7E", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>{title}</div>}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, padding: 16, background: "#D6EAF8", borderRadius: 12, border: "1px solid #AED6F1" }}>
        {nodes.map((node, i) => (
          <div key={node.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div onClick={() => setSelected(selected === node.id ? null : node.id)}
              style={{
                padding: "12px 18px", borderRadius: 10, cursor: "pointer", textAlign: "center",
                background: selected === node.id ? "#0277BD" : "#fff",
                border: `2px solid ${selected === node.id ? "#0277BD" : "#AED6F1"}`,
                color: selected === node.id ? "#fff" : "#1a1a1a",
                transition: "all 0.2s", minWidth: 120,
              }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{node.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{node.label}</div>
              {node.sub && <div style={{ fontSize: 10, color: selected === node.id ? "#E1F5FE" : "#5D6D7E", marginTop: 2 }}>{node.sub}</div>}
            </div>
            {i < nodes.length - 1 && (
              <div style={{ padding: "6px 0", color: "#5D6D7E", fontSize: 16, fontWeight: 700 }}>
                {connections?.[i] ? "↓" : "↓"}
              </div>
            )}
          </div>
        ))}
      </div>
      {selected && (() => {
        const node = nodes.find(n => n.id === selected);
        return node?.detail ? (
          <div style={{
            marginTop: 8, padding: 14, borderRadius: 10,
            background: "#fff", border: "1px solid #0277BD",
            fontSize: 13, lineHeight: 1.7, color: "#333",
          }}>
            <span style={{ fontWeight: 700, color: "#0277BD" }}>{node.label}: </span>
            {node.detail}
          </div>
        ) : null;
      })()}
    </div>
  );
}

/* ── TroubleshootingSim — decision-tree troubleshooting simulation ── */

export function TroubleshootingSim({ title, scenario, steps }) {
  const [current, setCurrent] = useState("start");
  const [path, setPath] = useState([]);

  const step = steps[current];
  if (!step) return null;

  const handleChoice = (nextId) => {
    setPath(prev => [...prev, current]);
    setCurrent(nextId);
  };

  const handleBack = () => {
    if (path.length === 0) return;
    const prev = [...path];
    const last = prev.pop();
    setPath(prev);
    setCurrent(last);
  };

  const handleRestart = () => {
    setCurrent("start");
    setPath([]);
  };

  return (
    <div style={{ margin: "12px 0", borderRadius: 12, overflow: "hidden", border: "1px solid #AED6F1" }}>
      <div style={{ background: "#C62828", color: "#fff", padding: "10px 16px", fontSize: 13, fontWeight: 700 }}>
        🔍 {title}
      </div>
      {scenario && current === "start" && (
        <div style={{ background: "#E8F0FE", padding: "12px 16px", fontSize: 13, color: "#333", borderBottom: "1px solid #AED6F1", lineHeight: 1.6 }}>
          <strong style={{ color: "#E65100" }}>Scenario:</strong> {scenario}
        </div>
      )}
      <div style={{ background: "#D6EAF8", padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 14, lineHeight: 1.5 }}>
          {step.question}
        </div>
        {step.info && (
          <div style={{ fontSize: 12, color: "#0277BD", marginBottom: 12, padding: "8px 12px", background: "#fff", borderRadius: 8, lineHeight: 1.5 }}>
            {step.info}
          </div>
        )}
        {step.choices ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {step.choices.map((choice, i) => (
              <button key={i} onClick={() => handleChoice(choice.next)} style={{
                padding: "10px 14px", borderRadius: 8, cursor: "pointer", textAlign: "left",
                background: "#fff", border: "1px solid #AED6F1", color: "#1a1a1a",
                fontSize: 13, lineHeight: 1.4, transition: "all 0.15s",
              }}>
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <div style={{
            padding: "14px 16px", borderRadius: 10, fontSize: 13, lineHeight: 1.6,
            background: step.success ? "#E8F5E9" : "#FFEBEE",
            border: `1px solid ${step.success ? "#4CAF50" : "#EF5350"}`,
            color: step.success ? "#2E7D32" : "#C62828",
          }}>
            <strong>{step.success ? "✅ Resolution:" : "⚠️ Result:"}</strong> {step.result}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {path.length > 0 && (
            <button onClick={handleBack} style={{
              padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12,
              background: "transparent", border: "1px solid #AED6F1", color: "#5D6D7E",
            }}>← Back</button>
          )}
          {(path.length > 0 || !step.choices) && (
            <button onClick={handleRestart} style={{
              padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12,
              background: "transparent", border: "1px solid #AED6F1", color: "#5D6D7E",
            }}>↺ Restart</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── CompareTable — side-by-side comparison (e.g. Nokia vs Calix) ── */

export function CompareTable({ headers, rows, colors }) {
  const c = colors || ["#1565C0", "#00838F"];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: "10px 14px", textAlign: "left", fontWeight: 700,
                background: i === 0 ? "#D6EAF8" : c[(i - 1) % c.length] + "22",
                color: i === 0 ? "#2C3E50" : c[(i - 1) % c.length],
                borderBottom: "2px solid #AED6F1",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: "8px 14px", borderBottom: "1px solid #AED6F1",
                  color: j === 0 ? "#1a1a1a" : "#333",
                  fontWeight: j === 0 ? 600 : 400,
                  background: j === 0 ? "#EBF5FB" : "transparent",
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── LEDIndicator — visual LED status display ── */

export function LEDIndicator({ label, color = "#4CAF50", status = "solid" }) {
  const animation = status === "blink" ? "ledBlink 1s infinite" : "none";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginRight: 16, marginBottom: 6 }}>
      <style>{`@keyframes ledBlink{0%,100%{opacity:1}50%{opacity:0.2}}`}</style>
      <div style={{
        width: 12, height: 12, borderRadius: "50%", background: color,
        boxShadow: `0 0 6px ${color}88`, animation,
      }} />
      <span style={{ fontSize: 12, color: "#333" }}>{label}</span>
    </div>
  );
}

/* ── StepFlow — numbered step-by-step process ── */

export function StepFlow({ steps, color = "#0277BD" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "4px 0" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{
            background: color, color: "#fff", borderRadius: "50%",
            width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, flexShrink: 0,
          }}>{i + 1}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: "#333", paddingTop: 4 }}>{step}</div>
        </div>
      ))}
    </div>
  );
}
