import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';
import { Tip } from './_helpers';

const spectrum = [
  { level: "Full Human Control", desc: "AI suggests, human does everything.", example: "Autocomplete suggestions in an editor.", color: "#1565C0", width: "15%" },
  { level: "Human Approval", desc: "AI proposes actions, human approves each one.", example: "Claude Code asking permission before editing a file.", color: "#00695C", width: "35%" },
  { level: "Human Oversight", desc: "AI acts autonomously but human monitors and can intervene.", example: "AI agent fixing bugs, with a human reviewing the PR.", color: "#E65100", width: "65%" },
  { level: "Full Autonomy", desc: "AI acts independently with no human checks.", example: "Auto-scaling infrastructure based on AI decisions.", color: "#C62828", width: "90%" },
];

export function Guide17() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          The most effective AI systems keep <strong>humans in the loop</strong> — not because AI can't act alone,
          but because the cost of AI mistakes varies widely, and humans add judgment AI lacks.
        </div>
      </DarkBox>

      <Card color="#00695C" title="The Autonomy Spectrum">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {spectrum.map((s, i) => (
            <div key={i} style={{ background: "#f5f5f5", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: s.color }}>{s.level}</span>
              </div>
              <div style={{ background: "#e0e0e0", borderRadius: 6, height: 8, marginBottom: 8 }}>
                <div style={{ background: s.color, height: "100%", width: s.width, borderRadius: 6 }} />
              </div>
              <div style={{ fontSize: 12, color: "#333", lineHeight: 1.5 }}>{s.desc}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 4, fontStyle: "italic" }}>{s.example}</div>
            </div>
          ))}
          <div style={{ fontSize: 11, color: "#888", textAlign: "center" }}>
            ← More human control {"  —  "} More AI autonomy →
          </div>
        </div>
      </Card>

      <Card color="#00695C" title="When to Add Human Checks">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { risk: "High stakes", check: "Medical, legal, financial decisions — always require human review." },
            { risk: "Irreversible actions", check: "Deleting data, sending emails, deploying to production — confirm first." },
            { risk: "Ambiguous tasks", check: "When the 'right answer' depends on context the AI may not have." },
            { risk: "Novel situations", check: "Edge cases the AI hasn't encountered in training." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "10px 14px", background: "#E0F2F1", borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: "#00695C" }}>{item.risk}</div>
              <div style={{ color: "#333", marginTop: 2 }}>{item.check}</div>
            </div>
          ))}
        </div>
      </Card>

      <ExpandSection label="Trust calibration" color="#00695C">
        <div style={{ fontSize: 13, lineHeight: 1.7, padding: "8px 0" }}>
          <div style={{ marginBottom: 8 }}><strong>Start supervised.</strong> Run the AI with full human review. Learn its strengths and weaknesses.</div>
          <div style={{ marginBottom: 8 }}><strong>Gradually loosen.</strong> As you build trust, allow more autonomy for low-risk tasks.</div>
          <div style={{ marginBottom: 8 }}><strong>Keep guardrails.</strong> Even trusted agents should have limits on destructive actions.</div>
          <div><strong>Monitor continuously.</strong> AI behavior can drift. Periodic reviews catch issues early.</div>
        </div>
      </ExpandSection>

      <Tip text="The goal isn't to remove humans from the loop — it's to put them at the right point in the loop. Review the decisions that matter most." />

      <Insight text="Permission systems (like 'allow this tool? yes/no') are the simplest and most effective form of human-in-the-loop. They add seconds of friction but prevent costly mistakes." />
    </div>
  );
}
