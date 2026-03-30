import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, SupportTip, Term, NetworkDiagram, CompareTable } from './_helpers';

const flowNodes = [
  { id: "customer", icon: "👤", label: "Customer", sub: "Places order", detail: "Customer requests new service, upgrade, or change via phone or portal." },
  { id: "ivue", icon: "💼", label: "iVue (BSS)", sub: "Billing & orders", detail: "BSS platform processes the order, billing, and account management." },
  { id: "engine", icon: "⚙️", label: "Provisioning", sub: "Config engine", detail: "Translates business order into network configuration commands." },
  { id: "oss", icon: "🌐", label: "AMS / SMx (OSS)", sub: "Network mgmt", detail: "OSS platforms push configuration to OLTs and ONTs on the fiber network." },
  { id: "network", icon: "📡", label: "Network", sub: "OLT → ONT", detail: "Physical fiber network delivers service to the customer's premises." },
];

const flowConnections = [
  "customer → ivue",
  "ivue → engine",
  "engine → oss",
  "oss → network",
];

export function Guide33() {
  return (
    <>
      <DarkBox title="OSS / BSS CONCEPTS">
        Understanding the difference between <Term>OSS</Term> and <Term>BSS</Term> is key to
        effective troubleshooting. These two system families work together to deliver and manage
        every customer's service.
      </DarkBox>

      <Card color="#1565C0" title="BSS — Business Support Systems" subtitle="Customer-facing systems">
        <CompareTable
          headers={["System", "Role"]}
          rows={[
            ["iVue", "Billing, customer accounts, service orders"],
            ["CRM", "Customer relationship management, interaction history"],
            ["Customer Portal", "Self-service account access for subscribers"],
          ]}
        />
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", marginTop: 10 }}>
          BSS systems handle everything the <em>business</em> sees: who the customer is, what they
          ordered, and what they owe. <Term>iVue</Term> is the primary BSS tool for support agents.
        </p>
      </Card>

      <Card color="#2E7D32" title="OSS — Operations Support Systems" subtitle="Network-facing systems">
        <CompareTable
          headers={["System", "Role"]}
          rows={[
            ["Nokia AMS", "Manages Nokia OLTs and ONTs — config, alarms, firmware"],
            ["Calix SMx", "Manages Calix OLTs and ONTs — provisioning, monitoring"],
            ["Calix Cloud", "Cloud analytics, subscriber insights, remote diagnostics"],
          ]}
        />
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", marginTop: 10 }}>
          OSS systems manage the <em>network</em> itself: equipment configuration, alarms,
          performance data, and firmware. These are the tools that make the fiber network work.
        </p>
      </Card>

      <Card color="#6A1B9A" title="How BSS & OSS Connect" subtitle="End-to-end data flow">
        <NetworkDiagram nodes={flowNodes} connections={flowConnections} title="Order-to-Activation Flow" />
        <NetTip text="When troubleshooting, determine whether the problem is on the BSS side (account/order issue) or OSS side (network/config issue). This tells you which system to investigate." />
      </Card>

      <Card color="#00838F" title="Inventory Management" subtitle="Tracking fiber, equipment, and ports">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333" }}>
          Inventory spans both OSS and BSS. <Term>iVue</Term> tracks equipment assignments to customer
          accounts. <Term>AMS/SMx</Term> tracks what is actually configured on the network. Mismatches
          between these two are a common source of provisioning issues.
        </p>
        <SupportTip text="Understanding the full OSS/BSS picture helps you pinpoint issues faster. A 'no service' problem could be a billing hold (BSS), a missing config (OSS), or a physical issue (network)." />
      </Card>
    </>
  );
}
