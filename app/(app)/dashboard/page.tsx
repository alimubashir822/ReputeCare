"use client";

import { motion } from "framer-motion";
import {
  Star, TrendingUp, MessageSquare, Clock, Users, DollarSign,
  Send, Brain, Activity, ArrowRight, Sparkles, BarChart3,
  RefreshCw, Download
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend
} from "recharts";
import { StatCard } from "@/components/shared/stat-card";
import { AIInsightCard } from "@/components/shared/ai-insight-card";
import { ReputationScoreRing } from "@/components/shared/reputation-score-ring";
import {
  mockDashboardKPIs, mockReviewTrendData, mockSentimentData,
  mockAIInsights, mockRecentActivity, mockLocations
} from "@/lib/mock-data";
import { cn, truncateText, getRelativeTime } from "@/lib/utils";
import Link from "next/link";

const activityIcons: Record<string, React.ReactNode> = {
  review_received: <Star className="w-3.5 h-3.5 text-yellow-400" />,
  request_sent: <Send className="w-3.5 h-3.5 text-cyan-400" />,
  negative_flagged: <Brain className="w-3.5 h-3.5 text-orange-400" />,
  response_posted: <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />,
  referral_sent: <Users className="w-3.5 h-3.5 text-violet-400" />,
};

const activityColors: Record<string, string> = {
  review_received: "bg-yellow-500/10 border-yellow-500/20",
  request_sent: "bg-cyan-500/10 border-cyan-500/20",
  negative_flagged: "bg-orange-500/10 border-orange-500/20",
  response_posted: "bg-emerald-500/10 border-emerald-500/20",
  referral_sent: "bg-violet-500/10 border-violet-500/20",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border dark:border-white/10 dark:bg-slate-900/95 bg-white/95 backdrop-blur-xl px-3 py-2.5 shadow-xl text-xs">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-muted-foreground capitalize">{p.name}:</span>
            <span className="font-medium text-foreground">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const kpi = mockDashboardKPIs;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Live Dashboard
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Good afternoon, Alexandra 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            HealthFirst Medical Group · 3 locations · Last updated just now
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border dark:border-white/8 border-black/5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border dark:border-white/8 border-black/5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </motion.div>

      {/* Top Row: Reputation Score + KPIs */}
      <div className="grid grid-cols-12 gap-4">
        {/* Reputation Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-12 md:col-span-4 lg:col-span-3 rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.03] bg-white p-6 flex flex-col items-center justify-center gap-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-hero opacity-50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

          <div className="relative text-center">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Reputation Health Score
            </p>
            <ReputationScoreRing score={kpi.reputationScore} size={160} delay={0.3} />
            <div className="mt-4 flex items-center justify-center gap-1.5">
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                ↑ +{kpi.reputationScoreTrend} this month
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 w-full text-center">
              {[
                { label: "Avg Rating", value: `${kpi.averageRating}★` },
                { label: "Total Reviews", value: kpi.totalReviews.toLocaleString() },
                { label: "Response Rate", value: "87%" },
                { label: "Velocity", value: kpi.reviewVelocity },
              ].map((item) => (
                <div key={item.label} className="rounded-xl dark:bg-white/3 bg-black/3 border dark:border-white/5 border-black/5 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* KPI Grid */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Avg Rating"
            value={`${kpi.averageRating} ★`}
            trend={kpi.ratingTrend}
            trendLabel="vs last month"
            icon={<Star className="w-4 h-4 text-yellow-400" />}
            iconBg="bg-yellow-500/10"
            delay={0.05}
          />
          <StatCard
            title="Conversion Rate"
            value={`${kpi.conversionRate}%`}
            trend={kpi.conversionTrend}
            trendLabel="of requests converted"
            icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
            iconBg="bg-emerald-500/10"
            delay={0.1}
          />
          <StatCard
            title="Reviews This Month"
            value={kpi.reviewsThisMonth}
            trend={kpi.reviewVelocity}
            trendLabel="vs last month"
            icon={<MessageSquare className="w-4 h-4 text-cyan-400" />}
            iconBg="bg-cyan-500/10"
            delay={0.15}
          />
          <StatCard
            title="Avg Response Time"
            value={kpi.responseTime}
            trend={kpi.responseTimeTrend}
            trendLabel="faster than last month"
            icon={<Clock className="w-4 h-4 text-blue-400" />}
            iconBg="bg-blue-500/10"
            delay={0.2}
          />
          <StatCard
            title="Referral Rate"
            value={`${kpi.referralRate}%`}
            trend={kpi.referralTrend}
            trendLabel="of promoters referring"
            icon={<Users className="w-4 h-4 text-violet-400" />}
            iconBg="bg-violet-500/10"
            delay={0.25}
          />
          <StatCard
            title="Revenue Impact"
            value={kpi.estimatedRevenueImpact}
            trend={kpi.revenueImpactTrend}
            trendLabel="estimated from reputation"
            icon={<DollarSign className="w-4 h-4 text-emerald-400" />}
            iconBg="bg-emerald-500/10"
            delay={0.3}
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Review Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="col-span-12 lg:col-span-8 rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.03] bg-white p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Review Growth Trend</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Reviews by platform over 12 months</p>
            </div>
            <div className="flex items-center gap-1">
              {[
                { label: "Google", color: "#4285F4" },
                { label: "Healthgrades", color: "#0EA5E9" },
                { label: "Facebook", color: "#1877F2" },
                { label: "Yelp", color: "#ff1a1a" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockReviewTrendData}>
              <defs>
                <linearGradient id="google" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4285F4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4285F4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="healthgrades" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="google" stroke="#4285F4" fill="url(#google)" strokeWidth={2} />
              <Area type="monotone" dataKey="healthgrades" stroke="#0EA5E9" fill="url(#healthgrades)" strokeWidth={2} />
              <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="yelp" stroke="#ff1a1a" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Sentiment Donut */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-12 lg:col-span-4 rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.03] bg-white p-6"
        >
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Patient Sentiment</h3>
            <p className="text-xs text-muted-foreground mt-0.5">AI-analyzed this month</p>
          </div>

          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={mockSentimentData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {mockSentimentData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, ""]}
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-2 mt-2">
            {mockSentimentData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insights + Activity + Locations Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="col-span-12 lg:col-span-5 rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.03] bg-white p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-ai-500/10 border border-ai-500/20 ai-pulse">
                <Sparkles className="w-3.5 h-3.5 text-ai-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">AI Insights</h3>
                <p className="text-xs text-muted-foreground">{mockAIInsights.length} active recommendations</p>
              </div>
            </div>
            <Link href="/ai-insights" className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {mockAIInsights.slice(0, 3).map((insight, i) => (
              <AIInsightCard key={insight.id} insight={insight} delay={0.05 * i} compact />
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="col-span-12 lg:col-span-4 rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.03] bg-white p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Live Activity</h3>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="space-y-3">
            {mockRecentActivity.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="flex items-start gap-3"
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-xl border flex items-center justify-center flex-shrink-0 mt-0.5",
                    activityColors[item.type]
                  )}
                >
                  {activityIcons[item.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground leading-snug">
                    <span className="text-cyan-400">{item.patient}</span>{" "}
                    {truncateText(item.content, 42)}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                    {item.platform && (
                      <span className="text-[10px] text-muted-foreground capitalize">· {item.platform}</span>
                    )}
                    {item.rating && (
                      <span className="text-[10px] text-yellow-400">{"★".repeat(item.rating)}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Location Summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="col-span-12 lg:col-span-3 rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.03] bg-white p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Locations</h3>
              <p className="text-xs text-muted-foreground">Performance overview</p>
            </div>
            <Link href="/locations" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {mockLocations.map((loc, i) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="rounded-xl border dark:border-white/5 border-black/5 dark:bg-white/[0.02] bg-black/[0.02] p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold text-foreground leading-snug flex-1 min-w-0 truncate">
                    {loc.name}
                  </p>
                  <div
                    className={cn(
                      "text-xs font-bold px-1.5 py-0.5 rounded-lg",
                      loc.status === "excellent"
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-yellow-400 bg-yellow-500/10"
                    )}
                  >
                    {loc.overallRating}★
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>{loc.totalReviews.toLocaleString()} reviews</span>
                  <span className="text-emerald-400">{loc.reviewVelocity}</span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${loc.reputationScore}%` }}
                    transition={{ duration: 1, delay: 0.1 * i }}
                    className="h-full gradient-brand rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.03] bg-white p-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: "Request Reviews", icon: Send, href: "/reviews", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
            { label: "View Sentiment", icon: Brain, href: "/sentiment", color: "text-ai-400", bg: "bg-ai-500/10 border-ai-500/20" },
            { label: "Respond to Reviews", icon: MessageSquare, href: "/reviews/respond", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
            { label: "Launch Campaign", icon: Activity, href: "/campaigns", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
            { label: "View Analytics", icon: BarChart3, href: "/analytics", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
            { label: "AI Insights", icon: Sparkles, href: "/ai-insights", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}>
                <div
                  className={cn(
                    "rounded-xl border p-4 flex flex-col items-center gap-2 cursor-pointer",
                    "hover:scale-105 transition-all duration-200 card-hover",
                    action.bg
                  )}
                >
                  <Icon className={cn("w-5 h-5", action.color)} />
                  <span className="text-xs font-medium text-foreground text-center leading-tight">
                    {action.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
