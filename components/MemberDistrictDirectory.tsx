import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  memberDistricts,
  memberDistrictSummary,
  memberNations,
  getDrrProfile,
} from "@/config/memberDistricts";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { FlagTile } from "@/components/districts/FlagTile";
import { PresenceStatStrip } from "@/components/districts/PresenceStatStrip";

const listingStats = [
  { key: "nations", label: "Nations", value: siteConfig.stats.countries },
  {
    key: "districts",
    label: "Districts",
    value: String(memberDistrictSummary.districts),
  },
  { key: "clubs", label: "Clubs", value: memberDistrictSummary.clubs },
  { key: "members", label: "Members", value: memberDistrictSummary.members },
];

export function MemberDistrictDirectory() {
  return (
    <div className="mx-auto max-w-7xl">
      <Reveal y={16} className="mx-auto mb-14 max-w-5xl sm:mb-16">
        <PresenceStatStrip stats={listingStats} />
      </Reveal>

      <Reveal y={12} className="mb-14 sm:mb-16">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10">
          {memberNations.map((nation) => (
            <div
              key={nation.code}
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
            </div>
          ))}
        </div>
      </Reveal>

      <div>
        <h2 className="mb-6 text-xl font-bold tracking-tight text-ink sm:mb-8 sm:text-2xl">
          Member Districts
        </h2>

        <div className="space-y-3 sm:space-y-3.5">
          {memberDistricts.map((d) => {
            const drr = getDrrProfile(d.number);
            return (
              <Link
                key={d.number}
                href={`/districts/${d.number}`}
                className="group flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm transition hover:border-crimson/20 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-3xl sm:px-6 sm:py-5"
              >
                <div className="flex min-w-0 items-center gap-3.5 sm:gap-5">
                  <div className="flex shrink-0 items-center gap-1.5">
                    {d.countryCodes.map((code) => (
                      <FlagTile key={code} code={code} size="sm" />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-ink transition-colors group-hover:text-crimson sm:text-base">
                      District {d.number}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-slate-500 sm:text-sm">
                      {d.countriesLabel}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      DRR:{" "}
                      <span className="font-medium text-slate-600">
                        {drr?.name ?? "TBD"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 pl-[calc(1.75rem+0.875rem)] sm:justify-end sm:gap-2.5 sm:pl-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-crimson/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-crimson sm:px-3 sm:text-xs">
                      {d.clubs} Clubs
                    </span>
                    <span className="rounded-full bg-[#17458F]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#17458F] sm:px-3 sm:text-xs">
                      {d.members} Members
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-crimson" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
