"use client";

import { motion } from "framer-motion";
import { MapPin, TrendingUp, Star, Users, Phone, ExternalLink } from "lucide-react";
import { mockLocations } from "@/lib/mock-data";
import { ReputationScoreRing } from "@/components/shared/reputation-score-ring";
import { cn } from "@/lib/utils";

const platforms = ["Google", "Healthgrades", "Facebook", "Yelp"];

export default function LocationsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Multi-Location Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Compare reputation performance across all clinic locations
        </p>
      </motion.div>

      {/* Location Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockLocations.map((loc, i) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="rounded-2xl border border-border bg-card p-6 card-hover cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 gradient-hero opacity-30 pointer-events-none" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2.5 rounded-xl",
                    loc.status === "excellent" ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-cyan-500/10 border border-cyan-500/20"
                  )}>
                    <MapPin className={cn("w-4 h-4", loc.status === "excellent" ? "text-emerald-400" : "text-cyan-400")} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-tight">{loc.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{loc.address}</p>
                  </div>
                </div>
                <span className={cn(
                  "text-xs font-semibold px-2 py-1 rounded-full border",
                  loc.status === "excellent"
                    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                    : "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
                )}>
                  {loc.status}
                </span>
              </div>

              {/* Score Ring */}
              <div className="flex items-center gap-6 mb-4">
                <ReputationScoreRing score={loc.reputationScore} size={100} strokeWidth={8} label="Score" delay={0.3 + 0.1 * i} />
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl font-bold text-yellow-400">{loc.overallRating}★</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Reviews</p>
                    <p className="text-lg font-bold text-foreground">{loc.totalReviews.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Platform Breakdown */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: "Google", value: loc.googleRating, color: "#4285F4" },
                  { label: "Healthgrades", value: loc.healthgradesRating, color: "#0EA5E9" },
                  { label: "Facebook", value: loc.facebookRating, color: "#1877F2" },
                  { label: "Yelp", value: loc.yelpRating, color: "#FF1A1A" },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                    <span className="text-muted-foreground">{p.label}</span>
                    <span className="font-semibold ml-auto" style={{ color: p.color }}>{p.value}★</span>
                  </div>
                ))}
              </div>

              {/* Footer Stats */}
              <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-border">
                <div>
                  <p className="text-xs font-bold text-foreground">{loc.providers}</p>
                  <p className="text-[10px] text-muted-foreground">Providers</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-400">{loc.reviewVelocity}</p>
                  <p className="text-[10px] text-muted-foreground">Velocity</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-cyan-400">{loc.responseTime}</p>
                  <p className="text-[10px] text-muted-foreground">Resp. Time</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <a href={`tel:${loc.phone}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                  <Phone className="w-3 h-3" /> {loc.phone}
                </a>
                <button className="ml-auto flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Location Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th className="text-left">Location</th>
                <th className="text-center">Rep Score</th>
                <th className="text-center">Avg Rating</th>
                <th className="text-center">Reviews</th>
                <th className="text-center">Monthly Patients</th>
                <th className="text-center">Response Time</th>
                <th className="text-center">Velocity</th>
              </tr>
            </thead>
            <tbody>
              {mockLocations.map((loc, i) => (
                <tr key={loc.id}>
                  <td className="font-semibold text-foreground text-sm">{loc.name}</td>
                  <td className="text-center">
                    <span className={cn(
                      "text-sm font-bold px-2 py-0.5 rounded-full",
                      loc.reputationScore >= 90 ? "text-emerald-400" : "text-cyan-400"
                    )}>
                      {loc.reputationScore}
                    </span>
                  </td>
                  <td className="text-center text-yellow-400 font-bold text-sm">{loc.overallRating}★</td>
                  <td className="text-center text-sm text-muted-foreground">{loc.totalReviews.toLocaleString()}</td>
                  <td className="text-center text-sm text-muted-foreground">{loc.monthlyPatients.toLocaleString()}</td>
                  <td className="text-center text-sm text-muted-foreground">{loc.responseTime}</td>
                  <td className="text-center">
                    <span className="text-emerald-400 font-semibold text-sm">{loc.reviewVelocity}</span>
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
