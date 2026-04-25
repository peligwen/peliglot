import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Tip } from './_helpers';

const models = [
  { name: "Small open-weight model (8B class)", ctx: "8K–32K", bar: 4 },
  { name: "Frontier chat model", ctx: "128K–200K", bar: 20 },
  { name: "Long-context frontier model", ctx: "1M+", bar: 100 },
];

export function Guide3() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          The <strong>context window</strong> is the model's working memory.
          Everything it can "see" — your prompt, the conversation history, any documents — must fit inside this window, measured in tokens.
        </div>
      </DarkBox>

      <Card color="#1565C0" title="Context Window Sizes" subtitle="Typical ranges by model category — check vendor docs for current figures">
        <div style={{ padding: 16 }}>
          {models.map((m, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                <span>{m.name}</span>
                <span style={{ color: "#1565C0" }}>{m.ctx} tokens</span>
              </div>
              <div style={{ background: "#eee", borderRadius: 6, height: 14, overflow: "hidden" }}>
                <div style={{ background: "#1565C0", height: "100%", width: `${m.bar}%`, borderRadius: 6, transition: "width 0.4s" }} />
              </div>
            </div>
          ))}
          <div style={{ fontSize: 11, color: "#888", marginTop: 8 }}>Bar width is relative. Context windows have grown from thousands to millions of tokens — today's frontier number is next year's normal.</div>
        </div>
      </Card>

      <Card color="#1565C0" title="What Fills the Window?">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>Think of the context window as a fixed-size container. It fills up with:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { pct: "System prompt", color: "#6A1B9A" },
              { pct: "Conversation history (all previous turns)", color: "#00695C" },
              { pct: "Attached documents or tool results", color: "#E65100" },
              { pct: "Your current message", color: "#1565C0" },
              { pct: "The model's response (generated into remaining space)", color: "#C62828" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: s.color, flexShrink: 0 }} />
                <div>{s.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <button onClick={() => setShow(!show)} style={{
        width: "100%", padding: "12px 16px", margin: "12px 0", background: "#E3F2FD", border: "1px solid #90CAF9",
        borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#1565C0"
      }}>
        {show ? "Hide" : "Show"}: What happens when the window fills up?
      </button>
      {show && (
        <div style={{ background: "#FFF8E1", border: "1px solid #FFE082", borderRadius: 10, padding: 16, fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Overflow strategies:</strong>
          <ul style={{ margin: "8px 0 0 16px", padding: 0 }}>
            <li><strong>Truncation</strong> — Older messages get dropped from the beginning of the conversation.</li>
            <li><strong>Summarization</strong> — Some systems compress earlier context into a summary.</li>
            <li><strong>Sliding window</strong> — Only the most recent N tokens are kept.</li>
            <li><strong>RAG</strong> — Retrieve only the relevant chunks instead of stuffing everything in.</li>
          </ul>
        </div>
      )}

      <Tip text="Long conversations slowly eat your context window. If a model starts 'forgetting' earlier instructions, that's often why — the old tokens were pushed out." />

      <Insight text="100K tokens ≈ roughly 250 pages of text. Today's long-context frontier models fit entire codebases or books in a single prompt — and context limits continue to grow." />
    </div>
  );
}
