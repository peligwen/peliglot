import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, NetworkDiagram, StepFlow } from './_helpers';

const segments = [
  { name: "Central Office (CO)", dist: "—", detail: "Houses the OLT chassis, patch panels, and fiber management. All PON ports originate here. Typically a climate-controlled building with battery/generator backup." },
  { name: "Feeder Fiber", dist: "1–20 km", detail: "High-count fiber cable (144–864 strands) running from the CO to the FDH. Usually underground in conduit or aerial on poles. One fiber per PON port." },
  { name: "FDH / Splice Point", dist: "—", detail: "Fiber Distribution Hub — a weatherproof cabinet where feeder fibers are spliced or connectorized to distribution fibers. Contains passive splitters (typically 1:32)." },
  { name: "Distribution Fiber", dist: "0.5–5 km", detail: "Mid-count cable (12–48 strands) from FDH to neighborhood ODBs. Follows existing utility routes — aerial, underground, or direct-buried." },
  { name: "ODB (Optical Distribution Box)", dist: "—", detail: "Small enclosure (pedestal, pole-mount, or wall-mount) near a cluster of homes. Provides splice or connector access points for individual drop cables." },
  { name: "Drop Cable", dist: "30–300 m", detail: "Single or dual fiber cable from the ODB to the customer's home. May be aerial (with messenger wire), buried, or run through existing conduit. Terminates at the NID." },
  { name: "ONT (Customer Premises)", dist: "—", detail: "Optical Network Terminal inside or outside the home. Converts optical signal to Ethernet/Wi-Fi. Connected to the NID via a short patch cord or direct splice." },
];

const routeTypes = [
  { type: "Aerial", icon: "🔌", pros: "Fast to install, easy to access for repairs", cons: "Exposed to weather, trees, vehicle strikes", use: "Rural and suburban areas with existing pole lines" },
  { type: "Underground (Conduit)", icon: "🏗️", pros: "Protected from weather, long lifespan", cons: "Expensive to install, requires permits and excavation", use: "Urban areas, new developments" },
  { type: "Direct Buried", icon: "⛏️", pros: "Lower cost than conduit, no trench box needed", cons: "Harder to repair, vulnerable to dig-ups", use: "Rural FTTH drops, lower-density areas" },
];

export function Guide4() {
  const [segIdx, setSegIdx] = useState(null);
  const [routeIdx, setRouteIdx] = useState(null);

  return (
    <>
      <DarkBox title="FTTH NETWORK TOPOLOGY">
        Understanding the <Term>end-to-end fiber path</Term> from the central office to the customer's
        home is essential for support. Each segment has different failure modes, ownership boundaries,
        and repair procedures.
      </DarkBox>

      <Card color="#1565C0" title="The Full Path" subtitle="CO to customer, step by step">
        <NetworkDiagram
          title="FTTH End-to-End Topology"
          nodes={[
            { id: "co", icon: "🏢", label: "CO", sub: "Central Office", detail: "Contains OLT equipment, fiber patch panels, and test access points. Starting point for all PON circuits." },
            { id: "feeder", icon: "📡", label: "Feeder", sub: "1–20 km", detail: "High-count trunk cable. A single cut here can affect hundreds or thousands of customers." },
            { id: "fdh", icon: "🗄️", label: "FDH", sub: "Splitter cabinet", detail: "Fiber Distribution Hub with passive splitters. Key demarcation point between feeder and distribution plant." },
            { id: "dist", icon: "🔹", label: "Distrib.", sub: "0.5–5 km", detail: "Distribution cables fan out to neighborhood-level access points (ODBs)." },
            { id: "odb", icon: "📦", label: "ODB", sub: "Access point", detail: "Optical Distribution Box — where the drop cable connects to the distribution network. Closest access point to the customer." },
            { id: "ont", icon: "🏠", label: "ONT", sub: "Customer", detail: "Optical Network Terminal at the premises. The customer-facing device that provides internet, voice, and sometimes TV service." },
          ]}
          connections={["→", "→", "→", "→", "→"]}
        />
      </Card>

      <Card color="#00838F" title="Segment Details" subtitle="Tap each segment to learn more">
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {segments.map((s, i) => (
            <div key={s.name} onClick={() => setSegIdx(segIdx === i ? null : i)}
              style={{
                padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                background: segIdx === i ? "#00838F22" : "#D6EAF8",
                border: `1px solid ${segIdx === i ? "#4DD0E1" : "#AED6F1"}`,
                transition: "all 0.2s",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{s.name}</span>
                {s.dist !== "—" && <span style={{ fontSize: 11, color: "#0277BD", background: "#fff", padding: "2px 8px", borderRadius: 6 }}>{s.dist}</span>}
              </div>
              {segIdx === i && (
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: "#333" }}>{s.detail}</div>
              )}
            </div>
          ))}
        </div>
        <NetTip text="When a customer reports an outage, work backwards from the ONT. Check if neighbors are affected — that tells you whether the issue is in the drop, distribution, or feeder segment." />
      </Card>

      <Card color="#E65100" title="Outside Plant Routes" subtitle="How fiber gets from A to B">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {routeTypes.map((r, i) => (
            <div key={r.type} onClick={() => setRouteIdx(routeIdx === i ? null : i)}
              style={{
                padding: "12px 16px", borderRadius: 10, cursor: "pointer",
                background: routeIdx === i ? "#E6510022" : "#D6EAF8",
                border: `1px solid ${routeIdx === i ? "#FFB74D" : "#AED6F1"}`,
                transition: "all 0.2s",
              }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{r.icon} {r.type}</div>
              {routeIdx === i && (
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.7, color: "#333" }}>
                  <div><strong style={{ color: "#2E7D32" }}>Pros:</strong> {r.pros}</div>
                  <div><strong style={{ color: "#C62828" }}>Cons:</strong> {r.cons}</div>
                  <div><strong style={{ color: "#0277BD" }}>Used for:</strong> {r.use}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <Warning text="Before any digging, 811 (Call Before You Dig) must be contacted. Accidental fiber cuts during excavation are one of the most common causes of mass outages." />
      </Card>

      <Card color="#37474F" title="Fiber Maps & Documentation" subtitle="Why records matter for support">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", marginBottom: 12 }}>
          Every fiber strand from the CO to the ONT is documented in the provider's <Term>fiber management
          system</Term>. Accurate records are critical for support and maintenance.
        </p>
        <StepFlow color="#37474F" steps={[
          "Circuit ID maps a customer to a specific OLT port, splitter output, and fiber strand end-to-end.",
          "Fiber maps show physical cable routes — aerial spans, conduit runs, splice points, and access locations.",
          "Splice records track which fiber in a cable connects to which port at each enclosure (FDH, ODB).",
          "OTDR test results stored per circuit provide a baseline optical signature for comparison during troubleshooting.",
        ]} />
        <Insight emoji="🗺️" text="When dispatching a technician, always pull up the fiber map first. Knowing the exact cable route, splice locations, and split ratios saves hours in the field." />
      </Card>
    </>
  );
}
