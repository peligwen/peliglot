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

export function Term({ children, color = "#00BCD4" }) {
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
            background: filter === c ? "#00BCD4" : "#132D4A",
            color: filter === c ? "#fff" : "#8BACC8",
            border: `1px solid ${filter === c ? "#00BCD4" : "#1A3A5C"}`,
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
                background: isFlipped ? "#0D1F33" : "#132D4A",
                border: `1px solid ${isFlipped ? "#00BCD4" : "#1A3A5C"}`,
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                textAlign: "center", transition: "all 0.2s",
              }}>
              {!isFlipped ? (
                <>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#E0F7FA" }}>{t.term}</div>
                  {t.abbr && <div style={{ fontSize: 11, color: "#4FC3F7", marginTop: 4 }}>{t.abbr}</div>}
                  <div style={{ fontSize: 10, color: "#4A7A9B", marginTop: 6 }}>tap to reveal</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#00BCD4", marginBottom: 6 }}>{t.term}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.5, color: "#B0BEC5" }}>{t.def}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── NetworkDiagram — interactive clickable topology ── */

export function NetworkDiagram({ nodes, connections, title }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ margin: "12px 0" }}>
      {title && <div style={{ fontSize: 13, fontWeight: 700, color: "#B0BEC5", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>{title}</div>}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0, padding: 16, background: "#0D1F33", borderRadius: 12, border: "1px solid #1A3A5C" }}>
        {nodes.map((node, i) => (
          <div key={node.id} style={{ display: "flex", alignItems: "center" }}>
            <div onClick={() => setSelected(selected === node.id ? null : node.id)}
              style={{
                padding: "12px 18px", borderRadius: 10, cursor: "pointer", textAlign: "center",
                background: selected === node.id ? "#00BCD4" : "#132D4A",
                border: `2px solid ${selected === node.id ? "#00BCD4" : "#1A3A5C"}`,
                color: selected === node.id ? "#fff" : "#E0F7FA",
                transition: "all 0.2s", minWidth: 80,
              }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{node.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{node.label}</div>
              {node.sub && <div style={{ fontSize: 10, color: selected === node.id ? "#E0F7FA" : "#4A7A9B", marginTop: 2 }}>{node.sub}</div>}
            </div>
            {i < nodes.length - 1 && connections && (
              <div style={{ padding: "0 6px", color: "#4A7A9B", fontSize: 18, fontWeight: 700 }}>
                {connections[i] || "→"}
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
            background: "#132D4A", border: "1px solid #00BCD4",
            fontSize: 13, lineHeight: 1.7, color: "#B0BEC5",
          }}>
            <span style={{ fontWeight: 700, color: "#00BCD4" }}>{node.label}: </span>
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
    <div style={{ margin: "12px 0", borderRadius: 12, overflow: "hidden", border: "1px solid #1A3A5C" }}>
      <div style={{ background: "#C62828", color: "#fff", padding: "10px 16px", fontSize: 13, fontWeight: 700 }}>
        🔍 {title}
      </div>
      {scenario && current === "start" && (
        <div style={{ background: "#1A1A2E", padding: "12px 16px", fontSize: 13, color: "#B0BEC5", borderBottom: "1px solid #1A3A5C", lineHeight: 1.6 }}>
          <strong style={{ color: "#FFB74D" }}>Scenario:</strong> {scenario}
        </div>
      )}
      <div style={{ background: "#0D1F33", padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#E0F7FA", marginBottom: 14, lineHeight: 1.5 }}>
          {step.question}
        </div>
        {step.info && (
          <div style={{ fontSize: 12, color: "#4FC3F7", marginBottom: 12, padding: "8px 12px", background: "#132D4A", borderRadius: 8, lineHeight: 1.5 }}>
            {step.info}
          </div>
        )}
        {step.choices ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {step.choices.map((choice, i) => (
              <button key={i} onClick={() => handleChoice(choice.next)} style={{
                padding: "10px 14px", borderRadius: 8, cursor: "pointer", textAlign: "left",
                background: "#132D4A", border: "1px solid #1A3A5C", color: "#E0F7FA",
                fontSize: 13, lineHeight: 1.4, transition: "all 0.15s",
              }}>
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <div style={{
            padding: "14px 16px", borderRadius: 10, fontSize: 13, lineHeight: 1.6,
            background: step.success ? "#1B5E2022" : "#C6282822",
            border: `1px solid ${step.success ? "#4CAF50" : "#EF5350"}`,
            color: step.success ? "#81C784" : "#EF9A9A",
          }}>
            <strong>{step.success ? "✅ Resolution:" : "⚠️ Result:"}</strong> {step.result}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {path.length > 0 && (
            <button onClick={handleBack} style={{
              padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12,
              background: "transparent", border: "1px solid #1A3A5C", color: "#4A7A9B",
            }}>← Back</button>
          )}
          {(path.length > 0 || !step.choices) && (
            <button onClick={handleRestart} style={{
              padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12,
              background: "transparent", border: "1px solid #1A3A5C", color: "#4A7A9B",
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
                background: i === 0 ? "#132D4A" : c[(i - 1) % c.length] + "33",
                color: i === 0 ? "#8BACC8" : c[(i - 1) % c.length],
                borderBottom: "2px solid #1A3A5C",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: "8px 14px", borderBottom: "1px solid #1A3A5C",
                  color: j === 0 ? "#E0F7FA" : "#B0BEC5",
                  fontWeight: j === 0 ? 600 : 400,
                  background: j === 0 ? "#0D1F3380" : "transparent",
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
      <span style={{ fontSize: 12, color: "#B0BEC5" }}>{label}</span>
    </div>
  );
}

/* ── StepFlow — numbered step-by-step process ── */

export function StepFlow({ steps, color = "#00BCD4" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "4px 0" }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{
            background: color, color: "#fff", borderRadius: "50%",
            width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, flexShrink: 0,
          }}>{i + 1}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: "#E0E0E0", paddingTop: 4 }}>{step}</div>
        </div>
      ))}
    </div>
  );
}
