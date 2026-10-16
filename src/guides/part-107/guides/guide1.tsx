import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, KeyNumbers, Tip, Trap, Panel } from './_helpers';

interface Area { code: string; name: string; lo: number; hi: number; guides: string; color: string; what: string }

const areas: Area[] = [
  { code: 'I', name: 'Regulations', lo: 15, hi: 25, guides: 'Guides 2–8', color: C.red, what: 'Part 107 operating rules, certification, registration, over-people categories, Remote ID, waivers, accident reporting.' },
  { code: 'II', name: 'Airspace & Requirements', lo: 15, hi: 25, guides: 'Guides 9–14', color: C.blue, what: 'Airspace classes, sectional chart reading, special use airspace, TFRs, NOTAMs, LAANC, the Chart Supplement.' },
  { code: 'III', name: 'Weather', lo: 11, hi: 16, guides: 'Guides 15–21', color: C.teal, what: 'Weather sources (METAR, TAF, AIRMETs), fronts, fog, thunderstorms, density altitude, and how weather affects a small aircraft.' },
  { code: 'IV', name: 'Loading & Performance', lo: 7, hi: 11, guides: 'Guides 22–23', color: C.orange, what: 'Weight and balance, center of gravity, load factor, stall, and the manufacturer\'s performance limits.' },
  { code: 'V', name: 'Operations', lo: 35, hi: 45, guides: 'Guides 24–31', color: C.green, what: 'Radio procedures, airport operations, emergencies, decision-making, physiology, maintenance, crew roles, night flying. The biggest slice.' },
];

const steps = [
  { t: 'Get an FAA Tracking Number', d: 'Create a profile at IACRA (the FAA\'s airman application site). The FTN is required to schedule the test.' },
  { t: 'Schedule at a testing center', d: 'The test is delivered by PSI at approved knowledge testing centers. Bring government photo ID. The fee is set by the vendor (about $175).' },
  { t: 'Sit the test: UAG', d: '"Unmanned Aircraft General – Small." 60 questions, 2 hours, 3 choices each, no penalty for guessing. You get a printed Airman Knowledge Test Report with the codes of what you missed.' },
  { t: 'Apply in IACRA (Form 8710-13)', d: 'Enter your test report ID. A certificating official is not needed; it is submitted online. TSA runs a security check.' },
  { t: 'Temporary certificate, then the card', d: 'The temporary certificate arrives by email (valid 120 days). The plastic card follows by mail.' },
  { t: 'Stay current every 24 calendar months', d: 'Free online recurrent training through the FAA Safety Team. No retest, no fee.' },
];

export function Guide1() {
  const [sel, setSel] = useState(4);
  const a = areas[sel];
  return (
    <div>
      <DarkBox title="THE PART 107 KNOWLEDGE TEST">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          The FAA’s <strong>Remote Pilot Certificate with small UAS rating</strong> is what lets you fly a drone for anything other than pure recreation in the United States. There is no flight test. The whole certification hangs on one written exam, and this collection is built around exactly what that exam asks.
        </div>
      </DarkBox>

      <KeyNumbers color={C.slate} items={[
        { label: 'questions', value: '60', note: 'multiple choice, 3 options each' },
        { label: 'minutes', value: '120', note: 'most people finish in 60–90' },
        { label: 'to pass', value: '70%', note: '42 correct out of 60' },
        { label: 'minimum age', value: '16', note: 'plus English and no disqualifying condition' },
        { label: 'recency', value: '24 mo', note: 'calendar months, then free online recurrent' },
        { label: 'retest wait', value: '14 days', note: 'if you fail' },
      ]} />

      <Card color={C.slate} title="The five knowledge areas">
        <div style={{ padding: '12px 14px' }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 10, lineHeight: 1.5 }}>
            The FAA publishes the weighting for each area of the Airman Certification Standards. Tap a bar to see what lives there and which guides cover it. Notice that Operations is nearly half the test.
          </div>
          {areas.map((ar, i) => (
            <button key={ar.code} onClick={() => setSel(i)} aria-pressed={sel === i} style={{ display: 'grid', gridTemplateColumns: '22px minmax(96px, 34%) 1fr 54px', alignItems: 'center', gap: 8, width: '100%', padding: '6px 4px', marginBottom: 4, border: 'none', background: sel === i ? '#f0eeeb' : 'transparent', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: ar.color }}>{ar.code}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.ink, lineHeight: 1.2 }}>{ar.name}</span>
              <span style={{ position: 'relative', height: 16, background: '#f0eeeb', borderRadius: 6, overflow: 'hidden' }}>
                <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${ar.hi * 2}%`, background: ar.color, opacity: 0.3 }} />
                <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${ar.lo * 2}%`, background: ar.color }} />
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: ar.color, textAlign: 'right' }}>{ar.lo}–{ar.hi}%</span>
            </button>
          ))}
          <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}`, borderLeft: `4px solid ${a.color}` }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: a.color }}>Area {a.code}: {a.name} <span style={{ fontWeight: 600, color: C.muted, fontSize: 12 }}>· {a.guides}</span></div>
            <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, marginTop: 4 }}>{a.what}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Roughly {Math.round(a.lo * 0.6)}–{Math.round(a.hi * 0.6)} questions on a 60-question test.</div>
          </div>
        </div>
      </Card>

      <Panel color={C.slate}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.slate, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>From zero to certificate</div>
        {steps.map((s, i) => (
          <div key={s.t} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10, padding: '8px 0', borderTop: i ? `1px solid ${C.line}` : 'none' }}>
            <div style={{ width: 24, height: 24, borderRadius: 12, background: C.slate, color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{s.t}</div>
              <div style={{ fontSize: 12, color: '#444', lineHeight: 1.5 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </Panel>

      <Card color={C.slate} title="How this collection works">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          <p style={{ margin: '0 0 8px' }}>Each guide teaches one slice of the test with an interactive tool, then ends with a short quiz in the FAA’s own three-choice format, with explanations. The question bank feeds a full <strong>60-question timed practice exam</strong> in Guide 33.</p>
          <p style={{ margin: 0 }}>The real test includes figures from the FAA <em>Airman Knowledge Testing Supplement</em>: sectional chart excerpts, METAR/TAF tables, a load-factor chart, Chart Supplement pages. Guide 32 trains the chart-reading questions on a practice figure, since those are where most people lose points.</p>
        </div>
      </Card>

      <Trap text="This is a test of what the FAA wrote, not what is sensible. When a question has a 'reasonable' answer and a 'regulatory' answer, pick the regulatory one. When it offers a number, it wants the exact number from the rule." />
      <Tip text="Study order that works: Regulations first (they are pure memorization), then Airspace and the chart (slowest to learn, highest payoff), then Weather, then the Operations topics, which are mostly common sense dressed in vocabulary. Take the practice exam at least three times." />
    </div>
  );
}
