import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { PromptBox, Tip } from './_helpers';

export function Guide7() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          <strong>Few-shot prompting</strong> means showing the model examples of what you want before asking it to perform.
          Instead of explaining the pattern, you demonstrate it.
        </div>
      </DarkBox>

      <Card color="#6A1B9A" title="Zero-Shot vs Few-Shot">
        <div style={{ padding: 16 }}>
          <PromptBox
            label="Zero-shot (no examples)"
            prompt={"Classify this review as positive or negative:\n\"The battery dies after 2 hours.\""}
            color="#999"
          />
          <PromptBox
            label="Few-shot (with examples)"
            prompt={"Classify each review as positive or negative.\n\nReview: \"Best phone I've ever owned!\"\nSentiment: positive\n\nReview: \"Screen cracked on day one.\"\nSentiment: negative\n\nReview: \"The battery dies after 2 hours.\"\nSentiment:"}
            response="negative"
            color="#6A1B9A"
          />
        </div>
      </Card>

      <Card color="#6A1B9A" title="When to Use Few-Shot">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { when: "Custom formats", why: "Show the exact output structure you need." },
            { when: "Ambiguous tasks", why: "Examples remove ambiguity faster than descriptions." },
            { when: "Consistent style", why: "Match a specific tone, naming convention, or structure." },
            { when: "Edge cases", why: "Include a tricky example to guide behavior on hard cases." },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ background: "#6A1B9A", color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 700, flexShrink: 0, height: "fit-content" }}>{r.when}</div>
              <div>{r.why}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#6A1B9A" title="Practical Example: Data Extraction">
        <div style={{ padding: 16 }}>
          <PromptBox
            label="Few-shot extraction"
            prompt={"Extract name and role from each sentence.\n\nInput: \"Dr. Sarah Chen leads the ML team.\"\nOutput: {name: \"Sarah Chen\", role: \"ML team lead\"}\n\nInput: \"Jake is our new frontend intern.\"\nOutput: {name: \"Jake\", role: \"frontend intern\"}\n\nInput: \"Maria Rodriguez manages customer success.\"\nOutput:"}
            response={'{name: "Maria Rodriguez", role: "customer success manager"}'}
            color="#6A1B9A"
          />
        </div>
      </Card>

      <Tip text="3-5 examples is the sweet spot. Too few and the pattern isn't clear. Too many and you're wasting context tokens." />

      <Insight text="The quality of your examples matters more than the quantity. One misleading example can derail the whole task." />
    </div>
  );
}
