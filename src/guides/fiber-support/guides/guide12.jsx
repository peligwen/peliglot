import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, Warning, Term, StepFlow, CompareTable } from './_helpers';

const severities = [
  { level: "Critical", color: "#D32F2F", icon: "🔴", desc: "Service-affecting, immediate action required (e.g., shelf down, NT failure)" },
  { level: "Major", color: "#E64A19", icon: "🟠", desc: "Significant degradation (e.g., line card failed, multiple ONTs offline)" },
  { level: "Minor", color: "#FBC02D", icon: "🟡", desc: "Non-critical issue (e.g., single PSU loss, SFP Rx power marginal)" },
  { level: "Warning", color: "#1976D2", icon: "🔵", desc: "Informational (e.g., ONT firmware mismatch, config sync pending)" },
];

const commonAlarms = [
  ["LOSi", "Loss of Signal (individual)", "Single ONT lost fiber light", "Check fiber at ONT, patch panel, splitter"],
  ["LOS", "Loss of Signal (port-level)", "Entire PON port has no signal", "Check OLT SFP, trunk fiber to splitter"],
  ["Dying Gasp", "ONT power loss", "ONT sent final message before losing power", "Customer power outage — wait or check outlet"],
  ["SUFi", "Start-Up Failure", "ONT cannot complete registration", "Verify serial in AMS, check ONT authentication"],
  ["SD / SF", "Signal Degrade / Signal Fail", "Rx power below threshold", "Fiber degradation — dispatch tech for OTDR test"],
  ["Equipment Failure", "Hardware fault on card/ONT", "Self-test failure detected", "Swap affected hardware"],
];

export function Guide12() {
  const [selSev, setSelSev] = useState(null);

  return (
    <div>
      <DarkBox title="NOKIA AMS — ALARM MANAGEMENT SYSTEM">
        <Term>AMS</Term> is Nokia's network management system for the ISAM platform. It provides
        device configuration, alarm monitoring, ONT provisioning, and performance data — the
        primary tool support agents use to diagnose fiber network issues.
      </DarkBox>

      <Card color="#1565C0" title="AMS Navigation" subtitle="Key areas for support agents">
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8, marginBottom: 12 }}>
          <strong>Device Tree (left panel):</strong> Hierarchical view — Region &gt; OLT &gt; Shelf &gt; Slot &gt; Port &gt; ONT<br />
          <strong>Alarm List (bottom panel):</strong> Live alarm feed with severity, source, timestamp, description<br />
          <strong>ONT Status (right-click &gt; Properties):</strong> Operational data including Rx/Tx power, uptime, firmware<br />
          <strong>Search (Ctrl+F):</strong> Find ONTs by serial number, subscriber ID, or port address
        </div>
        <NetTip text="Always start with the ONT serial number. Ctrl+F in AMS, paste the serial, and it navigates directly to that ONT in the device tree." />
      </Card>

      <Card color="#C62828" title="Alarm Severities" subtitle="Tap to see details">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {severities.map(s => (
            <button key={s.level} onClick={() => setSelSev(selSev === s.level ? null : s.level)}
              style={{ padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700,
                background: selSev === s.level ? s.color + "22" : "#f5f5f5",
                color: selSev === s.level ? s.color : "#666",
                border: `1px solid ${selSev === s.level ? s.color : "#ddd"}` }}>
              {s.icon} {s.level}
            </button>
          ))}
        </div>
        {selSev && (() => {
          const s = severities.find(x => x.level === selSev);
          return <p style={{ fontSize: 13, color: "#555", padding: "10px 14px", background: s.color + "0D", border: `1px solid ${s.color}33`, borderRadius: 8, marginBottom: 12 }}>
            <strong style={{ color: s.color }}>{s.level}:</strong> {s.desc}
          </p>;
        })()}
      </Card>

      <Card color="#E64A19" title="Common Alarms Reference">
        <CompareTable
          headers={["Alarm", "Full Name", "Meaning", "First Action"]}
          rows={commonAlarms}
        />
        <Warning text="A burst of 'Dying Gasp' alarms from the same OLT area likely means a power outage in that neighborhood — check with the utility before dispatching a tech." />
      </Card>

      <Card color="#00838F" title="ONT Lookup Procedure">
        <StepFlow steps={[
          "Open AMS and press Ctrl+F to open the search dialog",
          "Enter the ONT serial number (e.g., ALCL:A1B2C3D4) and click Search",
          "AMS highlights the ONT in the device tree — note the full path (rack/shelf/slot/port/ont-id)",
          "Right-click the ONT and select 'Properties' to view operational data",
          "Check key fields: Admin Status, Oper Status, Rx Power (dBm), Uptime, SW Version",
          "If Rx Power is below -27 dBm, the fiber signal is weak — possible plant issue",
        ]} />
      </Card>

      <Card color="#6A1B9A" title="Reading ONT Operational Data">
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8, marginBottom: 12 }}>
          <strong>Rx Power:</strong> Signal strength received at the ONT. Normal range: <Term>-8 to -25 dBm</Term>. Below -27 dBm = degraded.<br />
          <strong>Tx Power:</strong> Signal the ONT transmits upstream. Normal: <Term>+0.5 to +5 dBm</Term>.<br />
          <strong>Uptime:</strong> Time since last reboot. Frequent reboots (&lt;24h uptime) suggest power or hardware issues.<br />
          <strong>SW Version:</strong> ONT firmware. Mismatched versions may cause feature gaps — check if an upgrade is pending.
        </div>
        <NetTip text="When a customer reports intermittent drops, compare the ONT uptime with the reported issue timeline. Short uptime confirms the ONT is rebooting." />
      </Card>
    </div>
  );
}
