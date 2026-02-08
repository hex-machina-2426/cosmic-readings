"use client";

import type { ReactNode, MouseEventHandler } from "react";

/**
 * GradientButton — Button with a smooth RGB color-cycling border glow.
 * Uses CSS hue-rotate animation for a seamless color transition.
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

  const baseHue = variant === "gold" ? "from-yellow-400 to-pink-500" : "from-purple-500 to-pink-500";

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
      {/* Glow — soft blur behind */}
      {!disabled && (
        <span
          className={`absolute -inset-[4px] rounded-full bg-gradient-to-r ${baseHue} opacity-50 blur-md group-hover:opacity-70 group-hover:blur-lg transition-all duration-500`}
          style={{ animation: "hueRotate 6s linear infinite" }}
        />
      )}

      {/* Border — thin sharp edge */}
      <span
        className={`absolute -inset-[1.5px] rounded-full bg-gradient-to-r ${baseHue}`}
        style={{
          animation: disabled ? "none" : "hueRotate 6s linear infinite",
          background: disabled ? "rgb(107, 114, 128)" : undefined,
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
