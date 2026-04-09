"use client";

import { useState, useMemo } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import NumericInput from "@/components/NumericInput";
import AnimatedResult from "@/components/AnimatedResult";
import { type LengthUnit, toMm, fromMm, unitLabel } from "@/lib/units";
import { calcChordDiameter } from "@/lib/calculators/chord-diameter";

export default function ChordDiameterPage() {
  const [unit, setUnit] = useState<LengthUnit>("mm");
  const [chord, setChord] = useState("");
  const [sagitta, setSagitta] = useState("");

  const resultMm = useMemo(() => {
    const c = parseFloat(chord);
    const s = parseFloat(sagitta);
    if (isNaN(c) || isNaN(s)) return null;
    const cMm = toMm(c, unit);
    const sMm = toMm(s, unit);
    return calcChordDiameter(cMm, sMm);
  }, [chord, sagitta, unit]);

  const resultInUnit = useMemo(
    () => (resultMm !== null ? fromMm(resultMm, unit) : null),
    [resultMm, unit]
  );

  return (
    <CalculatorLayout
      title="원의 지름"
      description="현과 수선으로 계산"
      unit={unit}
      onUnitChange={setUnit}
    >
      {/* 수식 다이어그램 */}
      <div
        className="rounded-xl p-4"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <svg viewBox="0 0 280 140" className="w-full" style={{ maxHeight: "120px" }}>
          {/* Circle */}
          <circle cx="140" cy="70" r="60" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
          {/* Chord */}
          <line x1="86" y1="40" x2="194" y2="40" stroke="#22d3ee" strokeWidth="2" />
          {/* Sagitta */}
          <line x1="140" y1="40" x2="140" y2="10" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4,3" />
          {/* Right angle mark */}
          <rect x="134" y="34" width="6" height="6" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
          {/* Labels */}
          <text x="140" y="35" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="600">c</text>
          <text x="148" y="26" fill="#a78bfa" fontSize="11" fontWeight="600">s</text>
          {/* Formula */}
          <text x="140" y="105" textAnchor="middle" fill="#8a8a8a" fontSize="10">
            d = c² / (4s) + s
          </text>
        </svg>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-3">
        <NumericInput
          label="현의 길이 (c)"
          unit={unitLabel(unit)}
          value={chord}
          onChange={setChord}
          placeholder="100"
        />
        <NumericInput
          label="수선의 길이 (s)"
          unit={unitLabel(unit)}
          value={sagitta}
          onChange={setSagitta}
          placeholder="10"
        />
      </div>

      {/* Result */}
      <AnimatedResult
        label="원의 지름 (d)"
        value={resultInUnit}
        unit={unitLabel(unit)}
        decimals={3}
      />

      {resultMm !== null && (
        <p className="text-xs text-center text-[var(--text-secondary)]">
          반지름 = {fromMm(resultMm / 2, unit).toFixed(3)} {unitLabel(unit)}
        </p>
      )}
    </CalculatorLayout>
  );
}
