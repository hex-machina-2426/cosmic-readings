"use client";

import { useMemo, useState, useEffect, useCallback } from "react";

interface StarProps {
  count?: number;
}

interface Star {
  id: number;
  size: number;
  top: number;
  left: number;
  opacity: number;
  twinkleDelay: number;
  twinkleDuration: number;
  driftGroup: number;
  color: string;
}

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  angle: number;
  width: number;
}

export default function StarField({ count = 120 }: StarProps) {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [nextId, setNextId] = useState(0);

  const colors = ["bg-white", "bg-white", "bg-white", "bg-white", "bg-white",
    "bg-blue-200", "bg-purple-200", "bg-yellow-200", "bg-blue-300", "bg-purple-300"];

  const stars: Star[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: ((i * 7 + 3) % 3) + 1,
      top: ((i * 31 + 17) % 100),
      left: ((i * 53 + 11) % 100),
      opacity: ((i * 13 + 7) % 7) / 10 + 0.3,
      twinkleDelay: ((i * 19 + 5) % 30) / 10,
      twinkleDuration: ((i * 23 + 9) % 30) / 10 + 2,
      driftGroup: (i % 3) + 1,
      color: colors[i % colors.length],
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const spawnShootingStar = useCallback(() => {
    const id = nextId;
    setNextId((prev) => prev + 1);
    const star: ShootingStar = {
      id,
      top: Math.random() * 50,
      left: Math.random() * 60,
      angle: 25 + Math.random() * 20,
      width: 60 + Math.random() * 80,
    };
    setShootingStars((prev) => [...prev, star]);
    setTimeout(() => {
      setShootingStars((prev) => prev.filter((s) => s.id !== id));
    }, 1500);
  }, [nextId]);

  useEffect(() => {
    const schedule = () => {
      const delay = 8000 + Math.random() * 7000; // 8-15s
      return setTimeout(() => {
        spawnShootingStar();
        timerRef = schedule();
      }, delay);
    };
    let timerRef = schedule();
    return () => clearTimeout(timerRef);
  }, [spawnShootingStar]);

  const driftClass = (group: number) => {
    switch (group) {
      case 1: return "animate-drift-1";
      case 2: return "animate-drift-2";
      case 3: return "animate-drift-3";
      default: return "animate-drift-1";
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${star.color} animate-twinkle ${driftClass(star.driftGroup)}`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
            animationDelay: `${star.twinkleDelay}s, 0s`,
            animationDuration: `${star.twinkleDuration}s, ${80 + star.driftGroup * 30}s`,
          }}
        />
      ))}
      {shootingStars.map((s) => (
        <div
          key={s.id}
          className="shooting-star-trail"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.width}px`,
            transform: `rotate(${s.angle}deg)`,
          }}
        />
      ))}
    </div>
  );
}
