import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Tip } from './_helpers';

const tools = [
  { name: "Web Search", icon: "🔍", desc: "Look up current information the model wasn't trained on.", example: "What's the weather in Austin right now?" },
  { name: "Code Execution", icon: "💻", desc: "Run code and return results. Essential for math and data tasks.", example: "Calculate the standard deviation of [4, 8, 15, 16, 23, 42]." },
  { name: "File System", icon: "📁", desc: "Read, write, and search files on your machine.", example: "Find all TODO comments in the src/ directory." },
  { name: "API Calls", icon: "🌐", desc: "Interact with external services — databases, APIs, cloud.", example: "Create a new GitHub issue for this bug." },
  { name: "Image Generation", icon: "🎨", desc: "Create images from text descriptions.", example: "Draw a diagram of a microservices architecture." },
];

export function Guide13() {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          By itself, an LLM can only generate text. <strong>Tool use</strong> gives models the ability to take actions:
          search the web, run code, read files, call APIs. This is what makes AI truly useful.
        </div>
      </DarkBox>

      <Card color="#00695C" title="Common Tools" subtitle="Tap to see an example">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {tools.map((t, i) => (
            <button key={i} onClick={() => setSel(sel === i ? null : i)} style={{
              background: sel === i ? "#00695C" : "#f5f5f5", color: sel === i ? "#fff" : "#333",
              border: "none", borderRadius: 10, padding: "12px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.2s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
                  <div style={{ fontSize: 12, marginTop: 2, opacity: 0.85 }}>{t.desc}</div>
                </div>
              </div>
              {sel === i && (
                <div style={{ marginTop: 10, padding: "10px 12px", background: "rgba(255,255,255,0.15)", borderRadius: 8, fontFamily: "monospace", fontSize: 12 }}>
                  User: "{t.example}"
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>

      <Card color="#00695C" title="How Tool Use Works">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { step: "Model decides it needs a tool", detail: "Based on the user's request, it generates a tool call (like a function call)." },
            { step: "System executes the tool", detail: "The host application runs the requested action and returns the result." },
            { step: "Model incorporates the result", detail: "The tool output goes back into the context, and the model continues its response." },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <div style={{ background: "#00695C", color: "#fff", borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{s.step}</div>
                <div style={{ color: "#555", marginTop: 2 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Tip text="Tool use is the difference between 'AI that talks about things' and 'AI that does things'. It's what turns a chatbot into an assistant." />

      <Insight text="The model doesn't actually run tools itself. It outputs a structured request (like a JSON function call), and the host system executes it. This is a critical safety boundary." />
    </div>
  );
}
