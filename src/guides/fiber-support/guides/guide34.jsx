import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { NetTip, SupportTip, Term, StepFlow, CompareTable } from './_helpers';

const connectSteps = [
  "Open your web browser and navigate to the Citrix Workspace URL.",
  "Log in with your company credentials (username and password).",
  "If prompted, complete multi-factor authentication (MFA).",
  "Select your assigned Workspace or Desktop from the available options.",
  "Click the application or desktop icon to launch your session.",
  "Wait for the virtual desktop to load — this may take 30-60 seconds on first connect.",
];

const commonIssues = [
  { issue: "Session Disconnects", fix: "Check your local internet connection. If stable, close the session fully and reconnect. Avoid using VPN on top of Citrix." },
  { issue: "Slow Performance", fix: "Close unused applications within Citrix. Reduce local bandwidth usage (streaming, downloads). Try a different Citrix server if available." },
  { issue: "Clipboard Not Working", fix: "Citrix clipboard has size limits. For large text, use a shared drive instead. Try Ctrl+C/V again — sometimes the first paste fails." },
  { issue: "Black Screen on Connect", fix: "Wait 30 seconds. If persists, force-disconnect the old session from the Citrix portal and start a new one." },
  { issue: "Printer Not Showing", fix: "Citrix auto-maps local printers but this can fail. Use the Citrix printer utility to manually add your printer." },
];

export function Guide34() {
  return (
    <>
      <DarkBox title="CITRIX CLOUD ACCESS">
        <Term>Citrix</Term> provides the Virtual Desktop Infrastructure (VDI) that gives you access
        to all support tools — iVue, CMS, AMS, and more — from any authorized computer. Think of it
        as a secure remote desktop where all your work applications live.
      </DarkBox>

      <Card color="#1565C0" title="Getting Connected" subtitle="Step-by-step login process">
        <StepFlow steps={connectSteps} />
        <NetTip text="If Citrix itself feels slow or unresponsive, check your own internet connection first. Citrix performance depends heavily on your local network quality." />
      </Card>

      <Card color="#00838F" title="Published Apps vs Full Desktop" subtitle="Two ways to access tools">
        <CompareTable
          headers={["Mode", "What It Is", "Best For"]}
          rows={[
            ["Published Apps", "Individual apps streamed to your screen", "Quick access to one or two tools"],
            ["Full Desktop", "Complete Windows desktop in Citrix", "Using multiple apps simultaneously"],
          ]}
        />
        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#ccc", marginTop: 10 }}>
          Most agents use the <Term>Full Desktop</Term> mode since support work typically requires
          switching between iVue, AMS/SMx, and other tools throughout the day.
        </p>
      </Card>

      <Card color="#D84315" title="Common Citrix Issues" subtitle="Troubleshooting your own connection">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {commonIssues.map((c, i) => (
            <div key={i} style={{ background: "#132D4A", borderRadius: 10, padding: 12, border: "1px solid #1A3A5C" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#FF8A65" }}>{c.issue}</div>
              <div style={{ fontSize: 12, color: "#B0BEC5", marginTop: 4 }}>{c.fix}</div>
            </div>
          ))}
        </div>
        <SupportTip text="Don't open more apps than you need in Citrix. Each open application uses server resources. Close sessions when you're done for the day to free up resources for others." />
      </Card>
    </>
  );
}
