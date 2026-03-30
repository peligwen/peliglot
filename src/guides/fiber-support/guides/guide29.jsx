import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Warning, SupportTip, Term, StepFlow, CompareTable } from './_helpers';

const orderTypes = [
  { type: "New Install", desc: "Fresh service activation at a new location with ONT deployment." },
  { type: "Upgrade", desc: "Speed tier or package increase on an existing service." },
  { type: "Downgrade", desc: "Speed tier or package reduction — takes effect next billing cycle." },
  { type: "Disconnect", desc: "Full service removal. Equipment may need to be recovered." },
  { type: "Transfer", desc: "Move service from one address to another under the same account." },
];

const orderSteps = [
  "Open the customer account in iVue and click New Order.",
  "Select the order type (Install, Upgrade, Downgrade, etc.).",
  "Choose the service address and select the desired service profile.",
  "Assign equipment — select the ONT serial number from inventory.",
  "Review the order summary and submit. Status changes to Pending.",
  "When the tech completes installation, mark the order Complete in iVue.",
  "Completion triggers provisioning: iVue sends the config to AMS or SMx automatically.",
];

export function Guide29() {
  return (
    <>
      <DarkBox title="iVUE — ORDERS & PROVISIONING">
        Service orders in <Term>iVue</Term> drive the entire provisioning workflow. When an order is
        completed, iVue automatically triggers network configuration on <Term>Nokia AMS</Term> or{" "}
        <Term>Calix SMx</Term> to activate the customer's service.
      </DarkBox>

      <Card color="#D84315" title="Order Types" subtitle="Different service changes you can initiate">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {orderTypes.map((o, i) => (
            <div key={i} style={{ background: "#132D4A", borderRadius: 10, padding: 12, border: "1px solid #1A3A5C" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#FF8A65" }}>{o.type}</div>
              <div style={{ fontSize: 12, color: "#B0BEC5", marginTop: 4 }}>{o.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#1565C0" title="Order Lifecycle" subtitle="From creation to network activation">
        <CompareTable
          headers={["Status", "Meaning"]}
          rows={[
            ["New", "Order created but not yet scheduled or assigned"],
            ["Pending", "Submitted and awaiting technician or scheduling"],
            ["In Progress", "Technician is on-site or work has begun"],
            ["Complete", "Work done — triggers automatic provisioning to the network"],
          ]}
        />
      </Card>

      <Card color="#2E7D32" title="Creating & Completing an Order" subtitle="End-to-end workflow">
        <StepFlow steps={orderSteps} />
        <Warning text="An incomplete order blocks subsequent changes on the same service. If a prior order is stuck in Pending or In Progress, it must be resolved before a new order can be submitted." />
      </Card>

      <Card color="#6A1B9A" title="Common Order Issues" subtitle="What can go wrong">
        <CompareTable
          headers={["Issue", "Cause", "Fix"]}
          rows={[
            ["Stuck order", "Tech never marked complete", "Verify with tech, then manually complete or cancel"],
            ["Provisioning failure", "API call to AMS/SMx failed", "Check logs, re-push config, or escalate to NOC"],
            ["Mismatched equipment", "Wrong ONT serial on order", "Correct the serial in iVue and re-provision"],
          ]}
        />
        <SupportTip text="Always verify the ONT serial on the order matches what the tech actually installed. Mismatches are the #1 cause of provisioning failures." />
      </Card>
    </>
  );
}
