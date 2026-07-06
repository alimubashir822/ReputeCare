"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Filter, Star, TrendingUp, ArrowRight, AlertTriangle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, FunnelChart, Funnel, LabelList, Cell
} from "recharts";
import { mockFeedback, mockFeedbackCategories, mockDepartmentScorecards } from "@/lib/mock-data";
import { cn, getSentimentColor, getSentimentLabel } from "@/lib/utils";

const tabs = ["All Feedback", "Positive", "Negative", "Pending Review"];
const funnelData = [
  { name: "Feedback Collected", value: 892, fill: "#06b6d4" },
  { name: "Analyzed by AI", value: 892, fill: "#0891b2" },
  { name: "Happy → Review Requested", value: 634, fill: "#10b981" },
  { name: "Review Completed", value: 312, fill: "#059669" },
];

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState(0);

  const displayFeedback = activeTab === 0 ? mockFeedback
    : activeTab === 1 ? mockFeedback.filter(f => f.overallScore >= 75)
    : activeTab === 2 ? mockFeedback.filter(f => f.overallScore < 60)
    : mockFeedback.filter(f => !f.routed);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Patient Feedback Hub</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Structured feedback collection before public review requests
        </p>
      </motion.div>

      {/* Category Breakdown & Department Scorecards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 lg:col-span-6 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Category Performance</h3>
            <p className="text-xs text-muted-foreground mb-4">Patient sentiment ratings across generic categories</p>
          </div>
          
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={mockFeedbackCategories} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="category" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip
                contentStyle={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }}
              />
              <Bar dataKey="avgScore" radius={[0, 6, 6, 0]}>
                {mockFeedbackCategories.map((cat, i) => (
                  <Cell key={i} fill={cat.avgScore >= 4.5 ? "#10b981" : cat.avgScore >= 4.0 ? "#06b6d4" : "#f59e0b"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Scorecards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="col-span-12 lg:col-span-6 rounded-2xl border border-border bg-card p-6"
        >
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground mb-1">AI Department Scorecards</h3>
            <p className="text-xs text-muted-foreground">Departmental performance predictions based on survey keywords</p>
          </div>

          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {mockDepartmentScorecards.map((dept, i) => (
              <div
                key={dept.department}
                className={cn(
                  "p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors",
                  dept.alert
                    ? "bg-red-500/5 border-red-500/25 dark:bg-red-500/5 border-red-500/15"
                    : "dark:bg-white/[0.01] bg-black/[0.01] border-border"
                )}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground truncate">{dept.department}</span>
                    {dept.alert && (
                      <span className="flex items-center gap-0.5 text-[9px] font-bold text-red-400 bg-red-500/10 px-1 py-0.2 rounded border border-red-500/20 uppercase">
                        <AlertTriangle className="w-2.5 h-2.5" /> Alert
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground/80 mt-0.5">
                    {dept.reviews} keyword mentions {dept.reason ? `· ${dept.reason}` : ""}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={cn(
                    "font-extrabold text-sm block",
                    dept.rating >= 4.5 ? "text-emerald-400" : dept.rating >= 4.0 ? "text-cyan-400" : "text-red-400"
                  )}>
                    {dept.rating}★
                  </span>
                  <span className={cn(
                    "text-[10px] font-semibold mt-0.5 block",
                    dept.change.startsWith("+") ? "text-emerald-400" : dept.change.startsWith("-") ? "text-red-400" : "text-muted-foreground"
                  )}>
                    {dept.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* NPS + Conversion */}
      <div className="grid grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 md:col-span-5 rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-1">NPS Score</h3>
          <p className="text-xs text-muted-foreground mb-4">Net Promoter Score · Last 30 days</p>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-black text-cyan-400">72</div>
              <div className="text-xs text-muted-foreground mt-1">NPS Score</div>
              <div className="text-xs font-semibold text-emerald-400 mt-0.5">↑ +8 from last month</div>
            </div>
            <div className="flex-1 space-y-2">
              {[
                { label: "Promoters (9-10)", pct: 68, color: "#10b981" },
                { label: "Passives (7-8)", pct: 20, color: "#f59e0b" },
                { label: "Detractors (0-6)", pct: 12, color: "#ef4444" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="col-span-12 md:col-span-7 rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-1">Feedback → Review Funnel</h3>
          <p className="text-xs text-muted-foreground mb-4">Conversion from feedback to public review</p>
          <div className="space-y-3">
            {funnelData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{ background: item.fill }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-semibold text-foreground">{item.value.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / 892) * 100}%` }}
                      transition={{ duration: 1, delay: 0.1 * i }}
                      className="h-full rounded-full"
                      style={{ background: item.fill }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Feedback List */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 p-1 rounded-xl bg-muted">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  activeTab === i ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {displayFeedback.map((fb, i) => (
            <motion.div
              key={fb.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="p-4 rounded-2xl border border-border bg-card"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {fb.patient.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">{fb.patient}</p>
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border", getSentimentColor(fb.sentiment) + " bg-current/10 border-current/20")}>
                      {getSentimentLabel(fb.sentiment)}
                    </span>
                    <span className="text-xs text-muted-foreground">{fb.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{fb.location}</p>
                  <p className="text-sm text-foreground mt-2 italic">&ldquo;{fb.comments}&rdquo;</p>

                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    {[
                      { label: "Overall", value: fb.overallScore },
                      { label: "Wait", value: fb.waitTime ? fb.waitTime * 20 : null },
                      { label: "Staff", value: fb.staff ? fb.staff * 20 : null },
                      { label: "Doctor", value: fb.doctor ? fb.doctor * 20 : null },
                    ].filter(s => s.value !== null).map((score) => (
                      <div key={score.label} className="text-xs text-center">
                        <span className="text-muted-foreground">{score.label}: </span>
                        <span className={cn("font-semibold", score.value! >= 80 ? "text-emerald-400" : score.value! >= 60 ? "text-yellow-400" : "text-red-400")}>
                          {score.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className={cn(
                    "text-xs px-2.5 py-1 rounded-lg border font-medium",
                    fb.routed === "private_form" ? "text-orange-400 bg-orange-500/10 border-orange-500/20" :
                    "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                  )}>
                    {fb.routed === "private_form" ? "Private" : fb.routed?.replace("_", " ") || "Pending"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
