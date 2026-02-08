"use client";

import { useState } from "react";
import StarField from "@/components/StarField";
import Hero from "@/components/Hero";
import InfoSections from "@/components/InfoSection";
import ReadingForm, { type FormData } from "@/components/ReadingForm";
import ReadingResult, { type ReadingData } from "@/components/ReadingResult";
import CrystalBall from "@/components/CrystalBall";
import { getZodiacSign } from "@/lib/zodiac";
import { calculateLifePath, calculateGematria } from "@/lib/numerology";
import { useToast } from "@/components/Toast";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<ReadingData | null>(null);
  const [userName, setUserName] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    try {
      const zodiacSign = getZodiacSign(formData.birthDate);
      const lifePath = calculateLifePath(formData.birthDate);
      const gematriaValue = calculateGematria(formData.name);

      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          zodiacSign,
          lifePath,
          gematriaValue,
          birthTime: formData.birthTime,
          birthLocation: formData.birthLocation,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      setUserName(formData.name);
      setReading({
        zodiacSign,
        lifePath,
        zodiacFull: data.zodiacFull,
        teasers: data.teasers,
      });
    } catch (error) {
      console.error("Error generating reading:", error);
      toast("Something went wrong generating your reading. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReading(null);
    setUserName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-violet-950 text-white overflow-x-hidden">
      <StarField count={120} />
      <Hero />
      <InfoSections />

      {/* Reading Form / Results */}
      <section id="form" className="relative py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-purple-900/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-200 to-pink-300 bg-clip-text text-transparent">
              {reading ? "Your Cosmic Reading" : "Receive Your Free Reading"}
            </h2>

            {reading ? (
              <ReadingResult
                name={userName}
                reading={reading}
                onReset={handleReset}
              />
            ) : loading ? (
              <CrystalBall />
            ) : (
              <ReadingForm onSubmit={handleSubmit} loading={loading} />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 text-center text-purple-400 text-sm">
        <p>✨ For entertainment purposes only ✨</p>
        <p className="mt-2">
          © {new Date().getFullYear()} Cosmic Readings. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
