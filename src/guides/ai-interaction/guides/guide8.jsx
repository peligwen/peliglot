import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';
import { PromptBox, Tip } from './_helpers';

export function Guide8() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          A <strong>system prompt</strong> is a set of instructions given to the model before the conversation starts.
          It shapes the model's personality, rules, and capabilities for the entire session.
        </div>
      </DarkBox>

      <Card color="#6A1B9A" title="Anatomy of a System Prompt">
        <div style={{ padding: 16 }}>
          <PromptBox
            label="System prompt"
            prompt={"You are a helpful coding assistant.\n\nRules:\n- Always include code examples\n- Use Python unless asked otherwise\n- Explain your reasoning before showing code\n- If you're unsure, say so\n\nTone: Professional but friendly. No emojis."}
            color="#6A1B9A"
          />
          <div style={{ fontSize: 12, color: "#666", marginTop: 8, lineHeight: 1.5 }}>
            This prompt is invisible to the end user but shapes every response the model gives.
          </div>
        </div>
      </Card>

      <Card color="#6A1B9A" title="What Goes in a System Prompt?">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { emoji: "🎭", label: "Role", desc: "Who the model should be: 'You are a senior tax accountant' or 'You are a patient tutor for 8th graders'." },
            { emoji: "📏", label: "Rules", desc: "Hard constraints: 'Never give medical advice', 'Always respond in JSON', 'Keep answers under 200 words'." },
            { emoji: "🎨", label: "Style", desc: "Tone and format: 'Be concise', 'Use Markdown', 'Explain like I'm five'." },
            { emoji: "📚", label: "Context", desc: "Background knowledge: 'The user is building a React app', 'We use PostgreSQL in production'." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{item.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, color: "#6A1B9A" }}>{item.label}</div>
                <div style={{ color: "#333" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <ExpandSection label="System vs User prompt" color="#6A1B9A">
        <div style={{ fontSize: 13, lineHeight: 1.7, padding: "8px 0" }}>
          <div style={{ marginBottom: 8 }}><strong>System prompt</strong> = persistent instructions. Set once, applies to every turn. Higher priority for most models.</div>
          <div style={{ marginBottom: 8 }}><strong>User prompt</strong> = per-turn input. Changes with each message.</div>
          <div>Think of the system prompt as the job description and the user prompt as today's task.</div>
        </div>
      </ExpandSection>

      <ExpandSection label="Real-world system prompt tips" color="#6A1B9A">
        <div style={{ fontSize: 13, lineHeight: 1.7, padding: "8px 0" }}>
          <div style={{ marginBottom: 8 }}>• Put the most important rules first — models pay more attention to the beginning.</div>
          <div style={{ marginBottom: 8 }}>• Use clear headers and numbered lists for complex instructions.</div>
          <div style={{ marginBottom: 8 }}>• Test with adversarial inputs to see if rules hold up.</div>
          <div>• Keep it as short as possible — every token in the system prompt is sent with every request.</div>
        </div>
      </ExpandSection>

      <Tip text="System prompts aren't truly 'secret'. Determined users can sometimes get models to reveal them. Never put passwords or API keys in a system prompt." />

      <Insight text="Many AI products you use daily are the same base model + a carefully crafted system prompt. The prompt IS the product." />
    </div>
  );
}
