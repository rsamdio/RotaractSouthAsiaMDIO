import Link from "next/link";
import { ArrowRight, Globe, Star } from "lucide-react";
import { executiveBoard } from "@/config/leadership";
import { MemberCard } from "./MemberCard";
import { Reveal } from "./Reveal";

export function LeadershipSnapshot() {
  const president = executiveBoard.find((m) => m.role === "president");
  const rest = executiveBoard.filter((m) => m.role !== "president");

  return (
    <section id="leadership" className="relative py-24 px-5 sm:px-6 lg:px-8 bg-slate-50 scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-[600px] rounded-full bg-[#D41B69]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <Reveal className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#D41B69]/10 border border-[#D41B69]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D41B69] mb-5">
            <Star className="h-3 w-3" />
            Leadership
          </span>
          <h2 className="text-4xl font-bold text-[#0B1426]" style={{ fontFamily: "General Sans, sans-serif" }}>
            Meet the Leadership
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            The dedicated Executive Board guiding Rotaract South Asia forward for Rotary Year 2026–27.
          </p>
        </Reveal>

        {president && (
          <Reveal delay={0.1}>
            <MemberCard member={president} index={0} isFeatured />
          </Reveal>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <MemberCard member={member} index={i + 1} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 text-base font-semibold text-[#0B1426] hover:text-[#D41B69] border-b-2 border-transparent hover:border-[#D41B69] pb-1 transition-colors"
          >
            View Full Board
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
