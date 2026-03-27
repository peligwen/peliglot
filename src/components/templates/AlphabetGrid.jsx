import { useState } from 'react';
import { DarkBox } from '../DarkBox';

/**
 * AlphabetGrid — reusable interactive letter/symbol grid template.
 *
 * Props:
 *   letters       — array of letter objects (any shape, keyed by letterKey/nameKey)
 *   letterKey     — field name for display character (default: "l")
 *   nameKey       — field name for letter name shown below character (default: "name")
 *   filterGroups  — [{id, label, filterFn}] for filter buttons
 *   detailFields  — [{key, label, bgColor, borderColor, textColor}] rendered in detail panel
 *   primaryColor  — main accent color (header bg, selected state)
 *   highlightColor— text color on primary bg (default: "#FFE77A")
 *   accentBg      — background for "special" items like vowels (default: transparent)
 *   accentFn      — optional (letter) => bool, items matching get accentBg
 *   speakFn       — optional (text) => void, called on letter tap
 *   introTitle    — optional DarkBox title string
 *   introContent  — optional JSX inside DarkBox
 *   footerContent — optional JSX below the grid
 *   gridMin       — minmax first value for grid columns (default: "58px")
 */
export function AlphabetGrid({
  letters,
  letterKey = "l",
  nameKey = "name",
  filterGroups,
  detailFields = [],
  primaryColor = "#1B5E20",
  highlightColor = "#FFE77A",
  accentBg,
  accentFn,
  speakFn,
  introTitle,
  introContent,
  footerContent,
  gridMin = "58px",
}) {
  const [sel, setSel] = useState(null);
  const [filter, setFilter] = useState(filterGroups?.[0]?.id ?? "all");

  const filtered = filterGroups
    ? letters.filter(filterGroups.find(f => f.id === filter)?.filterFn ?? (() => true))
    : letters;

  return (
    <div>
      {introTitle && (
        <DarkBox title={introTitle}>{introContent}</DarkBox>
      )}

      {filterGroups && filterGroups.length > 1 && (
        <div style={{ display: "flex", gap: 6, marginBottom: 14, justifyContent: "center", flexWrap: "wrap" }}>
          {filterGroups.map(f => (
            <button key={f.id} onClick={() => { setFilter(f.id); setSel(null); }} style={{
              padding: "6px 14px", borderRadius: 16,
              border: filter === f.id ? `2px solid ${primaryColor}` : "1.5px solid #ddd",
              background: filter === f.id ? primaryColor : "#fff",
              color: filter === f.id ? "#fff" : "#666",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}>{f.label}</button>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${gridMin}, 1fr))`, gap: 6, marginBottom: 16 }}>
        {filtered.map((lt, i) => {
          const ch = lt[letterKey];
          const nm = lt[nameKey];
          const isSel = sel === i;
          const isAccent = accentFn ? accentFn(lt) : false;

          return (
            <button key={ch ?? i} onClick={() => {
              setSel(isSel ? null : i);
              if (!isSel && speakFn) speakFn(ch);
            }} style={{
              aspectRatio: "1",
              border: isSel ? `2.5px solid ${primaryColor}` : "1.5px solid #e0dcd5",
              borderRadius: 12,
              background: isSel ? primaryColor : isAccent && accentBg ? accentBg : "#fff",
              color: isSel ? highlightColor : "#1a1a1a",
              cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              transform: isSel ? "scale(1.08)" : "scale(1)",
              transition: "all 0.15s",
              fontSize: (ch?.length ?? 0) > 2 ? 14 : ch?.length > 1 ? 18 : 24,
              fontWeight: 700, fontFamily: "'Georgia',serif",
            }}>
              {ch}
              {nm && <span style={{ fontSize: 8, color: isSel ? `${highlightColor}99` : "#aaa", marginTop: 2, fontFamily: "system-ui,sans-serif", fontWeight: 400 }}>{nm}</span>}
            </button>
          );
        })}
      </div>

      {sel !== null && (() => {
        const lt = filtered[sel];
        const ch = lt[letterKey];
        return (
          <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #e0dcd5", marginBottom: 16, animation: "fadeIn 0.2s ease" }}>
            <div style={{ background: primaryColor, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: highlightColor, fontFamily: "'Georgia',serif", lineHeight: 1 }}>{ch}</div>
              <div>
                {detailFields.slice(0, 1).map(df => (
                  <div key={df.key} style={{ color: highlightColor, fontSize: 14, fontFamily: "monospace" }}>{lt[df.key]}</div>
                ))}
              </div>
            </div>
            {detailFields.length > 1 && (
              <div style={{ padding: "14px 18px" }}>
                {detailFields.slice(1).map(df => (
                  <div key={df.key} style={{
                    background: df.bgColor || "#F5F9F5",
                    borderRadius: 8, padding: "10px 14px",
                    border: `1px solid ${df.borderColor || "#D4E8D4"}`,
                    marginBottom: 8,
                  }}>
                    {df.label && <div style={{ fontSize: 10, color: df.textColor || primaryColor, fontWeight: 600, marginBottom: 3, textTransform: "uppercase", letterSpacing: 1 }}>{df.label}</div>}
                    <div style={{ fontSize: 13, color: "#333", lineHeight: 1.5 }}>{lt[df.key]}</div>
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
