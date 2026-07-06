"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Activity, Star, Brain, Zap, MessageSquare, BarChart3,
  MapPin, Users, TrendingUp, Target, Megaphone, Shield,
  CheckCircle, ArrowRight, Sparkles, ChevronDown,
  Globe, Lock, Cpu, HeartPulse
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "AI Review Intelligence",
    description: "AI decides who to ask, when, and which platform — not everyone, just the right patients at the right time.",
    color: "text-ai-400",
    bg: "bg-ai-500/10 border-ai-500/20",
  },
  {
    icon: Zap,
    title: "Smart Review Routing",
    description: "Happy patients go to Google. Unhappy patients go to a private form. Protect your reputation automatically.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: MessageSquare,
    title: "AI Sentiment Detection",
    description: "Predict patient satisfaction from messages, surveys, and portal interactions before a public review is posted.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Star,
    title: "HIPAA-Aware AI Responses",
    description: "Generate professional review response drafts that are HIPAA-aware and ready for one-click approval.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: BarChart3,
    title: "AI Reputation Forecast",
    description: "Predict your next 30/60/90 days of review growth, rating trajectory, and risk factors before they happen.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: MapPin,
    title: "Multi-Location Intelligence",
    description: "Manage reputation across unlimited clinic locations with per-location score tracking and comparison.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Users,
    title: "Patient Intelligence",
    description: "Score every patient by satisfaction, NPS, and referral likelihood. Know who your advocates are.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: Target,
    title: "Competitor Benchmarking",
    description: "Compare ratings, review velocity, and patient sentiment against nearby competitors using public data.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: TrendingUp,
    title: "Local SEO Analytics",
    description: "Connect reputation to patient acquisition with keyword ranking, geographic trends, and SEO insights.",
    color: "text-teal-400",
    bg: "bg-teal-500/10 border-teal-500/20",
  },
];

const stats = [
  { value: "4.9★", label: "Avg rating increase", suffix: "" },
  { value: "68", label: "Review conversion rate", suffix: "%" },
  { value: "87", label: "Reduction in negative reviews", suffix: "%" },
  { value: "$128K", label: "Avg annual revenue impact", suffix: "" },
];

