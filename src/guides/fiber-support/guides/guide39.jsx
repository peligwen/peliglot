import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { TroubleshootingSim } from './_helpers';

const steps = {
  start: {
    question: "Is the customer testing on WiFi or a wired (Ethernet) connection?",
    info: "This is the most important first question. WiFi introduces many variables that are outside the fiber network.",
    choices: [
      { label: "WiFi — customer is on wireless", next: "wifi" },
      { label: "Wired — customer is connected via Ethernet", next: "check_tier" },
    ],
  },
  wifi: {
    question: "Ask the customer to run a speed test with an Ethernet cable plugged directly into the ONT (or router LAN port). Is the wired speed significantly better?",
    info: "If the customer doesn't have an Ethernet cable, note that WiFi is the likely bottleneck and suggest testing with one.",
    choices: [
      { label: "Yes — wired speed is much better than WiFi", next: "wifi_issue" },
      { label: "No — wired speed is also slow", next: "check_tier" },
      { label: "Customer can't test wired right now", next: "cant_test" },
    ],
  },
  wifi_issue: {
    question: "Speed is normal on wired but slow on WiFi.",
    result: "This is a WiFi issue, not a network issue. Check: distance from router, interference from other devices, number of connected devices, router age/capability. Recommend WiFi extender, mesh system, or router upgrade if needed.",
    success: true,
  },
  cant_test: {
    question: "Customer cannot test wired at this time.",
    result: "Recommend the customer obtain an Ethernet cable and test wired speeds. If wired speed is normal, the issue is WiFi. If wired is also slow, call back for further troubleshooting. Note this in the ticket.",
    success: true,
  },
  check_tier: {
    question: "Check the customer's subscribed speed tier in iVue. What tier are they on?",
    info: "Knowing the expected speed is essential before you can determine if there's actually a problem.",
    choices: [
      { label: "Found the speed tier — proceeding to speed test", next: "speed_test" },
    ],
  },
  speed_test: {
    question: "Run or review a speed test. Is the result significantly below the subscribed speed (less than 80% of the tier)?",
    info: "Example: If subscribed to 500 Mbps and getting less than 400 Mbps on wired, that's below 80%.",
    choices: [
      { label: "Yes — speed is well below subscribed tier", next: "check_optical" },
      { label: "No — speed is within 80-100% of tier", next: "speed_normal" },
    ],
  },
  speed_normal: {
    question: "Speed test results are within normal range for the subscribed tier.",
    result: "Speed is within acceptable range. Educate the customer: advertised speeds are 'up to' maximums, WiFi is often the bottleneck, and multiple devices share bandwidth. If they want faster service, discuss tier upgrades.",
    success: true,
  },
  check_optical: {
    question: "Check optical levels in AMS or Calix Cloud. Are they in the normal range (-8 to -25 dBm)?",
    choices: [
      { label: "Yes — optical levels are normal", next: "check_profile" },
      { label: "No — optical levels are marginal or bad (below -25 dBm)", next: "optical_issue" },
    ],
  },
  optical_issue: {
    question: "Marginal or bad optical signal detected.",
    result: "Degraded optical signal is likely affecting throughput. Create a trouble ticket with the optical readings and subscribed speed tier. Dispatch a technician to investigate the fiber plant — possible dirty connector, bad splice, or damaged fiber.",
    success: false,
  },
  check_profile: {
    question: "Optical levels are fine. Check the MSAP/service profile in AMS or Calix Cloud. Does the bandwidth profile match the customer's subscribed speed tier?",
    choices: [
      { label: "Yes — profile matches subscription", next: "profile_matches" },
      { label: "No — profile doesn't match (wrong speed configured)", next: "profile_mismatch" },
    ],
  },
  profile_mismatch: {
    question: "Bandwidth profile does not match the customer's subscription.",
    result: "The MSAP or service profile has the wrong bandwidth setting. Correct the profile to match the subscribed tier, or escalate to the provisioning team if you don't have access. Retest after correction.",
    success: true,
  },
  profile_matches: {
    question: "Configuration looks correct — optical levels normal, profile matches subscription, but speed is still low.",
    result: "Escalate to network engineering. Possible causes: PON congestion (too many subscribers on one PON port), backhaul capacity issue, or OLT performance problem. Include all readings and test results in the escalation.",
    success: false,
  },
};

export function Guide39() {
  return (
    <div>
      <DarkBox title="SLOW SPEED DIAGNOSTICS">
        Slow speed complaints are one of the most common calls. The key is to isolate whether the
        issue is WiFi, the customer's equipment, or actually in the fiber network.
      </DarkBox>

      <Card color="#E65100" title="Interactive Troubleshooter" subtitle="Follow the decision tree">
        <TroubleshootingSim
          title="Slow Internet Speed"
          scenario="Customer reports slow internet speeds. They say web pages load slowly and streaming video keeps buffering."
          steps={steps}
        />
      </Card>
    </div>
  );
}
