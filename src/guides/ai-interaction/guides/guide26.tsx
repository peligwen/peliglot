import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Tip } from './_helpers';

const quizItems = [
  {
    scenario: "The Eiffel Tower was designed by Gustave Eiffel and his engineering firm, and was completed in 1889 as the entrance arch for the 1900 World's Fair.",
    fabricated: "completed in 1889 as the entrance arch for the 1900 World's Fair",
    correct: "designed by Gustave Eiffel; completed in 1889",
    explanation: "The Eiffel Tower was designed by Eiffel's firm and completed in 1889 — both correct. The fabrication is the purpose: it was built for the 1889 World's Fair (Exposition Universelle), not the 1900 one. The model correctly placed the year of completion but quietly moved the event it was built for by 11 years.",
  },
  {
    scenario: "Alan Turing published 'Computing Machinery and Intelligence' in 1950, introducing the concept he called the 'Imitation Game', later known as the Turing Test.",
    fabricated: "None — this is accurate",
    correct: "None — this is accurate",
    explanation: "This one is accurate. Turing's paper was published in Mind in 1950 and did introduce the Imitation Game. The model doesn't always hallucinate — knowing when output is reliable is as important as spotting when it isn't.",
    isAccurate: true,
  },
  {
    scenario: "Nobel Prize–winning economist Milton Friedman taught at the University of Chicago from 1946 to 1977 and co-authored 'A Monetary History of the United States' with Anna Schwartz.",
    fabricated: "None — this is accurate",
    correct: "None — this is accurate",
    explanation: "Also accurate. Friedman joined Chicago in 1946, retired in 1977, and co-authored the book with Schwartz. This illustrates that hallucination doesn't mean 'always wrong' — it means 'cannot be trusted without verification on specific claims'.",
    isAccurate: true,
  },
  {
    scenario: "Python's asyncio library was introduced in Python 3.4 (2014) and the 'await' keyword was added in Python 3.5 alongside async def syntax.",
    fabricated: "asyncio was introduced in Python 3.4",
    correct: "The 'await' keyword and async def were added in Python 3.5",
    explanation: "Both facts are actually correct here — asyncio was provisional in 3.4 and await/async def came in 3.5. The trap: this looks like the kind of technical version claim where a model might flip minor version numbers. Always verify version-specific facts in documentation.",
    isAccurate: true,
  },
  {
    scenario: "The Stanford Prison Experiment was conducted in 1971 by Philip Zimbardo and ran for its planned two weeks before being stopped.",
    fabricated: "ran for its planned two weeks",
    correct: "Philip Zimbardo conducted the 1971 Stanford Prison Experiment",
    explanation: "The experiment was stopped after only six days — not two weeks. The researcher and year are correct; the duration is fabricated. Models often get the core facts right and hallucinate a supporting detail that sounds plausible.",
  },
];

