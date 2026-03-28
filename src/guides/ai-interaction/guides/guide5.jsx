import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { SimpleGuide } from '../../../components/SimpleGuide';
import { ExpandSection } from '../../../components/ExpandSection';
import { Tip } from './_helpers';

const layers = [
  { name: "Embedding", desc: "Each token becomes a vector — a list of numbers representing its meaning in context.", color: "#1565C0" },
  { name: "Attention", desc: "The model asks 'which other tokens matter for understanding this one?' and weighs connections between all token pairs.", color: "#6A1B9A" },
  { name: "Feed-Forward", desc: "Each position is processed through learned transformations that encode knowledge and patterns.", color: "#00695C" },
  { name: "Repeat", desc: "Attention + feed-forward layers repeat dozens or hundreds of times, building deeper understanding at each layer.", color: "#E65100" },
  { name: "Output", desc: "The final layer produces a probability distribution over all possible next tokens.", color: "#C62828" },
];

export function Guide5() {
  const [active, setActive] = useState(null);
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          LLMs don't "think" like humans. They transform sequences of numbers through layers of math.
          But the result <em>looks</em> like reasoning because the patterns they learned are incredibly rich.
        </div>
      </DarkBox>

      <Card color="#1565C0" title="Inside the Transformer" subtitle="Tap a layer to learn more">
        <div style={{ padding: 16 }}>
          {layers.map((l, i) => (
            <button key={i} onClick={() => setActive(active === i ? null : i)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
              marginBottom: 8, background: active === i ? l.color : "#f5f5f5", color: active === i ? "#fff" : "#333",
              border: "none", borderRadius: 10, cursor: "pointer", textAlign: "left", transition: "all 0.2s"
            }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: active === i ? "rgba(255,255,255,0.25)" : l.color,
                color: active === i ? "#fff" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{l.name}</div>
                {active === i && <div style={{ fontSize: 12, marginTop: 4, lineHeight: 1.6, opacity: 0.95 }}>{l.desc}</div>}
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card color="#1565C0" title="Attention: The Key Innovation">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 10 }}>In the sentence <em>"The bank by the river was steep"</em>, the word "bank" could mean a financial institution or a riverbank.</div>
          <div style={{ marginBottom: 10 }}><strong>Attention</strong> lets the model weigh "river" heavily when processing "bank", resolving the ambiguity.</div>
          <div>This happens across all tokens simultaneously — that's what makes transformers so powerful and parallelizable.</div>
        </div>
      </Card>

      <ExpandSection label="Emergent abilities" color="#1565C0">
        <SimpleGuide items={[
          { h: "In-context learning", b: "Given a few examples in the prompt, models can perform new tasks they weren't explicitly trained for." },
          { h: "Chain-of-thought", b: "When asked to 'think step by step', models produce better answers — as if reasoning emerges from structured output." },
          { h: "Scale surprises", b: "Some abilities only appear at certain model sizes. A model with 10B parameters might fail where a 100B model succeeds." },
        ]} />
      </ExpandSection>

      <Tip text="Models don't have hidden thoughts. Everything happens in the token sequence. If you want the model to reason, you need to make it 'show its work' in the output." />
    </div>
  );
}
