import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Mnemonic, DataTable, WxDecoder, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

const samples = [
  { label: 'Fair', raw: 'METAR KCHA 161853Z 24008KT 10SM FEW035 SCT250 29/18 A3002 RMK AO2 SLP162 T02940178' },
  { label: 'Rain', raw: 'METAR KBNA 161953Z 31015G25KT 280V350 3SM -RA BR BKN012 OVC025 17/15 A2984 RMK AO2 P0004' },
  { label: 'Fog', raw: 'METAR KATL 162253Z 00000KT 1/2SM FG VV002 12/12 A2990 RMK AO2' },
  { label: 'Storm', raw: 'SPECI KDFW 162117Z 19022G38KT 1 1/2SM +TSRA SQ BKN015CB OVC030 24/22 A2978 RMK AO2 PK WND 20041/2110' },
  { label: 'Winter', raw: 'METAR KDEN 161755Z 02012KT 3/4SM -SN BLSN OVC008 M05/M08 A3011 RMK AO2' },
];

export function Guide19() {
  return (
    <div>
      <DarkBox title="DECODING METARs">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          A METAR is an hourly observation written in a fixed order: <strong>type, station, time, wind, visibility, weather, sky, temperature/dew point, altimeter, remarks</strong>. The test shows you one from the supplement and asks for a single group. Learn the order and the units and you cannot be fooled.
        </div>
      </DarkBox>

      <WxDecoder samples={samples} mode="metar" color={C.teal} />

      <Mnemonic text="Order: Type, Station, Time, Wind, Visibility, Weather, Sky, Temp/Dew, Altimeter, Remarks. 'Tired Students Take Wild Vacations When School Time Arrives, Really.'" />

      <DataTable color={C.teal} head={['Group', 'Format', 'Units & traps']} rows={[
        ['Station', 'KCHA', 'K + three-letter ID in the contiguous U.S.'],
        ['Time', '161853Z', 'Day 16, 1853 Zulu. Always UTC.'],
        ['Wind', '24008G15KT', 'Direction TRUE, speed knots, G = gusts. VRB = variable; 00000KT = calm. 280V350 = direction varying.'],
        ['Visibility', '3SM, 1 1/2SM, M1/4SM', 'STATUTE miles. M = less than. Part 107 needs 3 SM.'],
        ['Weather', '-RA BR, +TSRA, VCSH', '- light, + heavy, none = moderate. VC = vicinity (5–10 SM). TS, SH, FZ are descriptors; RA, SN, DZ, GR precipitation; BR, FG, HZ, FU obscurations.'],
        ['Sky', 'FEW035 BKN012 OVC025 VV002', 'Hundreds of feet AGL. FEW 1–2/8, SCT 3–4/8, BKN 5–7/8, OVC 8/8. Ceiling = lowest BKN, OVC, or VV. CLR = none below 12,000 (automated); SKC = clear (human).'],
        ['Temp / dew', '29/18, M05/M08', 'Celsius. M = minus. Equal values = saturated.'],
        ['Altimeter', 'A2992', 'Inches of mercury, 29.92.'],
        ['Remarks', 'RMK AO2 SLP162 T02940178', 'AO2 = automated with precipitation discriminator. SLP in hPa. T group = temperature to tenths.'],
      ]} />

      <Card color={C.teal} title="The three questions they actually ask">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          <p style={{ margin: '0 0 6px' }}><strong>What is the wind?</strong> Direction and speed from the wind group. Say “true” if asked for the reference.</p>
          <p style={{ margin: '0 0 6px' }}><strong>What is the ceiling?</strong> The lowest BKN, OVC, or VV layer, in feet AGL. FEW and SCT never count.</p>
          <p style={{ margin: 0 }}><strong>What is the temperature / dew point?</strong> Read the pair, watch for M, and notice when they are equal or close.</p>
        </div>
      </Card>

      <Trap text="SCT is not a ceiling. A METAR with SCT008 OVC040 has a ceiling of 4,000 ft, not 800 ft. The test loves putting a low scattered layer in front of the real ceiling." />
      <Tip text="Paste a real METAR from aviationweather.gov into the decoder above. The groups the widget cannot read are flagged honestly; everything the test cares about, it reads." />

      <ExamQuiz questions={byTopic('metar')} color={C.teal} />
    </div>
  );
}
