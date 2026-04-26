import type { ReactElement } from 'react';

export interface SliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  color?: string;
}

export function Slider({ label, min, max, step, value, onChange, unit, color }: SliderProps): ReactElement {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 4 }}>
        <span>{label}</span><span style={{ fontWeight: 700, color: color || "#1565C0" }}>{value}{unit || ""}</span>
      </div>
      <input type="range" min={min} max={max} step={step || 1} value={value} onChange={e => onChange(Number(e.target.value))} style={{ width: "100%", accentColor: color || "#1565C0" }} />
    </div>
  );
}

export interface NumInputProps {
  label: string;
  min?: number;
  max?: number;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  color?: string;
}

export function NumInput({ label, min, max, value, onChange, unit, color }: NumInputProps): ReactElement {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <span style={{ fontSize: 12, color: "#888", minWidth: 60 }}>{label}</span>
      <input type="number" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} style={{ width: 80, padding: "4px 8px", borderRadius: 6, border: "1.5px solid #ddd", fontSize: 13, textAlign: "center" }} />
      {unit && <span style={{ fontSize: 12, color: color || "#1565C0", fontWeight: 600 }}>{unit}</span>}
    </div>
  );
}
