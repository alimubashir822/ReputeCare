"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Bell, Sun, Moon, Command, Sparkles, X,
  ChevronDown, LogOut, Settings, User, Building2, Send, Menu
} from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { mockCopilotResponses } from "@/lib/mock-data";

interface NavbarProps {
  onCommandPalette: () => void;
  onMenuToggle?: () => void;
}

const mockNotifications = [
  { id: 1, type: "review", message: "New 5★ Google review from Sarah M.", time: "2m ago", unread: true },
  { id: 2, type: "warning", message: "3 patients showing dissatisfaction signals", time: "18m ago", unread: true },
  { id: 3, type: "insight", message: "AI identified 47 review opportunities", time: "1h ago", unread: true },
  { id: 4, type: "campaign", message: "Post-Visit campaign: 12 new conversions", time: "3h ago", unread: false },
];

export function Navbar({ onCommandPalette, onMenuToggle }: NavbarProps) {
  const { theme, toggle } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "👋 Hello! I'm your ReputeCare AI Executive Copilot. I can help analyze rating trends, identify at-risk patients, and suggest operational improvements.\n\nWhat would you like to ask today?"
    }
  ]);
  const [chatInputValue, setChatInputValue] = useState("");
  const [chatIsTyping, setChatIsTyping] = useState(false);

  const handleSendChat = async (text: string) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev, { sender: "user", text }]);
    setChatInputValue("");
    setChatIsTyping(true);

    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const matchedResponse = mockCopilotResponses.find((r) =>
      text.toLowerCase().includes(r.query.toLowerCase()) ||
      r.query.toLowerCase().includes(text.toLowerCase())
    );

    let reply = "I'm sorry, I don't have simulated data for that query yet. Try asking:\n- 'Why are ratings declining at Westside?'\n- 'Which clinic has the happiest patients?'\n- 'What are the top patient complaints this month?'";
    if (matchedResponse) {
      reply = matchedResponse.answer;
    }

    setChatMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    setChatIsTyping(false);
  };

  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  return (
    <>
      <header className="h-16 flex items-center gap-4 px-6 border-b dark:border-white/8 border-black/5 dark:bg-[hsl(222,47%,7%)]/80 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        {/* Mobile Hamburger Trigger */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl dark:bg-white/5 bg-black/5 border dark:border-white/8 border-black/5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Search / Command */}
        <button
          onClick={onCommandPalette}
          className="flex items-center gap-2 px-3 py-2 rounded-xl dark:bg-white/5 bg-black/5 border dark:border-white/8 border-black/5 text-sm text-muted-foreground hover:text-foreground transition-colors group w-56"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1 text-left text-xs">Search anything...</span>
          <div className="flex items-center gap-0.5">
            <kbd className="text-xs bg-muted px-1 py-0.5 rounded border border-border flex items-center gap-0.5">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </div>
        </button>

        <div className="flex-1" />

        {/* AI Chat Button */}
        <button
          onClick={() => setShowAIChat(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-ai-500/10 border border-ai-500/20 text-sm text-ai-400 hover:bg-ai-500/15 transition-all ai-pulse"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">AI Assistant</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-xl dark:bg-white/5 bg-black/5 hover:bg-muted transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Moon className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl dark:bg-white/5 bg-black/5 hover:bg-muted transition-colors"
          >
            <Bell className="w-4 h-4 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-cyan-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 rounded-2xl border dark:border-white/10 border-black/5 dark:bg-slate-900/95 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b dark:border-white/8 border-black/5">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                  <span className="text-xs text-cyan-400 font-medium cursor-pointer">Mark all read</span>
                </div>
                <div className="divide-y dark:divide-white/5 divide-black/5">
                  {mockNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        "px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors",
                        n.unread && "dark:bg-cyan-500/3 bg-cyan-50/50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {n.unread && (
                          <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        )}
                        <div className={cn(!n.unread && "pl-5")}>
                          <p className="text-xs text-foreground">{n.message}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold">
              AH
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-foreground leading-none">Alexandra Hart</p>
              <p className="text-xs text-muted-foreground mt-0.5">ORG Admin</p>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-52 rounded-2xl border dark:border-white/10 border-black/5 dark:bg-slate-900/95 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b dark:border-white/8 border-black/5">
                  <p className="text-sm font-semibold text-foreground">Alexandra Hart</p>
                  <p className="text-xs text-muted-foreground">admin@healthfirst.com</p>
                  <div className="mt-1.5 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-cyan-400" />
                    <p className="text-xs text-cyan-400">HealthFirst Medical Group</p>
                  </div>
                </div>
                <div className="p-2">
                  <a href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted text-sm text-foreground transition-colors">
                    <User className="w-4 h-4 text-muted-foreground" />Profile
                  </a>
                  <a href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted text-sm text-foreground transition-colors">
                    <Settings className="w-4 h-4 text-muted-foreground" />Settings
                  </a>
                  <hr className="my-1 dark:border-white/8 border-black/5" />
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-500/10 text-sm text-red-400 transition-colors">
                    <LogOut className="w-4 h-4" />Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* AI Chat Sidebar */}
      <AnimatePresence>
        {showAIChat && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setShowAIChat(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-96 z-50 dark:bg-slate-900/98 bg-white/98 backdrop-blur-xl border-l dark:border-white/10 border-black/5 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b dark:border-white/8 border-black/5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-ai-500/10 border border-ai-500/20 ai-pulse">
                    <Sparkles className="w-4 h-4 text-ai-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Executive Copilot</h3>
                    <p className="text-xs text-muted-foreground">ReputeCare AI Intelligence</p>
                  </div>
                </div>
                <button onClick={() => setShowAIChat(false)} className="p-1 hover:bg-muted rounded-lg">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex gap-3 max-w-[85%] items-start",
                      msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                    )}
                  >
                    {msg.sender === "ai" ? (
                      <div className="p-1.5 rounded-lg bg-ai-500/10 border border-ai-500/20 flex-shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-ai-400" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-xs font-bold text-cyan-400 flex-shrink-0">
                        AH
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap",
                        msg.sender === "user"
                          ? "bg-cyan-500 text-white rounded-tr-sm"
                          : "bg-muted/50 text-foreground rounded-tl-sm border dark:border-white/5 border-black/5"
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {chatIsTyping && (
                  <div className="flex gap-3 items-start self-start">
                    <div className="p-1.5 rounded-lg bg-ai-500/10 border border-ai-500/20 flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-ai-400" />
                    </div>
                    <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-muted-foreground flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              <div className="px-4 py-2 border-t dark:border-white/5 border-black/5 space-y-1.5 bg-black/5">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Suggested Questions</p>
                <div className="flex flex-col gap-1">
                  {[
                    "Why are ratings declining at Westside?",
                    "Which clinic has the happiest patients?",
                    "What are the top patient complaints this month?",
                  ].map((queryText) => (
                    <button
                      key={queryText}
                      onClick={() => handleSendChat(queryText)}
                      className="w-full text-left px-3 py-1.5 rounded-lg border dark:border-white/5 border-black/5 text-[11px] text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all truncate"
                    >
                      {queryText}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t dark:border-white/8 border-black/5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChat(chatInputValue);
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border dark:border-white/10 border-black/5 dark:bg-white/5 bg-black/5"
                >
                  <input
                    value={chatInputValue}
                    onChange={(e) => setChatInputValue(e.target.value)}
                    placeholder="Ask AI anything..."
                    className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
                  />
                  <button type="submit" className="p-1.5 rounded-lg gradient-brand text-white text-xs hover:opacity-90">
                    <Send className="w-3 h-3" />
                  </button>
                </form>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  HIPAA-ready responses · Continuous learning active
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
