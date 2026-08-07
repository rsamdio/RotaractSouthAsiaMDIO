"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  memberDistrictSummary,
  memberNations,
} from "@/config/memberDistricts";
import { siteConfig } from "@/config/site";

const homeStats = [
  { key: "countries", label: "Nations", value: siteConfig.stats.countries },
  { key: "districts", label: "Districts", value: String(memberDistrictSummary.districts) },
  { key: "clubs", label: "Clubs", value: memberDistrictSummary.clubs },
  { key: "members", label: "Rotaractors", value: memberDistrictSummary.members },
] as const;

function AnimatedStat({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const target = Number(value.replace(/,/g, "").replace(/\+/g, "")) || 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1600;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, target]);

  const displayNum = isVisible ? count.toLocaleString("en-US") : "0";

  return (
    <div
      ref={ref}
      className="text-3xl font-bold tracking-tight text-ink tabular-nums sm:text-4xl lg:text-[2.75rem]"
    >
      {displayNum}
    </div>
  );
}

export function GlobalParticipation() {
  return (
    <section
      id="global"
      className="relative scroll-mt-24 overflow-hidden border-t border-b border-slate-100 bg-gradient-to-b from-white via-blush/20 to-ice-cream/40 px-5 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-crimson/5 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-navy-dark/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-14 text-center sm:mb-16">
          <span className="mb-5 inline-block rounded-full border border-crimson/20 bg-crimson/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-crimson">
            Our Presence
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            <span className="text-crimson">{siteConfig.stats.countries} nations.</span>{" "}
            Member districts across South Asia.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Explore the member districts that form Rotaract South Asia across
            eight nations.
          </p>
        </Reveal>

        <Reveal y={16} className="mx-auto mb-14 max-w-5xl sm:mb-16">
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 shadow-soft backdrop-blur-sm sm:rounded-[2rem]">
            <div className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-slate-100">
              {homeStats.map((stat, i) => (
                <div
                  key={stat.key}
                  className={`flex flex-col items-center justify-center px-5 py-8 text-center sm:px-6 sm:py-10 ${
                    i % 2 === 1 ? "border-l border-slate-100 lg:border-l-0" : ""
                  } ${i >= 2 ? "border-t border-slate-100 lg:border-t-0" : ""}`}
                >
                  <AnimatedStat value={stat.value} />
                  <div className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-[11px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mb-14 flex flex-wrap justify-center gap-6 sm:mb-16 sm:gap-8 lg:gap-10">
          {memberNations.map((nation, i) => (
            <Reveal
              key={nation.code}
              delay={i * 0.05}
              y={10}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-slate-200/60 bg-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md sm:h-14 sm:w-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/w160/${nation.code}.png`}
                  alt={`${nation.name} flag`}
                  className={`absolute inset-0 h-full w-full ${nation.code === "np" ? "object-contain p-1.5 scale-110" : "object-cover"}`}
                />
              </div>
              <span className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-600 transition-colors group-hover:text-crimson sm:text-xs">
                {nation.name}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} y={15} className="text-center">
          <Link
            href="/districts"
            className="inline-flex items-center gap-3 rounded-full bg-crimson px-8 py-4 text-sm font-bold text-white shadow-lg shadow-crimson/20 hover:bg-crimson-hover hover:shadow-xl transition-all duration-300 group"
          >
            Explore Member Districts
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
