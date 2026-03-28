import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { SimpleGuide } from '../../../components/SimpleGuide';

import { Tip } from './_helpers';

export function Guide21() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          When AI generates text, code, or images, <strong>who owns it?</strong> Copyright law is still catching up to AI,
          and the answers depend on where you are and how the AI was trained.
        </div>
      </DarkBox>

      <Card color="#C62828" title="The Key Questions">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { q: "Is AI output copyrightable?", a: "In most jurisdictions, pure AI output (with no human creative input) is not copyrightable. Human authorship is generally required.", icon: "📄" },
            { q: "Is training on copyrighted data legal?", a: "Hotly debated. Some argue it's fair use (like learning from books). Multiple lawsuits are testing this.", icon: "⚖️" },
            { q: "Who is liable for AI-generated content?", a: "Generally the person or company who deploys the AI and publishes the output, not the AI provider.", icon: "👮" },
          ].map((item, i) => (
            <div key={i} style={{ background: "#FFF5F5", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#C62828" }}>{item.q}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: "#333" }}>{item.a}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#C62828" title="Practical Guidelines">
        <SimpleGuide items={[
          { h: "Don't pass off AI output as your own original work", b: "Especially in academic, journalistic, or legal contexts. Disclose AI use when it matters." },
          { h: "Review AI code for license issues", b: "AI might reproduce snippets from open-source code. Check that you comply with any applicable licenses." },
          { h: "Check your AI provider's terms", b: "Most providers (OpenAI, Anthropic, Google) grant you rights to use the output, but terms vary." },
          { h: "Add your own creative contribution", b: "Heavily editing, curating, or building on AI output strengthens your claim to the final work." },
        ]} />
      </Card>

      <Card color="#C62828" title="The training data debate">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}><strong>For AI companies:</strong> Training is transformative use — the model doesn't store or reproduce specific works, it learns patterns.</div>
          <div style={{ marginBottom: 8 }}><strong>For content creators:</strong> Their work was used without permission or compensation to build commercial products.</div>
          <div>Courts in the US, EU, and elsewhere are actively deciding these questions. The legal landscape will likely look very different in a few years.</div>
        </div>
      </Card>

      <Tip text="When in doubt, treat AI output as a starting point, not a finished product. Your edits, judgment, and creative decisions are what make the final result truly yours." />

      <Insight text="The EU AI Act, the US Copyright Office rulings, and ongoing court cases are all shaping this space rapidly. What's true today may change by next year." />
    </div>
  );
}
