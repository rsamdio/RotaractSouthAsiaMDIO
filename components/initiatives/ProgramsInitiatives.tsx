import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProgramInitiative, ProgramStatus } from "@/config/initiatives";
import { getProgramIcon } from "@/lib/programIcons";
import { Reveal } from "@/components/Reveal";
import { SectionNavLink } from "@/components/SectionNavLink";

function statusLabel(status: ProgramStatus) {
  switch (status) {
    case "active":
      return "Active";
    case "upcoming":
      return "Upcoming";
    case "seasonal":
      return "Seasonal";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function ProgramCard({
  program,
  featured = false,
}: {
  program: ProgramInitiative;
  featured?: boolean;
}) {
  const Icon = getProgramIcon(program.icon);

  return (
    <Link
      href={`/initiatives/${program.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white transition hover:border-[#D41B69]/25 hover:shadow-lg sm:rounded-[2rem] ${
        featured ? "sm:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-slate-100 ${
          featured
            ? "aspect-[16/10] sm:aspect-auto sm:w-[42%] sm:min-h-[240px]"
            : "aspect-[16/10]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={program.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/50 to-transparent" />
        <span
          className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: program.accent }}
        >
          <Icon className="h-3 w-3" />
          {program.category}
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? "sm:justify-center" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
            {statusLabel(program.status)}
          </span>
        </div>
        <h3
          className={`mt-2 font-bold text-[#0B1426] transition group-hover:text-[#D41B69] ${
            featured ? "text-xl sm:text-2xl" : "text-lg"
          }`}
          style={{ fontFamily: "General Sans, sans-serif" }}
        >
          {program.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {program.summary}
        </p>
        <p className="mt-3 text-xs font-semibold text-slate-400">{program.livingNote}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#D41B69]">
          {program.ctaLabel ?? "Learn more"}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

type Props = {
  programs: ProgramInitiative[];
  /** Homepage: show a few; page: show all */
  variant?: "home" | "page";
};

export function ProgramsInitiatives({ programs, variant = "page" }: Props) {
  const isHome = variant === "home";
  const [featured, ...rest] = isHome ? programs : [programs[0], ...programs.slice(1)];

  return (
    <section
      id="programs"
      className={`relative scroll-mt-24 px-5 sm:px-6 lg:px-8 ${
        isHome
          ? "border-b border-slate-100 bg-slate-50 py-16 sm:py-20"
          : "bg-slate-50 py-14 sm:py-20"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#F7A81B]/8 blur-[100px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#D41B69]/6 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
          <div className={isHome ? "max-w-2xl" : "max-w-3xl"}>
            <span className="mb-4 inline-block rounded-full border border-[#17458F]/15 bg-[#17458F]/8 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#17458F]">
              Programs & Campaigns
            </span>
            <h2
              className="text-3xl font-bold text-[#0B1426] sm:text-4xl"
              style={{ fontFamily: "General Sans, sans-serif" }}
            >
              {isHome
                ? "Initiatives Beyond the Platforms"
                : "Regional Programs That Move People"}
            </h2>
            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              Service weeks, sports meets, leadership conversations, fellowship
              exchanges, and campaigns: the programmes that get Rotaractors into
              the field together across South Asia.
            </p>
          </div>
          {isHome && (
            <SectionNavLink
              href="/initiatives"
              scrollTo="programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1426] transition hover:text-[#D41B69]"
            >
              All programs
              <ArrowRight className="h-4 w-4" />
            </SectionNavLink>
          )}
        </Reveal>

        {programs.length === 0 ? (
          <p className="text-sm text-slate-500">
            Programs will appear here as they are published.
          </p>
        ) : isHome ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {programs.map((program, i) => (
              <Reveal key={program.slug} delay={i * 0.06}>
                <ProgramCard program={program} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {featured && (
              <Reveal>
                <ProgramCard program={featured} featured />
              </Reveal>
            )}
            {rest.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
                {rest.map((program, i) => (
                  <Reveal key={program.slug} delay={0.05 * (i + 1)}>
                    <ProgramCard program={program} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
