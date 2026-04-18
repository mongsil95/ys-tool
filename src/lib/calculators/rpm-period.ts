/**
 * RPM ↔ 주기(Period) 상호 변환
 *
 * N = 회전속도 (rpm)
 * T = 주기 — 1회전에 걸리는 시간
 *
 * T(ms) = 60,000 / N
 * T(s)  = 60 / N
 * N     = 60,000 / T(ms)  =  60 / T(s)
 */

export type TimeUnit = "ms" | "s";

export function calcRpmToPeriod(rpm: number, unit: TimeUnit): number | null {
  if (rpm <= 0) return null;
  return unit === "ms" ? 60_000 / rpm : 60 / rpm;
}

export function calcPeriodToRpm(period: number, unit: TimeUnit): number | null {
  if (period <= 0) return null;
  return unit === "ms" ? 60_000 / period : 60 / period;
}

export function convertPeriod(period: number, from: TimeUnit, to: TimeUnit): number {
  if (from === to) return period;
  return from === "ms" ? period / 1000 : period * 1000;
}
