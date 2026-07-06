"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Users, Building2, Bell, Shield, Key, Link2, FileText, Plus, Trash2, Edit } from "lucide-react";
import { mockTeamMembers, mockAuditLogs } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const settingsTabs = ["Organization", "Team", "Integrations", "Notifications", "Security", "Audit Log"];
const roleColors: Record<string, string> = {
  ORG_ADMIN: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  CLINIC_MANAGER: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  STAFF: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  VIEWER: "text-slate-400 bg-slate-500/10 border-slate-500/20",
};

const integrations = [
  { name: "Epic Systems EHR", category: "EHR/EMR", status: "disconnected", icon: "E", color: "#E02424", description: "Sync patient demographic data and appointment schedules" },
  { name: "Cerner Millenium", category: "EHR/EMR", status: "disconnected", icon: "C", color: "#1A56DB", description: "Automate post-visit experience triggers" },
  { name: "athenahealth", category: "EHR/EMR", status: "connected", icon: "A", color: "#06B6D4", description: "Real-time sync of patient check-outs and wait times" },
  { name: "Dentrix Enterprise", category: "EHR/EMR", status: "disconnected", icon: "D", color: "#7E3AF2", description: "Dental specialty clinic scheduling integration" },
  { name: "Salesforce Health Cloud", category: "CRM", status: "connected", icon: "SF", color: "#00A1E0", description: "Sync patient loyalty status and NPS segments" },
  { name: "HubSpot CRM", category: "CRM", status: "connected", icon: "HS", color: "#FF7A59", description: "Sync operational outreach email templates" },
  { name: "Twilio Messaging", category: "Comms & Automation", status: "connected", icon: "Tw", color: "#F22F46", description: "Automated SMS review requests and feedback routing" },
  { name: "Make.com Platform", category: "Comms & Automation", status: "connected", icon: "M", color: "#E11D48", description: "Custom workflow integration and automated triggers" },
  { name: "n8n workflow", category: "Comms & Automation", status: "connected", icon: "n8", color: "#F97316", description: "Self-hosted operational workflow automation" },
  { name: "Google Business Profile", category: "Reputation Platform", status: "connected", icon: "G", color: "#4285F4", description: "Sync public reviews and ratings automatically" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your organization, team, and integrations</p>
      </motion.div>

      <div className="flex gap-1 p-1 rounded-xl bg-muted overflow-x-auto whitespace-nowrap scrollbar-none">
        {settingsTabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              activeTab === i ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Organization Tab */}
      {activeTab === 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Organization Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Organization Name", value: "HealthFirst Medical Group", type: "text" },
                { label: "Slug / URL", value: "healthfirst", type: "text" },
                { label: "Plan", value: "Enterprise", type: "select" },
                { label: "Primary Contact Email", value: "admin@healthfirst.com", type: "email" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{field.label}</label>
                  <input
                    defaultValue={field.value}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-foreground outline-none focus:border-cyan-500/30 transition-colors"
                  />
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Save Changes
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-foreground">HIPAA Compliance</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "HIPAA-Aware AI Responses", enabled: true },
                { label: "PHI Data Isolation", enabled: true },
                { label: "Audit Logging", enabled: true },
                { label: "Data Encryption at Rest", enabled: true },
                { label: "BAA Agreement Signed", enabled: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b dark:border-white/5 border-black/5 last:border-0">
                  <span className="text-sm text-foreground">{item.label}</span>
                  <div className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full",
                    item.enabled ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"
                  )}>
                    <div className={cn("w-1.5 h-1.5 rounded-full", item.enabled ? "bg-emerald-400" : "bg-red-400")} />
                    {item.enabled ? "Enabled" : "Disabled"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Team Tab */}
      {activeTab === 1 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Team Members</h3>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Invite Member
              </button>
            </div>
            <div className="space-y-3">
              {mockTeamMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center gap-4 p-4 rounded-2xl border dark:border-white/5 border-black/5 dark:bg-white/[0.02] bg-black/[0.02]"
                >
                  <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{member.location}</p>
                  </div>
                  <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border", roleColors[member.role])}>
                    {member.role.replace("_", " ")}
                  </span>
                  <p className="text-xs text-muted-foreground hidden md:block">{member.lastActive}</p>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Integrations Tab */}
      {activeTab === 2 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration, i) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: integration.color }}>
                  {integration.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground truncate">{integration.name}</p>
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full dark:bg-white/5 bg-black/5 text-muted-foreground border dark:border-white/5 border-black/5">
                      {integration.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-normal">{integration.description}</p>
                </div>
                <button className={cn(
                  "text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all flex-shrink-0",
                  integration.status === "connected"
                    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                    : "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20"
                )}>
                  {integration.status === "connected" ? "Connected" : "Connect"}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Audit Log Tab */}
      {activeTab === 5 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Audit Log</h3>
            <div className="overflow-x-auto">
              <table className="w-full data-table">
                <thead>
                  <tr>
                    <th className="text-left">User</th>
                    <th className="text-left">Action</th>
                    <th className="text-left">Resource</th>
                    <th className="text-left">Timestamp</th>
                    <th className="text-left">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAuditLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="text-foreground text-xs">{log.user}</td>
                      <td><span className="text-xs text-cyan-400 font-medium">{log.action}</span></td>
                      <td className="text-xs text-muted-foreground">{log.resource}</td>
                      <td className="text-xs text-muted-foreground">{log.timestamp}</td>
                      <td className="text-xs text-muted-foreground font-mono">{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Placeholder for other tabs */}
      {(activeTab === 3 || activeTab === 4) && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-muted mx-auto flex items-center justify-center mb-4">
              {activeTab === 3 ? <Bell className="w-6 h-6 text-muted-foreground" /> : <Key className="w-6 h-6 text-muted-foreground" />}
            </div>
            <p className="text-sm font-semibold text-foreground">{settingsTabs[activeTab]} Settings</p>
            <p className="text-xs text-muted-foreground mt-1">Coming soon — this section is being built.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
