"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that uses IntersectionObserver to detect when an element
 * enters the viewport. Way more performant than scroll-position math.
 *
 * Usage:
 *   const { ref, isVisible } = useIntersectionObserver();
 *   <div ref={ref} className={isVisible ? 'opacity-100' : 'opacity-0'}>
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once visible, stay visible (no flickering on scroll back up)
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Stop observing once triggered
        }
      },
      {
        threshold: 0.15, // Trigger when 15% visible
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
