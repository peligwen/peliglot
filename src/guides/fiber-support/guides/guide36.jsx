import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, Warning, Term, StepFlow, CompareTable } from './_helpers';

export function Guide36() {
  return (
    <div>
      <DarkBox title="OPTICAL SIGNAL TROUBLESHOOTING">
        Optical power levels tell you the health of the fiber path between the <Term>OLT</Term> and
        the <Term>ONT</Term>. Learning to read and interpret these values is one of the most
        important skills for fiber support.
      </DarkBox>

      <Card color="#1565C0" title="Reading Optical Levels" subtitle="AMS (Nokia) & Calix Cloud">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333" }}>
          In <Term>AMS</Term>, navigate to the ONT and check the <Term>Optics</Term> tab.
          In <Term>Calix Cloud</Term>, open the subscriber device and look under Diagnostics → Optical.
          Key values to check:
        </p>
        <ul style={{ fontSize: 13, lineHeight: 1.8, color: "#333", paddingLeft: 20 }}>
          <li><strong style={{ color: "#0277BD" }}>ONT Rx Power:</strong> Signal received by the ONT from the OLT. Normal range: <Term>-8 to -25 dBm</Term></li>
          <li><strong style={{ color: "#0277BD" }}>ONT Tx Power:</strong> Signal transmitted by the ONT. Normal range: <Term>+0.5 to +5 dBm</Term></li>
          <li><strong style={{ color: "#0277BD" }}>OLT Rx Power:</strong> Signal the OLT receives from the ONT — useful for isolating direction of loss</li>
        </ul>
      </Card>

      <Card color="#C62828" title="Signal Level Ranges" subtitle="Know the thresholds">
        <CompareTable
          headers={["Range", "ONT Rx (dBm)", "Status", "Action"]}
          rows={[
            ["Normal", "-8 to -25", "Healthy", "No action needed"],
            ["Marginal", "-25 to -27", "Degraded", "Monitor — schedule plant review"],
            ["Warning", "-27 to -28", "At risk", "Likely service-affecting soon — create ticket"],
            ["Critical", "Below -28", "Failing", "Service impacted — dispatch tech immediately"],
          ]}
        />
        <Warning text="An ONT Rx below -27 dBm is marginal. Below -28 dBm is almost certainly causing packet loss, slow speeds, or drops." />
      </Card>

      <Card color="#00838F" title="Common Loss Sources" subtitle="What degrades optical signal">
        <ul style={{ fontSize: 13, lineHeight: 1.9, color: "#333", paddingLeft: 20 }}>
          <li><strong style={{ color: "#1a1a1a" }}>Dirty connectors</strong> — most common cause of unexpected loss; cleaning often restores signal</li>
          <li><strong style={{ color: "#1a1a1a" }}>Bad splices</strong> — a splice with high loss from poor fusion or mechanical splice</li>
          <li><strong style={{ color: "#1a1a1a" }}>Macrobends</strong> — fiber bent too tightly (around corners, staples, tight coils)</li>
          <li><strong style={{ color: "#1a1a1a" }}>Damaged fiber</strong> — crushed, cut, or rodent-chewed cable</li>
          <li><strong style={{ color: "#1a1a1a" }}>Excessive splitter loss</strong> — too many splits or a faulty splitter</li>
        </ul>
      </Card>

      <Card color="#4527A0" title="How to Check Optical Levels" subtitle="Step-by-step process">
        <StepFlow steps={[
          "Look up the customer's ONT in AMS or Calix Cloud",
          "Navigate to the optical diagnostics section",
          "Record the ONT Rx power, Tx power, and OLT Rx power",
          "Compare Rx values against the threshold table above",
          "If marginal or critical, check for alarms and recent changes",
          "Document readings in the ticket — include timestamp and values",
        ]} />
      </Card>

      <NetTip text="A sudden large drop in optical power (e.g., -15 dBm yesterday to -30 dBm today) almost always indicates a fiber cut or connector issue — not gradual degradation." />
    </div>
  );
}
