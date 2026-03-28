import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';
import { Tip } from './_helpers';

export function Guide16() {
  return (
    <div>
      <DarkBox title="THE BIG IDEA">
        <div style={{ fontSize: 15, lineHeight: 1.7 }}>
          <strong>MCP (Model Context Protocol)</strong> is an open standard that lets AI models connect to external tools and data sources
          through a unified interface — like USB for AI.
        </div>
      </DarkBox>

      <Card color="#00695C" title="The Problem MCP Solves">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ marginBottom: 12 }}>Without a standard protocol, every AI tool integration is custom:</div>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, background: "#FFEBEE", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>{"❌"}</div>
              <div style={{ fontWeight: 700, fontSize: 12, marginTop: 4 }}>Without MCP</div>
              <div style={{ fontSize: 11, marginTop: 4, color: "#555" }}>N models × M tools = N×M custom integrations</div>
            </div>
            <div style={{ flex: 1, background: "#E0F2F1", borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>{"✅"}</div>
              <div style={{ fontWeight: 700, fontSize: 12, marginTop: 4 }}>With MCP</div>
              <div style={{ fontSize: 11, marginTop: 4, color: "#555" }}>N models + M tools = N+M implementations</div>
            </div>
          </div>
        </div>
      </Card>

      <Card color="#00695C" title="How MCP Works">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { role: "MCP Host", desc: "The AI application (e.g., Claude Code, a chatbot). It connects to servers and routes tool calls.", icon: "🏠" },
            { role: "MCP Server", desc: "A small program that exposes specific capabilities — file access, database queries, API calls, etc.", icon: "🖥️" },
            { role: "MCP Client", desc: "The protocol layer inside the host that maintains connections to one or more servers.", icon: "🔌" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, padding: "10px 14px", background: "#E0F2F1", borderRadius: 8 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#00695C" }}>{item.role}</div>
                <div style={{ color: "#333", marginTop: 2 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card color="#00695C" title="What MCP Servers Can Expose">
        <div style={{ padding: 16, fontSize: 13, lineHeight: 1.7 }}>
          {[
            { cap: "Tools", desc: "Actions the model can invoke (e.g., search, create file, query database)." },
            { cap: "Resources", desc: "Data the model can read (e.g., file contents, API responses, logs)." },
            { cap: "Prompts", desc: "Pre-built prompt templates for common tasks with that service." },
          ].map((c, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <span style={{ fontWeight: 700, color: "#00695C" }}>{c.cap}:</span> {c.desc}
            </div>
          ))}
        </div>
      </Card>

      <ExpandSection label="Example MCP servers" color="#00695C">
        <div style={{ fontSize: 13, lineHeight: 1.7, padding: "8px 0" }}>
          {[
            { name: "GitHub", what: "Read/write issues, PRs, code. Create branches, review changes." },
            { name: "Filesystem", what: "Read, write, search files on your local machine." },
            { name: "PostgreSQL", what: "Query databases, inspect schemas, run analytics." },
            { name: "Slack", what: "Read channels, post messages, search conversation history." },
            { name: "Puppeteer", what: "Browse the web, take screenshots, interact with pages." },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <strong>{s.name}:</strong> {s.what}
            </div>
          ))}
        </div>
      </ExpandSection>

      <Tip text="MCP is open source and growing fast. You can write your own MCP server to connect any AI model to any tool or data source you have." />

      <Insight text="MCP is to AI agents what HTTP is to the web — a shared protocol that lets diverse systems talk to each other without custom wiring." />
    </div>
  );
}
