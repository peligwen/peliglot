import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';
import { Tip } from './_helpers';

export function Guide23() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          AI is reshaping <strong>jobs, education, creativity, and how we relate to information</strong>.
          The effects are uneven \u2014 some fields transform faster than others, and not everyone benefits equally.
        </div>
      </DarkBox>

      <Card color="#C62828" title="Impact Areas">
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { area: "Jobs & Work", icon: "\u{1F4BC}", points: [
              "AI automates tasks, not whole jobs. Most roles will be augmented, not replaced.",
              "New roles are emerging: prompt engineers, AI trainers, AI safety researchers.",
              "Displacement risk is highest for routine cognitive tasks (data entry, basic writing, simple analysis).",
            ]},
            { area: "Education", icon: "\u{1F393}", points: [
              "Students can get personalized tutoring at scale.",
              "Assessment and academic integrity are being rethought.",
              "AI literacy is becoming as important as computer literacy was in the 2000s.",
            ]},
            { area: "Creativity", icon: "\u{1F3A8}", points: [
              "AI lowers the barrier to creating music, art, writing, and code.",
              "Debate continues about whether AI-assisted work is 'real' creativity.",
              "Professional creatives face both new competition and new tools.",
            ]},
            { area: "Information", icon: "\u{1F4F0}", points: [
              "AI can generate convincing text, images, and video \u2014 making misinformation easier to produce.",
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

      <ExpandSection label="The access divide" color="#C62828">
        <div style={{ fontSize: 13, lineHeight: 1.7, padding: "8px 0" }}>
          <div style={{ marginBottom: 8 }}>AI benefits aren't distributed equally:</div>
          <div style={{ marginBottom: 8 }}>\u2022 <strong>Language gap:</strong> Most AI tools work best in English. Non-English speakers get worse performance.</div>
          <div style={{ marginBottom: 8 }}>\u2022 <strong>Cost gap:</strong> The best models cost money. Free tiers are limited.</div>
          <div style={{ marginBottom: 8 }}>\u2022 <strong>Skill gap:</strong> Knowing how to prompt effectively is itself a learned skill that creates advantage.</div>
          <div>\u2022 <strong>Infrastructure gap:</strong> Running AI locally requires expensive hardware. Cloud access requires reliable internet.</div>
        </div>
      </ExpandSection>

      <ExpandSection label="What history teaches us" color="#C62828">
        <div style={{ fontSize: 13, lineHeight: 1.7, padding: "8px 0" }}>
          <div style={{ marginBottom: 8 }}>Past technology shifts (printing press, electricity, internet) show a pattern:</div>
          <div style={{ marginBottom: 8 }}>1. <strong>Disruption</strong> \u2014 Existing jobs and industries are destabilized.</div>
          <div style={{ marginBottom: 8 }}>2. <strong>Adaptation</strong> \u2014 New roles, skills, and industries emerge.</div>
          <div style={{ marginBottom: 8 }}>3. <strong>Net benefit</strong> \u2014 Overall productivity and capability increase, but the transition is painful for some.</div>
          <div>The speed of AI adoption is faster than previous revolutions, which means the transition window is shorter.</div>
        </div>
      </ExpandSection>

      <Tip text="The most future-proof skill isn't any specific AI tool \u2014 it's the ability to learn quickly, think critically, and adapt. AI tools will keep changing; adaptability won't go out of style." />

      <Insight text="AI doesn't just change what we can do \u2014 it changes what we think is worth doing. When writing is cheap, editing becomes valuable. When code is easy, architecture matters more." />
    </div>
  );
}
