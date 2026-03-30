import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, StepFlow, CompareTable } from './_helpers';

const cloudProducts = [
  ["Support Cloud", "Real-time diagnostics, subscriber scoring, issue detection", "Support agents"],
  ["Operations Cloud", "Network-wide health, outage maps, proactive alerts", "NOC / Ops teams"],
  ["Marketing Cloud", "Subscriber analytics, upsell campaigns, churn prediction", "Marketing / Sales"],
];

const supportCloudFeatures = [
  ["Subscriber 360", "Full view of subscriber's network health, devices, usage"],
  ["Experience Score", "1-100 score based on WiFi, speed, latency, packet loss"],
  ["Device List", "All connected devices with signal strength and band info"],
  ["Speed Test", "Remote speed test from the GigaSpire (no customer action needed)"],
  ["WiFi Health", "Channel utilization, interference detection, band steering status"],
  ["Event Timeline", "Chronological log of ONT reboots, outages, config changes"],
];

export function Guide19() {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <>
      <DarkBox title="CALIX CLOUD">
        <Term>Calix Cloud</Term> is the cloud-based analytics and management layer that sits above SMx.
        It provides real-time subscriber insights, proactive alerts, and the <Term>Revenue EDGE</Term> suite
        for marketing, support, and operations teams.
      </DarkBox>

      <Card color="#1565C0" title="Revenue EDGE Products" subtitle="Three clouds, one platform">
        <CompareTable headers={["Product", "Purpose", "Primary Users"]} rows={cloudProducts} />
        <Insight text="As a support agent, you'll primarily use Support Cloud. Operations Cloud is for NOC escalations." emoji="☁️" />
      </Card>

      <Card color="#2E7D32" title="Support Cloud Features" subtitle="Your daily toolkit">
        <div style={{ cursor: "pointer", color: "#1565C0", fontWeight: 600, marginBottom: 12 }} onClick={() => setShowFeatures(!showFeatures)}>
          {showFeatures ? "▾ Hide feature details" : "▸ Show all features"}
        </div>
        {showFeatures && <CompareTable headers={["Feature", "Description"]} rows={supportCloudFeatures} />}
        <NetTip text="The Experience Score is your quickest triage tool — scores below 50 usually indicate a real issue, not just a perception problem." />
      </Card>

      <Card color="#6A1B9A" title="CommandIQ App" subtitle="Customer-facing mobile app">
        <p style={{ margin: "0 0 10px" }}>
          <Term>CommandIQ</Term> is the end-customer app that pairs with GigaSpire ONTs. It lets subscribers
          manage their own WiFi without calling support.
        </p>
        <p style={{ margin: "0 0 8px", fontWeight: 600, fontSize: 14 }}>Customer self-service features:</p>
        <ul style={{ margin: "0 0 10px", paddingLeft: 20, fontSize: 14, lineHeight: 1.8 }}>
          <li>WiFi name and password changes</li>
          <li>Parental controls and device time limits</li>
          <li>Guest network management</li>
          <li>Speed test and device visibility</li>
          <li>ProtectIQ (security) and ExperienceIQ (content filtering) add-ons</li>
        </ul>
        <Warning text="CommandIQ only works with GigaSpire models. GigaPoint ONTs don't support it — those customers need a separate router app." />
      </Card>

      <Card color="#E65100" title="Running Diagnostics" subtitle="Step-by-step in Calix Cloud">
        <StepFlow steps={[
          "Log into Calix Cloud → Support Cloud",
          "Search subscriber by name, address, or ONT serial",
          "Check Experience Score — green (70+) vs red (<50)",
          "Review Device List for problem devices (weak signal, wrong band)",
          "Run remote Speed Test to confirm throughput to the ONT",
          "Check Event Timeline for recent reboots or outages",
          "If WiFi issue: review channel utilization and interference data",
          "Document findings in ticket before escalating or closing",
        ]} />
        <NetTip text="Always run diagnostics in Calix Cloud BEFORE asking the customer to reboot. You may already see the root cause." />
      </Card>
    </>
  );
}
