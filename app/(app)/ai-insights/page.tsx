"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, Star, Zap, Target, Users, TrendingUp, BarChart3, CheckCircle } from "lucide-react";
import { AIInsightCard } from "@/components/shared/ai-insight-card";
import { mockAIInsights } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const agents = [
  { name: "Review Agent", icon: Star, status: "active", description: "Identifying 47 review opportunities", processed: 1248, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  { name: "Sentiment Agent", icon: Brain, status: "active", description: "Monitoring 8 patient conversations", processed: 892, color: "text-ai-400", bg: "bg-ai-500/10 border-ai-500/20" },
  { name: "Recovery Agent", icon: Zap, status: "active", description: "Tracking 3 recovery workflows", processed: 47, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { name: "SEO Agent", icon: TrendingUp, status: "active", description: "Analyzing keyword performance", processed: 5, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { name: "Referral Agent", icon: Users, status: "active", description: "18 referral opportunities queued", processed: 134, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { name: "Executive Agent", icon: BarChart3, status: "active", description: "Preparing weekly insights report", processed: 84, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
];

export default function AIInsightsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">AI Executive Insights</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Multi-agent AI intelligence operating continuously across your platform
        </p>
      </motion.div>

      {/* AI Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-ai-500/20 bg-ai-500/5 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ai-500/10 border border-ai-500/20 ai-pulse">
              <Sparkles className="w-5 h-5 text-ai-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">AI Multi-Agent System</h3>
              <p className="text-xs text-muted-foreground">6 agents running · All systems operational</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {agents.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i }}
                className={cn("rounded-xl border p-3 text-center", agent.bg)}
              >
                <Icon className={cn("w-5 h-5 mx-auto mb-1.5", agent.color)} />
                <p className="text-xs font-semibold text-foreground leading-tight">{agent.name}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400">Active</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{agent.processed} processed</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Agent Activity Feed */}
      <div className="grid grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 lg:col-span-5 rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Agent Activity Feed</h3>
          <div className="space-y-4">
            {[
              { agent: "Review Agent", icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10", msg: "Identified Sarah M. (97% satisfaction) → Google review request queued", time: "2m ago" },
              { agent: "Sentiment Agent", icon: Brain, color: "text-ai-400", bg: "bg-ai-500/10", msg: "Detected frustration pattern in Linda K.'s portal message → Recovery workflow triggered", time: "8m ago" },
              { agent: "SEO Agent", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", msg: "Westside Clinic Healthgrades rank improved from #8 to #5 for 'family doctor austin'", time: "23m ago" },
              { agent: "Referral Agent", icon: Users, color: "text-violet-400", bg: "bg-violet-500/10", msg: "Emma P. (NPS 10) → Referral request sent via email", time: "1h ago" },
              { agent: "Recovery Agent", icon: Zap, color: "text-orange-400", bg: "bg-orange-500/10", msg: "Rachel G. complaint resolved by Westside manager → Case closed", time: "2h ago" },
              { agent: "Executive Agent", icon: BarChart3, color: "text-cyan-400", bg: "bg-cyan-500/10", msg: "Weekly insights report generated → Revenue impact: +$24,600 from reputation growth", time: "4h ago" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="flex items-start gap-3"
                >
                  <div className={cn("w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 border", item.bg, item.bg.replace("bg-", "border-").replace("/10", "/20"))}>
                    <Icon className={cn("w-3.5 h-3.5", item.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={cn("text-xs font-semibold", item.color)}>{item.agent}</span>
                      <span className="text-[10px] text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">{item.msg}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* All AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="col-span-12 lg:col-span-7 rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Active Recommendations</h3>
          <div className="space-y-3">
            {mockAIInsights.map((insight, i) => (
              <AIInsightCard key={insight.id} insight={insight} delay={0.05 * i} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ROI Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">AI-Estimated Reputation ROI</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Revenue from Reputation", value: "$128,400", trend: "+18%", icon: BarChart3, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { label: "Negative Reviews Prevented", value: "34", trend: "this year", icon: CheckCircle, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
            { label: "Referrals Generated", value: "134", trend: "+24%", icon: Users, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
            { label: "Time Saved (AI Responses)", value: "312h", trend: "vs manual", icon: Sparkles, color: "text-ai-400", bg: "bg-ai-500/10 border-ai-500/20" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className={cn("rounded-2xl border p-5", item.bg)}
              >
                <Icon className={cn("w-5 h-5 mb-3", item.color)} />
                <p className={cn("text-2xl font-black", item.color)}>{item.value}</p>
                <p className="text-xs text-foreground font-medium mt-1">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.trend}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
