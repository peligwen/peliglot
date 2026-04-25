import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

import { Tip } from './_helpers';

const models = [
  { name: "Frontier", examples: "Largest models from the major labs — most expensive per token, slowest per request, highest reasoning and multimodal capability.", icon: "🚀", cost: "$$$", speed: "Slower", quality: "Highest", best: "Complex reasoning, nuanced writing, difficult code, multi-step tasks" },
  { name: "Mid-tier", examples: "Faster, cheaper general-purpose models — typically 5–20× cheaper than frontier with most of the quality on common tasks.", icon: "⚡", cost: "$$", speed: "Fast", quality: "Very good", best: "Most everyday tasks, coding, analysis, conversation" },
  { name: "Small / Local", examples: "Open-weight models that run on consumer GPUs or laptops — quality continues to climb each cycle.", icon: "📱", cost: "$", speed: "Fastest", quality: "Good", best: "Simple tasks, classification, extraction, privacy-sensitive work" },
  { name: "Specialized", examples: "Models fine-tuned for code, medicine, legal, or other domains — best in their lane, narrower outside it.", icon: "🎯", cost: "Varies", speed: "Varies", quality: "Best in domain", best: "Tasks within their specialty: code, medicine, legal, etc." },
];

export function Guide24() {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          There's no single "best" model. The right choice depends on your <strong>task, budget, speed needs, and privacy requirements</strong>.
          Knowing the trade-offs helps you pick wisely.
        </div>
      </DarkBox>

      <Card color="#E65100" title="Model Tiers" subtitle="Tap a tier — specific model names change; these categories don't">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {models.map((m, i) => (
            <button key={i} onClick={() => setSel(sel === i ? null : i)} style={{
              border: "none", borderRadius: 10, padding: "14px 16px", cursor: "pointer", textAlign: "left",
              background: sel === i ? "#E65100" : "#f5f5f5", color: sel === i ? "#fff" : "#333", transition: "all 0.2s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{m.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>{m.examples}</div>
                </div>
              </div>
              {sel === i && (
                <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { label: "Cost", value: m.cost },
                    { label: "Speed", value: m.speed },
                    { label: "Quality", value: m.quality },
                    { label: "Best for", value: m.best },
                  ].map((stat, j) => (
                    <div key={j} style={{ padding: "6px 10px", background: "rgba(255,255,255,0.15)", borderRadius: 6, fontSize: 12, gridColumn: j === 3 ? "1 / -1" : undefined }}>
                      <span style={{ fontWeight: 700 }}>{stat.label}:</span> {stat.value}
                    </div>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>

      <Card color="#E65100" title="Decision Framework">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { q: "How complex is the task?", guide: "Simple classification → small model. Novel reasoning → frontier model." },
            { q: "How much does quality matter?", guide: "Internal draft → mid-tier is fine. Customer-facing → use the best you can afford." },
            { q: "What's your budget?", guide: "Frontier models cost 10–50x more per token than small ones. Volume matters." },
            { q: "Do you need speed?", guide: "Real-time chat needs fast responses. Batch processing can wait." },
            { q: "Is data privacy critical?", guide: "Run a local model for sensitive data. Cloud APIs send data to providers." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "10px 14px", background: "#FFF3E0", borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: "#E65100" }}>{item.q}</div>
              <div style={{ color: "#333", marginTop: 2 }}>{item.guide}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#E65100" title="Reasoning vs Non-Reasoning">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>Cutting across all tiers is a newer dimension: <strong>reasoning models</strong> that think before answering.</div>
          {[
            { label: "Standard (non-reasoning)", detail: "Generate the response in one pass. Fast, predictable cost, best for most tasks." },
            { label: "Reasoning models", detail: "Generate an internal chain of thought before producing the final answer. Higher accuracy on hard problems — math, logic, multi-step planning — at the cost of more tokens and latency. Most major vendors now offer a reasoning variant alongside their standard model." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "10px 14px", background: "#FFF3E0", borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: "#E65100" }}>{item.label}</div>
              <div style={{ color: "#333", marginTop: 2 }}>{item.detail}</div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: "#666" }}>For reasoning models, you typically don't need "think step by step" prompts — the model does it internally. Use them when accuracy on hard problems matters more than speed or cost.</div>
        </div>
      </Card>

      <Card color="#E65100" title="The model landscape moves fast">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>Today's frontier model is next year's mid-tier. Specific model names go out of date quickly, but the categories and trade-offs remain stable.</div>
          <div style={{ marginBottom: 8 }}><strong>Key trend:</strong> Models are getting better AND cheaper simultaneously. What costs $10 today may cost $0.10 in two years.</div>
          <div>Don't over-optimize for today's pricing. Build systems that can swap models easily.</div>
        </div>
      </Card>

      <Tip text="A common pattern: prototype with a frontier model to validate the approach, then optimize down to the cheapest model that maintains acceptable quality." />

      <Insight text="The best model for your task might not be the biggest. A small model fine-tuned on your domain data can outperform a general frontier model for specific tasks." />
    </div>
  );
}
