import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, SupportTip, Warning, Term, CompareTable } from './_helpers';

const features = [
  { icon: "🤖", name: "Auto-Attendant", desc: "Automated greeting and call routing menu for business lines" },
  { icon: "🔀", name: "Hunt Groups", desc: "Ring multiple extensions in sequence or simultaneously" },
  { icon: "📧", name: "Voicemail-to-Email", desc: "Voicemail recordings delivered as email attachments" },
  { icon: "📱", name: "Softphone Support", desc: "Mobile and desktop apps for remote calling" },
  { icon: "🔢", name: "Virtual Numbers", desc: "Additional DIDs without physical phone lines" },
  { icon: "📊", name: "Call Analytics", desc: "Usage reporting and call detail records" },
];

export function Guide24() {
  return (
    <>
      <DarkBox title="ALIANZA — CLOUD-NATIVE VOICE PLATFORM">
        <Term>Alianza</Term> is a cloud-native VoIP platform that delivers voice service entirely
        from the cloud — no on-premise switching equipment required. It provides a modern alternative
        to traditional softswitches like Metaswitch.
      </DarkBox>

      <Card color="#0277BD" title="Cloud vs On-Premise" subtitle="Key architectural difference">
        <CompareTable
          headers={["Aspect", "Metaswitch", "Alianza"]}
          rows={[
            ["Architecture", "On-premise softswitch", "Cloud-hosted (SaaS)"],
            ["Hardware", "Requires local servers", "No on-prem equipment"],
            ["Management", "MetaView (web UI)", "Alianza Portal (web UI)"],
            ["Updates", "Manual upgrade cycles", "Automatic cloud updates"],
            ["Scalability", "Capacity planning needed", "Elastic cloud scaling"],
            ["Typical Use", "Legacy/established deployments", "New deployments, rapid growth"],
          ]}
          colors={["#1565C0", "#0277BD"]}
        />
        <NetTip text="Both platforms use SIP — the subscriber experience is identical. The difference is in how the provider manages the infrastructure." />
      </Card>

      <Card color="#00838F" title="Key Features" subtitle="What Alianza offers">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 12, border: "1px solid #AED6F1" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>{f.name}</div>
              <div style={{ fontSize: 11, color: "#5D6D7E", marginTop: 4 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#6A1B9A" title="Provisioning & iVue Integration" subtitle="How subscribers get activated">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333" }}>
          When a voice order is placed in <Term>iVue</Term>, the system sends provisioning data to
          the Alianza cloud platform. Alianza automatically creates the subscriber account, assigns
          the <Term>DN</Term>, and configures default features. The ONT's FXS port is then activated
          and the subscriber gets dial tone.
        </p>
        <SupportTip text="Use the Alianza portal for feature changes and troubleshooting. Use MetaView only for subscribers on the Metaswitch platform — never mix the two." />
        <Warning text="If a subscriber was migrated from Metaswitch to Alianza, their old MetaView record may still exist but is no longer active. Always verify which platform is current in iVue." />
      </Card>
    </>
  );
}
