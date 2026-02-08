"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Star, Sparkles, Eye } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Reusable scroll-reveal section.
 * Uses IntersectionObserver instead of scroll position — 
 * no JS runs on every scroll tick, just a one-time trigger.
 */

interface InfoSectionProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  titleColor: string;
  description: string;
}

function InfoSection({ icon: Icon, iconColor, title, titleColor, description }: InfoSectionProps) {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
    >
      <div className="flex items-center gap-4 mb-6">
        <Icon className={`w-12 h-12 ${iconColor}`} />
        <h2 className={`text-3xl sm:text-4xl font-bold ${titleColor}`}>{title}</h2>
      </div>
      <p className="text-lg text-purple-200 leading-relaxed">{description}</p>
    </div>
  );
}

/**
 * All three info sections together.
 */
export default function InfoSections() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-32">
        <InfoSection
          icon={Star}
          iconColor="text-yellow-300"
          title="Zodiac Astrology"
          titleColor="text-yellow-200"
          description="For thousands of years, humanity has looked to the heavens for guidance. Your zodiac sign, determined by the position of the sun at your birth, reveals fundamental aspects of your personality, strengths, and life path. Ancient civilizations mapped the celestial dance, discovering profound connections between cosmic movements and earthly existence."
        />

        <InfoSection
          icon={Sparkles}
          iconColor="text-pink-300"
          title="Numerology"
          titleColor="text-pink-200"
          description="Numbers hold divine significance. Pythagoras believed that the universe could be explained through mathematics, and numerology extends this wisdom to human experience. Your Life Path Number, calculated from your birth date, unveils your soul's purpose and the lessons you're meant to learn in this lifetime."
        />

        <InfoSection
          icon={Eye}
          iconColor="text-purple-300"
          title="Gematria"
          titleColor="text-purple-200"
          description="Ancient mystics discovered that letters carry numerical values, and your name is no accident. Gematria reveals hidden meanings encoded in words and names, connecting you to universal patterns and divine blueprints. The numerical essence of your name resonates with specific energies and spiritual truths."
        />
      </div>
    </section>
  );
}
