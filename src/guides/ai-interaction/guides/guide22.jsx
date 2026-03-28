import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';
import { Tip } from './_helpers';

const costs = [
  { phase: "Training", icon: "\u{1F3CB}\uFE0F", energy: "High", desc: "Training a large model once can use as much energy as hundreds of homes use in a year.", note: "GPT-4-scale training: estimated 50+ GWh" },
  { phase: "Inference", icon: "\u{1F4AC}", energy: "Low per query", desc: "Each query uses a small amount of energy, but billions of queries add up.", note: "One query \u2248 10x a Google search in energy" },
  { phase: "Hardware", icon: "\u{1F5A5}\uFE0F", energy: "Embodied", desc: "Manufacturing GPUs and building data centers has its own carbon footprint.", note: "Rare earth mining, water cooling, chip fabrication" },
];

export function Guide22() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          AI has a <strong>carbon footprint</strong>. Training large models and serving billions of queries requires
          significant energy, water, and hardware. Understanding the costs helps you use AI more thoughtfully.
        </div>
      </DarkBox>

      <Card color="#C62828" title="Where the Energy Goes">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {costs.map((c, i) => (
            <div key={i} style={{ background: "#FFF5F5", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#C62828" }}>{c.phase}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, padding: "2px 8px", background: "#C62828", color: "#fff", borderRadius: 4 }}>{c.energy}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 4 }}>{c.desc}</div>
              <div style={{ fontSize: 11, color: "#888", fontStyle: "italic" }}>{c.note}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#C62828" title="What You Can Do">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { action: "Use smaller models when possible", detail: "A 7B parameter model uses far less energy than a 400B one. If the smaller model does the job, use it." },
            { action: "Cache and reuse results", detail: "Don't re-query for the same thing. Store and reuse AI outputs where appropriate." },
            { action: "Be intentional with queries", detail: "A well-crafted prompt that works in one try is greener than five vague attempts." },
            { action: "Choose providers wisely", detail: "Some data centers run on renewable energy. Provider transparency reports can guide your choice." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, color: "#C62828" }}>{item.action}</div>
              <div style={{ color: "#333", marginTop: 2 }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      <ExpandSection label="Putting it in perspective" color="#C62828">
        <div style={{ fontSize: 13, lineHeight: 1.7, padding: "8px 0" }}>
          <div style={{ marginBottom: 8 }}>AI's energy use is real but should be compared to alternatives:</div>
          <div style={{ marginBottom: 8 }}>\u2022 Video streaming, cryptocurrency mining, and air travel each have larger total carbon footprints globally.</div>
          <div style={{ marginBottom: 8 }}>\u2022 AI can also <em>reduce</em> emissions by optimizing energy grids, logistics, and building systems.</div>
          <div>The question isn't whether to use AI, but whether its benefits justify its costs in each application.</div>
        </div>
      </ExpandSection>

      <Tip text="Good prompt engineering isn't just about better results \u2014 it's about efficiency. Fewer retries means less compute, less energy, and lower costs." />

      <Insight text="Data centers also use massive amounts of water for cooling. A single large data center can use millions of gallons per day, impacting local water resources." />
    </div>
  );
}
