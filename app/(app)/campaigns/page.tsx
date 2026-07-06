"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Play, Pause, Plus, BarChart3, Send, Mail, MessageSquare, Users } from "lucide-react";
import { mockCampaigns } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const channelIcons: Record<string, React.ReactNode> = {
  sms: <MessageSquare className="w-3 h-3" />,
  email: <Mail className="w-3 h-3" />,
};

export default function CampaignsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "paused">("all");

  const displayed = filter === "all" ? mockCampaigns
    : mockCampaigns.filter(c => c.status === filter);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaign Manager</h1>
          <p className="text-sm text-muted-foreground mt-1">Automated review and feedback campaigns</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Campaigns", value: mockCampaigns.filter(c => c.status === "active").length, color: "text-emerald-400", icon: Play },
          { label: "Total Sent", value: mockCampaigns.reduce((a, c) => a + c.sent, 0).toLocaleString(), color: "text-cyan-400", icon: Send },
          { label: "Total Converted", value: mockCampaigns.reduce((a, c) => a + c.converted, 0).toLocaleString(), color: "text-violet-400", icon: BarChart3 },
          { label: "Avg Conversion Rate", value: `${(mockCampaigns.reduce((a, c) => a + c.conversionRate, 0) / mockCampaigns.length).toFixed(1)}%`, color: "text-yellow-400", icon: Users },
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
              <div className="flex items-center gap-2 mb-2">
                <Icon className={cn("w-4 h-4", stat.color)} />
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
              <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {(["all", "active", "paused"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-semibold transition-all",
              filter === f ? "gradient-brand text-white" : "border border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map((campaign, i) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
            className="rounded-2xl border border-border bg-card p-5 card-hover cursor-pointer group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <Megaphone className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{campaign.name}</p>
                  <p className="text-xs text-muted-foreground capitalize mt-0.5">{campaign.type.replace("_", " ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {campaign.status === "active" ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
                    <Play className="w-2.5 h-2.5" /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded-full">
                    <Pause className="w-2.5 h-2.5" /> Paused
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="text-xs text-muted-foreground mb-3">
              <span className="font-medium text-foreground">Trigger: </span>{campaign.trigger}
            </div>

            {/* Channels */}
            <div className="flex items-center gap-1.5 mb-4">
              {campaign.channel.map((ch) => (
                <span key={ch} className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg border border-border capitalize">
                  {channelIcons[ch]}
                  {ch}
                </span>
              ))}
            </div>

            {/* Performance */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Sent", value: campaign.sent.toLocaleString() },
                { label: "Opened", value: `${Math.round((campaign.opened / campaign.sent) * 100)}%` },
                { label: "Converted", value: `${campaign.conversionRate.toFixed(1)}%` },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-muted/40 border border-border py-2">
                  <p className="text-xs font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>{campaign.converted} conversions</span>
                <span>{campaign.conversionRate.toFixed(1)}% rate</span>
              </div>
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${campaign.conversionRate}%` }}
                  transition={{ duration: 1, delay: 0.1 * i }}
                  className="h-full rounded-full gradient-brand"
                />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add Campaign CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 * displayed.length }}
          className="rounded-2xl border-2 border-dashed border-border p-5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-cyan-500/30 transition-colors group"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Create Campaign</p>
            <p className="text-xs text-muted-foreground/60 mt-1">AI-powered automation</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
