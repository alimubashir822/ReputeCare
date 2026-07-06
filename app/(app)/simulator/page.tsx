"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, HelpCircle, Users, Star, ArrowUpRight, DollarSign, ShieldCheck, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";

export default function SimulatorPage() {
  // Simulator input states
  const [waitTime, setWaitTime] = useState(25); // minutes
  const [staffCount, setStaffCount] = useState(2); // count
  const [onlineCheckIn, setOnlineCheckIn] = useState(false);
  const [extendedHours, setExtendedHours] = useState(false);
  const [fastFollowUp, setFastFollowUp] = useState(false);

  // Simulated metrics states
  const [satisfaction, setSatisfaction] = useState(82);
  const [rating, setRating] = useState(4.5);
  const [referralRate, setReferralRate] = useState(20);
  const [retentionRate, setRetentionRate] = useState(72);
  const [revenue, setRevenue] = useState(115000);

  // Recalculate simulation values dynamically
  useEffect(() => {
    // 1. Calculate Satisfaction
    let newSat = 78; // baseline

    // Wait time impact
    if (waitTime <= 10) newSat += 12;
    else if (waitTime <= 18) newSat += 6;
    else if (waitTime <= 30) newSat += 0;
    else if (waitTime <= 45) newSat -= 10;
    else newSat -= 18;

    // Staffing impact
    if (staffCount === 1) newSat -= 6;
    else if (staffCount >= 4) newSat += 5;

    // Online check-in impact
    if (onlineCheckIn) newSat += 7;

    // Extended hours impact
    if (extendedHours) newSat += 3;

    // Fast follow-up impact
    if (fastFollowUp) newSat += 4;

    // Clamp satisfaction between 45% and 99%
    newSat = Math.max(45, Math.min(99, newSat));

    // 2. Calculate Predicted Rating
    let newRating = 4.1; // baseline
    if (newSat >= 95) newRating = 4.9;
    else if (newSat >= 90) newRating = 4.8;
    else if (newSat >= 85) newRating = 4.6;
    else if (newSat >= 80) newRating = 4.4;
    else if (newSat >= 70) newRating = 4.2;
    else if (newSat >= 60) newRating = 3.9;
    else newRating = 3.4;

    // Tiny adjustments for ratings based on wait time and followups
    if (waitTime <= 12 && newRating < 4.9) newRating += 0.1;
    if (fastFollowUp && newRating < 4.9) newRating += 0.1;
    newRating = Math.max(3.1, Math.min(5.0, parseFloat(newRating.toFixed(1))));

    // 3. Calculate Referral Rate
    let newRef = 10 + (newSat - 50) * 0.4;
    if (fastFollowUp) newRef += 5;
    newRef = Math.max(5, Math.min(38, Math.round(newRef)));

    // 4. Calculate Retention Rate
    let newRet = 55 + (newSat - 50) * 0.6;
    if (onlineCheckIn) newRet += 4;
    newRet = Math.max(50, Math.min(96, Math.round(newRet)));

    // 5. Calculate Revenue Impact
    // Assume average monthly patient spend flow changes based on retention and ratings
    const monthlyPatients = 1200;
    const baseValuePerPatient = 120;
    const ratingMultiplier = 1 + (newRating - 4.1) * 0.15;
    const retentionMultiplier = newRet / 70;
    let newRev = monthlyPatients * baseValuePerPatient * ratingMultiplier * retentionMultiplier;
    
    if (extendedHours) newRev *= 1.12; // 12% volume lift
    newRev = Math.round(newRev);

    // Set simulator outputs
    setSatisfaction(newSat);
    setRating(newRating);
    setReferralRate(newRef);
    setRetentionRate(newRet);
    setRevenue(newRev);
  }, [waitTime, staffCount, onlineCheckIn, extendedHours, fastFollowUp]);

  // Baseline data comparison chart
  const currentVsSimulated = [
    { name: "Satisfaction (%)", Current: 82, Simulated: satisfaction, currentFill: "#64748b", simulatedFill: "#06b6d4" },
    { name: "Referral Rate (%)", Current: 20, Simulated: referralRate, currentFill: "#64748b", simulatedFill: "#818cf8" },
    { name: "Retention Rate (%)", Current: 72, Simulated: retentionRate, currentFill: "#64748b", simulatedFill: "#10b981" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1 rounded bg-ai-500/10 border border-ai-500/20 ai-pulse">
              <Sparkles className="w-3.5 h-3.5 text-ai-400" />
            </div>
            <span className="text-xs font-semibold text-ai-400 uppercase tracking-wider">Strategic Decision Support</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">AI Reputation Simulator</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Test operational changes in a sandbox twin model to see their impact on patient satisfaction, ratings, and revenue
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Controls Panel */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 lg:col-span-5 rounded-2xl border border-border bg-card p-6 space-y-6"
        >
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">Operational Adjustments</h3>
            <p className="text-xs text-muted-foreground">Adjust sliders to simulate changes in patient flows</p>
          </div>

          {/* Wait Time Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Average Patient Wait Time</span>
              <span className={cn(
                "font-bold",
                waitTime <= 15 ? "text-emerald-400" : waitTime <= 30 ? "text-cyan-400" : "text-red-400"
              )}>
                {waitTime} minutes
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={waitTime}
              onChange={(e) => setWaitTime(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-lg bg-muted appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground/60 px-1">
              <span>5m (Target)</span>
              <span>30m (Average)</span>
              <span>60m (Max Risk)</span>
            </div>
          </div>

          {/* Staffing Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Front-Desk Staffing Level</span>
              <span className="font-bold text-cyan-400">{staffCount} receptionists</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={staffCount}
              onChange={(e) => setStaffCount(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-lg bg-muted appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground/60 px-1">
              <span>1 Staff</span>
              <span>3 Staff</span>
              <span>5 Staff</span>
            </div>
          </div>

          <hr className="border-border" />

          {/* Toggles */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Technology & Features</h4>

            {[
              {
                id: "onlineCheckIn",
                label: "Online Pre-Check-in Available",
                description: "Allows patients to fill forms digitally prior to arrival",
                state: onlineCheckIn,
                setter: setOnlineCheckIn,
              },
              {
                id: "extendedHours",
                label: "Extended Evening Hours",
                description: "Opens clinics until 8 PM twice a week to increase flexibility",
                state: extendedHours,
                setter: setExtendedHours,
              },
              {
                id: "fastFollowUp",
                label: "Fast Triage SMS (Under 2 hours)",
                description: "AI survey triggers immediately after exit to capture detractors",
                state: fastFollowUp,
                setter: setFastFollowUp,
              },
            ].map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 py-1">
                <div className="min-w-0">
                  <label htmlFor={item.id} className="text-xs font-bold text-foreground cursor-pointer block">{item.label}</label>
                  <p className="text-[10px] text-muted-foreground/80 mt-0.5">{item.description}</p>
                </div>
                <button
                  id={item.id}
                  onClick={() => item.setter(!item.state)}
                  className={cn(
                    "w-9 h-5 rounded-full p-0.5 transition-colors flex-shrink-0 flex items-center",
                    item.state ? "bg-cyan-500 justify-end" : "bg-muted justify-start"
                  )}
                >
                  <motion.div layout className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-foreground">Compliance Safe Simulation</h4>
              <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                Simulator models are generated based on anonymized HIPAA-safe metrics across similar clinics in Austin.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Results Panel */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          {/* Main Forecast Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-muted-foreground">Predicted Star Rating</p>
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="mt-2">
                <p className="text-3xl font-black text-yellow-400">{rating}★</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                  <span className={cn(
                    "font-bold",
                    rating >= 4.7 ? "text-emerald-400" : "text-cyan-400"
                  )}>
                    {rating >= 4.7 ? "Excellent" : "Average"} Target
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-muted-foreground">Projected Satisfaction</p>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="mt-2">
                <p className="text-3xl font-black text-foreground">{satisfaction}%</p>
                <div className="flex items-center gap-1 mt-1 text-[10px]">
                  <span className={cn(
                    "font-bold",
                    satisfaction >= 85 ? "text-emerald-400" : "text-yellow-400"
                  )}>
                    {satisfaction >= 90 ? "Top 5% practice" : satisfaction >= 80 ? "Healthy rating" : "Friction alert"}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-muted-foreground">Annual Practice Revenue</p>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="mt-2">
                <p className="text-3xl font-black text-emerald-400">${revenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                  <span className="text-emerald-400 font-bold">
                    {revenue > 115000 ? `+$${(revenue - 115000).toLocaleString()} lift` : "Baseline flow"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Visual Benchmarking Chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground">Current Baseline vs. Simulated Plan</h3>
              <p className="text-xs text-muted-foreground">Visualizes forecasted progress indicators based on inputs</p>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={currentVsSimulated} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "11px" }}
                />
                <Bar dataKey="Current" fill="#64748b" radius={[4, 4, 0, 0]} barSize={35} />
                <Bar dataKey="Simulated" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={35}>
                  {currentVsSimulated.map((entry, index) => (
                    <Cell key={index} fill={entry.simulatedFill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recommendations suggestions card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-ai-400" />
              <h3 className="text-sm font-semibold text-foreground">Simulated Improvement Strategy</h3>
            </div>
            <ul className="space-y-3 text-xs">
              {waitTime > 20 && (
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  <span>Your simulated wait time of **{waitTime}m** creates review risk. Enable **online pre-check-in** to reduce check-in times by 10 minutes.</span>
                </li>
              )}
              {staffCount < 3 && waitTime > 15 && (
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
                  <span>Front desk bottlenecks are likely with only **{staffCount} receptionists**. Increase to **3 front-desk agents** to handle peak flows.</span>
                </li>
              )}
              {!fastFollowUp && (
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>Activating **Fast Triage SMS** acts as a safety valve, catching detractors privately before they publish negative Google reviews.</span>
                </li>
              )}
              {waitTime <= 15 && staffCount >= 3 && fastFollowUp && (
                <li className="flex items-start gap-2 text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <span>Optimal Plan Achieved! Your configuration boosts patient satisfaction to **{satisfaction}%** and projected practice revenue by **+${(revenue - 115000).toLocaleString()}/year**.</span>
                </li>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
