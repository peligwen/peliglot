import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, StepFlow, CompareTable } from './_helpers';

const provStates = [
  { state: "Planned", color: "#9E9E9E", desc: "ONT serial entered in AMS but not yet seen on PON" },
  { state: "Discovered", color: "#FF9800", desc: "OLT detects ONT on fiber but no profile assigned" },
  { state: "Provisioned", color: "#1565C0", desc: "Profile and MSAP assigned, awaiting ONT activation" },
  { state: "Active", color: "#2E7D32", desc: "ONT online, services operational, passing traffic" },
];

const provSteps = [
  "Install ONT at customer premises and connect fiber",
  "ONT powers on and sends serial number upstream to OLT",
  "OLT discovers ONT and reports it in AMS as 'Discovered'",
  "Technician or auto-provisioning assigns SLID and service profile",
  "MSAP configuration applied — VLANs, GEM ports, QoS profiles",
  "ONT transitions to 'Active' state and services come online",
  "Verify optical levels and run service connectivity tests",
];

const commonIssues = [
  ["ONT not discovered", "Check fiber continuity, clean connectors, verify correct PON port", "🔴"],
  ["Serial number mismatch", "Re-enter correct SN from ONT label — watch for O vs 0 confusion", "🔢"],
  ["SLID mismatch", "Verify SLID in AMS matches what was programmed into the ONT", "🆔"],
  ["Wrong profile applied", "Check service tier matches customer order — reapply correct profile", "📋"],
  ["Stuck in Planned state", "ONT never reached OLT — physical layer issue or wrong PON port", "⏳"],
];

export function Guide15() {
  const [activeState, setActiveState] = useState(null);

  return (
    <>
      <DarkBox title="ONT PROVISIONING">
        Provisioning is the process of registering an <Term>ONT</Term> on the network and
        assigning it the correct service configuration. This links a physical device to a
        customer account through the <Term>SLID</Term> and service profiles.
      </DarkBox>

      <Card color="#1565C0" title="Provisioning Methods" subtitle="Serial number vs SLID-based">
        <CompareTable
          headers={["Aspect", "Serial Number-Based", "SLID-Based"]}
          rows={[
            ["Identifier", "ONT hardware serial number", "Subscriber Line ID (configurable)"],
            ["Flexibility", "Tied to specific ONT hardware", "Can be transferred to replacement ONT"],
            ["Use case", "New installs, specific ONT tracking", "Easy ONT swaps without reprovisioning"],
            ["Auto-provision", "Supported with pre-registration", "Supported — preferred for automation"],
          ]}
        />
        <Insight emoji="🔄" text="SLID-based provisioning simplifies ONT replacements — the new ONT inherits the customer's config automatically when the same SLID is programmed." />
      </Card>

      <Card color="#6A1B9A" title="Provisioning States" subtitle="Tap to see details">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {provStates.map((s, i) => (
            <button key={i} onClick={() => setActiveState(i === activeState ? null : i)}
              style={{ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
                background: i === activeState ? s.color : "#F0F0F0", color: i === activeState ? "#fff" : s.color }}>
              {s.state}
            </button>
          ))}
        </div>
        {activeState !== null && (
          <div style={{ padding: 12, background: "#F5F5F5", borderRadius: 10, fontSize: 14 }}>
            {provStates[activeState].desc}
          </div>
        )}
      </Card>

      <Card color="#2E7D32" title="End-to-End Provisioning" subtitle="Full workflow from install to active">
        <StepFlow steps={provSteps} />
        <NetTip text="Always verify optical power levels (Rx between -8 and -28 dBm) during provisioning — weak signal causes intermittent service issues later." />
      </Card>

      <Card color="#C62828" title="Common Provisioning Issues" subtitle="What to check when things go wrong">
        {commonIssues.map(([issue, fix, icon], i) => (
          <div key={i} style={{ padding: 12, marginBottom: 8, background: i % 2 === 0 ? "#FFF3F0" : "#F5F5F5",
            borderRadius: 10, borderLeft: "4px solid #C62828" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{icon} {issue}</div>
            <div style={{ fontSize: 13, color: "#555" }}>{fix}</div>
          </div>
        ))}
        <Warning text="If an ONT is stuck in 'Discovered' for more than 10 minutes after profile assignment, check for firmware compatibility issues between the ONT model and ISAM software version." />
      </Card>
    </>
  );
}
