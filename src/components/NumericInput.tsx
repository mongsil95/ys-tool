"use client";

interface NumericInputProps {
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function NumericInput({
  label,
  unit,
  value,
  onChange,
  placeholder = "0",
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
        <span className="text-sm font-medium text-[var(--text-secondary)] shrink-0">
          {unit}
        </span>
      </div>
    </div>
  );
}
