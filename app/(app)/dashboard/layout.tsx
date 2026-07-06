import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Dashboard",
  description: "ReputeCare AI executive overview — reputation scores, AI insights, and performance KPIs",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
