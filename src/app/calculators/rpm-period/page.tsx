"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import NumericInput from "@/components/NumericInput";
import AnimatedResult from "@/components/AnimatedResult";
import { type TimeUnit, calcRpmToPeriod, calcPeriodToRpm, convertPeriod } from "@/lib/calculators/rpm-period";

export default function RpmPeriodPage() {
  const [rpm, setRpm] = useState("");
  const [period, setPeriod] = useState("");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("ms");

  const rpmNum = parseFloat(rpm);
  const periodNum = parseFloat(period);

  const periodResult = !isNaN(rpmNum) && rpmNum > 0 ? calcRpmToPeriod(rpmNum, timeUnit) : null;
  const rpmResult = !isNaN(periodNum) && periodNum > 0 ? calcPeriodToRpm(periodNum, timeUnit) : null;

  const onTimeUnitChange = (newUnit: TimeUnit) => {
    const t = parseFloat(period);
    if (!isNaN(t) && t > 0) {
      setPeriod(String(parseFloat(convertPeriod(t, timeUnit, newUnit).toFixed(6))));
    }
    setTimeUnit(newUnit);
  };

  return (
    <CalculatorLayout
      title="RPM / 주기"
      description="회전속도와 주기 상호 변환"
    >
      {/* 수식 다이어그램 */}
      <div
        className="rounded-xl p-4"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <svg viewBox="0 0 280 100" className="w-full" style={{ maxHeight: "90px" }}>
          <circle cx="50" cy="50" r="32" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="3" fill="#22d3ee" />
          <line x1="50" y1="50" x2="78" y2="30" stroke="#2a2a2a" strokeWidth="1.2" strokeDasharray="3,2" />
          <path d="M 50,18 A 32,32 0 0,1 82,50" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
          <polygon points="82,43 82,57 90,50" fill="#a78bfa" />
          <text x="115" y="36" fill="#22d3ee" fontSize="11" fontWeight="600">T = 60 / N</text>
          <text x="115" y="54" fill="#a78bfa" fontSize="11" fontWeight="600">N = 60 / T</text>
          <text x="115" y="72" fill="#8a8a8a" fontSize="9">T: 주기, N: 회전속도(rpm)</text>
        </svg>
      </div>

      {/* 시간 단위 토글 */}
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>주기 단위</span>
        <div
          className="flex rounded-lg overflow-hidden"
          style={{ border: "1px solid var(--border)", background: "var(--surface-2)" }}
        >
          {(["ms", "s"] as TimeUnit[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => onTimeUnitChange(u)}
              className="px-4 py-2 text-sm font-medium transition-all"
              style={{
                background: timeUnit === u ? "var(--accent)" : "transparent",
                color: timeUnit === u ? "#000" : "var(--text-secondary)",
                minWidth: "48px",
              }}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* RPM → 주기 */}
      <div className="flex flex-col gap-3">
        <NumericInput
          label="회전속도 (N)"
          unit="RPM"
          value={rpm}
          onChange={setRpm}
          placeholder="600"
        />
        <AnimatedResult
          label="주기 (T)"
          value={periodResult}
          unit={timeUnit}
          decimals={timeUnit === "ms" ? 3 : 6}
        />
      </div>

      {/* 구분선 */}
      <div style={{ borderTop: "1px solid var(--border)" }} />

      {/* 주기 → RPM */}
      <div className="flex flex-col gap-3">
        <NumericInput
          label="주기 (T)"
          unit={timeUnit}
          value={period}
          onChange={setPeriod}
          placeholder={timeUnit === "ms" ? "100" : "0.1"}
        />
        <AnimatedResult
          label="회전속도 (N)"
          value={rpmResult}
          unit="RPM"
          decimals={3}
        />
      </div>
    </CalculatorLayout>
  );
}

