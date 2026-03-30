import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Warning, SupportTip, StepFlow } from './_helpers';

export function Guide43() {
  return (
    <div>
      <DarkBox title="MASS OUTAGE HANDLING">
        Mass outages affect many customers at once. Your role: identify the scope, communicate
        clearly, and track restoration.
      </DarkBox>

      <Card color="#C62828" title="Identifying a Mass Outage" subtitle="Signs that it's bigger than one customer">
        <ul style={{ fontSize: 13, lineHeight: 1.9, color: "#333", paddingLeft: 20 }}>
          <li><strong style={{ color: "#1a1a1a" }}>Multiple LOSi/LOS alarms</strong> from the same PON port or OLT appearing within minutes</li>
          <li><strong style={{ color: "#1a1a1a" }}>Sudden spike in incoming calls</strong> from a geographic area — check if callers share a neighborhood or street</li>
          <li><strong style={{ color: "#1a1a1a" }}>OLT card or port showing down status</strong> in your NMS — this affects every ONT on that port</li>
          <li><strong style={{ color: "#1a1a1a" }}>Feeder fiber cut indicators</strong> — all ONTs downstream of a splitter going dark simultaneously</li>
        </ul>
      </Card>

      <Card color="#0277BD" title="Response Process" subtitle="Seven-step outage response">
        <StepFlow steps={[
          "Confirm the outage in AMS/Calix Cloud — verify it's not just one customer. Look for multiple alarms from the same PON port or OLT card.",
          "Identify scope: which OLT, which PON port(s), how many ONTs are affected. This determines the severity and response level.",
          "Check for known maintenance or planned work — is there a maintenance window that overlaps? Was plant ops already working in the area?",
          "Report to NOC / plant operations with all details: OLT name, port(s), number of affected ONTs, alarm types, and any known construction activity.",
          "Begin customer communication: acknowledge the outage, give the estimated affected area. Use consistent messaging across all agents.",
          "Monitor restoration progress — watch for ONTs coming back online. Track which areas recover first.",
          "Verify service is fully restored. Follow up on any ONTs that didn't come back online — they may need a remote reboot or have a separate issue.",
        ]} />
      </Card>

      <Card color="#1565C0" title="Customer Communication" subtitle="What to say and what NOT to say">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { do: true, text: "\"We're aware of a service interruption in your area. Our technical team is actively working on it.\"" },
            { do: true, text: "\"We can offer a callback when service is restored so you don't have to wait on hold.\"" },
            { do: true, text: "\"I'm documenting your report — this helps us track the full scope of the issue.\"" },
            { do: false, text: "\"It'll be fixed in 30 minutes.\" — Never promise a specific time unless plant ops has confirmed it." },
            { do: false, text: "\"It's just your area.\" — Minimizing the scope doesn't help the customer." },
            { do: false, text: "\"Have you tried rebooting?\" — During a confirmed mass outage, don't waste the customer's time with individual troubleshooting." },
          ].map((item, i) => (
            <div key={i} style={{
              padding: 10, borderRadius: 8, fontSize: 13, lineHeight: 1.5,
              background: item.do ? "#E8F5E9" : "#FFEBEE",
              border: `1px solid ${item.do ? "#4CAF50" : "#EF5350"}`,
              color: item.do ? "#2E7D32" : "#C62828",
            }}>
              <strong>{item.do ? "✓ DO:" : "✗ DON'T:"}</strong> {item.text}
            </div>
          ))}
        </div>
      </Card>

      <Warning text="Never tell a customer 'it will be fixed in X minutes' during a fiber cut — plant repairs are unpredictable. Say 'crews are working on it and we'll update you.'" />

      <SupportTip text="After a mass outage is resolved, proactively check for ONTs that didn't come back online — they may need a remote reboot or have a pre-existing issue that was masked." />
    </div>
  );
}
