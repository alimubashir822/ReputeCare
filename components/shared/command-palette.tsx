"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search, LayoutDashboard, Star, Brain, MessageSquare,
  BarChart3, MapPin, Users, TrendingUp, Settings,
  Zap, Target, Megaphone, ChevronRight
} from "lucide-react";

const commands = [
  { id: "dashboard", label: "Executive Dashboard", icon: LayoutDashboard, href: "/dashboard", group: "Navigation" },
  { id: "reputation", label: "Reputation Center", icon: Star, href: "/reputation", group: "Navigation" },
  { id: "reviews", label: "AI Review Intelligence", icon: Brain, href: "/reviews", group: "Navigation" },
  { id: "sentiment", label: "AI Sentiment Engine", icon: Zap, href: "/sentiment", group: "Navigation" },
  { id: "feedback", label: "Patient Feedback Hub", icon: MessageSquare, href: "/feedback", group: "Navigation" },
  { id: "campaigns", label: "Campaign Manager", icon: Megaphone, href: "/campaigns", group: "Navigation" },
  { id: "analytics", label: "Analytics Dashboard", icon: BarChart3, href: "/analytics", group: "Navigation" },
  { id: "locations", label: "Multi-Location Dashboard", icon: MapPin, href: "/locations", group: "Navigation" },
  { id: "patients", label: "Patient Intelligence", icon: Users, href: "/patients", group: "Navigation" },
  { id: "competitors", label: "Competitor Benchmarking", icon: Target, href: "/competitors", group: "Navigation" },
  { id: "ai-insights", label: "AI Executive Insights", icon: TrendingUp, href: "/ai-insights", group: "Navigation" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings", group: "Navigation" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
      setQuery("");
    },
    [router, onClose]
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelected(0);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && filtered[selected]) {
        handleSelect(filtered[selected].href);
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, handleSelect, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
          >
            <div className="rounded-2xl border dark:border-white/10 border-black/10 dark:bg-slate-900/95 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b dark:border-white/8 border-black/5">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                  placeholder="Search commands, pages, actions..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No results found
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1 mb-1">
                      Navigation
                    </p>
                    {filtered.map((cmd, i) => {
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => handleSelect(cmd.href)}
                          onMouseEnter={() => setSelected(i)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                            i === selected
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "text-foreground hover:bg-muted/50"
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="flex-1 text-left">{cmd.label}</span>
                          {i === selected && (
                            <ChevronRight className="w-3 h-3" />
                          )}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t dark:border-white/8 border-black/5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><kbd className="bg-muted px-1 py-0.5 rounded border border-border">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="bg-muted px-1 py-0.5 rounded border border-border">↵</kbd> select</span>
                <span className="flex items-center gap-1"><kbd className="bg-muted px-1 py-0.5 rounded border border-border">ESC</kbd> close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
