"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";

interface AnimatedResultProps {
  label: string;
  value: number | null;
  unit: string;
  decimals?: number;
}

export default function AnimatedResult({
  label,
  value,
  unit,
  decimals = 3,
}: AnimatedResultProps) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 400, damping: 40, mass: 0.5 });
  const display = useTransform(spring, (v) =>
    v.toFixed(decimals)
  );
  const prevValue = useRef<number | null>(null);

  useEffect(() => {
    if (value !== null) {
      if (prevValue.current === null) {
        motionValue.set(value);
      } else {
        motionValue.set(value);
      }
    }
    prevValue.current = value;
  }, [value, motionValue]);

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-2"
      style={{
        background: value !== null ? "var(--accent-dim)" : "var(--surface-2)",
        border: `1px solid ${value !== null ? "rgba(34,211,238,0.3)" : "var(--border)"}`,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <span className="text-xs font-medium tracking-wide text-[var(--text-secondary)] uppercase">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        {value !== null ? (
          <motion.span
            key="value"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tabular-nums"
            style={{ color: "var(--accent)" }}
          >
            <motion.span>{display}</motion.span>
          </motion.span>
        ) : (
          <span
            className="text-4xl font-bold"
            style={{ color: "var(--text-secondary)" }}
          >
            —
          </span>
        )}
        <span className="text-lg font-medium text-[var(--text-secondary)]">
          {unit}
        </span>
      </div>
    </div>
  );
}
