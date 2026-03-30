import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, Term, LEDIndicator, CompareTable } from './_helpers';

export function Guide37() {
  return (
    <div>
      <DarkBox title="ONT STATUS & LED INDICATORS">
        The LEDs on an <Term>ONT</Term> are your first visual diagnostic tool. Understanding what
        each light means helps you quickly narrow down problems before even logging into a management system.
      </DarkBox>

      <Card color="#2E7D32" title="Nokia ONT LEDs" subtitle="Common LED meanings">
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#2E7D32", marginBottom: 8 }}>Power</div>
          <LEDIndicator label="Green solid = Power OK" color="#4CAF50" status="solid" />
          <LEDIndicator label="Off = No power to ONT" color="#555" status="solid" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#2E7D32", marginBottom: 8 }}>PON</div>
          <LEDIndicator label="Green solid = Registered on OLT" color="#4CAF50" status="solid" />
          <LEDIndicator label="Green blink = Trying to register" color="#4CAF50" status="blink" />
          <LEDIndicator label="Off = No optical signal" color="#555" status="solid" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#2E7D32", marginBottom: 8 }}>LAN</div>
          <LEDIndicator label="Green solid = Ethernet link up" color="#4CAF50" status="solid" />
          <LEDIndicator label="Green blink = Active traffic" color="#4CAF50" status="blink" />
          <LEDIndicator label="Off = No device connected" color="#555" status="solid" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#2E7D32", marginBottom: 8 }}>Phone</div>
          <LEDIndicator label="Green solid = Voice registered" color="#4CAF50" status="solid" />
          <LEDIndicator label="Off = No voice service" color="#555" status="solid" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#EF5350", marginBottom: 8 }}>Alarm</div>
          <LEDIndicator label="Red solid = Critical alarm" color="#F44336" status="solid" />
          <LEDIndicator label="Red blink = Minor alarm" color="#F44336" status="blink" />
          <LEDIndicator label="Off = Normal (no alarm)" color="#555" status="solid" />
        </div>
      </Card>

      <Card color="#00838F" title="Nokia vs Calix LEDs" subtitle="Side-by-side comparison">
        <CompareTable
          headers={["LED", "Nokia", "Calix"]}
          rows={[
            ["Power", "Green = ON, Off = No power", "Green = ON, Off = No power"],
            ["PON", "Green solid = Registered, Blink = Trying", "Green solid = Sync, Blink = Attempting"],
            ["LAN", "Green = Link, Blink = Traffic", "Green = Link, Blink = Activity"],
            ["Phone", "Green = Registered", "Green = Active line"],
            ["Alarm", "Red solid = Critical, Red blink = Minor", "Red = Alarm active (varies by model)"],
          ]}
        />
      </Card>

      <Card color="#C62828" title="Common LED Patterns" subtitle="Quick diagnosis from lights">
        <CompareTable
          headers={["Pattern", "Meaning", "Likely Cause"]}
          rows={[
            ["All LEDs off", "No power", "Check outlet, power cord, breaker"],
            ["Power ON, PON off", "No optical signal", "Fiber issue — cut, dirty connector, or ONT port problem"],
            ["PON blinking continuously", "Cannot register", "Provisioning issue or OLT port problem"],
            ["Phone LED off", "No voice service", "Voice not provisioned or SIP registration failure"],
            ["Alarm red solid", "Critical hardware issue", "ONT may need replacement"],
          ]}
        />
      </Card>

      <NetTip text="Always ask the customer to describe which LEDs are on, off, or blinking before diving into system checks. It saves time and immediately narrows the problem." />
    </div>
  );
}
