"use client";
import { useMemo, useState } from "react";
import { Award, Search, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MemberCard } from "@/components/MemberCard";
import { pastPresidents } from "@/config/hallOfFame";

export default function HallOfFamePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return pastPresidents;
    const q = searchQuery.toLowerCase();
    return pastPresidents.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.rotaryYear.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="College of Presidents"
          title="College of Presidents"
          description="Honoring every President of Rotaract South Asia MDIO"
          crumbs={[{ label: "College of Presidents" }]}
        />

        <section className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-4 px-5 sm:px-6 lg:px-8 shadow-xs">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              {searchQuery ? (
                <p className="text-xs text-slate-500 font-medium truncate">
                  Found {filtered.length} president
                  {filtered.length !== 1 ? "s" : ""} matching &quot;{searchQuery}&quot;
                </p>
              ) : (
                <p className="text-xs text-slate-500 font-medium hidden sm:block">
                  {pastPresidents.length} Presidents · Rotary Year 2010–11 to 2027–28
                </p>
              )}
            </div>

            <div className="relative w-full max-w-sm shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, year, district..."
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

        <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="relative mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#F7A81B]" />
                <h2
                  className="text-xl sm:text-2xl font-bold text-[#0B1426]"
                >
                  Past &amp; Present Presidents
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {filtered.length} Leaders
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No presidents match your search.
              </div>
            ) : (
              <div className="grid gap-3.5 sm:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map((member, i) => (
                  <MemberCard
                    key={`${member.name}-${member.rotaryYear}`}
                    member={member}
                    index={i}
                    showProfession={false}
                  />
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
