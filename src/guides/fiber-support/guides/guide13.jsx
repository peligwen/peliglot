import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Term, NetworkDiagram } from './_helpers';

const msapNodes = [
  { id: 1, icon: "🖥️", label: "Customer Port", sub: "UNI", detail: "Ethernet/POTS on ONT" },
  { id: 2, icon: "🔗", label: "Bridge Port", sub: "Per-service", detail: "Maps port to VLAN" },
  { id: 3, icon: "🏷️", label: "VLAN", sub: "C-VLAN/S-VLAN", detail: "Service isolation" },
  { id: 4, icon: "💎", label: "GEM Port", sub: "GPON encap", detail: "Carries VLAN on PON" },
  { id: 5, icon: "📦", label: "T-CONT", sub: "Bandwidth alloc", detail: "Upstream scheduling" },
  { id: 6, icon: "🔴", label: "PON Port", sub: "OLT uplink", detail: "Physical fiber" },
];

const msapConnections = ["1→2", "2→3", "3→4", "4→5", "5→6"];

const serviceTypes = [
  { name: "Internet (HSI)", vlan: "Dedicated data VLAN", qos: "Best-effort / assured", icon: "🌐" },
  { name: "Voice (VoIP)", vlan: "Voice VLAN (high priority)", qos: "Expedited forwarding", icon: "📞" },
  { name: "Video (IPTV)", vlan: "Multicast VLAN", qos: "Assured forwarding", icon: "📺" },
  { name: "Management", vlan: "OAM VLAN", qos: "Network control", icon: "⚙️" },
];

export function Guide13() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      <DarkBox title="MSAP — MULTI-SERVICE ACCESS PLATFORM">
        The <Term>MSAP</Term> is the logical service model in Nokia ISAM that acts as the "glue"
        between customer services and the PON infrastructure. Every service a customer receives —
        Internet, voice, video — is defined and controlled through MSAP configuration.
      </DarkBox>

      <Card color="#1565C0" title="MSAP Logical Model" subtitle="How services map through the system">
        <NetworkDiagram nodes={msapNodes} connections={msapConnections} title="MSAP Service Path" />
        <NetTip text="Each service (Internet, Voice, Video) follows this same path but with its own dedicated VLAN, GEM port, and QoS treatment." />
      </Card>

      <Card color="#6A1B9A" title="Service Types" subtitle="Each service gets isolated treatment">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {serviceTypes.map((s, i) => (
            <div key={i} onClick={() => setSelectedService(i === selectedService ? null : i)}
              style={{ padding: 14, borderRadius: 10, cursor: "pointer", background: i === selectedService ? "#EDE7F6" : "#F5F5F5",
                border: i === selectedService ? "2px solid #6A1B9A" : "2px solid transparent", transition: "all 0.2s" }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              {i === selectedService && (
                <div style={{ marginTop: 8, fontSize: 13, color: "#444" }}>
                  <div><strong>VLAN:</strong> {s.vlan}</div>
                  <div><strong>QoS:</strong> {s.qos}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card color="#2E7D32" title="Why MSAPs Matter for Support" subtitle="Troubleshooting context">
        <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0 }}>
          When a customer reports a service-specific issue — for example, Internet works but VoIP
          drops — the MSAP model tells you exactly where to look. Each service has its own
          <Term>bridge port</Term>, <Term>VLAN</Term>, and <Term>GEM port</Term>. A problem in one
          service path does not necessarily affect the others.
        </p>
        <Insight emoji="🔍" text="If only one service is down, check that service's specific VLAN and GEM port mapping in the MSAP — don't assume the entire ONT is faulty." />
      </Card>
    </>
  );
}
