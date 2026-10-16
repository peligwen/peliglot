import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Mnemonic, DataTable, DefList, Mono, WxDecoder, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

const samples = [
  { label: 'Classic', raw: 'TAF KPIT 091730Z 0918/1024 15005KT 5SM HZ FEW020 WS010/31022KT\nFM091930 30015G25KT 3SM SHRA OVC015\nTEMPO 0920/0922 1/2SM +TSRA OVC008CB\nFM100100 27008KT 5SM SHRA BKN020 OVC040\nPROB30 1004/1007 1SM -RA BR\nFM101015 18005KT 6SM -SHRA OVC020\nBECMG 1013/1015 P6SM NSW SKC' },
  { label: 'Fair', raw: 'TAF KCHA 161720Z 1618/1718 23006KT P6SM FEW040 SCT250\nFM170000 00000KT P6SM SKC\nFM171400 25008KT P6SM FEW035' },
  { label: 'Fog', raw: 'TAF AMD KSAV 160930Z 1610/1706 VRB03KT 1/4SM FG VV002\nTEMPO 1612/1614 2SM BR OVC004\nFM161500 14006KT P6SM SCT015\nBECMG 1623/1701 00000KT 1SM BR' },
];

export function Guide20() {
  return (
    <div>
      <DarkBox title="TAFs & FORECAST PRODUCTS">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          A TAF forecasts the weather within 5 statute miles of an airport for the next 24 hours (30 at major airports), issued four times a day. It uses METAR vocabulary plus four <strong>change groups</strong>: FM, TEMPO, BECMG, PROB. Everything else in this guide is a product you should know by name.
        </div>
      </DarkBox>

      <WxDecoder samples={samples} mode="taf" color={C.teal} />

      <DataTable color={C.teal} head={['Group', 'Means', 'How to read it']} rows={[
        ['0918/1024', 'Valid period', 'From the 9th at 1800Z to the 10th at 2400Z (day/hour pairs).'],
        ['FM091930', 'From', 'A rapid, significant change starting at 1930Z on the 9th. New conditions hold until the next group.'],
        ['TEMPO 0920/0922', 'Temporary', 'Fluctuations lasting under an hour each and under half the period in total. The base forecast still applies between them.'],
        ['BECMG 1013/1015', 'Becoming', 'A gradual change across the window (usually 1–2 h). By the end, the new conditions prevail.'],
        ['PROB30 1004/1007', 'Probability', '30% (or 40%) chance of the following conditions in that window. Not used in the first hours of a TAF.'],
        ['P6SM / NSW', 'Plus 6 / no significant weather', 'Visibility above 6 SM; weather ending.'],
        ['WS010/31022KT', 'Wind shear', 'Low-level shear at 1,000 ft AGL with the wind up there from 310° at 22 kt.'],
      ]} />

      <Mnemonic text="FM is a cliff, BECMG is a ramp, TEMPO is a blip, PROB is a maybe." />

      <Card color={C.teal} title="Other products on the test">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.teal} items={[
            { term: 'METAR', body: 'Observation. Now. Hourly. (Guide 19.)' },
            { term: 'TAF', body: 'Forecast. 5 SM around the airport. 24–30 h.' },
            { term: 'AIRMET', body: 'Widespread conditions hazardous to light aircraft, valid 6 h. Sierra = IFR and mountain obscuration. Tango = moderate turbulence, surface winds 30 kt or more, low-level wind shear. Zulu = moderate icing and freezing level.' },
            { term: 'SIGMET', body: 'Non-convective severe weather: severe or extreme turbulence, severe icing, dust or sand storms, volcanic ash. Valid 4 h.' },
            { term: 'Convective SIGMET', body: 'Severe thunderstorms (surface winds 50 kt+, hail 3/4 in+, tornadoes), embedded storms, lines of storms, or areas with 40% coverage. Valid 2 h, issued hourly.' },
            { term: 'PIREP', body: 'Pilot report. UA = routine, UUA = urgent. /OV location, /TM time, /FL altitude (hundreds of ft), /TP type, /SK sky, /WX weather, /TA temp, /WV wind, /TB turbulence, /IC icing, /RM remarks.' },
            { term: 'Winds & temps aloft (FB)', body: 'Six-digit groups: 2714+06 = from 270° at 14 kt, +6°C. 9900 = light and variable. Direction over 36 means add 100 to the speed (7545 = 250° at 145 kt). No temperature within 2,500 ft of the surface.' },
            { term: 'GFA', body: 'Graphical Forecasts for Aviation on aviationweather.gov: clouds, visibility, wind, and hazards by the hour. Replaced the text Area Forecast for the continental U.S.' },
            { term: 'Surface analysis', body: 'The fronts-and-isobars chart, every 3 hours. Where the highs, lows, and fronts are right now.' },
            { term: 'Briefings', body: 'Standard (full, before a flight), abbreviated (update what you already have), outlook (6+ hours out, planning only). From Flight Service at 1-800-WX-BRIEF or online.' },
          ]} />
        </div>
      </Card>

      <Card color={C.teal} title="A PIREP and a winds-aloft line, decoded">
        <div style={{ padding: '12px 14px' }}>
          <Mono color={C.teal}>{'UA /OV KCHA/TM 1830/FL035/TP C172/TB MOD/RM LLWS ON FINAL'}</Mono>
          <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, marginBottom: 10 }}>Routine report over Chattanooga at 1830Z, 3,500 ft, Cessna 172, moderate turbulence, remark: low-level wind shear on final.</div>
          <Mono color={C.teal}>{'FT   3000    6000    9000\nCHA  2714    2820+06 2925+01'}</Mono>
          <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5 }}>At 3,000 ft: 270° at 14 kt (no temperature that low). At 6,000 ft: 280° at 20 kt, +6°C. At 9,000: 290° at 25 kt, +1°C.</div>
        </div>
      </Card>

      <Trap text="AIRMET letters: Sierra for Sight (IFR), Tango for Turbulence, Zulu for freeZing (icing). A question offering 'AIRMET Tango' for icing is wrong." />
      <Tip text="The TAF question is almost always 'what are the conditions at time X'. Find the last FM group before X, then check whether a TEMPO or PROB window covers X. That is the whole method." />

      <ExamQuiz questions={byTopic('taf')} color={C.teal} />
    </div>
  );
}
