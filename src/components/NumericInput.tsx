"use client";

interface UnitOption {
  value: string;
  label: string;
}

interface NumericInputProps {
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  unitOptions?: UnitOption[];
  onUnitChange?: (unit: string) => void;
}

export default function NumericInput({
  label,
  unit,
  value,
  onChange,
  placeholder = "0",
  unitOptions,
  onUnitChange,
}: NumericInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium tracking-wide text-[var(--text-secondary)] uppercase">
        {label}
      </label>
      <div
        className="flex items-center gap-2 rounded-xl px-4"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          minHeight: "56px",
        }}
      >
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-xl font-semibold text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none min-w-0"
          style={{ caretColor: "var(--accent)" }}
        />
        {unitOptions && onUnitChange ? (
          <div
            className="flex rounded-md overflow-hidden shrink-0"
            style={{ border: "1px solid var(--border)" }}
          >
            {unitOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUnitChange(opt.value)}
                className="px-2.5 py-1 text-xs font-medium transition-all"
                style={{
                  background: unit === opt.value ? "var(--accent)" : "transparent",
                  color: unit === opt.value ? "#000" : "var(--text-secondary)",
                  minWidth: "36px",
                  minHeight: "30px",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-sm font-medium text-[var(--text-secondary)] shrink-0">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
