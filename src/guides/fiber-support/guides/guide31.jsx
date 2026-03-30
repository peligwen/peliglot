import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Warning, SupportTip, Term, StepFlow, CompareTable } from './_helpers';

export function Guide31() {
  return (
    <div>
      <DarkBox title="ALARM TRIAGE">
        Alarms are the network telling you something is wrong. Learning to read, prioritize,
        and correlate alarms is essential for efficient troubleshooting and outage response.
      </DarkBox>

      <Card color="#C62828" title="Alarm Severities" subtitle="Understanding priority levels">
        <CompareTable
          headers={["Severity", "Meaning", "Response"]}
          rows={[
            ["Critical", "Service-affecting failure — immediate attention", "Act now. Customer is likely impacted."],
            ["Major", "Significant degradation — could escalate", "Investigate promptly. May become critical."],
            ["Minor", "Non-critical issue — monitor closely", "Investigate when possible. Track for trends."],
            ["Warning", "Informational — potential future issue", "Note it. No immediate action required."],
          ]}
        />
      </Card>

      <Card color="#1565C0" title="Common Alarms" subtitle="What they mean and what to do">
        <CompareTable
          headers={["Alarm", "Severity", "Likely Cause", "Action"]}
          rows={[
            ["LOSi (Loss of Signal — individual)", "Critical", "ONT fiber disconnected or cut", "Check ONT optical levels; dispatch if fiber issue"],
            ["LOS (Loss of Signal — PON port)", "Critical", "Feeder fiber cut; affects all ONTs on port", "Check all ONTs on that PON; likely upstream cut"],
            ["Dying Gasp", "Major", "ONT lost power", "Check for area power outage; contact customer"],
            ["Equipment Failure", "Critical", "Card or ONT hardware failure", "Replace failed equipment; dispatch tech"],
            ["High Temperature", "Major", "Equipment overheating", "Check ventilation; may need site visit"],
            ["Config Mismatch", "Minor", "Provisioning doesn't match actual ONT", "Verify serial number and re-provision"],
          ]}
        />
      </Card>

      <Card color="#00838F" title="Alarm Correlation" subtitle="Seeing the bigger picture">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", marginBottom: 12 }}>
          Individual alarms tell you about one device. But <Term>correlating</Term> multiple alarms
          reveals larger problems:
        </p>
        <ul style={{ fontSize: 13, lineHeight: 1.9, color: "#333", paddingLeft: 20 }}>
          <li><strong style={{ color: "#1a1a1a" }}>Multiple Dying Gasps from same area</strong> — likely a power outage, not individual ONT issues</li>
          <li><strong style={{ color: "#1a1a1a" }}>Multiple LOSi on same PON port</strong> — upstream fiber cut or splitter failure</li>
          <li><strong style={{ color: "#1a1a1a" }}>Alarm storm (many alarms at once)</strong> — usually indicates a feeder fiber cut or OLT card failure</li>
          <li><strong style={{ color: "#1a1a1a" }}>Recurring alarms on one ONT</strong> — intermittent fiber issue (loose connector, marginal splice)</li>
        </ul>
        <Warning text="During an alarm storm, resist the urge to work individual tickets. First identify the common upstream cause — fixing it resolves all downstream alarms." />
      </Card>

      <Card color="#4527A0" title="Alarm Triage Process" subtitle="Step-by-step approach">
        <StepFlow steps={[
          "Review new alarms — sort by severity (Critical first)",
          "Group alarms by location and PON port to spot patterns",
          "Check for known outages or maintenance windows",
          "For isolated alarms: troubleshoot the individual ONT",
          "For correlated alarms: identify the upstream cause (fiber cut, power outage, card failure)",
          "Escalate plant or equipment issues to the appropriate team",
          "Document findings and update affected customer tickets",
        ]} />
      </Card>

      <SupportTip text="Build a habit of checking the alarm dashboard at the start of your shift. Knowing what's already happening prevents duplicate troubleshooting and helps you spot new issues faster." />
    </div>
  );
}
