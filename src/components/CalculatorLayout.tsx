"use client";

import Link from "next/link";
import UnitSelector, { type LengthUnit } from "./UnitSelector";

interface CalculatorLayoutProps {
  title: string;
  description?: string;
  unit: LengthUnit;
  onUnitChange: (unit: LengthUnit) => void;
  children: React.ReactNode;
}

export default function CalculatorLayout({
  title,
  description,
  unit,
  onUnitChange,
  children,
}: CalculatorLayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 pt-4 pb-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center rounded-lg transition-colors active:scale-95"
            style={{
              width: "40px",
              height: "40px",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
            }}
            aria-label="뒤로가기"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11 4L6 9L11 14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div>
            <h1 className="text-base font-semibold leading-tight">{title}</h1>
            {description && (
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{description}</p>
            )}
          </div>
        </div>
        <UnitSelector value={unit} onChange={onUnitChange} />
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-5 flex flex-col gap-4">{children}</main>
    </div>
  );
}
