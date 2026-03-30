import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, CompareTable } from './_helpers';

export function Guide35() {
  return (
    <div>
      <DarkBox title="WIFI FUNDAMENTALS">
        WiFi is the last link between the fiber network and the customer's device.
        Understanding how it works helps you determine whether a complaint is a network issue or an environment issue.
      </DarkBox>

      <Card color="#0277BD" title="2.4 GHz vs 5 GHz" subtitle="Range versus speed tradeoff">
        <CompareTable
          headers={["Feature", "2.4 GHz", "5 GHz"]}
          rows={[
            ["Range", "Longer — penetrates walls better", "Shorter — absorbed by obstacles"],
            ["Speed", "Slower (up to ~150 Mbps typical)", "Faster (up to ~800+ Mbps typical)"],
            ["Wall penetration", "Good", "Poor"],
            ["Congestion", "High — only 3 non-overlapping channels", "Low — many available channels"],
            ["Best for", "IoT, distant rooms, smart home", "Streaming, gaming, nearby devices"],
          ]}
        />
      </Card>

      <Card color="#1565C0" title="WiFi Channels" subtitle="Why channel selection matters">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", marginBottom: 12 }}>
          <strong style={{ color: "#1a1a1a" }}>2.4 GHz:</strong> Only channels <strong>1, 6, and 11</strong> are non-overlapping.
          Using any other channel causes interference with neighbors. In dense areas, every nearby router competes on these three channels.
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333" }}>
          <strong style={{ color: "#1a1a1a" }}>5 GHz:</strong> Many more non-overlapping channels available, plus wider channel widths
          (40/80/160 MHz) for higher throughput. Less crowded overall.
        </p>
      </Card>

      <Card color="#E65100" title="Common Interference Sources" subtitle="What kills WiFi signals">
        <ul style={{ fontSize: 13, lineHeight: 1.9, color: "#333", paddingLeft: 20 }}>
          <li><strong style={{ color: "#1a1a1a" }}>Microwaves</strong> — operate at 2.4 GHz and can wipe out WiFi while running</li>
          <li><strong style={{ color: "#1a1a1a" }}>Baby monitors</strong> — many use 2.4 GHz frequency range</li>
          <li><strong style={{ color: "#1a1a1a" }}>Neighbor networks</strong> — especially in apartments, dozens of SSIDs compete</li>
          <li><strong style={{ color: "#1a1a1a" }}>Bluetooth devices</strong> — also 2.4 GHz, can cause intermittent drops</li>
          <li><strong style={{ color: "#1a1a1a" }}>Thick walls, metal, mirrors</strong> — physical obstacles attenuate signal rapidly</li>
        </ul>
      </Card>

      <Card color="#00838F" title="Signal Strength (dBm)" subtitle="What the numbers mean">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", marginBottom: 12 }}>
          WiFi signal strength is measured in <strong>dBm</strong> (decibels relative to milliwatt). Values are always negative — closer to zero is stronger.
        </p>
        <CompareTable
          headers={["dBm Range", "Quality", "Experience"]}
          rows={[
            ["-30 to -50", "Excellent", "Right next to router — best possible performance"],
            ["-50 to -67", "Good", "Reliable for streaming, gaming, video calls"],
            ["-67 to -70", "Fair", "Usable for browsing, may buffer on HD video"],
            ["-70 to -80", "Poor", "Intermittent drops, slow speeds, frustrating"],
            ["Below -80", "Unusable", "Connection drops frequently, very slow"],
          ]}
        />
      </Card>

      <NetTip text="Most customer WiFi complaints are NOT network issues — they're WiFi environment issues. Always check wired speeds first before investigating the fiber network." />
    </div>
  );
}
