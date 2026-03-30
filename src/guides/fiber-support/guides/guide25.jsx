import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, Term } from './_helpers';

export function Guide25() {
  return (
    <>
      <DarkBox title="SUPPORT TOOLS OVERVIEW">
        Beyond iVue and the network management platforms, you'll use several
        other tools daily.
      </DarkBox>

      <Card color="#37474F" title="CMS (Legacy System)" subtitle="Still in active use">
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 2, color: "#333" }}>
          <li>Legacy configuration management system predating modern OSS tools</li>
          <li>Handles certain subscriber configs not yet migrated to AMS/SMx</li>
          <li>Used for specific account adjustments and legacy service types</li>
          <li>Being phased out gradually — but still part of the daily workflow</li>
        </ul>
      </Card>

      <Card color="#1565C0" title="OSS vs BSS" subtitle="Two halves of the support stack">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1565C0", marginBottom: 4 }}>
              BSS (Business Support) — customer-facing
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", margin: 0 }}>
              <Term>iVue</Term>, billing, and CRM. Everything related to the customer
              account, orders, and service records.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#00695C", marginBottom: 4 }}>
              OSS (Operations Support) — network-facing
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", margin: 0 }}>
              <Term>AMS</Term>, <Term>SMx</Term>, and <Term>Calix Cloud</Term>. Everything
              related to equipment, provisioning, and network health.
            </p>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", margin: 0, padding: "8px 12px", background: "#E1F5FE", borderRadius: 8, border: "1px solid #AED6F1" }}>
            They work together: customer orders (<Term>BSS</Term>) trigger network
            provisioning (<Term>OSS</Term>).
          </p>
        </div>
      </Card>

      <Card color="#00695C" title="Citrix Cloud" subtitle="Your gateway to all tools">
        <p style={{ fontSize: 13, lineHeight: 1.8, color: "#333", margin: 0 }}>
          <Term>Citrix</Term> is the VDI (Virtual Desktop Infrastructure) used to access
          all support tools. You log in once and launch iVue, AMS, SMx, CMS, and other
          applications from there. Tips: close sessions you're not actively using, and if
          tools feel slow, check your own network connection first.
        </p>
      </Card>

      <NetTip text="See the System Integration Map (next guide) for how all these systems connect." />
    </>
  );
}
