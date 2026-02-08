"use client";

/**
 * CrystalBall — Loading animation for reading generation.
 * A glowing orb with swirling smoke layers, sparkle particles inside.
 * Pure CSS animations — no JS needed.
 */

interface CrystalBallProps {
  message?: string;
  subMessage?: string;
}

export default function CrystalBall({
  message = "Consulting the cosmos...",
  subMessage = "The stars are aligning",
}: CrystalBallProps) {
  // Generate sparkle positions deterministically
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    top: ((i * 31 + 13) % 80) + 10,
    left: ((i * 47 + 7) % 80) + 10,
    delay: (i * 0.4) % 3,
    duration: 2 + (i % 3),
    size: i % 3 === 0 ? 2 : 1,
  }));

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Crystal Ball Container */}
      <div className="relative w-48 h-48 mb-8">
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl animate-pulse-glow" />
        <div className="absolute -inset-4 rounded-full bg-pink-500/10 blur-2xl animate-glow-pulse" />

        {/* Glass orb */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-900/80 via-indigo-900/60 to-purple-800/80 border border-purple-400/30 overflow-hidden backdrop-blur-sm">
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent" />

          {/* Smoke layer 1 */}
          <div
            className="absolute inset-0 animate-smoke-1"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, rgba(168, 85, 247, 0.5) 0%, transparent 60%)",
            }}
          />

          {/* Smoke layer 2 */}
          <div
            className="absolute inset-0 animate-smoke-2"
            style={{
              background: "radial-gradient(ellipse at 70% 40%, rgba(236, 72, 153, 0.4) 0%, transparent 55%)",
            }}
          />

          {/* Smoke layer 3 */}
          <div
            className="absolute inset-0 animate-smoke-3"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, rgba(99, 102, 241, 0.45) 0%, transparent 50%)",
            }}
          />

          {/* Smoke layer 4 — extra swirl */}
          <div
            className="absolute inset-0 animate-smoke-4"
            style={{
              background: "radial-gradient(ellipse at 40% 30%, rgba(234, 179, 8, 0.25) 0%, transparent 50%)",
            }}
          />

          {/* Smoke layer 5 — deep slow */}
          <div
            className="absolute inset-0 animate-smoke-5"
            style={{
              background: "radial-gradient(ellipse at 60% 70%, rgba(168, 85, 247, 0.3) 0%, transparent 55%)",
            }}
          />

          {/* Sparkle particles */}
          {sparkles.map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-sparkle-float"
              style={{
                width: `${s.size}px`,
                height: `${s.size}px`,
                top: `${s.top}%`,
                left: `${s.left}%`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}

          {/* Highlight / glass reflection */}
          <div
            className="absolute top-3 left-5 w-16 h-8 rounded-full opacity-30"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%)",
            }}
          />

          {/* Center sparkle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-twinkle opacity-70 blur-[1px]" />
          </div>
        </div>

        {/* Base / stand */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-6">
          <div className="w-full h-full bg-gradient-to-b from-purple-700/60 to-purple-900/80 rounded-b-full border-b border-x border-purple-500/30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-3 bg-gradient-to-b from-purple-600/40 to-transparent rounded-full" />
        </div>
      </div>

      {/* Text */}
      <p className="text-xl font-semibold text-purple-200 mb-2 animate-pulse">
        {message}
      </p>
      <p className="text-sm text-purple-400">
        {subMessage}
      </p>
    </div>
  );
}
