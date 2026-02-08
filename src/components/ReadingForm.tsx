"use client";

import { useState } from "react";
import GradientButton from "@/components/GradientButton";

export interface FormData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
}

interface ReadingFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

export default function ReadingForm({ onSubmit, loading }: ReadingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);

    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!formData.birthDate) {
      setError("Please enter your birth date");
      return;
    }

    onSubmit(formData);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/40 rounded-lg px-4 py-3 text-red-200 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-purple-200 mb-2">
          Name or Nickname
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-purple-950/50 border border-purple-500/30 text-white placeholder-purple-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="birthDate" className="block text-purple-200 mb-2">
          Birth Date <span className="text-pink-300">*</span>
        </label>
        <input
          id="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={(e) => updateField("birthDate", e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-purple-950/50 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="birthTime" className="block text-purple-200 mb-2">
          Birth Time <span className="text-purple-400 text-sm">(optional)</span>
        </label>
        <input
          id="birthTime"
          type="time"
          value={formData.birthTime}
          onChange={(e) => updateField("birthTime", e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-purple-950/50 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="birthLocation" className="block text-purple-200 mb-2">
          Birth Location <span className="text-purple-400 text-sm">(optional)</span>
        </label>
        <input
          id="birthLocation"
          type="text"
          value={formData.birthLocation}
          onChange={(e) => updateField("birthLocation", e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-purple-950/50 border border-purple-500/30 text-white placeholder-purple-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
          placeholder="City, Country"
        />
      </div>

      <div className="flex justify-center">
        <GradientButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Consulting the cosmos..." : "Generate Free Reading"}
        </GradientButton>
      </div>

      <p className="text-xs text-purple-400 text-center mt-4 leading-relaxed">
        This service is for entertainment purposes only and should not be
        considered as professional, psychological, financial, medical, or legal
        advice. Consult qualified professionals for important life decisions.
      </p>
    </div>
  );
}
