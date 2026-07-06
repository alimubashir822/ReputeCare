"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, TrendingDown, Star, ExternalLink } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from "recharts";
import { mockCompetitors } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const yourRating = 4.7;
const chartData = [
  { name: "ReputeCare (You)", rating: 4.7, reviews: 2702, color: "#06b6d4" },
  ...mockCompetitors.map(c => ({ name: c.name.split(" ")[0] + " " + c.name.split(" ")[1], rating: c.googleRating, reviews: c.googleReviews, color: "#6366f1" })),
];

export default function CompetitorsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Competitor Benchmarking</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Compare your reputation against nearby competitors using public review data
        </p>
      </motion.div>

      {/* Your Position Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl gradient-brand shadow-lg">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Your Position: #1 in Local Market</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              HealthFirst Medical Group leads with {yourRating}★ average rating vs {(mockCompetitors.reduce((a, c) => a + c.googleRating, 0) / mockCompetitors.length).toFixed(1)}★ market average
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Leading</span>
          </div>
        </div>
      </motion.div>

      {/* Rating Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Google Rating Comparison</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis type="number" domain={[3.5, 5]} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={130} />
            <Tooltip
              formatter={(value) => [`${value}★`, "Rating"]}
              contentStyle={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }}
            />
            <Bar dataKey="rating" radius={[0, 6, 6, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Competitor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {mockCompetitors.map((comp, i) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="rounded-2xl border border-border bg-card p-5 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-foreground">{comp.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{comp.address}</p>
              </div>
              <span className={cn(
                "text-xs font-semibold px-2 py-1 rounded-full",
                comp.trend === "growing" ? "text-emerald-400 bg-emerald-500/10" :
                comp.trend === "improving" ? "text-cyan-400 bg-cyan-500/10" :
                "text-slate-400 bg-slate-500/10"
              )}>
                {comp.trend === "growing" ? "↑" : comp.trend === "improving" ? "↑" : "→"} {comp.trend}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center rounded-xl bg-muted/40 border border-border py-3">
                <p className="text-2xl font-bold text-yellow-400">{comp.googleRating}★</p>
                <p className="text-xs text-muted-foreground mt-0.5">Google</p>
              </div>
              <div className="text-center rounded-xl bg-muted/40 border border-border py-3">
                <p className="text-2xl font-bold text-cyan-400">{comp.googleReviews.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Reviews</p>
              </div>
            </div>

            {/* vs You */}
            <div className={cn(
              "flex items-center gap-2 p-3 rounded-xl mb-4",
              yourRating > comp.googleRating ? "bg-emerald-500/8 border border-emerald-500/15" : "bg-red-500/8 border border-red-500/15"
            )}>
              {yourRating > comp.googleRating ? (
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={cn("text-xs font-semibold", yourRating > comp.googleRating ? "text-emerald-400" : "text-red-400")}>
                You&apos;re {yourRating > comp.googleRating ? "ahead" : "behind"} by {Math.abs(yourRating - comp.googleRating).toFixed(1)} stars
              </span>
            </div>

            {/* Top Themes */}
            <div className="space-y-2">
              <div>
                <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">Top Praise</p>
                <div className="flex flex-wrap gap-1">
                  {comp.topPraise.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/15 text-emerald-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-1">Common Complaints</p>
                <div className="flex flex-wrap gap-1">
                  {comp.topComplaints.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/15 text-red-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
