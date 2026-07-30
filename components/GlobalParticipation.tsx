"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { countryList } from "@/config/districts";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/config/site";

const statLabels: Record<string, string> = {
  countries: "Countries",
  districts: "Districts",
  clubs: "Clubs",
  members: "Rotaractors",
  projects: "Projects",
  volunteerHours: "Volunteer Hours",
};

function AnimatedStat({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Parse raw target number & suffix (e.g. "40+", "3,000+", "120K+", "2M+")
  const match = value.match(/^([\d,]+)([A-Za-z\+]*)$/);
  const numStr = match ? match[1].replace(/,/g, "") : "0";
  const suffix = match ? match[2] : "";
  const target = parseInt(numStr, 10) || 0;

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
    const duration = 1600; // 1.6s
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
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

  const displayNum = isVisible ? count.toLocaleString() : "0";

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17458F]">
      {displayNum}{suffix}
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
            Global Presence
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1426] dark:text-white"
          >
            <span className="text-[#D41B69]">8 Countries.</span> One Leadership Network.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Connecting Rotaract movements across South Asia to collaborate, learn, and lead with purpose.
          </p>
        </Reveal>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-16">
          {(Object.keys(siteConfig.stats) as Array<keyof typeof siteConfig.stats>).map((key, i) => (
            <Reveal key={key} delay={i * 0.05} y={12}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-[#17458F]/25 hover:shadow-md transition-all duration-350 text-center relative overflow-hidden group">
                <div className="absolute -right-8 -top-8 w-20 h-20 bg-[#17458F]/5 rounded-full group-hover:scale-110 transition-transform pointer-events-none" />
                <AnimatedStat value={siteConfig.stats[key]} />
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  {statLabels[key]}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 8 Flags Row */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 mb-16">
          {countryList.map(([key, country], i) => (
            <Reveal key={key} delay={i * 0.05} y={10} className="flex flex-col items-center gap-3 group">
              <div className="relative h-12 w-16 sm:h-14 sm:w-20 overflow-hidden rounded shadow-sm border border-slate-200/50 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/w160/${country.code}.png`}
                  alt={`${country.country} flag`}
                  className={`absolute inset-0 h-full w-full ${country.code === 'np' ? 'object-contain p-1.5 scale-110' : 'object-cover'}`}
                />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 group-hover:text-[#D41B69] transition-colors text-center uppercase tracking-wider">
                {country.country}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Explore Districts CTA */}
        <Reveal delay={0.2} y={15} className="text-center">
          <Link
            href="/districts"
            className="inline-flex items-center gap-3 rounded-full bg-[#17458F] px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-[#0B1426] hover:shadow-xl transition-all duration-300 group"
          >
            Explore Districts
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
