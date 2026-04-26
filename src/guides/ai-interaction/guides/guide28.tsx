import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Tip } from './_helpers';

const scenarios = [
  {
    label: "Current software versions",
    icon: "💻",
    risky: true,
    reason: "Library versions, API changes, deprecations, and security advisories change continuously. The model knows what was current at training time — which may be one or several major versions behind.",
  },
  {
    label: "Pricing & plans",
    icon: "💰",
    risky: true,
    reason: "Subscription prices, token costs, feature tiers — all change frequently. Never trust a model on current pricing; check the vendor's site.",
  },
  {
    label: "Recent news & events",
    icon: "📰",
    risky: true,
    reason: "Anything that happened after the training cutoff simply isn't there. The model may confabulate plausible-sounding but fabricated details about events it was never trained on.",
  },
  {
    label: "Stable historical facts",
    icon: "📚",
    risky: false,
    reason: "Historical events, mathematical proofs, established scientific principles — these don't change. The training cutoff is irrelevant here.",
  },
  {
    label: "Programming fundamentals",
    icon: "🔧",
    risky: false,
    reason: "Core language semantics and algorithms change slowly. 'How does a binary search work?' is safe territory.",
  },
  {
    label: "Current best practices",
    icon: "✨",
    risky: true,
    reason: "Best practices in fast-moving fields (AI/ML, web dev, security) can shift significantly in months. What was recommended at training time may now be discouraged.",
  },
];

export function Guide28() {
  const [sel, setSel] = useState<number | null>(null);
  const [showHowTo, setShowHowTo] = useState(false);

  return (
    <div>
      <DarkBox title="Confident, but frozen in time">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          Every LLM has a <strong>training cutoff</strong> — the date beyond which it has no direct knowledge.
          The model will answer confidently about events after its cutoff, but it's generating plausible text, not recalling facts.
          Knowing when this matters is one of the most practical AI-literacy skills.
        </div>
      </DarkBox>

      <Card color="#E65100" title="What Training Cutoff Means">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { h: "It's a hard knowledge boundary", b: "If something happened after the cutoff, the model genuinely has no information about it — not outdated information, no information." },
            { h: "The model doesn't know what it doesn't know", b: "A model asked about post-cutoff events won't typically say 'I don't know about that' — it will generate a plausible-sounding response based on patterns from before the cutoff." },
            { h: "The cutoff is approximate, even to the model", b: "Training data isn't uniformly distributed up to the cutoff date. Events close to the cutoff are underrepresented (less discussion, less analysis had been written). The model's 'effective knowledge' fades out rather than cutting off cleanly." },
            { h: "Gap between cutoff and deployment", b: "Models take time to train and ship. The model you're using was likely trained months or over a year before you're reading this — and may have been deployed for additional months or years after that." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: '10px 14px', background: '#FFF3E0', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: '#E65100' }}>{item.h}</div>
              <div style={{ color: '#333', marginTop: 2 }}>{item.b}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#E65100" title="Time-Sensitive or Not?" subtitle="Tap a scenario to assess the risk">
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {scenarios.map((s, i) => (
            <button key={i} onClick={() => setSel(sel === i ? null : i)} style={{
              border: 'none', borderRadius: 10, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
              background: sel === i ? (s.risky ? '#C62828' : '#00695C') : (s.risky ? '#FFEBEE' : '#E0F2F1'),
              color: sel === i ? '#fff' : '#333',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{s.label}</div>
                  <div style={{ fontSize: 11, marginTop: 2, opacity: 0.8 }}>{s.risky ? 'Time-sensitive — verify externally' : 'Generally stable — low risk'}</div>
                </div>
              </div>
              {sel === i && (
                <div style={{ marginTop: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.15)', borderRadius: 8, fontSize: 12, lineHeight: 1.6 }}>
                  {s.reason}
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>

      <button onClick={() => setShowHowTo(!showHowTo)} style={{
        width: '100%', padding: '12px 16px', margin: '12px 0', background: '#E3F2FD', border: '1px solid #90CAF9',
        borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#1565C0',
      }}>
        {showHowTo ? 'Hide' : 'Show'}: How to probe a model's training cutoff
      </button>
      {showHowTo && (
        <div style={{ background: '#F5F8FF', border: '1px solid #BBDEFB', borderRadius: 10, padding: 16, fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
          <div style={{ marginBottom: 8 }}>Try these prompts to understand the model's temporal limits:</div>
          {[
            '"What is your training cutoff date, and how confident are you about that?"',
            '"What is the most recent event you have knowledge of in [your domain]?"',
            '"Are you aware of any developments in [topic] from [recent time period]?"',
          ].map((q, i) => (
            <div key={i} style={{ background: '#1a1a1a', color: '#e0e0e0', padding: '8px 14px', borderRadius: 8, fontFamily: 'monospace', fontSize: 12, marginBottom: 8 }}>
              {q}
            </div>
          ))}
          <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>Note: models often underestimate their own cutoff because data about recent events is sparse in training. Treat their self-reported cutoff as approximate.</div>
        </div>
      )}

      <Card color="#E65100" title="Honest vs Confabulating Responses">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 12 }}>When asked about post-cutoff events, models respond in two ways:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#E0F2F1', borderRadius: 10, padding: 14 }}>
              <div style={{ fontWeight: 700, color: '#00695C', marginBottom: 6 }}>Honest (good)</div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: '#333', fontStyle: 'italic' }}>
                "I don't have information about events after my training cutoff. For current information on that topic, I'd recommend checking a current news source or official documentation."
              </div>
            </div>
            <div style={{ background: '#FFEBEE', borderRadius: 10, padding: 14 }}>
              <div style={{ fontWeight: 700, color: '#C62828', marginBottom: 6 }}>Confabulating (bad)</div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: '#333', fontStyle: 'italic' }}>
                "The latest version of [X] was released in [plausible-sounding date] and includes [fabricated features]..." — said with full confidence, entirely invented.
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>Neither behaviour is guaranteed. The same model may be honest in one context and confabulate in another, depending on how the question was framed.</div>
        </div>
      </Card>

      <Card color="#E65100" title="Workarounds">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { tool: "Real-time web search tools", detail: "Most chat products offer a search/browse mode that retrieves current pages before answering. Use this for anything time-sensitive." },
            { tool: "RAG with fresh sources", detail: "If building a system, index your up-to-date documents and use retrieval to ground the model's answers." },
            { tool: "Paste in the current content", detail: "Copy-paste the relevant current documentation, article, or data into your prompt. The model can reason about content in its context window even if it wasn't in training." },
            { tool: "Ask the model to flag staleness", detail: "'Answer from your training data, and explicitly flag anything where your knowledge might be out of date.' Models can't always comply, but the instruction improves honesty." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, color: '#E65100' }}>{item.tool}</div>
              <div style={{ color: '#333', marginTop: 2 }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      <Tip text="The simplest rule: anything involving 'current', 'latest', 'recent', 'now', or a specific recent date is time-sensitive. Verify it from a current source before acting on it." />

      <Insight text="Even the model's knowledge of its own training cutoff is approximate. Training data about events close to the cutoff is sparse — the most recent months are underrepresented relative to how they'll eventually be covered. Treat self-reported cutoffs as rough lower bounds." />
    </div>
  );
}
