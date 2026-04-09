"use client";

export type LengthUnit = "mm" | "cm" | "inch";

const UNITS: { value: LengthUnit; label: string }[] = [
  { value: "mm", label: "mm" },
  { value: "cm", label: "cm" },
  { value: "inch", label: "in" },
];

interface UnitSelectorProps {
  value: LengthUnit;
  onChange: (unit: LengthUnit) => void;
}

export default function UnitSelector({ value, onChange }: UnitSelectorProps) {
  return (
    <div
      className="flex rounded-lg overflow-hidden"
      style={{ border: "1px solid var(--border)", background: "var(--surface-2)" }}
    >
      {UNITS.map((u) => (
        <button
          key={u.value}
          onClick={() => onChange(u.value)}
          className="px-3 py-1.5 text-sm font-medium transition-all"
          style={{
            background: value === u.value ? "var(--accent)" : "transparent",
            color: value === u.value ? "#000" : "var(--text-secondary)",
            minWidth: "44px",
            minHeight: "36px",
          }}
        >
          {u.label}
        </button>
      ))}
    </div>
  );
}