export function Guide26() {
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const item = quizItems[step];
  const total = quizItems.length;

  function next() {
    setRevealed(false);
    setStep(s => Math.min(s + 1, total - 1));
  }
  function prev() {
    setRevealed(false);
    setStep(s => Math.max(s - 1, 0));
  }

  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          <strong>Hallucination</strong> is when a model generates plausible-sounding text that isn't grounded in fact.
          It's not lying — it's the inevitable consequence of predicting tokens without a built-in fact-checker.
          Understanding why it happens lets you catch it and work around it.
        </div>
      </DarkBox>

      <Card color="#E65100" title="Why Models Hallucinate">
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { cause: "Next-token prediction without grounding", detail: "The model generates what sounds right given everything before it — not what a lookup would confirm. Confident-sounding text was more probable in training than hedged text." },
            { cause: "Gaps in training data", detail: "If a specific fact was rare or absent in training data, the model interpolates from nearby patterns. The result can be plausible but wrong." },
            { cause: "Pressure to answer", detail: "Models are trained to be helpful. Saying 'I don't know' is often a lower-probability completion than generating something. So they generate something." },
            { cause: "Conflation", detail: "The model may blend attributes of similar entities — right category, wrong details. Two people with similar backgrounds often get their facts mixed." },
          ].map((item, i) => (
            <div key={i} style={{ background: '#FFF3E0', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#E65100', marginBottom: 4 }}>{item.cause}</div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: '#333' }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#E65100" title="Spot the Fabrication" subtitle={`Example ${step + 1} of ${total} — read the claim, then reveal`}>
        <div style={{ padding: 16 }}>
          <div style={{
            background: '#1a1a1a', color: '#e0e0e0', padding: 16, borderRadius: 10,
            fontFamily: 'monospace', fontSize: 13, lineHeight: 1.7, marginBottom: 16,
          }}>
            {item.scenario}
          </div>
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              style={{
                width: '100%', padding: 12, background: '#E65100', color: '#fff',
                border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Reveal Analysis
            </button>
          ) : (
            <div style={{
              background: item.isAccurate ? '#E0F2F1' : '#FFEBEE',
              border: `1px solid ${item.isAccurate ? '#80CBC4' : '#EF9A9A'}`,
              borderRadius: 10, padding: 14, fontSize: 13, lineHeight: 1.7,
            }}>
              <div style={{ fontWeight: 700, marginBottom: 6, color: item.isAccurate ? '#00695C' : '#C62828' }}>
                {item.isAccurate ? 'This one checks out' : 'Fabricated detail:'}
              </div>
              {!item.isAccurate && (
                <div style={{ background: '#C62828', color: '#fff', padding: '4px 10px', borderRadius: 6, display: 'inline-block', marginBottom: 8, fontSize: 12 }}>
                  "{item.fabricated}"
                </div>
              )}
              <div style={{ color: '#333' }}>{item.explanation}</div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={prev} disabled={step === 0} style={{
              flex: 1, padding: 10, background: step === 0 ? '#f5f5f5' : '#fff',
              color: step === 0 ? '#bbb' : '#333', border: '1px solid #ddd', borderRadius: 8,
              cursor: step === 0 ? 'default' : 'pointer', fontSize: 13,
            }}>← Previous</button>
            <button onClick={next} disabled={step === total - 1} style={{
              flex: 1, padding: 10, background: step === total - 1 ? '#f5f5f5' : '#E65100',
              color: step === total - 1 ? '#bbb' : '#fff', border: 'none', borderRadius: 8,
              cursor: step === total - 1 ? 'default' : 'pointer', fontSize: 13, fontWeight: 700,
            }}>Next →</button>
          </div>
        </div>
      </Card>

      <Card color="#E65100" title="Detection Patterns">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { signal: "Specific facts on niche topics", detail: "Exact dates, page numbers, citation details, minor biographical facts — these are prime hallucination territory. Verify independently." },
            { signal: "Suspiciously confident specificity", detail: "Hedged output ('I believe...' or 'approximately') is often more reliable than confident exact claims. High confidence on hard-to-verify details is a warning sign." },
            { signal: "Circular reasoning", detail: "If the model's 'evidence' for a claim is essentially restating the claim in different words, it's generating rather than retrieving." },
            { signal: "Output that's hard to search for", detail: "If you can't find a corroborating source quickly, that's a data point — especially for recent events, uncommon facts, or obscure names." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: '10px 14px', background: '#FFF3E0', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: '#E65100' }}>{item.signal}</div>
              <div style={{ color: '#333', marginTop: 2 }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#E65100" title="What Helps vs What Doesn't">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 10, fontWeight: 700 }}>What actually reduces hallucination:</div>
          {[
            "Grounding: give the model the source text and ask it to answer from that (RAG pattern).",
            "Asking for citations: 'cite the passage from the document that supports this' — models can't fabricate a quote if the document is in context.",
            "Lowering temperature on factual tasks: higher temperature increases variability, including wrong variability.",
            "Asking 'are you sure? if you're not confident, say so' — can prompt the model to surface uncertainty.",
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <div style={{ color: '#E65100', fontWeight: 700, flexShrink: 0 }}>✓</div>
              <div>{tip}</div>
            </div>
          ))}
          <div style={{ marginTop: 12, marginBottom: 8, fontWeight: 700 }}>What does NOT fix hallucination:</div>
          {[
            "Adding 'don't hallucinate' to the prompt — empirically very weak.",
            "Using a bigger model alone — all generation-based models hallucinate; scale reduces the frequency but doesn't eliminate it.",
            "Asking more politely.",
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <div style={{ color: '#C62828', fontWeight: 700, flexShrink: 0 }}>✗</div>
              <div>{tip}</div>
            </div>
          ))}
        </div>
      </Card>

      <Tip text="The most effective defense is never using AI output as a primary source for specific factual claims. Use it as a starting point, then verify anything you actually need to be true." />

      <Insight text="Hallucination is not a bug being fixed — it's a property of next-token prediction. The architecture that makes LLMs fluent is the same one that makes them confidently wrong. Retrieval augmentation (RAG) is the most reliable architectural mitigation." />
    </div>
  );
}
