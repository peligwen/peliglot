import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

import { Tip } from './_helpers';

const sources = [
  { stage: "Training Data", icon: "📚", desc: "If the data over-represents some groups or perspectives, the model inherits those imbalances.", example: "A model trained mostly on English text may perform poorly on other languages or cultures." },
  { stage: "Labeling & Feedback", icon: "🏷️", desc: "Preference-tuning methods (RLHF, DPO) optimize for the preferences of the raters doing the labeling — typically a non-representative sample. The result is that the model's notion of 'helpful' or 'harmful' is shaped by that population.", example: "What counts as 'helpful' or 'harmful' varies across cultures and contexts — and the rater pool may not reflect your users." },
  { stage: "Prompt Design", icon: "📝", desc: "How questions are framed can trigger biased patterns in the model.", example: "Asking 'Why is X bad?' presupposes X is bad and steers the response." },
  { stage: "Deployment Context", icon: "🏢", desc: "Using a model in contexts it wasn't designed for amplifies errors and biases.", example: "A general chat model used for hiring decisions without careful guardrails." },
];

export function Guide20() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          AI models reflect the <strong>biases in their training data</strong> and design choices.
          Understanding where bias enters helps you spot it, mitigate it, and use AI more responsibly.
        </div>
      </DarkBox>

      <Card color="#C62828" title="Where Bias Enters" subtitle="The pipeline">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {sources.map((s, i) => (
            <div key={i} style={{ background: "#FFF5F5", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#C62828" }}>{s.stage}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 6 }}>{s.desc}</div>
              <div style={{ fontSize: 12, color: "#888", fontStyle: "italic" }}>{s.example}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#C62828" title="What You Can Do">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { action: "Test with diverse inputs", desc: "Try your prompts with different names, demographics, and contexts. Look for inconsistent treatment. For example: send the same résumé content to the model twice — once with name 'John Smith' and once with 'Jamal Washington' — and compare the evaluations. Any differential framing is a bias signal worth investigating." },
            { action: "Don't automate high-stakes decisions", desc: "Use AI to inform human decisions, not replace them, for hiring, lending, healthcare, and legal contexts." },
            { action: "Ask for multiple perspectives", desc: "Prompt the model to consider different viewpoints before drawing conclusions." },
            { action: "Document limitations", desc: "When building AI products, be transparent about what the model can and can't do fairly." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, color: "#C62828" }}>{item.action}</div>
              <div style={{ color: "#333", marginTop: 2 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#C62828" title="Stereotypes in language models">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>Language models can reflect and amplify stereotypes because they learned from text that contains them.</div>
          <div style={{ marginBottom: 8 }}><strong>Example:</strong> "The doctor... he" vs "The nurse... she" — models may default to gendered associations that reflect historical patterns, not current reality.</div>
          <div>Model providers work to reduce these biases, but no model is fully bias-free. Critical awareness is the best defense.</div>
        </div>
      </Card>

      <Tip text="Bias isn't always obvious. A model can seem fair on simple tests but fail on edge cases. Think about who might be affected by the model's outputs in your specific use case." />

      <Insight text="Fairness in AI is an active research area with no single solution. Different definitions of 'fair' can actually conflict with each other mathematically." />
    </div>
  );
}
