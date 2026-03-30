import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, Warning, Term, CompareTable } from './_helpers';

const chassisData = [
  ["Form Factor", "FX-4", "FX-8", "FX-16"],
  ["LT Slots", "4", "8", "16"],
  ["NT Slots", "2 (redundant)", "2 (redundant)", "2 (redundant)"],
  ["Power Supplies", "2x -48VDC", "2x -48VDC", "4x -48VDC"],
  ["Backplane", "40 Gbps", "80 Gbps", "160 Gbps"],
  ["Typical Deploy", "MDU / Cabinet", "Central Office", "Large CO / Hub"],
];

export function Guide9() {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = [
    { id: "PS", label: "PWR", color: "#F44336", detail: "-48VDC redundant power shelf" },
    { id: "NT-A", label: "NT-A", color: "#1565C0", detail: "Primary Network Terminal — uplinks, CPU, control plane" },
    { id: "NT-B", label: "NT-B", color: "#1565C0", detail: "Standby Network Terminal — automatic failover if NT-A fails" },
    { id: "LT1", label: "LT-1", color: "#2E7D32", detail: "Line Terminal slot 1 — houses PON line card" },
    { id: "LT2", label: "LT-2", color: "#2E7D32", detail: "Line Terminal slot 2" },
    { id: "LT3", label: "LT-3", color: "#2E7D32", detail: "Line Terminal slot 3" },
    { id: "LT4", label: "LT-4", color: "#2E7D32", detail: "Line Terminal slot 4" },
  ];

  const sel = slots.find(s => s.id === selectedSlot);

  return (
    <>
      <DarkBox title="NOKIA 7360 ISAM FX">
        The <Term>7360 ISAM FX</Term> (Intelligent Services Access Manager, Fiber Extension) is Nokia's
        modular OLT chassis for FTTH deployments. It aggregates PON traffic from thousands of subscribers
        and forwards it to the core network via 10GE/100GE uplinks.
      </DarkBox>

      <Card color="#1565C0" title="Chassis Layout" subtitle="FX-4 Example — tap a slot">
        <div style={{ display: "flex", gap: 4, padding: 12, background: "#D6EAF8", borderRadius: 10, overflowX: "auto" }}>
          {slots.map(s => (
            <div key={s.id} onClick={() => setSelectedSlot(selectedSlot === s.id ? null : s.id)}
              style={{
                flex: 1, minWidth: 56, padding: "14px 6px", borderRadius: 8, cursor: "pointer",
                textAlign: "center", fontSize: 11, fontWeight: 700, transition: "all 0.2s",
                background: selectedSlot === s.id ? s.color : "#fff",
                color: selectedSlot === s.id ? "#fff" : "#2C3E50",
                border: `2px solid ${selectedSlot === s.id ? s.color : "#AED6F1"}`,
              }}>
              {s.label}
            </div>
          ))}
        </div>
        {sel && (
          <div style={{ marginTop: 10, padding: 12, borderRadius: 8, background: "#fff", border: `1px solid ${sel.color}`, fontSize: 13, color: "#333", lineHeight: 1.6 }}>
            <strong style={{ color: sel.color }}>{sel.label}:</strong> {sel.detail}
          </div>
        )}
      </Card>

      <Card color="#00838F" title="Form Factor Comparison" subtitle="FX-4 vs FX-8 vs FX-16">
        <CompareTable headers={["Spec", "FX-4", "FX-8", "FX-16"]} rows={chassisData} />
      </Card>

      <Card color="#2E7D32" title="High Availability" subtitle="Redundancy features">
        <div style={{ fontSize: 13, lineHeight: 1.8, color: "#333" }}>
          <div style={{ marginBottom: 8 }}><Term>Redundant NT cards</Term> — NT-A (active) and NT-B (standby) provide hitless switchover. Control plane state is synchronized continuously.</div>
          <div style={{ marginBottom: 8 }}><Term>1+1 Power</Term> — Dual -48VDC feeds ensure operation if one supply fails. Monitor via AMS power alarms.</div>
          <div><Term>Card Protection</Term> — If a line card fails, AMS raises an equipment alarm. The card can be hot-swapped without chassis reboot.</div>
        </div>
        <Warning text="In AMS, always check NT redundancy status first when investigating widespread OLT outages. A stuck NT switchover can affect all subscribers on that shelf." />
      </Card>

      <Card color="#6A1B9A" title="Support Agent Checklist" subtitle="What to verify in AMS for OLT issues">
        <div style={{ fontSize: 13, lineHeight: 1.8, color: "#333" }}>
          <div>1. Confirm which <Term>shelf/rack</Term> the OLT belongs to in the device tree</div>
          <div>2. Check NT card status — both should show <span style={{ color: "#4CAF50" }}>In-Service</span></div>
          <div>3. Review active alarms filtered to that shelf for equipment or environment faults</div>
          <div>4. Verify uplink port status on the NT card (10GE/100GE toward aggregation)</div>
          <div>5. Check power feed alarms — a single PSU failure may not cause an outage but needs dispatch</div>
        </div>
        <NetTip text="If many ONTs under the same OLT report issues simultaneously, focus on the OLT shelf and NT card rather than individual ONT troubleshooting." />
      </Card>
    </>
  );
}
