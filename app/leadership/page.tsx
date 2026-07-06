import { Globe, Star, Landmark, Archive } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PillNav } from "@/components/PillNav";
import { executiveBoard, drrs, committeeMembers, pastLeadership } from "@/config/leadership";

export const metadata = {
  title: "Leadership | RSAMDIO",
  description: "Meet the RSAMDIO Executive Board, DRRs, Committee Members, and past leadership.",
};

const avatarColors = [
  { bg: "from-[#D41B69] to-[#8A0F3E]", ring: "ring-[#D41B69]/40" },
  { bg: "from-[#7E22CE] to-[#581033]", ring: "ring-[#7E22CE]/40" },
  { bg: "from-[#17458F] to-[#0B1426]", ring: "ring-[#17458F]/40" },
  { bg: "from-[#F7A81B] to-[#C87900]", ring: "ring-[#F7A81B]/40" },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function MemberGrid({ members, startIndex = 0 }: { members: typeof executiveBoard; startIndex?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, i) => {
        const colors = avatarColors[(startIndex + i) % avatarColors.length];
        return (
          <div
            key={member.name}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D41B69]/30 hover:shadow-glow-pink hover:bg-white/8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${colors.bg} ring-2 ${colors.ring} flex items-center justify-center text-white text-lg font-bold flex-shrink-0 shadow-md`}>
                {getInitials(member.name)}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm leading-tight">{member.name}</h4>
                <p className="text-xs text-[#D41B69] font-semibold mt-0.5">{member.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Globe className="h-3 w-3 flex-shrink-0" />
              <span>{member.district} · {member.country}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
      <PageHero
        eyebrow="Leadership"
        title="Executive Board & Regional Leaders"
        description="The elected officers, District Rotaract Representatives, and committee chairs coordinating Rotaract South Asia for Rotary Year 2026–27."
        crumbs={[{ label: "Leadership" }]}
      />

      {/* Executive Board */}
      <section id="executive-board" className="relative py-24 px-5 sm:px-6 lg:px-8 bg-[#0B1426] scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-[600px] rounded-full bg-[#D41B69]/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-8">
            <Star className="h-4 w-4 text-[#F7A81B]" />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "General Sans, sans-serif" }}>Executive Board</h2>
          </div>

          {president && (
            <div className="mb-8 rounded-3xl border border-[#F7A81B]/25 bg-gradient-to-br from-[#F7A81B]/10 via-[#0B1426] to-[#D41B69]/10 p-7 flex flex-col sm:flex-row items-center gap-6 shadow-2xl">
              <div className={`relative flex-shrink-0 h-24 w-24 rounded-2xl bg-gradient-to-br ${avatarColors[0].bg} ring-4 ${avatarColors[0].ring} flex items-center justify-center text-white text-3xl font-bold shadow-xl`}>
                {getInitials(president.name)}
                <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-[#F7A81B] flex items-center justify-center shadow-lg">
                  <Star className="h-3.5 w-3.5 text-[#0B1426]" fill="currentColor" />
                </span>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F7A81B] mb-1">MDIO President · RY 2026–27</div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "General Sans, sans-serif" }}>{president.name}</h3>
                <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                  <Globe className="h-3.5 w-3.5 text-white/40" />
                  <span className="text-sm text-white/55">{president.district} · {president.country}</span>
                </div>
              </div>
            </div>
          )}

          <MemberGrid members={restBoard} startIndex={1} />
        </div>
      </section>

      {/* DRRs */}
      <section id="drrs" className="py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0D1825] scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-3">
            <Landmark className="h-4 w-4 text-[#D41B69]" />
            <h2 className="text-2xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
              District Rotaract Representatives
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-white/50 mb-8 max-w-2xl">
            One representative DRR per member nation shown below. The full 38+ district roster is maintained by the Secretariat.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {drrs.map((member, i) => {
              const colors = avatarColors[i % avatarColors.length];
              return (
                <div key={member.name} className="rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 p-5 hover:shadow-soft transition">
                  <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center text-white text-sm font-bold mb-3`}>
                    {getInitials(member.name)}
                  </div>
                  <h4 className="font-bold text-[#0B1426] dark:text-white text-sm">{member.name}</h4>
                  <p className="text-xs text-[#D41B69] font-semibold mt-0.5">{member.title}</p>
                  <p className="text-xs text-slate-400 dark:text-white/40 mt-1">{member.country}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section id="committee" className="py-24 px-5 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1426] scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-8">
            <Globe className="h-4 w-4 text-[#D41B69]" />
            <h2 className="text-2xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
              Committee Members
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {committeeMembers.map((member, i) => {
              const colors = avatarColors[i % avatarColors.length];
              return (
                <div key={member.name} className="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-5">
                  <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center text-white text-sm font-bold mb-3`}>
                    {getInitials(member.name)}
                  </div>
                  <h4 className="font-bold text-[#0B1426] dark:text-white text-sm">{member.name}</h4>
                  <p className="text-xs text-[#D41B69] font-semibold mt-0.5">{member.title}</p>
                  <p className="text-xs text-slate-400 dark:text-white/40 mt-1">{member.district} · {member.country}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Past Leadership Archive */}
      <section id="past-leadership" className="py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0D1825] scroll-mt-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-8">
            <Archive className="h-4 w-4 text-[#D41B69]" />
            <h2 className="text-2xl font-bold text-[#0B1426] dark:text-white" style={{ fontFamily: "General Sans, sans-serif" }}>
              Past Leadership Archive
            </h2>
          </div>
          <div className="space-y-3">
            {pastLeadership.map((entry) => (
              <div key={entry.year} className="flex items-center justify-between rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 px-6 py-4">
                <div>
                  <h4 className="font-bold text-[#0B1426] dark:text-white text-sm">{entry.president}</h4>
                  <p className="text-xs text-slate-400 dark:text-white/40 mt-0.5">{entry.country}</p>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D41B69] bg-[#D41B69]/10 px-3 py-1.5 rounded-full">
                  {entry.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
