import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, DefList, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

interface Line { text: string; meaning: string }

// A representative, fictional Chart Supplement entry.
const entry: Line[] = [
  { text: 'RIVERBEND RGNL  (RBD)   3 NE   UTC–6(–5DT)   N35°02.12’ W85°12.23’', meaning: 'Airport name and identifier; 3 NM northeast of the city; time zone is UTC−6, or −5 during daylight time; coordinates of the airport reference point.' },
  { text: '  682  B  S4  FUEL 100LL, JET A   TPA—1682(1000)', meaning: 'Field elevation 682 ft MSL. B = rotating beacon. S4 = services available (major repairs, fuel). Traffic pattern altitude 1,682 ft MSL, which is 1,000 ft above the field.' },
  { text: '  RWY 02/20: H7401X150 (ASPH-GRVD)   HIRL   RWY 20: PAPI(P4L)', meaning: 'Runway 2/20: hard-surfaced, 7,401 ft by 150 ft, grooved asphalt. High-intensity runway lights. Runway 20 has a 4-light PAPI on the left side.' },
  { text: '  RWY 15/33: H5001X100 (ASPH)   MIRL   RP 33', meaning: 'Runway 15/33: 5,001 by 100 ft asphalt with medium-intensity lights. Right-hand traffic pattern for runway 33.' },
  { text: '  AIRPORT REMARKS: Attended 1200–0400Z‡. Birds on and invof arpt. Parachute jumping NE of arpt wkends. Unmanned aircraft activity 2 NM S of arpt below 400 ft.', meaning: 'Hours attended (the ‡ means one hour earlier during daylight time). Wildlife and parachute hazards. A note on where drone activity is known to occur. This is where sUAS-specific remarks appear.' },
  { text: '  WEATHER DATA SOURCES: ASOS 119.75  (423) 555-0147', meaning: 'Automated surface observation broadcast on 119.75 MHz and available by phone. Current wind, visibility, ceiling, temperature, and altimeter.' },
  { text: '  COMMUNICATIONS: CTAF 118.3   ATIS 124.1   UNICOM 122.95', meaning: 'Common traffic advisory frequency (also the tower frequency here); ATIS for recorded airport information; UNICOM for the FBO.' },
  { text: '    TOWER 118.3 (1200–0400Z‡)   GND CON 121.9', meaning: 'Control tower operates 1200–0400Z (0700–2300 local standard time). Ground control on 121.9.' },
  { text: '  AIRSPACE: CLASS D svc 1200–0400Z‡; other times CLASS E.', meaning: 'The airspace is Class D only while the tower is open. When closed it becomes Class E to the surface, which still requires authorization under §107.41.' },
];

export function Guide14() {
  const [sel, setSel] = useState<number | null>(1);
  return (
    <div>
      <DarkBox title="THE CHART SUPPLEMENT">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Formerly the Airport/Facility Directory. Seven regional booklets, revised every 56 days, with a text entry for every public airport. The sectional tells you an airport exists; the Supplement tells you its tower hours, pattern altitude, frequencies, and what the airspace turns into at night.
        </div>
      </DarkBox>

      <Panel color={C.blue}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.blue, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>A sample entry — tap a line to decode it</div>
        <div style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 10, padding: '8px 4px', fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: 11.5, lineHeight: 1.5, overflowX: 'auto' }}>
          {entry.map((l, i) => (
            <button key={i} onClick={() => setSel(sel === i ? null : i)} aria-pressed={sel === i} style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: 'inherit', fontSize: 'inherit', whiteSpace: 'pre-wrap', padding: '3px 8px', border: 'none', borderLeft: `3px solid ${sel === i ? C.blue : 'transparent'}`, background: sel === i ? '#E3F2FD' : 'transparent', color: C.ink, cursor: 'pointer', borderRadius: 4 }}>{l.text}</button>
          ))}
        </div>
        <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, marginTop: 10, padding: '10px 12px', background: C.sand, borderRadius: 8, border: `1px solid ${C.line}`, minHeight: 40 }}>
          {sel === null ? 'Each line of a Chart Supplement entry packs several facts. Tap one.' : entry[sel].meaning}
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>Fictional airport, representative format.</div>
      </Panel>

      <Card color={C.blue} title="What else is in the book">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.blue} items={[
            { term: 'Airport entries', body: 'Elevation, runways and surfaces, lighting, services, TPA, frequencies, tower and airspace hours, remarks.' },
            { term: 'Special notices', body: 'Regional items that do not fit elsewhere: noise abatement areas, continuous power facilities, sUAS notes.' },
            { term: 'Parachute jumping areas', body: 'A separate list by state, with the airport, the radius, and the altitudes used. Jump planes climb through the pattern and jumpers descend through your altitude.' },
            { term: 'Phone numbers', body: 'Flight Service, weather, and ATC facility numbers.' },
            { term: 'Airport diagrams', body: 'For larger airports: taxiways, runways, hold-short lines. Useful when you have an authorization to work on the field.' },
          ]} />
        </div>
      </Card>

      <Trap text="Tower hours are written in Zulu with a double dagger (‡) meaning the times shift one hour earlier during daylight saving time. A question about 'when does the Class D become Class E' is a time-zone question in disguise." />
      <Tip text="The old name, A/FD, still shows up in test prep and sometimes in the test itself. If you see 'Airport/Facility Directory', it means the Chart Supplement." />

      <ExamQuiz questions={byTopic('chart-supplement')} color={C.blue} />
    </div>
  );
}
