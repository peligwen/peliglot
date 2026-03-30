import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, StepFlow } from './_helpers';

export function Guide39() {
  return (
    <div>
      <DarkBox title="MULTI-DEVICE PROBLEMS">
        Modern homes have 15–30+ connected devices. When many devices have issues simultaneously,
        the problem is often at the home network level, not the fiber network.
      </DarkBox>

      <Card color="#0277BD" title="Common Multi-Device Issues" subtitle="Why everything breaks at once">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { title: "DHCP Exhaustion", desc: "The ONT or router runs out of IP addresses to assign. Most consumer routers have a DHCP pool of 32–64 addresses. Once full, new devices can't connect." },
            { title: "WiFi Congestion", desc: "Too many devices competing on the same band and channel. Each device takes turns transmitting — more devices means longer waits and slower speeds for everyone." },
            { title: "Bandwidth Saturation", desc: "Total household usage exceeds the provisioned speed tier. Four 4K streams + gaming + video calls can overwhelm even a 100 Mbps plan." },
            { title: "NAT Table Limits", desc: "The router's NAT table tracks every active connection. Smart home devices, streaming apps, and browsers each open many connections. Table overflow causes random drops." },
          ].map(item => (
            <div key={item.title} style={{ padding: 12, background: "#fff", borderRadius: 10, border: "1px solid #AED6F1" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0277BD", marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: "#333" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#1565C0" title="Diagnostic Approach" subtitle="Step-by-step for multi-device complaints">
        <StepFlow steps={[
          "Count connected devices — check the router admin page if possible. Many customers don't realize how many devices are connected.",
          "Check if the issue affects wired AND wireless devices — if only WiFi devices are affected, it's a WiFi issue, not a network issue.",
          "Verify the speed tier supports the household's usage — a family of 5 streaming simultaneously needs more than a basic plan.",
          "Check if rebooting the ONT/router temporarily fixes the issue — if it does, it's likely DHCP or NAT table exhaustion.",
          "Consider recommending a router upgrade for high-device households — consumer ISP-provided routers often can't handle 20+ devices well.",
        ]} />
      </Card>

      <NetTip text="An ONT reboot clears the NAT table and DHCP leases — if this temporarily fixes the issue, the customer likely needs a better router." />
    </div>
  );
}
