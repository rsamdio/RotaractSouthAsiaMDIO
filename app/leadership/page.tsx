"use client";
import { useState, useMemo } from "react";
import { Star, Landmark, Search, X, UserCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { MemberCard } from "@/components/MemberCard";
import { executiveBoard, drrs, committeeMembers, LeadershipMember } from "@/config/leadership";
import { siteConfig } from "@/config/site";

export default function LeadershipPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("All");

  const zones = ["All", "Zone 1", "Zone 4", "Zone 5", "Zone 6", "Zone 7", "Zone 8"];

  // Filter functions
  const matchesSearch = (m: LeadershipMember) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.title.toLowerCase().includes(q) ||
      m.district.toLowerCase().includes(q) ||
      m.country.toLowerCase().includes(q) ||
      (m.homeClub && m.homeClub.toLowerCase().includes(q)) ||
      (m.committee && m.committee.toLowerCase().includes(q))
    );
  };

  const filteredBoard = useMemo(
    () => executiveBoard.filter(matchesSearch),
    [searchQuery]
  );

  const filteredDRRs = useMemo(() => {
    const districtNumber = (district: string) => {
      const match = district.match(/\d+/);
      return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
    };

    return drrs
      .filter((d) => {
        const zoneMatch = selectedZone === "All" || d.group === selectedZone;
        return zoneMatch && matchesSearch(d);
      })
      .slice()
      .sort((a, b) => districtNumber(a.district) - districtNumber(b.district));
  }, [selectedZone, searchQuery]);

  const filteredCommittee = useMemo(
    () =>
      committeeMembers
        .filter(matchesSearch)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" })),
    [searchQuery]
  );

  const totalResults =
    filteredBoard.length + filteredDRRs.length + filteredCommittee.length;

  return (
    <>
      <Navbar />
      <PillNav
        items={[
          { id: "executive-board", label: "Board" },
          { id: "drrs", label: "DRRs" },
          { id: "committee", label: "Committee" },
        ]}
      />
      <main id="main-content">
        <PageHero
          eyebrow="Leadership"
          title="Executive Board & Regional Leaders"
          description={`The Executive Board, District Rotaract Representatives, and Committee members serving Rotaract South Asia for Rotary Year ${siteConfig.rotaryYear}.`}
          crumbs={[{ label: "Leadership" }]}
        />

        {/* Search Control Strip */}
        <section className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-4 px-5 sm:px-6 lg:px-8 shadow-xs">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              {searchQuery && (
                <p className="text-xs text-slate-500 font-medium truncate">
                  Found {totalResults} leader{totalResults !== 1 ? "s" : ""} matching &quot;{searchQuery}&quot;
                </p>
              )}
            </div>

            <div className="relative w-full max-w-sm shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leader, district, club..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-9 py-2 text-xs sm:text-sm text-[#0B1426] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D41B69]/40 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Executive Board Section */}
        <section id="executive-board" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-36">
          <div className="relative mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-[#F7A81B]" fill="currentColor" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1426]">
                  Executive Board
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {filteredBoard.length} Members
              </span>
            </div>

            {filteredBoard.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No board members match your search.</div>
            ) : (
              <div className="grid gap-3.5 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
                {filteredBoard.map((member, i) => (
                  <MemberCard key={`${member.name}-${member.title}`} member={member} index={i} showProfession={false} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* DRRs Section */}
        <section id="drrs" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 scroll-mt-36 border-t border-slate-100">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Landmark className="h-5 w-5 text-[#D41B69]" />
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0B1426]">
                    District Rotaract Representatives (DRRs)
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
                  District Rotaract Representatives leading member districts across South Asia.
                </p>
              </div>

              {/* Zone Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-xs shrink-0">
                {zones.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedZone(g)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedZone === g
                        ? "bg-[#D41B69] text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {filteredDRRs.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No DRRs match your search or zone filter.</div>
            ) : (
              <div className="grid gap-3.5 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
                {filteredDRRs.map((member, i) => (
                  <MemberCard key={`${member.name}-${member.district}`} member={member} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Committee Section */}
        <section id="committee" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-36 border-t border-slate-100">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-[#17458F]" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1426]">
                  Committee Members
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {filteredCommittee.length} Members
              </span>
            </div>

            {filteredCommittee.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No committee members match your search.</div>
            ) : (
              <div className="grid gap-3.5 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
                {filteredCommittee.map((member, i) => (
                  <MemberCard key={`${member.name}-${member.committee || i}`} member={member} index={i} showProfession={false} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
