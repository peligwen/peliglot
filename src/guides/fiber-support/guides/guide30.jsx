import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { SupportTip, Term, StepFlow, CompareTable } from './_helpers';

const ticketCategories = [
  { cat: "No Service", icon: "🔴", desc: "Complete outage — customer has no connectivity at all." },
  { cat: "Slow Speed", icon: "🟡", desc: "Service works but below expected speeds." },
  { cat: "Phone Issue", icon: "📞", desc: "No dial tone, one-way audio, dropped calls." },
  { cat: "Intermittent", icon: "🔄", desc: "Service drops in and out — hardest to diagnose." },
  { cat: "Equipment", icon: "📦", desc: "ONT lights wrong, damaged device, needs replacement." },
];

const ticketSteps = [
  "Verify the customer's account and affected service in iVue.",
  "Perform basic troubleshooting (check ONT lights, reboot, speed test).",
  "Document every troubleshooting step and result.",
  "Open a new Trouble Ticket from the customer's account screen.",
  "Select the appropriate category and describe the symptom clearly.",
  "Attach any relevant notes: error codes, light status, speed test results.",
  "If a tech visit is needed, use Dispatch Integration to schedule.",
  "Inform the customer of the ticket number and expected timeline.",
];

export function Guide30() {
  return (
    <>
      <DarkBox title="iVUE — TROUBLE TICKETS">
        Trouble tickets in <Term>iVue</Term> track customer issues from initial report through
        resolution. A well-documented ticket speeds up diagnosis and reduces repeat calls.
      </DarkBox>

      <Card color="#C62828" title="Ticket Categories" subtitle="Classify the issue correctly">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ticketCategories.map((t, i) => (
            <div key={i} style={{ background: "#132D4A", borderRadius: 10, padding: 12, border: "1px solid #1A3A5C", display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#EF9A9A" }}>{t.cat}</div>
                <div style={{ fontSize: 12, color: "#B0BEC5", marginTop: 2 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#1565C0" title="Ticket Statuses" subtitle="Lifecycle of a trouble ticket">
        <CompareTable
          headers={["Status", "Meaning"]}
          rows={[
            ["Open", "Ticket created, awaiting assignment"],
            ["Assigned", "Assigned to a tech or support tier"],
            ["In Progress", "Actively being worked on"],
            ["Pending Customer", "Waiting on customer response or access"],
            ["Resolved", "Fix applied — awaiting confirmation"],
            ["Closed", "Issue confirmed resolved, ticket archived"],
          ]}
        />
      </Card>

      <Card color="#2E7D32" title="Creating an Effective Ticket" subtitle="Step-by-step process">
        <StepFlow steps={ticketSteps} />
        <SupportTip text="Document ALL troubleshooting steps taken before creating the ticket. This prevents the next agent or tech from repeating work you already did." />
      </Card>

      <Card color="#6A1B9A" title="Escalation" subtitle="When and how to escalate">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#ccc" }}>
          Escalate a ticket when: the issue persists after all Tier 1 steps, multiple customers at the
          same location are affected (possible network issue), or the problem requires NOC-level access.
          Use the <Term>Escalate</Term> button on the ticket and select the appropriate team (Tier 2,
          NOC, or Field Supervisor).
        </p>
      </Card>
    </>
  );
}
