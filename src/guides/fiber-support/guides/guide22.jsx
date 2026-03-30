import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, SupportTip, Term, NetworkDiagram } from './_helpers';

const nodes = [
  { id: "phone", icon: "📞", label: "Phone", sub: "Analog", detail: "Standard analog phone connected to the ONT's FXS port via RJ-11 cable." },
  { id: "ont", icon: "📦", label: "ONT FXS", sub: "RJ-11 Port", detail: "The ONT converts fiber to copper. The FXS (Foreign Exchange Subscriber) port provides analog phone service." },
  { id: "vlan", icon: "🔀", label: "Voice VLAN", sub: "Tagged Traffic", detail: "Voice traffic is carried on a dedicated VLAN, separate from data and video, ensuring QoS priority." },
  { id: "meta", icon: "🖥️", label: "Metaswitch", sub: "Call Control", detail: "SIP-based softswitch that handles call routing, features, and connections to the PSTN or other VoIP carriers." },
  { id: "pstn", icon: "🌐", label: "PSTN / Carriers", sub: "External", detail: "The traditional Public Switched Telephone Network and interconnected VoIP carriers for completing calls." },
];

const connections = ["→", "→", "SIP →", "→"];

export function Guide22() {
  return (
    <>
      <DarkBox title="METASWITCH — VOICE PLATFORM OVERVIEW">
        <Term>Metaswitch</Term> is a SIP-based softswitch (now part of Microsoft) that replaces
        the traditional <Term>Class 5 switch</Term> for delivering phone service over fiber networks.
        It handles call routing, subscriber features, and PSTN interconnection for FTTH deployments.
      </DarkBox>

      <Card color="#1565C0" title="What Metaswitch Does" subtitle="Core role in FTTH voice">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#ccc" }}>
          In a fiber-to-the-home network, Metaswitch acts as the central voice platform. When a
          subscriber picks up their phone, the analog signal travels from the handset through the
          ONT's <Term>FXS port</Term>, gets converted to <Term>SIP</Term> (Session Initiation Protocol),
          and is routed through a dedicated voice VLAN to the Metaswitch for call processing.
        </p>
        <NetTip text="Metaswitch uses SIP for signaling and RTP for media (actual audio). These are two separate streams." />
      </Card>

      <Card color="#00838F" title="Call Flow Topology" subtitle="End-to-end voice path">
        <NetworkDiagram nodes={nodes} connections={connections} title="Voice Call Path" />
        <SupportTip text="When troubleshooting, trace the path left to right. Most issues occur at the ONT FXS port or the Voice VLAN layer." />
      </Card>

      <Card color="#6A1B9A" title="Key Features" subtitle="What Metaswitch provides">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
          {[
            { icon: "📲", name: "Call Routing", desc: "Routes calls to PSTN or VoIP endpoints" },
            { icon: "📬", name: "Voicemail", desc: "Integrated voicemail with greeting management" },
            { icon: "⏳", name: "Call Waiting", desc: "Alerts subscriber to incoming calls" },
            { icon: "🆔", name: "Caller ID", desc: "CNAM delivery and blocking options" },
            { icon: "👥", name: "3-Way Calling", desc: "Conference bridge for three parties" },
            { icon: "↪️", name: "Call Forwarding", desc: "Forward to any number on busy/no-answer" },
          ].map((f, i) => (
            <div key={i} style={{ background: "#132D4A", borderRadius: 10, padding: 12, border: "1px solid #1A3A5C" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#E0F7FA" }}>{f.name}</div>
              <div style={{ fontSize: 11, color: "#4A7A9B", marginTop: 4 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#2E7D32" title="SIP-Based Call Control" subtitle="How calls are established">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#ccc" }}>
          Metaswitch uses the <Term>SIP protocol</Term> for call setup, modification, and teardown.
          When a subscriber dials a number, the ONT sends a SIP INVITE to Metaswitch, which
          authenticates the subscriber, applies dial plan rules, and routes the call to the destination
          — whether that is another subscriber on the same switch, a different carrier, or the PSTN.
        </p>
        <NetTip text="SIP signaling typically uses port 5060 (UDP/TCP) or 5061 (TLS). RTP media ports are dynamically assigned." />
      </Card>
    </>
  );
}
