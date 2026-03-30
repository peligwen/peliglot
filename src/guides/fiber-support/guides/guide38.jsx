import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { TroubleshootingSim } from './_helpers';

const steps = {
  start: {
    question: "Is the ONT powered on? (Power LED lit)",
    info: "Ask the customer to look at the ONT device — usually a small white box. Is the Power light on?",
    choices: [
      { label: "Yes — Power LED is on", next: "pon_check" },
      { label: "No — Power LED is off / all lights off", next: "power_issue" },
    ],
  },
  power_issue: {
    question: "Have the customer check the power cord and outlet. Is there a known power outage in the area?",
    info: "Check your outage management system for reported outages at this address or in this area.",
    choices: [
      { label: "Yes — there is a known power outage", next: "known_outage" },
      { label: "No outage — power should be available", next: "try_outlet" },
    ],
  },
  known_outage: {
    question: "Known power outage confirmed.",
    result: "Inform the customer of the power outage. Services will restore automatically when power returns. Set a callback if the customer wants follow-up after restoration.",
    success: true,
  },
  try_outlet: {
    question: "Ask the customer to try a different power outlet or check their breaker panel. Is the ONT power restored?",
    choices: [
      { label: "Yes — ONT powered back on", next: "pon_check" },
      { label: "No — still no power to ONT", next: "ont_power_fail" },
    ],
  },
  ont_power_fail: {
    question: "ONT will not power on despite working outlet.",
    result: "The ONT power supply or ONT itself may be defective. Create a trouble ticket for technician dispatch to replace the ONT or power adapter.",
    success: false,
  },
  pon_check: {
    question: "Check the PON LED on the ONT. Is it solid green?",
    info: "PON = Passive Optical Network. A solid green PON light means the ONT is registered with the OLT and has optical signal.",
    choices: [
      { label: "Yes — PON is solid green", next: "lan_check" },
      { label: "No — PON is off or blinking", next: "pon_issue" },
    ],
  },
  pon_issue: {
    question: "PON LED is off or blinking, indicating no optical connection. Check AMS or Calix Cloud for optical levels on this ONT.",
    choices: [
      { label: "Optical levels are bad or missing (below -27 dBm or no reading)", next: "fiber_issue" },
      { label: "Optical levels look normal (-8 to -25 dBm)", next: "pon_reboot" },
    ],
  },
  fiber_issue: {
    question: "Bad or missing optical signal detected.",
    result: "Fiber issue confirmed. Create a trouble ticket with the optical readings. Dispatch a technician for fiber repair — likely a cut, bad connector, or damaged drop.",
    success: false,
  },
  pon_reboot: {
    question: "Optical levels are normal but ONT is not registering. Try a remote reboot from AMS or Calix Cloud. Did the ONT come back and register?",
    choices: [
      { label: "Yes — ONT rebooted and PON is now solid green", next: "lan_check" },
      { label: "No — still not registering after reboot", next: "reprovision" },
    ],
  },
  reprovision: {
    question: "ONT won't register despite good optical levels and reboot.",
    result: "Possible provisioning issue or ONT hardware fault. Verify the serial number in the system matches the physical ONT. If correct, escalate to Tier 2 for reprovisioning or ONT replacement.",
    success: false,
  },
  lan_check: {
    question: "ONT is online (PON solid). Is the LAN LED lit — is a device connected to the ONT?",
    choices: [
      { label: "Yes — LAN LED is on (solid or blinking)", next: "alarm_check" },
      { label: "No — LAN LED is off", next: "no_lan" },
    ],
  },
  no_lan: {
    question: "No device detected on the ONT LAN port.",
    result: "The customer's device is not connected to the ONT. Walk the customer through connecting via Ethernet cable or verifying their router is plugged into the ONT LAN port and powered on. If using WiFi, check that the router is functioning.",
    success: true,
  },
  alarm_check: {
    question: "Check for active alarms in AMS or Calix Cloud. Are there any alarms on this ONT?",
    choices: [
      { label: "Yes — there are active alarms", next: "alarm_type" },
      { label: "No alarms found", next: "try_reboot_final" },
    ],
  },
  alarm_type: {
    question: "What type of alarm is present?",
    choices: [
      { label: "Provisioning / config mismatch alarm", next: "prov_alarm" },
      { label: "Equipment / hardware alarm", next: "equip_alarm" },
    ],
  },
  prov_alarm: {
    question: "Provisioning or configuration alarm detected.",
    result: "There is a provisioning mismatch. Verify the MSAP/service configuration matches the customer's subscription. Correct any VLAN or profile mismatches, or escalate to the provisioning team if you cannot resolve it.",
    success: true,
  },
  equip_alarm: {
    question: "Equipment or hardware alarm detected.",
    result: "Hardware alarm indicates an ONT or card issue. Create a trouble ticket for technician dispatch. The ONT may need replacement.",
    success: false,
  },
  try_reboot_final: {
    question: "No alarms found. Try rebooting the ONT remotely from AMS or Calix Cloud. Did the service restore?",
    choices: [
      { label: "Yes — customer confirms internet is working", next: "resolved" },
      { label: "No — still no service after reboot", next: "escalate" },
    ],
  },
  resolved: {
    question: "Service restored after reboot.",
    result: "Issue resolved with remote ONT reboot. Document the interaction and monitor for recurrence. If this is a repeat issue, consider scheduling a tech visit for further investigation.",
    success: true,
  },
  escalate: {
    question: "Standard troubleshooting exhausted.",
    result: "Escalate to Tier 2 / NOC. Include: customer info, optical readings, LED status, alarm history, and all steps performed. Check MSAP/service configuration and backhaul for issues.",
    success: false,
  },
};

export function Guide38() {
  return (
    <div>
      <DarkBox title="NO SERVICE DIAGNOSTICS">
        Use the interactive troubleshooting simulation below to walk through a no-internet scenario
        step by step. Each decision mirrors what you should check in a real support call.
      </DarkBox>

      <Card color="#C62828" title="Interactive Troubleshooter" subtitle="Follow the decision tree">
        <TroubleshootingSim
          title="No Internet Service"
          scenario="Customer calls reporting they have no internet service. They say all devices are affected and nothing is loading."
          steps={steps}
        />
      </Card>
    </div>
  );
}
