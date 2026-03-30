import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { SupportTip, CompareTable, StepFlow } from './_helpers';

export function Guide38() {
  return (
    <div>
      <DarkBox title="STREAMING & GAMING ISSUES">
        Streaming and gaming problems aren't always about speed — latency, jitter, and packet loss
        matter more for real-time applications.
      </DarkBox>

      <Card color="#0277BD" title="Bandwidth vs Latency vs Jitter" subtitle="Three different things that affect experience">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { term: "Bandwidth", icon: "📦", desc: "How much data can flow at once. Affects download speeds, whether you can stream in HD vs 4K. Think of it as the width of a pipe." },
            { term: "Latency", icon: "⏱️", desc: "The delay between sending and receiving data. Affects gaming responsiveness, video call sync, and real-time interactions. Measured in milliseconds (ms)." },
            { term: "Jitter", icon: "📊", desc: "Inconsistency in latency — packets arriving at uneven intervals. Causes buffering in streams, choppy VoIP audio, and rubber-banding in games." },
          ].map(item => (
            <div key={item.term} style={{ padding: 12, background: "#D6EAF8", borderRadius: 10, border: "1px solid #AED6F1" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{item.icon} {item.term}</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: "#333" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#1565C0" title="Minimum Requirements" subtitle="What each application needs">
        <CompareTable
          headers={["Application", "Bandwidth", "Latency", "Notes"]}
          rows={[
            ["SD Streaming", "3 Mbps", "Not critical", "Basic quality, low demand"],
            ["Netflix HD", "5 Mbps", "Not critical", "Buffers ahead, tolerates jitter"],
            ["4K Streaming", "25 Mbps", "Not critical", "Needs sustained throughput"],
            ["Online Gaming", "5+ Mbps", "< 50 ms", "Latency matters most"],
            ["Video Calls", "2+ Mbps", "< 100 ms", "Sensitive to jitter and packet loss"],
          ]}
        />
      </Card>

      <Card color="#00838F" title="Troubleshooting Steps" subtitle="Systematic approach for media complaints">
        <StepFlow steps={[
          "Verify the customer's speed tier meets the application's minimum requirements",
          "Test wired speeds to eliminate WiFi as a factor — most streaming issues are WiFi-related",
          "Check for bandwidth saturation — are other devices downloading, updating, or streaming simultaneously?",
          "Check optical levels for signal quality — marginal levels can cause packet loss even with okay speeds",
          "Check QoS settings — is voice traffic configured to steal priority from data? This can throttle streaming during calls",
        ]} />
      </Card>

      <SupportTip text="If a wired speed test passes but streaming still buffers, the issue is usually WiFi congestion or the customer's device, not the network." />
    </div>
  );
}
