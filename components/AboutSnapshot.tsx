import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/config/site";

export function AboutSnapshot() {
  return (
    <section id="about-snapshot" className="py-24 bg-white dark:bg-[#0D1825] px-5 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <Reveal className="relative order-2 lg:order-1" y={36}>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FCE8F1] to-transparent dark:from-[#D41B69]/10 rounded-[3rem] transform -rotate-3 scale-105 z-0" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/south-asia-hub.webp"
            alt="Map of Rotaract South Asia MDIO member nations"
            className="relative z-10 w-full rounded-[2.5rem] shadow-soft object-cover aspect-[16/10] border border-slate-100 dark:border-white/10"
          />
          <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-white dark:bg-[#131F35] p-5 rounded-3xl shadow-xl border border-slate-100 dark:border-white/10 z-20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#FCE8F1] dark:bg-[#D41B69]/15 text-[#D41B69] rounded-2xl flex items-center justify-center shrink-0">
                <Globe2 className="h-7 w-7" />
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight text-[#0B1426] dark:text-white">
                  {siteConfig.stats.countries} nations
                </div>
                <div className="text-sm text-slate-500 dark:text-white/50">Regional presence</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={0.1} y={36}>
          <span className="inline-block rounded-full bg-[#D41B69]/10 dark:bg-[#D41B69]/20 border border-[#D41B69]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69] mb-5">
            Who We Are
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#0B1426] dark:text-white leading-tight"
          >
            South Asia&apos;s MDIO for{" "}
            <span className="text-[#D41B69]">Rotaract information</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-white/65">
            The <strong className="text-[#0B1426] dark:text-white">Rotaract South Asia Multi-District Information Organization</strong>{" "}
            (RSAMDIO) is Rotary International&apos;s recognized MDIO: a regional group of member districts formed to disseminate information and facilitate communication among Rotaract Clubs and Rotaractors across eight nations in South Asia.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-white/65">
            RSAMDIO also provides leadership learning for clubs and future district Rotaract leaders, and organizes multidistrict programs across the region.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-crimson px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-crimson/20 transition hover:-translate-y-0.5 hover:bg-crimson-hover"
          >
            Learn More About RSAMDIO
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
