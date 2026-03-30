import { Card } from '../../../components/Card';
import { TroubleshootingSim, NetTip } from './_helpers';

export function Guide36() {
  return (
    <div>
      <Card color="#C62828" title="WiFi Diagnostics" subtitle="Interactive troubleshooting simulation">
        <TroubleshootingSim
          title="Slow WiFi"
          scenario="Customer reports slow internet but ONLY on WiFi. Wired speeds test fine."
          steps={{
            start: {
              question: "How many WiFi devices does the customer have connected?",
              info: "High device counts can saturate the router's WiFi radio even if the internet connection is fine.",
              choices: [
                { label: "Many (10+ devices)", next: "many_devices" },
                { label: "Few (1–5 devices)", next: "few_devices" },
              ],
            },
            many_devices: {
              question: "Likely device congestion. Is the customer using a single-band (2.4 GHz only) router?",
              choices: [
                { label: "Yes — single-band router", next: "single_band" },
                { label: "No — dual-band router", next: "dual_band_many" },
              ],
            },
            single_band: {
              question: "Single-band router with many devices — this is the bottleneck.",
              result: "Recommend upgrading to a dual-band router. Split devices between 2.4 GHz (IoT, smart home) and 5 GHz (streaming, laptops). Consider mesh WiFi for large homes.",
              success: true,
            },
            dual_band_many: {
              question: "Dual-band but still slow. Are most devices on the same band?",
              result: "Recommend balancing devices across bands. Rename SSIDs to separate 2.4 and 5 GHz. Ensure band steering is enabled if the router supports it. Check if QoS is prioritizing specific traffic.",
              success: true,
            },
            few_devices: {
              question: "What band is the affected device on? Can the customer check their WiFi network name or settings?",
              choices: [
                { label: "2.4 GHz band", next: "on_24" },
                { label: "5 GHz band", next: "on_5" },
                { label: "Unknown / can't tell", next: "unknown_band" },
              ],
            },
            on_24: {
              question: "2.4 GHz is often congested. Is the customer in an apartment or dense housing area?",
              info: "In apartments, dozens of neighboring networks compete on the same three non-overlapping channels.",
              choices: [
                { label: "Yes — apartment or dense area", next: "dense_24" },
                { label: "No — house with some distance from neighbors", next: "house_24" },
              ],
            },
            dense_24: {
              question: "Dense environment on 2.4 GHz — classic congestion scenario.",
              result: "Recommend switching to 5 GHz if possible, or try channels 1, 6, or 11 (whichever is least used). Consider a WiFi analyzer app to find the least congested channel. Mesh system may help.",
              success: true,
            },
            house_24: {
              question: "Less likely congestion. Check for interference sources — does the customer have a microwave, baby monitor, or Bluetooth devices near the router?",
              result: "Recommend moving the router away from interference sources. Try switching to 5 GHz for the affected device. If the router is old, a firmware update or replacement may help.",
              success: true,
            },
            on_5: {
              question: "Is the affected device far from the router or separated by walls?",
              choices: [
                { label: "Yes — far away or through walls", next: "far_5" },
                { label: "No — relatively close with line of sight", next: "close_5" },
              ],
            },
            far_5: {
              question: "5 GHz signal degrades quickly through walls and over distance.",
              result: "5 GHz has shorter range. Recommend moving closer to the router, adding a mesh node or WiFi extender for that location, or switching to 2.4 GHz for better range at the cost of some speed.",
              success: true,
            },
            close_5: {
              question: "Close to router on 5 GHz but still slow. Check for firmware updates. Is the ONT providing WiFi directly, or is there a separate router?",
              choices: [
                { label: "ONT is providing WiFi", next: "ont_wifi" },
                { label: "Separate router connected to ONT", next: "separate_router" },
              ],
            },
            ont_wifi: {
              question: "ONT built-in WiFi is often limited in performance.",
              result: "ONT WiFi radios are typically basic. Recommend the customer use a dedicated WiFi router or mesh system connected to the ONT's Ethernet port for better performance. Disable ONT WiFi to avoid conflicts.",
              success: true,
            },
            separate_router: {
              question: "Separate router, close range, 5 GHz — possible hardware or firmware issue.",
              result: "Check router firmware version and update if needed. Try a factory reset of the router. If the router is older than 3-4 years, it may not support modern WiFi standards. Recommend replacement if issue persists.",
              success: true,
            },
            unknown_band: {
              question: "Have the customer run a wired speed test first to confirm the network is fine. Is wired speed normal?",
              choices: [
                { label: "Yes — wired speed is normal", next: "wired_ok" },
                { label: "No — wired speed is also slow", next: "wired_slow" },
              ],
            },
            wired_ok: {
              question: "Wired is fine, WiFi is slow — confirmed WiFi environment issue.",
              result: "The fiber network is working correctly. Focus on WiFi: check band, channel, distance from router, interference sources. Recommend the customer try connecting to the 5 GHz network if available, or reposition the router.",
              success: true,
            },
            wired_slow: {
              question: "Both wired and WiFi are slow — this is NOT a WiFi-only issue.",
              result: "Investigate the network side: check optical levels, ONT status, provisioned speed tier, and MSAP/service configuration. This is likely a network or provisioning issue, not WiFi.",
              success: false,
            },
          }}
        />
      </Card>

      <NetTip text="Always start WiFi troubleshooting by confirming wired speeds are normal. This single test separates WiFi issues from network issues immediately." />
    </div>
  );
}
