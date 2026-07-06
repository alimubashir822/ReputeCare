"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Star, Send, CheckCircle, XCircle, Clock, Filter, Sparkles } from "lucide-react";
import { mockPatients } from "@/lib/mock-data";
import { cn, getSentimentColor, getSentimentLabel } from "@/lib/utils";

const tabs = ["All Patients", "Ready for Request", "Pending", "Completed", "At Risk"];

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const readyPatients = mockPatients.filter(p => p.satisfactionScore >= 85);
  const atRiskPatients = mockPatients.filter(p => p.satisfactionScore < 60);

  const displayPatients = activeTab === 0 ? mockPatients
    : activeTab === 1 ? readyPatients
    : activeTab === 2 ? mockPatients.filter(p => p.reviewStatus === "pending")
    : activeTab === 3 ? mockPatients.filter(p => p.reviewStatus === "completed")
    : atRiskPatients;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">AI Review Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">
          AI identifies exactly who to ask, when, and on which platform
        </p>
      </motion.div>

      {/* Smart Routing Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-ai-500/20 bg-ai-500/5 p-5"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-ai-500/10 border border-ai-500/20 ai-pulse">
            <Brain className="w-4 h-4 text-ai-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Smart Review Routing — Active</h3>
            <p className="text-xs text-muted-foreground">AI automatically routes patients based on predicted satisfaction</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Happy Patients → Google Review", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { label: "Unhappy → Private Feedback", icon: XCircle, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
            { label: "Optimal Send Time", icon: Clock, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
            { label: "Best Channel Per Patient", icon: Send, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className={cn("flex items-center gap-2 rounded-xl border px-3 py-2", item.bg)}>
                <Icon className={cn("w-4 h-4 flex-shrink-0", item.color)} />
                <span className="text-xs font-medium text-foreground">{item.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Ready for Request", value: readyPatients.length, color: "text-cyan-400", bg: "bg-cyan-500/10" },
          { label: "Pending Response", value: mockPatients.filter(p => p.reviewStatus === "pending").length, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Reviews Completed", value: mockPatients.filter(p => p.reviewStatus === "completed").length, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "At Risk (Routed Private)", value: atRiskPatients.length, color: "text-red-400", bg: "bg-red-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className={cn("text-3xl font-bold mt-1", stat.color)}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs + Patient List */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
                  activeTab === i
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-xl border border-border transition-colors">
            <Filter className="w-3 h-3" /> Filter
          </button>
        </div>

        <div className="space-y-3">
          {displayPatients.map((patient, i) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i }}
              className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-cyan-500/20 transition-all group"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {patient.name.split(" ").map(n => n[0]).join("")}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">{patient.name}</p>
                  <span className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full border capitalize",
                    patient.segment === "promoter" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
                    patient.segment === "detractor" ? "text-red-400 bg-red-500/10 border-red-500/20" :
                    "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                  )}>
                    {patient.segment}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{patient.provider} · {patient.location}</p>
              </div>

              {/* Satisfaction Score */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Satisfaction</p>
                <p className={cn("text-lg font-bold", patient.satisfactionScore >= 85 ? "text-emerald-400" : patient.satisfactionScore >= 60 ? "text-yellow-400" : "text-red-400")}>
                  {patient.satisfactionScore}%
                </p>
              </div>

              {/* NPS */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">NPS</p>
                <p className="text-lg font-bold text-foreground">{patient.npsScore}</p>
              </div>

              {/* Sentiment */}
              <div className="text-center hidden md:block">
                <p className="text-xs text-muted-foreground">Sentiment</p>
                <p className={cn("text-xs font-semibold mt-0.5", getSentimentColor(patient.sentiment))}>
                  {getSentimentLabel(patient.sentiment)}
                </p>
              </div>

              {/* AI Recommendation */}
              <div className="flex-shrink-0">
                {patient.satisfactionScore >= 85 ? (
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                    <Send className="w-3 h-3" />
                    Request Review
                  </div>
                ) : patient.satisfactionScore < 60 ? (
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
                    <XCircle className="w-3 h-3" />
                    Private Feedback
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-500/10 border border-slate-500/20 text-xs font-semibold text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    Monitor
                  </div>
                )}
              </div>

              {/* AI Score */}
              <div className="text-center hidden lg:block">
                <p className="text-xs text-muted-foreground">Referral</p>
                <p className="text-xs font-semibold text-ai-400 mt-0.5">{patient.referralLikelihood}%</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
