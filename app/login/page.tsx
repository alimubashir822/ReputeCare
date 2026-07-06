"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Activity, Eye, EyeOff, Sparkles, Shield, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@healthfirst.com");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 1200));

    if (email === "admin@healthfirst.com" && password === "demo123") {
      router.push("/dashboard");
    } else if (email === "manager@healthfirst.com" && password === "demo123") {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Use the demo credentials below.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-[hsl(222,47%,6%)] bg-slate-50 flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-ai-500/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-2xl glow-brand">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">ReputeCare AI</h1>
          <p className="text-sm text-muted-foreground mt-1">AI Patient Reputation & Growth Platform</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border dark:border-white/10 border-black/8 dark:bg-white/[0.04] bg-white/80 backdrop-blur-xl p-8 shadow-2xl"
        >
          <h2 className="text-xl font-bold text-foreground mb-1">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-6">Sign in to your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border dark:border-white/10 border-black/8 dark:bg-white/5 bg-black/3 text-sm text-foreground outline-none focus:border-cyan-500/50 transition-colors"
                placeholder="you@clinic.com"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border dark:border-white/10 border-black/8 dark:bg-white/5 bg-black/3 text-sm text-foreground outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl gradient-brand text-white text-sm font-bold hover:opacity-90 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-2xl bg-ai-500/5 border border-ai-500/15">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-ai-400" />
              <p className="text-xs font-semibold text-ai-400">Demo Credentials</p>
            </div>
            <div className="space-y-1.5">
              {[
                { role: "Org Admin", email: "admin@healthfirst.com", pw: "demo123" },
                { role: "Clinic Manager", email: "manager@healthfirst.com", pw: "demo123" },
              ].map((cred) => (
                <button
                  key={cred.email}
                  onClick={() => { setEmail(cred.email); setPassword(cred.pw); }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <span className="text-xs font-semibold text-foreground">{cred.role}: </span>
                  <span className="text-xs text-muted-foreground">{cred.email} / {cred.pw}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* HIPAA Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground/60"
        >
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          HIPAA-Ready · SOC 2 Type II · Data encrypted at rest and in transit
        </motion.div>
      </div>
    </div>
  );
}
