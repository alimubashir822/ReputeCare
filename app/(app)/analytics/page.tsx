"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Search, ArrowUp, ArrowDown } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from "recharts";
import { mockAnalyticsData, mockReviewTrendData, mockForecast, mockProviders } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Local SEO, referral funnel, reputation forecast, and provider performance
        </p>
      </motion.div>

      {/* AI Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-ai-500/20 bg-ai-500/5 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-ai-500/10 border border-ai-500/20 ai-pulse">
            <TrendingUp className="w-4 h-4 text-ai-400" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">AI Reputation Forecast</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockForecast.map((period, i) => (
            <motion.div
              key={period.period}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + 0.05 * i }}
              className="rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.03] bg-white p-5"
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{period.period}</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xl font-bold text-cyan-400">{period.expectedReviews}</p>
                  <p className="text-[10px] text-muted-foreground">Reviews</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-yellow-400">{period.predictedRating}★</p>
                  <p className="text-[10px] text-muted-foreground">Rating</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-orange-400">{period.potentialNegative}</p>
                  <p className="text-[10px] text-muted-foreground">At-Risk</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-ai-500" style={{ width: `${period.confidence}%` }} />
                </div>
                <span>{period.confidence}% confidence</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* SEO Keywords + Referral Funnel */}
      <div className="grid grid-cols-12 gap-4">
        {/* SEO Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 lg:col-span-6 rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.03] bg-white p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-foreground">Local SEO Keywords</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th className="text-left">Keyword</th>
                  <th className="text-center">Rank</th>
                  <th className="text-center">Volume</th>
                  <th className="text-center">Trend</th>
                </tr>
              </thead>
              <tbody>
                {mockAnalyticsData.seoKeywords.map((kw) => (
                  <tr key={kw.keyword}>
                    <td className="text-foreground text-xs">{kw.keyword}</td>
                    <td className="text-center">
                      <span className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded-full",
                        kw.rank <= 3 ? "text-emerald-400 bg-emerald-500/10" :
                        kw.rank <= 7 ? "text-cyan-400 bg-cyan-500/10" :
                        "text-yellow-400 bg-yellow-500/10"
                      )}>
                        #{kw.rank}
                      </span>
                    </td>
                    <td className="text-center text-xs text-muted-foreground">{kw.volume.toLocaleString()}/mo</td>
                    <td className="text-center">
                      <span className={cn("text-xs font-semibold", kw.trend.startsWith("+") ? "text-emerald-400" : kw.trend === "0" ? "text-slate-400" : "text-red-400")}>
                        {kw.trend.startsWith("+") ? <ArrowUp className="w-3 h-3 inline" /> : kw.trend !== "0" ? <ArrowDown className="w-3 h-3 inline" /> : "—"}
                        {kw.trend !== "0" ? kw.trend.replace(/^[+-]/, "") : ""}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Referral Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="col-span-12 lg:col-span-6 rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.03] bg-white p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Referral Funnel</h3>
          <div className="space-y-3">
            {mockAnalyticsData.referralFunnel.map((stage, i) => {
              const maxCount = mockAnalyticsData.referralFunnel[0].count;
              const pct = (stage.count / maxCount) * 100;
              const colors = ["#06b6d4", "#0891b2", "#10b981", "#059669", "#047857"];
              return (
                <div key={stage.stage}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{stage.stage}</span>
                    <span className="font-semibold text-foreground">{stage.count.toLocaleString()}</span>
                  </div>
                  <div className="h-6 rounded-xl bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.1 * i }}
                      className="h-full rounded-xl flex items-center px-3"
                      style={{ background: colors[i] }}
                    >
                      <span className="text-[10px] text-white font-semibold">{pct.toFixed(0)}%</span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Provider Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.03] bg-white p-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Provider Performance Leaderboard</h3>
        <div className="space-y-3">
          {mockProviders.map((provider, i) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-center gap-4 p-4 rounded-2xl border dark:border-white/5 border-black/5 dark:bg-white/[0.02] bg-black/[0.02]"
            >
              <div className="text-lg font-black text-muted-foreground/30 w-6 text-center">{i + 1}</div>
              <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {provider.name.split(" ").slice(1).map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{provider.name}</p>
                <p className="text-xs text-muted-foreground">{provider.specialty} · {provider.location}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-yellow-400">{provider.avgRating}★</p>
                <p className="text-[10px] text-muted-foreground">Avg Rating</p>
              </div>
              <div className="text-center hidden md:block">
                <p className="text-sm font-bold text-foreground">{provider.totalReviews}</p>
                <p className="text-[10px] text-muted-foreground">Reviews</p>
              </div>
              <div className="text-center hidden lg:block">
                <p className="text-sm font-bold text-emerald-400">{provider.satisfactionScore}%</p>
                <p className="text-[10px] text-muted-foreground">Satisfaction</p>
              </div>
              <div className="text-center hidden lg:block">
                <p className="text-sm font-bold text-cyan-400">{provider.responseTime}</p>
                <p className="text-[10px] text-muted-foreground">Response Time</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
