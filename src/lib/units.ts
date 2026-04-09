export type LengthUnit = "mm" | "cm" | "inch";

// Convert value FROM the given unit TO mm
export function toMm(value: number, unit: LengthUnit): number {
  switch (unit) {
    case "mm":   return value;
    case "cm":   return value * 10;
    case "inch": return value * 25.4;
  }
}

// Convert value FROM mm TO the given unit
export function fromMm(valueMm: number, unit: LengthUnit): number {
  switch (unit) {
    case "mm":   return valueMm;
    case "cm":   return valueMm / 10;
    case "inch": return valueMm / 25.4;
  }
}

export function unitLabel(unit: LengthUnit): string {
  switch (unit) {
    case "mm":   return "mm";
    case "cm":   return "cm";
    case "inch": return "in";
  }
}
