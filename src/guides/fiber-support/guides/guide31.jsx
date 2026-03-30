import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { SupportTip, Term, CompareTable } from './_helpers';

const keyScreens = [
  { screen: "Subscriber Lookup", use: "Search for customer records by name, account, or address." },
  { screen: "Service Configuration", use: "View and modify service parameters and feature flags." },
  { screen: "Equipment Inventory", use: "Check device assignments and hardware records." },
  { screen: "Reporting", use: "Run usage reports, billing summaries, and audit logs." },
  { screen: "System Status", use: "Monitor batch jobs, sync status, and integration health." },
];

export function Guide31() {
  return (
    <>
      <DarkBox title="CMS — OVERVIEW">
        <Term>CMS</Term> (Content Management System) is the legacy management platform still in active
        daily use. While newer tools like iVue handle most billing and ordering, CMS retains certain
        configuration and reporting functions that have not yet been migrated.
      </DarkBox>

      <Card color="#5D4037" title="What CMS Still Handles" subtitle="Functions not yet migrated to newer systems">
        <CompareTable
          headers={["Function", "CMS", "iVue / Newer Tools"]}
          rows={[
            ["Billing & Orders", "Legacy records only", "Primary system"],
            ["Service Config", "Some advanced settings", "Standard provisioning"],
            ["Equipment Inventory", "Historical records", "Active inventory"],
            ["Custom Reports", "Full reporting suite", "Limited reports"],
            ["Batch Operations", "Still primary", "Not yet available"],
            ["Audit Logs", "Complete history", "Recent activity only"],
          ]}
        />
      </Card>

      <Card color="#1565C0" title="Navigation" subtitle="Finding your way around CMS">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#ccc", marginBottom: 12 }}>
          CMS uses a traditional menu-driven interface. The <Term>Main Menu</Term> bar across the top
          provides access to all modules. Use keyboard shortcuts (shown next to each menu item) for
          faster navigation. The <Term>Quick Search</Term> bar at the top right works across all record types.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {keyScreens.map((s, i) => (
            <div key={i} style={{ background: "#132D4A", borderRadius: 10, padding: 12, border: "1px solid #1A3A5C" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#BCAAA4" }}>{s.screen}</div>
              <div style={{ fontSize: 12, color: "#B0BEC5", marginTop: 4 }}>{s.use}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#2E7D32" title="CMS vs Newer Tools" subtitle="Know which system to use when">
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#ccc" }}>
          As a general rule: use <Term>iVue</Term> for day-to-day customer lookups, orders, and
          billing. Use <Term>CMS</Term> when you need advanced configuration, batch operations,
          historical records, or custom reports not yet available in iVue. When in doubt, start in iVue
          and switch to CMS only if the function is not available.
        </p>
        <SupportTip text="CMS is being phased out gradually. Learn both old and new workflows so you're prepared as functions migrate to iVue and other modern tools." />
      </Card>
    </>
  );
}
