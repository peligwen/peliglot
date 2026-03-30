import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Warning, NetTip, Term, StepFlow, CompareTable } from './_helpers';

export function Guide41() {
  return (
    <div>
      <DarkBox title="PROVISIONING ISSUES">
        Provisioning connects the physical ONT to the network services. When provisioning
        fails, the customer has hardware but no service. These issues are common and usually fixable.
      </DarkBox>

      <Card color="#C62828" title="Common Provisioning Failures" subtitle="Issues and how to fix them">
        <CompareTable
          headers={["Issue", "What to Check", "Fix"]}
          rows={[
            ["ONT not discovered", "Port assignment, fiber continuity, ONT power", "Verify correct OLT port; check fiber; confirm ONT is powered and PON LED blinking"],
            ["Serial number mismatch", "Serial in system vs. physical ONT label", "Re-enter correct serial from the ONT sticker; watch for O vs 0, I vs 1"],
            ["MSAP config error", "VLAN assignment, QoS profile", "Correct the VLAN and bandwidth profile to match the service order"],
            ["Service not activating", "Order status in iVue, provisioning engine logs", "Check if order is stuck; resubmit or manually provision if needed"],
            ["Speed tier mismatch", "Bandwidth profile vs. subscription", "Update the MSAP bandwidth profile to match the customer's subscribed tier"],
          ]}
        />
      </Card>

      <Card color="#1565C0" title="Diagnosing a Provisioning Failure" subtitle="Step-by-step process">
        <StepFlow steps={[
          "Confirm the ONT is powered on and has optical signal (PON LED blinking or solid)",
          "Verify the serial number in the system matches the physical ONT exactly",
          "Check the OLT port assignment — is the ONT on the correct port?",
          "Review the MSAP/service configuration for correct VLAN and bandwidth profile",
          "Check the order status in iVue — is it complete or stuck in a workflow step?",
          "If all looks correct, try deleting and re-creating the ONT provisioning",
          "If re-provisioning fails, escalate to the provisioning team with all details",
        ]} />
      </Card>

      <Card color="#00838F" title="Serial Number Verification" subtitle="The most common provisioning mistake">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", marginBottom: 12 }}>
          A wrong <Term>serial number</Term> is the single most common provisioning failure. The system
          cannot match the physical ONT to its configuration if the serial is wrong.
        </p>
        <ul style={{ fontSize: 13, lineHeight: 1.9, color: "#333", paddingLeft: 20 }}>
          <li>Always verify against the <strong style={{ color: "#1a1a1a" }}>physical label</strong> on the ONT — not a work order printout</li>
          <li>Watch for common typos: <Term>O</Term> vs <Term>0</Term>, <Term>I</Term> vs <Term>1</Term> vs <Term>l</Term></li>
          <li>Nokia serials are typically <Term>ALCL</Term> + 8 hex characters</li>
          <li>Calix serials vary by model — check the barcode label</li>
        </ul>
        <Warning text="Always verify the serial number on the physical ONT before reprovisioning. A mismatched serial is the #1 cause of 'ONT not discovered' issues." />
      </Card>

      <NetTip text="If an ONT was recently swapped, the old serial may still be in the system. Delete the old entry before provisioning the new ONT." />
    </div>
  );
}
