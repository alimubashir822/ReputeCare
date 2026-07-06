"use client";

import { motion } from "framer-motion";
import { Zap, AlertTriangle, TrendingUp, MessageSquare } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from "recharts";
import { mockSentimentTrend, mockVoiceThemes, mockPatients } from "@/lib/mock-data";
import { cn, getSentimentColor, getSentimentLabel } from "@/lib/utils";

const moodColors: Record<string, string> = {
  very_positive: "#10b981",
  positive: "#06b6d4",
  neutral: "#64748b",
  negative: "#f97316",
  very_negative: "#ef4444",
};

export default function SentimentPage() {
  const atRisk = mockPatients.filter(p => p.sentiment === "negative" || p.sentiment === "very_negative");

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">AI Sentiment Engine</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time sentiment analysis across all patient touchpoints
        </p>
      </motion.div>

      {/* Alert Banner */}
      {atRisk.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-orange-500/8 border border-orange-500/20"
        >
          <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0" />
          <p className="text-sm text-orange-400 font-medium">
            ⚡ AI Alert: {atRisk.length} patients showing dissatisfaction signals — early intervention recommended before public reviews are posted.
          </p>
          <button className="ml-auto text-xs font-semibold text-orange-400 hover:text-orange-300 whitespace-nowrap transition-colors">
            View Patients →
          </button>
        </motion.div>
      )}

      {/* Sentiment Distribution */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { label: "Very Positive", value: "52%", color: "#10b981", sentiment: "very_positive" },
          { label: "Positive", value: "28%", color: "#06b6d4", sentiment: "positive" },
          { label: "Neutral", value: "12%", color: "#64748b", sentiment: "neutral" },
          { label: "Negative", value: "6%", color: "#f97316", sentiment: "negative" },
          { label: "Very Negative", value: "2%", color: "#ef4444", sentiment: "very_negative" },
        ].map((item, i) => (
          <motion.div
            key={item.sentiment}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="rounded-2xl border border-border bg-card p-4 text-center"
          >
            <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}>
              <div className="w-4 h-4 rounded-full" style={{ background: item.color }} />
            </div>
            <p className="text-xl font-bold text-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Sentiment Trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 lg:col-span-8 rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-foreground">Sentiment Trend (8 Weeks)</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Overall sentiment distribution over time</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockSentimentTrend}>
              <defs>
                <linearGradient id="pos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="neg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="positive" stroke="#10b981" fill="url(#pos)" strokeWidth={2} name="Positive" />
              <Area type="monotone" dataKey="neutral" stroke="#64748b" fill="none" strokeWidth={1.5} strokeDasharray="4 4" name="Neutral" />
              <Area type="monotone" dataKey="negative" stroke="#ef4444" fill="url(#neg)" strokeWidth={2} name="Negative" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* At-Risk Patients */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="col-span-12 lg:col-span-4 rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-semibold text-foreground">At-Risk Patients</h3>
          </div>
          <div className="space-y-3">
            {atRisk.map((patient, i) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="flex items-center gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/15"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 text-xs font-bold">
                  {patient.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{patient.name}</p>
                  <p className="text-[10px] text-muted-foreground">{patient.tags.join(", ")}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-orange-400">{patient.satisfactionScore}%</p>
                  <p className="text-[10px] text-muted-foreground">sat.</p>
                </div>
              </motion.div>
            ))}
            <button className="w-full py-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
              View all at-risk patients →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Voice of the Patient */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-ai-400" />
          <h3 className="text-sm font-semibold text-foreground">Voice of the Patient — Top Themes</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">AI-aggregated from reviews, surveys, messages, and portal feedback</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mockVoiceThemes.map((theme, i) => (
            <motion.div
              key={theme.theme}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04 * i }}
              className={cn(
                "p-4 rounded-2xl border",
                theme.sentiment === "positive"
                  ? "bg-emerald-500/5 border-emerald-500/15"
                  : "bg-red-500/5 border-red-500/15"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "text-xs font-semibold",
                  theme.sentiment === "positive" ? "text-emerald-400" : "text-red-400"
                )}>
                  {theme.sentiment === "positive" ? "↑" : "↓"} {theme.trend}
                </span>
                <span className="text-xs text-muted-foreground">{theme.mentions} mentions</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{theme.theme}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
