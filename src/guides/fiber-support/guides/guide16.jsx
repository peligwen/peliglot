import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, NetworkDiagram, CompareTable } from './_helpers';

const chassisOptions = [
  ["E7-2 (AXOS)", "2 RU", "Small deployments, remote cabinets"],
  ["E7-20 (AXOS)", "20-slot", "Medium to large COs"],
  ["E9-2 (AXOS)", "2 RU", "XGS-PON, next-gen platform"],
  ["E3-2 (Legacy)", "2 RU", "Older E-series, limited support"],
];

const cardTypes = [
  ["PON Card", "Houses SFP+ optics, connects to splitters/ONTs", "GPON-8, XGS-PON-4"],
  ["Uplink Card", "10GE/100GE northbound to core router", "UPL-4x10G, UPL-2x100G"],
  ["Management Card", "Runs AXOS, handles control plane", "MGMT-A (active/standby pair)"],
];

const oltNodes = [
  { id: "core", icon: "🌐", label: "Core Router", sub: "Upstream" },
  { id: "olt", icon: "🏢", label: "Calix OLT", sub: "E7-2 / E9-2", detail: "AXOS-based" },
  { id: "splitter", icon: "🔀", label: "Splitter", sub: "1:32 typical" },
  { id: "ont", icon: "🏠", label: "ONT", sub: "GigaSpire / GigaPoint" },
];

export function Guide16() {
  const [showCards, setShowCards] = useState(false);

  return (
    <>
      <DarkBox title="CALIX OLT OVERVIEW">
        Calix OLTs run the <Term>AXOS</Term> operating system and serve as the headend for GPON and XGS-PON
        fiber networks. They are managed via <Term>Calix SMx</Term> and <Term>Calix Cloud</Term>.
      </DarkBox>

      <Card color="#00695C" title="Network Position" subtitle="Where the OLT sits">
        <NetworkDiagram nodes={oltNodes} connections={["core→olt", "olt→splitter", "splitter→ont"]} title="Calix PON Architecture" />
        <NetTip text="AXOS is Calix's modern OS — if someone says 'E-series,' confirm whether it's AXOS-based or legacy CMS-based." />
      </Card>

      <Card color="#1565C0" title="Chassis Options" subtitle="Platform form factors">
        <CompareTable headers={["Platform", "Form Factor", "Use Case"]} rows={chassisOptions} />
        <Insight text="The E9-2 is Calix's newest platform, purpose-built for XGS-PON with 25G optics support." emoji="🆕" />
      </Card>

      <Card color="#4E342E" title="PON Technology Support" subtitle="GPON and XGS-PON">
        <p style={{ margin: "0 0 10px" }}>Calix AXOS platforms support both <Term>GPON</Term> (2.5G down / 1.25G up) and <Term>XGS-PON</Term> (10G symmetric).</p>
        <p style={{ margin: "0 0 10px" }}>Both technologies can coexist on the same OLT chassis using different PON cards. XGS-PON uses a different wavelength, so it can share fiber with GPON via wavelength overlay.</p>
        <Warning text="Legacy E3-2 platforms do NOT support XGS-PON. Confirm platform before quoting symmetric 10G speeds." />
      </Card>

      <Card color="#37474F" title="Card Types" subtitle="What goes in the chassis">
        <div style={{ marginBottom: 10, cursor: "pointer", color: "#1565C0", fontWeight: 600 }} onClick={() => setShowCards(!showCards)}>
          {showCards ? "▾ Hide card details" : "▸ Show card details"}
        </div>
        {showCards && <CompareTable headers={["Card Type", "Function", "Examples"]} rows={cardTypes} />}
      </Card>

      <Card color="#880E4F" title="Calix vs Nokia OLT" subtitle="Key architectural differences">
        <CompareTable
          headers={["Aspect", "Calix (AXOS)", "Nokia (ISAM)"]}
          rows={[
            ["OS", "AXOS (Linux-based)", "ISAM / FX OS"],
            ["Management", "SMx + Calix Cloud", "AMS / SAM"],
            ["Config Model", "Template-driven via SMx", "CLI + AMS profiles"],
            ["Cloud Integration", "Native (Calix Cloud)", "Limited / third-party"],
          ]}
        />
        <NetTip text="In mixed-plant networks, you'll manage Calix and Nokia OLTs from completely separate tool sets." />
      </Card>
    </>
  );
}
