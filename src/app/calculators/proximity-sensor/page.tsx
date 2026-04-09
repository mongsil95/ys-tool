"use client";

import { useState, useMemo } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import NumericInput from "@/components/NumericInput";
import AnimatedResult from "@/components/AnimatedResult";
import { type LengthUnit, toMm, fromMm, unitLabel } from "@/lib/units";
import { calcProxSensor } from "@/lib/calculators/proximity-sensor";

function toMs(value: number): number {
  return 1000 / value; // Hz → ms
}

export default function ProximitySensorPage() {
  const [unit, setUnit] = useState<LengthUnit>("mm");
  const [diameter, setDiameter] = useState("");
  const [rpm, setRpm] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const result = useMemo(() => {
    const d = parseFloat(diameter);
    const n = parseFloat(rpm);
    const t = parseFloat(responseTime);
    if (isNaN(d) || isNaN(n) || isNaN(t)) return null;
    const dMm = toMm(d, unit);
    const tMs = toMs(t);
    return calcProxSensor(dMm, n, tMs);
  }, [diameter, rpm, responseTime, unit]);

  const arcLengthInUnit = useMemo(
    () => (result !== null ? fromMm(result.arcLength, unit) : null),
    [result, unit]
  );

  return (
    <CalculatorLayout
      title="호의 길이"
      description="센서 응답속도 동안 회전하는 호의 길이"
      unit={unit}
      onUnitChange={setUnit}
    >
      {/* 수식 다이어그램 */}
      <div
        className="rounded-xl p-4"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <svg viewBox="0 0 280 110" className="w-full" style={{ maxHeight: "100px" }}>
          {/* Circle */}
          <circle cx="80" cy="60" r="44" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
          <circle cx="80" cy="60" r="3" fill="#22d3ee" />
          {/* Arc highlight — top-right portion */}
          <path
            d="M 80,16 A 44,44 0 0,1 120,82"
            fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round"
          />
          {/* Radii */}
          <line x1="80" y1="60" x2="80" y2="16" stroke="#2a2a2a" strokeWidth="1.2" strokeDasharray="3,2" />
          <line x1="80" y1="60" x2="120" y2="82" stroke="#2a2a2a" strokeWidth="1.2" strokeDasharray="3,2" />
          {/* ω arc indicator */}
          <path d="M 80,30 A 30,30 0 0,1 102,78" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2,2" />
          {/* Labels */}
          <text x="56" y="38" fill="#22d3ee" fontSize="9">D/2</text>
          <text x="94" y="42" fill="#f59e0b" fontSize="10" fontWeight="600">ω</text>
          <text x="105" y="46" fill="#a78bfa" fontSize="10" fontWeight="600">ℓ</text>
          {/* Formulas */}
          <text x="170" y="30" fill="#8a8a8a" fontSize="9">T_rpm = 60,000 / N</text>
          <text x="170" y="46" fill="#8a8a8a" fontSize="9">ω = T_res / T_rpm × 360°</text>
          <text x="170" y="62" fill="#a78bfa" fontSize="9" fontWeight="500">ℓ = D·π·T_res / T_rpm</text>
        </svg>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-3">
        <NumericInput
          label="원의 지름 (D)"
          unit={unitLabel(unit)}
          value={diameter}
          onChange={setDiameter}
          placeholder="100"
        />
        <NumericInput
          label="회전속도 (N)"
          unit="RPM"
          value={rpm}
          onChange={setRpm}
          placeholder="60"
        />
        <NumericInput
          label="센서 응답속도 (T_res)"
          unit="Hz"
          value={responseTime}
          onChange={setResponseTime}
          placeholder="500"
        />
      </div>

      {/* Result */}
      <AnimatedResult
        label="호의 길이 (ℓ)"
        value={arcLengthInUnit}
        unit={unitLabel(unit)}
        decimals={3}
      />

      {/* 중간값 */}
      {result !== null && (
        <div className="flex flex-col gap-2">
          <div
            className="rounded-lg px-4 py-3 flex justify-between items-center"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <span className="text-xs text-[var(--text-secondary)]">1회전 시간 (T_rpm)</span>
            <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--text-primary)" }}>
              {result.tRpm.toFixed(3)} ms
            </span>
          </div>
          <div
            className="rounded-lg px-4 py-3 flex justify-between items-center"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <span className="text-xs text-[var(--text-secondary)]">회전 각도 (ω)</span>
            <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--text-primary)" }}>
              {result.omega.toFixed(4)} °
            </span>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
