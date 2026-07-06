"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsightCardProps {
  insight: {
    id: string;
    type: string;
    priority: string;
    title: string;
    description: string;
    action?: string;
    impact?: string;
    confidence?: number;
    agent?: string;
  };
  delay?: number;
  compact?: boolean;
}

const typeConfig = {
  opportunity: {
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    dot: "bg-cyan-400",
    label: "Opportunity",
  },
  warning: {
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    dot: "bg-orange-400",
    label: "Alert",
  },
  growth: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-400",
    label: "Growth",
  },
  referral: {
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    dot: "bg-violet-400",
    label: "Referral",
  },
  competitor: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    dot: "bg-yellow-400",
    label: "Competitor",
  },
  forecast: {
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-400",
    label: "Forecast",
  },
};

export function AIInsightCard({ insight, delay = 0, compact = false }: AIInsightCardProps) {
  const config = typeConfig[insight.type as keyof typeof typeConfig] || typeConfig.opportunity;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "rounded-2xl border p-4 cursor-pointer group",
        "hover:border-white/15 transition-all duration-200",
        "dark:bg-white/[0.03] bg-black/[0.02]",
        "dark:border-white/8 border-black/5"
      )}
    >
      <div className="flex items-start gap-3">
        {/* AI Icon */}
        <div className="relative flex-shrink-0">
          <div className="p-2 rounded-xl bg-ai-500/10 border border-ai-500/20 ai-pulse">
            <Sparkles className="w-4 h-4 text-ai-400" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border",
                config.bg,
                config.color
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
              {config.label}
            </span>
            {insight.confidence && (
              <span className="text-xs text-muted-foreground">
                {insight.confidence}% confidence
              </span>
            )}
            {insight.agent && (
              <span className="text-xs text-ai-400/60 ml-auto">
                {insight.agent}
              </span>
            )}
          </div>

          {/* Title */}
          <h4 className="text-sm font-semibold text-foreground leading-snug mb-1">
            {insight.title}
          </h4>

          {/* Description */}
          {!compact && (
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {insight.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            {insight.impact && (
              <span className="text-xs font-semibold text-emerald-400">
                {insight.impact}
              </span>
            )}
            {insight.action && (
              <button className="flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors ml-auto group-hover:gap-2">
                {insight.action}
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
