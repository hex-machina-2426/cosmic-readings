"use client";

import type { ReactNode, MouseEventHandler } from "react";

/**
 * GradientButton — Button with an animated rotating gradient border.
 * Uses a conic-gradient pseudo-element that spins behind the button,
 * visible as a glowing animated border.
 */

interface GradientButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "gold";
}

export default function GradientButton({
  children,
  onClick,
  disabled = false,
  className = "",
  size = "lg",
  variant = "primary",
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const gradientColors = {
    primary: "from-purple-500 via-pink-500 to-purple-500",
    gold: "from-yellow-400 via-pink-500 to-yellow-400",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group
        ${sizeClasses[size]}
        font-semibold text-white rounded-full
        transition-all duration-300
        ${disabled ? "cursor-not-allowed opacity-60" : "hover:scale-105 active:scale-[0.98]"}
        ${className}
      `}
    >
      {/* Animated gradient border — spins behind the button */}
      <span
        className={`
          absolute -inset-[2px] rounded-full
          bg-gradient-to-r ${gradientColors[variant]}
          ${disabled ? "" : "animate-gradient-spin group-hover:blur-sm"}
          transition-all duration-300
        `}
        style={{
          backgroundSize: "200% 200%",
          animation: disabled ? "none" : "gradientSpin 3s linear infinite",
          background: disabled
            ? "rgb(107, 114, 128)"
            : `conic-gradient(
                from 0deg,
                #a855f7,
                #ec4899,
                #eab308,
                #a855f7,
                #ec4899,
                #a855f7
              )`,
        }}
      />

      {/* Button face */}
      <span
        className={`
          relative block rounded-full
          ${disabled
            ? "bg-gray-700"
            : variant === "gold"
              ? "bg-gradient-to-r from-purple-900 to-indigo-900 group-hover:from-purple-800 group-hover:to-indigo-800"
              : "bg-gradient-to-r from-purple-900 to-purple-800 group-hover:from-purple-800 group-hover:to-purple-700"
          }
          ${sizeClasses[size]}
          transition-all duration-300
        `}
      >
        {children}
      </span>
    </button>
  );
}
