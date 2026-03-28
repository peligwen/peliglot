import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Tip } from './_helpers';

const steps = [
  { phase: "Think", icon: "\u{1F9E0}", desc: "Analyze the task. What needs to happen? What information is missing?", color: "#1565C0" },
  { phase: "Plan", icon: "\u{1F4DD}", desc: "Break the task into steps. Decide which tools to use and in what order.", color: "#6A1B9A" },
  { phase: "Act", icon: "\u26A1", desc: "Execute the next step \u2014 call a tool, write code, make an API request.", color: "#00695C" },
  { phase: "Observe", icon: "\u{1F441}\uFE0F", desc: "Read the result. Did it work? Did it return what was expected?", color: "#E65100" },
  { phase: "Reflect", icon: "\u{1F50D}", desc: "Update the plan based on what was learned. Adjust if needed.", color: "#C62828" },
  { phase: "Repeat", icon: "\u{1F504}", desc: "Go back to Act with the updated plan. Continue until the task is complete.", color: "#00695C" },
];

export function Guide14() {
  const [active, setActive] = useState(0);
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          An <strong>agentic loop</strong> is when an AI model works autonomously through a task:
          thinking, acting, observing results, and iterating. This is what makes AI agents different from simple chatbots.
        </div>
      </DarkBox>

      <Card color="#00695C" title="The Agent Loop" subtitle="Tap each phase">
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                background: active === i ? s.color : "#f5f5f5", color: active === i ? "#fff" : "#333",
                border: "none", borderRadius: 10, cursor: "pointer", textAlign: "left", transition: "all 0.2s"
              }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.phase}</div>
                  {active === i && <div style={{ fontSize: 12, marginTop: 4, lineHeight: 1.6, opacity: 0.95 }}>{s.desc}</div>}
                </div>
                {i < steps.length - 1 && active !== i && (
                  <span style={{ marginLeft: "auto", opacity: 0.3, fontSize: 16 }}>\u2193</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card color="#00695C" title="Real Example: Debugging">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ fontStyle: "italic", marginBottom: 12, color: "#555" }}>User: "Fix the failing test in auth.test.js"</div>
          {[
            { step: "Think", text: "Read the test file and error message." },
            { step: "Act", text: "Open auth.test.js, run the failing test." },
            { step: "Observe", text: "Error: 'expected 401, got 200'. The auth middleware isn't blocking unauthenticated requests." },
            { step: "Act", text: "Read the auth middleware code." },
            { step: "Observe", text: "Found the bug: missing early return after sending 401." },
            { step: "Act", text: "Add the missing return statement." },
            { step: "Observe", text: "Re-run test \u2014 passes." },
            { step: "Done", text: "Report the fix to the user." },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#00695C", width: 55, flexShrink: 0 }}>{s.step}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      </Card>

      <Tip text="The quality of an agent is mostly about the quality of its loop: how well it plans, how it handles errors, and when it decides to ask for help vs. push forward." />

      <Insight text="Unlike a chatbot (1 prompt \u2192 1 response), an agent might make dozens of tool calls to complete a single task. Each call feeds back into the next decision." />
    </div>
  );
}
