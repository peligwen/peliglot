import { Card } from '../../../components/Card';
import { TroubleshootingSim, SupportTip } from './_helpers';

export function Guide37() {
  return (
    <div>
      <Card color="#C62828" title="Intermittent Connectivity" subtitle="Interactive troubleshooting simulation">
        <TroubleshootingSim
          title="Intermittent Service Drops"
          scenario="Customer reports internet works sometimes but drops out periodically throughout the day."
          steps={{
            start: {
              question: "Is the issue happening on WiFi only, or does it also affect wired (Ethernet) devices?",
              info: "This is the most important first question — it determines whether the problem is in the home WiFi or the fiber network.",
              choices: [
                { label: "WiFi only — wired stays connected", next: "wifi_only" },
                { label: "Both wired and WiFi drop", next: "wired_too" },
                { label: "Customer only uses WiFi — can't test wired", next: "cant_test" },
              ],
            },
            wifi_only: {
              question: "WiFi-only drops are almost always a home environment issue.",
              result: "This is a WiFi issue, not a network issue. Refer to WiFi Fundamentals (Guide 35) and WiFi Diagnostics (Guide 36). Check for interference, band congestion, and router placement.",
              success: true,
            },
            cant_test: {
              question: "Ask the customer to connect one device via Ethernet cable to the ONT or router. Can they do this?",
              choices: [
                { label: "Yes — they'll test wired", next: "wired_too" },
                { label: "No — no Ethernet cable or device available", next: "no_wired_test" },
              ],
            },
            no_wired_test: {
              question: "Without a wired test we can't rule out WiFi. Check the ONT status remotely. Are there any alarms or optical level warnings?",
              choices: [
                { label: "Yes — alarms or marginal optical levels", next: "check_optical" },
                { label: "No — ONT looks healthy remotely", next: "likely_wifi" },
              ],
            },
            likely_wifi: {
              question: "ONT is healthy remotely and we can't confirm wired issues.",
              result: "Most likely a WiFi issue. Advise the customer to get an Ethernet cable to test. If drops continue on wired, have them call back. For now, guide through WiFi optimization (channel, band, placement).",
              success: true,
            },
            wired_too: {
              question: "Both wired and WiFi drop — this is a network-level issue. Check optical power levels on the ONT. Are they marginal (-25 to -28 dBm)?",
              choices: [
                { label: "Yes — Rx power is between -25 and -28 dBm", next: "marginal_optical" },
                { label: "No — Rx power is within normal range (-8 to -25 dBm)", next: "optical_ok" },
              ],
            },
            marginal_optical: {
              question: "Marginal optical levels can cause intermittent drops, especially with temperature changes throughout the day.",
              result: "Marginal optical power is the likely cause. Temperature-related fiber expansion can push levels past the threshold intermittently. Dispatch a tech to clean/re-terminate connectors and check the drop cable. Monitor levels over 24 hours if possible.",
              success: true,
            },
            optical_ok: {
              question: "Optical levels are normal. Is there a pattern to the outages — specific times of day, or correlated with weather?",
              choices: [
                { label: "Yes — happens at specific times of day", next: "time_pattern" },
                { label: "Yes — correlates with weather (rain, heat)", next: "weather_pattern" },
                { label: "No pattern — seems random", next: "random_drops" },
              ],
            },
            time_pattern: {
              question: "Time-of-day patterns suggest congestion or scheduled events. Is it during peak evening hours (7–10 PM)?",
              choices: [
                { label: "Yes — evening peak hours", next: "peak_congestion" },
                { label: "No — other times (morning, midday, etc.)", next: "check_uptime" },
              ],
            },
            peak_congestion: {
              question: "Evening drops during peak hours with normal optical levels.",
              result: "Possible PON congestion during peak usage. Check bandwidth utilization on the OLT PON port. If the splitter group is oversubscribed, this may require capacity planning. Short-term: verify the customer's speed tier and QoS settings.",
              success: true,
            },
            weather_pattern: {
              question: "Weather-correlated drops indicate a plant issue.",
              result: "Rain = likely water ingress in a splice enclosure or connector. Heat = thermal expansion causing microbends. Dispatch a plant tech to inspect the fiber route, splice enclosures, and connectors for weather vulnerability.",
              success: true,
            },
            random_drops: {
              question: "No clear pattern. Check the ONT for 'dying gasp' alarms. Are there repeated dying gasp events in the alarm history?",
              choices: [
                { label: "Yes — repeated dying gasp alarms", next: "dying_gasp" },
                { label: "No dying gasps — check ONT uptime", next: "check_uptime" },
              ],
            },
            dying_gasp: {
              question: "Repeated dying gasps mean the ONT is losing power.",
              result: "Dying gasp = power loss at the premise. Check: is the ONT on a UPS or surge protector that's failing? Is the outlet loose or on a switched circuit? Is there a bad power adapter? Have the customer try a different outlet and check the power supply.",
              success: true,
            },
            check_uptime: {
              question: "Check ONT uptime — does it keep resetting (short uptime values)?",
              choices: [
                { label: "Yes — ONT uptime resets frequently", next: "ont_resets" },
                { label: "No — uptime is long, but service still drops", next: "service_drops_stable_ont" },
              ],
            },
            ont_resets: {
              question: "ONT is rebooting itself — possible hardware issue or overheating.",
              result: "Frequent ONT resets with no power loss = likely hardware failure or overheating. Check ONT temperature if available. Ensure ventilation is adequate (not in a closed cabinet). If temperature is normal, the ONT likely needs replacement. Also check if there was recent construction nearby that could have damaged the drop cable.",
              success: true,
            },
            service_drops_stable_ont: {
              question: "ONT stays up but service drops. Possible loose fiber connector or intermittent fiber fault.",
              result: "Check for recent construction or activity near the premise that could have disturbed the fiber. A loose SC/APC connector can cause intermittent signal loss. Dispatch a tech to inspect and re-seat all connectors from the ONT back to the nearest splice point. Check error counters for BIP/FEC trends.",
              success: true,
            },
            check_optical: {
              question: "Alarms or marginal levels found remotely. What type of alarms?",
              choices: [
                { label: "LOSi / LOS alarms (intermittent)", next: "marginal_optical" },
                { label: "High BIP/FEC error counts", next: "service_drops_stable_ont" },
              ],
            },
          }}
        />
      </Card>

      <SupportTip text="For intermittent issues, ask the customer to keep a log of when drops happen — time, duration, what they were doing. Patterns are the fastest path to root cause." />
    </div>
  );
}
