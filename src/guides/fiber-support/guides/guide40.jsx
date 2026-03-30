import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, CompareTable } from './_helpers';

export function Guide40() {
  return (
    <div>
      <DarkBox title="OLT & ONT STATISTICS">
        Network management tools provide rich operational data. Knowing how to read it turns you
        from a script follower into a real troubleshooter.
      </DarkBox>

      <Card color="#0277BD" title="Key ONT Statistics" subtitle="What each metric means and when to worry">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { metric: "Rx Power", normal: "-8 to -25 dBm", warn: "-25 to -27 dBm", crit: "Below -28 dBm", note: "How much light the ONT receives. The single most important metric for fiber health." },
            { metric: "Tx Power", normal: "+0.5 to +5 dBm", warn: "Below +0.5 dBm", crit: "Below 0 dBm or no reading", note: "How much light the ONT sends back. Low Tx can indicate a failing laser." },
            { metric: "Temperature", normal: "0–65°C", warn: "65–70°C", crit: "Above 70°C", note: "ONTs in enclosed cabinets or direct sunlight can overheat and cause intermittent resets." },
            { metric: "Uptime", normal: "Days/weeks", warn: "Hours", crit: "Minutes", note: "Long uptime = stable. Short uptime = recent reboot. Why did it reboot?" },
            { metric: "Software Version", normal: "Matches expected firmware", warn: "Outdated version", crit: "Unknown/corrupt", note: "Mismatched firmware can cause compatibility issues with the OLT." },
          ].map(item => (
            <div key={item.metric} style={{ padding: 12, background: "#fff", borderRadius: 10, border: "1px solid #AED6F1" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0277BD", marginBottom: 6 }}>{item.metric}</div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: "#333", marginBottom: 6 }}>{item.note}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", fontSize: 11 }}>
                <span style={{ padding: "2px 8px", borderRadius: 6, background: "#E8F5E9", color: "#2E7D32" }}>Normal: {item.normal}</span>
                <span style={{ padding: "2px 8px", borderRadius: 6, background: "#FFF3E0", color: "#E65100" }}>Warning: {item.warn}</span>
                <span style={{ padding: "2px 8px", borderRadius: 6, background: "#FFEBEE", color: "#C62828" }}>Critical: {item.crit}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#1565C0" title="Key OLT Statistics" subtitle="Port-level view of the network">
        <div style={{ fontSize: 13, lineHeight: 1.7, color: "#333" }}>
          <p style={{ marginBottom: 10 }}>The OLT gives you a wider view — how the entire PON port is performing, not just one customer.</p>
          <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
            <li><strong style={{ color: "#1a1a1a" }}>Active ONTs per PON port</strong> — how many customers share this splitter group</li>
            <li><strong style={{ color: "#1a1a1a" }}>BER (Bit Error Rate)</strong> — rate of bit errors on the port; should be very low (10⁻⁹ or better)</li>
            <li><strong style={{ color: "#1a1a1a" }}>FEC corrections</strong> — errors being corrected automatically; trending up = degrading fiber</li>
            <li><strong style={{ color: "#1a1a1a" }}>Bandwidth utilization</strong> — percentage of port capacity in use; high during peak can indicate congestion</li>
          </ul>
        </div>
      </Card>

      <Card color="#00838F" title="Quick Reference" subtitle="When to act on statistics">
        <CompareTable
          headers={["Metric", "Normal Range", "Warning", "Critical"]}
          rows={[
            ["ONT Rx Power", "-8 to -25 dBm", "-25 to -27 dBm", "Below -28 dBm"],
            ["ONT Tx Power", "+0.5 to +5 dBm", "Below +0.5 dBm", "No reading"],
            ["ONT Temperature", "0–65°C", "65–70°C", "Above 70°C"],
            ["BER", "< 10⁻⁹", "10⁻⁹ to 10⁻⁶", "> 10⁻⁶"],
            ["FEC Corrections", "Low / stable", "Trending upward", "High + uncorrectable errors"],
            ["Port Utilization", "< 70%", "70–90%", "> 90% sustained"],
          ]}
        />
      </Card>

      <NetTip text="Compare current readings to historical data when available. A sudden change matters more than an absolute number." />
    </div>
  );
}
