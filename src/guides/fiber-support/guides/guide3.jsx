import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, NetworkDiagram, StepFlow } from './_helpers';

const compRows = [
  { label: "Standard", gpon: "ITU-T G.984", xgs: "ITU-T G.9807.1" },
  { label: "Downstream", gpon: "2.488 Gbps", xgs: "9.953 Gbps" },
  { label: "Upstream", gpon: "1.244 Gbps", xgs: "9.953 Gbps" },
  { label: "DS Wavelength", gpon: "1490 nm", xgs: "1577 nm" },
  { label: "US Wavelength", gpon: "1310 nm", xgs: "1270 nm" },
  { label: "Max Split", gpon: "1:128 (typical 1:32/64)", xgs: "1:128 (typical 1:32/64)" },
  { label: "Max Reach", gpon: "20 km (60 km extended)", xgs: "20 km (40 km extended)" },
  { label: "Encryption", gpon: "AES-128", xgs: "AES-128" },
];

const tcTerms = [
  { term: "GEM Port", desc: "GPON Encapsulation Method port — a virtual channel that carries a specific traffic flow (e.g., data, VoIP, IPTV). Each service maps to its own GEM port." },
  { term: "T-CONT", desc: "Transmission Container — an upstream bandwidth bucket on the ONT. The OLT allocates time slots to T-CONTs, which group one or more GEM ports for scheduling." },
  { term: "Alloc-ID", desc: "Allocation ID — a unique identifier the OLT assigns to each T-CONT during ONT registration. Used in the upstream BWmap to grant transmission windows." },
  { term: "ONU-ID", desc: "A unique 8-bit (GPON) or 16-bit (XGS-PON) identifier assigned to each ONT on a PON port during the ranging/registration process." },
];

export function Guide3() {
  const [termIdx, setTermIdx] = useState(null);

  return (
    <>
      <DarkBox title="XGS-PON DEEP DIVE">
        <Term>XGS-PON</Term> stands for <Term>10-Gigabit-capable Symmetric PON</Term> — delivering
        10 Gbps in both directions. It is the successor to GPON and uses different wavelengths, so both
        technologies can coexist on the same fiber simultaneously.
      </DarkBox>

      <Card color="#C62828" title="GPON vs XGS-PON" subtitle="Side-by-side comparison">
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, borderRadius: 10, overflow: "hidden", border: "1px solid #1A3A5C", minWidth: 400 }}>
            {[["", "GPON", "XGS-PON"], ...compRows.map(r => [r.label, r.gpon, r.xgs])].map((row, i) => (
              row.map((cell, j) => (
                <div key={`${i}-${j}`} style={{
                  padding: "8px 12px", fontSize: 12, lineHeight: 1.5,
                  background: i === 0 ? (j === 1 ? "#1565C033" : j === 2 ? "#C6282833" : "#132D4A") : "#0D1F33",
                  color: i === 0 ? (j === 1 ? "#64B5F6" : j === 2 ? "#EF9A9A" : "#8BACC8") : (j === 0 ? "#E0F7FA" : "#B0BEC5"),
                  fontWeight: (i === 0 || j === 0) ? 700 : 400,
                }}>{cell}</div>
              ))
            ))}
          </div>
        </div>
        <NetTip text="XGS-PON is 4x faster downstream and 8x faster upstream than GPON. The 'S' in XGS means symmetric — same speed both ways." />
      </Card>

      <Card color="#E65100" title="Coexistence" subtitle="Running GPON and XGS-PON together">
        <NetworkDiagram
          title="Wavelength Coexistence on One Fiber"
          nodes={[
            { id: "olt", icon: "🏢", label: "OLT", sub: "Combo port", detail: "A combo OLT port supports both GPON and XGS-PON simultaneously. It transmits on both 1490 nm (GPON) and 1577 nm (XGS-PON) wavelengths." },
            { id: "wdm", icon: "🌈", label: "WDM Filter", sub: "Coexistence Element", detail: "Wavelength Division Multiplexing filter (CEx) combines/separates GPON and XGS-PON wavelengths onto a single feeder fiber. Sometimes built into the OLT." },
            { id: "split", icon: "🔀", label: "Splitter", sub: "Passive", detail: "Standard passive splitter — wavelength-agnostic. Passes both GPON and XGS-PON signals to all ONTs." },
            { id: "ont", icon: "🏠", label: "ONTs", sub: "Mixed fleet", detail: "GPON ONTs see only 1490 nm downstream and ignore 1577 nm. XGS-PON ONTs see only 1577 nm and ignore 1490 nm. Each type responds on its own upstream wavelength." },
          ]}
          connections={["→", "→", "→"]}
        />
        <Insight emoji="🔄" text="Coexistence means you can upgrade customers from GPON to XGS-PON one at a time — just swap the ONT. No new fiber needed." />
      </Card>

      <Card color="#4527A0" title="TC Layer Concepts" subtitle="How traffic is organized">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#B0BEC5", marginBottom: 14 }}>
          The <Term>Transmission Convergence (TC) layer</Term> manages how data is framed, encrypted,
          and scheduled on the PON. Understanding these building blocks helps when reading ONT diagnostics
          or troubleshooting service provisioning issues.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tcTerms.map((t, i) => (
            <div key={t.term} onClick={() => setTermIdx(termIdx === i ? null : i)}
              style={{
                padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                background: termIdx === i ? "#4527A033" : "#0D1F33",
                border: `1px solid ${termIdx === i ? "#B39DDB" : "#1A3A5C"}`,
                transition: "all 0.2s",
              }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#E0F7FA" }}>{t.term}</div>
              {termIdx === i && (
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: "#B0BEC5" }}>{t.desc}</div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card color="#00695C" title="ONT Registration & Ranging" subtitle="How an ONT comes online">
        <StepFlow color="#00695C" steps={[
          "ONT powers up and listens for downstream frames from the OLT on 1577 nm (XGS-PON) or 1490 nm (GPON).",
          "OLT periodically opens a 'quiet window' — a time slot where no ONTs transmit — and sends a discovery grant.",
          "Unregistered ONTs respond during this window with their serial number (and optionally a registration ID or password).",
          "OLT measures the round-trip delay to calculate the exact fiber distance (ranging). This sets the ONT's equalization delay so all upstream bursts arrive in sync.",
          "OLT assigns an ONU-ID and Alloc-ID, then provisions GEM ports and T-CONTs based on the customer's service profile.",
          "ONT enters operational state (O5) — traffic begins flowing.",
        ]} />
        <Warning text="If ranging fails repeatedly, suspect a dirty connector, excessive optical loss, or the ONT being on the wrong PON port. Check optical power levels first." />
      </Card>
    </>
  );
}