const testimonials = [
  {
    quote: "We went from 3.8 to 4.8 stars on Google in 8 months. The AI routing alone saved us from dozens of negative reviews.",
    author: "Dr. Sarah Chen",
    title: "Medical Director, Austin Family Health",
    rating: 5,
  },
  {
    quote: "Finally a platform that understands healthcare. The HIPAA-aware AI responses have saved us hours every week.",
    author: "Marcus Johnson",
    title: "Practice Manager, Westside Clinic Group",
    rating: 5,
  },
  {
    quote: "The AI Sentiment Engine is incredible. We now intervene before unhappy patients post publicly. Game changer.",
    author: "Dr. Priya Sharma",
    title: "CMO, HealthFirst Medical Group",
    rating: 5,
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$199",
    period: "/month",
    description: "Perfect for single-location practices",
    features: [
      "1 clinic location",
      "AI Review Requests",
      "Smart Routing",
      "Review Response Drafts",
      "Basic Analytics",
      "Email & SMS campaigns",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$499",
    period: "/month",
    description: "For growing multi-location groups",
    features: [
      "Up to 5 locations",
      "All Starter features",
      "AI Sentiment Engine",
      "Competitor Benchmarking",
      "Reputation Forecasting",
      "Multi-location Dashboard",
      "Priority Support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large healthcare networks",
    features: [
      "Unlimited locations",
      "All Pro features",
      "White-label Platform",
      "SSO & SAML",
      "HIPAA BAA included",
      "Custom AI Training",
      "Dedicated Success Manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

function AnimatedCounter({ target, suffix }: { target: string; suffix: string }) {
  const num = parseFloat(target.replace(/[^0-9.]/g, ""));
  const hasDecimal = target.includes(".");
  const prefix = target.match(/^[^0-9]*/)?.[0] || "";

  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = num / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        setDisplayed(num);
        clearInterval(timer);
      } else {
        setDisplayed(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [num]);

  return (
    <span>
      {prefix}{hasDecimal ? displayed.toFixed(1) : Math.floor(displayed)}{suffix}
    </span>
  );
}

export default function LandingPage() {
  const [statsVisible, setStatsVisible] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-foreground">ReputeCare AI</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Live Demo
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 text-center relative">
        <div className="absolute inset-0 gradient-hero pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 rounded-full bg-ai-500/5 blur-3xl" />

        <div className="relative max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai-500/10 border border-ai-500/20 text-ai-400 text-xs font-semibold mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 ai-pulse" />
            AI-Powered Healthcare Reputation Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight mb-6"
          >
            Turn Every Patient
            <br />
            <span className="gradient-brand-text">Into Trust, Reviews</span>
            <br />
            and Growth.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
          >
            ReputeCare AI is the only platform that detects unhappy patients before they post, routes feedback intelligently, and transforms your reputation into your #1 growth channel.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/dashboard"
              id="hero-demo-cta"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl gradient-brand text-white text-base font-bold hover:opacity-90 transition-all shadow-lg glow-brand"
            >
              <Sparkles className="w-5 h-5" />
              Launch Interactive Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl border dark:border-white/10 border-black/8 text-foreground text-base font-semibold hover:bg-muted transition-all"
            >
              Explore Features
              <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Hero Preview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 md:grid-cols-5 gap-3 max-w-3xl mx-auto"
          >
            {[
              { label: "Avg Rating", value: "4.9★", color: "text-yellow-400" },
              { label: "Rep Score", value: "96", color: "text-cyan-400" },
              { label: "Conversion", value: "68%", color: "text-emerald-400" },
              { label: "AI Accuracy", value: "94%", color: "text-ai-400" },
              { label: "Revenue ↑", value: "+$128K", color: "text-violet-400" },
            ].map((card, i) => (
              <div
                key={card.label}
                className="rounded-2xl border dark:border-white/8 border-black/5 dark:bg-white/[0.04] bg-white/80 backdrop-blur-xl p-4 text-center"
              >
                <p className={cn("text-xl font-black", card.color)}>{card.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12 border-y dark:border-white/5 border-black/5 dark:bg-white/[0.02] bg-black/[0.01]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => setStatsVisible(true)}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-black gradient-brand-text">
                  {statsVisible ? <AnimatedCounter target={stat.value} suffix={stat.suffix} /> : "—"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">The Platform</p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              Not a review tool.
              <br />
              <span className="gradient-brand-text">A reputation intelligence platform.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              9 AI-powered modules working together to grow your reputation, protect your practice, and increase patient referrals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className="rounded-2xl border border-border bg-card p-6 card-hover group"
                >
                  <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center mb-4", feature.bg)}>
                    <Icon className={cn("w-5 h-5", feature.color)} />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Architecture Section */}
      <section className="py-24 px-6 md:px-12 bg-muted/20 border-y border-border">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold text-ai-400 uppercase tracking-widest mb-3">AI Architecture</p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              6 AI agents. One platform.
              <br />
              <span className="gradient-brand-text">Running 24/7.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-12">
              Our multi-agent AI continuously monitors, analyzes, and acts across every patient touchpoint.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {[
                { name: "Review Agent", icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
                { name: "Sentiment Agent", icon: Brain, color: "text-ai-400", bg: "bg-ai-500/10 border-ai-500/20" },
                { name: "Recovery Agent", icon: Zap, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
                { name: "SEO Agent", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                { name: "Referral Agent", icon: Users, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
                { name: "Executive Agent", icon: BarChart3, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
              ].map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className={cn("flex items-center gap-2 px-4 py-3 rounded-2xl border", agent.bg)}
                  >
                    <Icon className={cn("w-4 h-4", agent.color)} />
                    <span className="text-sm font-semibold text-foreground">{agent.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Healthcare teams love ReputeCare AI
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex mb-3">
                  {"★".repeat(t.rating).split("").map((s, j) => (
                    <span key={j} className="text-yellow-400 text-sm">{s}</span>
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 md:px-12 bg-muted/20 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">All plans include 30-day free trial. No credit card required.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className={cn(
                  "rounded-2xl border p-6 relative",
                  plan.highlighted
                    ? "border-cyan-500/30 bg-cyan-500/[0.04] shadow-xl"
                    : "border-border bg-card"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-brand text-white text-xs font-bold">
                    Most Popular
                  </div>
                )}

                <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-black text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>

                <div className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/dashboard"
                  className={cn(
                    "w-full flex items-center justify-center py-3 rounded-xl text-sm font-bold transition-all",
                    plan.highlighted
                      ? "gradient-brand text-white hover:opacity-90"
                      : "border dark:border-white/10 border-black/8 text-foreground hover:bg-muted"
                  )}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + Final CTA */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-16 text-xs text-muted-foreground">
              {[
                { icon: Shield, label: "HIPAA Ready" },
                { icon: Lock, label: "SOC 2 Type II" },
                { icon: Globe, label: "99.9% Uptime SLA" },
                { icon: Cpu, label: "GPT-4o Powered" },
                { icon: HeartPulse, label: "Healthcare Focused" },
              ].map((trust) => {
                const Icon = trust.icon;
                return (
                  <div key={trust.label} className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span>{trust.label}</span>
                  </div>
                );
              })}
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              Ready to become the
              <br />
              <span className="gradient-brand-text">most trusted clinic</span>
              <br />
              in your market?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join healthcare organizations using ReputeCare AI to grow their reputation, protect their patients, and increase referrals.
            </p>

            <Link
              href="/dashboard"
              id="final-demo-cta"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl gradient-brand text-white text-base font-bold hover:opacity-90 transition-all shadow-2xl glow-brand"
            >
              <Sparkles className="w-5 h-5" />
              Launch Interactive Demo — Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-muted-foreground mt-4">No credit card · Full platform · Demo data pre-loaded</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-foreground">ReputeCare AI</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              © 2026 ReputeCare AI · Built for healthcare · HIPAA-ready architecture · <a href="https://www.medclinicx.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline decoration-cyan-500/50">Healthcare system by Med Clinic X</a>
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
