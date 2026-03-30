import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, Warning, Term, CompareTable, LEDIndicator, StepFlow } from './_helpers';

const ontModels = [
  { model: "G-2425G-A", type: "Indoor", ge: 4, fxs: 2, rf: 1, usb: 1, wifi: "Wi-Fi 5", note: "Standard residential triple-play" },
  { model: "G-2426G-A", type: "Indoor", ge: 4, fxs: 2, rf: 1, usb: 1, wifi: "Wi-Fi 6", note: "Latest residential gateway with AX" },
  { model: "G-240W-F", type: "Indoor", ge: 4, fxs: 2, rf: 0, usb: 1, wifi: "Wi-Fi 5", note: "Data + voice, no RF overlay" },
  { model: "G-240G-E", type: "Indoor", ge: 4, fxs: 0, rf: 0, usb: 0, wifi: "None", note: "Data-only bridged ONT (MDU)" },
  { model: "G-010G-Q", type: "Outdoor", ge: 1, fxs: 0, rf: 0, usb: 0, wifi: "None", note: "SFU outdoor enclosure, IP67 rated" },
];

const ledStates = [
  { label: "Power", good: { color: "#4CAF50", status: "solid" }, bad: { color: "#888", status: "solid" }, goodTxt: "Solid green = ON", badTxt: "Off = no power" },
  { label: "PON", good: { color: "#4CAF50", status: "solid" }, bad: { color: "#F44336", status: "solid" }, goodTxt: "Solid green = registered", badTxt: "Red = auth failure" },
  { label: "LAN", good: { color: "#4CAF50", status: "blink" }, bad: { color: "#888", status: "solid" }, goodTxt: "Blinking = traffic", badTxt: "Off = no link" },
  { label: "Phone", good: { color: "#4CAF50", status: "solid" }, bad: { color: "#888", status: "solid" }, goodTxt: "Solid = registered", badTxt: "Off = no service" },
  { label: "Alarm", good: { color: "#888", status: "solid" }, bad: { color: "#F44336", status: "blink" }, goodTxt: "Off = healthy", badTxt: "Blinking red = fault" },
];

export function Guide11() {
  const [ledMode, setLedMode] = useState("good");

  return (
    <>
      <DarkBox title="NOKIA ONT MODELS">
        Nokia <Term>ONTs</Term> (Optical Network Terminals) are the customer-premises devices that
        convert fiber-optic signals into Ethernet, voice, and video. Model selection depends on
        the services provisioned and the installation environment (indoor vs outdoor).
      </DarkBox>

      <Card color="#1565C0" title="Common Residential ONTs" subtitle="Port and feature comparison">
        <CompareTable
          headers={["Model", "Type", "GE", "FXS", "RF", "Wi-Fi"]}
          rows={ontModels.map(m => [m.model, m.type, String(m.ge), String(m.fxs), String(m.rf), m.wifi])}
        />
        <div style={{ fontSize: 12, color: "#333", marginTop: 8, lineHeight: 1.7 }}>
          {ontModels.map((m, i) => (
            <div key={i}><Term>{m.model}</Term> — {m.note}</div>
          ))}
        </div>
      </Card>

      <Card color="#2E7D32" title="LED Status Guide" subtitle="Tap to toggle healthy vs fault state">
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          {["good", "bad"].map(mode => (
            <button key={mode} onClick={() => setLedMode(mode)} style={{
              padding: "6px 16px", borderRadius: 16, fontSize: 12, fontWeight: 600, cursor: "pointer",
              background: ledMode === mode ? (mode === "good" ? "#2E7D32" : "#C62828") : "#fff",
              color: "#fff", border: "1px solid " + (ledMode === mode ? (mode === "good" ? "#4CAF50" : "#F44336") : "#AED6F1"),
            }}>{mode === "good" ? "Healthy" : "Fault"}</button>
          ))}
        </div>
        {ledStates.map((led, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0" }}>
            <LEDIndicator label={led.label} color={led[ledMode].color} status={led[ledMode].status} />
            <span style={{ fontSize: 12, color: "#333" }}>
              {ledMode === "good" ? led.goodTxt : led.badTxt}
            </span>
          </div>
        ))}
      </Card>

      <Card color="#E65100" title="Serial Number & Factory Reset" subtitle="Field reference">
        <div style={{ fontSize: 13, lineHeight: 1.8, color: "#333", marginBottom: 12 }}>
          <div><Term>Serial format</Term>: ALCL + 8 hex characters (e.g., ALCLA1B2C3D4). Found on the bottom label and in AMS under ONT details.</div>
          <div style={{ marginTop: 6 }}><Term>SLID</Term>: Subscriber Line ID — sometimes required for ONT authentication alongside the serial.</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#FFB74D", marginBottom: 8 }}>Factory Reset Procedure:</div>
        <StepFlow steps={[
          "Locate the recessed RESET button on the side or back of the ONT",
          "With the ONT powered on, press and hold RESET for 10+ seconds",
          "All LEDs will blink simultaneously, then the ONT reboots",
          "ONT returns to factory defaults — it will re-register on the PON automatically",
        ]} color="#E65100" />
        <Warning text="Factory reset clears local Wi-Fi config but does NOT remove the ONT's provisioning in AMS. The customer's service profile re-downloads after reboot." />
      </Card>

      <Card color="#6A1B9A" title="Common Issues by Model" subtitle="When to swap the ONT">
        <div style={{ fontSize: 13, lineHeight: 1.8, color: "#333" }}>
          <div><Term>G-2425G-A / G-2426G-A</Term> — Wi-Fi drops: check 2.4/5 GHz band config. Frequent reboots: likely power supply issue, swap PSU first.</div>
          <div style={{ marginTop: 6 }}><Term>G-240W-F</Term> — No phone service: verify FXS port provisioning in AMS SIP profile. LED phone off = SIP registration failure.</div>
          <div style={{ marginTop: 6 }}><Term>G-010G-Q (outdoor)</Term> — PON LED off after storm: check fiber connector for water ingress. Outdoor enclosure seal may be compromised.</div>
        </div>
        <NetTip text="Before dispatching a truck for ONT swap, always try a remote reboot from AMS and verify fiber Rx power. Many issues resolve with a reboot or are actually fiber/splitter problems." />
      </Card>
    </>
  );
}
