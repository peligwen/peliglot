import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Reg, Tabs, DataTable, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

interface Cat { name: string; req: string; doc: string; assembly: string; note: string; cite: string }

const cats: Cat[] = [
  { name: 'Category 1', req: '0.55 lb or less on takeoff, everything attached. No exposed rotating parts that would lacerate human skin. No FAA-identified safety defects.', doc: 'None. The design speaks for itself.', assembly: 'Allowed only with standard Remote ID or a broadcast module (not FRIA).', note: 'Prop guards are how most sub-250 g aircraft meet the laceration rule.', cite: '110' },
  { name: 'Category 2', req: 'Must not cause injury equivalent to or greater than 11 ft-lb of kinetic energy from a rigid object. No exposed rotating parts that would lacerate. No safety defects.', doc: 'Manufacturer files a Declaration of Compliance using an FAA-accepted Means of Compliance. Aircraft is labeled.', assembly: 'Allowed only with standard Remote ID or a broadcast module.', note: 'The 11 ft-lb number is the one the test asks for.', cite: '115' },
  { name: 'Category 3', req: 'Must not cause injury equivalent to or greater than 25 ft-lb of kinetic energy. No exposed rotating parts that would lacerate. No safety defects.', doc: 'Declaration of Compliance, as for Category 2.', assembly: 'Never. No sustained flight over open-air assemblies at all.', note: 'Over people only inside a closed/restricted-access site with everyone notified, or with no sustained flight over any non-participant.', cite: '125' },
  { name: 'Category 4', req: 'Airworthiness certificate issued under Part 21. Operated per its flight manual and operating limitations; maintained per its maintenance program.', doc: 'The airworthiness certificate replaces the DOC.', assembly: 'Allowed only with standard Remote ID or a broadcast module.', note: 'The certified-aircraft path. Rare today.', cite: '140' },
];

export function Guide5() {
  const [t, setT] = useState(1);
  const c = cats[t];
  return (
    <div>
      <DarkBox title="OPERATIONS OVER PEOPLE — SUBPART D">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          The 2021 rule replaced “never over people” with four categories of aircraft. Each category trades a design requirement for an operating privilege. The test asks for the thresholds, what a Declaration of Compliance is, and the phrase <em>sustained flight</em>.
        </div>
      </DarkBox>

      <Card color={C.red} title="The default rule">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          No flight over a human being unless that person is <strong>directly participating</strong> in the operation, is <strong>under a covered structure</strong> or <strong>inside a stationary vehicle</strong> that can provide reasonable protection, or the aircraft meets one of the four categories below.<Reg cite="39" />
        </div>
      </Card>

      <Tabs tabs={cats.map(x => x.name)} active={t} onChange={setT} color={C.red} />
      <Panel color={C.red}>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.red, marginBottom: 6 }}>{c.name}<Reg cite={c.cite} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(90px, 26%) 1fr', gap: '8px 10px', fontSize: 12.5, lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, color: C.muted }}>Aircraft must</div><div>{c.req}</div>
          <div style={{ fontWeight: 700, color: C.muted }}>Paperwork</div><div>{c.doc}</div>
          <div style={{ fontWeight: 700, color: C.muted }}>Open-air assemblies</div><div>{c.assembly}</div>
          <div style={{ fontWeight: 700, color: C.muted }}>Worth knowing</div><div>{c.note}</div>
        </div>
      </Panel>

      <DataTable color={C.red} head={['', 'Cat 1', 'Cat 2', 'Cat 3', 'Cat 4']} boldCol={0} rows={[
        ['Threshold', '≤ 0.55 lb', '< 11 ft-lb KE', '< 25 ft-lb KE', 'Airworthiness cert'],
        ['Exposed rotating parts', 'No', 'No', 'No', 'Per cert'],
        ['DOC required', 'No', 'Yes', 'Yes', 'No (cert instead)'],
        ['Sustained flight over people', 'Yes', 'Yes', 'Restricted', 'Yes'],
        ['Over open-air assemblies', 'With RID', 'With RID', 'Never', 'With RID'],
      ]} />

      <Card color={C.red} title="Two definitions the test leans on">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          <p style={{ margin: '0 0 8px' }}><strong>Sustained flight</strong> over a person means hovering above them, flying back and forth over them, or circling above them in a way that keeps the aircraft over them. Simply <em>transiting</em> over someone once is not sustained flight. Category 3 and the moving-vehicle rule both hinge on this word.</p>
          <p style={{ margin: 0 }}><strong>Directly participating</strong> means the RPIC, the person manipulating the controls, the VO, and anyone whose role is necessary to the safety of the operation and who has been briefed. A client, a model, or a crowd that signed a release is not participating.</p>
        </div>
      </Card>

      <Card color={C.red} title="Moving vehicles — §107.145">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          Category 1, 2, and 3 aircraft may fly over people inside moving vehicles only (a) within or over a closed- or restricted-access site where everyone in the vehicles has been notified, or (b) without sustained flight over the vehicles. Category 4 follows its airworthiness certificate. Transit across a road: fine. Hovering over traffic: not.
        </div>
      </Card>

      <Trap text="'Open-air assembly' is deliberately undefined; the FAA judges it case by case (think concerts, parades, a packed beach). Category 3 can never sustain flight over one; the other three need Remote ID that is NOT the FRIA option." />
      <Tip text="Before the 2021 rule, the only way over people was a waiver of 107.39. That waiver still exists and is still the only option for an aircraft that fits no category." />

      <ExamQuiz questions={byTopic('over-people')} color={C.red} />
    </div>
  );
}
