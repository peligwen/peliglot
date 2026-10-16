import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { speakEnglish } from '../../../utils/speech';
import { C, Tip, Trap, DataTable, DefList, Mono, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

const alphabet: [string, string][] = [
  ['A', 'Alfa'], ['B', 'Bravo'], ['C', 'Charlie'], ['D', 'Delta'], ['E', 'Echo'], ['F', 'Foxtrot'], ['G', 'Golf'], ['H', 'Hotel'], ['I', 'India'], ['J', 'Juliett'], ['K', 'Kilo'], ['L', 'Lima'], ['M', 'Mike'],
  ['N', 'November'], ['O', 'Oscar'], ['P', 'Papa'], ['Q', 'Quebec'], ['R', 'Romeo'], ['S', 'Sierra'], ['T', 'Tango'], ['U', 'Uniform'], ['V', 'Victor'], ['W', 'Whiskey'], ['X', 'X-ray'], ['Y', 'Yankee'], ['Z', 'Zulu'],
];
const numbers: [string, string][] = [['0', 'zero'], ['1', 'wun'], ['2', 'too'], ['3', 'tree'], ['4', 'fower'], ['5', 'fife'], ['6', 'six'], ['7', 'seven'], ['8', 'ait'], ['9', 'niner']];

const airports = ['Collegedale', 'Riverbend', 'Dalton'];
const aircraft = ['Cessna one two three alpha bravo', 'Skyhawk seven niner charlie', 'Cherokee four five six delta'];
const positions = ['ten miles south', 'five miles northeast', 'entering left downwind'];
const intentions = ['inbound for landing', 'landing runway two zero', 'full stop'];

function pron(text: string): string {
  // Swap a few digits to their spoken forms so the speech engine says "niner", etc.
  return text.replace(/\b3\b/g, 'tree').replace(/\b5\b/g, 'fife').replace(/\b9\b/g, 'niner');
}

export function Guide29() {
  const [a, setA] = useState(0); const [p, setP] = useState(0); const [i, setI] = useState(1); const [ac, setAc] = useState(0);
  const call = `${airports[a]} traffic, ${aircraft[ac]}, ${positions[p]}, ${intentions[i]}, ${airports[a]}.`;
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const pick = (label: string, opts: string[], v: number, set: (n: number) => void) => (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 3 }}>{label}</div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {opts.map((o, k) => <button key={o} onClick={() => set(k)} style={{ padding: '4px 9px', borderRadius: 8, border: v === k ? `2px solid ${C.green}` : `1.5px solid ${C.line}`, background: v === k ? C.green : C.paper, color: v === k ? '#fff' : C.muted, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>{o}</button>)}
      </div>
    </div>
  );
  return (
    <div>
      <DarkBox title="RADIO PHRASEOLOGY">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Most remote pilots never key a microphone. You should still understand what you hear on a scanner, because a pilot saying “turning base, runway two zero” is telling you exactly where a low aircraft will be in thirty seconds. The test asks for the alphabet, the number words, the frequencies, and the shape of a position report.
        </div>
      </DarkBox>

      <Panel color={C.green}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.green, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Phonetic alphabet {canSpeak ? '— tap to hear' : ''}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))', gap: 5, marginBottom: 10 }}>
          {alphabet.map(([l, w]) => (
            <button key={l} onClick={() => speakEnglish(w)} style={{ padding: '6px 4px', borderRadius: 8, border: `1px solid ${C.line}`, background: C.paper, cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.green }}>{l}</div>
              <div style={{ fontSize: 11, color: C.ink }}>{w}</div>
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.green, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Numbers</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5 }}>
          {numbers.map(([d, w]) => (
            <button key={d} onClick={() => speakEnglish(w === 'wun' ? 'one' : w === 'too' ? 'two' : w === 'ait' ? 'eight' : w)} style={{ padding: '6px 4px', borderRadius: 8, border: `1px solid ${C.line}`, background: C.paper, cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.green }}>{d}</div>
              <div style={{ fontSize: 11, color: C.ink }}>{w}</div>
            </button>
          ))}
        </div>
      </Panel>

      <DataTable color={C.green} head={['Say', 'For']} rows={[
        ['“four thousand five hundred”', '4,500 ft'],
        ['“one zero thousand”', '10,000 ft'],
        ['“one two two point niner”', 'frequency 122.9'],
        ['“zero niner zero”', 'heading 090°'],
        ['“runway two zero”', 'Runway 20'],
        ['“one eight three zero zulu”', '1830Z'],
      ]} />

      <Panel color={C.green}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.green, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Build a self-announce call</div>
        {pick('Airport', airports, a, setA)}
        {pick('Aircraft', aircraft.map(x => x.split(' ')[0]), ac, setAc)}
        {pick('Position', positions, p, setP)}
        {pick('Intention', intentions, i, setI)}
        <Mono color={C.green}>{call}</Mono>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {canSpeak && <button onClick={() => speakEnglish(pron(call))} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', background: C.green, color: '#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>🔊 Hear it</button>}
          <span style={{ fontSize: 12, color: C.muted }}>Who you are calling, who you are, where you are, what you want, and the airport name again at the end.</span>
        </div>
      </Panel>

      <Card color={C.green} title="Frequencies and services">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.green} items={[
            { term: 'CTAF', body: 'Common Traffic Advisory Frequency: where pilots self-announce at airports without an operating tower. Circled C on the sectional. May be a UNICOM, MULTICOM, FSS, or the tower frequency after hours.' },
            { term: 'UNICOM', body: 'A privately operated air/ground station (usually the FBO) that can give wind, runway in use, and services. Often doubles as the CTAF.' },
            { term: 'MULTICOM 122.9', body: 'The default self-announce frequency where there is no tower, FSS, or UNICOM.' },
            { term: 'ATIS', body: 'Continuous recorded airport information at busier towered fields, identified by a letter (“information Bravo”) and updated hourly or when conditions change. Winds are magnetic.' },
            { term: 'AWOS / ASOS', body: 'Automated weather, broadcast on a frequency and by phone. The numbers are in the Chart Supplement and the sectional data block.' },
            { term: 'Ground / Tower', body: 'Towered airports: ground control for taxi, tower for runway and pattern. A remote pilot with an authorization to work on the field will be told which to monitor.' },
            { term: '121.5', body: 'The emergency (“guard”) frequency.' },
            { term: 'Flight Service', body: '1-800-WX-BRIEF (Leidos) for weather briefings and NOTAMs; 122.2 MHz in the air.' },
          ]} />
        </div>
      </Card>

      <Trap text="'Which frequency is used at an airport with no tower, no FSS, and no UNICOM?' MULTICOM, 122.9. 'What is the emergency frequency?' 121.5. Two numbers, do not swap them." />
      <Tip text="Listening on an aviation-band receiver needs no license. Transmitting from the ground is a gray area and usually unnecessary. The useful habit is a scanner on the CTAF during any flight within a few miles of an airport." />

      <ExamQuiz questions={byTopic('radio')} color={C.green} />
    </div>
  );
}
