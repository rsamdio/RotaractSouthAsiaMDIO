import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { executiveBoard } from "@/config/leadership";
import { MemberCard } from "./MemberCard";
import { Reveal } from "./Reveal";

export function LeadershipSnapshot() {
  // Show top 4 officers for a clean 4-card snapshot grid
  const top4Officers = executiveBoard.slice(0, 4);

  return (
    <section id="leadership" className="relative py-20 lg:py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-[600px] rounded-full bg-[#D41B69]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="text-center mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#D41B69]/10 border border-[#D41B69]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69] mb-5">
            <Star className="h-3 w-3" fill="currentColor" />
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1426]">
            Meet the Leadership
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            The dedicated Executive Board guiding Rotaract South Asia forward for Rotary Year 2026–27.
          </p>
        </Reveal>

        {/* 4 Card Standard Grid Layout */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {top4Officers.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <MemberCard member={member} index={i} showProfession={false} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#0B1426] hover:text-[#D41B69] border-b-2 border-transparent hover:border-[#D41B69] pb-1 transition-colors"
          >
            View Full Leadership Team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
