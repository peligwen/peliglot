import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

import { Insight } from '../../../components/Insight';
import { PromptBox, Tip } from './_helpers';

const patterns = [
  {
    name: "Persona",
    desc: "Assign the model an expert identity.",
    prompt: "You are a senior security engineer.\nReview this code for vulnerabilities.",
  },
  {
    name: "Template",
    desc: "Pre-fill the output structure.",
    prompt: "Write a bug report using this template:\n\n## Summary\n## Steps to Reproduce\n## Expected vs Actual\n## Environment",
  },
  {
    name: "Audience",
    desc: "Adjust depth by specifying who it's for.",
    prompt: "Explain DNS to me like I'm:\n1. A 10-year-old\n2. A CS student\n3. A network engineer",
  },
  {
    name: "Contrarian",
    desc: "Ask the model to argue the other side.",
    prompt: "I think we should rewrite this in Rust.\nGive me the strongest argument against\nthis decision.",
  },
  {
    name: "Iterative Refinement",
    desc: "Produce, critique, then improve.",
    prompt: "Write a product description for X.\nThen critique it for clarity and persuasion.\nThen rewrite it addressing your own critique.",
  },
];

export function Guide11() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          <strong>Prompt patterns</strong> are reusable templates for common tasks.
          Like design patterns in programming, they give you a reliable starting point.
        </div>
      </DarkBox>

      {patterns.map((p, i) => (
        <Card key={i} color="#6A1B9A" title={p.name} subtitle={p.desc}>
          <div style={{ padding: 16 }}>
            <PromptBox prompt={p.prompt} color="#6A1B9A" />
          </div>
        </Card>
      ))}

      <Card color="#6A1B9A" title="Combining patterns">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>Patterns are most powerful when combined. For example:</div>
          <PromptBox
            label="Persona + Template + CoT"
            prompt={"You are a financial advisor for small businesses.\n\nAnalyze this P&L statement using the template:\n## Revenue Analysis\n## Cost Concerns\n## Recommendations\n\nThink step by step through each section."}
            color="#6A1B9A"
          />
        </div>
      </Card>

      <Tip text="Build a personal prompt library. Save patterns that work well for your common tasks — emails, code reviews, data analysis, writing — and refine them over time." />

      <Insight text="The 'iterative refinement' pattern is surprisingly effective. Asking the model to critique and improve its own output often produces results better than a single carefully crafted prompt." />
    </div>
  );
}
