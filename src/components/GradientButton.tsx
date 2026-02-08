"use client";

import type { ReactNode, MouseEventHandler } from "react";

/**
 * GradientButton — Button with a smooth color-shifting glow edge.
 * Uses animated background-position on a gradient for a flowing
 * color change effect — no spinning chunks.
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

  const glowColors = {
    primary: "linear-gradient(270deg, #a855f7, #ec4899, #6366f1, #a855f7, #ec4899)",
    gold: "linear-gradient(270deg, #eab308, #ec4899, #a855f7, #eab308, #ec4899)",
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
      {/* Glow layer — blurred, behind everything */}
      <span
        className={`
          absolute -inset-[3px] rounded-full opacity-60 blur-[6px]
          ${disabled ? "" : "group-hover:opacity-80 group-hover:blur-[10px]"}
          transition-all duration-500
        `}
        style={{
          background: disabled ? "rgb(107, 114, 128)" : glowColors[variant],
          backgroundSize: "300% 100%",
          animation: disabled ? "none" : "glowShift 4s ease-in-out infinite",
        }}
      />

      {/* Border layer — sharp edge */}
      <span
        className="absolute -inset-[2px] rounded-full transition-all duration-300"
        style={{
          background: disabled ? "rgb(107, 114, 128)" : glowColors[variant],
          backgroundSize: "300% 100%",
          animation: disabled ? "none" : "glowShift 4s ease-in-out infinite",
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
