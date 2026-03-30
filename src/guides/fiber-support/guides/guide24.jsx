import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { SupportTip, Term } from './_helpers';

export function Guide24() {
  return (
    <>
      <DarkBox title="iVUE OVERVIEW">
        iVue is your primary <Term>BSS</Term> (Business Support System). It's where
        customer accounts, service orders, and trouble tickets live.
      </DarkBox>

      <Card color="#1565C0" title="What iVue Does" subtitle="Three core areas">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1565C0", marginBottom: 4 }}>Customer Lookup</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", margin: 0 }}>
              Search by account #, name, address, phone, or serial number. View active
              services, assigned equipment, billing history, and account notes.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1565C0", marginBottom: 4 }}>Orders & Provisioning</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", margin: 0 }}>
              Service orders trigger network configuration downstream. New installs,
              speed upgrades, and disconnects all start here and flow to the OSS layer.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1565C0", marginBottom: 4 }}>Trouble Tickets</div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#333", margin: 0 }}>
              Create and track tickets, categorize issues, dispatch technicians, and
              document resolution steps for every customer problem.
            </p>
          </div>
        </div>
      </Card>

      <Card color="#00695C" title="Key Things to Know" subtitle="Practical tips for daily use">
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 2, color: "#333" }}>
          <li>Always <Term>verify customer identity</Term> before making any changes</li>
          <li>Order flow: iVue → provisioning engine → network (AMS/SMx)</li>
          <li><Term>Stuck orders</Term> can block all subsequent changes on an account</li>
          <li>Document all troubleshooting steps in tickets before escalating</li>
        </ul>
      </Card>

      <SupportTip text="iVue is the starting point for almost every support interaction. Verify the account first, then branch out to network tools." />
    </>
  );
}
