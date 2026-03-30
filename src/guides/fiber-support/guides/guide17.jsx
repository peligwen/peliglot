import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { NetTip, Warning, Term, LEDIndicator, CompareTable, StepFlow } from './_helpers';

const ontModels = [
  ["GigaSpire BLAST u6.2", "Residential", "4 GE, 2 FXS, WiFi 6E", "Indoor, all-in-one"],
  ["GigaSpire BLAST u4", "Residential", "4 GE, 2 FXS, WiFi 6", "Indoor, mid-tier"],
  ["GigaPoint GP4221", "Residential", "4 GE, 2 FXS, RF", "Indoor, no WiFi"],
  ["GigaPoint GP1100x", "Residential", "1 GE", "Compact SFU"],
  ["GigaSpire BLAST u6x", "SMB / MDU", "4 GE, WiFi 6E", "Small business"],
  ["801G", "Outdoor", "1 GE, 1 FXS", "Weather-rated, ONT only"],
];

const leds = [
  { label: "Power", color: "#4CAF50", status: "solid", meaning: "Unit powered on" },
  { label: "PON", color: "#4CAF50", status: "solid", meaning: "OLT registered, signal good" },
  { label: "PON", color: "#FF9800", status: "blink", meaning: "Trying to range / no signal" },
  { label: "WAN", color: "#4CAF50", status: "solid", meaning: "Internet connection active" },
  { label: "LAN", color: "#4CAF50", status: "blink", meaning: "Traffic on Ethernet port" },
  { label: "Phone", color: "#4CAF50", status: "solid", meaning: "VoIP registered" },
  { label: "WiFi", color: "#2196F3", status: "solid", meaning: "WiFi radio active (GigaSpire)" },
];

export function Guide17() {
  const [showLEDs, setShowLEDs] = useState(true);

  return (
    <>
      <DarkBox title="CALIX ONT MODELS">
        Calix offers the <Term>GigaSpire</Term> (WiFi-integrated) and <Term>GigaPoint</Term> (ONT-only) product
        lines. Model selection depends on service tier, WiFi needs, and indoor/outdoor placement.
      </DarkBox>

      <Card color="#1565C0" title="Common ONT Models" subtitle="Residential and SMB">
        <CompareTable headers={["Model", "Segment", "Ports", "Notes"]} rows={ontModels} />
        <Insight text="GigaSpire models include built-in WiFi and run Calix's CommandIQ app ecosystem. GigaPoint models are ONT-only — a separate router is needed." emoji="📡" />
      </Card>

      <Card color="#2E7D32" title="LED Indicators" subtitle="What the lights mean">
        <div style={{ cursor: "pointer", color: "#1565C0", fontWeight: 600, marginBottom: 12 }} onClick={() => setShowLEDs(!showLEDs)}>
          {showLEDs ? "▾ Hide LED guide" : "▸ Show LED guide"}
        </div>
        {showLEDs && leds.map((led, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <LEDIndicator label={led.label} color={led.color} status={led.status} />
            <span style={{ fontSize: 14, color: "#555" }}>{led.meaning}</span>
          </div>
        ))}
        <Warning text="If Power LED is off, confirm outlet power before dispatching. If PON LED blinks continuously, check fiber path." />
      </Card>

      <Card color="#4E342E" title="Serial Number" subtitle="Location and format">
        <p style={{ margin: "0 0 8px" }}>Calix ONT serial numbers are printed on a <Term>label on the bottom or back</Term> of the unit. Format: <strong>CXNK + 8 hex characters</strong> (e.g., CXNK00A1B2C3).</p>
        <p style={{ margin: "0 0 8px" }}>The serial is also visible in SMx under the subscriber's ONT details, and in Calix Cloud device inventory.</p>
        <NetTip text="If the customer can't find the label, the serial can be pulled from SMx using the PON port and ONU ID." />
      </Card>

      <Card color="#880E4F" title="Factory Reset & Basic Troubleshooting" subtitle="First steps">
        <StepFlow steps={[
          "Power cycle: unplug 30 seconds, plug back in, wait 3 minutes",
          "Check LEDs: Power solid green, PON solid green, WAN solid green = healthy",
          "Factory reset: hold recessed RESET button 10+ seconds until LEDs flash",
          "After reset: ONT pulls config from OLT automatically (no re-provisioning needed)",
          "If PON LED stays off after reboot: fiber issue — escalate to plant/field ops",
        ]} />
        <Warning text="Factory reset wipes local WiFi settings on GigaSpire models. Customer will need to reconnect devices." />
      </Card>
    </>
  );
}
