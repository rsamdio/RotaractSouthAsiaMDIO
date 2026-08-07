import { memberDistrictSummary } from "@/config/memberDistricts";
import { siteConfig } from "@/config/site";
import { Reveal } from "./Reveal";

const stats = [
  { key: "countries", label: "Nations", value: siteConfig.stats.countries },
  { key: "districts", label: "Districts", value: String(memberDistrictSummary.districts) },
  { key: "clubs", label: "Clubs", value: memberDistrictSummary.clubs },
  { key: "members", label: "Rotaractors", value: memberDistrictSummary.members },
] as const;

export function StatsBar() {
  return (
    <section className="relative z-20 px-5 sm:px-6 lg:px-8 -mt-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#FFF1D6] via-[#F7A81B]/75 to-[#F7E6D3] p-8 shadow-2xl shadow-[#F7A81B]/20 sm:p-10 relative">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative grid grid-cols-2 gap-8 text-center sm:grid-cols-4 lg:divide-x lg:divide-[#0B1426]/10">
          {stats.map((stat, i) => (
            <Reveal key={stat.key} delay={i * 0.06} y={16}>
              <div
                className="text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1426] tabular-nums"
              >
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-[#0B1426]/70">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
