/**
 * A small METAR / TAF tokenizer for the decoder widgets.
 * Not a full parser — it recognises the groups the Part 107 test asks about
 * and labels anything else honestly as "not decoded".
 */

export type TokenKind = 'type' | 'station' | 'time' | 'wind' | 'vis' | 'rvr' | 'wx' | 'sky' | 'temp' | 'alt' | 'rmk' | 'change' | 'other';

export interface WxToken {
  text: string;
  kind: TokenKind;
  meaning: string;
}

const DESCRIPTORS: Record<string, string> = {
  MI: 'shallow', PR: 'partial', BC: 'patches of', DR: 'low drifting', BL: 'blowing', SH: 'showers of', TS: 'thunderstorm with', FZ: 'freezing',
};
const PRECIP: Record<string, string> = {
  DZ: 'drizzle', RA: 'rain', SN: 'snow', SG: 'snow grains', IC: 'ice crystals', PL: 'ice pellets', GR: 'hail', GS: 'small hail / snow pellets', UP: 'unknown precipitation',
};
const OBSC: Record<string, string> = {
  BR: 'mist (visibility 5/8 SM or more)', FG: 'fog (visibility under 5/8 SM)', FU: 'smoke', VA: 'volcanic ash', DU: 'widespread dust', SA: 'sand', HZ: 'haze', PY: 'spray',
  PO: 'dust/sand whirls', SQ: 'squalls', FC: 'funnel cloud', SS: 'sandstorm', DS: 'duststorm',
};
const SKY: Record<string, string> = { FEW: 'few (1–2 oktas)', SCT: 'scattered (3–4 oktas)', BKN: 'broken (5–7 oktas) — a ceiling', OVC: 'overcast (8 oktas) — a ceiling' };

function wxPhenomenon(tok: string): string | null {
  let s = tok; let out = '';
  if (s.startsWith('+')) { out += 'heavy '; s = s.slice(1); }
  else if (s.startsWith('-')) { out += 'light '; s = s.slice(1); }
  else if (s.startsWith('VC')) { out += 'in the vicinity (5–10 SM): '; s = s.slice(2); }
  else out += 'moderate ';
  const parts: string[] = [];
  let desc = '';
  if (s.length >= 2 && DESCRIPTORS[s.slice(0, 2)] && s.length > 2) { desc = DESCRIPTORS[s.slice(0, 2)] + ' '; s = s.slice(2); }
  else if (s === 'TS') return out.replace('moderate ', '') + 'thunderstorm (no precipitation reported)';
  while (s.length >= 2) {
    const code = s.slice(0, 2);
    if (PRECIP[code]) parts.push(PRECIP[code]);
    else if (OBSC[code]) parts.push(OBSC[code]);
    else return null;
    s = s.slice(2);
  }
  if (s.length !== 0 || parts.length === 0) return null;
  if (desc === 'freezing ' && parts[0] === 'fog (visibility under 5/8 SM)') desc = 'freezing ';
  const body = desc + parts.join(' and ');
  // Obscurations have no intensity.
  if (parts.every(p => Object.values(OBSC).includes(p)) && !desc) return body;
  return out + body;
}

function windMeaning(m: RegExpMatchArray): string {
  const dir = m[1]; const spd = Number(m[2]); const gust = m[4] ? Number(m[4]) : null; const unit = m[5] === 'MPS' ? 'm/s' : 'knots';
  if (dir === '000' && spd === 0) return 'Wind calm.';
  const d = dir === 'VRB' ? 'variable direction' : `from ${dir}° true`;
  return `Wind ${d} at ${spd} ${unit}${gust ? `, gusting to ${gust} ${unit}` : ''}. Written reports use TRUE north; a tower or ATIS gives magnetic.`;
}

function hhmm(t: string): string { return `${t.slice(0, 2)}${t.slice(2, 4)}Z`; }

