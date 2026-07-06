import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatCurrency(amount: string | number): string {
  if (typeof amount === "string") return amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getScoreColor(score: number): string {
  if (score >= 90) return "text-emerald-400";
  if (score >= 75) return "text-teal-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
}

export function getScoreBg(score: number): string {
  if (score >= 90) return "bg-emerald-500/20 border-emerald-500/30";
  if (score >= 75) return "bg-teal-500/20 border-teal-500/30";
  if (score >= 60) return "bg-yellow-500/20 border-yellow-500/30";
  return "bg-red-500/20 border-red-500/30";
}

export function getSentimentColor(sentiment: string): string {
  switch (sentiment) {
    case "very_positive": return "text-emerald-400";
    case "positive": return "text-teal-400";
    case "neutral": return "text-slate-400";
    case "negative": return "text-orange-400";
    case "very_negative": return "text-red-400";
    default: return "text-slate-400";
  }
}

export function getSentimentLabel(sentiment: string): string {
  switch (sentiment) {
    case "very_positive": return "Very Positive";
    case "positive": return "Positive";
    case "neutral": return "Neutral";
    case "negative": return "Negative";
    case "very_negative": return "Very Negative";
    default: return "Unknown";
  }
}

export function getRatingStars(rating: number): string {
  return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
}

export function getTrendIcon(trend: string): { icon: string; color: string } {
  if (trend.startsWith("+")) return { icon: "↑", color: "text-emerald-400" };
  if (trend.startsWith("-")) return { icon: "↓", color: "text-red-400" };
  return { icon: "→", color: "text-slate-400" };
}

export function getPlatformColor(platform: string): string {
  switch (platform.toLowerCase()) {
    case "google": return "#4285F4";
    case "facebook": return "#1877F2";
    case "healthgrades": return "#0EA5E9";
    case "yelp": return "#FF1A1A";
    default: return "#6366F1";
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export function getSegmentColor(segment: string): string {
  switch (segment) {
    case "promoter": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "passive": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    case "detractor": return "text-red-400 bg-red-500/10 border-red-500/20";
    default: return "text-slate-400 bg-slate-500/10 border-slate-500/20";
  }
}
