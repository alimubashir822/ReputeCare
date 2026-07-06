"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, Edit3, Star, ExternalLink, Shield } from "lucide-react";
import { mockReviews } from "@/lib/mock-data";
import { cn, getRelativeTime } from "@/lib/utils";

const platformColors: Record<string, string> = {
  google: "#4285F4",
  facebook: "#1877F2",
  healthgrades: "#0EA5E9",
  yelp: "#FF1A1A",
};

export default function ReviewsRespondPage() {
  const [selectedReview, setSelectedReview] = useState(mockReviews[0]);
  const [response, setResponse] = useState(mockReviews[0].aiResponse || "");
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">AI Response Center</h1>
        <p className="text-sm text-muted-foreground mt-1">
          HIPAA-aware AI response drafts — review, edit, and publish in seconds
        </p>
      </motion.div>

      {/* HIPAA Notice */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20"
      >
        <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <p className="text-xs text-emerald-400 font-medium">
          All AI-generated responses are HIPAA-aware — they never acknowledge protected health information unless explicitly approved by your team.
        </p>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Review List */}
        <div className="col-span-12 lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{mockReviews.filter(r => !r.responded).length} Awaiting Response</p>
            <span className="text-xs text-muted-foreground">{mockReviews.filter(r => r.responded).length} Responded</span>
          </div>

          {mockReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              onClick={() => { setSelectedReview(review); setResponse(review.aiResponse || ""); setEditMode(false); }}
              className={cn(
                "p-4 rounded-2xl border cursor-pointer transition-all",
                selectedReview.id === review.id
                  ? "border-cyan-500/30 dark:bg-cyan-500/5 bg-cyan-50/50"
                  : "border-border bg-card hover:border-white/12"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: platformColors[review.platform] || "#6366f1" }}>
                  {review.platform[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-foreground">{review.patient}</p>
                    <div className="flex items-center gap-1">
                      {review.responded ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-yellow-400 text-xs">{"★".repeat(review.rating)}</span>
                    <span className="text-xs text-muted-foreground capitalize">· {review.platform}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{review.content}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">{getRelativeTime(review.date)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Response Panel */}
        <div className="col-span-12 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6 sticky top-6"
          >
            {/* Review Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: platformColors[selectedReview.platform] || "#6366f1" }}>
                  {selectedReview.platform[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{selectedReview.patient}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-xs">{"★".repeat(selectedReview.rating)}</span>
                    <span className="text-xs text-muted-foreground capitalize">on {selectedReview.platform}</span>
                    <span className="text-xs text-muted-foreground">· {selectedReview.location}</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> View on Platform
              </button>
            </div>

            {/* Original Review */}
            <div className="rounded-xl border border-border dark:bg-white/[0.02] bg-black/[0.02] p-4 mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Patient Review</p>
              <p className="text-sm text-foreground leading-relaxed">&ldquo;{selectedReview.content}&rdquo;</p>
              <p className="text-xs text-muted-foreground mt-2">{getRelativeTime(selectedReview.date)}</p>
            </div>

            {/* AI Draft */}
            <div className="rounded-xl border border-ai-500/20 bg-ai-500/5 p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-ai-400" />
                  <p className="text-xs font-semibold text-ai-400">AI-Generated Response Draft</p>
                </div>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Edit3 className="w-3 h-3" /> {editMode ? "Preview" : "Edit"}
                </button>
              </div>

              {editMode ? (
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground leading-relaxed outline-none resize-none min-h-[100px]"
                  rows={5}
                />
              ) : (
                <p className="text-sm text-foreground leading-relaxed">{response}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                <CheckCircle className="w-4 h-4" />
                Approve & Post Response
              </button>
              <button className="px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                Skip
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground/60 text-center mt-3">
              Response will be posted directly to {selectedReview.platform} · HIPAA compliant
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
