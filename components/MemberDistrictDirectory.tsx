import Link from "next/link";
import { ArrowRight, MapPin, Users, Building2, Globe2 } from "lucide-react";
import {
  memberDistricts,
  memberDistrictSummary,
  memberNations,
  getDrrProfile,
} from "@/config/memberDistricts";

const summaryCards = [
  {
    label: "Countries",
    value: String(memberDistrictSummary.countries),
    icon: Globe2,
    tone: "text-[#D41B69] bg-[#D41B69]/10",
  },
  {
    label: "Member Districts",
    value: String(memberDistrictSummary.districts),
    icon: MapPin,
    tone: "text-[#17458F] bg-[#17458F]/10",
  },
  {
    label: "Clubs",
    value: memberDistrictSummary.clubs,
    icon: Building2,
    tone: "text-[#F7A81B] bg-[#F7A81B]/10",
  },
  {
    label: "Members",
    value: memberDistrictSummary.members,
    icon: Users,
    tone: "text-[#0B1426] bg-slate-200/70",
  },
] as const;

export function MemberDistrictDirectory() {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Overview summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5"
          >
            <div
              className={`h-9 w-9 rounded-xl flex items-center justify-center mb-3 ${card.tone}`}
            >
              <card.icon className="h-4 w-4" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-[#0B1426] tracking-tight">
              {card.value}
            </p>
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      {/* Member countries */}
      <div className="mb-12">
        <h2
          className="text-xl font-bold text-[#0B1426] mb-5"
          style={{ fontFamily: "General Sans, sans-serif" }}
        >
          Member Countries
        </h2>
        <div className="flex flex-wrap gap-3">
          {memberNations.map((nation) => (
            <div
              key={nation.code}
              className="inline-flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w80/${nation.code}.png`}
                alt=""
                className="h-4 w-6 rounded object-contain bg-white shadow-sm border border-slate-200"
              />
              <span className="text-sm font-semibold text-[#0B1426]">{nation.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Member districts list */}
      <h2
        className="text-xl font-bold text-[#0B1426] mb-5"
        style={{ fontFamily: "General Sans, sans-serif" }}
      >
        Member Districts
      </h2>

      <div className="space-y-3">
        {memberDistricts.map((d) => {
          const drr = getDrrProfile(d.number);
          return (
            <Link
              key={d.number}
              href={`/districts/${d.number}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-5 sm:px-6 py-4 hover:bg-white hover:shadow-sm hover:border-slate-200 transition"
            >
              <div className="min-w-0 flex items-center gap-3">
                <div className="flex items-center gap-1 shrink-0">
                  {d.countryCodes.map((code) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={code}
                      src={`https://flagcdn.com/w80/${code}.png`}
                      alt=""
                      className="h-4 w-6 rounded object-contain bg-white shadow-sm border border-slate-200"
                    />
                  ))}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#0B1426] text-sm sm:text-base group-hover:text-[#D41B69] transition-colors">
                    District {d.number}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    DRR:{" "}
                    <span className="font-medium text-slate-600">
                      {drr?.name ?? "TBD"}
                    </span>
                    {" · "}
                    {d.countriesLabel}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-[#D41B69] bg-[#D41B69]/10 px-2.5 py-1 rounded-full">
                  {d.clubs} Clubs
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#D41B69] transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
