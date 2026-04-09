"use client";

import { useState, useMemo } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import NumericInput from "@/components/NumericInput";
import AnimatedResult from "@/components/AnimatedResult";
import { type LengthUnit, toMm, fromMm, unitLabel } from "@/lib/units";
import { calcProxSensorBlock } from "@/lib/calculators/proximity-sensor";

export default function ProximitySensorPage() {
  const [unit, setUnit] = useState<LengthUnit>("mm");
  const [diameter, setDiameter] = useState("");
  const [rpm, setRpm] = useState("");
  const [responseMs, setResponseMs] = useState("");

  const resultMm = useMemo(() => {
    const d = parseFloat(diameter);
    const n = parseFloat(rpm);
    const t = parseFloat(responseMs);
    if (isNaN(d) || isNaN(n) || isNaN(t)) return null;
    const dMm = toMm(d, unit);
    return calcProxSensorBlock(dMm, n, t);
  }, [diameter, rpm, responseMs, unit]);

  const resultInUnit = useMemo(
    () => (resultMm !== null ? fromMm(resultMm, unit) : null),
    [resultMm, unit]
  );

  // Surface speed in mm/s for display
  const surfaceSpeedMmS = useMemo(() => {
    const d = parseFloat(diameter);
    const n = parseFloat(rpm);
    if (isNaN(d) || isNaN(n) || d <= 0 || n <= 0) return null;
    const dMm = toMm(d, unit);
    return (Math.PI * dMm * n) / 60;
  }, [diameter, rpm, unit]);

  return (
    <CalculatorLayout
      title="근접센서 블럭 길이"
      description="최소 감지 블럭 길이 계산"
      unit={unit}
      onUnitChange={setUnit}
    >
      {/* 수식 카드 */}
      <div
        className="rounded-xl p-4"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <svg viewBox="0 0 280 90" className="w-full" style={{ maxHeight: "80px" }}>
          {/* Rotating disk */}
          <circle cx="80" cy="45" r="34" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
          <circle cx="80" cy="45" r="4" fill="#22d3ee" />
          {/* Diameter line */}
          <line x1="46" y1="45" x2="114" y2="45" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="80" y="58" textAnchor="middle" fill="#22d3ee" fontSize="9">d</text>
          {/* Block on rim */}
          <rect x="112" y="32" width="14" height="10" rx="2" fill="#a78bfa" opacity="0.8" />
          {/* Sensor */}
          <rect x="136" y="30" width="10" height="14" rx="2" fill="#f59e0b" opacity="0.7" />
          <line x1="126" y1="37" x2="136" y2="37" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2,2" />
          {/* Labels */}
          <text x="119" y="55" textAnchor="middle" fill="#a78bfa" fontSize="9">블럭</text>
          <text x="141" y="55" textAnchor="middle" fill="#f59e0b" fontSize="9">센서</text>
          {/* Formula */}
          <text x="220" y="38" textAnchor="middle" fill="#8a8a8a" fontSize="9">v = π·d·n/60</text>
          <text x="220" y="52" textAnchor="middle" fill="#8a8a8a" fontSize="9">L = v · t/1000</text>
        </svg>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-3">
        <NumericInput
          label="원의 지름 (d)"
          unit={unitLabel(unit)}
          value={diameter}
          onChange={setDiameter}
          placeholder="100"
        />
        <NumericInput
          label="회전수 (n)"
          unit="RPM"
          value={rpm}
          onChange={setRpm}
          placeholder="60"
        />
        <NumericInput
          label="센서 응답속도 (t)"
          unit="ms"
          value={responseMs}
          onChange={setResponseMs}
          placeholder="10"
        />
      </div>

      {/* Result */}
      <AnimatedResult
        label="최소 블럭 길이 (L)"
        value={resultInUnit}
        unit={unitLabel(unit)}
        decimals={3}
      />

      {surfaceSpeedMmS !== null && (
        <div
          className="rounded-lg px-4 py-3 flex justify-between items-center"
          style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
        >
          <span className="text-xs text-[var(--text-secondary)]">표면 속도</span>
          <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--text-primary)" }}>
            {surfaceSpeedMmS.toFixed(1)} mm/s
          </span>
        </div>
      )}
    </CalculatorLayout>
  );
}
