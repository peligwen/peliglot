import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, DataTable, DefList, Slider, Panel } from './_helpers';

const areas = [
  { name: 'Regulations', guides: 'Guides 2–8', color: C.red },
  { name: 'Airspace & charts', guides: 'Guides 9–14, 32', color: C.blue },
  { name: 'Weather', guides: 'Guides 15–21', color: C.teal },
  { name: 'Loading & performance', guides: 'Guides 22–23', color: C.orange },
  { name: 'Operations', guides: 'Guides 24–31', color: C.green },
];

export function Guide34() {
  const [conf, setConf] = useState<number[]>([3, 3, 3, 3, 3]);
  const weak = areas.map((a, i) => ({ ...a, c: conf[i] })).filter(a => a.c <= 2);
  return (
    <div>
      <DarkBox title="EXAM DAY & AFTER">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          The logistics are simple but unforgiving: the wrong ID, a missing tracking number, or a lapsed window can cost you the appointment. Here is the whole path from booking to the plastic card, and the habits that keep the certificate usable afterward.
        </div>
      </DarkBox>

      <Card color={C.purple} title="Before you book">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.purple} items={[
            { term: 'FTN', body: 'Create an IACRA account and get your FAA Tracking Number. The testing vendor will not schedule without it.' },
            { term: 'Testing center', body: 'The UAG exam is delivered by PSI at approved knowledge testing centers. Book online; the fee (about $175) is paid to the vendor.' },
            { term: 'Bring', body: 'Government-issued photo ID showing name, date of birth, signature, and address (or a second document for the address). Your FTN. Reading glasses if you use them.' },
            { term: 'Provided', body: 'The Airman Knowledge Testing Supplement (the figures), scratch paper, and a basic calculator if permitted. Personal electronics stay outside.' },
            { term: 'Not required', body: 'Logbook, flight hours, instructor endorsement, medical certificate. The knowledge test has no prerequisites beyond identity and age.' },
          ]} />
        </div>
      </Card>

      <Card color={C.purple} title="In the room">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li><strong>Two minutes a question</strong> is the budget; most people finish in an hour. Do not rush the chart questions.</li>
            <li><strong>Three choices.</strong> Eliminate one obviously wrong option and you are at 50% before you think.</li>
            <li><strong>Mark and move on.</strong> The software lets you flag questions. Answer every one; there is no penalty for guessing.</li>
            <li><strong>Read for NOT and EXCEPT.</strong> The FAA uses them, and they flip the question.</li>
            <li><strong>Numbers are exact.</strong> 87 knots, not 90. 24 calendar months, not 2 years. 10 calendar days, not 2 weeks.</li>
            <li><strong>Regulatory beats reasonable.</strong> When a sensible answer and a rulebook answer disagree, the rulebook wins.</li>
          </ul>
        </div>
      </Card>

      <DataTable color={C.purple} head={['After you pass', 'What happens']} rows={[
        ['Airman Knowledge Test Report', 'Printed at the center. It carries the ACS codes of what you missed. Valid for 24 calendar months for the certificate application.'],
        ['IACRA application', 'Form 8710-13, submitted online. Enter the test report ID. No instructor sign-off needed.'],
        ['TSA vetting', 'Automatic security check. Usually days; occasionally weeks.'],
        ['Temporary certificate', 'Emailed once TSA clears you. Valid 120 days; print it or keep it on your phone.'],
        ['Permanent card', 'Arrives by mail. Carry it (or the temporary) whenever you fly.'],
        ['Recurrent training', 'Every 24 calendar months: the free FAA Safety Team online course. No retest, no fee. Keep the completion certificate.'],
      ]} />

      <Card color={C.purple} title="If you fail">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          You can retake after 14 calendar days. The test report lists the ACS codes you missed; map them to the areas in Guide 1 and reread those guides. A fail by a few points is almost always one weak area, usually airspace and charts.
        </div>
      </Card>

      <Panel color={C.purple}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.purple, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Readiness check — rate your confidence honestly</div>
        {areas.map((a, i) => (
          <Slider key={a.name} label={a.name} value={conf[i]} min={1} max={5} step={1} onChange={v => setConf(c => c.map((x, j) => j === i ? v : x))} color={a.color} format={v => ['', 'shaky', 'unsure', 'okay', 'solid', 'nailed'][v]} />
        ))}
        <div style={{ padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}`, fontSize: 12.5, color: '#333', lineHeight: 1.5 }}>
          {weak.length === 0 ? (
            <>No weak areas by your own rating. Take the practice exam (Guide 33) with the timer on. Three runs above 80% and you are ready to book.</>
          ) : (
            <>Revisit: {weak.map(w => <strong key={w.name} style={{ color: w.color }}>{w.name} ({w.guides}){weak.indexOf(w) < weak.length - 1 ? ', ' : ''}</strong>)}. Then run the practice exam and check the per-area breakdown against this rating.</>
          )}
        </div>
      </Panel>

      <Card color={C.purple} title="Keeping it usable">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.purple} items={[
            { term: 'Calendar', body: 'Put the recurrent deadline (end of the 24th month) in your calendar now. A lapsed certificate is not revoked, but you cannot use it until the course is done.' },
            { term: 'Address', body: 'Move? Notify the FAA Airman Certification Branch within 30 days.' },
            { term: 'Paperwork kit', body: 'Certificate, registration, authorizations, waivers, and the aircraft\'s Remote ID status, all reachable on your phone.' },
            { term: 'Records', body: 'Log flights, batteries, and maintenance. Not required for basic Part 107, but required by many waivers and valuable after any incident.' },
            { term: 'Recreational flying', body: 'Flying your own drone for fun is still under the 44809 exception (TRUST certificate, CBO guidelines). Part 107 holders may fly either way, but the rules of whichever regime you pick apply to that flight.' },
          ]} />
        </div>
      </Card>

      <Trap text="The 24-month knowledge window applies twice: the test report must be used within 24 calendar months to apply for the certificate, and the certificate's privileges lapse 24 calendar months after your last test or training. Same number, two clocks." />
      <Tip text="The night you pass, do the recurrent course anyway while it is all fresh? No. Wait until month 22. The recurrent course resets the clock from completion, and the material changes." />
    </div>
  );
}
