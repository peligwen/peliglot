import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Warning, Term, StepFlow, CompareTable, NetworkDiagram } from './_helpers';

const provisioningNodes = [
  { id: "smx", icon: "🖥️", label: "SMx", sub: "Create subscriber", detail: "Assign profile + serial" },
  { id: "olt", icon: "🏢", label: "OLT", sub: "Receives config", detail: "NETCONF push" },
  { id: "ont", icon: "🏠", label: "ONT", sub: "Activates", detail: "Pulls config from OLT" },
  { id: "cloud", icon: "☁️", label: "Calix Cloud", sub: "Confirms online", detail: "Score appears" },
];

const commonIssues = [
  ["ONT not discovered", "Fiber not connected, dirty connector, bad splitter port", "Check physical layer first"],
  ["Serial mismatch", "Wrong serial entered in SMx", "Verify serial on ONT label matches SMx"],
  ["Profile push fails", "OLT unreachable from SMx, NETCONF timeout", "Check SMx-to-OLT connectivity"],
  ["ONT stuck in 'provisioning'", "Config conflict or ONT firmware mismatch", "Re-push profile or update firmware"],
  ["Service active but no internet", "VLAN mismatch or DHCP issue on upstream", "Verify VLAN config and DHCP relay"],
];

export function Guide20() {
  const [mode, setMode] = useState("manual");

  return (
    <>
      <DarkBox title="CALIX ONT PROVISIONING">
        Provisioning is the process of creating a subscriber in <Term>SMx</Term>, assigning a service profile and
        ONT serial number, and pushing the configuration to the <Term>AXOS OLT</Term> so the ONT activates.
      </DarkBox>

      <Card color="#1565C0" title="Provisioning Flow" subtitle="End-to-end path">
        <NetworkDiagram nodes={provisioningNodes} connections={["smx→olt", "olt→ont", "ont→cloud"]} title="Provisioning Path" />
      </Card>

      <Card color="#00695C" title="Provisioning Methods" subtitle="Manual vs auto-discovery">
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {["manual", "auto"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              background: mode === m ? "#00695C" : "#f0f0f0", color: mode === m ? "#fff" : "#333",
            }}>{m === "manual" ? "Manual Provisioning" : "Auto-Discovery"}</button>
          ))}
        </div>
        {mode === "manual" && (
          <StepFlow steps={[
            "Create subscriber record in SMx (name, address, account ID)",
            "Enter ONT serial number (CXNK + 8 hex chars from label)",
            "Select service profile (e.g., 1G_DATA) and ONT profile",
            "Assign voice profile if FXS lines are needed",
            "Click Provision — SMx pushes config via NETCONF to OLT",
            "OLT recognizes ONT serial, applies config, ONT activates",
            "Verify in Calix Cloud: ONT online, Experience Score populates",
          ]} />
        )}
        {mode === "auto" && (
          <>
            <p style={{ margin: "0 0 10px", fontSize: 14 }}>
              With <Term>auto-discovery</Term>, the OLT detects an unknown ONT on a PON port and reports it to SMx.
              The agent then matches it to a subscriber record.
            </p>
            <StepFlow steps={[
              "ONT is connected to fiber and powers on",
              "OLT detects unknown serial on PON port, reports to SMx",
              "Agent sees unprovisioned ONT in SMx discovery queue",
              "Agent links ONT to existing subscriber record",
              "Assigns service profile and provisions — same result as manual",
            ]} />
            <Insight text="Auto-discovery saves time when the install tech hooks up the ONT before the office provisions it." emoji="⚡" />
          </>
        )}
      </Card>

      <Card color="#C62828" title="Common Provisioning Issues" subtitle="Troubleshooting failures">
        <CompareTable headers={["Problem", "Likely Cause", "Fix"]} rows={commonIssues} />
        <Warning text="Never delete and recreate a subscriber record to fix a provisioning issue — you may lose voice config and billing data. Re-push the profile first." />
      </Card>
    </>
  );
}
