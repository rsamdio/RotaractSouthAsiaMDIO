"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  formatClubDisplayName,
  getClubBaseCounts,
  type MemberClub,
} from "@/config/memberDistricts";

type Props = {
  clubs: MemberClub[];
};

type BaseFilter = "all" | "Community" | "University" | "Other";

export function DistrictClubsPanel({ clubs }: Props) {
  const [query, setQuery] = useState("");
  const [baseFilter, setBaseFilter] = useState<BaseFilter>("all");
  const counts = getClubBaseCounts(clubs);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clubs.filter((club) => {
      const base = club.base || "Other";
      if (baseFilter !== "all" && base !== baseFilter) return false;
      if (!q) return true;
      const name = formatClubDisplayName(club.name).toLowerCase();
      const id = (club.id || "").toLowerCase();
      return name.includes(q) || id.includes(q);
    });
  }, [clubs, query, baseFilter]);

  if (counts.total === 0) {
    return (
      <div>
        <h2
          className="text-xl font-bold text-[#0B1426] mb-2"
        >
          Clubs
        </h2>
        <p className="text-sm text-slate-500">No clubs are on file for this district yet.</p>
      </div>
    );
  }

  const baseOptions: { value: BaseFilter; label: string; count: number }[] = [
    { value: "all", label: "All", count: counts.total },
    { value: "Community", label: "Community", count: counts.community },
    { value: "University", label: "University", count: counts.university },
  ];
  if (counts.other > 0) {
    baseOptions.push({ value: "Other", label: "Other", count: counts.other });
  }

  return (
    <div>
      <h2
        className="text-xl font-bold text-[#0B1426] mb-4"
      >
        Clubs
      </h2>

      <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or club ID"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-[#0B1426] placeholder:text-slate-400 outline-none focus:border-[#D41B69]/40 focus:ring-2 focus:ring-[#D41B69]/15"
          />
        </label>
        <div className="flex flex-wrap gap-1.5">
          {baseOptions.map((opt) => {
            if (opt.value !== "all" && opt.count === 0) return null;
            const active = baseFilter === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setBaseFilter(opt.value)}
                className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                  active
                    ? "bg-[#0B1426] text-white"
                    : "bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {opt.label}
                <span className={active ? "text-white/60 ml-1" : "text-slate-400 ml-1"}>
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-8 text-center text-sm text-slate-400">
          No clubs match your search.
        </p>
      ) : (
        <ul className="space-y-2">
          {filtered.map((club) => (
            <li
              key={club.id || club.name}
              className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-5 py-3.5"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#0B1426]">
                  {formatClubDisplayName(club.name)}
                  {club.id ? (
                    <span className="font-normal text-slate-400">
                      {" "}
                      (Club ID: {club.id})
                    </span>
                  ) : null}
                </p>
              </div>
              <span
                className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                  club.base === "University"
                    ? "text-[#17458F] bg-[#17458F]/10"
                    : club.base === "Community"
                      ? "text-[#D41B69] bg-[#D41B69]/10"
                      : "text-slate-500 bg-slate-200/70"
                }`}
              >
                {club.base || "Other"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
