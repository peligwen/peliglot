import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { SupportTip, StepFlow } from './_helpers';

export function Guide42() {
  return (
    <div>
      <DarkBox title="PATTERN RECOGNITION">
        Great troubleshooters see patterns. Same customer calling repeatedly? Multiple tickets from
        one area? These patterns reveal root causes that individual tickets never will.
      </DarkBox>

      <Card color="#0277BD" title="Time-of-Day Patterns" subtitle="When it happens tells you why">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { time: "Evening (7–10 PM)", icon: "🌙", cause: "PON congestion from peak usage. Normal if minor — investigate if severe. Check port utilization." },
            { time: "Morning (6–8 AM)", icon: "🌅", cause: "Possible thermal expansion as sun hits aerial fiber. Temperature changes cause microbends in marginal connectors." },
            { time: "Random throughout day", icon: "🔀", cause: "Likely equipment or connector issue — not usage-related. Check ONT health, error counters, and connector integrity." },
          ].map(item => (
            <div key={item.time} style={{ padding: 12, background: "#D6EAF8", borderRadius: 10, border: "1px solid #AED6F1", display: "flex", gap: 12 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{item.time}</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: "#333" }}>{item.cause}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#1565C0" title="Geographic Patterns" subtitle="Where it happens narrows the scope">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { pattern: "Multiple customers on same PON port", cause: "Splitter or feeder fiber issue. The common path between these customers is the problem." },
            { pattern: "Entire neighborhood affected", cause: "Fiber cut or OLT card issue. Check for construction activity, vehicle accidents near aerial fiber, or OLT alarms." },
            { pattern: "Single customer, recurring issue", cause: "Drop cable, ONT, or premise wiring issue. The problem is isolated to their path from the splitter." },
          ].map(item => (
            <div key={item.pattern} style={{ padding: 12, background: "#fff", borderRadius: 10, border: "1px solid #AED6F1" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1565C0", marginBottom: 4 }}>{item.pattern}</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: "#333" }}>{item.cause}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#E65100" title="Weather Correlation" subtitle="Nature vs fiber">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { weather: "Rain + outages", icon: "🌧️", cause: "Water ingress in splice enclosure or connector. Moisture disrupts the optical signal." },
            { weather: "Heat + intermittent drops", icon: "☀️", cause: "Thermal expansion causing microbends in fiber. Marginal connectors fail as temperature rises." },
            { weather: "Wind + service drops", icon: "💨", cause: "Aerial fiber movement stressing loose connectors. Wind sway on long spans." },
            { weather: "Cold snap + failures", icon: "❄️", cause: "Ice loading on aerial fiber. Contraction can pull connectors or stress splice points." },
          ].map(item => (
            <div key={item.weather} style={{ padding: 10, background: "#FFF3E0", borderRadius: 10, border: "1px solid #FFB74D", display: "flex", gap: 12 }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#E65100" }}>{item.weather}</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: "#333" }}>{item.cause}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#6A1B9A" title="Repeat Callers" subtitle="Investigating chronic issues">
        <StepFlow steps={[
          "Pull the complete ticket history for the customer — look for patterns in symptoms and timing",
          "Check if the same tech visited each time — was the fix temporary or did it address the root cause?",
          "Review optical level trends over time — is the signal slowly degrading?",
          "Look for environmental changes — new construction, tree growth, equipment additions",
          "Consider root cause vs symptom treatment — repeated ONT reboots might mask a failing connector",
        ]} color="#6A1B9A" />
      </Card>

      <SupportTip text="If a customer has called 3+ times for the same issue, stop treating symptoms. Escalate for root cause analysis — the pattern IS the diagnosis." />
    </div>
  );
}
