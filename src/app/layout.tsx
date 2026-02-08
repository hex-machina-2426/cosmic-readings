import type { Metadata } from "next";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosmic Readings — Unveil the Mysteries Written in the Stars",
  description:
    "Discover your zodiac reading, numerology life path, and gematria insights. Personalized cosmic guidance powered by ancient wisdom.",
  keywords: ["zodiac", "astrology", "numerology", "gematria", "cosmic reading"],
  openGraph: {
    title: "Cosmic Readings",
    description: "Unveil the mysteries written in the stars",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-indigo-950">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
