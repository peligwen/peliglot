import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Tip, Term } from './_helpers';

const examples = [
  { text: "Hello world", tokens: ["Hello", " world"], count: 2 },
  { text: "I'm happy!", tokens: ["I", "'m", " happy", "!"], count: 4 },
  { text: "Tokenization", tokens: ["Token", "ization"], count: 2 },
  { text: "GPT-4 is great", tokens: ["G", "PT", "-", "4", " is", " great"], count: 6 },
  { text: "unconstitutional", tokens: ["un", "constit", "utional"], count: 3 },
  { text: "\u00BFHablas espa\u00F1ol?", tokens: ["\u00BF", "Hab", "las", " espa", "\u00F1", "ol", "?"], count: 7 },
];

export function Guide2() {
  const [sel, setSel] = useState(0);
  const ex = examples[sel];
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          LLMs don't read letters or words \u2014 they read <Term color="#90CAF9">tokens</Term>.
          A token is a chunk of text, usually a common word or word-piece. Understanding tokens helps you understand costs, limits, and quirks.
        </div>
      </DarkBox>

      <Card color="#1565C0" title="Interactive Tokenizer" subtitle="Tap an example to see its tokens">
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {examples.map((e, i) => (
              <button key={i} onClick={() => setSel(i)} style={{
                padding: "6px 12px", borderRadius: 8, border: sel === i ? "2px solid #1565C0" : "1px solid #ccc",
                background: sel === i ? "#E3F2FD" : "#fff", cursor: "pointer", fontSize: 13, fontWeight: sel === i ? 700 : 400
              }}>
                {e.text}
              </button>
            ))}
          </div>
          <div style={{ background: "#1a1a1a", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>INPUT: "{ex.text}" \u2192 {ex.count} tokens</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ex.tokens.map((t, i) => (
                <span key={i} style={{
                  background: ["#1565C0", "#6A1B9A", "#00695C", "#C62828", "#E65100", "#2E7D32", "#AD1457"][i % 7],
                  color: "#fff", padding: "6px 10px", borderRadius: 6, fontSize: 14, fontFamily: "monospace"
                }}>
                  {t.replace(/ /g, "\u2423")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card color="#1565C0" title="Why Tokens Matter">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 10 }}><strong>Pricing.</strong> API costs are per-token. A 1,000-word essay is roughly 1,300 tokens. You pay for both input and output tokens.</div>
          <div style={{ marginBottom: 10 }}><strong>Context limits.</strong> Every model has a maximum token count (e.g., 200K tokens). Your prompt + the response must fit.</div>
          <div style={{ marginBottom: 10 }}><strong>Speed.</strong> Models generate one token at a time. Longer responses take longer.</div>
          <div><strong>Non-English text</strong> often uses more tokens per word because tokenizers are trained mostly on English data.</div>
        </div>
      </Card>

      <Tip text="A rough rule of thumb: 1 token \u2248 \u00BE of a word in English. So 1,000 tokens \u2248 750 words." />

      <Insight text="Spaces often attach to the beginning of the next token, not the end of the previous one. That's why you see tokens like ' happy' with a leading space." />
    </div>
  );
}
