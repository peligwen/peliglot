import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

import { Tip } from './_helpers';

const strategies = [
  { name: "Decomposition", icon: "🧩", desc: "Break a complex task into smaller, manageable sub-tasks that the model can handle one at a time.", example: "Instead of 'Build me a website', break into: plan pages → design layout → write HTML → add styles → test." },
  { name: "Sequential Chaining", icon: "🔗", desc: "Feed the output of one step as input to the next. Each step focuses on one thing.", example: "Step 1: Extract key points from the article. Step 2: Organize into an outline. Step 3: Write each section." },
  { name: "Verification", icon: "✅", desc: "After each step, check the result before proceeding. Catch errors early.", example: "After writing code, run the tests. If they fail, debug before moving to the next feature." },
  { name: "Backtracking", icon: "↩️", desc: "If a step fails or produces poor results, go back and try a different approach.", example: "If the regex approach doesn't handle edge cases, switch to a parser instead of patching the regex." },
];

export function Guide15() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          Complex tasks require <strong>multi-step reasoning</strong> — the ability to break problems into smaller pieces,
          solve each piece, and combine the results. This is where AI agents really shine.
        </div>
      </DarkBox>

      <Card color="#00695C" title="Key Strategies">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {strategies.map((s, i) => (
            <div key={i} style={{ background: "#E0F2F1", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#00695C" }}>{s.name}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>{s.desc}</div>
              <div style={{ fontSize: 12, color: "#555", fontStyle: "italic", padding: "8px 10px", background: "rgba(0,0,0,0.04)", borderRadius: 6 }}>
                {s.example}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#00695C" title="Why models struggle with big tasks">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}><strong>Attention limits.</strong> As context grows, the model's ability to track all relevant details degrades.</div>
          <div style={{ marginBottom: 8 }}><strong>Error accumulation.</strong> Small errors in early steps compound into big errors later.</div>
          <div style={{ marginBottom: 8 }}><strong>No working memory.</strong> The model can't "hold a thought" outside the token sequence. Intermediate results need to be written down.</div>
          <div><strong>Ambiguity snowball.</strong> An ambiguous early decision can make everything downstream wrong.</div>
        </div>
      </Card>

      <Card color="#00695C" title="Your Role as the Human">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            "Break big asks into smaller, sequential requests",
            "Verify intermediate results before the model builds on them",
            "Provide context the model might be missing",
            "Redirect when the model goes down a wrong path",
          ].map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <div style={{ color: "#00695C", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</div>
              <div>{tip}</div>
            </div>
          ))}
        </div>
      </Card>

      <Tip text="The best results come from collaborative multi-step work: you guide the strategy, the AI handles the execution. Neither works as well alone." />

      <Insight text="A task that seems impossible as one prompt often becomes easy when broken into 5 smaller prompts. The art is knowing where to split." />
    </div>
  );
}
