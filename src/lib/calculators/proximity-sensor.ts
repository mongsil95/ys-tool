/**
 * 근접센서 블럭 최소 길이 계산
 *
 * d     = 원의 지름 (mm)
 * rpm   = 기계 회전수 (rev/min)
 * t_ms  = 근접센서 응답속도 (ms)
 *
 * 표면 속도 v = π × d × rpm / 60   (mm/s)
 * 최소 블럭 길이 L = v × (t_ms / 1000)
 *                  = π × d × rpm × t_ms / 60_000   (mm)
 */
export function calcProxSensorBlock(
  diameterMm: number,
  rpm: number,
  responseMs: number
): number | null {
  if (diameterMm <= 0 || rpm <= 0 || responseMs <= 0) return null;
  return (Math.PI * diameterMm * rpm * responseMs) / 60_000;
}
