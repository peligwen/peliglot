export const guidesMeta = [
  // Foundations (1–8)
  { id: 1,  title: "Fiber Optics 101",          subtitle: "How Fiber Optics Work",                cat: "Foundations",     color: "#0277BD", icon: "💡" },
  { id: 2,  title: "PON Architecture",           subtitle: "Passive Optical Networks",             cat: "Foundations",     color: "#0277BD", icon: "🌐" },
  { id: 3,  title: "XGS-PON",                    subtitle: "10G Symmetric Deep Dive",              cat: "Foundations",     color: "#0277BD", icon: "⚡" },
  { id: 4,  title: "FTTH Topology",              subtitle: "From Central Office to Home",          cat: "Foundations",     color: "#0277BD", icon: "🏠" },
  { id: 5,  title: "Optical Components",          subtitle: "Splitters, ODBs, Connectors & SFPs",  cat: "Foundations",     color: "#0277BD", icon: "🔧" },
  { id: 6,  title: "Optical Power & dB",          subtitle: "Signal Levels & Loss Budgets",         cat: "Foundations",     color: "#0277BD", icon: "📊" },
  { id: 7,  title: "VLANs & Services",            subtitle: "VLAN Tagging, QoS & Bridge Ports",     cat: "Foundations",     color: "#0277BD", icon: "🏷️" },
  { id: 8,  title: "Network Glossary",            subtitle: "Key Terms Flashcards",                 cat: "Foundations",     color: "#0277BD", icon: "📖" },

  // Nokia Platform (9–15)
  { id: 9,  title: "Nokia 7360 ISAM FX",          subtitle: "OLT Chassis Overview",                cat: "Nokia Platform",  color: "#1565C0", icon: "🏗️" },
  { id: 10, title: "Nokia Line Cards",            subtitle: "NGLT-C & XGS-PON SFP+ Modules",       cat: "Nokia Platform",  color: "#1565C0", icon: "🔌" },
  { id: 11, title: "Nokia ONT Models",            subtitle: "Residential & Business ONTs",          cat: "Nokia Platform",  color: "#1565C0", icon: "📡" },
  { id: 12, title: "Nokia AMS",                   subtitle: "Alarm Management System",              cat: "Nokia Platform",  color: "#1565C0", icon: "🔔" },
  { id: 13, title: "MSAP Concepts",               subtitle: "Multi-Service Access Platform Basics", cat: "Nokia Platform",  color: "#1565C0", icon: "🧩" },
  { id: 14, title: "MSAP Operations",             subtitle: "VLAN Mapping, QoS & Bridge Ports",     cat: "Nokia Platform",  color: "#1565C0", icon: "⚙️" },
  { id: 15, title: "Nokia ONT Provisioning",       subtitle: "Registration, SLID & Activation",     cat: "Nokia Platform",  color: "#1565C0", icon: "✅" },

  // Calix Platform (16–21)
  { id: 16, title: "Calix OLT Overview",           subtitle: "Calix OLT Architecture",              cat: "Calix Platform",  color: "#00838F", icon: "🏗️" },
  { id: 17, title: "Calix ONT Models",            subtitle: "Models, Ports & LED Indicators",       cat: "Calix Platform",  color: "#00838F", icon: "📡" },
  { id: 18, title: "Calix SMx",                   subtitle: "Service Management Platform",          cat: "Calix Platform",  color: "#00838F", icon: "🖥️" },
  { id: 19, title: "Calix Cloud",                 subtitle: "Cloud Monitoring & Diagnostics",       cat: "Calix Platform",  color: "#00838F", icon: "☁️" },
  { id: 20, title: "Calix ONT Provisioning",       subtitle: "Activation & Service Profiles",       cat: "Calix Platform",  color: "#00838F", icon: "✅" },
  { id: 21, title: "Nokia vs Calix",              subtitle: "Side-by-Side Comparison",              cat: "Calix Platform",  color: "#00838F", icon: "⚖️" },

  // Voice Platforms (22–27)
  { id: 22, title: "Metaswitch Overview",          subtitle: "Softswitch Architecture & Role",       cat: "Voice Platforms", color: "#E65100", icon: "📞" },
  { id: 23, title: "MetaView Management",         subtitle: "Subscriber & Line Configuration",      cat: "Voice Platforms", color: "#E65100", icon: "🖥️" },
  { id: 24, title: "Alianza Cloud Voice",         subtitle: "Cloud-Hosted Voice Platform",          cat: "Voice Platforms", color: "#E65100", icon: "☁️" },
  { id: 25, title: "Momentum Telecom",            subtitle: "UCaaS & Hosted Voice Services",        cat: "Voice Platforms", color: "#E65100", icon: "🎙️" },
  { id: 26, title: "Voice Provisioning",           subtitle: "End-to-End Voice Activation Flow",    cat: "Voice Platforms", color: "#E65100", icon: "🔄" },
  { id: 27, title: "Phone Troubleshooting",        subtitle: "No Dial Tone, One-Way Audio & More",  cat: "Voice Platforms", color: "#E65100", icon: "🔍" },

  // Support Systems (28–35)
  { id: 28, title: "iVue: Customer Lookup",        subtitle: "Accounts, Services & Equipment",      cat: "Support Systems", color: "#6A1B9A", icon: "🔎" },
  { id: 29, title: "iVue: Orders",                subtitle: "Provisioning & Activation Workflows",  cat: "Support Systems", color: "#6A1B9A", icon: "📋" },
  { id: 30, title: "iVue: Trouble Tickets",        subtitle: "Creating, Tracking & Resolving",      cat: "Support Systems", color: "#6A1B9A", icon: "🎫" },
  { id: 31, title: "CMS Overview",                subtitle: "Legacy System Navigation",             cat: "Support Systems", color: "#6A1B9A", icon: "🗄️" },
  { id: 32, title: "CMS Workflows",               subtitle: "Daily Operational Tasks",              cat: "Support Systems", color: "#6A1B9A", icon: "📝" },
  { id: 33, title: "OSS/BSS Concepts",            subtitle: "How All Systems Connect",              cat: "Support Systems", color: "#6A1B9A", icon: "🔗" },
  { id: 34, title: "Citrix Cloud Access",         subtitle: "Getting Connected & Session Tips",     cat: "Support Systems", color: "#6A1B9A", icon: "🖥️" },
  { id: 35, title: "System Integration Map",      subtitle: "Visual Data Flow Between Systems",     cat: "Support Systems", color: "#6A1B9A", icon: "🗺️" },

  // Troubleshooting (36–43)
  { id: 36, title: "Optical Signal Issues",        subtitle: "Reading Power Levels & Loss Sources",  cat: "Troubleshooting", color: "#C62828", icon: "📉" },
  { id: 37, title: "ONT Status & LEDs",           subtitle: "Interpreting Nokia & Calix Indicators", cat: "Troubleshooting", color: "#C62828", icon: "🚦" },
  { id: 38, title: "No Service Diagnostics",       subtitle: "Customer Has No Internet",             cat: "Troubleshooting", color: "#C62828", icon: "🚫" },
  { id: 39, title: "Slow Speed Diagnostics",       subtitle: "Customer Reports Slow Speeds",         cat: "Troubleshooting", color: "#C62828", icon: "🐢" },
  { id: 40, title: "Alarm Triage",                subtitle: "Prioritizing & Escalating Alarms",     cat: "Troubleshooting", color: "#C62828", icon: "🚨" },
  { id: 41, title: "Provisioning Issues",          subtitle: "Common Failures & Fixes",              cat: "Troubleshooting", color: "#C62828", icon: "❌" },
  { id: 42, title: "Fiber Cut Response",           subtitle: "Outage Identification & Reporting",    cat: "Troubleshooting", color: "#C62828", icon: "✂️" },
  { id: 43, title: "Escalation Procedures",        subtitle: "When & How to Escalate",              cat: "Troubleshooting", color: "#C62828", icon: "📤" },
];

export const categories = [
  "Foundations",
  "Nokia Platform",
  "Calix Platform",
  "Voice Platforms",
  "Support Systems",
  "Troubleshooting",
];

export const catColors = {
  Foundations:      "#0277BD",
  "Nokia Platform": "#1565C0",
  "Calix Platform": "#00838F",
  "Voice Platforms": "#E65100",
  "Support Systems": "#6A1B9A",
  Troubleshooting:  "#C62828",
};
