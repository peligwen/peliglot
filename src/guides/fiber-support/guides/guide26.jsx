import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, SupportTip, Warning, Term, StepFlow } from './_helpers';

const activationSteps = [
  "Service order created in iVue with voice product and phone number (new or ported).",
  "Phone number (DN) is assigned or reserved for porting from the previous carrier.",
  "Voice platform is provisioned — subscriber created in Metaswitch, Alianza, or Momentum.",
  "ONT FXS port is activated and voice VLAN is configured on the access network.",
  "E911 address is registered with the PSAG (Public Safety Answering Point) database.",
  "Dial tone is verified — technician or agent makes a test call to confirm service.",
];

const portingSteps = [
  "Customer submits LOA (Letter of Authorization) to authorize the port.",
  "Losing carrier is notified via LSR (Local Service Request).",
  "FOC (Firm Order Commitment) date is set — typically 3-7 business days.",
  "On the FOC date, the number is ported to the new switch/platform.",
  "Verify the ported number is active and calls route correctly.",
];

export function Guide26() {
  return (
    <>
      <DarkBox title="VOICE PROVISIONING WORKFLOWS">
        End-to-end voice activation involves multiple systems working together: <Term>iVue</Term> for
        order management, the <Term>voice platform</Term> (Metaswitch/Alianza/Momentum) for call
        control, and the <Term>ONT</Term> for last-mile connectivity.
      </DarkBox>

      <Card color="#1565C0" title="Voice Activation Flow" subtitle="From order to dial tone">
        <StepFlow steps={activationSteps} />
        <NetTip text="The voice VLAN is separate from data and video VLANs. It receives QoS priority to ensure call quality." />
      </Card>

      <Card color="#00838F" title="Voice VLAN Setup" subtitle="Network configuration for phone service">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#ccc" }}>
          The ONT's <Term>FXS port</Term> must be mapped to the correct voice VLAN. This is
          configured in the OLT (Optical Line Terminal) provisioning and ensures voice traffic
          is tagged and prioritized separately from data traffic. Without the correct VLAN
          assignment, the phone will not register with the voice platform.
        </p>
        <SupportTip text="If a customer has dial tone issues after a new install, check the voice VLAN assignment first — it's the most common provisioning miss." />
      </Card>

      <Card color="#6A1B9A" title="Number Porting (LNP)" subtitle="Local Number Portability process">
        <p style={{ fontSize: 13, lineHeight: 1.6, color: "#ccc", marginBottom: 12 }}>
          <Term>LNP (Local Number Portability)</Term> allows customers to keep their existing phone
          number when switching providers. The process involves coordination between the winning
          and losing carriers.
        </p>
        <StepFlow steps={portingSteps} color="#CE93D8" />
        <Warning text="Do not disconnect the customer's old service before the port completes. Early disconnection can cause the port to fail and the number may be lost." />
      </Card>

      <Card color="#C62828" title="E911 Registration" subtitle="Critical safety requirement">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#ccc" }}>
          Every voice line must have a verified <Term>E911 address</Term> registered in the ALI
          (Automatic Location Identification) database. When a subscriber dials 911, this address
          is sent to the dispatcher so emergency services can locate the caller.
        </p>
        <Warning text="ALWAYS verify the E911 address is correct and registered before closing a voice activation order. An incorrect or missing E911 address is a life-safety issue." />
        <SupportTip text="If a customer moves within the service area, their E911 address must be updated even if the phone number stays the same." />
      </Card>
    </>
  );
}
