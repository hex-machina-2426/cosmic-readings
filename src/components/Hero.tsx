"use client";

import { Moon } from "lucide-react";
import GradientButton from "@/components/GradientButton";

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl animate-float-slow">
        <div className="flex justify-center mb-6">
          <Moon className="w-20 h-20 text-yellow-200 animate-pulse" />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          Cosmic Readings
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-purple-200">
          Unveil the mysteries written in the stars
        </p>

        <p className="text-sm text-purple-300 mb-6">
          ✨ For entertainment purposes only ✨
        </p>

        <GradientButton onClick={scrollToForm} variant="gold">
          Begin Your Journey
        </GradientButton>
      </div>
    </section>
  );
}
