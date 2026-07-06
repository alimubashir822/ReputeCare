"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendLabel?: string;
  icon: React.ReactNode;
  iconBg?: string;
  description?: string;
  delay?: number;
  className?: string;
}

export function StatCard({
  title,
  value,
  trend,
  trendLabel,
  icon,
  iconBg = "bg-cyan-500/10",
  description,
  delay = 0,
  className,
}: StatCardProps) {
  const isPositive = trend?.startsWith("+");
  const isNegative = trend?.startsWith("-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-5 card-hover",
        "dark:border-white/8 border-black/5",
        className
      )}
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-cyan-500/10 blur-2xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className={cn("p-2.5 rounded-xl", iconBg)}>
            {icon}
          </div>
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
                isPositive && "text-emerald-400 bg-emerald-500/10",
                isNegative && "text-red-400 bg-red-500/10",
                !isPositive && !isNegative && "text-slate-400 bg-slate-500/10"
              )}
            >
              {isPositive ? "↑" : isNegative ? "↓" : "→"} {trend.replace(/^[+-]/, "")}
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mt-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground leading-none">{value}</p>
        </div>

        {/* Description */}
        {description && (
          <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        )}
        {trendLabel && (
          <p className="mt-1 text-xs text-muted-foreground">{trendLabel}</p>
        )}
      </div>
    </motion.div>
  );
}
