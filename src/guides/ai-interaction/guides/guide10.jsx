import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { PromptBox, Tip } from './_helpers';

export function Guide10() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          LLMs can output data in any format you ask for — JSON, CSV, Markdown tables, XML, YAML.
          <strong> Structured output</strong> makes AI responses machine-readable and predictable.
        </div>
      </DarkBox>

      <Card color="#6A1B9A" title="Asking for JSON" subtitle="The most common structured format">
        <div style={{ padding: 16 }}>
          <PromptBox
            label="Prompt"
            prompt={"Extract the key info from this product review\nand return it as JSON:\n\n\"Bought the XR-500 headphones last week.\nGreat bass but the ear cups are too small.\nWorth the $89 price. 4 out of 5 stars.\"\n\nUse this schema:\n{product, pros: [], cons: [], price, rating}"}
            response={'{\n  "product": "XR-500 headphones",\n  "pros": ["Great bass", "Good value"],\n  "cons": ["Ear cups too small"],\n  "price": "$89",\n  "rating": "4/5"\n}'}
            color="#6A1B9A"
          />
        </div>
      </Card>

      <Card color="#6A1B9A" title="Format Techniques">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { name: "Provide a schema", desc: "Show the exact field names and types you want. The model will follow the shape." },
            { name: "Give an example", desc: "Show one complete output example. The model will match the format." },
            { name: "Use delimiters", desc: "Ask for output wrapped in ```json or <data> tags to make it easy to parse." },
            { name: "Validate & retry", desc: "In code, parse the output and ask the model to fix it if it's malformed." },
          ].map((t, i) => (
            <div key={i} style={{ marginBottom: 10, padding: "10px 14px", background: "#F3E5F5", borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: "#6A1B9A" }}>{t.name}</div>
              <div style={{ color: "#333", marginTop: 2 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#6A1B9A" title="Markdown Tables">
        <div style={{ padding: 16 }}>
          <PromptBox
            label="Prompt"
            prompt={"Compare Python, JavaScript, and Rust in a\nmarkdown table with columns:\nLanguage | Typing | Speed | Best For"}
            response={"| Language   | Typing  | Speed   | Best For         |\n|------------|---------|---------|------------------|\n| Python     | Dynamic | Slow    | ML, scripting    |\n| JavaScript | Dynamic | Medium  | Web, full-stack  |\n| Rust       | Static  | Fast    | Systems, safety  |"}
            color="#6A1B9A"
          />
        </div>
      </Card>

      <Tip text="Many APIs now support 'structured outputs' or 'tool use' that force the model to return valid JSON matching a schema. This is more reliable than asking nicely in the prompt." />

      <Insight text="Structured output is the bridge between AI and software. It turns natural language into data your code can process." />
    </div>
  );
}
