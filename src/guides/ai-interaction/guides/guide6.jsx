import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { PromptBox, Tip } from './_helpers';

export function Guide6() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          The single most important prompting skill: <strong>be specific</strong>.
          Vague prompts get vague results. Clear prompts get useful results.
        </div>
      </DarkBox>

      <Card color="#6A1B9A" title="Vague vs Specific" subtitle="Compare these prompts">
        <div style={{ padding: 16 }}>
          <PromptBox
            label="Vague"
            prompt="Tell me about Python."
            color="#999"
          />
          <PromptBox
            label="Specific"
            prompt={"Explain Python list comprehensions with 3 examples,\nranging from simple to complex.\nKeep each example under 2 lines of code."}
            color="#6A1B9A"
          />
        </div>
      </Card>

      <Card color="#6A1B9A" title="The Specificity Checklist">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { q: "What do you want?", tip: "Name the task explicitly: summarize, compare, generate, debug, translate..." },
            { q: "What format?", tip: "Bullet list, table, JSON, paragraph, code block, step-by-step..." },
            { q: "What length?", tip: "'In 3 sentences', '100 words max', 'a brief overview'..." },
            { q: "What audience?", tip: "'For a 10-year-old', 'for a senior engineer', 'for a non-technical manager'..." },
            { q: "What constraints?", tip: "'Don't use jargon', 'include sources', 'use only Python stdlib'..." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 12, padding: "10px 14px", background: "#F3E5F5", borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: "#6A1B9A" }}>{item.q}</div>
              <div style={{ color: "#333", marginTop: 2 }}>{item.tip}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#6A1B9A" title="Real Example: Email Writing">
        <div style={{ padding: 16 }}>
          <PromptBox
            label="Before"
            prompt="Write an email to my boss about being late."
            color="#999"
          />
          <PromptBox
            label="After"
            prompt={"Write a brief, professional email to my manager Sarah.\nI'll be 30 minutes late to Monday's 9am team standup\nbecause of a dentist appointment. Apologetic but not\noverly formal. 3-4 sentences max."}
            color="#6A1B9A"
          />
        </div>
      </Card>

      <Tip text="You can always iterate. Start with a prompt, see the result, then refine. Prompting is a conversation, not a one-shot command." />

      <Insight text="Constraints are your friend. 'Explain X in 3 bullet points' almost always produces better output than 'Explain X'." />
    </div>
  );
}
