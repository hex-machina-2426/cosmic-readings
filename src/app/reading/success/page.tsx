"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import StarField from "@/components/StarField";
import { Sparkles, Star, Eye } from "lucide-react";

/**
 * Post-payment success page.
 * Retrieves the Stripe session ID from the URL, verifies payment,
 * then generates the full reading server-side.
 */

interface FullReading {
  numerology: string;
  gematria: string;
  cosmicCorrelation: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [reading, setReading] = useState<FullReading | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get("session_id");
  const name = searchParams.get("name") || "Cosmic Traveler";
  const sign = searchParams.get("sign") || "";
  const lifePath = searchParams.get("lifePath") || "";
  const gematria = searchParams.get("gematria") || "";

  useEffect(() => {
    if (!sessionId) {
      setError("Invalid session. Please try again.");
      setLoading(false);
      return;
    }

    const fetchFullReading = async () => {
      try {
        const res = await fetch("/api/reading/full", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            name,
            zodiacSign: { name: sign },
            lifePath: Number(lifePath),
            gematriaValue: Number(gematria),
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to generate reading");
        }

        const data = await res.json();
        setReading(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFullReading();
  }, [sessionId, name, sign, lifePath, gematria]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-violet-950 text-white flex items-center justify-center">
        <StarField count={60} />
        <div className="text-center z-10">
          <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl font-bold text-yellow-200 mb-4">
            Channeling the cosmos...
          </h1>
          <p className="text-purple-300">
            Generating your complete reading, {name}
          </p>
          <div className="mt-6 w-12 h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-violet-950 text-white flex items-center justify-center px-4">
        <StarField count={60} />
        <div className="text-center z-10 max-w-md">
          <h1 className="text-3xl font-bold text-red-300 mb-4">
            Cosmic Interference
          </h1>
          <p className="text-purple-200 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-violet-950 text-white">
      <StarField count={60} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-200 to-pink-300 bg-clip-text text-transparent mb-2">
            {name}&apos;s Full Cosmic Reading
          </h1>
          <p className="text-purple-300">
            {sign} · Life Path {lifePath} · Gematria {gematria}
          </p>
        </div>

        <div className="space-y-8">
          {/* Numerology */}
          <div className="bg-purple-950/50 backdrop-blur rounded-lg p-6 border border-pink-500/30">
            <h2 className="text-2xl font-bold text-pink-200 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Numerology — Life Path {lifePath}
            </h2>
            <p className="text-purple-100 leading-relaxed text-lg">
              {reading?.numerology}
            </p>
          </div>

          {/* Gematria */}
          <div className="bg-purple-950/50 backdrop-blur rounded-lg p-6 border border-purple-500/30">
            <h2 className="text-2xl font-bold text-purple-200 mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              Gematria — {name} ({gematria})
            </h2>
            <p className="text-purple-100 leading-relaxed text-lg">
              {reading?.gematria}
            </p>
          </div>

          {/* Cosmic Correlation */}
          <div className="bg-purple-950/50 backdrop-blur rounded-lg p-6 border border-indigo-500/30">
            <h2 className="text-2xl font-bold text-indigo-200 mb-4 flex items-center gap-2">
              <Star className="w-6 h-6" />
              Cosmic Correlation
            </h2>
            <p className="text-purple-100 leading-relaxed text-lg">
              {reading?.cosmicCorrelation}
            </p>
          </div>
        </div>

        {/* Back button */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
          >
            Generate Another Reading
          </a>
        </div>
      </div>
    </div>
  );
}

// Wrap in Suspense because useSearchParams requires it in Next.js App Router
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-indigo-950" />}>
      <SuccessContent />
    </Suspense>
  );
}
