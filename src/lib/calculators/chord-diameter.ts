/**
 * 현(chord)과 수선(sagitta)으로 원의 지름 계산
 *
 * c = 현의 길이 (chord length)
 * s = 수선의 길이 (sagitta — 현의 중점에서 호까지의 수직 거리)
 *
 * r = c² / (8s) + s / 2
 * d = 2r = c² / (4s) + s
 */
export function calcChordDiameter(chord: number, sagitta: number): number | null {
  if (chord <= 0 || sagitta <= 0) return null;
  if (sagitta > chord / 2) return null; // geometrically impossible
  return (chord * chord) / (4 * sagitta) + sagitta;
}
