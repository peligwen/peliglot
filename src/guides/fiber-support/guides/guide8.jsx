import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { GlossaryCard } from './_helpers';

const terms = [
  { term: "OLT", abbr: "Optical Line Terminal", def: "Headend device in the Central Office that terminates PON fibers and connects subscribers to the core network.", cat: "PON" },
  { term: "ONT", abbr: "Optical Network Terminal", def: "Customer-premises device that converts optical signals to electrical. Provides Ethernet, voice, and sometimes Wi-Fi.", cat: "PON" },
  { term: "ONU", abbr: "Optical Network Unit", def: "Similar to ONT but sometimes refers to multi-dwelling units or outdoor enclosures serving several customers.", cat: "PON" },
  { term: "PON", abbr: "Passive Optical Network", def: "Network architecture using unpowered splitters to share a single fiber among multiple subscribers.", cat: "PON" },
  { term: "GPON", abbr: "Gigabit PON", def: "ITU-T G.984 standard. 2.488 Gbps downstream, 1.244 Gbps upstream. Most widely deployed PON technology.", cat: "PON" },
  { term: "XGS-PON", abbr: "10G Symmetric PON", def: "ITU-T G.9807.1. 10 Gbps symmetric. Next-gen upgrade that coexists with GPON using different wavelengths.", cat: "PON" },
  { term: "TDMA", abbr: "Time Division Multiple Access", def: "Upstream sharing method in PON. Each ONT transmits in assigned time slots to avoid collisions on the shared fiber.", cat: "PON" },
  { term: "GEM Port", abbr: "GPON Encapsulation Method", def: "Virtual port that carries a specific service (Internet, Voice, Video) over the PON. Mapped to T-CONTs.", cat: "PON" },
  { term: "T-CONT", abbr: "Transmission Container", def: "Upstream bandwidth allocation unit on the PON. Each T-CONT has a type defining its scheduling priority.", cat: "PON" },
  { term: "Splitter", abbr: null, def: "Passive device splitting one optical signal into multiple paths (e.g., 1:32). Each split adds roughly 3.5 dB of loss per doubling.", cat: "Fiber" },
  { term: "Feeder Fiber", abbr: null, def: "Fiber segment running from the Central Office to the first splitter or FDH. Typically the longest span in the network.", cat: "Fiber" },
  { term: "Drop Cable", abbr: null, def: "Final fiber segment from the splitter/ODB to the customer premises. Usually bend-insensitive single-mode.", cat: "Fiber" },
  { term: "SC/APC", abbr: "Subscriber Connector / Angled Physical Contact", def: "Green connector with 8-degree angle polish. Standard for PON networks. Low back-reflection (-65 dB).", cat: "Fiber" },
  { term: "SC/UPC", abbr: "Subscriber Connector / Ultra Physical Contact", def: "Blue connector with flat polish. Used in data centers and some patch panels. Higher back-reflection than APC.", cat: "Fiber" },
  { term: "OS2", abbr: null, def: "Standard single-mode fiber specification (yellow jacket). 9/125 micron core. Used for all long-haul and PON fiber runs.", cat: "Fiber" },
  { term: "dBm", abbr: "Decibels relative to 1 milliwatt", def: "Absolute optical power measurement. 0 dBm = 1 mW. ONT Rx typically -8 to -28 dBm for normal operation.", cat: "Fiber" },
  { term: "SFP", abbr: "Small Form-factor Pluggable", def: "Hot-swappable transceiver module that plugs into OLT line cards. Converts electrical signals to optical and vice versa.", cat: "Fiber" },
  { term: "ODB / FDH", abbr: "Optical Distribution Box / Fiber Distribution Hub", def: "Field enclosure housing splitters and patch connections. Access point for technicians connecting drop cables.", cat: "Fiber" },
  { term: "CO", abbr: "Central Office", def: "Facility housing the OLT, core routers, power systems, and fiber patch panels. Hub of the access network.", cat: "Fiber" },
  { term: "VLAN", abbr: "Virtual Local Area Network", def: "Logical network segmentation using 802.1Q tags. Separates Internet, Voice, and Video traffic on shared infrastructure.", cat: "Support" },
  { term: "QoS", abbr: "Quality of Service", def: "Traffic prioritization mechanism. Ensures voice and video get lower latency and guaranteed bandwidth over data.", cat: "Support" },
  { term: "MSAP", abbr: "Multi-Service Access Platform", def: "Provisioning construct mapping customer services (VLANs, bandwidth, QoS) through the PON to the core network.", cat: "Support" },
  { term: "Bridge Port", abbr: null, def: "ONT configuration mapping a physical port (GE1, FXS1) to a VLAN/GEM port. Incorrect mapping is a top cause of service issues.", cat: "Support" },
  { term: "NID", abbr: "Network Interface Device", def: "Demarcation point on the outside of a building where the ISP's network ends and the customer's wiring begins.", cat: "Support" },
  { term: "SLID", abbr: "Subscriber Line ID", def: "Unique identifier provisioned on the ONT to authenticate it on the PON. Must match the OLT's expected value.", cat: "Nokia" },
  { term: "AMS", abbr: "Application Management System", def: "Nokia's element management platform (5520 AMS). Used to provision, monitor, and troubleshoot Nokia OLTs and ONTs.", cat: "Nokia" },
  { term: "ISAM", abbr: "Intelligent Services Access Manager", def: "Nokia's OLT product family (7360 ISAM). Modular chassis supporting GPON, XGS-PON, and Ethernet line cards.", cat: "Nokia" },
  { term: "SMx", abbr: "Service Manager (Calix)", def: "Calix cloud-based platform for managing and monitoring Calix ONTs and services. Includes analytics and remote diagnostics.", cat: "Calix" },
  { term: "CMS", abbr: "Calix Management System", def: "On-premises management platform for Calix equipment. Used for provisioning, alarm monitoring, and firmware upgrades.", cat: "Calix" },
  { term: "iVue", abbr: null, def: "Calix legacy provisioning and network management tool. Being replaced by SMx cloud but still used in many deployments.", cat: "Calix" },
  { term: "Softswitch", abbr: null, def: "Server that handles VoIP call control and routing. Bridges traditional phone service with SIP/IP-based voice infrastructure.", cat: "Voice" },
  { term: "SIP", abbr: "Session Initiation Protocol", def: "Signaling protocol for initiating, maintaining, and terminating voice/video sessions over IP networks.", cat: "Voice" },
  { term: "UCaaS", abbr: "Unified Communications as a Service", def: "Cloud-hosted platform combining voice, video, messaging, and collaboration tools. Replaces on-premises PBX systems.", cat: "Voice" },
];

const categories = ["Fiber", "PON", "Nokia", "Calix", "Voice", "Support"];

export function Guide8() {
  return (
    <>
      <DarkBox title="NETWORK GLOSSARY">
        Your interactive reference for fiber and telecom terminology. Tap any card to
        flip it and reveal the definition. Use the category filters to focus on a
        specific topic area.
      </DarkBox>

      <Card color="#00838F" title="Glossary" subtitle={`${terms.length} terms across ${categories.length} categories`}>
        <GlossaryCard terms={terms} filterCategories={categories} />
      </Card>
    </>
  );
}
