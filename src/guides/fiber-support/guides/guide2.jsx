import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, NetworkDiagram, StepFlow } from './_helpers';

const splitRatios = [
  { ratio: "1:32", customers: 32, bw: "~78 Mbps per user (GPON)", use: "Most common in residential FTTH deployments" },
  { ratio: "1:64", customers: 64, bw: "~39 Mbps per user (GPON)", use: "Dense urban areas; higher subscriber count per port" },
  { ratio: "1:128", customers: 128, bw: "~19.5 Mbps per user (GPON)", use: "Rare; sometimes used with cascaded splitters" },
];

export function Guide2() {
  const [ratioIdx, setRatioIdx] = useState(null);

  return (
    <>
      <DarkBox title="PON ARCHITECTURE">
        <Term>PON</Term> stands for <Term>Passive Optical Network</Term>. "Passive" means there is no
        powered equipment between the central office and the customer premises — just glass and splitters.
        This dramatically reduces maintenance and operating costs.
      </DarkBox>

      <Card color="#1565C0" title="Core Components" subtitle="Three building blocks of PON">
        <NetworkDiagram
          title="PON Topology"
          nodes={[
            { id: "olt", icon: "🏢", label: "OLT", sub: "Central Office", detail: "Optical Line Terminal — the headend equipment at the provider's central office. Manages all downstream traffic, upstream scheduling, and ONT authentication." },
            { id: "feeder", icon: "🔵", label: "Feeder Fiber", sub: "Up to 20 km", detail: "Single fiber strand running from the OLT to the first splitter. Carries the aggregate traffic for all customers on this PON port." },
            { id: "splitter", icon: "🔀", label: "Splitter", sub: "Passive", detail: "Unpowered optical splitter divides the light signal. A 1:32 splitter takes one input and produces 32 identical output copies (with ~17 dB loss)." },
            { id: "drop", icon: "🔹", label: "Drop Fibers", sub: "Per customer", detail: "Individual fiber strands from the splitter to each customer premises. Typically 50–500 meters in residential areas." },
            { id: "ont", icon: "🏠", label: "ONT", sub: "Customer", detail: "Optical Network Terminal — the device at the customer's home. Converts optical signals to Ethernet, provides Wi-Fi, and sometimes voice (VoIP) ports." },
          ]}
          connections={["→", "→", "→", "→"]}
        />
        <NetTip text="One OLT port serves many customers through a single splitter. If the feeder fiber breaks, ALL customers on that splitter lose service." />
      </Card>

      <Card color="#00838F" title="Traffic Flow" subtitle="How data moves in PON">
        <div style={{ fontSize: 14, fontWeight: 700, color: "#0277BD", marginBottom: 6 }}>⬇ Downstream (OLT → ONTs)</div>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", marginBottom: 16 }}>
          The OLT <Term>broadcasts</Term> all downstream data to every ONT on the PON. Each frame is
          tagged with an identifier — ONTs only process packets addressed to them and discard the rest.
          This is similar to how a radio station broadcasts but each receiver tunes to its channel.
        </p>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#FFB74D", marginBottom: 6 }}>⬆ Upstream (ONTs → OLT)</div>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", marginBottom: 16 }}>
          Multiple ONTs share the same fiber back to the OLT, so they use <Term>TDMA</Term> (Time Division
          Multiple Access). The OLT assigns precise time slots to each ONT — each one transmits only during
          its window, preventing collisions.
        </p>
        <StepFlow color="#00838F" steps={[
          "OLT sends a bandwidth map (BWmap) to all ONTs every 125 µs frame.",
          "Each ONT reads its assigned time slot from the BWmap.",
          "ONT buffers upstream data and transmits only during its slot.",
          "OLT receives all upstream bursts sequentially — no collision.",
        ]} />
        <Warning text="If an ONT's laser is stuck 'on' (rogue ONT), it can jam the entire upstream for all customers on that PON port." />
      </Card>

      <Card color="#6A1B9A" title="Split Ratios" subtitle="How many customers share one port?">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {splitRatios.map((s, i) => (
            <div key={s.ratio} onClick={() => setRatioIdx(ratioIdx === i ? null : i)}
              style={{
                padding: "12px 16px", borderRadius: 10, cursor: "pointer",
                background: ratioIdx === i ? "#6A1B9A33" : "#D6EAF8",
                border: `1px solid ${ratioIdx === i ? "#CE93D8" : "#AED6F1"}`,
                transition: "all 0.2s",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>{s.ratio}</span>
                <span style={{ fontSize: 12, color: "#0277BD" }}>{s.customers} customers</span>
              </div>
              {ratioIdx === i && (
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: "#333" }}>
                  <div><strong style={{ color: "#CE93D8" }}>Bandwidth per user:</strong> {s.bw}</div>
                  <div><strong style={{ color: "#CE93D8" }}>Typical use:</strong> {s.use}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <Insight emoji="📐" text="Split ratio is a key factor when diagnosing slow speeds. A 1:64 split on a GPON port means each customer gets less bandwidth than a 1:32 split." />
      </Card>

      <Card color="#37474F" title="PON vs Active Ethernet" subtitle="Quick comparison">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, borderRadius: 10, overflow: "hidden", border: "1px solid #AED6F1" }}>
          {[
            ["PON (Passive)", "Active Ethernet"],
            ["Shared fiber via splitters", "Dedicated fiber per customer"],
            ["No powered field equipment", "Powered switches in field"],
            ["Lower OPEX", "Higher OPEX"],
            ["GPON: 2.5G/1.25G shared", "1G or 10G dedicated"],
            ["Most FTTH deployments", "Business / campus networks"],
          ].map((row, i) => row.map((cell, j) => (
            <div key={`${i}-${j}`} style={{
              padding: "8px 12px", fontSize: 12, lineHeight: 1.5,
              background: i === 0 ? (j === 0 ? "#1565C033" : "#00838F33") : "#D6EAF8",
              color: i === 0 ? (j === 0 ? "#64B5F6" : "#4DD0E1") : "#333",
              fontWeight: i === 0 ? 700 : 400,
            }}>{cell}</div>
          )))}
        </div>
      </Card>
    </>
  );
}
