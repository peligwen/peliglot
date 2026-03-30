import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, Warning, Term, CompareTable, LEDIndicator, StepFlow } from './_helpers';

const cardTypes = [
  ["Technology", "GPON", "XGS-PON"],
  ["Downstream", "2.488 Gbps", "9.953 Gbps"],
  ["Upstream", "1.244 Gbps", "9.953 Gbps"],
  ["Wavelength (DS/US)", "1490/1310 nm", "1577/1270 nm"],
  ["PON Ports", "8 or 16", "8 or 16"],
  ["Max ONTs per Port", "128 (1:128 split)", "128 (1:128 split)"],
  ["SFP Type", "Class C+", "Class N2 (extended reach)"],
  ["Max Reach", "20 km", "40 km (N2 optics)"],
];

const cardStates = [
  { state: "In-Service (IS)", color: "#4CAF50", desc: "Card is active and serving traffic" },
  { state: "Out-of-Service (OOS)", color: "#FF9800", desc: "Card is administratively disabled or not yet provisioned" },
  { state: "Provisioned", color: "#2196F3", desc: "Card is configured in AMS but not yet physically inserted" },
  { state: "Failed", color: "#F44336", desc: "Hardware fault detected — card needs replacement" },
];

export function Guide10() {
  const [showStates, setShowStates] = useState(false);

  return (
    <>
      <DarkBox title="OLT LINE CARDS">
        Line Terminal (<Term>LT</Term>) cards plug into the 7360 ISAM FX chassis and provide
        the <Term>PON ports</Term> that connect to the fiber distribution network. Each port serves
        a tree of splitters and ONTs. The <Term>NGLT-C</Term> (Next Generation Line Terminal) is
        the current-generation card supporting both GPON and XGS-PON variants.
      </DarkBox>

      <Card color="#1565C0" title="GPON vs XGS-PON Cards" subtitle="Key specifications">
        <CompareTable headers={["Specification", "GPON LT", "XGS-PON LT"]} rows={cardTypes} />
        <NetTip text="XGS-PON cards use different SFP+ wavelengths than GPON. They cannot share the same PON tree unless using combo optics on an overlay card." />
      </Card>

      <Card color="#00838F" title="SFP+ Optics" subtitle="Pluggable transceiver modules">
        <div style={{ fontSize: 13, lineHeight: 1.8, color: "#E0E0E0" }}>
          <div style={{ marginBottom: 8 }}><Term>Class C+</Term> — Standard GPON optics, supports up to 20 km with a 1:64 split. Most common in residential deployments.</div>
          <div style={{ marginBottom: 8 }}><Term>Class N2</Term> — Extended-reach XGS-PON optics, supports up to 40 km. Used for rural or long-distance FTTH with higher power budget (31 dB).</div>
          <div><Term>Combo SFP</Term> — Dual-wavelength module supporting GPON + XGS-PON overlay on a single fiber for migration scenarios.</div>
        </div>
        <Warning text="Never hot-swap an SFP while the PON port is serving live traffic. Always disable the port in AMS first to avoid a service-affecting event." />
      </Card>

      <Card color="#2E7D32" title="Line Card LEDs" subtitle="Front-panel indicators">
        <div style={{ padding: "10px 0", display: "flex", flexWrap: "wrap", gap: 4 }}>
          <LEDIndicator label="PWR (Power)" color="#4CAF50" status="solid" />
          <LEDIndicator label="ACT (Active)" color="#4CAF50" status="blink" />
          <LEDIndicator label="ALM (Alarm)" color="#F44336" status="solid" />
          <LEDIndicator label="ALM (No fault)" color="#888" status="solid" />
        </div>
        <div style={{ fontSize: 12, color: "#B0BEC5", lineHeight: 1.7, marginTop: 8 }}>
          <strong style={{ color: "#4CAF50" }}>PWR solid green</strong> = powered on.{" "}
          <strong style={{ color: "#4CAF50" }}>ACT blinking</strong> = traffic flowing.{" "}
          <strong style={{ color: "#F44336" }}>ALM red</strong> = hardware fault.{" "}
          <strong style={{ color: "#888" }}>ALM off</strong> = no active alarms.
        </div>
      </Card>

      <Card color="#E65100" title="Card States" subtitle="Tap to expand">
        <div onClick={() => setShowStates(!showStates)} style={{ cursor: "pointer", fontSize: 13, color: "#4FC3F7", marginBottom: showStates ? 10 : 0 }}>
          {showStates ? "▾ Hide states" : "▸ Show card states"}
        </div>
        {showStates && cardStates.map((cs, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < cardStates.length - 1 ? "1px solid #1A3A5C" : "none" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: cs.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: cs.color }}>{cs.state}</div>
              <div style={{ fontSize: 12, color: "#B0BEC5" }}>{cs.desc}</div>
            </div>
          </div>
        ))}
      </Card>

      <Card color="#6A1B9A" title="Identifying a Customer's Card/Port" subtitle="Support workflow">
        <StepFlow steps={[
          "Look up the customer's ONT serial number in AMS",
          "The ONT details page shows the associated OLT shelf, slot, and PON port (e.g., 1/1/3/2 = rack 1, shelf 1, slot 3, port 2)",
          "Navigate to that LT card in the device tree to check card status",
          "Check the PON port operational state and Rx power levels",
          "If the card shows Failed or OOS, escalate for hardware replacement",
        ]} />
      </Card>
    </>
  );
}
