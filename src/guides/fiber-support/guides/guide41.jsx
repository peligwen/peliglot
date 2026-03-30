import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Warning, CompareTable, StepFlow } from './_helpers';

export function Guide41() {
  return (
    <div>
      <DarkBox title="ERROR COUNTERS & LOGS">
        Error counters tell the story of what's happening on the fiber.
        A few errors are normal — trending errors signal a problem.
      </DarkBox>

      <Card color="#0277BD" title="Error Types Explained" subtitle="What each counter is really telling you">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { type: "BIP Errors", sub: "Bit Interleaved Parity", desc: "Bit-level errors detected on the PON. A few per interval is normal background noise. Climbing counts indicate degrading fiber, a dirty connector, or a failing splice.", color: "#1565C0" },
            { type: "FEC Corrections", sub: "Forward Error Correction", desc: "The system automatically correcting bit errors before they affect service. High FEC with low uncorrectable errors = marginal but working. High uncorrectable errors = service-affecting.", color: "#00838F" },
            { type: "CRC Errors", sub: "Cyclic Redundancy Check", desc: "Frame-level errors — entire data frames are corrupted. Usually indicates a bad connector, damaged fiber, or a failing SFP module.", color: "#E65100" },
            { type: "HEC Errors", sub: "Header Error Control", desc: "Errors in the frame header. Often caused by a dirty or misaligned connector. The header is small, so even minor signal issues can corrupt it.", color: "#C62828" },
          ].map(item => (
            <div key={item.type} style={{ padding: 12, background: "#fff", borderRadius: 10, border: `1px solid ${item.color}44` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: item.color }}>{item.type}</div>
              <div style={{ fontSize: 11, color: "#5D6D7E", marginBottom: 6 }}>{item.sub}</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: "#333" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#1565C0" title="What the Numbers Mean" subtitle="From normal to critical">
        <CompareTable
          headers={["Error Type", "Normal", "Concerning", "Critical"]}
          rows={[
            ["BIP Errors", "< 10 per 15 min", "10–100 per 15 min", "> 100 per 15 min or climbing"],
            ["FEC Corrected", "Low, stable count", "Increasing over time", "High + uncorrectable present"],
            ["FEC Uncorrectable", "Zero", "Any non-zero", "Sustained non-zero"],
            ["CRC Errors", "Zero", "Occasional (< 5/hr)", "Sustained or climbing"],
            ["HEC Errors", "Zero", "Occasional", "Sustained — dirty connector likely"],
          ]}
        />
      </Card>

      <Card color="#00838F" title="Using Error Data" subtitle="How to investigate with counters">
        <StepFlow steps={[
          "Note the current error counts for all error types",
          "Clear counters if possible in your NMS (or note the current values as your baseline)",
          "Wait 15–30 minutes for new errors to accumulate",
          "Re-check — are errors accumulating? How fast?",
          "If yes: correlate with optical power levels — are Rx levels marginal too?",
          "Rising errors + marginal power = plant issue. Dispatch a tech to inspect connectors, splices, and the drop cable.",
        ]} />
      </Card>

      <Warning text="Never ignore steadily climbing error counters even if service seems fine — they often predict an upcoming failure. Today's marginal link is tomorrow's outage." />
    </div>
  );
}
