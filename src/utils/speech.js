export function speak(text, lang, rate = 0.85, onEnd) {
  if (!window.speechSynthesis) { onEnd?.(); return; }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = rate;
  if (onEnd) {
    utter.onend = onEnd;
    utter.onerror = () => onEnd();
  }
  window.speechSynthesis.speak(utter);
}

export const speakHawaiian = (text, onEnd) => speak(text, 'haw', 0.85, onEnd);
export const speakSpanish = (text, onEnd) => speak(text, 'es', 0.85, onEnd);
export const speakArabic = (text, onEnd) => speak(text, 'ar', 0.85, onEnd);
export const speakGerman = (text, onEnd) => speak(text, 'de', 0.85, onEnd);
export const speakEnglish = (text, onEnd) => speak(text, 'en-US', 0.85, onEnd);
