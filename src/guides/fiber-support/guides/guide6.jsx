import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, Warning, Term, StepFlow } from './_helpers';

const lossSources = [
  { label: "Connector (each)", loss: 0.3, icon: "🔌" },
  { label: "Fusion splice (each)", loss: 0.1, icon: "⚡" },
  { label: "1:2 splitter", loss: 3.5, icon: "🔀" },
  { label: "1:4 splitter", loss: 7.0, icon: "🔀" },
  { label: "1:8 splitter", loss: 10.5, icon: "🔀" },
  { label: "1:16 splitter", loss: 13.5, icon: "🔀" },
  { label: "1:32 splitter", loss: 17.0, icon: "🔀" },
  { label: "1:64 splitter", loss: 20.5, icon: "🔀" },
  { label: "Fiber per km", loss: 0.35, icon: "🧵" },
];

const splitterLoss = { "1:2": 3.5, "1:4": 7.0, "1:8": 10.5, "1:16": 13.5, "1:32": 17.0, "1:64": 20.5 };

export function Guide6() {
  const [txPower, setTxPower] = useState(3);
  const [fiberKm, setFiberKm] = useState(5);
  const [connectors, setConnectors] = useState(6);
  const [splices, setSplices] = useState(4);
  const [ratio, setRatio] = useState("1:32");

  const totalLoss = (fiberKm * 0.35) + (connectors * 0.3) + (splices * 0.1) + (splitterLoss[ratio] || 0);
  const rxPower = txPower - totalLoss;
  const ok = rxPower >= -28 && rxPower <= -8;
  const tooLow = rxPower < -28;

  return (
    <>
      <DarkBox title="OPTICAL POWER & dB">
        Every support case involving slow speeds or dropouts may come down to optical
        power. Understanding dBm and loss budgets lets you pinpoint problems before
        dispatching a truck.
      </DarkBox>

      <Card color="#1565C0" title="Key Concepts" subtitle="Absolute vs. relative">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div style={{ padding: 14, borderRadius: 10, background: "#D6EAF8", border: "1px solid #AED6F1" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#42A5F5" }}>dBm</div>
            <div style={{ fontSize: 12, color: "#333", lineHeight: 1.6, marginTop: 6 }}>
              <Term>Absolute</Term> power measurement. 0 dBm = 1 milliwatt. OLT transmits at +2 to +5 dBm. ONT receives between -8 and -28 dBm.
            </div>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: "#D6EAF8", border: "1px solid #AED6F1" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#26A69A" }}>dB</div>
            <div style={{ fontSize: 12, color: "#333", lineHeight: 1.6, marginTop: 6 }}>
              <Term>Relative</Term> measure of loss or gain. A 3 dB loss means half the power is gone. Each component adds to total loss.
            </div>
          </div>
        </div>
        <StepFlow color="#1565C0" steps={[
          "Start with OLT Tx power (e.g. +3 dBm)",
          "Subtract all losses: fiber, connectors, splices, splitter",
          "Result = estimated ONT Rx power",
          "Compare to sensitivity: must be between -8 and -28 dBm",
        ]} />
      </Card>

      <Card color="#E65100" title="Loss Reference Table" subtitle="Typical insertion losses">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                {["Component", "Typical Loss"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#2C3E50", borderBottom: "2px solid #AED6F1", fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lossSources.map(s => (
                <tr key={s.label}>
                  <td style={{ padding: "7px 12px", borderBottom: "1px solid #AED6F1", color: "#1a1a1a" }}>{s.icon} {s.label}</td>
                  <td style={{ padding: "7px 12px", borderBottom: "1px solid #AED6F1", color: "#FFB74D", fontWeight: 700 }}>{s.loss} dB</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card color="#2E7D32" title="Loss Budget Calculator" subtitle="Enter your link values">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "OLT Tx Power (dBm)", value: txPower, set: setTxPower, min: -2, max: 8, step: 0.5 },
            { label: "Fiber Length (km)", value: fiberKm, set: setFiberKm, min: 0, max: 40, step: 0.5 },
            { label: "Connectors", value: connectors, set: setConnectors, min: 0, max: 20, step: 1 },
            { label: "Splices", value: splices, set: setSplices, min: 0, max: 20, step: 1 },
          ].map(f => (
            <div key={f.label}>
              <div style={{ fontSize: 11, color: "#2C3E50", marginBottom: 4, fontWeight: 600 }}>{f.label}</div>
              <input type="number" value={f.value} min={f.min} max={f.max} step={f.step}
                onChange={e => f.set(parseFloat(e.target.value) || 0)}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #AED6F1", background: "#D6EAF8", color: "#1a1a1a", fontSize: 14, fontWeight: 700 }}
              />
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ fontSize: 11, color: "#2C3E50", marginBottom: 4, fontWeight: 600 }}>Splitter Ratio</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {Object.keys(splitterLoss).map(r => (
                <button key={r} onClick={() => setRatio(r)} style={{
                  padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700,
                  background: ratio === r ? "#2E7D32" : "#fff",
                  color: ratio === r ? "#fff" : "#2C3E50",
                  border: `1px solid ${ratio === r ? "#4CAF50" : "#AED6F1"}`,
                }}>{r}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{
          padding: 16, borderRadius: 12, textAlign: "center",
          background: tooLow ? "#B71C1C22" : ok ? "#1B5E2022" : "#E6510022",
          border: `2px solid ${tooLow ? "#EF5350" : ok ? "#4CAF50" : "#FF9800"}`,
        }}>
          <div style={{ fontSize: 11, color: "#2C3E50", marginBottom: 4 }}>Total Loss: {totalLoss.toFixed(1)} dB</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: tooLow ? "#EF5350" : ok ? "#4CAF50" : "#FF9800" }}>
            {rxPower.toFixed(1)} dBm
          </div>
          <div style={{ fontSize: 12, color: "#333", marginTop: 4 }}>
            {tooLow ? "Below sensitivity — signal too weak" : ok ? "Within acceptable range (-8 to -28 dBm)" : "Above -8 dBm — receiver may be saturated"}
          </div>
        </div>
      </Card>

      <NetTip text="If ONT Rx reads worse than -25 dBm, proactively investigate — the customer is close to dropping. If it reads better than -8 dBm, an attenuator may be needed to prevent receiver saturation." />
      <Warning text="Escalate to plant/fiber team if measured Rx power is more than 3 dB worse than the calculated budget. This usually indicates a dirty connector, macro-bend, or damaged fiber." />
    </>
  );
}
