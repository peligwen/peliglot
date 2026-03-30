import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, SupportTip, Term, CompareTable } from './_helpers';

const supportTasks = [
  { task: "User Management", desc: "Add, modify, or deactivate user accounts in the Momentum portal. Each user has an extension, DID, and feature profile.", icon: "👤" },
  { task: "Call Flow Changes", desc: "Modify auto-attendant menus, hunt group sequences, and time-of-day routing rules through the admin portal.", icon: "🔀" },
  { task: "Voicemail Resets", desc: "Reset user voicemail PINs and greetings. Users can also self-manage via the Momentum web portal or mobile app.", icon: "📬" },
  { task: "SIP Trunk Config", desc: "For SIP trunking customers, verify trunk registration status, channel counts, and failover settings.", icon: "🔧" },
];

export function Guide25() {
  return (
    <>
      <DarkBox title="MOMENTUM TELECOM — UCAAS PROVIDER">
        <Term>Momentum Telecom</Term> is a Unified Communications as a Service (UCaaS) provider
        offering hosted PBX, SIP trunking, and collaboration tools. It is typically used for
        <Term> business customers</Term> who need multi-line phone systems with advanced features.
      </DarkBox>

      <Card color="#1565C0" title="When to Use Each Platform" subtitle="Metaswitch vs Alianza vs Momentum">
        <CompareTable
          headers={["Aspect", "Metaswitch", "Alianza", "Momentum"]}
          rows={[
            ["Scope", "Single-line voice", "Single/multi-line voice", "Full UCaaS / PBX"],
            ["Customer Type", "Residential", "Residential & small biz", "Business"],
            ["Management Tool", "MetaView", "Alianza Portal", "Momentum Portal"],
            ["Features", "Basic calling features", "Calling + auto-attendant", "PBX, trunking, collab"],
            ["Infrastructure", "On-premise switch", "Cloud-hosted", "Cloud-hosted"],
            ["Billing", "In-house via iVue", "In-house via iVue", "Momentum direct or resale"],
          ]}
          colors={["#1565C0", "#0277BD", "#6A1B9A"]}
        />
        <NetTip text="The customer's service order in iVue will indicate which voice platform to use. Never assume — always check the order." />
      </Card>

      <Card color="#00838F" title="Hosted PBX & SIP Trunking" subtitle="Core Momentum services">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333" }}>
          <Term>Hosted PBX</Term> provides a full business phone system in the cloud — extensions,
          auto-attendant, ring groups, conferencing, and voicemail — without on-site PBX hardware.
          <Term> SIP Trunking</Term> connects a customer's existing on-premise PBX to the network
          via SIP, replacing traditional PRI or analog trunk lines.
        </p>
        <SupportTip text="For hosted PBX issues, you can make most changes in the Momentum portal. For SIP trunking, trunk-level issues may require Momentum engineering support." />
      </Card>

      <Card color="#6A1B9A" title="Common Support Tasks" subtitle="What agents do in the Momentum portal">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {supportTasks.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 12, background: "#fff", borderRadius: 10, padding: 14, border: "1px solid #AED6F1", alignItems: "flex-start" }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{t.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#CE93D8", marginBottom: 4 }}>{t.task}</div>
                <div style={{ fontSize: 12, lineHeight: 1.6, color: "#333" }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
