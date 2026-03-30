import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, Warning } from './_helpers';

const components = [
  { name: "Splitter", icon: "🔀", color: "#1565C0",
    desc: "Passive optical device that divides one fiber into multiple paths. Ratios range from 1:2 up to 1:64. Most FTTH deployments use 1:32, meaning one OLT PON port serves up to 32 subscribers. No power required — purely passive." },
  { name: "ODB / FDH", icon: "📦", color: "#00838F",
    desc: "Optical Distribution Box (or Fiber Distribution Hub). Weatherproof enclosure where splitters reside. Mounted on poles, pedestals, or in basements. Technicians access these to connect or troubleshoot drop cables." },
  { name: "SC/APC Connector", icon: "🟢", color: "#2E7D32",
    desc: "Green connector with an 8-degree angled polish. The angle reduces back-reflection to below -65 dB, making it essential for PON networks. Standard for all outside plant and ONT connections." },
  { name: "SC/UPC Connector", icon: "🔵", color: "#1565C0",
    desc: "Blue connector with a flat (ultra-polished) endface. Back-reflection around -50 dB. Used in data center patch panels and some indoor equipment. Never mix APC and UPC — they will cause high loss." },
  { name: "Patch Panel", icon: "🗄️", color: "#4527A0",
    desc: "Fiber management panel in the Central Office. Organizes feeder fibers from the field and connects them to OLT ports via jumper cables. Proper labeling here saves hours of troubleshooting." },
  { name: "SFP / SFP+ Module", icon: "🔌", color: "#C62828",
    desc: "Small Form-factor Pluggable transceiver that slots into OLT line cards. Converts electrical signals to optical (and back). GPON SFPs use Class B+ or C+ optics. XGS-PON uses N1/N2 class SFP+." },
  { name: "OS2 Single-Mode Fiber", icon: "🧵", color: "#F57F17",
    desc: "Standard single-mode fiber (ITU-T G.652D) with 9/125 micron core. Supports distances up to 20 km on GPON. Bend-insensitive variants (G.657A2) are used for indoor drops where tight bends are unavoidable." },
];

export function Guide5() {
  const [selected, setSelected] = useState(0);
  const item = components[selected];

  return (
    <>
      <DarkBox title="OPTICAL COMPONENTS">
        Understanding the physical components in a fiber network helps you diagnose
        issues faster. Every element from the CO to the customer introduces potential
        points of failure — and potential points of resolution.
      </DarkBox>

      <Card color="#0D47A1" title="Component Reference" subtitle="Tap any component to learn more">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8, marginBottom: 16 }}>
          {components.map((c, i) => (
            <div key={c.name} onClick={() => setSelected(i)} style={{
              padding: "12px 10px", borderRadius: 10, cursor: "pointer", textAlign: "center",
              background: selected === i ? c.color + "33" : "#132D4A",
              border: `2px solid ${selected === i ? c.color : "#1A3A5C"}`,
              transition: "all 0.2s",
            }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{c.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: selected === i ? c.color : "#B0BEC5" }}>{c.name}</div>
            </div>
          ))}
        </div>
        <div style={{
          padding: 16, borderRadius: 12, background: "#0D1F33",
          border: `2px solid ${item.color}`, transition: "all 0.3s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 28 }}>{item.icon}</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.name}</span>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: "#B0BEC5" }}>{item.desc}</div>
        </div>
      </Card>

      <Card color="#2E7D32" title="Connector Rule" subtitle="Never mix types">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>🟢</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#4CAF50" }}>SC/APC</div>
            <div style={{ fontSize: 11, color: "#B0BEC5" }}>Angled 8°</div>
          </div>
          <div style={{ fontSize: 32, color: "#EF5350", alignSelf: "center" }}>≠</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>🔵</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#42A5F5" }}>SC/UPC</div>
            <div style={{ fontSize: 11, color: "#B0BEC5" }}>Flat polish</div>
          </div>
        </div>
        <Warning text="Mating an APC connector to a UPC port (or vice versa) damages both ferrules and causes 10+ dB of loss. Always match green-to-green and blue-to-blue." />
      </Card>

      <NetTip text="When dispatching a tech to an ODB, always confirm the splitter port assignment in the provisioning system first. Plugging into the wrong port is one of the most common field errors." />
    </>
  );
}
