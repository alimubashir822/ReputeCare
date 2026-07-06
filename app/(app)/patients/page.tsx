"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Search, Filter, Star, Send, Shield, X, Clock, CheckCircle2, AlertTriangle, MessageSquare, MapPin, Sparkles } from "lucide-react";
import { mockPatients } from "@/lib/mock-data";
import { cn, getSentimentColor, getSentimentLabel, getSegmentColor } from "@/lib/utils";

const tabs = ["All Patients", "Promoters", "Passives", "Detractors"];

export default function PatientsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [activeModalTab, setActiveModalTab] = useState<"journey" | "graph" | "history">("journey");

  const filtered = mockPatients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.provider.toLowerCase().includes(query.toLowerCase());
    const matchesTab = activeTab === 0 ? true
      : activeTab === 1 ? p.segment === "promoter"
      : activeTab === 2 ? p.segment === "passive"
      : p.segment === "detractor";
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Patient Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">
          AI-powered patient satisfaction scoring and review opportunity detection
        </p>
      </motion.div>

      {/* Segment Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Patients", value: mockPatients.length, color: "text-cyan-400", icon: Users },
          { label: "Promoters", value: mockPatients.filter(p => p.segment === "promoter").length, color: "text-emerald-400", icon: Star },
          { label: "Passives", value: mockPatients.filter(p => p.segment === "passive").length, color: "text-yellow-400", icon: Shield },
          { label: "Detractors", value: mockPatients.filter(p => p.segment === "detractor").length, color: "text-red-400", icon: Filter },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={cn("w-4 h-4", stat.color)} />
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
              <p className={cn("text-3xl font-bold", stat.color)}>{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search patients or providers..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-cyan-500/30 transition-colors"
          />
        </div>
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

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((patient, i) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            onClick={() => setSelectedPatient(patient)}
            className="rounded-2xl border border-border bg-card p-5 card-hover cursor-pointer group"
          >
            {/* Avatar + Name */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-11 h-11 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-bold">
                  {patient.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 dark:border-slate-900 border-white",
                  patient.segment === "promoter" ? "bg-emerald-400" :
                  patient.segment === "detractor" ? "bg-red-400" : "bg-yellow-400"
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{patient.name}</p>
                <p className="text-xs text-muted-foreground truncate">{patient.provider}</p>
              </div>
            </div>

            {/* Satisfaction Score */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Satisfaction</span>
                <span className={cn(
                  "font-bold",
                  patient.satisfactionScore >= 85 ? "text-emerald-400" :
                  patient.satisfactionScore >= 60 ? "text-yellow-400" : "text-red-400"
                )}>
                  {patient.satisfactionScore}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${patient.satisfactionScore}%` }}
                  transition={{ duration: 1, delay: 0.05 * i }}
                  className="h-full rounded-full"
                  style={{
                    background: patient.satisfactionScore >= 85 ? "#10b981" :
                    patient.satisfactionScore >= 60 ? "#f59e0b" : "#ef4444"
                  }}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium capitalize", getSegmentColor(patient.segment))}>
                {patient.segment}
              </span>
              {patient.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground capitalize">
                  {tag.replace("-", " ")}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-border">
              <div>
                <p className="text-xs font-bold text-foreground">{patient.npsScore}</p>
                <p className="text-[10px] text-muted-foreground">NPS</p>
              </div>
              <div>
                <p className="text-xs font-bold text-violet-400">{patient.referralLikelihood}%</p>
                <p className="text-[10px] text-muted-foreground">Referral</p>
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{patient.visitCount}</p>
                <p className="text-[10px] text-muted-foreground">Visits</p>
              </div>
            </div>

            {/* Action */}
            <button className={cn(
              "w-full mt-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all opacity-0 group-hover:opacity-100",
              patient.satisfactionScore >= 85
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                : "bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20"
            )}>
              {patient.satisfactionScore >= 85 ? (
                <><Send className="w-3 h-3" /> Request Review</>
              ) : (
                <><Shield className="w-3 h-3" /> Private Feedback</>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Patient Journey Modal Overlay */}
      <AnimatePresence>
        {selectedPatient && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSelectedPatient(null)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-y-0 md:inset-y-10 right-0 left-0 md:left-auto md:w-[480px] md:right-10 bg-card border border-border rounded-none md:rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-border flex items-center justify-between bg-black/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white text-sm font-bold">
                    {selectedPatient.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{selectedPatient.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{selectedPatient.email || "No email"} · {selectedPatient.phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedPatient(null); setActiveModalTab("journey"); }}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tab Selector */}
              <div className="flex px-4 py-2 border-b border-border bg-black/10 gap-1">
                {[
                  { id: "journey", label: "Timeline" },
                  { id: "graph", label: "Experience Graph" },
                  { id: "history", label: "EHR & History" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveModalTab(t.id as any)}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                      activeModalTab === t.id
                        ? "bg-card text-foreground shadow-sm border border-border"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {activeModalTab === "journey" && (
                  <>
                    {/* Scorecard */}
                    <div>
                      <h4 className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-3">AI Experience Scorecard</h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-xl border border-border bg-card p-2.5">
                          <p className="text-[9px] text-muted-foreground">Satisfaction Score</p>
                          <p className={cn(
                            "text-lg font-black mt-0.5",
                            selectedPatient.satisfactionScore >= 85 ? "text-emerald-400" :
                            selectedPatient.satisfactionScore >= 60 ? "text-yellow-400" : "text-red-400"
                          )}>
                            {selectedPatient.satisfactionScore}%
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-2.5">
                          <p className="text-[9px] text-muted-foreground">Referral Likely</p>
                          <p className="text-lg font-black text-violet-400 mt-0.5">{selectedPatient.referralLikelihood}%</p>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-2.5">
                          <p className="text-[9px] text-muted-foreground">Segment</p>
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full border inline-block mt-1.5 capitalize",
                            getSegmentColor(selectedPatient.segment)
                          )}>
                            {selectedPatient.segment}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h4 className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Patient Experience Timeline</h4>
                      <div className="relative pl-6 space-y-4 border-l border-border ml-2.5">
                        {[
                          { step: "Online Booking", status: "completed", time: "3 days prior", info: "Booked via website widget" },
                          { step: "Reminder SMS", status: "completed", time: "24h prior", info: "Confirmed via auto-reply" },
                          { step: "Arrival & Check-in", status: "completed", time: "12:15 PM", info: "Reception greeted patient" },
                          {
                            step: "Waiting Room",
                            status: selectedPatient.satisfactionScore < 60 ? "failed" : "completed",
                            time: selectedPatient.satisfactionScore < 60 ? "42 mins wait" : "8 mins wait",
                            info: selectedPatient.satisfactionScore < 60 ? "Warning: Wait exceeded clinic SLA!" : "Below threshold of 15 mins",
                          },
                          { step: "Nurse Intake", status: "completed", time: "12:57 PM", info: "Vitals recorded" },
                          { step: "Doctor Consultation", status: "completed", time: "1:05 PM", info: `Consultation with ${selectedPatient.provider}` },
                          { step: "Checkout & Co-pay", status: selectedPatient.tags.includes("billing-complaint") ? "failed" : "completed", time: "1:35 PM", info: selectedPatient.tags.includes("billing-complaint") ? "Friction: Insurance co-pay debate" : "Co-pay settled successfully" },
                          { step: "Satisfaction Survey", status: "completed", time: "2:00 PM", info: `Survey filled out (${selectedPatient.satisfactionScore}% satisfaction)` },
                          {
                            step: "Routing Action",
                            status: "completed",
                            time: "Immediate",
                            info: selectedPatient.satisfactionScore >= 85
                              ? "Routed to Google Review (NPS 9-10 Promoter)"
                              : "Routed to Private Feedback Form (Friction Detractor)",
                          },
                        ].map((stage, idx) => (
                          <div key={idx} className="relative">
                            <div className={cn(
                              "absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 dark:border-slate-900 border-white flex items-center justify-center",
                              stage.status === "completed" ? "bg-emerald-400" : "bg-red-400"
                            )}>
                              {stage.status === "completed" ? (
                                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                              ) : (
                                <AlertTriangle className="w-2.5 h-2.5 text-white" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-xs mb-0.5">
                                <span className="font-bold text-foreground">{stage.step}</span>
                                <span className="text-[9px] text-muted-foreground/60">{stage.time}</span>
                              </div>
                              <p className={cn(
                                "text-[9px]",
                                stage.status === "failed" ? "text-red-400 font-semibold" : "text-muted-foreground"
                              )}>
                                {stage.info}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SLA Recovery Panel */}
                    {selectedPatient.satisfactionScore < 60 && (
                      <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/15 space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-400" />
                          <h5 className="text-xs font-bold text-foreground">AI Smart Recovery SLA active</h5>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          This patient encountered check-in wait bottlenecks. A manager follow-up task has been automatically logged.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                          <button className="flex-1 py-2 rounded-xl gradient-brand text-white text-[10px] font-semibold hover:opacity-90 transition-opacity">
                            Trigger Manager Call
                          </button>
                          <button className="py-2 px-3 rounded-xl border border-border text-[10px] text-muted-foreground hover:text-foreground hover:bg-white/5">
                            Ignore
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeModalTab === "graph" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">AI Experience Relationship Graph</h4>
                      <p className="text-[10px] text-muted-foreground">AI map of patient nodes and operational touchpoints</p>
                    </div>

                    {/* Interactive Node Graph */}
                    <div className="relative h-64 border border-border rounded-2xl dark:bg-black/20 bg-slate-100/50 flex items-center justify-center overflow-hidden">
                      <svg className="absolute inset-0 w-full h-full">
                        {/* Connection Lines from Center (220, 120) */}
                        <line x1="220" y1="120" x2="220" y2="40" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                        <line x1="220" y1="120" x2="120" y2="80" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                        <line x1="220" y1="120" x2="120" y2="160" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                        <line x1="220" y1="120" x2="320" y2="80" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                        <line x1="220" y1="120" x2="320" y2="160" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                        <line x1="220" y1="120" x2="220" y2="200" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                      </svg>

                      {/* Nodes */}
                      {/* 1. Patient Center Node */}
                      <div className="absolute top-[80px] left-[180px] w-20 h-20 rounded-full border-2 border-cyan-400 bg-cyan-500/10 flex flex-col items-center justify-center text-center shadow-lg pointer-events-auto">
                        <span className="text-[9px] font-bold text-foreground truncate max-w-[70px]">{selectedPatient.name.split(" ")[0]}</span>
                        <span className="text-[8px] text-cyan-400 font-extrabold">{selectedPatient.satisfactionScore}%</span>
                      </div>

                      {/* 2. Doctor Node (Top: 220, 40) */}
                      <div className="absolute top-[15px] left-[175px] text-center pointer-events-auto group/node">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto hover:scale-110 transition-transform">
                          <Users className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-[8px] font-semibold text-foreground block mt-0.5">Provider</span>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 rounded px-2 py-1 text-[8px] text-white opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {selectedPatient.provider}
                        </div>
                      </div>

                      {/* 3. Clinic Node (Left-Top: 120, 80) */}
                      <div className="absolute top-[50px] left-[80px] text-center pointer-events-auto group/node">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto hover:scale-110 transition-transform">
                          <MapPin className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-[8px] font-semibold text-foreground block mt-0.5">Location</span>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 rounded px-2 py-1 text-[8px] text-white opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {selectedPatient.location}
                        </div>
                      </div>

                      {/* 4. Treatment/Appt Node (Left-Bottom: 120, 160) */}
                      <div className="absolute top-[135px] left-[80px] text-center pointer-events-auto group/node">
                        <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mx-auto hover:scale-110 transition-transform">
                          <Clock className="w-4 h-4 text-violet-400" />
                        </div>
                        <span className="text-[8px] font-semibold text-foreground block mt-0.5">Appt</span>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 rounded px-2 py-1 text-[8px] text-white opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Last visit: {selectedPatient.lastVisit}
                        </div>
                      </div>

                      {/* 5. Review Node (Right-Top: 320, 80) */}
                      <div className="absolute top-[50px] left-[270px] text-center pointer-events-auto group/node">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mx-auto hover:scale-110 transition-transform",
                          selectedPatient.satisfactionScore >= 85
                            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                            : "bg-red-500/10 border border-red-500/30 text-red-400"
                        )}>
                          <Star className="w-4 h-4" />
                        </div>
                        <span className="text-[8px] font-semibold text-foreground block mt-0.5">Review</span>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 rounded px-2 py-1 text-[8px] text-white opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Status: {selectedPatient.reviewStatus}
                        </div>
                      </div>

                      {/* 6. Feedback Node (Right-Bottom: 320, 160) */}
                      <div className="absolute top-[135px] left-[270px] text-center pointer-events-auto group/node">
                        <div className="w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mx-auto hover:scale-110 transition-transform">
                          <MessageSquare className="w-4 h-4 text-pink-400" />
                        </div>
                        <span className="text-[8px] font-semibold text-foreground block mt-0.5">Feedback</span>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 rounded px-2 py-1 text-[8px] text-white opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          NPS rating: {selectedPatient.npsScore}/10
                        </div>
                      </div>

                      {/* 7. Referral Node (Bottom: 220, 200) */}
                      <div className="absolute top-[195px] left-[175px] text-center pointer-events-auto group/node">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mx-auto hover:scale-110 transition-transform">
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                        </div>
                        <span className="text-[8px] font-semibold text-foreground block mt-0.5">Referral</span>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 rounded px-2 py-1 text-[8px] text-white opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Referral likelihood: {selectedPatient.referralLikelihood}%
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border bg-card">
                      <h5 className="text-[10px] font-bold text-foreground mb-1">AI Experience Prediction Insight</h5>
                      <p className="text-[9px] text-muted-foreground leading-relaxed">
                        Relationships show strong connection between wait times, low satisfaction score and private route alerts. Restoring doctor consult quality benchmarks may offset wait frustrations by 18%.
                      </p>
                    </div>
                  </div>
                )}

                {activeModalTab === "history" && (
                  <div className="space-y-4">
                    {/* EHR Medical record summary */}
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">EHR Medical History</h4>
                      <div className="p-3 rounded-xl border border-border space-y-2 text-xs">
                        <div className="flex justify-between border-b border-border pb-1">
                          <span className="text-muted-foreground">Primary Diagnosis</span>
                          <span className="font-semibold text-foreground">Annual Wellness Intake</span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-1">
                          <span className="text-muted-foreground">Treatments Logged</span>
                          <span className="font-semibold text-foreground">Consultation, BP Intake</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Active Medication</span>
                          <span className="font-semibold text-foreground">None</span>
                        </div>
                      </div>
                    </div>

                    {/* Payments */}
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Billing & Insurance Ledger</h4>
                      <div className="p-3 rounded-xl border border-border space-y-2 text-xs">
                        <div className="flex justify-between items-center text-[10px]">
                          <div>
                            <p className="font-semibold text-foreground">Co-pay Settlement</p>
                            <p className="text-muted-foreground">SelfPay / insurance balance</p>
                          </div>
                          <span className="text-emerald-400 font-extrabold">$25.00 Paid</span>
                        </div>
                      </div>
                    </div>

                    {/* Messages Logs */}
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Communication Logs</h4>
                      <div className="p-3 rounded-xl border border-border space-y-2">
                        {[
                          { channel: "SMS", date: "Today, 2:10 PM", msg: "Satisfaction survey sent successfully" },
                          { channel: "Email", date: "Yesterday, 9:00 AM", msg: "Appointment check-in reminder delivered" },
                        ].map((log, index) => (
                          <div key={index} className="flex justify-between text-[10px] items-start border-b border-border pb-1.5 last:border-0 last:pb-0">
                            <div>
                              <p className="font-semibold text-foreground">{log.channel} Notification</p>
                              <p className="text-muted-foreground">{log.msg}</p>
                            </div>
                            <span className="text-muted-foreground/60">{log.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border flex gap-2">
                <button
                  onClick={() => { setSelectedPatient(null); setActiveModalTab("journey"); }}
                  className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
