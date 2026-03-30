import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, CompareTable } from './_helpers';

const oltComparison = [
  ["Platform", "ISAM 7360 / 7362", "E7-2, E7-20, E9-2"],
  ["Operating System", "ISAM FX / FD", "AXOS (Linux-based)"],
  ["PON Support", "GPON, XGS-PON, NG-PON2", "GPON, XGS-PON"],
  ["Form Factors", "FX-4/8/16, ISAM-7362", "2 RU and 20-slot chassis"],
  ["CLI Access", "TL1 and CLI", "CLI (Calix-style) via SMx"],
];

const managementComparison = [
  ["Provisioning Tool", "AMS (5529 / SAM)", "SMx"],
  ["Cloud Analytics", "Nokia SAM / third-party", "Calix Cloud (native)"],
  ["Customer App", "None (third-party needed)", "CommandIQ"],
  ["Config Method", "CLI + AMS templates", "SMx templates via NETCONF"],
  ["Alarm Platform", "AMS alarm browser", "Calix Cloud + SMx alarms"],
];

const terminologyMap = [
  ["MSAP", "Service Profile", "Defines subscriber service parameters"],
  ["AMS / SAM", "SMx / Calix Cloud", "Network management platform"],
  ["ONTID / SLID", "ONT Serial (CXNK...)", "Subscriber line identifier"],
  ["QoS Profile", "Service Profile", "Bandwidth and priority settings"],
  ["TL1 commands", "NETCONF/YANG", "Southbound config protocol"],
  ["Equipment Template", "ONT Profile", "ONT model capability mapping"],
  ["VLAN Bridge Port", "Service VLAN", "Traffic encapsulation"],
  ["Alarm Correlation", "Operations Cloud", "Proactive outage detection"],
];

const workflowComparison = [
  ["Create subscriber", "AMS → Equipment → Create MSAP", "SMx → Subscribers → New"],
  ["Assign ONT", "Enter SLID/serial in AMS", "Enter CXNK serial in SMx"],
  ["Push config", "AMS pushes via TL1/SNMP", "SMx pushes via NETCONF"],
  ["Verify service", "Check AMS alarms + CLI", "Check Calix Cloud score + SMx status"],
  ["Troubleshoot", "AMS alarm browser + CLI", "Support Cloud diagnostics"],
];

export function Guide21() {
  return (
    <>
      <DarkBox title="NOKIA vs CALIX">
        In mixed-plant networks, support agents must work with both <Term>Nokia ISAM</Term> and <Term>Calix AXOS</Term> platforms.
        This guide maps concepts, tools, and terminology between the two ecosystems.
      </DarkBox>

      <Card color="#1565C0" title="OLT Platform Comparison" subtitle="Hardware side-by-side">
        <CompareTable headers={["Aspect", "Nokia", "Calix"]} rows={oltComparison} />
      </Card>

      <Card color="#00695C" title="Management Tools" subtitle="Software and provisioning">
        <CompareTable headers={["Function", "Nokia", "Calix"]} rows={managementComparison} />
        <Insight text="Calix Cloud gives support agents subscriber-level diagnostics out of the box. Nokia typically requires more CLI work or third-party tools." emoji="🔍" />
      </Card>

      <Card color="#6A1B9A" title="Terminology Mapping" subtitle="Nokia term → Calix equivalent">
        <CompareTable headers={["Nokia Term", "Calix Equivalent", "What It Means"]} rows={terminologyMap} />
        <NetTip text="Print or bookmark this mapping. In mixed-plant calls, translating terminology quickly prevents confusion and speeds resolution." />
      </Card>

      <Card color="#E65100" title="Provisioning Workflow" subtitle="Same goal, different steps">
        <CompareTable headers={["Step", "Nokia (AMS)", "Calix (SMx)"]} rows={workflowComparison} />
        <Warning text="Never try to provision a Calix ONT from Nokia AMS or vice versa. Each OLT vendor has its own management stack." />
      </Card>

      <Card color="#37474F" title="Mixed-Plant Best Practices" subtitle="Working with both systems">
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.9 }}>
          <li>Identify the <Term>OLT vendor</Term> first — check the circuit ID or address lookup to determine Nokia vs Calix</li>
          <li>Keep both AMS and SMx/Calix Cloud open in separate browser tabs</li>
          <li>Use the correct serial format: Nokia uses ALCL/SMBS prefix, Calix uses CXNK prefix</li>
          <li>Alarms look different in each system — learn both alarm browsers</li>
          <li>Escalation paths may differ: Nokia issues go to Nokia TAC, Calix issues go to Calix TAC</li>
        </ul>
        <NetTip text="Quick vendor ID: if the ONT serial starts with CXNK it's Calix, if it starts with ALCL or SMBS it's Nokia." />
      </Card>
    </>
  );
}
