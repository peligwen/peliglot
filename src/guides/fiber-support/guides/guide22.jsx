import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, Term, CompareTable, StepFlow } from './_helpers';

const platformRows = [
  ["Type", "On-prem softswitch", "Cloud voice", "UCaaS"],
  ["Typical Customer", "Residential", "Residential", "Business"],
  ["Management Tool", "MetaView", "Alianza Portal", "Momentum Portal"],
  ["Key Use", "Traditional phone lines", "Cloud-hosted voice", "Hosted PBX + collaboration"],
];

const provSteps = [
  <><Term>iVue order</Term> — service order created with voice package and phone number</>,
  <><Term>Voice platform config</Term> — subscriber provisioned in Metaswitch, Alianza, or Momentum</>,
  <><Term>ONT FXS port activation</Term> — physical port enabled and mapped to voice VLAN</>,
  <><Term>Dial tone</Term> — customer picks up the phone and has service</>,
];

export function Guide22() {
  return (
    <>
      <DarkBox title="VOICE SYSTEMS OVERVIEW">
        Your network supports phone service through multiple voice platforms.
        Each handles different customer types and scenarios.
      </DarkBox>

      <Card color="#6A1B9A" title="Platform Comparison" subtitle="Metaswitch vs Alianza vs Momentum">
        <CompareTable
          headers={["Feature", "Metaswitch", "Alianza", "Momentum"]}
          rows={platformRows}
          colors={["#6A1B9A", "#00838F", "#E65100"]}
        />
      </Card>

      <Card color="#00695C" title="Voice Provisioning Flow" subtitle="From order to dial tone">
        <StepFlow steps={provSteps} color="#00695C" />
      </Card>

      <Card color="#0277BD" title="Voice VLAN Basics" subtitle="Dedicated network treatment">
        <p style={{ fontSize: 14, lineHeight: 1.8, color: "#333", margin: 0 }}>
          Voice traffic gets its own <Term>VLAN</Term> (e.g. VLAN 200), separate from data
          and video. This VLAN is tagged with <Term>QoS priority</Term> markings so voice
          packets receive preferential treatment — minimizing latency and jitter for
          clear call quality.
        </p>
      </Card>

      <NetTip text="For phone troubleshooting, the next guide has an interactive decision tree." />
    </>
  );
}
