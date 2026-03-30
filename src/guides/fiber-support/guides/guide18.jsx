import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, NetworkDiagram, StepFlow, CompareTable } from './_helpers';

const smxNodes = [
  { id: "smx", icon: "🖥️", label: "Calix SMx", sub: "Provisioning Engine", detail: "Templates & profiles" },
  { id: "olt", icon: "🏢", label: "AXOS OLT", sub: "E7 / E9", detail: "Receives config push" },
  { id: "ont", icon: "🏠", label: "ONT", sub: "GigaSpire / GigaPoint", detail: "Activated by OLT" },
  { id: "cloud", icon: "☁️", label: "Calix Cloud", sub: "Analytics & Insights", detail: "Reads from SMx" },
];

const profileTypes = [
  ["Service Profile", "Defines bandwidth, VLAN, QoS for a service tier", "1G_DATA, 500M_DATA"],
  ["ONT Profile", "Maps ONT model capabilities (ports, WiFi)", "GIGASPIRE_U6, GP4221"],
  ["Voice Profile", "SIP/VoIP configuration for FXS ports", "VOICE_SIP_DEFAULT"],
  ["Video Profile", "IPTV / RF overlay settings", "VIDEO_RF_STANDARD"],
];

export function Guide18() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <>
      <DarkBox title="CALIX SMx">
        <Term>SMx</Term> (Service Management) is Calix's provisioning and configuration platform.
        It pushes service templates to AXOS OLTs and manages subscriber lifecycle from activation to decommission.
      </DarkBox>

      <Card color="#1565C0" title="How SMx Connects" subtitle="Architecture overview">
        <NetworkDiagram nodes={smxNodes} connections={["smx→olt", "olt→ont", "smx→cloud"]} title="SMx in the Network" />
        <NetTip text="SMx communicates with AXOS OLTs via NETCONF/YANG — it's not CLI-based like Nokia AMS." />
      </Card>

      <Card color="#00695C" title="Service Templates & Profiles" subtitle="Configuration building blocks">
        <p style={{ margin: "0 0 10px" }}>SMx uses a <Term>template-driven</Term> model. Instead of configuring each ONT individually, you assign pre-built profiles.</p>
        <CompareTable headers={["Profile Type", "Purpose", "Examples"]} rows={profileTypes} />
        <Insight text="Profiles are created by engineering. Support agents select and assign them — you don't build profiles from scratch." emoji="🧩" />
      </Card>

      <Card color="#4E342E" title="Subscriber Lookup in SMx" subtitle="Finding a customer">
        <StepFlow steps={[
          "Log into SMx web interface (typically https://smx.yourISP.net)",
          "Navigate to Subscribers → Search",
          "Search by name, address, ONT serial, or circuit ID",
          "Review subscriber record: service profile, ONT status, alarms",
          "Click ONT details to see registration state and optical levels",
        ]} />
        <Warning text="SMx sessions time out after ~15 minutes of inactivity. Save your work before stepping away." />
      </Card>

      <Card color="#880E4F" title="Provisioning & De-provisioning" subtitle="Lifecycle workflows">
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {["overview", "provision", "deprovision"].map(s => (
            <button key={s} onClick={() => setActiveSection(s)} style={{
              padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              background: activeSection === s ? "#880E4F" : "#f0f0f0", color: activeSection === s ? "#fff" : "#333",
            }}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
          ))}
        </div>
        {activeSection === "overview" && <p style={{ margin: 0 }}>SMx handles full subscriber lifecycle: create, provision, modify, and de-provision. Each step pushes or removes config on the OLT.</p>}
        {activeSection === "provision" && <StepFlow steps={[
          "Create subscriber record (name, address, account ID)",
          "Assign ONT serial number to subscriber",
          "Select service profile (bandwidth tier)",
          "Click Provision — SMx pushes config to OLT",
          "OLT activates ONT, subscriber gets service",
        ]} />}
        {activeSection === "deprovision" && <StepFlow steps={[
          "Open subscriber record in SMx",
          "Click De-provision — removes service config from OLT",
          "ONT goes to unprovisioned state (PON LED may blink)",
          "Optionally delete subscriber record for full cleanup",
        ]} />}
      </Card>
    </>
  );
}
