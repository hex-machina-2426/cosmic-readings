"use client";

import { useState } from "react";
import { Star, Sparkles, Eye, Lock, Orbit } from "lucide-react";
import type { ZodiacSign } from "@/lib/zodiac";
import { calculateGematria } from "@/lib/numerology";
import GradientButton from "@/components/GradientButton";

export interface ReadingData {
  zodiacSign: ZodiacSign;
  lifePath: number;
  zodiacFull: string;
  teasers: {
    zodiac: string;
    numerology: string;
    gematria: string;
    cosmicCorrelation: string;
  };
}

interface ReadingResultProps {
  name: string;
  reading: ReadingData;
  onReset: () => void;
}

function LockedSection({
  title,
  icon,
  teaser,
  borderColor,
  titleColor,
}: {
  title: string;
  icon: React.ReactNode;
  teaser: string;
  borderColor: string;
  titleColor: string;
}) {
  return (
    <div className={`relative bg-purple-950/50 rounded-lg p-6 border ${borderColor} overflow-hidden`}>
      <h4 className={`text-xl font-bold ${titleColor} mb-3 flex items-center gap-2`}>
        {icon}
        {title}
      </h4>
      <div className="relative">
        <p className="text-purple-100 leading-relaxed line-clamp-3">
          {teaser}
        </p>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/60 to-purple-950/95" />
      </div>
      <div className="flex items-center justify-center pt-4 gap-2 text-purple-400">
        <Lock className="w-4 h-4" />
        <span className="text-sm">Subscribe to unlock full reading</span>
      </div>
    </div>
  );
}

export default function ReadingResult({
  name,
  reading,
  onReset,
}: ReadingResultProps) {
  const [unlocking, setUnlocking] = useState(false);

  const gematriaValue = calculateGematria(name);

  const handleUnlock = async () => {
    setUnlocking(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          zodiacSign: reading.zodiacSign.name,
          lifePath: reading.lifePath,
          gematriaValue,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-yellow-200 mb-2">
          {name}&apos;s Cosmic Profile
        </h3>
        <p className="text-purple-300">
          {reading.zodiacSign.symbol} {reading.zodiacSign.name} ·{" "}
          {reading.zodiacSign.element} Element · Life Path {reading.lifePath}
        </p>
      </div>

      {/* Zodiac Reading — Always visible (free) */}
      <div className="bg-purple-950/50 rounded-lg p-6 border border-yellow-500/30">
        <h4 className="text-xl font-bold text-yellow-200 mb-3 flex items-center gap-2">
          <Star className="w-5 h-5" />
          Your Zodiac Reading
        </h4>
        <p className="text-purple-100 leading-relaxed">
          {reading.zodiacFull}
        </p>
      </div>

      {/* Numerology — Teaser + lock */}
      <LockedSection
        title="Your Numerology Reading"
        icon={<Sparkles className="w-5 h-5" />}
        teaser={reading.teasers.numerology}
        borderColor="border-pink-500/30"
        titleColor="text-pink-200"
      />

      {/* Gematria — Teaser + lock */}
      <LockedSection
        title={`Your Gematria Reading — Name Value: ${gematriaValue}`}
        icon={<Eye className="w-5 h-5" />}
        teaser={reading.teasers.gematria}
        borderColor="border-purple-500/30"
        titleColor="text-purple-200"
      />

      {/* Cosmic Correlation — Teaser + lock */}
      <LockedSection
        title="Cosmic Correlation"
        icon={<Orbit className="w-5 h-5" />}
        teaser={reading.teasers.cosmicCorrelation}
        borderColor="border-indigo-500/30"
        titleColor="text-indigo-200"
      />

      {/* Paywall CTA */}
      <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 rounded-xl p-8 border border-yellow-500/20 text-center space-y-4">
        <h4 className="text-2xl font-bold bg-gradient-to-r from-yellow-200 to-pink-300 bg-clip-text text-transparent">
          Unlock Your Complete Cosmic Blueprint
        </h4>
        <ul className="text-purple-200 text-sm space-y-2 max-w-md mx-auto text-left">
          <li>✨ Your complete numerology profile, gematria analysis, and cosmic correlation</li>
          <li>🌙 Plus: daily personalized readings based on current planetary alignments</li>
          <li>🔓 Cancel anytime</li>
        </ul>
        <div className="pt-2">
          <GradientButton onClick={handleUnlock} disabled={unlocking} variant="gold">
            {unlocking ? "Setting up payment..." : "Subscribe for Full Access — $11.11/month"}
          </GradientButton>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full bg-purple-800/50 hover:bg-purple-800 text-purple-200 px-6 py-3 rounded-lg transition-all duration-300"
      >
        Generate Another Reading
      </button>
    </div>
  );
}
