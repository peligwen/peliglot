import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, NetworkDiagram, StepFlow } from './_helpers';

const fiberLayers = [
  { name: "Core", size: "9 µm (single-mode)", material: "Ultra-pure glass (SiO₂)", role: "Carries the light signal" },
  { name: "Cladding", size: "125 µm", material: "Glass with lower refractive index", role: "Reflects light back into core via total internal reflection" },
  { name: "Buffer", size: "250 µm", material: "Acrylate coating", role: "Protects cladding from moisture and mechanical stress" },
  { name: "Jacket", size: "900 µm (tight) or 3mm (loose tube)", material: "PVC or LSZH", role: "Outer protection for handling and installation" },
];

const wavelengths = [
  { band: "1310 nm", dir: "Upstream", tech: "GPON & XGS-PON (varies)", note: "Customer → Central Office" },
  { band: "1490 nm", dir: "Downstream", tech: "GPON", note: "CO → Customer (2.5 Gbps)" },
  { band: "1577 nm", dir: "Downstream", tech: "XGS-PON", note: "CO → Customer (10 Gbps)" },
];

export function Guide1() {
  const [layerIdx, setLayerIdx] = useState(null);

  return (
    <>
      <DarkBox title="HOW FIBER OPTICS WORK">
        Fiber optic cables transmit data as <Term>pulses of light</Term> through hair-thin strands of glass.
        Unlike copper, fiber is immune to electromagnetic interference and can carry signals over tens of
        kilometers with negligible loss.
      </DarkBox>

      <Card color="#00796B" title="Total Internal Reflection" subtitle="The physics behind fiber">
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#333" }}>
          Light travels through the fiber <Term>core</Term> at a slight angle. Because the core has a
          higher refractive index than the surrounding <Term>cladding</Term>, light that hits the boundary
          bounces back inward — this is <Term>total internal reflection</Term>. The light zigzags down the
          fiber for kilometers without escaping.
        </p>
        <NetworkDiagram
          title="Signal Path"
          nodes={[
            { id: "laser", icon: "💡", label: "Laser Source", sub: "Transmitter", detail: "Semiconductor laser or LED converts electrical signals into light pulses at a specific wavelength." },
            { id: "core", icon: "🔮", label: "Fiber Core", sub: "9 µm glass", detail: "Ultra-pure glass strand where light propagates via total internal reflection. Single-mode core is just 9 micrometers — thinner than a human hair." },
            { id: "clad", icon: "🛡️", label: "Cladding", sub: "125 µm", detail: "Lower refractive index glass layer surrounding the core. Creates the mirror effect that keeps light confined inside the core." },
            { id: "rx", icon: "📡", label: "Receiver", sub: "Photodiode", detail: "Photodetector converts incoming light pulses back into electrical signals for processing by network equipment." },
          ]}
          connections={["→", "↔", "→"]}
        />
        <NetTip text="Single-mode fiber (SMF) uses a 9 µm core and one light path — ideal for long-distance FTTH. Multi-mode uses a 50/62.5 µm core for short runs like data centers." />
      </Card>

      <Card color="#00695C" title="Fiber Construction" subtitle="Four protective layers">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
          {fiberLayers.map((layer, i) => (
            <div key={layer.name} onClick={() => setLayerIdx(layerIdx === i ? null : i)}
              style={{
                padding: 14, borderRadius: 10, cursor: "pointer", textAlign: "center",
                background: layerIdx === i ? "#00796B" : "#fff",
                border: `1px solid ${layerIdx === i ? "#00BCD4" : "#AED6F1"}`,
                transition: "all 0.2s",
              }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{layer.name}</div>
              <div style={{ fontSize: 11, color: "#0277BD", marginTop: 4 }}>{layer.size}</div>
            </div>
          ))}
        </div>
        {layerIdx !== null && (
          <div style={{ marginTop: 10, padding: 14, borderRadius: 10, background: "#D6EAF8", border: "1px solid #00BCD4", fontSize: 13, lineHeight: 1.7, color: "#333" }}>
            <strong style={{ color: "#00BCD4" }}>{fiberLayers[layerIdx].name}:</strong> {fiberLayers[layerIdx].material} — {fiberLayers[layerIdx].role}
          </div>
        )}
      </Card>

      <Card color="#1565C0" title="Wavelength Plan" subtitle="Colors of light in FTTH">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {wavelengths.map(w => (
            <div key={w.band} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#D6EAF8", border: "1px solid #AED6F1" }}>
              <div>
                <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 14 }}>{w.band}</span>
                <span style={{ color: "#0277BD", fontSize: 12, marginLeft: 8 }}>{w.dir}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>{w.tech}</div>
                <div style={{ fontSize: 11, color: "#5D6D7E" }}>{w.note}</div>
              </div>
            </div>
          ))}
        </div>
        <Warning text="These wavelengths are invisible infrared — never look into the end of a lit fiber. Even low-power lasers can cause permanent eye damage." />
      </Card>

      <Card color="#2E7D32" title="Fiber vs Copper" subtitle="Why we moved to fiber">
        <StepFlow color="#2E7D32" steps={[
          "Bandwidth: Fiber supports 10 Gbps+ symmetric; copper (Cat5e/6) maxes out at 1–10 Gbps over short runs.",
          "Distance: Single-mode fiber reaches 20+ km without repeaters; copper degrades significantly past 100 m.",
          "Interference: Glass is immune to EMI, crosstalk, and lightning — copper is vulnerable to all three.",
          "Longevity: Fiber plant has a 25+ year lifespan and supports technology upgrades (GPON → XGS-PON) on the same strand.",
        ]} />
        <Insight emoji="🔑" text="For support: when a customer asks 'why fiber?', the big wins are speed, reliability, and future-proofing." />
      </Card>
    </>
  );
}
