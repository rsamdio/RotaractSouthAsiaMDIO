"use client";
import { useState } from "react";
import { Globe, Star, Landmark, Archive, Filter } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { MemberCard } from "@/components/MemberCard";
import { executiveBoard, drrs, committeeMembers, pastLeadership } from "@/config/leadership";

export default function LeadershipPage() {
  const [selectedZone, setSelectedZone] = useState<string>("All");

  const zones = ["All", "Zone 4", "Zone 5", "Zone 6", "Zone 7"];

  const filteredDRRs = selectedZone === "All" 
    ? drrs 
    : drrs.filter((d) => d.group === selectedZone);

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
          description="The elected officers, District Rotaract Representatives, and committee chairs coordinating Rotaract South Asia for Rotary Year 2026–27."
          crumbs={[{ label: "Leadership" }]}
        />

        {/* Executive Board - 4 Card Grid Section */}
        <section id="executive-board" className="relative py-24 px-5 sm:px-6 lg:px-8 bg-white scroll-mt-24">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-[600px] rounded-full bg-[#D41B69]/5 blur-[120px]" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-10">
              <Star className="h-5 w-5 text-[#F7A81B]" fill="currentColor" />
              <h2 className="text-2xl font-bold text-[#0B1426]" style={{ fontFamily: "General Sans, sans-serif" }}>
                Executive Board RY 2026–27
              </h2>
            </div>

            {/* 4 Card per Row Layout */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {executiveBoard.map((member, i) => (
                <MemberCard key={`${member.name}-${member.title}`} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* DRRs Section - 4 Card Grid */}
        <section id="drrs" className="py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 scroll-mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Landmark className="h-5 w-5 text-[#D41B69]" />
                  <h2 className="text-2xl font-bold text-[#0B1426]" style={{ fontFamily: "General Sans, sans-serif" }}>
                    District Rotaract Representatives (DRRs)
                  </h2>
                </div>
                <p className="text-sm text-slate-500 max-w-2xl">
                  The official roster of DRRs leading member districts across South Asia (RI Zones 4, 5, 6, and 7) for Rotary Year 2026–27.
                </p>
              </div>

              {/* Zone Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-sm shrink-0">
                <Filter className="h-3.5 w-3.5 text-slate-400 ml-2 mr-1 hidden sm:inline" />
                {zones.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedZone(g)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedZone === g
                        ? "bg-[#D41B69] text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Card per Row Layout */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {filteredDRRs.map((member, i) => (
                <MemberCard key={`${member.name}-${member.district}`} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Committee Section - 4 Card Grid */}
        <section id="committee" className="py-24 px-5 sm:px-6 lg:px-8 bg-white scroll-mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-10">
              <Globe className="h-5 w-5 text-[#D41B69]" />
              <h2 className="text-2xl font-bold text-[#0B1426]" style={{ fontFamily: "General Sans, sans-serif" }}>
                Committee Chairs & Members
              </h2>
            </div>
            {/* 4 Card per Row Layout */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {committeeMembers.map((member, i) => (
                <MemberCard key={member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Hidden Past Leadership Archive */}
        {/* <section id="past-leadership" className="py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 scroll-mt-24">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2 mb-8">
              <Archive className="h-5 w-5 text-[#D41B69]" />
              <h2 className="text-2xl font-bold text-[#0B1426]" style={{ fontFamily: "General Sans, sans-serif" }}>
                Past Leadership Archive
              </h2>
            </div>
            <div className="space-y-3">
              {pastLeadership.map((entry) => (
                <div key={entry.year} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-6 py-4">
                  <div>
                    <h4 className="font-bold text-[#0B1426] text-sm">{entry.president}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{entry.country}</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D41B69] bg-[#D41B69]/10 px-3 py-1.5 rounded-full">
                    {entry.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
