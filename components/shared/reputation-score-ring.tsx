"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReputationScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
  delay?: number;
}

export function ReputationScoreRing({
  score,
  size = 160,
  strokeWidth = 10,
  label,
  sublabel,
  className,
  delay = 0,
}: ReputationScoreRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 90) return "#10b981"; // emerald
    if (s >= 75) return "#06b6d4"; // cyan
    if (s >= 60) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  const color = getColor(score);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold"
          style={{ color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.8 }}
        >
          {score}
        </motion.span>
        {label && (
          <span className="text-xs font-semibold text-muted-foreground mt-0.5">
            {label}
          </span>
        )}
        {sublabel && (
          <span className="text-xs text-muted-foreground/60 mt-0.5">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
