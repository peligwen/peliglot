import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

import { Tip } from './_helpers';

export function Guide23() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          AI is reshaping <strong>jobs, education, creativity, and how we relate to information</strong>.
          The effects are uneven — some fields transform faster than others, and not everyone benefits equally.
        </div>
      </DarkBox>

      <Card color="#C62828" title="Impact Areas">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { area: "Jobs & Work", icon: "💼", points: [
              "AI automates tasks, not whole jobs. Most roles will be augmented, not replaced.",
              "New roles are emerging: prompt engineers, AI trainers, AI safety researchers.",
              "Displacement risk is highest for routine cognitive tasks (data entry, basic writing, simple analysis).",
            ]},
            { area: "Education", icon: "🎓", points: [
              "Students can get personalized tutoring at scale.",
              "Assessment and academic integrity are being rethought.",
              "AI literacy is becoming as important as computer literacy was in the 2000s.",
            ]},
            { area: "Creativity", icon: "🎨", points: [
              "AI lowers the barrier to creating music, art, writing, and code.",
              "Debate continues about whether AI-assisted work is 'real' creativity.",
              "Professional creatives face both new competition and new tools.",
            ]},
            { area: "Information", icon: "📰", points: [
              "AI can generate convincing text, images, and video — making misinformation easier to produce.",
              "Deepfakes challenge our ability to trust what we see.",
              "AI-powered fact-checking could help, but the arms race is real.",
            ]},
          ].map((section, i) => (
            <div key={i} style={{ background: "#FFF5F5", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{section.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#C62828" }}>{section.area}</span>
              </div>
              {section.points.map((p, j) => (
                <div key={j} style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 4, paddingLeft: 10, borderLeft: "2px solid #EF9A9A" }}>
                  {p}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>

      <Card color="#C62828" title="The access divide">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>AI benefits aren't distributed equally:</div>
          <div style={{ marginBottom: 8 }}>• <strong>Language gap:</strong> Most AI tools work best in English. Non-English speakers get worse performance.</div>
          <div style={{ marginBottom: 8 }}>• <strong>Cost gap:</strong> The best models cost money. Free tiers are limited.</div>
          <div style={{ marginBottom: 8 }}>• <strong>Skill gap:</strong> Knowing how to prompt effectively is itself a learned skill that creates advantage.</div>
          <div>• <strong>Infrastructure gap:</strong> Running AI locally requires expensive hardware. Cloud access requires reliable internet.</div>
        </div>
      </Card>

      <Card color="#C62828" title="What history teaches us">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 8 }}>Past technology shifts (printing press, electricity, internet) show a pattern:</div>
          <div style={{ marginBottom: 8 }}>1. <strong>Disruption</strong> — Existing jobs and industries are destabilized.</div>
          <div style={{ marginBottom: 8 }}>2. <strong>Adaptation</strong> — New roles, skills, and industries emerge.</div>
          <div style={{ marginBottom: 8 }}>3. <strong>Net benefit</strong> — Overall productivity and capability increase, but the transition is painful for some.</div>
          <div>The speed of AI adoption is faster than previous revolutions, which means the transition window is shorter.</div>
        </div>
      </Card>

      <Tip text="The most future-proof skill isn't any specific AI tool — it's the ability to learn quickly, think critically, and adapt. AI tools will keep changing; adaptability won't go out of style." />

      <Insight text="AI doesn't just change what we can do — it changes what we think is worth doing. When writing is cheap, editing becomes valuable. When code is easy, architecture matters more." />
    </div>
  );
}
