"use client";
import { useEffect, useRef } from "react";
import { heroImages } from "@/config/heroGallery";

// A wall of floating photo tiles filling the hero — slow idle drift plus
// per-tile parallax against the page scroll (mindmarket.com/about-us style).
// The tile itself moves; nothing animates inside it. Images come from
// config/heroGallery.ts so district photos can be swapped in without
// touching this file.
type Slot = {
  left: string;
  top: string;
  w: number;
  h: number;
  parallax: number; // extra translateY per scrolled px
  floatDur: number; // seconds per drift half-cycle
  floatPhase: number; // negative delay → start mid-cycle
  floatAmp: number; // px of idle drift
  hideBelow?: "sm" | "md" | "lg";
};

// Positions cover the full hero perimeter and mid-band; the headline sits
// above them (z-20), so tiles may pass beneath the text like the reference.
const slots: Slot[] = [
  { left: "-2%", top: "6%",  w: 210, h: 195, parallax: 0.22, floatDur: 7,   floatPhase: 0,   floatAmp: 26 },
  { left: "13%", top: "27%", w: 145, h: 135, parallax: 0.3,  floatDur: 8.5, floatPhase: 4.1, floatAmp: 30, hideBelow: "lg" },
  { left: "5%",  top: "55%", w: 160, h: 150, parallax: 0.16, floatDur: 8,   floatPhase: 2.6, floatAmp: 22, hideBelow: "md" },
  { left: "17%", top: "83%", w: 165, h: 175, parallax: 0.4,  floatDur: 8.5, floatPhase: 3.2, floatAmp: 28, hideBelow: "md" },
  { left: "31%", top: "6%",  w: 145, h: 165, parallax: 0.26, floatDur: 6.8, floatPhase: 1.1, floatAmp: 24, hideBelow: "lg" },
  { left: "55%", top: "2%",  w: 140, h: 130, parallax: 0.35, floatDur: 7.6, floatPhase: 5.3, floatAmp: 32, hideBelow: "lg" },
  { left: "70%", top: "8%",  w: 165, h: 190, parallax: 0.34, floatDur: 9,   floatPhase: 1.4, floatAmp: 34 },
  { left: "89%", top: "4%",  w: 160, h: 145, parallax: 0.2,  floatDur: 7.2, floatPhase: 2.2, floatAmp: 26, hideBelow: "md" },
  { left: "92%", top: "38%", w: 160, h: 150, parallax: 0.28, floatDur: 6.5, floatPhase: 0.8, floatAmp: 30, hideBelow: "lg" },
  { left: "83%", top: "64%", w: 150, h: 160, parallax: 0.38, floatDur: 8.2, floatPhase: 4.7, floatAmp: 28, hideBelow: "lg" },
  { left: "66%", top: "82%", w: 160, h: 150, parallax: 0.3,  floatDur: 7.5, floatPhase: 1.9, floatAmp: 32 },
  { left: "42%", top: "87%", w: 155, h: 145, parallax: 0.24, floatDur: 8.8, floatPhase: 3.8, floatAmp: 26, hideBelow: "md" },
  { left: "-2%", top: "86%", w: 150, h: 140, parallax: 0.33, floatDur: 7.9, floatPhase: 5.9, floatAmp: 30 },
];

const hideClass: Record<NonNullable<Slot["hideBelow"]>, string> = {
  sm: "hidden sm:block",
  md: "hidden md:block",
  lg: "hidden lg:block",
};

export function ScatteredGallery() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  // Parallax driven by rAF so it stays in sync with Lenis's smoothed scroll.
  useEffect(() => {
    let frame: number;
    const tick = () => {
      const y = window.scrollY;
      refs.current.forEach((el, i) => {
        if (el) el.style.transform = `translateY(${-y * slots[i].parallax}px)`;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
      {slots.map((s, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className={`absolute will-change-transform ${s.hideBelow ? hideClass[s.hideBelow] : ""}`}
          style={{ left: s.left, top: s.top, width: s.w, height: s.h }}
        >
          <div
            className="h-full w-full hero-float"
            style={{
              ["--float-amp" as string]: `${s.floatAmp}px`,
              animationDuration: `${s.floatDur}s`,
              animationDelay: `-${s.floatPhase}s`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImages[i % heroImages.length]}
              alt=""
              className="h-full w-full rounded-[28px] object-cover shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
