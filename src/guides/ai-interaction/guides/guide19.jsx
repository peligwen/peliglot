import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';
import { Tip } from './_helpers';

const patterns = [
  { name: "Sequential Chain", icon: "\u27A1\uFE0F", desc: "Output of step A feeds into step B. Simple, predictable.", example: "Summarize article \u2192 Translate summary \u2192 Format as email", color: "#1565C0" },
  { name: "Parallel Fan-out", icon: "\u{1F500}", desc: "Same input processed by multiple models/prompts simultaneously.", example: "Send code to: security reviewer, style checker, and test generator in parallel", color: "#6A1B9A" },
  { name: "Router", icon: "\u{1F6A6}", desc: "A classifier decides which specialized prompt or model handles each request.", example: "Is this a code question, a math question, or a creative writing request?", color: "#00695C" },
  { name: "Evaluator-Optimizer", icon: "\u{1F504}", desc: "One model generates, another evaluates, loop until quality threshold is met.", example: "Write essay \u2192 Grade essay \u2192 Rewrite if score < 8 \u2192 Repeat", color: "#E65100" },
];

export function Guide19() {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          <strong>Orchestration</strong> is the art of chaining multiple AI calls into a workflow.
          One model call is a tool; orchestrated calls are a system.
        </div>
      </DarkBox>

      <Card color="#00695C" title="Common Patterns" subtitle="Tap to explore">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {patterns.map((p, i) => (
            <button key={i} onClick={() => setSel(sel === i ? null : i)} style={{
              border: "none", borderRadius: 10, padding: "14px 16px", cursor: "pointer", textAlign: "left",
              background: sel === i ? p.color : "#f5f5f5", color: sel === i ? "#fff" : "#333", transition: "all 0.2s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{p.icon}</span>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
              </div>
              {sel === i && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>{p.desc}</div>
                  <div style={{ padding: "8px 12px", background: "rgba(255,255,255,0.15)", borderRadius: 8, fontSize: 12, fontStyle: "italic" }}>
                    Example: {p.example}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>

      <Card color="#00695C" title="Building Blocks of Orchestration">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { block: "Prompt templates", desc: "Reusable prompts with variables that get filled in at runtime." },
            { block: "Model selection", desc: "Use cheap/fast models for simple steps, powerful models for hard ones." },
            { block: "Error handling", desc: "Retry on failure, fall back to a simpler approach, or escalate to a human." },
            { block: "State management", desc: "Track context, results, and decisions across steps." },
            { block: "Observability", desc: "Log every step so you can debug and optimize the pipeline." },
          ].map((b, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 700, color: "#00695C" }}>{b.block}:</span> {b.desc}
            </div>
          ))}
        </div>
      </Card>

      <ExpandSection label="Real-world orchestration example" color="#00695C">
        <div style={{ fontSize: 13, lineHeight: 1.7, padding: "8px 0" }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Customer Support Triage System:</div>
          <div style={{ padding: "0 0 0 16px" }}>
            <div style={{ marginBottom: 6 }}>1. <strong>Router:</strong> Classify incoming message (billing, technical, feedback).</div>
            <div style={{ marginBottom: 6 }}>2. <strong>Retriever:</strong> Pull relevant help articles and account info.</div>
            <div style={{ marginBottom: 6 }}>3. <strong>Generator:</strong> Draft a response using the context.</div>
            <div style={{ marginBottom: 6 }}>4. <strong>Evaluator:</strong> Check tone and accuracy.</div>
            <div>5. <strong>Human review:</strong> Flag low-confidence responses for agent review.</div>
          </div>
        </div>
      </ExpandSection>

      <Tip text="Start with a simple sequential chain. Only add complexity (parallel, routing, evaluation loops) when you have evidence that the simpler approach isn't working." />

      <Insight text="The 'evaluator-optimizer' pattern is how many AI products achieve high quality: generate many options, then use a second model (or rules) to pick the best one." />
    </div>
  );
}
