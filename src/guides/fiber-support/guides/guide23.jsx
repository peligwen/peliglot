import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, SupportTip, Term, StepFlow } from './_helpers';

const lookupSteps = [
  "Log in to MetaView using your support agent credentials.",
  "Navigate to Subscribers in the left menu panel.",
  "Search by DN (Directory Number) or subscriber name.",
  "Click the subscriber entry to view their line configuration.",
  "Review assigned features, line status, and call forwarding settings.",
];

const commonTasks = [
  { task: "Reset Voicemail PIN", steps: "Subscriber → Voicemail → Reset PIN → Set temporary PIN → Save. Advise customer to change on first login." },
  { task: "Enable Call Forwarding", steps: "Subscriber → Features → Call Forwarding → Set forward-to number and condition (Busy / No Answer / All) → Save." },
  { task: "Disable Call Waiting", steps: "Subscriber → Features → Call Waiting → Toggle Off → Save. Customer will no longer hear beep on incoming calls." },
  { task: "Check Line Status", steps: "Subscriber → Status tab → Verify registration state shows 'Registered'. If 'Unregistered', check ONT and voice VLAN." },
  { task: "Modify Caller ID", steps: "Subscriber → Features → Caller ID → Update CNAM display name or toggle blocking → Save." },
];

export function Guide23() {
  return (
    <>
      <DarkBox title="METAVIEW — MANAGEMENT INTERFACE">
        <Term>MetaView</Term> is the web-based management portal for the Metaswitch voice platform.
        Support agents use it to manage subscribers, configure phone features, and troubleshoot
        line issues without needing direct access to the switch.
      </DarkBox>

      <Card color="#1565C0" title="Subscriber Management" subtitle="Creating and modifying phone lines">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333" }}>
          Each phone line in MetaView is identified by its <Term>DN (Directory Number)</Term> — the
          subscriber's phone number. MetaView allows you to view and modify line settings including
          assigned features, call forwarding rules, voicemail configuration, and SIP registration status.
        </p>
        <NetTip text="The DN is the primary key for looking up any subscriber. Always search by full 10-digit number for exact matches." />
      </Card>

      <Card color="#00838F" title="Looking Up a Subscriber" subtitle="Step-by-step in MetaView">
        <StepFlow steps={lookupSteps} />
        <SupportTip text="If the subscriber doesn't appear in MetaView, they may not be provisioned yet. Check iVue for the order status before escalating." />
      </Card>

      <Card color="#6A1B9A" title="Common MetaView Tasks" subtitle="Quick reference for support agents">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {commonTasks.map((t, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 14, border: "1px solid #AED6F1" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#CE93D8", marginBottom: 6 }}>{t.task}</div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: "#333" }}>{t.steps}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#2E7D32" title="Feature Configuration" subtitle="Per-subscriber feature management">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333" }}>
          MetaView lets you enable or disable individual calling features on a per-subscriber basis.
          Features are grouped under the subscriber's profile and include call waiting, caller ID,
          three-way calling, call forwarding (busy, no answer, unconditional), do-not-disturb, and
          anonymous call rejection.
        </p>
        <SupportTip text="Always confirm changes with the customer before saving. Some features like unconditional call forwarding will prevent the phone from ringing entirely." />
      </Card>
    </>
  );
}
