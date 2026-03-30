import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Warning, SupportTip, Term, StepFlow, CompareTable } from './_helpers';

export function Guide34() {
  return (
    <div>
      <DarkBox title="ESCALATION PROCEDURES">
        Knowing when and how to escalate is just as important as troubleshooting itself.
        A good escalation saves time for everyone and gets the customer to resolution faster.
      </DarkBox>

      <Card color="#C62828" title="When to Escalate" subtitle="Recognize the signals">
        <ul style={{ fontSize: 13, lineHeight: 1.9, color: "#333", paddingLeft: 20 }}>
          <li><strong style={{ color: "#1a1a1a" }}>Exhausted standard troubleshooting</strong> — you have followed the decision trees and still cannot resolve</li>
          <li><strong style={{ color: "#1a1a1a" }}>Hardware failure</strong> — ONT, OLT card, or other equipment needs replacement</li>
          <li><strong style={{ color: "#1a1a1a" }}>Plant / fiber issue</strong> — bad optical levels, fiber cut, or physical damage</li>
          <li><strong style={{ color: "#1a1a1a" }}>Provisioning system error</strong> — system won't accept configuration or order is stuck</li>
          <li><strong style={{ color: "#1a1a1a" }}>Repeated issue</strong> — same customer calling for the same problem multiple times</li>
        </ul>
        <Warning text="Do not escalate without documenting what you have already tried. An escalation without troubleshooting details just bounces back to you." />
      </Card>

      <Card color="#1565C0" title="Escalation Tiers" subtitle="Who handles what">
        <CompareTable
          headers={["Tier", "Team", "Handles"]}
          rows={[
            ["Tier 1", "Support Agent (you)", "Standard troubleshooting, reboots, basic provisioning, customer education"],
            ["Tier 2", "Senior Support / NOC", "Advanced provisioning, MSAP config, alarm investigation, remote diagnostics"],
            ["Tier 3", "Network Engineering", "OLT issues, backhaul problems, capacity planning, complex network faults"],
            ["Vendor", "Nokia / Calix Support", "Software bugs, firmware issues, hardware defects under warranty"],
          ]}
        />
      </Card>

      <Card color="#00838F" title="Escalation by Issue Type" subtitle="Where to send what">
        <CompareTable
          headers={["Issue Type", "Escalate To", "Priority"]}
          rows={[
            ["Data (internet) — no service", "Tier 2 → Tier 3 if needed", "High"],
            ["Data — slow speeds (config ruled out)", "Tier 2 → Engineering", "Medium"],
            ["Voice — no dial tone", "Tier 2 (voice team)", "High"],
            ["Plant — fiber cut or damage", "Plant Ops / Outside Plant", "Critical"],
            ["Provisioning — system error", "Provisioning Team / Tier 2", "Medium"],
            ["Equipment — ONT or card failure", "Tier 2 + Dispatch", "High"],
          ]}
        />
      </Card>

      <Card color="#4527A0" title="Writing an Effective Escalation" subtitle="What to include">
        <StepFlow steps={[
          "Customer info: name, account number, address, contact number",
          "Symptom summary: what the customer is experiencing, when it started, how many devices affected",
          "Troubleshooting performed: list each step taken and the result (be specific)",
          "Technical readings: optical levels (Rx/Tx), LED status, alarm data with timestamps",
          "System checks: MSAP/service config status, iVue order status, any errors found",
          "Your assessment: what you believe the issue is based on your investigation",
        ]} />
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", marginTop: 12 }}>
          A complete escalation should answer: <Term>What is happening?</Term> <Term>What did you check?</Term> <Term>What do you think is wrong?</Term>
        </p>
      </Card>

      <SupportTip text="A good escalation saves everyone time — be thorough but concise. Include all relevant data, but don't write a novel. Bullet points and readings speak louder than paragraphs." />
    </div>
  );
}
