import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Warning, SupportTip, Term, StepFlow, CompareTable } from './_helpers';

const configSteps = [
  "Open CMS and navigate to Subscriber Configuration.",
  "Search for the subscriber by account number or name.",
  "Select the service record to modify.",
  "Update the desired fields (feature toggles, parameters).",
  "Click Save and confirm the change in the audit prompt.",
  "Verify the change took effect by refreshing the record.",
];

const statusCheckSteps = [
  "Navigate to System Status from the main menu.",
  "Select the integration or batch job you want to check.",
  "Review the last-run timestamp and status (Success / Failed / Pending).",
  "If a sync failed, check the error log for details before re-running.",
];

export function Guide32() {
  return (
    <>
      <DarkBox title="CMS — WORKFLOWS">
        Daily operational tasks in <Term>CMS</Term> follow consistent patterns. Understanding these
        workflows helps you work efficiently even as features gradually migrate to newer platforms.
      </DarkBox>

      <Card color="#5D4037" title="Common CMS Workflows" subtitle="Tasks agents perform regularly">
        <CompareTable
          headers={["Workflow", "Description"]}
          rows={[
            ["Subscriber Config Changes", "Modify service parameters, feature flags, and custom settings"],
            ["Feature Toggles", "Enable/disable specific service features per subscriber"],
            ["Status Checks", "Verify sync jobs, integration health, and batch processing"],
            ["Report Generation", "Run and export usage, billing, and audit reports"],
            ["Bulk Operations", "Apply changes to multiple subscribers in a batch"],
          ]}
        />
      </Card>

      <Card color="#1565C0" title="Subscriber Config Changes" subtitle="Step-by-step">
        <StepFlow steps={configSteps} />
        <SupportTip text="Always note what the value was BEFORE you changed it. If something breaks, you need to know what to revert to." />
      </Card>

      <Card color="#00838F" title="Status Checks" subtitle="Monitoring integrations and batch jobs">
        <StepFlow steps={statusCheckSteps} />
      </Card>

      <Card color="#6A1B9A" title="Data Ownership" subtitle="Where does each piece of data live?">
        <CompareTable
          headers={["Data Type", "Primary System", "Also In"]}
          rows={[
            ["Customer billing info", "iVue", "CMS (read-only copy)"],
            ["Service orders", "iVue", "CMS (historical)"],
            ["Advanced config", "CMS", "Not in iVue yet"],
            ["Network config", "AMS / SMx", "Synced from iVue"],
            ["Custom reports", "CMS", "Limited in iVue"],
          ]}
        />
        <Warning text="CMS data syncs periodically, not in real-time. Changes made in iVue may take 5-15 minutes to appear in CMS. Do not make conflicting changes in both systems." />
      </Card>
    </>
  );
}
