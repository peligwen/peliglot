import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';
import { Tip, Term } from './_helpers';

const concepts = [
  { label: "Training Data", desc: "Billions of pages of text \u2014 books, articles, code, conversations \u2014 that the model learned patterns from." },
  { label: "Parameters", desc: "Numerical weights (billions of them) that encode learned patterns. More parameters generally means more capability, but also more cost." },
  { label: "Inference", desc: "The process of generating a response. The model predicts one token at a time, each choice influenced by everything before it." },
  { label: "Pre-training vs Fine-tuning", desc: "Pre-training learns general language from massive data. Fine-tuning adjusts behavior for specific tasks like following instructions or being helpful." },
];

export function Guide1() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          A <Term color="#90CAF9">Large Language Model</Term> is a program that predicts the next word.
          That's it. But from this simple idea emerges the ability to write, reason, translate, code, and converse.
        </div>
      </DarkBox>

      <Card color="#1565C0" title="How It Works" subtitle="The core loop">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["You type a prompt (input text)", "The model reads every token so far", "It calculates probabilities for what comes next", "It picks a token and appends it", "Repeat until done"].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ background: "#1565C0", color: "#fff", borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card color="#1565C0" title="Key Concepts">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {concepts.map((c, i) => (
            <div key={i} style={{ background: "#F5F8FF", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1565C0", marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: "#333" }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <ExpandSection label="What an LLM is NOT" color="#1565C0">
        <div style={{ fontSize: 13, lineHeight: 1.7, padding: "8px 0" }}>
          <div><strong>Not a database.</strong> It doesn't look up stored facts \u2014 it reconstructs plausible answers from patterns.</div>
          <div style={{ marginTop: 8 }}><strong>Not a search engine.</strong> It doesn't browse the web in real time (unless given tools to do so).</div>
          <div style={{ marginTop: 8 }}><strong>Not conscious.</strong> It has no beliefs, desires, or experiences. It's a very sophisticated pattern matcher.</div>
        </div>
      </ExpandSection>

      <Tip text="When an LLM says something confidently wrong, it's because the pattern of confident-sounding text was more probable than hedging. Understanding this helps you know when to verify." />

      <Insight text="LLMs are trained once (expensive) and then used many times (cheap per query). A single training run can cost millions of dollars and take months." />
    </div>
  );
}
