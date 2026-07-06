"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp, Clock, Shield, ExternalLink, RefreshCw } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";
import { ReputationScoreRing } from "@/components/shared/reputation-score-ring";
import { mockReputation, mockReputationTimeline, mockCompetitors } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const platforms = [
  { key: "google", label: "Google", color: "#4285F4", logo: "G" },
  { key: "healthgrades", label: "Healthgrades", color: "#0EA5E9", logo: "H" },
  { key: "facebook", label: "Facebook", color: "#1877F2", logo: "f" },
  { key: "yelp", label: "Yelp", color: "#FF1A1A", logo: "Y" },
];

const radarData = [
  { subject: "Rating", A: 96, fullMark: 100 },
  { subject: "Volume", A: 88, fullMark: 100 },
  { subject: "Velocity", A: 92, fullMark: 100 },
  { subject: "Response", A: 87, fullMark: 100 },
  { subject: "Sentiment", A: 94, fullMark: 100 },
  { subject: "Recovery", A: 79, fullMark: 100 },
];

export default function ReputationPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Reputation Center</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your complete reputation intelligence across all platforms
        </p>
      </motion.div>

      {/* Top Cards */}
      <div className="grid grid-cols-12 gap-4">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 md:col-span-4 lg:col-span-3 rounded-2xl border border-border bg-card p-6 flex flex-col items-center gap-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-hero opacity-40 pointer-events-none" />
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Overall Reputation</p>
          <ReputationScoreRing score={mockReputation.overallScore} size={140} delay={0.3} label="Score" sublabel="Excellent" />
          <div className="w-full grid grid-cols-2 gap-2 text-center text-xs">
            <div className="rounded-xl bg-muted/40 border border-border p-2">
              <p className="text-muted-foreground">Rating</p>
              <p className="font-bold text-yellow-400">{mockReputation.overallRating}★</p>
            </div>
            <div className="rounded-xl bg-muted/40 border border-border p-2">
              <p className="text-muted-foreground">Reviews</p>
              <p className="font-bold text-foreground">{mockReputation.totalReviews.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-muted/40 border border-border p-2">
              <p className="text-muted-foreground">Response Rate</p>
              <p className="font-bold text-emerald-400">{mockReputation.responseRate}%</p>
            </div>
            <div className="rounded-xl bg-muted/40 border border-border p-2">
              <p className="text-muted-foreground">Avg Response</p>
              <p className="font-bold text-foreground">{mockReputation.avgResponseTime}</p>
            </div>
          </div>
        </motion.div>

        {/* Platform Breakdown */}
        <div className="col-span-12 md:col-span-8 lg:col-span-5 grid grid-cols-2 gap-4">
          {platforms.map((platform, i) => {
            const data = mockReputation.platforms[platform.key as keyof typeof mockReputation.platforms];
            return (
              <motion.div
                key={platform.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-4 card-hover cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: platform.color }}>
                    {platform.logo}
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{platform.label}</p>
                <p className="text-xl font-bold text-foreground">{data.rating}★</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{data.reviews.toLocaleString()} reviews</span>
                  <span className={cn("font-semibold", data.trend.startsWith("+") ? "text-emerald-400" : "text-slate-400")}>
                    {data.trend !== "0" ? data.trend : "Stable"}
                  </span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.rating / 5) * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: platform.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 lg:col-span-4 rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-1">Reputation Dimensions</h3>
          <p className="text-xs text-muted-foreground mb-4">6-axis reputation analysis</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#64748b" }} />
              <Radar name="Score" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Timeline Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Reputation Score Timeline</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Score and rating history over 12 months</p>
          </div>
          <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={mockReputationTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="score" domain={[75, 100]} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="rating" orientation="right" domain={[4, 5]} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            />
            <Line yAxisId="score" type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: "#06b6d4", r: 3 }} name="Rep Score" />
            <Line yAxisId="rating" type="monotone" dataKey="rating" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 3 }} name="Avg Rating" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Competitor Snapshot */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Competitor Overview</h3>
          <a href="/competitors" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">View full benchmarks →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th className="text-left">Competitor</th>
                <th className="text-left">Google Rating</th>
                <th className="text-left">Reviews</th>
                <th className="text-left">Monthly Reviews</th>
                <th className="text-left">Trend</th>
                <th className="text-left">vs. You</th>
              </tr>
            </thead>
            <tbody>
              {mockCompetitors.map((comp) => (
                <tr key={comp.id}>
                  <td className="font-medium text-foreground">{comp.name}</td>
                  <td>
                    <span className="text-yellow-400 font-semibold">{comp.googleRating}★</span>
                  </td>
                  <td className="text-muted-foreground">{comp.googleReviews.toLocaleString()}</td>
                  <td className="text-muted-foreground">{comp.monthlyReviews}/mo</td>
                  <td>
                    <span className={cn(
                      "text-xs font-semibold px-2 py-1 rounded-full",
                      comp.trend === "growing" ? "text-emerald-400 bg-emerald-500/10" :
                      comp.trend === "improving" ? "text-cyan-400 bg-cyan-500/10" :
                      "text-slate-400 bg-slate-500/10"
                    )}>
                      {comp.trend}
                    </span>
                  </td>
                  <td>
                    <span className={cn(
                      "text-xs font-semibold",
                      mockReputation.overallRating > comp.googleRating ? "text-emerald-400" : "text-red-400"
                    )}>
                      {mockReputation.overallRating > comp.googleRating ? "↑" : "↓"}{" "}
                      {Math.abs(mockReputation.overallRating - comp.googleRating).toFixed(1)} pts
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
