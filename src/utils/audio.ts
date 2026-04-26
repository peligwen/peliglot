// Tone.js is dynamically imported; we use its runtime values but keep types minimal
// to avoid binding to tone's internal generics.
type ToneModule = typeof import('tone');
type PolySynthInstance = { triggerAttackRelease: (note: string | string[], dur: string) => void };

let Tone: ToneModule | null = null;
let synth: PolySynthInstance | null = null;

async function ensureTone(): Promise<{ Tone: ToneModule; synth: PolySynthInstance }> {
  if (!Tone) {
    Tone = await import('tone');
  }
  await Tone.start();
  if (!synth) {
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.02, decay: 0.3, sustain: 0.2, release: 0.8 },
      volume: -12,
    }).toDestination() as PolySynthInstance;
  }
  return { Tone, synth };
}

export async function playNote(note: string, dur: string = '8n'): Promise<void> {
  const { synth } = await ensureTone();
  synth.triggerAttackRelease(note, dur);
}

export async function playChord(notes: string[], dur: string = '2n'): Promise<void> {
  const { synth } = await ensureTone();
  synth.triggerAttackRelease(notes, dur);
}

export async function playSequence(notes: Array<string | string[]>, tempo: number = 400): Promise<void> {
  const { synth } = await ensureTone();
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    if (Array.isArray(note)) {
      synth.triggerAttackRelease(note, '4n');
    } else {
      synth.triggerAttackRelease(note, '8n');
    }
    await new Promise<void>(r => setTimeout(r, tempo));
  }
}
