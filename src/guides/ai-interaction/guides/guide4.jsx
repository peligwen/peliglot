import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Tip } from './_helpers';

const presets = [
  { label: "Factual (0.0)", temp: 0, desc: "Always picks the most likely token. Great for math, code, and factual Q&A." },
  { label: "Balanced (0.7)", temp: 0.7, desc: "Default for most use. A mix of coherence and variety." },
  { label: "Creative (1.0)", temp: 1.0, desc: "More variety, more surprise. Good for brainstorming and fiction." },
  { label: "Wild (1.5)", temp: 1.5, desc: "Very random. Often incoherent but occasionally brilliant." },
];

const words = [
  ["The", "A", "One", "My"],
  ["cat", "dog", "robot", "wizard"],
  ["sat", "danced", "flew", "exploded"],
  ["quietly", "backwards", "in space", "on Tuesday"],
];

export function Guide4() {
  const [temp, setTemp] = useState(1);
  const [sentence, setSentence] = useState(null);

  function generate() {
    const pick = (arr) => {
      if (temp === 0) return arr[0];
      const weights = arr.map((_, i) => Math.exp(-i / Math.max(temp, 0.1)));
      const total = weights.reduce((a, b) => a + b, 0);
      let r = Math.random() * total;
      for (let i = 0; i < arr.length; i++) {
        r -= weights[i];
        if (r <= 0) return arr[i];
      }
      return arr[arr.length - 1];
    };
    setSentence(words.map(pick).join(" ") + ".");
  }

  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          <strong>Temperature</strong> controls how random the model's choices are.
          Low temperature = predictable and safe. High temperature = creative and risky.
        </div>
      </DarkBox>

      <Card color="#1565C0" title="Temperature Simulator" subtitle="Drag the slider, then generate">
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            <span>Temperature</span>
            <span style={{ color: "#1565C0" }}>{temp.toFixed(1)}</span>
          </div>
          <input type="range" min="0" max="1.5" step="0.1" value={temp}
            onChange={e => setTemp(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#1565C0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888" }}>
            <span>Deterministic</span><span>Creative</span><span>Wild</span>
          </div>
          <button onClick={generate} style={{
            marginTop: 14, width: "100%", padding: 12, background: "#1565C0", color: "#fff",
            border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer"
          }}>
            Generate a Sentence
          </button>
          {sentence && (
            <div style={{ marginTop: 12, background: "#1a1a1a", color: "#e0e0e0", padding: 14, borderRadius: 8, fontFamily: "monospace", fontSize: 14, textAlign: "center" }}>
              {sentence}
            </div>
          )}
        </div>
      </Card>

      <Card color="#1565C0" title="Common Presets">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {presets.map((p, i) => (
            <div key={i} style={{ background: "#F5F8FF", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1565C0" }}>{p.label}</div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: "#333", marginTop: 2 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Tip text="For most tasks, you don't need to touch temperature. The default (usually 0.7\u20131.0) works well. Only lower it when you need exact, repeatable answers." />

      <Insight text="'Top-p' (nucleus sampling) is another knob that limits which tokens are considered. Temperature and top-p together control the randomness-creativity spectrum." />
    </div>
  );
}
