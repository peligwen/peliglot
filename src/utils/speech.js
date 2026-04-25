// Voice cache — populated on first speak + voiceschanged event.
// Chrome/Safari return [] from getVoices() on first call until the event fires.
// We cache so the second call (or first, if voices already loaded) works reliably.
let _voiceCache = null;

function getVoiceCache() {
  if (_voiceCache) return _voiceCache;
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  _voiceCache = window.speechSynthesis.getVoices();
  return _voiceCache;
}

// Populate cache when voices are ready (Chrome async pattern).
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    _voiceCache = window.speechSynthesis.getVoices();
  });
}

/**
 * Returns the first voice whose lang starts with `prefix` (case-insensitive),
 * or null if no such voice is installed. When null, callers should be silent
 * rather than mispronouncing in the OS default language.
 */
function pickVoice(prefix) {
  const voices = getVoiceCache();
  return voices.find(v => v.lang.toLowerCase().startsWith(prefix.toLowerCase())) || null;
}

/**
 * Core speak helper.
 * @param {string} text
 * @param {string} lang  BCP-47 tag passed to SpeechSynthesisUtterance
 * @param {string} langPrefix  Prefix for pickVoice() — if no matching voice exists, falls silent.
 * @param {number} rate
 * @param {Function} [onEnd]
 */
export function speak(text, lang, langPrefix, rate = 0.85, onEnd) {
  if (typeof window === 'undefined' || !window.speechSynthesis) { onEnd?.(); return; }

  const voice = pickVoice(langPrefix);
  if (!voice) {
    // No voice installed for this language — silent is better than mispronunciation.
    onEnd?.();
    return;
  }

  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.voice = voice;
  utter.rate = rate;

  if (onEnd) {
    // 8-second safety net for Safari builds that never fire onend.
    const timer = setTimeout(() => onEnd(), 8000);
    const done = () => { clearTimeout(timer); onEnd(); };
    utter.onend = done;
    utter.onerror = done;
  }

  window.speechSynthesis.speak(utter);
}

// Per-language speak helpers — add new languages as one-liners following this pattern:
// export const speakX = (text, onEnd) => speak(text, 'xx-XX', 'xx', 0.85, onEnd);

export const speakHawaiian = (text, onEnd) => speak(text, 'haw', 'haw', 0.85, onEnd);
export const speakSpanish  = (text, onEnd) => speak(text, 'es-MX', 'es', 0.85, onEnd);
export const speakArabic   = (text, onEnd) => speak(text, 'ar-LB', 'ar', 0.85, onEnd);
export const speakGerman   = (text, onEnd) => speak(text, 'de-DE', 'de', 0.85, onEnd);
export const speakEnglish  = (text, onEnd) => speak(text, 'en-US', 'en', 0.85, onEnd);
