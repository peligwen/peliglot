import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { SupportTip, NetworkDiagram } from './_helpers';

const systems = [
  { id: "ivue", icon: "💼", label: "iVue (BSS)", sub: "Central hub", detail: "Billing, accounts, orders, equipment inventory. Starting point for most support tasks." },
  { id: "ams", icon: "🔧", label: "Nokia AMS", sub: "Nokia OSS", detail: "Manages Nokia OLTs and ONTs. Config provisioning, alarms, firmware updates." },
  { id: "smx", icon: "🔩", label: "Calix SMx", sub: "Calix OSS", detail: "Manages Calix OLTs and ONTs. Service profiles, ONT provisioning, monitoring." },
  { id: "cloud", icon: "☁️", label: "Calix Cloud", sub: "Analytics", detail: "Subscriber insights, remote diagnostics, usage analytics, GigaSpire management." },
  { id: "meta", icon: "📞", label: "Metaswitch", sub: "Voice (legacy)", detail: "Softswitch for voice services. Subscriber line config, features, SIP registration." },
  { id: "alianza", icon: "🗣️", label: "Alianza", sub: "Voice (cloud)", detail: "Cloud-based voice platform. Modern replacement for Metaswitch on newer installs." },
  { id: "cms", icon: "🗄️", label: "CMS", sub: "Legacy mgmt", detail: "Legacy config and reporting. Advanced settings, batch operations, audit history." },
  { id: "citrix", icon: "🖥️", label: "Citrix", sub: "Access layer", detail: "VDI platform — the gateway through which agents access all other support tools." },
];

const connections = [
  "ivue → ams", "ivue → smx", "ivue → meta", "ivue → alianza",
  "ams → smx", "smx → cloud",
  "citrix → ivue", "citrix → cms", "citrix → ams", "citrix → smx",
];

const scenarios = [
  { name: "New Install", flow: "iVue (create order) → AMS or SMx (provision ONT) → Metaswitch/Alianza (if voice)" },
  { name: "Trouble Ticket", flow: "iVue (create ticket) → AMS or SMx (check alarms) → Calix Cloud (diagnostics)" },
  { name: "Speed Change", flow: "iVue (modify order) → AMS or SMx (update service profile on OLT/ONT)" },
  { name: "Voice Issue", flow: "iVue (check account) → Metaswitch/Alianza (check line registration & features)" },
];

export function Guide35() {
  const [selected, setSelected] = useState(null);
  const sel = systems.find(s => s.id === selected);

  return (
    <>
      <DarkBox title="SYSTEM INTEGRATION MAP">
        This is your visual reference for how all support systems connect. Click any system node below
        to see what it does and what it connects to.
      </DarkBox>

      <Card color="#1565C0" title="Full Ecosystem" subtitle="Click a node to learn more">
        <NetworkDiagram nodes={systems} connections={connections} title="Support Systems Overview" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8, marginTop: 14 }}>
          {systems.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)} style={{
              background: selected === s.id ? "#1A3A5C" : "#132D4A", border: selected === s.id ? "2px solid #4FC3F7" : "1px solid #1A3A5C",
              borderRadius: 10, padding: 10, cursor: "pointer", textAlign: "center",
            }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#4FC3F7", marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: "#8BACC8" }}>{s.sub}</div>
            </button>
          ))}
        </div>
        {sel && (
          <div style={{ background: "#1A3A5C", borderRadius: 10, padding: 14, marginTop: 12, border: "1px solid #4FC3F7" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4FC3F7", marginBottom: 6 }}>{sel.icon} {sel.label}</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: "#ccc" }}>{sel.detail}</div>
          </div>
        )}
      </Card>

      <Card color="#2E7D32" title="Common Scenarios" subtitle="Which systems are involved in each workflow">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {scenarios.map((s, i) => (
            <div key={i} style={{ background: "#132D4A", borderRadius: 10, padding: 12, border: "1px solid #1A3A5C" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#81C784" }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "#B0BEC5", marginTop: 4 }}>{s.flow}</div>
            </div>
          ))}
        </div>
        <SupportTip text="Bookmark this guide — it's a great reference for understanding which system to check for any given issue. When in doubt, start with iVue and follow the data flow." />
      </Card>
    </>
  );
}
