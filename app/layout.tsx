import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ReputeCare AI — AI Patient Reputation & Growth Platform",
    template: "%s | ReputeCare AI",
  },
  description:
    "Turn every patient experience into trust, reviews, and growth. ReputeCare AI is the leading AI-powered patient reputation and review management platform for healthcare organizations.",
  keywords: [
    "healthcare reputation management",
    "patient reviews",
    "medical practice reviews",
    "AI reputation platform",
    "HIPAA compliant review management",
    "patient satisfaction",
    "healthcare marketing",
  ],
  authors: [{ name: "ReputeCare AI" }],
  creator: "ReputeCare AI",
  openGraph: {
    type: "website",
    title: "ReputeCare AI — AI Patient Reputation & Growth Platform",
    description:
      "Turn every patient experience into trust, reviews, and growth.",
    siteName: "ReputeCare AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReputeCare AI",
    description: "AI Patient Reputation & Growth Platform for Healthcare",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var stored = localStorage.getItem('theme');
                var theme = stored || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
