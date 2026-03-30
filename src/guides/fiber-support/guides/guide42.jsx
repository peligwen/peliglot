import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Warning, SupportTip, NetTip, Term, StepFlow, CompareTable } from './_helpers';

export function Guide42() {
  return (
    <div>
      <DarkBox title="FIBER CUT RESPONSE">
        A fiber cut is a high-impact event that can take out service for dozens or hundreds of
        customers at once. Fast identification, clear communication, and organized response are critical.
      </DarkBox>

      <Card color="#C62828" title="Signs of a Fiber Cut" subtitle="How to recognize one">
        <ul style={{ fontSize: 13, lineHeight: 1.9, color: "#B0BEC5", paddingLeft: 20 }}>
          <li><strong style={{ color: "#EF5350" }}>Multiple LOSi/LOS alarms</strong> from the same geographic area or OLT port simultaneously</li>
          <li><strong style={{ color: "#EF5350" }}>Sudden loss</strong> across many customers — not gradual degradation</li>
          <li><strong style={{ color: "#EF5350" }}>Alarm storm</strong> — a burst of alarms within seconds or minutes</li>
          <li><strong style={{ color: "#EF5350" }}>Complete signal loss</strong> — optical readings show no light, not just low levels</li>
        </ul>
        <Warning text="Do not treat a fiber cut as individual ONT issues. If you see multiple LOSi alarms on the same PON port, think upstream first." />
      </Card>

      <Card color="#1565C0" title="Identifying the Scope" subtitle="How big is this outage?">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#B0BEC5", marginBottom: 12 }}>
          Quickly determine how many customers are affected and where the break likely is:
        </p>
        <CompareTable
          headers={["Check", "How", "What It Tells You"]}
          rows={[
            ["OLT port status", "Check the PON port in AMS/Calix Cloud", "If port shows LOS, feeder fiber is cut"],
            ["Affected ONT count", "List all ONTs on the port; check which are down", "Scope of impact — partial vs. full port outage"],
            ["Geographic mapping", "Plot affected addresses on a map", "Narrows the cut location to a specific route"],
            ["Splitter check", "Are all ONTs after a certain splitter down?", "Cut may be between OLT and that splitter"],
          ]}
        />
      </Card>

      <Card color="#4527A0" title="Fiber Cut Response Process" subtitle="Step-by-step response">
        <StepFlow steps={[
          "Identify: Confirm it's a fiber cut — multiple alarms, geographic correlation, complete signal loss",
          "Assess: Count affected customers, identify the OLT port(s) and fiber route involved",
          "Report: Create a major outage ticket — include scope, affected addresses, alarm data, and optical readings",
          "Escalate: Notify plant operations / outside plant team immediately for dispatch",
          "Communicate: Update affected customer tickets with outage notice and estimated restoration time",
          "Track: Monitor the outage ticket for updates from the field team",
          "Verify: Once repaired, confirm all ONTs are back online and optical levels are normal",
        ]} />
      </Card>

      <Card color="#00838F" title="Customer Communication" subtitle="What to tell affected customers">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#B0BEC5", marginBottom: 12 }}>
          When customers call during a fiber cut:
        </p>
        <ul style={{ fontSize: 13, lineHeight: 1.9, color: "#B0BEC5", paddingLeft: 20 }}>
          <li>Acknowledge the outage — <Term>do not troubleshoot individual ONTs</Term> during a known cut</li>
          <li>Provide an estimated restoration time if available (or say "our team is working on it")</li>
          <li>Offer a callback or note the customer wants follow-up when service is restored</li>
          <li>Document the call — link it to the master outage ticket</li>
        </ul>
        <NetTip text="Keep notes on which customers called so you can proactively follow up after restoration. This builds trust." />
      </Card>

      <SupportTip text="Keep a map of your fiber routes handy — either a GIS tool or a printed route map. Correlating outage locations against known routes helps pinpoint the cut faster." />
    </div>
  );
}
