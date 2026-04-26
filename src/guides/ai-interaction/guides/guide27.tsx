import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Tip } from './_helpers';

const steps = [
  {
    phase: "1. Embed query",
    icon: "🔢",
    color: "#1565C0",
    short: "Convert the user's question into a vector (a list of numbers representing meaning).",
    detail: "The same embedding model that indexed your documents converts the query to the same vector space. Semantically similar text ends up numerically close.",
  },
  {
    phase: "2. Vector search",
    icon: "🔍",
    color: "#6A1B9A",
    short: "Find the document chunks whose vectors are closest to the query vector.",
    detail: "Approximate nearest-neighbour search returns the top-k most relevant chunks. 'Relevant' here means semantically similar — not keyword-matched. A question about 'car maintenance' will find chunks about 'vehicle servicing' even if those exact words don't appear.",
  },
  {
    phase: "3. Stuff chunks into prompt",
    icon: "📥",
    color: "#00695C",
    short: "Inject the retrieved chunks as context before the user's question.",
    detail: "The prompt becomes: [retrieved text 1] + [retrieved text 2] + ... + 'Given the above, answer: [user question]'. The model now has the relevant source material in its context window.",
  },
  {
    phase: "4. Generate grounded answer",
    icon: "✍️",
    color: "#E65100",
    short: "The model answers based on the retrieved content, not just its training parameters.",
    detail: "Because the answer is constrained by the source material in context, the model can be asked to cite specific passages. This dramatically reduces hallucination on domain-specific or recent information.",
  },
];

const failureModes = [
  {
    name: "Irrelevant retrieval",
    desc: "The vector search returns chunks that are topically near but don't actually answer the question. The model tries to answer from irrelevant material and hallucinates or says 'I don't know'.",
    fix: "Better chunking strategy, query rewriting, or using a reranker to score retrieved chunks for relevance before prompting.",
  },
  {
    name: "Parametric vs retrieved conflict",
    desc: "The model's training-time knowledge conflicts with the retrieved text. The model may ignore the retrieved text in favour of what it 'knows'. This is especially common for well-known facts.",
    fix: "Explicit prompting: 'Answer only from the provided context. If the context contradicts what you know, trust the context.'",
  },
  {
    name: "Chunk boundary issues",
    desc: "If a document is split at the wrong boundary, the retrieved chunk is missing the sentence before or after that gives it meaning. The model receives incomplete information and answers poorly.",
    fix: "Overlapping chunks (each chunk shares N tokens with its neighbours) or larger chunk sizes for narrative content.",
  },
  {
    name: "Stale index",
    desc: "The vector index was built at a point in time. If the source documents have been updated but not re-indexed, the model answers from outdated retrieved content.",
    fix: "Incremental re-indexing pipelines triggered on document updates; metadata filtering to exclude stale documents.",
  },
];

export function Guide27() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeFailure, setActiveFailure] = useState<number | null>(null);

  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          <strong>Retrieval-Augmented Generation (RAG)</strong> solves the core problem with pure LLMs:
          they only know what was in their training data. RAG lets you attach any knowledge base —
          fresh data, private documents, domain expertise — and have the model answer from it,
          with citations.
        </div>
      </DarkBox>

      <Card color="#E65100" title="When RAG Helps">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { use: "Fresh data", detail: "Training cutoffs mean models don't know about recent events, price changes, or new product releases. RAG with a live-indexed source solves this." },
            { use: "Private / proprietary knowledge", detail: "Company docs, internal wikis, customer records, legal contracts — none of this is in any public model's training. RAG puts it in reach." },
            { use: "Citation requirements", detail: "When you need 'show your sources', RAG can point to the specific chunk it used. Pure generation cannot." },
            { use: "Reducing hallucination", detail: "Constraining the model to answer from retrieved text significantly reduces fabrication on factual questions." },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <div style={{ background: '#E65100', color: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 700, flexShrink: 0, height: 'fit-content' }}>{item.use}</div>
              <div>{item.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#E65100" title="How RAG Works" subtitle="Tap each step">
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => setActiveStep(activeStep === i ? null : i)} style={{
              border: 'none', borderRadius: 10, padding: '12px 14px', cursor: 'pointer', textAlign: 'left',
              background: activeStep === i ? s.color : '#f5f5f5',
              color: activeStep === i ? '#fff' : '#333', transition: 'all 0.2s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{s.phase}</div>
                  <div style={{ fontSize: 12, marginTop: 2, opacity: 0.85 }}>{s.short}</div>
                </div>
              </div>
              {activeStep === i && (
                <div style={{ marginTop: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.15)', borderRadius: 8, fontSize: 12, lineHeight: 1.6 }}>
                  {s.detail}
                </div>
              )}
            </button>
          ))}
          <div style={{ marginTop: 8, padding: '10px 12px', background: '#FFF3E0', borderRadius: 8, fontSize: 12, color: '#555', lineHeight: 1.6 }}>
            <strong>Before all of this:</strong> an offline indexing step converts your documents into chunks and stores their embeddings in a vector database. The pipeline above runs at query time.
          </div>
        </div>
      </Card>

      <Card color="#E65100" title="Failure Modes" subtitle="What goes wrong and how to fix it">
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {failureModes.map((f, i) => (
            <button key={i} onClick={() => setActiveFailure(activeFailure === i ? null : i)} style={{
              border: 'none', borderRadius: 10, padding: '12px 14px', cursor: 'pointer', textAlign: 'left',
              background: activeFailure === i ? '#C62828' : '#FFF5F5',
              color: activeFailure === i ? '#fff' : '#333', transition: 'all 0.2s',
            }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{f.name}</div>
              {activeFailure === i && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 12, lineHeight: 1.6, marginBottom: 8 }}>{f.desc}</div>
                  <div style={{ padding: '8px 10px', background: 'rgba(255,255,255,0.15)', borderRadius: 6, fontSize: 12 }}>
                    <strong>Fix:</strong> {f.fix}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>

      <Card color="#E65100" title="RAG vs Fine-tuning">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>Both approaches can give a model access to domain knowledge. They're not interchangeable:</div>
          {[
            { aspect: "RAG", detail: "Best for frequently-changing data, citation requirements, large knowledge bases, and when you need interpretability (you can see what was retrieved)." },
            { aspect: "Fine-tuning", detail: "Best for stable knowledge, changing the model's behaviour and tone, or embedding knowledge too large to fit in retrieval context. Doesn't help with facts that post-date the fine-tuning run." },
            { aspect: "Both together", detail: "A fine-tuned model + RAG is common in production: fine-tuning teaches domain style and format; RAG provides fresh or specific facts at query time." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 8, padding: '8px 12px', background: '#FFF3E0', borderRadius: 6 }}>
              <div style={{ fontWeight: 700, color: '#E65100' }}>{item.aspect}</div>
              <div style={{ color: '#333', marginTop: 2 }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      <Tip text="RAG is a pattern, not a product. You can implement it with any embedding model, any vector store, and any LLM. The pattern is what matters — retrieve first, then generate from what you retrieved." />

      <Insight text="The hardest part of RAG in practice is retrieval quality, not generation quality. A well-tuned retrieval step that consistently finds the right chunks is worth more than a fancier LLM." />
    </div>
  );
}
