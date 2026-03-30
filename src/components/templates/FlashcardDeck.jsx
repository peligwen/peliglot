import { useState, useCallback } from 'react';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardDeck({ items, color = '#1565C0', title, speakFn, speakKey = 'front' }) {
  const [deck, setDeck] = useState(() => shuffle(items));
  const [flipped, setFlipped] = useState(false);
  const [gotCount, setGotCount] = useState(0);
  const [startX, setStartX] = useState(null);

  const current = deck[0];
  const done = deck.length === 0;
  const total = items.length;
  const remaining = deck.length;

  const flip = useCallback(() => {
    if (!flipped) {
      setFlipped(true);
      if (speakFn && current) speakFn(current[speakKey] || current.front);
    }
  }, [flipped, speakFn, speakKey, current]);

  const gotIt = useCallback(() => {
    setGotCount(c => c + 1);
    setDeck(d => d.slice(1));
    setFlipped(false);
  }, []);

  const again = useCallback(() => {
    setDeck(d => [...d.slice(1), d[0]]);
    setFlipped(false);
  }, []);

  const restart = () => {
    setDeck(shuffle(items));
    setFlipped(false);
    setGotCount(0);
  };

  const onTouchStart = (e) => setStartX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (startX === null || !flipped) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 60) { dx > 0 ? gotIt() : again(); }
    setStartX(null);
  };

  if (done) {
    const pct = total > 0 ? Math.round((gotCount / total) * 100) : 0;
    const emoji = pct >= 80 ? '\u{1F3C6}' : pct >= 50 ? '\u{1F44D}' : '\u{1F4D6}';
    return (
      <div style={{ textAlign: 'center', padding: '32px 16px' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{emoji}</div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color }}>
          {gotCount}/{total} on first try
        </div>
        <div style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>
          {pct >= 80 ? 'Excellent!' : pct >= 50 ? 'Good progress! Keep practicing.' : 'Review and try again.'}
        </div>
        <button onClick={restart} style={{
          padding: '10px 28px', borderRadius: 10, border: 'none', background: color,
          color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
        }}>Restart</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '8px 0' }}>
      {title && <div style={{ fontSize: 13, fontWeight: 700, color, textAlign: 'center', marginBottom: 8 }}>{title}</div>}

      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '0 4px' }}>
        <div style={{ flex: 1, height: 4, background: '#e0dcd5', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((total - remaining) / total) * 100}%`, background: color, borderRadius: 2, transition: 'width 0.3s ease' }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#999', flexShrink: 0 }}>{total - remaining}/{total}</span>
      </div>

      {/* Card */}
      <div
        onClick={flip}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        data-no-swipe
        style={{
          perspective: 1000,
          cursor: 'pointer',
          minHeight: 200,
          marginBottom: 12,
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          minHeight: 200,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s ease',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}>
          {/* Front */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            background: '#fff', border: `2px solid ${color}20`, borderRadius: 16,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: 24, minHeight: 200,
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Tap to flip</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', textAlign: 'center', lineHeight: 1.3 }}>
              {current.front}
            </div>
          </div>

          {/* Back */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `${color}08`, border: `2px solid ${color}30`, borderRadius: 16,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: 24, minHeight: 200,
          }}>
            <div style={{ fontSize: 20, fontWeight: 800, color, textAlign: 'center', lineHeight: 1.3, marginBottom: 20 }}>
              {current.back}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={e => { e.stopPropagation(); again(); }} style={{
                padding: '8px 20px', borderRadius: 10, border: '1.5px solid #E8A735',
                background: '#FFF8E7', color: '#B8860B', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}>Again {'\u21BB'}</button>
              <button onClick={e => { e.stopPropagation(); gotIt(); }} style={{
                padding: '8px 20px', borderRadius: 10, border: '1.5px solid #4CAF50',
                background: '#E8F5E9', color: '#2E7D32', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}>Got it {'\u2713'}</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', fontSize: 11, color: '#bbb' }}>
        {flipped ? 'Swipe right = got it, left = again' : ''}
      </div>
    </div>
  );
}
