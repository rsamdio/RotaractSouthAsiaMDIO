"use client";
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

export function GlobalParticipation() {
  return (
    <section id="global" className="relative overflow-hidden bg-gradient-to-br from-white via-[#17458F]/5 to-[#F7A81B]/5 py-24 lg:py-32 px-5 sm:px-6 lg:px-8 scroll-mt-24 border-t border-b border-slate-100">
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#17458F]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#F7A81B]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="text-center mb-16">
          <span className="inline-block rounded-full bg-[#17458F]/10 border border-[#17458F]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[#17458F] mb-5">
            Global Presence
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1426] dark:text-white"
          >
            8 Countries. One Leadership Network.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-655">
            Connecting Rotaract movements across South Asia to collaborate, learn, and lead with purpose.
          </p>
        </Reveal>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-20">
          {(Object.keys(siteConfig.stats) as Array<keyof typeof siteConfig.stats>).map((key, i) => (
            <Reveal key={key} delay={i * 0.05} y={12}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-[#17458F]/25 hover:shadow-md transition-all duration-350 text-center relative overflow-hidden group">
                <div className="absolute -right-8 -top-8 w-20 h-20 bg-[#17458F]/5 rounded-full group-hover:scale-110 transition-transform pointer-events-none" />
                <div
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17458F]"
                >
                  {siteConfig.stats[key]}
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  {statLabels[key]}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Unified Creative Directory Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {countryList.map(([key, country], i) => {
            return (
              <Reveal key={key} delay={i * 0.04} y={15}>
                <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/70 p-6 shadow-sm hover:border-[#17458F]/30 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-350 backdrop-blur-md flex flex-col justify-between h-full">
                  {/* Subtle decorative background hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#17458F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div>
                    {/* Flag & Name Header */}
                    <div className="flex items-start justify-between">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://flagcdn.com/w160/${country.code}.png`}
                        alt={`${country.country} flag`}
                        className="h-10 w-16 object-contain rounded shadow-sm border border-slate-200/50 bg-slate-50 shrink-0"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#17458F] bg-[#17458F]/5 px-2.5 py-1 rounded-full">
                        {country.capital}
                      </span>
                    </div>

                    <h3 className="font-bold text-xl text-[#0B1426] dark:text-white mt-4 group-hover:text-[#17458F] transition-colors duration-300">
                      {country.country}
                    </h3>

                    {/* Stats badges */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {country.districts}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {country.clubs}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-white/60 leading-relaxed mt-4 line-clamp-3">
                      {country.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100/80">
                    <Link
                      href="/districts"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D41B69] hover:text-[#8A0F3E] transition-colors"
                    >
                      Explore Directory <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
