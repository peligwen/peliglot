import { useState } from 'react';
import type { CSSProperties, ReactNode, ReactElement } from 'react';
import { DarkBox } from '../DarkBox';

export interface AlphabetGridProps<T extends Record<string, unknown>> {
  letters: T[];
  letterKey?: keyof T;
  nameKey?: keyof T;
  speakKey?: keyof T;
  filterGroups: Array<{ id: string; label: string; filterFn: (l: T) => boolean }>;
  detailFields?: Array<{ key: keyof T; label?: string; bgColor?: string; borderColor?: string; textColor?: string }>;
  primaryColor: string;
  highlightColor?: string;
  accentBg?: string;
  accentFn?: (l: T) => boolean;
  borderFn?: (l: T) => string | null;
  badgeFn?: (l: T) => { color: string } | null;
  speakFn?: (text: string) => void;
  introTitle?: string;
  introContent?: ReactNode;
  footerContent?: ReactNode;
  gridMin?: string;
  gridProps?: CSSProperties;
  renderDetail?: (l: T, ctx: { primaryColor: string; highlightColor: string }) => ReactNode;
}

export function AlphabetGrid<T extends Record<string, unknown>>({
  letters,
  letterKey = 'l' as keyof T,
  nameKey = 'name' as keyof T,
  filterGroups,
  detailFields = [] as Array<{ key: keyof T; label?: string; bgColor?: string; borderColor?: string; textColor?: string }>,
  renderDetail,
  primaryColor,
  highlightColor = '#FFE77A',
  accentBg,
  accentFn,
  borderFn,
  badgeFn,
  speakFn,
  speakKey,
  introTitle,
  introContent,
  footerContent,
  gridMin = '58px',
  gridProps,
}: AlphabetGridProps<T>): ReactElement {
  const [sel, setSel] = useState<number | null>(null);
  const [filter, setFilter] = useState(filterGroups?.[0]?.id ?? 'all');

  const filtered = filterGroups
    ? letters.filter(filterGroups.find(f => f.id === filter)?.filterFn ?? (() => true))
    : letters;

  return (
    <div>
      {introTitle && (
        <DarkBox title={introTitle}>{introContent}</DarkBox>
      )}

      {filterGroups && filterGroups.length > 1 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          {filterGroups.map(f => (
            <button key={f.id} onClick={() => { setFilter(f.id); setSel(null); }} style={{
              padding: '6px 14px', borderRadius: 16,
              border: filter === f.id ? `2px solid ${primaryColor}` : '1.5px solid #ddd',
              background: filter === f.id ? primaryColor : '#fff',
              color: filter === f.id ? '#fff' : '#666',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>{f.label}</button>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${gridMin}, 1fr))`, gap: 6, marginBottom: 16, ...gridProps }}>
        {filtered.map((lt, i) => {
          const ch = String(lt[letterKey] ?? '');
          const nm = lt[nameKey] != null ? String(lt[nameKey]) : undefined;
          const isSel = sel === i;
          const isAccent = accentFn ? accentFn(lt) : false;
          const customBorder = !isSel && borderFn ? borderFn(lt) : null;
          const badge = badgeFn ? badgeFn(lt) : null;
          const speakText = speakKey ? String(lt[speakKey] ?? ch) : ch;

          return (
            <button key={ch || i} onClick={() => {
              setSel(isSel ? null : i);
              if (!isSel && speakFn) speakFn(speakText);
            }} aria-label={`${ch}${nm ? `, ${nm}` : ''}`} style={{
              aspectRatio: '1',
              border: isSel ? `2.5px solid ${primaryColor}` : customBorder || '1.5px solid #e0dcd5',
              borderRadius: 12,
              background: isSel ? primaryColor : isAccent && accentBg ? accentBg : '#fff',
              color: isSel ? highlightColor : '#1a1a1a',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              transform: isSel ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.15s',
              fontSize: ch.length > 2 ? 14 : ch.length > 1 ? 18 : 24,
              fontWeight: 700, fontFamily: "'Georgia',serif",
            }}>
              {ch}
              {nm && <span style={{ fontSize: 8, color: isSel ? `${highlightColor}99` : '#aaa', marginTop: 2, fontFamily: 'system-ui,sans-serif', fontWeight: 400 }}>{nm}</span>}
              {badge && !isSel && <div style={{ position: 'absolute', top: 3, right: 4, width: 5, height: 5, borderRadius: '50%', background: badge.color }} />}
            </button>
          );
        })}
      </div>

      {sel !== null && (() => {
        const lt = filtered[sel];
        const ch = String(lt[letterKey] ?? '');

        if (renderDetail) {
          return renderDetail(lt, { primaryColor, highlightColor });
        }

        return (
          <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #e0dcd5', marginBottom: 16, animation: 'fadeIn 0.2s ease' }}>
            <div style={{ background: primaryColor, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: highlightColor, fontFamily: "'Georgia',serif", lineHeight: 1 }}>{ch}</div>
              <div>
                {detailFields.slice(0, 1).map(df => (
                  <div key={String(df.key)} style={{ color: highlightColor, fontSize: 14, fontFamily: 'monospace' }}>{String(lt[df.key] ?? '')}</div>
                ))}
              </div>
            </div>
            {detailFields.length > 1 && (
              <div style={{ padding: '14px 18px' }}>
                {detailFields.slice(1).map(df => (
                  <div key={String(df.key)} style={{
                    background: df.bgColor || '#F5F9F5',
                    borderRadius: 8, padding: '10px 14px',
                    border: `1px solid ${df.borderColor || '#D4E8D4'}`,
                    marginBottom: 8,
                  }}>
                    {df.label && <div style={{ fontSize: 10, color: df.textColor || primaryColor, fontWeight: 600, marginBottom: 3, textTransform: 'uppercase', letterSpacing: 1 }}>{df.label}</div>}
                    <div style={{ fontSize: 13, color: '#333', lineHeight: 1.5 }}>{String(lt[df.key] ?? '')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {footerContent}
    </div>
  );
}
