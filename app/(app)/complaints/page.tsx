"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Clock, AlertTriangle, CheckCircle, ArrowRight, UserCheck, RefreshCw } from "lucide-react";
import { mockComplaints } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const columns = [
  { id: "complaint", label: "Complaint", color: "border-red-500/20 text-red-400 bg-red-500/5 bg-opacity-20" },
  { id: "assigned", label: "Assigned", color: "border-orange-500/20 text-orange-400 bg-orange-500/5 bg-opacity-20" },
  { id: "investigating", label: "Investigating", color: "border-yellow-500/20 text-yellow-400 bg-yellow-500/5 bg-opacity-20" },
  { id: "resolved", label: "Resolved", color: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5 bg-opacity-20" },
  { id: "confirmed", label: "Confirmed", color: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5 bg-opacity-20" },
  { id: "closed", label: "Closed", color: "border-slate-500/20 text-slate-400 bg-slate-500/5 bg-opacity-20" },
];

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState(mockComplaints);

  const moveStatus = (id: string, newStatus: string) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: newStatus,
              slaRemaining: newStatus === "closed" || newStatus === "confirmed" || newStatus === "resolved" ? "Closed" : c.slaRemaining,
            }
          : c
      )
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1 rounded bg-red-500/10 border border-red-500/20">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            </div>
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Quality Assurance</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">AI Complaint Resolution Center</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and resolve patient friction points proactively before public negative reviews are published
          </p>
        </div>
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Complaints", value: complaints.filter(c => c.status !== "closed").length, color: "text-red-400" },
          { label: "Average Resolution Time", value: "1.4 hours", color: "text-cyan-400" },
          { label: "SLA Adherence Rate", value: "98.2%", color: "text-emerald-400" },
          { label: "Pre-Review Save Rate", value: "91%", color: "text-violet-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className={cn("text-2xl font-bold mt-1", stat.color)}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Kanban Board Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {columns.map((col, colIdx) => {
          const colComplaints = complaints.filter((c) => c.status === col.id);
          return (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * colIdx }}
              className="flex flex-col h-[600px] rounded-2xl border border-border bg-card overflow-hidden"
            >
              {/* Column Header */}
              <div className={cn("px-4 py-3 border-b font-bold text-xs flex items-center justify-between", col.color)}>
                <span>{col.label}</span>
                <span className="rounded-full bg-current/10 border border-current/20 px-2 py-0.5 text-[10px] font-extrabold">
                  {colComplaints.length}
                </span>
              </div>

              {/* Column Cards List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {colComplaints.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-[10px] text-muted-foreground/40 italic py-8">
                    No tickets
                  </div>
                ) : (
                  colComplaints.map((c) => (
                    <div
                      key={c.id}
                      className={cn(
                        "rounded-xl border p-3 space-y-2 bg-card shadow-sm hover:shadow-md transition-shadow relative group",
                        c.priority === "high" && c.status !== "closed" ? "border-red-500/20" : "border-border"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-foreground leading-tight">{c.patientName}</span>
                        {c.priority === "high" && c.status !== "closed" && (
                          <span className="text-[8px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-1 py-0.2 rounded uppercase">
                            High
                          </span>
                        )}
                      </div>

                      <p className="text-[10px] text-muted-foreground/80 leading-relaxed line-clamp-3">
                        {c.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                        <UserCheck className="w-3 h-3 text-cyan-400" />
                        <span className="truncate">{c.provider} · {c.department}</span>
                      </div>

                      {/* SLA Tracker */}
                      {c.status !== "closed" && c.status !== "confirmed" && c.status !== "resolved" && (
                        <div className="flex items-center gap-1 text-[9px] font-semibold text-orange-400 bg-orange-500/5 px-2 py-1 rounded border border-orange-500/10">
                          <Clock className="w-2.5 h-2.5" />
                          <span>SLA: {c.slaRemaining}</span>
                        </div>
                      )}

                      {/* Action trigger states to move status */}
                      <div className="pt-2 flex items-center justify-between border-t border-border mt-2">
                        <span className="text-[8px] text-muted-foreground italic">Update:</span>
                        <div className="flex gap-1">
                          {colIdx < columns.length - 1 && (
                            <button
                              onClick={() => moveStatus(c.id, columns[colIdx + 1].id)}
                              className="p-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-0.5 text-[9px]"
                              title={`Move to ${columns[colIdx + 1].label}`}
                            >
                              <span>Next</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          )}
                          {c.status !== "closed" && (
                            <button
                              onClick={() => moveStatus(c.id, "closed")}
                              className="p-1 rounded bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 hover:text-slate-300 transition-colors flex items-center gap-0.5 text-[9px]"
                              title="Force Close"
                            >
                              Close
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
