/**
 * 근접센서 응답속도로 호의 길이 계산
 *
 * N      = 회전속도 (rpm)
 * D      = 원의 지름 (mm)
 * T_res  = 센서 응답속도 (ms)
 *
 * T_rpm = 60,000 / N          (ms, 1회전에 걸리는 시간)
 * ω     = T_res / T_rpm × 360 (°, 응답시간 동안 회전한 각도)
 * ℓ     = D · π · T_res / T_rpm
 *       = D · π · N · T_res / 60,000  (mm)
 */
export interface ProxSensorResult {
  arcLength: number;   // mm
  tRpm: number;        // ms, 1회전 시간
  omega: number;       // °, 응답시간 동안 회전 각도
}

export function calcProxSensor(
  diameterMm: number,
  rpm: number,
  responseMs: number
): ProxSensorResult | null {
  if (diameterMm <= 0 || rpm <= 0 || responseMs <= 0) return null;
  const tRpm = 60_000 / rpm;
  const omega = (responseMs / tRpm) * 360;
  const arcLength = (diameterMm * Math.PI * responseMs) / tRpm;
  return { arcLength, tRpm, omega };
}
