import { Globe, Star, Landmark, Archive } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { MemberCard } from "@/components/MemberCard";
import { executiveBoard, drrs, committeeMembers, pastLeadership } from "@/config/leadership";

export const metadata = {
  title: "Leadership | RSAMDIO",
  description: "Meet the RSAMDIO Executive Board, DRRs, Committee Members, and past leadership.",
};

export default function LeadershipPage() {
  const president = executiveBoard.find((m) => m.role === "president");
  const restBoard = executiveBoard.filter((m) => m.role !== "president");

  return (
    <>
      <Navbar />
      <PillNav
        items={[
          { id: "executive-board", label: "Board" },
          { id: "drrs", label: "DRRs" },
          { id: "committee", label: "Committee" },
          { id: "past-leadership", label: "Archive" },
        ]}
      />
      <main id="main-content">
        <PageHero
          eyebrow="Leadership"
          title="Executive Board & Regional Leaders"
          description="The elected officers, District Rotaract Representatives, and committee chairs coordinating Rotaract South Asia for Rotary Year 2026–27."
          crumbs={[{ label: "Leadership" }]}
        />

      {/* Executive Board */}
      <section id="executive-board" className="relative py-24 px-5 sm:px-6 lg:px-8 bg-white scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-[600px] rounded-full bg-[#D41B69]/5 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-8">
            <Star className="h-4 w-4 text-[#F7A81B]" />
            <h2 className="text-2xl font-bold text-[#0B1426]" style={{ fontFamily: "General Sans, sans-serif" }}>Executive Board</h2>
          </div>

          {president && (
            <MemberCard member={president} index={0} isFeatured />
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restBoard.map((member, i) => (
              <MemberCard key={member.name} member={member} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* DRRs */}
      <section id="drrs" className="py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-3">
            <Landmark className="h-4 w-4 text-[#D41B69]" />
            <h2 className="text-2xl font-bold text-[#0B1426]" style={{ fontFamily: "General Sans, sans-serif" }}>
              District Rotaract Representatives
            </h2>
          </div>
          <p className="text-sm text-slate-500 mb-8 max-w-2xl">
            One representative DRR per member nation shown below. The full 38+ district roster is maintained by the Secretariat.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {drrs.map((member, i) => (
              <MemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section id="committee" className="py-24 px-5 sm:px-6 lg:px-8 bg-white scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-8">
            <Globe className="h-4 w-4 text-[#D41B69]" />
            <h2 className="text-2xl font-bold text-[#0B1426]" style={{ fontFamily: "General Sans, sans-serif" }}>
              Committee Members
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {committeeMembers.map((member, i) => (
              <MemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Past Leadership Archive */}
      <section id="past-leadership" className="py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 scroll-mt-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-8">
            <Archive className="h-4 w-4 text-[#D41B69]" />
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
      </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
