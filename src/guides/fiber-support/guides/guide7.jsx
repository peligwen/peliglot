import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, NetworkDiagram, StepFlow } from './_helpers';

const vlanTable = [
  { service: "Internet", vlan: "100", port: "GE1", color: "#1565C0", icon: "🌐" },
  { service: "VoIP", vlan: "200", port: "FXS1 / FXS2", color: "#2E7D32", icon: "📞" },
  { service: "IPTV", vlan: "300", port: "GE2", color: "#6A1B9A", icon: "📺" },
  { service: "Management", vlan: "10", port: "N/A (internal)", color: "#C62828", icon: "🔧" },
];

export function Guide7() {
  return (
    <>
      <DarkBox title="VLANs & SERVICE BASICS">
        Fiber networks carry multiple services — internet, voice, and video — over a
        single strand of glass. VLANs keep these services logically separated so they
        do not interfere with each other.
      </DarkBox>

      <Card color="#1565C0" title="What is a VLAN?" subtitle="Virtual LAN — logical separation">
        <div style={{ fontSize: 13, lineHeight: 1.7, color: "#B0BEC5", marginBottom: 14 }}>
          A <Term>VLAN</Term> (Virtual LAN) creates isolated broadcast domains on shared physical
          infrastructure. Using <Term>802.1Q tagging</Term>, a VLAN ID (1-4094) is inserted into
          each Ethernet frame so switches and routers know which logical network the traffic belongs to.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
          {vlanTable.map(v => (
            <div key={v.service} style={{
              padding: 14, borderRadius: 10, background: "#0D1F33",
              border: `2px solid ${v.color}`, textAlign: "center",
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{v.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: v.color }}>{v.service}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#E0F7FA", margin: "4px 0" }}>VLAN {v.vlan}</div>
              <div style={{ fontSize: 11, color: "#8BACC8" }}>ONT Port: {v.port}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#00838F" title="Service Flow" subtitle="From customer to core">
        <NetworkDiagram
          title="End-to-end VLAN path"
          nodes={[
            { id: "device", icon: "💻", label: "Customer", sub: "PC / Phone / STB",
              detail: "Customer device connects to a specific ONT port. It sends untagged traffic — the ONT adds the VLAN tag." },
            { id: "ont", icon: "📡", label: "ONT Port", sub: "GE1 / FXS1",
              detail: "Bridge port config maps each physical port to a VLAN. GE1 might map to VLAN 100 (Internet), FXS1 to VLAN 200 (Voice)." },
            { id: "vlan", icon: "🏷️", label: "VLAN Tag", sub: "802.1Q",
              detail: "The 4-byte 802.1Q tag is inserted into the Ethernet frame. It contains the VLAN ID and priority bits for QoS." },
            { id: "pon", icon: "🔀", label: "PON", sub: "GEM Ports",
              detail: "On the PON, VLANs are mapped to GEM ports inside T-CONTs. Each GEM port carries one service type with its own bandwidth allocation." },
            { id: "olt", icon: "🏢", label: "OLT", sub: "Uplink",
              detail: "The OLT terminates PON traffic, strips GEM encapsulation, and forwards tagged Ethernet frames to the aggregation/core network." },
            { id: "core", icon: "🌐", label: "Core", sub: "BNG / Switch",
              detail: "Core routers use VLAN tags to route traffic: Internet VLANs to the BNG, Voice VLANs to the softswitch, IPTV to the video headend." },
          ]}
          connections={["→", "→", "→", "→", "→"]}
        />
      </Card>

      <Card color="#6A1B9A" title="QoS — Quality of Service" subtitle="Why voice gets priority">
        <div style={{ fontSize: 13, lineHeight: 1.7, color: "#B0BEC5", marginBottom: 14 }}>
          Not all traffic is equal. <Term>QoS</Term> uses priority queuing to ensure
          latency-sensitive services (voice, video) are processed before bulk data (downloads, browsing).
        </div>
        <StepFlow color="#6A1B9A" steps={[
          "Voice (VLAN 200) — highest priority, low latency required (<150ms one-way)",
          "IPTV (VLAN 300) — high priority, needs consistent bandwidth for no buffering",
          "Internet (VLAN 100) — best-effort, uses remaining bandwidth",
          "Management (VLAN 10) — low volume but high priority for device reachability",
        ]} />
        <Insight emoji="📞" text="If a customer reports choppy voice but internet works fine, check QoS config on the ONT. A missing or incorrect VLAN-to-priority mapping is often the cause." />
      </Card>

      <Card color="#E65100" title="MSAP — The Glue" subtitle="Multi-Service Access Platform mapping">
        <div style={{ fontSize: 13, lineHeight: 1.7, color: "#B0BEC5", marginBottom: 12 }}>
          The <Term>MSAP</Term> ties everything together. It is the provisioning construct that maps
          a customer service profile (VLANs, bandwidth, QoS) through the PON path from
          the ONT all the way to the core network. When you provision a new customer, the MSAP
          defines which VLANs are active, which ONT ports carry which services, and what
          bandwidth limits apply.
        </div>
        <Warning text="A misconfigured MSAP is one of the top causes of 'no service' after provisioning. Always verify the MSAP matches the customer's service plan — wrong VLAN or missing bridge port mapping means no connectivity for that service." />
      </Card>

      <NetTip text="When troubleshooting, check services one VLAN at a time. If Internet works but Voice does not, the issue is likely in the Voice VLAN (200) path — check the bridge port, GEM port, and MSAP for that specific service." />
    </>
  );
}
