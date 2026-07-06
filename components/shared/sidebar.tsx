"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Star, Brain, MessageSquare, BarChart3,
  MapPin, Users, TrendingUp, Settings, Megaphone, Target,
  Zap, ChevronLeft, ChevronRight, Shield, Activity, Sparkles, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    group: "Reputation",
    items: [
      { label: "Reputation Center", href: "/reputation", icon: Star },
      { label: "AI Review Intelligence", href: "/reviews", icon: Brain },
      { label: "AI Sentiment Engine", href: "/sentiment", icon: Zap },
    ],
  },
  {
    group: "Patient",
    items: [
      { label: "Patient Feedback", href: "/feedback", icon: MessageSquare },
      { label: "Complaint Resolution", href: "/complaints", icon: Shield },
      { label: "Patient Intelligence", href: "/patients", icon: Users },
      { label: "Campaign Manager", href: "/campaigns", icon: Megaphone },
    ],
  },
  {
    group: "Intelligence",
    items: [
      { label: "Reputation Simulator", href: "/simulator", icon: Sparkles },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "Multi-Location", href: "/locations", icon: MapPin },
      { label: "AI Insights", href: "/ai-insights", icon: TrendingUp },
      { label: "Competitors", href: "/competitors", icon: Target },
    ],
  },
  {
    group: "Account",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ collapsed = false, onToggle, mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [showSwitcher, setShowSwitcher] = useState(false);

  const ecosystemApps = [
    { name: "ReputeCare AI", desc: "Experience & Reputation", active: true, tag: "Active" },
    { name: "PortalCare AI", desc: "Patient Portal", active: false, tag: "Upgrade" },
    { name: "Schedura AI", desc: "Scheduling & Operations", active: false, tag: "Upgrade" },
    { name: "RetainCare AI", desc: "Patient Retention", active: false, tag: "Upgrade" },
    { name: "ClaimPilot AI", desc: "Insurance & Billing", active: false, tag: "Upgrade" },
    { name: "InsightCare AI", desc: "Executive Analytics", active: false, tag: "Upgrade" },
    { name: "AssistCare AI", desc: "AI Voice Receptionist", active: false, tag: "Upgrade" },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "flex flex-col h-screen border-r border-border bg-card backdrop-blur-xl",
          "fixed lg:relative inset-y-0 left-0 -translate-x-full lg:translate-x-0 transition-transform lg:transition-none duration-300 z-50 lg:z-20",
          mobileOpen && "translate-x-0"
        )}
      >
      {/* Logo / Ecosystem Switcher */}
      <div className="relative">
        <div
          onClick={() => !collapsed && setShowSwitcher(!showSwitcher)}
          className={cn(
            "flex items-center gap-3 px-4 py-5 border-b dark:border-white/8 border-black/5 cursor-pointer select-none",
            !collapsed && "hover:bg-white/5 transition-colors"
          )}
        >
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-lg glow-brand">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 dark:border-slate-900 border-white" />
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="min-w-0 flex-1 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">ReputeCare</p>
                  <p className="text-xs gradient-brand-text font-semibold mt-0.5">AI Platform</p>
                </div>
                <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", showSwitcher && "rotate-180")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Switcher Menu */}
        <AnimatePresence>
          {showSwitcher && !collapsed && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowSwitcher(false)} />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute left-2 right-2 top-20 z-45 rounded-2xl border dark:border-white/10 border-black/5 dark:bg-slate-900 bg-white shadow-2xl p-2 space-y-1"
              >
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-2 py-1">Healthcare Ecosystem</p>
                {ecosystemApps.map((app) => (
                  <div
                    key={app.name}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-xl text-left select-none transition-all",
                      app.active
                        ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 cursor-default"
                        : "hover:bg-muted text-foreground cursor-pointer opacity-70 hover:opacity-100"
                    )}
                  >
                    <div>
                      <p className="text-xs font-bold leading-tight">{app.name}</p>
                      <p className="text-[9px] text-muted-foreground/80 mt-0.5">{app.desc}</p>
                    </div>
                    <span className={cn(
                      "text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase border",
                      app.active
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                        : "text-slate-400 bg-slate-500/10 border-slate-500/20"
                    )}>
                      {app.tag}
                    </span>
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {navItems.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 px-3 mb-2">
                {group.group}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                return (
                  <Link key={item.href} href={item.href} onClick={onMobileClose}>
                    <div
                      className={cn(
                        "sidebar-item",
                        collapsed && "justify-center px-2",
                        isActive ? "sidebar-item-active" : "sidebar-item-inactive"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-cyan-400" : "")} />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                      {isActive && !collapsed && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* HIPAA badge */}
      <div className="px-3 py-3 border-t dark:border-white/8 border-black/5">
        <AnimatePresence>
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/8 border border-emerald-500/15"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-emerald-400">HIPAA Ready</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full dark:bg-slate-800 bg-white border dark:border-white/10 border-black/10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
    </motion.aside>
    </>
  );
}
