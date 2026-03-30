import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, StepFlow, CompareTable } from './_helpers';

const serviceProfiles = {
  headers: ["Service", "VLAN Range", "QoS Class", "Priority", "Typical BW"],
  rows: [
    ["Internet (HSI)", "100–199", "BE / AF", "0–2", "25–1000 Mbps"],
    ["Voice (VoIP)", "200–299", "EF", "5–6", "256 Kbps per line"],
    ["Video (IPTV)", "300–399", "AF3", "4", "15–25 Mbps"],
    ["Management", "400–499", "CS6", "7", "1 Mbps"],
  ],
};

const playConfigs = [
  { name: "Single-play", services: ["Internet"], icon: "🌐", desc: "One bridge port, one VLAN, one GEM" },
  { name: "Double-play", services: ["Internet", "Voice"], icon: "📞", desc: "Two bridge ports, two VLANs, two GEMs" },
  { name: "Triple-play", services: ["Internet", "Voice", "Video"], icon: "📺", desc: "Three+ bridge ports with full QoS separation" },
];

const amsCheckSteps = [
  "Open AMS and navigate to the ONT in the equipment tree",
  "Select the ONT → MSAP tab to view active service associations",
  "Verify each bridge port has the correct VLAN assignment",
  "Check QoS profile matches the customer's subscribed speed tier",
  "Confirm upstream and downstream bandwidth profiles are correct",
  "Review GEM port mappings for each active service",
];

export function Guide14() {
  const [activeCfg, setActiveCfg] = useState(0);

  return (
    <>
      <DarkBox title="MSAP OPERATIONS">
        Understanding how <Term>MSAP</Term> parameters are configured and checked is essential
        for verifying customer services, processing speed upgrades, and troubleshooting
        service-specific problems in Nokia ISAM.
      </DarkBox>

      <Card color="#E65100" title="VLAN Mapping" subtitle="Customer VLAN to service VLAN translation">
        <p style={{ fontSize: 15, lineHeight: 1.6, margin: "0 0 12px" }}>
          The MSAP translates the customer-side <Term>C-VLAN</Term> (or untagged traffic) to the
          network-side <Term>S-VLAN</Term>. This ensures service isolation across the aggregation
          network. Each service type uses a dedicated VLAN range.
        </p>
        <CompareTable headers={serviceProfiles.headers} rows={serviceProfiles.rows} />
      </Card>

      <Card color="#1565C0" title="Service Configurations" subtitle="Single, double, and triple-play">
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          {playConfigs.map((c, i) => (
            <button key={i} onClick={() => setActiveCfg(i)}
              style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
                background: i === activeCfg ? "#1565C0" : "#E3F2FD", color: i === activeCfg ? "#fff" : "#1565C0" }}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>
        <div style={{ padding: 14, background: "#F5F5F5", borderRadius: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{playConfigs[activeCfg].name}</div>
          <div style={{ fontSize: 14, color: "#555", marginBottom: 8 }}>Services: {playConfigs[activeCfg].services.join(", ")}</div>
          <div style={{ fontSize: 14 }}>{playConfigs[activeCfg].desc}</div>
        </div>
      </Card>

      <Card color="#2E7D32" title="MSAP Check in AMS" subtitle="Step-by-step verification">
        <StepFlow steps={amsCheckSteps} />
        <NetTip text="Always compare the MSAP configuration against the customer's subscribed service tier before escalating an issue." />
      </Card>

      <Card color="#C62828" title="Modifying MSAP Parameters" subtitle="Speed upgrades and service additions">
        <p style={{ fontSize: 15, lineHeight: 1.6, margin: "0 0 12px" }}>
          MSAP changes are needed for speed upgrades (modifying bandwidth profiles), adding services
          (creating new bridge ports and VLAN mappings), or correcting misconfigured QoS.
        </p>
        <Warning text="Never modify MSAP parameters without proper authorization and a valid change ticket. Incorrect changes can disrupt all services on the ONT." />
        <Insight emoji="📋" text="For speed upgrades, only the bandwidth profile needs to change — the VLAN and GEM port mappings typically remain the same." />
      </Card>
    </>
  );
}
