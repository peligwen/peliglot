import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { SupportTip, Term, TroubleshootingSim } from './_helpers';

const noDialToneSteps = {
  start: {
    question: "Is the ONT power LED on?",
    info: "Check the ONT device — the Power LED should be solid green.",
    choices: [
      { label: "Yes, power LED is on", next: "phone_led" },
      { label: "No, power LED is off", next: "power_issue" },
    ],
  },
  power_issue: {
    question: "Check power to the ONT. Is there a power outage in the area?",
    choices: [
      { label: "Yes, area outage confirmed", next: "outage_result" },
      { label: "No outage — ONT still has no power", next: "ont_power_result" },
    ],
  },
  outage_result: {
    result: "Power outage confirmed. Phone service will restore when power returns. If the customer has a battery backup (BBU), check that it is charged and connected.",
    success: false,
  },
  ont_power_result: {
    result: "ONT is not receiving power despite no area outage. Check the power adapter and outlet. If using a BBU, try bypassing it. If the ONT still won't power on, it may need replacement — schedule a truck roll.",
    success: false,
  },
  phone_led: {
    question: "Is the Phone/POTS LED on the ONT solid green?",
    info: "This LED indicates the FXS port is active and registered with the voice platform.",
    choices: [
      { label: "Yes, Phone LED is solid green", next: "platform_check" },
      { label: "No, Phone LED is off or blinking", next: "vlan_issue" },
    ],
  },
  vlan_issue: {
    result: "The Phone/POTS LED is not active. Check voice VLAN provisioning on the OLT and verify the ONT FXS port configuration. Re-provision the voice VLAN if needed. If the LED still does not come up, the ONT FXS port may be faulty.",
    success: false,
  },
  platform_check: {
    question: "Can you see the subscriber active in the voice platform (MetaView or Alianza)?",
    info: "Look up the subscriber's DN in the appropriate platform and check registration status.",
    choices: [
      { label: "Yes, subscriber is registered", next: "test_call" },
      { label: "No, subscriber not found or unregistered", next: "provision_result" },
    ],
  },
  provision_result: {
    result: "Subscriber is not active on the voice platform. Verify the service order in iVue is complete and that provisioning was sent to the correct platform (Metaswitch or Alianza). Re-push provisioning if needed.",
    success: false,
  },
  test_call: {
    question: "Try a test call. What do you hear?",
    info: "Call the subscriber's number from another phone, and have the subscriber try an outbound call.",
    choices: [
      { label: "One-way audio (only one side can hear)", next: "oneway_result" },
      { label: "No audio at all", next: "noaudio_result" },
      { label: "Calls work correctly", next: "success_result" },
    ],
  },
  oneway_result: {
    result: "One-way audio is typically caused by a NAT/firewall issue or SIP ALG interference. Disable SIP ALG on any router in the path. Also check that RTP ports are not being blocked. If the issue persists, escalate to voice platform engineering.",
    success: false,
  },
  noaudio_result: {
    result: "No audio in either direction suggests an RTP stream failure. Verify codec negotiation and check for firewall rules blocking UDP media ports. This may require voice platform support escalation to analyze SIP/RTP traces.",
    success: false,
  },
  success_result: {
    result: "Calls are working correctly. The issue may have been intermittent. Document the troubleshooting steps taken and monitor. If the customer reports the issue again, collect specific times and numbers for deeper analysis.",
    success: true,
  },
};

const quickRef = [
  { issue: "One-Way Audio", cause: "NAT/firewall blocking RTP, or SIP ALG enabled on router", fix: "Disable SIP ALG, check firewall rules for UDP media ports" },
  { issue: "Static / Noise", cause: "Poor cabling from ONT to phone jack, or damaged RJ-11 cable", fix: "Replace patch cable, check house wiring, test with phone plugged directly into ONT" },
  { issue: "Echo on Calls", cause: "Impedance mismatch or acoustic feedback on handset", fix: "Try a different phone. If echo persists, check for line voltage issues at the ONT FXS port" },
  { issue: "Caller ID Not Showing", cause: "CNAM feature not enabled, or calling party not sending CNAM", fix: "Verify Caller ID feature is enabled in MetaView/Alianza. External CNAM depends on the originating carrier" },
  { issue: "Calls Drop After 30s", cause: "SIP session timer or re-INVITE failure", fix: "Check SIP session timer settings on voice platform. May need platform engineering support" },
  { issue: "Cannot Receive Calls", cause: "Call forwarding enabled or DND active", fix: "Check for unconditional call forwarding or Do-Not-Disturb in the subscriber's feature settings" },
];

export function Guide27() {
  return (
    <>
      <DarkBox title="PHONE SERVICE TROUBLESHOOTING">
        Systematic troubleshooting for voice issues follows the signal path: power, ONT, VLAN,
        voice platform, then call quality. Use the interactive simulator below to practice.
      </DarkBox>

      <Card color="#C62828" title="No Dial Tone Troubleshooting" subtitle="Interactive decision tree">
        <TroubleshootingSim
          title="No Dial Tone"
          scenario="Customer reports no dial tone on their home phone."
          steps={noDialToneSteps}
        />
      </Card>

      <Card color="#1565C0" title="Common Phone Issues" subtitle="Quick reference guide">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {quickRef.map((item, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 14, border: "1px solid #AED6F1" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#C62828", marginBottom: 6 }}>{item.issue}</div>
              <div style={{ fontSize: 12, color: "#333", lineHeight: 1.5, marginBottom: 4 }}>
                <Term>Cause:</Term> {item.cause}
              </div>
              <div style={{ fontSize: 12, color: "#A5D6A7", lineHeight: 1.5 }}>
                <Term color="#66BB6A">Fix:</Term> {item.fix}
              </div>
            </div>
          ))}
        </div>
        <SupportTip text="For persistent audio quality issues, ask the customer to test with a different phone plugged directly into the ONT. This isolates house wiring from the equation." />
      </Card>
    </>
  );
}
