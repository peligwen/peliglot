import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, DataTable, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

/** End of the 24th calendar month after a given YYYY-MM. */
function recencyExpiry(ym: string): string | null {
  const m = /^(\d{4})-(\d{2})$/.exec(ym);
  if (!m) return null;
  const y = Number(m[1]); const mo = Number(m[2]);
  // Last day of the month 24 months later.
  const d = new Date(y, mo - 1 + 24 + 1, 0);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const rampItems = [
  'Remote pilot certificate (card or temporary certificate)',
  'Government photo ID',
  'Aircraft registration (paper or on your phone)',
  'Any airspace authorization or waiver you are operating under, with its special provisions',
  'Remote ID: the aircraft or module is broadcasting (or you are inside a FRIA)',
  'Documents or records required by a waiver (maintenance logs, if the waiver says so)',
];

export function Guide3() {
  const [ym, setYm] = useState('2025-03');
  const [checks, setChecks] = useState<boolean[]>(rampItems.map(() => false));
  const exp = recencyExpiry(ym);
  const done = checks.filter(Boolean).length;
  return (
    <div>
      <DarkBox title="THE REMOTE PILOT CERTIFICATE">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Subpart C of Part 107 is a cluster of small numbers that the test treats as fair game: ages, days, months, years. Learn them as a table and the questions become free points.
        </div>
      </DarkBox>

      <DataTable color={C.red} head={['Section', 'Rule', 'The number']} rows={[
        ['107.61', 'Eligibility: age, English, no disqualifying condition, pass the test (or Part 61 pilot with current flight review takes the online course)', '16 years'],
        ['107.63', 'Certificate issued after TSA security vetting', '—'],
        ['107.64', 'Temporary certificate validity', '120 days'],
        ['107.65', 'Knowledge recency: initial test or recurrent training', '24 calendar months'],
        ['107.67', 'Knowledge test: bring photo ID with name, DOB, signature, address; FTN from IACRA', '—'],
        ['107.71', 'Retest after failing', '14 calendar days'],
        ['107.77', 'Notify FAA of a change of permanent mailing address', '30 days'],
        ['107.57 / .59', 'Alcohol or drug conviction, or refusal of an alcohol test: denial of application, or suspension/revocation', 'up to 1 year'],
        ['107.7', 'Present certificate and documents on request to FAA, NTSB, TSA, or any law enforcement officer', '—'],
        ['107.17', 'No participation with a known physical or mental condition that would interfere with safe operation', '—'],
      ]} />

      <Panel color={C.red}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.red, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Recency calculator</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
          <label htmlFor="g3-month" style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>Month you passed the test or finished recurrent training</label>
          <input id="g3-month" type="month" value={ym} onChange={e => setYm(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: `1.5px solid ${C.line}`, fontSize: 13 }} />
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}` }}>
          {exp ? (
            <>
              <div style={{ fontSize: 12, color: C.muted }}>You remain current through</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.red }}>{exp}</div>
              <div style={{ fontSize: 12, color: '#444', marginTop: 4, lineHeight: 1.5 }}>“Calendar months” means the clock runs to the end of the month, not to the same date. Complete the free online recurrent course before then and the clock resets from that month.</div>
            </>
          ) : <div style={{ fontSize: 12, color: C.muted }}>Pick a month.</div>}
        </div>
      </Panel>

      <Trap text="Recency is 24 calendar months, not 2 years from the date. The certificate itself never expires; only your privilege to use it lapses until you complete recurrent training. There is no retest for recurrency." />

      <Card color={C.red} title="Ramp check: what to have on you">
        <div style={{ padding: '12px 14px' }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, lineHeight: 1.5 }}>An FAA inspector or police officer can ask for these under §107.7. Tap to tick them off; the point is to notice which ones you would have to go looking for.</div>
          {rampItems.map((it, i) => (
            <button key={it} onClick={() => setChecks(c => c.map((v, j) => j === i ? !v : v))} aria-pressed={checks[i]} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', width: '100%', textAlign: 'left', padding: '8px 10px', marginBottom: 4, borderRadius: 8, border: `1px solid ${checks[i] ? C.green : C.line}`, background: checks[i] ? '#E8F5E9' : C.paper, cursor: 'pointer' }}>
              <span style={{ fontSize: 14, color: checks[i] ? C.green : C.muted }}>{checks[i] ? '☑' : '☐'}</span>
              <span style={{ fontSize: 12.5, color: '#333', lineHeight: 1.4 }}>{it}</span>
            </button>
          ))}
          <div style={{ fontSize: 12, fontWeight: 700, color: done === rampItems.length ? C.green : C.muted, marginTop: 6 }}>{done}/{rampItems.length} in hand</div>
        </div>
      </Card>

      <Tip text="Part 61 pilots: if you hold a private certificate or higher with a current flight review, skip the knowledge test and take the free FAA Safety Team course 'Part 107 Small UAS Initial' instead. Everyone else sits the UAG exam." />

      <ExamQuiz questions={byTopic('certificate')} color={C.red} />
    </div>
  );
}
