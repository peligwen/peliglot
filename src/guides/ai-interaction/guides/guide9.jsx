import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { PromptBox, Tip } from './_helpers';

export function Guide9() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          <strong>Chain of Thought (CoT)</strong> prompting asks the model to show its reasoning step by step.
          This simple technique dramatically improves accuracy on math, logic, and complex tasks.
        </div>
      </DarkBox>

      <Card color="#6A1B9A" title="Without vs With CoT" subtitle="A math problem">
        <div style={{ padding: 16 }}>
          <PromptBox
            label="Direct (no CoT)"
            prompt={"A store has 23 apples. They buy 6 boxes of 8.\nThen sell 15. How many apples remain?"}
            response="56 (incorrect)"
            color="#999"
          />
          <PromptBox
            label="With Chain of Thought"
            prompt={"A store has 23 apples. They buy 6 boxes of 8.\nThen sell 15. How many apples remain?\n\nLet's think step by step."}
            response={"Start with 23 apples.\nBought 6 × 8 = 48 apples.\nTotal: 23 + 48 = 71.\nSold 15.\nRemaining: 71 − 15 = 56. ✅"}
            color="#6A1B9A"
          />
          <div style={{ fontSize: 12, color: "#666", marginTop: 6, lineHeight: 1.5 }}>
            Both get 56 here, but CoT lets you <em>verify</em> each step. On harder problems, CoT often gets the right answer where direct prompting fails.
          </div>
        </div>
      </Card>

      <Card color="#6A1B9A" title="CoT Trigger Phrases">
        <div style={{ padding: 16 }}>
          {[
            "Let's think step by step.",
            "Let's work through this carefully.",
            "Break this into steps and solve each one.",
            "Show your reasoning before giving the answer.",
            "Think about this problem before answering.",
          ].map((phrase, i) => (
            <div key={i} style={{
              background: "#1a1a1a", color: "#e0e0e0", padding: "8px 14px", borderRadius: 8,
              fontFamily: "monospace", fontSize: 13, marginBottom: 6
            }}>
              {phrase}
            </div>
          ))}
        </div>
      </Card>

      <Card color="#6A1B9A" title="When CoT Helps Most">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { task: "Math & logic puzzles", why: "Forces the model to compute intermediate values instead of guessing." },
            { task: "Multi-step decisions", why: "Helps weigh pros and cons before jumping to a conclusion." },
            { task: "Code debugging", why: "'Trace through this code step by step' catches bugs the model would otherwise miss." },
            { task: "Analysis & comparison", why: "Structured reasoning prevents the model from anchoring on its first impression." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "10px 14px", background: "#F3E5F5", borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: "#6A1B9A" }}>{item.task}</div>
              <div style={{ color: "#333", marginTop: 2 }}>{item.why}</div>
            </div>
          ))}
        </div>
      </Card>

      <Tip text="Some models now do chain-of-thought internally (extended thinking). You may not see the reasoning, but the model is still 'working through it' behind the scenes." />

      <Insight text="CoT uses more tokens (= more cost), but the accuracy improvement is often worth it. It's a classic quality-vs-cost trade-off." />
    </div>
  );
}
