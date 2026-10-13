"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export type PresenceStat = {
  key: string;
  label: string;
  value: string;
};

type Props = {
  stats: PresenceStat[];
  /** Count-up animation (home Presence). Listing/detail use static numbers. */
  animate?: boolean;
  className?: string;
};

const emptySubscribe = () => () => {};

function useIsHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function AnimatedStatValue({ value }: { value: string }) {
  const isHydrated = useIsHydrated();
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const target = Number(value.replace(/,/g, "").replace(/\+/g, "")) || 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setHasAnimated(true);
          } else {
            setIsVisible(true);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || hasAnimated || target === 0) return;
    const duration = 1600;
    const startTime = performance.now();
    let frameId: number;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
        setHasAnimated(true);
      }
    };

    frameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, hasAnimated, target]);

  // SSR / pre-hydration or completed animation renders the real formatted value for crawlers and screen readers.
  // While hydrated and awaiting / in-flight animation, shows animated count.
  const displayNum = !isHydrated || hasAnimated ? value : isVisible ? count.toLocaleString("en-US") : "0";

  return (
    <div
      ref={ref}
      className="text-3xl font-bold tracking-tight text-ink tabular-nums sm:text-4xl lg:text-[2.75rem]"
    >
      {displayNum}
    </div>
  );
}

function StaticStatValue({ value }: { value: string }) {
  return (
    <div className="text-3xl font-bold tracking-tight text-ink tabular-nums sm:text-4xl lg:text-[2.75rem]">
      {value}
    </div>
  );
}

/**
 * Glass stat strip matching homepage Presence (2×2 mobile → 4-col desktop).
 */
export function PresenceStatStrip({
  stats,
  animate = false,
  className = "",
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 shadow-soft backdrop-blur-sm sm:rounded-[2rem] ${className}`}
    >
      <div
        className={`grid grid-cols-2 lg:divide-x lg:divide-slate-100 ${
          stats.length <= 2 ? "lg:grid-cols-2" : "lg:grid-cols-4"
        }`}
      >
        {stats.map((stat, i) => {
          const isTwoCol = stats.length <= 2;
          const borderClasses = isTwoCol
            ? i === 1
              ? "border-l border-slate-100"
              : ""
            : [
                i % 2 === 1 ? "border-l border-slate-100 lg:border-l-0" : "",
                i >= 2 ? "border-t border-slate-100 lg:border-t-0" : "",
              ]
                .filter(Boolean)
                .join(" ");

          return (
          <div
            key={stat.key}
            className={`flex flex-col items-center justify-center px-5 py-8 text-center sm:px-6 sm:py-10 ${borderClasses}`}
          >
            {animate ? (
              <AnimatedStatValue value={stat.value} />
            ) : (
              <StaticStatValue value={stat.value} />
            )}
            <div className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-[11px]">
              {stat.label}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
