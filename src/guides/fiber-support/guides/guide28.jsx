import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { SupportTip, Term, StepFlow, CompareTable } from './_helpers';

const searchMethods = [
  { method: "Account Number", tip: "Fastest — exact match. Found on bills and previous tickets." },
  { method: "Customer Name", tip: "Use last name first. Partial matches supported." },
  { method: "Service Address", tip: "Street number + name. Useful for multi-tenant lookups." },
  { method: "Phone Number", tip: "10-digit format. Works for voice subscribers." },
  { method: "Equipment Serial", tip: "ONT serial or MAC address — helpful for field tech calls." },
];

const lookupSteps = [
  "Open iVue from Citrix and log in with your agent credentials.",
  "Click Customer Search in the top navigation bar.",
  "Enter the search criteria (account number, name, address, or phone).",
  "Select the matching customer from the results list.",
  "Review the Account Overview: customer info, addresses, and active services.",
  "Click a service line to see speed tier, package details, and linked equipment.",
];

export function Guide28() {
  return (
    <>
      <DarkBox title="iVUE — CUSTOMER LOOKUP">
        <Term>iVue</Term> (by Innovative Systems) is the BSS/billing platform used to manage customer
        accounts, services, orders, and equipment records. It is the primary tool for looking up
        customer information and verifying service details.
      </DarkBox>

      <Card color="#1565C0" title="Customer Search Methods" subtitle="Multiple ways to find an account">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {searchMethods.map((s, i) => (
            <div key={i} style={{ background: "#132D4A", borderRadius: 10, padding: 12, border: "1px solid #1A3A5C" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#4FC3F7" }}>{s.method}</div>
              <div style={{ fontSize: 12, color: "#B0BEC5", marginTop: 4 }}>{s.tip}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#00838F" title="Account Screen Overview" subtitle="What you see after selecting a customer">
        <CompareTable
          headers={["Section", "Information Shown"]}
          rows={[
            ["Customer Info", "Name, contact details, account number, account status"],
            ["Service Addresses", "All locations linked to the account"],
            ["Active Services", "Data plan, speed tier, phone lines, video packages"],
            ["Equipment", "ONT serial number, MAC address, model, location"],
          ]}
        />
      </Card>

      <Card color="#2E7D32" title="Finding a Customer & Checking Services" subtitle="Step-by-step walkthrough">
        <StepFlow steps={lookupSteps} />
        <SupportTip text="Always verify customer identity (name, address, or last 4 of SSN) before making any account changes or disclosing service details." />
      </Card>
    </>
  );
}
