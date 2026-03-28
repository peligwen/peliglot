import { Insight as BaseInsight } from '../../../components/Insight';

/* PromptBox — shows a prompt and optional model response */
export function PromptBox({ prompt, response, label, color = "#6A1B9A" }) {
  return (
    <div style={{ margin: "12px 0", borderRadius: 12, overflow: "hidden", border: "1px solid #e0e0e0" }}>
      {label && (
        <div style={{ background: color, color: "#fff", padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
          {label}
        </div>
      )}
      <div style={{ background: "#1a1a1a", color: "#e0e0e0", padding: "14px 16px", fontFamily: "monospace", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
        {prompt}
      </div>
      {response && (
        <div style={{ background: "#f5f5f5", padding: "14px 16px", fontSize: 13, lineHeight: 1.6, borderTop: "1px solid #e0e0e0" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>Response </span>
          <div style={{ marginTop: 6 }}>{response}</div>
        </div>
      )}
    </div>
  );
}

/* Tip — AI-themed Insight wrapper */
export function Tip({ text }) {
  return <BaseInsight text={text} emoji="\u{1F916}" bg="#E3F2FD" border="#90CAF9" color="#1565C0" />;
}

/* Term — inline highlighted AI term */
export function Term({ children, color = "#6A1B9A" }) {
  return <span style={{ fontWeight: 700, color }}>{children}</span>;
}
