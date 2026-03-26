let Tone = null;
let synth = null;

async function ensureTone() {
  if (!Tone) {
    Tone = await import('tone');
  }
  await Tone.start();
  if (!synth) {
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.02, decay: 0.3, sustain: 0.2, release: 0.8 },
      volume: -12,
    }).toDestination();
  }
  return { Tone, synth };
}

export async function playNote(note, dur = '8n') {
  const { synth } = await ensureTone();
  synth.triggerAttackRelease(note, dur);
}

export async function playChord(notes, dur = '2n') {
  const { synth } = await ensureTone();
  synth.triggerAttackRelease(notes, dur);
}

export async function playSequence(notes, tempo = 400) {
  const { synth } = await ensureTone();
  for (let i = 0; i < notes.length; i++) {
    if (Array.isArray(notes[i])) {
      synth.triggerAttackRelease(notes[i], '4n');
    } else {
      synth.triggerAttackRelease(notes[i], '8n');
    }
    await new Promise(r => setTimeout(r, tempo));
  }
}
