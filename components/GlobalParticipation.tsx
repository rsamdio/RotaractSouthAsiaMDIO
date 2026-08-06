"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  memberDistrictSummary,
  memberNations,
} from "@/config/memberDistricts";

const homeStats = [
  { key: "countries", label: "Countries", value: String(memberDistrictSummary.countries) },
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
    <div ref={ref} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17458F] tabular-nums">
      {displayNum}
    </div>
  );
}

export function GlobalParticipation() {
  return (
    <section id="global" className="relative overflow-hidden bg-gradient-to-br from-white via-[#17458F]/5 to-[#F7A81B]/5 py-24 lg:py-32 px-5 sm:px-6 lg:px-8 scroll-mt-24 border-t border-b border-slate-100">
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#17458F]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#F7A81B]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="text-center mb-16">
          <span className="inline-block rounded-full bg-[#D41B69]/10 border border-[#D41B69]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[#D41B69] mb-5">
            Our Presence
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1426] dark:text-white"
          >
            <span className="text-[#D41B69]">{memberDistrictSummary.countries} nations.</span> One regional force.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Member districts and Rotaractors across South Asia, connected to collaborate, learn, and lead.
          </p>
        </Reveal>

        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {homeStats.map((stat, i) => (
            <Reveal key={stat.key} delay={i * 0.05} y={12}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm hover:border-[#17458F]/25 hover:shadow-md transition-all duration-350 text-center relative overflow-hidden group h-full">
                <div className="absolute -right-8 -top-8 w-20 h-20 bg-[#17458F]/5 rounded-full group-hover:scale-110 transition-transform pointer-events-none" />
                <AnimatedStat value={stat.value} />
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 mb-16">
          {memberNations.map((nation, i) => (
            <Reveal key={nation.code} delay={i * 0.05} y={10} className="flex flex-col items-center gap-3 group">
              <div className="relative h-12 w-16 sm:h-14 sm:w-20 overflow-hidden rounded shadow-sm border border-slate-200/50 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/w160/${nation.code}.png`}
                  alt={`${nation.name} flag`}
                  className={`absolute inset-0 h-full w-full ${nation.code === "np" ? "object-contain p-1.5 scale-110" : "object-cover"}`}
                />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 group-hover:text-[#D41B69] transition-colors text-center uppercase tracking-wider">
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