export function decode(raw: string, mode: 'metar' | 'taf'): WxToken[] {
  const parts = raw.trim().split(/\s+/).filter(Boolean);
  // Merge "1 1/2SM" style visibility.
  const toks: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (/^\d$/.test(parts[i]) && i + 1 < parts.length && /^\d\/\dSM$/.test(parts[i + 1])) { toks.push(parts[i] + ' ' + parts[i + 1]); i++; }
    else if (parts[i] === 'PK' && parts[i + 1] === 'WND' && parts[i + 2]) { toks.push(`PK WND ${parts[i + 2]}`); i += 2; }
    else if ((parts[i] === 'PROB30' || parts[i] === 'PROB40' || parts[i] === 'TEMPO' || parts[i] === 'BECMG') && parts[i + 1] && /^\d{4}\/\d{4}$/.test(parts[i + 1])) { toks.push(parts[i] + ' ' + parts[i + 1]); i++; }
    else toks.push(parts[i]);
  }

  const out: WxToken[] = [];
  let inRmk = false;
  let seenStation = false;
  toks.forEach((t, idx) => {
    let m: RegExpMatchArray | null;
    if (inRmk) {
      if (/^AO[12]$/.test(t)) out.push({ text: t, kind: 'rmk', meaning: t === 'AO2' ? 'Automated station with a precipitation discriminator (can tell rain from snow).' : 'Automated station without a precipitation discriminator.' });
      else if ((m = t.match(/^SLP(\d{3})$/))) { const v = Number(m[1]); const hpa = (v >= 500 ? 900 : 1000) + v / 10; out.push({ text: t, kind: 'rmk', meaning: `Sea-level pressure ${hpa.toFixed(1)} hPa.` }); }
      else if ((m = t.match(/^T(\d)(\d{3})(\d)(\d{3})$/))) out.push({ text: t, kind: 'rmk', meaning: `Precise temperature ${m[1] === '1' ? '-' : ''}${Number(m[2]) / 10}°C, dew point ${m[3] === '1' ? '-' : ''}${Number(m[4]) / 10}°C.` });
      else if ((m = t.match(/^PK WND (\d{3})(\d{2,3})\/(\d{2,4})$/))) out.push({ text: t, kind: 'rmk', meaning: `Peak wind from ${m[1]}° at ${m[2]} knots at ${m[3]}Z.` });
      else if ((m = t.match(/^P(\d{4})$/))) out.push({ text: t, kind: 'rmk', meaning: `Hourly precipitation ${Number(m[1]) / 100} inches.` });
      else if (t === '$') out.push({ text: t, kind: 'rmk', meaning: 'Station needs maintenance.' });
      else if (t === 'TSNO') out.push({ text: t, kind: 'rmk', meaning: 'Thunderstorm information not available from this sensor.' });
      else out.push({ text: t, kind: 'rmk', meaning: 'Remark (not decoded here). Remarks add detail; the body of the report carries the tested information.' });
      return;
    }
    if (t === 'METAR') { out.push({ text: t, kind: 'type', meaning: 'Routine hourly aviation weather observation.' }); return; }
    if (t === 'SPECI') { out.push({ text: t, kind: 'type', meaning: 'Special observation: issued between hourly reports when conditions change significantly.' }); return; }
    if (t === 'TAF') { out.push({ text: t, kind: 'type', meaning: 'Terminal Aerodrome Forecast: expected conditions within 5 SM of the airport, usually 24 hours (30 at major airports).' }); return; }
    if (t === 'AMD') { out.push({ text: t, kind: 'type', meaning: 'Amended forecast, issued between the scheduled cycles.' }); return; }
    if (t === 'COR') { out.push({ text: t, kind: 'type', meaning: 'Corrected report.' }); return; }
    if (t === 'AUTO') { out.push({ text: t, kind: 'type', meaning: 'Fully automated observation with no human augmentation.' }); return; }
    if (t === 'RMK') { inRmk = true; out.push({ text: t, kind: 'rmk', meaning: 'Remarks follow: additional detail from the station.' }); return; }
    if (!seenStation && /^[A-Z]{4}$/.test(t) && idx <= 2) { seenStation = true; out.push({ text: t, kind: 'station', meaning: `Station identifier. In the U.S., K plus the three-letter airport code (${t.slice(1)}).` }); return; }
    if ((m = t.match(/^(\d{2})(\d{2})(\d{2})Z$/))) { out.push({ text: t, kind: 'time', meaning: `${mode === 'taf' ? 'Issued' : 'Observed'} on day ${m[1]} of the month at ${m[2]}${m[3]} Zulu (UTC).` }); return; }
    if (mode === 'taf' && (m = t.match(/^(\d{2})(\d{2})\/(\d{2})(\d{2})$/))) { out.push({ text: t, kind: 'time', meaning: `Valid from day ${m[1]} at ${m[2]}00Z until day ${m[3]} at ${m[4]}00Z.` }); return; }
    if ((m = t.match(/^(\d{3}|VRB)(\d{2,3})(G(\d{2,3}))?(KT|MPS)$/))) { out.push({ text: t, kind: 'wind', meaning: windMeaning(m) }); return; }
    if ((m = t.match(/^(\d{3})V(\d{3})$/))) { out.push({ text: t, kind: 'wind', meaning: `Wind direction varying between ${m[1]}° and ${m[2]}°.` }); return; }
    if (t === 'P6SM') { out.push({ text: t, kind: 'vis', meaning: 'Visibility greater than 6 statute miles (the top of the TAF scale).' }); return; }
    if ((m = t.match(/^(M)?([\d ]+(?:\/\d)?)SM$/))) { out.push({ text: t, kind: 'vis', meaning: `Visibility ${m[1] ? 'less than ' : ''}${m[2].trim()} statute mile${m[2].trim() === '1' ? '' : 's'}. Part 107 minimum is 3 SM.` }); return; }
    if ((m = t.match(/^R(\d{2}[LRC]?)\/([PM]?)(\d{4})(V[PM]?(\d{4}))?FT(\/[UDN])?$/))) { out.push({ text: t, kind: 'rvr', meaning: `Runway visual range for runway ${m[1]}: ${m[2] === 'P' ? 'more than ' : m[2] === 'M' ? 'less than ' : ''}${Number(m[3])} ft${m[5] ? ` variable to ${Number(m[5])} ft` : ''}.` }); return; }
    if (t === 'SKC') { out.push({ text: t, kind: 'sky', meaning: 'Sky clear (human observer).' }); return; }
    if (t === 'CLR') { out.push({ text: t, kind: 'sky', meaning: 'No clouds detected below 12,000 ft (automated station).' }); return; }
    if (t === 'NSC') { out.push({ text: t, kind: 'sky', meaning: 'No significant cloud.' }); return; }
    if ((m = t.match(/^(FEW|SCT|BKN|OVC)(\d{3})(CB|TCU)?$/))) { out.push({ text: t, kind: 'sky', meaning: `${SKY[m[1]]} at ${Number(m[2]) * 100} ft AGL${m[3] === 'CB' ? ', cumulonimbus' : m[3] === 'TCU' ? ', towering cumulus' : ''}.` }); return; }
    if ((m = t.match(/^VV(\d{3})$/))) { out.push({ text: t, kind: 'sky', meaning: `Indefinite ceiling: vertical visibility ${Number(m[1]) * 100} ft. Counts as a ceiling.` }); return; }
    if ((m = t.match(/^(M?)(\d{2})\/(M?)(\d{2})?$/))) { out.push({ text: t, kind: 'temp', meaning: `Temperature ${m[1] ? '-' : ''}${Number(m[2])}°C, dew point ${m[4] === undefined ? 'missing' : `${m[3] ? '-' : ''}${Number(m[4])}°C`}.${m[4] !== undefined && m[2] === m[4] && m[1] === m[3] ? ' Saturated air — fog or low cloud likely.' : ''}` }); return; }
    if ((m = t.match(/^A(\d{2})(\d{2})$/))) { out.push({ text: t, kind: 'alt', meaning: `Altimeter setting ${m[1]}.${m[2]} inches of mercury.` }); return; }
    if ((m = t.match(/^Q(\d{4})$/))) { out.push({ text: t, kind: 'alt', meaning: `Altimeter setting ${m[1]} hPa (international format).` }); return; }
    if (mode === 'taf') {
      if ((m = t.match(/^FM(\d{2})(\d{2})(\d{2})$/))) { out.push({ text: t, kind: 'change', meaning: `FROM day ${m[1]} at ${hhmm(m[2] + m[3])}: a rapid, significant change to the conditions that follow.` }); return; }
      if ((m = t.match(/^TEMPO (\d{2})(\d{2})\/(\d{2})(\d{2})$/))) { out.push({ text: t, kind: 'change', meaning: `TEMPORARY fluctuations between day ${m[1]} ${m[2]}00Z and day ${m[3]} ${m[4]}00Z, each lasting under an hour and totalling less than half the period.` }); return; }
      if ((m = t.match(/^BECMG (\d{2})(\d{2})\/(\d{2})(\d{2})$/))) { out.push({ text: t, kind: 'change', meaning: `BECOMING: a gradual change between day ${m[1]} ${m[2]}00Z and day ${m[3]} ${m[4]}00Z.` }); return; }
      if ((m = t.match(/^PROB(\d{2}) (\d{2})(\d{2})\/(\d{2})(\d{2})$/))) { out.push({ text: t, kind: 'change', meaning: `${m[1]}% probability of the following conditions between day ${m[2]} ${m[3]}00Z and day ${m[4]} ${m[5]}00Z.` }); return; }
      if ((m = t.match(/^WS(\d{3})\/(\d{3})(\d{2,3})KT$/))) { out.push({ text: t, kind: 'wind', meaning: `Low-level wind shear at ${Number(m[1]) * 100} ft AGL: wind there from ${m[2]}° at ${m[3]} knots.` }); return; }
      if (t === 'NSW') { out.push({ text: t, kind: 'wx', meaning: 'No significant weather.' }); return; }
      if (t === 'CAVOK') { out.push({ text: t, kind: 'wx', meaning: 'Ceiling and visibility OK (not used in U.S. TAFs).' }); return; }
    }
    const w = wxPhenomenon(t);
    if (w) { out.push({ text: t, kind: 'wx', meaning: `Weather: ${w}.` }); return; }
    out.push({ text: t, kind: 'other', meaning: 'Not decoded by this widget.' });
  });
  return out;
}

/** Lowest BKN/OVC/VV layer in a decoded report, in ft AGL, or null. */
export function ceilingOf(tokens: WxToken[]): number | null {
  let c: number | null = null;
  tokens.forEach(t => {
    const m = t.text.match(/^(BKN|OVC)(\d{3})/) || t.text.match(/^(VV)(\d{3})$/);
    if (m) { const h = Number(m[2]) * 100; if (c === null || h < c) c = h; }
  });
  return c;
}

export const KIND_COLORS: Record<TokenKind, string> = {
  type: '#546E7A', station: '#37474F', time: '#6A1B9A', wind: '#1565C0', vis: '#00838F', rvr: '#00838F', wx: '#C62828', sky: '#2E7D32', temp: '#EF6C00', alt: '#5D4037', rmk: '#9E9E9E', change: '#AD1457', other: '#9E9E9E',
};
