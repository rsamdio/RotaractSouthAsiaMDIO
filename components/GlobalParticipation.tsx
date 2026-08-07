"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { FlagTile } from "./districts/FlagTile";
import { PresenceStatStrip } from "./districts/PresenceStatStrip";
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
];

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
          <PresenceStatStrip stats={homeStats} animate />
        </Reveal>

        <div className="mb-14 flex flex-wrap justify-center gap-6 sm:mb-16 sm:gap-8 lg:gap-10">
          {memberNations.map((nation, i) => (
            <Reveal
              key={nation.code}
              delay={i * 0.05}
              y={10}
              className="group flex flex-col items-center gap-3"
            >
              <FlagTile
                code={nation.code}
                alt={`${nation.name} flag`}
                size="md"
                interactive
              />
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
