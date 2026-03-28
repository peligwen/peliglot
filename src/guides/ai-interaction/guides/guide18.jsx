import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';
import { Tip } from './_helpers';

const workflows = [
  { name: "Code Completion", icon: "\u270D\uFE0F", desc: "Inline suggestions as you type. Predicts the next line or block.", tools: "Copilot, Codeium, Supermaven", best: "Boilerplate, repetitive patterns, test scaffolding." },
  { name: "Chat Assistants", icon: "\u{1F4AC}", desc: "Conversational coding help. Explain, debug, refactor through dialogue.", tools: "Claude, ChatGPT, Gemini", best: "Design decisions, debugging, learning new APIs." },
  { name: "Agentic Coding", icon: "\u{1F916}", desc: "AI reads your codebase, edits files, runs tests, and iterates autonomously.", tools: "Claude Code, Cursor, Windsurf", best: "Multi-file changes, refactoring, implementing features." },
  { name: "Code Review", icon: "\u{1F50D}", desc: "AI reviews diffs for bugs, style issues, and security vulnerabilities.", tools: "PR review bots, inline analysis", best: "Catching bugs before merge, enforcing standards." },
];

export function Guide18() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          AI coding assistants are the most mature form of agentic AI today.
          Understanding their <strong>different modes</strong> helps you pick the right tool for each task.
        </div>
      </DarkBox>

      <Card color="#00695C" title="Four Modes of AI Coding">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {workflows.map((w, i) => (
            <div key={i} style={{ background: "#E0F2F1", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 20 }}>{w.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#00695C" }}>{w.name}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 6 }}>{w.desc}</div>
              <div style={{ fontSize: 12, color: "#555" }}><strong>Tools:</strong> {w.tools}</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}><strong>Best for:</strong> {w.best}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#00695C" title="Getting the Most from AI Coding">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { tip: "Give context", detail: "Point the AI to relevant files, explain the architecture, share error messages. More context = better results." },
            { tip: "Review everything", detail: "AI-generated code can look correct but have subtle bugs. Read it as carefully as you'd read a coworker's PR." },
            { tip: "Start small", detail: "Ask for one function, not an entire module. Build up incrementally." },
            { tip: "Use tests as guardrails", detail: "Write tests first, then let AI implement. The tests keep it honest." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, color: "#00695C" }}>{item.tip}</div>
              <div style={{ color: "#333", marginTop: 2 }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      <ExpandSection label="What AI coding can't do (yet)" color="#00695C">
        <div style={{ fontSize: 13, lineHeight: 1.7, padding: "8px 0" }}>
          <div style={{ marginBottom: 8 }}>\u2022 <strong>Understand your business domain</strong> deeply \u2014 it needs you to explain what matters and why.</div>
          <div style={{ marginBottom: 8 }}>\u2022 <strong>Make architectural decisions</strong> with full confidence \u2014 it can propose, but you should decide.</div>
          <div style={{ marginBottom: 8 }}>\u2022 <strong>Guarantee correctness</strong> \u2014 generated code needs testing and review, just like human code.</div>
          <div>\u2022 <strong>Replace understanding</strong> \u2014 using AI to write code you don't understand creates a maintenance problem.</div>
        </div>
      </ExpandSection>

      <Tip text="The most productive developers use AI for the tedious parts (boilerplate, tests, docs) and focus their own attention on design, architecture, and edge cases." />

      <Insight text="AI coding assistants are best thought of as a very fast junior developer: capable and quick, but needs clear direction and code review." />
    </div>
  );
}
